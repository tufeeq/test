// B1 Core API tests. Run against a live server:
//   PORT=3101 node server/index.js &   then   node --test server/tests/core.test.mjs
// Env: BASE_URL (default http://localhost:3101), DATABASE_URL (from .env; used only for fixture setup/cleanup).
// Creates its own fixtures (tagged "B1TEST") and removes them afterwards; demo seed data is left untouched.
import 'dotenv/config';
import { test, before, after, describe } from 'node:test';
import assert from 'node:assert/strict';
import pg from 'pg';

const BASE = (process.env.BASE_URL || 'http://localhost:3101').replace(/\/$/, '');
const TAG = `B1TEST-${Date.now().toString(36)}`;
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

function client() {
  let cookie = '';
  const call = async (method, path, body) => {
    const res = await fetch(`${BASE}/api${path}`, {
      method,
      headers: { 'content-type': 'application/json', ...(cookie ? { cookie } : {}) },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const set = res.headers.get('set-cookie');
    if (set) cookie = set.split(';')[0];
    const text = await res.text();
    let json = null;
    try { json = text ? JSON.parse(text) : null; } catch { json = text; }
    return { status: res.status, body: json };
  };
  return {
    get: (p) => call('GET', p), post: (p, b = {}) => call('POST', p, b), patch: (p, b) => call('PATCH', p, b),
    put: (p, b) => call('PUT', p, b), del: (p) => call('DELETE', p),
  };
}

const owner = client();
const disp = client();
const tech = client();
const other = client(); // second tenant
let ctx = {};

async function login(c, email) {
  const r = await c.post('/auth/login', { email, password: 'Demo1234!' });
  assert.equal(r.status, 200, `login ${email}: ${JSON.stringify(r.body)}`);
  return r.body;
}

const isoIn = (days, hourRiyadh = 10) => {
  const d = new Date(); d.setUTCDate(d.getUTCDate() + days); d.setUTCHours(hourRiyadh - 3, 0, 0, 0); return d.toISOString();
};
const tinyPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

before(async () => {
  const h = await fetch(`${BASE}/api/health`).then((r) => r.json()).catch(() => null);
  assert.ok(h?.ok, `server not reachable at ${BASE}`);
  const s = await login(owner, 'demo@dawra.app');
  ctx.companyId = s.company.id;
  ctx.ownerId = s.user.id;
  await login(disp, 'dispatch@naseem.demo');
  const t = await login(tech, 'ahmed@naseem.demo');
  ctx.techId = t.user.id;
  const iq = await owner.get('/users?role=technician');
  ctx.otherTechId = iq.body.items.find((u) => u.email === 'iqbal@naseem.demo').id;
  const sv = await owner.get('/services?active=true');
  ctx.service = sv.body.items[0];
  const r = await other.post('/auth/signup', {
    company_name: `Other Co ${TAG}`, name: 'Other Owner', email: `${TAG.toLowerCase()}@other.test`, password: 'Other1234!',
  });
  assert.equal(r.status, 201, JSON.stringify(r.body));
  ctx.otherCompanyId = r.body.company.id;
});

after(async () => {
  try {
    const cid = ctx.companyId;
    await pool.query(`DELETE FROM invoices WHERE company_id = $1 AND customer_id IN (SELECT id FROM customers WHERE company_id = $1 AND name LIKE $2)`, [cid, `%${TAG}%`]);
    await pool.query(`DELETE FROM jobs WHERE company_id = $1 AND customer_id IN (SELECT id FROM customers WHERE company_id = $1 AND name LIKE $2)`, [cid, `%${TAG}%`]);
    await pool.query(`DELETE FROM booking_requests WHERE company_id = $1 AND name LIKE $2`, [cid, `%${TAG}%`]);
    await pool.query(`DELETE FROM contracts WHERE company_id = $1 AND title LIKE $2`, [cid, `%${TAG}%`]);
    await pool.query(`DELETE FROM customers WHERE company_id = $1 AND name LIKE $2`, [cid, `%${TAG}%`]);
    await pool.query(`DELETE FROM services WHERE company_id = $1 AND name LIKE $2`, [cid, `%${TAG}%`]);
    await pool.query(`DELETE FROM users WHERE company_id = $1 AND email LIKE $2`, [cid, `%${TAG.toLowerCase()}%`]);
    if (ctx.otherCompanyId) {
      await pool.query('DELETE FROM jobs WHERE company_id = $1', [ctx.otherCompanyId]);
      await pool.query('DELETE FROM users WHERE company_id = $1', [ctx.otherCompanyId]);
      await pool.query('DELETE FROM companies WHERE id = $1', [ctx.otherCompanyId]);
    }
  } finally {
    await pool.end();
  }
});

describe('auth & company', () => {
  test('GET /auth/me and PATCH /auth/me', async () => {
    const r = await tech.get('/auth/me');
    assert.equal(r.status, 200);
    assert.equal(r.body.user.role, 'technician');
    const p = await tech.patch('/auth/me', { locale: 'en' });
    assert.equal(p.body.user.locale, 'en');
    await tech.patch('/auth/me', { locale: 'ar' });
    const bad = await tech.patch('/auth/me', { password: 'NewPass123!', current_password: 'wrong' });
    assert.equal(bad.status, 400);
  });

  test('anonymous is 401', async () => {
    const r = await client().get('/jobs');
    assert.equal(r.status, 401);
  });

  test('GET /companies/me has limits/usage', async () => {
    const r = await owner.get('/companies/me');
    assert.equal(r.status, 200);
    assert.equal(r.body.slug, 'naseem');
    assert.equal(r.body.booking_url, '/b/naseem');
    assert.equal(typeof r.body.limits.technicians, 'number');
    assert.ok(r.body.usage.technicians >= 4);
  });

  test('PATCH /companies/me validation and role', async () => {
    let r = await owner.patch('/companies/me', { vat_number: '123456789012345' });
    assert.equal(r.status, 400);
    r = await owner.patch('/companies/me', { vat_number: '31045678900000' }); // 14 digits
    assert.equal(r.status, 400);
    r = await owner.patch('/companies/me', { logo_url: `data:image/png;base64,${'A'.repeat(320 * 1024)}` });
    assert.equal(r.status, 413);
    r = await owner.patch('/companies/me', { slug: 'Bad Slug!' });
    assert.equal(r.status, 400);
    r = await owner.get('/auth/me');
    const otherSlug = (await other.get('/companies/me')).body.slug;
    r = await owner.patch('/companies/me', { slug: otherSlug });
    assert.equal(r.status, 409);
    r = await owner.patch('/companies/me', { vat_number: '310456789000003', city: 'الرياض' });
    assert.equal(r.status, 200);
    assert.equal(r.body.vat_number, '310456789000003');
    r = await disp.patch('/companies/me', { city: 'جدة' });
    assert.equal(r.status, 403);
    r = await tech.patch('/companies/me', { city: 'جدة' });
    assert.equal(r.status, 403);
  });
});

describe('users & plan limits', () => {
  test('owner invites a technician with temp password; tech cannot list users', async () => {
    const r = await owner.post('/users', { name: 'فني اختبار', email: `tech1.${TAG.toLowerCase()}@naseem.demo`, role: 'technician', skills: ['split_ac'] });
    assert.equal(r.status, 201, JSON.stringify(r.body));
    assert.ok(r.body.temp_password);
    assert.ok(!('password_hash' in r.body));
    assert.match(r.body.color, /^#/);
    ctx.newTechId = r.body.id;
    const t = client();
    const lr = await t.post('/auth/login', { email: `tech1.${TAG.toLowerCase()}@naseem.demo`, password: r.body.temp_password });
    assert.equal(lr.status, 200);
    assert.equal((await tech.get('/users')).status, 403);
    assert.equal((await disp.post('/users', { name: 'x y', email: `x.${TAG.toLowerCase()}@a.test`, role: 'technician' })).status, 403);
    const dup = await owner.post('/users', { name: 'dup', email: 'ahmed@naseem.demo', role: 'technician', password: 'Abcdefgh1' });
    assert.equal(dup.status, 409);
  });

  test('owner updates and deactivates; cannot deactivate self', async () => {
    let r = await owner.patch(`/users/${ctx.newTechId}`, { color: '#123456', skills: ['central_ac'] });
    assert.equal(r.status, 200);
    assert.deepEqual(r.body.skills, ['central_ac']);
    r = await owner.patch(`/users/${ctx.ownerId}`, { active: false });
    assert.equal(r.status, 400);
    r = await owner.del(`/users/${ctx.newTechId}`);
    assert.deepEqual(r.body, { ok: true });
    r = await owner.get('/users?active=false');
    assert.ok(r.body.items.some((u) => u.id === ctx.newTechId));
  });

  test('PLAN_LIMIT on starter plan (3 technicians)', async () => {
    await pool.query(`UPDATE companies SET plan = 'starter' WHERE id = $1`, [ctx.otherCompanyId]);
    for (let i = 0; i < 3; i++) {
      const r = await other.post('/users', { name: `Tech ${i}`, email: `t${i}.${TAG.toLowerCase()}@other.test`, role: 'technician', password: 'Passw0rd!' });
      assert.equal(r.status, 201, JSON.stringify(r.body));
    }
    const r = await other.post('/users', { name: 'Tech 4', email: `t4.${TAG.toLowerCase()}@other.test`, role: 'technician', password: 'Passw0rd!' });
    assert.equal(r.status, 402);
    assert.equal(r.body.error.code, 'plan_limit');
    assert.equal(r.body.error.details[0].code, 'PLAN_LIMIT');
    // dispatcher is not limited
    const d = await other.post('/users', { name: 'Disp', email: `d.${TAG.toLowerCase()}@other.test`, role: 'dispatcher', password: 'Passw0rd!' });
    assert.equal(d.status, 201);
    // promoting a dispatcher to technician also hits the limit
    const p = await other.patch(`/users/${d.body.id}`, { role: 'technician' });
    assert.equal(p.status, 402);
  });
});

describe('services', () => {
  test('CRUD + soft delete', async () => {
    let r = await disp.post('/services', { name: `Svc ${TAG}`, name_ar: 'خدمة', category: 'repair', price: 99.999, duration_min: 30 });
    assert.equal(r.status, 201);
    assert.equal(r.body.price, 100);
    const id = r.body.id;
    r = await disp.patch(`/services/${id}`, { price: 120 });
    assert.equal(r.body.price, 120);
    assert.equal((await tech.post('/services', { name: 'x', price: 1 })).status, 403);
    assert.equal((await disp.del(`/services/${id}`)).status, 403);
    r = await owner.del(`/services/${id}`);
    assert.equal(r.status, 200);
    r = await tech.get('/services?active=true');
    assert.ok(!r.body.items.some((s) => s.id === id));
    assert.equal((await other.patch(`/services/${id}`, { price: 1 })).status, 404);
  });
});

describe('customers, sites, assets', () => {
  test('create with site, list, search by phone, detail', async () => {
    let r = await disp.post('/customers', {
      name: `عميل ${TAG}`, phone: '0551234987', type: 'individual',
      site: { label: 'المنزل', city: 'الرياض', district: 'الملقا', lat: 24.8, lng: 46.6 },
    });
    assert.equal(r.status, 201, JSON.stringify(r.body));
    assert.equal(r.body.phone, '966551234987');
    assert.equal(r.body.sites.length, 1);
    ctx.customerId = r.body.id;
    ctx.siteId = r.body.sites[0].id;
    r = await disp.get('/customers?q=0551234987');
    assert.ok(r.body.items.some((c) => c.id === ctx.customerId));
    assert.ok('balance_due' in r.body.items[0]);
    r = await disp.post('/assets', { site_id: ctx.siteId, kind: 'split_ac', brand: 'Gree', capacity_btu: 18000, install_date: '2023-05-01' });
    assert.equal(r.status, 201);
    ctx.assetId = r.body.id;
    r = await disp.post('/sites', { customer_id: ctx.customerId, label: 'الاستراحة', city: 'الرياض' });
    assert.equal(r.status, 201);
    ctx.site2 = r.body.id;
    r = await disp.get(`/customers/${ctx.customerId}`);
    assert.equal(r.status, 200);
    assert.equal(r.body.sites.length, 2);
    assert.equal(r.body.sites.find((s) => s.id === ctx.siteId).assets[0].id, ctx.assetId);
    assert.ok(Array.isArray(r.body.jobs) && Array.isArray(r.body.invoices) && Array.isArray(r.body.contracts));
    r = await disp.patch(`/sites/${ctx.site2}`, { district: 'حطين' });
    assert.equal(r.body.district, 'حطين');
    r = await disp.del(`/sites/${ctx.site2}`);
    assert.equal(r.status, 200);
  });

  test('invalid customer body → 400; technician → 403; other tenant → 404', async () => {
    assert.equal((await disp.post('/customers', { name: '' })).status, 400);
    assert.equal((await tech.get('/customers')).status, 403);
    assert.equal((await other.get(`/customers/${ctx.customerId}`)).status, 404);
    assert.equal((await other.patch(`/customers/${ctx.customerId}`, { name: 'hack' })).status, 404);
    assert.equal((await other.post('/sites', { customer_id: ctx.customerId })).status, 400);
    const r = await other.get(`/sites?customer_id=${ctx.customerId}`);
    assert.equal(r.body.items.length, 0);
  });
});

describe('jobs lifecycle', () => {
  test('create scheduled job with items → auto number, end from durations, events', async () => {
    // max(number) straight from the DB: list order is by created_at, which needn't track number
    const maxBefore = (await pool.query('SELECT COALESCE(MAX(number),0) AS n FROM jobs WHERE company_id = (SELECT company_id FROM customers WHERE id = $1)', [ctx.customerId])).rows[0].n;
    const start = isoIn(3, 10);
    const r = await disp.post('/jobs', {
      customer_id: ctx.customerId, site_id: ctx.siteId, asset_id: ctx.assetId, title: `مكيف لا يبرد ${TAG}`,
      priority: 'urgent', category: 'repair', technician_id: ctx.techId, scheduled_start: start,
      items: [{ service_id: ctx.service.id, qty: 2 }, { description: 'قطعة غيار', qty: 1, unit_price: 50 }],
      checklist: [{ label: 'فحص', done: false }],
    });
    assert.equal(r.status, 201, JSON.stringify(r.body));
    assert.equal(r.body.status, 'scheduled');
    assert.equal(r.body.number, Number(maxBefore) + 1);
    assert.equal(r.body.total, ctx.service.price * 2 + 50);
    assert.equal(new Date(r.body.scheduled_end) - new Date(start), ctx.service.duration_min * 2 * 60000);
    assert.equal(r.body.technician.id, ctx.techId);
    assert.ok(r.body.events.some((e) => e.type === 'created'));
    assert.ok(r.body.events.some((e) => e.type === 'assigned'));
    assert.match(r.body.tracking_url, /\/t\/[0-9a-f]{32}$/);
    ctx.jobId = r.body.id;
    ctx.jobStart = start;
  });

  test('unscheduled job is new; cross-tenant refs rejected', async () => {
    let r = await disp.post('/jobs', { customer_id: ctx.customerId, title: `بدون موعد ${TAG}` });
    assert.equal(r.status, 201);
    assert.equal(r.body.status, 'new');
    ctx.newJobId = r.body.id;
    r = await other.post('/jobs', { customer_id: ctx.customerId, title: 'x' });
    assert.equal(r.status, 400);
    assert.equal(r.body.error.code, 'bad_reference');
    r = await tech.post('/jobs', { customer_id: ctx.customerId, title: 'x' });
    assert.equal(r.status, 403);
  });

  test('list filters, search, dispatch range', async () => {
    let r = await disp.get(`/jobs?q=${encodeURIComponent(TAG)}`);
    assert.equal(r.body.total, 2);
    r = await disp.get(`/jobs?status=new&unassigned=true&customer_id=${ctx.customerId}`);
    assert.deepEqual(r.body.items.map((j) => j.id), [ctx.newJobId]);
    const from = isoIn(3, 0); const to = isoIn(4, 0);
    r = await disp.get(`/jobs?from=${from}&to=${to}&technician_id=${ctx.techId}&status=scheduled`);
    assert.ok(r.body.items.some((j) => j.id === ctx.jobId));
    r = await disp.get('/jobs?status=bogus');
    assert.equal(r.status, 400);
    r = await disp.get('/jobs?limit=5&offset=0');
    assert.equal(r.body.limit, 5);
    assert.ok(r.body.items.length <= 5 && r.body.total > 5);
  });

  test('technician sees only own jobs', async () => {
    let r = await tech.get('/jobs?limit=200');
    assert.equal(r.status, 200);
    assert.ok(r.body.items.length > 0);
    assert.ok(r.body.items.every((j) => j.technician?.id === ctx.techId));
    r = await tech.get(`/jobs?technician_id=${ctx.otherTechId}`);
    assert.ok(r.body.items.every((j) => j.technician?.id === ctx.techId));
    r = await tech.get(`/jobs/${ctx.newJobId}`); // unassigned → 404
    assert.equal(r.status, 404);
    r = await tech.get(`/jobs/${ctx.jobId}`);
    assert.equal(r.status, 200);
  });

  test('reschedule with conflict warning', async () => {
    const r1 = await disp.post('/jobs', {
      customer_id: ctx.customerId, title: `تعارض ${TAG}`, technician_id: ctx.otherTechId,
      scheduled_start: isoIn(5, 10), scheduled_end: isoIn(5, 12),
    });
    assert.equal(r1.status, 201);
    ctx.conflictJob = r1.body.id;
    // move our job onto the other tech at an overlapping time
    let r = await disp.patch(`/jobs/${ctx.jobId}/schedule`, {
      technician_id: ctx.otherTechId, scheduled_start: isoIn(5, 11), scheduled_end: isoIn(5, 13),
    });
    assert.equal(r.status, 200, JSON.stringify(r.body));
    assert.equal(r.body.warnings.length, 1);
    assert.equal(r.body.warnings[0].code, 'technician_conflict');
    assert.equal(r.body.warnings[0].job.id, ctx.conflictJob);
    assert.ok(r.body.events.some((e) => e.type === 'rescheduled'));
    // move back to Ahmed — no conflict
    r = await disp.patch(`/jobs/${ctx.jobId}`, { technician_id: ctx.techId, scheduled_start: ctx.jobStart });
    assert.equal(r.status, 200);
    assert.deepEqual(r.body.warnings, []);
    assert.equal(r.body.technician.id, ctx.techId);
    r = await disp.patch(`/jobs/${ctx.jobId}`, { scheduled_start: ctx.jobStart, scheduled_end: isoIn(2) });
    assert.equal(r.status, 400); // end before start
  });

  test('assign new job → becomes scheduled once time set', async () => {
    let r = await disp.post(`/jobs/${ctx.newJobId}/assign`, { technician_id: ctx.techId });
    assert.equal(r.body.status, 'new');
    r = await disp.patch(`/jobs/${ctx.newJobId}`, { scheduled_start: isoIn(6, 9) });
    assert.equal(r.body.status, 'scheduled');
    r = await disp.post(`/jobs/${ctx.newJobId}/assign`, { technician_id: null });
    assert.equal(r.body.status, 'new');
  });

  test('status transitions: technician path + restrictions', async () => {
    let r = await tech.post(`/jobs/${ctx.jobId}/status`, { status: 'completed' });
    assert.equal(r.status, 409); // scheduled → completed not allowed
    r = await tech.post(`/jobs/${ctx.jobId}/status`, { status: 'cancelled' });
    assert.ok([403, 409].includes(r.status));
    r = await tech.put(`/jobs/${ctx.jobId}/items`, { items: [] });
    assert.equal(r.status, 409); // only while in progress
    r = await tech.post(`/jobs/${ctx.jobId}/status`, { status: 'on_the_way' });
    assert.equal(r.status, 200, JSON.stringify(r.body));
    assert.equal(r.body.status, 'on_the_way');
    r = await tech.post(`/jobs/${ctx.jobId}/status`, { status: 'scheduled' });
    assert.equal(r.status, 403); // techs move forward only
    r = await tech.post(`/jobs/${ctx.jobId}/status`, { status: 'in_progress', note: 'وصلت' });
    assert.equal(r.body.status, 'in_progress');
    // other company's tech/owner cannot touch it
    r = await other.post(`/jobs/${ctx.jobId}/status`, { status: 'completed' });
    assert.equal(r.status, 404);
  });

  test('technician: checklist, items, photos, signature, notes', async () => {
    let r = await tech.patch(`/jobs/${ctx.jobId}/checklist`, { checklist: [{ label: 'فحص', done: true }, { label: 'تنظيف', done: true }] });
    assert.equal(r.status, 200);
    assert.equal(r.body.checklist.length, 2);
    r = await tech.put(`/jobs/${ctx.jobId}/items`, { items: [{ service_id: ctx.service.id, qty: 1 }, { description: 'فريون', qty: 2, unit_price: 75.5 }] });
    assert.equal(r.status, 200, JSON.stringify(r.body));
    assert.equal(r.body.items.length, 2);
    assert.equal(r.body.total, ctx.service.price + 151);
    r = await tech.post(`/jobs/${ctx.jobId}/photos`, { kind: 'before', data_url: tinyPng });
    assert.equal(r.status, 201);
    ctx.photoId = r.body.id;
    r = await tech.post(`/jobs/${ctx.jobId}/photos`, { kind: 'after', data_url: 'data:text/plain;base64,AAAA' });
    assert.equal(r.status, 400);
    r = await tech.post(`/jobs/${ctx.jobId}/photos`, { kind: 'after', data_url: `data:image/jpeg;base64,${'A'.repeat(1.6 * 1024 * 1024)}` });
    assert.equal(r.status, 413);
    r = await tech.post(`/jobs/${ctx.jobId}/signature`, { data_url: tinyPng });
    assert.deepEqual(r.body, { ok: true });
    r = await tech.post(`/jobs/${ctx.jobId}/notes`, { message: 'تم تغيير الفلتر' });
    assert.equal(r.status, 201);
    assert.equal(r.body.type, 'note');
    r = await tech.get(`/jobs/${ctx.jobId}/events`);
    const types = r.body.items.map((e) => e.type);
    for (const t of ['created', 'assigned', 'rescheduled', 'status_changed', 'photo', 'signature', 'note']) assert.ok(types.includes(t), t);
    // technician cannot edit a job assigned to someone else
    r = await tech.patch(`/jobs/${ctx.conflictJob}/checklist`, { checklist: [] });
    assert.equal(r.status, 404);
    r = await tech.patch(`/jobs/${ctx.jobId}`, { title: 'x' });
    assert.equal(r.status, 403);
  });

  test('complete sets completed_at; detail has photos/signature', async () => {
    let r = await tech.post(`/jobs/${ctx.jobId}/status`, { status: 'completed' });
    assert.equal(r.status, 200);
    assert.equal(r.body.status, 'completed');
    assert.ok(r.body.completed_at);
    assert.equal(r.body.photos.length, 1);
    assert.ok(r.body.customer_signature.startsWith('data:image/png'));
    r = await tech.post(`/jobs/${ctx.jobId}/status`, { status: 'in_progress' });
    assert.equal(r.status, 403);
    r = await disp.post(`/jobs/${ctx.jobId}/status`, { status: 'in_progress' });
    assert.equal(r.status, 200);
    assert.equal(r.body.completed_at, null);
    r = await disp.post(`/jobs/${ctx.jobId}/status`, { status: 'completed' });
    assert.equal(r.body.status, 'completed');
    r = await tech.del(`/jobs/${ctx.jobId}/photos/${ctx.photoId}`);
    assert.equal(r.status, 200);
  });

  test('delete rules', async () => {
    assert.equal((await disp.del(`/jobs/${ctx.newJobId}`)).status, 403);
    assert.equal((await owner.del(`/jobs/${ctx.jobId}`)).status, 409); // completed
    assert.equal((await other.del(`/jobs/${ctx.newJobId}`)).status, 404);
    assert.equal((await owner.del(`/jobs/${ctx.newJobId}`)).status, 200);
    assert.equal((await owner.get(`/jobs/${ctx.newJobId}`)).status, 404);
  });

  test('customer detail shows job history', async () => {
    const r = await owner.get(`/customers/${ctx.customerId}`);
    assert.ok(r.body.jobs.some((j) => j.id === ctx.jobId));
    assert.equal((await owner.del(`/customers/${ctx.customerId}`)).status, 409);
  });
});

describe('cross-tenant isolation', () => {
  test("second company can't read the demo company's job", async () => {
    const r = await other.get(`/jobs/${ctx.jobId}`);
    assert.equal(r.status, 404);
    const l = await other.get('/jobs?limit=200');
    assert.equal(l.status, 200);
    assert.ok(!l.body.items.some((j) => j.id === ctx.jobId));
    assert.equal((await other.patch(`/jobs/${ctx.jobId}`, { title: 'hack' })).status, 404);
    assert.equal((await other.put(`/jobs/${ctx.jobId}/items`, { items: [] })).status, 404);
    assert.equal((await other.post(`/jobs/${ctx.jobId}/notes`, { message: 'x' })).status, 404);
    assert.equal((await other.get(`/jobs/${ctx.jobId}/events`)).status, 404);
    assert.equal((await other.patch(`/users/${ctx.techId}`, { active: false })).status, 404);
    const d = await other.get('/dashboard/summary');
    assert.equal(d.body.jobs_by_status.completed, 0);
  });
});

describe('contracts', () => {
  test('CRUD + generate visits', async () => {
    const today = new Date().toISOString().slice(0, 10);
    const end = new Date(Date.now() + 364 * 86400000).toISOString().slice(0, 10);
    let r = await disp.post('/contracts', {
      customer_id: ctx.customerId, site_id: ctx.siteId, title: `عقد ${TAG}`, start_date: today, end_date: end,
      visits_per_year: 4, price: 2400,
    });
    assert.equal(r.status, 201, JSON.stringify(r.body));
    assert.equal(r.body.next_visit_date, today);
    assert.equal(r.body.customer.id, ctx.customerId);
    ctx.contractId = r.body.id;
    r = await disp.post('/contracts', { customer_id: ctx.customerId, title: 'x', start_date: end, end_date: today, visits_per_year: 4, price: 1 });
    assert.equal(r.status, 400);
    r = await disp.get(`/contracts?customer_id=${ctx.customerId}`);
    assert.equal(r.body.total, 1);
    r = await disp.post(`/contracts/${ctx.contractId}/generate-visits`, { technician_id: ctx.techId, time: '08:00' });
    assert.equal(r.status, 201, JSON.stringify(r.body));
    assert.equal(r.body.created, 4);
    assert.ok(r.body.jobs.every((j) => j.source === 'contract' && j.status === 'scheduled'));
    const days = r.body.jobs.map((j) => new Date(j.scheduled_start).getTime());
    const gap = (days[1] - days[0]) / 86400000;
    assert.ok(gap >= 90 && gap <= 92, `gap ${gap}`);
    // idempotent re-run after resetting next_visit_date
    await disp.patch(`/contracts/${ctx.contractId}`, { next_visit_date: today });
    r = await disp.post(`/contracts/${ctx.contractId}/generate-visits`, {});
    assert.equal(r.body.created, 0);
    assert.equal(r.body.skipped.length, 4);
    r = await disp.get(`/contracts/${ctx.contractId}`);
    assert.equal(r.body.jobs.length, 4);
    assert.equal(r.body.visits_open, 4);
    assert.equal((await other.get(`/contracts/${ctx.contractId}`)).status, 404);
    assert.equal((await tech.get('/contracts')).status, 403);
    r = await owner.del(`/contracts/${ctx.contractId}`);
    assert.equal(r.status, 200);
    r = await disp.post(`/contracts/${ctx.contractId}/generate-visits`, {});
    assert.equal(r.status, 409);
  });
});

describe('booking requests', () => {
  test('convert creates customer + site + job; reject', async () => {
    const { rows } = await pool.query(
      `INSERT INTO booking_requests (company_id, name, phone, city, district, category, description, ai_triage)
       VALUES ($1,$2,'0559990001','الرياض','النرجس','ac','المكيف يسرب ماء',$3),
              ($1,$4,'0559990002','الرياض','حطين','ac','غسيل',NULL) RETURNING id`,
      [ctx.companyId, `حجز ${TAG}`, JSON.stringify({ title: 'تسريب ماء', priority: 'urgent', suggested_services: [ctx.service.name_ar] }), `حجز2 ${TAG}`]);
    let r = await disp.post(`/booking-requests/${rows[0].id}/convert`, { technician_id: ctx.techId, scheduled_start: isoIn(8, 9) });
    assert.equal(r.status, 201, JSON.stringify(r.body));
    assert.equal(r.body.source, 'portal');
    assert.equal(r.body.priority, 'urgent');
    assert.equal(r.body.status, 'scheduled');
    assert.equal(r.body.customer.phone, '966559990001');
    assert.equal(r.body.site.district, 'النرجس');
    assert.equal(r.body.items.length, 1);
    r = await disp.post(`/booking-requests/${rows[0].id}/convert`, {});
    assert.equal(r.status, 409);
    r = await disp.get('/booking-requests?status=converted');
    assert.ok(r.body.items.some((b) => b.id === rows[0].id && b.job_id));
    assert.equal((await other.post(`/booking-requests/${rows[1].id}/reject`)).status, 404);
    r = await disp.post(`/booking-requests/${rows[1].id}/reject`);
    assert.deepEqual(r.body, { ok: true });
    assert.equal((await tech.get('/booking-requests')).status, 403);
  });
});

describe('dashboard', () => {
  test('summary KPIs', async () => {
    const r = await owner.get('/dashboard/summary');
    assert.equal(r.status, 200);
    const b = r.body;
    for (const k of ['total', 'completed', 'in_progress', 'unassigned']) assert.equal(typeof b.today[k], 'number');
    for (const k of ['month', 'last_month', 'unpaid_total', 'unpaid_count']) assert.equal(typeof b.revenue[k], 'number');
    assert.equal(b.trend.length, 14);
    assert.ok(Array.isArray(b.top_technicians) && b.top_technicians.length > 0);
    assert.ok(Array.isArray(b.upcoming_contract_visits));
    assert.equal(typeof b.completed_this_week, 'number');
    assert.ok(b.first_time_fix && 'rate' in b.first_time_fix);
    assert.ok(Array.isArray(b.technicians));
    assert.equal((await tech.get('/dashboard/summary')).status, 403);
  });

  test('schedule board', async () => {
    const r = await disp.get('/dashboard/schedule?days=7');
    assert.equal(r.status, 200);
    assert.ok(r.body.technicians.length >= 4);
    assert.ok(Array.isArray(r.body.jobs) && Array.isArray(r.body.unassigned));
    assert.ok(r.body.jobs.every((j) => j.status !== 'cancelled'));
  });

  test('audit log records sensitive actions', async () => {
    const { rows } = await pool.query(
      `SELECT action FROM audit_log WHERE company_id = $1 AND created_at > now() - interval '10 minutes'`, [ctx.companyId]);
    const acts = rows.map((r) => r.action);
    assert.ok(acts.some((a) => a.startsWith('create:technician')));
    assert.ok(acts.includes('deactivate'));
    assert.ok(acts.some((a) => a.startsWith('status:')));
  });
});
