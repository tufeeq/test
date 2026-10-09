// B4 — /api/public tests. Run against a live server (default http://localhost:3104) + the seeded DB:
//   PORT=3104 node server/index.js &   then   node --test server/tests/public.test.mjs
// Each run uses a random client IP (X-Forwarded-For; app trusts 1 proxy hop) so rate limits don't bleed between runs.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import 'dotenv/config';
import pg from 'pg';

const BASE = (process.env.BASE_URL || 'http://localhost:3104').replace(/\/$/, '');
const SLUG = process.env.TEST_SLUG || 'naseem';
const ip = () => `10.${rand(255)}.${rand(255)}.${rand(254) + 1}`;
const rand = (n) => Math.floor(Math.random() * n);
const RUN_IP = ip();
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL || 'postgres://dawra:dawra@localhost:5432/dawra' });

async function call(method, path, body, { headers = {}, ipAddr = RUN_IP } = {}) {
  const res = await fetch(`${BASE}/api/public${path}`, {
    method,
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ipAddr, ...headers },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const ct = res.headers.get('content-type') || '';
  const data = ct.includes('json') ? await res.json() : await res.arrayBuffer();
  return { status: res.status, data, headers: res.headers };
}

const created = { bookings: [], jobs: [] };
let company;
let fixture; // completed, unrated job created for this run

before(async () => {
  company = (await pool.query('SELECT id, slug FROM companies WHERE slug = $1', [SLUG])).rows[0];
  assert.ok(company, `seeded company "${SLUG}" must exist (npm run seed)`);
  // Clone an existing job into a fresh completed, unrated job owned by the demo company.
  const src = (await pool.query(
    `SELECT customer_id, site_id, technician_id FROM jobs WHERE company_id = $1 AND technician_id IS NOT NULL LIMIT 1`, [company.id])).rows[0];
  const n = (await pool.query('SELECT COALESCE(MAX(number),0)+1 AS n FROM jobs WHERE company_id = $1', [company.id])).rows[0].n;
  fixture = (await pool.query(
    `INSERT INTO jobs (company_id, number, customer_id, site_id, technician_id, title, status, scheduled_start, scheduled_end, completed_at)
     VALUES ($1,$2,$3,$4,$5,'اختبار B4 — غسيل مكيف','completed', now() - interval '3 hours', now() - interval '2 hours', now() - interval '1 hour')
     RETURNING id, public_token, customer_id`,
    [company.id, n, src.customer_id, src.site_id, src.technician_id])).rows[0];
  created.jobs.push(fixture.id);
  await pool.query(`INSERT INTO job_events (job_id, company_id, type, message) VALUES ($1,$2,'created','تم إنشاء الطلب'), ($1,$2,'note','ملاحظة داخلية سرية')`, [fixture.id, company.id]);
});

after(async () => {
  if (created.bookings.length) await pool.query('DELETE FROM booking_requests WHERE id = ANY($1)', [created.bookings]);
  if (created.jobs.length) await pool.query('DELETE FROM jobs WHERE id = ANY($1)', [created.jobs]);
  await pool.query(`DELETE FROM messages WHERE company_id = $1 AND channel = 'system' AND body LIKE '%B4 Test%'`, [company.id]);
  await pool.end();
});

// ── company profile ─────────────────────────────────────
test('GET /companies/:slug returns public profile only', async () => {
  const r = await call('GET', `/companies/${SLUG}`);
  assert.equal(r.status, 200);
  for (const k of ['slug', 'name', 'name_ar', 'phone', 'city', 'logo_url', 'categories', 'services']) assert.ok(k in r.data, `has ${k}`);
  assert.ok(Array.isArray(r.data.categories) && r.data.categories.length > 0);
  assert.ok(r.data.services.length > 0);
  for (const s of r.data.services) assert.deepEqual(Object.keys(s).sort(), ['category', 'duration_min', 'name', 'name_ar', 'price']);
  for (const k of ['id', 'vat_number', 'cr_number', 'plan', 'subscription_status']) assert.ok(!(k in r.data), `must not leak ${k}`);
});

test('GET /companies/:slug 404s for unknown slug and 400s for a malformed one', async () => {
  assert.equal((await call('GET', '/companies/no-such-company-xyz')).status, 404);
  assert.equal((await call('GET', '/companies/Bad%20Slug!')).status, 400);
});

// ── booking validation ──────────────────────────────────
const good = () => ({ name: 'B4 Test عميل', phone: '0551234567', description: 'المكيف ما يبرد ويطلع صوت عالي', category: 'ac', district: 'النرجس' });

test('booking: rejects missing/short fields with 400 + details', async () => {
  const r = await call('POST', `/companies/${SLUG}/bookings`, { name: 'A', phone: '', description: '' });
  assert.equal(r.status, 400);
  assert.equal(r.data.error.code, 'bad_request');
  const paths = r.data.error.details.map((d) => d.path);
  for (const p of ['body.name', 'body.phone', 'body.description']) assert.ok(paths.includes(p), `error for ${p}`);
});

test('booking: rejects non-Saudi / malformed phone numbers', async () => {
  for (const phone of ['12345', '0412345678', '+201001234567', '05512345678', 'abcdefghij']) {
    const r = await call('POST', `/companies/${SLUG}/bookings`, { ...good(), phone });
    assert.equal(r.status, 400, `phone ${phone} should be rejected`);
    assert.ok(r.data.error.details.some((d) => d.path === 'body.phone'));
  }
});

test('booking: rejects unknown category, past date and too-far date', async () => {
  assert.equal((await call('POST', `/companies/${SLUG}/bookings`, { ...good(), category: 'roofing' })).status, 400);
  assert.equal((await call('POST', `/companies/${SLUG}/bookings`, { ...good(), preferred_date: '2020-01-01' })).status, 400);
  const far = new Date(Date.now() + 200 * 86400e3).toISOString().slice(0, 10);
  assert.equal((await call('POST', `/companies/${SLUG}/bookings`, { ...good(), preferred_date: far })).status, 400);
});

test('booking: valid request → 201, phone normalised to 9665…, triage stored', async () => {
  const tomorrow = new Date(Date.now() + 3 * 3600e3 + 86400e3).toISOString().slice(0, 10);
  const r = await call('POST', `/companies/${SLUG}/bookings`, { ...good(), phone: '+966 55 123 4567', preferred_date: tomorrow, preferred_window: 'evening' });
  assert.equal(r.status, 201, JSON.stringify(r.data));
  assert.equal(r.data.status, 'pending');
  assert.match(r.data.id, /^[0-9a-f-]{36}$/);
  assert.ok(r.data.triage && typeof r.data.triage.title === 'string');
  assert.ok(['ac', 'cleaning', 'pest', 'plumbing', 'electrical', 'other'].includes(r.data.triage.category));
  assert.ok(!('source' in r.data.triage), 'internal triage source is not exposed');
  created.bookings.push(r.data.id);
  const row = (await pool.query('SELECT company_id, phone, preferred_date::text AS preferred_date, preferred_window, ai_triage, status FROM booking_requests WHERE id = $1', [r.data.id])).rows[0];
  assert.equal(row.company_id, company.id);
  assert.equal(row.phone, '966551234567');
  assert.equal(row.preferred_date, tomorrow);
  assert.equal(row.preferred_window, 'evening');
  assert.equal(row.status, 'pending');
  assert.ok(row.ai_triage && row.ai_triage.title);
});

test('booking: 05XXXXXXXX with Arabic-Indic digits is accepted', async () => {
  const r = await call('POST', `/companies/${SLUG}/bookings`, { ...good(), phone: '٠٥٥٩٩٩٨٨٧٧' });
  assert.equal(r.status, 201);
  created.bookings.push(r.data.id);
  const row = (await pool.query('SELECT phone FROM booking_requests WHERE id = $1', [r.data.id])).rows[0];
  assert.equal(row.phone, '966559998877');
});

test('booking: unknown company → 404', async () => {
  assert.equal((await call('POST', '/companies/no-such-company-xyz/bookings', good())).status, 404);
});

// ── honeypot ────────────────────────────────────────────
test('booking: honeypot filled → fake 201, nothing stored', async () => {
  const before = (await pool.query('SELECT count(*)::int AS n FROM booking_requests WHERE company_id = $1', [company.id])).rows[0].n;
  const r = await call('POST', `/companies/${SLUG}/bookings`, { ...good(), name: 'B4 Test bot', website: 'http://spam.example' }, { ipAddr: ip() });
  assert.equal(r.status, 201);
  assert.equal(r.data.status, 'pending');
  const afterN = (await pool.query('SELECT count(*)::int AS n FROM booking_requests WHERE company_id = $1', [company.id])).rows[0].n;
  assert.equal(afterN, before, 'no booking row created');
  const exists = (await pool.query('SELECT 1 FROM booking_requests WHERE id = $1', [r.data.id])).rowCount;
  assert.equal(exists, 0);
});

test('booking: rate limited per IP+company (429 after the limit)', async () => {
  const addr = ip();
  let last;
  for (let i = 0; i < 12; i++) {
    // honeypot submissions count toward the limit but store nothing
    last = await call('POST', `/companies/${SLUG}/bookings`, { ...good(), website: 'x' }, { ipAddr: addr });
    if (last.status === 429) break;
  }
  assert.equal(last.status, 429);
  assert.equal(last.data.error.code, 'rate_limited');
});

// ── live triage preview ─────────────────────────────────
test('triage preview returns the public triage shape and never 500s', async () => {
  const r = await call('POST', `/companies/${SLUG}/triage`, { text: 'تسريب ماء من المكيف على الجدار' });
  assert.equal(r.status, 200);
  for (const k of ['category', 'priority', 'title', 'suggested_services', 'duration_min']) assert.ok(k in r.data, `has ${k}`);
  assert.equal((await call('POST', `/companies/${SLUG}/triage`, { text: 'قصير' })).status, 400);
});

// ── tracking ────────────────────────────────────────────
test('tracking: data shape, no sensitive data leaked', async () => {
  const r = await call('GET', `/track/${fixture.public_token}`);
  assert.equal(r.status, 200);
  const d = r.data;
  for (const k of ['number', 'title', 'status', 'scheduled_start', 'scheduled_end', 'completed_at', 'company', 'technician', 'site', 'events', 'rating', 'rating_comment', 'invoice']) {
    assert.ok(k in d, `has ${k}`);
  }
  assert.deepEqual(Object.keys(d.company).sort(), ['logo_url', 'name', 'name_ar', 'phone', 'slug']);
  assert.deepEqual(Object.keys(d.technician).sort(), ['color', 'name']);
  assert.ok(!/\s/.test(d.technician.name), 'technician first name only');
  assert.deepEqual(Object.keys(d.site).sort(), ['city', 'district']);
  for (const e of d.events) {
    assert.deepEqual(Object.keys(e).sort(), ['created_at', 'message', 'type']);
    assert.ok(['created', 'assigned', 'status_changed', 'rescheduled'].includes(e.type), `event type ${e.type} is public`);
  }
  // nothing that identifies the customer or internal records
  const cust = (await pool.query('SELECT name, phone, email FROM customers WHERE id = $1', [fixture.customer_id])).rows[0];
  const site = (await pool.query('SELECT address FROM sites s JOIN jobs j ON j.site_id = s.id WHERE j.id = $1', [fixture.id])).rows[0];
  const raw = JSON.stringify(d);
  assert.ok(!raw.includes(cust.phone), 'no customer phone');
  assert.ok(!raw.includes(cust.name), 'no customer name');
  if (site?.address) assert.ok(!raw.includes(site.address), 'no street address');
  assert.ok(!raw.includes('ملاحظة داخلية'), 'internal notes are hidden');
  assert.ok(!raw.includes(fixture.id), 'no internal job id');
  assert.ok(!raw.includes(company.id), 'no company id');
  for (const k of ['id', 'customer', 'customer_id', 'technician_id', 'items', 'photos', 'customer_signature', 'notes', 'description', 'jobs']) {
    assert.ok(!(k in d), `must not include ${k}`);
  }
  assert.ok(!/"phone":"9665\d{8}"/.test(raw.replace(`"phone":"${d.company.phone}"`, '')), 'only the company phone appears');
});

test('tracking: unknown token 404, malformed token 400', async () => {
  assert.equal((await call('GET', '/track/0123456789abcdef0123456789abcdef')).status, 404);
  assert.equal((await call('GET', '/track/not-a-token')).status, 400);
});

// ── rating ──────────────────────────────────────────────
test('rating: validates 1..5', async () => {
  assert.equal((await call('POST', `/track/${fixture.public_token}/rating`, { rating: 0 })).status, 400);
  assert.equal((await call('POST', `/track/${fixture.public_token}/rating`, { rating: 6 })).status, 400);
  assert.equal((await call('POST', `/track/${fixture.public_token}/rating`, {})).status, 400);
});

test('rating: only once — second attempt 409, value unchanged, rating event logged', async () => {
  const first = await call('POST', `/track/${fixture.public_token}/rating`, { rating: 5, comment: 'شغل ممتاز' });
  assert.equal(first.status, 200);
  assert.deepEqual(first.data, { ok: true });
  const second = await call('POST', `/track/${fixture.public_token}/rating`, { rating: 1, comment: 'محاولة ثانية' });
  assert.equal(second.status, 409);
  const row = (await pool.query('SELECT rating, rating_comment FROM jobs WHERE id = $1', [fixture.id])).rows[0];
  assert.equal(row.rating, 5);
  assert.equal(row.rating_comment, 'شغل ممتاز');
  const ev = (await pool.query(`SELECT count(*)::int AS n FROM job_events WHERE job_id = $1 AND type = 'rating'`, [fixture.id])).rows[0].n;
  assert.equal(ev, 1);
  const t = await call('GET', `/track/${fixture.public_token}`);
  assert.equal(t.data.rating, 5);
  assert.equal(t.data.can_rate, false);
});

test('rating: concurrent submissions — exactly one wins', async () => {
  await pool.query('UPDATE jobs SET rating = NULL, rating_comment = NULL, rated_at = NULL WHERE id = $1', [fixture.id]);
  const rs = await Promise.all([1, 2, 3, 4, 5].map((n) => call('POST', `/track/${fixture.public_token}/rating`, { rating: n })));
  assert.equal(rs.filter((r) => r.status === 200).length, 1);
  assert.equal(rs.filter((r) => r.status === 409).length, 4);
});

test('rating: not allowed before the job is completed', async () => {
  const open = (await pool.query(
    `SELECT public_token FROM jobs WHERE company_id = $1 AND status IN ('scheduled','on_the_way','in_progress') LIMIT 1`, [company.id])).rows[0];
  if (!open) return;
  const r = await call('POST', `/track/${open.public_token}/rating`, { rating: 4 });
  assert.equal(r.status, 409);
});

// ── public invoice ──────────────────────────────────────
test('invoice: public view has lines + seller + qr, no internal ids; QR PNG served', async () => {
  const inv = (await pool.query(`SELECT id, public_token FROM invoices WHERE company_id = $1 AND status IN ('paid','unpaid') LIMIT 1`, [company.id])).rows[0];
  if (!inv) return;
  const r = await call('GET', `/invoices/${inv.public_token}`);
  assert.equal(r.status, 200);
  assert.ok(Array.isArray(r.data.lines) && r.data.lines.length > 0);
  assert.ok(r.data.company && r.data.company.vat_number);
  assert.ok(typeof r.data.qr_tlv === 'string' && r.data.qr_tlv.length > 10);
  const raw = JSON.stringify(r.data);
  assert.ok(!raw.includes(inv.id), 'no internal invoice id');
  assert.ok(!raw.includes(company.id), 'no company id');
  assert.ok(!('phone' in (r.data.customer || {})), 'no customer phone on invoice');
  const png = await call('GET', `/invoices/${inv.public_token}/qr.png`);
  assert.equal(png.status, 200);
  assert.equal(png.headers.get('content-type'), 'image/png');
  assert.deepEqual([...new Uint8Array(png.data).slice(0, 4)], [0x89, 0x50, 0x4e, 0x47]);
});

test('invoice: pay on a paid invoice → 409; unknown token → 404', async () => {
  const paid = (await pool.query(`SELECT public_token FROM invoices WHERE company_id = $1 AND status = 'paid' LIMIT 1`, [company.id])).rows[0];
  if (paid) assert.equal((await call('POST', `/invoices/${paid.public_token}/pay`)).status, 409);
  assert.equal((await call('GET', '/invoices/0123456789abcdef0123456789abcdef')).status, 404);
});
