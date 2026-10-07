// Static delivery for the Railway server (no extra dependencies):
//  - brotli/gzip compression for every text response (static files and res.send/res.json bodies), cached by content hash
//  - versioned asset URLs: HTML pages are served with /app.js?v=<hash> etc., and a request that carries the current
//    hash is cached for a year (immutable); anything else is revalidated with an ETag (no-cache), so deploys and
//    rebuilds are picked up immediately
//  - the landing page rendered on the server in English for ?lang=en (crawlers and first paint get real English HTML),
//    with JSON-LD (organisation, website, product with live prices, FAQ from the visible questions)
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const crypto = require("crypto");
const acorn = require("acorn");

const sha1 = b => crypto.createHash("sha1").update(b).digest("hex");
const COMPRESSIBLE = /^(text\/|application\/(javascript|json|xml|manifest\+json|ld\+json)|image\/svg\+xml)/i;
const TYPES = { ".js": "application/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".html": "text/html; charset=utf-8",
  ".svg": "image/svg+xml", ".json": "application/json; charset=utf-8", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8" };
const YEAR = "public, max-age=31536000, immutable";

// ---------- compression ----------
function pickEncoding(req) {
  const ae = String(req.get("Accept-Encoding") || "");
  if (/\bbr\b/.test(ae)) return "br";
  if (/\bgzip\b/.test(ae)) return "gzip";
  return null;
}
const encCache = new Map(); let encBytes = 0; const ENC_MAX = 96 * 1024 * 1024;
function compress(buf, enc, quality) {
  return new Promise((res, rej) => {
    const cb = (e, out) => e ? rej(e) : res(out);
    if (enc === "br") zlib.brotliCompress(buf, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: quality, [zlib.constants.BROTLI_PARAM_SIZE_HINT]: buf.length } }, cb);
    else zlib.gzip(buf, { level: quality >= 9 ? 9 : 6 }, cb);
  });
}
// cached by content: identical bodies (static files, explainer bundles) are compressed once, in the thread pool
function compressCached(buf, enc, quality, hash) {
  const key = (hash || sha1(buf)) + ":" + enc + ":" + quality;
  let p = encCache.get(key);
  if (p) { encCache.delete(key); encCache.set(key, p); return p; } // LRU touch
  p = compress(buf, enc, quality);
  encCache.set(key, p);
  p.then(out => { encBytes += out.length; p.size = out.length;
    for (const [k, v] of encCache) { if (encBytes <= ENC_MAX) break; if (v.size) { encBytes -= v.size; encCache.delete(k); } } },
  () => encCache.delete(key));
  return p;
}

// send a text body: ETag from the uncompressed bytes, 304 when fresh, compressed when the client accepts it
async function sendBody(req, res, body, { type, cache, quality = 11, cacheEnc = true, hash } = {}) {
  const buf = Buffer.isBuffer(body) ? body : Buffer.from(String(body), "utf8");
  if (type) res.set("Content-Type", type);
  if (cache) res.set("Cache-Control", cache);
  const ctype = String(res.get("Content-Type") || "");
  const comp = COMPRESSIBLE.test(ctype) && buf.length >= 1024;
  const enc = comp ? pickEncoding(req) : null;
  if (comp) res.vary("Accept-Encoding");
  const h = hash || sha1(buf);
  res.set("ETag", `W/"${h.slice(0, 20)}${enc ? "-" + enc : ""}"`);
  if (res.statusCode >= 200 && res.statusCode < 300 && req.fresh) return res.status(304).end();
  if (req.method === "HEAD") { res.set("Content-Length", buf.length); return res.end(); }
  if (!enc) return res.set("Content-Length", buf.length).end(buf);
  let out;
  try { out = cacheEnc ? await compressCached(buf, enc, quality, h) : await compress(buf, enc, quality); }
  catch (e) { return res.set("Content-Length", buf.length).end(buf); }
  res.set({ "Content-Encoding": enc, "Content-Length": out.length }).end(out);
}

// res.send/res.json bodies (API JSON, explainer bundles, robots/sitemap): compress text bodies of 1 KB or more.
// Bundles that are the same for everyone (/xp/…, /api/xp/…) are cached; per-user API data is compressed fresh at a fast level.
function compressSends(req, res, next) {
  const orig = res.send;
  res.send = function (body) {
    if (this.get("Content-Encoding") || this.statusCode === 204 || this.statusCode === 304) return orig.call(this, body);
    if (body == null || (typeof body === "object" && !Buffer.isBuffer(body))) return orig.call(this, body); // res.json path → calls send again with a string
    if (typeof body !== "string" && !Buffer.isBuffer(body)) return orig.call(this, body);
    if (!this.get("Content-Type")) { if (Buffer.isBuffer(body)) return orig.call(this, body); this.type("html"); }
    let ct = String(this.get("Content-Type"));
    if (!COMPRESSIBLE.test(ct) || Buffer.byteLength(body) < 1024) return orig.call(this, body);
    if (typeof body === "string" && !/charset=/i.test(ct)) this.set("Content-Type", ct + "; charset=utf-8");
    const shared = /^\/(xp|api\/xp|audio)\//.test(req.path);
    res.send = orig; // one send per response
    sendBody(req, this, body, { quality: shared ? 11 : 5, cacheEnc: shared }).catch(next);
    return this;
  };
  next();
}

// ---------- files ----------
const fileCache = new Map(); // abs path → {mtime,size,buf,hash}
function readFile(f) {
  let st; try { st = fs.statSync(f); } catch (e) { return null; }
  if (!st.isFile()) return null;
  const c = fileCache.get(f);
  if (c && c.mtime === st.mtimeMs && c.size === st.size) return c;
  const buf = fs.readFileSync(f);
  const n = { mtime: st.mtimeMs, size: st.size, buf, hash: sha1(buf) };
  fileCache.set(f, n);
  return n;
}

module.exports = function site(app, { PUB, loadConfig }) {
  const SEP = PUB.endsWith(path.sep) ? PUB : PUB + path.sep;
  const inPub = rel => {
    let p; try { p = decodeURIComponent(rel); } catch (e) { return null; }
    if (p.includes("\0") || /(^|[\\/])\.[^\\/]*/.test(p)) return null; // no dotfiles, no ".." segments
    const f = path.resolve(PUB, "." + path.posix.normalize("/" + p));
    return f.startsWith(SEP) ? f : null;
  };
  const verOf = rel => { const f = inPub(rel); const c = f && readFile(f); return c ? c.hash.slice(0, 10) : null; };

  // local asset references in HTML get ?v=<content hash>
  const ASSET = /(\s(?:src|href)=")(\/?)((?:vendor\/)?[\w.-]+\.(?:js|css|svg|png|webmanifest))"/g;
  // cloud.js is left as is: app.js finds it with script[src$="cloud.js"]
  const UNVERSIONED = new Set([]);
  function versioned(html) {
    return html.replace(ASSET, (m, a, slash, name) => { const v = !UNVERSIONED.has(name) && verOf(name); return v ? `${a}${slash}${name}?v=${v}"` : m; });
  }
  const htmlCache = new Map();
  // render a page from public/<name>; transform(html) may add per-request parts (cached by key)
  function page(name, key, transform) {
    const c = readFile(path.join(PUB, name));
    if (!c) return null;
    const deps = []; let m; const raw = c.buf.toString("utf8"); ASSET.lastIndex = 0;
    while ((m = ASSET.exec(raw))) deps.push(verOf(m[3]) || "");
    const ck = name + "|" + c.hash + "|" + deps.join(",") + "|" + (key || "");
    let hit = htmlCache.get(ck);
    if (!hit) {
      let html = versioned(raw);
      if (transform) html = transform(html);
      hit = { html, hash: sha1(html) };
      if (htmlCache.size > 64) htmlCache.clear();
      htmlCache.set(ck, hit);
    }
    return hit;
  }
  function sendPage(req, res, name, opts = {}) {
    const p = page(name, opts.key, opts.transform);
    if (!p) return false;
    if (opts.status) res.status(opts.status);
    sendBody(req, res, p.html, { type: TYPES[".html"], cache: "no-cache", hash: p.hash });
    return true;
  }

  // static text assets (js/css/svg/json/manifest…): compressed, versioned or revalidated
  function staticText(req, res, next) {
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    const ext = path.extname(req.path).toLowerCase();
    if (!TYPES[ext] || ext === ".html") return next();
    const f = inPub(req.path); const c = f && readFile(f);
    if (!c) return next();
    const v = typeof req.query.v === "string" ? req.query.v : "";
    const cache = v && v === c.hash.slice(0, 10) ? YEAR : "no-cache";
    sendBody(req, res, c.buf, { type: TYPES[ext], cache, hash: c.hash }).catch(next);
  }
  // warm the compression cache for the big assets so the first visitor after a deploy doesn't wait
  function warm() {
    ["app.js", "app.css", "xp-engine.js", "vendor/gsap.min.js", "landing.js", "landing.css", "cloud.js", "admin.js", "admin.css", "legal.css", "legal.js"].forEach(n => {
      const c = readFile(path.join(PUB, n)); if (c) ["br", "gzip"].forEach(e => compressCached(c.buf, e, 11, c.hash).catch(() => {}));
    });
  }

  // ---------- landing page: English rendered on the server, JSON-LD ----------
  const ORIGIN = "https://gat.academy";
  let enDict = { sig: "", EN: {}, META: {} };
  function landingDict() {
    const c = readFile(path.join(PUB, "landing.js"));
    if (!c) return enDict;
    if (enDict.sig === c.hash) return enDict;
    const src = c.buf.toString("utf8"), out = { sig: c.hash, EN: {}, META: {} };
    try {
      const ast = acorn.parse(src, { ecmaVersion: "latest" });
      const decl = {}; // name → source of the initialiser
      (function walk(n) {
        if (!n || typeof n.type !== "string") return;
        if (n.type === "VariableDeclarator" && n.id.type === "Identifier" && ["SCRIB", "EN", "META"].includes(n.id.name) && n.init) decl[n.id.name] = src.slice(n.init.start, n.init.end);
        for (const k in n) { const v = n[k]; if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v.type === "string" && k !== "loc") walk(v); }
      })(ast);
      // the dictionaries are plain literals (string concatenation with SCRIB only); evaluate them without any globals
      const vm = require("vm");
      const r = vm.runInNewContext(`var SCRIB=${decl.SCRIB || "''"};({EN:${decl.EN || "{}"},META:${decl.META || "{}"}})`, Object.create(null), { timeout: 500 });
      out.EN = r.EN || {}; out.META = r.META || {};
    } catch (e) { console.error("landing: cannot read the English copy", e.message); }
    enDict = out;
    return out;
  }
  const escAttr = s => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const escText = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const stripTags = s => String(s).replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();
  // replace the inner HTML of every element carrying data-i="k" with EN[k] (and data-i-aria labels), like landing.js does
  function translateHtml(html, EN) {
    const OPEN = /<([a-zA-Z][\w-]*)(\s[^>]*?)?(\/?)>/g;
    let out = "", pos = 0, m;
    OPEN.lastIndex = 0;
    while ((m = OPEN.exec(html))) {
      const tag = m[1], attrs = m[2] || "";
      let open = m[0];
      const ka = / data-i-aria="([^"]+)"/.exec(attrs);
      if (ka && EN[ka[1]] != null) open = open.replace(/ aria-label="[^"]*"/, ` aria-label="${escAttr(EN[ka[1]])}"`);
      const ki = / data-i="([^"]+)"/.exec(attrs);
      if (!ki || EN[ki[1]] == null || m[3]) { out += html.slice(pos, m.index) + open; pos = OPEN.lastIndex; continue; }
      // find the matching close tag (same tag name, counting nesting)
      const re = new RegExp(`<(/?)${tag}(?=[\\s>/])[^>]*>`, "g"); re.lastIndex = OPEN.lastIndex;
      let depth = 1, c, end = -1, after = -1;
      while ((c = re.exec(html))) { if (c[1]) { if (--depth === 0) { end = c.index; after = re.lastIndex; break; } } else if (!/\/>$/.test(c[0])) depth++; }
      if (end < 0) { out += html.slice(pos, m.index) + open; pos = OPEN.lastIndex; continue; }
      out += html.slice(pos, m.index) + open + EN[ki[1]] + `</${tag}>`;
      pos = after; OPEN.lastIndex = after;
    }
    return out + html.slice(pos);
  }
  const AR_D = "٠١٢٣٤٥٦٧٨٩";
  const arNum = n => String(n).replace(/\d/g, d => AR_D[d]);
  const arDays = n => n === 1 ? "يوم واحد" : n === 2 ? "يومان" : arNum(n) + " " + (n % 100 >= 3 && n % 100 <= 10 ? "أيام" : "يومًا");
  function jsonLd(lang, html, cfg) {
    const en = lang === "en";
    const url = en ? ORIGIN + "/?lang=en" : ORIGIN + "/";
    const org = { "@type": "EducationalOrganization", "@id": ORIGIN + "/#org", name: "أكاديمية القدرات", alternateName: "GAT Academy", url: ORIGIN + "/",
      logo: { "@type": "ImageObject", url: ORIGIN + "/icon-512.png", width: 512, height: 512 }, image: ORIGIN + "/og.png", email: "info@gat.academy",
      description: en ? "A platform to prepare for the General Aptitude Test (GAT) in Arabic and English: a diagnostic test, a daily plan, narrated animated explainers and model tests in the computer-based format."
        : "منصة للتحضير لاختبار القدرات العامة (GAT) بالعربية والإنجليزية: اختبار تشخيصي، خطة يومية، شروحات متحركة مسموعة، ونماذج محاكية بصيغة الاختبار المحوسب.",
      areaServed: "SA", knowsLanguage: ["ar", "en"] };
    const site = { "@type": "WebSite", "@id": ORIGIN + "/#website", url: ORIGIN + "/", name: "أكاديمية القدرات", alternateName: ["GAT Academy", "gat.academy"], inLanguage: ["ar", "en"], publisher: { "@id": ORIGIN + "/#org" } };
    const pageNode = { "@type": "WebPage", "@id": url + "#page", url, name: (/<title>([^<]*)<\/title>/.exec(html) || [])[1] || "", inLanguage: lang, isPartOf: { "@id": ORIGIN + "/#website" }, about: { "@id": ORIGIN + "/#org" }, primaryImageOfPage: ORIGIN + "/og.png" };
    const graph = [org, site, pageNode];
    // offers: the live plans from the admin settings (never hard-coded prices)
    if (cfg && Array.isArray(cfg.plans)) {
      const cur = cfg.currency || "SAR";
      const offers = [{ "@type": "Offer", name: en ? "Free plan" : "الخطة المجانية", price: "0", priceCurrency: cur, availability: "https://schema.org/InStock", url: ORIGIN + "/app" }]
        .concat(cfg.plans.filter(p => Number(p.price) > 0).map(p => ({ "@type": "Offer", name: String((en ? p.en || p.ar : p.ar || p.en) || p.id), price: String(Number(p.price)), priceCurrency: cur, availability: "https://schema.org/InStock", url: ORIGIN + "/app#upgrade" })));
      graph.push({ "@type": "Product", "@id": ORIGIN + "/#product", name: "أكاديمية القدرات · GAT Academy", image: ORIGIN + "/og.png", brand: { "@id": ORIGIN + "/#org" }, category: "Test preparation",
        description: stripTags((/<meta name="description" content="([^"]*)"/.exec(html) || [])[1] || ""), offers });
    }
    // FAQ: exactly the questions shown on the page, in the page's language
    const qa = []; const QRE = /<details class="lp-q"[^>]*><summary[^>]*>([\s\S]*?)<\/summary><div class="lp-a"([^>]*)>([\s\S]*?)<\/div><\/details>/g; let q;
    while ((q = QRE.exec(html))) {
      let a = q[3];
      if (/id="lp-a5"/.test(q[2])) { // refund answer depends on the live setting, like the visible page
        const r = cfg && cfg.refund;
        if (!(r && r.on && r.days)) continue;
        a = en ? `Yes. If your subscription isn’t right for you within ${r.days} day${r.days === 1 ? "" : "s"} of starting it, we refund the full amount to the same payment method. To request a refund, email info@gat.academy.`
          : `نعم. إن لم يناسبك الاشتراك خلال ${arDays(+r.days)} من بدايته، نعيد إليك المبلغ كاملًا إلى وسيلة الدفع نفسها. لطلب الاسترداد راسلنا على info@gat.academy.`;
      }
      qa.push({ "@type": "Question", name: stripTags(q[1]), acceptedAnswer: { "@type": "Answer", text: stripTags(a) } });
    }
    if (qa.length) graph.push({ "@type": "FAQPage", "@id": url + "#faq", inLanguage: lang, mainEntity: qa });
    return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  }
  async function sendLanding(req, res) {
    const lang = req.query.lang === "en" ? "en" : "ar";
    let cfg = null; try { cfg = await loadConfig(); } catch (e) { cfg = null; }
    const { EN, META, sig } = landingDict();
    const key = lang + "|" + sig + "|" + sha1(JSON.stringify(cfg && { p: cfg.plans, c: cfg.currency, r: cfg.refund }));
    sendPage(req, res, "index.html", { key, transform: html => {
      if (lang === "en") {
        html = translateHtml(html, EN);
        html = html.replace(/<html lang="ar" dir="rtl"/, '<html lang="en" dir="ltr" data-ssr="en"');
        const t = META.en && META.en.title, d = META.en && META.en.desc;
        if (t) html = html.replace(/<title>[^<]*<\/title>/, `<title>${escText(t)}</title>`).replace(/(<meta property="og:title" content=")[^"]*/, "$1" + escAttr(t)).replace(/(<meta name="twitter:title" content=")[^"]*/, "$1" + escAttr(t));
        if (d) html = html.replace(/(<meta name="description" content=")[^"]*/, "$1" + escAttr(d)).replace(/(<meta property="og:description" content=")[^"]*/, "$1" + escAttr(d)).replace(/(<meta name="twitter:description" content=")[^"]*/, "$1" + escAttr(d));
        html = html.replace('<meta property="og:locale" content="ar_SA">\n<meta property="og:locale:alternate" content="en_US">', '<meta property="og:locale" content="en_US">\n<meta property="og:locale:alternate" content="ar_SA">')
          .replace(/(<meta property="og:image:alt" content=")[^"]*/, "$1GAT Academy: the mastery map of the ten skills of the General Aptitude Test")
          .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${ORIGIN}/?lang=en">`)
          .replace(/(<meta property="og:url" content=")[^"]*/, `$1${ORIGIN}/?lang=en`)
          // the language switch and the app links, as landing.js sets them
          .replace(/<a class="lp-ib lp-lang lp-js" id="lp-lang" href="\?lang=en" lang="en" hreflang="en" aria-label="English">English<\/a>/,
            '<a class="lp-ib lp-lang lp-js" id="lp-lang" href="?lang=ar" lang="ar" hreflang="ar" aria-label="العربية">العربية</a>')
          .replace(/(<a\b[^>]*?) href="\/app[^"]*"([^>]*?) data-app="([^"]*)"/g, (m, a, b, d) => `${a} href="/app?lang=en${escAttr(d)}"${b} data-app="${d}"`)
          .replace(/<span id="lp-year">\d+<\/span>/, `<span id="lp-year">${new Date().getFullYear()}</span>`);
      } else {
        html = html.replace(/<span id="lp-year">\d+<\/span>/, `<span id="lp-year">${arNum(new Date().getFullYear())}</span>`);
      }
      return html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${jsonLd(lang, html, cfg)}</script>`);
    } });
  }

  // ---------- app icons and web manifest ----------
  app.get("/site.webmanifest", (req, res) => {
    const v = n => n + "?v=" + (verOf(n) || "");
    const body = JSON.stringify({
      name: "أكاديمية القدرات · GAT Academy", short_name: "أكاديمية القدرات", lang: "ar", dir: "rtl",
      description: "التحضير لاختبار القدرات العامة (GAT) بالعربية والإنجليزية · Prepare for the General Aptitude Test in Arabic and English",
      start_url: "/app", scope: "/", display: "browser", background_color: "#FCFBFF", theme_color: "#6A4BF2",
      icons: [{ src: v("/icon-192.png"), sizes: "192x192", type: "image/png" }, { src: v("/icon-512.png"), sizes: "512x512", type: "image/png" },
        { src: v("/icon-maskable-512.png"), sizes: "512x512", type: "image/png", purpose: "maskable" }, { src: v("/favicon.svg"), sizes: "any", type: "image/svg+xml" }]
    });
    sendBody(req, res, body, { type: TYPES[".webmanifest"], cache: "public, max-age=86400" }).catch(() => res.end());
  });

  return { compressSends, staticText, sendPage, sendLanding, sendBody, warm, verOf, translateHtml, landingDict };
};
