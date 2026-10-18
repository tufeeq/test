// Concurrency & data: simultaneous progress saves, the optional `base` conflict check, payloads at and over the 2 MB
// limit, pool exhaustion and recovery, stacked grants under concurrency.
"use strict";
const { client, signup, admin, sql, ok, section, run, uid, raw, BASE } = require("./lib");

run(async () => {
  const runId = uid();
  const A = await admin();
  const U = await signup(`data_${runId}@t.com`);
  const uidRow = (await sql("SELECT id FROM users WHERE email=$1", [U.user.email]))[0].id;
  const S = n => JSON.stringify({ v: n, stats: { algebra: { c: n, t: 20 } }, attempts: [], pad: "x".repeat(50000) });

  section("two devices saving at once (no base): last writer wins, never a torn row");
  const devices = await Promise.all([...Array(2)].map(() => signup(U.user.email)));
  const bursts = [];
  for (let round = 0; round < 10; round++) bursts.push(...devices.map((d, i) => d("PUT", "/api/progress", { p: S(round * 10 + i), track: "sci", target: 90, lang: "ar", summary: { est: round } })));
  const rs = await Promise.all(bursts);
  ok(rs.every(r => r.s === 200 && r.j.updatedAt), "20 concurrent saves all 200 with updatedAt", rs.map(r => r.s));
  let row = (await sql("SELECT p, summary, updated_at FROM progress WHERE user_id=$1", [uidRow]))[0];
  let parsed = null; try { parsed = JSON.parse(row.p); } catch (e) {}
  ok(parsed && typeof parsed.v === "number" && parsed.pad.length === 50000, "stored progress is one complete payload", parsed && parsed.v);
  const got = await U("GET", "/api/progress");
  ok(got.s === 200 && got.j.p === row.p && new Date(got.j.updatedAt).getTime() === new Date(row.updated_at).getTime(), "GET returns the stored copy and its updatedAt");

  section("optimistic concurrency with base");
  const a = devices[0], b = devices[1];
  const seenByA = (await a("GET", "/api/progress")).j.updatedAt;
  const bSave = await b("PUT", "/api/progress", { p: S(1001) }); ok(bSave.s === 200, "device B saves newer data");
  let r = await a("PUT", "/api/progress", { p: S(1000), base: seenByA });
  ok(r.s === 409 && r.j.error === "conflict" && JSON.parse(r.j.p).v === 1001 && r.j.updatedAt === bSave.j.updatedAt, "device A with a stale base gets 409 + the current copy", { s: r.s, j: r.j && { error: r.j.error, updatedAt: r.j.updatedAt } });
  row = (await sql("SELECT p FROM progress WHERE user_id=$1", [uidRow]))[0]; ok(JSON.parse(row.p).v === 1001, "the stale save wrote nothing");
  r = await a("PUT", "/api/progress", { p: S(1002), base: r.j.updatedAt }); ok(r.s === 200, "A merges and saves again with the fresh base");
  r = await a("PUT", "/api/progress", { p: S(1003), base: r.j.updatedAt }); ok(r.s === 200, "base equal to the current updatedAt (ms precision) is accepted");
  r = await a("PUT", "/api/progress", { p: S(1004), base: "not-a-date" }); ok(r.s === 400 && r.j.error === "bad-base", "garbage base -> 400 bad-base");
  r = await a("PUT", "/api/progress", { p: S(1005) }); ok(r.s === 200, "no base: last writer still wins (older clients)");
  const stale = new Date(Date.now() - 864e5).toISOString();
  r = await a("PUT", "/api/progress", { p: S(1006), base: stale }); ok(r.s === 409, "a day-old base conflicts");
  // a brand-new account has no row yet: base is irrelevant, the first save goes through
  const fresh = await signup(`fresh_${runId}@t.com`);
  r = await fresh("PUT", "/api/progress", { p: "{}", base: stale }); ok(r.s === 200, "first save of a new account with any base -> 200");

  section("payload limits");
  const two = 2 * 1024 * 1024;
  const body = JSON.stringify({ p: "{\"a\":\"" + "y".repeat(899990) + "\"}", pad: "" });
  const pad = two - Buffer.byteLength(body); const exact = body.replace('"pad":""', '"pad":"' + "z".repeat(pad) + '"');
  ok(Buffer.byteLength(exact) === two, "built a body of exactly 2 MiB");
  r = await raw({ method: "PUT", path: "/api/progress", headers: { "Content-Type": "application/json", "X-Masar": "1", cookie: U.ck() }, body: exact });
  ok(r.s === 200, "exactly 2 MiB -> 200", r.t.slice(0, 80));
  r = await raw({ method: "PUT", path: "/api/progress", headers: { "Content-Type": "application/json", "X-Masar": "1", cookie: U.ck() }, body: exact + " " });
  ok(r.s === 413 && JSON.parse(r.t).error === "too-large", "2 MiB + 1 byte -> 413 too-large", r.t.slice(0, 80));
  r = await U("PUT", "/api/progress", { p: "\"" + "y".repeat(900000) + "\"" }); ok(r.s === 400 && r.j.error === "bad-progress", "p of 900002 chars -> 400 bad-progress");
  r = await U("PUT", "/api/progress", { p: "{\"a\":" }); ok(r.s === 400 && r.j.error === "bad-progress", "invalid JSON in p -> 400");
  r = await raw({ method: "POST", path: "/api/events", headers: { "Content-Type": "application/json", "X-Masar": "1", cookie: U.ck() }, body: JSON.stringify({ events: [{ type: "open" }], pad: "x".repeat(100 * 1024) }) });
  ok(r.s === 413, "100 KB limit on ordinary routes", r.s);
  const big = await raw({ method: "POST", path: "/api/login", headers: { "Content-Type": "application/json", "X-Masar": "1", "Transfer-Encoding": "chunked" }, body: JSON.stringify({ email: "x".repeat(200 * 1024) }) });
  ok(big.s === 413, "chunked body over the limit -> 413", big.s);

  section("pool exhaustion: 50 heavy admin queries + 50 saves at once");
  const t0 = Date.now();
  const heavy = [...Array(50)].map(() => A("GET", "/api/admin/overview?days=365")), saves = [...Array(50)].map((_, i) => U("PUT", "/api/progress", { p: S(2000 + i) }));
  const all = await Promise.all([...heavy, ...saves]);
  const codes = all.map(x => x.s);
  ok(all.every(x => x.s === 200 || x.s === 429), "100 concurrent requests: only 200/429, no 5xx", codes.filter(c => c !== 200 && c !== 429));
  console.log(`  .    100 concurrent requests in ${Date.now() - t0} ms`);
  const after = await A("GET", "/api/admin/overview?days=7"); ok(after.s === 200, "server answers normally afterwards");
  const conns = (await sql("SELECT count(*)::int n FROM pg_stat_activity WHERE datname=current_database()"))[0].n;
  ok(conns <= 15, "connection count stays within the pool (+ test client)", conns);

  section("stacked grants under concurrency");
  const g = await signup(`grant_${runId}@t.com`); const gid = (await sql("SELECT id FROM users WHERE email=$1", [g.user.email]))[0].id;
  const [g1, g2] = await Promise.all([A("POST", `/api/admin/users/${gid}/grant`, { days: 10 }), A("POST", `/api/admin/users/${gid}/grant`, { days: 10 })]);
  ok(g1.s === 200 && g2.s === 200, "both grants succeed");
  const subs = await sql("SELECT starts_at, ends_at FROM subscriptions WHERE user_id=$1 ORDER BY starts_at", [gid]);
  ok(subs.length === 2 && +new Date(subs[1].starts_at) === +new Date(subs[0].ends_at), "second period starts exactly when the first ends (no overlap, no gap)", subs);
  const plan = (await g("GET", "/api/me")).j.user.plan;
  ok(plan.tier === "pro" && Math.abs(new Date(plan.until) - Date.now() - 20 * 864e5) < 60e3, "student is pro for 20 days", plan);
});
