// Size budget and one-language builds: /app serves app-ar.js or app-en.js (langsplit.js), each well under the full file,
// and every build stays inside its compressed-size budget. A content addition that blows the budget fails here first.
"use strict";
const { BASE, ok, section, run } = require("./lib");
const BUDGET = { split: 280 * 1024, full: 380 * 1024 }; // brotli bytes

run(async () => {
  const get = async (url, hdr = {}) => { const r = await fetch(BASE + url, { headers: { "Accept-Encoding": "br", ...hdr } }); const b = Buffer.from(await r.arrayBuffer()); return { s: r.status, h: r.headers, n: b.length, t: b.toString("utf8") }; };
  section("the page picks a build");
  let r = await get("/app"); const ar = /<script src="(\/app-ar\.js\?v=\w+)"/.exec(r.t); ok(ar, "Arabic build by default");
  r = await get("/app", { cookie: "gat_lang=en" }); const en = /<script src="(\/app-en\.js\?v=\w+)"/.exec(r.t); ok(en, "English build from the cookie");
  r = await get("/app?lang=en"); ok(/app-en\.js/.test(r.t), "English build from ?lang=en");
  r = await get("/app", { cookie: "gat_lang=en; gat_full=1" }); const full = /<script src="(\/app\.js\?v=\w+)"/.exec(r.t); ok(full, "full build when asked");
  section("sizes");
  // fetch() decodes brotli, so ask for the raw length through Content-Length of a compressed response
  const sz = async u => { const x = await fetch(BASE + u, { headers: { "Accept-Encoding": "br" } }); const cl = +x.headers.get("content-length"); await x.arrayBuffer(); return { cl, enc: x.headers.get("content-encoding"), cache: x.headers.get("cache-control") }; };
  const a = await sz(ar[1]), e = await sz(en[1]), f = await sz(full[1]);
  ok(a.enc === "br" && /immutable/.test(a.cache), "versioned build cached for a year, brotli", a);
  ok(a.cl > 50e3 && a.cl < BUDGET.split, `Arabic build within budget (${Math.round(a.cl / 1024)} KB)`);
  ok(e.cl > 50e3 && e.cl < BUDGET.split, `English build within budget (${Math.round(e.cl / 1024)} KB)`);
  ok(f.cl < BUDGET.full, `full file within budget (${Math.round(f.cl / 1024)} KB)`);
  ok(a.cl < f.cl * 0.85 && e.cl < f.cl * 0.85, "each build at least 15% smaller than the full file", [a.cl, e.cl, f.cl]);
  r = await get("/app-ar.js"); ok(r.s === 200 && /^var __BL="ar";/.test(r.t), "unversioned URL still served, marked with its language");
});
