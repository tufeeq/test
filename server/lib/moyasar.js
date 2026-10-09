// OWNER: B2. Moyasar payments (customer invoice payment links + SaaS subscription).
// Env: MOYASAR_SECRET_KEY, MOYASAR_PUBLISHABLE_KEY, MOYASAR_WEBHOOK_SECRET, PUBLIC_BASE_URL.
// When MOYASAR_SECRET_KEY is missing, everything runs in SIMULATION (local /api/webhooks/moyasar/sim/:ref page).
// Frozen contract:
//   isConfigured() → boolean
//   createPaymentLink({ amount, description, callbackUrl, metadata }) → { id, url, simulated: boolean }
//       amount is in SAR (e.g. 172.5). If metadata has { invoice_id, company_id } the link is tracked in
//       payment_links and paying it marks the invoice paid. Never throws: errors → { id:null, url:null, error }.
//   verifyWebhook(req) → boolean   (timing-safe compare of body.secret_token with MOYASAR_WEBHOOK_SECRET)
// Extra exports: API_BASE, toHalalas, baseUrl, createHostedInvoice, fetchPayment, fetchInvoice, safeEqual.
import crypto from 'node:crypto';

export const API_BASE = 'https://api.moyasar.com/v1';
export const isConfigured = () => Boolean(process.env.MOYASAR_SECRET_KEY);

/** SAR → integer halalas (Moyasar minimum is 100 = 1 SAR). */
export const toHalalas = (sar) => Math.round(Math.abs(Number(sar || 0)) * 100 + 1e-7);

/** Absolute base URL for links that leave the app (Moyasar redirects/callbacks). '' → relative links. */
export function baseUrl() {
  return (process.env.PUBLIC_BASE_URL || '').replace(/\/+$/, '');
}

function authHeader() {
  // HTTP Basic: secret key as username, empty password.
  return 'Basic ' + Buffer.from(`${process.env.MOYASAR_SECRET_KEY}:`).toString('base64');
}

async function call(method, path, body) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: { Authorization: authHeader(), 'Content-Type': 'application/json', Accept: 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
      signal: ctrl.signal,
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(`Moyasar ${method} ${path} → ${res.status}: ${json.message || JSON.stringify(json.errors || json)}`);
      err.status = res.status;
      throw err;
    }
    return json;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * POST /v1/invoices — hosted invoice page.
 * { amountHalalas (≥100), description, callbackUrl, successUrl, backUrl, metadata } → { id, url, status }
 */
export async function createHostedInvoice({ amountHalalas, description, callbackUrl, successUrl, backUrl, metadata }) {
  if (!isConfigured()) throw new Error('Moyasar not configured');
  if (!Number.isInteger(amountHalalas) || amountHalalas < 100) throw new Error('Moyasar amount must be ≥ 100 halalas');
  const body = {
    amount: amountHalalas,
    currency: 'SAR',
    description: String(description || 'Dawra payment').slice(0, 255),
    ...(callbackUrl ? { callback_url: callbackUrl } : {}),
    ...(successUrl ? { success_url: successUrl } : {}),
    ...(backUrl ? { back_url: backUrl } : {}),
    ...(metadata ? { metadata } : {}),
  };
  const inv = await call('POST', '/invoices', body);
  return { id: inv.id, url: inv.url, status: inv.status, raw: inv };
}

export const fetchPayment = (id) => call('GET', `/payments/${encodeURIComponent(id)}`);
export const fetchInvoice = (id) => call('GET', `/invoices/${encodeURIComponent(id)}`);

/** Constant-time string comparison (length-safe). */
export function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const ha = crypto.createHash('sha256').update(a).digest();
  const hb = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(ha, hb) && a.length === b.length;
}

/** Moyasar includes the secret_token configured on the webhook in every event body. */
export function verifyWebhook(req) {
  const secret = process.env.MOYASAR_WEBHOOK_SECRET;
  if (!secret) return false; // no secret configured → reject everything (simulation never uses the webhook)
  const token = req?.body?.secret_token;
  return safeEqual(String(token ?? ''), secret);
}

/** Frozen helper. Prefer server/lib/payments.js#startPayment for tracked links. */
export async function createPaymentLink({ amount, description, callbackUrl, metadata } = {}) {
  try {
    if (metadata?.invoice_id && metadata?.company_id) {
      const { startInvoicePayment } = await import('./payments.js');
      const r = await startInvoicePayment({ companyId: metadata.company_id, invoiceId: metadata.invoice_id });
      return { id: r.id, url: r.url, simulated: r.simulated };
    }
    if (!isConfigured()) {
      return { id: `sim_${crypto.randomBytes(6).toString('hex')}`, url: callbackUrl || null, simulated: true };
    }
    const inv = await createHostedInvoice({ amountHalalas: toHalalas(amount), description, callbackUrl: `${baseUrl()}/api/webhooks/moyasar`, successUrl: callbackUrl, backUrl: callbackUrl, metadata });
    return { id: inv.id, url: inv.url, simulated: false };
  } catch (e) {
    console.error('[moyasar] createPaymentLink', e.message);
    return { id: null, url: null, simulated: !isConfigured(), error: e.message };
  }
}
