// Admin API security and validation (round-1 checks, adapted) + CSRF on every mutation + audit completeness.
"use strict";
const { client, signup, admin, moy, sql, ok, section, run, uid, BASE } = require("./lib");

run(async () => {
  const runId = uid();
  const A = await admin();
  const U = await signup(`plain_${runId}@t.com`, "password123", "=HYPERLINK(\"http://x\")");
  const anon = client();

  section("every /api/admin route needs an admin session (401 anonymous, 403 student)");
  const routes = [["GET", "/overview"], ["GET", "/funnel"], ["GET", "/users"], ["GET", "/users.csv"], ["GET", "/users/x"], ["POST", "/users/x/grant"], ["POST", "/users/x/revoke"], ["POST", "/users/x/name"], ["POST", "/users/x/reset-password"], ["DELETE", "/users/x"], ["GET", "/payments"], ["POST", "/payments/x/refund"], ["POST", "/payments/x/recheck"], ["GET", "/coupons"], ["POST", "/coupons"], ["PATCH", "/coupons/X"], ["DELETE", "/coupons/X"], ["GET", "/settings"], ["PUT", "/settings"], ["GET", "/content"], ["GET", "/audit"]];
  for (const [m, r] of routes) { const a = await anon(m, "/api/admin" + r, m === "GET" ? undefined : {}); const b = await U(m, "/api/admin" + r, m === "GET" ? undefined : {}); ok(a.s === 401 && b.s === 403, `${m} ${r} needs admin`, [a.s, b.s]); }
  ok((await A("GET", "/api/admin/nope")).s === 404, "unknown admin route -> 404");

  section("CSRF header on every mutation");
  const muts = [["POST", "/api/admin/coupons"], ["PUT", "/api/admin/settings"], ["POST", "/api/admin/users/x/grant"], ["DELETE", "/api/admin/users/x"], ["POST", "/api/name"], ["PUT", "/api/progress"], ["POST", "/api/events"], ["POST", "/api/password"], ["DELETE", "/api/me"], ["POST", "/api/logout"], ["POST", "/api/logout-all"], ["POST", "/api/billing/checkout"], ["POST", "/api/login"], ["POST", "/api/signup"]];
  for (const [m, p] of muts) {
    const r = await fetch(BASE + p, { method: m, headers: { "Content-Type": "application/json", cookie: A.ck() }, body: "{}" });
    ok(r.status === 403, `${m} ${p} without X-Masar -> 403`, r.status);
  }
  // webhooks are server-to-server: no header, verified by signature / re-fetch instead
  ok((await fetch(BASE + "/api/billing/moyasar/callback", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" })).status !== 403, "moyasar callback exempt from CSRF header");

  section("settings validation");
  const st = (await A("GET", "/api/admin/settings")).j;
  let r = await A("PUT", "/api/admin/settings", { config: { ...st.config, currency: "USD", evil: 1, free: { ...st.config.free, hack: 2 }, __proto__x: 1 } });
  ok(r.s === 200 && r.j.config.currency === "SAR" && r.j.config.evil === undefined && r.j.config.free.hack === undefined, "settings ignore unknown keys/currency", r.j.config && Object.keys(r.j.config));
  r = await A("PUT", "/api/admin/settings", { config: { plans: [{ id: "m1", price: 49, days: 30 }, { id: "m1", price: 10, days: 3 }] } }); ok(r.s === 400, "duplicate plan ids rejected");
  r = await A("PUT", "/api/admin/settings", { config: { plans: [null] } }); ok(r.s === 400, "null plan rejected", r.s);
  r = await A("PUT", "/api/admin/settings", { config: { plans: [{ id: "m1", price: 49, days: 30, active: false }] } }); ok(r.s === 400, "no active plan rejected");
  r = await A("PUT", "/api/admin/settings", { config: { plans: [{ id: "m1", price: 0.5, days: 30 }] } }); ok(r.s === 400, "price < 1 SAR rejected");
  r = await A("PUT", "/api/admin/settings", { config: { banner: { on: true, ar: "مرحبا", en: "Hi", tone: "promo" } } }); ok(r.s === 200 && r.j.config.plans.length === st.config.plans.length && r.j.config.banner.on, "partial update keeps plans", r.j.config && r.j.config.plans);
  r = await A("PUT", "/api/admin/settings", { config: st.config }); ok(r.s === 200, "restore");
  const au = (await A("GET", "/api/admin/audit")).j.audit.find(a => a.action === "settings"); ok(au && au.meta && Array.isArray(au.meta.changed) && au.meta.changed.some(x => /banner/.test(x)), "settings audit has diff", au && au.meta);

  section("coupons validation");
  r = await A("POST", "/api/admin/coupons", { code: "MX" + runId, pct: 10, maxUses: "abc" }); ok(r.s === 400, "bad maxUses", r.j);
  r = await A("POST", "/api/admin/coupons", { code: "bad code", pct: 10 }); ok(r.s === 400, "bad code");
  r = await A("POST", "/api/admin/coupons", { code: "AU" + runId, pct: 100, maxUses: 1 }); ok(r.s === 200, "create coupon");
  r = await A("POST", "/api/admin/coupons", { code: "AU" + runId, pct: 100 }); ok(r.s === 409 && r.j.error === "exists", "duplicate coupon -> 409");

  section("users search and paging");
  r = await A("GET", "/api/admin/users?q=%25&page=0.5&size=25.5"); ok(r.s === 200 && r.j.users.every(u => /%/.test(u.email + u.name)), "search % literal, fractional paging ok", r.s);
  r = await A("GET", "/api/admin/users?q=" + encodeURIComponent("=HYPER")); ok(r.s === 200 && r.j.total >= 1, "search by name");
  r = await A("GET", "/api/admin/users?page=1e308"); ok(r.s === 200, "absurd page number clamped", r.s);
  r = await A("GET", "/api/admin/users?sort=__proto__"); ok(r.s === 200, "prototype key as sort ignored", r.s);
  r = await A("GET", "/api/admin/users.csv"); const line = r.t.split("\n").find(l => l.includes("plain_" + runId)); ok(line && line.includes(`"'=HYPERLINK(""http://x"")"`), "CSV formula prefixed", line);

  section("user actions");
  const uid2 = (await sql("SELECT id FROM users WHERE email=$1", [U.user.email]))[0].id;
  r = await A("POST", `/api/admin/users/${uid2}/grant`, { days: 0 }); ok(r.s === 400, "grant 0 days rejected");
  r = await A("POST", `/api/admin/users/${uid2}/grant`, { days: 3, note: "test" }); ok(r.s === 200 && r.j.until, "grant 3 days");
  ok((await U("GET", "/api/me")).j.user.plan.tier === "pro", "student is pro after grant");
  r = await A("POST", `/api/admin/users/${uid2}/revoke`); ok(r.s === 200 && r.j.revoked === 1, "revoke");
  ok((await U("GET", "/api/me")).j.user.plan.tier === "free", "student is free after revoke");
  r = await A("POST", "/api/admin/users/nope/revoke"); ok(r.s === 404, "revoke unknown 404");
  r = await A("POST", `/api/admin/users/${uid2}/name`, { name: "<x>" }); ok(r.s === 400, "rename to a 1-char name after stripping <> rejected", r.j);
  r = await A("POST", `/api/admin/users/${uid2}/name`, { name: "  Sara   Ahmad ‏" }); ok(r.s === 200, "rename ok");
  ok((await sql("SELECT name FROM users WHERE id=$1", [uid2]))[0].name === "Sara Ahmad", "rename stored cleaned");
  r = await A("POST", `/api/admin/users/${uid2}/reset-password`); ok(r.s === 200 && /^[a-zA-Z0-9]{10}$/.test(r.j.tempPassword), "reset password gives a 10-char temp password", r.j);
  ok((await U("GET", "/api/me")).j.user === null, "student's sessions are gone after an admin reset");
  const U2 = client(); ok((await U2("POST", "/api/login", { email: U.user.email, password: r.j.tempPassword })).s === 200, "temp password works");

  section("overview shape and chart/KPI consistency");
  r = await A("GET", "/api/admin/overview?days=7"); ok(r.s === 200 && r.j.today && typeof r.j.totals.revenueall === "number" && typeof r.j.totals.gross === "number", "overview ok", r.j.totals);
  const sumRev = r.j.series.revenue.reduce((a, p) => a + p.n, 0); ok(Math.abs(sumRev - r.j.totals.revenue) < 0.01, "chart revenue sum == KPI revenue", [sumRev, r.j.totals.revenue]);
  const sumSig = r.j.series.signups.reduce((a, p) => a + p.n, 0); ok(sumSig === r.j.totals.new7, "7-day signups chart == new7", [sumSig, r.j.totals.new7]);
  ok((await A("GET", "/api/admin/funnel?days=30")).s === 200, "funnel ok");
  ok((await A("GET", "/api/admin/content?days=30")).s === 200, "content ok");

  section("gateway error on checkout");
  await moy("/_failnext?n=1"); r = await U2("POST", "/api/billing/checkout", { plan: "m1" }); ok(r.s === 502 && r.j.error === "gateway-error", "gateway error -> 502", r);
  const failed = await sql("SELECT status, tap_status FROM payments WHERE user_id=$1 ORDER BY created_at DESC LIMIT 1", [uid2]);
  ok(failed[0] && failed[0].status === "failed" && failed[0].tap_status === "gateway-error", "payment row marked failed after gateway error", failed[0]);

  section("audit covers every admin mutation");
  r = await A("PATCH", `/api/admin/coupons/AU${runId}`, { active: false }); ok(r.s === 200, "coupon off");
  r = await A("DELETE", `/api/admin/coupons/AU${runId}`); ok(r.s === 200, "coupon delete (unused)");
  await A("GET", "/api/admin/users.csv");
  const victim = await signup(`del_${runId}@t.com`); const vid = (await sql("SELECT id FROM users WHERE email=$1", [victim.user.email]))[0].id;
  r = await A("DELETE", `/api/admin/users/${vid}`); ok(r.s === 200, "delete user");
  ok((await victim("GET", "/api/me")).j.user === null, "deleted user's live session is gone");
  ok((await victim("PUT", "/api/progress", { p: "{}" })).s === 401, "deleted user cannot save progress");
  const acts = new Set((await A("GET", "/api/admin/audit")).j.audit.map(a => a.action));
  const need = ["grant", "revoke", "rename", "reset_password", "delete_user", "coupon_create", "coupon_off", "coupon_delete", "settings", "export_users"];
  ok(need.every(a => acts.has(a)), "audit has " + need.join(","), [...acts]);
  const del = (await A("GET", "/api/admin/audit")).j.audit.find(a => a.action === "delete_user");
  ok(del && del.target === victim.user.email && del.admin_email === "admin@test.com", "delete audit names target and admin", del);
});
