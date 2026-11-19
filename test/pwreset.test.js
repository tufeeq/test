// Password reset by email (server.js /api/password/forgot and /api/password/reset, email through notify.js).
// NOTIFY_DRY=1: the email lands in the admin outbox instead of being sent.
"use strict";
const { client, admin, freshUser, sql, ok, section, run, uid } = require("./lib");

run(async () => {
  const A = await admin();
  const box = async () => (await A("GET", "/api/admin/notify/outbox")).j.items || [];
  const email = `rs-${uid()}@test.local`, U = await freshUser(email, "oldpassword1", "Huda Test");
  const linkOf = items => { const m = items.find(x => x.ch === "email" && x.to === email); const t = m && /#reset=([\w-]+)/.exec(m.html); return { m, tok: t && t[1] }; };

  section("asking for a link");
  await A("DELETE", "/api/admin/notify/outbox");
  let r = await client()("POST", "/api/password/forgot", { email: email.toUpperCase(), lang: "ar" });
  ok(r.s === 200 && r.j.ok && r.j.mail === true, "accepted", r.j);
  let { m, tok } = linkOf(await box());
  ok(m && /إعادة تعيين/.test(m.subject) && tok && tok.length >= 40, "Arabic email with a reset link", m && m.subject);
  ok(m && !/unsub\?u=/.test(m.html), "no unsubscribe link in a message the student asked for");
  r = await client()("POST", "/api/password/forgot", { email: `nobody-${uid()}@test.local` });
  ok(r.s === 200 && r.j.ok, "same answer for an unknown email (no account lookup)", r.j);
  r = await client()("POST", "/api/password/forgot", { email: "bad" }); ok(r.s === 400, "rejects a malformed email", r.s);
  const rows = await sql("SELECT token_hash FROM password_resets pr JOIN users u ON u.id=pr.user_id WHERE u.email=$1", [email]);
  ok(rows.length === 1 && rows[0].token_hash !== tok, "only a hash of the token is stored");

  section("a newer link replaces the older one");
  await A("DELETE", "/api/admin/notify/outbox");
  await client()("POST", "/api/password/forgot", { email, lang: "en" });
  const second = linkOf(await box());
  ok(second.m && /reset/i.test(second.m.subject) && /\?lang=en#reset=/.test(second.m.html), "English email in the language asked", second.m && second.m.subject);
  r = await client()("POST", "/api/password/reset", { token: tok, password: "newpassword1" });
  ok(r.s === 400 && r.j.error === "reset-invalid", "the first link no longer works", r.j);

  section("setting the new password");
  r = await client()("POST", "/api/password/reset", { token: second.tok, password: "short" }); ok(r.s === 400 && r.j.error === "weak-password", "too short", r.j);
  const C = client();
  r = await C("POST", "/api/password/reset", { token: second.tok, password: "newpassword1" });
  ok(r.s === 200 && r.j.user && r.j.user.email === email, "reset and signed in", r.j);
  r = await C("GET", "/api/me"); ok(r.s === 200 && r.j.user && r.j.user.email === email, "the new session works");
  r = await U("GET", "/api/me"); ok(!(r.j && r.j.user), "the old session was signed out", r.s);
  r = await client()("POST", "/api/password/reset", { token: second.tok, password: "anotherpass1" }); ok(r.s === 400 && r.j.error === "reset-invalid", "a link works only once", r.j);
  r = await client()("POST", "/api/login", { email, password: "oldpassword1" }); ok(r.s === 401, "old password refused");
  r = await client()("POST", "/api/login", { email, password: "newpassword1" }); ok(r.s === 200, "new password accepted");

  section("expiry");
  await A("DELETE", "/api/admin/notify/outbox");
  await client()("POST", "/api/password/forgot", { email });
  const third = linkOf(await box());
  await sql("UPDATE password_resets SET expires_at=now()-interval '1 minute' WHERE used_at IS NULL");
  r = await client()("POST", "/api/password/reset", { token: third.tok, password: "newpassword2" }); ok(r.s === 400 && r.j.error === "reset-invalid", "an expired link is refused", r.j);
  await sql("DELETE FROM users WHERE email=$1", [email]);
});
