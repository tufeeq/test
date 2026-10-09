// Demo seed: "مؤسسة النسيم للتكييف" (slug: naseem). Idempotent: skips if slug exists.
// Run: npm run seed   (or SEED_DEMO=true on boot). Force re-seed: SEED_FORCE=true npm run seed
import 'dotenv/config';
import { fileURLToPath } from 'node:url';
import { pool, tx } from '../lib/db.js';
import { hashPassword } from '../lib/auth.js';
import { buildQrTlv, calcTotals } from '../lib/zatca.js';

export const DEMO = { slug: 'naseem', email: 'demo@dawra.app', password: 'Demo1234!' };

// Deterministic PRNG so the demo is stable between runs.
let s = 42;
const rnd = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648);
const pick = (a) => a[Math.floor(rnd() * a.length)];
const int = (a, b) => a + Math.floor(rnd() * (b - a + 1));

const DISTRICTS = [
  ['النرجس', 24.8392, 46.6537], ['الملقا', 24.8106, 46.6046], ['الياسمين', 24.8244, 46.6413],
  ['حطين', 24.7660, 46.6000], ['العليا', 24.6960, 46.6850], ['الصحافة', 24.8030, 46.6370],
  ['الربوة', 24.6890, 46.7570], ['قرطبة', 24.8130, 46.7400], ['النخيل', 24.7480, 46.6430],
  ['الروضة', 24.7340, 46.7710], ['الورود', 24.7230, 46.6700], ['اليرموك', 24.8170, 46.7740],
];
const PEOPLE = [
  'عبدالله القحطاني', 'سارة العتيبي', 'محمد الدوسري', 'نورة الشمري', 'فهد المطيري',
  'خالد الحربي', 'ريم الزهراني', 'سلطان الغامدي', 'هيفاء السبيعي', 'تركي العنزي',
];
const BUSINESSES = [
  ['مطعم بيت الشاورما', '300123456700003'], ['مجمع عيادات الرعاية', '310987654300003'],
  ['مكتب الأفق للمحاماة', '311223344500003'], ['سوبرماركت الوفرة', '300556677800003'],
  ['مدارس رواد المعرفة', '302468013500003'],
];
const SERVICES = [
  ['Split AC cleaning', 'غسيل مكيف سبليت', 'cleaning', 150, 45],
  ['Window AC cleaning', 'غسيل مكيف شباك', 'cleaning', 100, 30],
  ['Freon refill (split)', 'تعبئة فريون سبليت', 'repair', 250, 45],
  ['Split AC installation', 'تركيب مكيف سبليت', 'installation', 350, 120],
  ['Split AC removal', 'فك مكيف سبليت', 'installation', 150, 60],
  ['AC fault inspection', 'كشف أعطال مكيف', 'inspection', 100, 30],
  ['Compressor capacitor replacement', 'تغيير كباستور', 'repair', 180, 45],
  ['Drain line unclogging', 'تسليك تصريف المكيف', 'repair', 120, 40],
  ['Central AC maintenance', 'صيانة مكيف مركزي', 'maintenance', 450, 120],
  ['Cold room inspection', 'فحص غرفة تبريد', 'inspection', 300, 90],
];
const TECHS = [
  ['أحمد رضا', 'ahmed@naseem.demo', '#2563EB', ['split_ac', 'window_ac']],
  ['محمد إقبال', 'iqbal@naseem.demo', '#16A34A', ['split_ac', 'central_ac']],
  ['ياسر الشهري', 'yaser@naseem.demo', '#DB2777', ['central_ac', 'cold_room']],
  ['رامي حسن', 'rami@naseem.demo', '#EA580C', ['split_ac', 'installation']],
];
const JOB_TITLES = [
  ['مكيف لا يبرد', 'المكيف يشتغل لكن الهواء حار', 'repair', [2, 5]],
  ['غسيل مكيفات', 'غسيل دوري قبل الصيف', 'cleaning', [0]],
  ['تسريب ماء من المكيف', 'الماء ينقط من الوحدة الداخلية على الجدار', 'repair', [7]],
  ['تركيب مكيف جديد', 'تركيب سبليت 24 ألف وحدة في غرفة النوم', 'installation', [3]],
  ['صوت عالي في المكيف', 'صوت طقطقة من الوحدة الخارجية', 'repair', [5, 6]],
  ['صيانة دورية - عقد', 'زيارة صيانة دورية حسب العقد', 'maintenance', [0, 8]],
  ['فحص غرفة التبريد', 'درجة الحرارة غير ثابتة', 'inspection', [9]],
];
const CHECKLIST = [
  { label: 'فحص ضغط الفريون', done: false },
  { label: 'تنظيف الفلاتر', done: false },
  { label: 'فحص التصريف', done: false },
  { label: 'قياس درجة حرارة الهواء الخارج', done: false },
];

export async function seed({ log = console.log } = {}) {
  const exists = await pool.query('SELECT id FROM companies WHERE slug = $1', [DEMO.slug]);
  if (exists.rowCount) {
    if (process.env.SEED_FORCE !== 'true') { log('[seed] demo company exists — skipping'); return; }
    await pool.query('DELETE FROM jobs WHERE company_id = $1', [exists.rows[0].id]); // RESTRICT FKs first
    await pool.query('DELETE FROM invoices WHERE company_id = $1', [exists.rows[0].id]);
    await pool.query('DELETE FROM companies WHERE id = $1', [exists.rows[0].id]);
    await pool.query("DELETE FROM users WHERE email LIKE '%@naseem.demo' OR email = $1", [DEMO.email]);
  }
  s = 42;
  const hash = await hashPassword(DEMO.password);
  const now = new Date();
  const day = (offset, hour = 9, min = 0) => {
    const d = new Date(now); d.setUTCHours(hour - 3, min, 0, 0); d.setUTCDate(d.getUTCDate() + offset); return d; // Riyadh = UTC+3
  };

  await tx(async (c) => {
    const q = (sql, p) => c.query(sql, p).then((r) => r.rows);
    const [co] = await q(
      `INSERT INTO companies (slug, name, name_ar, vat_number, cr_number, phone, city, address, plan, trial_ends_at, subscription_status)
       VALUES ($1,'Al Naseem AC Est.','مؤسسة النسيم للتكييف','310456789000003','1010654321','966501234567','الرياض',
               'طريق أنس بن مالك، حي الملقا، الرياض','pro', now() + interval '14 days','active') RETURNING *`,
      [DEMO.slug]
    );
    const cid = co.id;

    const [owner] = await q(
      `INSERT INTO users (company_id,name,email,phone,password_hash,role,color) VALUES ($1,'عبدالرحمن النسيم',$2,'966501234567',$3,'owner','#0F5C5C') RETURNING id`,
      [cid, DEMO.email, hash]
    );
    const [disp] = await q(
      `INSERT INTO users (company_id,name,email,phone,password_hash,role,color) VALUES ($1,'منيرة السالم','dispatch@naseem.demo','966502223344',$2,'dispatcher','#7C3AED') RETURNING id`,
      [cid, hash]
    );
    const techs = [];
    for (const [i, [name, email, color, skills]] of TECHS.entries()) {
      const [t] = await q(
        `INSERT INTO users (company_id,name,email,phone,password_hash,role,color,skills) VALUES ($1,$2,$3,$4,$5,'technician',$6,$7) RETURNING id`,
        [cid, name, email, `96655${String(1000000 + i * 1111).slice(0, 7)}`, hash, color, skills]
      );
      techs.push(t.id);
    }

    const services = [];
    for (const [name, name_ar, category, price, duration] of SERVICES) {
      const [sv] = await q(
        `INSERT INTO services (company_id,name,name_ar,category,price,duration_min,taxable) VALUES ($1,$2,$3,$4,$5,$6,true) RETURNING *`,
        [cid, name, name_ar, category, price, duration]
      );
      services.push(sv);
    }

    // 15 customers: 10 individuals + 5 businesses, each with one site and 1–3 assets
    const customers = [];
    const allCust = [
      ...PEOPLE.map((n) => ({ name: n, type: 'individual', vat: null })),
      ...BUSINESSES.map(([n, v]) => ({ name: n, type: 'business', vat: v })),
    ];
    for (const [i, cu] of allCust.entries()) {
      const phoneNum = `9665${String(30000000 + i * 734521).slice(0, 8)}`;
      const [row] = await q(
        `INSERT INTO customers (company_id,name,phone,email,type,vat_number,notes) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`,
        [cid, cu.name, phoneNum, cu.type === 'business' ? `info${i}@example.sa` : null, cu.type, cu.vat,
          i % 4 === 0 ? 'يفضل التواصل واتساب بعد العصر' : null]
      );
      const [dname, lat, lng] = DISTRICTS[i % DISTRICTS.length];
      const [site] = await q(
        `INSERT INTO sites (company_id,customer_id,label,city,district,address,lat,lng) VALUES ($1,$2,$3,'الرياض',$4,$5,$6,$7) RETURNING id`,
        [cid, row.id, cu.type === 'business' ? 'الفرع الرئيسي' : 'المنزل', dname, `حي ${dname}، شارع ${int(1, 40)}، مبنى ${int(1, 90)}`,
          lat + (rnd() - 0.5) * 0.01, lng + (rnd() - 0.5) * 0.01]
      );
      const assets = [];
      for (let a = 0; a < int(1, 3); a++) {
        const kind = cu.type === 'business' && a === 0 ? pick(['central_ac', 'cold_room', 'split_ac']) : pick(['split_ac', 'split_ac', 'window_ac']);
        const [as] = await q(
          `INSERT INTO assets (company_id,site_id,kind,brand,capacity_btu,install_date,notes) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`,
          [cid, site.id, kind, pick(['Gree', 'LG', 'Samsung', 'Carrier', 'Midea', 'Zamil']),
            kind === 'window_ac' ? 18000 : kind === 'split_ac' ? pick([12000, 18000, 24000]) : 60000,
            `${int(2016, 2024)}-0${int(1, 9)}-1${int(0, 9)}`, a === 0 ? null : 'غرفة النوم']
        );
        assets.push(as.id);
      }
      customers.push({ id: row.id, site: site.id, assets, ...cu, phone: phoneNum });
    }

    // 5 contracts (businesses + 0 individuals)
    const contracts = [];
    for (const [i, cu] of customers.filter((x) => x.type === 'business').entries()) {
      const start = day(-int(30, 200)).toISOString().slice(0, 10);
      const endD = new Date(start); endD.setFullYear(endD.getFullYear() + 1);
      const [ct] = await q(
        `INSERT INTO contracts (company_id,customer_id,site_id,title,start_date,end_date,visits_per_year,price,status,next_visit_date,notes)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'active',$9,$10) RETURNING id`,
        [cid, cu.id, cu.site, `عقد صيانة سنوي - ${cu.name}`, start, endD.toISOString().slice(0, 10),
          [4, 6, 12, 4, 2][i], [4800, 7200, 3600, 9600, 2400][i],
          day(int(1, 20)).toISOString().slice(0, 10), 'يشمل الغسيل والفحص الدوري، قطع الغيار على العميل']
      );
      contracts.push({ id: ct.id, customer: cu });
    }

    // 30 jobs across −14…+14 days
    const jobs = [];
    for (let n = 1; n <= 30; n++) {
      const offset = Math.round(-14 + (28 * (n - 1)) / 29);
      const cu = customers[(n * 7) % customers.length];
      const contract = contracts.find((ct) => ct.customer.id === cu.id && n % 3 === 0);
      const tpl = contract ? JOB_TITLES[5] : pick(JOB_TITLES);
      let status;
      if (offset < -1) status = n % 9 === 0 ? 'cancelled' : 'completed';
      else if (offset <= 0) status = pick(['in_progress', 'on_the_way', 'completed', 'scheduled']);
      else status = n % 5 === 0 ? 'new' : 'scheduled';
      const unassigned = status === 'new';
      const hour = pick([8, 10, 13, 16, 19]);
      const start = day(offset, hour);
      const items = tpl[3].map((ix) => services[ix]);
      const duration = items.reduce((m, sv) => m + sv.duration_min, 0) || 60;
      const end = new Date(start.getTime() + duration * 60000);
      const completed = status === 'completed';
      const [job] = await q(
        `INSERT INTO jobs (company_id,number,customer_id,site_id,asset_id,contract_id,title,description,category,priority,status,source,
                           scheduled_start,scheduled_end,technician_id,checklist,completed_at,rating,rating_comment,created_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING id, public_token`,
        [cid, n, cu.id, cu.site, cu.assets[0], contract?.id ?? null, tpl[0], tpl[1], tpl[2],
          tpl[0].includes('تسريب') ? 'urgent' : n % 11 === 0 ? 'low' : 'normal', status,
          contract ? 'contract' : pick(['manual', 'manual', 'portal', 'whatsapp']),
          unassigned ? null : start, unassigned ? null : end, unassigned ? null : techs[n % techs.length],
          JSON.stringify(CHECKLIST.map((it) => ({ ...it, done: completed }))),
          completed ? end : null, completed && n % 2 ? int(4, 5) : null,
          completed && n % 4 === 1 ? 'شغل ممتاز والفني محترم' : null,
          // created 2 days before the visit, but never in the future (lists sort by created_at DESC)
          new Date(Math.min(start.getTime() - 2 * 86400000, Date.now() - (30 - n) * 60000))]
      );
      for (const sv of items) {
        await q(`INSERT INTO job_items (job_id,company_id,service_id,description,qty,unit_price) VALUES ($1,$2,$3,$4,$5,$6)`,
          [job.id, cid, sv.id, sv.name_ar, tpl[0].includes('غسيل') ? int(1, 4) : 1, sv.price]);
      }
      const events = [['created', 'تم إنشاء الطلب', disp.id]];
      if (!unassigned) events.push(['assigned', 'تم إسناد الطلب للفني', disp.id]);
      if (['on_the_way', 'in_progress', 'completed'].includes(status)) events.push(['status_changed', 'الفني في الطريق', techs[n % techs.length]]);
      if (['in_progress', 'completed'].includes(status)) events.push(['status_changed', 'بدأ العمل', techs[n % techs.length]]);
      if (completed) events.push(['status_changed', 'تم إنجاز العمل', techs[n % techs.length]]);
      if (status === 'cancelled') events.push(['status_changed', 'أُلغي الطلب بطلب العميل', disp.id]);
      for (const [k, [type, msg, actor]] of events.entries()) {
        await q(`INSERT INTO job_events (job_id,company_id,type,message,actor_user_id,created_at) VALUES ($1,$2,$3,$4,$5,$6)`,
          [job.id, cid, type, msg, actor, new Date(start.getTime() - (events.length - k) * 3600000)]);
      }
      jobs.push({ id: job.id, n, cu, status, end, items, contract });
    }

    // 10 invoices: from the first 10 completed jobs
    const done = jobs.filter((j) => j.status === 'completed').slice(0, 10);
    for (const [k, j] of done.entries()) {
      const lines = j.items.length
        ? (await q('SELECT description, qty, unit_price FROM job_items WHERE job_id = $1', [j.id]))
        : [{ description: 'زيارة صيانة', qty: 1, unit_price: 150 }];
      const t = calcTotals(lines);
      const kind = j.cu.type === 'business' ? 'standard' : 'simplified';
      const paid = k % 3 !== 2;
      const qr = buildQrTlv({ sellerName: co.name_ar, vatNumber: co.vat_number, timestamp: j.end, total: t.total, vatAmount: t.vat_amount });
      const [inv] = await q(
        `INSERT INTO invoices (company_id,number,job_id,contract_id,customer_id,issue_date,kind,subtotal,vat_amount,total,status,paid_at,payment_method,qr_tlv)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING id`,
        [cid, 1000 + k + 1, j.id, j.contract?.id ?? null, j.cu.id, j.end, kind, t.subtotal, t.vat_amount, t.total,
          paid ? 'paid' : 'unpaid', paid ? j.end : null, paid ? pick(['cash', 'card', 'transfer']) : null, qr]
      );
      for (const l of t.lines) {
        await q(`INSERT INTO invoice_lines (invoice_id,company_id,description,qty,unit_price,vat_rate,line_total) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
          [inv.id, cid, l.description, l.qty, l.unit_price, l.vat_rate, l.line_total]);
      }
      await q(`INSERT INTO job_events (job_id,company_id,type,message,actor_user_id,created_at) VALUES ($1,$2,'invoice',$3,$4,$5)`,
        [j.id, cid, `تم إصدار الفاتورة رقم ${1000 + k + 1}`, owner.id, j.end]);
    }

    // A few notification log rows + 2 pending booking requests
    for (const j of jobs.slice(10, 16)) {
      await q(`INSERT INTO messages (company_id,customer_id,job_id,channel,direction,to_addr,body,status) VALUES ($1,$2,$3,'whatsapp','out',$4,$5,'simulated')`,
        [cid, j.cu.id, j.id, j.cu.phone, `مرحباً ${j.cu.name}، تم تأكيد موعد الصيانة رقم ${j.n}. فريق مؤسسة النسيم للتكييف`]);
    }
    await q(
      `INSERT INTO booking_requests (company_id,name,phone,city,district,category,description,preferred_date,ai_triage,status) VALUES
       ($1,'ماجد العمري','966559876543','الرياض','الملقا','ac','المكيف في الصالة يطلع ماء ويطفي لحاله',$2,$3,'pending'),
       ($1,'Lina Haddad','966551112233','الرياض','حطين','ac','Need cleaning for 3 split units before summer',$4,$5,'pending')`,
      [cid, day(2).toISOString().slice(0, 10),
        JSON.stringify({ category: 'ac', priority: 'urgent', title: 'تسريب ماء من المكيف', suggested_services: ['تسليك تصريف المكيف', 'كشف أعطال مكيف'], duration_min: 70, summary_ar: 'تسريب ماء وانطفاء متكرر', source: 'keywords' }),
        day(5).toISOString().slice(0, 10),
        JSON.stringify({ category: 'ac', priority: 'normal', title: 'غسيل 3 مكيفات سبليت', suggested_services: ['غسيل مكيف سبليت'], duration_min: 135, summary_ar: 'غسيل ثلاث وحدات سبليت', source: 'keywords' })]
    );
    await q(`INSERT INTO audit_log (company_id,user_id,action,entity,entity_id) VALUES ($1,$2,'seed','company',$1)`, [cid, owner.id]);
    log(`[seed] created demo company ${co.name_ar} (${DEMO.slug}): 6 users, 15 customers, 30 jobs, 5 contracts, ${done.length} invoices`);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { migrate } = await import('./migrate.js');
  await migrate();
  await seed();
  await pool.end();
}
