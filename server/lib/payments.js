// OWNER: B2. Payment links (Moyasar hosted invoices or local simulation) and their settlement.
// Both customer-invoice payments and Dawra SaaS subscription payments flow through `payment_links`.
//   startInvoicePayment({ companyId, invoiceId }) → { id, ref, url, simulated }
//   startSubscriptionPayment({ companyId, plan, cycle }) → { id, ref, url, simulated, payment_id, amount }
//   settleLink(ref, { status: 'paid'|'failed', providerPaymentId?, method? }) → { ok, purpose, already? }
import crypto from 'node:crypto';
import { one, tx } from './db.js';
import { badRequest, conflict, notFound } from './errors.js';
import { isConfigured, createHostedInvoice, toHalalas, baseUrl } from './moyasar.js';
import { VAT_RATE } from './zatca.js';

export const PLANS = {
  starter: { id: 'starter', name: 'Starter', name_ar: 'الأساسية', monthly: 149, technicians: 3 },
  pro: { id: 'pro', name: 'Pro', name_ar: 'الاحترافية', monthly: 449, technicians: 10 },
  business: { id: 'business', name: 'Business', name_ar: 'الأعمال', monthly: 999, technicians: 25 },
};
/** Plan price (VAT-exclusive). Yearly = 10 × monthly (2 months free). */
export const planPrice = (plan, cycle = 'monthly') => PLANS[plan].monthly * (cycle === 'yearly' ? 10 : 1);

const newRef = () => `dw_${crypto.randomBytes(12).toString('hex')}`;
const simUrl = (ref) => `${baseUrl()}/api/webhooks/moyasar/sim/${ref}`;

async function openLink({ companyId, purpose, invoiceId = null, subscriptionPaymentId = null, amountSar, description, successUrl, backUrl, metadata }) {
  const amount_halalas = toHalalas(amountSar);
  if (amount_halalas < 100) throw badRequest('Amount must be at least 1.00 SAR');
  const ref = newRef();
  const simulated = !isConfigured();
  let providerId = null;
  let url = simUrl(ref);
  if (!simulated) {
    const inv = await createHostedInvoice({
      amountHalalas: amount_halalas,
      description,
      callbackUrl: `${baseUrl()}/api/webhooks/moyasar`,
      successUrl,
      backUrl,
      metadata: { ...metadata, dawra_ref: ref, purpose, company_id: companyId },
    });
    providerId = inv.id;
    url = inv.url;
  }
  const row = await one(
    `INSERT INTO payment_links (ref, company_id, purpose, invoice_id, subscription_payment_id, amount_halalas, description,
                                provider, provider_id, url, success_url, back_url)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id`,
    [ref, companyId, purpose, invoiceId, subscriptionPaymentId, amount_halalas, description, simulated ? 'simulation' : 'moyasar',
      providerId, url, successUrl || null, backUrl || null]
  );
  return { id: row.id, ref, url, simulated, provider_id: providerId };
}

export async function startInvoicePayment({ companyId, invoiceId }) {
  const inv = await one(
    `SELECT i.id, i.number, i.status, i.kind, i.total, i.public_token, co.name, co.name_ar
       FROM invoices i JOIN companies co ON co.id = i.company_id WHERE i.company_id = $1 AND i.id = $2`,
    [companyId, invoiceId]
  );
  if (!inv) throw notFound('Invoice not found');
  if (inv.kind === 'credit_note') throw conflict('Credit notes cannot be paid');
  if (inv.status !== 'unpaid') throw conflict(`Invoice is ${inv.status}`);
  const back = `${baseUrl()}/i/${inv.public_token}`;
  const link = await openLink({
    companyId, purpose: 'invoice', invoiceId: inv.id, amountSar: inv.total,
    description: `فاتورة ${inv.number} · Invoice #${inv.number} — ${inv.name_ar || inv.name}`,
    successUrl: `${back}?paid=1`, backUrl: back,
    metadata: { invoice_id: inv.id, invoice_number: String(inv.number) },
  });
  await one('UPDATE invoices SET payment_link_url = $3 WHERE company_id = $1 AND id = $2 RETURNING id', [companyId, inv.id, link.url]);
  return link;
}

export async function startSubscriptionPayment({ companyId, plan, cycle = 'monthly' }) {
  if (!PLANS[plan]) throw badRequest('Unknown plan');
  if (!['monthly', 'yearly'].includes(cycle)) throw badRequest('cycle must be monthly or yearly');
  const amount = planPrice(plan, cycle);
  const vat = Math.round(amount * VAT_RATE * 100) / 100;
  const total = Math.round((amount + vat) * 100) / 100;
  const sp = await one(
    `INSERT INTO subscriptions_payments (company_id, plan, amount, vat_amount, total, cycle, provider, status)
     VALUES ($1,$2,$3,$4,$5,$6,$7,'initiated') RETURNING id`,
    [companyId, plan, amount, vat, total, cycle, isConfigured() ? 'moyasar' : 'simulation']
  );
  const back = `${baseUrl()}/app/settings/billing`;
  const link = await openLink({
    companyId, purpose: 'subscription', subscriptionPaymentId: sp.id, amountSar: total,
    description: `دورة — باقة ${PLANS[plan].name_ar} (${cycle === 'yearly' ? 'سنوي' : 'شهري'}) · Dawra ${PLANS[plan].name} ${cycle}`,
    successUrl: `${back}?paid=1`, backUrl: back,
    metadata: { subscription_payment_id: sp.id, plan, cycle },
  });
  await one('UPDATE subscriptions_payments SET provider_ref = $2 WHERE id = $1 RETURNING id', [sp.id, link.provider_id || link.ref]);
  return { ...link, payment_id: sp.id, amount, vat_amount: vat, total };
}

/**
 * Mark a payment link paid/failed and apply its effect. Idempotent (row lock + status check).
 * `expectedHalalas` (from the webhook) must match when given.
 */
export async function settleLink(ref, { status, providerPaymentId = null, method = 'online', expectedHalalas = null } = {}) {
  return tx(async (client) => {
    const q = (t, p) => client.query(t, p).then((r) => r.rows);
    const [link] = await q('SELECT * FROM payment_links WHERE ref = $1 FOR UPDATE', [ref]);
    if (!link) return { ok: false, reason: 'unknown_ref' };
    if (link.status === 'paid') return { ok: true, already: true, purpose: link.purpose, link };
    if (status !== 'paid') {
      await client.query(`UPDATE payment_links SET status = $2, provider_payment_id = COALESCE($3, provider_payment_id) WHERE id = $1`,
        [link.id, status === 'cancelled' ? 'cancelled' : 'failed', providerPaymentId]);
      if (link.invoice_id) {
        // a dead link must not be re-offered (B4 reuses invoices.payment_link_url)
        await client.query('UPDATE invoices SET payment_link_url = NULL WHERE company_id = $1 AND id = $2 AND payment_link_url = $3', [link.company_id, link.invoice_id, link.url]);
      }
      if (link.subscription_payment_id) {
        await client.query(`UPDATE subscriptions_payments SET status = 'failed' WHERE id = $1 AND status = 'initiated'`, [link.subscription_payment_id]);
      }
      return { ok: true, purpose: link.purpose, status: 'failed', link };
    }
    if (expectedHalalas !== null && Number(expectedHalalas) !== link.amount_halalas) {
      return { ok: false, reason: 'amount_mismatch', link };
    }
    await client.query(`UPDATE payment_links SET status = 'paid', paid_at = now(), provider_payment_id = COALESCE($2, provider_payment_id) WHERE id = $1`,
      [link.id, providerPaymentId]);

    if (link.purpose === 'invoice') {
      const [inv] = await q('SELECT id, status, job_id, number FROM invoices WHERE company_id = $1 AND id = $2 FOR UPDATE', [link.company_id, link.invoice_id]);
      if (inv && inv.status === 'unpaid') {
        await client.query(`UPDATE invoices SET status = 'paid', paid_at = now(), payment_method = $3, payment_ref = $4 WHERE company_id = $1 AND id = $2`,
          [link.company_id, inv.id, method, providerPaymentId || link.ref]);
        return { ok: true, purpose: 'invoice', invoice: inv, link };
      }
      return { ok: true, purpose: 'invoice', invoice: inv, note: `invoice already ${inv?.status}`, link };
    }

    // subscription
    const [sp] = await q('SELECT * FROM subscriptions_payments WHERE id = $1 AND company_id = $2 FOR UPDATE', [link.subscription_payment_id, link.company_id]);
    if (!sp || sp.status === 'paid') return { ok: true, purpose: 'subscription', already: true, link };
    const [co] = await q('SELECT current_period_end FROM companies WHERE id = $1 FOR UPDATE', [link.company_id]);
    const interval = sp.cycle === 'yearly' ? '1 year' : '1 month';
    // Extend from the later of now / current period end (paying early never loses days).
    const [{ period_end }] = await q(`SELECT GREATEST(now(), COALESCE($1::timestamptz, now())) + $2::interval AS period_end`, [co.current_period_end, interval]);
    await client.query(`UPDATE subscriptions_payments SET status = 'paid', paid_at = now(), period_end = $2, provider_ref = COALESCE($3, provider_ref) WHERE id = $1`,
      [sp.id, period_end, providerPaymentId]);
    await client.query(`UPDATE companies SET plan = $2, subscription_status = 'active', current_period_end = $3, billing_cycle = $4 WHERE id = $1`,
      [link.company_id, sp.plan, period_end, sp.cycle]);
    return { ok: true, purpose: 'subscription', plan: sp.plan, period_end, link };
  });
}
