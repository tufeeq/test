// /api/booking-requests — OWNER: B1 (app side). docs/API.md § 9.
import { Router } from 'express';
import { requireRole } from '../lib/auth.js';
import { one, many, tx, paging, audit } from '../lib/db.js';
import { ah, notFound, conflict } from '../lib/errors.js';
import { validate, z, idParam, normalizePhone } from '../lib/validate.js';
import { insertJob, getJobDetail, notifyJobSafe } from './jobs.js';

const router = Router();
router.use(requireRole('owner', 'dispatcher'));

const COLS = 'id, name, phone, city, district, category, description, preferred_date, ai_triage, status, job_id, created_at';

router.get('/', validate({
  query: z.object({ status: z.enum(['pending', 'converted', 'rejected', 'all']).optional() }).passthrough(),
}), ah(async (req, res) => {
  const { limit, offset, q } = paging(req.query);
  const p = [req.user.company_id];
  const where = ['company_id = $1'];
  const st = req.validQuery.status;
  if (st && st !== 'all') { p.push(st); where.push(`status = $${p.length}`); }
  if (q) { p.push(`%${q}%`); where.push(`(name ILIKE $${p.length} OR phone ILIKE $${p.length} OR description ILIKE $${p.length})`); }
  const w = where.join(' AND ');
  const [items, cnt] = await Promise.all([
    many(`SELECT ${COLS} FROM booking_requests WHERE ${w}
          ORDER BY (status = 'pending') DESC, created_at DESC LIMIT $${p.length + 1} OFFSET $${p.length + 2}`, [...p, limit, offset]),
    one(`SELECT count(*)::int AS n FROM booking_requests WHERE ${w}`, p),
  ]);
  res.json({ items, total: cnt.n, limit, offset });
}));

router.get('/:id', validate({ params: idParam }), ah(async (req, res) => {
  const row = await one(`SELECT ${COLS} FROM booking_requests WHERE id = $1 AND company_id = $2`, [req.params.id, req.user.company_id]);
  if (!row) throw notFound('Booking request not found');
  res.json(row);
}));

const ConvertBody = z.object({
  technician_id: z.string().uuid().nullable().optional(),
  scheduled_start: z.string().refine((s) => !Number.isNaN(Date.parse(s)), 'expected ISO date/time').nullable().optional(),
  scheduled_end: z.string().refine((s) => !Number.isNaN(Date.parse(s)), 'expected ISO date/time').nullable().optional(),
  title: z.string().trim().min(1).max(200).optional(),
  description: z.string().trim().max(5000).optional(),
  priority: z.enum(['low', 'normal', 'urgent']).optional(),
  category: z.string().trim().max(60).optional(),
  customer_id: z.string().uuid().optional(),
  site_id: z.string().uuid().optional(),
  items: z.array(z.object({
    service_id: z.string().uuid().nullable().optional(),
    description: z.string().trim().max(500).optional().nullable(),
    qty: z.coerce.number().positive().max(100000).optional().default(1),
    unit_price: z.coerce.number().min(0).optional(),
  })).max(100).optional(),
}).strict();

router.post('/:id/convert', validate({ params: idParam, body: ConvertBody }), ah(async (req, res) => {
  const cid = req.user.company_id;
  const b = req.body;
  const created = await tx(async (c) => {
    const { rows } = await c.query('SELECT * FROM booking_requests WHERE id = $1 AND company_id = $2 FOR UPDATE', [req.params.id, cid]);
    const br = rows[0];
    if (!br) throw notFound('Booking request not found');
    if (br.status !== 'pending') throw conflict(`Booking request is already ${br.status}`);
    const phone = normalizePhone(br.phone);

    // Customer: explicit, else find by phone, else create.
    let customerId = b.customer_id;
    if (customerId) {
      const ok = await c.query('SELECT 1 FROM customers WHERE id = $1 AND company_id = $2', [customerId, cid]);
      if (!ok.rowCount) throw notFound('Customer not found');
    } else {
      const found = await c.query('SELECT id FROM customers WHERE company_id = $1 AND phone = $2 ORDER BY created_at LIMIT 1', [cid, phone]);
      customerId = found.rows[0]?.id;
      if (!customerId) {
        const ins = await c.query(
          `INSERT INTO customers (company_id, name, phone, type, notes) VALUES ($1,$2,$3,'individual',$4) RETURNING id`,
          [cid, br.name, phone, 'أُنشئ من طلب حجز إلكتروني']);
        customerId = ins.rows[0].id;
      }
    }
    // Site: explicit, else reuse one matching district/city, else create.
    let siteId = b.site_id;
    if (!siteId) {
      const s = await c.query(
        `SELECT id FROM sites WHERE company_id = $1 AND customer_id = $2
            AND COALESCE(district,'') = COALESCE($3,'') AND COALESCE(city,'') = COALESCE($4,'') LIMIT 1`,
        [cid, customerId, br.district, br.city]);
      siteId = s.rows[0]?.id;
      if (!siteId && (br.city || br.district)) {
        const ins = await c.query(
          `INSERT INTO sites (company_id, customer_id, label, city, district) VALUES ($1,$2,$3,$4,$5) RETURNING id`,
          [cid, customerId, 'المنزل', br.city, br.district]);
        siteId = ins.rows[0].id;
      }
    }
    const tri = br.ai_triage || {};
    let items = b.items;
    if (!items && Array.isArray(tri.suggested_services) && tri.suggested_services.length) {
      const sv = await c.query(
        'SELECT id FROM services WHERE company_id = $1 AND active AND (name_ar = ANY($2) OR name = ANY($2))',
        [cid, tri.suggested_services]);
      items = sv.rows.map((r) => ({ service_id: r.id, qty: 1 }));
    }
    const job = await insertJob(c, cid, req.user.id, {
      customer_id: customerId,
      site_id: siteId ?? null,
      title: b.title || tri.title || (br.description || 'طلب صيانة').slice(0, 60),
      description: b.description ?? br.description,
      category: b.category ?? br.category ?? tri.category ?? null,
      priority: b.priority ?? (['low', 'normal', 'urgent'].includes(tri.priority) ? tri.priority : 'normal'),
      source: 'portal',
      technician_id: b.technician_id ?? null,
      scheduled_start: b.scheduled_start ?? null,
      scheduled_end: b.scheduled_end ?? undefined,
      items: items || [],
      notes: br.preferred_date ? `التاريخ المفضل للعميل: ${br.preferred_date}` : null,
    });
    await c.query(`UPDATE booking_requests SET status = 'converted', job_id = $1 WHERE id = $2 AND company_id = $3`, [job.id, br.id, cid]);
    return job;
  });
  audit(req.user, 'convert', 'booking_request', req.params.id);
  if (created.status === 'scheduled') await notifyJobSafe(created.id, 'job_scheduled');
  res.status(201).json({ ...(await getJobDetail(null, cid, created.id)), warnings: created.warnings });
}));

router.post('/:id/reject', validate({ params: idParam, body: z.object({ reason: z.string().max(500).optional() }).passthrough() }), ah(async (req, res) => {
  const row = await one(
    `UPDATE booking_requests SET status = 'rejected' WHERE id = $1 AND company_id = $2 AND status = 'pending' RETURNING id`,
    [req.params.id, req.user.company_id]);
  if (!row) {
    const exists = await one('SELECT status FROM booking_requests WHERE id = $1 AND company_id = $2', [req.params.id, req.user.company_id]);
    if (!exists) throw notFound('Booking request not found');
    throw conflict(`Booking request is already ${exists.status}`);
  }
  audit(req.user, 'reject', 'booking_request', row.id);
  res.json({ ok: true });
}));

export default router;
