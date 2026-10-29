// What the other suites do not cover: the free/premium explainer split, premium narration clips, the /api/config and
// /api/me contracts the app relies on, robots.txt / sitemap.xml, and startup on a fresh empty database (migrations,
// schema check, log hygiene).
"use strict";
const vm = require("vm");
const fs = require("fs");
const path = require("path");
const net = require("net");
const { spawn } = require("child_process");
const { client, signup, admin, sql, ok, section, run, uid, sleep, BASE, DB } = require("./lib");

const ROOT = path.join(__dirname, "..");
const TRACKS = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "tracks.json"), "utf8"));

// run a lesson bundle in a sandbox and collect the lessons it registers (functions inside are never called)
function lessonsIn(code) {
  const got = [];
  const XP = { ready: true, add: L => got.push(L), h: new Proxy({}, { get: () => () => ({}) }) };
  vm.runInNewContext(code, { window: { XP }, XP, console: { log() {}, warn() {}, error() {} } }, { timeout: 5000 });
  return got;
}
// every piece of text a lesson carries as data (title, goals, board labels, narrated lines, feedback, quiz); the
// hand-built scenes keep some labels inside functions, which the source checks below cover by key instead
function textsOf(L) {
  const out = [], seen = new Set();
  (function walk(v) {
    if (typeof v === "string") { if (v.trim().length >= 12) out.push(v); return; }
    if (!v || typeof v !== "object" || seen.has(v)) return; seen.add(v);
    for (const k of Object.keys(v)) if (k !== "_stage") walk(v[k]);
  })(L);
  return out;
}
const clipIdsOf = T => {
  const ids = new Set((T.segs || []).map(s => s.clip));
  Object.values(T.fb || {}).forEach(o => Object.values(o).forEach(src => { const m = /\/audio\/([\w-]+)\.mp3/.exec(src); if (m) ids.add(m[1]); }));
  return [...ids];
};
const freePort = () => new Promise((res, rej) => { const s = net.createServer(); s.unref(); s.on("error", rej); s.listen(0, "127.0.0.1", () => { const p = s.address().port; s.close(() => res(p)); }); });

run(async () => {
  const runId = uid();
  const A = await admin();
  const U = await signup(`free_${runId}@t.com`);
  const P = await signup(`pro_${runId}@t.com`);
  const anon = client();
  const pid = (await sql("SELECT id FROM users WHERE email=$1", [P.user.email]))[0].id;
  ok((await A("POST", `/api/admin/users/${pid}/grant`, { days: 30, note: "contract test" })).s === 200, "grant pro to the test student");

  // ------------------------------------------------------------------
  section("/api/config and /api/me contracts");
  const shape = (cfg, who) => {
    ok(cfg && Array.isArray(cfg.plans) && cfg.plans.length > 0, `${who}: config.plans is a non-empty list`);
    ok(cfg.plans.every(p => typeof p.id === "string" && typeof p.ar === "string" && typeof p.en === "string" && Number.isInteger(p.days) && typeof p.price === "number" && typeof p.best === "boolean" && !("active" in p)),
      `${who}: every plan is {id,ar,en,days,price,best} (active plans only)`, cfg.plans);
    ok(cfg.currency === "SAR", `${who}: currency`);
    ok(cfg.refund && typeof cfg.refund.on === "boolean" && Number.isInteger(cfg.refund.days), `${who}: refund {on,days}`, cfg.refund);
    const f = cfg.free || {};
    ok(Array.isArray(f.xp) && f.xp.every(k => typeof k === "string") && ["dailyQuestions", "planWeeks", "mistakesMax"].every(k => Number.isInteger(f[k])) &&
      ["cardsFrac", "techFrac"].every(k => typeof f[k] === "number" && f[k] >= 0 && f[k] <= 1) && typeof f.diagnostic === "boolean", `${who}: free limits typed`, f);
    ok(cfg.banner && typeof cfg.banner.on === "boolean" && typeof cfg.banner.ar === "string" && typeof cfg.banner.en === "string" && ["info", "promo", "warn"].includes(cfg.banner.tone), `${who}: banner`, cfg.banner);
    ok(Number.isInteger(cfg.trialReportDays), `${who}: trialReportDays`);
    ok(typeof cfg.payments === "boolean" && (cfg.provider === null || ["moyasar", "tap"].includes(cfg.provider)) && cfg.payments === (cfg.provider !== null), `${who}: payments/provider agree`, [cfg.payments, cfg.provider]);
    ok(cfg.social && typeof cfg.social.google === "boolean" && typeof cfg.social.facebook === "boolean", `${who}: social flags`, cfg.social);
    const s = JSON.stringify(cfg);
    ok(!/sk_|secret|whsec|password|client_id|app_id/i.test(s), `${who}: no secrets in the public config`);
  };
  const planShape = (p, tier, who) => ok(p && p.tier === tier && ("until" in p) && ("source" in p) && (tier === "free" ? p.until === null : true), `${who}: plan.tier=${tier}`, p);
  let r = await anon("GET", "/api/config");
  ok(r.s === 200 && /no-store/.test(r.h.get("cache-control") || ""), "/api/config 200, no-store");
  shape(r.j.config, "config/anon"); planShape(r.j.plan, "free", "config/anon");
  r = await anon("GET", "/api/me");
  ok(r.s === 200 && r.j.user === null && /no-store/.test(r.h.get("cache-control") || ""), "/api/me anonymous -> user:null, no-store", r.j);
  shape(r.j.config, "me/anon");
  r = await U("GET", "/api/me");
  ok(r.j.user && r.j.user.email === U.user.email && r.j.user.name === "Test User" && r.j.user.isAdmin === false && !("id" in r.j.user) && !("pass_hash" in r.j.user), "/api/me student -> {email,name,isAdmin,plan}, no id or hash", r.j.user);
  planShape(r.j.user.plan, "free", "me/student");
  r = await P("GET", "/api/me");
  planShape(r.j.user.plan, "pro", "me/pro");
  ok(r.j.user.plan.until && new Date(r.j.user.plan.until) > new Date(Date.now() + 29 * 86400e3) && typeof r.j.user.plan.source === "string" && r.j.user.plan.source, "pro plan has an end date and a source", r.j.user.plan);
  r = await P("GET", "/api/config"); planShape(r.j.plan, "pro", "config/pro");
  r = await A("GET", "/api/me"); ok(r.j.user.isAdmin === true && r.j.user.plan.tier === "pro", "admin is pro", r.j.user);
  // signup / login answer the same user shape as /api/me
  r = await client()("POST", "/api/login", { email: P.user.email, password: "password123" });
  ok(r.s === 200 && r.j.user && r.j.user.email === P.user.email && r.j.user.plan && r.j.user.plan.tier === "pro", "login answers {user:{…, plan}}", r.j);

  // ------------------------------------------------------------------
  section("explainer keys and the free/premium bundle split");
  const cfg = (await anon("GET", "/api/config")).j.config;
  const keys = (await anon("GET", "/api/xp/keys")).j;
  ok(Array.isArray(keys.all) && keys.all.length === 66 && new Set(keys.all).size === 66, "66 distinct explainer keys", keys.all && keys.all.length);
  ok(keys.all.filter(k => k.startsWith("en-")).length === 33, "33 English + 33 Arabic");
  ok(keys.all.every(k => keys.all.includes(k.startsWith("en-") ? k.slice(3) : "en-" + k)), "every explainer exists in both languages");
  const freeSet = new Set(cfg.free.xp.filter(k => keys.all.includes(k)));
  ok(cfg.free.xp.every(k => keys.all.includes(k)), "every free key in the config is a real explainer", cfg.free.xp.filter(k => !keys.all.includes(k)));
  ok(JSON.stringify([...keys.free].sort()) === JSON.stringify([...freeSet].sort()), "/api/xp/keys free list = config free list");
  ok(Object.keys(TRACKS).every(k => keys.all.includes(k)) && keys.all.every(k => TRACKS[k]), "tracks.json has a track for every explainer and nothing else", keys.all.filter(k => !TRACKS[k]));

  r = await anon("GET", "/xp/free.js");
  ok(r.s === 200 && /javascript/.test(r.h.get("content-type") || ""), "/xp/free.js served to anyone");
  const freeCode = r.t;
  const freeL = lessonsIn(freeCode);
  ok(JSON.stringify(freeL.map(l => l.key).sort()) === JSON.stringify([...freeSet].sort()), "free bundle registers exactly the free explainers", freeL.map(l => l.key));
  ok((await anon("GET", "/api/xp/premium.js")).s === 401, "premium bundle: anonymous -> 401");
  r = await U("GET", "/api/xp/premium.js"); ok(r.s === 402 && !/scenes|XP\.add/.test(r.t), "premium bundle: free student -> 402, no source", r.s);
  r = await P("GET", "/api/xp/premium.js");
  ok(r.s === 200 && /private/.test(r.h.get("cache-control") || "") && /no-store/.test(r.h.get("cache-control") || ""), "premium bundle: pro -> 200, private no-store", r.h.get("cache-control"));
  const premL = lessonsIn(r.t);
  const premKeys = keys.all.filter(k => !freeSet.has(k));
  ok(JSON.stringify(premL.map(l => l.key).sort()) === JSON.stringify([...premKeys].sort()), "premium bundle registers exactly the other explainers", premL.length);
  // no premium explainer's text or key reaches the free bundle (text a free explainer also contains does not count)
  const freeTexts = freeL.flatMap(textsOf).join("\n");
  const leaks = [];
  for (const L of premL) {
    if (new RegExp(`key\\s*:\\s*['"]${L.key}['"]`).test(freeCode)) leaks.push(L.key + ": key literal");
    for (const s of textsOf(L)) if (!freeTexts.includes(s) && freeCode.includes(s)) { leaks.push(L.key + ": " + s.slice(0, 60)); break; }
  }
  ok(leaks.length === 0, `no premium explainer source in /xp/free.js (${premL.length} checked, ${premL.reduce((a, L) => a + textsOf(L).length, 0)} strings)`, leaks);
  ok(premL.every(L => textsOf(L).length >= 5), "every premium explainer carries its text (the check above is meaningful)");
  // cutting must never change a lesson: each one's data is identical to the unsplit sources run as they are
  const srcFiles = fs.readdirSync(path.join(ROOT, "xpsrc")).filter(f => /\.js$/.test(f)).sort((a, b) => (a === "xp_legacy.js" ? -1 : b === "xp_legacy.js" ? 1 : a < b ? -1 : 1));
  const ref = Object.fromEntries(lessonsIn(srcFiles.map(f => fs.readFileSync(path.join(ROOT, "xpsrc", f), "utf8")).join("\n")).map(L => [L.key, JSON.stringify(L)]));
  const changed = [...freeL, ...premL].filter(L => JSON.stringify(L) !== ref[L.key]).map(L => L.key);
  ok(Object.keys(ref).length === 66 && changed.length === 0, "every explainer in the bundles is identical to its source", changed);

  // the split follows the admin setting: make one premium explainer free, check, then restore
  const st = (await A("GET", "/api/admin/settings")).j.config;
  const moved = premKeys.find(k => k === "ar-frac") || premKeys[0];
  try {
    r = await A("PUT", "/api/admin/settings", { config: { free: { ...st.free, xp: [...st.free.xp, moved] } } });
    ok(r.s === 200, "admin adds one explainer to the free list");
    const f2 = lessonsIn((await anon("GET", "/xp/free.js")).t).map(l => l.key);
    ok(f2.includes(moved) && f2.length === freeL.length + 1, `free bundle now includes ${moved}`, f2.length);
    const p2 = lessonsIn((await P("GET", "/api/xp/premium.js")).t).map(l => l.key);
    ok(!p2.includes(moved) && p2.length === premL.length - 1, `premium bundle no longer includes ${moved}`);
  } finally {
    r = await A("PUT", "/api/admin/settings", { config: { free: st.free } });
    ok(r.s === 200 && lessonsIn((await anon("GET", "/xp/free.js")).t).length === freeL.length, "free list restored");
  }

  // ------------------------------------------------------------------
  section("narration clips: premium ones need a subscription");
  // classification of every clip in tracks.json, with no clip stored: premium -> 402 (the guard runs first), free -> 404
  const wrong = [];
  for (const k of keys.all) {
    const want = freeSet.has(k) ? 404 : 402;
    for (const id of clipIdsOf(TRACKS[k])) { const s = (await fetch(`${BASE}/audio/${id}.mp3`)).status; if (s !== want && !(want === 404 && s === 200)) wrong.push(`${k}/${id}: ${s} (want ${want})`); }
    // legacy per-line clips share the lesson key as prefix
    if (want === 402) { const s = (await fetch(`${BASE}/audio/${k}-s1-b1.mp3`)).status; if (s !== 402) wrong.push(`${k}-s1-b1: ${s}`); }
  }
  ok(wrong.length === 0, "every premium clip id answers 402 to a visitor, every free clip id does not", wrong.slice(0, 10));
  // with real rows stored
  const premKey = premKeys.find(k => TRACKS[k].segs.length) , freeKey = [...freeSet].find(k => TRACKS[k].segs.length);
  const premClip = TRACKS[premKey].segs[0].clip, freeClip = TRACKS[freeKey].segs[0].clip;
  const fake = Buffer.alloc(4000, 7);
  const had = (await sql("SELECT id FROM narration WHERE id = ANY($1)", [[premClip, freeClip]])).map(x => x.id);
  try {
    for (const id of [premClip, freeClip]) if (!had.includes(id)) await sql("INSERT INTO narration(id,mime,data) VALUES($1,'audio/mpeg',$2)", [id, fake]);
    const get = (c, id, h = {}) => fetch(`${BASE}/audio/${id}.mp3`, { headers: { ...(c ? { cookie: c.ck() } : {}), ...h } });
    let a = await get(null, premClip); let body = Buffer.from(await a.arrayBuffer());
    ok(a.status === 402 && body.length === 0 && /no-store/.test(a.headers.get("cache-control") || ""), "premium clip: visitor -> 402 with no audio, not cacheable", [a.status, body.length, a.headers.get("cache-control")]);
    a = await get(U, premClip); ok(a.status === 402, "premium clip: free student -> 402");
    a = await get(U, premClip, { Range: "bytes=0-99" }); ok(a.status === 402, "premium clip: a Range request does not get around the 402");
    a = await get(P, premClip); body = Buffer.from(await a.arrayBuffer());
    ok(a.status === 200 && body.length > 0 && /private/.test(a.headers.get("cache-control") || "") && !/public/.test(a.headers.get("cache-control") || ""), "premium clip: pro -> 200, Cache-Control private", [a.status, a.headers.get("cache-control")]);
    a = await get(P, premClip, { Range: "bytes=0-99" }); ok(a.status === 206 && (await a.arrayBuffer()).byteLength === 100, "premium clip: pro range request -> 206");
    a = await get(A, premClip); ok(a.status === 200, "premium clip: admin -> 200");
    a = await get(null, freeClip); ok(a.status === 200 && /public/.test(a.headers.get("cache-control") || ""), "free clip: visitor -> 200, public cache", [a.status, a.headers.get("cache-control")]);
    const idx = (await anon("GET", "/audio/index.json")).j; ok(Array.isArray(idx) && idx.includes(premClip) && idx.includes(freeClip), "/audio/index.json lists stored clip ids");
    a = await fetch(`${BASE}/audio/tracks.json`); const tj = await a.json(); ok(a.status === 200 && Object.keys(tj).length === 66, "/audio/tracks.json served");
  } finally {
    const ins = [premClip, freeClip].filter(id => !had.includes(id)); if (ins.length) await sql("DELETE FROM narration WHERE id = ANY($1)", [ins]);
  }
  ok((await fetch(`${BASE}/audio/..%2Fserver.mp3`)).status === 404 && (await fetch(`${BASE}/audio/${"a".repeat(65)}.mp3`)).status === 404, "odd clip ids -> 404");

  // ------------------------------------------------------------------
  section("robots.txt and sitemap.xml");
  r = await anon("GET", "/robots.txt");
  ok(r.s === 200 && /text\/plain/.test(r.h.get("content-type") || ""), "robots.txt is text/plain");
  const rb = r.t;
  for (const d of ["/admin", "/api/", "/auth/"]) ok(new RegExp(`^Disallow: ${d.replace(/\//g, "\\/")}$`, "m").test(rb), `robots disallows ${d}`);
  ok(!/^Disallow: \/\s*$/m.test(rb) && !/^Disallow: \/app/m.test(rb) && !/^Disallow: \/xp/m.test(rb), "robots does not block the site, the app or its scripts");
  const sm = /^Sitemap: (https:\/\/[^\s]+\/sitemap\.xml)$/m.exec(rb); ok(!!sm, "robots names an absolute https sitemap URL", rb);
  r = await anon("GET", "/sitemap.xml");
  ok(r.s === 200 && /xml/.test(r.h.get("content-type") || "") && r.t.startsWith('<?xml version="1.0" encoding="UTF-8"?>'), "sitemap.xml is XML");
  const locs = [...r.t.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  ok(locs.length >= 5 && new Set(locs).size === locs.length, "sitemap URLs are unique", locs);
  const origin = sm ? new URL(sm[1]).origin : "";
  ok(locs.every(u => u.startsWith(origin + "/")), "every sitemap URL is on the robots origin", origin);
  ok((r.t.match(/<url>/g) || []).length === locs.length && (r.t.match(/<\/url>/g) || []).length === locs.length && /<\/urlset>\s*$/.test(r.t), "sitemap is well formed");
  ok(!/&(?!amp;|lt;|gt;|quot;|apos;)/.test(r.t), "no unescaped & in the sitemap");
  const alts = [...r.t.matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)].map(m => [m[1], m[2]]);
  ok(alts.every(([, h]) => locs.includes(h)), "every hreflang alternate is itself listed", alts);
  for (const u of locs) {
    const res = await fetch(BASE + u.slice(origin.length), { redirect: "manual" }); // no session cookie: "/" is the landing page
    const html = await res.text();
    const canon = /<link rel="canonical" href="([^"]+)"/.exec(html);
    ok(res.status === 200 && !/<meta name="robots" content="[^"]*noindex/.test(html) && !/noindex/.test(res.headers.get("x-robots-tag") || ""), `${u.slice(origin.length)}: 200 and indexable`, res.status);
    ok(canon && canon[1] === u, `${u.slice(origin.length)}: canonical is the sitemap URL`, canon && canon[1]);
  }
  ok(!locs.some(u => /admin|\/api\/|404/.test(u)), "sitemap lists no admin, API or error page");
  r = await fetch(BASE + "/admin.html"); ok(/noindex/.test(r.headers.get("x-robots-tag") || ""), "admin page sends X-Robots-Tag noindex");

  // ------------------------------------------------------------------
  section("startup on a fresh empty database");
  const fresh = "fresh_" + runId.replace(/\W/g, "");
  const freshUrl = DB.replace(/\/[^/?]+(\?|$)/, "/" + fresh + "$1");
  await sql(`CREATE DATABASE ${fresh}`);
  const start = async extra => {
    const port = await freePort(), log = [];
    const env = { ...process.env, PORT: String(port), DATABASE_URL: freshUrl, ADMIN_EMAILS: "owner@fresh.test", PUBLIC_URL: `http://127.0.0.1:${port}`, NODE_ENV: "test", ...extra };
    for (const k of ["CANONICAL_HOST", "REDIRECT_HOSTS", "TAP_SECRET_KEY", "MOYASAR_SECRET_KEY", "GOOGLE_CLIENT_ID", "FACEBOOK_APP_ID"]) delete env[k];
    const p = spawn(process.execPath, [path.join(ROOT, "server.js")], { cwd: ROOT, env, stdio: ["ignore", "pipe", "pipe"] });
    p.stdout.on("data", d => log.push(d.toString())); p.stderr.on("data", d => log.push(d.toString()));
    const exited = new Promise(res => p.on("exit", code => res(code)));
    const base = `http://127.0.0.1:${port}`;
    let up = false; const t0 = Date.now();
    while (Date.now() - t0 < 20000) { try { if ((await fetch(base + "/healthz")).ok) { up = true; break; } } catch (e) {} if (p.exitCode !== null) break; await sleep(150); }
    return { p, base, up, log, exited, stop: async () => { if (p.exitCode === null) { p.kill("SIGTERM"); } return exited; } };
  };
  try {
    let s = await start();
    ok(s.up, "server starts on an empty database", s.log.join(""));
    if (s.up) {
      const f = (m, u, b) => fetch(s.base + u, { method: m, headers: { "Content-Type": "application/json", "X-Masar": "1" }, body: b ? JSON.stringify(b) : undefined });
      let x = await f("GET", "/api/config"); ok(x.status === 200, "fresh DB: /api/config uses the defaults");
      x = await f("POST", "/api/signup", { email: "kid@fresh.test", password: "secretpass9", name: "Fresh Kid", consent: true }); ok(x.status === 200, "fresh DB: sign up works", x.status);
      x = await f("POST", "/api/login", { email: "kid@fresh.test", password: "wrong-password-77" }); ok(x.status === 401, "fresh DB: wrong password -> 401");
      x = await f("POST", "/api/login", "{oops");
      x = await fetch(s.base + "/api/login", { method: "POST", headers: { "Content-Type": "application/json", "X-Masar": "1" }, body: "{oops" }); ok(x.status === 400, "fresh DB: bad JSON -> 400");
      x = await fetch(s.base + "/xp/free.js"); ok(x.status === 200 && lessonsIn(await x.text()).length === 16, "fresh DB: free explainers served");
    }
    const code = await s.stop();
    ok(code === 0, "graceful shutdown exits 0", code);
    const out = s.log.join("");
    ok(/WARNING: ADMIN_EMAILS lists owner@fresh\.test/.test(out), "an unclaimed admin address is warned about at start");
    ok(!/kid@fresh\.test|secretpass9|wrong-password-77/.test(out), "the log never contains a student's email or password", out);
    ok(!/\bat .+\.js:\d+/.test(out) && !/error/i.test(out.replace(/WARNING: ADMIN_EMAILS[^\n]*/g, "")), "no stack trace or error line in a normal run", out);
    // second start on the now-populated DB: migrations are idempotent
    s = await start(); ok(s.up, "second start on the same database (idempotent migrations)", s.log.join("")); await s.stop();
    // a column dropped by hand: refuse to start and name it
    const { Client } = require("pg"); const fc = new Client({ connectionString: freshUrl }); await fc.connect();
    const nt = (await fc.query("SELECT count(*)::int n FROM information_schema.tables WHERE table_schema='public'")).rows[0].n;
    ok(nt >= 10, "fresh DB has every table after migrations", nt);
    await fc.query("ALTER TABLE coupons DROP COLUMN note"); await fc.end();
    s = await start(); const code2 = await s.exited;
    ok(!s.up && code2 === 1 && /schema check failed: missing coupons\.note/.test(s.log.join("")), "a dropped column stops the start with a message naming it", [s.up, code2, s.log.join("").slice(0, 300)]);
  } finally {
    await sleep(300);
    await sql(`SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname=$1 AND pid<>pg_backend_pid()`, [fresh]).catch(() => {});
    await sql(`DROP DATABASE IF EXISTS ${fresh}`).catch(e => console.log("  (could not drop " + fresh + ": " + e.message + ")"));
  }
});
