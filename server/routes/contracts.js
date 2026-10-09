// /api/contracts — OWNER: B1. docs/API.md § 8 + POST /contracts/:id/generate-visits.
// Exports: CONTRACT_SELECT, computeVisitDates (pure), generateContractVisits(client, companyId, actorId, contractId, opts)
import { Router } from 'express';
import { requireRole } from '../lib/auth.js';
import { one, many, tx, paging, audit } from '../lib/db.js';
import { ah, notFound, badRequest, conflict, HttpError } from '../lib/errors.js';
import { validate, z, idParam, isoDate, moneyNum } from '../lib/validate.js';
import { listJobSummaries, insertJob, notifyJobSafe } from './jobs.js';

const router = Router();
router.use(requireRole('owner', 'dispatcher'));

export const CONTRACT_SELECT = `
  SELECT ct.id, ct.title, ct.start_date, ct.end_date, ct.visits_per_year, ct.price, ct.status,
         ct.next_visit_date, ct.notes, ct.created_at, ct.customer_id, ct.site_id,
         json_build_object('id', c.id, 'name', c.name, 'phone', c.phone) AS customer,
         CASE WHEN s.id IS NULL THEN NULL ELSE json_build_object('id', s.id, 'customer_id', s.customer_id, 'label', s.label,
              'city', s.city, 'district', s.district, 'address', s.address, 'lat', s.lat, 'lng', s.lng) END AS site,
         (SELECT count(*)::int FROM jobs j WHERE j.contract_id = ct.id AND j.company_id = ct.company_id AND j.status = 'completed') AS visits_done,
         (SELECT count(*)::int FROM jobs j WHERE j.contract_id = ct.id AND j.company_id = ct.company_id
             AND j.status IN ('new','scheduled','on_the_way','in_progress')) AS visits_open
    FROM contracts ct
    JOIN customers c ON c.id = ct.customer_id
    LEFT JOIN sites s ON s.id = ct.site_id`;

// ───────────── pure helper ─────────────
const toDate = (s) => new Date(`${s}T00:00:00Z`);
const fmt = (d) => d.toISOString().slice(0, 10);

/**
 * computeVisitDates({ start_date, end_date, visits_per_year, next_visit_date?, count?, until? }) → ['YYYY-MM-DD', ...]
 * Spreads visits evenly (every 365/visits_per_year days) from next_visit_date (or start_date) up to
 * min(end_date, until). `count` caps the number returned. Pure — no DB, no clock.
 */
export function computeVisitDates({ start_date, end_date, visits_per_year, next_visit_date, count, until }) {
  const vpy = Math.max(1, Math.min(365, Number(visits_per_year) || 1));
  const stepDays = 365 / vpy;
  const first = toDate(next_visit_date || start_date);
  const start = toDate(start_date);
  let last = toDate(end_date);
  if (until) { const u = toDate(until); if (u < last) last = u; }
  const out = [];
  const base = first < start ? start : first;
  for (let i = 0; i < 1000; i++) {
    const d = new Date(base.getTime() + Math.round(i * stepDays) * 86400000);
    if (d > last) break;
    out.push(fmt(d));
    if (count && out.length >= count) break;
  }
  return out;
}

/** Next visit after `date` (or null if past end_date). */
export function nextVisitAfter(date, { end_date, visits_per_year }) {
  const step = Math.round(365 / Math.max(1, Number(visits_per_year) || 1));
  const d = new Date(toDate(date).getTime() + step * 86400000);
  return d > toDate(end_date) ? null : fmt(d);
}

/** Riyadh-local wall time on date → Date (UTC). */
function riyadhAt(dateStr, hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return new Date(Date.UTC(...dateStr.split('-').map((x, i) => (i === 1 ? Number(x) - 1 : Number(x))), h - 3, m));
}

/**
 * Creates one job per computed visit date (skips dates that already have a non-cancelled job for this contract),
 * source='contract'. Caller owns the transaction. Returns { created: Job ids[], skipped: dates[], next_visit_date }.
 */
export async function generateContractVisits(client, companyId, actorUserId, contractId, opts = {}) {
  const { rows } = await client.query('SELECT * FROM contracts WHERE id = $1 AND company_id = $2 FOR UPDATE', [contractId, companyId]);
  const ct = rows[0];
  if (!ct) throw notFound('Contract not found');
  if (ct.status !== 'active') throw conflict('Only active contracts can generate visits');
  const dates = computeVisitDates({ ...ct, count: opts.count, until: opts.until });
  if (!dates.length) return { created: [], skipped: [], next_visit_date: ct.next_visit_date };
  const existing = await client.query(
    `SELECT DISTINCT (scheduled_start AT TIME ZONE 'Asia/Riyadh')::date::text AS d FROM jobs
      WHERE contract_id = $1 AND company_id = $2 AND status <> 'cancelled' AND scheduled_start IS NOT NULL`,
    [contractId, companyId]);
  const have = new Set(existing.rows.map((r) => r.d));
  const created = [];
  const skipped = [];
  const durationMin = opts.duration_min || 60;
  for (const d of dates) {
    if (have.has(d)) { skipped.push(d); continue; }
    const start = riyadhAt(d, opts.time || '09:00');
    const job = await insertJob(client, companyId, actorUserId, {
      customer_id: ct.customer_id,
      site_id: ct.site_id,
      contract_id: ct.id,
      title: opts.title || `زيارة صيانة دورية - ${ct.title}`,
      description: ct.notes,
      category: 'maintenance',
      source: 'contract',
      technician_id: opts.technician_id ?? null,
      scheduled_start: start.toISOString(),
      scheduled_end: new Date(start.getTime() + durationMin * 60000).toISOString(),
      checklist: opts.checklist,
    });
    created.push(job);
  }
  const lastDate = dates[dates.length - 1];
  const next = nextVisitAfter(lastDate, ct);
  await client.query('UPDATE contracts SET next_visit_date = $1 WHERE id = $2 AND company_id = $3', [next, ct.id, companyId]);
  return { created, skipped, next_visit_date: next };
}

// ───────────── routes ─────────────

const ListQuery = z.object({
  status: z.enum(['active', 'expired', 'cancelled']).optional(),
  customer_id: z.string().uuid().optional(),
  due_within_days: z.coerce.number().int().min(0).max(365).optional(),
  q: z.string().optional(), limit: z.string().optional(), offset: z.string().optional(),
}).passthrough();

router.get('/', validate({ query: ListQuery }), ah(async (req, res) => {
  const f = req.validQuery;
  const { limit, offset, q } = paging(req.query);
  const p = [req.user.company_id];
  const where = ['ct.company_id = $1'];
  if (f.status) { p.push(f.status); where.push(`ct.status = $${p.length}`); }
  if (f.customer_id) { p.push(f.customer_id); where.push(`ct.customer_id = $${p.length}`); }
  if (f.due_within_days !== undefined) {
    p.push(f.due_within_days);
    where.push(`ct.status = 'active' AND ct.next_visit_date <= (now() AT TIME ZONE 'Asia/Riyadh')::date + $${p.length}::int`);
  }
  if (q) { p.push(`%${q}%`); where.push(`(ct.title ILIKE $${p.length} OR c.name ILIKE $${p.length} OR c.phone ILIKE $${p.length})`); }
  const w = where.join(' AND ');
  const [items, cnt] = await Promise.all([
    many(`${CONTRACT_SELECT} WHERE ${w} ORDER BY ct.status = 'active' DESC, ct.next_visit_date ASC NULLS LAST, ct.created_at DESC
          LIMIT $${p.length + 1} OFFSET $${p.length + 2}`, [...p, limit, offset]),
    one(`SELECT count(*)::int AS n FROM contracts ct JOIN customers c ON c.id = ct.customer_id WHERE ${w}`, p),
  ]);
  res.json({ items, total: cnt.n, limit, offset });
}));

const Fields = {
  customer_id: z.string().uuid(),
  site_id: z.string().uuid().nullable().optional(),
  title: z.string().trim().min(1).max(200),
  start_date: isoDate,
  end_date: isoDate,
  visits_per_year: z.coerce.number().int().min(1).max(365),
  price: moneyNum,
  next_visit_date: isoDate.nullable().optional(),
  notes: z.string().trim().max(5000).optional().nullable(),
};
const Create = z.object(Fields).refine((b) => b.end_date > b.start_date, { message: 'end_date must be after start_date', path: ['end_date'] });
const Patch = z.object({ ...Fields, status: z.enum(['active', 'expired', 'cancelled']) }).partial().strict();

async function checkRefs(companyId, customerId, siteId) {
  const cust = await one('SELECT id FROM customers WHERE id = $1 AND company_id = $2', [customerId, companyId]);
  if (!cust) throw new HttpError(400, 'bad_reference', 'customer not found');
  if (siteId) {
    const s = await one('SELECT customer_id FROM sites WHERE id = $1 AND company_id = $2', [siteId, companyId]);
    if (!s) throw new HttpError(400, 'bad_reference', 'site not found');
    if (s.customer_id !== customerId) throw badRequest('site does not belong to customer');
  }
}

router.post('/', validate({ body: Create }), ah(async (req, res) => {
  const b = req.body;
  const cid = req.user.company_id;
  await checkRefs(cid, b.customer_id, b.site_id);
  const row = await one(
    `INSERT INTO contracts (company_id, customer_id, site_id, title, start_date, end_date, visits_per_year, price, next_visit_date, notes)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id`,
    [cid, b.customer_id, b.site_id ?? null, b.title, b.start_date, b.end_date, b.visits_per_year, b.price,
      b.next_visit_date ?? b.start_date, b.notes ?? null]);
  audit(req.user, 'create', 'contract', row.id);
  res.status(201).json(await one(`${CONTRACT_SELECT} WHERE ct.id = $1 AND ct.company_id = $2`, [row.id, cid]));
}));

router.get('/:id', validate({ params: idParam }), ah(async (req, res) => {
  const cid = req.user.company_id;
  const ct = await one(`${CONTRACT_SELECT} WHERE ct.id = $1 AND ct.company_id = $2`, [req.params.id, cid]);
  if (!ct) throw notFound('Contract not found');
  const [jobs, invoices] = await Promise.all([
    listJobSummaries(null, 'j.company_id = $1 AND j.contract_id = $2', [cid, ct.id],
      'ORDER BY j.scheduled_start ASC NULLS LAST, j.number'),
    many(`SELECT i.id, i.number, i.kind, i.issue_date, i.status, i.job_id, i.contract_id, i.subtotal, i.vat_amount, i.total,
                 i.paid_at, i.payment_method, i.public_token, i.payment_link_url, i.notes,
                 json_build_object('id', c.id, 'name', c.name, 'phone', c.phone, 'vat_number', c.vat_number) AS customer
            FROM invoices i JOIN customers c ON c.id = i.customer_id
           WHERE i.company_id = $1 AND (i.contract_id = $2 OR i.job_id IN (SELECT id FROM jobs WHERE contract_id = $2 AND company_id = $1))
           ORDER BY i.issue_date DESC`, [cid, ct.id]),
  ]);
  res.json({ ...ct, jobs, invoices });
}));

router.patch('/:id', validate({ params: idParam, body: Patch }), ah(async (req, res) => {
  const cid = req.user.company_id;
  const cur = await one('SELECT * FROM contracts WHERE id = $1 AND company_id = $2', [req.params.id, cid]);
  if (!cur) throw notFound('Contract not found');
  const b = req.body;
  const merged = { ...cur, ...Object.fromEntries(Object.entries(b).filter(([, v]) => v !== undefined)) };
  if (merged.end_date <= merged.start_date) throw badRequest('end_date must be after start_date');
  if (b.customer_id !== undefined || b.site_id !== undefined) await checkRefs(cid, merged.customer_id, merged.site_id);
  const keys = Object.keys(b).filter((k) => b[k] !== undefined);
  if (keys.length) {
    await one(`UPDATE contracts SET ${keys.map((k, i) => `${k} = $${i + 1}`).join(', ')}
                WHERE id = $${keys.length + 1} AND company_id = $${keys.length + 2} RETURNING id`,
    [...keys.map((k) => b[k]), cur.id, cid]);
    audit(req.user, b.status ? `update:status=${b.status}` : 'update', 'contract', cur.id);
  }
  res.json(await one(`${CONTRACT_SELECT} WHERE ct.id = $1 AND ct.company_id = $2`, [cur.id, cid]));
}));

router.delete('/:id', requireRole('owner'), validate({ params: idParam }), ah(async (req, res) => {
  const row = await one(`UPDATE contracts SET status = 'cancelled' WHERE id = $1 AND company_id = $2 RETURNING id`,
    [req.params.id, req.user.company_id]);
  if (!row) throw notFound('Contract not found');
  audit(req.user, 'cancel', 'contract', row.id);
  res.json({ ok: true });
}));

// POST /contracts/:id/generate-visits
const GenBody = z.object({
  technician_id: z.string().uuid().nullable().optional(),
  count: z.coerce.number().int().min(1).max(365).optional(),
  until: isoDate.optional(),
  time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'HH:MM').optional(),
  duration_min: z.coerce.number().int().min(15).max(24 * 60).optional(),
  title: z.string().trim().min(1).max(200).optional(),
}).strict();

router.post('/:id/generate-visits', validate({ params: idParam, body: GenBody }), ah(async (req, res) => {
  const cid = req.user.company_id;
  const r = await tx((c) => generateContractVisits(c, cid, req.user.id, req.params.id, req.body));
  audit(req.user, `generate_visits:${r.created.length}`, 'contract', req.params.id);
  for (const j of r.created) if (j.status === 'scheduled') await notifyJobSafe(j.id, 'job_scheduled');
  const jobs = r.created.length
    ? await listJobSummaries(null, 'j.company_id = $1 AND j.id = ANY($2)', [cid, r.created.map((j) => j.id)],
      'ORDER BY j.scheduled_start')
    : [];
  res.status(201).json({
    created: jobs.length, skipped: r.skipped, next_visit_date: r.next_visit_date, jobs,
    warnings: r.created.flatMap((j) => j.warnings),
  });
}));

export default router;
