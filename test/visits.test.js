// Anonymous visit statistics: the beacon endpoint, its limits, and the admin view built from it.
"use strict";
const { client, sql, ok, section, run, uid, BASE } = require("./lib");
const UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) Safari/604.1";
const ip = () => `10.252.${Math.floor(Math.random() * 250)}.${1 + Math.floor(Math.random() * 250)}`;
const beacon = (body, h = {}) => fetch(BASE + "/api/v", { method: "POST", headers: { "Content-Type": "application/json", "User-Agent": UA, "X-Forwarded-For": ip(), ...h }, body: JSON.stringify(body) });
const sid = () => ("t" + uid() + "x0000000").replace(/[^a-z0-9]/g, "").slice(0, 16);
const rows = s => sql("SELECT n, kind, path, ref, src, dev, lang, dur, depth, sec FROM visits WHERE sid=$1 ORDER BY n", [s]);

run(async () => {
  const join = async (email, password = "password123") => { const c = client(), h = { "X-Forwarded-For": ip() }; let r = await c("POST", "/api/signup", { email, password, name: "Visit Tester", phone: "0512345678", consent: true }, h); if (r.s === 409) r = await c("POST", "/api/login", { email, password }, h); if (r.s !== 200) throw new Error("login " + r.s); return c; };
  const A = await join(process.env.ADMIN_EMAIL || "admin@test.com", process.env.ADMIN_PASSWORD || "adminpass1");
  const before = (await A("GET", "/api/admin/visits?days=7")).j;

  section("recording a visit");
  const s1 = sid();
  let r = await beacon({ s: s1, n: 1, k: "p", p: "/", r: "www.Google.com", u: "TikTok", d: "m", l: "ar" });
  ok(r.status === 204, "page view accepted", r.status);
  r = await beacon({ s: s1, n: 1, t: 42, y: 63, x: "skills" }); ok(r.status === 204, "time, depth and section update accepted");
  r = await beacon({ s: s1, n: 1, t: 10, y: 20, x: "demo" }); // a late, smaller update never lowers the numbers
  await beacon({ s: s1, n: 2, k: "p", p: "/app#today", d: "m", l: "ar" });
  await beacon({ s: s1, n: 3, k: "s", p: "step:test_start" });
  await beacon({ s: s1, n: 4, k: "p", p: "/app#exam-diag", d: "m", l: "ar" });
  await beacon({ s: s1, n: 5, k: "s", p: "step:test_done" });
  await beacon({ s: s1, n: 6, k: "s", p: "step:signup" });
  await beacon({ s: s1, n: 6, k: "p", p: "/" }); // the same number again is ignored
  let v = await rows(s1);
  ok(v.length === 6 && v[0].path === "/" && v[0].ref === "www.google.com" && v[0].src === "tiktok" && v[0].dev === "m" && v[0].lang === "ar", "stored as sent, lower-cased", v[0]);
  ok(v[0].dur === 42 && v[0].depth === 63 && v[0].sec === "demo", "time and depth only grow; the section is the latest reported", v[0]);
  ok(v.filter(x => x.kind === "s").map(x => x.path).join() === "step:test_start,step:test_done,step:signup", "journey steps kept apart from pages");
  // the landing reports sections in page order, so the latest is the furthest; keep that contract visible here
  await beacon({ s: s1, n: 1, t: 50, y: 70, x: "pricing" }); v = await rows(s1); ok(v[0].sec === "pricing" && v[0].dur === 50, "a further section replaces it");

  section("what is refused");
  for (const [b, why] of [[{ s: "short", n: 1, k: "p", p: "/" }, "bad visit id"], [{ s: sid(), n: 0, k: "p", p: "/" }, "bad number"], [{ s: sid(), n: 1, k: "p", p: "https://evil.example/" }, "a full URL"],
    [{ s: sid(), n: 1, k: "p", p: "/app#Today" }, "an unknown page shape"], [{ s: sid(), n: 1, k: "s", p: "/" }, "a step that is not step:*"], [{ s: sid(), n: 1, k: "p", p: "step:signup" }, "a page that is a step"]]) {
    r = await beacon(b); ok(r.status === 400, "rejected: " + why, r.status);
  }
  const s2 = sid();
  r = await beacon({ s: s2, n: 1, k: "p", p: "/" }, { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1)" });
  ok(r.status === 204 && (await rows(s2)).length === 0, "crawlers are not counted");
  r = await fetch(BASE + "/api/v", { method: "POST", headers: { "Content-Type": "application/json", "User-Agent": UA }, body: JSON.stringify({ s: sid(), n: 1, k: "p", p: "/terms" }) });
  ok(r.status === 204, "no X-Masar header needed (navigator.sendBeacon cannot set one)", r.status);
  r = await fetch(BASE + "/api/v", { method: "GET" }); ok(r.status === 404 || r.status === 405, "only POST", r.status);
  const s3 = sid(); await beacon({ s: s3, n: 1, k: "p", p: "/", r: "x".repeat(500) + "<script>" });
  v = await rows(s3); ok(v[0].ref.length <= 80 && !/[<>]/.test(v[0].ref), "free text is trimmed and stripped", v[0].ref.length);

  section("admin view");
  r = await client()("GET", "/api/admin/visits"); ok(r.s === 401, "needs an admin");
  // a second visit that read the landing page only, then a bounce
  const s4 = sid(); await beacon({ s: s4, n: 1, k: "p", p: "/", r: "t.co", d: "d", l: "en" }); await beacon({ s: s4, n: 1, t: 30, y: 15, x: "how" });
  const s5 = sid(); await beacon({ s: s5, n: 1, k: "p", p: "/privacy", d: "d", l: "ar" });
  const g = (await A("GET", "/api/admin/visits?days=7")).j, d = (k, o = before) => g.totals[k] - o.totals[k];
  ok(d("views") === 7, "page views (steps are not pages)", d("views"));
  ok(d("sessions") === 5, "five new visits (the crawler is not one)", d("sessions"));
  ok(d("bounces") >= 2, "single quick pages count as bounces", d("bounces"));
  const st = k => g.steps[k] - before.steps[k];
  ok(st("landing") === 3 && st("app") === 1 && st("test_start") === 1 && st("test_done") === 1 && st("signup") === 1, "journey counts visits per step", g.steps);
  const page = p => g.pages.find(x => x.path === p) || {}, pb = p => before.pages.find(x => x.path === p) || { views: 0, exits: 0, entries: 0 };
  ok(page("/").views - pb("/").views === 3 && page("/").entries - pb("/").entries === 3, "home page views and entries", page("/"));
  ok(page("/app#exam-diag").exits - pb("/app#exam-diag").exits === 1 && page("/").exits - pb("/").exits === 2, "exit = last page of a visit", [page("/app#exam-diag"), page("/")]);
  const secs = new Map(g.sections.map(x => [x.sec, x.n])), sb = new Map(before.sections.map(x => [x.sec, x.n]));
  ok((secs.get("pricing") || 0) - (sb.get("pricing") || 0) === 1 && (secs.get("how") || 0) - (sb.get("how") || 0) === 1, "furthest landing section per view", g.sections);
  ok(g.series.length >= 1 && g.series[g.series.length - 1].d === g.today, "daily series ends today", g.series.slice(-1));
  ok(g.sources.some(x => x.s === "tiktok") && g.sources.some(x => x.s === "t.co"), "sources: link source first, else referring site", g.sources);
  ok(g.devices.some(x => x.dev === "m") && g.devices.some(x => x.dev === "d"), "devices", g.devices);
});
