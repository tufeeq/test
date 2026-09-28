// Masar 100 — Railway server: static site + email/password accounts + progress sync + admin API (Postgres)
const express = require("express");
const path = require("path");
const fs = require("fs");
const zlib = require("zlib");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");

const PORT = process.env.PORT || 3000;
const SESSION_DAYS = Number(process.env.SESSION_DAYS || 60);
const ADMIN_EMAILS = String(process.env.ADMIN_EMAILS || "").split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
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
  `);
}

const app = express();
app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(express.json({ limit: "2mb" })); // progress p may be up to 900k chars; JSON escaping inflates it

// security headers
app.use((req, res, next) => {
  res.set({
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
  });
  if (req.secure) res.set("Strict-Transport-Security", "max-age=15552000");
  next();
});

// ---------- helpers ----------
const sha = s => crypto.createHash("sha256").update(s).digest("hex");
const COOKIE = "m100";
function parseCookies(req) { const o = {}; (req.headers.cookie || "").split(";").forEach(c => { const i = c.indexOf("="); if (i > 0) { const v = c.slice(i + 1).trim(); try { o[c.slice(0, i).trim()] = decodeURIComponent(v); } catch (e) { o[c.slice(0, i).trim()] = v; } } }); return o; }
function setCookie(req, res, token, maxAgeSec) {
  const parts = [`${COOKIE}=${token}`, "Path=/", "HttpOnly", "SameSite=Lax", `Max-Age=${maxAgeSec}`];
  if (req.secure) parts.push("Secure");
  res.set("Set-Cookie", parts.join("; "));
}
const fail = (res, status, code) => res.status(status).json({ error: code });
const validEmail = e => typeof e === "string" && e.length <= 254 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 11);
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
    const r = await pool.query("SELECT u.id,u.email FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=$1 AND s.expires_at>now()", [sha(tok)]);
    if (r.rows[0]) req.user = r.rows[0];
  }
  next();
}
const needUser = (req, res, next) => req.user ? next() : fail(res, 401, "unauthenticated");
const needAdmin = (req, res, next) => !req.user ? fail(res, 401, "unauthenticated") : isAdminEmail(req.user.email) ? next() : fail(res, 403, "forbidden");
// CSRF guard: state-changing API calls must carry our header (browsers block it cross-site without CORS)
app.use("/api", (req, res, next) => (req.method === "GET" || req.get("X-Masar") === "1") ? next() : fail(res, 403, "bad-origin"));
const wrap = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
app.use("/api", (req, res, next) => { res.set("Cache-Control", "no-store"); next(); }); // per-user data: never cache
app.use("/api", wrap(auth));

// ---------- account ----------
app.get("/api/me", (req, res) => res.json({ user: req.user ? { email: req.user.email, isAdmin: isAdminEmail(req.user.email) } : null }));

app.post("/api/signup", wrap(async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase(), pw = String(req.body.password || "");
  if (limited("su:" + req.ip, 60, 3600e3)) return fail(res, 429, "too-many-requests"); // generous: a whole class may sign up from one school IP
  if (!validEmail(email)) return fail(res, 400, "invalid-email");
  if (pw.length < 8 || pw.length > 200) return fail(res, 400, "weak-password");
  if (req.body.consent !== true) return fail(res, 400, "consent");
  const id = crypto.randomUUID(), hash = await bcrypt.hash(pw, 11);
  try { await pool.query("INSERT INTO users(id,email,pass_hash) VALUES($1,$2,$3)", [id, email, hash]); }
  catch (e) { if (e.code === "23505") return fail(res, 409, "email-already-in-use"); throw e; }
  await createSession(req, res, id);
  res.json({ user: { email, isAdmin: isAdminEmail(email) } });
}));

app.post("/api/login", wrap(async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase(), pw = String(req.body.password || "");
  // Limits: 150 attempts / 15 min per IP (classrooms share one IP).
  // Failed attempts are counted per email+IP (10 / 15 min), so someone guessing from their own device
  // cannot lock the real student out on another device. A high per-email ceiling (100 / 15 min)
  // still stops distributed guessing against one account.
  const ek = "le:" + email + "|" + req.ip, eg = "lg:" + email;
  if (limited("li:" + req.ip, 150, 900e3) || over(ek, 10, 900e3) || over(eg, 100, 900e3)) return fail(res, 429, "too-many-requests");
  const r = await pool.query("SELECT id,email,pass_hash FROM users WHERE email=$1", [email]);
  const u = r.rows[0];
  const ok = u ? await bcrypt.compare(pw, u.pass_hash) : await bcrypt.compare(pw, DUMMY_HASH);
  if (!u || !ok) { hit(ek); hit(eg); return fail(res, 401, "invalid-credential"); }
  hits.delete(ek);
  await createSession(req, res, u.id);
  res.json({ user: { email: u.email, isAdmin: isAdminEmail(u.email) } });
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
  const track = b.track === "lit" ? "lit" : "sci", lang = b.lang === "en" ? "en" : "ar";
  const target = Math.max(0, Math.min(100, Number(b.target) || 100));
  const examDate = /^\d{4}-\d{2}-\d{2}$/.test(b.examDate || "") ? b.examDate : "";
  const s = b.summary && typeof b.summary === "object" ? b.summary : {};
  const num = v => (typeof v === "number" && isFinite(v)) ? v : null;
  const summary = { est: num(s.est), readiness: num(s.readiness), solved: num(s.solved), acc: num(s.acc), models: num(s.models), streak: num(s.streak),
    lastActive: /^\d{4}-\d{2}-\d{2}$/.test(s.lastActive || "") ? s.lastActive : "" };
  await pool.query(`INSERT INTO progress(user_id,track,target,lang,exam_date,p,summary,updated_at) VALUES($1,$2,$3,$4,$5,$6,$7,now())
    ON CONFLICT (user_id) DO UPDATE SET track=$2,target=$3,lang=$4,exam_date=$5,p=$6,summary=$7,updated_at=now()`,
    [req.user.id, track, target, lang, examDate, p, summary]);
  res.json({ ok: true });
}));

// ---------- admin ----------
app.get("/api/admin/users", needAdmin, wrap(async (req, res) => {
  const r = await pool.query(`SELECT u.id,u.email,u.created_at,p.track,p.target,p.exam_date,p.summary,p.updated_at
    FROM users u LEFT JOIN progress p ON p.user_id=u.id ORDER BY p.updated_at DESC NULLS LAST LIMIT 5000`);
  res.json({ users: r.rows });
}));
app.delete("/api/admin/users/:id", needAdmin, wrap(async (req, res) => {
  await pool.query("DELETE FROM users WHERE id=$1", [req.params.id]); res.json({ ok: true });
}));
app.post("/api/admin/users/:id/reset-password", needAdmin, wrap(async (req, res) => {
  const AL = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O, 1/l/I, -/_ : easy to read aloud
  const temp = Array.from(crypto.randomBytes(10), b => AL[b % AL.length]).join("");
  const r = await pool.query("UPDATE users SET pass_hash=$1 WHERE id=$2 RETURNING email", [await bcrypt.hash(temp, 11), req.params.id]);
  if (!r.rows[0]) return fail(res, 404, "not-found");
  await pool.query("DELETE FROM sessions WHERE user_id=$1", [req.params.id]);
  res.json({ email: r.rows[0].email, tempPassword: temp });
}));

app.get("/healthz", (req, res) => { res.set("Cache-Control", "no-store"); res.send("ok"); });

// ---------- static site ----------
const PUB = path.join(__dirname, "public");
app.use((req, res, next) => { if (/^\/admin(\.html)?$/.test(req.path)) res.set("X-Robots-Tag", "noindex"); next(); });
app.get("/favicon.ico", (req, res) => res.redirect(301, "/favicon.svg"));
// gzip the big text assets (app.js is ~380 KB) without an extra dependency; cached per file mtime
const gzCache = new Map();
app.get(/^\/(app\.js|app\.css|admin\.js|cloud\.js)$/, (req, res, next) => {
  if (!/\bgzip\b/.test(req.get("Accept-Encoding") || "")) return next();
  const f = path.join(PUB, req.path.slice(1));
  fs.stat(f, (err, st) => {
    if (err) return next();
    let c = gzCache.get(f);
    if (!c || c.mtime !== st.mtimeMs) {
      try { c = { mtime: st.mtimeMs, gz: zlib.gzipSync(fs.readFileSync(f), { level: 9 }), etag: `W/"${st.size.toString(16)}-${Math.floor(st.mtimeMs).toString(16)}-gz"` }; }
      catch (e) { return next(); }
      gzCache.set(f, c);
    }
    res.set({ "Content-Type": (f.endsWith(".css") ? "text/css" : "application/javascript") + "; charset=UTF-8", "Content-Encoding": "gzip",
      "Vary": "Accept-Encoding", "Cache-Control": "no-cache", "ETag": c.etag, "Last-Modified": new Date(st.mtimeMs).toUTCString() });
    if (req.fresh) return res.status(304).end();
    res.send(c.gz);
  });
});
app.use(express.static(PUB, { extensions: ["html"], setHeaders: (res, f) => {
  if (/\.(js|css|html)$/.test(f)) res.set("Cache-Control", "no-cache");
  else if (/\.(svg|png|ico|webmanifest)$/.test(f)) res.set("Cache-Control", "public, max-age=604800");
} }));
app.use("/api", (req, res) => fail(res, 404, "not-found"));
app.use((req, res) => res.status(404).type("html").sendFile(path.join(PUB, "404.html"), e => { if (e) res.end("Not found"); }));
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
  const srv = app.listen(PORT, () => console.log(`Masar 100 running on :${PORT}`));
  const bye = () => { srv.close(() => pool.end().finally(() => process.exit(0))); setTimeout(() => process.exit(0), 8000).unref(); };
  process.on("SIGTERM", bye); process.on("SIGINT", bye);
}).catch(e => { console.error("Migration failed", e); process.exit(1); });

module.exports = { app, pool };
