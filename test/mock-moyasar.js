// Minimal Moyasar API mock for local testing (invoices, payments, refunds). Not a dependency of the app.
//   node test/mock-moyasar.js [port]        (default: MOCK_PORT env or 5198)
// Auth: Basic base64("sk_test_mock:") on every call (like the real API).
// Real endpoints: POST /v1/invoices, GET /v1/invoices/:id, POST /v1/payments/:id/refund
// Test hooks:     GET /_pay/:id[?amount=N]  pay an invoice (optionally with a different amount, to test mismatches)
//                 GET /_status/:id?s=expired|failed|canceled   force an invoice status
//                 GET /_failnext?n=1         make the next n /v1 calls fail with HTTP 500 (gateway down)
//                 GET /_reset                forget everything
"use strict";
const http = require("http"), crypto = require("crypto");
const PORT = Number(process.argv[2] || process.env.MOCK_PORT || 5198);
let inv = {}, pays = {}, failNext = 0;
http.createServer((req, res) => {
  let b = ""; req.on("data", c => b += c); req.on("end", () => {
    const auth = req.headers.authorization || "", ok = auth === "Basic " + Buffer.from("sk_test_mock:").toString("base64");
    const send = (s, j) => { res.writeHead(s, { "Content-Type": "application/json" }); res.end(JSON.stringify(j)); };
    if (!ok) return send(401, { type: "authentication_error" });
    const U = new URL(req.url, "http://x"), u = U.pathname;
    if (u === "/_failnext") { failNext = +U.searchParams.get("n") || 1; return send(200, { ok: 1 }); }
    if (u === "/_reset") { inv = {}; pays = {}; failNext = 0; return send(200, { ok: 1 }); }
    if (failNext > 0 && u.startsWith("/v1/")) { failNext--; return send(500, { type: "api_error" }); }
    if (req.method === "POST" && u === "/v1/invoices") {
      let j; try { j = JSON.parse(b); } catch (e) { return send(400, { type: "invalid_request_error" }); }
      const id = crypto.randomUUID();
      inv[id] = { id, status: "initiated", amount: j.amount, currency: j.currency, metadata: j.metadata, payments: [], url: "https://checkout.moyasar.com/invoices/" + id, success_url: j.success_url, callback_url: j.callback_url };
      return send(201, inv[id]);
    }
    let m = u.match(/^\/v1\/invoices\/([\w-]+)$/); if (m && req.method === "GET") return inv[m[1]] ? send(200, inv[m[1]]) : send(404, {});
    m = u.match(/^\/_pay\/([\w-]+)$/);
    if (m) { const i = inv[m[1]]; if (!i) return send(404, {}); const pid = crypto.randomUUID(); i.status = "paid"; const amt = U.searchParams.get("amount"); if (amt) i.amount = +amt; i.payments.push({ id: pid, status: "paid", amount: i.amount, refunded: 0 }); pays[pid] = i; return send(200, { ok: 1, pid }); }
    m = u.match(/^\/_status\/([\w-]+)$/);
    if (m) { const i = inv[m[1]]; if (!i) return send(404, {}); i.status = U.searchParams.get("s"); return send(200, i); }
    m = u.match(/^\/v1\/payments\/([\w-]+)\/refund$/);
    if (m && req.method === "POST") {
      const i = pays[m[1]]; if (!i) return send(404, {});
      const p = i.payments.find(x => x.id === m[1]); let a; try { a = JSON.parse(b).amount; } catch (e) { return send(400, {}); }
      if (p.refunded + a > p.amount) return send(400, { type: "invalid_request_error", message: "amount exceeds" });
      p.refunded += a; p.status = "refunded"; return send(200, { id: m[1], status: "refunded", refunded: p.refunded });
    }
    send(404, { u });
  });
}).listen(PORT, () => console.log("moyasar mock on :" + PORT));
