// OWNER: B4. Services & parts used on the job: pick from the price list (bottom sheet), qty steppers, totals incl. 15% VAT.
import { useMemo, useState } from 'react';
import { Modal, Button } from '../../components/ui/index.js';
import { cx } from '../../lib/cx.js';
import { useTechI18n } from './techI18n.jsx';
import { IconMinus, IconPlus, IconTrash } from './icons.jsx';

const r2 = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;
export const VAT_RATE = 0.15;
export function totals(items) {
  const subtotal = r2((items || []).reduce((s, i) => s + Number(i.qty || 0) * Number(i.unit_price || 0), 0));
  const vat = r2(subtotal * VAT_RATE);
  return { subtotal, vat, total: r2(subtotal + vat) };
}

export function TotalsBlock({ items, className }) {
  const { t, fmtMoney } = useTechI18n();
  const x = totals(items);
  return (
    <dl className={cx('text-base', className)}>
      <div className="flex justify-between py-1"><dt className="text-sand-700">{t('tech.items.subtotal')}</dt><dd className="tabular-nums">{fmtMoney(x.subtotal)}</dd></div>
      <div className="flex justify-between py-1"><dt className="text-sand-700">{t('tech.items.vat')}</dt><dd className="tabular-nums">{fmtMoney(x.vat)}</dd></div>
      <div className="flex justify-between pt-2 mt-1 border-t border-sand-200 text-lg font-bold"><dt>{t('tech.items.total')}</dt><dd className="tabular-nums text-petrol-800">{fmtMoney(x.total)}</dd></div>
    </dl>
  );
}

export default function JobItems({ items, services, editable, onChange }) {
  const { t, fmtMoney, lang } = useTechI18n();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [custom, setCustom] = useState({ description: '', unit_price: '' });

  const svcName = (s) => (lang === 'ar' || lang === 'ur' ? s.name_ar || s.name : s.name || s.name_ar);
  const filtered = useMemo(() => {
    const k = q.trim().toLowerCase();
    return (services || []).filter((s) => !k || `${s.name} ${s.name_ar}`.toLowerCase().includes(k));
  }, [services, q]);

  const setQty = (i, qty) => onChange(qty <= 0 ? items.filter((_, k) => k !== i) : items.map((it, k) => (k === i ? { ...it, qty } : it)));
  const addService = (s) => {
    const i = items.findIndex((it) => it.service_id && it.service_id === s.id);
    if (i >= 0) setQty(i, Number(items[i].qty) + 1);
    else onChange([...items, { service_id: s.id, description: s.name_ar || s.name, qty: 1, unit_price: Number(s.price) }]);
    setOpen(false);
    setQ('');
  };
  const addCustom = (e) => {
    e.preventDefault();
    const price = Number(String(custom.unit_price).replace(',', '.'));
    if (!custom.description.trim() || !(price >= 0)) return;
    onChange([...items, { service_id: null, description: custom.description.trim(), qty: 1, unit_price: r2(price) }]);
    setCustom({ description: '', unit_price: '' });
    setOpen(false);
  };

  return (
    <section className="rounded-2xl bg-white border border-sand-200">
      <header className="px-4 pt-4 pb-2"><h2 className="text-lg font-bold">{t('tech.items.title')}</h2></header>
      {items.length === 0 ? (
        <p className="px-4 pb-3 text-base text-sand-700">{t('tech.items.empty')}</p>
      ) : (
        <ul className="divide-y divide-sand-100">
          {items.map((it, i) => (
            <li key={`${it.service_id || it.description}-${i}`} className="px-4 py-3 flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-base font-semibold leading-snug">{it.description}</p>
                <p className="text-sm text-sand-700 tabular-nums">{fmtMoney(it.unit_price)} × <span dir="ltr">{Number(it.qty)}</span></p>
              </div>
              {editable ? (
                <div className="shrink-0 flex items-center rounded-xl border border-sand-300 overflow-hidden">
                  <button type="button" onClick={() => setQty(i, Number(it.qty) - 1)} aria-label={Number(it.qty) <= 1 ? t('tech.items.remove') : '-1'}
                    className="h-12 w-12 grid place-items-center text-petrol-700 active:bg-petrol-50">
                    {Number(it.qty) <= 1 ? <IconTrash size={18} /> : <IconMinus size={20} />}
                  </button>
                  <span className="w-8 text-center text-lg font-bold tabular-nums" aria-label={t('tech.items.qty')}>{Number(it.qty)}</span>
                  <button type="button" onClick={() => setQty(i, Number(it.qty) + 1)} aria-label="+1"
                    className="h-12 w-12 grid place-items-center text-petrol-700 active:bg-petrol-50"><IconPlus size={20} /></button>
                </div>
              ) : (
                <span className="shrink-0 text-base font-bold tabular-nums">{fmtMoney(Number(it.qty) * Number(it.unit_price))}</span>
              )}
            </li>
          ))}
        </ul>
      )}
      <div className="px-4 pb-4 pt-1">
        {items.length > 0 && <TotalsBlock items={items} className="mb-3 rounded-xl bg-sand-50 px-3 py-2" />}
        {editable ? (
          <Button variant="secondary" size="lg" block icon={<IconPlus size={20} />} onClick={() => setOpen(true)}>{t('tech.items.add')}</Button>
        ) : (
          <p className="text-sm text-sand-700">{t('tech.items.lockedHint')}</p>
        )}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={t('tech.items.add')} size="md">
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('tech.items.search')}
          className="w-full h-12 rounded-xl border border-sand-300 px-3 text-base mb-3 focus:outline-none focus:border-petrol-500 focus:ring-2 focus:ring-petrol-100" />
        {(services || []).length === 0 && <p className="text-sand-700 py-4">{t('tech.items.noServices')}</p>}
        <ul className="flex flex-col gap-2 mb-5">
          {filtered.map((s) => (
            <li key={s.id}>
              <button type="button" onClick={() => addService(s)}
                className="w-full min-h-[56px] flex items-center justify-between gap-3 rounded-xl border border-sand-200 px-3 py-2 text-start active:bg-petrol-50">
                <span className="text-base font-medium">{svcName(s)}</span>
                <span className="shrink-0 text-base font-bold text-petrol-700 tabular-nums">{fmtMoney(s.price)}</span>
              </button>
            </li>
          ))}
        </ul>
        <form onSubmit={addCustom} className="rounded-xl bg-sand-50 p-3 flex flex-col gap-2">
          <p className="text-sm font-semibold text-sand-800">{t('tech.items.custom')}</p>
          <input value={custom.description} onChange={(e) => setCustom((c) => ({ ...c, description: e.target.value }))} maxLength={200}
            placeholder={t('tech.items.customDesc')} className="h-12 rounded-xl border border-sand-300 bg-white px-3 text-base" />
          <div className="flex gap-2">
            <input value={custom.unit_price} onChange={(e) => setCustom((c) => ({ ...c, unit_price: e.target.value.replace(/[^\d.,]/g, '') }))}
              inputMode="decimal" dir="ltr" placeholder={t('tech.items.customPrice')} className="flex-1 min-w-0 h-12 rounded-xl border border-sand-300 bg-white px-3 text-base tabular-nums" />
            <Button type="submit" size="lg" variant="primary" disabled={!custom.description.trim() || custom.unit_price === ''}>{t('tech.items.addCustom')}</Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
