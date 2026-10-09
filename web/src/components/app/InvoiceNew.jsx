// Manual invoice modal: POST /invoices { customer_id, lines, kind?, notes? }.
import { useEffect, useState } from 'react';
import { api } from '../../lib/api.js';
import { useI18n } from '../../i18n/index.jsx';
import { Button, Modal, Select, Textarea, useToast } from '../ui/index.js';
import { CustomerPicker } from './CustomerForm.jsx';
import ItemsEditor, { cleanItems } from './ItemsEditor.jsx';

export default function InvoiceNewModal({ open, onClose, onSaved, initial }) {
  const { t } = useI18n();
  const toast = useToast();
  const [customer, setCustomer] = useState(null);
  const [lines, setLines] = useState([]);
  const [kind, setKind] = useState('');
  const [notes, setNotes] = useState('');
  const [err, setErr] = useState({});
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (!open) return;
    setCustomer(initial?.customer || null);
    setLines((initial?.lines || []).map((l) => ({ description: l.description, qty: l.qty, unit_price: l.unit_price })));
    setKind(initial?.kind || ''); setNotes(initial?.notes || ''); setErr({});
  }, [open, initial]);
  const submit = async () => {
    const e = {};
    if (!customer) e.customer = t('app.form.required');
    const clean = cleanItems(lines).map(({ service_id, ...l }) => l); // eslint-disable-line no-unused-vars
    if (!clean.length) e.lines = t('app.invoices.needLines');
    setErr(e); if (Object.keys(e).length) return;
    setSaving(true);
    try {
      const inv = await api.post('/invoices', { customer_id: customer.id, lines: clean, ...(kind ? { kind } : {}), ...(notes ? { notes } : {}) });
      toast.success(t('app.invoices.issued', { n: inv.number })); onSaved?.(inv); onClose();
    } catch (er) { toast.error(er); } finally { setSaving(false); }
  };
  return (
    <Modal open={open} onClose={onClose} size="xl" title={initial?.title || t('app.invoices.new')}
      footer={<><Button variant="secondary" onClick={onClose}>{t('common.cancel')}</Button><Button onClick={submit} loading={saving}>{t('app.invoices.issue')}</Button></>}>
      <div className="flex flex-col gap-5">
        <div className="grid sm:grid-cols-[1fr_14rem] gap-4">
          <CustomerPicker value={customer} onChange={setCustomer} error={err.customer} />
          <Select label={t('app.invoices.kind')} value={kind} onChange={(e) => setKind(e.target.value)}
            options={[{ value: '', label: t('app.invoices.kindAuto') }, { value: 'simplified', label: t('app.invoices.kind_simplified') }, { value: 'standard', label: t('app.invoices.kind_standard') }]} />
        </div>
        <div>
          <div className="text-sm font-medium text-sand-800 mb-2">{t('app.invoices.lines')}</div>
          <ItemsEditor items={lines} onChange={setLines} />
          {err.lines && <p className="text-sm text-danger-600 mt-2">{err.lines}</p>}
        </div>
        <Textarea rows={2} label={t('app.customers.notes')} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>
    </Modal>
  );
}
