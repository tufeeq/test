// Sign in with Google / Facebook (OAuth 2.0 authorization-code flow, no extra dependencies).
// Enabled per provider when its credentials are set in the environment:
//   GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET     (Google Cloud Console → OAuth client, type "Web application")
//   FACEBOOK_APP_ID, FACEBOOK_APP_SECRET       (Meta for Developers → Facebook Login)
// Redirect URIs to register with each provider:  https://<host>/auth/google/callback  and  https://<host>/auth/facebook/callback
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const FB_V = "v19.0";
const enabled = () => ({
  google: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
  facebook: !!(process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET)
});

module.exports = function oauth(app, { pool, wrap, createSession, cleanName, parseCookies, limited }) {
  const base = req => (process.env.PUBLIC_URL || ("https://" + (process.env.CANONICAL_HOST || req.headers.host))).replace(/\/$/, "");
  const safeNext = n => (typeof n === "string" && /^\/app(?:[?#][^\s]*)?$/.test(n) && n.length < 300) ? n : "/app";
  const back = (res, next, err) => res.redirect(302, err ? "/app#signin?err=" + encodeURIComponent(err) : safeNext(next));
  function setState(req, res, provider, next) {
    const state = crypto.randomBytes(24).toString("base64url");
    const val = Buffer.from(JSON.stringify({ s: state, p: provider, n: safeNext(next), t: Date.now() })).toString("base64url");
    res.append("Set-Cookie", `oas=${val}; Path=/auth; HttpOnly; SameSite=Lax; Max-Age=600${req.secure ? "; Secure" : ""}`);
    return state;
  }
  function takeState(req, res, provider) {
    res.append("Set-Cookie", `oas=; Path=/auth; HttpOnly; SameSite=Lax; Max-Age=0${req.secure ? "; Secure" : ""}`);
    try {
      const o = JSON.parse(Buffer.from(parseCookies(req).oas || "", "base64url").toString());
      if (!o || o.p !== provider || Date.now() - o.t > 600e3) return null;
      const a = Buffer.from(String(req.query.state || "")), b = Buffer.from(o.s);
      return a.length === b.length && crypto.timingSafeEqual(a, b) ? o : null;
    } catch (e) { return null; }
  }
  async function getJSON(url, opt) { const r = await fetch(url, opt); const j = await r.json().catch(() => ({})); if (!r.ok) throw new Error(r.status + " " + JSON.stringify(j).slice(0, 200)); return j; }

  // find the account by provider id, else by (verified) email — linking it — else create one
  async function signInWith(provider, pid, email, name) {
    const col = provider === "google" ? "google_id" : "facebook_id";
    let u = (await pool.query(`SELECT id,email,name FROM users WHERE ${col}=$1`, [pid])).rows[0];
    if (!u && email) {
      u = (await pool.query("SELECT id,email,name FROM users WHERE email=$1", [email])).rows[0];
      if (u) await pool.query(`UPDATE users SET ${col}=$1 WHERE id=$2`, [pid, u.id]);
    }
    if (!u) {
      if (!email) return { error: "no-email" };
      let nm = cleanName(name); if (nm.length < 2 || nm.length > 60) nm = cleanName(email.split("@")[0]).slice(0, 60) || "طالب";
      const id = crypto.randomUUID(), hash = await bcrypt.hash(crypto.randomBytes(24).toString("base64url"), 11); // no usable password until they set one
      await pool.query(`INSERT INTO users(id,email,pass_hash,name,${col}) VALUES($1,$2,$3,$4,$5)`, [id, email, hash, nm, pid]);
      u = { id, email, name: nm, created: true };
    } else if (!u.name && name) { const nm = cleanName(name); if (nm.length >= 2 && nm.length <= 60) await pool.query("UPDATE users SET name=$1 WHERE id=$2", [nm, u.id]); }
    return { user: u };
  }

  // ---------- Google ----------
  app.get("/auth/google", (req, res) => {
    if (!enabled().google) return back(res, null, "unavailable");
    if (limited("oa:" + req.ip, 60, 3600e3)) return back(res, null, "busy");
    const state = setState(req, res, "google", req.query.next);
    const q = new URLSearchParams({ client_id: process.env.GOOGLE_CLIENT_ID, redirect_uri: base(req) + "/auth/google/callback", response_type: "code", scope: "openid email profile", state, prompt: "select_account" });
    res.redirect(302, "https://accounts.google.com/o/oauth2/v2/auth?" + q);
  });
  app.get("/auth/google/callback", wrap(async (req, res) => {
    const st = takeState(req, res, "google");
    if (!st) return back(res, null, "expired");
    if (req.query.error || !req.query.code) return back(res, null, "cancelled");
    try {
      const tok = await getJSON("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ code: String(req.query.code), client_id: process.env.GOOGLE_CLIENT_ID, client_secret: process.env.GOOGLE_CLIENT_SECRET, redirect_uri: base(req) + "/auth/google/callback", grant_type: "authorization_code" }) });
      const info = await getJSON("https://openidconnect.googleapis.com/v1/userinfo", { headers: { Authorization: "Bearer " + tok.access_token } });
      if (!info.sub || !info.email || info.email_verified === false) return back(res, null, "no-email");
      const r = await signInWith("google", String(info.sub), String(info.email).toLowerCase(), info.name);
      if (r.error) return back(res, null, r.error);
      await createSession(req, res, r.user.id);
      back(res, st.n);
    } catch (e) { console.error("google oauth", e.message); back(res, null, "failed"); }
  }));

  // ---------- Facebook ----------
  app.get("/auth/facebook", (req, res) => {
    if (!enabled().facebook) return back(res, null, "unavailable");
    if (limited("oa:" + req.ip, 60, 3600e3)) return back(res, null, "busy");
    const state = setState(req, res, "facebook", req.query.next);
    const q = new URLSearchParams({ client_id: process.env.FACEBOOK_APP_ID, redirect_uri: base(req) + "/auth/facebook/callback", state, scope: "email,public_profile", response_type: "code" });
    res.redirect(302, `https://www.facebook.com/${FB_V}/dialog/oauth?` + q);
  });
  app.get("/auth/facebook/callback", wrap(async (req, res) => {
    const st = takeState(req, res, "facebook");
    if (!st) return back(res, null, "expired");
    if (req.query.error || !req.query.code) return back(res, null, "cancelled");
    try {
      const tok = await getJSON(`https://graph.facebook.com/${FB_V}/oauth/access_token?` + new URLSearchParams({ client_id: process.env.FACEBOOK_APP_ID, client_secret: process.env.FACEBOOK_APP_SECRET, redirect_uri: base(req) + "/auth/facebook/callback", code: String(req.query.code) }));
      const proof = crypto.createHmac("sha256", process.env.FACEBOOK_APP_SECRET).update(tok.access_token).digest("hex");
      const me = await getJSON(`https://graph.facebook.com/${FB_V}/me?` + new URLSearchParams({ fields: "id,name,email", access_token: tok.access_token, appsecret_proof: proof }));
      if (!me.id) return back(res, null, "failed");
      const r = await signInWith("facebook", String(me.id), me.email ? String(me.email).toLowerCase() : null, me.name);
      if (r.error) return back(res, null, r.error);
      await createSession(req, res, r.user.id);
      back(res, st.n);
    } catch (e) { console.error("facebook oauth", e.message); back(res, null, "failed"); }
  }));

  return { enabled, migrate: () => pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id TEXT UNIQUE; ALTER TABLE users ADD COLUMN IF NOT EXISTS facebook_id TEXT UNIQUE;") };
};
module.exports.enabled = enabled;
