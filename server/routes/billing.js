// /api/billing — OWNER: B2. Dawra's own SaaS subscription. See docs/API.md § 11.
// Also exports checkSubscription (middleware, NOT mounted globally — architect decides).
import { Router } from 'express';
import { requireRole, PLAN_LIMITS } from '../lib/auth.js';
import { one, many, audit } from '../lib/db.js';
import { ah, HttpError } from '../lib/errors.js';
import { validate, z } from '../lib/validate.js';
import { PLANS, planPrice, startSubscriptionPayment } from '../lib/payments.js';
import { isConfigured } from '../lib/moyasar.js';

const router = Router();
const owner = requireRole('owner');

export const plansList = () => Object.values(PLANS).map((p) => ({
  id: p.id, name: p.name, name_ar: p.name_ar, technicians: p.technicians,
  price: p.monthly, monthly: p.monthly, yearly: planPrice(p.id, 'yearly'), currency: 'SAR', vat_exclusive: true,
}));

/**
 * Subscription state for a company. Lazily flips an elapsed trial to 'expired' and an elapsed paid period to 'past_due'.
 * → { plan, subscription_status, trial_ends_at, trial_days_left, current_period_end, read_only }
 */
export async function subscriptionState(companyId) {
  const co = await one(
    `UPDATE companies SET subscription_status = CASE
         WHEN subscription_status = 'trialing' AND trial_ends_at IS NOT NULL AND trial_ends_at < now() THEN 'expired'
         WHEN subscription_status = 'active' AND current_period_end IS NOT NULL AND current_period_end < now() - interval '3 days' THEN 'past_due'
         ELSE subscription_status END
      WHERE id = $1
      RETURNING plan, subscription_status, trial_ends_at, current_period_end, billing_cycle`, [companyId]);
  if (!co) return null;
  const msLeft = co.trial_ends_at ? new Date(co.trial_ends_at).getTime() - Date.now() : 0;
  return {
    ...co,
    trial_days_left: co.subscription_status === 'trialing' ? Math.max(0, Math.ceil(msLeft / 86400000)) : 0,
    read_only: ['expired', 'cancelled'].includes(co.subscription_status),
  };
}

/**
 * Express middleware: when the company's trial has expired (or subscription cancelled), block writes with
 * 402 `plan_limit` (`subscription_expired` in details). GET/HEAD/OPTIONS, auth and billing routes pass.
 * Usage: router.use(checkSubscription) or api.use(checkSubscription) after loadUser.
 */
export function checkSubscription(req, _res, next) {
  if (!req.user || ['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  const p = req.originalUrl || '';
  if (/^\/api\/(auth|billing|webhooks|public)(\/|$|\?)/.test(p)) return next();
  subscriptionState(req.user.company_id)
    .then((s) => {
      if (s?.read_only) {
        return next(new HttpError(402, 'plan_limit', 'Your subscription has expired — the account is read-only. Choose a plan to continue · انتهت فترة الاشتراك، الحساب للقراءة فقط',
          [{ path: 'subscription', message: 'subscription_expired' }]));
      }
      next();
    })
    .catch(() => next()); // never lock users out on a DB hiccup
}

router.get('/', owner, ah(async (req, res) => {
  const cid = req.user.company_id;
  const s = await subscriptionState(cid);
  const [usage, payments] = await Promise.all([
    one(`SELECT
           (SELECT count(*) FROM users WHERE company_id = $1 AND role = 'technician' AND active) AS technicians,
           (SELECT count(*) FROM invoices WHERE company_id = $1 AND status <> 'draft' AND kind <> 'credit_note'
               AND date_trunc('month', issue_date AT TIME ZONE 'Asia/Riyadh') = date_trunc('month', now() AT TIME ZONE 'Asia/Riyadh')) AS invoices_this_month,
           (SELECT count(*) FROM jobs WHERE company_id = $1
               AND date_trunc('month', created_at AT TIME ZONE 'Asia/Riyadh') = date_trunc('month', now() AT TIME ZONE 'Asia/Riyadh')) AS jobs_this_month`, [cid]),
    many(`SELECT id, plan, cycle, amount, vat_amount, total, provider, status, paid_at, period_end, created_at
            FROM subscriptions_payments WHERE company_id = $1 ORDER BY created_at DESC LIMIT 24`, [cid]),
  ]);
  res.json({
    plan: s.plan,
    subscription_status: s.subscription_status,
    trial_ends_at: s.trial_ends_at,
    trial_days_left: s.trial_days_left,
    current_period_end: s.current_period_end,
    billing_cycle: s.billing_cycle,
    read_only: s.read_only,
    limits: { technicians: PLAN_LIMITS[s.plan]?.technicians ?? 0 },
    usage: { technicians: usage.technicians, invoices_this_month: usage.invoices_this_month, jobs_this_month: usage.jobs_this_month },
    plans: plansList(),
    payments,
    simulated: !isConfigured(),
  });
}));

router.post('/checkout', owner, validate({
  body: z.object({ plan: z.enum(['starter', 'pro', 'business']), cycle: z.enum(['monthly', 'yearly']).default('monthly') }),
}), ah(async (req, res) => {
  const cid = req.user.company_id;
  if (PLANS[req.body.plan].technicians < (await one(`SELECT count(*) AS n FROM users WHERE company_id = $1 AND role = 'technician' AND active`, [cid])).n) {
    throw new HttpError(402, 'plan_limit', `You have more active technicians than the ${PLANS[req.body.plan].name} plan allows; deactivate some first`);
  }
  const link = await startSubscriptionPayment({ companyId: cid, plan: req.body.plan, cycle: req.body.cycle });
  audit(req.user, 'billing.checkout', 'subscriptions_payment', link.payment_id);
  res.status(201).json({
    url: link.url, payment_id: link.payment_id, simulated: link.simulated,
    plan: req.body.plan, cycle: req.body.cycle, amount: link.amount, vat_amount: link.vat_amount, total: link.total, currency: 'SAR',
  });
}));

export default router;
