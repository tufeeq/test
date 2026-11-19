/* GAT Academy service worker.
   - versioned assets (?v=<hash>) and fonts: cache first; a newer version of the same file replaces the older one
   - the app page (/app): network first, the cached copy when offline
   - everything under /api, /auth and /admin: always the network (never cached) */
const CACHE = "gat-v1";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
  await self.clients.claim();
})()));
async function versioned(req) {
  const c = await caches.open(CACHE), hit = await c.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok && res.type === "basic") {
    const path = new URL(req.url).pathname;
    for (const k of await c.keys()) if (new URL(k.url).pathname === path && k.url !== req.url) c.delete(k);
    c.put(req, res.clone());
  }
  return res;
}
async function page(req, key) {
  try {
    const res = await fetch(req);
    if (res.ok && res.type === "basic" && !res.redirected) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(key, cp)); }
    return res;
  } catch (e) {
    const hit = await caches.match(key);
    if (hit) return hit;
    throw e;
  }
}
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const u = new URL(req.url);
  if (u.origin !== location.origin) return;
  if (/^\/(api|auth|admin)(\/|$)/.test(u.pathname)) return;
  if (u.searchParams.has("v") || u.pathname.startsWith("/fonts/")) { e.respondWith(versioned(req)); return; }
  if (req.mode === "navigate" && u.pathname === "/app") e.respondWith(page(req, "/app"));
});
