// Automatic emails and browser push (notify.js), with NOTIFY_DRY=1: messages land in an outbox instead of being sent.
"use strict";
const { client, admin, freshUser, sql, ok, section, run, uid } = require("./lib");

run(async () => {
  const A = await admin();
  const box = async () => (await A("GET", "/api/admin/notify/outbox")).j.items || [];
  await A("DELETE", "/api/admin/notify/outbox");

  section("push endpoints");
  let r = await client()("GET", "/api/push/key"); ok(r.s === 200 && typeof r.j.key === "string" && r.j.key.length > 60, "public VAPID key", r.j);
  r = await client()("POST", "/api/push/subscribe", { sub: {} }); ok(r.s === 401, "subscribe needs sign-in", r.s);
  const email = `an-${uid()}@test.local`, U = await freshUser(email, "password123", "Sara Test");
  r = await U("POST", "/api/push/subscribe", { sub: { endpoint: "http://insecure", keys: { p256dh: "x", auth: "y" } } }); ok(r.s === 400, "rejects a non-https endpoint", r.s);
  const ep = "https://push.example.test/sub/" + uid();
  r = await U("POST", "/api/push/subscribe", { sub: { endpoint: ep, keys: { p256dh: "BKey" + "a".repeat(80), auth: "authkey12345" } }, lang: "ar" }); ok(r.s === 200, "subscribes", r.j);
  r = await U("POST", "/api/push/status", { endpoint: ep }); ok(r.j.on === true, "status on");

  section("welcome email");
  r = await A("POST", "/api/admin/notify/run", {}); ok(r.s === 200 && !r.j.error, "run", r.j);
  let items = await box(); const w = items.find(x => x.ch === "email" && x.to === email);
  ok(w && /حسابك/.test(w.subject) && /unsub\?u=/.test(w.html) && /Sara|سارة|أهلًا/.test(w.html), "welcome email with unsubscribe link", w && w.subject);
  ok(!items.some(x => x.ch === "push" && x.endpoint === ep), "no push for the welcome");
  await A("DELETE", "/api/admin/notify/outbox");
  await A("POST", "/api/admin/notify/run", {}); items = await box(); ok(!items.some(x => x.to === email), "welcome only once");

  section("evening reminder");
  const uidRow = (await sql("SELECT id FROM users WHERE email=$1", [email]))[0];
  const day = d => new Date(Date.now() + 3 * 3600e3 - d * 864e5).toISOString().slice(0, 10);
  await sql("UPDATE users SET remind=true WHERE id=$1", [uidRow.id]);
  await sql(`INSERT INTO progress(user_id,lang,exam_date,p,summary) VALUES($1,'ar',$2,'{}',$3) ON CONFLICT (user_id) DO UPDATE SET exam_date=$2, summary=$3`, [uidRow.id, day(-20), { lastActive: day(3), est: 71 }]);
  await A("DELETE", "/api/admin/notify/outbox");
  r = await A("POST", "/api/admin/notify/run", { force: true }); ok(r.j.reminder >= 2, "reminder sent on two channels", r.j);
  items = await box();
  const p = items.find(x => x.ch === "push" && x.endpoint === ep), m = items.find(x => x.ch === "email" && x.to === email);
  ok(p && /اختبارك/.test(p.payload.title) && p.payload.url === "/app#today", "push names the days to the test", p && p.payload);
  ok(m && /٧١/.test(m.html), "email carries the estimated score", m && m.subject);
  await A("DELETE", "/api/admin/notify/outbox");
  await A("POST", "/api/admin/notify/run", { force: true }); items = await box(); ok(!items.some(x => x.endpoint === ep || x.to === email), "at most one reminder a day");
  // practised today: nothing
  await sql("DELETE FROM notify_log WHERE user_id=$1 AND kind='reminder'", [uidRow.id]);
  await sql("UPDATE progress SET summary=$2 WHERE user_id=$1", [uidRow.id, { lastActive: day(0) }]);
  await A("POST", "/api/admin/notify/run", { force: true }); items = await box(); ok(!items.some(x => x.endpoint === ep || x.to === email), "no reminder after practising today");

  section("trial ending");
  await sql("INSERT INTO subscriptions(user_id,plan_id,source,starts_at,ends_at) VALUES($1,'trial','trial',now()-interval '2 days',now()+interval '20 hours')", [uidRow.id]);
  await A("DELETE", "/api/admin/notify/outbox");
  await A("POST", "/api/admin/notify/run", {}); items = await box();
  ok(items.some(x => x.ch === "email" && x.to === email && /تجربتك/.test(x.subject)) && items.some(x => x.ch === "push" && x.endpoint === ep && x.payload.tag === "trial"), "email and push the day before", items.map(x => x.subject || x.payload.title));

  section("unsubscribe");
  const tok = /unsub\?u=([^&"]+)&amp;t=([\w-]+)/.exec(w.html);
  r = await client()("GET", `/u/unsub?u=${tok[1]}&t=bad${tok[2].slice(3)}`); ok(r.s === 400, "a wrong token is refused", r.s);
  r = await client()("GET", `/u/unsub?u=${tok[1]}&t=${tok[2]}`); ok(r.s === 200 && /إيقاف/.test(r.t), "unsubscribes", r.s);
  const row = (await sql("SELECT mail_off, remind FROM users WHERE id=$1", [uidRow.id]))[0]; ok(row.mail_off === true && row.remind === false, "mail off, reminders off", row);
  r = await U("POST", "/api/remind", { remind: true }); ok(r.s === 200 && (await sql("SELECT mail_off FROM users WHERE id=$1", [uidRow.id]))[0].mail_off === false, "ticking reminders again turns email back on");

  section("admin");
  r = await A("GET", "/api/admin/notify"); ok(r.s === 200 && r.j.email.configured && r.j.push.subs >= 1 && Array.isArray(r.j.last7), "status", r.j.push);
  r = await U("GET", "/api/admin/notify"); ok(r.s === 403, "admins only", r.s);
  r = await U("POST", "/api/push/unsubscribe", { endpoint: ep }); r = await U("POST", "/api/push/status", { endpoint: ep }); ok(r.j.on === false, "unsubscribes the device");
  await sql("DELETE FROM users WHERE id=$1", [uidRow.id]);
});
