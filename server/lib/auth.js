// Session auth: JWT in httpOnly cookie `dawra_session`.
// req.user = { id, company_id, role, name, email, locale }
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { one } from './db.js';
import { unauthorized, forbidden } from './errors.js';

export const COOKIE_NAME = 'dawra_session';
const SECRET = process.env.JWT_SECRET || 'dev-insecure-secret-change-me';
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

if (process.env.NODE_ENV === 'production' && (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 16)) {
  // Refuse to boot: a missing/short secret would let anyone forge session cookies.
  console.error('[auth] JWT_SECRET must be set (>= 16 chars) in production. Refusing to start.');
  process.exit(1);
}

export const hashPassword = (pw) => bcrypt.hash(pw, 10);
export const checkPassword = (pw, hash) => (hash ? bcrypt.compare(pw, hash) : Promise.resolve(false));

export function signSession(user) {
  return jwt.sign({ sub: user.id, cid: user.company_id, role: user.role }, SECRET, { expiresIn: '30d' });
}

/** Set the session cookie on res for the given user row. */
export function setSessionCookie(res, user) {
  res.cookie(COOKIE_NAME, signSession(user), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: MAX_AGE_MS,
    path: '/',
  });
}

export function clearSessionCookie(res) {
  res.clearCookie(COOKIE_NAME, { path: '/' });
}

/**
 * Soft auth: if a valid cookie is present, attaches req.user; never errors.
 * Mounted globally in server/index.js.
 */
export async function loadUser(req, _res, next) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return next();
  try {
    const payload = jwt.verify(token, SECRET);
    const user = await one(
      'SELECT id, company_id, role, name, email, locale FROM users WHERE id = $1 AND active = true',
      [payload.sub]
    );
    if (user) req.user = user;
  } catch {
    /* invalid/expired token → anonymous */
  }
  next();
}

/** Hard auth: 401 unless signed in. */
export function requireAuth(req, _res, next) {
  if (!req.user) return next(unauthorized());
  next();
}

/** requireRole('owner','dispatcher') — implies requireAuth. */
export function requireRole(...roles) {
  return (req, _res, next) => {
    if (!req.user) return next(unauthorized());
    if (!roles.includes(req.user.role)) return next(forbidden());
    next();
  };
}

/** Plan → max active technicians. trial behaves like 'pro'. */
export const PLAN_LIMITS = {
  trial: { technicians: 10, price: 0 },
  starter: { technicians: 3, price: 149 },
  pro: { technicians: 10, price: 449 },
  business: { technicians: 25, price: 999 },
};
