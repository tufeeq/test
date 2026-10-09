// Job create/edit form. Used by /app/jobs/new (page) and Job detail (edit modal).
import { useEffect, useMemo, useState } from 'react';
import { api } from '../../lib/api.js';
import { useI18n } from '../../i18n/index.jsx';
import { Button, Card, Input, Select, Textarea, useToast } from '../ui/index.js';
import { cx } from '../../lib/cx.js';
import Icon from './icons.jsx';
import ItemsEditor, { cleanItems } from './ItemsEditor.jsx';
import { CustomerPicker } from './CustomerForm.jsx';
import { CATEGORIES, PRIORITIES, ASSET_KINDS, useTechnicians, Avatar, catLabel } from './kit.jsx';
import { fromLocalInput, toLocalInput } from './dates.js';

const DEFAULT_CHECKLIST = ['app.jobs.check1', 'app.jobs.check2', 'app.jobs.check3', 'app.jobs.check4'];

export default function JobForm({ initial, onSaved, onCancel, layout = 'page' }) {
  const { t } = useI18n();
  const toast = useToast();
  const [techs] = useTechnicians();
  const editing = !!initial?.id;
  const [customer, setCustomer] = useState(initial?.customer || null);
  const [sites, setSites] = useState([]);
  const [f, setF] = useState(() => ({
    title: initial?.title || '',
    description: initial?.description || '',
    category: initial?.category || 'ac',
    priority: initial?.priority || 'normal',
    site_id: initial?.site?.id || '',
    asset_id: initial?.asset?.id || '',
    technician_id: initial?.technician?.id || '',
    start: initial?.scheduled_start ? toLocalInput(initial.scheduled_start) : '',
    duration: initial?.scheduled_start && initial?.scheduled_end ? Math.round((new Date(initial.scheduled_end) - new Date(initial.scheduled_start)) / 60000) : '',
    notes: initial?.notes || '',
    contract_id: initial?.contract_id || '',
    source: initial?.source || 'manual',
  }));
  const [items, setItems] = useState(initial?.items || []);
  const [withChecklist, setWithChecklist] = useState(!editing);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));

  // Load sites (+assets) when customer changes
  useEffect(() => {
    if (!customer?.id) { setSites([]); return; }
    let alive = true;
    api.get(`/customers/${customer.id}`).then((c) => {
      if (!alive) return;
      const s = c.sites || [];
      setSites(s);
      setF((x) => ({ ...x, site_id: x.site_id && s.some((y) => y.id === x.site_id) ? x.site_id : s[0]?.id || '' }));
    }).catch(() => alive && setSites([]));
    return () => { alive = false; };
  }, [customer?.id]);

  const site = sites.find((s) => s.id === f.site_id);
  const assets = site?.assets || [];
  const suggested = useMemo(() => {
    // Suggest techs whose skills match the chosen asset kind
    const kind = assets.find((a) => a.id === f.asset_id)?.kind;
    return kind ? new Set(techs.filter((x) => (x.skills || []).includes(kind)).map((x) => x.id)) : new Set();
  }, [assets, f.asset_id, techs]);

  const submit = async (e) => {
    e?.preventDefault();
    const er = {};
    if (!customer) er.customer = t('app.form.required');
    if (!f.title.trim()) er.title = t('app.form.required');
    setErrors(er);
    if (Object.keys(er).length) return;
    setSaving(true);
    const start = fromLocalInput(f.start);
    const body = {
      customer_id: customer.id,
      site_id: f.site_id || null,
      asset_id: f.asset_id || null,
      title: f.title.trim(),
      description: f.description || null,
      category: f.category,
      priority: f.priority,
      technician_id: f.technician_id || null,
      scheduled_start: start,
      notes: f.notes || null,
    };
    if (start && f.duration) body.scheduled_end = new Date(new Date(start).getTime() + Number(f.duration) * 60000).toISOString();
    else if (!start) body.scheduled_end = null;
    if (f.contract_id) body.contract_id = f.contract_id;
    if (!editing) {
      body.source = f.source || 'manual';
      body.items = cleanItems(items);
      if (withChecklist) body.checklist = DEFAULT_CHECKLIST.map((k) => ({ label: t(k), done: false }));
      // POST rejects nulls on optional fields in some validators — drop them
      for (const k of Object.keys(body)) if (body[k] === null) delete body[k];
    }
    try {
      const job = editing ? await api.patch(`/jobs/${initial.id}`, body) : await api.post('/jobs', body);
      toast.success(editing ? t('common.saved') : t('app.jobs.created', { n: job.number ?? '' }));
      if (job?.warnings?.length) toast.info(t('app.schedule.savedWithConflict'));
      onSaved?.(job);
    } catch (err) {
      if (err.details?.length) setErrors(Object.fromEntries(err.details.map((d) => [String(d.path).replace(/^body\./, ''), d.message])));
      toast.error(err);
    } finally { setSaving(false); }
  };

  const Section = layout === 'page' ? Card : PlainSection;

  return (
    <form onSubmit={submit} className={cx('grid gap-6', layout === 'page' && 'lg:grid-cols-[1fr_22rem] items-start')}>
      <div className="flex flex-col gap-6 min-w-0">
        <Section title={t('app.jobs.secCustomer')}>
          <div className="flex flex-col gap-4">
            {editing ? (
              <div className="text-base"><span className="text-sand-600 text-sm block">{t('app.jobs.customer')}</span><span className="font-medium">{customer?.name}</span></div>
            ) : <CustomerPicker value={customer} onChange={setCustomer} error={errors.customer || errors.customer_id} />}
            {customer && (
              <div className="grid sm:grid-cols-2 gap-4">
                <Select label={t('app.jobs.site')} value={f.site_id} onChange={(e) => { set('site_id', e.target.value); set('asset_id', ''); }}
                  placeholder={sites.length ? undefined : t('app.jobs.noSites')}
                  options={sites.map((s) => ({ value: s.id, label: [s.label, s.district, s.city].filter(Boolean).join(' · ') || t('app.sites.unnamed') }))} />
                <Select label={t('app.jobs.asset')} value={f.asset_id} onChange={(e) => set('asset_id', e.target.value)} placeholder={t('app.jobs.anyAsset')} disabled={!assets.length}
                  options={assets.map((a) => ({ value: a.id, label: `${t(`assetKind.${a.kind}`)}${a.brand ? ` · ${a.brand}` : ''}${a.capacity_btu ? ` · ${a.capacity_btu} BTU` : ''}` }))} />
              </div>
            )}
          </div>
        </Section>

        <Section title={t('app.jobs.secWork')}>
          <div className="flex flex-col gap-4">
            <Input label={t('app.jobs.titleLabel')} required value={f.title} onChange={(e) => set('title', e.target.value)} error={errors.title} placeholder={t('app.jobs.titlePh')} />
            <div className="grid sm:grid-cols-2 gap-4">
              <Select label={t('app.jobs.category')} value={f.category} onChange={(e) => set('category', e.target.value)} options={CATEGORIES.map((c) => ({ value: c, label: catLabel(t, c) }))} />
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-sand-800">{t('app.jobs.priority')}</span>
                <div className="flex gap-1.5">
                  {PRIORITIES.map((p) => (
                    <button key={p} type="button" onClick={() => set('priority', p)} aria-pressed={f.priority === p}
                      className={cx('flex-1 h-10 rounded-xl border text-sm font-medium transition-colors', f.priority === p
                        ? (p === 'urgent' ? 'bg-danger-500 border-danger-500 text-white' : 'bg-petrol-600 border-petrol-600 text-white')
                        : 'bg-white border-sand-200 text-sand-700 hover:border-sand-300')}>
                      {t(`priority.${p}`)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <Textarea label={t('app.jobs.description')} rows={3} value={f.description} onChange={(e) => set('description', e.target.value)} placeholder={t('app.jobs.descPh')} />
          </div>
        </Section>

        {!editing && (
          <Section title={t('app.jobs.secItems')}>
            <ItemsEditor items={items} onChange={setItems} />
            <label className="mt-4 flex items-center gap-2 text-sm text-sand-700">
              <input type="checkbox" checked={withChecklist} onChange={(e) => setWithChecklist(e.target.checked)} className="h-4 w-4 accent-petrol-600" />
              {t('app.jobs.addDefaultChecklist')}
            </label>
          </Section>
        )}
      </div>

      <div className={cx('flex flex-col gap-6', layout === 'page' && 'lg:sticky lg:top-20')}>
        <Section title={t('app.jobs.secSchedule')}>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-[1fr_7rem] gap-3">
              <Input type="datetime-local" label={t('app.jobs.scheduledStart')} value={f.start} onChange={(e) => set('start', e.target.value)} dir="ltr" step={900} />
              <Select label={t('app.jobs.duration')} value={String(f.duration)} onChange={(e) => set('duration', e.target.value)}
                options={[{ value: '', label: t('app.jobs.durAuto') }, ...[30, 45, 60, 90, 120, 180, 240].map((m) => ({ value: String(m), label: m < 60 ? `${m}${t('app.common.minShort')}` : `${m / 60}${t('app.common.hourShort')}` }))]} />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-sand-800">{t('app.jobs.technician')}</span>
              <div className="flex flex-col gap-1 max-h-64 overflow-y-auto">
                <TechOption active={!f.technician_id} onClick={() => set('technician_id', '')} label={t('app.common.unassigned')} />
                {techs.map((x) => (
                  <TechOption key={x.id} active={f.technician_id === x.id} onClick={() => set('technician_id', x.id)} label={x.name} color={x.color}
                    hint={suggested.has(x.id) ? t('app.jobs.skillMatch') : (x.skills || []).filter((s) => ASSET_KINDS.includes(s)).map((s) => t(`assetKind.${s}`)).join('، ')} match={suggested.has(x.id)} />
                ))}
              </div>
            </div>
            {f.start && f.technician_id ? <p className="text-sm text-success-600 flex items-center gap-1.5"><Icon name="check" size={15} />{t('app.jobs.willBeScheduled')}</p>
              : <p className="text-sm text-sand-500">{t('app.jobs.willBeNew')}</p>}
          </div>
        </Section>
        <Section title={t('app.jobs.internalNotes')}>
          <Textarea rows={2} value={f.notes} onChange={(e) => set('notes', e.target.value)} placeholder={t('app.jobs.notesPh')} />
        </Section>
        <div className="flex gap-2 justify-end">
          {onCancel && <Button variant="secondary" onClick={onCancel}>{t('common.cancel')}</Button>}
          <Button type="submit" loading={saving} size="lg" className={layout === 'page' ? 'flex-1' : ''}>{editing ? t('common.save') : t('app.jobs.create')}</Button>
        </div>
      </div>
    </form>
  );
}

function PlainSection({ title, children }) {
  return <div className="flex flex-col gap-3"><h3 className="font-semibold text-sand-800">{title}</h3>{children}</div>;
}

function TechOption({ active, onClick, label, color, hint, match }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active}
      className={cx('flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-start border transition-colors', active ? 'border-petrol-500 bg-petrol-50' : 'border-transparent hover:bg-sand-100')}>
      {color ? <Avatar name={label} color={color} size={26} /> : <span className="h-[26px] w-[26px] rounded-full border-2 border-dashed border-sand-300" />}
      <span className="flex-1 min-w-0">
        <span className="block truncate text-base">{label}</span>
        {hint && <span className={cx('block truncate text-xs', match ? 'text-success-600' : 'text-sand-500')}>{hint}</span>}
      </span>
      {active && <Icon name="check" size={16} className="text-petrol-600" />}
    </button>
  );
}
