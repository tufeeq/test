// B5 tests: AI triage fallback, phone normalisation, notify logging, scheduler idempotency.
// Run: node --test server/tests/ai_notify.test.mjs
// Uses TEST_DATABASE_URL (default postgres://dawra:dawra@localhost:5432/dawra_test). Creates its own company and deletes it after.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';

process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || 'postgres://dawra:dawra@localhost:5432/dawra_test';
process.env.NODE_ENV = 'test';
delete process.env.ANTHROPIC_API_KEY;   // force the deterministic engine
delete process.env.WHATSAPP_TOKEN;      // force 'simulated'
delete process.env.WHATSAPP_PHONE_NUMBER_ID;

const { pool, one, many } = await import('../lib/db.js');
const { migrate } = await import('../db/migrate.js');
const ai = await import('../lib/ai.js');
const notifyLib = await import('../lib/notify.js');
const scheduler = await import('../lib/scheduler.js');

const SLUG = `b5-test-${process.pid}-${Date.now().toString(36)}`;
let company, customer;

before(async () => {
  await migrate({ log: () => {} });
  company = await one(
    `INSERT INTO companies (slug, name, name_ar, phone, plan, subscription_status) VALUES ($1,'B5 Test Co','شركة اختبار','0501112222','pro','active') RETURNING *`,
    [SLUG]
  );
  customer = await one(
    `INSERT INTO customers (company_id, name, phone) VALUES ($1,'فهد العتيبي','0551234567') RETURNING *`,
    [company.id]
  );
});

after(async () => {
  if (company) {
    await pool.query('DELETE FROM jobs WHERE company_id = $1', [company.id]);
    await pool.query('DELETE FROM companies WHERE slug LIKE $1', [`${SLUG}%`]);
  }
  await pool.end();
});

// ───────────── triage ─────────────
const CASES = [
  ['السلام عليكم المكيف اللي بالصالة يطلع ماء ويطفي لحاله', 'ac', null, /تصريف|تسريب ماء/],
  ['المكيف شغال بس ما يبرد يطلع هوا حار، وعندي طفل رضيع ضروري اليوم', 'ac', 'urgent', /لا يبرد/],
  ['الوحدة الخارجية تصفر وتطقطق صوت مزعج بالليل', 'ac', null, /صوت/],
  ['فيه ريحة عفن تطلع من المكيف لما اشغله', 'ac', null, /رائحة/],
  ['ابي غسيل ٣ مكيفات سبليت قبل الصيف مو مستعجل', 'ac', 'low', /غسيل/],
  ['عندنا صراصير بالمطبخ وايد الله يعافيكم', 'pest', null, /صراصير/],
  ['تسريب موية من السقف في الحمام اللي فوق', 'plumbing', 'urgent', /تسريب/],
  ['الفيش في المطبخ يطلع شرار وريحة احتراق', 'electrical', 'urgent', /كهربائي/],
];

for (const [text, cat, urgency, titleRe] of CASES) {
  test(`triage fallback: ${text.slice(0, 32)}…`, async () => {
    const r = await ai.triage({ text });
    assert.equal(r.source, 'keywords');
    assert.equal(r.category, cat);
    if (urgency) assert.equal(r.urgency, urgency);
    assert.equal(r.priority, r.urgency);
    assert.match(r.title, titleRe);
    assert.ok(Array.isArray(r.price_range_sar) && r.price_range_sar.length === 2);
    assert.ok(r.price_range_sar[0] > 0 && r.price_range_sar[0] <= r.price_range_sar[1]);
    assert.ok(r.questions_ar.length >= 1);
    assert.ok(r.likely_issue_ar && r.likely_issue_en);
    assert.ok(r.confidence > 0 && r.confidence <= 1);
  });
}

test('triage: per-unit pricing for "3 مكيفات"', async () => {
  const r = await ai.triage({ text: 'ابي غسيل ٣ مكيفات سبليت', services: [{ name_ar: 'غسيل مكيف سبليت', price: 150 }] });
  assert.equal(r.units, 3);
  assert.deepEqual(r.suggested_services, ['غسيل مكيف سبليت']);
  assert.ok(r.price_range_sar[0] >= 300);
});

test('triage never throws on junk input', async () => {
  for (const text of ['', null, undefined, '🙂🙂', 'x'.repeat(10000), { a: 1 }]) {
    const r = await ai.triage({ text });
    assert.ok(ai.CATEGORIES.includes(r.category));
  }
});

test('triage falls back when the Anthropic call fails', async () => {
  process.env.ANTHROPIC_API_KEY = 'sk-test-invalid';
  const realFetch = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error('network down'); };
  try {
    const r = await ai.triage({ text: 'المكيف يقطر ماء' });
    assert.equal(r.source, 'keywords');
    assert.equal(r.category, 'ac');
  } finally {
    globalThis.fetch = realFetch;
    delete process.env.ANTHROPIC_API_KEY;
  }
});

test('triage uses a valid Anthropic JSON reply', async () => {
  process.env.ANTHROPIC_API_KEY = 'sk-test';
  const realFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    assert.equal(url, 'https://api.anthropic.com/v1/messages');
    assert.equal(init.headers['anthropic-version'], '2023-06-01');
    return new Response(JSON.stringify({ content: [{ type: 'text', text: JSON.stringify({
      category: 'ac', urgency: 'normal', title: 'مكيف لا يبرد', likely_issue_ar: 'نقص فريون', likely_issue_en: 'Low gas',
      suggested_services: ['تعبئة فريون سبليت', 'خدمة وهمية'], suggested_parts: ['فريون'], price_range_sar: [200, 350],
      questions_ar: ['متى آخر تعبئة؟'], duration_min: 45, confidence: 0.8 }) }] }), { status: 200, headers: { 'content-type': 'application/json' } });
  };
  try {
    const r = await ai.triage({ text: 'ما يبرد', services: [{ name_ar: 'تعبئة فريون سبليت', price: 250 }] });
    assert.equal(r.source, 'anthropic');
    assert.deepEqual(r.suggested_services, ['تعبئة فريون سبليت']); // invented name dropped
  } finally {
    globalThis.fetch = realFetch;
    delete process.env.ANTHROPIC_API_KEY;
  }
});

// ───────────── phones ─────────────
test('normalizePhone → Saudi E.164 without plus', () => {
  const n = notifyLib.normalizePhone;
  assert.equal(n('0551234567'), '966551234567');
  assert.equal(n('055 123 4567'), '966551234567');
  assert.equal(n('551234567'), '966551234567');
  assert.equal(n('+966 55 123 4567'), '966551234567');
  assert.equal(n('00966551234567'), '966551234567');
  assert.equal(n('+966 0551234567'), '966551234567');
  assert.equal(n('٠٥٥١٢٣٤٥٦٧'), '966551234567');
  assert.equal(n('0114567890'), '966114567890');
  assert.equal(n('+971501234567'), '971501234567');
  assert.equal(n('123'), null);
  assert.equal(n(''), null);
  assert.equal(n(null), null);
});

test('renderTemplate fills positional params and strips newlines', () => {
  const s = notifyLib.renderTemplate('job_scheduled', ['فهد', 'غسيل\nمكيف', 'الأحد', '10:00', 'https://x/t/1', 'النسيم']);
  assert.match(s, /مرحباً فهد/);
  assert.match(s, /«غسيل مكيف»/);
  assert.ok(!s.includes('{{'));
});

// ───────────── notify ─────────────
test('notify (simulated) writes a messages row and never throws', async () => {
  const m = await notifyLib.notify({ companyId: company.id, customerId: customer.id, to: '0551234567', body: 'مرحبا' });
  assert.equal(m.status, 'simulated');
  assert.equal(m.to_addr, '966551234567');
  const row = await one('SELECT * FROM messages WHERE id = $1 AND company_id = $2', [m.id, company.id]);
  assert.equal(row.body, 'مرحبا');

  const bad = await notifyLib.notify({ companyId: company.id, to: 'abc', body: 'x' });
  assert.equal(bad.status, 'failed');
  assert.equal(await notifyLib.notify({}), null); // missing company → null, no throw
});

test('notify with WhatsApp configured posts a template and records failure', async () => {
  process.env.WHATSAPP_TOKEN = 't'; process.env.WHATSAPP_PHONE_NUMBER_ID = '123';
  const realFetch = globalThis.fetch;
  let payload;
  globalThis.fetch = async (url, init) => {
    assert.match(url, /graph\.facebook\.com\/v23\.0\/123\/messages/);
    payload = JSON.parse(init.body);
    return new Response(JSON.stringify({ error: { message: 'Template not approved' } }), { status: 400, headers: { 'content-type': 'application/json' } });
  };
  try {
    const m = await notifyLib.notify({ companyId: company.id, to: '0551234567', template: 'job_completed_rating', params: ['فهد', 'غسيل', 'النسيم', 'https://x'] });
    assert.equal(payload.type, 'template');
    assert.equal(payload.template.language.code, 'ar');
    assert.equal(payload.template.components[0].parameters.length, 4);
    assert.equal(m.status, 'failed');
    assert.match(m.error, /Template not approved/);
  } finally {
    globalThis.fetch = realFetch;
    delete process.env.WHATSAPP_TOKEN; delete process.env.WHATSAPP_PHONE_NUMBER_ID;
  }
});

test('notifyJobEvent builds the Arabic template and dedupes', async () => {
  const job = await one(
    `INSERT INTO jobs (company_id, number, customer_id, title, status, scheduled_start) VALUES ($1, 9001, $2, 'غسيل مكيف', 'scheduled', now() + interval '2 days') RETURNING *`,
    [company.id, customer.id]
  );
  const m = await notifyLib.notifyJobEvent(job.id, 'job_scheduled');
  assert.equal(m.template, 'job_scheduled');
  assert.match(m.body, /تم تأكيد موعد «غسيل مكيف»/);
  assert.match(m.body, new RegExp(`/t/${job.public_token}`));
  assert.equal(await notifyLib.notifyJobEvent(job.id, 'job_scheduled'), null); // duplicate within 10 min
  const ev = await many(`SELECT * FROM job_events WHERE job_id = $1 AND type = 'message'`, [job.id]);
  assert.equal(ev.length, 1);
  assert.equal(await notifyLib.notifyJobEvent(job.id, 'nonsense'), null);
});

// ───────────── scheduler ─────────────
test('scheduler runOnce: creates contract visit once, advances date, expires, idempotent', async () => {
  const today = (await one(`SELECT (now() AT TIME ZONE 'Asia/Riyadh')::date::text AS d`)).d;
  const addDays = scheduler.addDays;
  const due = await one(
    `INSERT INTO contracts (company_id, customer_id, title, start_date, end_date, visits_per_year, price, next_visit_date)
     VALUES ($1,$2,'عقد اختبار',$3,$4,4,1200,$5) RETURNING *`,
    [company.id, customer.id, addDays(today, -100), addDays(today, 265), addDays(today, 5)]
  );
  const ended = await one(
    `INSERT INTO contracts (company_id, customer_id, title, start_date, end_date, visits_per_year, price, next_visit_date)
     VALUES ($1,$2,'عقد منتهي',$3,$4,2,500,$5) RETURNING *`,
    [company.id, customer.id, addDays(today, -400), addDays(today, -1), addDays(today, 3)]
  );
  const far = await one(
    `INSERT INTO contracts (company_id, customer_id, title, start_date, end_date, visits_per_year, price, next_visit_date)
     VALUES ($1,$2,'عقد بعيد',$3,$4,4,800,$5) RETURNING *`,
    [company.id, customer.id, today, addDays(today, 365), addDays(today, 40)]
  );
  // a scheduled job tomorrow → day-before reminder
  const tomorrowJob = await one(
    `INSERT INTO jobs (company_id, number, customer_id, title, status, scheduled_start)
     VALUES ($1, 9100, $2, 'صيانة غداً', 'scheduled', ($3::date + time '11:00') AT TIME ZONE 'Asia/Riyadh') RETURNING *`,
    [company.id, customer.id, addDays(today, 1)]
  );
  // trialing company whose trial ended
  const trial = await one(
    `INSERT INTO companies (slug, name, plan, subscription_status, trial_ends_at) VALUES ($1,'Trial Co','trial','trialing', now() - interval '1 day') RETURNING id`,
    [`${SLUG}-trial`]
  );

  const r1 = await scheduler.runOnce({ quietHours: false });
  assert.ok(!r1.skipped, JSON.stringify(r1));
  const jobs1 = await many(`SELECT * FROM jobs WHERE company_id = $1 AND contract_id = $2`, [company.id, due.id]);
  assert.equal(jobs1.length, 1);
  assert.equal(jobs1[0].source, 'contract');
  assert.equal(jobs1[0].status, 'new');
  const after1 = await one('SELECT next_visit_date FROM contracts WHERE id = $1', [due.id]);
  assert.equal(after1.next_visit_date, addDays(addDays(today, 5), 91));
  assert.equal((await one('SELECT status FROM contracts WHERE id = $1', [ended.id])).status, 'expired');
  assert.equal((await many('SELECT 1 FROM jobs WHERE contract_id = $1', [ended.id])).length, 0);
  assert.equal((await many('SELECT 1 FROM jobs WHERE contract_id = $1', [far.id])).length, 0);
  const reminder = await many(`SELECT * FROM messages WHERE job_id = $1 AND event = 'job_reminder'`, [tomorrowJob.id]);
  assert.equal(reminder.length, 1);
  const visitMsg = await many(`SELECT * FROM messages WHERE job_id = $1 AND event = 'contract_visit_reminder'`, [jobs1[0].id]);
  assert.equal(visitMsg.length, 1);
  assert.equal((await one('SELECT subscription_status FROM companies WHERE id = $1', [trial.id])).subscription_status, 'expired');

  // second run: nothing new
  const r2 = await scheduler.runOnce({ quietHours: false });
  assert.ok(!r2.skipped);
  assert.equal((await many(`SELECT 1 FROM jobs WHERE contract_id = $1`, [due.id])).length, 1);
  assert.equal((await many(`SELECT 1 FROM messages WHERE job_id = $1 AND event = 'job_reminder'`, [tomorrowJob.id])).length, 1);
  assert.equal((await one('SELECT next_visit_date FROM contracts WHERE id = $1', [due.id])).next_visit_date, after1.next_visit_date);
});

test('scheduler runOnce skips while another instance holds the lock', async () => {
  const c = await pool.connect();
  try {
    await c.query('SELECT pg_advisory_lock(50550505)');
    const r = await scheduler.runOnce({ quietHours: false });
    assert.equal(r.skipped, true);
    assert.equal(r.reason, 'locked');
  } finally {
    await c.query('SELECT pg_advisory_unlock(50550505)');
    c.release();
  }
});
