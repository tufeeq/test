// Billing: quotes, Moyasar checkout → pay → return/callback/recheck (idempotent), renewals, coupons under concurrency,
// failed/expired invoices, amount mismatch, partial and full refunds, revoke semantics, audit. Needs the Moyasar mock.
"use strict";
const { client, signup, admin, moy, sql, ok, section, run, uid } = require("./lib");
const invId = url => url.split("/").pop();

run(async () => {
  const runId = uid(), RU = runId.toUpperCase();
  const A = await admin();
  let st = await A("GET", "/api/admin/settings"); ok(st.s === 200, "admin settings");
  const cfg = st.j.defaults; await A("PUT", "/api/admin/settings", { config: cfg });
  const mk = async (code, pct, max) => { const r = await A("POST", "/api/admin/coupons", { code, pct, maxUses: max }); ok(r.s === 200, "create coupon " + code, r.j); };
  const C15 = "P15" + RU, C100 = "FREE" + RU, CR = "RACE" + RU, CR2 = "RACEP" + RU;
  await mk(C15, 15); await mk(C100, 100, 2); await mk(CR, 100, 3); await mk(CR2, 50, 2);

  section("quote rounding");
  const U1 = await signup(`u1_${runId}@t.com`);
  let q = await U1("POST", "/api/billing/quote", { plan: "m3", coupon: C15.toLowerCase() }); ok(q.s === 200 && q.j.amount === 101.15, "119*0.85 = 101.15", q.j);
  q = await U1("POST", "/api/billing/quote", { plan: "m1", coupon: C15 }); ok(q.j.amount === 41.65, "49*0.85 = 41.65", q.j);
  q = await U1("POST", "/api/billing/quote", { plan: "m1", coupon: "NOPE" }); ok(q.s === 400 && q.j.error === "bad-coupon", "bad coupon");
  q = await U1("POST", "/api/billing/quote", { plan: "zz" }); ok(q.s === 400 && q.j.error === "bad-plan", "bad plan");

  section("checkout -> pay -> return + callback + recheck (idempotent)");
  let co = await U1("POST", "/api/billing/checkout", { plan: "m1", lang: "ar" }); ok(co.s === 200 && co.j.url, "checkout url", co.j);
  let iid = invId(co.j.url); let inv = await moy("/v1/invoices/" + iid); ok(inv.amount === 4900, "invoice 4900 halalas", inv.amount);
  let pay = (await sql("select * from payments where ext_id=$1", [iid]))[0]; ok(pay && pay.status === "initiated" && pay.provider === "moyasar", "payment row initiated", pay);
  let rt = await client()("GET", "/api/billing/return?pid=" + pay.id); ok(rt.s === 302 && /failed=1/.test(rt.loc), "return before pay -> failed", rt.loc);
  await moy("/_pay/" + iid);
  const [r1, r2, r3, r4] = await Promise.all([client()("GET", "/api/billing/return?pid=" + pay.id), client()("POST", "/api/billing/moyasar/callback", { id: iid }), A("POST", `/api/admin/payments/${pay.id}/recheck`), client()("POST", "/api/billing/moyasar/callback", { data: { invoice_id: iid } })]);
  ok(/paid=1/.test(r1.loc), "return -> paid", r1.loc); ok(r2.s === 200 && r4.s === 200, "callbacks 200", [r2.s, r4.s]); ok(r3.j.status === "CAPTURED", "recheck captured", r3.j);
  let subs = await sql("select * from subscriptions where payment_id=$1", [pay.id]); ok(subs.length === 1, "exactly one subscription", subs.length);
  let me = await U1("GET", "/api/me"); ok(me.j.user.plan.tier === "pro", "user pro");
  const end1 = new Date(subs[0].ends_at);
  ok(Math.abs(end1 - Date.now() - 30 * 864e5) < 120e3, "30 days from now");

  section("renewal while pro extends from until");
  co = await U1("POST", "/api/billing/checkout", { plan: "m3", coupon: C15 }); iid = invId(co.j.url); inv = await moy("/v1/invoices/" + iid); ok(inv.amount === 10115, "renewal invoice 10115", inv.amount);
  const pay2 = (await sql("select * from payments where ext_id=$1", [iid]))[0];
  await moy("/_pay/" + iid); await client()("GET", "/api/billing/return?pid=" + pay2.id);
  subs = await sql("select * from subscriptions where payment_id=$1", [pay2.id]); ok(subs.length === 1 && +new Date(subs[0].starts_at) === +end1, "renewal starts at previous end", subs);
  ok(subs[0] && Math.abs(new Date(subs[0].ends_at) - end1 - 90 * 864e5) < 1000, "renewal +90d");
  let cp = (await sql("select used from coupons where code=$1", [C15]))[0]; ok(cp.used === 1, "P15 used once", cp);

  section("callback secret token");
  let cb = await client()("POST", "/api/billing/moyasar/callback", { secret_token: "forged", id: iid }); ok(cb.s === 400 || !process.env.WH, "forged token rejected", cb.s);
  if (process.env.WH) { cb = await client()("POST", "/api/billing/moyasar/callback", { secret_token: process.env.WH, id: iid }); ok(cb.s === 200, "good token accepted", cb.s); }
  cb = await client()("POST", "/api/billing/moyasar/callback", { id: "00000000-0000-0000-0000-000000000000" }); ok(cb.s === 200, "unknown invoice ignored");

  section("100% coupon");
  const U2 = await signup(`u2_${runId}@t.com`);
  co = await U2("POST", "/api/billing/checkout", { plan: "m1", coupon: C100 }); ok(co.j.activated, "100% activates", co.j);
  cp = (await sql("select used from coupons where code=$1", [C100]))[0]; ok(cp.used === 1, "FREE used 1", cp);

  section("race: 100% coupon max 3, 8 concurrent users");
  const us = await Promise.all([...Array(8)].map((_, i) => signup(`r${i}_${runId}@t.com`)));
  const res = await Promise.all(us.map(u => u("POST", "/api/billing/checkout", { plan: "m1", coupon: CR })));
  const act = res.filter(r => r.j.activated).length; cp = (await sql("select used from coupons where code=$1", [CR]))[0];
  ok(act === 3 && cp.used === 3, "exactly 3 activations, used=3", { act, used: cp.used, codes: res.map(r => r.j.error || "act") });

  section("race: 50% coupon max 2, 5 concurrent paid checkouts then all pay");
  const us2 = await Promise.all([...Array(5)].map((_, i) => signup(`rp${i}_${runId}@t.com`)));
  const res2 = await Promise.all(us2.map(u => u("POST", "/api/billing/checkout", { plan: "m1", coupon: CR2 })));
  const urls = res2.filter(r => r.j.url); ok(urls.length <= 2, "at most 2 checkouts reserved the coupon", res2.map(r => r.j.error || "url"));
  for (const r of urls) { const id = invId(r.j.url); await moy("/_pay/" + id); await client()("POST", "/api/billing/moyasar/callback", { id }); }
  cp = (await sql("select used from coupons where code=$1", [CR2]))[0]; ok(cp.used <= 2, "used <= max_uses", cp);

  section("plan edit during in-flight payment");
  const U3 = await signup(`u3_${runId}@t.com`);
  co = await U3("POST", "/api/billing/checkout", { plan: "m1" }); iid = invId(co.j.url);
  const pay3 = (await sql("select * from payments where ext_id=$1", [iid]))[0];
  const c2 = JSON.parse(JSON.stringify(cfg)); c2.plans[0].price = 59; c2.plans[0].days = 10; await A("PUT", "/api/admin/settings", { config: c2 });
  await moy("/_pay/" + iid); await client()("GET", "/api/billing/return?pid=" + pay3.id);
  subs = await sql("select * from subscriptions where payment_id=$1", [pay3.id]);
  ok(subs.length === 1 && Math.round((new Date(subs[0].ends_at) - new Date(subs[0].starts_at)) / 864e5) === 30, "in-flight payment keeps 30 days", subs.map(s => (new Date(s.ends_at) - new Date(s.starts_at)) / 864e5));
  await A("PUT", "/api/admin/settings", { config: cfg });

  section("expired / failed / canceled invoices");
  for (const s of ["expired", "failed", "canceled"]) {
    const U = await signup(`st_${s}_${runId}@t.com`); const c = await U("POST", "/api/billing/checkout", { plan: "m1", coupon: C15 }); const id = invId(c.j.url); const p = (await sql("select id from payments where ext_id=$1", [id]))[0];
    await moy(`/_status/${id}?s=${s}`); const r = await client()("GET", "/api/billing/return?pid=" + p.id); const row = (await sql("select status,tap_status from payments where id=$1", [p.id]))[0];
    ok(/failed=1/.test(r.loc) && row.status === "failed" && row.tap_status === s, s + " -> failed", row);
  }
  cp = (await sql("select used from coupons where code=$1", [C15]))[0]; ok(cp.used === 1, "failed payments don't use coupon", cp);

  section("amount mismatch");
  { const U = await signup(`mm_${runId}@t.com`); const c = await U("POST", "/api/billing/checkout", { plan: "m1" }); const id = invId(c.j.url); const p = (await sql("select id from payments where ext_id=$1", [id]))[0];
    await moy(`/_pay/${id}?amount=100`); const r = await client()("GET", "/api/billing/return?pid=" + p.id); const s = await sql("select * from subscriptions where payment_id=$1", [p.id]); ok(/failed=1/.test(r.loc) && !s.length, "mismatch not activated"); }

  section("refunds");
  let r = await A("POST", `/api/admin/payments/${pay2.id}/refund`, { amount: 50, revoke: false }); ok(r.s === 200, "partial refund 50", r.j);
  let row = (await sql("select status,refunded_amount from payments where id=$1", [pay2.id]))[0]; ok(+row.refunded_amount === 50, "refunded_amount 50", row);
  subs = await sql("select revoked_at from subscriptions where payment_id=$1", [pay2.id]); ok(subs[0].revoked_at === null, "not revoked");
  r = await A("POST", `/api/admin/payments/${pay2.id}/refund`, { amount: 60 }); ok(r.s === 400, "second refund over remaining rejected", r.j);
  r = await A("POST", `/api/admin/payments/${pay2.id}/refund`, { amount: 51.15, revoke: true }); ok(r.s === 200, "second partial refund of remainder", r.j);
  row = (await sql("select status,refunded_amount from payments where id=$1", [pay2.id]))[0]; ok(+row.refunded_amount === 101.15 && row.status === "refunded", "fully refunded", row);
  subs = await sql("select revoked_at from subscriptions where payment_id=$1", [pay2.id]); ok(subs[0].revoked_at !== null, "revoked");
  const before = (await sql("select count(*)::int n from subscriptions where user_id=$1", [pay2.user_id]))[0].n;
  await A("POST", `/api/admin/payments/${pay2.id}/recheck`); await client()("POST", "/api/billing/moyasar/callback", { id: pay2.ext_id });
  const after = (await sql("select count(*)::int n from subscriptions where user_id=$1", [pay2.user_id]))[0].n;
  row = (await sql("select status from payments where id=$1", [pay2.id]))[0];
  ok(after === before && row.status === "refunded", "refunded payment not re-activated by recheck/callback", { before, after, row });
  const [d1, d2] = await Promise.all([A("POST", `/api/admin/payments/${pay.id}/refund`, {}), A("POST", `/api/admin/payments/${pay.id}/refund`, {})]);
  ok([d1.s, d2.s].filter(s => s === 200).length === 1, "double-click refund only once", [d1.j, d2.j]);
  me = await U1("GET", "/api/me"); ok(me.j.user.plan.tier === "free", "user free after full refunds", me.j.user.plan);
  const U4 = await signup(`gap_${runId}@t.com`); const pids = [];
  for (const pl of ["m1", "m1"]) { const c = await U4("POST", "/api/billing/checkout", { plan: pl }); const id = invId(c.j.url); await moy("/_pay/" + id); const p = (await sql("select id from payments where ext_id=$1", [id]))[0]; await client()("GET", "/api/billing/return?pid=" + p.id); pids.push(p.id); }
  await A("POST", `/api/admin/payments/${pids[0]}/refund`, { revoke: true });
  me = await U4("GET", "/api/me"); ok(me.j.user.plan.tier === "pro" && Math.abs(new Date(me.j.user.plan.until) - Date.now() - 30 * 864e5) < 120e3, "refunding the first of two stacked periods keeps the second active now", me.j.user.plan);

  section("student-facing plan info");
  const pi = await U4("GET", "/api/plan"); ok(pi.s === 200 && pi.j.plan.tier === "pro" && pi.j.payments.length === 2 && pi.j.payments.every(p => p.status !== "initiated"), "/api/plan lists settled payments only", pi.j.payments && pi.j.payments.map(p => p.status));

  section("audit covers billing mutations");
  const acts = new Set((await A("GET", "/api/admin/audit")).j.audit.map(a => a.action));
  ok(["coupon_create", "settings", "refund", "recheck"].every(a => acts.has(a)), "audit has coupon_create/settings/refund/recheck", [...acts]);
});
