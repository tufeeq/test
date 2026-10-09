// OWNER: B5. Outbound notifications (WhatsApp Cloud API → simulated fallback). Every send is logged to `messages`.
// Env: WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID (both optional; absent → status 'simulated'),
//      WHATSAPP_API_VERSION (default v23.0), WHATSAPP_LANG (default 'ar'), PUBLIC_BASE_URL (for links).
//
// Contract (other builders CALL these; they NEVER throw — failures are logged with messages.status='failed'):
//   notify({ companyId, customerId?, jobId?, channel?='whatsapp', to, body, template?, params?, event? }) → Promise<message row|null>
//     - template = a TEMPLATES key; with WhatsApp configured it is sent as an approved template with `params`
//       (positional {{1}}..{{n}}); without a template the body is sent as a free-form text message
//       (only delivered by Meta inside the 24-hour customer-service window).
//     - channel 'system' = internal alert to the company's own phone (e.g. booking_received); delivered over
//       WhatsApp as a template when configured, otherwise simulated.
//     - channel 'sms' / 'email' have no provider yet → 'simulated'.
//   notifyJobEvent(jobId, event, opts?) → Promise<message row|null>
//     event ∈ 'job_scheduled' | 'tech_on_the_way' (alias 'technician_on_the_way') | 'job_completed'
//             (alias 'job_completed_rating') | 'invoice_issued' | 'job_reminder'
//     Builds the Arabic template from job + customer + company and calls notify().
//     Skipped (returns null) when: no customer phone, plan is 'starter' (WhatsApp is a Pro feature),
//     subscription is expired/cancelled, or the same event was already sent for this job in the last 10 minutes.
//   notifyContractVisit({ contractId, companyId, jobId?, visitDate }) → Promise<message row|null>
//   notifyBookingReceived({ companyId, booking }) → Promise<message row|null>   (helper for B4; to = company phone)
//   normalizePhone(p) → '9665XXXXXXXX' | other international digits | null
//   renderTemplate(name, params) → string;  TEMPLATES (see docs/WHATSAPP_TEMPLATES.md)
import { one, query } from './db.js';

// ───────────────────────── templates ─────────────────────────
// Bodies must match docs/WHATSAPP_TEMPLATES.md exactly (they are what gets submitted to Meta).
export const TEMPLATES = {
  job_scheduled: {
    params: ['customer_name', 'job_title', 'date', 'time', 'tracking_url', 'company_name'],
    body: 'مرحباً {{1}}،\nتم تأكيد موعد «{{2}}» يوم {{3}} الساعة {{4}}.\nتابع حالة طلبك من الرابط: {{5}}\nمع تحيات فريق {{6}}، نسعد بخدمتك.',
  },
  technician_on_the_way: {
    params: ['customer_name', 'technician_name', 'job_title', 'tracking_url', 'company_name'],
    body: 'مرحباً {{1}}،\nالفني {{2}} في الطريق إليك الآن لطلب «{{3}}».\nتابع الطلب لحظة بلحظة: {{4}}\nفريق {{5}} في خدمتك.',
  },
  job_completed_rating: {
    params: ['customer_name', 'job_title', 'company_name', 'rating_url'],
    body: 'مرحباً {{1}}،\nتم إنجاز «{{2}}» بنجاح، شكراً لثقتك في {{3}}.\nقيّم الخدمة بنقرة واحدة: {{4}}\nرأيك يهمنا.',
  },
  invoice_issued: {
    params: ['customer_name', 'invoice_number', 'company_name', 'total', 'invoice_url'],
    body: 'مرحباً {{1}}،\nصدرت فاتورتك رقم {{2}} من {{3}} بمبلغ {{4}} ريال شامل ضريبة القيمة المضافة.\nعرض الفاتورة والدفع بمدى أو Apple Pay: {{5}}\nشكراً لك.',
  },
  contract_visit_reminder: {
    params: ['customer_name', 'contract_title', 'company_name', 'visit_date'],
    body: 'مرحباً {{1}}،\nاقترب موعد زيارة الصيانة الدورية ضمن «{{2}}» مع {{3}}، والمقررة بتاريخ {{4}}.\nسنتواصل معك لتأكيد الوقت، ويمكنك الرد على هذه الرسالة لاختيار الوقت المناسب لك.',
  },
  job_reminder: {
    params: ['job_title', 'date', 'time', 'company_name', 'tracking_url'],
    body: 'تذكير بموعدك: «{{1}}» غداً {{2}} الساعة {{3}} مع {{4}}.\nتابع الطلب: {{5}}\nلتغيير الموعد يمكنك الرد على هذه الرسالة.',
  },
  booking_received: {
    params: ['customer_name', 'customer_phone', 'description', 'priority'],
    body: 'طلب حجز جديد من صفحة الحجز:\nالعميل: {{1}}\nالجوال: {{2}}\nالمشكلة: {{3}}\nالأولوية المقترحة: {{4}}\nافتح «طلبات الحجز» في دورة لتحويله إلى مهمة.',
  },
};

const EVENT_TEMPLATE = {
  job_scheduled: 'job_scheduled',
  tech_on_the_way: 'technician_on_the_way',
  technician_on_the_way: 'technician_on_the_way',
  job_completed: 'job_completed_rating',
  job_completed_rating: 'job_completed_rating',
  invoice_issued: 'invoice_issued',
  job_reminder: 'job_reminder',
};

// WhatsApp template params can't contain newlines/tabs or 4+ consecutive spaces, max ~1024 chars.
const cleanParam = (v) => String(v ?? '-').replace(/[\n\r\t]+/g, ' ').replace(/ {2,}/g, ' ').trim().slice(0, 900) || '-';

/** Fill {{n}} placeholders. `params` is an array (positional) or an object keyed by the template's param names. */
export function renderTemplate(name, params) {
  const tpl = TEMPLATES[name];
  if (!tpl) return '';
  const arr = Array.isArray(params) ? params : tpl.params.map((k) => params?.[k]);
  return tpl.body.replace(/\{\{(\d+)\}\}/g, (_, i) => cleanParam(arr[Number(i) - 1]));
}
const paramArray = (name, params) => {
  const tpl = TEMPLATES[name];
  return (Array.isArray(params) ? params : tpl.params.map((k) => params?.[k])).map(cleanParam);
};

// ───────────────────────── phones ─────────────────────────
const toLatin = (s) => s.replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x660)).replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x6f0));

/**
 * Normalise to WhatsApp's E.164-without-plus: Saudi mobiles → 9665XXXXXXXX, Saudi landlines → 9661XXXXXXXX.
 * Accepts '05x…', '5x…', '+9665…', '009665…', '9660 5…' and Arabic-Indic digits. Other international numbers
 * (8–15 digits) are returned as digits. Returns null when it can't be a phone number.
 */
export function normalizePhone(p) {
  if (p === null || p === undefined) return null;
  let d = toLatin(String(p)).replace(/[^\d]/g, '');
  if (!d) return null;
  if (d.startsWith('00')) d = d.slice(2);
  if (d.startsWith('9660')) d = '966' + d.slice(4);          // +966 05x… typo
  if (d.startsWith('05') && d.length === 10) d = '966' + d.slice(1);
  else if (d.startsWith('5') && d.length === 9) d = '966' + d;
  else if (/^01[1-7]\d{7}$/.test(d)) d = '966' + d.slice(1);            // landline 011XXXXXXX
  if (d.startsWith('966')) return /^966[1-9]\d{7,8}$/.test(d) ? d : null;
  return d.length >= 8 && d.length <= 15 ? d : null;
}

// ───────────────────────── provider ─────────────────────────
export const whatsappConfigured = () => Boolean(process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID);

async function sendWhatsApp({ to, template, params, body }) {
  const version = process.env.WHATSAPP_API_VERSION || 'v23.0';
  const url = `https://graph.facebook.com/${version}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
  const payload = template
    ? {
        messaging_product: 'whatsapp', to, type: 'template',
        template: {
          name: template,
          language: { code: process.env.WHATSAPP_LANG || 'ar' },
          components: [{ type: 'body', parameters: paramArray(template, params).map((text) => ({ type: 'text', text })) }],
        },
      }
    : { messaging_product: 'whatsapp', to, type: 'text', text: { preview_url: true, body: String(body).slice(0, 4096) } };
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), 10000);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: ac.signal,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { status: 'failed', error: data?.error?.message ? `${res.status}: ${data.error.message}` : `HTTP ${res.status}` };
    return { status: 'sent', provider_id: data?.messages?.[0]?.id || null };
  } catch (e) {
    return { status: 'failed', error: e.name === 'AbortError' ? 'timeout' : String(e.message || e) };
  } finally {
    clearTimeout(timer);
  }
}

// ───────────────────────── notify ─────────────────────────
export async function notify({ companyId, customerId = null, jobId = null, channel = 'whatsapp', to, body, template = null, params = null, event = null } = {}) {
  try {
    if (!companyId) throw new Error('notify: companyId required');
    const ch = ['whatsapp', 'sms', 'email', 'system'].includes(channel) ? channel : 'whatsapp';
    const tpl = template && TEMPLATES[template] ? template : null;
    const text = String(body || (tpl ? renderTemplate(tpl, params) : '') || '').slice(0, 4096);
    if (!text) throw new Error('notify: empty body');
    const phone = ch === 'email' ? (to ? String(to).trim() : null) : normalizePhone(to);

    let result;
    if (!phone) result = { status: 'failed', error: 'invalid_or_missing_recipient' };
    else if ((ch === 'whatsapp' || (ch === 'system' && tpl)) && whatsappConfigured()) result = await sendWhatsApp({ to: phone, template: tpl, params, body: text });
    else result = { status: 'simulated' };

    const storedParams = tpl ? paramArray(tpl, params) : null;
    return await one(
      `INSERT INTO messages (company_id, customer_id, job_id, channel, direction, to_addr, body, status, event, template, params, provider_id, error)
       VALUES ($1,$2,$3,$4,'out',$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
      [companyId, customerId, jobId, ch, phone || (to ? String(to).slice(0, 40) : null), text, result.status,
        event, tpl, storedParams ? JSON.stringify(storedParams) : null, result.provider_id || null, result.error || null]
    );
  } catch (e) {
    console.error('[notify]', e.message);
    return null;
  }
}

// ───────────────────────── job / contract helpers ─────────────────────────
const TZ = 'Asia/Riyadh';
const fmtDate = (d) => new Intl.DateTimeFormat('ar-SA-u-nu-latn-ca-gregory', { weekday: 'long', day: 'numeric', month: 'long', timeZone: TZ }).format(new Date(d));
const fmtTime = (d) => new Intl.DateTimeFormat('ar-SA-u-nu-latn', { hour: 'numeric', minute: '2-digit', timeZone: TZ }).format(new Date(d));
const fmtPlainDate = (ymd) => new Intl.DateTimeFormat('ar-SA-u-nu-latn-ca-gregory', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${ymd}T00:00:00Z`));
const firstName = (n) => String(n || '').trim().split(/\s+/)[0] || 'عميلنا';
export const baseUrl = () => String(process.env.PUBLIC_BASE_URL || 'http://localhost:3000').replace(/\/+$/, '');
const money = (n) => Number(n || 0).toFixed(2);

async function logJobMessageEvent(jobId, companyId, msg) {
  try {
    const label = msg.status === 'failed' ? 'تعذّر إرسال رسالة واتساب' : msg.status === 'simulated' ? 'رسالة واتساب (محاكاة)' : 'تم إرسال رسالة واتساب';
    await query(
      `INSERT INTO job_events (job_id, company_id, type, message) VALUES ($1,$2,'message',$3)`,
      [jobId, companyId, `${label}: ${msg.body.split('\n')[0].slice(0, 120)}`]
    );
  } catch (e) { console.error('[notify] job event', e.message); }
}

export async function notifyJobEvent(jobId, event, { force = false } = {}) {
  try {
    const template = EVENT_TEMPLATE[event];
    if (!template || !jobId) return null;
    const job = await one(
      `SELECT j.id, j.company_id, j.number, j.title, j.scheduled_start, j.public_token, j.status,
              c.id AS customer_id, c.name AS customer_name, c.phone AS customer_phone,
              co.name AS company_name, co.name_ar AS company_name_ar, co.plan, co.subscription_status,
              u.name AS technician_name
         FROM jobs j
         JOIN customers c ON c.id = j.customer_id AND c.company_id = j.company_id
         JOIN companies co ON co.id = j.company_id
         LEFT JOIN users u ON u.id = j.technician_id AND u.company_id = j.company_id
        WHERE j.id = $1`,
      [jobId]
    );
    if (!job || !job.customer_phone) return null;
    if (job.plan === 'starter' || ['expired', 'cancelled'].includes(job.subscription_status)) return null;
    if (!force) {
      const dup = await one(
        `SELECT 1 FROM messages WHERE job_id = $1 AND company_id = $2 AND event = $3 AND status <> 'failed'
           AND created_at > now() - interval '10 minutes' LIMIT 1`,
        [job.id, job.company_id, template]
      );
      if (dup) return null;
    }
    const companyName = job.company_name_ar || job.company_name;
    const tracking = `${baseUrl()}/t/${job.public_token}`;
    let params;
    switch (template) {
      case 'job_scheduled':
        if (!job.scheduled_start) return null;
        params = [firstName(job.customer_name), job.title, fmtDate(job.scheduled_start), fmtTime(job.scheduled_start), tracking, companyName];
        break;
      case 'technician_on_the_way':
        params = [firstName(job.customer_name), firstName(job.technician_name) || 'المختص', job.title, tracking, companyName];
        break;
      case 'job_completed_rating':
        params = [firstName(job.customer_name), job.title, companyName, `${tracking}#rate`];
        break;
      case 'invoice_issued': {
        const inv = await one(
          `SELECT number, total, public_token FROM invoices WHERE job_id = $1 AND company_id = $2 AND status <> 'void'
            ORDER BY created_at DESC LIMIT 1`,
          [job.id, job.company_id]
        );
        if (!inv) return null;
        params = [firstName(job.customer_name), String(inv.number), companyName, money(inv.total), `${baseUrl()}/i/${inv.public_token}`];
        break;
      }
      case 'job_reminder':
        if (!job.scheduled_start) return null;
        params = [job.title, fmtDate(job.scheduled_start), fmtTime(job.scheduled_start), companyName, tracking];
        break;
      default:
        return null;
    }
    const msg = await notify({
      companyId: job.company_id, customerId: job.customer_id, jobId: job.id, channel: 'whatsapp',
      to: job.customer_phone, template, params, event: template,
    });
    if (msg) await logJobMessageEvent(job.id, job.company_id, msg);
    return msg;
  } catch (e) {
    console.error('[notifyJobEvent]', event, e.message);
    return null;
  }
}

export async function notifyContractVisit({ contractId, companyId, jobId = null, visitDate } = {}) {
  try {
    const ct = await one(
      `SELECT ct.id, ct.title, ct.next_visit_date, c.id AS customer_id, c.name AS customer_name, c.phone,
              co.name AS company_name, co.name_ar AS company_name_ar, co.plan, co.subscription_status
         FROM contracts ct
         JOIN customers c ON c.id = ct.customer_id AND c.company_id = ct.company_id
         JOIN companies co ON co.id = ct.company_id
        WHERE ct.id = $1 AND ct.company_id = $2`,
      [contractId, companyId]
    );
    if (!ct || !ct.phone) return null;
    if (ct.plan === 'starter' || ['expired', 'cancelled'].includes(ct.subscription_status)) return null;
    const ymd = String(visitDate || ct.next_visit_date).slice(0, 10);
    const msg = await notify({
      companyId, customerId: ct.customer_id, jobId, channel: 'whatsapp', to: ct.phone,
      template: 'contract_visit_reminder', event: 'contract_visit_reminder',
      params: [firstName(ct.customer_name), ct.title, ct.company_name_ar || ct.company_name, fmtPlainDate(ymd)],
    });
    if (msg && jobId) await logJobMessageEvent(jobId, companyId, msg);
    return msg;
  } catch (e) {
    console.error('[notifyContractVisit]', e.message);
    return null;
  }
}

/** Internal alert to the company's own phone when a public booking arrives. */
export async function notifyBookingReceived({ companyId, booking = {} } = {}) {
  try {
    const co = await one('SELECT phone FROM companies WHERE id = $1', [companyId]);
    const pr = { urgent: 'عاجلة', normal: 'عادية', low: 'منخفضة' }[booking.ai_triage?.priority || booking.ai_triage?.urgency] || 'عادية';
    return await notify({
      companyId, channel: 'system', to: co?.phone, template: 'booking_received', event: 'booking_received',
      params: [booking.name, normalizePhone(booking.phone) || booking.phone, String(booking.description || '').slice(0, 300), pr],
    });
  } catch (e) {
    console.error('[notifyBookingReceived]', e.message);
    return null;
  }
}
