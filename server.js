// Masar 100 — Railway server: static site + email/password accounts + progress sync + admin API (Postgres)
const express = require("express");
const path = require("path");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");

const PORT = process.env.PORT || 3000;
const SESSION_DAYS = Number(process.env.SESSION_DAYS || 60);
const ADMIN_EMAILS = String(process.env.ADMIN_EMAILS || "").split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
if (!process.env.DATABASE_URL) { console.error("DATABASE_URL is not set. Add a Postgres database to this Railway project."); process.exit(1); }

const needsSSL = /sslmode=require/.test(process.env.DATABASE_URL) || process.env.PGSSL === "1";
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: needsSSL ? { rejectUnauthorized: false } : undefined, max: 10 });

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
app.use(express.json({ limit: "1mb" }));

// security headers
app.use((req, res, next) => {
  res.set({
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
  });
  if (req.secure) res.set("Strict-Transport-Security", "max-age=15552000");
  next();
});

// ---------- helpers ----------
const sha = s => crypto.createHash("sha256").update(s).digest("hex");
const COOKIE = "m100";
function parseCookies(req) { const o = {}; (req.headers.cookie || "").split(";").forEach(c => { const i = c.indexOf("="); if (i > 0) o[c.slice(0, i).trim()] = decodeURIComponent(c.slice(i + 1).trim()); }); return o; }
function setCookie(req, res, token, maxAgeSec) {
  const parts = [`${COOKIE}=${token}`, "Path=/", "HttpOnly", "SameSite=Lax", `Max-Age=${maxAgeSec}`];
  if (req.secure) parts.push("Secure");
  res.set("Set-Cookie", parts.join("; "));
}
const fail = (res, status, code) => res.status(status).json({ error: code });
const validEmail = e => typeof e === "string" && e.length <= 254 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 11);
const isAdminEmail = e => ADMIN_EMAILS.includes(String(e || "").toLowerCase());

// simple in-memory rate limit
const hits = new Map();
function limited(key, max, windowMs) {
  const now = Date.now(), h = (hits.get(key) || []).filter(t => now - t < windowMs);
  h.push(now); hits.set(key, h); return h.length > max;
}
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
const needAdmin = (req, res, next) => req.user && isAdminEmail(req.user.email) ? next() : fail(res, 403, "forbidden");
// CSRF guard: state-changing API calls must carry our header (browsers block it cross-site without CORS)
app.use("/api", (req, res, next) => (req.method === "GET" || req.get("X-Masar") === "1") ? next() : fail(res, 403, "bad-origin"));
const wrap = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
app.use("/api", wrap(auth));

// ---------- account ----------
app.get("/api/me", (req, res) => res.json({ user: req.user ? { email: req.user.email, isAdmin: isAdminEmail(req.user.email) } : null }));

app.post("/api/signup", wrap(async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase(), pw = String(req.body.password || "");
  if (limited("su:" + req.ip, 10, 3600e3)) return fail(res, 429, "too-many-requests");
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
  if (limited("li:" + req.ip, 30, 900e3) || limited("le:" + email, 10, 900e3)) return fail(res, 429, "too-many-requests");
  const r = await pool.query("SELECT id,email,pass_hash FROM users WHERE email=$1", [email]);
  const u = r.rows[0];
  const ok = u ? await bcrypt.compare(pw, u.pass_hash) : await bcrypt.compare(pw, DUMMY_HASH);
  if (!u || !ok) return fail(res, 401, "invalid-credential");
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
  const r = await pool.query("SELECT pass_hash FROM users WHERE id=$1", [req.user.id]);
  if (!(await bcrypt.compare(cur, r.rows[0].pass_hash))) return fail(res, 401, "invalid-credential");
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
  const temp = crypto.randomBytes(6).toString("base64url");
  const r = await pool.query("UPDATE users SET pass_hash=$1 WHERE id=$2 RETURNING email", [await bcrypt.hash(temp, 11), req.params.id]);
  if (!r.rows[0]) return fail(res, 404, "not-found");
  await pool.query("DELETE FROM sessions WHERE user_id=$1", [req.params.id]);
  res.json({ email: r.rows[0].email, tempPassword: temp });
}));

app.get("/healthz", (req, res) => res.send("ok"));

// ---------- static site ----------
app.use((req, res, next) => { if (req.path === "/admin.html") res.set("X-Robots-Tag", "noindex"); next(); });
app.use(express.static(path.join(__dirname, "public"), { extensions: ["html"], setHeaders: (res, f) => { if (/\.(js|css|html)$/.test(f)) res.set("Cache-Control", "no-cache"); } }));
app.use("/api", (req, res) => fail(res, 404, "not-found"));
app.use((err, req, res, next) => { console.error(err); if (req.path.startsWith("/api")) return fail(res, 500, "server"); res.status(500).send("Server error"); });

// hourly cleanup of expired sessions
setInterval(() => pool.query("DELETE FROM sessions WHERE expires_at<now()").catch(() => {}), 3600e3).unref();

migrate().then(() => app.listen(PORT, () => console.log(`Masar 100 running on :${PORT}`)))
  .catch(e => { console.error("Migration failed", e); process.exit(1); });

module.exports = { app, pool };
