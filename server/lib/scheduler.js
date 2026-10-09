// OWNER: B5. Hourly background jobs: contract visit auto-scheduler, day-before reminders, trial expiry.
// Contract: startScheduler() is called once on boot by server/index.js (skipped if DISABLE_SCHEDULER=true).
//           runContractScheduler() → Promise<{ created: number }>  (frozen; idempotent)
//           runOnce(opts?) → Promise<{ skipped?, contracts: {created, expired, notified}, reminders: {sent}, trials: {expired} }>
// Multi-instance safe: every run takes a Postgres session advisory lock; a second instance just skips.
// Env: SCHEDULER_LEAD_DAYS (default 14) — create a contract visit job this many days before next_visit_date.
import { pool, nextNumber } from './db.js';
import { notifyContractVisit, notifyJobEvent } from './notify.js';

const LOCK_KEY = 50_550_505; // B5 scheduler; migrate.js uses 727272
const leadDays = () => Math.min(Math.max(parseInt(process.env.SCHEDULER_LEAD_DAYS, 10) || 14, 1), 60);
const TODAY = `(now() AT TIME ZONE 'Asia/Riyadh')::date`;
const OPEN = `('new','scheduled','on_the_way','in_progress')`;

const CONTRACT_CHECKLIST = [
  { label: 'غسيل الفلاتر والوحدة الداخلية', done: false },
  { label: 'فحص ضغط الفريون', done: false },
  { label: 'تنظيف المكثف (الوحدة الخارجية)', done: false },
  { label: 'فحص الكباستور والتوصيلات الكهربائية', done: false },
  { label: 'فحص خط التصريف', done: false },
  { label: 'قياس حرارة الهواء الخارج', done: false },
];

/** Advance a 'YYYY-MM-DD' by n days (UTC date math; no TZ drift). */
export function addDays(ymd, n) {
  const d = new Date(`${String(ymd).slice(0, 10)}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}
export const visitInterval = (visitsPerYear) => Math.max(1, Math.round(365 / Math.max(1, Number(visitsPerYear) || 1)));

/** Step 1: expire ended contracts, create due visit jobs, advance next_visit_date. */
async function contractsStep({ notify = true } = {}) {
  const out = { created: 0, expired: 0, notified: 0, jobs: [] };
  const expired = await pool.query(
    `UPDATE contracts SET status = 'expired' WHERE status = 'active' AND end_date < ${TODAY} RETURNING id`
  );
  out.expired = expired.rowCount;

  const due = await pool.query(
    `SELECT ct.id, ct.company_id
       FROM contracts ct JOIN companies co ON co.id = ct.company_id
      WHERE ct.status = 'active'
        AND ct.next_visit_date IS NOT NULL
        AND ct.next_visit_date <= ${TODAY} + $1::int
        AND ct.next_visit_date <= ct.end_date
        AND co.plan <> 'starter'
        AND co.subscription_status NOT IN ('expired','cancelled')
      ORDER BY ct.next_visit_date
      LIMIT 500`,
    [leadDays()]
  );

  for (const { id, company_id: companyId } of due.rows) {
    const client = await pool.connect();
    let created = null;
    try {
      await client.query('BEGIN');
      // Lock the contract row; another worker (or a concurrent PATCH) holding it → skip this round.
      const { rows: [ct] } = await client.query(
        `SELECT * FROM contracts WHERE id = $1 AND company_id = $2 AND status = 'active'
           AND next_visit_date IS NOT NULL AND next_visit_date <= ${TODAY} + $3::int
         FOR UPDATE SKIP LOCKED`,
        [id, companyId, leadDays()]
      );
      if (!ct) { await client.query('ROLLBACK'); continue; }
      const { rows: [open] } = await client.query(
        `SELECT id FROM jobs WHERE company_id = $1 AND contract_id = $2 AND status IN ${OPEN} LIMIT 1`,
        [companyId, ct.id]
      );
      if (open) { await client.query('ROLLBACK'); continue; } // previous visit still open → wait

      const visitDate = ct.next_visit_date;
      const number = await nextNumber(client, 'jobs', companyId);
      const { rows: [job] } = await client.query(
        `INSERT INTO jobs (company_id, number, customer_id, site_id, contract_id, title, description, category, priority, status, source, checklist)
         VALUES ($1,$2,$3,$4,$5,$6,$7,'maintenance','normal','new','contract',$8::jsonb)
         RETURNING id, number`,
        [companyId, number, ct.customer_id, ct.site_id, ct.id,
          `زيارة صيانة دورية - ${ct.title}`.slice(0, 200),
          `زيارة دورية ضمن عقد الصيانة، موعدها المقرر ${visitDate}. أنشأها دورة تلقائياً.`,
          JSON.stringify(CONTRACT_CHECKLIST)]
      );
      await client.query(
        `INSERT INTO job_events (job_id, company_id, type, message) VALUES ($1,$2,'created',$3)`,
        [job.id, companyId, `أُنشئت تلقائياً من عقد الصيانة «${ct.title}» لزيارة ${visitDate}`]
      );
      // Advance at least once; skip visits that are already in the past so we never create a backlog burst.
      const step = visitInterval(ct.visits_per_year);
      let next = addDays(visitDate, step);
      const { rows: [{ today }] } = await client.query(`SELECT ${TODAY}::text AS today`);
      while (next < today) next = addDays(next, step);
      await client.query(
        `UPDATE contracts SET next_visit_date = $3 WHERE id = $1 AND company_id = $2`,
        [ct.id, companyId, next > ct.end_date ? null : next]
      );
      await client.query('COMMIT');
      created = { jobId: job.id, number: job.number, contractId: ct.id, companyId, visitDate };
    } catch (e) {
      await client.query('ROLLBACK').catch(() => {});
      console.error('[scheduler] contract', id, e.message);
    } finally {
      client.release();
    }
    if (created) {
      out.created++;
      out.jobs.push(created);
      if (notify) {
        const msg = await notifyContractVisit({ contractId: created.contractId, companyId, jobId: created.jobId, visitDate: created.visitDate });
        if (msg) out.notified++;
      }
    }
  }
  return out;
}

/** Step 2: day-before reminders for scheduled jobs (once per job; claimed atomically via reminder_sent_at). */
async function remindersStep({ quietHours = true } = {}) {
  if (quietHours) {
    const { rows: [{ h }] } = await pool.query(`SELECT extract(hour FROM now() AT TIME ZONE 'Asia/Riyadh')::int AS h`);
    if (h < 9 || h >= 21) return { sent: 0, quiet: true }; // don't wake customers up
  }
  const { rows } = await pool.query(
    `UPDATE jobs SET reminder_sent_at = now()
      WHERE id IN (
        SELECT j.id FROM jobs j JOIN companies co ON co.id = j.company_id
         WHERE j.status = 'scheduled' AND j.reminder_sent_at IS NULL AND j.scheduled_start IS NOT NULL
           AND (j.scheduled_start AT TIME ZONE 'Asia/Riyadh')::date = ${TODAY} + 1
           AND co.plan <> 'starter' AND co.subscription_status NOT IN ('expired','cancelled')
         LIMIT 500
         FOR UPDATE OF j SKIP LOCKED)
      RETURNING id`
  );
  let sent = 0;
  for (const { id } of rows) {
    const msg = await notifyJobEvent(id, 'job_reminder', { force: true });
    if (msg) sent++;
  }
  return { sent, claimed: rows.length };
}

/** Step 3: trials past trial_ends_at → expired. */
async function trialsStep() {
  const r = await pool.query(
    `UPDATE companies SET subscription_status = 'expired'
      WHERE subscription_status = 'trialing' AND trial_ends_at IS NOT NULL AND trial_ends_at < now()`
  );
  return { expired: r.rowCount };
}

/**
 * One full scheduler pass under a cluster-wide advisory lock. Never throws.
 * opts: { quietHours=true, notify=true }
 */
export async function runOnce(opts = {}) {
  let client;
  try {
    client = await pool.connect();
  } catch (e) {
    console.error('[scheduler] no db', e.message);
    return { skipped: true, reason: 'db_unavailable' };
  }
  let locked = false;
  try {
    const { rows: [r] } = await client.query('SELECT pg_try_advisory_lock($1) AS ok', [LOCK_KEY]);
    locked = r.ok;
    if (!locked) return { skipped: true, reason: 'locked' };
    const started = Date.now();
    const result = { contracts: null, reminders: null, trials: null };
    for (const [key, fn] of [['trials', trialsStep], ['contracts', contractsStep], ['reminders', remindersStep]]) {
      try { result[key] = await fn(opts); }
      catch (e) { console.error(`[scheduler] ${key}`, e.message); result[key] = { error: e.message }; }
    }
    result.ms = Date.now() - started;
    await client.query(
      `INSERT INTO scheduler_runs (started_at, finished_at, result) VALUES (to_timestamp($1 / 1000.0), now(), $2)`,
      [started, JSON.stringify({ ...result, contracts: result.contracts && { ...result.contracts, jobs: undefined } })]
    ).catch(() => {}); // table may not exist before migration 050
    return result;
  } catch (e) {
    console.error('[scheduler] run failed', e.message);
    return { skipped: true, reason: 'error', error: e.message };
  } finally {
    if (locked) await client.query('SELECT pg_advisory_unlock($1)', [LOCK_KEY]).catch(() => {});
    client.release();
  }
}

/** Frozen contract: contract step only (still under the lock). */
export async function runContractScheduler() {
  const r = await runOnce({ quietHours: true });
  return { created: r?.contracts?.created || 0 };
}

let timer = null;
let bootTimer = null;
export function startScheduler() {
  if (timer) return;
  const tick = () => runOnce().then((r) => {
    if (r.skipped) return;
    const c = r.contracts || {};
    if (c.created || c.expired || r.reminders?.sent || r.trials?.expired) {
      console.log(`[scheduler] contracts+${c.created || 0} expired:${c.expired || 0} reminders:${r.reminders?.sent || 0} trials-expired:${r.trials?.expired || 0}`);
    }
  }).catch((e) => console.error('[scheduler]', e.message));
  bootTimer = setTimeout(tick, 30 * 1000); // first pass shortly after boot (migrations done by then)
  bootTimer.unref();
  timer = setInterval(tick, 60 * 60 * 1000);
  timer.unref();
}
export function stopScheduler() {
  clearInterval(timer); clearTimeout(bootTimer); timer = null; bootTimer = null;
}
