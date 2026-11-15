// Sign-up requires a mobile number: Saudi numbers typed the local way are stored as +9665XXXXXXXX, others need +country form.
"use strict";
const { client, admin, sql, ok, section, run, uid } = require("./lib");
const FWD = { "X-Forwarded-For": `10.252.${Math.floor(Math.random() * 250)}.${1 + Math.floor(Math.random() * 250)}` };

run(async () => {
  const base = () => ({ email: `ph-${uid()}@test.local`, password: "password123", name: "Phone Test", consent: true });
  section("rejected");
  for (const [p, why] of [[undefined, "missing"], ["", "empty"], ["12345", "too short"], ["0412345678", "Saudi landline-style"], ["+966112345678", "Saudi non-mobile"], ["abc0512345678", "letters"], ["+0512345678901", "bad country code"]]) {
    const r = await client()("POST", "/api/signup", { ...base(), phone: p }, FWD);
    ok(r.s === 400 && r.j.error === "invalid-phone", "rejects " + why, [r.s, r.j]);
  }
  section("accepted and normalised");
  for (const [p, want] of [["0512345678", "+966512345678"], ["512 345 678", "+966512345678"], ["٠٥١٢٣٤٥٦٧٨", "+966512345678"], ["00966-51-234-5678", "+966512345678"], ["+9660512345678", "+966512345678"], ["+971501234567", "+971501234567"]]) {
    const b = base(); const r = await client()("POST", "/api/signup", { ...b, phone: p }, FWD);
    const row = (await sql("SELECT phone FROM users WHERE email=$1", [b.email]))[0];
    ok(r.s === 200 && row && row.phone === want, `${p} → ${want}`, [r.s, row]);
    if (p === "+971501234567") {
      const A = await admin(); const id = (await sql("SELECT id FROM users WHERE email=$1", [b.email]))[0].id;
      const u = await A("GET", "/api/admin/users/" + id); ok(u.s === 200 && u.j.user.phone === want, "admin sees the number", u.j.user && u.j.user.phone);
      ok(!("phone" in r.j.user), "not echoed in the public user object", r.j.user);
    }
  }
});
