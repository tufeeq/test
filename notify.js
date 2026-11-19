// Automatic messages: email (SMTP) and browser push (Web Push with VAPID keys), plus the scheduler that sends them.
//
//  - email needs SMTP_URL (e.g. smtps://user:pass@smtp.example.com:465) and MAIL_FROM ("أكاديمية القدرات <info@gat.academy>").
//    Without SMTP_URL nothing is emailed; the admin dashboard says so. NOTIFY_DRY=1 records messages instead of sending (tests).
//  - push needs nothing: the VAPID key pair is generated once and kept in the settings table (VAPID_PUBLIC_KEY /
//    VAPID_PRIVATE_KEY override it). A student turns it on from the app; that consent is the opt-in.
//  - what is sent, at most once each (notify_log has one row per user, kind, reference and channel):
//      welcome    email, to new accounts (created after this feature went live)
//      reminder   push daily, email every 3 days at most; only when the student has not practised today, has
//                 practised before, and was active in the last 21 days. Email only with the reminder box ticked.
//                 Sent in the evening, Saudi time (19:00–22:00).
//      trial_end  email + push, the day before a trial ends
//      expiring   email + push, 3 days before a subscription ends
//  - every email carries a one-click unsubscribe link (signed), which stops reminder and service emails.
"use strict";
const crypto = require("crypto");

const KSA = 3 * 3600e3;
const ksaDay = (t = Date.now()) => new Date(t + KSA).toISOString().slice(0, 10);
const ksaHour = (t = Date.now()) => new Date(t + KSA).getUTCHours();
const dayDiff = (a, b) => Math.round((Date.parse(a + "T00:00:00Z") - Date.parse(b + "T00:00:00Z")) / 864e5);
const AR_D = "٠١٢٣٤٥٦٧٨٩";
const arNum = n => String(n).replace(/\d/g, d => AR_D[d]);
const arDays = n => n === 1 ? "يوم واحد" : n === 2 ? "يومان" : arNum(n) + " " + (n % 100 >= 3 && n % 100 <= 10 ? "أيام" : "يومًا");
const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

module.exports = function notify(app, { pool, wrap, fail, needUser, needAdmin, limited }) {
  const DRY = process.env.NOTIFY_DRY === "1";
  const ORIGIN = (process.env.PUBLIC_URL || "https://gat.academy").replace(/\/$/, "");
  const FROM = process.env.MAIL_FROM || "أكاديمية القدرات <info@gat.academy>";
  const outbox = []; // NOTIFY_DRY only
  let transport = null, webpush = null, vapid = null, secret = null, since = null;
  const state = { lastRun: null, lastResult: null, running: false };

  async function getSetting(k) { const r = await pool.query("SELECT value FROM settings WHERE key=$1", [k]); return r.rows[0] ? r.rows[0].value : null; }
  async function putSettingOnce(k, v) {
    await pool.query("INSERT INTO settings(key,value,updated_at) VALUES($1,$2,now()) ON CONFLICT (key) DO NOTHING", [k, v]);
    return getSetting(k);
  }

  async function migrate() {
    await pool.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS mail_off BOOLEAN NOT NULL DEFAULT false;
      CREATE TABLE IF NOT EXISTS push_subs (endpoint TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        p256dh TEXT NOT NULL, auth TEXT NOT NULL, lang TEXT, fails INT NOT NULL DEFAULT 0, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), last_ok TIMESTAMPTZ);
      CREATE INDEX IF NOT EXISTS push_subs_user_idx ON push_subs(user_id);
      CREATE TABLE IF NOT EXISTS notify_log (id BIGSERIAL PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        kind TEXT NOT NULL, ref TEXT NOT NULL, ch TEXT NOT NULL, ok BOOLEAN, at TIMESTAMPTZ NOT NULL DEFAULT now(), UNIQUE(user_id, kind, ref, ch));
      CREATE INDEX IF NOT EXISTS notify_log_at_idx ON notify_log(at);
    `);
    // the welcome email goes to accounts created from now on, never to everyone who signed up before
    since = (await putSettingOnce("notify_since", { at: new Date().toISOString() })).at;
    secret = process.env.NOTIFY_SECRET || (await putSettingOnce("notify_secret", { k: crypto.randomBytes(24).toString("hex") })).k;
    if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) vapid = { publicKey: process.env.VAPID_PUBLIC_KEY, privateKey: process.env.VAPID_PRIVATE_KEY };
    else {
      const cur = await getSetting("vapid");
      vapid = cur && cur.publicKey ? cur : await putSettingOnce("vapid", require("web-push").generateVAPIDKeys());
    }
    webpush = require("web-push");
    webpush.setVapidDetails("mailto:info@gat.academy", vapid.publicKey, vapid.privateKey);
    if (process.env.SMTP_URL && !DRY) transport = require("nodemailer").createTransport(process.env.SMTP_URL, { pool: true, maxConnections: 2 });
  }
  const mailOn = () => DRY || !!transport;

  // ---------- unsubscribe ----------
  const unsubTok = id => crypto.createHmac("sha256", secret).update("unsub:" + id).digest("base64url").slice(0, 32);
  const unsubUrl = id => `${ORIGIN}/u/unsub?u=${encodeURIComponent(id)}&t=${unsubTok(id)}`;
  async function unsub(req, res) {
    const id = String(req.query.u || req.body && req.body.u || ""), t = String(req.query.t || req.body && req.body.t || "");
    const want = id ? unsubTok(id) : "";
    const good = id && t.length === want.length && crypto.timingSafeEqual(Buffer.from(t), Buffer.from(want));
    if (good) await pool.query("UPDATE users SET mail_off=true, remind=false WHERE id=$1", [id]);
    if (req.method === "POST") return res.status(good ? 200 : 400).end(); // RFC 8058 one-click (List-Unsubscribe-Post)
    res.status(good ? 200 : 400).type("html").send(`<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>أكاديمية القدرات</title>
<body style="font-family:system-ui,Tahoma,sans-serif;background:#F6F4FF;color:#1D1838;display:grid;place-items:center;min-height:90vh;margin:0"><div style="background:#fff;border-radius:18px;padding:28px 26px;max-width:420px;text-align:center;box-shadow:0 6px 24px rgba(60,40,160,.08)">
<p style="font-size:20px;font-weight:700;margin:0 0 8px">${good ? "تم إيقاف الرسائل" : "الرابط غير صالح"}</p>
<p style="margin:0 0 6px;line-height:1.7">${good ? "لن تصلك رسائل التذكير والخدمة على بريدك بعد الآن. يمكنك تفعيلها من صفحة حسابك متى شئت." : "تأكد من فتح الرابط كاملًا كما وصلك في الرسالة."}</p>
<p style="margin:0 0 16px;color:#5E5880;direction:ltr">${good ? "You won’t get reminder or service emails anymore." : "This link is not valid."}</p>
<a href="/app" style="display:inline-block;background:#6A4BF2;color:#fff;text-decoration:none;padding:10px 20px;border-radius:12px;font-weight:700">العودة إلى المنصة</a></div></body></html>`);
  }
  app.get("/u/unsub", wrap(unsub));
  app.post("/u/unsub", require("express").urlencoded({ extended: false, limit: "2kb" }), wrap(unsub));

  // ---------- email ----------
  function shell({ lang, title, lead, lines = [], cta, ctaUrl, id }) {
    const ar = lang !== "en", dir = ar ? "rtl" : "ltr", al = ar ? "right" : "left";
    const foot = ar ? "وصلتك هذه الرسالة لأن لديك حسابًا في أكاديمية القدرات." : "You received this because you have a GAT Academy account.";
    const off = ar ? "إيقاف هذه الرسائل" : "Stop these emails";
    return `<!doctype html><html lang="${ar ? "ar" : "en"}" dir="${dir}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:#F6F4FF"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6F4FF"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#FFFFFF;border-radius:18px;font-family:Tahoma,Arial,sans-serif;color:#1D1838" dir="${dir}">
<tr><td style="padding:22px 26px 6px;text-align:${al}"><span style="display:inline-block;background:#6A4BF2;color:#fff;font-weight:700;border-radius:9px;padding:4px 9px;font-family:Arial,sans-serif;font-size:13px" dir="ltr">GAT</span>
<span style="font-weight:700;font-size:15px;margin-${ar ? "right" : "left"}:6px">${ar ? "أكاديمية القدرات" : "GAT Academy"}</span></td></tr>
<tr><td style="padding:10px 26px 0;text-align:${al}"><h1 style="font-size:21px;line-height:1.5;margin:0 0 8px">${esc(title)}</h1>
<p style="font-size:15px;line-height:1.85;margin:0 0 10px;color:#3A3460">${lead}</p>
${lines.map(l => `<p style="font-size:15px;line-height:1.8;margin:0 0 6px;color:#3A3460">• ${l}</p>`).join("")}</td></tr>
${cta ? `<tr><td style="padding:16px 26px 8px;text-align:${al}"><a href="${esc(ctaUrl)}" style="display:inline-block;background:#6A4BF2;color:#FFFFFF;text-decoration:none;font-weight:700;font-size:15px;padding:12px 24px;border-radius:12px">${esc(cta)}</a></td></tr>` : ""}
<tr><td style="padding:18px 26px 22px;text-align:${al};font-size:12px;line-height:1.7;color:#7A7398">${foot} <a href="${esc(unsubUrl(id))}" style="color:#7A7398">${off}</a></td></tr>
</table></td></tr></table></body></html>`;
  }
  const textOf = html => html.replace(/<style[\s\S]*?<\/style>/g, "").replace(/<a [^>]*href="([^"]+)"[^>]*>([^<]*)<\/a>/g, "$2: $1").replace(/<br\s*\/?>/g, "\n").replace(/<\/(p|h1|tr)>/g, "\n").replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/[ \t]+/g, " ").replace(/\n\s*\n+/g, "\n\n").trim();
  async function sendMail(u, m) {
    const html = shell({ ...m, lang: u.lang, id: u.id });
    const msg = { from: FROM, to: u.email, subject: m.subject || m.title, html, text: textOf(html),
      headers: { "List-Unsubscribe": `<${unsubUrl(u.id)}>, <mailto:info@gat.academy?subject=unsubscribe>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" } };
    if (DRY) { outbox.push({ ch: "email", to: u.email, subject: msg.subject, html, text: msg.text, at: Date.now() }); if (outbox.length > 200) outbox.shift(); return; }
    if (!transport) throw new Error("smtp-not-configured");
    await transport.sendMail(msg);
  }

  // ---------- push ----------
  async function sendPush(userId, payload) {
    const subs = (await pool.query("SELECT endpoint,p256dh,auth FROM push_subs WHERE user_id=$1", [userId])).rows;
    let n = 0;
    for (const s of subs) {
      if (DRY) { outbox.push({ ch: "push", user: userId, endpoint: s.endpoint, payload, at: Date.now() }); n++; continue; }
      try {
        await webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, JSON.stringify(payload), { TTL: 6 * 3600, urgency: "normal", timeout: 10000 });
        await pool.query("UPDATE push_subs SET fails=0,last_ok=now() WHERE endpoint=$1", [s.endpoint]); n++;
      } catch (e) {
        const gone = e.statusCode === 404 || e.statusCode === 410;
        if (gone) await pool.query("DELETE FROM push_subs WHERE endpoint=$1", [s.endpoint]);
        else await pool.query("UPDATE push_subs SET fails=fails+1 WHERE endpoint=$1", [s.endpoint]);
        if (!gone) console.error("push", e.statusCode || "", (e.body || e.message || "").toString().slice(0, 120));
      }
    }
    await pool.query("DELETE FROM push_subs WHERE user_id=$1 AND fails>=6", [userId]);
    return n;
  }

  app.get("/api/push/key", (req, res) => res.json({ key: vapid ? vapid.publicKey : null }));
  app.post("/api/push/subscribe", needUser, wrap(async (req, res) => {
    if (limited("ps:" + req.user.id, 20, 3600e3)) return fail(res, 429, "too-many-requests");
    const s = req.body && req.body.sub, lang = req.body && req.body.lang === "en" ? "en" : "ar";
    const ep = s && typeof s.endpoint === "string" ? s.endpoint : "", k = s && s.keys || {};
    if (!/^https:\/\/[^\s]{10,900}$/.test(ep) || typeof k.p256dh !== "string" || typeof k.auth !== "string" || k.p256dh.length > 200 || k.auth.length > 100) return fail(res, 400, "bad-subscription");
    // the same browser moves to whoever signs in on it
    await pool.query(`INSERT INTO push_subs(endpoint,user_id,p256dh,auth,lang) VALUES($1,$2,$3,$4,$5)
      ON CONFLICT (endpoint) DO UPDATE SET user_id=$2,p256dh=$3,auth=$4,lang=$5,fails=0`, [ep, req.user.id, k.p256dh, k.auth, lang]);
    if ((await pool.query("SELECT count(*)::int n FROM push_subs WHERE user_id=$1", [req.user.id])).rows[0].n > 8)
      await pool.query("DELETE FROM push_subs WHERE endpoint IN (SELECT endpoint FROM push_subs WHERE user_id=$1 ORDER BY created_at LIMIT 1)", [req.user.id]);
    res.json({ ok: true });
  }));
  app.post("/api/push/unsubscribe", needUser, wrap(async (req, res) => {
    const ep = req.body && typeof req.body.endpoint === "string" ? req.body.endpoint : "";
    await pool.query("DELETE FROM push_subs WHERE user_id=$1 AND ($2='' OR endpoint=$2)", [req.user.id, ep]);
    res.json({ ok: true });
  }));
  // the app asks whether this browser is still subscribed on the server (the endpoint can rotate)
  app.post("/api/push/status", needUser, wrap(async (req, res) => {
    const ep = req.body && typeof req.body.endpoint === "string" ? req.body.endpoint : "";
    const r = await pool.query("SELECT 1 FROM push_subs WHERE user_id=$1 AND endpoint=$2", [req.user.id, ep]);
    res.json({ on: !!r.rows[0] });
  }));

  // ---------- messages ----------
  const APP = p => `${ORIGIN}/app${p || ""}`;
  function msgs(kind, u, x = {}) {
    const ar = u.lang !== "en", name = esc((u.name || "").split(/\s+/)[0] || "");
    if (kind === "welcome") return ar ? {
      title: `أهلًا${name ? " " + name : ""}، حسابك في أكاديمية القدرات جاهز`, subject: "حسابك جاهز: ابدأ بالاختبار التشخيصي",
      lead: "خطوتك الأولى اختبار تشخيصي قصير يعرّفك بمستواك في المهارات العشر، وبعده تُبنى لك خطة يومية على قدّ وقتك.",
      lines: ["التشخيص: عشرون سؤالًا في نحو عشرين دقيقة.", "الخطة: جلسة يومية قصيرة تركّز على أضعف مهاراتك أولًا.", "النماذج: اختبارات كاملة بصيغة الاختبار المحوسب وتوقيته."],
      cta: "ابدأ الاختبار التشخيصي", ctaUrl: APP("#today") } : {
      title: `Welcome${name ? ", " + name : ""}: your GAT Academy account is ready`, subject: "Your account is ready: start with the diagnostic",
      lead: "Your first step is a short diagnostic that shows your level in all ten skills. Then you get a daily plan that fits your time.",
      lines: ["Diagnostic: twenty questions, about twenty minutes.", "Plan: a short daily session that works on your weakest skills first.", "Model tests: full tests in the computer-based format and timing."],
      cta: "Start the diagnostic", ctaUrl: APP("#today") };
    if (kind === "reminder") {
      const left = x.examIn != null && x.examIn >= 0 ? x.examIn : null;
      const pushT = ar ? (left != null ? `باقي ${arDays(left)} على اختبارك` : "جلستك اليوم تنتظرك") : (left != null ? `${left} day${left === 1 ? "" : "s"} to your test` : "Today’s session is waiting");
      const pushB = ar ? "١٥ دقيقة اليوم تحافظ على تقدّمك. ابدأ جلسة اليوم." : "Fifteen minutes today keeps your progress going. Start today’s session.";
      return { push: { title: pushT, body: pushB, url: "/app#today", tag: "daily" }, mail: ar ? {
        title: left != null ? `باقي ${arDays(left)} على اختبارك` : "جلستك اليوم تنتظرك", subject: left != null ? `باقي ${arDays(left)} على اختبار القدرات` : "خمس عشرة دقيقة اليوم تفرق",
        lead: `${name ? name + "، " : ""}لم تتدرّب منذ ${arDays(x.idle)}. جلسة قصيرة اليوم تعيدك إلى خطتك قبل أن تتراكم المهام.`,
        lines: [x.est ? `درجتك التقديرية الآن ${arNum(x.est)}، والخطة تكمل من حيث توقفت.` : "الخطة تكمل من حيث توقفت، وتبدأ بأضعف مهاراتك.", "إن ضاق وقتك، حلّ عشرة أسئلة فقط: الاستمرار أهم من الكمية."],
        cta: "ابدأ جلسة اليوم", ctaUrl: APP("#today") } : {
        title: left != null ? `${left} day${left === 1 ? "" : "s"} to your test` : "Today’s session is waiting", subject: left != null ? `${left} days to your GAT` : "Fifteen minutes today makes a difference",
        lead: `${name ? name + ", y" : "Y"}ou haven’t practised for ${x.idle} day${x.idle === 1 ? "" : "s"}. A short session today puts you back on your plan before tasks pile up.`,
        lines: [x.est ? `Your estimated score is ${x.est}; the plan picks up where you stopped.` : "The plan picks up where you stopped, starting with your weakest skills.", "Short on time? Solve just ten questions: keeping going matters more than volume."],
        cta: "Start today’s session", ctaUrl: APP("#today") } };
    }
    if (kind === "trial_end") return { push: { title: ar ? "تجربتك الكاملة تنتهي غدًا" : "Your full trial ends tomorrow", body: ar ? "استفد من النماذج والشروحات المسموعة قبل نهايتها." : "Make the most of the model tests and narrated explainers before it ends.", url: "/app#upgrade", tag: "trial" },
      mail: ar ? { title: "تجربتك الكاملة تنتهي غدًا", lead: "بقي يوم على وصولك الكامل لكل محتوى المنصة. هذا وقت مناسب لحل نموذج كامل بصيغة الاختبار المحوسب ومعرفة أين تقف.",
        lines: ["بعد التجربة تبقى الخطة المجانية وتقدّمك محفوظًا.", "الاشتراك يفتح النماذج الثلاثين والأقسام المتكررة كلها والشروحات المسموعة."], cta: "اعرف تفاصيل الاشتراك", ctaUrl: APP("#upgrade") }
        : { title: "Your full trial ends tomorrow", lead: "One day of full access is left. It’s a good moment to take a full model test in the computer-based format and see where you stand.",
        lines: ["After the trial you keep the free plan and all your progress.", "A subscription unlocks all thirty model tests, every recurring section and the narrated explainers."], cta: "See subscription details", ctaUrl: APP("#upgrade") } };
    if (kind === "expiring") return { push: { title: ar ? "اشتراكك ينتهي خلال ٣ أيام" : "Your subscription ends in 3 days", body: ar ? "جدّده لتبقى خطتك ونماذجك مفتوحة." : "Renew to keep your plan and model tests open.", url: "/app#upgrade", tag: "expiring" },
      mail: ar ? { title: "اشتراكك ينتهي خلال ثلاثة أيام", lead: "حتى لا تتوقف خطتك قبل اختبارك، جدّد اشتراكك من صفحة الاشتراك. تقدّمك وسجلك يبقيان كما هما.", cta: "جدّد الاشتراك", ctaUrl: APP("#upgrade") }
        : { title: "Your subscription ends in three days", lead: "So your plan doesn’t stop before your test, renew from the subscription page. Your progress and history stay as they are.", cta: "Renew", ctaUrl: APP("#upgrade") } };
    if (kind === "test") return { push: { title: ar ? "تجربة التنبيهات" : "Test notification", body: ar ? "التنبيهات تعمل على هذا الجهاز." : "Notifications work on this device.", url: "/app#today", tag: "test" },
      mail: { title: ar ? "رسالة تجريبية" : "Test email", lead: ar ? "إعداد البريد يعمل. هذه رسالة تجريبية من لوحة الإدارة." : "Email is set up. This is a test message from the admin dashboard.", cta: ar ? "فتح المنصة" : "Open the platform", ctaUrl: APP("") } };
    return null;
  }

  // claim a (user, kind, ref, channel) slot; false when it was already used
  async function claim(userId, kind, ref, ch) {
    const r = await pool.query("INSERT INTO notify_log(user_id,kind,ref,ch) VALUES($1,$2,$3,$4) ON CONFLICT DO NOTHING RETURNING id", [userId, kind, ref, ch]);
    return r.rows[0] ? r.rows[0].id : null;
  }
  const settle = (id, ok) => pool.query("UPDATE notify_log SET ok=$2 WHERE id=$1", [id, ok]);

  async function deliver(u, kind, ref, { mail = true, push = true } = {}, x = {}) {
    const m = msgs(kind, u, x), out = { email: 0, push: 0, fail: 0 };
    const mm = m.mail || m, pp = m.push;
    if (mail && mm && mm.title && mailOn() && !u.mail_off) {
      const id = await claim(u.id, kind, ref, "email");
      if (id) { try { await sendMail(u, mm); await settle(id, true); out.email++; } catch (e) { await settle(id, false); out.fail++; console.error("email", kind, e.code || "", (e.message || "").slice(0, 160)); } }
    }
    if (push && pp && u.subs > 0) {
      const id = await claim(u.id, kind, ref, "push");
      if (id) { const n = await sendPush(u.id, pp); await settle(id, n > 0); out.push += n; }
    }
    return out;
  }

  // ---------- the scheduler ----------
  const COLS = `u.id,u.email,u.name,u.remind,u.mail_off,COALESCE(p.lang,'ar') lang,p.exam_date,p.summary,(SELECT count(*)::int FROM push_subs s WHERE s.user_id=u.id) subs`;
  async function run({ force = false } = {}) {
    if (state.running) return { busy: true };
    state.running = true;
    const c = await pool.connect(); let locked = false;
    const tot = { welcome: 0, reminder: 0, trial_end: 0, expiring: 0, email: 0, push: 0, fail: 0 };
    const add = (k, o) => { tot[k] += o.email + o.push; tot.email += o.email; tot.push += o.push; tot.fail += o.fail; };
    try {
      locked = (await c.query("SELECT pg_try_advisory_lock(728301) l")).rows[0].l; // one instance at a time
      if (!locked) return { busy: true };
      // welcome: new accounts in the last 2 days
      for (const u of (await pool.query(`SELECT ${COLS} FROM users u LEFT JOIN progress p ON p.user_id=u.id
          WHERE u.created_at>=GREATEST($1::timestamptz, now()-interval '2 days') AND NOT EXISTS (SELECT 1 FROM notify_log l WHERE l.user_id=u.id AND l.kind='welcome') LIMIT 300`, [since])).rows)
        add("welcome", await deliver(u, "welcome", "1", { push: false }));
      // trial ends within a day; paid access ends within 3 days (the latest end date, so a renewal stops it)
      for (const u of (await pool.query(`SELECT ${COLS}, e.ends FROM users u LEFT JOIN progress p ON p.user_id=u.id
          JOIN LATERAL (SELECT max(ends_at) ends, bool_and(source='trial') trial FROM subscriptions WHERE user_id=u.id AND revoked_at IS NULL AND ends_at>now()) e ON e.ends IS NOT NULL
          WHERE e.trial AND e.ends<=now()+interval '26 hours' LIMIT 300`)).rows)
        add("trial_end", await deliver(u, "trial_end", new Date(u.ends).toISOString().slice(0, 10)));
      for (const u of (await pool.query(`SELECT ${COLS}, e.ends FROM users u LEFT JOIN progress p ON p.user_id=u.id
          JOIN LATERAL (SELECT max(ends_at) ends, bool_and(source='trial') trial FROM subscriptions WHERE user_id=u.id AND revoked_at IS NULL AND ends_at>now()) e ON e.ends IS NOT NULL
          WHERE NOT e.trial AND e.ends<=now()+interval '3 days' LIMIT 300`)).rows)
        add("expiring", await deliver(u, "expiring", new Date(u.ends).toISOString().slice(0, 10)));
      // reminders: evenings only (19:00–22:00 Saudi time)
      const h = ksaHour(), today = ksaDay();
      if (force || (h >= 19 && h < 22)) {
        const rows = (await pool.query(`SELECT ${COLS} FROM users u JOIN progress p ON p.user_id=u.id
            WHERE (u.remind OR EXISTS (SELECT 1 FROM push_subs s WHERE s.user_id=u.id)) AND p.summary->>'lastActive' ~ '^\\d{4}-\\d{2}-\\d{2}$'
              AND p.summary->>'lastActive' < $1 AND p.summary->>'lastActive' >= to_char(($1::date - 21), 'YYYY-MM-DD')
              AND NOT EXISTS (SELECT 1 FROM notify_log l WHERE l.user_id=u.id AND l.kind='reminder' AND l.ref=$1) LIMIT 2000`, [today])).rows;
        for (const u of rows) {
          const s = u.summary || {}, idle = dayDiff(today, s.lastActive);
          const examIn = /^\d{4}-\d{2}-\d{2}$/.test(u.exam_date || "") ? dayDiff(u.exam_date, today) : null;
          // email: ticked box, 2+ idle days, and no reminder email in the last 3 days
          let mail = !!u.remind && idle >= 2;
          if (mail) mail = !(await pool.query("SELECT 1 FROM notify_log WHERE user_id=$1 AND kind='reminder' AND ch='email' AND at>now()-interval '70 hours'", [u.id])).rows[0];
          add("reminder", await deliver(u, "reminder", today, { mail, push: true }, { idle, est: s.est > 0 ? Math.round(s.est) : null, examIn: examIn != null && examIn <= 120 ? examIn : null }));
        }
      }
      return tot;
    } catch (e) { console.error("notify run", e.message); return { error: e.message, ...tot }; }
    finally {
      if (locked) await c.query("SELECT pg_advisory_unlock(728301)").catch(() => {});
      c.release(); state.running = false; state.lastRun = new Date().toISOString(); state.lastResult = tot;
    }
  }
  let kickT = null;
  const kick = () => { clearTimeout(kickT); kickT = setTimeout(() => run().catch(() => {}), 8000); kickT.unref && kickT.unref(); };
  function start() {
    if (process.env.NODE_ENV === "test" && process.env.NOTIFY_TICK !== "1") return;
    const t = setInterval(() => run().catch(() => {}), 10 * 60e3); t.unref && t.unref();
    const f = setTimeout(() => run().catch(() => {}), 60e3); f.unref && f.unref();
  }

  // ---------- admin ----------
  app.get("/api/admin/notify", needAdmin, wrap(async (req, res) => {
    const r = await pool.query(`SELECT kind, ch, count(*) FILTER (WHERE ok)::int ok, count(*) FILTER (WHERE ok=false)::int failed FROM notify_log WHERE at>now()-interval '7 days' GROUP BY 1,2 ORDER BY 1,2`);
    const s = (await pool.query(`SELECT (SELECT count(*)::int FROM push_subs) subs, (SELECT count(DISTINCT user_id)::int FROM push_subs) push_users,
      (SELECT count(*)::int FROM users WHERE remind AND NOT mail_off) remind, (SELECT count(*)::int FROM users WHERE mail_off) off`)).rows[0];
    res.json({ email: { configured: mailOn(), dry: DRY, from: FROM }, push: { configured: !!vapid, subs: s.subs, users: s.push_users }, remind: s.remind, unsubscribed: s.off,
      last7: r.rows, lastRun: state.lastRun, lastResult: state.lastResult });
  }));
  app.post("/api/admin/notify/test", needAdmin, wrap(async (req, res) => {
    const u = (await pool.query(`SELECT ${COLS} FROM users u LEFT JOIN progress p ON p.user_id=u.id WHERE u.id=$1`, [req.user.id])).rows[0];
    const m = msgs("test", u); let email = null, push = 0;
    if (mailOn()) { try { await sendMail({ ...u, mail_off: false }, m.mail); email = true; } catch (e) { email = String(e.message || e).slice(0, 200); } }
    push = await sendPush(u.id, m.push);
    res.json({ email, push, emailConfigured: mailOn() });
  }));
  app.post("/api/admin/notify/run", needAdmin, wrap(async (req, res) => {
    const force = !!(req.body && req.body.force) && (DRY || process.env.NODE_ENV === "test");
    res.json(await run({ force }));
  }));
  if (DRY) {
    app.get("/api/admin/notify/outbox", needAdmin, (req, res) => res.json({ items: outbox }));
    app.delete("/api/admin/notify/outbox", needAdmin, (req, res) => { outbox.length = 0; res.json({ ok: true }); });
  }

  return { migrate, start, kick, run };
};
