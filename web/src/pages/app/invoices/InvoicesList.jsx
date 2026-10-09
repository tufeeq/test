// OWNER: B3. Invoices list (status filter + totals) and the VAT report (?view=vat) — one route, two views.
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../../lib/api.js';
import { useAsync } from '../../../lib/useAsync.js';
import { useI18n } from '../../../i18n/index.jsx';
import { Button, Card, EmptyState, PageHeader, Table, Tabs, useToast } from '../../../components/ui/index.js';
import Icon from '../../../components/app/icons.jsx';
import InvoiceNewModal from '../../../components/app/InvoiceNew.jsx';
import { DualDate, ErrorState, FilterBar, InvoiceStatusBadge, Ltr, Money, Pager, SearchBox, Segmented, Skeleton, downloadFrom, saveBlob, useDebounced, round2 } from '../../../components/app/kit.jsx';
import { addDays, greg, hijri, riyadhInstant, todayYmd, ymd } from '../../../components/app/dates.js';

const LIMIT = 50;

export default function InvoicesList() {
  const { t } = useI18n();
  const [sp, setSp] = useSearchParams();
  const view = sp.get('view') === 'vat' ? 'vat' : 'list';
  const [creating, setCreating] = useState(false);
  const nav = useNavigate();
  return (
    <div>
      <PageHeader title={t('app.invoices.title')} subtitle={t('app.invoices.subtitle')}
        actions={<>
          <Segmented value={view} onChange={(v) => setSp(v === 'vat' ? { view: 'vat' } : {}, { replace: true })}
            items={[{ value: 'list', label: t('app.invoices.viewList') }, { value: 'vat', label: t('app.invoices.viewVat') }]} />
          {view === 'list' && <Button onClick={() => setCreating(true)} icon={<Icon name="plus" size={17} />}>{t('app.invoices.new')}</Button>}
        </>} />
      {view === 'list' ? <ListView /> : <VatReport />}
      <InvoiceNewModal open={creating} onClose={() => setCreating(false)} onSaved={(inv) => nav(`/app/invoices/${inv.id}`)} />
    </div>
  );
}

function ListView() {
  const { t } = useI18n();
  const nav = useNavigate();
  const [sp, setSp] = useSearchParams();
  const status = sp.get('status') || '';
  const qRaw = sp.get('q') || '';
  const from = sp.get('from') || '';
  const to = sp.get('to') || '';
  const offset = Number(sp.get('offset') || 0);
  const q = useDebounced(qRaw, 300);
  const update = (patch) => {
    const n = new URLSearchParams(sp);
    for (const [k, v] of Object.entries(patch)) (v ? n.set(k, v) : n.delete(k));
    if (!('offset' in patch)) n.delete('offset');
    setSp(n, { replace: true });
  };
  const params = { status: status || undefined, q: q || undefined, from: from ? riyadhInstant(from).toISOString() : undefined, to: to ? riyadhInstant(addDays(to, 1)).toISOString() : undefined, limit: LIMIT, offset };
  const { data, error, loading, reload } = useAsync(() => api.get('/invoices', params), [JSON.stringify(params)]);

  const columns = [
    { key: 'n', header: '#', render: (i) => (i.number != null ? <Ltr className="font-medium">#{i.number}</Ltr> : <span className="text-sand-400">—</span>) },
    { key: 'c', header: t('app.jobs.customer'), render: (i) => <div className="min-w-[9rem]"><div className="truncate">{i.customer?.name}</div><div className="text-xs text-sand-500">{t(`app.invoices.kind_${i.kind}`)}</div></div> },
    { key: 'd', header: t('app.invoices.issueDate'), render: (i) => <DualDate value={i.issue_date} className="text-sm" /> },
    { key: 's', header: t('app.jobs.status'), render: (i) => <InvoiceStatusBadge status={i.status} kind={i.kind} /> },
    { key: 'v', header: t('app.items.vat'), align: 'end', render: (i) => <Money value={i.vat_amount} className="text-sand-600" /> },
    { key: 't', header: t('app.items.total'), align: 'end', render: (i) => <Money value={i.total} strong /> },
  ];

  return (
    <>
      {data?.totals && (
        <div className="grid grid-cols-2 gap-3 mb-5 max-w-xl">
          <button onClick={() => update({ status: 'unpaid' })} className="text-start rounded-2xl bg-saffron-50/70 border border-saffron-200 p-4 hover:border-saffron-400">
            <div className="text-sm text-saffron-800">{t('app.invoices.totalUnpaid')}</div>
            <div className="text-xl sm:text-2xl font-semibold text-petrol-900"><Money value={data.totals.unpaid} /></div>
          </button>
          <button onClick={() => update({ status: 'paid' })} className="text-start rounded-2xl bg-white border border-sand-200/70 shadow-card p-4 hover:border-petrol-200">
            <div className="text-sm text-sand-600">{t('app.invoices.totalPaid')}</div>
            <div className="text-xl sm:text-2xl font-semibold text-petrol-800"><Money value={data.totals.paid} /></div>
          </button>
        </div>
      )}
      <Tabs className="mb-4" value={status} onChange={(v) => update({ status: v })}
        items={[{ value: '', label: t('common.all') }, { value: 'unpaid', label: t('invoiceStatus.unpaid') }, { value: 'paid', label: t('invoiceStatus.paid') }, { value: 'void', label: t('invoiceStatus.void') }, { value: 'draft', label: t('app.invoices.st_draft') }]} />
      <FilterBar>
        <SearchBox className="w-full sm:w-72" value={qRaw} onChange={(v) => update({ q: v })} placeholder={t('app.invoices.searchPh')} />
        <label className="flex items-center gap-2 text-sm text-sand-600">{t('app.common.from')}<input type="date" value={from} onChange={(e) => update({ from: e.target.value })} dir="ltr" className="h-10 rounded-xl border border-sand-200 bg-white px-2.5" /></label>
        <label className="flex items-center gap-2 text-sm text-sand-600">{t('app.common.to')}<input type="date" value={to} onChange={(e) => update({ to: e.target.value })} dir="ltr" className="h-10 rounded-xl border border-sand-200 bg-white px-2.5" /></label>
      </FilterBar>
      {error ? <ErrorState error={error} onRetry={reload} /> : <>
        <Table columns={columns} rows={data?.items || []} loading={loading && !data} onRowClick={(i) => nav(`/app/invoices/${i.id}`)}
          empty={<EmptyState icon={<Icon name="invoices" size={24} />} title={status || qRaw ? t('app.invoices.noMatch') : t('app.invoices.empty')} body={t('app.invoices.emptyBody')} />} />
        <Pager total={data?.total} limit={LIMIT} offset={offset} onChange={(o) => update({ offset: String(o) })} />
      </>}
    </>
  );
}

/** VAT report: B2's GET /invoices/reports/vat (credit notes net out) with CSV export; falls back to client-side aggregation. */
function VatReport() {
  const { t, locale } = useI18n();
  const toast = useToast();
  const today = todayYmd();
  const quarterStart = `${today.slice(0, 4)}-${String(Math.floor((Number(today.slice(5, 7)) - 1) / 3) * 3 + 1).padStart(2, '0')}-01`;
  const [from, setFrom] = useState(quarterStart);
  const [to, setTo] = useState(today);
  const [dl, setDl] = useState(false);

  const { data, error, loading, reload } = useAsync(async () => {
    try {
      return normalizeServer(await api.get('/invoices/reports/vat', { from, to }));
    } catch (e) {
      if (!(e.status === 404 || e.status === 400)) throw e;
      return clientReport(from, to);
    }
  }, [from, to]);

  const csv = async () => {
    setDl(true);
    try {
      if (data?.server) await downloadFrom(`/invoices/reports/vat?from=${from}&to=${to}&format=csv`, `vat-report_${from}_${to}.csv`);
      else saveBlob(new Blob(['\uFEFF' + clientCsv(data)], { type: 'text/csv;charset=utf-8' }), `vat-report_${from}_${to}.csv`);
      toast.success(t('app.invoices.csvReady'));
    } catch (e) { toast.error(e); } finally { setDl(false); }
  };

  const presets = [
    { label: t('app.invoices.thisQuarter'), f: quarterStart, t: today },
    { label: t('app.invoices.thisMonth'), f: `${today.slice(0, 7)}-01`, t: today },
    { label: t('app.invoices.lastMonth'), f: `${addDays(`${today.slice(0, 7)}-01`, -1).slice(0, 7)}-01`, t: addDays(`${today.slice(0, 7)}-01`, -1) },
    { label: t('app.invoices.thisYear'), f: `${today.slice(0, 4)}-01-01`, t: today },
  ];
  const T = data?.totals || {};

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-sand-800">{t('app.common.from')}<input type="date" value={from} max={to} onChange={(e) => e.target.value && setFrom(e.target.value)} dir="ltr" className="h-10 rounded-xl border border-sand-200 bg-white px-3" /></label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-sand-800">{t('app.common.to')}<input type="date" value={to} min={from} onChange={(e) => e.target.value && setTo(e.target.value)} dir="ltr" className="h-10 rounded-xl border border-sand-200 bg-white px-3" /></label>
        <div className="flex flex-wrap gap-1.5">
          {presets.map((p) => <Button key={p.label} size="sm" variant={from === p.f && to === p.t ? 'primary' : 'secondary'} onClick={() => { setFrom(p.f); setTo(p.t); }}>{p.label}</Button>)}
        </div>
        <Button className="ms-auto" variant="cta" icon={<Icon name="download" size={16} />} onClick={csv} loading={dl} disabled={!data?.by_month?.length}>{t('app.invoices.downloadCsv')}</Button>
      </div>
      <p className="text-sm text-sand-600 tabular-nums">{greg(from, locale)} – {greg(to, locale)} · {hijri(from, locale)} – {hijri(to, locale)}</p>

      {error ? <ErrorState error={error} onRetry={reload} /> : loading && !data ? <Skeleton className="h-64 rounded-2xl" /> : <>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Box label={t('app.invoices.taxableSales')} value={<Money value={T.taxable_sales} />} />
          <Box label={t('app.invoices.outputVat')} value={<Money value={T.vat_collected} />} strong />
          <Box label={t('app.invoices.grossSales')} value={<Money value={T.total} />} />
          <Box label={t('app.invoices.invoiceCount')} value={<span className="tabular-nums">{T.invoices ?? 0}</span>}
            hint={T.credit_notes ? t('app.invoices.cnCount', { n: T.credit_notes }) : undefined} />
        </div>
        <div className="grid lg:grid-cols-[1fr_18rem] gap-5 items-start">
          <Card padded={false} title={t('app.invoices.byMonth')}>
            {!data.by_month.length ? <EmptyState title={t('app.invoices.noneInRange')} /> : (
              <div className="overflow-x-auto">
                <table className="w-full text-base">
                  <thead><tr className="text-sm text-sand-600 bg-sand-50/80 border-b border-sand-200">
                    <th className="px-5 py-2.5 text-start font-medium">{t('app.invoices.month')}</th>
                    <th className="px-3 py-2.5 text-end font-medium">{t('app.invoices.invoiceCount')}</th>
                    <th className="px-3 py-2.5 text-end font-medium">{t('app.items.subtotal')}</th>
                    <th className="px-3 py-2.5 text-end font-medium">{t('app.items.vat')}</th>
                    <th className="px-5 py-2.5 text-end font-medium">{t('app.items.total')}</th>
                  </tr></thead>
                  <tbody>
                    {data.by_month.map((m) => (
                      <tr key={m.month} className="border-b border-sand-100">
                        <td className="px-5 py-3">{greg(`${m.month}-15`, locale, { month: 'long', year: 'numeric' })}<div className="text-xs text-sand-500">{hijri(`${m.month}-15`, locale, { month: 'long', year: 'numeric' })}</div></td>
                        <td className="px-3 py-3 text-end tabular-nums">{m.invoices}{m.credit_notes ? <span className="text-danger-600"> −{m.credit_notes}</span> : null}</td>
                        <td className="px-3 py-3 text-end"><Money value={m.taxable_sales} /></td>
                        <td className="px-3 py-3 text-end"><Money value={m.vat_collected} strong /></td>
                        <td className="px-5 py-3 text-end"><Money value={m.total} /></td>
                      </tr>
                    ))}
                    <tr className="bg-sand-50 font-semibold">
                      <td className="px-5 py-3">{t('app.items.total')}</td>
                      <td className="px-3 py-3 text-end tabular-nums">{T.invoices}</td>
                      <td className="px-3 py-3 text-end"><Money value={T.taxable_sales} /></td>
                      <td className="px-3 py-3 text-end"><Money value={T.vat_collected} /></td>
                      <td className="px-5 py-3 text-end"><Money value={T.total} /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </Card>
          <Card title={t('app.invoices.vatBreakdown')}>
            <dl className="flex flex-col gap-2 text-base">
              <div className="flex justify-between"><dt className="text-sand-600">{t('app.invoices.standardRated')}</dt><dd><Money value={T.standard_rated} /></dd></div>
              <div className="flex justify-between"><dt className="text-sand-600">{t('app.invoices.zeroRated')}</dt><dd><Money value={T.zero_rated} /></dd></div>
              <div className="flex justify-between pt-2 border-t border-sand-100"><dt className="text-sand-600">{t('app.invoices.credited')}</dt><dd><Money value={T.credited} /></dd></div>
              <div className="flex justify-between font-semibold"><dt>{t('app.invoices.outputVat')}</dt><dd><Money value={T.vat_collected} /></dd></div>
            </dl>
            <p className="text-xs text-sand-500 mt-4 leading-relaxed">{t('app.invoices.vatNote')}</p>
          </Card>
        </div>
      </>}
    </div>
  );
}

function normalizeServer(r) {
  return { server: true, totals: r.totals || {}, by_month: r.by_month || [] };
}

async function clientReport(from, to) {
  const all = [];
  let offset = 0;
  for (let i = 0; i < 25; i++) {
    const r = await api.get('/invoices', { from: riyadhInstant(from).toISOString(), to: riyadhInstant(addDays(to, 1)).toISOString(), limit: 200, offset });
    all.push(...(r.items || []));
    if (!r.total || all.length >= r.total || (r.items || []).length < 200) break;
    offset += 200;
  }
  const rows = all.filter((i) => i.status !== 'draft');
  const m = {};
  for (const i of rows) {
    const k = ymd(i.issue_date).slice(0, 7);
    const x = (m[k] ||= { month: k, invoices: 0, credit_notes: 0, taxable_sales: 0, standard_rated: 0, zero_rated: 0, vat_collected: 0, total: 0, credited: 0 });
    if (i.kind === 'credit_note') { x.credit_notes++; x.credited += Math.abs(Number(i.total || 0)); } else x.invoices++;
    x.taxable_sales += Number(i.subtotal || 0); x.vat_collected += Number(i.vat_amount || 0); x.total += Number(i.total || 0);
    if (Number(i.vat_amount) > 0) x.standard_rated += Number(i.subtotal || 0); else x.zero_rated += Number(i.subtotal || 0);
  }
  const by_month = Object.values(m).sort((a, b) => a.month.localeCompare(b.month)).map((x) => Object.fromEntries(Object.entries(x).map(([k, v]) => [k, typeof v === 'number' ? round2(v) : v])));
  const totals = {};
  for (const k of ['invoices', 'credit_notes', 'taxable_sales', 'standard_rated', 'zero_rated', 'vat_collected', 'total', 'credited']) totals[k] = round2(by_month.reduce((s, x) => s + x[k], 0));
  return { server: false, totals, by_month };
}

function clientCsv(d) {
  const head = ['month', 'invoices', 'credit_notes', 'taxable_sales', 'standard_rated', 'zero_rated', 'vat_collected', 'total_incl_vat', 'credited'];
  const line = (m) => [m.month, m.invoices, m.credit_notes, m.taxable_sales, m.standard_rated, m.zero_rated, m.vat_collected, m.total, m.credited].join(',');
  return [head.join(','), ...d.by_month.map(line), line({ ...d.totals, month: 'TOTAL' })].join('\r\n');
}

function Box({ label, value, strong, hint }) {
  return (
    <div className={strong ? 'rounded-2xl bg-petrol-700 text-sand-50 p-4' : 'rounded-2xl bg-white border border-sand-200/70 shadow-card p-4'}>
      <div className={strong ? 'text-sm text-petrol-100' : 'text-sm text-sand-600'}>{label}</div>
      <div className="text-xl sm:text-2xl font-semibold tabular-nums truncate">{value}</div>
      {hint && <div className="text-xs text-sand-500 mt-0.5">{hint}</div>}
    </div>
  );
}
