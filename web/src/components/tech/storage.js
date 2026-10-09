// OWNER: B4. localStorage helpers for the tech PWA. Storage can be blocked (private mode, quota) — never throw.
export function lsGet(key, fallback = null) {
  try {
    const raw = globalThis.localStorage?.getItem(key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function lsSet(key, value) {
  try {
    globalThis.localStorage?.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function lsDel(key) {
  try { globalThis.localStorage?.removeItem(key); } catch { /* ignore */ }
}

/** Cache a job for offline viewing. Photo data URLs are dropped (quota) except ones still pending upload. */
export function cacheJob(job) {
  if (!job?.id) return;
  const slim = { ...job, photos: (job.photos || []).map((p) => (p.pending ? p : { ...p, data_url: null })) };
  if (!lsSet(`dawra_tech_job_${job.id}`, slim)) lsSet(`dawra_tech_job_${job.id}`, { ...slim, photos: [] });
}
export const cachedJob = (id) => lsGet(`dawra_tech_job_${id}`);

/** Riyadh calendar date (YYYY-MM-DD) for a Date or ISO string, offset by `days`. */
export function riyadhDay(d = new Date(), days = 0) {
  const t = new Date(d).getTime() + 3 * 3600e3 + days * 86400e3;
  return new Date(t).toISOString().slice(0, 10);
}
/** UTC instant for 00:00 Riyadh on the given Riyadh date. */
export function riyadhMidnight(day) {
  return new Date(`${day}T00:00:00+03:00`);
}
