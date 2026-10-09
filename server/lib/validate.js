// zod-based validation helpers.
// Usage: router.post('/', validate({ body: CustomerSchema }), handler) → req.body is parsed/coerced.
import { z } from 'zod';
import { badRequest } from './errors.js';

export { z };

export function validate({ body, query, params } = {}) {
  return (req, _res, next) => {
    try {
      if (params) req.params = parse(params, req.params, 'params');
      if (query) req.validQuery = parse(query, req.query, 'query'); // req.query is a getter in some setups
      if (body) req.body = parse(body, req.body ?? {}, 'body');
      next();
    } catch (e) {
      next(e);
    }
  };
}

function parse(schema, data, where) {
  const r = schema.safeParse(data);
  if (!r.success) {
    const details = r.error.issues.map((i) => ({ path: [where, ...i.path].join('.'), message: i.message }));
    throw badRequest(`Invalid ${where}: ${details.map((d) => `${d.path} ${d.message}`).join('; ')}`, details);
  }
  return r.data;
}

// Common reusable schemas
export const uuid = z.string().uuid();
export const idParam = z.object({ id: z.string().uuid() });
export const phone = z.string().trim().min(7).max(20); // normalize with normalizePhone()
export const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'expected YYYY-MM-DD')
  .refine((s) => { const d = new Date(`${s}T00:00:00Z`); return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s; }, 'invalid date');
export const isoDateTime = z.string().datetime({ offset: true });
export const moneyNum = z.coerce.number().min(0).transform((n) => Math.round(n * 100) / 100);
export const optStr = z.string().trim().max(2000).optional().nullable();

/** Normalize a Saudi mobile to E.164-ish '9665XXXXXXXX'. Leaves other formats trimmed. */
export function normalizePhone(p) {
  if (!p) return p;
  let d = String(p).replace(/[^\d]/g, '');
  if (d.startsWith('00')) d = d.slice(2);
  if (d.startsWith('05') && d.length === 10) d = '966' + d.slice(1);
  if (d.startsWith('5') && d.length === 9) d = '966' + d;
  return d;
}
