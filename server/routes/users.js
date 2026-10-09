// /api/users — OWNER: B1. docs/API.md § 3. Owner manages the team; dispatchers can read it.
import { Router } from 'express';
import crypto from 'node:crypto';
import { requireRole, hashPassword, PLAN_LIMITS } from '../lib/auth.js';
import { one, many, tx, audit } from '../lib/db.js';
import { ah, notFound, badRequest, conflict, HttpError } from '../lib/errors.js';
import { validate, z, idParam, normalizePhone } from '../lib/validate.js';

const router = Router();

export const USER_COLS = 'id, name, email, phone, role, locale, skills, color, active, created_at';
const ROLES = ['owner', 'dispatcher', 'technician'];
const PALETTE = ['#2563EB', '#16A34A', '#DB2777', '#EA580C', '#7C3AED', '#0891B2', '#CA8A04', '#DC2626', '#4F46E5', '#059669'];

/** Throws 402 plan_limit (details.code = 'PLAN_LIMIT') if one more active technician would exceed the plan. */
export async function assertTechnicianCapacity(client, companyId) {
  const { rows } = await client.query(
    `SELECT c.plan, (SELECT count(*)::int FROM users u WHERE u.company_id = c.id AND u.role = 'technician' AND u.active) AS n
       FROM companies c WHERE c.id = $1 FOR UPDATE`, [companyId]);
  const { plan, n } = rows[0];
  const limit = (PLAN_LIMITS[plan] || PLAN_LIMITS.trial).technicians;
  if (n + 1 > limit) {
    throw new HttpError(402, 'plan_limit',
      `Your ${plan} plan allows up to ${limit} active technicians. Upgrade to add more.`,
      [{ path: 'role', message: 'PLAN_LIMIT', code: 'PLAN_LIMIT', plan, limit, current: n }]);
  }
}

const tempPassword = () => `Dw-${crypto.randomBytes(5).toString('base64url')}9`;
const color = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'color must be #RRGGBB');
const skills = z.array(z.string().trim().min(1).max(40)).max(20);

const ListQuery = z.object({
  role: z.enum(ROLES).optional(),
  active: z.enum(['true', 'false', 'all']).optional(),
  q: z.string().optional(),
}).passthrough();

router.get('/', requireRole('owner', 'dispatcher'), validate({ query: ListQuery }), ah(async (req, res) => {
  const f = req.validQuery;
  const p = [req.user.company_id];
  const where = ['company_id = $1'];
  if (f.role) { p.push(f.role); where.push(`role = $${p.length}`); }
  if (f.active === 'true' || f.active === 'false') { p.push(f.active === 'true'); where.push(`active = $${p.length}`); }
  if (f.q?.trim()) { p.push(`%${f.q.trim()}%`); where.push(`(name ILIKE $${p.length} OR email ILIKE $${p.length} OR phone ILIKE $${p.length})`); }
  const items = await many(
    `SELECT ${USER_COLS} FROM users WHERE ${where.join(' AND ')}
      ORDER BY active DESC, CASE role WHEN 'owner' THEN 0 WHEN 'dispatcher' THEN 1 ELSE 2 END, name`, p);
  res.json({ items });
}));

router.get('/:id', requireRole('owner', 'dispatcher'), validate({ params: idParam }), ah(async (req, res) => {
  const u = await one(`SELECT ${USER_COLS} FROM users WHERE id = $1 AND company_id = $2`, [req.params.id, req.user.company_id]);
  if (!u) throw notFound('User not found');
  res.json(u);
}));

const CreateUser = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email(),
  phone: z.string().trim().min(7).max(20).optional().nullable(),
  role: z.enum(['dispatcher', 'technician', 'owner']).default('technician'),
  password: z.string().min(8).max(100).optional(),
  locale: z.enum(['ar', 'en']).optional(),
  skills: skills.optional(),
  color: color.optional(),
});

// POST /users — invite. If no password given, a temp password is generated and returned once.
router.post('/', requireRole('owner'), validate({ body: CreateUser }), ah(async (req, res) => {
  const b = req.body;
  const cid = req.user.company_id;
  const password = b.password || tempPassword();
  const hash = await hashPassword(password);
  const user = await tx(async (c) => {
    if (b.role === 'technician') await assertTechnicianCapacity(c, cid);
    const exists = await c.query('SELECT 1 FROM users WHERE email = $1', [b.email]);
    if (exists.rowCount) throw conflict('Email already registered');
    const cnt = await c.query('SELECT count(*)::int AS n FROM users WHERE company_id = $1', [cid]);
    const { rows } = await c.query(
      `INSERT INTO users (company_id, name, email, phone, password_hash, role, locale, skills, color)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING ${USER_COLS}`,
      [cid, b.name, b.email, normalizePhone(b.phone) || null, hash, b.role, b.locale || 'ar', b.skills || [],
        b.color || PALETTE[cnt.rows[0].n % PALETTE.length]]);
    return rows[0];
  });
  audit(req.user, `create:${user.role}`, 'user', user.id);
  res.status(201).json(b.password ? user : { ...user, temp_password: password });
}));

const PatchUser = z.object({
  name: z.string().trim().min(2).max(120).optional(),
  phone: z.string().trim().max(20).optional().nullable(),
  email: z.string().trim().toLowerCase().email().optional(),
  role: z.enum(ROLES).optional(),
  locale: z.enum(['ar', 'en']).optional(),
  skills: skills.optional(),
  color: color.optional(),
  active: z.boolean().optional(),
  password: z.string().min(8).max(100).optional(),
}).strict();

router.patch('/:id', requireRole('owner'), validate({ params: idParam, body: PatchUser }), ah(async (req, res) => {
  const b = req.body;
  const cid = req.user.company_id;
  const self = req.params.id === req.user.id;
  if (self && b.role && b.role !== 'owner') throw badRequest('You cannot demote yourself');
  if (self && b.active === false) throw badRequest('You cannot deactivate yourself');
  const user = await tx(async (c) => {
    const { rows } = await c.query('SELECT * FROM users WHERE id = $1 AND company_id = $2 FOR UPDATE', [req.params.id, cid]);
    const cur = rows[0];
    if (!cur) throw notFound('User not found');
    const nextRole = b.role ?? cur.role;
    const nextActive = b.active ?? cur.active;
    if (nextRole === 'technician' && nextActive && !(cur.role === 'technician' && cur.active)) {
      await assertTechnicianCapacity(c, cid);
    }
    if (cur.role === 'owner' && (nextRole !== 'owner' || !nextActive)) {
      const owners = await c.query(`SELECT count(*)::int AS n FROM users WHERE company_id = $1 AND role = 'owner' AND active`, [cid]);
      if (owners.rows[0].n <= 1) throw conflict('Company must keep at least one active owner');
    }
    if (b.email && b.email !== cur.email) {
      const ex = await c.query('SELECT 1 FROM users WHERE email = $1 AND id <> $2', [b.email, cur.id]);
      if (ex.rowCount) throw conflict('Email already registered');
    }
    const sets = [];
    const p = [];
    const set = (col, v) => { p.push(v); sets.push(`${col} = $${p.length}`); };
    for (const k of ['name', 'email', 'role', 'locale', 'skills', 'color', 'active']) if (b[k] !== undefined) set(k, b[k]);
    if (b.phone !== undefined) set('phone', normalizePhone(b.phone) || null);
    if (b.password) set('password_hash', await hashPassword(b.password));
    if (!sets.length) {
      return (await c.query(`SELECT ${USER_COLS} FROM users WHERE id = $1`, [cur.id])).rows[0];
    }
    p.push(cur.id, cid);
    const r = await c.query(`UPDATE users SET ${sets.join(', ')} WHERE id = $${p.length - 1} AND company_id = $${p.length} RETURNING ${USER_COLS}`, p);
    return r.rows[0];
  });
  const sensitive = ['role', 'active', 'password', 'email'].filter((k) => b[k] !== undefined);
  audit(req.user, sensitive.length ? `update:${sensitive.join(',')}` : 'update', 'user', user.id);
  res.json(user);
}));

router.delete('/:id', requireRole('owner'), validate({ params: idParam }), ah(async (req, res) => {
  if (req.params.id === req.user.id) throw badRequest('You cannot deactivate yourself');
  const cid = req.user.company_id;
  await tx(async (c) => {
    const { rows } = await c.query('SELECT role, active FROM users WHERE id = $1 AND company_id = $2 FOR UPDATE', [req.params.id, cid]);
    if (!rows[0]) throw notFound('User not found');
    if (rows[0].role === 'owner') {
      const owners = await c.query(`SELECT count(*)::int AS n FROM users WHERE company_id = $1 AND role = 'owner' AND active`, [cid]);
      if (owners.rows[0].n <= 1) throw conflict('Company must keep at least one active owner');
    }
    await c.query('UPDATE users SET active = false WHERE id = $1 AND company_id = $2', [req.params.id, cid]);
  });
  audit(req.user, 'deactivate', 'user', req.params.id);
  res.json({ ok: true });
}));

export default router;
