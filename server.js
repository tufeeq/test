// IELTS Academy (أكاديمية الآيلتس) — Railway server: static site + email/password accounts + progress sync + admin API (Postgres)
const express = require("express");
const path = require("path");
const fs = require("fs");
const zlib = require("zlib");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const compression = require("compression");
const { Pool } = require("pg");
const commerce = require("./commerce");
const oauth = require("./oauth");

const PORT = process.env.PORT || 3000;
const PUB = path.join(__dirname, "public");
const SESSION_DAYS = Number(process.env.SESSION_DAYS || 60);
const ADMIN_EMAILS = String(process.env.ADMIN_EMAILS || "").split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
process.on("unhandledRejection", e => console.error("unhandled rejection:", e && e.stack || e));
if (!process.env.DATABASE_URL) { console.error("DATABASE_URL is not set. Add a Postgres database to this Railway project."); process.exit(1); }

// SSL: Railway's private URL (*.railway.internal) has no sslmode and needs no SSL; the public proxy URL may carry
// ?sslmode=require with a self-signed cert. pg would turn any sslmode into strict verify-full (and override our
// ssl option), so we strip ssl params from the URL and decide here. PGSSL=1 forces SSL, PGSSL=0 disables it.
function dbConfig(raw) {
  let url = raw, mode = "";
  try {
    const u = new URL(raw);
    mode = (u.searchParams.get("sslmode") || "").toLowerCase();
    ["sslmode", "ssl", "sslrootcert", "sslcert", "sslkey", "uselibpqcompat"].forEach(k => u.searchParams.delete(k));
    url = u.toString();
  } catch (e) { /* not a URL (e.g. key=value string): pass through untouched */ }
  let ssl;
  if (process.env.PGSSL === "0" || mode === "disable") ssl = false;
  else if (mode === "verify-full") ssl = true;
  else if (mode || process.env.PGSSL === "1") ssl = { rejectUnauthorized: false };
  return { connectionString: url, ssl, max: 10, connectionTimeoutMillis: 10000, idleTimeoutMillis: 30000 };
}
const pool = new Pool(dbConfig(process.env.DATABASE_URL));
pool.on("error", e => console.error("pg pool error (idle client):", e.message)); // don't crash when the DB restarts

async function migrate() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      pass_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS progress (
      user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      track TEXT, target INT, lang TEXT, exam_date TEXT,
      p TEXT, summary JSONB,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS sessions (
      token_hash TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at TIMESTAMPTZ NOT NULL
    );
    CREATE INDEX IF NOT EXISTS sessions_user_idx ON sessions(user_id);
    CREATE TABLE IF NOT EXISTS password_resets (
      token_hash TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at TIMESTAMPTZ NOT NULL,
      used_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS password_resets_user_idx ON password_resets(user_id);
    CREATE TABLE IF NOT EXISTS narration (
      id TEXT PRIMARY KEY,
      mime TEXT NOT NULL,
      data BYTEA NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    ALTER TABLE users ADD COLUMN IF NOT EXISTS name TEXT;
  `);
  await C.migrate();
  await O.migrate();
}

const app = express();
app.set("trust proxy", 1);

// Canonical domain: when CANONICAL_HOST is set (e.g. gat.academy), requests arriving on any host listed in
// REDIRECT_HOSTS (e.g. www.gat.academy, the *.up.railway.app address) get a permanent redirect to it.
// /healthz is never redirected so Railway's health check keeps working.
const CANONICAL_HOST = String(process.env.CANONICAL_HOST || "").trim().toLowerCase();
const REDIRECT_HOSTS = String(process.env.REDIRECT_HOSTS || "").split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
app.use((req, res, next) => {
  const host = String(req.headers.host || "").toLowerCase().split(":")[0];
  if (CANONICAL_HOST && req.path !== "/healthz" && host !== CANONICAL_HOST && REDIRECT_HOSTS.includes(host)) {
    return res.redirect(301, "https://" + CANONICAL_HOST + req.originalUrl);
  }
  next();
});
app.disable("x-powered-by");
// on-the-fly gzip/brotli for dynamic responses (API JSON, /xp/free.js, /audio/*.json, robots, sitemap…).
// Static text files and HTML pages are pre-compressed and cached below; responses that already carry
// Content-Encoding are left alone by this middleware.
app.use(compression({ threshold: 1024, brotli: { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 5 } } }));
app.use(express.json({ limit: "2mb" })); // progress p may be up to 900k chars; JSON escaping inflates it

// security headers
app.use((req, res, next) => {
  res.set({
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(self), geolocation=(), payment=()",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; media-src 'self' blob:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
  });
  if (req.secure) res.set("Strict-Transport-Security", "max-age=15552000; includeSubDomains");
  next();
});

// ---------- helpers ----------
const sha = s => crypto.createHash("sha256").update(s).digest("hex");
const COOKIE = "ia_s";
function parseCookies(req) { const o = {}; (req.headers.cookie || "").split(";").forEach(c => { const i = c.indexOf("="); if (i > 0) { const v = c.slice(i + 1).trim(); try { o[c.slice(0, i).trim()] = decodeURIComponent(v); } catch (e) { o[c.slice(0, i).trim()] = v; } } }); return o; }
function setCookie(req, res, token, maxAgeSec) {
  const parts = [`${COOKIE}=${token}`, "Path=/", "HttpOnly", "SameSite=Lax", `Max-Age=${maxAgeSec}`];
  if (req.secure) parts.push("Secure");
  res.set("Set-Cookie", parts.join("; "));
}
const fail = (res, status, code) => res.status(status).json({ error: code });
const validEmail = e => typeof e === "string" && e.length <= 254 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 11);
// student's display name: 2–60 visible characters, control/format characters removed, spaces collapsed
const cleanName = v => String(v == null ? "" : v).normalize("NFC").replace(/[\u0000-\u001f\u007f-\u009f\u200b-\u200f\u202a-\u202e\u2066-\u2069<>]/g, "").replace(/\s+/g, " ").trim();
const validName = n => n.length >= 2 && n.length <= 60;
const pub = u => ({ email: u.email, name: u.name || "", isAdmin: isAdminEmail(u.email) });
const isAdminEmail = e => ADMIN_EMAILS.includes(String(e || "").toLowerCase());

// simple in-memory rate limit. limited() records a hit and checks; over() only checks (hit() records later, e.g. on failure)
const hits = new Map();
const recent = (key, windowMs) => { const now = Date.now(), h = (hits.get(key) || []).filter(t => now - t < windowMs); hits.set(key, h); return h; };
const hit = key => recent(key, 3600e3).push(Date.now());
const over = (key, max, windowMs) => recent(key, windowMs).length >= max;
function limited(key, max, windowMs) { const h = recent(key, windowMs); h.push(Date.now()); return h.length > max; }
setInterval(() => { const now = Date.now(); for (const [k, v] of hits) if (!v.some(t => now - t < 3600e3)) hits.delete(k); }, 600e3).unref();

async function createSession(req, res, userId) {
  const token = crypto.randomBytes(32).toString("base64url");
  await pool.query("INSERT INTO sessions(token_hash,user_id,expires_at) VALUES($1,$2,now() + ($3 || ' days')::interval)", [sha(token), userId, String(SESSION_DAYS)]);
  setCookie(req, res, token, SESSION_DAYS * 86400);
}
async function auth(req, res, next) {
  const tok = parseCookies(req)[COOKIE];
  if (tok) {
    const r = await pool.query("SELECT u.id,u.email,u.name FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=$1 AND s.expires_at>now()", [sha(tok)]);
    if (r.rows[0]) req.user = r.rows[0];
  }
  next();
}
const needUser = (req, res, next) => req.user ? next() : fail(res, 401, "unauthenticated");
const needAdmin = (req, res, next) => !req.user ? fail(res, 401, "unauthenticated") : isAdminEmail(req.user.email) ? next() : fail(res, 403, "forbidden");
// CSRF guard: state-changing API calls must carry our header (browsers block it cross-site without CORS)
// (payment-provider webhooks are server-to-server and verified by signature instead)
const WEBHOOKS = new Set(["/billing/webhook", "/billing/refund-webhook"]);
app.use("/api", (req, res, next) => (req.method === "GET" || req.get("X-Masar") === "1" || WEBHOOKS.has(req.path)) ? next() : fail(res, 403, "bad-origin"));
const wrap = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
app.use("/api", (req, res, next) => { res.set("Cache-Control", "no-store"); next(); }); // per-user data: never cache
app.use("/api", wrap(auth));
app.locals.auth = (req, res, next) => auth(req, res, next).catch(next);
const C = commerce(app, { pool, wrap, fail, needUser, needAdmin, isAdminEmail, limited, cleanName });
const O = oauth(app, { pool, wrap, createSession: (...a) => createSession(...a), cleanName, parseCookies, limited });

// ---------- account ----------
app.get("/api/me", wrap(async (req, res) => {
  const c = await C.loadCfg();
  res.json({ user: req.user ? { ...pub(req.user), plan: await C.planOf(req.user) } : null, config: C.publicCfg(c) });
}));

app.post("/api/name", needUser, wrap(async (req, res) => {
  const name = cleanName(req.body.name);
  if (!validName(name)) return fail(res, 400, "invalid-name");
  await pool.query("UPDATE users SET name=$1 WHERE id=$2", [name, req.user.id]);
  res.json({ user: pub({ ...req.user, name }) });
}));

app.post("/api/signup", wrap(async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase(), pw = String(req.body.password || "");
  if (limited("su:" + req.ip, 60, 3600e3)) return fail(res, 429, "too-many-requests"); // generous: a whole class may sign up from one school IP
  if (!validEmail(email)) return fail(res, 400, "invalid-email");
  if (pw.length < 8 || pw.length > 200) return fail(res, 400, "weak-password");
  const name = cleanName(req.body.name);
  if (!validName(name)) return fail(res, 400, "invalid-name");
  if (req.body.consent !== true) return fail(res, 400, "consent");
  const id = crypto.randomUUID(), hash = await bcrypt.hash(pw, 11);
  try { await pool.query("INSERT INTO users(id,email,pass_hash,name) VALUES($1,$2,$3,$4)", [id, email, hash, name]); }
  catch (e) { if (e.code === "23505") return fail(res, 409, "email-already-in-use"); throw e; }
  await createSession(req, res, id);
  res.json({ user: { ...pub({ email, name }), plan: await C.planOf({ id, email }) } });
}));

app.post("/api/login", wrap(async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase(), pw = String(req.body.password || "");
  // Limits: 150 attempts / 15 min per IP (classrooms share one IP).
  // Failed attempts are counted per email+IP (10 / 15 min), so someone guessing from their own device
  // cannot lock the real student out on another device. A high per-email ceiling (100 / 15 min)
  // still stops distributed guessing against one account.
  const ek = "le:" + email + "|" + req.ip, eg = "lg:" + email;
  if (limited("li:" + req.ip, 150, 900e3) || over(ek, 10, 900e3) || over(eg, 100, 900e3)) return fail(res, 429, "too-many-requests");
  const r = await pool.query("SELECT id,email,name,pass_hash FROM users WHERE email=$1", [email]);
  const u = r.rows[0];
  const ok = u ? await bcrypt.compare(pw, u.pass_hash) : await bcrypt.compare(pw, DUMMY_HASH);
  if (!u || !ok) { hit(ek); hit(eg); return fail(res, 401, "invalid-credential"); }
  hits.delete(ek);
  await createSession(req, res, u.id);
  res.json({ user: { ...pub(u), plan: await C.planOf(u) } });
}));

app.post("/api/logout", wrap(async (req, res) => {
  const tok = parseCookies(req)[COOKIE]; if (tok) await pool.query("DELETE FROM sessions WHERE token_hash=$1", [sha(tok)]);
  setCookie(req, res, "", 0); res.json({ ok: true });
}));

app.post("/api/password", needUser, wrap(async (req, res) => {
  const cur = String(req.body.current || ""), next = String(req.body.next || "");
  if (next.length < 8 || next.length > 200) return fail(res, 400, "weak-password");
  if (over("pw:" + req.user.id, 10, 900e3)) return fail(res, 429, "too-many-requests");
  const r = await pool.query("SELECT pass_hash FROM users WHERE id=$1", [req.user.id]);
  if (!(await bcrypt.compare(cur, r.rows[0].pass_hash))) { hit("pw:" + req.user.id); return fail(res, 401, "invalid-credential"); }
  await pool.query("UPDATE users SET pass_hash=$1 WHERE id=$2", [await bcrypt.hash(next, 11), req.user.id]);
  const tok = parseCookies(req)[COOKIE];
  await pool.query("DELETE FROM sessions WHERE user_id=$1 AND token_hash<>$2", [req.user.id, sha(tok || "")]);
  res.json({ ok: true });
}));

// ---------- password reset by email link ----------
// The link carries a random one-time token (only its hash is stored), valid for 60 minutes.
// Replies never reveal whether an email is registered.
const mail = require("./mail");
const RESET_MIN = 60;
app.post("/api/password/forgot", wrap(async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  if (!validEmail(email)) return fail(res, 400, "invalid-email");
  if (limited("fp:" + req.ip, 20, 3600e3) || limited("fpe:" + email, 3, 3600e3)) return fail(res, 429, "too-many-requests");
  if (!mail.configured()) { console.warn("password reset requested but no mail service is configured"); return res.json({ ok: true, mail: false }); }
  const u = (await pool.query("SELECT id,name,email FROM users WHERE email=$1", [email])).rows[0];
  if (u) {
    const token = crypto.randomBytes(32).toString("base64url");
    await pool.query("UPDATE password_resets SET used_at=now() WHERE user_id=$1 AND used_at IS NULL", [u.id]); // only the newest link works
    await pool.query("INSERT INTO password_resets(token_hash,user_id,expires_at) VALUES($1,$2,now() + ($3 || ' minutes')::interval)", [sha(token), u.id, String(RESET_MIN)]);
    const host = process.env.CANONICAL_HOST || req.headers.host, link = `https://${host}/app#reset/${token}`;
    mail.sendReset({ to: u.email, name: u.name, link, minutes: RESET_MIN, lang: req.body.lang === "en" ? "en" : "ar" }).catch(e => console.error("reset mail", e.message));
  }
  res.json({ ok: true, mail: true });
}));
app.post("/api/password/check", wrap(async (req, res) => {
  const token = String(req.body.token || "");
  if (limited("rc:" + req.ip, 60, 3600e3)) return fail(res, 429, "too-many-requests");
  const r = await pool.query("SELECT u.email FROM password_resets p JOIN users u ON u.id=p.user_id WHERE p.token_hash=$1 AND p.used_at IS NULL AND p.expires_at>now()", [sha(token)]);
  if (!r.rows[0]) return fail(res, 400, "reset-invalid");
  const e = r.rows[0].email, i = e.indexOf("@");
  res.json({ email: e.slice(0, Math.min(2, i)) + "•••" + e.slice(i) });
}));
app.post("/api/password/reset", wrap(async (req, res) => {
  const token = String(req.body.token || ""), pw = String(req.body.password || "");
  if (limited("rs:" + req.ip, 30, 3600e3)) return fail(res, 429, "too-many-requests");
  if (pw.length < 8 || pw.length > 200) return fail(res, 400, "weak-password");
  const r = await pool.query("UPDATE password_resets SET used_at=now() WHERE token_hash=$1 AND used_at IS NULL AND expires_at>now() RETURNING user_id", [sha(token)]);
  if (!r.rows[0]) return fail(res, 400, "reset-invalid");
  const uid = r.rows[0].user_id;
  await pool.query("UPDATE users SET pass_hash=$1 WHERE id=$2", [await bcrypt.hash(pw, 11), uid]);
  await pool.query("DELETE FROM sessions WHERE user_id=$1", [uid]); // sign out every other device
  await createSession(req, res, uid);
  const u = (await pool.query("SELECT id,email,name FROM users WHERE id=$1", [uid])).rows[0];
  res.json({ user: { ...pub(u), plan: await C.planOf(u) } });
}));
setInterval(() => pool.query("DELETE FROM password_resets WHERE created_at<now()-interval '2 days'").catch(() => {}), 3600e3).unref();

app.delete("/api/me", needUser, wrap(async (req, res) => {
  await pool.query("DELETE FROM users WHERE id=$1", [req.user.id]);
  setCookie(req, res, "", 0); res.json({ ok: true });
}));

// ---------- progress (minimal fields only) ----------
app.get("/api/progress", needUser, wrap(async (req, res) => {
  const r = await pool.query("SELECT p, updated_at FROM progress WHERE user_id=$1", [req.user.id]);
  res.json(r.rows[0] ? { p: r.rows[0].p, updatedAt: r.rows[0].updated_at } : { p: null });
}));
app.put("/api/progress", needUser, wrap(async (req, res) => {
  const b = req.body || {};
  const p = typeof b.p === "string" ? b.p : null;
  if (!p || p.length > 900000) return fail(res, 400, "bad-progress");
  try { JSON.parse(p); } catch (e) { return fail(res, 400, "bad-progress"); }
  const track = b.track === "gt" ? "gt" : "ac", lang = b.lang === "en" ? "en" : "ar";
  const target = Math.max(40, Math.min(90, Math.round(Number(b.target) || 65)));
  const examDate = /^\d{4}-\d{2}-\d{2}$/.test(b.examDate || "") ? b.examDate : "";
  const s = b.summary && typeof b.summary === "object" ? b.summary : {};
  const num = v => (typeof v === "number" && isFinite(v)) ? v : null;
  const summary = { est: num(s.est), readiness: num(s.readiness), solved: num(s.solved), acc: num(s.acc), models: num(s.models), streak: num(s.streak),
    L: num(s.L), R: num(s.R), W: num(s.W), S: num(s.S),
    lastActive: /^\d{4}-\d{2}-\d{2}$/.test(s.lastActive || "") ? s.lastActive : "" };
  await pool.query(`INSERT INTO progress(user_id,track,target,lang,exam_date,p,summary,updated_at) VALUES($1,$2,$3,$4,$5,$6,$7,now())
    ON CONFLICT (user_id) DO UPDATE SET track=$2,target=$3,lang=$4,exam_date=$5,p=$6,summary=$7,updated_at=now()`,
    [req.user.id, track, target, lang, examDate, p, summary]);
  res.json({ ok: true });
}));

// ---------- admin ----------
app.delete("/api/admin/users/:id", needAdmin, wrap(async (req, res) => {
  const r = await pool.query("DELETE FROM users WHERE id=$1 RETURNING email", [req.params.id]);
  await pool.query("INSERT INTO admin_audit(admin_email,action,target) VALUES($1,'delete_user',$2)", [req.user.email, r.rows[0] ? r.rows[0].email : req.params.id]);
  res.json({ ok: true });
}));
app.post("/api/admin/users/:id/reset-password", needAdmin, wrap(async (req, res) => {
  const AL = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O, 1/l/I, -/_ : easy to read aloud
  const temp = Array.from(crypto.randomBytes(10), b => AL[b % AL.length]).join("");
  const r = await pool.query("UPDATE users SET pass_hash=$1 WHERE id=$2 RETURNING email", [await bcrypt.hash(temp, 11), req.params.id]);
  if (!r.rows[0]) return fail(res, 404, "not-found");
  await pool.query("DELETE FROM sessions WHERE user_id=$1", [req.params.id]);
  await pool.query("INSERT INTO admin_audit(admin_email,action,target) VALUES($1,'reset_password',$2)", [req.user.email, r.rows[0].email]);
  res.json({ email: r.rows[0].email, tempPassword: temp });
}));

const SITE_HOST = CANONICAL_HOST || "myielts.academy";
app.get("/robots.txt", (req, res) => {
  res.type("text/plain").set("Cache-Control", "public, max-age=86400")
    .send(`User-agent: *\nAllow: /\nDisallow: /admin.html\nDisallow: /admin\nDisallow: /api/\nSitemap: https://${SITE_HOST}/sitemap.xml\n`);
});
app.get("/sitemap.xml", (req, res) => { // /app is a signed-in web app (noindex), so it is not listed
  const base = "https://" + SITE_HOST;
  res.type("application/xml").set("Cache-Control", "public, max-age=86400")
    .send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${base}/</loc></url><url><loc>${base}/privacy</loc></url><url><loc>${base}/terms</loc></url></urlset>\n`);
});
// ---------- AI examiner + premium content ----------
require("./ai")(app, { pool, wrap, fail, needUser, C, limited });
const CONTENT_PRO = path.join(__dirname, "content-pro");
app.get("/api/content/:name", needUser, wrap(async (req, res) => {
  if (!/^[\w-]{1,40}$/.test(req.params.name)) return fail(res, 400, "bad-name");
  const p = await C.planOf(req.user); if (p.tier !== "pro") return fail(res, 402, "subscription-required");
  const f = path.join(CONTENT_PRO, req.params.name + ".json"); if (!fs.existsSync(f)) return fail(res, 404, "not-found");
  res.set("Cache-Control", "private, no-store").type("application/json").sendFile(f);
}));
// ---------- explainer narration (public) ----------
// Narration clips live in Postgres (table narration); data/tracks.json maps each explainer to its clips + beat timings.
// data/clip_urls.json, when present, lists freshly generated clips ({id,url}) that are imported once at startup.
const TRACKS_FILE = path.join(__dirname, "data", "tracks.json");
// ---------- premium listening audio ----------
// Test audio keeps its public URLs (/audio/L02-p1.mp3, /audio/L02.timing.json) but tests whose content lives in
// content-pro/ (L02–L04) are only sent to subscribers, using the same plan check as /api/content.
let proTests = { at: 0, set: new Set() };
function proListening() {
  if (Date.now() - proTests.at > 60e3) {
    let names = []; try { names = fs.readdirSync(CONTENT_PRO); } catch (e) {}
    proTests = { at: Date.now(), set: new Set(names.map(n => /^(L\d+)\.json$/.exec(n)).filter(Boolean).map(m => m[1])) };
  }
  return proTests.set;
}
app.get(/^\/audio\/(L\d+)(?:-p\d+\.mp3|\.timing\.json)$/, wrap(async (req, res, next) => {
  if (!proListening().has(req.params[0])) return next(); // free test (L01): public static file
  await auth(req, res, () => {});
  if (!req.user) return fail(res, 401, "unauthenticated");
  const p = await C.planOf(req.user); if (p.tier !== "pro") return fail(res, 402, "subscription-required");
  const f = path.join(PUB, req.path.slice(1)); if (!fs.existsSync(f)) return next();
  res.set({ "Cache-Control": "private, max-age=86400", "Vary": "Cookie" });
  if (f.endsWith(".json")) return sendText(req, res, f, "private, max-age=3600");
  res.sendFile(f, { cacheControl: false }); // honours Range requests (Safari/iOS)
}));
app.get("/audio/tracks.json", (req, res) => { res.set("Cache-Control", "no-cache"); if (!fs.existsSync(TRACKS_FILE)) return res.json({}); res.type("application/json").sendFile(TRACKS_FILE); });
app.get("/audio/index.json", wrap(async (req, res) => {
  const r = await pool.query("SELECT id FROM narration ORDER BY id");
  res.set("Cache-Control", "no-cache").json(r.rows.map(x => x.id));
}));
app.get("/audio/:id.mp3", wrap(async (req, res, next) => {
  const r = await pool.query("SELECT mime, data, updated_at FROM narration WHERE id=$1", [req.params.id]);
  const row = r.rows[0]; if (!row) return next();   // not a narration clip: let static files (test audio) answer
  const buf = row.data, total = buf.length;
  // a clip can be replaced under the same URL (clip_urls.json "replace"), so cache for a day and revalidate by ETag
  const etag = `"n-${new Date(row.updated_at).getTime().toString(36)}-${total.toString(36)}"`;
  res.set({ "Content-Type": row.mime, "Accept-Ranges": "bytes", "Cache-Control": "public, max-age=86400", "ETag": etag, "Last-Modified": new Date(row.updated_at).toUTCString() });
  if (!req.get("Range") && req.fresh) return res.status(304).end();
  const m = /^bytes=(\d*)-(\d*)$/.exec(req.get("Range") || "");   // Safari/iOS need range requests for audio
  if (m) {
    let start = m[1] === "" ? total - Number(m[2]) : Number(m[1]);
    let end = m[1] !== "" && m[2] !== "" ? Math.min(Number(m[2]), total - 1) : total - 1;
    if (!(start >= 0 && start <= end)) return res.status(416).set("Content-Range", `bytes */${total}`).end();
    return res.status(206).set({ "Content-Range": `bytes ${start}-${end}/${total}`, "Content-Length": end - start + 1 }).end(buf.subarray(start, end + 1));
  }
  res.set("Content-Length", total).end(buf);
}));
async function importNarration() {
  const f = path.join(__dirname, "data", "clip_urls.json");
  if (!fs.existsSync(f)) return;
  let list; try { list = JSON.parse(fs.readFileSync(f, "utf8")); } catch (e) { return console.error("clip_urls.json unreadable"); }
  const have = new Set((await pool.query("SELECT id FROM narration")).rows.map(x => x.id));
  let ok = 0, skip = 0, bad = 0;
  for (const c of list) {
    if (!c || !/^[\w-]{1,64}$/.test(c.id || "") || !/^https:\/\//.test(c.url || "")) { bad++; continue; }
    if (have.has(c.id) && !c.replace) { skip++; continue; }
    try {
      const r = await fetch(c.url); if (!r.ok) throw new Error("HTTP " + r.status);
      const buf = Buffer.from(await r.arrayBuffer()); if (buf.length < 500 || buf.length > 5e6) throw new Error("size " + buf.length);
      await pool.query("INSERT INTO narration(id,mime,data,updated_at) VALUES($1,'audio/mpeg',$2,now()) ON CONFLICT (id) DO UPDATE SET data=EXCLUDED.data, updated_at=now()", [c.id, buf]);
      ok++;
    } catch (e) { bad++; console.error("narration import failed", c.id, e.message); }
  }
  console.log(`narration import: ${ok} stored, ${skip} already present, ${bad} failed`);
}
app.get("/healthz", (req, res) => { res.set("Cache-Control", "no-store"); res.send("ok"); });

// ---------- static site ----------
// Caching: HTML is no-cache. Local JS/CSS referenced from our HTML pages get ?v=<content hash> appended when the
// page is served; a request whose ?v= matches the file's current hash is cached for a year (immutable), anything
// else (un-versioned or stale hash) is no-cache + ETag. Text files are pre-compressed once per version (br + gzip).
app.use((req, res, next) => { if (/^\/(admin(\.html)?|app\/?)$/.test(req.path)) res.set("X-Robots-Tag", "noindex"); next(); });
app.get("/favicon.ico", (req, res) => res.redirect(301, "/favicon.svg"));
const md5 = b => crypto.createHash("md5").update(b).digest("hex");
const verCache = new Map(); // file -> { key, v }
function fileVersion(f) {
  let st; try { st = fs.statSync(f); } catch (e) { return null; }
  if (!st.isFile()) return null;
  const key = st.size + ":" + st.mtimeMs, c = verCache.get(f);
  if (c && c.key === key) return c.v;
  const v = md5(fs.readFileSync(f)).slice(0, 10); verCache.set(f, { key, v }); return v;
}
const TEXT_RE = /\.(js|css|html|json|svg|txt|xml|webmanifest|map)$/;
const zCache = new Map(); // key -> Promise<{ raw, br, gz }>
function packed(key, raw) {
  let p = zCache.get(key);
  if (!p) {
    p = Promise.all([
      new Promise((ok, no) => zlib.brotliCompress(raw, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11, [zlib.constants.BROTLI_PARAM_SIZE_HINT]: raw.length } }, (e, b) => e ? no(e) : ok(b))),
      new Promise((ok, no) => zlib.gzip(raw, { level: 9 }, (e, b) => e ? no(e) : ok(b)))
    ]).then(([br, gz]) => ({ raw, br, gz }));
    p.catch(() => zCache.delete(key));
    zCache.set(key, p);
    if (zCache.size > 400) zCache.delete(zCache.keys().next().value);
  }
  return p;
}
// send text (a file path, or { body, type, key }) compressed with the best encoding the client accepts
async function sendText(req, res, src, cacheControl, status) {
  let raw, key, type, mtime;
  if (typeof src === "string") {
    const st = await fs.promises.stat(src); raw = await fs.promises.readFile(src); mtime = st.mtime;
    key = src + ":" + st.size + ":" + st.mtimeMs; type = path.extname(src);
  } else { raw = src.body; key = src.key; type = src.type; }
  const etag = `W/"${md5(key).slice(0, 16)}"`, ae = req.get("Accept-Encoding") || "";
  const enc = raw.length < 1024 ? null : /\bbr\b/.test(ae) ? "br" : /\bgzip\b/.test(ae) ? "gzip" : null;
  res.status(status || 200).type(type).set({ "Cache-Control": cacheControl, "ETag": etag, "Vary": "Accept-Encoding" });
  if (mtime) res.set("Last-Modified", mtime.toUTCString());
  if (!status && req.fresh) return res.status(304).end();
  let body = raw;
  if (enc) { const z = await packed(key, raw); body = enc === "br" ? z.br : z.gz; res.set("Content-Encoding", enc); }
  res.set("Content-Length", body.length);
  res.end(req.method === "HEAD" ? undefined : body);
}
const cacheFor = (req, f) => {
  if (/\.(js|css)$/.test(f) && req.query.v && req.query.v === fileVersion(f)) return "public, max-age=31536000, immutable";
  if (/\.(js|css|html|json|map)$/.test(f)) return "no-cache";
  if (/\.(svg|png|ico|webmanifest)$/.test(f)) return "public, max-age=604800";
  return "no-cache";
};

// HTML pages: asset URLs versioned, landing page pre-filled with live prices + JSON-LD
const ASSET_RE = /(<(?:script|link)\b[^>]*?\b(?:src|href)=")(\/?)([\w\/.-]+\.(?:js|css))(")/g;
const versionAssets = html => html.replace(ASSET_RE, (m, a, slash, p, z) => {
  const v = fileVersion(path.join(PUB, p)); return v ? `${a}${slash}${p}?v=${v}${z}` : m;
});
const escHtml = t => String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const unescHtml = t => String(t).replace(/<[^>]+>/g, "").replace(/&(amp|lt|gt|quot|#39);/g, (m, k) => ({ amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'" })[k]);
const arNum = n => String(n).replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]);
function landingExtras(html, cfg) {
  const plans = cfg.plans.filter(p => p.active);
  // same markup landing.js builds (Arabic): it removes .paid cards and rebuilds them once /api/config arrives
  const ben = ["كل الشروحات المرئية التفاعلية للمهارات الـ١٦", "كل الاختبارات الكاملة مع الشرح بالعربية", "المصحح الذكي للكتابة والمحادثة يوميًا", "كل الدروس والبطاقات والإجابات النموذجية", "الخطة الكاملة وصندوق أخطاء غير محدود", "اختبار محادثة كامل بممتحن صوتي"];
  const cards = plans.map(p => `<div class="card paid${p.best ? " best" : ""}"><h3>${escHtml(p.ar)}${p.best ? ` <span class="chip pri">الأوفر</span>` : ""}</h3><div class="price">${arNum(p.price)} <small style="font-size:1rem">ريال</small></div>${p.days > 31 ? `<p class="small" style="margin:0;color:var(--teal-t,#14686C);font-weight:700">≈ ${arNum(Math.round(p.price / (p.days / 30)))} ريال شهريًا</p>` : ""}<p class="small muted">دفعة واحدة لمدة ${arNum(p.days)} يومًا · بدون تجديد تلقائي</p><ul class="benefits">${ben.map(b => `<li>✓ ${b}</li>`).join("")}</ul><a class="btn ${p.best ? "primary" : ""} block" href="/app?lang=ar#upgrade">اشترك</a></div>`).join("");
  html = html.replace("<!--PLANS-->", cards);
  if (plans.length) {
    const m = Math.min(...plans.map(p => Math.round(p.price / Math.max(1, p.days / 30))));
    html = html.replace(/(<td class="us" id="lp-cmp-price" data-en=")[^"]*(">)[^<]*(<\/td>)/, `$1from SAR ${m}/month$2من ${arNum(m)} ريالًا شهريًا$3`);
  }
  const base = "https://" + SITE_HOST;
  const faq = [...html.matchAll(/<details><summary[^>]*>([\s\S]*?)<\/summary><p[^>]*>([\s\S]*?)<\/p><\/details>/g)]
    .map(m => ({ "@type": "Question", name: unescHtml(m[1]).trim(), acceptedAnswer: { "@type": "Answer", text: unescHtml(m[2]).trim() } }));
  const ld = [
    { "@context": "https://schema.org", "@type": "EducationalOrganization", name: "أكاديمية الآيلتس", alternateName: "IELTS Academy", url: base + "/",
      logo: base + "/favicon.svg", image: base + "/og.png", email: "info@myielts.academy", inLanguage: ["ar", "en"] },
    { "@context": "https://schema.org", "@type": "Course", name: "التحضير لاختبار الآيلتس | IELTS preparation", inLanguage: ["ar", "en"],
      description: "تحضير لاختبار الآيلتس الأكاديمي والعام بصيغة الاختبار المحوسب مع شرح بالعربية ومصحح ذكي للكتابة والمحادثة.",
      provider: { "@type": "EducationalOrganization", name: "أكاديمية الآيلتس", url: base + "/" },
      offers: plans.map(p => ({ "@type": "Offer", name: p.ar, price: String(p.price), priceCurrency: cfg.currency, category: "Paid", url: base + "/#pricing" })),
      hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: "PT30M" } },
    faq.length ? { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "ar", mainEntity: faq } : null
  ].filter(Boolean);
  const json = JSON.stringify(ld).replace(/</g, "\\u003c");
  return html.replace("<!--JSONLD-->", `<script type="application/ld+json">${json}</script>`);
}
const htmlCache = new Map(); // file -> { key, body }
async function sendPage(req, res, name, status) {
  const f = path.join(PUB, name), st = await fs.promises.stat(f);
  let extraKey = "";
  let cfg = null;
  if (name === "index.html") { cfg = await C.loadCfg(); extraKey = JSON.stringify([cfg.plans, cfg.currency]); }
  const vers = [...(htmlCache.get(f) || { assets: [] }).assets].map(p => fileVersion(path.join(PUB, p))).join(",");
  const key = f + ":" + st.mtimeMs + ":" + st.size + ":" + vers + ":" + extraKey;
  let c = htmlCache.get(f);
  if (!c || c.key !== key) {
    let html = await fs.promises.readFile(f, "utf8");
    const assets = [...html.matchAll(ASSET_RE)].map(m => m[3]);
    html = versionAssets(html);
    if (cfg) html = landingExtras(html, cfg);
    const v2 = assets.map(p => fileVersion(path.join(PUB, p))).join(",");
    c = { key: f + ":" + st.mtimeMs + ":" + st.size + ":" + v2 + ":" + extraKey, body: Buffer.from(html), assets };
    htmlCache.set(f, c);
  }
  return sendText(req, res, { body: c.body, key: c.key, type: "html" }, "no-cache", status);
}
// "/" is the marketing page for visitors; signed-in students go straight to the app at /app
app.get("/", wrap(async (req, res) => {
  const tok = parseCookies(req)[COOKIE];
  if (tok && req.query.home === undefined) { const r = await pool.query("SELECT 1 FROM sessions WHERE token_hash=$1 AND expires_at>now()", [sha(tok)]); if (r.rows[0]) return res.redirect(302, "/app"); }
  return sendPage(req, res, "index.html");
}));
app.get(["/app", "/app/"], wrap((req, res) => sendPage(req, res, "app.html")));
app.get(/^\/(index|app|admin|privacy|terms|404)(\.html)?$/, wrap((req, res) => {
  const n = req.params[0];
  if (n === "index") return res.redirect(301, "/");
  if (n === "404") return sendPage(req, res, "404.html", 404);
  return sendPage(req, res, n + ".html");
}));
// pre-compressed static text (JS, CSS, JSON, SVG…); binary files fall through to express.static
app.use(wrap(async (req, res, next) => {
  if ((req.method !== "GET" && req.method !== "HEAD") || !TEXT_RE.test(req.path)) return next();
  let rel; try { rel = decodeURIComponent(req.path); } catch (e) { return next(); }
  const f = path.join(PUB, rel);
  if (!f.startsWith(PUB + path.sep) || rel.includes("\0")) return next();
  let st; try { st = await fs.promises.stat(f); } catch (e) { return next(); }
  if (!st.isFile()) return next();
  return sendText(req, res, f, cacheFor(req, f));
}));
app.use(express.static(PUB, { extensions: ["html"], setHeaders: (res, f) => {
  res.set("Cache-Control", cacheFor(res.req, f));
  if (/\.mp3$/.test(f)) res.set("Cache-Control", "public, max-age=2592000");
} }));
app.use("/api", (req, res) => fail(res, 404, "not-found"));
app.use((req, res) => sendPage(req, res, "404.html", 404).catch(() => res.status(404).end("Not found")));
app.use((err, req, res, next) => {
  if (err && (err.type === "entity.parse.failed" || err.type === "entity.too.large" || err.type === "encoding.unsupported" || err.type === "charset.unsupported")) {
    const tooBig = err.type === "entity.too.large";
    return fail(res, tooBig ? 413 : 400, tooBig ? "too-large" : "bad-json");
  }
  console.error(err);
  if (req.path.startsWith("/api")) return fail(res, 500, "server");
  res.status(500).send("Server error");
});

// hourly cleanup of expired sessions
setInterval(() => pool.query("DELETE FROM sessions WHERE expires_at<now()").catch(() => {}), 3600e3).unref();

migrate().then(() => {
  const srv = app.listen(PORT, () => console.log(`IELTS Academy running on :${PORT}`));
  importNarration().catch(e => console.error("narration import", e.message));
  const bye = () => { srv.close(() => pool.end().finally(() => process.exit(0))); setTimeout(() => process.exit(0), 8000).unref(); };
  process.on("SIGTERM", bye); process.on("SIGINT", bye);
}).catch(e => { console.error("Migration failed", e); process.exit(1); });

module.exports = { app, pool };
