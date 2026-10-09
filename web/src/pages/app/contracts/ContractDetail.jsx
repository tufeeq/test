// OWNER: B3. Contract detail: visit plan vs. done, generate visits, renew, invoice.
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../lib/api.js';
import { useAsync } from '../../../lib/useAsync.js';
import { useAuth } from '../../../lib/auth.jsx';
import { useI18n } from '../../../i18n/index.jsx';
import { Button, Card, EmptyState, Modal, PageHeader, Select, StatusBadge, Table, useToast } from '../../../components/ui/index.js';
import Icon from '../../../components/app/icons.jsx';
import ContractFormModal from '../../../components/app/ContractForm.jsx';
import { plannedVisits, missingVisits, generateVisits } from '../../../components/app/contractVisits.js';
import { ContractStatusBadge, CycleRing, DualDate, ErrorState, InvoiceStatusBadge, KV, Ltr, Money, PageSkeleton, TechChip, useConfirm, useTechnicians } from '../../../components/app/kit.jsx';
import { addDays, diffDays, greg, hijri, relDays, todayYmd, ymd } from '../../../components/app/dates.js';
import { cx } from '../../../lib/cx.js';

export default function ContractDetail() {
  const { id } = useParams();
  const { t, locale } = useI18n();
  const toast = useToast();
  const nav = useNavigate();
  const { user } = useAuth();
  const { data: c, error, loading, reload } = useAsync(() => api.get(`/contracts/${id}`), [id]);
  const [editing, setEditing] = useState(false);
  const [renewing, setRenewing] = useState(false);
  const [busy, setBusy] = useState(null);
  const [genOpen, setGenOpen] = useState(false);
  const [confirm, confirmNode] = useConfirm();

  const plan = useMemo(() => (c ? plannedVisits(c) : []), [c]);
  const missing = useMemo(() => (c ? missingVisits(c, c.jobs || []) : []), [c]);

  if (error) return <div><PageHeader title={t('app.contracts.title')} back="/app/contracts" /><ErrorState error={error} onRetry={reload} /></div>;
  if (loading && !c) return <PageSkeleton />;
  if (!c) return null;

  const jobs = [...(c.jobs || [])].sort((a, b) => String(a.scheduled_start || a.created_at).localeCompare(String(b.scheduled_start || b.created_at)));
  const done = c.visits_done ?? jobs.filter((j) => j.status === 'completed').length;
  const total = plan.length || c.visits_per_year;
  const today = todayYmd();
  const endIn = diffDays(today, c.end_date.slice(0, 10));

  const gen = async (technician_id) => {
    setGenOpen(false);
    setBusy('gen');
    try {
      const r = await generateVisits(c, c.jobs || [], { technician_id, limit: Math.max(1, missing.length) });
      toast.success(t('app.contracts.generated', { n: r.created }));
      if (r.warnings?.length) toast.info(t('app.schedule.savedWithConflict'));
      reload();
    } catch (e) { toast.error(e); reload(); } finally { setBusy(null); }
  };
  const invoice = async () => {
    setBusy('inv');
    try { const inv = await api.post('/invoices', { contract_id: c.id }); toast.success(t('app.invoices.issued', { n: inv.number })); nav(`/app/invoices/${inv.id}`); }
    catch (e) { toast.error(e); } finally { setBusy(null); }
  };
  const cancel = async () => {
    if (!(await confirm({ title: t('app.contracts.cancelTitle'), body: t('app.contracts.cancelBody'), danger: true, confirmLabel: t('app.contracts.cancel') }))) return;
    try { await api.del(`/contracts/${c.id}`); toast.success(t('app.contracts.cancelled')); reload(); } catch (e) { toast.error(e); }
  };

  // Visit plan cells: match planned dates to jobs (±half a cycle)
  const halfStep = Math.max(3, Math.round(365 / Number(c.visits_per_year) / 2));
  const cells = plan.map((d) => {
    const j = jobs.find((x) => x.scheduled_start && Math.abs(diffDays(ymd(x.scheduled_start), d)) <= halfStep && x.status !== 'cancelled');
    return { d, job: j, past: d < today };
  });

  const renewalInitial = { customer: c.customer, site: c.site, title: c.title, visits_per_year: c.visits_per_year, price: c.price, notes: c.notes,
    start_date: addDays(c.end_date.slice(0, 10), 1), end_date: addDays(addDays(c.end_date.slice(0, 10), 1), 364) };

  return (
    <div className="flex flex-col gap-6">
      {confirmNode}
      <PageHeader back="/app/contracts" title={c.title}
        actions={<>
          <Button variant="secondary" icon={<Icon name="edit" size={16} />} onClick={() => setEditing(true)}>{t('common.edit')}</Button>
          <Button variant="secondary" icon={<Icon name="invoices" size={16} />} onClick={invoice} loading={busy === 'inv'}>{t('app.contracts.invoice')}</Button>
          {c.status === 'active' && missing.length > 0 && <Button variant="cta" icon={<Icon name="cycle" size={16} />} onClick={() => setGenOpen(true)} loading={busy === 'gen'}>{t('app.contracts.generateN', { n: missing.length })}</Button>}
        </>}>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <ContractStatusBadge status={c.status} />
          <Link to={`/app/customers/${c.customer?.id}`} className="text-petrol-700 hover:underline font-medium">{c.customer?.name}</Link>
          {c.site && <span className="text-sand-600">· {[c.site.label, c.site.district, c.site.city].filter(Boolean).join('، ')}</span>}
        </div>
      </PageHeader>

      {c.status === 'active' && endIn >= 0 && endIn <= 30 && (
        <div className="rounded-2xl border border-saffron-200 bg-saffron-50/70 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <Icon name="alert" size={20} className="text-saffron-600" />
          <div className="flex-1"><p className="font-semibold text-petrol-900">{t('app.contracts.endsIn', { when: relDays(c.end_date, locale) })}</p><p className="text-sm text-saffron-800">{t('app.contracts.renewHint')}</p></div>
          <Button onClick={() => setRenewing(true)}>{t('app.contracts.renew')}</Button>
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_20rem] gap-6 items-start">
        <div className="flex flex-col gap-6 min-w-0">
          <Card title={t('app.contracts.visitPlan')} subtitle={t('app.contracts.visitPlanSub', { per: c.visits_per_year })}>
            <div className="flex items-center gap-5 mb-5">
              <CycleRing done={done} total={total} size={84} stroke={8} label={<span className="text-base">{done}<span className="text-sand-500">/{total}</span></span>} />
              <div>
                <div className="text-2xl font-semibold text-petrol-800 tabular-nums">{t('app.contracts.visitsDone', { done, total })}</div>
                <div className="text-sand-600">{c.next_visit_date && c.status === 'active' ? <>{t('app.contracts.nextVisit')}: <DualDate value={c.next_visit_date} inline /></> : '—'}</div>
              </div>
            </div>
            <ol className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {cells.map(({ d, job, past }, i) => (
                <li key={d}>
                  {job ? (
                    <Link to={`/app/jobs/${job.id}`} className={cx('block rounded-xl border p-3 hover:border-petrol-300', job.status === 'completed' ? 'bg-success-50 border-success-500/30' : 'bg-white border-sand-200')}>
                      <VisitHead i={i} d={d} locale={locale} />
                      <StatusBadge status={job.status} className="mt-1.5" />
                    </Link>
                  ) : (
                    <div className={cx('rounded-xl border border-dashed p-3', past ? 'border-danger-500/40 bg-danger-50/40' : 'border-sand-300 bg-sand-50')}>
                      <VisitHead i={i} d={d} locale={locale} />
                      <span className={cx('mt-1.5 inline-block text-xs', past ? 'text-danger-600' : 'text-sand-500')}>{past ? t('app.contracts.missed') : t('app.contracts.planned')}</span>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </Card>

          <Card padded={false} title={t('app.contracts.visitJobs')} actions={<Button as={Link} to={`/app/jobs/new?customer_id=${c.customer?.id}&contract_id=${c.id}`} size="sm" variant="ghost" icon={<Icon name="plus" size={15} />}>{t('app.contracts.addVisit')}</Button>}>
            <Table className="border-0 shadow-none rounded-t-none" rows={jobs} onRowClick={(j) => nav(`/app/jobs/${j.id}`)}
              empty={<EmptyState title={t('app.contracts.noJobs')} body={t('app.contracts.noJobsBody')} />}
              columns={[
                { key: 'n', header: '#', render: (j) => <Ltr className="text-sand-500">#{j.number}</Ltr> },
                { key: 'd', header: t('app.jobs.when'), render: (j) => <DualDate value={j.scheduled_start} className="text-sm" /> },
                { key: 'tech', header: t('app.jobs.technician'), render: (j) => <TechChip tech={j.technician} /> },
                { key: 's', header: t('app.jobs.status'), render: (j) => <StatusBadge status={j.status} /> },
              ]} />
          </Card>

          {(c.invoices || []).length > 0 && (
            <Card padded={false} title={t('app.nav.invoices')}>
              <Table className="border-0 shadow-none" rows={c.invoices} onRowClick={(i) => nav(`/app/invoices/${i.id}`)}
                columns={[
                  { key: 'n', header: '#', render: (i) => <Ltr>#{i.number}</Ltr> },
                  { key: 'd', header: t('app.invoices.issueDate'), render: (i) => greg(i.issue_date, locale) },
                  { key: 's', header: t('app.jobs.status'), render: (i) => <InvoiceStatusBadge status={i.status} kind={i.kind} /> },
                  { key: 't', header: t('app.items.total'), align: 'end', render: (i) => <Money value={i.total} strong /> },
                ]} />
            </Card>
          )}
        </div>

        <div className="flex flex-col gap-6 lg:sticky lg:top-20">
          <Card title={t('app.contracts.terms')}>
            <dl>
              <KV label={t('app.contracts.start')}><DualDate value={c.start_date} /></KV>
              <KV label={t('app.contracts.end')}><DualDate value={c.end_date} /></KV>
              <KV label={t('app.contracts.visitsPerYear')}><span className="tabular-nums">{c.visits_per_year}</span></KV>
              <KV label={t('app.contracts.priceLabel')}><Money value={c.price} strong /></KV>
              <KV label={t('app.contracts.perVisit')}><Money value={Number(c.price || 0) / Number(c.visits_per_year || 1)} /></KV>
              <KV label={t('app.contracts.vatIncl')}><Money value={Number(c.price || 0) * 1.15} /></KV>
            </dl>
            {c.notes && <p className="mt-3 text-sm text-sand-700 whitespace-pre-line">{c.notes}</p>}
          </Card>
          <div className="flex flex-col gap-2">
            <Button variant="secondary" onClick={() => setRenewing(true)} icon={<Icon name="cycle" size={16} />}>{t('app.contracts.renew')}</Button>
            {user?.role === 'owner' && c.status !== 'cancelled' && <Button variant="ghost" className="text-danger-600 hover:bg-danger-50" onClick={cancel}>{t('app.contracts.cancel')}</Button>}
          </div>
          <p className="text-xs text-sand-500 leading-relaxed">{t('app.contracts.autoNote')}</p>
        </div>
      </div>

      <GenerateModal open={genOpen} n={missing.length} onClose={() => setGenOpen(false)} onConfirm={gen} />
      <ContractFormModal open={editing} onClose={() => setEditing(false)} initial={c} onSaved={() => reload()} />
      <ContractFormModal open={renewing} onClose={() => setRenewing(false)} initial={renewalInitial} onSaved={(k) => nav(`/app/contracts/${k.id}`)} />
    </div>
  );
}

function VisitHead({ i, d, locale }) {
  return (
    <>
      <div className="text-xs text-sand-500 tabular-nums">#{i + 1}</div>
      <div className="font-medium tabular-nums text-sm">{greg(d, locale, { day: 'numeric', month: 'short', year: 'numeric' })}</div>
      <div className="text-[11px] text-sand-500">{hijri(d, locale, { day: 'numeric', month: 'short' })}</div>
    </>
  );
}

function GenerateModal({ open, n, onClose, onConfirm }) {
  const { t } = useI18n();
  const [techs] = useTechnicians();
  const [tech, setTech] = useState('');
  useEffect(() => { if (open) setTech(''); }, [open]);
  return (
    <Modal open={open} onClose={onClose} size="sm" title={t('app.contracts.genTitle')}
      footer={<><Button variant="secondary" onClick={onClose}>{t('common.cancel')}</Button><Button onClick={() => onConfirm(tech || undefined)}>{t('app.contracts.generateN', { n })}</Button></>}>
      <div className="flex flex-col gap-4">
        <p className="text-sand-700">{t('app.contracts.genBody', { n })}</p>
        <Select label={t('app.contracts.genTech')} value={tech} onChange={(e) => setTech(e.target.value)} placeholder={t('app.common.unassigned')}
          options={techs.map((x) => ({ value: x.id, label: x.name }))} hint={t('app.contracts.genTechHint')} />
      </div>
    </Modal>
  );
}
