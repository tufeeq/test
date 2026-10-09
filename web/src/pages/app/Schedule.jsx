// OWNER: B3. Dispatch board: technician lanes × time grid (07:00–22:00), unassigned tray, drag to assign/reschedule.
// HTML5 drag-and-drop on desktop; tap a job → quick-assign sheet on touch devices.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../lib/api.js';
import { useI18n } from '../../i18n/index.jsx';
import { Button, Modal, Select, Input, StatusBadge, PriorityBadge, useToast, EmptyState } from '../../components/ui/index.js';
import Icon from '../../components/app/icons.jsx';
import { Avatar, ErrorState, Segmented, Skeleton, STATUSES } from '../../components/app/kit.jsx';
import { addDays, greg, hijri, minutesOfDay, riyadhInstant, todayYmd, weekStart, weekday, ymd, timeHM, toLocalInput, fromLocalInput } from '../../components/app/dates.js';
import { cx } from '../../lib/cx.js';

const START_H = 7, END_H = 22;
const SPAN = (END_H - START_H) * 60;
const SNAP = 15;
const LANE_H = 76;

const durMin = (j) => (j.scheduled_start && j.scheduled_end ? Math.max(15, (new Date(j.scheduled_end) - new Date(j.scheduled_start)) / 60000) : 60);
const overlaps = (a, b) => new Date(a.scheduled_start) < new Date(b.scheduled_end || a.scheduled_end) && new Date(b.scheduled_start) < new Date(a.scheduled_end || b.scheduled_end);

/** Ids of jobs that overlap another job for the same technician. */
function findConflicts(jobs) {
  const set = new Set();
  const byTech = {};
  for (const j of jobs) if (j.technician?.id && j.scheduled_start && j.status !== 'cancelled') (byTech[j.technician.id] ||= []).push(j);
  for (const list of Object.values(byTech)) {
    list.sort((a, b) => new Date(a.scheduled_start) - new Date(b.scheduled_start));
    for (let i = 0; i < list.length; i++) for (let k = i + 1; k < list.length; k++) {
      if (new Date(list[k].scheduled_start) >= new Date(list[i].scheduled_end)) break;
      set.add(list[i].id); set.add(list[k].id);
    }
  }
  return set;
}

/** Greedy sub-row packing so overlapping blocks in one lane stack instead of hiding each other. */
function pack(jobs) {
  const rows = [];
  const out = new Map();
  [...jobs].sort((a, b) => new Date(a.scheduled_start) - new Date(b.scheduled_start)).forEach((j) => {
    let r = rows.findIndex((end) => end <= new Date(j.scheduled_start).getTime());
    if (r === -1) { r = rows.length; rows.push(0); }
    rows[r] = new Date(j.scheduled_end || j.scheduled_start).getTime() + (j.scheduled_end ? 0 : 3600000);
    out.set(j.id, r);
  });
  return { rowOf: out, rows: Math.max(1, rows.length) };
}

export default function Schedule() {
  const { t, locale } = useI18n();
  const toast = useToast();
  const nav = useNavigate();
  const [sp, setSp] = useSearchParams();
  const [date, setDate] = useState(sp.get('date') || todayYmd());
  const [view, setView] = useState(sp.get('view') === 'week' ? 'week' : 'day');
  const [statusFilter, setStatusFilter] = useState(() => new Set(STATUSES.filter((s) => s !== 'cancelled')));
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dragId, setDragId] = useState(null);
  const [quick, setQuick] = useState(null);
  const [trayOpen, setTrayOpen] = useState(true);

  const rangeStart = view === 'week' ? weekStart(date) : date;
  const days = view === 'week' ? 7 : 1;

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try { setData(await api.get('/dashboard/schedule', { date: rangeStart, days })); }
    catch (e) { setError(e); }
    finally { setLoading(false); }
  }, [rangeStart, days]);
  useEffect(() => { load(); }, [load]);
  useEffect(() => { setSp({ date, view }, { replace: true }); }, [date, view, setSp]);

  const techs = data?.technicians || [];
  const allJobs = data?.jobs || [];
  const jobs = useMemo(() => allJobs.filter((j) => statusFilter.has(j.status)), [allJobs, statusFilter]);
  const unassigned = useMemo(() => {
    const seen = new Set();
    const a = [...(data?.unassigned || []), ...allJobs.filter((j) => !j.technician)];
    return a.filter((j) => (seen.has(j.id) ? false : seen.add(j.id)));
  }, [data, allJobs]);
  const conflicts = useMemo(() => findConflicts(allJobs), [allJobs]);
  const findJob = useCallback((id) => allJobs.find((j) => j.id === id) || unassigned.find((j) => j.id === id) || null, [allJobs, unassigned]);

  /** Optimistic PATCH; merges result back into the board. */
  const move = useCallback(async (job, { technician, start }) => {
    const dur = durMin(job);
    const patch = {};
    if (technician !== undefined) patch.technician_id = technician ? technician.id : null;
    if (start) { patch.scheduled_start = start.toISOString(); patch.scheduled_end = new Date(start.getTime() + dur * 60000).toISOString(); }
    const optimistic = {
      ...job,
      ...(start ? { scheduled_start: patch.scheduled_start, scheduled_end: patch.scheduled_end } : {}),
      ...(technician !== undefined ? { technician: technician ? { id: technician.id, name: technician.name, color: technician.color } : null } : {}),
    };
    if (optimistic.technician && optimistic.scheduled_start && optimistic.status === 'new') optimistic.status = 'scheduled';
    const prev = data;
    const inRange = optimistic.scheduled_start && ymd(optimistic.scheduled_start) >= rangeStart && ymd(optimistic.scheduled_start) <= addDays(rangeStart, days - 1);
    setData((d) => {
      const others = (d?.jobs || []).filter((x) => x.id !== job.id);
      const un = (d?.unassigned || []).filter((x) => x.id !== job.id);
      return {
        ...d,
        jobs: optimistic.technician && inRange ? [...others, optimistic] : others,
        unassigned: optimistic.technician ? un : [optimistic, ...un],
      };
    });
    // Conflict check against the post-move board
    const clash = optimistic.technician && optimistic.scheduled_start && allJobs.some((x) => x.id !== job.id && x.technician?.id === optimistic.technician.id && x.status !== 'cancelled' && x.scheduled_start && overlaps(x, optimistic));
    try {
      const res = await api.patch(`/jobs/${job.id}`, patch);
      setData((d) => ({ ...d, jobs: (d?.jobs || []).map((x) => (x.id === job.id ? { ...x, ...pickSummary(res) } : x)) }));
      if (clash || res?.warnings?.length) toast.info(t('app.schedule.savedWithConflict'));
      else toast.success(technician === null ? t('app.schedule.unassignedOk') : t('app.schedule.moved', { n: job.number }));
    } catch (e) {
      setData(prev); toast.error(e);
    }
  }, [data, allJobs, rangeStart, days, toast, t]);

  const shift = (n) => setDate((d) => addDays(d, n * (view === 'week' ? 7 : 1)));
  const toggleStatus = (s) => setStatusFilter((cur) => { const n = new Set(cur); n.has(s) ? n.delete(s) : n.add(s); return n; });
  const isToday = date === todayYmd();

  const rangeLabel = view === 'week'
    ? `${greg(rangeStart, locale, { day: 'numeric', month: 'short' })} – ${greg(addDays(rangeStart, 6), locale, { day: 'numeric', month: 'short', year: 'numeric' })}`
    : `${weekday(date, locale, 'long')} ${greg(date, locale, { day: 'numeric', month: 'long', year: 'numeric' })}`;

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight">{t('app.schedule.title')}</h1>
          <p className="text-sand-600 tabular-nums mt-1">{rangeLabel}<span className="text-sand-400"> · {hijri(view === 'week' ? rangeStart : date, locale)}</span></p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center rounded-xl border border-sand-200 bg-white">
            <button onClick={() => shift(-1)} className="h-10 w-10 grid place-items-center hover:bg-petrol-50 rounded-s-xl" aria-label={t('app.schedule.prev')}><Icon name="chevron" size={18} className="rotate-180" /></button>
            <button onClick={() => setDate(todayYmd())} disabled={isToday && view === 'day'} className="h-10 px-3 text-sm font-medium border-x border-sand-200 hover:bg-petrol-50 disabled:text-sand-400">{t('common.today')}</button>
            <button onClick={() => shift(1)} className="h-10 w-10 grid place-items-center hover:bg-petrol-50 rounded-e-xl" aria-label={t('app.schedule.next')}><Icon name="chevron" size={18} /></button>
          </div>
          <input type="date" value={date} onChange={(e) => e.target.value && setDate(e.target.value)} aria-label={t('app.schedule.pickDate')}
            className="h-10 rounded-xl border border-sand-200 bg-white px-3 text-sm tabular-nums" dir="ltr" />
          <Segmented value={view} onChange={setView} items={[{ value: 'day', label: t('app.schedule.day') }, { value: 'week', label: t('app.schedule.week') }]} />
        </div>
      </div>

      {/* Status filter + conflicts */}
      <div className="flex flex-wrap items-center gap-2">
        <Icon name="filter" size={16} className="text-sand-500" />
        {STATUSES.map((s) => (
          <button key={s} onClick={() => toggleStatus(s)} aria-pressed={statusFilter.has(s)}
            className={cx('rounded-full transition-opacity', statusFilter.has(s) ? 'opacity-100' : 'opacity-40 grayscale hover:opacity-70')}>
            <StatusBadge status={s} />
          </button>
        ))}
        {conflicts.size > 0 && (
          <span className="ms-auto inline-flex items-center gap-1.5 rounded-full bg-danger-50 text-danger-700 ring-1 ring-danger-500/30 px-3 py-1 text-sm font-medium">
            <Icon name="alert" size={15} />{t('app.schedule.conflicts', { n: conflicts.size })}
          </span>
        )}
      </div>

      {error && <ErrorState error={error} onRetry={load} />}

      <div className="grid gap-4 grid-cols-[minmax(0,1fr)] xl:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="min-w-0 order-2 xl:order-1">
          {!data && loading ? <Skeleton className="h-[28rem] rounded-2xl" />
            : techs.length === 0 && data ? (
              <div className="rounded-2xl bg-white border border-sand-200/70"><EmptyState title={t('app.schedule.noTechs')} body={t('app.schedule.noTechsBody')}
                action={<Button as={Link} to="/app/team">{t('app.team.invite')}</Button>} /></div>
            ) : view === 'day'
              ? <DayGrid date={date} techs={techs} jobs={jobs} conflicts={conflicts} dragId={dragId} setDragId={setDragId} onMove={move} onOpen={setQuick} findJob={findJob} loading={loading} />
              : <WeekGrid start={rangeStart} techs={techs} jobs={jobs} conflicts={conflicts} dragId={dragId} setDragId={setDragId} onMove={move} onOpen={setQuick}
                onDayClick={(d) => { setDate(d); setView('day'); }} findJob={findJob} loading={loading} />}
          <p className="mt-3 text-sm text-sand-500 hidden md:block">{t('app.schedule.dragHint')}</p>
          <p className="mt-3 text-sm text-sand-500 md:hidden">{t('app.schedule.tapHint')}</p>
        </div>

        {/* Unassigned tray */}
        <aside className="order-1 xl:order-2">
          <Tray jobs={unassigned} open={trayOpen} setOpen={setTrayOpen} dragId={dragId} setDragId={setDragId} onOpen={setQuick}
            onDropUnassign={(id) => { const j = findJob(id); if (j && j.technician) move(j, { technician: null }); }} />
        </aside>
      </div>

      <QuickAssign job={quick} techs={techs} onClose={() => setQuick(null)} onOpenJob={(id) => nav(`/app/jobs/${id}`)}
        onSave={async (job, tech, start) => { setQuick(null); await move(job, { technician: tech, start }); }} />
    </div>
  );
}

const pickSummary = (j) => {
  if (!j || typeof j !== 'object') return {};
  const { id, number, title, category, priority, status, scheduled_start, scheduled_end, customer, site, technician, total } = j;
  return Object.fromEntries(Object.entries({ id, number, title, category, priority, status, scheduled_start, scheduled_end, customer, site, technician, total }).filter(([, v]) => v !== undefined));
};

// ─────────────────────────────── Day view ───────────────────────────────

function DayGrid({ date, techs, jobs, conflicts, dragId, setDragId, onMove, onOpen, findJob, loading }) {
  const { t, locale, dir } = useI18n();
  const [hover, setHover] = useState(null); // { techId, min }
  const hours = Array.from({ length: END_H - START_H + 1 }, (_, i) => START_H + i);
  const now = new Date();
  const showNow = ymd(now) === date && minutesOfDay(now) >= START_H * 60 && minutesOfDay(now) <= END_H * 60;
  const nowPct = ((minutesOfDay(now) - START_H * 60) / SPAN) * 100;
  const dragJob = dragId ? findJob(dragId) : null;

  const minuteFromEvent = (e, el) => {
    const r = el.getBoundingClientRect();
    const x = dir === 'rtl' ? r.right - e.clientX : e.clientX - r.left;
    let m = START_H * 60 + (x / r.width) * SPAN;
    m = Math.round(m / SNAP) * SNAP;
    return Math.max(START_H * 60, Math.min(END_H * 60 - SNAP, m));
  };

  return (
    <div className={cx('rounded-2xl bg-white border border-sand-200/70 shadow-card overflow-x-auto', loading && 'opacity-70')}>
      <div className="min-w-[880px]">
        {/* Hour ruler */}
        <div className="flex border-b border-sand-200 bg-sand-50/80 sticky top-0">
          <div className="w-44 shrink-0 px-4 py-2 text-sm text-sand-600 sticky start-0 bg-sand-50 z-10 border-e border-sand-200">{t('app.schedule.technician')}</div>
          <div className="relative flex-1 h-9">
            {hours.map((h, i) => (
              <span key={h} className="absolute top-2 text-xs text-sand-500 tabular-nums -translate-x-1/2 rtl:translate-x-1/2" style={{ insetInlineStart: `${(i / (hours.length - 1)) * 100}%` }}>
                {i > 0 && i < hours.length - 1 ? `${String(h).padStart(2, '0')}:00` : ''}
              </span>
            ))}
          </div>
        </div>
        {techs.map((tech) => {
          const lane = jobs.filter((j) => j.technician?.id === tech.id && j.scheduled_start);
          const { rowOf, rows } = pack(lane);
          const busyMin = lane.reduce((s, j) => s + durMin(j), 0);
          const h = Math.max(LANE_H, rows * 40 + 12);
          const isHover = hover?.techId === tech.id;
          return (
            <div key={tech.id} className="flex border-b border-sand-100 last:border-0">
              <div className="w-44 shrink-0 px-4 py-3 flex items-center gap-2.5 sticky start-0 bg-white z-10 border-e border-sand-100">
                <Avatar name={tech.name} color={tech.color} size={32} />
                <div className="min-w-0">
                  <div className="font-medium truncate leading-tight">{tech.name}</div>
                  <div className="text-xs text-sand-500 tabular-nums">{t('app.schedule.laneLoad', { n: lane.length, h: (busyMin / 60).toFixed(1) })}</div>
                </div>
              </div>
              <div className={cx('relative flex-1 transition-colors', isHover && 'bg-petrol-50/60')} style={{ height: h }}
                onDragOver={(e) => { if (!dragId) return; e.preventDefault(); e.dataTransfer.dropEffect = 'move'; const m = minuteFromEvent(e, e.currentTarget); if (!isHover || hover.min !== m) setHover({ techId: tech.id, min: m }); }}
                onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setHover(null); }}
                onDrop={(e) => {
                  e.preventDefault(); setHover(null);
                  const id = e.dataTransfer.getData('text/plain') || dragId; setDragId(null);
                  const job = findJob(id);
                  if (!job) return;
                  const m = minuteFromEvent(e, e.currentTarget);
                  onMove(job, { technician: tech, start: riyadhInstant(date, Math.floor(m / 60), m % 60) });
                }}>
                {/* hour grid lines */}
                {hours.map((hh, i) => <span key={hh} className={cx('absolute inset-y-0 w-px', i % 2 ? 'bg-sand-100/70' : 'bg-sand-100')} style={{ insetInlineStart: `${(i / (hours.length - 1)) * 100}%` }} />)}
                {showNow && <span className="absolute inset-y-0 w-0.5 bg-saffron-500 z-[5]" style={{ insetInlineStart: `${nowPct}%` }} aria-hidden="true" />}
                {/* drop preview */}
                {isHover && dragJob && (
                  <span className="absolute top-1.5 bottom-1.5 rounded-lg border-2 border-dashed border-petrol-400 bg-petrol-100/40 z-[4] grid place-items-center text-xs font-semibold text-petrol-700 tabular-nums"
                    style={{ insetInlineStart: `${((hover.min - START_H * 60) / SPAN) * 100}%`, width: `${(durMin(dragJob) / SPAN) * 100}%` }}>
                    {String(Math.floor(hover.min / 60)).padStart(2, '0')}:{String(hover.min % 60).padStart(2, '0')}
                  </span>
                )}
                {lane.map((j) => {
                  const startM = Math.max(START_H * 60, minutesOfDay(j.scheduled_start));
                  const endM = Math.min(END_H * 60, startM + durMin(j));
                  const r = rowOf.get(j.id) || 0;
                  const rowH = (h - 12) / rows;
                  return (
                    <JobBlock key={j.id} job={j} color={tech.color} conflict={conflicts.has(j.id)} dragging={dragId === j.id}
                      setDragId={setDragId} onOpen={onOpen} locale={locale}
                      style={{ insetInlineStart: `${((startM - START_H * 60) / SPAN) * 100}%`, width: `calc(${((endM - startM) / SPAN) * 100}% - 3px)`, top: 6 + r * rowH, height: rowH - 4 }} />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function JobBlock({ job, color = '#0F5C5C', conflict, dragging, setDragId, onOpen, style, locale, compact }) {
  const { t } = useI18n();
  return (
    <button type="button" draggable
      onDragStart={(e) => { e.dataTransfer.setData('text/plain', job.id); e.dataTransfer.effectAllowed = 'move'; setDragId(job.id); }}
      onDragEnd={() => setDragId(null)}
      onClick={() => onOpen(job)}
      title={`#${job.number} · ${job.title} · ${job.customer?.name || ''}`}
      className={cx('text-start rounded-lg overflow-hidden border-s-4 px-2 py-1 cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:shadow-ring',
        style ? 'absolute z-[3]' : 'w-full', dragging && 'opacity-40', conflict && 'ring-2 ring-danger-500', job.status === 'completed' && 'opacity-75')}
      style={{ ...style, background: `${color}1F`, borderColor: color }}>
      <span className="flex items-center gap-1 text-xs font-semibold text-ink leading-tight min-w-0">
        {conflict && <Icon name="alert" size={12} className="text-danger-600 shrink-0" title={t('app.schedule.conflict')} />}
        {job.priority === 'urgent' && <span className="h-1.5 w-1.5 rounded-full bg-danger-500 shrink-0" />}
        <span className="truncate">{job.title}</span>
      </span>
      {!compact && (
        <span className="block text-[11px] text-sand-700 truncate leading-tight tabular-nums">
          {timeHM(job.scheduled_start, locale)} · {job.customer?.name}{job.site?.district ? ` · ${job.site.district}` : ''}
        </span>
      )}
      {compact && <span className="block text-[11px] text-sand-700 truncate tabular-nums">{timeHM(job.scheduled_start, locale)}</span>}
    </button>
  );
}

// ─────────────────────────────── Week view ───────────────────────────────

function WeekGrid({ start, techs, jobs, conflicts, dragId, setDragId, onMove, onOpen, onDayClick, findJob, loading }) {
  const { t, locale } = useI18n();
  const [hover, setHover] = useState(null);
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
  const today = todayYmd();
  return (
    <div className={cx('rounded-2xl bg-white border border-sand-200/70 shadow-card overflow-x-auto', loading && 'opacity-70')}>
      <table className="min-w-[880px] w-full table-fixed border-collapse">
        <thead>
          <tr className="bg-sand-50/80 border-b border-sand-200">
            <th className="w-44 px-4 py-2 text-start text-sm font-medium text-sand-600 sticky start-0 bg-sand-50 z-10">{t('app.schedule.technician')}</th>
            {days.map((d) => (
              <th key={d} className="px-2 py-2 text-start border-s border-sand-100">
                <button onClick={() => onDayClick(d)} className={cx('text-sm rounded-lg px-1.5 py-0.5 hover:bg-petrol-50 text-start', d === today ? 'text-petrol-700 font-bold' : 'text-sand-700 font-medium')}>
                  <span className="block">{weekday(d, locale)} <span className="tabular-nums">{Number(d.slice(8))}</span></span>
                  <span className="block text-[11px] font-normal text-sand-500">{hijri(d, locale, { day: 'numeric', month: 'short' })}</span>
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {techs.map((tech) => (
            <tr key={tech.id} className="border-b border-sand-100 last:border-0 align-top">
              <td className="px-4 py-3 sticky start-0 bg-white z-10 border-e border-sand-100">
                <div className="flex items-center gap-2.5"><Avatar name={tech.name} color={tech.color} size={28} /><span className="font-medium truncate">{tech.name}</span></div>
              </td>
              {days.map((d) => {
                const cell = jobs.filter((j) => j.technician?.id === tech.id && j.scheduled_start && ymd(j.scheduled_start) === d)
                  .sort((a, b) => new Date(a.scheduled_start) - new Date(b.scheduled_start));
                const key = `${tech.id}|${d}`;
                return (
                  <td key={d} className={cx('p-1.5 border-s border-sand-100 h-24 transition-colors', d === today && 'bg-petrol-50/30', hover === key && 'bg-petrol-100/50')}
                    onDragOver={(e) => { if (!dragId) return; e.preventDefault(); if (hover !== key) setHover(key); }}
                    onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setHover(null); }}
                    onDrop={(e) => {
                      e.preventDefault(); setHover(null);
                      const id = e.dataTransfer.getData('text/plain') || dragId; setDragId(null);
                      const job = findJob(id);
                      if (!job) return;
                      // Keep time-of-day; unscheduled jobs land at 09:00.
                      const m = job.scheduled_start ? minutesOfDay(job.scheduled_start) : 9 * 60;
                      onMove(job, { technician: tech, start: riyadhInstant(d, Math.floor(m / 60), m % 60) });
                    }}>
                    <div className="flex flex-col gap-1">
                      {cell.map((j) => <JobBlock key={j.id} job={j} color={tech.color} conflict={conflicts.has(j.id)} dragging={dragId === j.id} setDragId={setDragId} onOpen={onOpen} locale={locale} compact />)}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────── Unassigned tray ───────────────────────────────

function Tray({ jobs, open, setOpen, dragId, setDragId, onOpen, onDropUnassign }) {
  const { t, locale } = useI18n();
  const [over, setOver] = useState(false);
  return (
    <div className={cx('rounded-2xl border transition-colors xl:sticky xl:top-20', over ? 'bg-petrol-50 border-petrol-300' : 'bg-sand-100 border-sand-200/60')}
      onDragOver={(e) => { if (!dragId) return; e.preventDefault(); setOver(true); }}
      onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOver(false); }}
      onDrop={(e) => { e.preventDefault(); setOver(false); const id = e.dataTransfer.getData('text/plain') || dragId; setDragId(null); if (id) onDropUnassign(id); }}>
      <button className="w-full flex items-center gap-2 px-4 py-3 text-start" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="font-semibold flex-1">{t('app.schedule.unassigned')}</span>
        <span className={cx('min-w-[1.5rem] h-6 px-2 rounded-full text-xs font-bold grid place-items-center tabular-nums', jobs.length ? 'bg-saffron-400 text-petrol-900' : 'bg-sand-200 text-sand-600')}>{jobs.length}</span>
        <Icon name="chevronDown" size={16} className={cx('text-sand-500 transition-transform xl:hidden', open && 'rotate-180')} />
      </button>
      <div className={cx('px-3 pb-3 flex-col gap-2 max-h-[60vh] overflow-y-auto', open ? 'flex' : 'hidden xl:flex')}>
        {jobs.length === 0 && <p className="text-sm text-sand-600 px-1 pb-2">{t('app.schedule.trayEmpty')}</p>}
        {jobs.map((j) => (
          <button key={j.id} draggable type="button"
            onDragStart={(e) => { e.dataTransfer.setData('text/plain', j.id); e.dataTransfer.effectAllowed = 'move'; setDragId(j.id); }}
            onDragEnd={() => setDragId(null)} onClick={() => onOpen(j)}
            className={cx('text-start rounded-xl bg-white border border-sand-200 p-3 shadow-card cursor-grab active:cursor-grabbing hover:border-petrol-300 focus-visible:outline-none focus-visible:shadow-ring', dragId === j.id && 'opacity-40')}>
            <span className="flex items-center gap-2">
              <Icon name="grip" size={14} className="text-sand-400" />
              <span className="text-xs text-sand-500 tabular-nums" dir="ltr">#{j.number}</span>
              <PriorityBadge priority={j.priority} />
              {j.source === 'contract' && <Icon name="cycle" size={14} className="text-petrol-500 ms-auto" title={t('app.jobs.source_contract')} />}
            </span>
            <span className="block font-medium mt-1 truncate">{j.title}</span>
            <span className="block text-sm text-sand-600 truncate">{j.customer?.name}{j.site?.district ? ` · ${j.site.district}` : ''}</span>
            {j.scheduled_start && <span className="block text-xs text-sand-500 mt-0.5 tabular-nums">{greg(j.scheduled_start, locale, { day: 'numeric', month: 'short' })} · {timeHM(j.scheduled_start, locale)}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────── Quick assign sheet ───────────────────────────────

function QuickAssign({ job, techs, onClose, onSave, onOpenJob }) {
  const { t, locale } = useI18n();
  const [techId, setTechId] = useState('');
  const [start, setStart] = useState('');
  const [saving, setSaving] = useState(false);
  const ref = useRef(job);
  useEffect(() => {
    ref.current = job;
    if (job) {
      setTechId(job.technician?.id || '');
      setStart(job.scheduled_start ? toLocalInput(job.scheduled_start) : `${todayYmd()}T09:00`);
    }
  }, [job]);
  if (!job) return null;
  const save = async () => {
    setSaving(true);
    const tech = techs.find((x) => x.id === techId) || null;
    await onSave(job, tech, new Date(fromLocalInput(start)));
    setSaving(false);
  };
  return (
    <Modal open={!!job} onClose={onClose} title={<span className="flex items-center gap-2"><span dir="ltr" className="text-sand-500 tabular-nums">#{job.number}</span>{job.title}</span>}
      footer={<>
        <Button variant="ghost" onClick={() => onOpenJob(job.id)} className="me-auto">{t('app.schedule.openJob')}</Button>
        <Button variant="secondary" onClick={onClose}>{t('common.cancel')}</Button>
        <Button onClick={save} loading={saving} disabled={!start}>{t('app.schedule.assign')}</Button>
      </>}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2 text-sm text-sand-700">
          <StatusBadge status={job.status} /><PriorityBadge priority={job.priority} />
          <span>{job.customer?.name}</span>
          {job.site?.district && <span className="text-sand-500">· {job.site.district}</span>}
          {job.scheduled_start && <span className="text-sand-500 tabular-nums">· {greg(job.scheduled_start, locale)} {timeHM(job.scheduled_start, locale)}</span>}
        </div>
        <Select label={t('app.schedule.technician')} value={techId} onChange={(e) => setTechId(e.target.value)} placeholder={t('app.common.unassigned')}
          options={techs.map((x) => ({ value: x.id, label: x.name }))} />
        <Input type="datetime-local" label={t('app.jobs.scheduledStart')} value={start} onChange={(e) => setStart(e.target.value)} dir="ltr" step={900} />
      </div>
    </Modal>
  );
}
