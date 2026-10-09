// B2 tests: ZATCA TLV, totals, numbering, issue→pay, credit notes, payment simulation, webhook, tenancy, billing.
// Run against a live server:  BASE_URL=http://localhost:3102 node --test server/tests/billing.test.mjs
// The server should run with MOYASAR_WEBHOOK_SECRET set (default expected: test_whsec_123) and no MOYASAR_SECRET_KEY.
import 'dotenv/config';
import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import pg from 'pg';
import { buildQrTlv, decodeQrTlv, calcTotals, isValidVatNumber, invoiceHash, canonicalJson, buildUblXml } from '../lib/zatca.js';
import { visualTokens } from '../lib/arabic-shape.js';

const BASE = (process.env.BASE_URL || 'http://localhost:3102').replace(/\/$/, '');
const WH_SECRET = process.env.TEST_WEBHOOK_SECRET || process.env.MOYASAR_WEBHOOK_SECRET || 'test_whsec_123';
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL || 'postgres://dawra:dawra@localhost:5432/dawra', max: 3 });
pg.types.setTypeParser(1700, (v) => (v === null ? null : Number(v)));

class Client {
  constructor() { this.cookie = ''; }
  async req(method, path, body, headers = {}) {
    const res = await fetch(BASE + path, {
      method,
      redirect: 'manual',
      headers: { ...(body !== undefined ? { 'content-type': 'application/json' } : {}), ...(this.cookie ? { cookie: this.cookie } : {}), ...headers },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    const set = res.headers.get('set-cookie');
    if (set) this.cookie = set.split(';')[0];
    const ct = res.headers.get('content-type') || '';
    const data = ct.includes('json') ? await res.json() : ct.includes('pdf') || ct.includes('png') ? Buffer.from(await res.arrayBuffer()) : await res.text();
    return { status: res.status, data, headers: res.headers };
  }
  get(p, h) { return this.req('GET', p, undefined, h); }
  post(p, b = {}, h) { return this.req('POST', p, b, h); }
}

const A = new Client(); // test tenant owner (throwaway company, deleted in after())
const B = new Client(); // another tenant (demo company) for cross-tenant checks
const S = new Client(); // fresh tenant for SaaS billing
let companyA;
let customerPlain;    // individual, no VAT
let customerB2B;      // business with VAT + site
let fresh;            // company id of a tenant without VAT number (S)
const cleanup = { companies: [] };

before(async () => {
  const suffix = Date.now().toString(36);
  const s = await A.post('/api/auth/signup', { company_name: `B2 Invoices ${suffix}`, name: 'Tester', email: `b2inv-${suffix}@example.com`, password: 'Passw0rd!x' });
  assert.equal(s.status, 201, `signup: ${JSON.stringify(s.data)}`);
  companyA = s.data.company.id;
  cleanup.companies.push(companyA);
  await db.query(`UPDATE companies SET name_ar = 'مؤسسة اختبار الفوترة', vat_number = '310000000000003', cr_number = '1010000000',
                  address = 'طريق الملك فهد', city = 'الرياض' WHERE id = $1`, [companyA]);
  const c1 = await db.query(`INSERT INTO customers (company_id, name, phone, type) VALUES ($1, 'عميل اختبار', '966500000101', 'individual') RETURNING id`, [companyA]);
  customerPlain = c1.rows[0].id;
  const c2 = await db.query(`INSERT INTO customers (company_id, name, phone, type, vat_number) VALUES ($1, 'شركة اختبار', '966500000102', 'business', '300000000000003') RETURNING id`, [companyA]);
  customerB2B = c2.rows[0].id;
  await db.query(`INSERT INTO sites (company_id, customer_id, label, city, district, address) VALUES ($1,$2,'HQ','الرياض','العليا','شارع التحلية')`, [companyA, customerB2B]);

  const l = await B.post('/api/auth/login', { email: 'demo@dawra.app', password: 'Demo1234!' });
  assert.equal(l.status, 200, 'demo login (seed must exist)');

  const s2 = await S.post('/api/auth/signup', { company_name: `B2 Billing ${suffix}`, name: 'Tester', email: `b2bill-${suffix}@example.com`, password: 'Passw0rd!x' });
  assert.equal(s2.status, 201);
  fresh = s2.data.company.id;
  cleanup.companies.push(fresh);
});

after(async () => {
  for (const id of cleanup.companies) {
    await db.query('DELETE FROM invoices WHERE company_id = $1', [id]).catch((e) => console.error(e.message));
    await db.query('DELETE FROM companies WHERE id = $1', [id]).catch((e) => console.error(e.message));
  }
  await db.end();
});

// ───────────────────────── pure units ─────────────────────────
describe('ZATCA TLV', () => {
  test('byte-exact encoding with Arabic seller name', () => {
    const sellerName = 'مؤسسة النسيم للتكييف';
    const b64 = buildQrTlv({ sellerName, vatNumber: '310456789000003', timestamp: '2026-10-09T09:30:00.000Z', total: 115, vatAmount: 15 });
    const buf = Buffer.from(b64, 'base64');
    const nameBytes = Buffer.from(sellerName, 'utf8');
    assert.equal(nameBytes.length, 38, 'Arabic name is 38 UTF-8 bytes (20 chars)');
    const expected = Buffer.concat([
      Buffer.from([1, nameBytes.length]), nameBytes,
      Buffer.from([2, 15]), Buffer.from('310456789000003'),
      Buffer.from([3, 20]), Buffer.from('2026-10-09T09:30:00Z'),
      Buffer.from([4, 6]), Buffer.from('115.00'),
      Buffer.from([5, 5]), Buffer.from('15.00'),
    ]);
    assert.deepEqual(buf, expected);
    assert.equal(buf[1], 38, 'length byte is the BYTE length, not char length');
    const d = decodeQrTlv(b64);
    assert.equal(d.sellerName, sellerName);
    assert.equal(d.vatNumber, '310456789000003');
    assert.equal(d.timestamp, '2026-10-09T09:30:00Z');
    assert.equal(d.total, '115.00');
    assert.equal(d.vatAmount, '15.00');
  });

  test('credit-note amounts are encoded as absolute values', () => {
    const d = decodeQrTlv(buildQrTlv({ sellerName: 'X', vatNumber: '300000000000003', timestamp: Date.now(), total: -57.5, vatAmount: -7.5 }));
    assert.equal(d.total, '57.50');
    assert.equal(d.vatAmount, '7.50');
  });

  test('VAT number validation', () => {
    assert.ok(isValidVatNumber('310456789000003'));
    assert.ok(!isValidVatNumber('210456789000003'));
    assert.ok(!isValidVatNumber('31045678900000'));
    assert.ok(!isValidVatNumber('310456789000004'));
  });
});

describe('totals rounding', () => {
  test('per-line 2dp, document VAT on summed taxable amount', () => {
    const t = calcTotals([
      { qty: 3, unit_price: 33.33 },    // 99.99 → VAT 15.00 (14.9985)
      { qty: 1, unit_price: 0.05 },     // 0.05 → VAT 0.01 (0.0075)
      { qty: 2.5, unit_price: 19.99 },  // 49.975 → 49.98 → VAT 7.50 (7.497)
    ]);
    assert.deepEqual(t.lines.map((l) => l.line_total), [99.99, 0.05, 49.98]);
    assert.deepEqual(t.lines.map((l) => l.vat_amount), [15.0, 0.01, 7.5]);
    assert.equal(t.subtotal, 150.02);
    assert.equal(t.vat_amount, 22.5);     // round(150.02 × 0.15 = 22.503)
    assert.equal(t.total, 172.52);
  });
  test('float traps: 1.005, 0.1+0.2, 115.00', () => {
    assert.equal(calcTotals([{ qty: 1, unit_price: 1.005 }]).lines[0].unit_price, 1.01);
    const t = calcTotals([{ qty: 1, unit_price: 0.1 }, { qty: 1, unit_price: 0.2 }]);
    assert.equal(t.subtotal, 0.3);
    assert.equal(calcTotals([{ qty: 1, unit_price: 100 }]).total, 115);
  });
  test('negative (credit) lines mirror positive exactly', () => {
    const p = calcTotals([{ qty: 3, unit_price: 33.33 }, { qty: 1, unit_price: 0.05 }]);
    const n = calcTotals([{ qty: 3, unit_price: -33.33 }, { qty: 1, unit_price: -0.05 }]);
    assert.equal(n.total, -p.total);
    assert.equal(n.vat_amount, -p.vat_amount);
  });
  test('zero-rated lines', () => {
    const t = calcTotals([{ qty: 1, unit_price: 100 }, { qty: 1, unit_price: 50, vat_rate: 0 }]);
    assert.equal(t.vat_amount, 15);
    assert.equal(t.total, 165);
  });
});

describe('hash chain + UBL + bidi', () => {
  test('hash is deterministic and depends on previous_hash', () => {
    const inv = { uuid: 'u', number: 1, kind: 'simplified', issue_date: '2026-01-01T00:00:00Z', seller: { name_ar: 'س', vat_number: '3' }, buyer: { name: 'b' }, lines: [{ description: 'x', qty: 1, unit_price: 10, vat_rate: 0.15, line_total: 10 }], subtotal: 10, vat_amount: 1.5, total: 11.5 };
    assert.equal(invoiceHash(inv, 'A'), invoiceHash({ ...inv }, 'A'));
    assert.notEqual(invoiceHash(inv, 'A'), invoiceHash(inv, 'B'));
    assert.notEqual(invoiceHash(inv, 'A'), invoiceHash({ ...inv, total: 11.51 }, 'A'));
    assert.equal(canonicalJson({ b: 1, a: [2, { d: 1, c: 2 }] }), '{"a":[2,{"c":2,"d":1}],"b":1}');
  });
  test('UBL XML has type code, ICV/PIH and totals', () => {
    const xml = buildUblXml({ uuid: 'u-1', number: 1005, kind: 'simplified', issue_date: '2026-10-09T06:00:00Z', seller: { name_ar: 'مؤسسة & شركاه', vat_number: '310456789000003' }, buyer: { name: 'A' }, lines: [{ description: 'x', qty: 1, unit_price: 100, vat_rate: 0.15, line_total: 100, vat_amount: 15 }], subtotal: 100, vat_amount: 15, total: 115, status: 'unpaid', previous_hash: 'PIH==' });
    assert.match(xml, /<cbc:InvoiceTypeCode name="0200000">388<\/cbc:InvoiceTypeCode>/);
    assert.match(xml, /<cbc:IssueTime>09:00:00<\/cbc:IssueTime>/);
    assert.match(xml, /PIH==/);
    assert.match(xml, /<cbc:TaxInclusiveAmount currencyID="SAR">115.00</);
    assert.match(xml, /مؤسسة &amp; شركاه/);
  });
  test('bidi: mixed Arabic/Latin line is ordered right-to-left', () => {
    const toks = visualTokens('تعبئة فريون R410A').map((t) => t.text);
    assert.deepEqual(toks, ['R410A', 'فريون', 'تعبئة']);
  });
});

// ───────────────────────── API ─────────────────────────
const manual = (customer_id, lines, extra = {}) => A.post('/api/invoices', { customer_id, lines, ...extra });

describe('invoices API', () => {
  test('issue manual simplified invoice: totals, QR, hash chain', async () => {
    const r = await manual(customerPlain, [{ description: 'تنظيف مكيف', qty: 3, unit_price: 33.33 }, { description: 'Visit fee', qty: 1, unit_price: 0.05 }]);
    assert.equal(r.status, 201, JSON.stringify(r.data));
    const inv = r.data;
    assert.equal(inv.kind, 'simplified');
    assert.equal(inv.status, 'unpaid');
    assert.equal(inv.subtotal, 100.04);
    assert.equal(inv.vat_amount, 15.01);
    assert.equal(inv.total, 115.05);
    assert.ok(inv.number > 1000);
    const q = decodeQrTlv(inv.qr_tlv);
    assert.equal(q.total, '115.05');
    assert.equal(q.vatAmount, '15.01');
    assert.equal(q.vatNumber, inv.seller.vat_number);
    assert.equal(q.sellerName, inv.seller.name_ar || inv.seller.name);
    assert.ok(inv.hash && inv.previous_hash);
    const prev = await db.query('SELECT hash FROM invoices WHERE company_id = $1 AND number = $2', [companyA, inv.number - 1]);
    if (prev.rows[0]?.hash) assert.equal(inv.previous_hash, prev.rows[0].hash, 'previous_hash links to the prior invoice');
  });

  test('sequential numbering without gaps under concurrency', async () => {
    const rs = await Promise.all(Array.from({ length: 6 }, (_, i) => manual(customerPlain, [{ description: `seq ${i}`, qty: 1, unit_price: 10 + i }])));
    rs.forEach((r) => assert.equal(r.status, 201, JSON.stringify(r.data)));
    const nums = rs.map((r) => r.data.number).sort((a, b) => a - b);
    for (let i = 1; i < nums.length; i++) assert.equal(nums[i], nums[i - 1] + 1, `contiguous: ${nums}`);
    const { rows } = await db.query('SELECT number FROM invoices WHERE company_id = $1 AND number IS NOT NULL ORDER BY number', [companyA]);
    const all = rows.map((r) => r.number);
    for (let i = 1; i < all.length; i++) assert.equal(all[i], all[i - 1] + 1, 'no gaps in company sequence');
  });

  test('drafts have no number; failed issue does not consume a number', async () => {
    const before = (await db.query('SELECT max(number) AS m FROM invoices WHERE company_id = $1', [companyA])).rows[0].m;
    const d = await manual(customerPlain, [{ description: 'draft', qty: 1, unit_price: 50 }], { draft: true });
    assert.equal(d.status, 201);
    assert.equal(d.data.number, null);
    assert.equal(d.data.status, 'draft');
    const e = await A.req('PATCH', `/api/invoices/${d.data.id}`, { lines: [{ description: 'draft edited', qty: 2, unit_price: 50 }] });
    assert.equal(e.status, 200);
    assert.equal(e.data.total, 115);
    // a standard invoice for a customer without VAT must fail and not burn a number
    const bad = await manual(customerPlain, [{ description: 'b2b', qty: 1, unit_price: 10 }], { kind: 'standard' });
    assert.equal(bad.status, 400);
    const mid = (await db.query('SELECT max(number) AS m FROM invoices WHERE company_id = $1', [companyA])).rows[0].m;
    assert.equal(mid, before);
    const iss = await A.post(`/api/invoices/${d.data.id}/issue`);
    assert.equal(iss.status, 200);
    assert.equal(iss.data.number, before + 1);
    const again = await A.req('PATCH', `/api/invoices/${d.data.id}`, { notes: 'x' });
    assert.equal(again.status, 409, 'issued invoices are immutable');
  });

  test('standard (B2B) invoice snapshots buyer VAT and address', async () => {
    const r = await manual(customerB2B, [{ description: 'Chiller service', qty: 1, unit_price: 1000 }]);
    assert.equal(r.status, 201, JSON.stringify(r.data));
    assert.equal(r.data.kind, 'standard');
    assert.equal(r.data.buyer.vat_number, '300000000000003');
    assert.match(r.data.buyer.address, /التحلية/);
    const x = await A.get(`/api/invoices/${r.data.id}/xml`);
    assert.equal(x.status, 200);
    assert.match(x.data, /name="0100000">388</);
    assert.match(x.data, /300000000000003/);
  });

  test('from job: pulls job items; duplicate → 409', async () => {
    const { rows: [job] } = await db.query(
      `INSERT INTO jobs (company_id, number, customer_id, title, status)
       VALUES ($1, (SELECT COALESCE(max(number),0)+1 FROM jobs WHERE company_id=$1), $2, 'B2 test job', 'completed') RETURNING id`, [companyA, customerPlain]);
    await db.query(`INSERT INTO job_items (job_id, company_id, description, qty, unit_price) VALUES ($1,$2,'غسيل مكيف',2,150),($1,$2,'فريون',1,200)`, [job.id, companyA]);
    const r = await A.post('/api/invoices', { job_id: job.id });
    assert.equal(r.status, 201, JSON.stringify(r.data));
    assert.equal(r.data.lines.length, 2);
    assert.equal(r.data.subtotal, 500);
    assert.equal(r.data.total, 575);
    assert.equal(r.data.job_id, job.id);
    const dup = await A.post('/api/invoices', { job_id: job.id });
    assert.equal(dup.status, 409);
    const ev = await db.query(`SELECT count(*)::int AS n FROM job_events WHERE job_id = $1 AND type = 'invoice'`, [job.id]);
    assert.ok(ev.rows[0].n >= 1, 'invoice job event logged');
  });

  test('issue → pay → cannot void paid; list filters & search', async () => {
    const r = await manual(customerPlain, [{ description: 'pay me', qty: 1, unit_price: 200 }]);
    const id = r.data.id;
    const p = await A.post(`/api/invoices/${id}/pay`, { payment_method: 'mada', paid_at: new Date(Date.now() - 3600e3).toISOString() });
    assert.equal(p.status, 200, JSON.stringify(p.data));
    assert.equal(p.data.status, 'paid');
    assert.equal(p.data.payment_method, 'mada');
    assert.ok(p.data.paid_at);
    assert.equal((await A.post(`/api/invoices/${id}/pay`, { payment_method: 'cash' })).status, 409);
    assert.equal((await A.post(`/api/invoices/${id}/void`)).status, 409);
    const l = await A.get(`/api/invoices?status=paid&customer_id=${customerPlain}&q=${r.data.number}`);
    assert.equal(l.status, 200);
    assert.equal(l.data.items.length, 1);
    assert.equal(l.data.items[0].id, id);
    assert.ok(typeof l.data.totals.unpaid === 'number');
  });

  test('void unpaid invoice creates full credit note', async () => {
    const r = await manual(customerPlain, [{ description: 'to void', qty: 1, unit_price: 50 }]);
    const v = await A.post(`/api/invoices/${r.data.id}/void`, { reason: 'خطأ في الإدخال' });
    assert.equal(v.status, 200, JSON.stringify(v.data));
    assert.equal(v.data.status, 'void');
    assert.equal(v.data.credit_notes.length, 1);
    const cn = await A.get(`/api/invoices/${v.data.credit_note_id}`);
    assert.equal(cn.data.kind, 'credit_note');
    assert.equal(cn.data.total, -57.5);
    assert.equal(cn.data.vat_amount, -7.5);
    assert.equal(cn.data.original_invoice_id, r.data.id);
    assert.equal(cn.data.number, r.data.number + 1);
  });

  test('partial credit note on paid invoice; over-credit rejected', async () => {
    const r = await manual(customerPlain, [{ description: 'A', qty: 1, unit_price: 100 }, { description: 'B', qty: 1, unit_price: 40 }]);
    await A.post(`/api/invoices/${r.data.id}/pay`, { payment_method: 'cash' });
    const c = await A.post(`/api/invoices/${r.data.id}/credit-note`, { reason: 'خصم', lines: [{ description: 'B', qty: 1, unit_price: 40 }] });
    assert.equal(c.status, 201, JSON.stringify(c.data));
    assert.equal(c.data.total, -46);
    assert.equal(decodeQrTlv(c.data.qr_tlv).total, '46.00');
    const over = await A.post(`/api/invoices/${r.data.id}/credit-note`, { reason: 'كثير', lines: [{ description: 'A', qty: 2, unit_price: 100 }] });
    assert.equal(over.status, 400);
    const orig = await A.get(`/api/invoices/${r.data.id}`);
    assert.equal(orig.data.status, 'paid');
    assert.equal(orig.data.credited_total, 46);
    const x = await A.get(`/api/invoices/${c.data.id}/xml`);
    assert.match(x.data, />381<\/cbc:InvoiceTypeCode>/);
    assert.match(x.data, /BillingReference/);
  });

  test('PDF (auth + public token), QR png', async () => {
    const r = await manual(customerPlain, [{ description: 'صيانة مكيف سبليت', qty: 1, unit_price: 150 }]);
    const pdf = await A.get(`/api/invoices/${r.data.id}/pdf`);
    assert.equal(pdf.status, 200);
    assert.equal(pdf.data.subarray(0, 5).toString(), '%PDF-');
    assert.ok(pdf.data.length > 20000, 'font embedded');
    const anon = new Client();
    const pub = await anon.get(`/api/invoices/public/${r.data.public_token}/pdf`);
    assert.equal(pub.status, 200);
    assert.equal(pub.data.subarray(0, 5).toString(), '%PDF-');
    assert.equal((await anon.get(`/api/invoices/public/${'0'.repeat(32)}/pdf`)).status, 404);
    assert.equal((await anon.get(`/api/invoices/${r.data.id}/pdf`)).status, 401);
    const png = await A.get(`/api/invoices/${r.data.id}/qr.png`);
    assert.equal(png.status, 200);
    assert.equal(png.data.subarray(1, 4).toString(), 'PNG');
  });

  test('send via notify logs a message', async () => {
    const r = await manual(customerPlain, [{ description: 'send', qty: 1, unit_price: 10 }]);
    const s = await A.post(`/api/invoices/${r.data.id}/send`, { channel: 'whatsapp' });
    assert.equal(s.status, 200, JSON.stringify(s.data));
    assert.ok(s.data.ok);
  });

  test('VAT report JSON + CSV', async () => {
    const j = await A.get('/api/invoices/reports/vat?from=2026-01-01&to=2026-12-31');
    assert.equal(j.status, 200);
    assert.ok(j.data.by_month.length >= 1);
    const t = j.data.totals;
    assert.ok(Math.abs(t.vat_collected - Math.round(t.taxable_sales * 0.15 * 100) / 100) < 0.05 * Math.max(1, j.data.totals.invoices));
    const c = await A.get('/api/invoices/reports/vat?from=2026-01-01&to=2026-12-31&format=csv');
    assert.equal(c.status, 200);
    assert.match(c.headers.get('content-type'), /text\/csv/);
    assert.match(c.data, /month,invoices,credit_notes,taxable_sales/);
    assert.match(c.data, /TOTAL/);
  });
});

describe('payments', () => {
  test('simulation payment link flow marks invoice paid (and is idempotent)', async () => {
    const r = await manual(customerPlain, [{ description: 'online', qty: 1, unit_price: 80 }]);
    const l = await A.post(`/api/invoices/${r.data.id}/payment-link`);
    assert.equal(l.status, 200, JSON.stringify(l.data));
    assert.equal(l.data.simulated, true);
    const path = new URL(l.data.url, BASE).pathname;
    assert.match(path, /^\/api\/webhooks\/moyasar\/sim\/dw_[a-f0-9]{24}$/);
    const anon = new Client();
    const page = await anon.get(path);
    assert.equal(page.status, 200);
    assert.match(page.data, /92\.00 SAR/);
    assert.match(page.data, /Pay/);
    const pay = await anon.req('POST', path, { action: 'pay' }, { accept: 'application/json' });
    assert.equal(pay.status, 200, JSON.stringify(pay.data));
    const inv = await A.get(`/api/invoices/${r.data.id}`);
    assert.equal(inv.data.status, 'paid');
    assert.equal(inv.data.payment_method, 'online');
    assert.equal(inv.data.payment_link_url, l.data.url);
    const again = await anon.req('POST', path, { action: 'pay' }, { accept: 'application/json' });
    assert.equal(again.status, 200);
    assert.equal((await A.post(`/api/invoices/${r.data.id}/payment-link`)).status, 409, 'paid invoice cannot get a new link');
  });

  test('simulation cancel leaves invoice unpaid', async () => {
    const r = await manual(customerPlain, [{ description: 'cancel', qty: 1, unit_price: 20 }]);
    const l = await A.post(`/api/invoices/${r.data.id}/payment-link`);
    const path = new URL(l.data.url, BASE).pathname;
    const res = await new Client().req('POST', path, { action: 'cancel' }, { accept: 'application/json' });
    assert.equal(res.status, 200);
    assert.equal((await A.get(`/api/invoices/${r.data.id}`)).data.status, 'unpaid');
  });

  test('webhook rejects missing/invalid secret_token', async () => {
    const anon = new Client();
    assert.equal((await anon.post('/api/webhooks/moyasar', { type: 'payment_paid', data: { id: 'x' } })).status, 401);
    assert.equal((await anon.post('/api/webhooks/moyasar', { type: 'payment_paid', secret_token: 'wrong', data: { id: 'x' } })).status, 401);
    assert.equal((await anon.post('/api/webhooks/moyasar', { type: 'payment_paid', secret_token: WH_SECRET.slice(0, -1), data: {} })).status, 401);
  });

  test('webhook with valid token settles invoice by metadata ref (amount checked)', async (t) => {
    const probe = await new Client().post('/api/webhooks/moyasar', { type: 'ping', secret_token: WH_SECRET });
    if (probe.status === 401) return t.skip('server not started with MOYASAR_WEBHOOK_SECRET=' + WH_SECRET);
    const r = await manual(customerPlain, [{ description: 'webhook', qty: 1, unit_price: 100 }]);
    await A.post(`/api/invoices/${r.data.id}/payment-link`);
    const { rows: [link] } = await db.query('SELECT ref, amount_halalas FROM payment_links WHERE invoice_id = $1 ORDER BY created_at DESC LIMIT 1', [r.data.id]);
    assert.equal(link.amount_halalas, 11500);
    const evt = (amount) => ({ id: 'evt_1', type: 'payment_paid', secret_token: WH_SECRET, data: { id: 'pay_test_1', status: 'paid', amount, currency: 'SAR', source: { type: 'mada' }, metadata: { dawra_ref: link.ref } } });
    const bad = await new Client().post('/api/webhooks/moyasar', evt(100));
    assert.equal(bad.status, 422, 'amount mismatch rejected');
    assert.equal((await A.get(`/api/invoices/${r.data.id}`)).data.status, 'unpaid');
    const ok = await new Client().post('/api/webhooks/moyasar', evt(11500));
    assert.equal(ok.status, 200, JSON.stringify(ok.data));
    const inv = (await A.get(`/api/invoices/${r.data.id}`)).data;
    assert.equal(inv.status, 'paid');
    assert.equal(inv.payment_method, 'mada');
    const dup = await new Client().post('/api/webhooks/moyasar', evt(11500));
    assert.equal(dup.data.already, true, 'idempotent');
  });
});

describe('tenancy', () => {
  test('cross-tenant access returns 404', async () => {
    const r = await manual(customerPlain, [{ description: 'secret', qty: 1, unit_price: 10 }]);
    const id = r.data.id;
    assert.equal((await B.get(`/api/invoices/${id}`)).status, 404);
    assert.equal((await B.get(`/api/invoices/${id}/pdf`)).status, 404);
    assert.equal((await B.get(`/api/invoices/${id}/xml`)).status, 404);
    assert.equal((await B.post(`/api/invoices/${id}/pay`, { payment_method: 'cash' })).status, 404);
    assert.equal((await B.post(`/api/invoices/${id}/void`)).status, 404);
    assert.equal((await B.post(`/api/invoices/${id}/credit-note`, { reason: 'x y' })).status, 404);
    assert.equal((await B.post(`/api/invoices/${id}/payment-link`)).status, 404);
    assert.equal((await B.post('/api/invoices', { customer_id: customerPlain, lines: [{ description: 'x', qty: 1, unit_price: 1 }] })).status, 404);
    const list = await B.get(`/api/invoices?q=${r.data.number}&limit=200`);
    assert.ok(!list.data.items.some((i) => i.id === id));
    assert.equal((await A.get(`/api/invoices/${id}`)).status, 200);
  });

  test('new tenant without VAT number cannot issue tax invoices', async () => {
    const { rows: [cu] } = await db.query(`INSERT INTO customers (company_id, name, phone) VALUES ($1,'c','966500000999') RETURNING id`, [fresh]);
    const r = await S.post('/api/invoices', { customer_id: cu.id, lines: [{ description: 'x', qty: 1, unit_price: 10 }] });
    assert.equal(r.status, 400);
    assert.match(r.data.error.message, /VAT/);
  });
});

describe('SaaS billing', () => {
  test('GET /billing shows trial, usage, plans', async () => {
    const r = await S.get('/api/billing');
    assert.equal(r.status, 200, JSON.stringify(r.data));
    assert.equal(r.data.subscription_status, 'trialing');
    assert.ok(r.data.trial_days_left >= 13 && r.data.trial_days_left <= 14);
    assert.equal(r.data.usage.technicians, 0);
    assert.equal(r.data.usage.invoices_this_month, 0);
    assert.deepEqual(r.data.plans.map((p) => [p.id, p.monthly, p.yearly]), [['starter', 149, 1490], ['pro', 449, 4490], ['business', 999, 9990]]);
  });

  test('checkout (simulation) → pay → plan active, period extended', async () => {
    const c = await S.post('/api/billing/checkout', { plan: 'business', cycle: 'yearly' });
    assert.equal(c.status, 201, JSON.stringify(c.data));
    assert.equal(c.data.amount, 9990);
    assert.equal(c.data.total, 11488.5);
    assert.equal(c.data.simulated, true);
    const path = new URL(c.data.url, BASE).pathname;
    const pay = await new Client().req('POST', path, { action: 'pay' }, { accept: 'application/json' });
    assert.equal(pay.status, 200);
    const b = await S.get('/api/billing');
    assert.equal(b.data.plan, 'business');
    assert.equal(b.data.subscription_status, 'active');
    assert.equal(b.data.billing_cycle, 'yearly');
    const days = (new Date(b.data.current_period_end) - Date.now()) / 86400000;
    assert.ok(days > 360 && days < 370, `period ≈ 1 year (${days})`);
    assert.equal(b.data.payments[0].status, 'paid');
  });

  test('billing is owner-only', async () => {
    assert.equal((await new Client().get('/api/billing')).status, 401);
  });
});
