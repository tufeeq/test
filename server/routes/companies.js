// /api/companies — OWNER: B1. docs/API.md § 2.
import { Router } from 'express';
import { requireAuth, requireRole, PLAN_LIMITS } from '../lib/auth.js';
import { one, audit } from '../lib/db.js';
import { ah, notFound, conflict, HttpError } from '../lib/errors.js';
import { validate, z, normalizePhone } from '../lib/validate.js';

const router = Router();

const COMPANY_COLS = `id, slug, name, name_ar, vat_number, cr_number, phone, city, address, logo_url,
  plan, trial_ends_at, subscription_status, created_at`;

export const RESERVED_SLUGS = new Set(['app', 'api', 'admin', 'tech', 'www', 'b', 't', 'i', 'login', 'signup', 'pricing', 'dawra']);

/** Saudi VAT: 15 digits, starts and ends with 3. */
export const isValidVat = (v) => /^3\d{13}3$/.test(v);

async function companyPayload(companyId) {
  const c = await one(`SELECT ${COMPANY_COLS} FROM companies WHERE id = $1`, [companyId]);
  if (!c) throw notFound('Company not found');
  const usage = await one(
    `SELECT count(*) FILTER (WHERE role = 'technician' AND active)::int AS technicians,
            count(*) FILTER (WHERE active)::int AS users
       FROM users WHERE company_id = $1`, [companyId]);
  return {
    ...c,
    booking_url: `/b/${c.slug}`,
    limits: { technicians: (PLAN_LIMITS[c.plan] || PLAN_LIMITS.trial).technicians },
    usage,
  };
}

router.get('/me', requireAuth, ah(async (req, res) => {
  res.json(await companyPayload(req.user.company_id));
}));

const emptyToNull = (s) => (typeof s === 'string' && s.trim() === '' ? null : s);
const nstr = (max) => z.preprocess(emptyToNull, z.string().trim().max(max).nullable().optional());

const PatchCompany = z.object({
  name: z.string().trim().min(2).max(120).optional(),
  name_ar: nstr(120),
  vat_number: z.preprocess(
    (v) => (typeof v === 'string' ? (v.replace(/\s/g, '') || null) : v),
    z.string().refine(isValidVat, 'VAT number must be 15 digits starting and ending with 3').nullable().optional()),
  cr_number: z.preprocess(
    (v) => (typeof v === 'string' ? (v.replace(/\s/g, '') || null) : v),
    z.string().regex(/^\d{10}$/, 'CR number must be 10 digits').nullable().optional()),
  phone: nstr(20),
  city: nstr(60),
  address: nstr(300),
  logo_url: z.preprocess(emptyToNull, z.string()
    .regex(/^data:image\/(png|jpeg|jpg|webp|svg\+xml);base64,[A-Za-z0-9+/=\s]+$/, 'logo must be an image data URL')
    .nullable().optional()),
  slug: z.string().trim().toLowerCase()
    .regex(/^[a-z0-9](?:[a-z0-9-]{1,38}[a-z0-9])$/, 'slug: 3–40 chars, a-z 0-9 and -')
    .refine((s) => !RESERVED_SLUGS.has(s), 'slug is reserved').optional(),
}).strict();

router.patch('/me', requireRole('owner'), validate({ body: PatchCompany }), ah(async (req, res) => {
  const b = req.body;
  const cid = req.user.company_id;
  if (b.logo_url && b.logo_url.length > 300 * 1024) throw new HttpError(413, 'too_large', 'Logo exceeds 300 KB');
  if (b.slug) {
    const taken = await one('SELECT 1 FROM companies WHERE slug = $1 AND id <> $2', [b.slug, cid]);
    if (taken) throw conflict('Slug already taken');
  }
  if (b.phone) b.phone = normalizePhone(b.phone);
  const keys = Object.keys(b).filter((k) => b[k] !== undefined);
  if (keys.length) {
    const sets = keys.map((k, i) => `${k} = $${i + 1}`);
    await one(`UPDATE companies SET ${sets.join(', ')} WHERE id = $${keys.length + 1} RETURNING id`,
      [...keys.map((k) => b[k]), cid]);
    audit(req.user, `update:${keys.join(',')}`, 'company', cid);
  }
  res.json(await companyPayload(cid));
}));

export default router;
