// OWNER: B4. Technician home: my jobs for today and tomorrow, in time order, with map/call/WhatsApp.
// Works offline from the last successful load (localStorage).
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api.js';
import { useAuth } from '../../lib/auth.jsx';
import { Spinner } from '../../components/ui/index.js';
import { TechStatusBadge as StatusBadge, TechPriorityBadge as PriorityBadge } from '../../components/tech/TechBadges.jsx';
import { cx } from '../../lib/cx.js';
import { useTechI18n } from '../../components/tech/techI18n.jsx';
import { lsGet, lsSet, riyadhDay, riyadhMidnight } from '../../components/tech/storage.js';
import { pendingFor, useOfflineQueue } from '../../components/tech/offlineQueue.js';
import ContactBar from '../../components/tech/ContactBar.jsx';
import { IconRefresh, IconChevron, IconClock } from '../../components/tech/icons.jsx';

const CACHE_KEY = 'dawra_tech_today_v1';
const ACTIVE = ['on_the_way', 'in_progress'];

/** GET my jobs from today 00:00 to the day after tomorrow 00:00 (Riyadh). */
export async function fetchMyJobs() {
  const today = riyadhDay();
  const res = await api.get('/jobs', {
    technician_id: 'me',
    from: riyadhMidnight(today).toISOString(),
    to: riyadhMidnight(riyadhDay(new Date(), 2)).toISOString(),
    status: 'scheduled,on_the_way,in_progress,completed',
    limit: 100,
  });
  const items = res?.items || [];
  lsSet(CACHE_KEY, { at: Date.now(), day: today, items });
  return items;
}

/** Apply queued (offline) status changes on top of server data so the list matches what the tech did. */
function overlay(job) {
  const st = pendingFor(job.id).filter((p) => p.path.endsWith('/status')).pop();
  return st ? { ...job, status: st.body.status } : job;
}

export default function TechToday() {
  const { t, fmtTime, fmtDateTime } = useTechI18n();
  const { user } = useAuth();
  const q = useOfflineQueue();
  const [state, setState] = useState(() => {
    const c = lsGet(CACHE_KEY);
    return { items: c?.items || null, at: c?.at || null, loading: true, error: null, fromCache: Boolean(c) };
  });

  const load = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const items = await fetchMyJobs();
      setState({ items, at: Date.now(), loading: false, error: null, fromCache: false });
    } catch (e) {
      setState((s) => ({ ...s, loading: false, error: e }));
    }
  }, []);

  useEffect(() => { load(); }, [load]);
  // Refresh when the app comes back to the foreground or the network returns.
  useEffect(() => {
    const vis = () => document.visibilityState === 'visible' && load();
    document.addEventListener('visibilitychange', vis);
    window.addEventListener('online', load);
    return () => { document.removeEventListener('visibilitychange', vis); window.removeEventListener('online', load); };
  }, [load]);

  const { today, tomorrow, next, counts } = useMemo(() => {
    const d0 = riyadhDay();
    const d1 = riyadhDay(new Date(), 1);
    const all = (state.items || []).map(overlay)
      .sort((a, b) => new Date(a.scheduled_start || 8.64e15) - new Date(b.scheduled_start || 8.64e15));
    const today = all.filter((j) => j.scheduled_start && riyadhDay(j.scheduled_start) === d0);
    const tomorrow = all.filter((j) => j.scheduled_start && riyadhDay(j.scheduled_start) === d1);
    const next = today.find((j) => ACTIVE.includes(j.status)) || today.find((j) => j.status === 'scheduled') || null;
    return { today, tomorrow, next, counts: { total: today.length, done: today.filter((j) => j.status === 'completed').length } };
    // q.pending: re-overlay when the queue changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.items, q.pending]);

  const hour = Number(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hour12: false, timeZone: 'Asia/Riyadh' }).format(new Date()));
  const firstName = (user?.name || '').split(/\s+/)[0];

  return (
    <div className="flex flex-col gap-5">
      <section className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold leading-tight">{t(hour < 12 ? 'tech.today.morning' : 'tech.today.evening', { name: firstName })}</h1>
          <p className="text-base text-sand-700 mt-0.5 tabular-nums">{t('tech.today.summary', counts)}</p>
        </div>
        <button onClick={load} disabled={state.loading} aria-label={t('tech.today.refresh')}
          className="shrink-0 h-12 w-12 grid place-items-center rounded-xl bg-white border border-sand-200 text-petrol-700 active:bg-petrol-50 disabled:opacity-60">
          {state.loading ? <Spinner size={20} /> : <IconRefresh size={22} />}
        </button>
      </section>

      {state.error && (
        <p role="alert" className="rounded-xl bg-danger-50 text-danger-700 px-4 py-3 text-base">
          {t('tech.today.loadError')}
          {state.at && <span className="block text-sm mt-1 text-sand-700">{t('tech.net.cachedAt', { time: fmtDateTime(state.at) })}</span>}
        </p>
      )}

      {state.items === null && state.loading ? (
        <div className="py-16 grid place-items-center text-petrol-600"><Spinner size={32} /></div>
      ) : (
        <>
          <DaySection title={t('tech.today.today')} jobs={today} next={next} empty={[t('tech.today.emptyToday'), t('tech.today.emptyTodayBody')]} t={t} fmtTime={fmtTime} techName={firstName} />
          <DaySection title={t('tech.today.tomorrow')} jobs={tomorrow} empty={[t('tech.today.emptyTomorrow'), t('tech.today.emptyTomorrowBody')]} t={t} fmtTime={fmtTime} techName={firstName} muted />
        </>
      )}
    </div>
  );
}

function DaySection({ title, jobs, next, empty, t, fmtTime, techName, muted }) {
  return (
    <section aria-label={title}>
      <h2 className="text-lg font-bold text-petrol-800 mb-2 flex items-center gap-2">
        {title}
        <span className="text-sm font-semibold rounded-full bg-sand-200 text-sand-800 px-2 tabular-nums">{jobs.length}</span>
      </h2>
      {jobs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-sand-300 bg-white/60 px-4 py-6 text-center">
          <p className="font-semibold text-ink">{empty[0]}</p>
          <p className="text-sm text-sand-700 mt-1">{empty[1]}</p>
        </div>
      ) : (
        <ol className="flex flex-col gap-3">
          {jobs.map((j) => <JobCard key={j.id} job={j} isNext={next?.id === j.id} t={t} fmtTime={fmtTime} techName={techName} muted={muted} />)}
        </ol>
      )}
    </section>
  );
}

function JobCard({ job, isNext, t, fmtTime, techName, muted }) {
  const done = job.status === 'completed';
  const site = job.site;
  const place = [site?.district, site?.city].filter(Boolean).join('، ');
  return (
    <li className={cx(
      'rounded-2xl bg-white border overflow-hidden',
      isNext ? 'border-petrol-600 ring-2 ring-petrol-600/20' : 'border-sand-200',
      done && 'opacity-75'
    )}>
      <Link to={`/tech/jobs/${job.id}`} className="block px-4 pt-4 pb-3 active:bg-petrol-50/60">
        <div className="flex items-start gap-3">
          <div className={cx('shrink-0 rounded-xl px-2.5 py-2 text-center min-w-[72px]', isNext ? 'bg-petrol-700 text-white' : muted ? 'bg-sand-100 text-sand-800' : 'bg-petrol-50 text-petrol-800')}>
            <IconClock size={16} className="mx-auto mb-0.5 opacity-80" />
            <span className="block text-base font-bold tabular-nums leading-tight" dir="ltr">
              {job.scheduled_start ? fmtTime(job.scheduled_start) : '—'}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              {isNext && <span className="text-xs font-bold text-petrol-700 bg-petrol-50 rounded-full px-2 py-0.5">{t('tech.today.next')}</span>}
              <StatusBadge status={job.status} />
              <PriorityBadge priority={job.priority} />
            </div>
            <p className="text-lg font-bold leading-snug mt-1 text-ink">{job.customer?.name}</p>
            <p className="text-base text-sand-800 truncate">{job.title}</p>
            {place && <p className="text-sm text-sand-600 mt-0.5 truncate">{place}</p>}
          </div>
          <IconChevron size={22} className="shrink-0 text-sand-500 mt-6" />
        </div>
      </Link>
      {!done && (
        <ContactBar compact site={site} phone={job.customer?.phone} className="px-4 pb-4"
          waText={t('tech.contact.waGreeting', { name: job.customer?.name || '', tech: techName, number: job.number })} />
      )}
    </li>
  );
}
