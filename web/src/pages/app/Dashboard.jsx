// OWNER: B3. Owner dashboard: today at a glance, cash, contracts due, team.
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api.js';
import { useAsync } from '../../lib/useAsync.js';
import { useAuth } from '../../lib/auth.jsx';
import { useI18n } from '../../i18n/index.jsx';
import { Button, Card, EmptyState, StatusBadge, PriorityBadge } from '../../components/ui/index.js';
import Icon from '../../components/app/icons.jsx';
import { Avatar, DualDate, ErrorState, Money, Skeleton, SkeletonRows, Ltr } from '../../components/app/kit.jsx';
import { addDays, greg, hijri, relDays, riyadhInstant, timeHM, todayYmd, ymd, weekday } from '../../components/app/dates.js';
import { cx } from '../../lib/cx.js';

const TREND_DAYS = 14;

export default function Dashboard() {
  const { t, locale } = useI18n();
  const { user } = useAuth();
  const today = todayYmd();
  const from = addDays(today, -(TREND_DAYS - 1));

  const summary = useAsync(() => api.get('/dashboard/summary'), []);
  const sched = useAsync(() => api.get('/dashboard/schedule', { date: today }), [today]);
  const unpaid = useAsync(() => api.get('/invoices', { status: 'unpaid', limit: 5 }), []);
  const s = summary.data;
  // B1's summary ships `trend` + `top_technicians`; only fall back to raw jobs when they're missing.
  const needJobs = !!s && (!Array.isArray(s.trend) || !Array.isArray(s.top_technicians));
  const trend = useAsync(() => (needJobs
    ? api.get('/jobs', { from: riyadhInstant(from).toISOString(), to: riyadhInstant(addDays(today, 1)).toISOString(), limit: 200 })
    : Promise.resolve(null)), [needJobs, from]);
  const trendDays = useMemo(() => buildTrend(s?.trend, trend.data?.items, from), [s, trend.data, from]);
  const hour = Number(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hour12: false, timeZone: 'Asia/Riyadh' }).format(new Date()));
  const greet = hour < 12 ? t('app.dash.morning') : t('app.dash.evening');
  const firstName = (user?.name || '').split(/\s+/)[0];

  const revDelta = s && s.revenue?.last_month ? Math.round(((s.revenue.month - s.revenue.last_month) / s.revenue.last_month) * 100) : null;

  return (
    <div className="flex flex-col gap-6">
      {/* Greeting strip — dual calendar, the one place we show Hijri prominently */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <p className="text-sand-600 tabular-nums">{weekday(today, locale, 'long')} · {greg(today, locale, { day: 'numeric', month: 'long', year: 'numeric' })} · {hijri(today, locale)}</p>
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight mt-1">{greet}، {firstName}</h1>
        </div>
        <div className="flex gap-2">
          <Button as={Link} to="/app/schedule" variant="secondary" icon={<Icon name="schedule" size={17} />}>{t('app.dash.openBoard')}</Button>
        </div>
      </div>

      {summary.error && <ErrorState error={summary.error} onRetry={summary.reload} />}

      {s?.pending_requests > 0 && (
        <Link to="/app/requests" className="rounded-2xl bg-saffron-50 border border-saffron-200 px-5 py-4 flex items-center gap-4 hover:bg-saffron-100/70 transition-colors">
          <span className="h-10 w-10 rounded-full bg-saffron-400 text-petrol-900 grid place-items-center font-bold tabular-nums">{s.pending_requests}</span>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-petrol-900">{t('app.dash.pendingTitle', { n: s.pending_requests })}</p>
            <p className="text-sm text-saffron-800">{t('app.dash.pendingBody')}</p>
          </div>
          <Icon name="chevron" className="text-saffron-700" />
        </Link>
      )}

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {!s ? [0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-[7.5rem] rounded-2xl" />) : <>
          <Kpi label={t('app.dash.kpiToday')} value={s.today?.total ?? 0} icon="jobs"
            foot={<TodayBar today={s.today} />} />
          <Kpi label={t('app.dash.kpiRevenue')} value={<Money value={s.revenue?.month} />} icon="money"
            foot={revDelta != null
              ? <span className={cx('tabular-nums', revDelta >= 0 ? 'text-success-600' : 'text-danger-600')} dir="ltr">{revDelta >= 0 ? '+' : ''}{revDelta}%</span>
              : null}
            footHint={t('app.dash.vsLastMonth')} />
          <Kpi label={t('app.dash.kpiUnpaid')} value={<Money value={s.revenue?.unpaid_total} />} icon="invoices"
            footHint={t('app.dash.unpaidCount', { n: s.revenue?.unpaid_count ?? 0 })} tone={s.revenue?.unpaid_total > 0 ? 'warn' : undefined} />
          <Kpi label={t('app.dash.kpiRating')} value={s.rating_avg ? <span className="tabular-nums">{Number(s.rating_avg).toFixed(1)}<span className="text-lg text-sand-500"> / 5</span></span> : '—'} icon="star"
            foot={<Stars value={s.rating_avg} />} />
        </>}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's schedule */}
        <Card className="lg:col-span-2" padded={false} title={t('app.dash.todaySchedule')} subtitle={sched.data ? t('app.dash.jobsCount', { n: sched.data.jobs?.length ?? 0 }) : undefined}
          actions={<Button as={Link} to="/app/schedule" size="sm" variant="ghost">{t('app.common.viewAll')}</Button>}>
          {sched.loading && !sched.data ? <div className="p-5"><SkeletonRows rows={4} /></div>
            : sched.error ? <div className="p-5"><ErrorState error={sched.error} onRetry={sched.reload} /></div>
            : <TodayList jobs={sched.data?.jobs || []} unassigned={sched.data?.unassigned || []} />}
        </Card>

        {/* Trend */}
        <Card title={t('app.dash.trendTitle')} subtitle={t('app.dash.trendSub')}>
          {!s || (needJobs && trend.loading && !trend.data) ? <Skeleton className="h-40" /> : trend.error ? <ErrorState error={trend.error} onRetry={trend.reload} /> : <TrendChart days={trendDays} />}
          {s?.jobs_by_status && (
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {['new', 'scheduled', 'in_progress', 'completed'].map((k) => (
                <span key={k} className="inline-flex items-center gap-1.5"><StatusBadge status={k} /><span className="tabular-nums font-medium">{s.jobs_by_status[k] ?? 0}</span></span>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card padded={false} title={t('app.dash.team')} subtitle={Array.isArray(s?.top_technicians) ? t('app.dash.teamSubServer') : t('app.dash.teamSub')}>
          {!s ? <div className="p-5"><SkeletonRows rows={4} /></div> : <Leaderboard techs={s.technicians || []} top={s.top_technicians} jobs={trend.data?.items || []} />}
        </Card>

        <Card padded={false} title={t('app.dash.unpaid')} actions={<Button as={Link} to="/app/invoices?status=unpaid" size="sm" variant="ghost">{t('app.common.viewAll')}</Button>}>
          {unpaid.loading && !unpaid.data ? <div className="p-5"><SkeletonRows rows={3} /></div>
            : unpaid.error ? <div className="p-5"><ErrorState error={unpaid.error} onRetry={unpaid.reload} /></div>
            : (unpaid.data?.items || []).length === 0 ? <EmptyState icon={<Icon name="check" size={24} />} title={t('app.dash.allPaid')} body={t('app.dash.allPaidBody')} />
            : (
              <ul className="divide-y divide-sand-100">
                {unpaid.data.items.map((inv) => (
                  <li key={inv.id}>
                    <Link to={`/app/invoices/${inv.id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-petrol-50/50">
                      <Ltr className="text-sm text-sand-500">#{inv.number}</Ltr>
                      <span className="flex-1 min-w-0">
                        <span className="block truncate font-medium">{inv.customer?.name}</span>
                        <span className="block text-sm text-sand-500">{relDays(ymd(inv.issue_date), locale)}</span>
                      </span>
                      <Money value={inv.total} strong />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
        </Card>

        <Card padded={false} title={t('app.dash.contractVisits')} actions={<Button as={Link} to="/app/contracts" size="sm" variant="ghost">{t('app.common.viewAll')}</Button>}>
          {!s ? <div className="p-5"><SkeletonRows rows={3} /></div>
            : (s.upcoming_contract_visits || []).length === 0 ? <EmptyState icon={<Icon name="contracts" size={24} />} title={t('app.dash.noVisits')} body={t('app.dash.noVisitsBody')}
              action={<Button as={Link} to="/app/contracts" size="sm" variant="secondary">{t('app.contracts.new')}</Button>} />
            : (
              <ul className="divide-y divide-sand-100">
                {s.upcoming_contract_visits.slice(0, 6).map((v) => (
                  <li key={v.contract_id + v.next_visit_date}>
                    <Link to={`/app/contracts/${v.contract_id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-petrol-50/50">
                      <span className="h-9 w-9 rounded-full bg-petrol-50 text-petrol-600 grid place-items-center"><Icon name="cycle" size={17} /></span>
                      <span className="flex-1 min-w-0 truncate font-medium">{v.customer_name}</span>
                      <span className="text-end">
                        <DualDate value={v.next_visit_date} className="text-sm" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
        </Card>
      </div>
    </div>
  );
}

function Kpi({ label, value, icon, foot, footHint, tone }) {
  return (
    <div className={cx('rounded-2xl border shadow-card p-4 sm:p-5 flex flex-col gap-1 min-w-0', tone === 'warn' ? 'bg-saffron-50/60 border-saffron-200' : 'bg-white border-sand-200/70')}>
      <div className="flex items-center justify-between gap-2 text-sm text-sand-600">
        <span className="truncate">{label}</span>
        <Icon name={icon} size={17} className="text-petrol-400" />
      </div>
      <div className="text-2xl sm:text-3xl font-semibold text-petrol-800 tabular-nums leading-tight truncate">{value}</div>
      {(foot || footHint) && <div className="text-sm flex items-center gap-2 text-sand-500 min-h-[1.3rem]">{foot}{footHint && <span className="truncate">{footHint}</span>}</div>}
    </div>
  );
}

function TodayBar({ today }) {
  const { t } = useI18n();
  if (!today) return null;
  const total = today.total || 0;
  const seg = [
    ['completed', today.completed || 0, '#2E8B57'],
    ['in_progress', today.in_progress || 0, '#E0950B'],
  ];
  const rest = Math.max(0, total - seg[0][1] - seg[1][1]);
  return (
    <span className="flex items-center gap-2 w-full">
      <span className="flex-1 h-1.5 rounded-full bg-sand-100 overflow-hidden flex" aria-hidden="true">
        {total > 0 && seg.map(([k, n, c]) => n > 0 && <span key={k} style={{ width: `${(n / total) * 100}%`, background: c }} />)}
        {total > 0 && rest > 0 && <span style={{ width: `${(rest / total) * 100}%` }} className="bg-[#3F6FB5]/40" />}
      </span>
      <span className="text-xs tabular-nums whitespace-nowrap">{t('app.dash.doneOf', { done: today.completed || 0 })}</span>
    </span>
  );
}

function Stars({ value }) {
  const v = Math.round(Number(value) || 0);
  return (
    <span className="flex gap-0.5 text-saffron-400" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= v ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8"><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8L3.5 9.7l5.9-.8z" /></svg>
      ))}
    </span>
  );
}

function TodayList({ jobs, unassigned }) {
  const { t, locale } = useI18n();
  const sorted = [...jobs].sort((a, b) => String(a.scheduled_start).localeCompare(String(b.scheduled_start)));
  if (sorted.length === 0 && unassigned.length === 0) {
    return <EmptyState title={t('app.dash.noJobsToday')} body={t('app.dash.noJobsTodayBody')}
      action={<Button as={Link} to="/app/jobs/new" size="sm">{t('app.layout.newJob')}</Button>} />;
  }
  return (
    <div>
      <ol className="divide-y divide-sand-100">
        {sorted.slice(0, 8).map((j) => (
          <li key={j.id}>
            <Link to={`/app/jobs/${j.id}`} className="flex items-center gap-3 sm:gap-4 px-5 py-3 hover:bg-petrol-50/50">
              <span className="w-14 shrink-0 text-sm font-semibold tabular-nums text-petrol-800">{timeHM(j.scheduled_start, locale)}</span>
              <span className="w-1 self-stretch rounded-full" style={{ background: j.technician?.color || '#DCCBAB' }} />
              <span className="flex-1 min-w-0">
                <span className="flex items-center gap-2"><span className="truncate font-medium">{j.title}</span><PriorityBadge priority={j.priority} /></span>
                <span className="block truncate text-sm text-sand-600">{j.customer?.name}{j.site?.district ? ` · ${j.site.district}` : ''}{j.technician ? ` · ${j.technician.name}` : ''}</span>
              </span>
              <StatusBadge status={j.status} className="hidden sm:inline-flex" />
            </Link>
          </li>
        ))}
      </ol>
      {sorted.length > 8 && <div className="px-5 py-2 text-sm text-sand-500">{t('app.dash.moreJobs', { n: sorted.length - 8 })}</div>}
      {unassigned.length > 0 && (
        <Link to="/app/schedule" className="flex items-center gap-2 px-5 py-3 border-t border-sand-100 bg-sand-50 rounded-b-2xl text-sm text-sand-700 hover:text-petrol-700">
          <Icon name="alert" size={16} className="text-saffron-600" />
          {t('app.dash.unassignedWaiting', { n: unassigned.length })}
          <Icon name="chevron" size={14} className="ms-auto" />
        </Link>
      )}
    </div>
  );
}

/** [{ d, total, done }] for the 14 days from `from`, from server trend or raw jobs. */
function buildTrend(serverTrend, jobs, from) {
  const map = new Map();
  for (let i = 0; i < TREND_DAYS; i++) map.set(addDays(from, i), { total: 0, done: 0 });
  if (Array.isArray(serverTrend)) {
    for (const r of serverTrend) { const m = map.get(String(r.date).slice(0, 10)); if (m) { m.total = Number(r.scheduled) || 0; m.done = Number(r.completed) || 0; } }
  } else {
    for (const j of jobs || []) {
      if (!j.scheduled_start || j.status === 'cancelled') continue;
      const m = map.get(ymd(j.scheduled_start)); if (!m) continue;
      m.total++; if (j.status === 'completed') m.done++;
    }
  }
  return [...map.entries()].map(([d, v]) => ({ d, total: Math.max(v.total, v.done), done: v.done }));
}

/** 14-day jobs trend: overlaid bars (completed inside scheduled), pure SVG. */
function TrendChart({ days }) {
  const { t, locale } = useI18n();
  const max = Math.max(4, ...days.map((d) => d.total));
  const W = 280, H = 120, gap = 4, bw = (W - gap * (TREND_DAYS - 1)) / TREND_DAYS;
  const today = todayYmd();
  const sum = days.reduce((a, d) => a + d.total, 0);
  // RTL: time flows right→left, so mirror the x axis.
  const rtl = locale === 'ar';
  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H + 18}`} className="w-full h-auto" role="img" aria-label={t('app.dash.trendAria', { n: sum })}>
        {[0.5, 1].map((f) => <line key={f} x1="0" x2={W} y1={H - H * f} y2={H - H * f} stroke="#F5F0E6" strokeWidth="1" />)}
        {days.map((d, i) => {
          const x = rtl ? W - (i + 1) * bw - i * gap : i * (bw + gap);
          const h = (d.total / max) * (H - 6);
          const hd = (d.done / max) * (H - 6);
          const isToday = d.d === today;
          return (
            <g key={d.d}>
              <title>{`${greg(d.d, locale)}: ${d.total} / ${d.done} ✓`}</title>
              <rect x={x} y={H - h} width={bw} height={Math.max(h, 1.5)} rx="3" fill={isToday ? '#F7C344' : '#A7D0CC'} />
              {hd > 0 && <rect x={x} y={H - hd} width={bw} height={hd} rx="3" fill={isToday ? '#E0950B' : '#0F5C5C'} />}
              {(i % 3 === 0 || isToday) && (
                <text x={x + bw / 2} y={H + 13} textAnchor="middle" fontSize="9" fill={isToday ? '#0B4A4B' : '#9C8660'} fontWeight={isToday ? 700 : 400}>
                  {Number(d.d.slice(8))}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 flex items-center gap-4 text-xs text-sand-600">
        <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-petrol-600" />{t('status.completed')}</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-petrol-200" />{t('app.dash.otherJobs')}</span>
        <span className="ms-auto tabular-nums">{t('app.dash.jobsCount', { n: sum })}</span>
      </figcaption>
    </figure>
  );
}

const TECH_STATUS_TONE = { idle: 'bg-sand-300', on_the_way: 'bg-[#8A5CC2]', in_progress: 'bg-saffron-500' };

function Leaderboard({ techs, top, jobs }) {
  const { t } = useI18n();
  const completed14 = useMemo(() => {
    const m = {};
    if (Array.isArray(top)) { for (const x of top) m[x.id] = { n: Number(x.completed_jobs) || 0, rating: x.rating_avg }; return m; }
    for (const j of jobs) if (j.status === 'completed' && j.technician) m[j.technician.id] = { n: (m[j.technician.id]?.n || 0) + 1 };
    return m;
  }, [top, jobs]);
  if (!techs.length) return <EmptyState title={t('app.dash.noTechs')} body={t('app.dash.noTechsBody')} action={<Button as={Link} to="/app/team" size="sm" variant="secondary">{t('app.team.invite')}</Button>} />;
  const rows = [...techs].map((x) => ({ ...x, c14: completed14[x.id]?.n || 0, rating: completed14[x.id]?.rating })).sort((a, b) => b.c14 - a.c14 || b.completed_today - a.completed_today);
  const max = Math.max(1, ...rows.map((r) => r.c14));
  return (
    <ol className="divide-y divide-sand-100">
      {rows.map((r, i) => (
        <li key={r.id} className="flex items-center gap-3 px-5 py-3">
          <span className="w-4 text-sm tabular-nums text-sand-500">{i + 1}</span>
          <span className="relative">
            <Avatar name={r.name} color={r.color} size={34} />
            <span className={cx('absolute -bottom-0.5 -end-0.5 h-3 w-3 rounded-full ring-2 ring-white', TECH_STATUS_TONE[r.status] || 'bg-sand-300')} title={t(`app.dash.techStatus_${r.status || 'idle'}`)} />
          </span>
          <span className="flex-1 min-w-0">
            <span className="block truncate font-medium">{r.name}</span>
            <span className="flex items-center gap-2">
              <span className="flex-1 h-1.5 rounded-full bg-sand-100 overflow-hidden"><span className="block h-full rounded-full" style={{ width: `${(r.c14 / max) * 100}%`, background: r.color || '#0F5C5C' }} /></span>
              <span className="text-xs text-sand-600 tabular-nums whitespace-nowrap">{t('app.dash.todayShort', { done: r.completed_today ?? 0, total: r.jobs_today ?? 0 })}</span>
            </span>
          </span>
          <span className="text-end">
            <span className="block text-lg font-semibold tabular-nums text-petrol-800 leading-none">{r.c14}</span>
            <span className="text-xs text-sand-500">{r.rating ? <span className="tabular-nums">★ {Number(r.rating).toFixed(1)}</span> : t('app.dash.in14')}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
