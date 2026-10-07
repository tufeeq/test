// IELTS Academy — plans, subscriptions, Tap payments, coupons, usage events and the admin back-office API.
// Mounted by server.js: require("./commerce")(app, ctx).
const crypto = require("crypto");

const TAP_API = process.env.TAP_API_BASE || "https://api.tap.company/v2"; // overridable for local testing
const xpbundle = require("./xpbundle");
const FREE_XP_DEFAULT = ["xp-L-detail", "xp-R-tfng", "xp-W-t1", "xp-S-p1"];
// event types the browser may post. Server-recorded types (ai_writing, ai_speaking, ai_placement — which also count
// against AI quotas — and checkout_start) are deliberately absent: the client can't fake funnel steps or burn quota.
const EVENT_TYPES = new Set(["open", "diag_start", "diag_done", "xp_start", "xp_done", "limit_hit", "upgrade_view", "test_start", "test_done", "report_view", "lesson_done"]);

// Defaults: every value here can be changed from the admin dashboard (settings table).
const DEFAULTS = {
  plans: [
    { id: "m1", ar: "شهر واحد", en: "1 month", days: 30, price: 69, active: true },
    { id: "m3", ar: "٣ أشهر", en: "3 months", days: 90, price: 149, active: true, best: true },
    { id: "m6", ar: "٦ أشهر (حتى الاختبار)", en: "6 months (to test day)", days: 180, price: 199, active: true }
  ],
  currency: "SAR",
  refund: { on: true, days: 7 },
  free: {
    xp: FREE_XP_DEFAULT.slice(), // explainers open to everyone (ids); one per section by default
    dailyQuestions: 15,      // practice questions per day
    cardsFrac: 0.25,         // share of vocabulary cards
    planWeeks: 2,            // weeks of the study plan
    mistakesMax: 15,         // mistakes kept in the review box
    techFrac: 0.34,          // share of lessons & model answers
    diagnostic: true,        // the one free placement test
    aiWriting: 1,            // AI-marked essays for free users (lifetime)
    aiSpeaking: 1            // AI-marked speaking answers for free users (lifetime)
  },
  pro: { aiWritingDaily: 5, aiSpeakingDaily: 10 },
  banner: { on: true, ar: "عرض الإطلاق: خصم ٣٠٪ على كل الباقات بالرمز LAUNCH30 حتى ١٥ نوفمبر", en: "Launch offer: 30% off every plan with code LAUNCH30 until 15 November", tone: "info" },
  trialReportDays: 14
};

module.exports = function commerce(app, { pool, wrap, fail, needUser, needAdmin, isAdminEmail, limited, cleanName }) {
  // ---------- schema ----------
  async function migrate() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value JSONB NOT NULL, updated_at TIMESTAMPTZ NOT NULL DEFAULT now());
      CREATE TABLE IF NOT EXISTS subscriptions (
        id BIGSERIAL PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        plan_id TEXT, source TEXT NOT NULL, starts_at TIMESTAMPTZ NOT NULL, ends_at TIMESTAMPTZ NOT NULL,
        payment_id TEXT, note TEXT, created_by TEXT, revoked_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT now());
      CREATE INDEX IF NOT EXISTS subs_user_idx ON subscriptions(user_id);
      CREATE TABLE IF NOT EXISTS payments (
        id TEXT PRIMARY KEY, user_id TEXT REFERENCES users(id) ON DELETE SET NULL, email TEXT,
        plan_id TEXT, amount NUMERIC(10,2) NOT NULL, currency TEXT NOT NULL, coupon TEXT, status TEXT NOT NULL,
        tap_id TEXT UNIQUE, tap_status TEXT, refunded_amount NUMERIC(10,2) DEFAULT 0, refund_id TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(), paid_at TIMESTAMPTZ);
      CREATE INDEX IF NOT EXISTS pay_user_idx ON payments(user_id);
      CREATE TABLE IF NOT EXISTS coupons (
        code TEXT PRIMARY KEY, pct INT NOT NULL, max_uses INT, used INT NOT NULL DEFAULT 0, expires_at TIMESTAMPTZ,
        plan_ids TEXT[], active BOOLEAN NOT NULL DEFAULT true, note TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT now());
      CREATE TABLE IF NOT EXISTS events (
        id BIGSERIAL PRIMARY KEY, user_id TEXT REFERENCES users(id) ON DELETE CASCADE, type TEXT NOT NULL, k TEXT, v NUMERIC,
        day DATE NOT NULL DEFAULT CURRENT_DATE, at TIMESTAMPTZ NOT NULL DEFAULT now());
      CREATE INDEX IF NOT EXISTS events_type_idx ON events(type, day);
      CREATE INDEX IF NOT EXISTS events_user_idx ON events(user_id);
      CREATE UNIQUE INDEX IF NOT EXISTS events_open_once ON events(user_id, day) WHERE type='open';
      ALTER TABLE payments ADD COLUMN IF NOT EXISTS coupon_held BOOLEAN NOT NULL DEFAULT false;
      CREATE INDEX IF NOT EXISTS pay_coupon_idx ON payments(coupon) WHERE coupon IS NOT NULL;
      INSERT INTO coupons(code,pct,expires_at,note) VALUES ('LAUNCH30',30,'2026-11-15T23:59:59+03:00','launch offer') ON CONFLICT (code) DO NOTHING;
      CREATE TABLE IF NOT EXISTS admin_audit (
        id BIGSERIAL PRIMARY KEY, admin_email TEXT NOT NULL, action TEXT NOT NULL, target TEXT, meta JSONB, at TIMESTAMPTZ NOT NULL DEFAULT now());
    `);
  }

  // ---------- settings ----------
  let CFG = JSON.parse(JSON.stringify(DEFAULTS)), cfgAt = 0;
  const merge = (a, b) => { if (Array.isArray(b) || typeof b !== "object" || b === null) return b; const o = { ...a }; for (const k in b) o[k] = (a && typeof a[k] === "object" && !Array.isArray(a[k])) ? merge(a[k], b[k]) : b[k]; return o; };
  async function loadCfg(force) {
    if (!force && Date.now() - cfgAt < 30e3) return CFG;
    const r = await pool.query("SELECT value FROM settings WHERE key='config'");
    const stored = r.rows[0] ? JSON.parse(JSON.stringify(r.rows[0].value)) : {};
    // configs saved before the October 2026 repricing still carry the old default plans/banner: let the new defaults apply
    if (Array.isArray(stored.plans) && stored.plans.map(p => p.id + ':' + p.price).join(',') === "m1:59,m3:139") delete stored.plans;
    if (stored.banner && !stored.banner.on && !stored.banner.ar && !stored.banner.en) delete stored.banner;
    CFG = merge(JSON.parse(JSON.stringify(DEFAULTS)), stored); cfgAt = Date.now();
    return CFG;
  }
  const publicCfg = c => ({
    plans: c.plans.filter(p => p.active).map(({ id, ar, en, days, price, best }) => ({ id, ar, en, days, price, best: !!best })),
    currency: c.currency, refund: c.refund, free: c.free, pro: c.pro, ai: !!process.env.ANTHROPIC_API_KEY, banner: c.banner, trialReportDays: c.trialReportDays,
    payments: !!process.env.TAP_SECRET_KEY,
    social: require("./oauth").enabled()
  });
  const audit = (req, action, target, meta) => pool.query("INSERT INTO admin_audit(admin_email,action,target,meta) VALUES($1,$2,$3,$4)", [req.user.email, action, target || null, meta || null]).catch(e => console.error("audit", e.message));

  // ---------- entitlement ----------
  async function planOf(user) {
    if (!user) return { tier: "free", until: null, source: null };
    if (isAdminEmail(user.email)) return { tier: "pro", until: null, source: "admin" };
    const r = await pool.query("SELECT ends_at, source FROM subscriptions WHERE user_id=$1 AND revoked_at IS NULL AND starts_at<=now() AND ends_at>now() ORDER BY ends_at DESC LIMIT 1", [user.id]);
    const s = r.rows[0];
    return s ? { tier: "pro", until: s.ends_at, source: s.source } : { tier: "free", until: null, source: null };
  }
  const needPro = wrap(async (req, res, next) => { const p = await planOf(req.user); req.plan = p; return p.tier === "pro" ? next() : fail(res, 402, "subscription-required"); });
  async function grant(userId, days, source, extra = {}) {
    // new period starts when the current one ends (stacking), so renewing early never loses days
    const cur = await pool.query("SELECT max(ends_at) e FROM subscriptions WHERE user_id=$1 AND revoked_at IS NULL AND ends_at>now()", [userId]);
    const start = cur.rows[0].e ? new Date(cur.rows[0].e) : new Date();
    const end = new Date(start.getTime() + days * 86400e3);
    await pool.query("INSERT INTO subscriptions(user_id,plan_id,source,starts_at,ends_at,payment_id,note,created_by) VALUES($1,$2,$3,$4,$5,$6,$7,$8)",
      [userId, extra.planId || null, source, start, end, extra.paymentId || null, extra.note || null, extra.by || null]);
    return end;
  }

  // ---------- public config + plan ----------
  // explainers: lesson sources are split so premium lessons are only sent to subscribers
  async function bundles() { const c = await loadCfg(); const fx = (c.free.xp && c.free.xp.length) ? c.free.xp : FREE_XP_DEFAULT; return xpbundle.build(fx); }
  app.get("/xp/free.js", wrap(async (req, res) => { const b = await bundles(); res.set({ "Cache-Control": "no-cache" }).type("application/javascript").send(b.free); }));
  app.get("/api/xp/premium.js", needUser, needPro, wrap(async (req, res) => { const b = await bundles(); res.set({ "Cache-Control": "private, no-store" }).type("application/javascript").send(b.premium); }));
  app.get("/api/xp/keys", wrap(async (req, res) => { const b = await bundles(); res.json(b.keys); }));
  app.get("/api/config", wrap(async (req, res) => { const c = await loadCfg(); res.json({ config: publicCfg(c), plan: await planOf(req.user) }); }));
  app.get("/api/plan", needUser, wrap(async (req, res) => {
    const plan = await planOf(req.user);
    const subs = await pool.query("SELECT plan_id,source,starts_at,ends_at,revoked_at FROM subscriptions WHERE user_id=$1 ORDER BY starts_at DESC LIMIT 20", [req.user.id]);
    const pays = await pool.query("SELECT id,plan_id,amount,currency,status,created_at,paid_at,refunded_amount FROM payments WHERE user_id=$1 AND status<>'initiated' ORDER BY created_at DESC LIMIT 20", [req.user.id]);
    res.json({ plan, subscriptions: subs.rows, payments: pays.rows });
  }));

  // ---------- usage events (for the conversion funnel and content analytics) ----------
  app.post("/api/events", needUser, wrap(async (req, res) => {
    if (limited("ev:" + req.user.id, 600, 3600e3)) return fail(res, 429, "too-many-requests");
    const list = Array.isArray(req.body.events) ? req.body.events.slice(0, 50) : [];
    for (const e of list) {
      if (!e || !EVENT_TYPES.has(e.type)) continue;
      const k = e.k == null ? null : String(e.k).slice(0, 64), v = typeof e.v === "number" && isFinite(e.v) ? e.v : null;
      if (e.type === "open") await pool.query("INSERT INTO events(user_id,type) VALUES($1,'open') ON CONFLICT DO NOTHING", [req.user.id]);
      else await pool.query("INSERT INTO events(user_id,type,k,v) VALUES($1,$2,$3,$4)", [req.user.id, e.type, k, v]);
    }
    res.json({ ok: true });
  }));

  // ---------- checkout with Tap ----------
  const money = n => Math.round(Number(n) * 100) / 100;
  async function priceFor(planId, code, userId) {
    const c = await loadCfg(); const plan = c.plans.find(p => p.id === planId && p.active);
    if (!plan) return { error: "bad-plan" };
    let pct = 0, coupon = null;
    if (code) {
      const r = await pool.query("SELECT * FROM coupons WHERE code=$1", [String(code).trim().toUpperCase()]);
      const cp = r.rows[0];
      if (!cp || !cp.active || (cp.expires_at && new Date(cp.expires_at) < new Date()) || (cp.max_uses != null && cp.used >= cp.max_uses) || (cp.plan_ids && cp.plan_ids.length && !cp.plan_ids.includes(plan.id))) return { error: "bad-coupon" };
      if (userId && (await pool.query("SELECT 1 FROM payments WHERE user_id=$1 AND coupon=$2 AND status IN ('paid','refunded') LIMIT 1", [userId, cp.code])).rows[0]) return { error: "bad-coupon" }; // one use per learner
      pct = Math.max(0, Math.min(100, cp.pct)); coupon = cp.code;
    }
    const amount = pct >= 100 ? 0 : Math.max(1, money(plan.price * (100 - pct) / 100));
    return { plan, amount, pct, coupon, currency: c.currency };
  }
  app.post("/api/billing/quote", needUser, wrap(async (req, res) => {
    const q = await priceFor(String(req.body.plan || ""), req.body.coupon, req.user.id);
    if (q.error) return fail(res, 400, q.error);
    res.json({ plan: q.plan.id, amount: q.amount, currency: q.currency, pct: q.pct, coupon: q.coupon });
  }));
  async function tap(method, url, body) {
    const r = await fetch(TAP_API + url, { method, headers: { Authorization: "Bearer " + process.env.TAP_SECRET_KEY, "Content-Type": "application/json", accept: "application/json" }, body: body ? JSON.stringify(body) : undefined });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { const e = new Error("tap " + r.status + " " + JSON.stringify(j).slice(0, 300)); e.tap = j; throw e; }
    return j;
  }
  // A coupon use is "held" by a payment (payments.coupon_held) from checkout until the payment fails/expires.
  // claimCoupon: per learner+code advisory lock; refuses a code the learner already paid with; supersedes the learner's
  // unfinished checkouts with the same code (they release their hold); then increments `used` only while under max_uses.
  async function claimCoupon(user, q, pid) {
    const db = await pool.connect();
    try {
      await db.query("BEGIN");
      await db.query("SELECT pg_advisory_xact_lock(hashtext($1))", ["coupon|" + user.id + "|" + q.coupon]);
      if ((await db.query("SELECT 1 FROM payments WHERE user_id=$1 AND coupon=$2 AND status IN ('paid','refunded') LIMIT 1", [user.id, q.coupon])).rows[0]) { await db.query("ROLLBACK"); return { error: "bad-coupon" }; }
      await db.query(`WITH old AS (SELECT id, coupon_held FROM payments WHERE user_id=$1 AND coupon=$2 AND status='initiated' FOR UPDATE),
          upd AS (UPDATE payments p SET status='expired', coupon_held=false FROM old WHERE p.id=old.id)
        UPDATE coupons SET used=GREATEST(used-(SELECT count(*) FROM old WHERE coupon_held)::int,0) WHERE code=$2 AND EXISTS (SELECT 1 FROM old WHERE coupon_held)`, [user.id, q.coupon]);
      const cp = (await db.query(`UPDATE coupons SET used=used+1 WHERE code=$1 AND active AND (max_uses IS NULL OR used<max_uses) AND (expires_at IS NULL OR expires_at>now())
        AND (plan_ids IS NULL OR cardinality(plan_ids)=0 OR $2=ANY(plan_ids)) RETURNING pct`, [q.coupon, q.plan.id])).rows[0];
      if (!cp) { await db.query("ROLLBACK"); return { error: "bad-coupon" }; }
      const pct = Math.max(0, Math.min(100, cp.pct)), amount = pct >= 100 ? 0 : Math.max(1, money(q.plan.price * (100 - pct) / 100));
      await db.query("INSERT INTO payments(id,user_id,email,plan_id,amount,currency,coupon,status,paid_at,coupon_held) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,true)",
        [pid, user.id, user.email, q.plan.id, amount, q.currency, q.coupon, amount === 0 ? "paid" : "initiated", amount === 0 ? new Date() : null]);
      await db.query("COMMIT");
      return { q: { ...q, pct, amount } };
    } catch (e) { await db.query("ROLLBACK").catch(() => {}); throw e; }
    finally { db.release(); }
  }
  // give back the coupon use held by a payment (idempotent: only the first call decrements)
  const releaseCoupon = pid => pool.query(`WITH r AS (UPDATE payments SET coupon_held=false WHERE id=$1 AND coupon_held AND coupon IS NOT NULL RETURNING coupon)
    UPDATE coupons c SET used=GREATEST(c.used-1,0) FROM r WHERE c.code=r.coupon`, [pid]);
  // a paid payment always counts its coupon once (covers payments started before holds existed, or released then paid)
  const holdCoupon = pid => pool.query(`WITH r AS (UPDATE payments SET coupon_held=true WHERE id=$1 AND NOT coupon_held AND coupon IS NOT NULL RETURNING coupon)
    UPDATE coupons c SET used=c.used+1 FROM r WHERE c.code=r.coupon`, [pid]);
  const baseUrl = req => (process.env.PUBLIC_URL || ("https://" + (process.env.CANONICAL_HOST || req.headers.host))).replace(/\/$/, "");
  app.post("/api/billing/checkout", needUser, wrap(async (req, res) => {
    if (limited("co:" + req.user.id, 20, 3600e3)) return fail(res, 429, "too-many-requests");
    let q = await priceFor(String(req.body.plan || ""), req.body.coupon, req.user.id);
    if (q.error) return fail(res, 400, q.error);
    if (q.amount > 0 && !process.env.TAP_SECRET_KEY) return fail(res, 503, "payments-not-configured");
    const pid = "pay_" + crypto.randomBytes(9).toString("base64url");
    await pool.query("INSERT INTO events(user_id,type,k) VALUES($1,'checkout_start',$2)", [req.user.id, q.plan.id]);
    if (q.coupon) { // claim the coupon atomically together with creating the payment row
      const c = await claimCoupon(req.user, q, pid);
      if (c.error) return fail(res, 400, c.error);
      q = c.q;
    } else {
      await pool.query("INSERT INTO payments(id,user_id,email,plan_id,amount,currency,coupon,status) VALUES($1,$2,$3,$4,$5,$6,NULL,'initiated')", [pid, req.user.id, req.user.email, q.plan.id, q.amount, q.currency]);
    }
    if (q.amount === 0) { // 100% coupon: activated without a payment (row already stored as paid)
      const until = await grant(req.user.id, q.plan.days, "coupon", { planId: q.plan.id, paymentId: pid });
      return res.json({ activated: true, until });
    }
    const base = baseUrl(req), name = (req.user.name || "").split(" ");
    const lang = req.body.lang === "en" ? "en" : "ar";
    let charge;
    try { charge = await tap("POST", "/charges/", {
      amount: q.amount, currency: q.currency, threeDSecure: true, save_card: false,
      description: (lang === "en" ? "IELTS Academy — " + q.plan.en : "أكاديمية الآيلتس — " + q.plan.ar),
      metadata: { pid, uid: req.user.id, plan: q.plan.id },
      reference: { transaction: pid, order: pid },
      receipt: { email: true, sms: false },
      customer: { first_name: name[0] || "Student", last_name: name.slice(1).join(" ") || "-", email: req.user.email },
      source: { id: "src_all" },
      post: { url: base + "/api/billing/webhook" },
      redirect: { url: base + "/api/billing/return?pid=" + pid }
    }); } catch (e) { // charge never created: free the coupon slot so the learner can retry
      await pool.query("UPDATE payments SET status='failed' WHERE id=$1 AND status='initiated'", [pid]); await releaseCoupon(pid); throw e;
    }
    await pool.query("UPDATE payments SET tap_id=$1, tap_status=$2 WHERE id=$3", [charge.id, charge.status, pid]);
    res.json({ url: charge.transaction && charge.transaction.url });
  }));
  // verify a Tap charge by fetching it from Tap (never trust the redirect alone) and activate exactly once
  async function settle(tapId) {
    const ch = await tap("GET", "/charges/" + encodeURIComponent(tapId));
    const pid = ch.metadata && ch.metadata.pid || (ch.reference && ch.reference.transaction);
    const r = await pool.query("SELECT * FROM payments WHERE id=$1", [pid]); const p = r.rows[0];
    if (!p) return { status: "unknown" };
    await pool.query("UPDATE payments SET tap_status=$1, tap_id=COALESCE(tap_id,$2) WHERE id=$3", [ch.status, ch.id, pid]);
    if (ch.status !== "CAPTURED") {
      if (["FAILED", "DECLINED", "CANCELLED", "ABANDONED", "RESTRICTED", "VOID", "TIMEDOUT"].includes(ch.status)) {
        await pool.query("UPDATE payments SET status='failed' WHERE id=$1 AND status IN ('initiated','expired')", [pid]);
        await releaseCoupon(pid);
      }
      return { status: ch.status, pid };
    }
    if (money(ch.amount) !== money(p.amount) || String(ch.currency).toUpperCase() !== p.currency) { console.error("tap amount mismatch", pid); return { status: "mismatch", pid }; }
    const up = await pool.query("UPDATE payments SET status='paid', paid_at=now() WHERE id=$1 AND status NOT IN ('paid','refunded') RETURNING *", [pid]);
    if (up.rows[0]) { // first time we see it paid
      await holdCoupon(pid); // no-op when the checkout already holds the use (no double count)
      // account deleted before the charge settled: keep the payment (admin can refund) and answer 200 so Tap stops retrying
      if (!p.user_id) { console.error("tap: payment settled for a deleted account", pid); return { status: "CAPTURED", pid, orphan: true }; }
      const c = await loadCfg(); const plan = c.plans.find(x => x.id === p.plan_id) || { days: 30 };
      await grant(p.user_id, plan.days, "tap", { planId: p.plan_id, paymentId: pid });
    }
    return { status: "CAPTURED", pid };
  }
  app.get("/api/billing/return", wrap(async (req, res) => {
    const tapId = String(req.query.tap_id || ""); let ok = false;
    if (/^chg_[\w]+$/.test(tapId) && process.env.TAP_SECRET_KEY) { try { ok = (await settle(tapId)).status === "CAPTURED"; } catch (e) { console.error("tap return", e.message); } }
    res.redirect(302, "/app#upgrade?" + (ok ? "paid=1" : "failed=1"));
  }));
  // webhook: Tap posts the charge; we check the hashstring signature, then re-fetch the charge before acting
  app.post("/api/billing/webhook", wrap(async (req, res) => {
    const b = req.body || {}, key = process.env.TAP_SECRET_KEY;
    if (!key) return res.status(503).end();
    const amt = Number(b.amount).toFixed(2);
    const str = `x_id${b.id}x_amount${amt}x_currency${b.currency}x_gateway_reference${(b.reference && b.reference.gateway) || ""}x_payment_reference${(b.reference && b.reference.payment) || ""}x_status${b.status}x_created${(b.transaction && b.transaction.created) || ""}`;
    const sig = crypto.createHmac("sha256", key).update(str).digest("hex");
    const got = String(req.get("hashstring") || "");
    if (!got || got.length !== sig.length || !crypto.timingSafeEqual(Buffer.from(got), Buffer.from(sig))) { console.error("tap webhook: bad signature"); return res.status(400).end(); }
    if (/^chg_/.test(b.id || "")) { try { await settle(b.id); } catch (e) { console.error("tap webhook settle", e.message); return res.status(500).end(); } }
    res.json({ ok: true });
  }));

  // unfinished Tap checkouts that hold a coupon: re-check after an hour (frees the use when abandoned); expire after 2 days
  setInterval(async () => {
    try {
      await pool.query("UPDATE payments SET status='expired' WHERE status='initiated' AND created_at<now()-interval '2 days'");
      const st = await pool.query("SELECT id,tap_id FROM payments WHERE coupon_held AND status IN ('initiated','expired') AND created_at<now()-interval '1 hour' ORDER BY created_at LIMIT 20");
      for (const r of st.rows) {
        if (r.tap_id && process.env.TAP_SECRET_KEY) { try { await settle(r.tap_id); } catch (e) { console.error("coupon sweep", e.message); continue; } }
        const p = (await pool.query("SELECT status FROM payments WHERE id=$1", [r.id])).rows[0];
        if ((p && p.status === "expired") || !r.tap_id) await releaseCoupon(r.id);
      }
    } catch (e) { console.error("coupon sweep", e.message); }
  }, 1800e3).unref();

  // ======================= ADMIN =======================
  const A = (method, route, fn) => app[method]("/api/admin" + route, needAdmin, wrap(fn));
  const day = d => new Date(d).toISOString().slice(0, 10);

  A("get", "/overview", async (req, res) => {
    const days = Math.max(7, Math.min(365, Number(req.query.days) || 30));
    const q = (s, p) => pool.query(s, p).then(r => r.rows);
    const [tot] = await q(`SELECT (SELECT count(*) FROM users)::int users,
      (SELECT count(DISTINCT user_id) FROM subscriptions WHERE revoked_at IS NULL AND starts_at<=now() AND ends_at>now())::int pro,
      (SELECT count(*) FROM users WHERE created_at>now()-interval '7 days')::int new7,
      (SELECT count(DISTINCT user_id) FROM events WHERE type='open' AND day=CURRENT_DATE)::int dau,
      (SELECT count(DISTINCT user_id) FROM events WHERE type='open' AND day>CURRENT_DATE-7)::int wau,
      (SELECT count(DISTINCT user_id) FROM events WHERE type='open' AND day>CURRENT_DATE-30)::int mau,
      (SELECT COALESCE(sum(amount-COALESCE(refunded_amount,0)),0) FROM payments WHERE status IN ('paid','refunded') AND paid_at>now()-($1||' days')::interval)::float revenue,
      (SELECT COALESCE(sum(amount-COALESCE(refunded_amount,0)),0) FROM payments WHERE status IN ('paid','refunded'))::float revenueAll,
      (SELECT count(*) FROM payments WHERE status='paid' AND paid_at>now()-($1||' days')::interval)::int orders,
      (SELECT count(*) FROM subscriptions WHERE revoked_at IS NULL AND ends_at BETWEEN now() AND now()+interval '7 days')::int expiring7`, [String(days)]);
    const signups = await q(`SELECT created_at::date d, count(*)::int n FROM users WHERE created_at>now()-($1||' days')::interval GROUP BY 1 ORDER BY 1`, [String(days)]);
    const active = await q(`SELECT day d, count(DISTINCT user_id)::int n FROM events WHERE type='open' AND day>CURRENT_DATE-$1::int GROUP BY 1 ORDER BY 1`, [days]);
    const revenue = await q(`SELECT paid_at::date d, sum(amount-COALESCE(refunded_amount,0))::float n FROM payments WHERE status IN ('paid','refunded') AND paid_at>now()-($1||' days')::interval GROUP BY 1 ORDER BY 1`, [String(days)]);
    const byPlan = await q(`SELECT plan_id, count(*)::int n, sum(amount)::float amount FROM payments WHERE status='paid' GROUP BY 1`);
    res.json({ days, totals: { ...tot, free: tot.users - tot.pro, conversion: tot.users ? tot.pro / tot.users : 0 },
      series: { signups: signups.map(r => ({ d: day(r.d), n: r.n })), active: active.map(r => ({ d: day(r.d), n: r.n })), revenue: revenue.map(r => ({ d: day(r.d), n: r.n })) }, byPlan });
  });

  A("get", "/funnel", async (req, res) => {
    const days = Math.max(7, Math.min(365, Number(req.query.days) || 90));
    const r = await pool.query(`WITH u AS (SELECT id FROM users WHERE created_at>now()-($1||' days')::interval)
      SELECT (SELECT count(*) FROM u)::int signed_up,
        (SELECT count(DISTINCT e.user_id) FROM events e JOIN u ON u.id=e.user_id WHERE e.type='diag_done')::int diagnostic,
        (SELECT count(DISTINCT e.user_id) FROM events e JOIN u ON u.id=e.user_id WHERE e.type IN ('ai_writing','ai_speaking'))::int explainer,
        (SELECT count(DISTINCT e.user_id) FROM events e JOIN u ON u.id=e.user_id WHERE e.type='limit_hit')::int hit_limit,
        (SELECT count(DISTINCT e.user_id) FROM events e JOIN u ON u.id=e.user_id WHERE e.type='upgrade_view')::int saw_plans,
        (SELECT count(DISTINCT e.user_id) FROM events e JOIN u ON u.id=e.user_id WHERE e.type='checkout_start')::int checkout,
        (SELECT count(DISTINCT s.user_id) FROM subscriptions s JOIN u ON u.id=s.user_id WHERE s.source IN ('tap','coupon'))::int paid`, [String(days)]);
    const limits = await pool.query(`SELECT k, count(*)::int n, count(DISTINCT user_id)::int users FROM events WHERE type='limit_hit' AND at>now()-($1||' days')::interval GROUP BY k ORDER BY n DESC`, [String(days)]);
    res.json({ days, steps: r.rows[0], limits: limits.rows });
  });

  A("get", "/users", async (req, res) => {
    const qs = String(req.query.q || "").trim().toLowerCase(), plan = String(req.query.plan || ""), sort = String(req.query.sort || "active");
    const page = Math.max(0, Number(req.query.page) || 0), size = Math.min(200, Math.max(10, Number(req.query.size) || 50));
    const where = [], params = [];
    if (qs) { params.push("%" + qs + "%"); where.push(`(lower(u.email) LIKE $${params.length} OR lower(COALESCE(u.name,'')) LIKE $${params.length})`); }
    if (plan === "pro") where.push("s.ends_at IS NOT NULL"); else if (plan === "free") where.push("s.ends_at IS NULL");
    const order = { active: "p.updated_at DESC NULLS LAST", new: "u.created_at DESC", name: "lower(COALESCE(u.name,u.email))", ends: "s.ends_at ASC NULLS LAST" }[sort] || "p.updated_at DESC NULLS LAST";
    const base = `FROM users u LEFT JOIN progress p ON p.user_id=u.id
      LEFT JOIN LATERAL (SELECT max(ends_at) ends_at, (array_agg(source ORDER BY ends_at DESC))[1] source FROM subscriptions WHERE user_id=u.id AND revoked_at IS NULL AND starts_at<=now() AND ends_at>now()) s ON true
      ${where.length ? "WHERE " + where.join(" AND ") : ""}`;
    const total = (await pool.query("SELECT count(*)::int n " + base, params)).rows[0].n;
    const r = await pool.query(`SELECT u.id,u.email,u.name,u.created_at,p.track,p.target,p.exam_date,p.summary,p.updated_at,s.ends_at pro_until,s.source pro_source ${base} ORDER BY ${order} LIMIT ${size} OFFSET ${page * size}`, params);
    res.json({ total, page, size, users: r.rows.map(x => ({ ...x, isAdmin: isAdminEmail(x.email) })) });
  });
  A("get", "/users.csv", async (req, res) => {
    const r = await pool.query(`SELECT u.email,u.name,u.created_at,p.track,p.target,p.exam_date,p.summary,p.updated_at,
      (SELECT max(ends_at) FROM subscriptions WHERE user_id=u.id AND revoked_at IS NULL AND ends_at>now()) pro_until FROM users u LEFT JOIN progress p ON p.user_id=u.id ORDER BY u.created_at`);
    const esc = v => { const s = v == null ? "" : String(v instanceof Date ? v.toISOString() : v); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
    const head = ["email", "name", "created_at", "track", "target", "exam_date", "est_score", "accuracy", "solved", "last_active", "pro_until"];
    const rows = r.rows.map(x => [x.email, x.name, x.created_at, x.track, x.target, x.exam_date, x.summary && x.summary.est, x.summary && x.summary.acc, x.summary && x.summary.solved, x.summary && x.summary.lastActive, x.pro_until].map(esc).join(","));
    audit(req, "export_users", null, { n: rows.length });
    res.set({ "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="ielts-academy-users-${day(new Date())}.csv"` }).send("﻿" + head.join(",") + "\n" + rows.join("\n"));
  });
  A("get", "/users/:id", async (req, res) => {
    const id = req.params.id;
    const u = (await pool.query("SELECT u.id,u.email,u.name,u.created_at,p.track,p.target,p.lang,p.exam_date,p.summary,p.updated_at,p.p FROM users u LEFT JOIN progress p ON p.user_id=u.id WHERE u.id=$1", [id])).rows[0];
    if (!u) return fail(res, 404, "not-found");
    let skills = {}, attempts = [], xp = {}, diag = null;
    try { const S = JSON.parse(u.p || "null") || {}; skills = S.stats || {}; attempts = (S.attempts || []).slice(-30).reverse(); xp = S.xp || {}; diag = S.diag || null; } catch (e) {}
    delete u.p;
    const subs = (await pool.query("SELECT id,plan_id,source,starts_at,ends_at,revoked_at,note,created_by,payment_id FROM subscriptions WHERE user_id=$1 ORDER BY starts_at DESC", [id])).rows;
    const pays = (await pool.query("SELECT id,plan_id,amount,currency,coupon,status,tap_id,tap_status,refunded_amount,created_at,paid_at FROM payments WHERE user_id=$1 ORDER BY created_at DESC", [id])).rows;
    const events = (await pool.query("SELECT type,k,v,at FROM events WHERE user_id=$1 ORDER BY at DESC LIMIT 60", [id])).rows;
    res.json({ user: { ...u, isAdmin: isAdminEmail(u.email) }, plan: await planOf(u), skills, attempts, xp, diag, subscriptions: subs, payments: pays, events });
  });
  A("post", "/users/:id/grant", async (req, res) => {
    const days = Math.round(Number(req.body.days)); if (!(days >= 1 && days <= 1000)) return fail(res, 400, "bad-days");
    const u = (await pool.query("SELECT id,email FROM users WHERE id=$1", [req.params.id])).rows[0]; if (!u) return fail(res, 404, "not-found");
    const note = String(req.body.note || "").slice(0, 200);
    const until = await grant(u.id, days, "manual", { note, by: req.user.email });
    audit(req, "grant", u.email, { days, note }); res.json({ until });
  });
  A("post", "/users/:id/revoke", async (req, res) => {
    const r = await pool.query("UPDATE subscriptions SET revoked_at=now() WHERE user_id=$1 AND revoked_at IS NULL AND ends_at>now() RETURNING id", [req.params.id]);
    const em = (await pool.query("SELECT email FROM users WHERE id=$1", [req.params.id])).rows[0];
    audit(req, "revoke", em ? em.email : req.params.id, { n: r.rowCount }); res.json({ revoked: r.rowCount });
  });
  A("post", "/users/:id/name", async (req, res) => {
    const name = cleanName(req.body.name); if (name.length < 2 || name.length > 60) return fail(res, 400, "invalid-name");
    const r = await pool.query("UPDATE users SET name=$1 WHERE id=$2 RETURNING email", [name, req.params.id]); if (!r.rows[0]) return fail(res, 404, "not-found");
    audit(req, "rename", r.rows[0].email, { name }); res.json({ ok: true });
  });

  A("get", "/payments", async (req, res) => {
    const st = String(req.query.status || "");
    const r = await pool.query(`SELECT id,user_id,email,plan_id,amount,currency,coupon,status,tap_id,tap_status,refunded_amount,created_at,paid_at FROM payments ${st ? "WHERE status=$1" : "WHERE status<>'initiated' OR created_at>now()-interval '2 days'"} ORDER BY created_at DESC LIMIT 500`, st ? [st] : []);
    res.json({ payments: r.rows, tap: !!process.env.TAP_SECRET_KEY });
  });
  A("post", "/payments/:id/refund", async (req, res) => {
    const p = (await pool.query("SELECT * FROM payments WHERE id=$1", [req.params.id])).rows[0];
    if (!p || p.status !== "paid") return fail(res, 400, "not-refundable");
    const amount = req.body.amount != null ? money(req.body.amount) : money(p.amount);
    if (!(amount > 0 && amount <= money(p.amount))) return fail(res, 400, "bad-amount");
    let refundId = null;
    if (p.tap_id && Number(p.amount) > 0) {
      if (!process.env.TAP_SECRET_KEY) return fail(res, 503, "payments-not-configured");
      const rf = await tap("POST", "/refunds/", { charge_id: p.tap_id, amount, currency: p.currency, reason: String(req.body.reason || "requested_by_customer").slice(0, 100), reference: { merchant: p.id }, post: { url: baseUrl(req) + "/api/billing/refund-webhook" } });
      refundId = rf.id || null;
    }
    await pool.query("UPDATE payments SET status='refunded', refunded_amount=$1, refund_id=$2 WHERE id=$3", [amount, refundId, p.id]);
    if (req.body.revoke !== false) await pool.query("UPDATE subscriptions SET revoked_at=now() WHERE payment_id=$1 AND revoked_at IS NULL", [p.id]);
    audit(req, "refund", p.id, { amount, refundId }); res.json({ ok: true, refundId });
  });
  app.post("/api/billing/refund-webhook", (req, res) => res.json({ ok: true }));
  A("post", "/payments/:id/recheck", async (req, res) => {
    const p = (await pool.query("SELECT tap_id FROM payments WHERE id=$1", [req.params.id])).rows[0];
    if (!p || !p.tap_id) return fail(res, 400, "no-charge");
    if (!process.env.TAP_SECRET_KEY) return fail(res, 503, "payments-not-configured");
    res.json(await settle(p.tap_id));
  });

  A("get", "/coupons", async (req, res) => res.json({ coupons: (await pool.query("SELECT * FROM coupons ORDER BY created_at DESC")).rows }));
  A("post", "/coupons", async (req, res) => {
    const code = String(req.body.code || "").trim().toUpperCase();
    if (!/^[A-Z0-9_-]{3,32}$/.test(code)) return fail(res, 400, "bad-code");
    const pct = Math.round(Number(req.body.pct)); if (!(pct >= 1 && pct <= 100)) return fail(res, 400, "bad-pct");
    const maxUses = req.body.maxUses ? Math.max(1, Math.round(Number(req.body.maxUses))) : null;
    const exp = req.body.expires ? new Date(req.body.expires) : null; if (exp && isNaN(exp)) return fail(res, 400, "bad-date");
    const plans = Array.isArray(req.body.plans) && req.body.plans.length ? req.body.plans.map(String) : null;
    try { await pool.query("INSERT INTO coupons(code,pct,max_uses,expires_at,plan_ids,note) VALUES($1,$2,$3,$4,$5,$6)", [code, pct, maxUses, exp, plans, String(req.body.note || "").slice(0, 200)]); }
    catch (e) { if (e.code === "23505") return fail(res, 409, "exists"); throw e; }
    audit(req, "coupon_create", code, { pct, maxUses, exp, plans }); res.json({ ok: true });
  });
  A("patch", "/coupons/:code", async (req, res) => {
    const r = await pool.query("UPDATE coupons SET active=$1 WHERE code=$2", [!!req.body.active, req.params.code]);
    if (!r.rowCount) return fail(res, 404, "not-found");
    audit(req, req.body.active ? "coupon_on" : "coupon_off", req.params.code); res.json({ ok: r.rowCount > 0 });
  });
  A("delete", "/coupons/:code", async (req, res) => {
    const r = await pool.query("DELETE FROM coupons WHERE code=$1 AND used=0", [req.params.code]);
    if (!r.rowCount) { const ex = await pool.query("SELECT 1 FROM coupons WHERE code=$1", [req.params.code]); return fail(res, ex.rowCount ? 409 : 404, ex.rowCount ? "in-use" : "not-found"); }
    audit(req, "coupon_delete", req.params.code); res.json({ ok: true });
  });

  A("get", "/settings", async (req, res) => { const c = await loadCfg(true); res.json({ config: c, defaults: DEFAULTS, xpKeys: xpbundle.allKeys(), tap: !!process.env.TAP_SECRET_KEY }); });
  A("put", "/settings", async (req, res) => {
    const v = req.body && req.body.config; if (!v || typeof v !== "object") return fail(res, 400, "bad-config");
    const c = merge(JSON.parse(JSON.stringify(DEFAULTS)), v);
    // validate
    if (!Array.isArray(c.plans) || !c.plans.length || c.plans.some(p => !/^[\w-]{1,20}$/.test(p.id || "") || !(Number(p.price) > 0) || !(Number(p.days) >= 1))) return fail(res, 400, "bad-plans");
    c.plans = c.plans.map(p => ({ id: p.id, ar: String(p.ar || "").slice(0, 60), en: String(p.en || "").slice(0, 60), days: Math.round(Number(p.days)), price: money(p.price), active: p.active !== false, best: !!p.best }));
    const f = c.free; f.dailyQuestions = Math.max(0, Math.min(500, Math.round(Number(f.dailyQuestions) || 0)));
    ["cardsFrac", "techFrac"].forEach(k => { f[k] = Math.max(0, Math.min(1, Number(f[k]) || 0)); });
    f.planWeeks = Math.max(0, Math.min(52, Math.round(Number(f.planWeeks) || 0))); f.mistakesMax = Math.max(0, Math.min(1000, Math.round(Number(f.mistakesMax) || 0)));
    f.xp = Array.isArray(f.xp) ? f.xp.map(String).filter(k => /^[\w-]{1,40}$/.test(k)) : DEFAULTS.free.xp;
    ["aiWriting", "aiSpeaking"].forEach(k => { f[k] = Math.max(0, Math.min(50, Math.round(Number(f[k]) || 0))); });
    c.pro = { aiWritingDaily: Math.max(0, Math.min(100, Math.round(Number((c.pro || {}).aiWritingDaily) || 5))), aiSpeakingDaily: Math.max(0, Math.min(200, Math.round(Number((c.pro || {}).aiSpeakingDaily) || 10))) };
    c.banner = { on: !!c.banner.on, ar: String(c.banner.ar || "").slice(0, 200), en: String(c.banner.en || "").slice(0, 200), tone: ["info", "promo", "warn"].includes(c.banner.tone) ? c.banner.tone : "info" };
    c.refund = { on: !!c.refund.on, days: Math.max(0, Math.min(60, Math.round(Number(c.refund.days) || 0))) };
    c.trialReportDays = Math.max(1, Math.min(60, Math.round(Number(c.trialReportDays) || 14)));
    await pool.query("INSERT INTO settings(key,value,updated_at) VALUES('config',$1,now()) ON CONFLICT (key) DO UPDATE SET value=$1, updated_at=now()", [c]);
    await loadCfg(true);
    audit(req, "settings", null, null); res.json({ config: c });
  });

  A("get", "/content", async (req, res) => {
    const days = Math.max(7, Math.min(365, Number(req.query.days) || 90));
    const xp = (await pool.query(`SELECT k, count(*) FILTER (WHERE type='xp_start')::int starts, count(DISTINCT user_id) FILTER (WHERE type='xp_start')::int users,
      count(*) FILTER (WHERE type='xp_done')::int done, avg(v) FILTER (WHERE type='xp_done')::float score
      FROM events WHERE type IN ('xp_start','xp_done') AND at>now()-($1||' days')::interval AND k IS NOT NULL GROUP BY k ORDER BY starts DESC`, [String(days)])).rows;
    // skill accuracy aggregated from the students' saved progress (stats per skill: c correct, t total, time)
    const prog = await pool.query("SELECT p FROM progress WHERE updated_at>now()-($1||' days')::interval", [String(days)]);
    const skills = {};
    for (const row of prog.rows) { try { const st = (JSON.parse(row.p) || {}).stats || {}; for (const s in st) { const x = skills[s] || (skills[s] = { c: 0, t: 0, time: 0, users: 0 }); x.c += st[s].c || 0; x.t += st[s].t || 0; x.time += st[s].time || 0; x.users++; } } catch (e) {} }
    const tests = (await pool.query(`SELECT k, count(*)::int n, avg(v)::float avg FROM events WHERE type='test_done' AND at>now()-($1||' days')::interval GROUP BY k ORDER BY n DESC`, [String(days)])).rows;
    res.json({ days, explainers: xp, skills, tests });
  });
  A("get", "/audit", async (req, res) => res.json({ audit: (await pool.query("SELECT admin_email,action,target,meta,at FROM admin_audit ORDER BY at DESC LIMIT 300")).rows }));

  return { migrate, planOf, loadCfg, publicCfg, needPro };
};
module.exports.DEFAULTS = DEFAULTS;
