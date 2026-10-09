// Line items editor with price-list picker and VAT totals. Used by job form, job detail and manual invoices.
// items: [{ service_id?, description, qty, unit_price }]
import { useMemo, useState } from 'react';
import { useI18n } from '../../i18n/index.jsx';
import { Button } from '../ui/index.js';
import { cx } from '../../lib/cx.js';
import Icon from './icons.jsx';
import { Money, totals, svcName, useServices } from './kit.jsx';

export default function ItemsEditor({ items, onChange, readOnly, compact }) {
  const { t, locale } = useI18n();
  const [services] = useServices();
  const [pick, setPick] = useState('');
  const [filter, setFilter] = useState('');
  const sum = totals(items);

  const grouped = useMemo(() => {
    const f = filter.trim().toLowerCase();
    const list = services.filter((s) => !f || (s.name || '').toLowerCase().includes(f) || (s.name_ar || '').includes(filter.trim()));
    const g = {};
    for (const s of list) (g[s.category || 'other'] ||= []).push(s);
    return g;
  }, [services, filter]);

  const add = (svc) => {
    if (svc) {
      const existing = items.findIndex((i) => i.service_id === svc.id);
      if (existing >= 0) return onChange(items.map((it, i) => (i === existing ? { ...it, qty: Number(it.qty || 0) + 1 } : it)));
      onChange([...items, { service_id: svc.id, description: svcName(svc, 'ar') || svc.name, qty: 1, unit_price: Number(svc.price) }]);
    } else {
      onChange([...items, { service_id: null, description: '', qty: 1, unit_price: 0 }]);
    }
    setPick(''); setFilter('');
  };
  const upd = (i, k, v) => onChange(items.map((it, idx) => (idx === i ? { ...it, [k]: v } : it)));
  const del = (i) => onChange(items.filter((_, idx) => idx !== i));

  return (
    <div className="flex flex-col gap-3">
      {items.length > 0 && (
        <div className="rounded-xl border border-sand-200 overflow-hidden">
          <div className="hidden sm:grid grid-cols-[1fr_5rem_7rem_7rem_2.5rem] gap-2 px-3 py-2 bg-sand-50 text-sm text-sand-600">
            <span>{t('app.items.description')}</span><span className="text-center">{t('app.items.qty')}</span>
            <span className="text-end">{t('app.items.unitPrice')}</span><span className="text-end">{t('app.items.lineTotal')}</span><span />
          </div>
          <ul className="divide-y divide-sand-100">
            {items.map((it, i) => (
              <li key={i} className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_5rem_7rem_7rem_2.5rem] gap-2 px-3 py-2 items-center">
                {readOnly ? <span className="min-w-0 truncate col-span-2 sm:col-span-1">{it.description}</span> : (
                  <input value={it.description} onChange={(e) => upd(i, 'description', e.target.value)} placeholder={t('app.items.descPh')} aria-label={t('app.items.description')}
                    className="col-span-2 sm:col-span-1 h-9 rounded-lg border border-sand-200 px-2.5 text-base focus:outline-none focus:border-petrol-500" />
                )}
                <div className="flex items-center gap-2 sm:contents col-span-2">
                  {readOnly ? <span className="tabular-nums sm:text-center text-sm sm:text-base">× {Number(it.qty)}</span> : (
                    <input type="number" min="0" step="0.5" value={it.qty} onChange={(e) => upd(i, 'qty', e.target.value)} aria-label={t('app.items.qty')} dir="ltr"
                      className="w-20 sm:w-full h-9 rounded-lg border border-sand-200 px-2 text-center tabular-nums focus:outline-none focus:border-petrol-500" />
                  )}
                  {readOnly ? <span className="text-end tabular-nums text-sm sm:text-base text-sand-600"><Money value={it.unit_price} /></span> : (
                    <input type="number" min="0" step="1" value={it.unit_price} onChange={(e) => upd(i, 'unit_price', e.target.value)} aria-label={t('app.items.unitPrice')} dir="ltr"
                      className="w-28 sm:w-full h-9 rounded-lg border border-sand-200 px-2 text-end tabular-nums focus:outline-none focus:border-petrol-500" />
                  )}
                  <span className="ms-auto sm:ms-0 text-end font-medium"><Money value={(Number(it.qty) || 0) * (Number(it.unit_price) || 0)} /></span>
                  {readOnly ? <span className="hidden sm:block" /> : (
                    <button type="button" onClick={() => del(i)} aria-label={t('common.delete')} className="h-8 w-8 grid place-items-center rounded-lg text-sand-500 hover:bg-danger-50 hover:text-danger-600">
                      <Icon name="trash" size={16} />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!readOnly && (
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <select value={pick} onChange={(e) => { const s = services.find((x) => x.id === e.target.value); if (s) add(s); }}
              aria-label={t('app.items.fromPriceList')}
              className="w-full h-10 rounded-xl border border-sand-200 bg-white px-3 pe-8 text-base hover:border-sand-300 focus:outline-none focus:border-petrol-500 focus:ring-2 focus:ring-petrol-100">
              <option value="">{t('app.items.fromPriceList')}</option>
              {Object.entries(grouped).map(([cat, list]) => (
                <optgroup key={cat} label={t(`app.services.cat_${cat}`) !== `app.services.cat_${cat}` ? t(`app.services.cat_${cat}`) : cat}>
                  {list.map((s) => <option key={s.id} value={s.id}>{svcName(s, locale)} — {Number(s.price).toFixed(2)}</option>)}
                </optgroup>
              ))}
            </select>
          </div>
          <Button type="button" variant="secondary" onClick={() => add(null)} icon={<Icon name="plus" size={16} />}>{t('app.items.custom')}</Button>
        </div>
      )}

      {(items.length > 0 || readOnly) && (
        <dl className={cx('ms-auto w-full sm:w-72 text-base', compact && 'sm:w-64')}>
          <div className="flex justify-between py-1"><dt className="text-sand-600">{t('app.items.subtotal')}</dt><dd><Money value={sum.subtotal} /></dd></div>
          <div className="flex justify-between py-1"><dt className="text-sand-600">{t('app.items.vat')}</dt><dd><Money value={sum.vat} /></dd></div>
          <div className="flex justify-between py-2 mt-1 border-t border-sand-200 text-lg"><dt className="font-semibold">{t('app.items.total')}</dt><dd><Money value={sum.total} strong /></dd></div>
        </dl>
      )}
    </div>
  );
}

/** Clean items for the API. */
export const cleanItems = (items) => items
  .filter((i) => String(i.description || '').trim())
  .map((i) => ({ ...(i.service_id ? { service_id: i.service_id } : {}), description: String(i.description).trim(), qty: Number(i.qty) || 0, unit_price: Number(i.unit_price) || 0 }));
