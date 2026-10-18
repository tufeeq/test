// Shared helpers for the test suites. Configuration comes from the environment (set by run.js):
//   BASE  server under test, e.g. http://localhost:5114   (default http://localhost:3000)
//   MOY   Moyasar mock base, e.g. http://localhost:5198    (default http://localhost:5198)
//   TEST_DATABASE_URL  Postgres the server uses             (default postgres://pg@localhost:5433/t4)
"use strict";
const http = require("http");
const BASE = process.env.BASE || "http://localhost:3000";
const MOY = process.env.MOY || "http://localhost:5198";
const DB = process.env.TEST_DATABASE_URL || "postgres://pg@localhost:5433/t4";
const MOCK_AUTH = "Basic " + Buffer.from("sk_test_mock:").toString("base64");

// a small HTTP client with a cookie jar for the m100 session cookie: c(method, url, body?, headers?) → {s, j, t, loc, h}
function client() {
  let ck = "";
  const c = async (method, url, body, hdr = {}) => {
    const headers = { "Content-Type": "application/json", "X-Masar": "1", ...hdr };
    if (ck) headers.cookie = ck;
    for (const k of Object.keys(headers)) if (headers[k] == null) delete headers[k];
    const r = await fetch(BASE + url, { method, redirect: "manual", headers, body: body === undefined ? undefined : (typeof body === "string" ? body : JSON.stringify(body)) });
    const sc = r.headers.get("set-cookie");
    if (sc) { const m = /m100=([^;]*)/.exec(sc); if (m) ck = m[1] ? "m100=" + m[1] : ""; }
    const t = await r.text(); let j; try { j = JSON.parse(t); } catch (e) { j = t; }
    return { s: r.status, j, t, loc: r.headers.get("location"), h: r.headers };
  };
  c.ck = () => ck; c.setCookie = v => { ck = v; };
  return c;
}
async function signup(email, pw = "password123", name = "Test User") {
  const c = client();
  let r = await c("POST", "/api/signup", { email, password: pw, name, consent: true });
  if (r.s === 409) r = await c("POST", "/api/login", { email, password: pw });
  if (r.s !== 200) throw new Error("signup " + email + " -> " + r.s + " " + JSON.stringify(r.j));
  c.user = r.j.user;
  return c;
}
const admin = () => signup(process.env.ADMIN_EMAIL || "admin@test.com", process.env.ADMIN_PASSWORD || "adminpass1", "Owner");
const moy = path => fetch(MOY + path, { headers: { Authorization: MOCK_AUTH } }).then(r => r.json());

// raw request through node:http (lets us send headers and bodies fetch() would refuse)
function raw({ method = "GET", path = "/", headers = {}, body, timeout = 15000 }) {
  return new Promise((resolve, reject) => {
    const u = new URL(BASE);
    if (body !== undefined && !Object.keys(headers).some(h => /^(content-length|transfer-encoding)$/i.test(h))) headers = { ...headers, "Content-Length": Buffer.byteLength(body) };
    const req = http.request({ host: u.hostname, port: u.port, method, path, headers, timeout }, res => {
      const chunks = []; res.on("data", d => chunks.push(d)); res.on("end", () => resolve({ s: res.statusCode, h: res.headers, t: Buffer.concat(chunks).toString("utf8") }));
    });
    req.on("timeout", () => { req.destroy(new Error("timeout")); });
    req.on("error", reject);
    if (body !== undefined) req.write(body);
    req.end();
  });
}

let pgc = null;
async function sql(q, p) {
  if (!pgc) { const { Client } = require("pg"); pgc = new Client({ connectionString: DB }); await pgc.connect(); }
  return (await pgc.query(q, p)).rows;
}

let fails = 0, passes = 0;
const ok = (cond, msg, extra) => { console.log((cond ? "  ok   " : "  FAIL ") + msg + (extra !== undefined && !cond ? " :: " + JSON.stringify(extra).slice(0, 600) : "")); if (cond) passes++; else fails++; return !!cond; };
const section = t => console.log("\n# " + t);
async function done() {
  if (pgc) { await pgc.end().catch(() => {}); pgc = null; }
  console.log(`\n${passes} passed, ${fails} failed`);
  process.exit(fails ? 1 : 0);
}
const run = fn => fn().then(done, e => { console.error("suite crashed:", e); process.exit(1); });
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const sleep = ms => new Promise(r => setTimeout(r, ms));

module.exports = { BASE, MOY, DB, client, signup, admin, moy, raw, sql, ok, section, done, run, uid, sleep };
