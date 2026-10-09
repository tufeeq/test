// OWNER: B3. SaaS billing: current plan, trial days, usage vs limits, plan cards (monthly/yearly), checkout.
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../../lib/api.js';
import { useAsync } from '../../../lib/useAsync.js';
import { useAuth } from '../../../lib/auth.jsx';
import { useI18n } from '../../../i18n/index.jsx';
import { Badge, Button, Card, PageHeader, useToast } from '../../../components/ui/index.js';
import Icon from '../../../components/app/icons.jsx';
import { DualDate, ErrorState, Money, PageSkeleton, Segmented } from '../../../components/app/kit.jsx';
import { diffDays, todayYmd, ymd, greg } from '../../../components/app/dates.js';
import { cx } from '../../../lib/cx.js';

// Fallback if /billing doesn't return plans (prices per SPEC.md).
const DEFAULT_PLANS = [
  { id: 'starter', price: 149, technicians: 3 },
  { id: 'pro', price: 449, technicians: 10 },
  { id: 'business', price: 999, technicians: 25 },
];
const FEATURES = {
  starter: ['f_jobs', 'f_schedule', 'f_techapp', 'f_invoices', 'f_booking'],
  pro: ['f_starter', 'f_contracts', 'f_whatsapp', 'f_ai', 'f_payments'],
  business: ['f_pro', 'f_support', 'f_checklists', 'f_export'],
};

/** Server builds links from PUBLIC_BASE_URL; in local dev that host can differ from the one in the browser. */
function sameOriginIfLocal(url) {
  try {
    const u = new URL(url, window.location.origin);
    if (/^(localhost|127\.0\.0\.1)$/.test(u.hostname) && u.origin !== window.location.origin) return `${window.location.origin}${u.pathname}${u.search}`;
    return u.href;
  } catch { return url; }
}

export default function Billing() {
  const { t, locale } = useI18n();
  const toast = useToast();
  const { refresh } = useAuth();
  const billing = useAsync(() => api.get('/billing'), []);
  const company = useAsync(() => api.get('/companies/me'), []);
  const [period, setPeriod] = useState('monthly');
  const [busy, setBusy] = useState(null);
  const [sp, setSp] = useSearchParams();
  // Returning from the (real or simulated) hosted payment page
  useEffect(() => {
    if (sp.get('paid') === '1') { toast.success(t('app.billing.paymentDone')); refresh(); setSp({}, { replace: true }); }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (billing.error && company.error) return <div><PageHeader title={t('app.billing.title')} /><ErrorState error={billing.error} onRetry={billing.reload} /></div>;
  if ((billing.loading && !billing.data) && (company.loading && !company.data)) return <PageSkeleton />;

  const b = billing.data || {};
  const c = company.data || {};
  const plan = b.plan || c.plan;
  const status = b.subscription_status || c.subscription_status;
  const trialEnds = b.trial_ends_at || c.trial_ends_at;
  const trialing = status === 'trialing' || plan === 'trial';
  const daysLeft = trialEnds ? Math.max(0, diffDays(todayYmd(), ymd(trialEnds))) : null;
  const plans = (b.plans?.length ? b.plans : DEFAULT_PLANS).map((p) => ({ ...p, price: Number(p.price) }));
  const usage = b.usage?.technicians ?? c.usage?.technicians;
  const limit = b.limits?.technicians ?? c.limits?.technicians;
  const readOnly = b.read_only || status === 'expired';

  const checkout = async (id) => {
    setBusy(id);
    try {
      const r = await api.post('/billing/checkout', { plan: id, cycle: period });
      // Real Moyasar page, or B2's simulated hosted page (/api/webhooks/moyasar/sim/:ref) — both return to ?paid=1.
      if (r?.url) { window.location.assign(sameOriginIfLocal(r.url)); return; }
      toast.success(t('app.billing.activated', { plan: t(`app.plan.${id}`) }));
      await refresh(); billing.reload(); company.reload();
    } catch (e) { toast.error(e); } finally { setBusy(null); }
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title={t('app.billing.title')} subtitle={t('app.billing.subtitle')} back="/app/settings" />

      <div className="grid md:grid-cols-[1fr_1fr] lg:grid-cols-[1.3fr_1fr] gap-4">
        <div className="rounded-2xl bg-petrol-700 text-sand-50 p-5 sm:p-6 flex flex-col gap-3 relative overflow-hidden">
          <svg className="absolute -end-10 -bottom-10 opacity-10" width="200" height="200" viewBox="0 0 48 48" aria-hidden="true"><path d="M38.2 15.5 A17 17 0 1 0 41 26" fill="none" stroke="#F0AC1C" strokeWidth="4" strokeLinecap="round" /></svg>
          <div className="text-petrol-100 text-sm">{t('app.billing.current')}</div>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">{trialing ? t('app.plan.trial') : t(`app.plan.${plan}`)}</span>
            {!trialing && <Badge tone={status === 'active' ? 'success' : 'danger'}>{t(`app.plan.status_${status}`)}</Badge>}
          </div>
          {!trialing && b.current_period_end && <p className="text-sm text-petrol-100">{t('app.billing.renewsOn', { d: greg(b.current_period_end, locale), c: t(`app.billing.${b.billing_cycle === 'yearly' ? 'yearly' : 'monthly'}`) })}</p>}
          {readOnly && <p className="text-sm rounded-xl bg-danger-600 text-white px-3 py-2">{t('app.plan.expiredBanner')}</p>}
          {b.simulated && <p className="text-xs text-petrol-200">{t('app.billing.simMode')}</p>}
          {trialing && daysLeft != null && (
            <div>
              <div className="flex justify-between text-sm mb-1.5"><span>{t('app.plan.daysLeft', { n: daysLeft })}</span><span className="text-petrol-100 tabular-nums">{greg(trialEnds, locale)}</span></div>
              <div className="h-2 rounded-full bg-petrol-800 overflow-hidden"><div className={cx('h-full rounded-full', daysLeft <= 3 ? 'bg-saffron-400' : 'bg-petrol-300')} style={{ width: `${Math.min(100, ((14 - daysLeft) / 14) * 100)}%` }} /></div>
              <p className="text-sm text-petrol-100 mt-2">{t('app.billing.trialNote')}</p>
            </div>
          )}
        </div>
        <Card title={t('app.billing.usage')}>
          {limit != null ? (
            <div>
              <div className="flex justify-between text-sm mb-1.5"><span className="text-sand-700">{t('app.team.techSeats')}</span><span className="tabular-nums font-semibold">{usage ?? '—'} / {limit}</span></div>
              <div className="h-2 rounded-full bg-sand-100 overflow-hidden"><div className={cx('h-full rounded-full', usage >= limit ? 'bg-saffron-500' : 'bg-petrol-600')} style={{ width: `${Math.min(100, ((usage || 0) / limit) * 100)}%` }} /></div>
              {usage >= limit && <p className="text-sm text-saffron-700 mt-2">{t('app.billing.atLimit')}</p>}
            </div>
          ) : <p className="text-sand-500 text-sm">—</p>}
          {b.usage && (
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-sand-100 px-3 py-2"><dt className="text-sand-600">{t('app.billing.jobsMonth')}</dt><dd className="text-lg font-semibold tabular-nums">{b.usage.jobs_this_month ?? '—'}</dd></div>
              <div className="rounded-xl bg-sand-100 px-3 py-2"><dt className="text-sand-600">{t('app.billing.invoicesMonth')}</dt><dd className="text-lg font-semibold tabular-nums">{b.usage.invoices_this_month ?? '—'}</dd></div>
            </dl>
          )}
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">{t('app.billing.choose')}</h2>
        <div className="flex items-center gap-3">
          <Segmented value={period} onChange={setPeriod} items={[{ value: 'monthly', label: t('app.billing.monthly') }, { value: 'yearly', label: t('app.billing.yearly') }]} />
          <Badge tone="success">{t('app.billing.twoFree')}</Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {plans.map((p) => {
          const current = !trialing && plan === p.id && status === 'active';
          const featured = p.id === 'pro';
          const monthly = Number(p.monthly ?? p.price);
          const price = period === 'yearly' ? Number(p.yearly ?? monthly * 10) : monthly;
          return (
            <section key={p.id} className={cx('rounded-2xl p-5 sm:p-6 flex flex-col gap-4 border', featured ? 'bg-white border-petrol-600 ring-1 ring-petrol-600 shadow-lift' : 'bg-white border-sand-200/70 shadow-card')}>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold">{t(`app.plan.${p.id}`)}</h3>
                {featured && <Badge tone="petrol">{t('app.billing.popular')}</Badge>}
                {current && <Badge tone="success">{t('app.billing.yourPlan')}</Badge>}
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-bold tabular-nums text-petrol-800">{price.toLocaleString('en')}</span>
                  <span className="text-sand-600">{t('common.sar')} / {period === 'yearly' ? t('app.billing.perYear') : t('app.billing.perMonth')}</span>
                </div>
                <div className="text-sm text-sand-500 mt-0.5 min-h-[1.3rem]">
                  {period === 'yearly' ? t('app.billing.yearlySave', { amount: (monthly * 12 - price).toLocaleString('en') }) : t('app.billing.exVat')}
                </div>
              </div>
              <div className="rounded-xl bg-sand-100 px-3 py-2 text-sm font-medium flex items-center gap-2"><Icon name="team" size={16} className="text-petrol-600" />{t('app.billing.upToTechs', { n: p.technicians })}</div>
              <ul className="flex flex-col gap-2 text-base flex-1">
                {FEATURES[p.id]?.map((f) => <li key={f} className="flex items-start gap-2"><Icon name="check" size={17} className="text-success-600 mt-0.5" />{t(`app.billing.${f}`)}</li>)}
              </ul>
              <Button variant={featured ? 'cta' : 'primary'} block size="lg" disabled={current} loading={busy === p.id} onClick={() => checkout(p.id)}>
                {current ? t('app.billing.yourPlan') : trialing ? t('app.billing.subscribe') : t('app.billing.switch')}
              </Button>
            </section>
          );
        })}
      </div>
      <p className="text-sm text-sand-500">{t('app.billing.footnote')}</p>

      {(b.payments || []).length > 0 && (
        <Card padded={false} title={t('app.billing.history')}>
          <ul className="divide-y divide-sand-100">
            {b.payments.map((p) => (
              <li key={p.id} className="flex items-center gap-3 px-5 py-3">
                <DualDate value={p.created_at} className="text-sm" />
                <span className="flex-1">{t(`app.plan.${p.plan}`)}{p.cycle && <span className="text-sand-500"> · {t(`app.billing.${p.cycle === 'yearly' ? 'yearly' : 'monthly'}`)}</span>}</span>
                <Badge tone={p.status === 'paid' ? 'success' : p.status === 'failed' ? 'danger' : 'sand'}>{t(`app.billing.pay_${p.status}`) !== `app.billing.pay_${p.status}` ? t(`app.billing.pay_${p.status}`) : p.status}</Badge>
                <Money value={p.total ?? p.amount} strong />
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
