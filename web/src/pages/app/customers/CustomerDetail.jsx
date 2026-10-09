// OWNER: B3. Customer detail: profile, sites with AC assets, job history, invoices, contracts.
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../lib/api.js';
import { useAsync } from '../../../lib/useAsync.js';
import { useAuth } from '../../../lib/auth.jsx';
import { useI18n } from '../../../i18n/index.jsx';
import { Badge, Button, Card, EmptyState, Input, Modal, PageHeader, Select, StatusBadge, Table, Tabs, Textarea, useToast } from '../../../components/ui/index.js';
import Icon from '../../../components/app/icons.jsx';
import { CustomerFormModal } from '../../../components/app/CustomerForm.jsx';
import ContractFormModal from '../../../components/app/ContractForm.jsx';
import { ASSET_KINDS, ContractStatusBadge, CycleRing, DualDate, ErrorState, InvoiceStatusBadge, Ltr, Money, PageSkeleton, TechChip, useConfirm, waLink } from '../../../components/app/kit.jsx';
import { greg, diffDays, todayYmd } from '../../../components/app/dates.js';

export default function CustomerDetail() {
  const { id } = useParams();
  const { t, locale } = useI18n();
  const nav = useNavigate();
  const toast = useToast();
  const { user } = useAuth();
  const { data: c, error, loading, reload } = useAsync(() => api.get(`/customers/${id}`), [id]);
  const [tab, setTab] = useState('sites');
  const [editing, setEditing] = useState(false);
  const [siteModal, setSiteModal] = useState(null); // site obj or {} for new
  const [assetModal, setAssetModal] = useState(null); // { site_id, asset? }
  const [contractOpen, setContractOpen] = useState(false);
  const [confirm, confirmNode] = useConfirm();

  if (error) return <div><PageHeader title={t('app.customers.title')} back="/app/customers" /><ErrorState error={error} onRetry={reload} /></div>;
  if (loading && !c) return <PageSkeleton />;
  if (!c) return null;

  const invs = (c.invoices || []).filter((i) => i.kind !== 'credit_note');
  const balance = c.balance_due ?? invs.filter((i) => i.status === 'unpaid').reduce((s, i) => s + Number(i.total || 0), 0);
  const paid = c.lifetime_paid ?? invs.filter((i) => i.status === 'paid').reduce((s, i) => s + Number(i.total || 0), 0);
  const assetCount = (c.sites || []).reduce((s, x) => s + (x.assets?.length || 0), 0);

  const delCustomer = async () => {
    if (!(await confirm({ title: t('app.customers.deleteTitle'), body: t('app.customers.deleteBody'), danger: true, confirmLabel: t('common.delete') }))) return;
    try { await api.del(`/customers/${c.id}`); toast.success(t('common.deleted')); nav('/app/customers'); }
    catch (e) { toast.error(e.code === 'conflict' ? t('app.customers.deleteConflict') : e); }
  };
  const delSite = async (s) => {
    if (!(await confirm({ title: t('app.sites.deleteTitle'), body: t('app.sites.deleteBody'), danger: true, confirmLabel: t('common.delete') }))) return;
    try { await api.del(`/sites/${s.id}`); toast.success(t('common.deleted')); reload(); } catch (e) { toast.error(e); }
  };
  const delAsset = async (a) => {
    if (!(await confirm({ title: t('app.assets.deleteTitle'), body: `${t(`assetKind.${a.kind}`)} ${a.brand || ''}`, danger: true, confirmLabel: t('common.delete') }))) return;
    try { await api.del(`/assets/${a.id}`); toast.success(t('common.deleted')); reload(); } catch (e) { toast.error(e); }
  };

  return (
    <div className="flex flex-col gap-6">
      {confirmNode}
      <PageHeader back="/app/customers" title={c.name}
        actions={<>
          <Button variant="secondary" icon={<Icon name="edit" size={16} />} onClick={() => setEditing(true)}>{t('common.edit')}</Button>
          <Button as={Link} to={`/app/jobs/new?customer_id=${c.id}`} icon={<Icon name="plus" size={16} />}>{t('app.jobs.new')}</Button>
        </>}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sand-700">
          <Badge tone={c.type === 'business' ? 'petrol' : 'sand'}>{t(`app.customers.type_${c.type || 'individual'}`)}</Badge>
          <a href={`tel:+${c.phone}`} className="inline-flex items-center gap-1.5 hover:text-petrol-700"><Icon name="phone" size={15} /><Ltr>{c.phone}</Ltr></a>
          <a href={waLink(c.phone, '')} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-petrol-700"><Icon name="whatsapp" size={15} />{t('app.common.whatsapp')}</a>
          {c.email && <Ltr className="text-sand-600">{c.email}</Ltr>}
          {c.vat_number && <span className="text-sm">VAT <Ltr>{c.vat_number}</Ltr></span>}
        </div>
      </PageHeader>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Mini label={t('app.customers.jobs')} value={c.jobs_count ?? (c.jobs || []).length} />
        <Mini label={t('app.customers.assets')} value={assetCount} />
        <Mini label={t('app.customers.paidTotal')} value={<Money value={paid} />} />
        <Mini label={t('app.customers.balance')} value={<Money value={balance} />} warn={balance > 0} />
      </div>

      {c.notes && <div className="rounded-2xl bg-saffron-50/70 border border-saffron-200 px-5 py-3 text-sand-800 whitespace-pre-line">{c.notes}</div>}

      <Tabs value={tab} onChange={setTab} items={[
        { value: 'sites', label: t('app.customers.sitesAssets'), count: (c.sites || []).length },
        { value: 'jobs', label: t('app.customers.jobs'), count: (c.jobs || []).length },
        { value: 'invoices', label: t('app.nav.invoices'), count: (c.invoices || []).length },
        { value: 'contracts', label: t('app.nav.contracts'), count: (c.contracts || []).length },
      ]} />

      {tab === 'sites' && (
        <div className="flex flex-col gap-4">
          {(c.sites || []).length === 0 && <Card><EmptyState title={t('app.sites.empty')} body={t('app.sites.emptyBody')} action={<Button onClick={() => setSiteModal({})}>{t('app.sites.add')}</Button>} /></Card>}
          {(c.sites || []).map((s) => (
            <Card key={s.id} padded={false}
              title={<span className="flex items-center gap-2"><Icon name="pin" size={17} className="text-petrol-500" />{s.label || [s.district, s.city].filter(Boolean).join('، ') || t('app.sites.unnamed')}</span>}
              subtitle={[s.district, s.city, s.address].filter(Boolean).join(' · ')}
              actions={<>
                {s.lat && s.lng && <Button as="a" size="sm" variant="ghost" href={`https://www.google.com/maps?q=${s.lat},${s.lng}`} target="_blank" rel="noreferrer" icon={<Icon name="pin" size={15} />}><span className="hidden sm:inline">{t('app.sites.openMap')}</span></Button>}
                <Button size="sm" variant="ghost" onClick={() => setSiteModal(s)} aria-label={t('common.edit')}><Icon name="edit" size={15} /></Button>
                <Button size="sm" variant="ghost" onClick={() => delSite(s)} aria-label={t('common.delete')} className="text-danger-600"><Icon name="trash" size={15} /></Button>
              </>}>
              {(s.assets || []).length === 0 ? (
                <div className="px-5 py-4 flex items-center justify-between gap-3 text-sand-600 text-sm">
                  {t('app.assets.empty')}
                  <Button size="sm" variant="secondary" icon={<Icon name="plus" size={15} />} onClick={() => setAssetModal({ site_id: s.id })}>{t('app.assets.add')}</Button>
                </div>
              ) : (
                <div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-base">
                      <thead><tr className="text-sm text-sand-600 border-b border-sand-100 bg-sand-50/60">
                        <th className="px-5 py-2 text-start font-medium">{t('app.assets.kind')}</th>
                        <th className="px-3 py-2 text-start font-medium">{t('app.assets.brand')}</th>
                        <th className="px-3 py-2 text-end font-medium">BTU</th>
                        <th className="px-3 py-2 text-start font-medium">{t('app.assets.installDate')}</th>
                        <th className="px-3 py-2 text-start font-medium">{t('app.assets.age')}</th>
                        <th className="px-3 py-2" />
                      </tr></thead>
                      <tbody>
                        {s.assets.map((a) => {
                          const years = a.install_date ? Math.floor(diffDays(a.install_date, todayYmd()) / 365) : null;
                          return (
                            <tr key={a.id} className="border-b border-sand-100 last:border-0">
                              <td className="px-5 py-2.5"><span className="inline-flex items-center gap-2"><Icon name="snow" size={16} className="text-petrol-500" />{t(`assetKind.${a.kind}`)}</span></td>
                              <td className="px-3 py-2.5">{a.brand || <span className="text-sand-400">—</span>}</td>
                              <td className="px-3 py-2.5 text-end tabular-nums">{a.capacity_btu ? Number(a.capacity_btu).toLocaleString('en') : '—'}</td>
                              <td className="px-3 py-2.5 whitespace-nowrap">{a.install_date ? <DualDate value={a.install_date} inline className="text-sm" /> : <span className="text-sand-400">—</span>}</td>
                              <td className="px-3 py-2.5">{years != null ? <Badge tone={years >= 8 ? 'saffron' : 'sand'}>{t('app.assets.years', { n: years })}</Badge> : '—'}</td>
                              <td className="px-3 py-2.5 text-end whitespace-nowrap">
                                <button onClick={() => setAssetModal({ site_id: s.id, asset: a })} className="h-8 w-8 inline-grid place-items-center rounded-lg text-sand-500 hover:bg-sand-100" aria-label={t('common.edit')}><Icon name="edit" size={15} /></button>
                                <button onClick={() => delAsset(a)} className="h-8 w-8 inline-grid place-items-center rounded-lg text-sand-500 hover:bg-danger-50 hover:text-danger-600" aria-label={t('common.delete')}><Icon name="trash" size={15} /></button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-5 py-3 border-t border-sand-100"><Button size="sm" variant="ghost" icon={<Icon name="plus" size={15} />} onClick={() => setAssetModal({ site_id: s.id })}>{t('app.assets.add')}</Button></div>
                </div>
              )}
            </Card>
          ))}
          {(c.sites || []).length > 0 && <Button variant="secondary" className="self-start" icon={<Icon name="plus" size={16} />} onClick={() => setSiteModal({})}>{t('app.sites.add')}</Button>}
        </div>
      )}

      {tab === 'jobs' && (
        <Table rows={c.jobs || []} onRowClick={(j) => nav(`/app/jobs/${j.id}`)}
          empty={<EmptyState title={t('app.customers.noJobs')} action={<Button as={Link} to={`/app/jobs/new?customer_id=${c.id}`}>{t('app.jobs.new')}</Button>} />}
          columns={[
            { key: 'n', header: '#', render: (j) => <Ltr className="text-sand-500">#{j.number}</Ltr> },
            { key: 'title', header: t('app.jobs.job'), render: (j) => <span className="font-medium">{j.title}</span> },
            { key: 'when', header: t('app.jobs.when'), render: (j) => <DualDate value={j.scheduled_start || j.completed_at} className="text-sm" /> },
            { key: 'tech', header: t('app.jobs.technician'), render: (j) => <TechChip tech={j.technician} /> },
            { key: 'st', header: t('app.jobs.status'), render: (j) => <StatusBadge status={j.status} /> },
            { key: 'tot', header: t('app.items.subtotal'), align: 'end', render: (j) => (j.total ? <Money value={j.total} /> : '—') },
          ]} />
      )}

      {tab === 'invoices' && (
        <Table rows={c.invoices || []} onRowClick={(i) => nav(`/app/invoices/${i.id}`)}
          empty={<EmptyState title={t('app.customers.noInvoices')} />}
          columns={[
            { key: 'n', header: '#', render: (i) => (i.number != null ? <Ltr className="text-sand-500">#{i.number}</Ltr> : '—') },
            { key: 'd', header: t('app.invoices.issueDate'), render: (i) => <DualDate value={i.issue_date} className="text-sm" /> },
            { key: 'k', header: t('app.invoices.kind'), render: (i) => t(`app.invoices.kind_${i.kind}`) },
            { key: 's', header: t('app.jobs.status'), render: (i) => <InvoiceStatusBadge status={i.status} kind={i.kind} /> },
            { key: 't', header: t('app.items.total'), align: 'end', render: (i) => <Money value={i.total} strong /> },
          ]} />
      )}

      {tab === 'contracts' && (
        <div className="flex flex-col gap-3">
          {(c.contracts || []).length === 0 ? <Card><EmptyState title={t('app.customers.noContracts')} body={t('app.contracts.emptyBody')} action={<Button onClick={() => setContractOpen(true)}>{t('app.contracts.new')}</Button>} /></Card> : <>
            {(c.contracts || []).map((k) => (
              <Link key={k.id} to={`/app/contracts/${k.id}`} className="rounded-2xl bg-white border border-sand-200/70 shadow-card p-4 flex items-center gap-4 hover:border-petrol-200">
                <CycleRing done={k.visits_done ?? 0} total={k.visits_per_year} />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{k.title}</div>
                  <div className="text-sm text-sand-600 tabular-nums">{greg(k.start_date, locale)} – {greg(k.end_date, locale)}</div>
                </div>
                <ContractStatusBadge status={k.status} />
              </Link>
            ))}
            <Button variant="secondary" className="self-start" icon={<Icon name="plus" size={16} />} onClick={() => setContractOpen(true)}>{t('app.contracts.new')}</Button>
          </>}
        </div>
      )}

      {user?.role === 'owner' && (
        <div className="pt-4 border-t border-sand-200">
          <Button variant="ghost" className="text-danger-600 hover:bg-danger-50" icon={<Icon name="trash" size={16} />} onClick={delCustomer}>{t('app.customers.delete')}</Button>
        </div>
      )}

      <CustomerFormModal open={editing} onClose={() => setEditing(false)} initial={c} onSaved={() => reload()} />
      <SiteModal site={siteModal} customerId={c.id} onClose={() => setSiteModal(null)} onSaved={reload} />
      <AssetModal ctx={assetModal} onClose={() => setAssetModal(null)} onSaved={reload} />
      <ContractFormModal open={contractOpen} onClose={() => setContractOpen(false)} initial={{ customer: { id: c.id, name: c.name, phone: c.phone } }} onSaved={(k) => nav(`/app/contracts/${k.id}`)} />
    </div>
  );
}

function Mini({ label, value, warn }) {
  return (
    <div className={`rounded-2xl border p-4 ${warn ? 'bg-saffron-50/60 border-saffron-200' : 'bg-white border-sand-200/70 shadow-card'}`}>
      <div className="text-sm text-sand-600">{label}</div>
      <div className="text-xl font-semibold text-petrol-800 tabular-nums mt-0.5 truncate">{value}</div>
    </div>
  );
}

function SiteModal({ site, customerId, onClose, onSaved }) {
  const { t } = useI18n();
  const toast = useToast();
  const [f, setF] = useState({});
  const [saving, setSaving] = useState(false);
  useEffect(() => { if (site) setF({ label: site.label || '', city: site.city || 'الرياض', district: site.district || '', address: site.address || '', lat: site.lat ?? '', lng: site.lng ?? '' }); }, [site]);
  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));
  const save = async () => {
    setSaving(true);
    const body = { label: f.label || null, city: f.city || null, district: f.district || null, address: f.address || null, lat: f.lat === '' ? null : Number(f.lat), lng: f.lng === '' ? null : Number(f.lng) };
    try {
      if (site?.id) await api.patch(`/sites/${site.id}`, body);
      else await api.post('/sites', { customer_id: customerId, ...Object.fromEntries(Object.entries(body).filter(([, v]) => v !== null)) });
      toast.success(t('common.saved')); onSaved(); onClose();
    } catch (e) { toast.error(e); } finally { setSaving(false); }
  };
  const locate = () => navigator.geolocation?.getCurrentPosition((p) => { set('lat', p.coords.latitude.toFixed(6)); set('lng', p.coords.longitude.toFixed(6)); }, () => toast.error(t('app.sites.locateFailed')));
  return (
    <Modal open={!!site} onClose={onClose} title={site?.id ? t('app.sites.edit') : t('app.sites.add')}
      footer={<><Button variant="secondary" onClick={onClose}>{t('common.cancel')}</Button><Button onClick={save} loading={saving}>{t('common.save')}</Button></>}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Input className="sm:col-span-2" label={t('app.sites.label')} value={f.label || ''} onChange={(e) => set('label', e.target.value)} placeholder={t('app.sites.labelPh')} />
        <Input label={t('app.sites.city')} value={f.city || ''} onChange={(e) => set('city', e.target.value)} />
        <Input label={t('app.sites.district')} value={f.district || ''} onChange={(e) => set('district', e.target.value)} />
        <Input className="sm:col-span-2" label={t('app.sites.address')} value={f.address || ''} onChange={(e) => set('address', e.target.value)} />
        <Input label={t('app.sites.lat')} value={f.lat} onChange={(e) => set('lat', e.target.value)} dir="ltr" inputMode="decimal" />
        <Input label={t('app.sites.lng')} value={f.lng} onChange={(e) => set('lng', e.target.value)} dir="ltr" inputMode="decimal" />
        <Button variant="ghost" size="sm" className="sm:col-span-2 justify-self-start" icon={<Icon name="pin" size={15} />} onClick={locate}>{t('app.sites.useMyLocation')}</Button>
      </div>
    </Modal>
  );
}

function AssetModal({ ctx, onClose, onSaved }) {
  const { t } = useI18n();
  const toast = useToast();
  const [f, setF] = useState({});
  const [saving, setSaving] = useState(false);
  useEffect(() => { if (ctx) { const a = ctx.asset || {}; setF({ kind: a.kind || 'split_ac', brand: a.brand || '', capacity_btu: a.capacity_btu || '', install_date: a.install_date?.slice(0, 10) || '', notes: a.notes || '' }); } }, [ctx]);
  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));
  const save = async () => {
    setSaving(true);
    const body = { kind: f.kind, brand: f.brand || null, capacity_btu: f.capacity_btu ? Number(f.capacity_btu) : null, install_date: f.install_date || null, notes: f.notes || null };
    try {
      if (ctx.asset?.id) await api.patch(`/assets/${ctx.asset.id}`, body);
      else await api.post('/assets', { site_id: ctx.site_id, ...Object.fromEntries(Object.entries(body).filter(([, v]) => v !== null)) });
      toast.success(t('common.saved')); onSaved(); onClose();
    } catch (e) { toast.error(e); } finally { setSaving(false); }
  };
  return (
    <Modal open={!!ctx} onClose={onClose} title={ctx?.asset ? t('app.assets.edit') : t('app.assets.add')}
      footer={<><Button variant="secondary" onClick={onClose}>{t('common.cancel')}</Button><Button onClick={save} loading={saving}>{t('common.save')}</Button></>}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Select label={t('app.assets.kind')} value={f.kind} onChange={(e) => set('kind', e.target.value)} options={ASSET_KINDS.map((k) => ({ value: k, label: t(`assetKind.${k}`) }))} />
        <Input label={t('app.assets.brand')} value={f.brand} onChange={(e) => set('brand', e.target.value)} placeholder="Gree, LG, Carrier…" list="ac-brands" />
        <datalist id="ac-brands">{['Gree', 'LG', 'Samsung', 'Carrier', 'Midea', 'Daikin', 'Haier', 'Zamil', 'Hisense', 'TCL', 'York'].map((b) => <option key={b} value={b} />)}</datalist>
        <Select label={t('app.assets.capacity')} value={String(f.capacity_btu)} onChange={(e) => set('capacity_btu', e.target.value)}
          options={[{ value: '', label: '—' }, ...[12000, 18000, 24000, 30000, 36000, 48000, 60000].map((b) => ({ value: String(b), label: `${b.toLocaleString('en')} BTU` })),
            ...(f.capacity_btu && ![12000, 18000, 24000, 30000, 36000, 48000, 60000].includes(Number(f.capacity_btu)) ? [{ value: String(f.capacity_btu), label: `${f.capacity_btu} BTU` }] : [])]} />
        <Input type="date" label={t('app.assets.installDate')} value={f.install_date} onChange={(e) => set('install_date', e.target.value)} dir="ltr" />
        <Textarea className="sm:col-span-2" rows={2} label={t('app.customers.notes')} value={f.notes} onChange={(e) => set('notes', e.target.value)} />
      </div>
    </Modal>
  );
}
