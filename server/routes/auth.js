// /api/auth — OWNER: B1. Implemented by architect so every builder can log in on day one.
// B1 may extend (password reset, invite acceptance) but must keep these shapes.
import { Router } from 'express';
import { one, tx, audit } from '../lib/db.js';
import { ah, unauthorized, conflict, badRequest } from '../lib/errors.js';
import { validate, z, normalizePhone } from '../lib/validate.js';
import { hashPassword, checkPassword, setSessionCookie, clearSessionCookie, requireAuth } from '../lib/auth.js';

const router = Router();

/** Public shape of the session — GET /api/auth/me returns exactly this. */
export async function sessionPayload(userId) {
  return one(
    `SELECT json_build_object(
       'user', json_build_object('id', u.id, 'name', u.name, 'email', u.email, 'phone', u.phone,
                                 'role', u.role, 'locale', u.locale, 'color', u.color),
       'company', json_build_object('id', c.id, 'slug', c.slug, 'name', c.name, 'name_ar', c.name_ar,
                                    'plan', c.plan, 'subscription_status', c.subscription_status,
                                    'trial_ends_at', c.trial_ends_at, 'logo_url', c.logo_url,
                                    'vat_number', c.vat_number)
     ) AS s
     FROM users u JOIN companies c ON c.id = u.company_id WHERE u.id = $1`,
    [userId]
  ).then((r) => r?.s ?? null);
}

export function slugify(input) {
  const base = String(input || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 30);
  return base || 'co';
}

const SignupSchema = z.object({
  company_name: z.string().trim().min(2).max(120),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email(),
  phone: z.string().trim().min(7).max(20).optional(),
  password: z.string().min(8).max(100),
  city: z.string().trim().max(60).optional(),
  locale: z.enum(['ar', 'en']).default('ar'),
});

router.post('/signup', validate({ body: SignupSchema }), ah(async (req, res) => {
  const b = req.body;
  if (await one('SELECT 1 FROM users WHERE email = $1', [b.email])) throw conflict('Email already registered');
  const hash = await hashPassword(b.password);
  const user = await tx(async (c) => {
    let slug = slugify(b.company_name);
    const taken = await c.query('SELECT 1 FROM companies WHERE slug = $1', [slug]);
    if (taken.rowCount || slug === 'co') slug = `${slug}-${Math.random().toString(36).slice(2, 7)}`;
    const isArabic = /[؀-ۿ]/.test(b.company_name);
    const co = await c.query(
      `INSERT INTO companies (slug, name, name_ar, phone, city) VALUES ($1,$2,$3,$4,$5) RETURNING id`,
      [slug, b.company_name, isArabic ? b.company_name : null, normalizePhone(b.phone) || null, b.city || null]
    );
    const u = await c.query(
      `INSERT INTO users (company_id, name, email, phone, password_hash, role, locale, color)
       VALUES ($1,$2,$3,$4,$5,'owner',$6,'#0F5C5C') RETURNING id, company_id, role`,
      [co.rows[0].id, b.name, b.email, normalizePhone(b.phone) || null, hash, b.locale]
    );
    await c.query(`INSERT INTO audit_log (company_id, user_id, action, entity, entity_id) VALUES ($1,$2,'signup','company',$1)`,
      [co.rows[0].id, u.rows[0].id]);
    return u.rows[0];
  });
  setSessionCookie(res, user);
  res.status(201).json(await sessionPayload(user.id));
}));

const LoginSchema = z.object({ email: z.string().trim().toLowerCase().email(), password: z.string().min(1) });

router.post('/login', validate({ body: LoginSchema }), ah(async (req, res) => {
  const u = await one('SELECT id, company_id, role, password_hash, active FROM users WHERE email = $1', [req.body.email]);
  if (!u || !u.active || !(await checkPassword(req.body.password, u.password_hash))) {
    throw unauthorized('Invalid email or password');
  }
  setSessionCookie(res, u);
  res.json(await sessionPayload(u.id));
}));

router.post('/logout', (_req, res) => {
  clearSessionCookie(res);
  res.json({ ok: true });
});

router.get('/me', requireAuth, ah(async (req, res) => {
  res.json(await sessionPayload(req.user.id));
}));

const PatchMe = z.object({
  name: z.string().trim().min(2).max(120).optional(),
  phone: z.string().trim().max(20).optional().nullable(),
  locale: z.enum(['ar', 'en']).optional(),
  password: z.string().min(8).max(100).optional(),
  current_password: z.string().optional(),
}).strict();

router.patch('/me', requireAuth, validate({ body: PatchMe }), ah(async (req, res) => {
  const b = req.body;
  const sets = [];
  const p = [];
  const set = (col, v) => { p.push(v); sets.push(`${col} = $${p.length}`); };
  if (b.name !== undefined) set('name', b.name);
  if (b.phone !== undefined) set('phone', normalizePhone(b.phone) || null);
  if (b.locale !== undefined) set('locale', b.locale);
  if (b.password) {
    const u = await one('SELECT password_hash FROM users WHERE id = $1', [req.user.id]);
    if (!b.current_password || !(await checkPassword(b.current_password, u?.password_hash))) {
      throw badRequest('Current password is incorrect', [{ path: 'body.current_password', message: 'incorrect' }]);
    }
    set('password_hash', await hashPassword(b.password));
  }
  if (sets.length) {
    p.push(req.user.id, req.user.company_id);
    await one(`UPDATE users SET ${sets.join(', ')} WHERE id = $${p.length - 1} AND company_id = $${p.length} RETURNING id`, p);
    if (b.password) audit(req.user, 'password_change', 'user', req.user.id);
  }
  res.json(await sessionPayload(req.user.id));
}));

export default router;
