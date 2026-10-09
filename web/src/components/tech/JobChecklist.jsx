// OWNER: B4. Checklist card: big tap rows, numeric readings (psi / A / °C), add custom items. Saves are debounced.
import { useState } from 'react';
import { cx } from '../../lib/cx.js';
import { useTechI18n } from './techI18n.jsx';
import { IconCheck, IconPlus, IconTrash } from './icons.jsx';

export default function JobChecklist({ rows, onChange, disabled }) {
  const { t } = useTechI18n();
  const [adding, setAdding] = useState('');
  const done = rows.filter((r) => r.done).length;
  const label = (r) => (r.key ? t(`tech.checklist.items.${r.key}`) : r.label);

  const update = (i, patch) => onChange(rows.map((r, k) => (k === i ? { ...r, ...patch } : r)));
  const remove = (i) => onChange(rows.filter((_, k) => k !== i));
  const add = (e) => {
    e.preventDefault();
    const v = adding.trim();
    if (!v) return;
    onChange([...rows, { key: null, label: v, base: v, value: '', done: false }]);
    setAdding('');
  };

  return (
    <section className="rounded-2xl bg-white border border-sand-200">
      <header className="flex items-center justify-between px-4 pt-4 pb-2">
        <h2 className="text-lg font-bold">{t('tech.checklist.title')}</h2>
        <span className={cx('text-sm font-bold tabular-nums rounded-full px-2.5 py-0.5', done === rows.length && rows.length ? 'bg-success-50 text-success-600' : 'bg-sand-100 text-sand-800')}>
          {t('tech.checklist.progress', { done, total: rows.length })}
        </span>
      </header>
      <ul className="divide-y divide-sand-100">
        {rows.map((r, i) => (
          <li key={`${r.base}-${i}`} className="px-2">
            <div className="flex items-center gap-2 min-h-[60px]">
              <button type="button" disabled={disabled} onClick={() => update(i, { done: !r.done })} aria-pressed={r.done}
                className="flex-1 flex items-center gap-3 text-start min-h-[56px] px-2 rounded-xl active:bg-petrol-50 disabled:opacity-60">
                <span className={cx('shrink-0 h-8 w-8 rounded-lg border-2 grid place-items-center transition-colors',
                  r.done ? 'bg-success-500 border-success-500 text-white' : 'border-sand-400 bg-white')}>
                  {r.done && <IconCheck size={20} strokeWidth={3} />}
                </span>
                <span className={cx('text-base font-medium', r.done && 'text-sand-700')}>{label(r)}</span>
              </button>
              {r.input && (
                <label className="shrink-0 flex items-center gap-1 rounded-xl border border-sand-300 bg-sand-50 ps-2 pe-2.5 h-12 focus-within:border-petrol-500 focus-within:ring-2 focus-within:ring-petrol-100">
                  <span className="sr-only">{t('tech.checklist.value')}</span>
                  <input type="text" inputMode="decimal" dir="ltr" disabled={disabled} value={r.value}
                    onChange={(e) => update(i, { value: e.target.value.replace(/[^\d.,]/g, '').slice(0, 7), done: r.done || e.target.value.trim() !== '' })}
                    placeholder="—" className="w-16 bg-transparent text-lg font-bold text-end tabular-nums focus:outline-none" />
                  <span className="text-sm font-semibold text-sand-700" dir="ltr">{r.unit}</span>
                </label>
              )}
              {!r.key && !disabled && (
                <button type="button" onClick={() => remove(i)} aria-label={t('tech.checklist.remove')}
                  className="shrink-0 h-12 w-12 grid place-items-center rounded-xl text-sand-600 active:bg-danger-50 active:text-danger-600">
                  <IconTrash size={20} />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      {!disabled && (
        <form onSubmit={add} className="flex gap-2 p-4 pt-2">
          <input value={adding} onChange={(e) => setAdding(e.target.value)} maxLength={120}
            placeholder={t('tech.checklist.addPlaceholder')} aria-label={t('tech.checklist.add')}
            className="flex-1 min-w-0 h-12 rounded-xl border border-sand-300 bg-white px-3 text-base focus:outline-none focus:border-petrol-500 focus:ring-2 focus:ring-petrol-100" />
          <button type="submit" disabled={!adding.trim()}
            className="shrink-0 h-12 px-4 rounded-xl bg-petrol-50 text-petrol-700 font-semibold inline-flex items-center gap-1.5 disabled:opacity-50">
            <IconPlus size={20} />{t('tech.checklist.add')}
          </button>
        </form>
      )}
    </section>
  );
}
