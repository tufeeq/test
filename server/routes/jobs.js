// /api/jobs — OWNER: B1. Implements docs/API.md § 6 (jobs) + dispatch/reschedule support.
// Exports shared helpers used by other routers (customers, contracts, dashboard, bookings, B2/B4/B5):
//   addJobEvent(clientOrNull, { jobId|job_id, companyId|company_id, type, message, actorUserId|actor_user_id })
//   JOB_SUMMARY_SELECT, listJobSummaries(db, where, params, tail), getJobDetail(db, companyId, id)
//   insertJob(client, companyId, actorUserId, body) → { id, status, warnings }
//   findTechConflicts(db, companyId, { technicianId, start, end, excludeJobId })
//   notifyJobSafe(jobId, event)
// EVERY query is scoped by company_id. Technicians only ever see/touch jobs assigned to them (else 404).
import { Router } from 'express';
import { requireAuth, requireRole } from '../lib/auth.js';
import { pool, one, many, tx, paging, nextNumber, audit, money } from '../lib/db.js';
import { ah, notFound, badRequest, forbidden, conflict, HttpError } from '../lib/errors.js';
import { validate, z, idParam } from '../lib/validate.js';
import { notifyJobEvent } from '../lib/notify.js';

const router = Router();

export const JOB_STATUSES = ['new', 'scheduled', 'on_the_way', 'in_progress', 'completed', 'cancelled'];
export const PRIORITIES = ['low', 'normal', 'urgent'];
export const SOURCES = ['manual', 'portal', 'whatsapp', 'contract', 'ai'];
const OPEN_STATUSES = ['new', 'scheduled', 'on_the_way', 'in_progress'];

const STATUS_AR = {
  new: 'جديد', scheduled: 'تمت الجدولة', on_the_way: 'الفني في الطريق',
  in_progress: 'بدأ العمل', completed: 'تم إنجاز العمل', cancelled: 'أُلغي الطلب',
};

/** Allowed transitions for owner/dispatcher. */
const TRANSITIONS = {
  new: ['scheduled', 'cancelled'],
  scheduled: ['on_the_way', 'in_progress', 'cancelled', 'new'],
  on_the_way: ['in_progress', 'scheduled', 'cancelled'],
  in_progress: ['completed', 'cancelled'],
  completed: ['in_progress', 'cancelled'],
  cancelled: ['new'],
};
const TECH_TARGETS = ['on_the_way', 'in_progress', 'completed'];

const isAdmin = (u) => u.role === 'owner' || u.role === 'dispatcher';
const db = (c) => c || pool;

export const trackingUrl = (token) => `${(process.env.PUBLIC_BASE_URL || '').replace(/\/$/, '')}/t/${token}`;

export function fmtRiyadh(d) {
  if (!d) return '';
  try {
    return new Date(d).toLocaleString('ar-SA-u-ca-gregory-nu-latn', {
      timeZone: 'Asia/Riyadh', weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit',
    });
  } catch { return new Date(d).toISOString(); }
}

// ───────────────────────── shared helpers ─────────────────────────

/**
 * Insert a job_events row. Accepts camelCase (API.md) or snake_case keys.
 * clientOrNull: a tx client, or null to use the pool. Never throws when using the pool (logs instead).
 */
export async function addJobEvent(clientOrNull, ev = {}) {
  const jobId = ev.jobId ?? ev.job_id;
  const companyId = ev.companyId ?? ev.company_id;
  const actor = ev.actorUserId ?? ev.actor_user_id ?? null;
  const sql = `INSERT INTO job_events (job_id, company_id, type, message, actor_user_id)
               SELECT j.id, j.company_id, $3, $4, $5 FROM jobs j WHERE j.id = $1 AND j.company_id = $2
               RETURNING id, type, message, actor_user_id, created_at`;
  const params = [jobId, companyId, ev.type, ev.message ?? null, actor];
  if (clientOrNull) {
    const { rows } = await clientOrNull.query(sql, params);
    return rows[0] ?? null;
  }
  try {
    return (await pool.query(sql, params)).rows[0] ?? null;
  } catch (e) {
    console.error('[addJobEvent]', e.message);
    return null;
  }
}

/** notifyJobEvent wrapper that can never throw or reject. */
export async function notifyJobSafe(jobId, event) {
  try {
    await notifyJobEvent(jobId, event);
  } catch (e) {
    console.error('[notify]', event, e?.message);
  }
}

export const JOB_SUMMARY_SELECT = `
  SELECT j.id, j.number, j.title, j.category, j.priority, j.status, j.source,
         j.scheduled_start, j.scheduled_end, j.completed_at, j.created_at, j.contract_id,
         json_build_object('id', c.id, 'name', c.name, 'phone', c.phone) AS customer,
         CASE WHEN s.id IS NULL THEN NULL ELSE json_build_object('id', s.id, 'label', s.label, 'district', s.district,
              'city', s.city, 'lat', s.lat, 'lng', s.lng) END AS site,
         CASE WHEN u.id IS NULL THEN NULL ELSE json_build_object('id', u.id, 'name', u.name, 'color', u.color) END AS technician,
         COALESCE((SELECT round(sum(ji.qty * ji.unit_price), 2) FROM job_items ji WHERE ji.job_id = j.id), 0) AS total
    FROM jobs j
    JOIN customers c ON c.id = j.customer_id
    LEFT JOIN sites s ON s.id = j.site_id
    LEFT JOIN users u ON u.id = j.technician_id`;

/** listJobSummaries(db, 'j.company_id = $1 AND …', params, 'ORDER BY … LIMIT …') → JobSummary[] */
export async function listJobSummaries(client, where, params, tail = 'ORDER BY j.created_at DESC') {
  const { rows } = await db(client).query(`${JOB_SUMMARY_SELECT} WHERE ${where} ${tail}`, params);
  return rows;
}

/** Full Job detail (API.md shape) or null. */
export async function getJobDetail(client, companyId, id) {
  const q = db(client);
  const { rows } = await q.query(
    `${JOB_SUMMARY_SELECT.replace('SELECT j.id,', `SELECT j.id, j.description, j.notes, j.checklist, j.customer_signature,
        j.rating, j.rating_comment, j.public_token, j.asset_id, j.site_id, j.customer_id, j.technician_id,
        j.on_the_way_at, j.started_at, j.cancelled_at, j.updated_at,`)}
     WHERE j.id = $1 AND j.company_id = $2`,
    [id, companyId]
  );
  const job = rows[0];
  if (!job) return null;
  const [items, photos, events, asset, invoice] = await Promise.all([
    q.query(`SELECT id, service_id, description, qty, unit_price FROM job_items
              WHERE job_id = $1 AND company_id = $2 ORDER BY created_at, id`, [id, companyId]),
    q.query(`SELECT id, kind, data_url, created_at FROM job_photos
              WHERE job_id = $1 AND company_id = $2 ORDER BY created_at`, [id, companyId]),
    q.query(`SELECT e.id, e.type, e.message, e.created_at,
                    CASE WHEN u.id IS NULL THEN NULL ELSE json_build_object('id', u.id, 'name', u.name) END AS actor
               FROM job_events e LEFT JOIN users u ON u.id = e.actor_user_id
              WHERE e.job_id = $1 AND e.company_id = $2 ORDER BY e.created_at, e.id`, [id, companyId]),
    job.asset_id
      ? q.query(`SELECT id, site_id, kind, brand, capacity_btu, install_date, notes FROM assets
                  WHERE id = $1 AND company_id = $2`, [job.asset_id, companyId])
      : Promise.resolve({ rows: [] }),
    q.query(`SELECT id, number, status, total FROM invoices
              WHERE job_id = $1 AND company_id = $2 ORDER BY (status = 'void'), created_at DESC LIMIT 1`, [id, companyId]),
  ]);
  return {
    ...job,
    items: items.rows,
    photos: photos.rows,
    events: events.rows,
    asset: asset.rows[0] ?? null,
    invoice: invoice.rows[0] ?? null,
    tracking_url: trackingUrl(job.public_token),
  };
}

/**
 * Jobs for the same technician overlapping [start, end) (open jobs only).
 * A job without scheduled_end is treated as 60 minutes long.
 */
export async function findTechConflicts(client, companyId, { technicianId, start, end, excludeJobId = null }) {
  if (!technicianId || !start) return [];
  const endTs = end || new Date(new Date(start).getTime() + 60 * 60000);
  const { rows } = await db(client).query(
    `SELECT id, number, title, status, scheduled_start, scheduled_end FROM jobs
      WHERE company_id = $1 AND technician_id = $2 AND status = ANY($3)
        AND ($4::uuid IS NULL OR id <> $4)
        AND scheduled_start IS NOT NULL
        AND scheduled_start < $6
        AND COALESCE(scheduled_end, scheduled_start + interval '60 minutes') > $5
      ORDER BY scheduled_start`,
    [companyId, technicianId, ['scheduled', 'on_the_way', 'in_progress', 'new'], excludeJobId, start, endTs]
  );
  return rows;
}

export function conflictWarnings(conflicts) {
  return conflicts.map((c) => ({
    code: 'technician_conflict',
    message: `الفني لديه طلب آخر متداخل (#${c.number} ${c.title}) — ${fmtRiyadh(c.scheduled_start)}`,
    job: c,
  }));
}

async function assertRef(client, sql, params, what) {
  const { rows } = await client.query(sql, params);
  if (!rows[0]) throw new HttpError(400, 'bad_reference', `${what} not found`);
  return rows[0];
}

/** Validate that every referenced id belongs to the company (and is coherent). Returns resolved rows. */
async function resolveRefs(client, companyId, b, current = {}) {
  const out = {};
  const customerId = b.customer_id ?? current.customer_id;
  if (b.customer_id !== undefined) {
    out.customer = await assertRef(client, 'SELECT id FROM customers WHERE id = $1 AND company_id = $2', [b.customer_id, companyId], 'customer');
  }
  if (b.site_id) {
    const s = await assertRef(client, 'SELECT id, customer_id FROM sites WHERE id = $1 AND company_id = $2', [b.site_id, companyId], 'site');
    if (customerId && s.customer_id !== customerId) throw badRequest('site does not belong to customer');
  }
  if (b.asset_id) {
    const a = await assertRef(client, 'SELECT id, site_id FROM assets WHERE id = $1 AND company_id = $2', [b.asset_id, companyId], 'asset');
    const siteId = b.site_id !== undefined ? b.site_id : current.site_id;
    if (siteId && a.site_id !== siteId) throw badRequest('asset does not belong to site');
  }
  if (b.contract_id) {
    const ct = await assertRef(client, 'SELECT id, customer_id FROM contracts WHERE id = $1 AND company_id = $2', [b.contract_id, companyId], 'contract');
    if (customerId && ct.customer_id !== customerId) throw badRequest('contract does not belong to customer');
  }
  if (b.technician_id) {
    out.technician = await assertRef(client,
      'SELECT id, name, role FROM users WHERE id = $1 AND company_id = $2 AND active = true',
      [b.technician_id, companyId], 'technician');
  }
  return out;
}

/** Fill items from the price list where needed; validates service ownership. */
async function resolveItems(client, companyId, items = []) {
  if (!items.length) return { items: [], durationMin: 0 };
  const ids = [...new Set(items.map((i) => i.service_id).filter(Boolean))];
  const svc = new Map();
  if (ids.length) {
    const { rows } = await client.query(
      'SELECT id, name, name_ar, price, duration_min FROM services WHERE company_id = $1 AND id = ANY($2)', [companyId, ids]);
    rows.forEach((r) => svc.set(r.id, r));
    for (const id of ids) if (!svc.has(id)) throw new HttpError(400, 'bad_reference', 'service not found');
  }
  let durationMin = 0;
  const out = items.map((i) => {
    const s = i.service_id ? svc.get(i.service_id) : null;
    const description = i.description || s?.name_ar || s?.name;
    if (!description) throw badRequest('item description is required');
    if (s) durationMin += s.duration_min * Math.max(1, Math.round(i.qty ?? 1));
    return {
      service_id: i.service_id ?? null,
      description,
      qty: i.qty ?? 1,
      unit_price: i.unit_price ?? s?.price ?? 0,
    };
  });
  return { items: out, durationMin };
}

async function replaceItems(client, companyId, jobId, items) {
  await client.query('DELETE FROM job_items WHERE job_id = $1 AND company_id = $2', [jobId, companyId]);
  for (const it of items) {
    await client.query(
      `INSERT INTO job_items (job_id, company_id, service_id, description, qty, unit_price) VALUES ($1,$2,$3,$4,$5,$6)`,
      [jobId, companyId, it.service_id, it.description, it.qty, it.unit_price]
    );
  }
}

/**
 * Create a job inside a transaction (caller owns tx). Used by POST /jobs, booking conversion and
 * contract visit generation. Returns { id, status, warnings }.
 */
export async function insertJob(client, companyId, actorUserId, b) {
  const refs = await resolveRefs(client, companyId, b);
  const { items, durationMin } = await resolveItems(client, companyId, b.items || []);
  const start = b.scheduled_start ? new Date(b.scheduled_start) : null;
  let end = b.scheduled_end ? new Date(b.scheduled_end) : null;
  if (start && !end) end = new Date(start.getTime() + (durationMin || 60) * 60000);
  if (start && end && end <= start) throw badRequest('scheduled_end must be after scheduled_start');
  if (!start && end) throw badRequest('scheduled_end requires scheduled_start');
  const status = b.technician_id && start ? 'scheduled' : 'new';
  const number = await nextNumber(client, 'jobs', companyId);
  const { rows } = await client.query(
    `INSERT INTO jobs (company_id, number, customer_id, site_id, asset_id, contract_id, title, description, category,
                       priority, status, source, scheduled_start, scheduled_end, technician_id, checklist, notes)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING id, status`,
    [companyId, number, b.customer_id, b.site_id ?? null, b.asset_id ?? null, b.contract_id ?? null, b.title,
      b.description ?? null, b.category ?? null, b.priority ?? 'normal', status, b.source ?? 'manual',
      start, end, b.technician_id ?? null, JSON.stringify(b.checklist ?? []), b.notes ?? null]
  );
  const job = rows[0];
  await replaceItems(client, companyId, job.id, items);
  await addJobEvent(client, { jobId: job.id, companyId, type: 'created', message: `تم إنشاء الطلب #${number}`, actorUserId });
  if (refs.technician) {
    await addJobEvent(client, { jobId: job.id, companyId, type: 'assigned',
      message: `تم إسناد الطلب للفني ${refs.technician.name}`, actorUserId });
  }
  const conflicts = refs.technician && start
    ? await findTechConflicts(client, companyId, { technicianId: b.technician_id, start, end, excludeJobId: job.id })
    : [];
  return { id: job.id, number, status: job.status, warnings: conflictWarnings(conflicts) };
}

/** Load a job row visible to req.user (technicians: only assigned). 404 otherwise. */
async function loadJob(client, user, id, { lock = false } = {}) {
  const { rows } = await db(client).query(
    `SELECT * FROM jobs WHERE id = $1 AND company_id = $2 ${lock ? 'FOR UPDATE' : ''}`, [id, user.company_id]);
  const job = rows[0];
  if (!job) throw notFound('Job not found');
  if (user.role === 'technician' && job.technician_id !== user.id) throw notFound('Job not found');
  return job;
}

async function hasLiveInvoice(client, companyId, jobId) {
  const { rows } = await db(client).query(
    `SELECT 1 FROM invoices WHERE job_id = $1 AND company_id = $2 AND status <> 'void' LIMIT 1`, [jobId, companyId]);
  return rows.length > 0;
}

// ───────────────────────── schemas ─────────────────────────

const dateLike = z.string().trim().refine((s) => !Number.isNaN(Date.parse(s)), 'expected ISO date/time');
const nullableDateTime = z.union([dateLike, z.null()]);
const optText = (max = 2000) => z.string().trim().max(max).optional().nullable();
const uuidN = z.string().uuid().nullable().optional();

const ItemSchema = z.object({
  service_id: z.string().uuid().nullable().optional(),
  description: z.string().trim().max(500).optional().nullable(),
  qty: z.coerce.number().positive().max(100000).optional().default(1),
  unit_price: z.coerce.number().min(0).max(10_000_000).transform((n) => money(n)).optional(),
});
const ChecklistSchema = z.array(z.object({
  label: z.string().trim().min(1).max(300),
  done: z.boolean().optional().default(false),
})).max(100);

const JobFields = {
  site_id: uuidN,
  asset_id: uuidN,
  contract_id: uuidN,
  title: z.string().trim().min(1).max(200),
  description: optText(5000),
  category: z.string().trim().max(60).optional().nullable(),
  priority: z.enum(PRIORITIES).optional(),
  source: z.enum(SOURCES).optional(),
  scheduled_start: nullableDateTime.optional(),
  scheduled_end: nullableDateTime.optional(),
  technician_id: uuidN,
  checklist: ChecklistSchema.optional(),
  notes: optText(5000),
};
const CreateJob = z.object({
  customer_id: z.string().uuid(),
  ...JobFields,
  items: z.array(ItemSchema).max(100).optional(),
});
const PatchJob = z.object({
  customer_id: z.string().uuid().optional(),
  ...JobFields,
  title: JobFields.title.optional(),
  items: z.array(ItemSchema).max(100).optional(),
}).strict();

const ListQuery = z.object({
  status: z.string().optional().transform((s) => (s ? s.split(',').map((x) => x.trim()).filter(Boolean) : null))
    .refine((a) => !a || a.every((x) => JOB_STATUSES.includes(x)), 'invalid status'),
  technician_id: z.union([z.literal('me'), z.string().uuid()]).optional(),
  customer_id: z.string().uuid().optional(),
  contract_id: z.string().uuid().optional(),
  site_id: z.string().uuid().optional(),
  priority: z.enum(PRIORITIES).optional(),
  source: z.enum(SOURCES).optional(),
  from: dateLike.optional(),
  to: dateLike.optional(),
  unassigned: z.enum(['true', 'false']).optional(),
  q: z.string().optional(),
  limit: z.string().optional(),
  offset: z.string().optional(),
}).passthrough();

const photoDataUrl = z.string().regex(/^data:image\/(jpeg|jpg|png|webp);base64,[A-Za-z0-9+/=\s]+$/, 'expected image data URL (jpeg, png or webp)');
const MAX_PHOTO = 1.5 * 1024 * 1024;   // 1.5 MB of data-URL text
const MAX_SIGNATURE = 500 * 1024;

// ───────────────────────── routes ─────────────────────────

router.use(requireAuth);

// GET /jobs — list / dispatch board feed
router.get('/', validate({ query: ListQuery }), ah(async (req, res) => {
  const f = req.validQuery;
  const { limit, offset, q } = paging(req.query);
  const where = ['j.company_id = $1'];
  const p = [req.user.company_id];
  const add = (sql, v) => { p.push(v); where.push(sql.replace('$?', `$${p.length}`)); };

  if (req.user.role === 'technician') add('j.technician_id = $?', req.user.id);
  else if (f.technician_id) add('j.technician_id = $?', f.technician_id === 'me' ? req.user.id : f.technician_id);
  if (f.status) add('j.status = ANY($?)', f.status);
  if (f.customer_id) add('j.customer_id = $?', f.customer_id);
  if (f.contract_id) add('j.contract_id = $?', f.contract_id);
  if (f.site_id) add('j.site_id = $?', f.site_id);
  if (f.priority) add('j.priority = $?', f.priority);
  if (f.source) add('j.source = $?', f.source);
  if (f.from) add('j.scheduled_start >= $?', new Date(f.from));
  if (f.to) add('j.scheduled_start < $?', new Date(f.to));
  if (f.unassigned === 'true') where.push('j.technician_id IS NULL');
  if (f.unassigned === 'false') where.push('j.technician_id IS NOT NULL');
  if (q) {
    const digits = q.replace(/[^\d]/g, '');
    p.push(`%${q}%`);
    const like = `$${p.length}`;
    const ors = [`j.title ILIKE ${like}`, `c.name ILIKE ${like}`, `c.phone ILIKE ${like}`];
    if (/^#?\d{1,9}$/.test(q.trim())) { p.push(Number(digits)); ors.push(`j.number = $${p.length}`); }
    if (digits.length >= 4) { p.push(`%${digits.replace(/^0/, '')}%`); ors.push(`c.phone LIKE $${p.length}`); }
    where.push(`(${ors.join(' OR ')})`);
  }
  const whereSql = where.join(' AND ');
  const order = f.from
    ? 'ORDER BY j.scheduled_start ASC NULLS LAST, j.number'
    : 'ORDER BY j.created_at DESC, j.number DESC';
  const [items, count] = await Promise.all([
    listJobSummaries(null, whereSql, [...p, limit, offset], `${order} LIMIT $${p.length + 1} OFFSET $${p.length + 2}`),
    one(`SELECT count(*)::int AS n FROM jobs j JOIN customers c ON c.id = j.customer_id WHERE ${whereSql}`, p),
  ]);
  res.json({ items, total: count.n, limit, offset });
}));

// POST /jobs
router.post('/', requireRole('owner', 'dispatcher'), validate({ body: CreateJob }), ah(async (req, res) => {
  const cid = req.user.company_id;
  const created = await tx((c) => insertJob(c, cid, req.user.id, req.body));
  audit(req.user, 'create', 'job', created.id);
  if (created.status === 'scheduled') await notifyJobSafe(created.id, 'job_scheduled');
  const job = await getJobDetail(null, cid, created.id);
  res.status(201).json({ ...job, warnings: created.warnings });
}));

// GET /jobs/:id
router.get('/:id', validate({ params: idParam }), ah(async (req, res) => {
  await loadJob(null, req.user, req.params.id);
  res.json(await getJobDetail(null, req.user.company_id, req.params.id));
}));

// GET /jobs/:id/events — timeline only
router.get('/:id/events', validate({ params: idParam }), ah(async (req, res) => {
  await loadJob(null, req.user, req.params.id);
  const items = await many(
    `SELECT e.id, e.type, e.message, e.created_at,
            CASE WHEN u.id IS NULL THEN NULL ELSE json_build_object('id', u.id, 'name', u.name) END AS actor
       FROM job_events e LEFT JOIN users u ON u.id = e.actor_user_id
      WHERE e.job_id = $1 AND e.company_id = $2 ORDER BY e.created_at, e.id`,
    [req.params.id, req.user.company_id]);
  res.json({ items });
}));

/**
 * Shared update logic for PATCH /jobs/:id and PATCH /jobs/:id/schedule.
 * Returns { notifyScheduled, warnings }.
 */
async function applyJobPatch(c, user, cur, b) {
  const cid = user.company_id;
  const refs = await resolveRefs(c, cid, b, cur);
  if (b.customer_id && b.customer_id !== cur.customer_id && b.site_id === undefined && cur.site_id) {
    // changing customer without a new site would leave a foreign site attached → clear it
    b.site_id = null; b.asset_id = null;
  }
  const sets = [];
  const p = [];
  const set = (col, v) => { p.push(v); sets.push(`${col} = $${p.length}`); };
  const simple = ['customer_id', 'site_id', 'asset_id', 'contract_id', 'title', 'description', 'category',
    'priority', 'source', 'technician_id', 'notes'];
  for (const k of simple) if (b[k] !== undefined) set(k, b[k]);
  if (b.checklist !== undefined) set('checklist', JSON.stringify(b.checklist));

  let start = cur.scheduled_start;
  let end = cur.scheduled_end;
  const timeTouched = b.scheduled_start !== undefined || b.scheduled_end !== undefined;
  if (b.scheduled_start !== undefined) {
    start = b.scheduled_start ? new Date(b.scheduled_start) : null;
    if (b.scheduled_end === undefined && start) {
      const prevDur = cur.scheduled_start && cur.scheduled_end
        ? new Date(cur.scheduled_end) - new Date(cur.scheduled_start) : 60 * 60000;
      end = new Date(start.getTime() + prevDur);
    }
    if (!start) end = null;
  }
  if (b.scheduled_end !== undefined) end = b.scheduled_end ? new Date(b.scheduled_end) : (start ? new Date(new Date(start).getTime() + 3600000) : null);
  if (start && end && new Date(end) <= new Date(start)) throw badRequest('scheduled_end must be after scheduled_start');
  if (timeTouched) { set('scheduled_start', start); set('scheduled_end', end); }

  const techId = b.technician_id !== undefined ? b.technician_id : cur.technician_id;
  let newStatus = cur.status;
  if (cur.status === 'new' && techId && start) newStatus = 'scheduled';
  if (cur.status === 'scheduled' && (!techId || !start)) newStatus = 'new';
  if (['on_the_way', 'in_progress'].includes(cur.status) && b.technician_id === null) {
    throw conflict('Cannot unassign a job that is under way');
  }
  if (newStatus !== cur.status) set('status', newStatus);
  set('updated_at', new Date());

  let itemsOut;
  if (b.items !== undefined) {
    if (await hasLiveInvoice(c, cid, cur.id)) throw conflict('Job already has an invoice; void it before editing items');
    itemsOut = (await resolveItems(c, cid, b.items)).items;
  }

  p.push(cur.id, cid);
  await c.query(`UPDATE jobs SET ${sets.join(', ')} WHERE id = $${p.length - 1} AND company_id = $${p.length}`, p);
  if (itemsOut) await replaceItems(c, cid, cur.id, itemsOut);

  const ev = (type, message) => addJobEvent(c, { jobId: cur.id, companyId: cid, type, message, actorUserId: user.id });
  if (b.technician_id !== undefined && b.technician_id !== cur.technician_id) {
    await ev('assigned', refs.technician ? `تم إسناد الطلب للفني ${refs.technician.name}` : 'تم إلغاء إسناد الفني');
  }
  const startChanged = timeTouched && String(start ? new Date(start).toISOString() : null)
    !== String(cur.scheduled_start ? new Date(cur.scheduled_start).toISOString() : null);
  const endChanged = timeTouched && String(end ? new Date(end).toISOString() : null)
    !== String(cur.scheduled_end ? new Date(cur.scheduled_end).toISOString() : null);
  if (startChanged || endChanged) {
    await ev('rescheduled', start ? `تمت إعادة الجدولة إلى ${fmtRiyadh(start)}` : 'تم إلغاء موعد الطلب');
  }
  if (newStatus !== cur.status) {
    await ev('status_changed', STATUS_AR[newStatus]);
  }
  const conflicts = techId && start && newStatus !== 'cancelled' && newStatus !== 'completed'
    ? await findTechConflicts(c, cid, { technicianId: techId, start, end, excludeJobId: cur.id }) : [];
  const notifyScheduled = (newStatus === 'scheduled' && cur.status !== 'scheduled')
    || (newStatus === 'scheduled' && (startChanged || (b.technician_id !== undefined && b.technician_id !== cur.technician_id)));
  return { notifyScheduled, warnings: conflictWarnings(conflicts) };
}

// PATCH /jobs/:id
router.patch('/:id', requireRole('owner', 'dispatcher'), validate({ params: idParam, body: PatchJob }), ah(async (req, res) => {
  const cid = req.user.company_id;
  const r = await tx(async (c) => {
    const cur = await loadJob(c, req.user, req.params.id, { lock: true });
    if (['completed', 'cancelled'].includes(cur.status)
      && (req.body.technician_id !== undefined || req.body.scheduled_start !== undefined)) {
      throw conflict(`Cannot reschedule a ${cur.status} job`);
    }
    return applyJobPatch(c, req.user, cur, req.body);
  });
  audit(req.user, 'update', 'job', req.params.id);
  if (r.notifyScheduled) await notifyJobSafe(req.params.id, 'job_scheduled');
  res.json({ ...(await getJobDetail(null, cid, req.params.id)), warnings: r.warnings });
}));

// PATCH /jobs/:id/schedule — dispatch board drag/drop (assign + reschedule in one call)
const ScheduleBody = z.object({
  technician_id: z.string().uuid().nullable().optional(),
  scheduled_start: nullableDateTime.optional(),
  scheduled_end: nullableDateTime.optional(),
}).strict().refine((b) => Object.keys(b).length > 0, 'nothing to change');

router.patch('/:id/schedule', requireRole('owner', 'dispatcher'), validate({ params: idParam, body: ScheduleBody }), ah(async (req, res) => {
  const cid = req.user.company_id;
  const r = await tx(async (c) => {
    const cur = await loadJob(c, req.user, req.params.id, { lock: true });
    if (['completed', 'cancelled'].includes(cur.status)) throw conflict(`Cannot reschedule a ${cur.status} job`);
    return applyJobPatch(c, req.user, cur, { ...req.body });
  });
  audit(req.user, 'reschedule', 'job', req.params.id);
  if (r.notifyScheduled) await notifyJobSafe(req.params.id, 'job_scheduled');
  res.json({ ...(await getJobDetail(null, cid, req.params.id)), warnings: r.warnings });
}));

// POST /jobs/:id/assign — { technician_id|null }
router.post('/:id/assign', requireRole('owner', 'dispatcher'),
  validate({ params: idParam, body: z.object({ technician_id: z.string().uuid().nullable() }) }), ah(async (req, res) => {
    const cid = req.user.company_id;
    const r = await tx(async (c) => {
      const cur = await loadJob(c, req.user, req.params.id, { lock: true });
      if (['completed', 'cancelled'].includes(cur.status)) throw conflict(`Cannot assign a ${cur.status} job`);
      return applyJobPatch(c, req.user, cur, { technician_id: req.body.technician_id });
    });
    audit(req.user, 'assign', 'job', req.params.id);
    if (r.notifyScheduled) await notifyJobSafe(req.params.id, 'job_scheduled');
    res.json({ ...(await getJobDetail(null, cid, req.params.id)), warnings: r.warnings });
  }));

// POST /jobs/:id/status
const StatusBody = z.object({ status: z.enum(JOB_STATUSES), note: optText(2000) });
router.post('/:id/status', validate({ params: idParam, body: StatusBody }), ah(async (req, res) => {
  const cid = req.user.company_id;
  const { status, note } = req.body;
  const prev = await tx(async (c) => {
    const cur = await loadJob(c, req.user, req.params.id, { lock: true });
    if (cur.status === status) throw conflict(`Job is already ${status}`);
    const allowed = TRANSITIONS[cur.status] || [];
    if (!allowed.includes(status)) {
      throw new HttpError(409, 'invalid_transition', `Cannot move job from ${cur.status} to ${status}`,
        [{ path: 'status', message: `allowed: ${allowed.join(', ') || 'none'}` }]);
    }
    if (!isAdmin(req.user)) {
      const order = ['scheduled', 'on_the_way', 'in_progress', 'completed'];
      if (!TECH_TARGETS.includes(status) || order.indexOf(cur.status) < 0 || order.indexOf(status) <= order.indexOf(cur.status)) {
        throw forbidden('Technicians can only move jobs forward: on_the_way → in_progress → completed');
      }
    }
    if (status === 'cancelled' && await hasLiveInvoice(c, cid, cur.id)) {
      throw conflict('Job has an invoice; void it before cancelling');
    }
    if (status === 'scheduled' && (!cur.technician_id || !cur.scheduled_start)) {
      throw badRequest('Assign a technician and a start time before scheduling');
    }
    const ts = {
      on_the_way: 'on_the_way_at = now(),',
      in_progress: `started_at = COALESCE(started_at, now()), completed_at = NULL,`,
      completed: 'completed_at = now(),',
      cancelled: 'cancelled_at = now(),',
      new: 'cancelled_at = NULL,',
      scheduled: '',
    }[status];
    await c.query(`UPDATE jobs SET ${ts} status = $1, updated_at = now() WHERE id = $2 AND company_id = $3`,
      [status, cur.id, cid]);
    await addJobEvent(c, { jobId: cur.id, companyId: cid, type: 'status_changed',
      message: note ? `${STATUS_AR[status]} — ${note}` : STATUS_AR[status], actorUserId: req.user.id });
    return cur.status;
  });
  audit(req.user, `status:${prev}->${status}`, 'job', req.params.id);
  const ev = { scheduled: 'job_scheduled', on_the_way: 'tech_on_the_way', completed: 'job_completed' }[status];
  if (ev) await notifyJobSafe(req.params.id, ev);
  res.json(await getJobDetail(null, cid, req.params.id));
}));

// PUT /jobs/:id/items
router.put('/:id/items', validate({ params: idParam, body: z.object({ items: z.array(ItemSchema).max(100) }) }), ah(async (req, res) => {
  const cid = req.user.company_id;
  const out = await tx(async (c) => {
    const cur = await loadJob(c, req.user, req.params.id, { lock: true });
    if (!isAdmin(req.user) && cur.status !== 'in_progress') throw conflict('Items can be edited only while the job is in progress');
    if (cur.status === 'cancelled') throw conflict('Job is cancelled');
    if (await hasLiveInvoice(c, cid, cur.id)) throw conflict('Job already has an invoice; void it before editing items');
    const { items } = await resolveItems(c, cid, req.body.items);
    await replaceItems(c, cid, cur.id, items);
    await c.query('UPDATE jobs SET updated_at = now() WHERE id = $1 AND company_id = $2', [cur.id, cid]);
    const { rows } = await c.query(
      `SELECT id, service_id, description, qty, unit_price FROM job_items WHERE job_id = $1 AND company_id = $2 ORDER BY created_at, id`,
      [cur.id, cid]);
    return rows;
  });
  const total = money(out.reduce((s, i) => s + Number(i.qty) * Number(i.unit_price), 0));
  res.json({ items: out, total });
}));

// PATCH /jobs/:id/checklist
router.patch('/:id/checklist', validate({ params: idParam, body: z.object({ checklist: ChecklistSchema }) }), ah(async (req, res) => {
  const cur = await loadJob(null, req.user, req.params.id);
  if (!isAdmin(req.user) && ['completed', 'cancelled'].includes(cur.status)) throw conflict(`Job is ${cur.status}`);
  const row = await one(
    `UPDATE jobs SET checklist = $1, updated_at = now() WHERE id = $2 AND company_id = $3 RETURNING checklist`,
    [JSON.stringify(req.body.checklist), cur.id, req.user.company_id]);
  res.json({ checklist: row.checklist });
}));

// POST /jobs/:id/photos
const PhotoBody = z.object({ kind: z.enum(['before', 'after']).default('before'), data_url: photoDataUrl });
router.post('/:id/photos', validate({ params: idParam, body: PhotoBody }), ah(async (req, res) => {
  if (req.body.data_url.length > MAX_PHOTO) throw new HttpError(413, 'too_large', 'Photo exceeds 1.5 MB');
  const cid = req.user.company_id;
  const cur = await loadJob(null, req.user, req.params.id);
  if (cur.status === 'cancelled') throw conflict('Job is cancelled');
  const count = await one('SELECT count(*)::int AS n FROM job_photos WHERE job_id = $1 AND company_id = $2', [cur.id, cid]);
  if (count.n >= 30) throw conflict('Too many photos on this job (max 30)');
  const photo = await tx(async (c) => {
    const { rows } = await c.query(
      `INSERT INTO job_photos (job_id, company_id, kind, data_url) VALUES ($1,$2,$3,$4) RETURNING id, kind, data_url, created_at`,
      [cur.id, cid, req.body.kind, req.body.data_url]);
    await addJobEvent(c, { jobId: cur.id, companyId: cid, type: 'photo',
      message: req.body.kind === 'after' ? 'أُضيفت صورة بعد العمل' : 'أُضيفت صورة قبل العمل', actorUserId: req.user.id });
    return rows[0];
  });
  res.status(201).json(photo);
}));

// DELETE /jobs/:id/photos/:photoId
router.delete('/:id/photos/:photoId',
  validate({ params: z.object({ id: z.string().uuid(), photoId: z.string().uuid() }) }), ah(async (req, res) => {
    const cur = await loadJob(null, req.user, req.params.id);
    const r = await pool.query('DELETE FROM job_photos WHERE id = $1 AND job_id = $2 AND company_id = $3',
      [req.params.photoId, cur.id, req.user.company_id]);
    if (!r.rowCount) throw notFound('Photo not found');
    res.json({ ok: true });
  }));

// POST /jobs/:id/signature
const SigBody = z.object({ data_url: z.string().regex(/^data:image\/(png|jpeg|webp|svg\+xml);base64,[A-Za-z0-9+/=\s]+$/, 'expected image data URL') });
router.post('/:id/signature', validate({ params: idParam, body: SigBody }), ah(async (req, res) => {
  if (req.body.data_url.length > MAX_SIGNATURE) throw new HttpError(413, 'too_large', 'Signature exceeds 500 KB');
  const cid = req.user.company_id;
  const cur = await loadJob(null, req.user, req.params.id);
  if (cur.status === 'cancelled') throw conflict('Job is cancelled');
  await tx(async (c) => {
    await c.query('UPDATE jobs SET customer_signature = $1, updated_at = now() WHERE id = $2 AND company_id = $3',
      [req.body.data_url, cur.id, cid]);
    await addJobEvent(c, { jobId: cur.id, companyId: cid, type: 'signature', message: 'تم توقيع العميل', actorUserId: req.user.id });
  });
  res.json({ ok: true });
}));

// POST /jobs/:id/notes
router.post('/:id/notes', validate({ params: idParam, body: z.object({ message: z.string().trim().min(1).max(2000) }) }), ah(async (req, res) => {
  const cur = await loadJob(null, req.user, req.params.id);
  const ev = await addJobEvent(null, { jobId: cur.id, companyId: req.user.company_id, type: 'note',
    message: req.body.message, actorUserId: req.user.id });
  if (!ev) throw notFound('Job not found');
  res.status(201).json({ ...ev, actor: { id: req.user.id, name: req.user.name } });
}));

// DELETE /jobs/:id
router.delete('/:id', requireRole('owner'), validate({ params: idParam }), ah(async (req, res) => {
  const cid = req.user.company_id;
  await tx(async (c) => {
    const cur = await loadJob(c, req.user, req.params.id, { lock: true });
    if (!['new', 'cancelled'].includes(cur.status)) throw conflict('Only new or cancelled jobs can be deleted');
    const inv = await c.query('SELECT 1 FROM invoices WHERE job_id = $1 AND company_id = $2 LIMIT 1', [cur.id, cid]);
    if (inv.rowCount) throw conflict('Job has an invoice');
    await c.query(`UPDATE booking_requests SET job_id = NULL, status = 'pending' WHERE job_id = $1 AND company_id = $2`, [cur.id, cid]);
    await c.query('DELETE FROM jobs WHERE id = $1 AND company_id = $2', [cur.id, cid]);
  });
  audit(req.user, 'delete', 'job', req.params.id);
  res.json({ ok: true });
}));

export default router;
