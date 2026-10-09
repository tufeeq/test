// /api/assets — OWNER: B1. docs/API.md § 4. Technicians may list/add assets (on sites of their jobs).
import { Router } from 'express';
import { requireAuth, requireRole } from '../lib/auth.js';
import { one, many, audit } from '../lib/db.js';
import { ah, notFound, HttpError } from '../lib/errors.js';
import { validate, z, idParam, isoDate } from '../lib/validate.js';

const router = Router();
const COLS = 'id, site_id, kind, brand, capacity_btu, install_date, notes, created_at';
const KINDS = ['split_ac', 'central_ac', 'window_ac', 'cold_room', 'other'];
const Fields = {
  kind: z.enum(KINDS).optional(),
  brand: z.string().trim().max(80).optional().nullable(),
  capacity_btu: z.coerce.number().int().min(0).max(10_000_000).optional().nullable(),
  install_date: isoDate.optional().nullable(),
  notes: z.string().trim().max(2000).optional().nullable(),
};

/** Technicians may only touch sites that have a job assigned to them. */
async function techCanSeeSite(user, siteId) {
  if (user.role !== 'technician') return true;
  return Boolean(await one('SELECT 1 FROM jobs WHERE site_id = $1 AND company_id = $2 AND technician_id = $3 LIMIT 1',
    [siteId, user.company_id, user.id]));
}

router.get('/', requireAuth, validate({ query: z.object({ site_id: z.string().uuid().optional() }).passthrough() }), ah(async (req, res) => {
  const { site_id } = req.validQuery;
  if (req.user.role === 'technician') {
    if (!site_id || !(await techCanSeeSite(req.user, site_id))) return res.json({ items: [] });
  }
  const p = [req.user.company_id];
  let where = 'company_id = $1';
  if (site_id) { p.push(site_id); where += ' AND site_id = $2'; }
  res.json({ items: await many(`SELECT ${COLS} FROM assets WHERE ${where} ORDER BY created_at LIMIT 500`, p) });
}));

router.post('/', requireAuth, validate({ body: z.object({ site_id: z.string().uuid(), ...Fields }) }), ah(async (req, res) => {
  const b = req.body;
  const cid = req.user.company_id;
  const site = await one('SELECT id FROM sites WHERE id = $1 AND company_id = $2', [b.site_id, cid]);
  if (!site || !(await techCanSeeSite(req.user, b.site_id))) throw new HttpError(400, 'bad_reference', 'site not found');
  const row = await one(
    `INSERT INTO assets (company_id, site_id, kind, brand, capacity_btu, install_date, notes)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING ${COLS}`,
    [cid, b.site_id, b.kind ?? 'other', b.brand ?? null, b.capacity_btu ?? null, b.install_date ?? null, b.notes ?? null]);
  audit(req.user, 'create', 'asset', row.id);
  res.status(201).json(row);
}));

router.patch('/:id', requireRole('owner', 'dispatcher'), validate({ params: idParam, body: z.object(Fields).strict() }), ah(async (req, res) => {
  const keys = Object.keys(req.body).filter((k) => req.body[k] !== undefined);
  const row = keys.length
    ? await one(`UPDATE assets SET ${keys.map((k, i) => `${k} = $${i + 1}`).join(', ')}
                  WHERE id = $${keys.length + 1} AND company_id = $${keys.length + 2} RETURNING ${COLS}`,
      [...keys.map((k) => req.body[k]), req.params.id, req.user.company_id])
    : await one(`SELECT ${COLS} FROM assets WHERE id = $1 AND company_id = $2`, [req.params.id, req.user.company_id]);
  if (!row) throw notFound('Asset not found');
  if (keys.length) audit(req.user, 'update', 'asset', row.id);
  res.json(row);
}));

router.delete('/:id', requireRole('owner', 'dispatcher'), validate({ params: idParam }), ah(async (req, res) => {
  const row = await one('DELETE FROM assets WHERE id = $1 AND company_id = $2 RETURNING id', [req.params.id, req.user.company_id]);
  if (!row) throw notFound('Asset not found');
  audit(req.user, 'delete', 'asset', row.id);
  res.json({ ok: true });
}));

export default router;
