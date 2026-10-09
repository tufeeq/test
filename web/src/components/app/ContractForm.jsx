// Maintenance contract create/edit modal.
import { useEffect, useState } from 'react';
import { api } from '../../lib/api.js';
import { useI18n } from '../../i18n/index.jsx';
import { Button, Input, Modal, Select, Textarea, useToast } from '../ui/index.js';
import { CustomerPicker } from './CustomerForm.jsx';
import { Money } from './kit.jsx';
import { addDays, todayYmd } from './dates.js';

export default function ContractFormModal({ open, onClose, initial, onSaved }) {
  const { t } = useI18n();
  const toast = useToast();
  const editing = !!initial?.id;
  const [customer, setCustomer] = useState(null);
  const [sites, setSites] = useState([]);
  const [f, setF] = useState({});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    const today = todayYmd();
    setCustomer(initial?.customer || null);
    setF({
      title: initial?.title || t('app.contracts.defaultTitle'),
      site_id: initial?.site?.id || '',
      start_date: initial?.start_date?.slice(0, 10) || today,
      end_date: initial?.end_date?.slice(0, 10) || addDays(addDays(today, 365), -1),
      visits_per_year: initial?.visits_per_year || 4,
      price: initial?.price ?? '',
      next_visit_date: initial?.next_visit_date?.slice(0, 10) || '',
      notes: initial?.notes || '',
      status: initial?.status || 'active',
    });
    setErrors({});
  }, [open, initial]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!customer?.id) { setSites([]); return; }
    api.get('/sites', { customer_id: customer.id }).then((r) => setSites(r.items || [])).catch(() => setSites([]));
  }, [customer?.id]);

  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));
  const perVisit = Number(f.price) && Number(f.visits_per_year) ? Number(f.price) / Number(f.visits_per_year) : 0;

  const submit = async (e) => {
    e?.preventDefault();
    const er = {};
    if (!customer) er.customer = t('app.form.required');
    if (!String(f.title || '').trim()) er.title = t('app.form.required');
    if (!f.start_date) er.start_date = t('app.form.required');
    if (!f.end_date) er.end_date = t('app.form.required');
    if (f.start_date && f.end_date && f.end_date <= f.start_date) er.end_date = t('app.contracts.endAfterStart');
    if (!(Number(f.visits_per_year) >= 1)) er.visits_per_year = t('app.form.required');
    setErrors(er);
    if (Object.keys(er).length) return;
    setSaving(true);
    const body = {
      title: f.title.trim(), start_date: f.start_date, end_date: f.end_date,
      visits_per_year: Number(f.visits_per_year), price: Number(f.price) || 0, notes: f.notes || undefined,
      site_id: f.site_id || undefined, next_visit_date: f.next_visit_date || undefined,
    };
    if (editing) { body.status = f.status; body.site_id = f.site_id || null; body.notes = f.notes || null; }
    else body.customer_id = customer.id;
    try {
      const res = editing ? await api.patch(`/contracts/${initial.id}`, body) : await api.post('/contracts', body);
      toast.success(editing ? t('common.saved') : t('app.contracts.created'));
      onSaved?.(res); onClose();
    } catch (err) {
      if (err.details?.length) setErrors(Object.fromEntries(err.details.map((d) => [String(d.path).replace(/^body\./, ''), d.message])));
      toast.error(err);
    } finally { setSaving(false); }
  };

  return (
    <Modal open={open} onClose={onClose} size="lg" title={editing ? t('app.contracts.edit') : t('app.contracts.new')}
      footer={<><Button variant="secondary" onClick={onClose}>{t('common.cancel')}</Button><Button onClick={submit} loading={saving}>{editing ? t('common.save') : t('app.contracts.create')}</Button></>}>
      <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          {editing ? <div><span className="text-sm text-sand-600 block">{t('app.jobs.customer')}</span><span className="font-medium">{customer?.name}</span></div>
            : <CustomerPicker value={customer} onChange={setCustomer} error={errors.customer} />}
        </div>
        <Input className="sm:col-span-2" label={t('app.contracts.titleLabel')} required value={f.title || ''} onChange={(e) => set('title', e.target.value)} error={errors.title} />
        <Select className="sm:col-span-2" label={t('app.jobs.site')} value={f.site_id || ''} onChange={(e) => set('site_id', e.target.value)} placeholder={t('app.contracts.allSites')}
          options={sites.map((s) => ({ value: s.id, label: [s.label, s.district, s.city].filter(Boolean).join(' · ') || t('app.sites.unnamed') }))} />
        <Input type="date" label={t('app.contracts.start')} required value={f.start_date || ''} onChange={(e) => set('start_date', e.target.value)} error={errors.start_date} dir="ltr" />
        <Input type="date" label={t('app.contracts.end')} required value={f.end_date || ''} onChange={(e) => set('end_date', e.target.value)} error={errors.end_date} dir="ltr" />
        <Select label={t('app.contracts.visitsPerYear')} value={String(f.visits_per_year || 4)} onChange={(e) => set('visits_per_year', e.target.value)} error={errors.visits_per_year}
          options={[1, 2, 3, 4, 6, 12].map((n) => ({ value: String(n), label: t('app.contracts.visitsN', { n }) }))} />
        <Input type="number" min="0" label={t('app.contracts.priceLabel')} value={f.price} onChange={(e) => set('price', e.target.value)} dir="ltr"
          hint={perVisit ? <span>{t('app.contracts.perVisit')}: <Money value={perVisit} /></span> : t('app.contracts.priceHint')} />
        <Input type="date" label={t('app.contracts.nextVisit')} value={f.next_visit_date || ''} onChange={(e) => set('next_visit_date', e.target.value)} dir="ltr" hint={t('app.contracts.nextVisitHint')} />
        {editing && (
          <Select label={t('app.jobs.status')} value={f.status} onChange={(e) => set('status', e.target.value)}
            options={['active', 'expired', 'cancelled'].map((s) => ({ value: s, label: t(`contractStatus.${s}`) }))} />
        )}
        <Textarea className="sm:col-span-2" rows={2} label={t('app.customers.notes')} value={f.notes || ''} onChange={(e) => set('notes', e.target.value)} />
        <button type="submit" className="hidden" />
      </form>
    </Modal>
  );
}
