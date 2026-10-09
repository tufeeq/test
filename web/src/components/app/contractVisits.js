// Contract visit planning helpers (client-side; mirrors the scheduler's 365/visits_per_year cadence).
import { api } from '../../lib/api.js';
import { addDays, diffDays, riyadhInstant, todayYmd } from './dates.js';

/** All planned visit dates over the contract term. */
export function plannedVisits(c) {
  if (!c?.start_date || !c?.end_date || !c.visits_per_year) return [];
  const step = 365 / Number(c.visits_per_year);
  const span = diffDays(c.start_date.slice(0, 10), c.end_date.slice(0, 10));
  const out = [];
  for (let i = 0; i * step <= span && out.length < 400; i++) out.push(addDays(c.start_date.slice(0, 10), Math.round(i * step)));
  return out;
}

/**
 * Visits the server would still generate: every round(365/visits_per_year) days from next_visit_date (or today)
 * until end_date, skipping dates that already have a non-cancelled job (±3 days). Mirrors generate-visits.
 */
export function missingVisits(c, jobs = []) {
  if (!c?.end_date || !c.visits_per_year || c.status !== 'active') return [];
  const step = Math.max(1, Math.round(365 / Number(c.visits_per_year)));
  let d = (c.next_visit_date || todayYmd()).slice(0, 10);
  const end = c.end_date.slice(0, 10);
  const taken = jobs.filter((j) => j.status !== 'cancelled' && j.scheduled_start).map((j) => j.scheduled_start.slice(0, 10));
  const out = [];
  while (d <= end && out.length < 400) {
    if (!taken.some((x) => Math.abs(diffDays(x, d)) <= 3)) out.push(d);
    d = addDays(d, step);
  }
  return out;
}

/**
 * Generate visit jobs via POST /contracts/:id/generate-visits (B1; idempotent, advances next_visit_date).
 * Falls back to creating `new` jobs one by one only if that route is missing.
 */
export async function generateVisits(c, jobs, { technician_id, limit = 12 } = {}) {
  try {
    const r = await api.post(`/contracts/${c.id}/generate-visits`, { ...(technician_id ? { technician_id } : {}), count: limit });
    return { created: typeof r?.created === 'number' ? r.created : (r?.jobs || []).length, skipped: r?.skipped || [], warnings: r?.warnings || [], server: true };
  } catch (e) {
    if (!(e.status === 404 && /No route/i.test(e.message || ''))) throw e;
  }
  const dates = missingVisits(c, jobs).slice(0, limit);
  let created = 0;
  for (const d of dates) {
    await api.post('/jobs', {
      customer_id: c.customer.id, ...(c.site?.id ? { site_id: c.site.id } : {}), contract_id: c.id,
      title: c.title, category: 'maintenance', source: 'contract', scheduled_start: riyadhInstant(d, 9, 0).toISOString(),
      ...(technician_id ? { technician_id } : {}),
    });
    created++;
  }
  if (dates.length) {
    const step = Math.round(365 / Number(c.visits_per_year));
    await api.patch(`/contracts/${c.id}`, { next_visit_date: addDays(dates[dates.length - 1], step) }).catch(() => {});
  }
  return { created, skipped: [], warnings: [], server: false };
}
