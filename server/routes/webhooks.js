// /api/webhooks — OWNER: B2. Moyasar callbacks + local payment simulation. See docs/API.md § 11.
//   POST /api/webhooks/moyasar            Moyasar event (payment_paid | payment_failed | …), secret_token verified
//   GET  /api/webhooks/moyasar/sim/:ref   simulated hosted payment page (only when MOYASAR_SECRET_KEY is absent)
//   POST /api/webhooks/moyasar/sim/:ref   form submit: action=pay|cancel
// Each request is scoped by the payment link's company_id (never by request input).
import { Router } from 'express';
import { one } from '../lib/db.js';
import { ah, unauthorized, notFound } from '../lib/errors.js';
import { verifyWebhook, isConfigured, fetchPayment, safeEqual } from '../lib/moyasar.js';
import { settleLink } from '../lib/payments.js';
import { jobEvent } from '../lib/invoices.js';

const router = Router();

const PAID_EVENTS = new Set(['payment_paid', 'payment_captured']);
const FAILED_EVENTS = new Set(['payment_failed', 'payment_voided', 'payment_expired', 'payment_canceled']);
const SOURCE_METHOD = { mada: 'mada', creditcard: 'online', applepay: 'online', stcpay: 'online', samsungpay: 'online' };

async function afterSettle(result, providerLabel) {
  if (result?.purpose === 'invoice' && result.invoice && !result.already && !result.note && result.status !== 'failed') {
    await jobEvent(result.invoice.job_id, result.link.company_id, `تم دفع الفاتورة رقم ${result.invoice.number} إلكترونياً (${providerLabel})`, null);
  }
}

router.post('/moyasar', ah(async (req, res) => {
  if (!verifyWebhook(req)) throw unauthorized('Invalid webhook token');
  const evt = req.body || {};
  const type = String(evt.type || '');
  let data = evt.data || {};
  if (!PAID_EVENTS.has(type) && !FAILED_EVENTS.has(type)) return res.json({ ok: true, ignored: type || 'unknown' });

  // Defense in depth: re-read the payment from Moyasar when we can (the webhook body is only token-authenticated).
  if (isConfigured() && data.id) {
    try { data = { ...data, ...(await fetchPayment(data.id)) }; } catch (e) { console.warn('[webhook] fetchPayment failed, using event body:', e.message); }
  }
  const ref = data.metadata?.dawra_ref;
  const link = ref
    ? await one('SELECT ref, company_id FROM payment_links WHERE ref = $1', [ref])
    : data.invoice_id
      ? await one(`SELECT ref, company_id FROM payment_links WHERE provider = 'moyasar' AND provider_id = $1`, [String(data.invoice_id)])
      : null;
  if (!link) return res.json({ ok: true, ignored: 'unknown_payment' });

  const paid = PAID_EVENTS.has(type) && (!data.status || ['paid', 'captured'].includes(data.status));
  const result = await settleLink(link.ref, {
    status: paid ? 'paid' : 'failed',
    providerPaymentId: data.id ? String(data.id) : null,
    method: SOURCE_METHOD[data.source?.type] || 'online',
    expectedHalalas: paid && data.amount !== undefined ? Number(data.amount) : null,
  });
  if (!result.ok) {
    console.warn('[webhook] not settled', link.ref, result.reason);
    return res.status(result.reason === 'amount_mismatch' ? 422 : 200).json({ ok: false, reason: result.reason });
  }
  await afterSettle(result, 'Moyasar');
  res.json({ ok: true, purpose: result.purpose, already: Boolean(result.already) });
}));

// ───────────────────────── simulation ─────────────────────────
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const safeRedirect = (u) => (typeof u === 'string' && (/^\/(?!\/)/.test(u) || (process.env.PUBLIC_BASE_URL && u.startsWith(process.env.PUBLIC_BASE_URL))) ? u : null);

function page({ title, body }) {
  return `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">
<title>${esc(title)}</title>
<style>
  :root{--petrol:#0F5C5C;--petrol7:#0B4A4B;--sand:#FBF9F5;--sand2:#EADFCB;--sand6:#7A6849;--ink:#1B2323;--saffron:#F0AC1C;--ok:#2E8B57;--bad:#C2410C}
  *{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:var(--sand);color:var(--ink);
  font-family:"IBM Plex Sans Arabic","Segoe UI",Tahoma,system-ui,sans-serif;padding:16px}
  .card{width:100%;max-width:420px;background:#fff;border:1px solid var(--sand2);border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(11,74,75,.08)}
  .top{background:var(--petrol7);color:#fff;padding:18px 20px}.top small{opacity:.75;display:block;margin-top:4px}
  .banner{background:#FFF6E0;color:#7a5200;font-size:13px;padding:8px 20px;border-bottom:1px solid var(--sand2)}
  .body{padding:20px}.amt{font-size:32px;font-weight:700;direction:ltr;text-align:center;margin:8px 0 4px}
  .desc{color:var(--sand6);text-align:center;font-size:14px;margin-bottom:18px}
  .fake{border:1px dashed var(--sand2);border-radius:10px;padding:12px;font-size:13px;color:var(--sand6);direction:ltr;text-align:left;margin-bottom:18px}
  button{width:100%;border:0;border-radius:10px;padding:13px;font:inherit;font-weight:600;cursor:pointer;margin-top:8px}
  .pay{background:var(--saffron);color:#0B3536}.cancel{background:transparent;color:var(--sand6);border:1px solid var(--sand2)}
  .ok{color:var(--ok)}.bad{color:var(--bad)}.c{text-align:center}a{color:var(--petrol)}
</style></head><body><main class="card">${body}</main></body></html>`;
}

async function loadSimLink(ref) {
  if (isConfigured()) return null; // simulation is only available when Moyasar is not configured
  if (!/^dw_[a-f0-9]{24}$/.test(ref)) return null;
  return one(`SELECT pl.*, co.name AS co_name, co.name_ar AS co_name_ar
                FROM payment_links pl JOIN companies co ON co.id = pl.company_id
               WHERE pl.ref = $1 AND pl.provider = 'simulation'`, [ref]);
}

router.get('/moyasar/sim/:ref', ah(async (req, res) => {
  const link = await loadSimLink(req.params.ref);
  if (!link) throw notFound('Payment not found');
  const amount = (link.amount_halalas / 100).toFixed(2);
  const merchant = link.purpose === 'subscription' ? 'دورة · Dawra' : (link.co_name_ar || link.co_name);
  res.setHeader('Cache-Control', 'no-store');
  if (link.status !== 'initiated') {
    const ok = link.status === 'paid';
    const back = safeRedirect(ok ? link.success_url : link.back_url);
    return res.type('html').send(page({
      title: ok ? 'تم الدفع' : 'لم يكتمل الدفع',
      body: `<div class="top"><b>${esc(merchant)}</b><small>دفع تجريبي · Simulated payment</small></div>
      <div class="body c"><div class="amt ${ok ? 'ok' : 'bad'}">${ok ? '✓' : '✕'} ${amount} SAR</div>
      <p>${ok ? 'تم الدفع بنجاح · Payment successful' : 'تم إلغاء الدفع · Payment cancelled'}</p>
      ${back ? `<p><a href="${esc(back)}">العودة · Continue</a></p>` : ''}</div>`,
    }));
  }
  res.type('html').send(page({
    title: `دفع ${amount} ريال`,
    body: `<div class="top"><b>${esc(merchant)}</b><small>بوابة دفع تجريبية · Simulated checkout</small></div>
    <div class="banner">وضع المحاكاة: لا يتم خصم أي مبلغ. · Simulation mode: no money is charged.</div>
    <div class="body">
      <div class="amt">${amount} SAR</div>
      <div class="desc">${esc(link.description || '')}</div>
      <div class="fake">mada / Visa •••• 4242 &nbsp; 12/30 &nbsp; CVC •••</div>
      <form method="post" action="${esc(req.params.ref)}">
        <button class="pay" name="action" value="pay" type="submit">ادفع ${amount} ريال · Pay</button>
        <button class="cancel" name="action" value="cancel" type="submit">إلغاء · Cancel</button>
      </form>
    </div>`,
  }));
}));

router.post('/moyasar/sim/:ref', ah(async (req, res) => {
  const link = await loadSimLink(req.params.ref);
  if (!link) throw notFound('Payment not found');
  const action = String(req.body?.action || '');
  if (!safeEqual(action, 'pay') && !safeEqual(action, 'cancel')) return res.redirect(303, req.params.ref);
  const result = await settleLink(link.ref, { status: action === 'pay' ? 'paid' : 'cancelled', providerPaymentId: `sim_pay_${link.ref.slice(3, 15)}`, method: 'online' });
  await afterSettle(result, 'simulation');
  const wantsJson = (req.get('accept') || '').includes('application/json');
  if (wantsJson) return res.json({ ok: result.ok, status: action === 'pay' ? 'paid' : 'cancelled', purpose: result.purpose });
  const target = safeRedirect(action === 'pay' ? link.success_url : link.back_url);
  res.redirect(303, target || req.params.ref);
}));

export default router;
