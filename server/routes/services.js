// /api/services — OWNER: B1. docs/API.md § 5 (price list).
import { Router } from 'express';
import { requireAuth, requireRole } from '../lib/auth.js';
import { one, many, audit } from '../lib/db.js';
import { ah, notFound } from '../lib/errors.js';
import { validate, z, idParam, moneyNum } from '../lib/validate.js';

const router = Router();
const COLS = 'id, name, name_ar, category, price, duration_min, taxable, active, created_at';

router.get('/', requireAuth, validate({
  query: z.object({ active: z.enum(['true', 'false', 'all']).optional(), category: z.string().optional(), q: z.string().optional() }).passthrough(),
}), ah(async (req, res) => {
  const f = req.validQuery;
  const p = [req.user.company_id];
  const where = ['company_id = $1'];
  if (f.active === 'true' || f.active === 'false') { p.push(f.active === 'true'); where.push(`active = $${p.length}`); }
  if (f.category) { p.push(f.category); where.push(`category = $${p.length}`); }
  if (f.q?.trim()) { p.push(`%${f.q.trim()}%`); where.push(`(name ILIKE $${p.length} OR name_ar ILIKE $${p.length})`); }
  const items = await many(`SELECT ${COLS} FROM services WHERE ${where.join(' AND ')} ORDER BY category NULLS LAST, name`, p);
  res.json({ items });
}));

const Fields = {
  name: z.string().trim().min(1).max(160),
  name_ar: z.string().trim().max(160).optional().nullable(),
  category: z.string().trim().max(60).optional().nullable(),
  price: moneyNum.refine((n) => n <= 10_000_000, 'price too large'),
  duration_min: z.coerce.number().int().min(5).max(24 * 60).optional(),
  taxable: z.boolean().optional(),
  active: z.boolean().optional(),
};
const Create = z.object(Fields);
const Patch = z.object(Fields).partial().strict();

router.post('/', requireRole('owner', 'dispatcher'), validate({ body: Create }), ah(async (req, res) => {
  const b = req.body;
  const row = await one(
    `INSERT INTO services (company_id, name, name_ar, category, price, duration_min, taxable, active)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING ${COLS}`,
    [req.user.company_id, b.name, b.name_ar ?? null, b.category ?? null, b.price, b.duration_min ?? 60, b.taxable ?? true, b.active ?? true]);
  audit(req.user, 'create', 'service', row.id);
  res.status(201).json(row);
}));

router.patch('/:id', requireRole('owner', 'dispatcher'), validate({ params: idParam, body: Patch }), ah(async (req, res) => {
  const keys = Object.keys(req.body).filter((k) => req.body[k] !== undefined);
  let row;
  if (!keys.length) {
    row = await one(`SELECT ${COLS} FROM services WHERE id = $1 AND company_id = $2`, [req.params.id, req.user.company_id]);
  } else {
    row = await one(
      `UPDATE services SET ${keys.map((k, i) => `${k} = $${i + 1}`).join(', ')}
        WHERE id = $${keys.length + 1} AND company_id = $${keys.length + 2} RETURNING ${COLS}`,
      [...keys.map((k) => req.body[k]), req.params.id, req.user.company_id]);
  }
  if (!row) throw notFound('Service not found');
  if (keys.length) audit(req.user, 'update', 'service', row.id);
  res.json(row);
}));

router.delete('/:id', requireRole('owner'), validate({ params: idParam }), ah(async (req, res) => {
  const row = await one('UPDATE services SET active = false WHERE id = $1 AND company_id = $2 RETURNING id',
    [req.params.id, req.user.company_id]);
  if (!row) throw notFound('Service not found');
  audit(req.user, 'delete', 'service', row.id);
  res.json({ ok: true });
}));

export default router;
