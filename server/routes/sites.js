// /api/sites — OWNER: B1. docs/API.md § 4.
import { Router } from 'express';
import { requireRole } from '../lib/auth.js';
import { one, many, audit } from '../lib/db.js';
import { ah, notFound, HttpError } from '../lib/errors.js';
import { validate, z, idParam } from '../lib/validate.js';

const router = Router();
router.use(requireRole('owner', 'dispatcher'));

const COLS = 'id, customer_id, label, city, district, address, lat, lng, created_at';
const Fields = {
  label: z.string().trim().max(120).optional().nullable(),
  city: z.string().trim().max(60).optional().nullable(),
  district: z.string().trim().max(80).optional().nullable(),
  address: z.string().trim().max(300).optional().nullable(),
  lat: z.coerce.number().min(-90).max(90).optional().nullable(),
  lng: z.coerce.number().min(-180).max(180).optional().nullable(),
};

router.get('/', validate({ query: z.object({ customer_id: z.string().uuid().optional() }).passthrough() }), ah(async (req, res) => {
  const p = [req.user.company_id];
  let where = 's.company_id = $1';
  if (req.validQuery.customer_id) { p.push(req.validQuery.customer_id); where += ' AND s.customer_id = $2'; }
  const items = await many(
    `SELECT s.id, s.customer_id, s.label, s.city, s.district, s.address, s.lat, s.lng, s.created_at,
            (SELECT count(*)::int FROM assets a WHERE a.site_id = s.id AND a.company_id = s.company_id) AS assets_count
       FROM sites s WHERE ${where} ORDER BY s.created_at LIMIT 500`, p);
  res.json({ items });
}));

router.get('/:id', validate({ params: idParam }), ah(async (req, res) => {
  const s = await one(`SELECT ${COLS} FROM sites WHERE id = $1 AND company_id = $2`, [req.params.id, req.user.company_id]);
  if (!s) throw notFound('Site not found');
  const assets = await many(
    'SELECT id, site_id, kind, brand, capacity_btu, install_date, notes, created_at FROM assets WHERE site_id = $1 AND company_id = $2 ORDER BY created_at',
    [s.id, req.user.company_id]);
  res.json({ ...s, assets });
}));

router.post('/', validate({ body: z.object({ customer_id: z.string().uuid(), ...Fields }) }), ah(async (req, res) => {
  const b = req.body;
  const cid = req.user.company_id;
  const cust = await one('SELECT id FROM customers WHERE id = $1 AND company_id = $2', [b.customer_id, cid]);
  if (!cust) throw new HttpError(400, 'bad_reference', 'customer not found');
  const row = await one(
    `INSERT INTO sites (company_id, customer_id, label, city, district, address, lat, lng)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING ${COLS}`,
    [cid, b.customer_id, b.label ?? null, b.city ?? null, b.district ?? null, b.address ?? null, b.lat ?? null, b.lng ?? null]);
  audit(req.user, 'create', 'site', row.id);
  res.status(201).json(row);
}));

router.patch('/:id', validate({ params: idParam, body: z.object(Fields).strict() }), ah(async (req, res) => {
  const keys = Object.keys(req.body).filter((k) => req.body[k] !== undefined);
  const row = keys.length
    ? await one(`UPDATE sites SET ${keys.map((k, i) => `${k} = $${i + 1}`).join(', ')}
                  WHERE id = $${keys.length + 1} AND company_id = $${keys.length + 2} RETURNING ${COLS}`,
      [...keys.map((k) => req.body[k]), req.params.id, req.user.company_id])
    : await one(`SELECT ${COLS} FROM sites WHERE id = $1 AND company_id = $2`, [req.params.id, req.user.company_id]);
  if (!row) throw notFound('Site not found');
  if (keys.length) audit(req.user, 'update', 'site', row.id);
  res.json(row);
}));

router.delete('/:id', validate({ params: idParam }), ah(async (req, res) => {
  const row = await one('DELETE FROM sites WHERE id = $1 AND company_id = $2 RETURNING id', [req.params.id, req.user.company_id]);
  if (!row) throw notFound('Site not found');
  audit(req.user, 'delete', 'site', row.id);
  res.json({ ok: true });
}));

export default router;
