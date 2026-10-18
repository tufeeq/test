// API fuzz & validation: every route gets wrong types, huge strings, odd unicode, null bytes, nested objects,
// invalid JSON, odd headers, odd query strings. Expected: a clean 4xx with a stable `error` code, never a 500,
// never a stack trace or SQL text in the body.
"use strict";
const { client, signup, admin, raw, sql, ok, section, run, uid, BASE } = require("./lib");

const BIG = "x".repeat(120 * 1024);                       // over the 100 KB small-body cap
const LONG = "y".repeat(5000);
const WEIRD = ["", " ", "null", "undefined", "0", "-1", "1e308", "9007199254740993", "NaN",
  "\u0000", "a\u0000b", "‮evil‬", "​‌‍‎‏", "⁦x⁩", "😀".repeat(60), "سارةـّ", "👨‍👩‍👧‍👦",
  "<img src=x onerror=alert(1)>", "'; DROP TABLE users; --", "\" OR 1=1 --", "{{7*7}}", "${7*7}", "%00%2e%2e%2f", "\\", "\n\r\t", "\ud800", "﻿", LONG];
const TYPES = [null, true, false, 0, -1, 1e308, -1e308, 2 ** 53 + 1, [], [1, 2], ["a@b.com"], {}, { a: 1 }, { length: 1e9 }, { __proto__: { x: 1 } }, "str"];
const nested = (d => { let o = {}; for (let i = 0; i < d; i++) o = { a: o, b: [i] }; return o; })(200);

const LEAK = /(\bat\s+\S+\.js:\d+|\bSELECT\b|\bINSERT\b|\bUPDATE\b|syntax error|\brelation\b|\bcolumn\b|\bpg_|node_modules|TypeError|ReferenceError|RangeError)/;
function clean(r, label) {
  const body = typeof r.t === "string" ? r.t : JSON.stringify(r.j);
  const ct = String((r.h && (r.h.get ? r.h.get("content-type") : r.h["content-type"])) || "");
  const okStatus = r.s < 500 || (r.s === 503 && r.j && r.j.error === "payments-not-configured"); // a coded 503 is a deliberate answer, not a crash
  const okBody = r.s >= 500 || !/json|text\/plain/.test(ct) ? !LEAK.test(body) || r.s < 500 && !/json|text\/plain/.test(ct) : !LEAK.test(body);
  const okShape = r.s < 400 || (r.j && typeof r.j === "object" && typeof r.j.error === "string") || /^\/(auth|app)/.test(r.loc || "") || [304, 404, 405, 416, 429].includes(r.s);
  if (!(okStatus && okBody && okShape)) ok(false, label, { s: r.s, body: body.slice(0, 200) });
  return okStatus && okBody && okShape;
}

run(async () => {
  const A = await admin();
  const U = await signup(`fz_${uid()}@t.com`, "password123", "Fuzz User");
  const anon = client();
  const who = { anon, user: U, admin: A };
  const uidRow = (await sql("SELECT id FROM users WHERE email=$1", [U.user.email]))[0].id;

  section("JSON body fuzz on every mutating route");
  // [method, path, who, template of valid-ish body]
  const routes = [
    ["POST", "/api/signup", "anon", { email: "e@x.com", password: "password123", name: "Name", consent: true }],
    ["POST", "/api/login", "anon", { email: "e@x.com", password: "password123" }],
    ["POST", "/api/logout", "anon", {}],
    ["POST", "/api/name", "user", { name: "Name" }],
    ["POST", "/api/password", "user", { current: "password123", next: "password456" }],
    ["PUT", "/api/progress", "user", { p: "{}", track: "sci", target: 90, lang: "ar", examDate: "2026-12-01", summary: { est: 1 } }],
    ["POST", "/api/events", "user", { events: [{ type: "open" }, { type: "xp_done", k: "al-vars", v: 3 }] }],
    ["POST", "/api/billing/quote", "user", { plan: "m1", coupon: "NOPE" }],
    ["POST", "/api/billing/checkout", "user", { plan: "zz", coupon: "NOPE", lang: "ar" }],   // bad plan: never reaches the gateway
    ["POST", "/api/billing/moyasar/callback", "anon", { id: "00000000-0000-0000-0000-000000000000" }],
    ["POST", "/api/billing/webhook", "anon", { id: "chg_x" }],
    ["POST", "/api/billing/refund-webhook", "anon", {}],
    ["POST", `/api/admin/users/${uidRow}/grant`, "admin", { days: 1, note: "n" }],
    ["POST", `/api/admin/users/${uidRow}/name`, "admin", { name: "Name" }],
    ["POST", "/api/admin/payments/pay_nope/refund", "admin", { amount: 1, reason: "r", revoke: true }],
    ["POST", "/api/admin/coupons", "admin", { code: "FZ" + uid().toUpperCase(), pct: 10, maxUses: 2, expires: "2030-01-01", plans: ["m1"], note: "n" }],
    ["PATCH", "/api/admin/coupons/NOPE", "admin", { active: true }],
    ["PUT", "/api/admin/settings", "admin", { config: { banner: { on: false, ar: "", en: "", tone: "info" } } }]
  ];
  let total = 0, bad = 0;
  for (const [m, p, w, tpl] of routes) {
    const c = who[w];
    let n = 0; const t0 = Date.now();
    // a fresh X-Forwarded-For per request keeps the per-IP limiter out of the way (trust proxy is 1), so every validation path is exercised
    const send = async (body, label) => { total++; n++; const r = await c(m, p, body, { "X-Forwarded-For": `10.${(n >> 16) & 255}.${(n >> 8) & 255}.${n & 255}` }); if (!clean(r, `${m} ${p} ${label}`)) bad++; return r; };
    // whole-body shapes
    for (const b of [[], [1, 2], 123, "str", null, true, nested, { __proto__: { admin: true } }, { constructor: { prototype: { x: 1 } } }]) await send(b, "body=" + JSON.stringify(b).slice(0, 30));
    await send("{\"a\":", "invalid json");
    await send("{\"a\":1}garbage", "trailing garbage");
    await send("﻿{\"a\":1}", "BOM json");
    await send(JSON.stringify(tpl).replace(/^\{/, "{\"" + Object.keys(tpl)[0] + "\":[],"), "duplicate key");
    // per-field type and string fuzz (first level and one level down)
    const fields = Object.keys(tpl);
    for (const f of fields) {
      for (const v of TYPES) await send({ ...tpl, [f]: v }, `${f}=${JSON.stringify(v)}`);
      for (const v of WEIRD) await send({ ...tpl, [f]: v }, `${f}=${JSON.stringify(v).slice(0, 24)}`);
      if (tpl[f] && typeof tpl[f] === "object" && !Array.isArray(tpl[f])) for (const g of Object.keys(tpl[f])) for (const v of [...TYPES.slice(0, 8), "\u0000", BIG.slice(0, 3000), "<b>x</b>"]) await send({ ...tpl, [f]: { ...tpl[f], [g]: v } }, `${f}.${g}=${JSON.stringify(v).slice(0, 20)}`);
      if (Array.isArray(tpl[f])) for (const v of [[null], [{}], [[]], [{ type: "\u0000" }], [{ type: "open", k: "\u0000", v: "1" }], [{ type: "xp_done", k: {}, v: 1e308 }], new Array(60).fill({ type: "open" })]) await send({ ...tpl, [f]: v }, `${f}=${JSON.stringify(v).slice(0, 30)}`);
    }
    // oversize
    const r = await c(m, p, { ...tpl, [fields[0]]: BIG });
    total++; if (!clean(r, `${m} ${p} 120KB field`)) bad++;
    if (!/progress|admin/.test(p)) ok(r.s === 413 && r.j.error === "too-large", `${m} ${p} 120KB body -> 413 too-large`, r.s);
    console.log(`  .    ${m} ${p}: ${n} requests in ${Date.now() - t0} ms`);
  }
  ok(bad === 0, `${total} fuzzed JSON requests, ${bad} unclean`);

  section("content-type and encoding oddities");
  for (const [hdr, label] of [[{ "Content-Type": undefined }, "no content-type"], [{ "Content-Type": "text/plain" }, "text/plain"], [{ "Content-Type": "application/json; charset=utf-16" }, "utf-16 charset"],
    [{ "Content-Type": "application/x-www-form-urlencoded" }, "form"], [{ "Content-Encoding": "gzip" }, "gzip body"], [{ "Content-Type": "application/json", "Content-Length": "5" }, "short content-length"]]) {
    const r = await raw({ method: "POST", path: "/api/login", headers: { "X-Masar": "1", "Content-Type": "application/json", ...Object.fromEntries(Object.entries(hdr).filter(([, v]) => v !== undefined)), ...(hdr["Content-Type"] === undefined ? {} : {}) }, body: hdr["Content-Length"] ? "{\"em" : JSON.stringify({ email: "a@b.com", password: "password123" }) }).catch(e => ({ s: 0, t: String(e) }));
    if (hdr["Content-Type"] === undefined) { const r2 = await fetch(BASE + "/api/login", { method: "POST", headers: { "X-Masar": "1" }, body: JSON.stringify({ email: "a@b.com", password: "x" }) }); ok(r2.status < 500, label + " -> " + r2.status); }
    else ok(r.s === 0 || r.s < 500, label + " -> " + (r.s || r.t), r.t && String(r.t).slice(0, 100));
  }

  section("query string and path fuzz");
  const Q = ["[]=x", "[a]=b", "=1e308", "=-1", "=NaN", "=Infinity", "=%00", "=" + encodeURIComponent("‮"), "=" + "z".repeat(3000), "=__proto__", "=constructor"];
  const gets = [["/api/admin/users?page", "admin"], ["/api/admin/users?size", "admin"], ["/api/admin/users?q", "admin"], ["/api/admin/users?plan", "admin"], ["/api/admin/users?sort", "admin"],
    ["/api/admin/overview?days", "admin"], ["/api/admin/funnel?days", "admin"], ["/api/admin/content?days", "admin"], ["/api/admin/payments?status", "admin"],
    ["/api/billing/return?pid", "anon"], ["/api/billing/return?tap_id", "anon"], ["/?lang", "anon"], ["/?home", "anon"], ["/app.js?v", "anon"], ["/auth/google?next", "anon"], ["/sitemap.xml?x", "anon"]];
  let qbad = 0, qn = 0;
  for (const [base, w] of gets) for (const q of Q) { qn++; const r = await who[w]("GET", base + q); if (!clean(r, `GET ${base}${q.slice(0, 30)}`)) qbad++; }
  ok(qbad === 0, `${qn} fuzzed query strings, ${qbad} unclean`);
  const paths = ["/api/admin/users/%00", "/api/admin/users/" + "a".repeat(2000), "/api/admin/users/%E2%80%8B", "/api/admin/users/x%27%3B--", "/api/admin/coupons/%00", "/api/admin/coupons/" + encodeURIComponent("😀"),
    "/api/admin/payments/%00/recheck", "/api/%00", "/audio/%2e%2e%2f%2e%2e%2fetc%2fpasswd.mp3", "/audio/" + "a".repeat(80) + ".mp3", "/audio/x%00.mp3", "/audio/..%5c..%5cserver.js",
    "/%2e%2e/%2e%2e/etc/passwd", "/..%5c..%5cpackage.json", "/public/../server.js", "/.git/config", "/node_modules/express/package.json", "/%D8%A7%D9%84%D8%AE%D8%B5%D9%88%D8%B5%D9%8A%D8%A9", "/app/../admin.html", "//evil.com/", "/api/admin/../me", "/xp/..%2f..%2fserver.js"];
  for (const p of paths) {
    // raw requests: fetch() would normalise ".." segments away before the server ever saw them
    const g = await raw({ path: p, headers: { "X-Masar": "1", cookie: A.ck() } }).catch(e => ({ s: 0, t: String(e), h: {} }));
    ok(g.s > 0 && g.s < 500, `GET ${p} -> ${g.s}`, g.t && g.t.slice(0, 80));
    if (/server\.js|passwd|\.git|package\.json|node_modules/.test(p)) ok(g.s === 404 || g.s === 400 || g.s === 403 || (g.s === 200 && /<!doctype html>/i.test(g.t) && !/require\(/.test(g.t)), `traversal blocked ${p}`, { s: g.s, t: String(g.t).slice(0, 60) });
    for (const m of ["DELETE", "POST"]) { const r = await raw({ method: m, path: p, headers: { "X-Masar": "1", cookie: A.ck(), "Content-Type": "application/json" }, body: "{}" }).catch(e => ({ s: 0, t: String(e) })); ok(r.s > 0 && r.s < 500, `${m} ${p} -> ${r.s}`, r.t && r.t.slice(0, 80)); }
  }

  section("methods");
  for (const [m, p] of [["OPTIONS", "/api/me"], ["TRACE", "/api/me"], ["PATCH", "/api/progress"], ["PUT", "/api/me"], ["DELETE", "/api/progress"], ["HEAD", "/api/me"], ["HEAD", "/"], ["HEAD", "/app.js"], ["HEAD", "/audio/index.json"], ["PROPFIND", "/"], ["POST", "/"], ["PUT", "/app.js"], ["DELETE", "/privacy"]]) {
    const r = await raw({ method: m, path: p, headers: { "X-Masar": "1", cookie: U.ck() } }).catch(e => ({ s: 0, t: String(e) }));
    ok(r.s > 0 && r.s < 500, `${m} ${p} -> ${r.s}`, r.t && r.t.slice(0, 80));
  }

  section("Range header on audio");
  const ids = await anon("GET", "/audio/index.json");
  if (Array.isArray(ids.j) && ids.j.length) {
    const id = ids.j[0];
    for (const rg of ["bytes=0-", "bytes=-", "bytes=-1", "bytes=5-2", "bytes=99999999999-", "bytes=0-1,3-4", "bytes=abc", "bytes=0-99999999999999999999", "items=0-1", "bytes=-99999999999999999", ""]) {
      const r = await raw({ path: `/audio/${id}.mp3`, headers: rg ? { Range: rg } : {} });
      ok([200, 206, 416, 304].includes(r.s), `Range "${rg}" -> ${r.s}`);
    }
  } else ok(true, "no narration clips in this database: Range tests skipped");

  section("cookie header oddities");
  for (const ck of ["m100=", "m100=%E0%A4%A", "m100=" + "a".repeat(5000), "m100=' OR 1=1", "=; m100=x; m100=y", "m100", "m100=%00"]) {
    const r = await raw({ path: "/api/me", headers: { cookie: ck } }).catch(e => ({ s: 0, t: String(e) }));
    ok(r.s === 200 || r.s === 400, `cookie ${JSON.stringify(ck).slice(0, 30)} -> ${r.s}`);
  }

  section("stored data after the fuzz run");
  const u = (await sql("SELECT name, email FROM users WHERE id=$1", [uidRow]))[0];
  ok(u && !/[\u0000-\u001f​-‏‪-‮<>]/.test(u.name), "stored name has no control/format chars or angle brackets", u);
  const names = await sql("SELECT name FROM users WHERE name ~ '[\\u0000-\\u001f]' OR name LIKE '%<%' LIMIT 5");
  ok(names.length === 0, "no stored name contains control chars or <", names);
  const prog = await sql("SELECT p, exam_date, summary FROM progress WHERE user_id=$1", [uidRow]);
  if (prog[0]) { let parsed = true; try { JSON.parse(prog[0].p); } catch (e) { parsed = false; }
    ok(parsed, "stored progress JSON parses");
    ok(typeof prog[0].exam_date === "string" && /^(\d{4}-\d{2}-\d{2})?$/.test(prog[0].exam_date), "exam_date stored as a plain date string", prog[0].exam_date);
    ok(!prog[0].summary || typeof prog[0].summary.lastActive === "string", "summary.lastActive stored as a string", prog[0].summary); }
  const cfg = (await sql("SELECT value FROM settings WHERE key='config'"))[0];
  ok(!cfg || JSON.stringify(cfg.value).indexOf("\\u0000") < 0, "settings hold no null bytes");
  // the admin's own session and the user's session still work after the fuzz
  ok((await A("GET", "/api/me")).j.user.isAdmin === true, "admin session intact");
  ok((await U("GET", "/api/me")).j.user !== null, "user session intact");
});
