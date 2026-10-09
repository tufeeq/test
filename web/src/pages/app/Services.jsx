// OWNER: B3. Price list (services) CRUD, grouped by category.
import { useMemo, useState, useEffect } from 'react';
import { api } from '../../lib/api.js';
import { useAsync } from '../../lib/useAsync.js';
import { useAuth } from '../../lib/auth.jsx';
import { useI18n } from '../../i18n/index.jsx';
import { Badge, Button, Card, EmptyState, Input, Modal, PageHeader, Select, useToast } from '../../components/ui/index.js';
import Icon from '../../components/app/icons.jsx';
import { ErrorState, Money, SearchBox, Segmented, SkeletonRows, invalidateRef, useConfirm } from '../../components/app/kit.jsx';
import { cx } from '../../lib/cx.js';

const SVC_CATS = ['cleaning', 'repair', 'installation', 'inspection', 'maintenance', 'other'];

export default function Services() {
  const { t, locale } = useI18n();
  const toast = useToast();
  const { user } = useAuth();
  const [show, setShow] = useState('active');
  const [q, setQ] = useState('');
  const { data, error, loading, reload, setData } = useAsync(() => api.get('/services', show === 'active' ? { active: true } : {}), [show]);
  const [editing, setEditing] = useState(null);
  const [confirm, confirmNode] = useConfirm();

  const groups = useMemo(() => {
    const f = q.trim().toLowerCase();
    const list = (data?.items || []).filter((s) => !f || (s.name || '').toLowerCase().includes(f) || (s.name_ar || '').includes(q.trim()));
    const g = {};
    for (const s of list) (g[s.category || 'other'] ||= []).push(s);
    return Object.entries(g);
  }, [data, q]);

  const remove = async (s) => {
    if (!(await confirm({ title: t('app.services.removeTitle'), body: t('app.services.removeBody', { name: locale === 'ar' ? s.name_ar || s.name : s.name }), danger: true, confirmLabel: t('app.services.remove') }))) return;
    try { await api.del(`/services/${s.id}`); invalidateRef('services'); setData((d) => ({ ...d, items: show === 'active' ? d.items.filter((x) => x.id !== s.id) : d.items.map((x) => (x.id === s.id ? { ...x, active: false } : x)) })); toast.success(t('app.services.removed')); }
    catch (e) { toast.error(e); }
  };
  const restore = async (s) => {
    try { const r = await api.patch(`/services/${s.id}`, { active: true }); invalidateRef('services'); setData((d) => ({ ...d, items: d.items.map((x) => (x.id === s.id ? { ...x, ...r } : x)) })); } catch (e) { toast.error(e); }
  };

  return (
    <div>
      {confirmNode}
      <PageHeader title={t('app.services.title')} subtitle={t('app.services.subtitle')}
        actions={<Button onClick={() => setEditing({})} icon={<Icon name="plus" size={17} />}>{t('app.services.new')}</Button>} />
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <SearchBox className="w-full sm:w-72" value={q} onChange={setQ} placeholder={t('app.services.searchPh')} />
        <Segmented value={show} onChange={setShow} items={[{ value: 'active', label: t('app.services.showActive') }, { value: 'all', label: t('app.services.showAll') }]} />
      </div>
      {error ? <ErrorState error={error} onRetry={reload} />
        : loading && !data ? <Card><SkeletonRows rows={6} /></Card>
        : groups.length === 0 ? <Card><EmptyState icon={<Icon name="services" size={24} />} title={q ? t('app.services.noMatch') : t('app.services.empty')} body={q ? undefined : t('app.services.emptyBody')} action={!q && <Button onClick={() => setEditing({})}>{t('app.services.new')}</Button>} /></Card>
        : (
          <div className="flex flex-col gap-5">
            {groups.map(([cat, list]) => (
              <Card key={cat} padded={false} title={catLabel(t, cat)} subtitle={t('app.services.countN', { n: list.length })}>
                <ul className="divide-y divide-sand-100">
                  {list.map((s) => (
                    <li key={s.id} className={cx('flex items-center gap-3 px-5 py-3', s.active === false && 'opacity-60')}>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{locale === 'ar' ? s.name_ar || s.name : s.name}</div>
                        <div className="text-sm text-sand-500 truncate">{locale === 'ar' ? s.name : s.name_ar}{s.duration_min ? ` · ${t('app.services.minutes', { n: s.duration_min })}` : ''}</div>
                      </div>
                      {s.taxable === false && <Badge tone="sand">{t('app.services.noVat')}</Badge>}
                      {s.active === false && <Badge tone="sand">{t('app.services.inactive')}</Badge>}
                      <div className="text-end">
                        <Money value={s.price} strong className="text-petrol-800" />
                        <div className="text-xs text-sand-500 tabular-nums">{t('app.services.inclVat')} <Money value={s.taxable === false ? s.price : Number(s.price) * 1.15} /></div>
                      </div>
                      <div className="flex">
                        <button onClick={() => setEditing(s)} className="h-9 w-9 grid place-items-center rounded-lg text-sand-500 hover:bg-sand-100" aria-label={t('common.edit')}><Icon name="edit" size={16} /></button>
                        {user?.role === 'owner' && (s.active === false
                          ? <button onClick={() => restore(s)} className="h-9 w-9 grid place-items-center rounded-lg text-sand-500 hover:bg-petrol-50 hover:text-petrol-700" aria-label={t('app.services.restore')} title={t('app.services.restore')}><Icon name="cycle" size={16} /></button>
                          : <button onClick={() => remove(s)} className="h-9 w-9 grid place-items-center rounded-lg text-sand-500 hover:bg-danger-50 hover:text-danger-600" aria-label={t('app.services.remove')}><Icon name="trash" size={16} /></button>)}
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        )}
      <ServiceModal svc={editing} onClose={() => setEditing(null)} onSaved={(s, isNew) => {
        invalidateRef('services');
        setData((d) => ({ ...d, items: isNew ? [...(d?.items || []), s] : d.items.map((x) => (x.id === s.id ? { ...x, ...s } : x)) }));
        setEditing(null); toast.success(t('common.saved'));
      }} />
    </div>
  );
}

const catLabel = (t, c) => { const k = `app.services.cat_${c}`; const v = t(k); return v !== k ? v : c; };

function ServiceModal({ svc, onClose, onSaved }) {
  const { t } = useI18n();
  const toast = useToast();
  const [f, setF] = useState({});
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState({});
  useEffect(() => { if (svc) { setF({ name: svc.name || '', name_ar: svc.name_ar || '', category: svc.category || 'cleaning', price: svc.price ?? '', duration_min: svc.duration_min ?? 60, taxable: svc.taxable !== false }); setErr({}); } }, [svc]);
  if (!svc) return null;
  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));
  const submit = async () => {
    const e = {};
    if (!f.name.trim() && !f.name_ar.trim()) e.name_ar = t('app.form.required');
    if (f.price === '' || Number(f.price) < 0) e.price = t('app.form.required');
    setErr(e); if (Object.keys(e).length) return;
    setSaving(true);
    const body = { name: f.name.trim() || f.name_ar.trim(), name_ar: f.name_ar.trim() || undefined, category: f.category, price: Number(f.price), duration_min: Number(f.duration_min) || 60, taxable: f.taxable };
    try { const r = svc.id ? await api.patch(`/services/${svc.id}`, body) : await api.post('/services', body); onSaved(r, !svc.id); }
    catch (er) { toast.error(er); } finally { setSaving(false); }
  };
  return (
    <Modal open={!!svc} onClose={onClose} title={svc.id ? t('app.services.edit') : t('app.services.new')}
      footer={<><Button variant="secondary" onClick={onClose}>{t('common.cancel')}</Button><Button onClick={submit} loading={saving}>{t('common.save')}</Button></>}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label={t('app.services.nameAr')} value={f.name_ar} onChange={(e) => set('name_ar', e.target.value)} error={err.name_ar} dir="rtl" placeholder="غسيل مكيف سبليت" />
        <Input label={t('app.services.nameEn')} value={f.name} onChange={(e) => set('name', e.target.value)} dir="ltr" placeholder="Split AC cleaning" />
        <Select label={t('app.services.category')} value={f.category} onChange={(e) => set('category', e.target.value)} options={SVC_CATS.map((c) => ({ value: c, label: catLabel(t, c) }))} />
        <Input type="number" min="0" label={t('app.services.priceExVat')} value={f.price} onChange={(e) => set('price', e.target.value)} error={err.price} dir="ltr"
          hint={f.price !== '' ? <span>{t('app.services.inclVat')} <Money value={f.taxable ? Number(f.price) * 1.15 : Number(f.price)} /></span> : undefined} />
        <Select label={t('app.services.duration')} value={String(f.duration_min)} onChange={(e) => set('duration_min', e.target.value)}
          options={[15, 30, 45, 60, 90, 120, 180, 240].map((m) => ({ value: String(m), label: t('app.services.minutes', { n: m }) }))} />
        <label className="flex items-center gap-2 self-end h-10 text-base">
          <input type="checkbox" checked={!!f.taxable} onChange={(e) => set('taxable', e.target.checked)} className="h-4 w-4 accent-petrol-600" />{t('app.services.taxable')}
        </label>
      </div>
    </Modal>
  );
}
