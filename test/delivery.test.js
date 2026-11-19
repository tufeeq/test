// How the site is delivered: compression, cache headers, versioned asset URLs (scripts, styles, the self-hosted fonts and
// the free explainer bundle), no third-party font hosts, the cheap progress ETag, and the batched usage events.
"use strict";
const zlib = require("zlib");
const { client, admin, sql, ok, section, run, uid, BASE } = require("./lib");
// this suite's accounts are created from their own (forwarded) address, so they do not use up the per-IP sign-up
// allowance the other suites share; the admin signs in (api.test.js has created the account) without a sign-up attempt
const FWD = { "X-Forwarded-For": `10.251.${Math.floor(Math.random() * 250)}.${1 + Math.floor(Math.random() * 250)}` };
async function signup(email) {
  const c = client(); const r = await c("POST", "/api/signup", { email, password: "password123", name: "Delivery Test", phone: "0512345678", consent: true }, FWD);
  if (r.s !== 200) throw new Error("signup -> " + r.s + " " + JSON.stringify(r.j));
  c.user = r.j.user; return c;
}
async function adminClient() {
  const c = client(); const r = await c("POST", "/api/login", { email: process.env.ADMIN_EMAIL || "admin@test.com", password: process.env.ADMIN_PASSWORD || "adminpass1" });
  return r.s === 200 ? c : admin();
}

// fetch without the JSON client: explicit Accept-Encoding, raw bytes back
async function get(path, headers = {}, method = "GET") {
  const r = await fetch(BASE + path, { method, redirect: "manual", headers: { "Accept-Encoding": "identity", ...headers } });
  const buf = Buffer.from(await r.arrayBuffer());
  return { s: r.status, h: r.headers, buf, cc: r.headers.get("cache-control") || "", enc: r.headers.get("content-encoding") || "", etag: r.headers.get("etag") || "" };
}
// node's fetch decodes br/gzip itself, so compressed sizes are read with node:http
const http = require("http");
function rawGet(path, enc, headers = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(BASE);
    http.get({ host: u.hostname, port: u.port, path, headers: { "Accept-Encoding": enc, ...headers } }, res => {
      const ch = []; res.on("data", d => ch.push(d)); res.on("end", () => resolve({ s: res.statusCode, h: res.headers, buf: Buffer.concat(ch) }));
    }).on("error", reject);
  });
}
const IMMUTABLE = /public, max-age=31536000, immutable/;

run(async () => {
  section("compression of text responses");
  const plain = await get("/app.js");
  for (const [path, type] of [["/app.js", /javascript/], ["/app.css", /text\/css/], ["/", /text\/html/], ["/app", /text\/html/], ["/audio/tracks.json", /json/], ["/xp/free.js", /javascript/], ["/fonts.css", /text\/css/]]) {
    const id = await rawGet(path, "identity"), br = await rawGet(path, "br"), gz = await rawGet(path, "gzip, deflate");
    ok(id.s === 200 && !id.h["content-encoding"] && type.test(id.h["content-type"] || ""), `${path}: identity is uncompressed with the right type`, [id.s, id.h["content-type"], id.h["content-encoding"]]);
    ok(br.h["content-encoding"] === "br" && br.buf.length < id.buf.length * 0.6 && zlib.brotliDecompressSync(br.buf).equals(id.buf), `${path}: brotli is smaller and decodes to the same bytes`, [br.h["content-encoding"], br.buf.length, id.buf.length]);
    ok(gz.h["content-encoding"] === "gzip" && gz.buf.length < id.buf.length * 0.7 && zlib.gunzipSync(gz.buf).equals(id.buf), `${path}: gzip is smaller and decodes to the same bytes`, [gz.h["content-encoding"], gz.buf.length, id.buf.length]);
    ok(/accept-encoding/i.test(br.h.vary || ""), `${path}: Vary: Accept-Encoding`, br.h.vary);
  }
  ok(plain.buf.length > 100000, "app.js is served whole", plain.buf.length);
  { const png = await rawGet("/icon-192.png", "br"), woff = await rawGet("/fonts/almarai-arabic-400-normal.woff2", "br");
    ok(!png.h["content-encoding"] && !woff.h["content-encoding"], "already-compressed formats (png, woff2) are not compressed again", [png.h["content-encoding"], woff.h["content-encoding"]]); }

  section("HTML always revalidates; versioned assets are immutable");
  const pages = {};
  for (const p of ["/", "/?lang=en", "/app", "/privacy", "/terms", "/admin.html", "/404"]) {
    const r = await get(p); pages[p] = r.buf.toString("utf8");
    ok(r.cc === "no-cache" && /^W\//.test(r.etag), `${p}: Cache-Control no-cache with an ETag`, [r.cc, r.etag]);
    // (conditional requests go through node:http: fetch() adds Cache-Control: no-cache to them, which forbids a 304)
    if (p !== "/404") { const again = await rawGet(p, "identity", { "If-None-Match": r.etag }); ok(again.s === 304 && again.buf.length === 0, `${p}: 304 when the ETag matches`, again.s); }
  }
  const refs = html => [...html.matchAll(/\s(?:src|href)="(\/?[\w./-]+\.(?:js|css|svg|png|webmanifest)(?:\?v=([0-9a-f]+))?)"/g)].map(m => ({ url: m[1].startsWith("/") ? m[1] : "/" + m[1], v: m[2] }));
  const seen = new Set();
  for (const p of ["/", "/app", "/privacy", "/admin.html"]) for (const a of refs(pages[p])) {
    if (seen.has(a.url) || /site\.webmanifest/.test(a.url)) continue; seen.add(a.url);
    if (!ok(!!a.v, `${p}: ${a.url.split("?")[0]} is linked with a version`, a.url)) continue;
    const r = await get(a.url);
    ok(r.s === 200 && IMMUTABLE.test(r.cc), `${a.url.split("?")[0]}?v=<current> is cached for a year (immutable)`, [r.s, r.cc]);
    const stale = await get(a.url.replace(/\?v=.*/, "?v=0000000000")), bare = await get(a.url.replace(/\?v=.*/, ""));
    ok(!/immutable|max-age=31536000/.test(stale.cc) && !/immutable|max-age=31536000/.test(bare.cc), `${a.url.split("?")[0]}: an old or missing version is never cached for long`, [stale.cc, bare.cc]);
    ok(stale.buf.equals(r.buf), `${a.url.split("?")[0]}: an old version still gets the current file`);
  }
  ok(seen.size >= 10, "checked the assets of the landing page, the app, a legal page and the admin", seen.size);

  section("web fonts are served by the site itself");
  for (const p of ["/", "/?lang=en", "/app", "/privacy", "/terms", "/admin.html"]) {
    ok(!/fonts\.googleapis\.com|fonts\.gstatic\.com/.test(pages[p]), `${p}: no request to a third-party font host`);
    ok(/href="\/fonts\.css\?v=[0-9a-f]{10}"/.test(pages[p]), `${p}: links the versioned /fonts.css`);
  }
  ok(pages["/app"].indexOf('href="/fonts.css?v=') > pages["/app"].indexOf('<script src="/app.js?v=') && !/fonts\.css/.test(pages["/app"].split("</head>")[0]),
    "the app declares its fonts after app.js, so a first visit downloads the font files after the app's script, not alongside it");
  const fontsUrl = /href="(\/fonts\.css\?v=[0-9a-f]{10})"/.exec(pages["/app"])[1];
  const fcss = (await get(fontsUrl)).buf.toString("utf8");
  const faces = [...fcss.matchAll(/@font-face\s*\{[^}]*\}/g)].map(m => m[0]);
  const urls = [...fcss.matchAll(/url\(([^)]+)\)/g)].map(m => m[1]).filter(u => u);
  ok(faces.length >= 30 && faces.every(f => /font-display:\s*swap/.test(f) && /unicode-range:/.test(f)), "every face keeps font-display: swap and its unicode-range", faces.length);
  ok(urls.length === faces.length && urls.every(u => /^\/fonts\/[\w.-]+\.woff2\?v=[0-9a-f]{10}$/.test(u)), "every font url() is first-party and versioned", urls.filter(u => !/^\/fonts\/[\w.-]+\.woff2\?v=[0-9a-f]{10}$/.test(u)).slice(0, 3));
  const want = { "Almarai": [400, 700, 800], "Aref Ruqaa": [400, 700], "Baloo Bhaijaan 2": [500, 600, 700, 800], "Caveat": [600], "IBM Plex Mono": [500, 600] };
  for (const fam of Object.keys(want)) {
    const ws = [...new Set(faces.filter(f => f.includes(`font-family: '${fam}'`)).map(f => +/font-weight:\s*(\d+)/.exec(f)[1]))].sort((a, b) => a - b);
    ok(JSON.stringify(ws) === JSON.stringify(want[fam]), `${fam}: exactly the weights the pages used before (${want[fam].join(", ")})`, ws);
  }
  { let bad = 0, n = 0; for (const u of [...new Set(urls)]) { const r = await get(u); n++; if (r.s !== 200 || !IMMUTABLE.test(r.cc) || r.h.get("content-type") !== "font/woff2" || r.buf.subarray(0, 4).toString("latin1") !== "wOF2") bad++; }
    ok(n >= 25 && bad === 0, `all ${n} font files: 200, font/woff2, immutable`, bad);
    const bare = await get(urls[0].replace(/\?v=.*/, "")); ok(bare.s === 200 && !/immutable/.test(bare.cc), "a font requested without its version is not cached for long", bare.cc); }
  ok((pages["/"].match(/@font-face\{font-family:'Caveat';font-style:normal;font-weight:700;[^}]*url\(\/fonts\/caveat-[\w-]+\.woff2\?v=[0-9a-f]{10}\)/g) || []).length === 4, "landing page declares its own Caveat 700 faces with versioned urls");
  ok(!/Caveat';font-style:normal;font-weight:700/.test(pages["/app"] + pages["/privacy"]), "Caveat 700 stays a landing-only face (the app and legal pages never had it)");
  { const r = await get("/app"); const csp = r.h.get("content-security-policy") || "";
    ok(/default-src 'self'/.test(csp) && /script-src 'self'(;|$)/.test(csp) && /frame-ancestors 'none'/.test(csp) && r.h.get("x-content-type-options") === "nosniff", "security headers unchanged on pages", csp);
    const f = await get(urls[0]); ok(f.h.get("x-content-type-options") === "nosniff" && /default-src 'self'/.test(f.h.get("content-security-policy") || ""), "security headers also on font files"); }

  section("free explainer bundle: versioned in the pages, immutable only for the current version");
  const xpUrl = html => (/<script (?:type="text\/plain" data-later )?src="(\/xp\/free\.js(?:\?v=[0-9a-f]{10})?)">/.exec(html) || [])[1];
  const A = await adminClient();
  const u0 = xpUrl(pages["/app"]);
  ok(/\?v=[0-9a-f]{10}$/.test(u0 || ""), "the app links /xp/free.js with a version", u0);
  ok(xpUrl(pages["/"]) === u0 && xpUrl(pages["/?lang=en"]) === u0, "the landing page (both languages) links the same version", [xpUrl(pages["/"]), u0]);
  let r = await get(u0); const body0 = r.buf;
  ok(r.s === 200 && IMMUTABLE.test(r.cc), "current version: immutable", r.cc);
  r = await get("/xp/free.js"); ok(r.cc === "no-cache" && r.buf.equals(body0), "no version: no-cache, same bundle", r.cc);
  r = await get("/xp/free.js?v=0000000000"); ok(r.cc === "no-cache" && r.buf.equals(body0), "wrong version: no-cache, current bundle", r.cc);
  r = await get("/xp/free.js?v=" + u0.split("=")[1] + "&v=x"); ok(r.cc === "no-cache", "a repeated v parameter is not treated as current", r.cc);
  const st = (await A("GET", "/api/admin/settings")).j.config, all = (await A("GET", "/api/admin/settings")).j.xpKeys;
  const moved = all.find(k => !st.free.xp.includes(k));
  if (ok(!!moved, "there is a premium explainer to move")) {
    try {
      r = await A("PUT", "/api/admin/settings", { config: { free: { ...st.free, xp: [...st.free.xp, moved] } } });
      ok(r.s === 200, "admin adds an explainer to the free list", r.j);
      const u1 = xpUrl((await get("/app")).buf.toString("utf8"));
      ok(u1 && u1 !== u0, "the next page load links a new version at once", [u0, u1]);
      ok(xpUrl((await get("/")).buf.toString("utf8")) === u1, "so does the landing page");
      const fresh = await get(u1); ok(IMMUTABLE.test(fresh.cc) && !fresh.buf.equals(body0) && fresh.buf.includes(moved), "new version: immutable and contains the added explainer", fresh.cc);
      const old = await get(u0); ok(old.cc === "no-cache" && old.buf.equals(fresh.buf), "the old URL now revalidates and gets the new bundle (an open tab cannot pin stale content)", old.cc);
    } finally { r = await A("PUT", "/api/admin/settings", { config: { free: st.free } }); ok(r.s === 200, "free list restored"); }
    ok(xpUrl((await get("/app")).buf.toString("utf8")) === u0, "restoring the list restores the first version");
  }
  r = await get("/api/xp/premium.js"); ok(r.s === 401 && !/public|immutable/.test(r.cc), "premium bundle is still never public", [r.s, r.cc]);

  section("landing page warms the app's scripts");
  { const tpl = (/<template id="lp-app-pre">([\s\S]*?)<\/template>/.exec(pages["/"]) || [])[1] || "";
    const pre = [...tpl.matchAll(/<link rel="prefetch" href="([^"]+)">/g)].map(m => m[1]);
    const appRefs = refs(pages["/app"]).map(a => a.url);
    ok(pre.length === 2 && pre.every(u => appRefs.includes(u)), "prefetch hints are exactly the URLs the app page loads (same version, so the cache is hit)", [pre, appRefs]);
    ok(!/rel="prefetch"/.test(pages["/"].replace(/<template[\s\S]*?<\/template>/g, "")), "the hints are inert until landing.js adds them (nothing competes with the first paint)"); }

  section("personal responses are never cacheable");
  const U = await signup(`dl${uid()}@test.com`);
  for (const p of ["/api/me", "/api/progress", "/api/plan", "/api/config", "/api/xp/keys"]) { r = await U("GET", p); ok(r.s === 200 && r.h.get("cache-control") === "no-store", `${p}: no-store`, [r.s, r.h.get("cache-control")]); }
  r = await fetch(BASE + "/", { redirect: "manual", headers: { cookie: U.ck() } }); ok(r.status === 302 && !/immutable|max-age=[1-9]/.test(r.headers.get("cache-control") || ""), "signed-in redirect from / is not cacheable", r.headers.get("cache-control"));

  section("progress ETag: the row's write time, the same from GET, HEAD and PUT");
  const head = async () => { const x = await fetch(BASE + "/api/progress", { method: "HEAD", headers: { "X-Masar": "1", cookie: U.ck() } }); return { s: x.status, etag: x.headers.get("etag"), len: (await x.arrayBuffer()).byteLength, cc: x.headers.get("cache-control") }; };
  let h = await head(); r = await U("GET", "/api/progress");
  ok(h.s === 200 && h.len === 0 && h.cc === "no-store" && h.etag === 'W/"p0"' && r.h.get("etag") === h.etag && r.j.p === null, "no saved copy yet: HEAD and GET agree", [h, r.h.get("etag")]);
  const big = JSON.stringify({ lang: "ar", pad: "x".repeat(5000) });
  r = await U("PUT", "/api/progress", { p: big }); const t1 = r.h.get("etag");
  ok(r.s === 200 && /^W\/"p[0-9a-z]+"$/.test(t1) && t1 !== 'W/"p0"', "a save answers with the new ETag", t1);
  h = await head(); ok(h.etag === t1 && h.len === 0, "HEAD after the save: the same ETag, no body", h);
  r = await U("GET", "/api/progress"); ok(r.h.get("etag") === t1 && r.j.p === big, "GET: the same ETag and the saved copy", r.h.get("etag"));
  { const z = await rawGet("/api/progress", "br"), c = await rawGet("/api/progress", "br", { cookie: U.ck() });
    ok(z.s === 401, "anonymous GET is refused", z.s);
    ok(c.h["content-encoding"] === "br" && c.h.etag === t1 && JSON.parse(zlib.brotliDecompressSync(c.buf).toString("utf8")).p === big, "compressed GET carries the same ETag", [c.h["content-encoding"], c.h.etag]); }
  r = await U("PUT", "/api/progress", { p: big }); const t2 = r.h.get("etag");
  ok(t2 !== t1, "saving again (even the same content) changes the ETag, as any save did before", [t1, t2]);
  h = await head(); ok(h.etag === t2, "HEAD follows", h.etag);
  r = await U("PUT", "/api/progress", { p: big, base: "2001-01-01T00:00:00.000Z" });
  ok(r.s === 409 && (await head()).etag === t2, "a refused (conflicting) save leaves the ETag alone", r.s);
  const V = await signup(`dl${uid()}@test.com`);
  r = await V("PUT", "/api/progress", { p: "{}" }); ok(r.h.get("etag") !== t2, "another student's copy has its own ETag");
  r = await fetch(BASE + "/api/progress", { method: "HEAD", headers: { "X-Masar": "1" } }); ok(r.status === 401, "HEAD without a session: 401", r.status);

  section("usage events: one statement per batch, same rows as before");
  const me = (await sql("SELECT id FROM users WHERE email=$1", [U.user.email]))[0].id;
  r = await U("POST", "/api/events", { events: [{ type: "open", k: "ignored", v: 9 }, { type: "xp_start", k: "al-vars" }, { type: "bogus", k: "x" }, null, { type: "test_done", k: 12345, v: 87.5 }, { type: "open" },
    { type: "xp_done", k: "k".repeat(100), v: "7" }, { type: "limit_hit", v: Infinity }, { type: "xp_done", k: "al-exp", v: 1e21 }] });
  ok(r.s === 200 && r.j.ok === true, "batch accepted", r.j);
  let rows = await sql("SELECT type,k,v::text v,at FROM events WHERE user_id=$1 ORDER BY id", [me]);
  ok(JSON.stringify(rows.map(x => [x.type, x.k, x.v])) === JSON.stringify([["open", null, null], ["xp_start", "al-vars", null], ["test_done", "12345", "87.5"], ["xp_done", "k".repeat(64), null], ["limit_hit", null, null], ["xp_done", "al-exp", "1000000000000000000000"]]),
    "known types only, in the order sent; open once and without k/v; k cut to 64 characters; v only when a finite number", rows.map(x => [x.type, x.k && x.k.slice(0, 12), x.v]));
  ok(rows.every((x, i) => !i || new Date(x.at) >= new Date(rows[i - 1].at)) && (await sql("SELECT count(DISTINCT at)::int n FROM events WHERE user_id=$1", [me]))[0].n === rows.length, "timestamps keep the order of the batch");
  r = await U("POST", "/api/events", { events: [{ type: "open" }, { type: "open" }] });
  rows = await sql("SELECT count(*)::int n FROM events WHERE user_id=$1 AND type='open'", [me]);
  ok(r.s === 200 && rows[0].n === 1, "open stays once per student per day", rows[0].n);
  r = await U("POST", "/api/events", { events: Array.from({ length: 80 }, (_, i) => ({ type: "xp_start", k: "n" + i })) });
  rows = await sql("SELECT k FROM events WHERE user_id=$1 AND k LIKE 'n%' ORDER BY id", [me]);
  ok(rows.length === 50 && rows[0].k === "n0" && rows[49].k === "n49", "at most 50 events per request, the first 50", rows.length);
  for (const body of [{}, { events: "x" }, { events: [] }, { events: [1, "a", [], {}] }]) { r = await U("POST", "/api/events", body); if (r.s !== 200) ok(false, "odd bodies are accepted and ignored", [body, r.s]); }
  ok((await sql("SELECT count(*)::int n FROM events WHERE user_id=$1", [me]))[0].n === 56, "odd bodies store nothing");

  section("narration index and tracks");
  r = await get("/audio/index.json"); const ids = JSON.parse(r.buf.toString("utf8"));
  const inDb = (await sql("SELECT id FROM narration ORDER BY id")).map(x => x.id);
  ok(r.s === 200 && r.cc === "no-cache" && /json/.test(r.h.get("content-type")) && JSON.stringify(ids) === JSON.stringify(inDb), "/audio/index.json lists the stored clips, no-cache", [r.cc, ids.length, inDb.length]);
  r = await get("/audio/tracks.json"); const again = await rawGet("/audio/tracks.json", "identity", { "If-None-Match": r.etag });
  ok(r.s === 200 && r.cc === "no-cache" && again.s === 304 && Object.keys(JSON.parse(r.buf.toString("utf8"))).length > 0, "/audio/tracks.json: no-cache, 304 on a matching ETag", [r.cc, again.s]);
});
