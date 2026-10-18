#!/usr/bin/env node
// `npm test`: starts the Moyasar mock and a server on free ports against TEST_DATABASE_URL, runs every test/*.test.js
// in sequence (each in its own process), prints a summary and exits non-zero if any suite failed.
//   TEST_DATABASE_URL  Postgres to use (default postgres://pg@localhost:5433/t4). Tables are created by the server.
//   TEST_SERVER        use an already running server instead of starting one (its ADMIN_EMAILS must include admin@test.com)
//   SUITES             comma-separated list to run a subset, e.g. SUITES=fuzz,smoke
//   PLAYWRIGHT_DIR     where `require("playwright")` resolves from (smoke suite); the suite is skipped when missing
"use strict";
const { spawn } = require("child_process");
const net = require("net");
const path = require("path");
const fs = require("fs");

const ROOT = path.join(__dirname, "..");
const DB = process.env.TEST_DATABASE_URL || "postgres://pg@localhost:5433/t4";
const freePort = () => new Promise((res, rej) => { const s = net.createServer(); s.unref(); s.on("error", rej); s.listen(0, "127.0.0.1", () => { const p = s.address().port; s.close(() => res(p)); }); });
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function waitFor(url, ms = 20000) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) { try { const r = await fetch(url); if (r.ok) return true; } catch (e) {} await sleep(150); }
  return false;
}

(async () => {
  const want = (process.env.SUITES || "").split(",").map(s => s.trim()).filter(Boolean);
  const suites = fs.readdirSync(__dirname).filter(f => /\.test\.js$/.test(f)).sort().filter(f => !want.length || want.includes(f.replace(/\.test\.js$/, "")));
  if (!suites.length) { console.error("no suites selected"); process.exit(2); }
  const procs = [];
  const kill = () => { for (const p of procs) { try { p.kill("SIGTERM"); } catch (e) {} } };
  process.on("SIGINT", () => { kill(); process.exit(130); });

  // Moyasar mock
  const mockPort = await freePort();
  const mock = spawn(process.execPath, [path.join(__dirname, "mock-moyasar.js"), String(mockPort)], { stdio: ["ignore", "ignore", "inherit"] });
  procs.push(mock);
  const MOY = `http://127.0.0.1:${mockPort}`;

  // server
  let BASE = process.env.TEST_SERVER, srv = null, serverLog = [];
  if (!BASE) {
    const port = await freePort();
    BASE = `http://127.0.0.1:${port}`;
    const env = { ...process.env, PORT: String(port), DATABASE_URL: DB, ADMIN_EMAILS: "admin@test.com", PUBLIC_URL: BASE,
      MOYASAR_SECRET_KEY: "sk_test_mock", MOYASAR_API_BASE: MOY + "/v1", MOYASAR_WEBHOOK_SECRET: "whsec_test",
      // fake OAuth apps + mocked provider calls, so /auth/* callbacks can be tested end to end
      GOOGLE_CLIENT_ID: "test-google-id", GOOGLE_CLIENT_SECRET: "test-google-secret", FACEBOOK_APP_ID: "1", FACEBOOK_APP_SECRET: "fb-secret",
      NODE_ENV: "test" };
    delete env.CANONICAL_HOST; delete env.REDIRECT_HOSTS; delete env.TAP_SECRET_KEY;
    const t0 = Date.now();
    srv = spawn(process.execPath, ["-r", path.join(__dirname, "mock-oauth.cjs"), path.join(ROOT, "server.js")], { cwd: ROOT, env, stdio: ["ignore", "pipe", "pipe"] });
    procs.push(srv);
    const onLine = d => { const s = d.toString(); serverLog.push(s); if (process.env.SERVER_LOG) process.stderr.write(s); };
    srv.stdout.on("data", onLine); srv.stderr.on("data", onLine);
    srv.on("exit", code => { if (!done) { console.error(`server exited early (code ${code}):\n` + serverLog.join("")); kill(); process.exit(1); } });
    if (!(await waitFor(BASE + "/healthz"))) { console.error("server did not become healthy:\n" + serverLog.join("")); kill(); process.exit(1); }
    console.log(`server up on ${BASE} in ${Date.now() - t0} ms (db ${DB.replace(/\/\/.*@/, "//…@")}), moyasar mock on ${MOY}`);
  } else console.log(`using existing server ${BASE}, moyasar mock on ${MOY}`);
  var done = false;

  const results = [];
  for (const f of suites) {
    console.log(`\n==== ${f} ====`);
    const t0 = Date.now(), before = serverLog.length;
    const code = await new Promise(res => {
      const p = spawn(process.execPath, [path.join(__dirname, f)], { cwd: ROOT, stdio: "inherit", env: { ...process.env, BASE, MOY, TEST_DATABASE_URL: DB, SERVER_PID: srv ? String(srv.pid) : "", ...(srv ? { WH: "whsec_test", OAUTH_MOCKED: "1" } : {}) } });
      p.on("exit", c => res(c)); p.on("error", () => res(1));
    });
    // anything the server logged as an error during this suite is worth seeing (stack traces, pg errors)
    const errs = serverLog.slice(before).join("").split("\n").filter(l => /error|Error|unhandled|failed:/.test(l) && !/narration import|WARNING: ADMIN_EMAILS/.test(l));
    if (errs.length) console.log(`  server logged ${errs.length} error line(s) during ${f}:\n    ` + errs.slice(0, 8).join("\n    "));
    results.push({ f, code, ms: Date.now() - t0, errs: errs.length });
  }
  done = true;
  kill();
  if (srv) await new Promise(r => { srv.on("exit", r); setTimeout(r, 3000); });
  console.log("\n==== summary ====");
  for (const r of results) console.log(`  ${r.code === 0 ? "PASS" : r.code === 3 ? "SKIP" : "FAIL"}  ${r.f}  (${(r.ms / 1000).toFixed(1)}s${r.errs ? `, ${r.errs} server error line(s)` : ""})`);
  const failed = results.filter(r => r.code !== 0 && r.code !== 3).length;
  console.log(failed ? `\n${failed} suite(s) failed` : "\nall suites passed");
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
