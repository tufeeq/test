// Plan cards with monthly/yearly toggle (B5). Used on the landing page and /pricing.
// Yearly = 10 × monthly (2 months free). Trial is Pro-level for 14 days; checkout itself happens in-app (B2).
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cx } from '../../lib/cx.js';
import { useM, fill } from './useMarketing.js';
import { IconCheck } from './icons.jsx';

export const PLANS = [
  { id: 'starter', price: 149, techs: 3 },
  { id: 'pro', price: 449, techs: 10, popular: true },
  { id: 'business', price: 999, techs: 25, extra: true },
];
const fmt = (n) => new Intl.NumberFormat('en-US').format(n);

export function BillingToggle({ yearly, onChange }) {
  const m = useM();
  const opt = (val, label) => (
    <button type="button" role="radio" aria-checked={yearly === val} onClick={() => onChange(val)}
      className={cx('h-9 px-4 rounded-lg text-sm font-medium transition-colors',
        yearly === val ? 'bg-petrol-600 text-white' : 'text-petrol-700 hover:bg-petrol-50')}>
      {label}
    </button>
  );
  return (
    <div className="inline-flex items-center gap-3 flex-wrap justify-center">
      <div role="radiogroup" className="inline-flex p-1 rounded-xl bg-white border border-sand-200">
        {opt(false, m.pricing.monthly)}
        {opt(true, m.pricing.yearly)}
      </div>
      <span className={cx('text-sm font-medium px-2.5 py-1 rounded-full transition-colors', yearly ? 'bg-success-50 text-success-600' : 'bg-sand-100 text-sand-600')}>
        {m.pricing.yearlySave}
      </span>
    </div>
  );
}

export default function PricingPlans({ initialYearly = false }) {
  const m = useM();
  const [yearly, setYearly] = useState(initialYearly);
  return (
    <div>
      <div className="flex justify-center mb-8"><BillingToggle yearly={yearly} onChange={setYearly} /></div>
      <div className="grid gap-5 lg:grid-cols-3 items-stretch">
        {PLANS.map((p) => {
          const copy = m.pricing.plans[p.id];
          const amount = yearly ? p.price * 10 : p.price;
          return (
            <article key={p.id}
              className={cx('relative rounded-2xl p-6 flex flex-col',
                p.popular ? 'bg-petrol-700 text-sand-50 ring-2 ring-petrol-700 lg:-my-3 lg:py-9' : 'bg-white border border-sand-200 shadow-card')}>
              {p.popular && (
                <span className="absolute -top-3 start-6 rounded-full bg-saffron-400 text-petrol-900 text-xs font-semibold px-3 py-1">{m.pricing.popular}</span>
              )}
              <h3 className="text-xl font-bold">{copy.name}</h3>
              <p className={cx('mt-1 text-sm', p.popular ? 'text-petrol-100' : 'text-sand-600')}>{copy.for}</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-bold tabular-nums ltr-nums">{fmt(amount)}</span>
                <span className={cx('text-sm', p.popular ? 'text-petrol-100' : 'text-sand-600')}>
                  {m.pricing.currency} / {yearly ? m.pricing.perYear : m.pricing.perMonth}
                </span>
              </div>
              <p className={cx('mt-1 text-sm h-5', p.popular ? 'text-petrol-200' : 'text-sand-500')}>
                {yearly ? fill(m.pricing.equiv, { amount: fmt(Math.round((p.price * 10) / 12)) }) : ''}
              </p>
              <p className={cx('mt-4 text-sm font-semibold', p.popular ? 'text-sand-50' : 'text-petrol-700')}>
                {p.techs === 25 ? m.pricing.techs25 : fill(m.pricing.techs, { n: p.techs })}
                {p.extra && <span className={cx('block font-normal', p.popular ? 'text-petrol-100' : 'text-sand-600')}>{m.pricing.extra}</span>}
              </p>
              <ul className="mt-5 space-y-2.5 text-sm flex-1">
                {copy.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <IconCheck size={18} className={cx('shrink-0', p.popular ? 'text-saffron-300' : 'text-success-500')} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to={`/signup?plan=${p.id}${yearly ? '&billing=yearly' : ''}`}
                className={cx('mt-7 h-12 rounded-xl grid place-items-center text-lg font-semibold transition-colors focus-visible:outline-none focus-visible:shadow-ring',
                  p.popular ? 'bg-saffron-400 text-petrol-900 hover:bg-saffron-300' : 'bg-white text-petrol-700 border border-sand-200 hover:border-petrol-300 hover:bg-petrol-50')}>
                {m.pricing.cta}
              </Link>
            </article>
          );
        })}
      </div>
      <p className="mt-6 text-center text-sm text-sand-600">{m.pricing.vat}</p>
    </div>
  );
}
