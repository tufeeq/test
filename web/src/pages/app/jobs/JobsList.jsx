// OWNER: B3. Jobs list with filters (status tabs, technician, date range, search). Filters live in the URL.
import { useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../../lib/api.js';
import { useAsync } from '../../../lib/useAsync.js';
import { useI18n } from '../../../i18n/index.jsx';
import { Button, EmptyState, PageHeader, PriorityBadge, StatusBadge, Table, Tabs } from '../../../components/ui/index.js';
import Icon from '../../../components/app/icons.jsx';
import { ErrorState, FilterBar, MiniSelect, Money, Pager, SearchBox, TechChip, useDebounced, useTechnicians, Ltr, catLabel } from '../../../components/app/kit.jsx';
import { greg, riyadhInstant, addDays, timeHM, hijri } from '../../../components/app/dates.js';

const TABS = ['open', 'new', 'scheduled', 'in_progress', 'completed', 'cancelled', 'all'];
const TAB_STATUS = { open: 'new,scheduled,on_the_way,in_progress', in_progress: 'on_the_way,in_progress', all: undefined };
const LIMIT = 50;

export default function JobsList() {
  const { t, locale } = useI18n();
  const nav = useNavigate();
  const [sp, setSp] = useSearchParams();
  const [techs] = useTechnicians();
  const tab = sp.get('tab') || 'open';
  const tech = sp.get('tech') || '';
  const from = sp.get('from') || '';
  const to = sp.get('to') || '';
  const offset = Number(sp.get('offset') || 0);
  const qRaw = sp.get('q') || '';
  const q = useDebounced(qRaw, 300);

  const update = (patch) => {
    const n = new URLSearchParams(sp);
    for (const [k, v] of Object.entries(patch)) (v ? n.set(k, v) : n.delete(k));
    if (!('offset' in patch)) n.delete('offset');
    setSp(n, { replace: true });
  };

  const params = useMemo(() => ({
    status: tab in TAB_STATUS ? TAB_STATUS[tab] : tab,
    technician_id: tech && tech !== 'none' ? tech : undefined,
    unassigned: tech === 'none' ? 'true' : undefined,
    from: from ? riyadhInstant(from).toISOString() : undefined,
    to: to ? riyadhInstant(addDays(to, 1)).toISOString() : undefined,
    q: q || undefined, limit: LIMIT, offset,
  }), [tab, tech, from, to, q, offset]);
  const { data, error, loading, reload } = useAsync(() => api.get('/jobs', params), [JSON.stringify(params)]);

  const columns = [
    { key: 'number', header: '#', render: (j) => <Ltr className="text-sand-500">#{j.number}</Ltr>, className: 'w-16' },
    { key: 'title', header: t('app.jobs.job'), render: (j) => (
      <div className="min-w-[12rem]">
        <div className="flex items-center gap-2"><span className="font-medium">{j.title}</span><PriorityBadge priority={j.priority} />
          {j.source === 'contract' && <Icon name="cycle" size={14} className="text-petrol-500" title={t('app.jobs.source_contract')} />}
          {j.source === 'portal' && <Icon name="globe" size={14} className="text-petrol-500" title={t('app.jobs.source_portal')} />}
        </div>
        <div className="text-sm text-sand-600">{catLabel(t, j.category)}</div>
      </div>
    ) },
    { key: 'customer', header: t('app.jobs.customer'), render: (j) => (
      <div className="min-w-[9rem]"><div className="truncate">{j.customer?.name}</div><div className="text-sm text-sand-500">{j.site?.district || ''}</div></div>
    ) },
    { key: 'when', header: t('app.jobs.when'), render: (j) => j.scheduled_start ? (
      <div className="tabular-nums whitespace-nowrap"><div>{greg(j.scheduled_start, locale, { weekday: 'short', day: 'numeric', month: 'short' })} · {timeHM(j.scheduled_start, locale)}</div>
        <div className="text-xs text-sand-500">{hijri(j.scheduled_start, locale, { day: 'numeric', month: 'short' })}</div></div>
    ) : <span className="text-sand-400">{t('app.jobs.unscheduled')}</span> },
    { key: 'tech', header: t('app.jobs.technician'), render: (j) => <TechChip tech={j.technician} /> },
    { key: 'status', header: t('app.jobs.status'), render: (j) => <StatusBadge status={j.status} /> },
    { key: 'total', header: t('app.items.subtotal'), align: 'end', render: (j) => (j.total ? <Money value={j.total} /> : <span className="text-sand-400">—</span>) },
  ];

  const hasFilters = tech || from || to || qRaw;

  return (
    <div>
      <PageHeader title={t('app.jobs.title')} subtitle={data ? t('app.jobs.count', { n: data.total ?? data.items?.length ?? 0 }) : ' '}
        actions={<Button as={Link} to="/app/jobs/new" icon={<Icon name="plus" size={17} />}>{t('app.jobs.new')}</Button>} />

      <Tabs className="mb-4" value={tab} onChange={(v) => update({ tab: v === 'open' ? '' : v })}
        items={TABS.map((v) => ({ value: v, label: v === 'open' ? t('app.jobs.tabOpen') : v === 'all' ? t('common.all') : t(`status.${v}`) }))} />

      <FilterBar>
        <SearchBox className="w-full sm:w-72" value={qRaw} onChange={(v) => update({ q: v })} placeholder={t('app.jobs.searchPh')} />
        <MiniSelect value={tech} onChange={(v) => update({ tech: v })} ariaLabel={t('app.jobs.technician')}>
          <option value="">{t('app.jobs.allTechs')}</option>
          <option value="none">{t('app.common.unassigned')}</option>
          {techs.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
        </MiniSelect>
        <label className="flex items-center gap-2 text-sm text-sand-600">
          {t('app.common.from')}
          <input type="date" value={from} onChange={(e) => update({ from: e.target.value })} dir="ltr" className="h-10 rounded-xl border border-sand-200 bg-white px-2.5 tabular-nums" />
        </label>
        <label className="flex items-center gap-2 text-sm text-sand-600">
          {t('app.common.to')}
          <input type="date" value={to} onChange={(e) => update({ to: e.target.value })} dir="ltr" className="h-10 rounded-xl border border-sand-200 bg-white px-2.5 tabular-nums" />
        </label>
        {hasFilters && <Button variant="ghost" size="sm" onClick={() => setSp(tab !== 'open' ? { tab } : {}, { replace: true })}>{t('app.common.clearFilters')}</Button>}
      </FilterBar>

      {error ? <ErrorState error={error} onRetry={reload} /> : (
        <>
          <Table columns={columns} rows={data?.items || []} loading={loading && !data} onRowClick={(j) => nav(`/app/jobs/${j.id}`)}
            empty={hasFilters || tab !== 'open'
              ? <EmptyState title={t('app.jobs.noMatch')} body={t('app.jobs.noMatchBody')} />
              : <EmptyState title={t('app.jobs.empty')} body={t('app.jobs.emptyBody')} action={<Button as={Link} to="/app/jobs/new">{t('app.jobs.new')}</Button>} />} />
          <Pager total={data?.total} limit={LIMIT} offset={offset} onChange={(o) => update({ offset: String(o) })} />
        </>
      )}
    </div>
  );
}
