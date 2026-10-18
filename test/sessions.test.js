// Sessions & auth: cookie flags, lifetime and sliding renewal, sign out everywhere, deleted accounts, password change,
// rate limits per IP and per account (and the lockout design), open-redirect attempts on /auth/*, OAuth state checks.
// The OAuth callback checks need the server started with test/mock-oauth.cjs (OAUTH_MOCKED=1, done by run.js).
"use strict";
const { client, signup, admin, sql, ok, section, run, uid, raw, BASE } = require("./lib");
const SESSION_DAYS = Number(process.env.SESSION_DAYS || 60);
const OCT = 1 + (Date.now() % 250); // a fresh /16 per run: the in-memory limiter remembers IPs for an hour
const ip = n => ({ "X-Forwarded-For": `10.${OCT}.${(n >> 8) & 255}.${n & 255}` });

run(async () => {
  const runId = uid();
  const email = `ses_${runId}@t.com`, pw = "password123";

  section("cookie flags");
  let c = client();
  const r0 = await fetch(BASE + "/api/signup", { method: "POST", headers: { "Content-Type": "application/json", "X-Masar": "1" }, body: JSON.stringify({ email, password: pw, name: "Sessions", consent: true }) });
  const sc = r0.headers.get("set-cookie") || "";
  ok(/^m100=[\w-]{40,}; Path=\/; HttpOnly; SameSite=Lax; Max-Age=\d+$/.test(sc), "plain http: HttpOnly, SameSite=Lax, Path=/, Max-Age, no Secure", sc);
  ok(new RegExp(`Max-Age=${SESSION_DAYS * 86400}`).test(sc), `Max-Age is ${SESSION_DAYS} days`, sc);
  const r1 = await fetch(BASE + "/api/login", { method: "POST", headers: { "Content-Type": "application/json", "X-Masar": "1", "X-Forwarded-Proto": "https" }, body: JSON.stringify({ email, password: pw }) });
  ok(/; Secure$/.test(r1.headers.get("set-cookie") || ""), "behind https: Secure flag added", r1.headers.get("set-cookie"));
  ok((await r1.json()).user.email === email, "login ok");
  c.setCookie("m100=" + /m100=([^;]*)/.exec(r0.headers.get("set-cookie"))[1]);
  const me = await c("GET", "/api/me"); ok(me.s === 200 && me.j.user && me.j.user.email === email, "session cookie authenticates");
  ok(me.h.get("cache-control") === "no-store", "/api responses are no-store");

  section("lifetime and sliding renewal");
  const uidRow = (await sql("SELECT id FROM users WHERE email=$1", [email]))[0].id;
  let rows = await sql("SELECT expires_at FROM sessions WHERE user_id=$1 ORDER BY expires_at", [uidRow]);
  ok(rows.length === 2 && rows.every(x => Math.abs(new Date(x.expires_at) - Date.now() - SESSION_DAYS * 864e5) < 60e3), `sessions expire in ${SESSION_DAYS} days`, rows);
  await sql("UPDATE sessions SET expires_at=now()+interval '10 days' WHERE user_id=$1", [uidRow]);
  const ren = await c("GET", "/api/me");
  ok(ren.s === 200 && /m100=/.test(ren.h.get("set-cookie") || ""), "a session in its second half is renewed: new cookie sent", ren.h.get("set-cookie"));
  rows = await sql("SELECT expires_at FROM sessions WHERE token_hash=encode(sha256($1::bytea),'hex')", [c.ck().slice(5)]);
  ok(rows[0] && Math.abs(new Date(rows[0].expires_at) - Date.now() - SESSION_DAYS * 864e5) < 60e3, "expires_at pushed out to a full period", rows[0]);
  const fresh = await c("GET", "/api/me"); ok(fresh.s === 200 && !fresh.h.get("set-cookie"), "a fresh session is not re-sent on every request");
  await sql("UPDATE sessions SET expires_at=now()-interval '1 second' WHERE token_hash=encode(sha256($1::bytea),'hex')", [c.ck().slice(5)]);
  ok((await c("GET", "/api/me")).j.user === null, "an expired session is anonymous");
  ok((await c("PUT", "/api/progress", { p: "{}" })).s === 401, "expired session cannot write");
  await sql("DELETE FROM sessions WHERE user_id=$1", [uidRow]);

  section("sign out, sign out everywhere");
  c = await signup(email, pw);
  const d1 = await signup(email, pw), d2 = await signup(email, pw);         // three devices: c, d1, d2
  rows = await sql("SELECT count(*)::int n FROM sessions WHERE user_id=$1 AND expires_at>now()", [uidRow]); ok(rows[0].n === 3, "three live sessions", rows[0]);
  let r = await d2("POST", "/api/logout"); ok(r.s === 200 && /Max-Age=0/.test(r.h.get("set-cookie") || ""), "logout clears the cookie");
  ok((await d2("GET", "/api/me")).j.user === null, "logged-out device is anonymous");
  r = await c("POST", "/api/logout-all", { keep: true }); ok(r.s === 200 && r.j.removed === 1, "logout-all {keep:true} removes the other sessions", r.j);
  ok((await c("GET", "/api/me")).j.user !== null && (await d1("GET", "/api/me")).j.user === null, "current device stays, the other is out");
  const d3 = await signup(email, pw);
  r = await c("POST", "/api/logout-all"); ok(r.s === 200 && r.j.removed === 2 && /Max-Age=0/.test(r.h.get("set-cookie") || ""), "logout-all removes every session and clears the cookie", r.j);
  ok((await c("GET", "/api/me")).j.user === null && (await d3("GET", "/api/me")).j.user === null, "no device is signed in any more");
  ok((await client()("POST", "/api/logout-all")).s === 401, "logout-all needs a session");

  section("password change invalidates the other sessions");
  c = await signup(email, pw); const other = await signup(email, pw);
  r = await c("POST", "/api/password", { current: "wrong-password", next: "newpassword1" }); ok(r.s === 401 && r.j.error === "invalid-credential", "wrong current password");
  r = await c("POST", "/api/password", { current: pw, next: "short" }); ok(r.s === 400 && r.j.error === "weak-password", "weak new password");
  r = await c("POST", "/api/password", { current: pw, next: "newpassword1" }); ok(r.s === 200, "password changed");
  ok((await c("GET", "/api/me")).j.user !== null, "the device that changed it stays signed in");
  ok((await other("GET", "/api/me")).j.user === null, "the other device is signed out");
  ok((await client()("POST", "/api/login", { email, password: pw })).s === 401, "old password rejected");
  ok((await client()("POST", "/api/login", { email, password: "newpassword1" })).s === 200, "new password works");

  section("a deleted account's live sessions can do nothing");
  const victim = `del_${runId}@t.com`;
  const a = await signup(victim, pw), b = await signup(victim, pw);
  await a("PUT", "/api/progress", { p: JSON.stringify({ stats: { algebra: { c: 1, t: 2 } } }) });
  await a("POST", "/api/events", { events: [{ type: "open" }] });
  const vid = (await sql("SELECT id FROM users WHERE email=$1", [victim]))[0].id;
  r = await a("DELETE", "/api/me"); ok(r.s === 200, "self delete");
  for (const [m, p, body] of [["GET", "/api/me"], ["GET", "/api/progress"], ["PUT", "/api/progress", { p: "{}" }], ["POST", "/api/events", { events: [{ type: "open" }] }], ["POST", "/api/name", { name: "Ghost" }], ["GET", "/api/plan"], ["POST", "/api/billing/quote", { plan: "m1" }], ["GET", "/api/xp/premium.js"]]) {
    const x = await b(m, p, body);
    ok(p === "/api/me" ? x.j.user === null : x.s === 401, `${m} ${p} on another device of the deleted account -> ${p === "/api/me" ? "anonymous" : "401"}`, x.s);
  }
  const left = await sql("SELECT (SELECT count(*) FROM sessions WHERE user_id=$1)::int s, (SELECT count(*) FROM progress WHERE user_id=$1)::int p, (SELECT count(*) FROM events WHERE user_id=$1)::int e, (SELECT count(*) FROM users WHERE id=$1)::int u", [vid]);
  ok(left[0].s === 0 && left[0].p === 0 && left[0].e === 0 && left[0].u === 0, "sessions, progress and events are removed with the account", left[0]);

  section("rate limits");
  // per email+IP: 10 failures then 429, and the real student on another IP still gets in
  const target = `rl_${runId}@t.com`; await signup(target, pw);
  let last;
  for (let i = 0; i < 10; i++) last = await client()("POST", "/api/login", { email: target, password: "nope-" + i }, ip(1));
  ok(last.s === 401, "10 failures are plain 401s");
  last = await client()("POST", "/api/login", { email: target, password: pw }, ip(1));
  ok(last.s === 429 && last.j.error === "too-many-requests", "11th attempt from the same IP is blocked even with the right password", last);
  ok((await client()("POST", "/api/login", { email: target, password: pw }, ip(2))).s === 200, "the real student on another IP still signs in");
  // lockout design: 12 attacker IPs x 9 failures each (108 > the 100 per-account ceiling)
  for (let k = 10; k < 22; k++) for (let i = 0; i < 9; i++) await client()("POST", "/api/login", { email: target, password: "x" + i }, ip(k));
  const vic = await client()("POST", "/api/login", { email: target, password: pw }, ip(99));
  ok(vic.s === 200, "after a distributed attack the student (from an IP with no failures) can still sign in", vic.s);
  const att = await client()("POST", "/api/login", { email: target, password: pw }, ip(10));
  ok(att.s === 429, "an attacking IP is held off by the per-account ceiling", att.s);
  // per IP: 150 attempts / 15 min regardless of email
  for (let i = 0; i < 150; i++) last = await client()("POST", "/api/login", { email: `nobody${i}_${runId}@t.com`, password: "x" }, ip(500));
  last = await client()("POST", "/api/login", { email: `nobody_${runId}@t.com`, password: "x" }, ip(500));
  ok(last.s === 429, "151st login attempt from one IP -> 429", last.s);
  // signup: 60 / hour per IP (checked before validation, so junk requests count too)
  for (let i = 0; i < 60; i++) last = await client()("POST", "/api/signup", { email: "bad" }, ip(600));
  ok(last.s === 400, "60 junk sign-ups are 400s");
  last = await client()("POST", "/api/signup", { email: `ok_${runId}@t.com`, password: pw, name: "Late", consent: true }, ip(600));
  ok(last.s === 429, "61st sign-up from one IP -> 429", last.s);
  // password change: 10 wrong attempts then 429, per account
  const pc = await signup(`pc_${runId}@t.com`, pw);
  for (let i = 0; i < 10; i++) await pc("POST", "/api/password", { current: "wrong" + i, next: "newpassword1" });
  ok((await pc("POST", "/api/password", { current: pw, next: "newpassword1" })).s === 429, "11th password change attempt -> 429");
  // progress saves: 60 / minute per account
  const ps = await signup(`ps_${runId}@t.com`, pw);
  for (let i = 0; i < 60; i++) last = await ps("PUT", "/api/progress", { p: "{}" });
  ok(last.s === 200, "60 saves a minute are fine");
  ok((await ps("PUT", "/api/progress", { p: "{}" })).s === 429, "61st save within a minute -> 429 (the client retries with backoff)");
  // long credentials are refused before any work
  ok((await client()("POST", "/api/login", { email: "a".repeat(300) + "@t.com", password: pw })).s === 401, "300-char email -> 401 without a lookup");

  section("open redirect attempts on /auth/*");
  const evil = ["//evil.com", "/\\evil.com", "/app@evil.com", "%2F%2Fevil.com", "https://evil.com/app", "/app%0d%0aSet-Cookie:x=1", "/app#" + encodeURIComponent("‮evil"), "/apps", "/app/../admin.html", "javascript:alert(1)", "/app?x=1", "/app#today"];
  for (const n of evil) {
    const r = await raw({ path: "/auth/google?next=" + n.replace("#", "%23") }); // a browser never sends the fragment itself
    const cookie = String(r.h["set-cookie"] || "");
    if (r.s === 302 && /accounts\.google\.com/.test(r.h.location || "")) {
      const payload = JSON.parse(Buffer.from(/oas=([^.;]+)/.exec(cookie)[1], "base64url").toString());
      const want = n === "/app?x=1" || n === "/app#today" ? n : "/app";
      ok(payload.n === want, `next=${n} -> lands on ${payload.n}`, payload.n);
    } else ok(/^\/app#signin\?err=/.test(r.h.location || ""), `google sign-in not configured: next=${n} -> ${r.h.location}`);
  }

  if (process.env.OAUTH_MOCKED) {
    section("OAuth state cookie: forged, mismatched, replayed, expired");
    const start = async (provider = "google", next = "/app#today") => {
      const r = await raw({ path: `/auth/${provider}?next=${encodeURIComponent(next)}` });
      const loc = new URL(r.h.location), cookie = /oas=[^;]+/.exec(String(r.h["set-cookie"]))[0];
      return { state: loc.searchParams.get("state"), cookie };
    };
    const cb = (provider, state, cookie) => raw({ path: `/auth/${provider}/callback?code=abc&state=${encodeURIComponent(state)}`, headers: cookie ? { cookie } : {} });
    let s1 = await start();
    let r = await cb("google", s1.state, null); ok(/err=expired/.test(r.h.location), "callback without the cookie -> expired", r.h.location);
    r = await cb("google", "wrong-state", s1.cookie); ok(/err=expired/.test(r.h.location), "state mismatch -> expired", r.h.location);
    r = await cb("facebook", s1.state, s1.cookie); ok(/err=expired/.test(r.h.location), "google cookie on the facebook callback -> expired", r.h.location);
    const [val] = s1.cookie.slice(4).split("."); const o = JSON.parse(Buffer.from(val, "base64url").toString());
    const forged = "oas=" + Buffer.from(JSON.stringify({ ...o, n: "https://evil.com" })).toString("base64url") + "." + s1.cookie.split(".")[1];
    r = await cb("google", s1.state, forged); ok(/err=expired/.test(r.h.location), "tampered payload (bad signature) -> expired", r.h.location);
    const unsigned = "oas=" + Buffer.from(JSON.stringify(o)).toString("base64url");
    r = await cb("google", s1.state, unsigned); ok(/err=expired/.test(r.h.location), "unsigned cookie -> expired", r.h.location);
    const old = "oas=" + Buffer.from(JSON.stringify({ ...o, t: Date.now() - 11 * 60e3 })).toString("base64url") + "." + s1.cookie.split(".")[1];
    r = await cb("google", s1.state, old); ok(/err=expired/.test(r.h.location), "11-minute-old (re-signed is impossible, so tampered) -> expired", r.h.location);
    r = await cb("google", s1.state, s1.cookie);
    ok(r.s === 302 && r.h.location === "/app#today" && /m100=[\w-]{40,}/.test(String(r.h["set-cookie"])), "valid callback signs in and lands on next", { loc: r.h.location, sc: r.h["set-cookie"] });
    const social = await sql("SELECT id, email, name, google_id FROM users WHERE email='social.student@test.com'");
    ok(social.length === 1 && social[0].google_id === "g-123" && social[0].name === "نورة القحطاني", "account created and linked to the google id", social);
    r = await cb("google", s1.state, s1.cookie); ok(/err=expired/.test(r.h.location), "replaying the same callback + cookie is refused", r.h.location);
    const s2 = await start("google", "//evil.com"); r = await cb("google", s2.state, s2.cookie);
    ok(r.h.location === "/app", "second sign-in reuses the account; evil next falls back to /app", r.h.location);
    ok((await sql("SELECT count(*)::int n FROM users WHERE email='social.student@test.com'"))[0].n === 1, "no duplicate account");
    const f1 = await start("facebook"); r = await cb("facebook", f1.state, f1.cookie);
    ok(/err=no-email/.test(r.h.location), "facebook profile without an email -> no-email, no account", r.h.location);
    ok((await sql("SELECT count(*)::int n FROM users WHERE facebook_id='f-9'"))[0].n === 0, "no account created without an email");
  } else console.log("  (OAuth callback checks skipped: server not started with test/mock-oauth.cjs)");
});
