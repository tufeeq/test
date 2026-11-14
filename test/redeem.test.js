// Activation codes sold outside the site (e.g. Zid store vouchers): admin batch → CSV → /r/CODE link → redeem.
// Covers single use under concurrency, re-opening your own code, hidden plans, expired/disabled codes and stacking.
"use strict";
const { client, signup, admin, sql, ok, section, run, uid } = require("./lib");

run(async () => {
  const runId = uid();
  const A = await admin();
  const st = await A("GET", "/api/admin/settings"); const cfg = st.j.defaults; await A("PUT", "/api/admin/settings", { config: cfg });
  const m3 = cfg.plans.find(p => p.id === "m3") || cfg.plans[0];

  section("admin batch");
  let r = await A("POST", "/api/admin/coupons/batch", { plan: "nope", count: 5 }); ok(r.s === 400 && r.j.error === "bad-plan", "bad plan", r.j);
  r = await A("POST", "/api/admin/coupons/batch", { plan: m3.id, count: 0 }); ok(r.s === 400 && r.j.error === "bad-count", "bad count", r.j);
  r = await A("POST", "/api/admin/coupons/batch", { plan: m3.id, count: 25, note: "zid " + runId }); ok(r.s === 200 && r.j.count === 25, "batch of 25", r.j);
  const batch = r.j.batch;
  const rows = await sql("select code,pct,max_uses,plan_ids from coupons where batch=$1", [batch]);
  ok(rows.length === 25 && rows.every(x => x.pct === 100 && x.max_uses === 1 && x.plan_ids[0] === m3.id && /^GAT-[2-9A-HJKMNP-Z]{4}-[2-9A-HJKMNP-Z]{4}$/.test(x.code)), "25 single-use 100% codes for one plan", rows[0]);
  r = await A("GET", "/api/admin/coupons"); ok(r.j.batches.some(b => b.id === batch && b.n === 25 && b.used === 0), "batch summarised", r.j.batches[0]);
  ok(!r.j.coupons.some(c => c.batch === batch), "batch codes kept out of the single-coupon list");
  r = await A("GET", `/api/admin/coupons/batch/${batch}.csv`); const lines = r.t.replace(/^﻿/, "").trim().split("\n");
  ok(r.s === 200 && lines.length === 26 && lines[0].startsWith("code,link") && /\/r\/GAT-/.test(lines[1]), "CSV with code and link", lines.slice(0, 2));
  const anon = client(); r = await anon("GET", `/api/admin/coupons/batch/${batch}.csv`); ok(r.s === 401, "CSV needs admin");
  const codes = rows.map(x => x.code);

  section("link and public info");
  r = await anon("GET", "/r/" + codes[0].toLowerCase()); ok(r.s === 302 && r.loc === "/app#redeem?c=" + codes[0], "/r/code -> app", r.loc);
  r = await anon("GET", "/r"); ok(r.s === 302 && r.loc === "/app#redeem", "/r -> form", r.loc);
  r = await anon("GET", "/api/redeem/" + codes[0]); ok(r.s === 200 && r.j.plan.id === m3.id && !r.j.mine, "info before sign-in", r.j);
  r = await anon("GET", "/api/redeem/GAT-XXXX-XXXX"); ok(r.s === 400 && r.j.error === "bad-code", "unknown code");
  r = await anon("POST", "/api/redeem", { code: codes[0] }); ok(r.s === 401, "redeem needs an account");

  section("redeem");
  const U = await signup(`rd_${runId}@t.com`);
  r = await U("POST", "/api/redeem", { code: " " + codes[0].toLowerCase() + " " }); ok(r.s === 200 && r.j.activated && !r.j.already && r.j.plan.id === m3.id, "activates", r.j);
  const until1 = new Date(r.j.until);
  ok(Math.abs(until1 - Date.now() - m3.days * 86400e3) < 120e3, "period = plan days", r.j.until);
  r = await U("GET", "/api/plan"); ok(r.j.plan ? r.j.plan.tier === "pro" : r.j.tier === "pro", "student is pro", r.j);
  r = await U("POST", "/api/redeem", { code: codes[0] }); ok(r.s === 200 && r.j.already, "re-opening own link is fine, no second period", r.j);
  r = await U("GET", "/api/redeem/" + codes[0]); ok(r.s === 200 && r.j.mine, "info says it's yours");
  const V = await signup(`rd2_${runId}@t.com`);
  r = await V("POST", "/api/redeem", { code: codes[0] }); ok(r.s === 400 && r.j.error === "code-used", "someone else can't reuse it", r.j);
  r = await U("POST", "/api/redeem", { code: codes[1] }); ok(r.s === 200 && Math.abs(new Date(r.j.until) - until1 - m3.days * 86400e3) < 5e3, "a second code stacks after the first", r.j);

  section("race: one code, 3 accounts");
  const us = await Promise.all([...Array(3)].map((_, i) => signup(`rr${i}_${runId}@t.com`)));
  const res = await Promise.all(us.map(u => u("POST", "/api/redeem", { code: codes[2] })));
  ok(res.filter(x => x.j.activated).length === 1, "exactly one activation", res.map(x => x.j.error || "act"));
  ok((await sql("select used from coupons where code=$1", [codes[2]]))[0].used === 1, "used=1");

  section("hidden plan, disabled batch, expiry, partial coupons");
  await A("PUT", "/api/admin/settings", { config: { ...cfg, plans: cfg.plans.map(p => p.id === m3.id ? { ...p, active: false } : p) } });
  r = await V("POST", "/api/redeem", { code: codes[3] }); ok(r.s === 200 && r.j.activated, "sold code still works after its plan is hidden", r.j);
  await A("PUT", "/api/admin/settings", { config: cfg });
  r = await A("PATCH", `/api/admin/coupons/batch/${batch}`, { active: false }); ok(r.s === 200, "disable batch");
  r = await V("POST", "/api/redeem", { code: codes[4] }); ok(r.s === 400 && r.j.error === "code-disabled", "disabled", r.j);
  await A("PATCH", `/api/admin/coupons/batch/${batch}`, { active: true });
  await sql("update coupons set expires_at=now()-interval '1 minute' where code=$1", [codes[5]]);
  r = await V("POST", "/api/redeem", { code: codes[5] }); ok(r.s === 400 && r.j.error === "code-expired", "expired", r.j);
  const P = "HALF" + runId.toUpperCase(); await A("POST", "/api/admin/coupons", { code: P, pct: 50 });
  r = await V("POST", "/api/redeem", { code: P }); ok(r.s === 400 && r.j.error === "bad-code", "a discount coupon is not an activation code", r.j);
  const F = "ALL" + runId.toUpperCase(); await A("POST", "/api/admin/coupons", { code: F, pct: 100, maxUses: 5 });
  r = await anon("GET", "/api/redeem/" + F); ok(r.s === 200 && r.j.needsPlan, "100% coupon for any plan -> pick a plan", r.j);

  section("export shows who used what; audit");
  r = await A("GET", `/api/admin/coupons/batch/${batch}.csv`);
  ok(r.t.includes(`${codes[0]},`) && r.t.includes(`rd_${runId}@t.com`) && /,used,/.test(r.t), "CSV marks used codes with the student's email");
  const au = await A("GET", "/api/admin/audit"); const acts = new Set((au.j.items || au.j.audit || au.j.rows || []).map(x => x.action));
  ok(acts.has("coupon_batch") && acts.has("coupon_batch_export"), "audited", [...acts].slice(0, 12));
});
