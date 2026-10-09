// /api/dashboard — OWNER: B1. docs/API.md § 7 (schedule board + KPIs).
import { Router } from 'express';
import { requireRole } from '../lib/auth.js';
import { one, many } from '../lib/db.js';
import { ah } from '../lib/errors.js';
import { validate, z, isoDate } from '../lib/validate.js';
import { listJobSummaries } from './jobs.js';

const router = Router();
router.use(requireRole('owner', 'dispatcher'));

const TODAY = `(now() AT TIME ZONE 'Asia/Riyadh')::date`;
const LOCAL = (col) => `(${col} AT TIME ZONE 'Asia/Riyadh')`;

/** 'YYYY-MM-DD' Riyadh midnight → Date (UTC). */
const riyadhMidnight = (d) => new Date(`${d}T00:00:00+03:00`);

// GET /dashboard/schedule?date=YYYY-MM-DD&days=1..7&technician_id=
router.get('/schedule', validate({
  query: z.object({
    date: isoDate.optional(),
    days: z.coerce.number().int().min(1).max(31).optional(),
    technician_id: z.string().uuid().optional(),
  }).passthrough(),
}), ah(async (req, res) => {
  const cid = req.user.company_id;
  const f = req.validQuery;
  const date = f.date || (await one(`SELECT ${TODAY}::text AS d`)).d;
  const days = f.days || 1;
  const from = riyadhMidnight(date);
  const to = new Date(from.getTime() + days * 86400000);
  const p = [cid, from, to];
  let techFilter = '';
  if (f.technician_id) { p.push(f.technician_id); techFilter = ` AND j.technician_id = $${p.length}`; }
  const [technicians, jobs, unassigned] = await Promise.all([
    many(`SELECT id, name, color, skills, phone FROM users
           WHERE company_id = $1 AND role = 'technician' AND active ORDER BY name`, [cid]),
    listJobSummaries(null,
      `j.company_id = $1 AND j.status <> 'cancelled' AND j.scheduled_start < $3
         AND COALESCE(j.scheduled_end, j.scheduled_start) >= $2${techFilter}`,
      p, 'ORDER BY j.scheduled_start, j.number'),
    listJobSummaries(null, `j.company_id = $1 AND j.status = 'new'`, [cid],
      `ORDER BY CASE j.priority WHEN 'urgent' THEN 0 WHEN 'normal' THEN 1 ELSE 2 END, j.created_at LIMIT 200`),
  ]);
  res.json({ date, days, from: from.toISOString(), to: to.toISOString(), technicians, jobs, unassigned });
}));

// GET /dashboard/summary
router.get('/summary', ah(async (req, res) => {
  const cid = req.user.company_id;
  const [today, revenue, byStatus, week, upcoming, pending, rating, ftf, techs, top, trend] = await Promise.all([
    one(`SELECT count(*)::int AS total,
                count(*) FILTER (WHERE status = 'completed')::int AS completed,
                count(*) FILTER (WHERE status = 'in_progress')::int AS in_progress,
                count(*) FILTER (WHERE status = 'on_the_way')::int AS on_the_way,
                count(*) FILTER (WHERE status = 'scheduled')::int AS scheduled,
                count(*) FILTER (WHERE technician_id IS NULL AND status <> 'cancelled')::int AS unassigned
           FROM jobs WHERE company_id = $1 AND status <> 'cancelled'
            AND ${LOCAL('scheduled_start')}::date = ${TODAY}`, [cid]),
    one(`SELECT
           COALESCE(sum(total) FILTER (WHERE status = 'paid' AND date_trunc('month', ${LOCAL('paid_at')}) = date_trunc('month', ${TODAY}::timestamp)), 0) AS month,
           COALESCE(sum(total) FILTER (WHERE status = 'paid' AND date_trunc('month', ${LOCAL('paid_at')}) = date_trunc('month', ${TODAY}::timestamp) - interval '1 month'), 0) AS last_month,
           COALESCE(sum(total) FILTER (WHERE status = 'unpaid'), 0) AS unpaid_total,
           count(*) FILTER (WHERE status = 'unpaid')::int AS unpaid_count,
           COALESCE(sum(total) FILTER (WHERE status <> 'void' AND date_trunc('month', ${LOCAL('issue_date')}) = date_trunc('month', ${TODAY}::timestamp)), 0) AS invoiced_month
         FROM invoices WHERE company_id = $1`, [cid]),
    many(`SELECT status, count(*)::int AS n FROM jobs WHERE company_id = $1 GROUP BY status`, [cid]),
    one(`SELECT count(*)::int AS completed FROM jobs WHERE company_id = $1 AND status = 'completed'
           AND ${LOCAL('completed_at')} >= date_trunc('week', ${TODAY}::timestamp + interval '1 day') - interval '1 day'`, [cid]),
    many(`SELECT ct.id AS contract_id, ct.title, c.name AS customer_name, ct.next_visit_date, ct.customer_id
            FROM contracts ct JOIN customers c ON c.id = ct.customer_id
           WHERE ct.company_id = $1 AND ct.status = 'active' AND ct.next_visit_date IS NOT NULL
             AND ct.next_visit_date <= ${TODAY} + 30
           ORDER BY ct.next_visit_date LIMIT 20`, [cid]),
    one(`SELECT count(*)::int AS n FROM booking_requests WHERE company_id = $1 AND status = 'pending'`, [cid]),
    one(`SELECT round(avg(rating)::numeric, 2) AS avg, count(rating)::int AS n FROM jobs WHERE company_id = $1 AND rating IS NOT NULL`, [cid]),
    // First-time-fix proxy: completed jobs (last 90 days) with no other job for the same site/customer in the following 14 days.
    one(`SELECT count(*)::int AS total,
                count(*) FILTER (WHERE NOT EXISTS (
                  SELECT 1 FROM jobs j2 WHERE j2.company_id = j.company_id AND j2.id <> j.id
                     AND j2.customer_id = j.customer_id AND COALESCE(j2.site_id::text,'') = COALESCE(j.site_id::text,'')
                     AND j2.source <> 'contract' AND j2.status <> 'cancelled'
                     AND j2.created_at > j.completed_at AND j2.created_at <= j.completed_at + interval '14 days'))::int AS fixed
           FROM jobs j WHERE j.company_id = $1 AND j.status = 'completed' AND j.completed_at >= now() - interval '90 days'`, [cid]),
    many(`SELECT u.id, u.name, u.color,
                 count(j.id) FILTER (WHERE j.status <> 'cancelled')::int AS jobs_today,
                 count(j.id) FILTER (WHERE j.status = 'completed')::int AS completed_today,
                 CASE WHEN bool_or(j.status = 'in_progress') THEN 'in_progress'
                      WHEN bool_or(j.status = 'on_the_way') THEN 'on_the_way' ELSE 'idle' END AS status
            FROM users u
            LEFT JOIN jobs j ON j.technician_id = u.id AND j.company_id = u.company_id
                 AND (${LOCAL('j.scheduled_start')}::date = ${TODAY} OR j.status IN ('on_the_way','in_progress'))
           WHERE u.company_id = $1 AND u.role = 'technician' AND u.active
           GROUP BY u.id ORDER BY u.name`, [cid]),
    many(`SELECT u.id, u.name, u.color,
                 count(j.id)::int AS completed_jobs,
                 COALESCE(sum((SELECT sum(ji.qty * ji.unit_price) FROM job_items ji WHERE ji.job_id = j.id)), 0)::numeric(12,2) AS revenue,
                 round(avg(j.rating)::numeric, 2) AS rating_avg
            FROM users u
            JOIN jobs j ON j.technician_id = u.id AND j.company_id = u.company_id AND j.status = 'completed'
                 AND j.completed_at >= date_trunc('month', now()) - interval '1 month'
           WHERE u.company_id = $1
           GROUP BY u.id ORDER BY completed_jobs DESC, revenue DESC LIMIT 5`, [cid]),
    many(`SELECT d::date::text AS date,
                 count(j.id) FILTER (WHERE j.id IS NOT NULL AND j.status <> 'cancelled')::int AS scheduled,
                 count(j.id) FILTER (WHERE j.status = 'completed')::int AS completed
            FROM generate_series(${TODAY} - 13, ${TODAY}, interval '1 day') d
            LEFT JOIN jobs j ON j.company_id = $1 AND ${LOCAL('j.scheduled_start')}::date = d::date
           GROUP BY d ORDER BY d`, [cid]),
  ]);
  const jobs_by_status = { new: 0, scheduled: 0, on_the_way: 0, in_progress: 0, completed: 0, cancelled: 0 };
  for (const r of byStatus) jobs_by_status[r.status] = r.n;
  res.json({
    today,
    revenue,
    jobs_by_status,
    completed_this_week: week.completed,
    upcoming_contract_visits: upcoming,
    pending_requests: pending.n,
    rating_avg: rating.avg,
    rating_count: rating.n,
    first_time_fix: { rate: ftf.total ? Math.round((ftf.fixed / ftf.total) * 1000) / 10 : null, completed: ftf.total, fixed_first_time: ftf.fixed },
    technicians: techs,
    top_technicians: top,
    trend,
  });
}));

export default router;
