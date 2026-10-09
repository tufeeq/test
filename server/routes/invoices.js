// /api/invoices — OWNER: B2. See docs/API.md § 10.
// Every query is scoped by req.user.company_id (public token routes excepted).
import { Router } from 'express';
import QRCode from 'qrcode';
import { requireRole } from '../lib/auth.js';
import { many, one, tx, paging, audit } from '../lib/db.js';
import { ah, notFound, badRequest, conflict } from '../lib/errors.js';
import { validate, z } from '../lib/validate.js';
import { buildUblXml } from '../lib/zatca.js';
import { renderInvoicePdf } from '../lib/pdf.js';
import { notify, notifyJobEvent } from '../lib/notify.js';
import {
  loadInvoice, shapeInvoice, createDraft, issueDraft, createCreditNote, insertLines, jobEvent, PAYMENT_METHODS, publicUrl,
} from '../lib/invoices.js';
import { calcTotals } from '../lib/zatca.js';
import { startInvoicePayment } from '../lib/payments.js';

// Re-exported for B4 (server/routes/public.js imports this module).
export { getPublicInvoice, createPublicPaymentLink } from '../lib/invoices.js';

const router = Router();
const staff = requireRole('owner', 'dispatcher');
const owner = requireRole('owner');

const money2 = z.coerce.number().finite().min(0).max(10_000_000).transform((n) => Math.round(n * 100) / 100);
const LineSchema = z.object({
  description: z.string().trim().min(1).max(500),
  qty: z.coerce.number().finite().positive().max(100000).transform((n) => Math.round(n * 100) / 100),
  unit_price: money2,
  vat_rate: z.union([z.literal(0), z.literal(0.15)]).optional(),
});
const CreateSchema = z.object({
  job_id: z.string().uuid().optional(),
  contract_id: z.string().uuid().optional(),
  customer_id: z.string().uuid().optional(),
  lines: z.array(LineSchema).min(1).max(200).optional(),
  kind: z.enum(['simplified', 'standard']).optional(),
  notes: z.string().trim().max(2000).optional().nullable(),
  draft: z.boolean().optional(),           // true → keep as editable draft (default: issue immediately)
});
const ListQuery = z.object({
  status: z.string().optional(),            // CSV: draft,unpaid,paid,void,issued
  kind: z.string().optional(),
  customer_id: z.string().uuid().optional(),
  job_id: z.string().uuid().optional(),
  contract_id: z.string().uuid().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  q: z.string().optional(),
  limit: z.string().optional(),
  offset: z.string().optional(),
}).passthrough();
const idParam = z.object({ id: z.string().uuid() });
const dateLike = (s) => (s && /^\d{4}-\d{2}-\d{2}$/.test(s) ? `${s}T00:00:00+03:00` : s);
const dateEnd = (s) => (s && /^\d{4}-\d{2}-\d{2}$/.test(s) ? `${s}T23:59:59.999+03:00` : s);

async function sendPdf(res, inv, disposition = 'inline') {
  const buf = await renderInvoicePdf({ invoice: inv, lines: inv.lines, company: inv.seller, customer: inv.buyer });
  const name = `${inv.kind === 'credit_note' ? 'credit-note' : 'invoice'}-${inv.number ?? 'draft'}.pdf`;
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `${disposition}; filename="${name}"`);
  res.setHeader('Cache-Control', 'private, no-store');
  res.send(buf);
}

async function afterIssue(user, issued) {
  if (!issued.job_id) return;
  await jobEvent(issued.job_id, user.company_id, `تم إصدار الفاتورة رقم ${issued.number}`, user.id);
  try { await notifyJobEvent(issued.job_id, 'invoice_issued'); } catch (e) { console.error('[invoices] notify', e.message); }
}

// ───────────────────────── public (no auth) — must precede /:id ─────────────────────────
router.get('/public/:token/pdf', ah(async (req, res) => {
  const token = String(req.params.token || '');
  if (!/^[a-f0-9]{16,64}$/i.test(token)) throw notFound();
  const r = await one(`SELECT id, company_id FROM invoices WHERE public_token = $1 AND status <> 'draft'`, [token]);
  if (!r) throw notFound('Invoice not found');
  const inv = await loadInvoice(r.company_id, r.id);
  await sendPdf(res, inv, req.query.download ? 'attachment' : 'inline');
}));

// ───────────────────────── VAT report ─────────────────────────
router.get('/reports/vat', staff, ah(async (req, res) => {
  const today = new Date(Date.now() + 3 * 3600e3).toISOString().slice(0, 10);
  const from = /^\d{4}-\d{2}-\d{2}$/.test(req.query.from || '') ? req.query.from : `${today.slice(0, 4)}-01-01`;
  const to = /^\d{4}-\d{2}-\d{2}$/.test(req.query.to || '') ? req.query.to : today;
  const cid = req.user.company_id;
  // All issued documents (void originals and their credit notes net out). Lines give the standard/zero split.
  const rows = await many(
    `SELECT to_char(i.issue_date AT TIME ZONE 'Asia/Riyadh', 'YYYY-MM') AS month,
            count(DISTINCT i.id) FILTER (WHERE i.kind <> 'credit_note') AS invoices,
            count(DISTINCT i.id) FILTER (WHERE i.kind = 'credit_note') AS credit_notes,
            COALESCE(sum(l.line_total) FILTER (WHERE l.vat_rate > 0), 0) AS standard_rated,
            COALESCE(sum(l.line_total) FILTER (WHERE l.vat_rate = 0), 0) AS zero_rated
       FROM invoices i JOIN invoice_lines l ON l.invoice_id = i.id AND l.company_id = i.company_id
      WHERE i.company_id = $1 AND i.status <> 'draft'
        AND (i.issue_date AT TIME ZONE 'Asia/Riyadh')::date BETWEEN $2::date AND $3::date
      GROUP BY 1 ORDER BY 1`, [cid, from, to]);
  const vat = await many(
    `SELECT to_char(issue_date AT TIME ZONE 'Asia/Riyadh', 'YYYY-MM') AS month,
            sum(subtotal) AS taxable, sum(vat_amount) AS vat, sum(total) AS total,
            COALESCE(sum(-total) FILTER (WHERE kind = 'credit_note'), 0) AS credited
       FROM invoices WHERE company_id = $1 AND status <> 'draft'
        AND (issue_date AT TIME ZONE 'Asia/Riyadh')::date BETWEEN $2::date AND $3::date
      GROUP BY 1 ORDER BY 1`, [cid, from, to]);
  const r2 = (n) => Math.round(Number(n || 0) * 100) / 100;
  const byMonth = vat.map((v) => {
    const l = rows.find((x) => x.month === v.month) || {};
    return {
      month: v.month, invoices: Number(l.invoices || 0), credit_notes: Number(l.credit_notes || 0),
      taxable_sales: r2(v.taxable), standard_rated: r2(l.standard_rated), zero_rated: r2(l.zero_rated),
      vat_collected: r2(v.vat), total: r2(v.total), credited: r2(v.credited),
    };
  });
  const sum = (k) => r2(byMonth.reduce((s, m) => s + m[k], 0));
  const report = {
    from, to, currency: 'SAR', vat_rate: 0.15,
    totals: {
      invoices: byMonth.reduce((s, m) => s + m.invoices, 0), credit_notes: byMonth.reduce((s, m) => s + m.credit_notes, 0),
      taxable_sales: sum('taxable_sales'), standard_rated: sum('standard_rated'), zero_rated: sum('zero_rated'),
      vat_collected: sum('vat_collected'), total: sum('total'), credited: sum('credited'),
    },
    by_month: byMonth,
  };
  if (req.query.format === 'csv') {
    const head = ['month', 'invoices', 'credit_notes', 'taxable_sales', 'standard_rated', 'zero_rated', 'vat_collected', 'total_incl_vat', 'credited'];
    const line = (m) => [m.month, m.invoices, m.credit_notes, m.taxable_sales, m.standard_rated, m.zero_rated, m.vat_collected, m.total, m.credited]
      .map((v) => (typeof v === 'number' && !Number.isInteger(v) ? v.toFixed(2) : v)).join(',');
    const csv = [head.join(','), ...byMonth.map(line), line({ ...report.totals, month: 'TOTAL' })].join('\r\n');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="vat-report-${from}_${to}.csv"`);
    return res.send('﻿' + csv + '\r\n');
  }
  res.json(report);
}));

// ───────────────────────── list ─────────────────────────
router.get('/', staff, validate({ query: ListQuery }), ah(async (req, res) => {
  const { limit, offset, q } = paging(req.query);
  const f = req.validQuery;
  const where = ['i.company_id = $1'];
  const params = [req.user.company_id];
  const add = (sql, v) => { params.push(v); where.push(sql.replace('$?', `$${params.length}`)); };
  const csv = (s) => String(s).split(',').map((x) => x.trim()).filter(Boolean);
  if (f.status) add('i.status = ANY($?)', csv(f.status));
  if (f.kind) add('i.kind = ANY($?)', csv(f.kind));
  if (f.customer_id) add('i.customer_id = $?', f.customer_id);
  if (f.job_id) add('i.job_id = $?', f.job_id);
  if (f.contract_id) add('i.contract_id = $?', f.contract_id);
  if (f.from) add('i.issue_date >= $?::timestamptz', dateLike(f.from));
  if (f.to) add('i.issue_date <= $?::timestamptz', dateEnd(f.to));
  if (q) {
    params.push(`%${q.replace(/[%_]/g, '\\$&')}%`);
    const n = params.length;
    const num = /^\d{1,9}$/.test(q) ? Number(q) : null;
    params.push(num);
    where.push(`(c.name ILIKE $${n} OR c.phone ILIKE $${n} OR i.number = $${n + 1})`);
  }
  const w = where.join(' AND ');
  const base = `FROM invoices i JOIN customers c ON c.id = i.customer_id AND c.company_id = i.company_id WHERE ${w}`;
  const [rows, agg] = await Promise.all([
    many(`SELECT i.*, c.name AS c_name, c.phone AS c_phone, c.vat_number AS c_vat, c.email AS c_email, c.type AS c_type
          ${base} ORDER BY i.issue_date DESC, i.number DESC NULLS FIRST LIMIT ${limit} OFFSET ${offset}`, params),
    one(`SELECT count(*) AS total,
                COALESCE(sum(i.total) FILTER (WHERE i.status = 'unpaid'), 0) AS unpaid,
                COALESCE(sum(i.total) FILTER (WHERE i.status = 'paid'), 0) AS paid,
                count(*) FILTER (WHERE i.status = 'unpaid') AS unpaid_count
         ${base}`, params),
  ]);
  res.json({
    items: rows.map((r) => shapeInvoice(r)),
    total: agg.total, limit, offset,
    totals: { unpaid: agg.unpaid, paid: agg.paid, unpaid_count: agg.unpaid_count },
  });
}));

// ───────────────────────── create ─────────────────────────
router.post('/', staff, validate({ body: CreateSchema }), ah(async (req, res) => {
  const b = req.body;
  const n = [b.job_id, b.contract_id].filter(Boolean).length;
  if (n > 1 || (n === 0 && !(b.customer_id && b.lines?.length))) {
    throw badRequest('Provide exactly one of: job_id, contract_id, or customer_id + lines');
  }
  const issued = await tx(async (client) => {
    const id = await createDraft(client, req.user, b);
    if (b.draft) return { id, draft: true };
    return issueDraft(client, req.user.company_id, id);
  });
  audit(req.user, issued.draft ? 'invoice.draft' : 'invoice.issue', 'invoice', issued.id);
  if (!issued.draft) await afterIssue(req.user, issued);
  res.status(201).json(await loadInvoice(req.user.company_id, issued.id));
}));

// ───────────────────────── one ─────────────────────────
router.get('/:id', staff, validate({ params: idParam }), ah(async (req, res) => {
  const inv = await loadInvoice(req.user.company_id, req.params.id);
  if (!inv) throw notFound('Invoice not found');
  res.json(inv);
}));

// Edit a draft (issued invoices are immutable).
router.patch('/:id', staff, validate({
  params: idParam,
  body: z.object({ lines: z.array(LineSchema).min(1).max(200).optional(), kind: z.enum(['simplified', 'standard']).optional(), notes: z.string().trim().max(2000).optional().nullable() }),
}), ah(async (req, res) => {
  const cid = req.user.company_id;
  await tx(async (client) => {
    const { rows: [inv] } = await client.query('SELECT id, status, kind FROM invoices WHERE company_id = $1 AND id = $2 FOR UPDATE', [cid, req.params.id]);
    if (!inv) throw notFound('Invoice not found');
    if (inv.status !== 'draft' || inv.kind === 'credit_note') throw conflict('Issued invoices are immutable; issue a credit note instead');
    if (req.body.lines) {
      const t = calcTotals(req.body.lines);
      await client.query('DELETE FROM invoice_lines WHERE company_id = $1 AND invoice_id = $2', [cid, inv.id]);
      await insertLines(client, cid, inv.id, t.lines);
      await client.query('UPDATE invoices SET subtotal = $3, vat_amount = $4, total = $5 WHERE company_id = $1 AND id = $2', [cid, inv.id, t.subtotal, t.vat_amount, t.total]);
    }
    if (req.body.kind) await client.query('UPDATE invoices SET kind = $3 WHERE company_id = $1 AND id = $2', [cid, inv.id, req.body.kind]);
    if (req.body.notes !== undefined) await client.query('UPDATE invoices SET notes = $3 WHERE company_id = $1 AND id = $2', [cid, inv.id, req.body.notes]);
  });
  audit(req.user, 'invoice.update', 'invoice', req.params.id);
  res.json(await loadInvoice(cid, req.params.id));
}));

router.delete('/:id', staff, validate({ params: idParam }), ah(async (req, res) => {
  const r = await one(`DELETE FROM invoices WHERE company_id = $1 AND id = $2 AND status = 'draft' RETURNING id`, [req.user.company_id, req.params.id]);
  if (!r) {
    const exists = await one('SELECT status FROM invoices WHERE company_id = $1 AND id = $2', [req.user.company_id, req.params.id]);
    if (!exists) throw notFound('Invoice not found');
    throw conflict('Only drafts can be deleted');
  }
  audit(req.user, 'invoice.delete', 'invoice', r.id);
  res.json({ ok: true });
}));

router.post('/:id/issue', staff, validate({ params: idParam }), ah(async (req, res) => {
  const issued = await tx((client) => issueDraft(client, req.user.company_id, req.params.id));
  audit(req.user, 'invoice.issue', 'invoice', issued.id);
  await afterIssue(req.user, issued);
  res.json(await loadInvoice(req.user.company_id, issued.id));
}));

router.post('/:id/pay', staff, validate({
  params: idParam,
  body: z.object({
    payment_method: z.enum(PAYMENT_METHODS).default('cash'),
    paid_at: z.string().datetime({ offset: true }).optional(),
    reference: z.string().trim().max(200).optional(),
  }),
}), ah(async (req, res) => {
  const cid = req.user.company_id;
  const paidAt = req.body.paid_at ? new Date(req.body.paid_at) : new Date();
  if (paidAt.getTime() > Date.now() + 5 * 60e3) throw badRequest('paid_at cannot be in the future');
  const r = await one(
    `UPDATE invoices SET status = 'paid', paid_at = $3, payment_method = $4, payment_ref = COALESCE($5, payment_ref)
      WHERE company_id = $1 AND id = $2 AND status = 'unpaid' AND kind <> 'credit_note' RETURNING id, job_id, number`,
    [cid, req.params.id, paidAt, req.body.payment_method, req.body.reference ?? null]);
  if (!r) {
    const ex = await one('SELECT status, kind FROM invoices WHERE company_id = $1 AND id = $2', [cid, req.params.id]);
    if (!ex) throw notFound('Invoice not found');
    throw conflict(ex.kind === 'credit_note' ? 'Credit notes cannot be paid' : `Invoice is ${ex.status}`);
  }
  audit(req.user, 'invoice.pay', 'invoice', r.id);
  await jobEvent(r.job_id, cid, `تم تحصيل الفاتورة رقم ${r.number}`, req.user.id);
  res.json(await loadInvoice(cid, r.id));
}));

// Void = full credit note + status 'void' (only for unpaid invoices; refunds of paid invoices use /credit-note).
router.post('/:id/void', owner, validate({ params: idParam, body: z.object({ reason: z.string().trim().max(500).optional() }) }), ah(async (req, res) => {
  const cid = req.user.company_id;
  const cur = await one('SELECT status, kind FROM invoices WHERE company_id = $1 AND id = $2', [cid, req.params.id]);
  if (!cur) throw notFound('Invoice not found');
  if (cur.status === 'draft') throw conflict('Drafts are deleted, not voided');
  if (cur.status === 'paid') throw conflict('Paid invoices cannot be voided; issue a credit note (refund) instead');
  if (cur.status === 'void') throw conflict('Invoice is already void');
  if (cur.kind === 'credit_note') throw conflict('Credit notes cannot be voided');
  const cn = await tx((client) => createCreditNote(client, req.user, req.params.id, { reason: req.body.reason || 'إلغاء الفاتورة · Invoice cancelled' }));
  if (!cn.voidedOriginal) {
    // a partial credit already existed; void the remainder state explicitly
    await one(`UPDATE invoices SET status = 'void', voided_at = now() WHERE company_id = $1 AND id = $2 AND status = 'unpaid' RETURNING id`, [cid, req.params.id]);
  }
  audit(req.user, 'invoice.void', 'invoice', req.params.id);
  const inv = await loadInvoice(cid, req.params.id);
  res.json({ ...inv, credit_note_id: cn.id });
}));

router.post('/:id/credit-note', owner, validate({
  params: idParam,
  body: z.object({
    reason: z.string().trim().min(2).max(500),
    lines: z.array(LineSchema).min(1).max(200).optional(),   // positive amounts to credit; default = all lines
  }),
}), ah(async (req, res) => {
  const cn = await tx((client) => createCreditNote(client, req.user, req.params.id, req.body));
  audit(req.user, 'invoice.credit_note', 'invoice', cn.id);
  res.status(201).json(await loadInvoice(req.user.company_id, cn.id));
}));

router.post('/:id/payment-link', staff, validate({ params: idParam }), ah(async (req, res) => {
  const link = await startInvoicePayment({ companyId: req.user.company_id, invoiceId: req.params.id });
  audit(req.user, 'invoice.payment_link', 'invoice', req.params.id);
  res.json({ url: link.url, simulated: link.simulated, ref: link.ref });
}));

router.post('/:id/send', staff, validate({
  params: idParam,
  body: z.object({ channel: z.enum(['whatsapp', 'sms', 'email']).default('whatsapp'), to: z.string().trim().max(120).optional() }),
}), ah(async (req, res) => {
  const cid = req.user.company_id;
  const inv = await loadInvoice(cid, req.params.id);
  if (!inv) throw notFound('Invoice not found');
  if (inv.status === 'draft') throw conflict('Issue the invoice before sending it');
  const to = req.body.to || (req.body.channel === 'email' ? inv.customer.email : inv.customer.phone);
  if (!to) throw badRequest('Customer has no phone/email; pass `to`');
  const seller = inv.seller?.name_ar || inv.seller?.name || '';
  const title = inv.kind === 'credit_note' ? 'إشعار دائن' : 'فاتورة';
  const amount = Math.abs(inv.total).toFixed(2);
  const body = [
    `مرحباً ${inv.customer.name}،`,
    `${title} رقم ${inv.number} من ${seller} بمبلغ ${amount} ريال (شامل الضريبة).`,
    `عرض الفاتورة: ${publicUrl(inv.public_token)}`,
    inv.status === 'unpaid' && inv.payment_link_url ? `للدفع: ${inv.payment_link_url}` : null,
    '',
    `Hello ${inv.customer.name}, ${inv.kind === 'credit_note' ? 'credit note' : 'invoice'} #${inv.number} from ${inv.seller?.name || seller}: SAR ${amount} incl. VAT.`,
  ].filter((x) => x !== null).join('\n');
  let message = null;
  try {
    message = await notify({ companyId: cid, customerId: inv.customer.id, jobId: inv.job_id, channel: req.body.channel, to, body });
  } catch (e) {
    console.error('[invoices] send', e.message);
  }
  audit(req.user, 'invoice.send', 'invoice', inv.id);
  res.json({ ok: Boolean(message), message: message ? { id: message.id, status: message.status, channel: message.channel, to_addr: message.to_addr } : null });
}));

router.get('/:id/pdf', staff, validate({ params: idParam }), ah(async (req, res) => {
  const inv = await loadInvoice(req.user.company_id, req.params.id);
  if (!inv) throw notFound('Invoice not found');
  await sendPdf(res, inv, req.query.download ? 'attachment' : 'inline');
}));

router.get('/:id/qr.png', staff, validate({ params: idParam }), ah(async (req, res) => {
  const r = await one('SELECT qr_tlv FROM invoices WHERE company_id = $1 AND id = $2', [req.user.company_id, req.params.id]);
  if (!r) throw notFound('Invoice not found');
  if (!r.qr_tlv) throw conflict('Invoice not issued yet');
  const png = await QRCode.toBuffer(r.qr_tlv, { type: 'png', errorCorrectionLevel: 'M', margin: 1, width: Math.min(Math.max(Number(req.query.size) || 320, 120), 1024) });
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'private, max-age=86400');
  res.send(png);
}));

// UBL 2.1 XML (ZATCA profile, unsigned) — Phase-2 readiness.
router.get('/:id/xml', staff, validate({ params: idParam }), ah(async (req, res) => {
  const inv = await loadInvoice(req.user.company_id, req.params.id);
  if (!inv) throw notFound('Invoice not found');
  if (inv.status === 'draft') throw conflict('Invoice not issued yet');
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${inv.kind === 'credit_note' ? 'credit-note' : 'invoice'}-${inv.number}.xml"`);
  res.send(buildUblXml(inv));
}));

export default router;
