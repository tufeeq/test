// Admin notifications: the bell counts sign-ups since this admin last opened it, and opening it resets the count.
// Test users are inserted directly (the suites share the per-IP sign-up limit).
"use strict";
const { client, admin, sql, ok, section, run, uid } = require("./lib");

run(async () => {
  const A = await admin();
  section("access");
  let r = await client()("GET", "/api/admin/notifications"); ok(r.s === 401, "needs sign-in");
  r = await client()("POST", "/api/admin/notifications/seen"); ok(r.s === 401 || r.s === 403, "mark seen needs an admin", r.s);

  section("count and reset");
  r = await A("POST", "/api/admin/notifications/seen"); ok(r.s === 200 && r.j.ok && r.j.seen_at, "mark seen", r.j);
  r = await A("GET", "/api/admin/notifications"); ok(r.s === 200 && r.j.unread === 0, "nothing new right after", r.j.unread);
  const e1 = `nt-a-${uid()}@test.local`, e2 = `nt-b-${uid()}@test.local`;
  await sql("INSERT INTO users(id,email,pass_hash,name,created_at) VALUES($1,$2,'x','Nour A',now()+interval '1 second'),($3,$4,'x','Nour B',now()+interval '2 seconds')", ["nt" + uid(), e1, "nt" + uid(), e2]);
  r = await A("GET", "/api/admin/notifications");
  ok(r.j.unread === 2, "two new sign-ups counted", r.j.unread);
  ok(r.j.items[0].email === e2 && r.j.items[1].email === e1 && r.j.items[0].new && r.j.items[1].new, "newest first, marked new", r.j.items.slice(0, 2));
  ok(r.j.today >= 2 && r.j.items.length <= 30, "today count and capped list", [r.j.today, r.j.items.length]);
  ok(!("pass_hash" in r.j.items[0]) && r.j.items[0].google === false, "no secrets, provider flags", Object.keys(r.j.items[0]));
  await new Promise(x => setTimeout(x, 2100));
  r = await A("POST", "/api/admin/notifications/seen"); ok(r.s === 200, "mark seen again");
  r = await A("GET", "/api/admin/notifications"); ok(r.j.unread === 0 && !r.j.items.some(u => u.new), "count reset after opening", r.j.unread);
  await sql("DELETE FROM users WHERE email IN ($1,$2)", [e1, e2]);
});
