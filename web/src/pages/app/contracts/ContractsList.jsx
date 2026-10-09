// OWNER: B3. Maintenance contracts (عقود الصيانة): progress rings, renewal alerts, next visit.
import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../../lib/api.js';
import { useAsync } from '../../../lib/useAsync.js';
import { useI18n } from '../../../i18n/index.jsx';
import { Button, EmptyState, PageHeader, Tabs } from '../../../components/ui/index.js';
import Icon from '../../../components/app/icons.jsx';
import ContractFormModal from '../../../components/app/ContractForm.jsx';
import { ContractStatusBadge, CycleRing, DualDate, ErrorState, FilterBar, Money, Pager, SearchBox, SkeletonRows, useDebounced } from '../../../components/app/kit.jsx';
import { diffDays, greg, relDays, todayYmd } from '../../../components/app/dates.js';
import { cx } from '../../../lib/cx.js';

const LIMIT = 50;

export default function ContractsList() {
  const { t, locale } = useI18n();
  const nav = useNavigate();
  const [sp, setSp] = useSearchParams();
  const [creating, setCreating] = useState(false);
  const status = sp.get('status') ?? 'active';
  const qRaw = sp.get('q') || '';
  const offset = Number(sp.get('offset') || 0);
  const q = useDebounced(qRaw, 300);
  const update = (patch) => {
    const n = new URLSearchParams(sp);
    for (const [k, v] of Object.entries(patch)) (v !== undefined && v !== null ? n.set(k, v) : n.delete(k));
    if (!('offset' in patch)) n.delete('offset');
    setSp(n, { replace: true });
  };
  const { data, error, loading, reload } = useAsync(() => api.get('/contracts', { status: status || undefined, q: q || undefined, limit: LIMIT, offset }), [status, q, offset]);
  const active = useAsync(() => api.get('/contracts', { status: 'active', limit: 200 }), []);

  const today = todayYmd();
  const renewals = useMemo(() => (active.data?.items || [])
    .filter((c) => { const d = diffDays(today, c.end_date.slice(0, 10)); return d >= 0 && d <= 30; })
    .sort((a, b) => a.end_date.localeCompare(b.end_date)), [active.data, today]);
  const annual = (active.data?.items || []).reduce((s, c) => s + Number(c.price || 0), 0);
  const dueSoon = (active.data?.items || []).filter((c) => c.next_visit_date && diffDays(today, c.next_visit_date.slice(0, 10)) <= 7).length;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title={t('app.contracts.title')} subtitle={t('app.contracts.subtitle')}
        actions={<Button onClick={() => setCreating(true)} icon={<Icon name="plus" size={17} />}>{t('app.contracts.new')}</Button>} />

      {active.data && (
        <div className="grid grid-cols-3 gap-3">
          <Fact label={t('app.contracts.activeCount')} value={active.data.total ?? active.data.items?.length ?? 0} />
          <Fact label={t('app.contracts.annualValue')} value={<Money value={annual} />} />
          <Fact label={t('app.contracts.visitsThisWeek')} value={dueSoon} />
        </div>
      )}

      {renewals.length > 0 && (
        <section className="rounded-2xl border border-saffron-200 bg-saffron-50/70 p-4 sm:p-5">
          <h2 className="font-semibold text-petrol-900 flex items-center gap-2"><Icon name="alert" size={18} className="text-saffron-600" />{t('app.contracts.renewalTitle', { n: renewals.length })}</h2>
          <p className="text-sm text-saffron-800 mt-0.5">{t('app.contracts.renewalBody')}</p>
          <ul className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {renewals.map((c) => (
              <li key={c.id}>
                <Link to={`/app/contracts/${c.id}`} className="flex items-center gap-3 rounded-xl bg-white border border-saffron-200 px-3 py-2.5 hover:border-saffron-400">
                  <div className="flex-1 min-w-0"><div className="font-medium truncate">{c.customer?.name}</div><div className="text-sm text-sand-600 truncate">{c.title}</div></div>
                  <span className="text-sm font-semibold text-saffron-800 whitespace-nowrap">{relDays(c.end_date, locale)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div>
        <Tabs className="mb-4" value={status} onChange={(v) => update({ status: v })}
          items={[{ value: 'active', label: t('contractStatus.active') }, { value: 'expired', label: t('contractStatus.expired') }, { value: 'cancelled', label: t('contractStatus.cancelled') }, { value: '', label: t('common.all') }]} />
        <FilterBar><SearchBox className="w-full sm:w-80" value={qRaw} onChange={(v) => update({ q: v || null })} placeholder={t('app.contracts.searchPh')} /></FilterBar>

        {error ? <ErrorState error={error} onRetry={reload} />
          : loading && !data ? <div className="rounded-2xl bg-white border border-sand-200/70 p-5"><SkeletonRows rows={5} /></div>
          : (data?.items || []).length === 0 ? (
            <div className="rounded-2xl bg-white border border-sand-200/70"><EmptyState icon={<Icon name="cycle" size={26} />} title={t('app.contracts.empty')} body={t('app.contracts.emptyBody')}
              action={<Button onClick={() => setCreating(true)}>{t('app.contracts.new')}</Button>} /></div>
          ) : (
            <ul className="grid grid-cols-[minmax(0,1fr)] md:grid-cols-2 gap-3">
              {data.items.map((c) => {
                const endIn = diffDays(today, c.end_date.slice(0, 10));
                const nextIn = c.next_visit_date ? diffDays(today, c.next_visit_date.slice(0, 10)) : null;
                return (
                  <li key={c.id}>
                    <button onClick={() => nav(`/app/contracts/${c.id}`)} className="w-full text-start rounded-2xl bg-white border border-sand-200/70 shadow-card p-4 sm:p-5 hover:border-petrol-200 focus-visible:outline-none focus-visible:shadow-ring">
                      <div className="flex items-start gap-4">
                        <CycleRing done={c.visits_done ?? 0} total={c.visits_per_year} size={52} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2"><span className="font-semibold truncate">{c.customer?.name}</span><ContractStatusBadge status={c.status} /></div>
                          <div className="text-sand-600 truncate">{c.title}</div>
                          <div className="text-sm text-sand-500 tabular-nums mt-1">{greg(c.start_date, locale)} – {greg(c.end_date, locale)}</div>
                        </div>
                        <Money value={c.price} strong className="text-petrol-800" />
                      </div>
                      <div className="mt-4 pt-3 border-t border-sand-100 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                        <span className="inline-flex items-center gap-1.5 text-sand-700"><Icon name="calendar" size={15} className="text-petrol-500" />{t('app.contracts.nextVisit')}:
                          {c.next_visit_date && c.status === 'active' ? <span className={cx('font-medium', nextIn != null && nextIn <= 7 && 'text-saffron-700')}><DualDate value={c.next_visit_date} inline /></span> : <span className="text-sand-400">—</span>}
                        </span>
                        {c.status === 'active' && endIn >= 0 && endIn <= 30 && <span className="text-saffron-700 font-medium">{t('app.contracts.endsIn', { when: relDays(c.end_date, locale) })}</span>}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        <Pager total={data?.total} limit={LIMIT} offset={offset} onChange={(o) => update({ offset: String(o) })} />
      </div>

      <ContractFormModal open={creating} onClose={() => setCreating(false)} onSaved={(c) => nav(`/app/contracts/${c.id}`)} />
    </div>
  );
}

function Fact({ label, value }) {
  return (
    <div className="rounded-2xl bg-white border border-sand-200/70 shadow-card p-4">
      <div className="text-sm text-sand-600 truncate">{label}</div>
      <div className="text-xl sm:text-2xl font-semibold text-petrol-800 tabular-nums truncate">{value}</div>
    </div>
  );
}
