// OWNER: B2. Invoice domain logic (DB). Routes in server/routes/invoices.js stay thin.
// Public exports used by other builders:
//   getPublicInvoice(token) → Promise<PublicInvoice|null>          (B4: GET /api/public/invoices/:token)
//   createPublicPaymentLink(token) → Promise<{ url, simulated, id }|null>  (B4: POST /api/public/invoices/:token/pay)
// Lifecycle: draft → (issue) unpaid → paid | void.  Credit notes: kind 'credit_note', status 'issued', negative totals.
// Issued documents are immutable: only status/paid_at/payment fields change afterwards.
import { one, many } from './db.js';
import { badRequest, conflict, notFound } from './errors.js';
import { buildQrTlv, calcTotals, invoiceHash, isValidVatNumber, INITIAL_PIH, VAT_RATE } from './zatca.js';
import { baseUrl } from './moyasar.js';

export const PAYMENT_METHODS = ['cash', 'mada', 'card', 'transfer', 'online', 'moyasar'];

export const publicUrl = (token) => `${baseUrl()}/i/${token}`;

const INVOICE_COLS = `i.*, c.name AS c_name, c.phone AS c_phone, c.vat_number AS c_vat, c.email AS c_email, c.type AS c_type`;

export function sellerBlock(co) {
  if (!co) return null;
  return {
    name: co.name, name_ar: co.name_ar, vat_number: co.vat_number, cr_number: co.cr_number,
    address: co.address, city: co.city, phone: co.phone, logo_url: co.logo_url ?? null,
  };
}

/** Row (joined with customer) → API Invoice shape. */
export function shapeInvoice(r, extra = {}) {
  if (!r) return null;
  return {
    id: r.id,
    number: r.number,
    kind: r.kind,
    status: r.status,
    issue_date: r.status === 'draft' ? null : r.issue_date,
    issued_at: r.issued_at || (r.status === 'draft' ? null : r.issue_date),
    customer: { id: r.customer_id, name: r.c_name, phone: r.c_phone, vat_number: r.c_vat, email: r.c_email, type: r.c_type },
    job_id: r.job_id,
    contract_id: r.contract_id,
    original_invoice_id: r.original_invoice_id,
    credit_reason: r.credit_reason,
    subtotal: r.subtotal,
    vat_amount: r.vat_amount,
    total: r.total,
    paid_at: r.paid_at,
    payment_method: r.payment_method,
    payment_ref: r.payment_ref,
    voided_at: r.voided_at,
    qr_tlv: r.qr_tlv,
    uuid: r.uuid,
    hash: r.hash,
    previous_hash: r.previous_hash,
    public_token: r.public_token,
    public_url: publicUrl(r.public_token),
    payment_link_url: r.payment_link_url,
    notes: r.notes,
    created_at: r.created_at,
    ...extra,
  };
}

const shapeLine = (l) => ({
  id: l.id, description: l.description, qty: l.qty, unit_price: l.unit_price,
  vat_rate: l.vat_rate, vat_amount: l.vat_amount, line_total: l.line_total,
});

/** Full invoice (lines, seller, buyer, credit notes) scoped to company. null when not found. */
export async function loadInvoice(companyId, id, db = null) {
  const q = db ? (t, p) => db.query(t, p).then((r) => r.rows) : many;
  const [r] = await q(`SELECT ${INVOICE_COLS} FROM invoices i JOIN customers c ON c.id = i.customer_id
                       WHERE i.company_id = $1 AND i.id = $2`, [companyId, id]);
  if (!r) return null;
  return hydrate(r, q);
}

async function hydrate(r, q = many) {
  const [lines, [co], credits, [orig]] = await Promise.all([
    q('SELECT * FROM invoice_lines WHERE invoice_id = $1 AND company_id = $2 ORDER BY position, id', [r.id, r.company_id]),
    r.seller ? Promise.resolve([null]) : q('SELECT * FROM companies WHERE id = $1', [r.company_id]),
    q(`SELECT id, number, total, issue_date, credit_reason FROM invoices
        WHERE company_id = $1 AND original_invoice_id = $2 AND kind = 'credit_note' AND status <> 'draft' ORDER BY number`, [r.company_id, r.id]),
    r.original_invoice_id
      ? q('SELECT id, number, kind, issue_date, total FROM invoices WHERE company_id = $1 AND id = $2', [r.company_id, r.original_invoice_id])
      : Promise.resolve([null]),
  ]);
  const credited = credits.reduce((s, c) => s + Math.abs(Number(c.total)), 0);
  return shapeInvoice(r, {
    lines: lines.map(shapeLine),
    company: r.seller || sellerBlock(co),
    seller: r.seller || sellerBlock(co),
    buyer: r.buyer || { name: r.c_name, phone: r.c_phone, vat_number: r.c_vat },
    credit_notes: credits,
    credited_total: Math.round(credited * 100) / 100,
    original_invoice: orig || null,
    original_kind: orig?.kind,
  });
}

/** Public, unauthenticated view by token (drafts are never public). */
export async function getPublicInvoice(token) {
  if (typeof token !== 'string' || !/^[a-f0-9]{16,64}$/i.test(token)) return null;
  const r = await one(`SELECT ${INVOICE_COLS} FROM invoices i JOIN customers c ON c.id = i.customer_id
                       WHERE i.public_token = $1 AND i.status <> 'draft'`, [token]);
  if (!r) return null;
  const inv = await hydrate(r);
  // Only what the customer needs; no internal ids except the invoice's own public token.
  return {
    number: inv.number, kind: inv.kind, status: inv.status, issue_date: inv.issue_date,
    subtotal: inv.subtotal, vat_amount: inv.vat_amount, total: inv.total,
    paid_at: inv.paid_at, payment_method: inv.payment_method, qr_tlv: inv.qr_tlv, uuid: inv.uuid,
    public_token: inv.public_token, public_url: inv.public_url, payment_link_url: inv.payment_link_url,
    pdf_url: `/api/invoices/public/${inv.public_token}/pdf`,
    can_pay: inv.status === 'unpaid' && inv.kind !== 'credit_note' && inv.total >= 1,
    notes: inv.notes, credit_reason: inv.credit_reason,
    original_invoice: inv.original_invoice ? { number: inv.original_invoice.number } : null,
    seller: inv.seller, company: inv.seller,
    customer: { name: inv.buyer?.name, vat_number: inv.buyer?.vat_number || null },
    buyer: { name: inv.buyer?.name, vat_number: inv.buyer?.vat_number || null, address: inv.buyer?.address || null, city: inv.buyer?.city || null },
    lines: inv.lines.map(({ id, ...l }) => l),
  };
}

/** Public "pay now" (B4). Returns null when the token is unknown or not payable. */
export async function createPublicPaymentLink(token) {
  const r = await one(`SELECT id, company_id, status, kind FROM invoices WHERE public_token = $1 AND status <> 'draft'`, [String(token || '')]);
  if (!r) return null;
  const { startInvoicePayment } = await import('./payments.js');
  return startInvoicePayment({ companyId: r.company_id, invoiceId: r.id });
}

// ───────────────────────── creation ─────────────────────────

/** Resolve lines + customer from { job_id } | { contract_id } | { customer_id, lines }. */
export async function resolveSource(client, companyId, body) {
  const q = (t, p) => client.query(t, p).then((r) => r.rows);
  if (body.job_id) {
    const [job] = await q('SELECT id, customer_id, site_id, contract_id, number, title FROM jobs WHERE company_id = $1 AND id = $2', [companyId, body.job_id]);
    if (!job) throw notFound('Job not found');
    const [dup] = await q(`SELECT id, number FROM invoices WHERE company_id = $1 AND job_id = $2
                            AND kind <> 'credit_note' AND status <> 'void' LIMIT 1`, [companyId, job.id]);
    if (dup) throw conflict(`Job already has invoice ${dup.number ?? '(draft)'}`);
    const items = await q(`SELECT ji.description, ji.qty, ji.unit_price, s.taxable
                             FROM job_items ji LEFT JOIN services s ON s.id = ji.service_id AND s.company_id = ji.company_id
                            WHERE ji.company_id = $1 AND ji.job_id = $2 ORDER BY ji.created_at, ji.id`, [companyId, job.id]);
    if (!items.length) throw badRequest('Job has no items to invoice');
    return {
      customerId: job.customer_id, jobId: job.id, contractId: job.contract_id, siteId: job.site_id,
      lines: items.map((i) => ({ description: i.description, qty: i.qty, unit_price: i.unit_price, vat_rate: i.taxable === false ? 0 : VAT_RATE })),
    };
  }
  if (body.contract_id) {
    const [ct] = await q('SELECT * FROM contracts WHERE company_id = $1 AND id = $2', [companyId, body.contract_id]);
    if (!ct) throw notFound('Contract not found');
    if (!(Number(ct.price) > 0)) throw badRequest('Contract has no price');
    return {
      customerId: ct.customer_id, jobId: null, contractId: ct.id, siteId: ct.site_id,
      lines: [{ description: `عقد صيانة: ${ct.title} (${ct.start_date} – ${ct.end_date}) · Maintenance contract`, qty: 1, unit_price: ct.price, vat_rate: VAT_RATE }],
    };
  }
  if (!body.customer_id) throw badRequest('Provide job_id, contract_id or customer_id + lines');
  const [cu] = await q('SELECT id FROM customers WHERE company_id = $1 AND id = $2', [companyId, body.customer_id]);
  if (!cu) throw notFound('Customer not found');
  if (!body.lines?.length) throw badRequest('lines are required');
  return { customerId: cu.id, jobId: null, contractId: null, siteId: null, lines: body.lines };
}

export async function insertLines(client, companyId, invoiceId, lines) {
  for (const [k, l] of lines.entries()) {
    await client.query(
      `INSERT INTO invoice_lines (invoice_id, company_id, description, qty, unit_price, vat_rate, line_total, vat_amount, position)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [invoiceId, companyId, l.description, l.qty, l.unit_price, l.vat_rate, l.line_total, l.vat_amount, k]
    );
  }
}

/** Creates a draft (number = null). Returns its id. */
export async function createDraft(client, user, body) {
  const companyId = user.company_id;
  const src = await resolveSource(client, companyId, body);
  const { rows: [cu] } = await client.query('SELECT vat_number FROM customers WHERE id = $1 AND company_id = $2', [src.customerId, companyId]);
  const kind = body.kind || (cu?.vat_number ? 'standard' : 'simplified');
  const t = calcTotals(src.lines);
  const { rows: [inv] } = await client.query(
    `INSERT INTO invoices (company_id, number, job_id, contract_id, customer_id, kind, subtotal, vat_amount, total, status, notes, created_by, buyer)
     VALUES ($1, NULL, $2, $3, $4, $5, $6, $7, $8, 'draft', $9, $10, $11) RETURNING id`,
    [companyId, src.jobId, src.contractId, src.customerId, kind, t.subtotal, t.vat_amount, t.total, body.notes ?? null, user.id ?? null,
      src.siteId ? { site_id: src.siteId } : null]
  );
  await insertLines(client, companyId, inv.id, t.lines);
  return inv.id;
}

/** Buyer snapshot: customer + address of the job/contract site or first site. */
async function buyerSnapshot(client, companyId, inv) {
  const q = (t, p) => client.query(t, p).then((r) => r.rows);
  const [cu] = await q('SELECT * FROM customers WHERE company_id = $1 AND id = $2', [companyId, inv.customer_id]);
  const siteId = inv.buyer?.site_id || null;
  const [site] = siteId
    ? await q('SELECT * FROM sites WHERE company_id = $1 AND id = $2', [companyId, siteId])
    : await q('SELECT * FROM sites WHERE company_id = $1 AND customer_id = $2 ORDER BY created_at LIMIT 1', [companyId, inv.customer_id]);
  return {
    name: cu.name, phone: cu.phone, email: cu.email, type: cu.type,
    vat_number: cu.vat_number || null,
    address: site ? [site.address, site.district].filter(Boolean).join('، ') || null : null,
    city: site?.city || null,
  };
}

/**
 * Issue a draft inside an open transaction: gapless number (company row lock), seller/buyer snapshots,
 * recomputed totals, QR TLV and hash chain. Throws 409 if not a draft.
 */
export async function issueDraft(client, companyId, invoiceId) {
  const q = (t, p) => client.query(t, p).then((r) => r.rows);
  // Serialize issuance per company: this row lock is the numbering lock (NO KEY UPDATE doesn't block FK checks).
  const [co] = await q('SELECT * FROM companies WHERE id = $1 FOR NO KEY UPDATE', [companyId]);
  const [inv] = await q('SELECT * FROM invoices WHERE company_id = $1 AND id = $2 FOR UPDATE', [companyId, invoiceId]);
  if (!inv) throw notFound('Invoice not found');
  if (inv.status !== 'draft') throw conflict('Invoice is already issued');
  if (!isValidVatNumber(co.vat_number || '')) {
    throw badRequest('Set a valid company VAT number (15 digits, starts and ends with 3) before issuing tax invoices · أضف الرقم الضريبي للمنشأة');
  }
  const buyer = await buyerSnapshot(client, companyId, inv);
  if (inv.kind === 'standard') {
    if (!isValidVatNumber(buyer.vat_number || '')) throw badRequest('Standard (B2B) tax invoice requires a valid buyer VAT number · الرقم الضريبي للمشتري مطلوب');
    if (!buyer.address && !buyer.city) throw badRequest('Standard (B2B) tax invoice requires the buyer address · عنوان المشتري مطلوب');
  }
  const lines = await q('SELECT * FROM invoice_lines WHERE invoice_id = $1 AND company_id = $2 ORDER BY position, id', [inv.id, companyId]);
  if (!lines.length) throw badRequest('Invoice has no lines');
  const t = calcTotals(lines);
  const isCredit = inv.kind === 'credit_note';
  if (!isCredit && !(t.total > 0)) throw badRequest('Invoice total must be greater than zero');
  if (isCredit && !(t.total < 0)) throw badRequest('Credit note total must be negative');
  for (const l of t.lines) {
    await client.query('UPDATE invoice_lines SET line_total = $1, vat_amount = $2 WHERE id = $3', [l.line_total, l.vat_amount, l.id]);
  }
  const [{ n }] = await q('SELECT GREATEST(COALESCE(MAX(number), 0), 1000) + 1 AS n FROM invoices WHERE company_id = $1', [companyId]);
  const [prev] = await q('SELECT hash FROM invoices WHERE company_id = $1 AND number IS NOT NULL ORDER BY number DESC LIMIT 1', [companyId]);
  const previous_hash = prev?.hash || INITIAL_PIH;
  const [{ now }] = await q(`SELECT date_trunc('second', now()) AS now`);
  const seller = sellerBlock(co);
  const qr = buildQrTlv({ sellerName: co.name_ar || co.name, vatNumber: co.vat_number, timestamp: now, total: t.total, vatAmount: t.vat_amount });
  const hash = invoiceHash({ ...inv, number: n, issue_date: now, seller, buyer, lines: t.lines, subtotal: t.subtotal, vat_amount: t.vat_amount, total: t.total }, previous_hash);
  await client.query(
    `UPDATE invoices SET number = $3, status = $4, issue_date = $5, issued_at = $5, subtotal = $6, vat_amount = $7, total = $8,
            qr_tlv = $9, seller = $10, buyer = $11, previous_hash = $12, hash = $13
      WHERE company_id = $1 AND id = $2`,
    [companyId, inv.id, n, isCredit ? 'issued' : 'unpaid', now, t.subtotal, t.vat_amount, t.total, qr, seller, buyer, previous_hash, hash]
  );
  return { id: inv.id, number: n, job_id: inv.job_id };
}

/**
 * Create + issue a credit note against an issued invoice. `lines` (positive amounts to credit) defaults to all lines.
 * Returns { id, number, voidedOriginal }.
 */
export async function createCreditNote(client, user, originalId, { reason, lines } = {}) {
  const companyId = user.company_id;
  const q = (t, p) => client.query(t, p).then((r) => r.rows);
  const [orig] = await q('SELECT * FROM invoices WHERE company_id = $1 AND id = $2 FOR UPDATE', [companyId, originalId]);
  if (!orig) throw notFound('Invoice not found');
  if (orig.kind === 'credit_note') throw conflict('Cannot credit a credit note');
  if (orig.status === 'draft') throw conflict('Draft invoices can be edited or deleted instead');
  if (orig.status === 'void') throw conflict('Invoice is already void');
  const src = lines?.length
    ? lines
    : (await q('SELECT description, qty, unit_price, vat_rate FROM invoice_lines WHERE invoice_id = $1 AND company_id = $2 ORDER BY position, id', [orig.id, companyId]));
  const neg = src.map((l) => ({ description: l.description, qty: Math.abs(Number(l.qty)), unit_price: -Math.abs(Number(l.unit_price)), vat_rate: l.vat_rate ?? VAT_RATE }));
  const t = calcTotals(neg);
  const [{ credited }] = await q(`SELECT COALESCE(SUM(-total), 0) AS credited FROM invoices
                                   WHERE company_id = $1 AND original_invoice_id = $2 AND kind = 'credit_note' AND status <> 'draft'`, [companyId, orig.id]);
  const remaining = Math.round((Number(orig.total) - Number(credited)) * 100);
  const thisCredit = Math.round(-t.total * 100);
  if (thisCredit > remaining) throw badRequest(`Credit exceeds the remaining creditable amount (${(remaining / 100).toFixed(2)} SAR)`);
  const { rows: [cn] } = await client.query(
    `INSERT INTO invoices (company_id, number, job_id, contract_id, customer_id, kind, subtotal, vat_amount, total, status,
                           original_invoice_id, credit_reason, notes, created_by, buyer)
     VALUES ($1, NULL, $2, $3, $4, 'credit_note', $5, $6, $7, 'draft', $8, $9, $10, $11, $12) RETURNING id`,
    [companyId, orig.job_id, orig.contract_id, orig.customer_id, t.subtotal, t.vat_amount, t.total, orig.id, reason, null, user.id ?? null,
      orig.buyer?.site_id ? { site_id: orig.buyer.site_id } : null]
  );
  await insertLines(client, companyId, cn.id, t.lines);
  const issued = await issueDraft(client, companyId, cn.id);
  let voidedOriginal = false;
  if (thisCredit === remaining && orig.status === 'unpaid') {
    await client.query(`UPDATE invoices SET status = 'void', voided_at = now() WHERE company_id = $1 AND id = $2`, [companyId, orig.id]);
    voidedOriginal = true;
  }
  return { id: cn.id, number: issued.number, voidedOriginal };
}

/** Insert a job_events row via B1's helper when available, else directly. Never throws. */
export async function jobEvent(jobId, companyId, message, actorUserId) {
  if (!jobId) return;
  try {
    const jobs = await import('../routes/jobs.js');
    if (typeof jobs.addJobEvent === 'function') {
      await jobs.addJobEvent(null, { jobId, companyId, type: 'invoice', message, actorUserId });
      return;
    }
  } catch { /* fall through */ }
  try {
    await one(`INSERT INTO job_events (job_id, company_id, type, message, actor_user_id) VALUES ($1,$2,'invoice',$3,$4) RETURNING id`,
      [jobId, companyId, message, actorUserId ?? null]);
  } catch (e) {
    console.error('[invoices] job event', e.message);
  }
}
