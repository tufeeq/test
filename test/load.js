// Load generator (not part of `npm test`):  BASE=http://localhost:5114 node test/load.js [users=50] [seconds=300]
// Each virtual user: sign up once, then loops: (re-)login every 10th round → PUT /api/progress (~60 KB) → GET /api/config
// → two Range requests on a narration clip, with ~1.5 s think time. Each user gets its own X-Forwarded-For so the
// per-IP limits behave like real students on different networks. Prints p50/p95/p99 per step and server RSS before/after
// (SERVER_PID env, read from /proc).
"use strict";
const fs = require("fs");
const BASE = process.env.BASE || "http://localhost:5114";
const USERS = Number(process.argv[2] || 50), SECS = Number(process.argv[3] || 300);
const rss = () => { try { return Math.round(Number(/VmRSS:\s+(\d+)/.exec(fs.readFileSync(`/proc/${process.env.SERVER_PID}/status`, "utf8"))[1]) / 1024) + " MB"; } catch (e) { return "n/a"; } };
const lat = {}, codes = {};
const rec = (k, ms, s) => { (lat[k] = lat[k] || []).push(ms); codes[k + " " + s] = (codes[k + " " + s] || 0) + 1; };
const pct = (a, p) => { const s = a.slice().sort((x, y) => x - y); return s.length ? s[Math.min(s.length - 1, Math.floor(p / 100 * s.length))] : 0; };
async function req(k, ip, ck, method, url, body, hdr = {}) {
  const t0 = performance.now();
  try {
    const r = await fetch(BASE + url, { method, headers: { "Content-Type": "application/json", "X-Masar": "1", "X-Forwarded-For": ip, cookie: ck || "", ...hdr }, body: body ? JSON.stringify(body) : undefined });
    const sc = r.headers.get("set-cookie"); await r.arrayBuffer();
    rec(k, performance.now() - t0, r.status);
    return { s: r.status, ck: sc && /m100=([^;]+)/.exec(sc) ? "m100=" + /m100=([^;]+)/.exec(sc)[1] : null };
  } catch (e) { rec(k, performance.now() - t0, "ERR"); return { s: 0 }; }
}
(async () => {
  const ids = await (await fetch(BASE + "/audio/index.json")).json();
  const clip = ids.includes("loadtest-clip") ? "loadtest-clip" : ids[0];
  const run = Date.now().toString(36), stop = Date.now() + SECS * 1000;
  const P = JSON.stringify({ stats: { algebra: { c: 10, t: 20, time: 900 } }, attempts: [...Array(40)].map((_, i) => ({ kind: "diag", date: "2026-10-01", correct: i, total: 20 })), pad: "p".repeat(60000) });
  console.log(`load: ${USERS} users for ${SECS}s against ${BASE}; clip ${clip}; server RSS before: ${rss()}`);
  let rounds = 0;
  await Promise.all([...Array(USERS)].map(async (_, u) => {
    const ip = `172.16.${u >> 8}.${u & 255}`, email = `load${u}_${run}@t.com`;
    let ck = (await req("signup", ip, null, "POST", "/api/signup", { email, password: "password123", name: "Load User", consent: true })).ck;
    await new Promise(r => setTimeout(r, Math.random() * 1500));
    for (let i = 0; Date.now() < stop; i++) {
      if (i % 10 === 9) { const l = await req("login", ip, null, "POST", "/api/login", { email, password: "password123" }); if (l.ck) ck = l.ck; }
      await req("progress", ip, ck, "PUT", "/api/progress", { p: P, track: "sci", target: 90, lang: "ar", summary: { est: 70, solved: i } });
      await req("config", ip, ck, "GET", "/api/config");
      if (clip) { await req("audio-range", ip, null, "GET", `/audio/${clip}.mp3`, null, { Range: "bytes=0-65535" }); await req("audio-range", ip, null, "GET", `/audio/${clip}.mp3`, null, { Range: "bytes=65536-" }); }
      rounds++;
      await new Promise(r => setTimeout(r, 1200 + Math.random() * 600));
    }
  }));
  console.log(`done: ${rounds} rounds; server RSS after: ${rss()}`);
  for (const k of Object.keys(lat)) console.log(`  ${k.padEnd(12)} n=${String(lat[k].length).padStart(6)}  p50=${pct(lat[k], 50).toFixed(1)}ms  p95=${pct(lat[k], 95).toFixed(1)}ms  p99=${pct(lat[k], 99).toFixed(1)}ms  max=${Math.max(...lat[k]).toFixed(0)}ms`);
  console.log("  status counts:", JSON.stringify(codes));
})();
