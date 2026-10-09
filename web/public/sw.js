// OWNER: B4. Service worker for the Dawra technician PWA. Registered from /tech in production builds only.
// Strategy:
//   - Navigations (SPA routes): network-first, fall back to the cached app shell (/index.html) when offline.
//   - Hashed build assets (/assets/*): cache-first (immutable).
//   - Icons, manifest, fonts (Google Fonts): stale-while-revalidate.
//   - /api/*: never cached here. The app keeps its own offline copy + write queue in localStorage.
const VERSION = 'dawra-v1';
const SHELL = `${VERSION}-shell`;
const ASSETS = `${VERSION}-assets`;
const RUNTIME = `${VERSION}-runtime`;
const PRECACHE = ['/', '/index.html', '/manifest.webmanifest', '/favicon.svg', '/icons/icon-192.png', '/icons/icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL);
    // Fetch index.html and precache the hashed JS/CSS it references so the shell boots offline.
    try {
      const res = await fetch('/index.html', { cache: 'no-cache' });
      if (res.ok) {
        const html = await res.clone().text();
        await cache.put('/index.html', res);
        const refs = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map((m) => m[1]);
        if (refs.length) {
          const assets = await caches.open(ASSETS);
          await Promise.all(refs.map((u) => assets.add(u).catch(() => {})));
        }
      }
    } catch { /* offline install: try again next time */ }
    await Promise.all(PRECACHE.filter((u) => u !== '/index.html').map((u) => cache.add(u).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k)));
    if (self.registration.navigationPreload) await self.registration.navigationPreload.enable().catch(() => {});
    await self.clients.claim();
  })());
});

async function networkFirstNavigation(event) {
  try {
    const preload = await event.preloadResponse;
    if (preload) return preload;
    const res = await fetch(event.request);
    if (res.ok && res.headers.get('content-type')?.includes('text/html')) {
      const cache = await caches.open(SHELL);
      cache.put('/index.html', res.clone());
    }
    return res;
  } catch {
    const cache = await caches.open(SHELL);
    return (await cache.match('/index.html')) || (await cache.match('/')) ||
      new Response('<h1 dir="rtl">لا يوجد اتصال بالإنترنت</h1>', { headers: { 'Content-Type': 'text/html; charset=utf-8' }, status: 503 });
  }
}

async function cacheFirst(req, name) {
  const cache = await caches.open(name);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) cache.put(req, res.clone());
  return res;
}

async function staleWhileRevalidate(req, name) {
  const cache = await caches.open(name);
  const hit = await cache.match(req);
  const net = fetch(req).then((res) => {
    if (res.ok || res.type === 'opaque') cache.put(req, res.clone());
    return res;
  }).catch(() => hit);
  return hit || net;
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.origin === self.location.origin) {
    if (url.pathname.startsWith('/api/')) return; // live data only
    if (req.mode === 'navigate') { event.respondWith(networkFirstNavigation(event)); return; }
    if (url.pathname.startsWith('/assets/')) { event.respondWith(cacheFirst(req, ASSETS)); return; }
    if (/^\/(icons\/|favicon\.svg|manifest\.webmanifest)/.test(url.pathname)) { event.respondWith(staleWhileRevalidate(req, RUNTIME)); return; }
    return;
  }
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(staleWhileRevalidate(req, RUNTIME));
  }
});

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});
