// GAT Academy (أكاديمية القدرات) — Railway server: static site + email/password accounts + progress sync + admin API (Postgres)
const express = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");
const commerce = require("./commerce");
const oauth = require("./oauth");
const site = require("./site");

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
  const max = Math.max(2, Math.min(50, Number(process.env.PG_POOL_MAX) || 10));
  return { connectionString: url, ssl, max, connectionTimeoutMillis: 10000, idleTimeoutMillis: 30000 };
}
const pool = new Pool(dbConfig(process.env.DATABASE_URL));
pool.on("error", e => console.error("pg pool error (idle client):", e.message)); // don't crash when the DB restarts
// a stray rejection or exception must not take every student's session down with it: log it (with no request data),
// and on an uncaught exception shut down cleanly so Railway restarts the instance (restartPolicyType ON_FAILURE)
process.on("unhandledRejection", e => console.error("unhandledRejection", e && e.stack || e));
process.on("uncaughtException", e => { console.error("uncaughtException", e && e.stack || e); shutdown(1); });

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
  await checkSchema();
}
// Every column the code reads or writes. The migrations above are idempotent (IF NOT EXISTS everywhere), but a column
// dropped by hand is not recreated by CREATE TABLE IF NOT EXISTS; instead of serving 500s to every student, refuse to
// start with a message that names the problem (Railway then keeps the previous deployment running).
const SCHEMA = {
  users: "id email pass_hash created_at name google_id facebook_id",
  progress: "user_id track target lang exam_date p summary updated_at",
  sessions: "token_hash user_id expires_at",
  narration: "id mime data updated_at",
  settings: "key value updated_at",
  subscriptions: "id user_id plan_id source starts_at ends_at payment_id note created_by revoked_at created_at",
  payments: "id user_id email plan_id amount currency coupon status tap_id tap_status refunded_amount refund_id created_at paid_at provider ext_id days refunded_at",
  coupons: "code pct max_uses used expires_at plan_ids active note created_at",
  events: "id user_id type k v day at",
  admin_audit: "id admin_email action target meta at"
};
async function checkSchema() {
  const r = await pool.query("SELECT table_name t, column_name c FROM information_schema.columns WHERE table_schema='public'");
  const have = new Set(r.rows.map(x => x.t + "." + x.c));
  const missing = [];
  for (const t in SCHEMA) for (const c of SCHEMA[t].split(" ")) if (!have.has(t + "." + c)) missing.push(t + "." + c);
  if (!missing.length) return;
  throw new Error(`database schema check failed: missing ${missing.join(", ")}. ` +
    `A column the server needs was dropped or renamed. Restore it (for example ALTER TABLE ${missing[0].split(".")[0]} ADD COLUMN ${missing[0].split(".")[1]} …) ` +
    `or restore the database from a backup, then redeploy. Refusing to start so the previous deployment keeps serving.`);
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
// request log: one line for anything that failed on our side or was slow (Railway's HTTP logs already cover the rest);
// never the body, never an email
let closing = false, reqSeq = 0;
app.use((req, res, next) => {
  const t0 = Date.now(), id = (++reqSeq).toString(36);
  req.rid = id;
  if (closing) res.set("Connection", "close"); // draining: don't keep this socket open after the response
  res.on("finish", () => { const ms = Date.now() - t0; if ((res.statusCode >= 500 && res.statusCode !== 503) || ms > 2000) console.log(`req ${id} ${req.method} ${req.path} ${res.statusCode} ${ms}ms`); });
  next();
});
// a NUL byte cannot be stored in Postgres text and has no legitimate use in a URL: reject it before any handler runs
app.use((req, res, next) => (/%00/i.test(req.url) ? res.status(400).json({ error: "bad-request" }) : next()));
// JSON bodies: 2 MB only where it is needed (progress p may be up to 900k chars, and JSON escaping inflates it;
// admin settings can be large); everything else is small, so a 100 KB cap keeps anonymous requests cheap
const bigJson = express.json({ limit: "2mb" }), smallJson = express.json({ limit: "100kb" });
app.use((req, res, next) => (req.path === "/api/progress" || req.path.startsWith("/api/admin/") ? bigJson : smallJson)(req, res, next));
// strings inside the parsed body and query: drop NUL bytes (Postgres rejects them in text and jsonb) without recursion,
// so a deeply nested or very wide body cannot blow the stack; past the budget the rest is left as is (handlers only read known keys)
function stripNul(root) {
  if (!root || typeof root !== "object") return;
  const stack = [root]; let budget = 20000;
  while (stack.length && budget-- > 0) {
    const o = stack.pop();
    for (const k of Object.keys(o)) { const v = o[k]; if (typeof v === "string") { if (v.includes("\0")) o[k] = v.replace(/\0/g, ""); } else if (v && typeof v === "object") stack.push(v); }
  }
}
app.use((req, res, next) => { stripNul(req.body); stripNul(req.query); next(); });

// security headers
app.use((req, res, next) => {
  res.set({
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
  });
  if (req.secure) res.set("Strict-Transport-Security", "max-age=31536000");
  next();
});

const PUB = path.join(__dirname, "public");
const S = site(app, { PUB, loadConfig: async () => C.publicCfg(await C.loadCfg()) });
app.use(S.compressSends);

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
// bcryptjs is pure JavaScript: one cost-11 hash is ~150 ms of CPU, and on the main thread a class signing in together
// stalls every other request (measured: 50 simultaneous sign-ups took 10 s each, p95 of all API calls ~2 s).
// Hashing runs in a small worker pool instead (same library, same hashes); if a worker fails, we fall back in-thread.
const PW = (() => {
  const { Worker } = require("worker_threads");
  const n = Math.max(1, Math.min(4, (require("os").availableParallelism ? require("os").availableParallelism() : 2) - 1, Number(process.env.BCRYPT_WORKERS) || 4));
  const code = `const b=require(${JSON.stringify(require.resolve("bcryptjs"))}),{parentPort}=require("worker_threads");
    parentPort.on("message",m=>{let r,err;try{r=m.op==="hash"?b.hashSync(m.a,m.b):b.compareSync(m.a,m.b);}catch(e){err=String(e&&e.message||e);}parentPort.postMessage({id:m.id,r,err});});`;
  const workers = [], waiting = new Map(); let seq = 0, rr = 0;
  const spawnOne = i => { const w = new Worker(code, { eval: true }); w.unref();
    w.on("message", m => { const p = waiting.get(m.id); if (!p) return; waiting.delete(m.id); m.err ? p.reject(new Error(m.err)) : p.resolve(m.r); });
    w.on("error", e => { console.error("bcrypt worker", e.message); workers[i] = null; for (const [id, p] of waiting) if (p.w === w) { waiting.delete(id); p.fallback(); } });
    workers[i] = w; };
  for (let i = 0; i < n; i++) spawnOne(i);
  const run = (op, a, b) => new Promise((resolve, reject) => {
    const fallback = () => (op === "hash" ? bcrypt.hash(a, b) : bcrypt.compare(a, b)).then(resolve, reject);
    const live = workers.filter(Boolean); if (!live.length) return fallback();
    const w = live[rr++ % live.length], id = ++seq;
    waiting.set(id, { resolve, reject, fallback, w }); w.postMessage({ id, op, a, b });
  });
  return { hash: (pw, cost) => run("hash", String(pw), cost), compare: (pw, h) => run("compare", String(pw), String(h)), size: n };
})();
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
  if (tok && tok.length <= 200) {
    const r = await pool.query("SELECT u.id,u.email,u.name,s.expires_at FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=$1 AND s.expires_at>now()", [sha(tok)]);
    const row = r.rows[0];
    if (row) {
      req.user = { id: row.id, email: row.email, name: row.name };
      // sliding expiry: a session used in its second half is renewed for another full period, so an active student is
      // never logged out mid-preparation; an abandoned device still expires after SESSION_DAYS
      if (new Date(row.expires_at).getTime() - Date.now() < SESSION_DAYS * 43200e3) {
        await pool.query("UPDATE sessions SET expires_at=now() + ($2 || ' days')::interval WHERE token_hash=$1", [sha(tok), String(SESSION_DAYS)]);
        setCookie(req, res, tok, SESSION_DAYS * 86400);
      }
    }
  }
  next();
}
const needUser = (req, res, next) => req.user ? next() : fail(res, 401, "unauthenticated");
const needAdmin = (req, res, next) => !req.user ? fail(res, 401, "unauthenticated") : isAdminEmail(req.user.email) ? next() : fail(res, 403, "forbidden");
// CSRF guard: state-changing API calls must carry our header (browsers block it cross-site without CORS)
// (payment-provider webhooks are server-to-server and verified by signature instead)
const WEBHOOKS = new Set(["/billing/webhook", "/billing/refund-webhook", "/billing/moyasar/callback"]);
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
  // a taken address answers before the (slow) hash, so a flood of sign-ups for one address cannot burn CPU
  if ((await pool.query("SELECT 1 FROM users WHERE email=$1", [email])).rows[0]) return fail(res, 409, "email-already-in-use");
  const id = crypto.randomUUID(), hash = await PW.hash(pw, 11);
  try { await pool.query("INSERT INTO users(id,email,pass_hash,name) VALUES($1,$2,$3,$4)", [id, email, hash, name]); }
  catch (e) { if (e.code === "23505") return fail(res, 409, "email-already-in-use"); throw e; }
  if (isAdminEmail(email)) console.log(`admin account claimed: ${email}`);
  await createSession(req, res, id);
  res.json({ user: { ...pub({ email, name }), plan: await C.planOf({ id, email }) } });
}));

app.post("/api/login", wrap(async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase(), pw = String(req.body.password || "");
  if (email.length > 254 || pw.length > 200) return fail(res, 401, "invalid-credential"); // nothing that long was ever accepted at sign-up
  // Limits: 150 attempts / 15 min per IP (classrooms share one IP).
  // Failed attempts are counted per email+IP (10 / 15 min), so someone guessing from their own device
  // cannot lock the real student out on another device. A per-email ceiling (100 failures / 15 min) still stops
  // distributed guessing, but it only applies to IPs that have already failed on that account: an attacker spraying
  // wrong passwords from many addresses cannot lock the real student (whose own device has no failures) out.
  const ek = "le:" + email + "|" + req.ip, eg = "lg:" + email;
  if (limited("li:" + req.ip, 150, 900e3) || over(ek, 10, 900e3) || (recent(ek, 900e3).length && over(eg, 100, 900e3))) return fail(res, 429, "too-many-requests");
  const r = await pool.query("SELECT id,email,name,pass_hash FROM users WHERE email=$1", [email]);
  const u = r.rows[0];
  const ok = await PW.compare(pw, u ? u.pass_hash : DUMMY_HASH);
  if (!u || !ok) { hit(ek); hit(eg); return fail(res, 401, "invalid-credential"); }
  hits.delete(ek);
  await createSession(req, res, u.id);
  res.json({ user: { ...pub(u), plan: await C.planOf(u) } });
}));

app.post("/api/logout", wrap(async (req, res) => {
  const tok = parseCookies(req)[COOKIE]; if (tok) await pool.query("DELETE FROM sessions WHERE token_hash=$1", [sha(tok)]);
  setCookie(req, res, "", 0); res.json({ ok: true });
}));
// sign out everywhere: every session of this account is removed. With {keep:true} the current one stays
// ("sign out my other devices"); otherwise the cookie is cleared too and the student signs in again.
app.post("/api/logout-all", needUser, wrap(async (req, res) => {
  const tok = parseCookies(req)[COOKIE] || "";
  const keep = req.body && req.body.keep === true;
  const r = keep ? await pool.query("DELETE FROM sessions WHERE user_id=$1 AND token_hash<>$2", [req.user.id, sha(tok)])
    : await pool.query("DELETE FROM sessions WHERE user_id=$1", [req.user.id]);
  if (!keep) setCookie(req, res, "", 0);
  res.json({ ok: true, removed: r.rowCount });
}));

app.post("/api/password", needUser, wrap(async (req, res) => {
  const cur = String(req.body.current || ""), next = String(req.body.next || "");
  if (next.length < 8 || next.length > 200) return fail(res, 400, "weak-password");
  if (over("pw:" + req.user.id, 10, 900e3)) return fail(res, 429, "too-many-requests");
  const r = await pool.query("SELECT pass_hash FROM users WHERE id=$1", [req.user.id]);
  if (!(await PW.compare(cur, r.rows[0].pass_hash))) { hit("pw:" + req.user.id); return fail(res, 401, "invalid-credential"); }
  await pool.query("UPDATE users SET pass_hash=$1 WHERE id=$2", [await PW.hash(next, 11), req.user.id]);
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
// Saving is one atomic UPSERT (never a partial row). Optional optimistic concurrency: when the client sends `base`
// (the updatedAt it last received from GET or PUT) and the stored copy is newer, nothing is written and the server
// answers 409 {error:"conflict", p, updatedAt} so the client can merge and save again. Without `base` the last
// writer wins (the behaviour older clients rely on). updated_at is compared at millisecond precision (JSON dates).
app.put("/api/progress", needUser, wrap(async (req, res) => {
  if (limited("pg:" + req.user.id, 60, 60e3)) return fail(res, 429, "too-many-requests");
  const b = req.body || {};
  const p = typeof b.p === "string" ? b.p : null;
  if (!p || p.length > 900000) return fail(res, 400, "bad-progress");
  try { JSON.parse(p); } catch (e) { return fail(res, 400, "bad-progress"); }
  const track = b.track === "lit" ? "lit" : "sci", lang = b.lang === "en" ? "en" : "ar";
  const target = Math.max(0, Math.min(100, Number(b.target) || 100));
  const isDay = v => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v);
  const examDate = isDay(b.examDate) ? b.examDate : "";
  const s = b.summary && typeof b.summary === "object" && !Array.isArray(b.summary) ? b.summary : {};
  const num = v => (typeof v === "number" && isFinite(v)) ? v : null;
  const summary = { est: num(s.est), readiness: num(s.readiness), solved: num(s.solved), acc: num(s.acc), models: num(s.models), streak: num(s.streak),
    lastActive: isDay(s.lastActive) ? s.lastActive : "" };
  let base = null;
  if (typeof b.base === "string" && b.base) { const d = new Date(b.base); if (isNaN(d)) return fail(res, 400, "bad-base"); base = d.toISOString(); }
  const r = await pool.query(`INSERT INTO progress(user_id,track,target,lang,exam_date,p,summary,updated_at) VALUES($1,$2,$3,$4,$5,$6,$7,now())
    ON CONFLICT (user_id) DO UPDATE SET track=$2,target=$3,lang=$4,exam_date=$5,p=$6,summary=$7,updated_at=now()
    WHERE $8::timestamptz IS NULL OR date_trunc('milliseconds', progress.updated_at) <= $8::timestamptz
    RETURNING updated_at`,
    [req.user.id, track, target, lang, examDate, p, summary, base]);
  if (!r.rows[0]) {
    const cur = (await pool.query("SELECT p, updated_at FROM progress WHERE user_id=$1", [req.user.id])).rows[0];
    return res.status(409).json({ error: "conflict", p: cur ? cur.p : null, updatedAt: cur ? cur.updated_at : null });
  }
  res.json({ ok: true, updatedAt: r.rows[0].updated_at });
}));

// ---------- admin ----------
app.delete("/api/admin/users/:id", needAdmin, wrap(async (req, res) => {
  const r = await pool.query("DELETE FROM users WHERE id=$1 RETURNING email", [req.params.id]);
  if (!r.rows[0]) return res.status(404).json({ error: "not-found" });
  await pool.query("INSERT INTO admin_audit(admin_email,action,target) VALUES($1,'delete_user',$2)", [req.user.email, r.rows[0] ? r.rows[0].email : req.params.id]);
  res.json({ ok: true });
}));
app.post("/api/admin/users/:id/reset-password", needAdmin, wrap(async (req, res) => {
  const AL = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O, 1/l/I, -/_ : easy to read aloud
  const temp = Array.from(crypto.randomBytes(10), b => AL[b % AL.length]).join("");
  const r = await pool.query("UPDATE users SET pass_hash=$1 WHERE id=$2 RETURNING email", [await PW.hash(temp, 11), req.params.id]);
  if (!r.rows[0]) return fail(res, 404, "not-found");
  await pool.query("DELETE FROM sessions WHERE user_id=$1", [req.params.id]);
  await pool.query("INSERT INTO admin_audit(admin_email,action,target) VALUES($1,'reset_password',$2)", [req.user.email, r.rows[0].email]);
  res.json({ email: r.rows[0].email, tempPassword: temp });
}));

const ORIGIN = "https://" + (CANONICAL_HOST || "gat.academy");
app.get("/robots.txt", (req, res) => {
  res.type("text/plain").set("Cache-Control", "public, max-age=86400")
    .send(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /admin.html\nDisallow: /api/\nDisallow: /auth/\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);
});
app.get("/sitemap.xml", (req, res) => {
  const alt = (ar, en) => `<xhtml:link rel="alternate" hreflang="ar" href="${ar}"/><xhtml:link rel="alternate" hreflang="en" href="${en}"/><xhtml:link rel="alternate" hreflang="x-default" href="${ar}"/>`;
  const home = ORIGIN + "/", homeEn = ORIGIN + "/?lang=en";
  res.type("application/xml").set("Cache-Control", "public, max-age=86400")
    .send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
      `<url><loc>${home}</loc>${alt(home, homeEn)}</url>\n<url><loc>${homeEn}</loc>${alt(home, homeEn)}</url>\n` +
      `<url><loc>${ORIGIN}/app</loc></url>\n<url><loc>${ORIGIN}/privacy</loc></url>\n<url><loc>${ORIGIN}/terms</loc></url>\n</urlset>\n`);
});
// ---------- explainer narration (public) ----------
// Narration clips live in Postgres (table narration); data/tracks.json maps each explainer to its clips + beat timings.
// data/clip_urls.json, when present, lists freshly generated clips ({id,url}) that are imported once at startup.
const TRACKS_FILE = path.join(__dirname, "data", "tracks.json");
app.get("/audio/tracks.json", (req, res, next) => {
  if (!fs.existsSync(TRACKS_FILE)) return res.set("Cache-Control", "no-cache").json({});
  fs.readFile(TRACKS_FILE, (e, buf) => e ? next(e) : S.sendBody(req, res, buf, { type: "application/json; charset=utf-8", cache: "no-cache" }).catch(next));
});
app.get("/audio/index.json", wrap(async (req, res) => {
  const r = await pool.query("SELECT id FROM narration ORDER BY id");
  res.set("Cache-Control", "no-cache").json(r.rows.map(x => x.id));
}));
// clips are kept in a small in-memory cache: browsers (Safari especially) fetch audio in many range requests,
// and each used to read the whole clip from Postgres
const clipCache = new Map(); let clipBytes = 0; const CLIP_MAX = 48 * 1024 * 1024;
const forgetClip = id => { const c = clipCache.get(id); if (c) { clipBytes -= c.data.length; clipCache.delete(id); } };
async function loadClip(id) {
  const c = clipCache.get(id);
  if (c && Date.now() - c.at < 600e3) { clipCache.delete(id); clipCache.set(id, c); return c; }
  const r = await pool.query("SELECT mime, data, updated_at FROM narration WHERE id=$1", [id]);
  forgetClip(id);
  const row = r.rows[0]; if (!row) return null;
  const n = { mime: row.mime, data: row.data, mod: new Date(row.updated_at), etag: `"${row.data.length.toString(16)}-${new Date(row.updated_at).getTime().toString(16)}"`, at: Date.now() };
  if (n.data.length < 8e6) { clipCache.set(id, n); clipBytes += n.data.length; for (const [k] of clipCache) { if (clipBytes <= CLIP_MAX) break; forgetClip(k); } }
  return n;
}
app.get("/audio/:id.mp3", wrap(async (req, res) => {
  if (!/^[\w-]{1,64}$/.test(req.params.id)) return res.status(404).end();
  const row = await loadClip(req.params.id);
  if (!row) return res.status(404).end();
  const buf = row.data, total = buf.length;
  // premium clips (marked by the guard in commerce.js) must never be stored by a shared cache
  res.set({ "Content-Type": row.mime, "Accept-Ranges": "bytes", "Cache-Control": (res.get("X-Premium") ? "private" : "public") + ", max-age=604800", "ETag": row.etag, "Last-Modified": row.mod.toUTCString() });
  if (req.fresh) return res.status(304).end();
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
      forgetClip(c.id);
      ok++;
    } catch (e) { bad++; console.error("narration import failed", c.id, e.message); }
  }
  console.log(`narration import: ${ok} stored, ${skip} already present, ${bad} failed`);
}
// health: a cheap SELECT 1 with a short deadline, so a wedged database or an exhausted pool shows up as 503 instead of
// a green check on a server that cannot serve anyone; 503 while shutting down so no new traffic is routed here
app.get("/healthz", (req, res) => {
  res.set("Cache-Control", "no-store");
  if (closing) return res.status(503).type("text").send("shutting down");
  let done = false;
  const t = setTimeout(() => { if (!done) { done = true; res.status(503).type("text").send("db timeout"); } }, 3000);
  pool.query("SELECT 1").then(() => { if (!done) { done = true; clearTimeout(t); res.type("text").send("ok"); } },
    e => { if (!done) { done = true; clearTimeout(t); console.error("healthz db", e.message); res.status(503).type("text").send("db error"); } });
});

// ---------- static site ----------
app.use((req, res, next) => { if (/^\/admin(\.html)?$/.test(req.path)) res.set("X-Robots-Tag", "noindex"); next(); });
app.get("/favicon.ico", (req, res) => res.redirect(301, "/favicon.svg"));
// HTML pages are rendered with versioned asset URLs (/app.js?v=<hash>) so those assets can be cached for a year
// "/" is the marketing page for visitors; signed-in students go straight to the app at /app
app.get("/", wrap(async (req, res) => {
  const tok = parseCookies(req)[COOKIE];
  if (tok && req.query.home === undefined) { const r = await pool.query("SELECT 1 FROM sessions WHERE token_hash=$1 AND expires_at>now()", [sha(tok)]); if (r.rows[0]) return res.redirect(302, "/app"); }
  await S.sendLanding(req, res);
}));
const qs = req => { const i = req.originalUrl.indexOf("?"); return i < 0 ? "" : req.originalUrl.slice(i); };
app.get(["/index.html", "/index"], (req, res) => res.redirect(301, "/" + qs(req)));
app.get("/app.html", (req, res) => res.redirect(301, "/app" + qs(req)));
app.get(["/app", "/app/"], (req, res) => { S.sendPage(req, res, "app.html") || res.status(500).end(); });
app.get(/^\/(privacy|terms|admin)(\.html)?$/, (req, res, next) => { S.sendPage(req, res, req.params[0] + ".html") || next(); });
app.get(["/404", "/404.html"], (req, res) => S.sendPage(req, res, "404.html", { status: 404 }));
app.use(S.staticText); // js, css, svg, json…: brotli/gzip, a year of caching for versioned URLs, ETag revalidation otherwise
app.use(express.static(PUB, { index: false, setHeaders: (res, f) => {
  const v = res.req && typeof res.req.query.v === "string" && res.req.query.v;
  if (v && v === S.verOf(path.relative(PUB, f).split(path.sep).join("/"))) res.set("Cache-Control", "public, max-age=31536000, immutable");
  else if (/\.(png|ico|jpg|webp)$/.test(f)) res.set("Cache-Control", "public, max-age=604800");
  else res.set("Cache-Control", "no-cache");
} }));
app.use("/api", (req, res) => fail(res, 404, "not-found"));
app.use((req, res) => { if (!S.sendPage(req, res, "404.html", { status: 404 })) res.status(404).type("text").send("Not found"); });
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  // body-parser / raw-body problems are the client's: a stable code, no log line
  if (err && (err.type === "entity.parse.failed" || err.type === "entity.too.large" || err.type === "encoding.unsupported" || err.type === "charset.unsupported")) {
    const tooBig = err.type === "entity.too.large";
    return fail(res, tooBig ? 413 : 400, tooBig ? "too-large" : "bad-json");
  }
  const st = err && (err.status || err.statusCode);
  if (st >= 400 && st < 500) return fail(res, st, "bad-request"); // e.g. a malformed or aborted body stream
  console.error(`req ${req.rid || "-"} ${req.method} ${req.path} failed:`, err && err.stack || err);
  if (req.path.startsWith("/api")) return fail(res, 500, "server");
  res.status(500).type("text").send("Server error");
});

// hourly cleanup of expired sessions
setInterval(() => pool.query("DELETE FROM sessions WHERE expires_at<now()").catch(() => {}), 3600e3).unref();

// Admin access is granted to whoever owns an ADMIN_EMAILS address, so an address without an account is a standing
// invitation: say so loudly at every start until the owner has signed up with it.
async function checkAdmins() {
  for (const e of ADMIN_EMAILS) {
    const r = await pool.query("SELECT 1 FROM users WHERE email=$1", [e]).catch(() => ({ rows: [] }));
    if (!r.rows[0]) console.warn(`WARNING: ADMIN_EMAILS lists ${e} but no account with that address exists yet. The first person to sign up with it becomes an admin: sign up now to claim it.`);
  }
}

// Graceful shutdown (Railway sends SIGTERM on every deploy, then SIGKILL after the service's draining time):
// stop accepting connections, let in-flight requests finish, close the pool, exit. SHUTDOWN_GRACE_MS caps the wait.
let srv = null;
function shutdown(code = 0) {
  if (closing) return; closing = true;
  const grace = Math.max(1000, Number(process.env.SHUTDOWN_GRACE_MS) || 8000);
  const finish = () => pool.end().catch(() => {}).finally(() => process.exit(code));
  if (!srv) return finish();
  srv.close(finish);
  // keep-alive sockets of requests that finish during the drain become idle afterwards: sweep them so we exit promptly
  if (srv.closeIdleConnections) { srv.closeIdleConnections(); setInterval(() => srv.closeIdleConnections(), 200).unref(); }
  setTimeout(() => { console.error(`shutdown: in-flight requests still open after ${grace} ms, exiting`); process.exit(code); }, grace).unref();
}

migrate().then(() => {
  srv = app.listen(PORT, () => { console.log(`GAT Academy running on :${PORT} (node ${process.version}, pool max ${pool.options.max}, ${PW.size} hash worker(s))`); S.warm(); });
  // keep idle connections open longer than the platform's proxy does, so it never reuses a socket we just closed (sporadic 502s)
  srv.keepAliveTimeout = 65e3; srv.headersTimeout = 66e3;
  importNarration().catch(e => console.error("narration import", e.message));
  checkAdmins().catch(() => {});
  process.on("SIGTERM", () => shutdown(0)); process.on("SIGINT", () => shutdown(0));
}).catch(e => { console.error("Startup failed:", e && e.message || e); process.exit(1); });

module.exports = { app, pool };
