// The free student guide: the download is counted (not for crawlers), and the admin sees what downloaders did next.
"use strict";
const { client, sql, ok, section, run, uid, BASE } = require("./lib");
const ip = () => ({ "X-Forwarded-For": `10.251.${Math.floor(Math.random() * 250)}.${1 + Math.floor(Math.random() * 250)}` });
// sign up from its own address: the hourly sign-up limit per address is shared by every suite
const join = async (email, password = "password123") => {
  const c = client(), h = ip(); let r = await c("POST", "/api/signup", { email, password, name: "Guide Reader", phone: "0512345678", consent: true }, h);
  if (r.s === 409) r = await c("POST", "/api/login", { email, password }, h);
  if (r.s !== 200) throw new Error("signup " + email + " -> " + r.s); return c;
};
const count = async k => +(await sql("SELECT count(*)::int n FROM guide_hits WHERE kind=$1", [k]))[0].n;

run(async () => {
  const A = await join(process.env.ADMIN_EMAIL || "admin@test.com", process.env.ADMIN_PASSWORD || "adminpass1");
  section("download");
  let n0 = await count("dl");
  let r = await fetch(BASE + "/dl/guide", { headers: { "User-Agent": "Mozilla/5.0 (iPhone) Safari", ...ip() } }); const buf = Buffer.from(await r.arrayBuffer());
  ok(r.status === 200 && r.headers.get("content-type") === "application/pdf" && buf.slice(0, 5).toString() === "%PDF-" && buf.length > 100000, "serves the PDF", [r.status, r.headers.get("content-type"), buf.length]);
  ok(/^attachment; filename="GAT-Academy-Guide\.pdf"; filename\*=UTF-8''%D8/.test(r.headers.get("content-disposition") || ""), "as a named attachment", r.headers.get("content-disposition"));
  ok(r.headers.get("cache-control") === "no-store" && r.headers.get("accept-ranges") !== "bytes", "never cached, sent whole", [r.headers.get("cache-control"), r.headers.get("accept-ranges")]);
  ok(await count("dl") === n0 + 1, "one request, one download counted");
  r = await fetch(BASE + "/dl/guide", { headers: { "User-Agent": "Mozilla/5.0 (iPhone) Safari", Range: "bytes=0-99", ...ip() } }); const part = Buffer.from(await r.arrayBuffer());
  ok(r.status === 200 && part.length === buf.length, "a range request still gets the whole file", [r.status, part.length]);
  n0 = await count("dl");
  for (const ua of ["Googlebot/2.1 (+http://www.google.com/bot.html)", "WhatsApp/2.23", "facebookexternalhit/1.1", "Twitterbot/1.0"]) await (await fetch(BASE + "/dl/guide", { headers: { "User-Agent": ua, ...ip() } })).arrayBuffer();
  ok(await count("dl") === n0, "crawlers and link previews are not counted");
  r = await fetch(BASE + "/guide.pdf"); ok(r.status === 404, "the file has no uncounted public address", r.status);

  section("anonymous hits");
  const h = ip(), t0 = await count("test"), v0 = await count("visit");
  r = await client()("POST", "/api/guide/hit", { kind: "test" }, h); ok(r.s === 200 && r.j.ok, "test hit", r.j);
  r = await client()("POST", "/api/guide/hit", { kind: "visit" }, h); ok(r.s === 200, "visit hit");
  r = await client()("POST", "/api/guide/hit", { kind: "dl" }, h); ok(r.s === 400, "downloads cannot be reported by a client", r.s);
  r = await client()("POST", "/api/guide/hit", { kind: "nope" }, h); ok(r.s === 400, "unknown kind rejected");
  ok(await count("test") === t0 + 1 && await count("visit") === v0 + 1, "both stored");

  section("admin view");
  r = await client()("GET", "/api/admin/guide"); ok(r.s === 401, "needs an admin");
  const before = (await A("GET", "/api/admin/guide")).j;
  // a student who downloaded first and signed up afterwards, then took the diagnostic
  const fresh = await join(`gd-new-${uid()}@test.local`); const dlTs = Date.now() - 3600e3;
  r = await fresh("POST", "/api/events", { events: [{ type: "guide_dl", v: dlTs }, { type: "diag_done", v: 60 }] }); ok(r.s === 200, "guide_dl event accepted", r.j);
  // an existing student who downloaded it later is not a conversion
  const old = await join(`gd-old-${uid()}@test.local`); await old("POST", "/api/events", { events: [{ type: "guide_dl", v: Date.now() + 3600e3 }] });
  const g = (await A("GET", "/api/admin/guide")).j;
  ok(g.downloads.total === await count("dl") && g.downloads.today >= 2 && g.series.length === 14 && g.series[13].n >= 2, "download totals and a 14-day series", [g.downloads, g.series.slice(-2)]);
  ok(g.tested.total === before.tested.total + 0 && g.tested.total >= 1 && g.visits.total >= 1, "test and visit counters", [g.tested, g.visits]);
  ok(g.signed_up === before.signed_up + 1 && g.students === before.students + 2, "only the sign-up after the download counts as a conversion", [before.signed_up, g.signed_up, g.students]);
  ok(g.signed_tested === before.signed_tested + 1 && g.paid === before.paid, "tested among them, none paid", [g.signed_tested, g.paid]);
  ok(g.recent.length >= 1 && /^gd-new-/.test(g.recent[0].email) && g.recent[0].tested === true && !g.recent.some(u => /^gd-old-/.test(u.email)), "latest sign-ups list", g.recent.slice(0, 2));
});
