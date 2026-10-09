// /api/customers — OWNER: B1. docs/API.md § 4.
import { Router } from 'express';
import { requireRole } from '../lib/auth.js';
import { one, many, tx, paging, audit } from '../lib/db.js';
import { ah, notFound, conflict } from '../lib/errors.js';
import { validate, z, idParam, normalizePhone } from '../lib/validate.js';
import { listJobSummaries } from './jobs.js';
import { CONTRACT_SELECT } from './contracts.js';

const router = Router();
router.use(requireRole('owner', 'dispatcher'));

export const CUSTOMER_COLS = 'id, name, phone, email, type, vat_number, notes, created_at';
const SITE_COLS = 'id, customer_id, label, city, district, address, lat, lng, created_at';

const vat = z.preprocess((v) => (typeof v === 'string' ? (v.replace(/\s/g, '') || null) : v),
  z.string().regex(/^3\d{13}3$/, 'VAT number must be 15 digits starting and ending with 3').nullable().optional());

export const SiteFields = {
  label: z.string().trim().max(120).optional().nullable(),
  city: z.string().trim().max(60).optional().nullable(),
  district: z.string().trim().max(80).optional().nullable(),
  address: z.string().trim().max(300).optional().nullable(),
  lat: z.coerce.number().min(-90).max(90).optional().nullable(),
  lng: z.coerce.number().min(-180).max(180).optional().nullable(),
};

const CustomerFields = {
  name: z.string().trim().min(1).max(160),
  phone: z.string().trim().min(7).max(20),
  email: z.preprocess((v) => (v === '' ? null : v), z.string().trim().toLowerCase().email().nullable().optional()),
  type: z.enum(['individual', 'business']).optional(),
  vat_number: vat,
  notes: z.string().trim().max(2000).optional().nullable(),
};
const Create = z.object({ ...CustomerFields, site: z.object(SiteFields).optional().nullable() });
const Patch = z.object(CustomerFields).partial().strict();

const ListQuery = z.object({
  type: z.enum(['individual', 'business']).optional(),
  q: z.string().optional(), limit: z.string().optional(), offset: z.string().optional(),
}).passthrough();

router.get('/', validate({ query: ListQuery }), ah(async (req, res) => {
  const { limit, offset, q } = paging(req.query);
  const p = [req.user.company_id];
  const where = ['c.company_id = $1'];
  if (req.validQuery.type) { p.push(req.validQuery.type); where.push(`c.type = $${p.length}`); }
  if (q) {
    p.push(`%${q}%`);
    const ors = [`c.name ILIKE $${p.length}`, `c.phone ILIKE $${p.length}`, `c.email ILIKE $${p.length}`];
    const digits = q.replace(/[^\d]/g, '');
    if (digits.length >= 4) {
      const norm = normalizePhone(digits);
      p.push(`%${digits.replace(/^0+/, '')}%`); ors.push(`c.phone LIKE $${p.length}`);
      if (norm !== digits) { p.push(`%${norm}%`); ors.push(`c.phone LIKE $${p.length}`); }
    }
    where.push(`(${ors.join(' OR ')})`);
  }
  const w = where.join(' AND ');
  const [items, cnt] = await Promise.all([
    many(
      `SELECT c.id, c.name, c.phone, c.email, c.type, c.vat_number, c.notes, c.created_at,
              (SELECT count(*)::int FROM sites s WHERE s.customer_id = c.id AND s.company_id = c.company_id) AS sites_count,
              (SELECT count(*)::int FROM jobs j WHERE j.customer_id = c.id AND j.company_id = c.company_id) AS jobs_count,
              (SELECT max(COALESCE(j.completed_at, j.scheduled_start, j.created_at)) FROM jobs j
                 WHERE j.customer_id = c.id AND j.company_id = c.company_id) AS last_job_at,
              COALESCE((SELECT sum(i.total) FROM invoices i WHERE i.customer_id = c.id AND i.company_id = c.company_id
                 AND i.status = 'unpaid'), 0) AS balance_due
         FROM customers c WHERE ${w}
        ORDER BY c.created_at DESC, c.name LIMIT $${p.length + 1} OFFSET $${p.length + 2}`,
      [...p, limit, offset]),
    one(`SELECT count(*)::int AS n FROM customers c WHERE ${w}`, p),
  ]);
  res.json({ items, total: cnt.n, limit, offset });
}));

router.post('/', validate({ body: Create }), ah(async (req, res) => {
  const b = req.body;
  const cid = req.user.company_id;
  const out = await tx(async (c) => {
    const { rows } = await c.query(
      `INSERT INTO customers (company_id, name, phone, email, type, vat_number, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING ${CUSTOMER_COLS}`,
      [cid, b.name, normalizePhone(b.phone), b.email ?? null, b.type ?? (b.vat_number ? 'business' : 'individual'),
        b.vat_number ?? null, b.notes ?? null]);
    const cust = rows[0];
    const sites = [];
    if (b.site) {
      const s = b.site;
      const r = await c.query(
        `INSERT INTO sites (company_id, customer_id, label, city, district, address, lat, lng)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING ${SITE_COLS}`,
        [cid, cust.id, s.label ?? null, s.city ?? null, s.district ?? null, s.address ?? null, s.lat ?? null, s.lng ?? null]);
      sites.push(r.rows[0]);
    }
    return { ...cust, sites };
  });
  audit(req.user, 'create', 'customer', out.id);
  res.status(201).json(out);
}));

router.get('/:id', validate({ params: idParam }), ah(async (req, res) => {
  const cid = req.user.company_id;
  const id = req.params.id;
  const cust = await one(`SELECT ${CUSTOMER_COLS} FROM customers WHERE id = $1 AND company_id = $2`, [id, cid]);
  if (!cust) throw notFound('Customer not found');
  const [sites, assets, jobs, invoices, contracts, stats] = await Promise.all([
    many(`SELECT ${SITE_COLS} FROM sites WHERE customer_id = $1 AND company_id = $2 ORDER BY created_at`, [id, cid]),
    many(`SELECT a.id, a.site_id, a.kind, a.brand, a.capacity_btu, a.install_date, a.notes, a.created_at
            FROM assets a JOIN sites s ON s.id = a.site_id
           WHERE s.customer_id = $1 AND a.company_id = $2 ORDER BY a.created_at`, [id, cid]),
    listJobSummaries(null, 'j.company_id = $1 AND j.customer_id = $2', [cid, id],
      'ORDER BY COALESCE(j.scheduled_start, j.created_at) DESC LIMIT 20'),
    many(`SELECT i.id, i.number, i.kind, i.issue_date, i.status, i.job_id, i.contract_id, i.subtotal, i.vat_amount,
                 i.total, i.paid_at, i.payment_method, i.public_token, i.payment_link_url, i.notes,
                 json_build_object('id', c.id, 'name', c.name, 'phone', c.phone, 'vat_number', c.vat_number) AS customer
            FROM invoices i JOIN customers c ON c.id = i.customer_id
           WHERE i.customer_id = $1 AND i.company_id = $2 ORDER BY i.issue_date DESC LIMIT 20`, [id, cid]),
    many(`${CONTRACT_SELECT} WHERE ct.company_id = $1 AND ct.customer_id = $2 ORDER BY ct.start_date DESC`, [cid, id]),
    one(`SELECT
           (SELECT count(*)::int FROM jobs WHERE customer_id = $1 AND company_id = $2) AS jobs_count,
           COALESCE((SELECT sum(total) FROM invoices WHERE customer_id = $1 AND company_id = $2 AND status = 'unpaid'), 0) AS balance_due,
           COALESCE((SELECT sum(total) FROM invoices WHERE customer_id = $1 AND company_id = $2 AND status = 'paid'), 0) AS lifetime_paid`,
      [id, cid]),
  ]);
  const bySite = new Map(sites.map((s) => [s.id, { ...s, assets: [] }]));
  for (const a of assets) bySite.get(a.site_id)?.assets.push(a);
  res.json({ ...cust, ...stats, sites: [...bySite.values()], jobs, invoices, contracts });
}));

router.patch('/:id', validate({ params: idParam, body: Patch }), ah(async (req, res) => {
  const b = { ...req.body };
  if (b.phone) b.phone = normalizePhone(b.phone);
  const keys = Object.keys(b).filter((k) => b[k] !== undefined);
  const row = keys.length
    ? await one(`UPDATE customers SET ${keys.map((k, i) => `${k} = $${i + 1}`).join(', ')}
                  WHERE id = $${keys.length + 1} AND company_id = $${keys.length + 2} RETURNING ${CUSTOMER_COLS}`,
      [...keys.map((k) => b[k]), req.params.id, req.user.company_id])
    : await one(`SELECT ${CUSTOMER_COLS} FROM customers WHERE id = $1 AND company_id = $2`, [req.params.id, req.user.company_id]);
  if (!row) throw notFound('Customer not found');
  if (keys.length) audit(req.user, 'update', 'customer', row.id);
  res.json(row);
}));

router.delete('/:id', requireRole('owner'), validate({ params: idParam }), ah(async (req, res) => {
  const cid = req.user.company_id;
  await tx(async (c) => {
    const { rows } = await c.query('SELECT id FROM customers WHERE id = $1 AND company_id = $2 FOR UPDATE', [req.params.id, cid]);
    if (!rows[0]) throw notFound('Customer not found');
    const used = await c.query(
      `SELECT EXISTS (SELECT 1 FROM jobs WHERE customer_id = $1 AND company_id = $2)
           OR EXISTS (SELECT 1 FROM invoices WHERE customer_id = $1 AND company_id = $2) AS used`, [req.params.id, cid]);
    if (used.rows[0].used) throw conflict('Customer has jobs or invoices and cannot be deleted');
    await c.query('DELETE FROM customers WHERE id = $1 AND company_id = $2', [req.params.id, cid]);
  });
  audit(req.user, 'delete', 'customer', req.params.id);
  res.json({ ok: true });
}));

export default router;
