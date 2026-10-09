// Customer create/edit modal (with optional first site), and a searchable customer picker with inline create.
import { useEffect, useRef, useState } from 'react';
import { api } from '../../lib/api.js';
import { useI18n } from '../../i18n/index.jsx';
import { Button, Input, Modal, Select, Textarea, useToast, Spinner } from '../ui/index.js';
import { cx } from '../../lib/cx.js';
import Icon from './icons.jsx';
import { isValidVat, useDebounced, Ltr } from './kit.jsx';

const EMPTY = { name: '', phone: '', email: '', type: 'individual', vat_number: '', notes: '', site: { label: '', city: 'الرياض', district: '', address: '' } };

/** Normalise a Saudi mobile for display/validation: 05XXXXXXXX → 9665XXXXXXXX (server re-normalises). */
export function normPhone(p) {
  const d = String(p || '').replace(/\D/g, '');
  if (d.startsWith('966')) return d;
  if (d.startsWith('05')) return `966${d.slice(1)}`;
  if (d.startsWith('5') && d.length === 9) return `966${d}`;
  return d;
}

export function CustomerFormModal({ open, onClose, initial, onSaved, withSite = true }) {
  const { t } = useI18n();
  const toast = useToast();
  const editing = !!initial?.id;
  const [f, setF] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  useEffect(() => { if (open) { setF(initial ? { ...EMPTY, ...initial, site: { ...EMPTY.site, ...(initial.site || {}) } } : EMPTY); setErrors({}); } }, [open, initial]);
  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));
  const setSite = (k, v) => setF((x) => ({ ...x, site: { ...x.site, [k]: v } }));

  const submit = async (e) => {
    e?.preventDefault();
    const er = {};
    if (!f.name.trim()) er.name = t('app.form.required');
    if (!f.phone.trim()) er.phone = t('app.form.required');
    else if (normPhone(f.phone).length < 11) er.phone = t('app.customers.phoneInvalid');
    if (f.vat_number && !isValidVat(f.vat_number)) er.vat_number = t('app.settings.vatInvalid');
    setErrors(er);
    if (Object.keys(er).length) return;
    setSaving(true);
    const body = { name: f.name.trim(), phone: f.phone.trim(), email: f.email || undefined, type: f.type, vat_number: f.vat_number || undefined, notes: f.notes || undefined };
    if (editing) { body.email = f.email || null; body.vat_number = f.vat_number || null; body.notes = f.notes || null; }
    if (!editing && withSite && (f.site.city || f.site.district || f.site.address)) body.site = Object.fromEntries(Object.entries(f.site).filter(([, v]) => v));
    try {
      const res = editing ? await api.patch(`/customers/${initial.id}`, body) : await api.post('/customers', body);
      toast.success(editing ? t('common.saved') : t('app.customers.created'));
      onSaved?.(res);
      onClose();
    } catch (err) {
      if (err.details?.length) setErrors(Object.fromEntries(err.details.map((d) => [String(d.path).replace(/^body\./, ''), d.message])));
      toast.error(err);
    } finally { setSaving(false); }
  };

  return (
    <Modal open={open} onClose={onClose} size="lg" title={editing ? t('app.customers.edit') : t('app.customers.new')}
      footer={<><Button variant="secondary" onClick={onClose}>{t('common.cancel')}</Button><Button onClick={submit} loading={saving}>{editing ? t('common.save') : t('app.customers.create')}</Button></>}>
      <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
        <Input label={t('app.customers.name')} required value={f.name} onChange={(e) => set('name', e.target.value)} error={errors.name} autoFocus />
        <Input label={t('app.customers.phone')} required value={f.phone} onChange={(e) => set('phone', e.target.value)} error={errors.phone} dir="ltr" inputMode="tel" placeholder="05XXXXXXXX" />
        <Select label={t('app.customers.type')} value={f.type} onChange={(e) => set('type', e.target.value)}
          options={[{ value: 'individual', label: t('app.customers.type_individual') }, { value: 'business', label: t('app.customers.type_business') }]} />
        <Input label={t('app.customers.email')} value={f.email || ''} onChange={(e) => set('email', e.target.value)} dir="ltr" type="email" />
        {f.type === 'business' && (
          <Input className="sm:col-span-2" label={t('app.customers.vat')} value={f.vat_number || ''} onChange={(e) => set('vat_number', e.target.value.replace(/\D/g, '').slice(0, 15))}
            error={errors.vat_number} hint={t('app.customers.vatHint')} dir="ltr" inputMode="numeric" />
        )}
        {!editing && withSite && <>
          <div className="sm:col-span-2 pt-2 border-t border-sand-100 text-sm font-semibold text-sand-800">{t('app.customers.firstSite')}</div>
          <Input label={t('app.sites.city')} value={f.site.city} onChange={(e) => setSite('city', e.target.value)} />
          <Input label={t('app.sites.district')} value={f.site.district} onChange={(e) => setSite('district', e.target.value)} />
          <Input className="sm:col-span-2" label={t('app.sites.address')} value={f.site.address} onChange={(e) => setSite('address', e.target.value)} />
        </>}
        <Textarea className="sm:col-span-2" rows={2} label={t('app.customers.notes')} value={f.notes || ''} onChange={(e) => set('notes', e.target.value)} />
        <button type="submit" className="hidden" />
      </form>
    </Modal>
  );
}

/** Searchable customer combobox. value = customer object | null. */
export function CustomerPicker({ value, onChange, error, label }) {
  const { t } = useI18n();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const dq = useDebounced(q, 250);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    let alive = true; setLoading(true);
    api.get('/customers', { q: dq || undefined, limit: 8 }).then((r) => alive && setItems(r.items || [])).catch(() => alive && setItems([])).finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [dq, open]);
  useEffect(() => {
    const h = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h);
  }, []);

  const looksLikePhone = /^\+?\d[\d\s]{5,}$/.test(q.trim());

  return (
    <div className="flex flex-col gap-1.5" ref={ref}>
      <span className="text-sm font-medium text-sand-800">{label || t('app.jobs.customer')}<span className="text-danger-500 ms-0.5">*</span></span>
      {value ? (
        <div className="flex items-center gap-3 rounded-xl border border-petrol-200 bg-petrol-50/60 px-3 py-2">
          <span className="h-9 w-9 rounded-full bg-petrol-600 text-white grid place-items-center"><Icon name="user" size={17} /></span>
          <div className="flex-1 min-w-0"><div className="font-medium truncate">{value.name}</div><Ltr className="text-sm text-sand-600">{value.phone}</Ltr></div>
          <Button size="sm" variant="ghost" onClick={() => { onChange(null); setOpen(true); }}>{t('app.common.change')}</Button>
        </div>
      ) : (
        <div className="relative">
          <Icon name="search" size={17} className="absolute start-3 top-1/2 -translate-y-1/2 text-sand-500 pointer-events-none" />
          <input value={q} onChange={(e) => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} placeholder={t('app.jobs.customerSearch')}
            className={cx('w-full h-10 rounded-xl border bg-white ps-9 pe-3 text-base focus:outline-none focus:border-petrol-500 focus:ring-2 focus:ring-petrol-100', error ? 'border-danger-500' : 'border-sand-200')} />
          {open && (
            <div className="absolute inset-x-0 mt-1 rounded-xl bg-white border border-sand-200 shadow-lift z-20 p-1 max-h-72 overflow-y-auto">
              {loading && <div className="py-3 grid place-items-center text-petrol-600"><Spinner size={18} /></div>}
              {!loading && items.map((c) => (
                <button key={c.id} type="button" onClick={() => { onChange(c); setOpen(false); setQ(''); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-petrol-50 text-start">
                  <span className="flex-1 min-w-0 truncate">{c.name}</span><Ltr className="text-sm text-sand-500">{c.phone}</Ltr>
                </button>
              ))}
              {!loading && items.length === 0 && <div className="px-3 py-2 text-sm text-sand-600">{t('app.search.noResults', { q: dq })}</div>}
              <button type="button" onClick={() => { setCreating(true); setOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-petrol-700 font-medium hover:bg-petrol-50 border-t border-sand-100 mt-1">
                <Icon name="plus" size={16} />{q ? t('app.jobs.createCustomerNamed', { q }) : t('app.customers.new')}
              </button>
            </div>
          )}
        </div>
      )}
      {error && <p className="text-sm text-danger-600">{error}</p>}
      <CustomerFormModal open={creating} onClose={() => setCreating(false)}
        initial={q ? (looksLikePhone ? { phone: q.trim() } : { name: q.trim() }) : null}
        onSaved={(c) => { onChange(c); setQ(''); }} />
    </div>
  );
}
