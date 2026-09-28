/* Cloud sync for Masar 100 on Railway: talks to this site's own server (/api). Same interface as the Firebase build. */
(function(){
const H = { "Content-Type": "application/json", "X-Masar": "1" };
async function api(method, url, body) {
  let r;
  try { r = await fetch(url, { method, headers: H, credentials: "same-origin", body: body ? JSON.stringify(body) : undefined }); }
  catch (e) { const x = new Error("network"); x.code = "network-request-failed"; throw x; }
  const j = await r.json().catch(() => ({}));
  if (!r.ok) { const x = new Error(j.error || "server"); x.code = j.error || "other"; throw x; }
  return j;
}
let user = null, timer = null, status = "idle", lastSync = null, retry = 0;
const A = () => window.__app;
async function push() {
  if (!user) return; clearTimeout(timer);
  const S = A().getS(); const p = JSON.stringify(S);
  if (p.length > 900000) { status = "error"; A().cloudStatus(); return; }
  status = "saving"; A().cloudStatus();
  try {
    await api("PUT", "/api/progress", { p, track: S.track, target: S.target, lang: S.lang, examDate: S.examDate || "", summary: A().summary() });
    status = "ok"; lastSync = Date.now(); retry = 0;
  } catch (e) {
    if (e.code === "unauthenticated") { user = null; A().render(); return; }
    status = "error"; if (retry < 3) { retry++; timer = setTimeout(push, 5000 * retry); }
  }
  A().cloudStatus();
}
async function afterLogin(u) {
  user = { email: u.email, emailVerified: true, isAdmin: !!u.isAdmin };
  try { const r = await api("GET", "/api/progress"); if (r.p) { try { A().mergeCloud(JSON.parse(r.p)); } catch (e) {} } } catch (e) {}
  await push(); A().render();
}
window.CLOUD = {
  get user() { return user; }, get status() { return status; }, get lastSync() { return lastSync; }, google: false, resetByAdmin: true,
  queue() { if (!user) return; clearTimeout(timer); timer = setTimeout(push, 2500); },
  pushNow: push,
  async signUp(email, password) { const r = await api("POST", "/api/signup", { email, password, consent: true }); await afterLogin(r.user); },
  async signIn(email, password) { const r = await api("POST", "/api/login", { email, password }); await afterLogin(r.user); },
  async signOut() { await api("POST", "/api/logout"); user = null; status = "idle"; A().render(); },
  async reset() { const x = new Error("reset"); x.code = "reset-admin"; throw x; },
  async changePassword(current, next) { await api("POST", "/api/password", { current, next }); },
  async deleteAccount() { await api("DELETE", "/api/me"); user = null; A().render(); }
};
api("GET", "/api/me").then(r => { if (r.user) afterLogin(r.user); else A().render(); }).catch(() => A().render());
})();
