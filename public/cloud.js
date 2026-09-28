/* Cloud sync for GAT Academy on Railway: talks to this site's own server (/api). Same interface as the Firebase build. */
(function(){
const H = { "Content-Type": "application/json", "X-Masar": "1" };
const OWNER = "masar100_owner"; // email of the account whose progress is in this browser's localStorage
const ls = { get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} }, del: k => { try { localStorage.removeItem(k); } catch (e) {} } };
async function api(method, url, body) {
  let r;
  try { r = await fetch(url, { method, headers: H, credentials: "same-origin", cache: "no-store", body: body ? JSON.stringify(body) : undefined }); }
  catch (e) { const x = new Error("network"); x.code = "network-request-failed"; throw x; }
  const j = await r.json().catch(() => ({}));
  if (!r.ok) { const x = new Error(j.error || "server"); x.code = j.error || (r.status === 413 ? "too-large" : "other"); x.status = r.status; throw x; }
  return j;
}
let user = null, timer = null, status = "idle", lastSync = null, retry = 0, pulled = false;
const A = () => window.__app;
const safe = f => { try { f(); } catch (e) {} };
function reset() { clearTimeout(timer); timer = null; user = null; status = "idle"; lastSync = null; retry = 0; pulled = false; }
function expired() { reset(); safe(() => A().render()); } // session gone (expired / password changed elsewhere / account deleted)
async function push() {
  clearTimeout(timer); timer = null;
  if (!user) return;
  if (!pulled) return pull(); // never overwrite the cloud copy before we have read it
  const S = A().getS(); const p = JSON.stringify(S);
  if (p.length > 900000) { status = "error"; A().cloudStatus(); return; }
  status = "saving"; A().cloudStatus();
  try {
    await api("PUT", "/api/progress", { p, track: S.track, target: S.target, lang: S.lang, examDate: S.examDate || "", summary: A().summary() });
    status = "ok"; lastSync = Date.now(); retry = 0;
  } catch (e) {
    if (e.code === "unauthenticated") return expired();
    status = "error";
    // retry transient failures (network / 5xx / rate limit) with backoff; a 4xx like bad-progress/too-large won't fix itself
    if ((e.code === "network-request-failed" || !e.status || e.status >= 500 || e.status === 429) && retry < 5) { retry++; timer = setTimeout(push, Math.min(60000, 4000 * 2 ** (retry - 1))); }
  }
  A().cloudStatus();
}
async function pull() {
  try {
    const r = await api("GET", "/api/progress");
    if (r.p) { try { A().mergeCloud(JSON.parse(r.p)); } catch (e) {} }
    pulled = true; retry = 0;
  } catch (e) {
    if (e.code === "unauthenticated") return expired();
    // couldn't read the cloud copy (flaky network): keep local data, don't push, try again later
    status = "error"; A().cloudStatus();
    if (retry < 5) { retry++; clearTimeout(timer); timer = setTimeout(pull, Math.min(60000, 4000 * 2 ** (retry - 1))); }
    return;
  }
  await push(); safe(() => A().render());
}
async function afterLogin(u) {
  const email = String(u.email || "").toLowerCase(), owner = ls.get(OWNER);
  // progress in this browser belongs to a different account (shared device): don't merge it into this one
  if (owner && owner !== email) { ls.del("masar100_v1"); ls.del("masar100_details"); ls.set(OWNER, email); location.reload(); return new Promise(() => {}); }
  ls.set(OWNER, email);
  reset(); user = { email: u.email, emailVerified: true, isAdmin: !!u.isAdmin };
  await pull();
}
let checked = false; // true once the first /api/me answer (or failure) has arrived
window.CLOUD = {
  get user() { return user; }, get ready() { return checked; }, get status() { return status; }, get lastSync() { return lastSync; }, google: false, resetByAdmin: true,
  queue() { if (!user) return; clearTimeout(timer); timer = setTimeout(push, 2500); },
  async pushNow() { if (!user) return; retry = 0; await push(); }, // never throws: callers read CLOUD.status ("error" = not synced)
  async signUp(email, password) { const r = await api("POST", "/api/signup", { email, password, consent: true }); await afterLogin(r.user); },
  async signIn(email, password) { const r = await api("POST", "/api/login", { email, password }); await afterLogin(r.user); },
  async signOut() {
    if (user && pulled && status !== "ok") { try { await push(); } catch (e) {} } // flush unsynced changes first
    try { await api("POST", "/api/logout"); } catch (e) { if (e.code !== "unauthenticated") throw e; }
    reset(); safe(() => A().render());
  },
  async reset() { const x = new Error("reset"); x.code = "reset-admin"; throw x; },
  async changePassword(current, next) { await api("POST", "/api/password", { current, next }); },
  async deleteAccount() { await api("DELETE", "/api/me"); ls.del(OWNER); reset(); safe(() => A().render()); }
};
// re-check the session when the tab comes back (e.g. after the password was changed on another device)
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" && user) api("GET", "/api/me").then(r => { if (!r.user) expired(); }).catch(() => {}); });
window.addEventListener("online", () => { if (user && status === "error") { retry = 0; pulled ? push() : pull(); } });
api("GET", "/api/me").then(r => { checked = true; if (r.user) afterLogin(r.user); else A().render(); }).catch(() => { checked = true; A().render(); });
})();
