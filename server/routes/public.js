// /api/public — OWNER: B4. No auth. Customer-facing endpoints for /b/:slug, /t/:token, /i/:token.
// Mounted behind the global public limiter (60/min/IP). Booking + triage get their own tighter limiters.
// Rules: never expose internal ids beyond what's listed in docs/API.md §12, never expose other customers' data,
// every query is scoped by the company resolved from the slug or by an unguessable public token.
import { Router } from 'express';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import crypto from 'node:crypto';
import QRCode from 'qrcode';
import { one, many, query } from '../lib/db.js';
import { ah, notFound, conflict, badRequest, HttpError } from '../lib/errors.js';
import { validate, z, normalizePhone } from '../lib/validate.js';
import * as ai from '../lib/ai.js';
import * as notifyLib from '../lib/notify.js';
import * as moyasar from '../lib/moyasar.js';
import * as pdfLib from '../lib/pdf.js';
import * as jobsMod from './jobs.js';
import * as invoicesMod from './invoices.js';

const router = Router();

export const CATEGORIES = ['ac', 'cleaning', 'pest', 'plumbing', 'electrical', 'other'];
const PUBLIC_EVENT_TYPES = ['created', 'assigned', 'status_changed', 'rescheduled'];
const baseUrl = () => (process.env.PUBLIC_BASE_URL || '').replace(/\/+$/, '');

// ── limiters ────────────────────────────────────────────
const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: Number(process.env.BOOKING_RATE_LIMIT || 10),
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true, // validation errors don't burn the budget
  keyGenerator: (req) => `${ipKeyGenerator(req.ip || '')}|${req.params.slug}`,
  handler: (_req, res) => res.status(429).json({ error: { code: 'rate_limited', message: 'Too many booking requests, try again later' } }),
});
const triageLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: Number(process.env.TRIAGE_RATE_LIMIT || 12),
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => res.status(429).json({ error: { code: 'rate_limited', message: 'Too many requests' } }),
});

// ── helpers ─────────────────────────────────────────────
const firstName = (name) => (name ? String(name).trim().split(/\s+/)[0] : null);

/** Saudi mobile: 05XXXXXXXX / 5XXXXXXXX / +9665XXXXXXXX / 009665XXXXXXXX → 9665XXXXXXXX, else null. */
export function saudiMobile(input) {
  const n = normalizePhone(String(input || '').replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
  return /^9665\d{8}$/.test(n) ? n : null;
}

/** Calls B5's ai.triage, never throws, never hangs longer than `ms`. */
async function safeTriage({ text, category, services }, ms = 8000) {
  const fallback = { category: category || 'other', priority: 'normal', title: String(text).slice(0, 40), suggested_services: [], duration_min: 60, summary_ar: String(text).slice(0, 200), source: 'keywords' };
  try {
    const r = await Promise.race([
      ai.triage({ text, category, services }),
      new Promise((resolve) => setTimeout(() => resolve(null), ms).unref?.()),
    ]);
    return r && typeof r === 'object' ? r : fallback;
  } catch (e) {
    console.error('[public] triage failed', e?.message);
    return fallback;
  }
}

/** Only the fields a customer should see from a triage result. */
const publicTriage = (t) => t && ({
  category: t.category, priority: t.priority, title: t.title,
  suggested_services: Array.isArray(t.suggested_services) ? t.suggested_services.slice(0, 5) : [],
  duration_min: t.duration_min, summary_ar: t.summary_ar,
});

async function companyBySlug(slug) {
  const co = await one(
    `SELECT id, slug, name, name_ar, phone, city, logo_url, booking_categories FROM companies
     WHERE slug = $1 AND subscription_status <> 'cancelled'`,
    [slug]
  );
  if (!co) throw notFound('Company not found');
  return co;
}

/** Map price-list categories (cleaning/repair/installation…) to booking tiles. Seeded AC firms use repair/installation. */
function deriveCategories(co, services) {
  if (Array.isArray(co.booking_categories) && co.booking_categories.length) return co.booking_categories.filter((c) => CATEGORIES.includes(c));
  const set = new Set();
  for (const s of services) if (CATEGORIES.includes(s.category) && s.category !== 'other') set.add(s.category);
  // A price list full of AC work (repair/installation/maintenance) still means "ac".
  if (services.some((s) => !CATEGORIES.includes(s.category) || /مكيف|تكييف|AC|freon|فريون/i.test(`${s.name} ${s.name_ar}`))) set.add('ac');
  const list = CATEGORIES.filter((c) => set.has(c) && c !== 'other');
  return list.length ? list : ['ac', 'cleaning', 'pest', 'plumbing', 'electrical'];
}

const slugParam = z.object({ slug: z.string().trim().toLowerCase().regex(/^[a-z0-9-]{1,60}$/) });
const tokenParam = z.object({ token: z.string().trim().regex(/^[a-f0-9]{16,64}$/i, 'invalid token') });

// ── company profile ─────────────────────────────────────
router.get('/companies/:slug', validate({ params: slugParam }), ah(async (req, res) => {
  const co = await companyBySlug(req.params.slug);
  const services = await many(
    `SELECT name, name_ar, price, category, duration_min FROM services
     WHERE company_id = $1 AND active = true ORDER BY category NULLS LAST, price, name LIMIT 100`,
    [co.id]
  );
  res.set('Cache-Control', 'public, max-age=60');
  res.json({
    slug: co.slug, name: co.name, name_ar: co.name_ar, phone: co.phone, city: co.city, logo_url: co.logo_url,
    categories: deriveCategories(co, services),
    services,
  });
}));

// ── live triage preview while the customer types (no storage) ──
const TriageSchema = z.object({
  text: z.string().trim().min(8).max(2000),
  category: z.enum(CATEGORIES).optional().nullable(),
});
router.post('/companies/:slug/triage', triageLimiter, validate({ params: slugParam, body: TriageSchema }), ah(async (req, res) => {
  const co = await companyBySlug(req.params.slug);
  const services = await many('SELECT name, name_ar, category, price FROM services WHERE company_id = $1 AND active = true', [co.id]);
  const t = await safeTriage({ text: req.body.text, category: req.body.category || undefined, services }, 6000);
  res.json(publicTriage(t));
}));

// ── booking ─────────────────────────────────────────────
const BookingSchema = z.object({
  name: z.string().trim().min(2, 'name too short').max(120),
  phone: z.string().trim().min(9).max(20).refine((p) => saudiMobile(p) !== null, 'expected a Saudi mobile like 05XXXXXXXX'),
  city: z.string().trim().max(80).optional().nullable(),
  district: z.string().trim().max(80).optional().nullable(),
  category: z.enum(CATEGORIES).optional().nullable(),
  description: z.string().trim().min(5, 'describe the problem').max(2000),
  preferred_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'expected YYYY-MM-DD').optional().nullable()
    .refine((d) => {
      if (!d) return true;
      const dt = new Date(`${d}T00:00:00Z`);
      if (Number.isNaN(dt.getTime()) || dt.toISOString().slice(0, 10) !== d) return false; // e.g. 2026-02-30
      const today = new Date(Date.now() + 3 * 3600e3).toISOString().slice(0, 10); // Riyadh
      const max = new Date(Date.now() + 3 * 3600e3 + 90 * 86400e3).toISOString().slice(0, 10);
      return d >= today && d <= max;
    }, 'date must be between today and 90 days ahead'),
  preferred_window: z.string().trim().max(40).optional().nullable(),
  website: z.string().max(500).optional().nullable(), // honeypot — humans never see it
});

router.post('/companies/:slug/bookings', validate({ params: slugParam }), bookingLimiter, validate({ body: BookingSchema }), ah(async (req, res) => {
  const b = req.body;
  // Honeypot filled → pretend success so bots learn nothing, store nothing.
  if (b.website && b.website.trim()) {
    return res.status(201).json({ id: crypto.randomUUID(), status: 'pending', triage: null });
  }
  const co = await companyBySlug(req.params.slug);
  const phone = saudiMobile(b.phone);
  const services = await many('SELECT name, name_ar, category, price FROM services WHERE company_id = $1 AND active = true', [co.id]);
  const triage = await safeTriage({ text: b.description, category: b.category || undefined, services });

  const row = await one(
    `INSERT INTO booking_requests (company_id, name, phone, city, district, category, description, preferred_date, preferred_window, ai_triage)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id, status`,
    [co.id, b.name, phone, b.city || co.city || null, b.district || null, b.category || triage.category || null,
      b.description, b.preferred_date || null, b.preferred_window || null, JSON.stringify(triage)]
  );

  // Tell the company (B5's notify never throws by contract, but be defensive).
  try {
    await notifyLib.notifyBookingReceived({
      companyId: co.id,
      booking: { id: row.id, name: b.name, phone, district: b.district, description: b.description, ai_triage: triage },
    });
  } catch (e) {
    console.error('[public] notify failed', e?.message);
  }

  res.status(201).json({ id: row.id, status: row.status, triage: publicTriage(triage) });
}));

// ── tracking ────────────────────────────────────────────
async function trackingPayload(token) {
  const j = await one(
    `SELECT j.id, j.company_id, j.number, j.title, j.category, j.status, j.scheduled_start, j.scheduled_end, j.completed_at,
            j.rating, j.rating_comment, j.public_token,
            to_jsonb(j)->>'on_the_way_at' AS on_the_way_at, to_jsonb(j)->>'started_at' AS started_at,
            c.name AS co_name, c.name_ar AS co_name_ar, c.phone AS co_phone, c.logo_url AS co_logo, c.slug AS co_slug,
            u.name AS tech_name, u.color AS tech_color,
            s.district, s.city
       FROM jobs j
       JOIN companies c ON c.id = j.company_id
       LEFT JOIN users u ON u.id = j.technician_id AND u.company_id = j.company_id
       LEFT JOIN sites s ON s.id = j.site_id AND s.company_id = j.company_id
      WHERE j.public_token = $1`,
    [token]
  );
  if (!j) return null;
  const [events, inv] = await Promise.all([
    many(
      `SELECT type, message, created_at FROM job_events
        WHERE job_id = $1 AND company_id = $2 AND type = ANY($3) ORDER BY created_at ASC LIMIT 50`,
      [j.id, j.company_id, PUBLIC_EVENT_TYPES]
    ),
    one(
      `SELECT public_token, total, status FROM invoices
        WHERE job_id = $1 AND company_id = $2 AND status IN ('unpaid','paid') ORDER BY created_at DESC LIMIT 1`,
      [j.id, j.company_id]
    ),
  ]);
  return {
    job: j,
    body: {
      number: j.number, title: j.title, category: j.category, status: j.status,
      scheduled_start: j.scheduled_start, scheduled_end: j.scheduled_end, completed_at: j.completed_at,
      on_the_way_at: j.on_the_way_at, started_at: j.started_at,
      company: { name: j.co_name, name_ar: j.co_name_ar, phone: j.co_phone, logo_url: j.co_logo, slug: j.co_slug },
      technician: j.tech_name ? { name: firstName(j.tech_name), color: j.tech_color } : null,
      site: j.district || j.city ? { district: j.district, city: j.city } : null,
      events,
      rating: j.rating, rating_comment: j.rating_comment,
      can_rate: j.status === 'completed' && j.rating == null,
      invoice: inv ? { public_token: inv.public_token, total: inv.total, status: inv.status, url: `/i/${inv.public_token}` } : null,
    },
  };
}

router.get('/track/:token', validate({ params: tokenParam }), ah(async (req, res) => {
  const p = await trackingPayload(req.params.token);
  if (!p) throw notFound('Tracking link not found');
  res.set('Cache-Control', 'no-store');
  res.json(p.body);
}));

const RatingSchema = z.object({
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().trim().max(1000).optional().nullable(),
});

router.post('/track/:token/rating', validate({ params: tokenParam, body: RatingSchema }), ah(async (req, res) => {
  const { rating, comment } = req.body;
  // Atomic "rate once": the WHERE clause is the guard, so two racing requests can't both win.
  const upd = await one(
    `UPDATE jobs SET rating = $2, rating_comment = $3, rated_at = now(), updated_at = now()
      WHERE public_token = $1 AND status = 'completed' AND rating IS NULL
      RETURNING id, company_id`,
    [req.params.token, rating, comment || null]
  );
  if (!upd) {
    const j = await one('SELECT status, rating FROM jobs WHERE public_token = $1', [req.params.token]);
    if (!j) throw notFound('Tracking link not found');
    if (j.rating != null) throw conflict('Already rated');
    throw conflict('Job is not completed yet');
  }
  const message = `تقييم العميل: ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)} (${rating}/5)${comment ? ` — ${comment}` : ''}`;
  try {
    if (typeof jobsMod.addJobEvent === 'function') {
      await jobsMod.addJobEvent(null, { jobId: upd.id, companyId: upd.company_id, type: 'rating', message, actorUserId: null });
    } else {
      await query('INSERT INTO job_events (job_id, company_id, type, message) VALUES ($1,$2,$3,$4)', [upd.id, upd.company_id, 'rating', message]);
    }
  } catch (e) {
    console.error('[public] rating event failed', e?.message);
  }
  res.json({ ok: true });
}));

// ── public invoice ──────────────────────────────────────
async function loadPublicInvoice(token) {
  if (typeof invoicesMod.getPublicInvoice === 'function') {
    try {
      const inv = await invoicesMod.getPublicInvoice(token);
      if (inv) {
        const j = await one(
          `SELECT j.public_token AS job_token, j.number AS job_number FROM invoices i
             JOIN jobs j ON j.id = i.job_id AND j.company_id = i.company_id WHERE i.public_token = $1`, [token]);
        return { ...inv, job_token: j?.job_token, job_number: j?.job_number };
      }
    } catch (e) { console.error('[public] getPublicInvoice failed, falling back', e?.message); }
  }
  const inv = await one(
    `SELECT i.id, i.company_id, i.number, i.kind, i.issue_date, i.status, i.subtotal, i.vat_amount, i.total, i.paid_at,
            i.payment_method, i.qr_tlv, i.uuid, i.public_token, i.payment_link_url, i.notes, i.job_id,
            json_build_object('name', cu.name, 'vat_number', cu.vat_number, 'type', cu.type) AS customer,
            json_build_object('name', c.name, 'name_ar', c.name_ar, 'vat_number', c.vat_number, 'cr_number', c.cr_number,
                              'address', c.address, 'city', c.city, 'phone', c.phone, 'logo_url', c.logo_url) AS company,
            j.public_token AS job_token, j.number AS job_number,
            to_jsonb(i)->'seller' AS seller_snapshot, to_jsonb(i)->'buyer' AS buyer_snapshot
       FROM invoices i
       JOIN companies c ON c.id = i.company_id
       JOIN customers cu ON cu.id = i.customer_id AND cu.company_id = i.company_id
       LEFT JOIN jobs j ON j.id = i.job_id AND j.company_id = i.company_id
      WHERE i.public_token = $1 AND i.status <> 'draft'`,
    [token]
  );
  if (!inv) return null;
  // Prefer B2's immutable snapshots taken at issue time when present.
  if (inv.seller_snapshot) inv.company = { ...inv.company, ...inv.seller_snapshot };
  if (inv.buyer_snapshot) inv.customer = { ...inv.customer, ...inv.buyer_snapshot };
  delete inv.seller_snapshot; delete inv.buyer_snapshot;
  inv.lines = await many(
    'SELECT description, qty, unit_price, vat_rate, line_total FROM invoice_lines WHERE invoice_id = $1 AND company_id = $2 ORDER BY id',
    [inv.id, inv.company_id]
  );
  return inv;
}

/** Strip internal ids before sending to the browser. */
function invoiceBody(inv) {
  const { id: _id, company_id: _cid, job_id: _jid, job_token, job_number, ...rest } = inv;
  return {
    ...rest,
    lines: (inv.lines || []).map(({ id: _l, invoice_id: _i, company_id: _c, ...l }) => l),
    tracking_url: job_token ? `/t/${job_token}` : null,
    job_number: job_number ?? null,
    qr_png_url: `/api/public/invoices/${inv.public_token}/qr.png`,
    pdf_url: inv.pdf_url || `/api/public/invoices/${inv.public_token}/pdf`,
    can_pay: inv.can_pay ?? inv.status === 'unpaid',
  };
}

router.get('/invoices/:token', validate({ params: tokenParam }), ah(async (req, res) => {
  const inv = await loadPublicInvoice(req.params.token);
  if (!inv) throw notFound('Invoice not found');
  res.set('Cache-Control', 'no-store');
  res.json(invoiceBody(inv));
}));

router.get('/invoices/:token/qr.png', validate({ params: tokenParam }), ah(async (req, res) => {
  const inv = await one("SELECT qr_tlv FROM invoices WHERE public_token = $1 AND status <> 'draft'", [req.params.token]);
  if (!inv || !inv.qr_tlv) throw notFound('QR not available');
  const png = await QRCode.toBuffer(inv.qr_tlv, { type: 'png', errorCorrectionLevel: 'M', margin: 1, width: 360, color: { dark: '#1B2323', light: '#FFFFFF' } });
  res.set('Content-Type', 'image/png');
  res.set('Cache-Control', 'public, max-age=86400');
  res.send(png);
}));

router.get('/invoices/:token/pdf', validate({ params: tokenParam }), ah(async (req, res) => {
  const inv = await loadPublicInvoice(req.params.token);
  if (!inv) throw notFound('Invoice not found');
  // B2 serves the canonical public PDF (/api/invoices/public/:token/pdf) — send people there when it exists.
  if (inv.pdf_url && !inv.pdf_url.startsWith('/api/public/')) return res.redirect(302, inv.pdf_url);
  let buf;
  try {
    buf = await pdfLib.renderInvoicePdf({ invoice: inv, lines: inv.lines, company: inv.company, customer: inv.customer });
  } catch (e) {
    console.error('[public] pdf render failed', e?.message);
    throw new HttpError(503, 'unavailable', 'PDF is not available yet');
  }
  res.set('Content-Type', 'application/pdf');
  res.set('Content-Disposition', `inline; filename="invoice-${inv.number}.pdf"`);
  res.send(buf);
}));

router.post('/invoices/:token/pay', validate({ params: tokenParam }), ah(async (req, res) => {
  if (typeof invoicesMod.createPublicPaymentLink === 'function') {
    const link = await invoicesMod.createPublicPaymentLink(req.params.token); // throws 409 for paid/void/credit notes
    if (!link) throw notFound('Invoice not found');
    if (!link.url) throw badRequest('Online payment is not available');
    return res.json({ url: link.url, simulated: Boolean(link.simulated) });
  }
  const inv = await one(
    `SELECT i.id, i.company_id, i.number, i.total, i.status, i.payment_link_url, c.name_ar, c.name
       FROM invoices i JOIN companies c ON c.id = i.company_id WHERE i.public_token = $1 AND i.status <> 'draft'`,
    [req.params.token]
  );
  if (!inv) throw notFound('Invoice not found');
  if (inv.status !== 'unpaid') throw conflict(inv.status === 'paid' ? 'Invoice already paid' : 'Invoice is void');
  if (inv.payment_link_url) return res.json({ url: inv.payment_link_url, simulated: !moyasar.isConfigured() });
  const callbackUrl = `${baseUrl()}/i/${req.params.token}?paid=1`;
  let link;
  try {
    link = await moyasar.createPaymentLink({
      amount: inv.total,
      description: `فاتورة رقم ${inv.number} — ${inv.name_ar || inv.name}`,
      callbackUrl,
      metadata: { invoice_id: inv.id, company_id: inv.company_id },
    });
  } catch (e) {
    console.error('[public] createPaymentLink failed', e?.message);
    throw new HttpError(503, 'unavailable', 'Online payment is not available right now');
  }
  if (!link?.url) throw badRequest('Online payment is not available');
  if (!link.simulated) await query('UPDATE invoices SET payment_link_url = $2 WHERE id = $1 AND company_id = $3', [inv.id, link.url, inv.company_id]);
  res.json({ url: link.url, simulated: Boolean(link.simulated) });
}));

export default router;
