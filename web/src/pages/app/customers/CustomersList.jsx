// OWNER: B3. Customers list: search by name/phone, type filter, quick create.
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../../lib/api.js';
import { useAsync } from '../../../lib/useAsync.js';
import { useI18n } from '../../../i18n/index.jsx';
import { Badge, Button, EmptyState, PageHeader, Table, Tabs } from '../../../components/ui/index.js';
import Icon from '../../../components/app/icons.jsx';
import { CustomerFormModal } from '../../../components/app/CustomerForm.jsx';
import { ErrorState, FilterBar, Ltr, Money, Pager, SearchBox, useDebounced } from '../../../components/app/kit.jsx';
import { relTime } from '../../../components/app/dates.js';

const LIMIT = 50;

export default function CustomersList() {
  const { t, locale } = useI18n();
  const nav = useNavigate();
  const [sp, setSp] = useSearchParams();
  const [creating, setCreating] = useState(false);
  const type = sp.get('type') || '';
  const qRaw = sp.get('q') || '';
  const offset = Number(sp.get('offset') || 0);
  const q = useDebounced(qRaw, 300);
  const update = (patch) => {
    const n = new URLSearchParams(sp);
    for (const [k, v] of Object.entries(patch)) (v ? n.set(k, v) : n.delete(k));
    if (!('offset' in patch)) n.delete('offset');
    setSp(n, { replace: true });
  };
  const { data, error, loading, reload } = useAsync(() => api.get('/customers', { q: q || undefined, type: type || undefined, limit: LIMIT, offset }), [q, type, offset]);

  const columns = [
    { key: 'name', header: t('app.customers.name'), render: (c) => (
      <div className="flex items-center gap-3 min-w-[12rem]">
        <span className="h-9 w-9 rounded-full bg-petrol-50 text-petrol-600 grid place-items-center shrink-0"><Icon name={c.type === 'business' ? 'contracts' : 'user'} size={17} /></span>
        <div className="min-w-0"><div className="font-medium truncate">{c.name}</div>{c.type === 'business' && <div className="text-xs text-sand-500">{t('app.customers.type_business')}{c.vat_number ? ' · VAT' : ''}</div>}</div>
      </div>
    ) },
    { key: 'phone', header: t('app.customers.phone'), render: (c) => <Ltr className="text-sand-700">{c.phone}</Ltr> },
    { key: 'sites', header: t('app.customers.sites'), align: 'end', render: (c) => <span className="tabular-nums">{c.sites_count ?? '—'}</span> },
    { key: 'jobs', header: t('app.customers.jobs'), align: 'end', render: (c) => <span className="tabular-nums">{c.jobs_count ?? '—'}</span> },
    { key: 'last', header: t('app.customers.lastJob'), render: (c) => (c.last_job_at ? <span className="text-sand-600 whitespace-nowrap">{relTime(c.last_job_at, locale)}</span> : <span className="text-sand-400">—</span>) },
    { key: 'due', header: t('app.customers.balance'), align: 'end', render: (c) => (Number(c.balance_due) > 0 ? <Badge tone="saffron"><Money value={c.balance_due} /></Badge> : <span className="text-sand-400">—</span>) },
  ];

  return (
    <div>
      <PageHeader title={t('app.customers.title')} subtitle={data ? t('app.customers.count', { n: data.total ?? 0 }) : ' '}
        actions={<Button onClick={() => setCreating(true)} icon={<Icon name="plus" size={17} />}>{t('app.customers.new')}</Button>} />
      <Tabs className="mb-4" value={type} onChange={(v) => update({ type: v })}
        items={[{ value: '', label: t('common.all') }, { value: 'individual', label: t('app.customers.type_individuals') }, { value: 'business', label: t('app.customers.type_businesses') }]} />
      <FilterBar>
        <SearchBox className="w-full sm:w-80" value={qRaw} onChange={(v) => update({ q: v })} placeholder={t('app.customers.searchPh')} />
      </FilterBar>
      {error ? <ErrorState error={error} onRetry={reload} /> : <>
        <Table columns={columns} rows={data?.items || []} loading={loading && !data} onRowClick={(c) => nav(`/app/customers/${c.id}`)}
          empty={qRaw || type
            ? <EmptyState title={t('app.customers.noMatch')} body={t('app.customers.noMatchBody')} action={<Button variant="secondary" onClick={() => setCreating(true)}>{t('app.customers.new')}</Button>} />
            : <EmptyState title={t('app.customers.empty')} body={t('app.customers.emptyBody')} action={<Button onClick={() => setCreating(true)}>{t('app.customers.new')}</Button>} />} />
        <Pager total={data?.total} limit={LIMIT} offset={offset} onChange={(o) => update({ offset: String(o) })} />
      </>}
      <CustomerFormModal open={creating} onClose={() => setCreating(false)} initial={qRaw ? (/^\d/.test(qRaw) ? { phone: qRaw } : { name: qRaw }) : null}
        onSaved={(c) => nav(`/app/customers/${c.id}`)} />
    </div>
  );
}
