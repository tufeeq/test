/* GAT Academy: anonymous visit statistics, no cookies.
   A visit id lives in this tab's sessionStorage only (gone when the tab closes, renewed after 30 idle minutes).
   Sends: the page path, where the visit came from (first page only), phone or desktop, the language, then the seconds the
   page was visible, how far it was scrolled and, on the landing page, the furthest section reached.
   Nothing is sent when the browser asks not to be tracked (Do Not Track / Global Privacy Control).
   API: GATV.page(path) records a page view (the app calls it on every route), GATV.step(name) a journey step. */
(function () {
  'use strict';
  var W = window, D = document, N = navigator;
  var off = N.doNotTrack === '1' || W.doNotTrack === '1' || N.globalPrivacyControl === true;
  function sg(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function ss(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  var IDLE = 30 * 60e3, now = Date.now();
  var sid = sg('gat_v_s'), last = +sg('gat_v_t') || 0;
  if (!sid || now - last > IDLE) { sid = (Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)).slice(0, 16); ss('gat_v_s', sid); ss('gat_v_n', '0'); ss('gat_v_f', ''); }
  if (sid.length < 8) sid = (sid + '00000000').slice(0, 8);
  function nextN() { var n = (+sg('gat_v_n') || 0) + 1; ss('gat_v_n', String(n)); ss('gat_v_t', String(Date.now())); return n; }
  function send(body, leaving) {
    if (off) return;
    // leaving the page: sendBeacon is delivered even while the browser navigates away
    if (leaving && N.sendBeacon) { try { if (N.sendBeacon('/api/v', new Blob([JSON.stringify(body)], { type: 'application/json' }))) return; } catch (e) {} }
    try { fetch('/api/v', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Masar': '1' }, body: JSON.stringify(body), credentials: 'omit' }).then(function (r) { return r.text(); }).catch(function () {}); } catch (e) {} // reading the (empty) body: Chromium otherwise reports the request as aborted
  }
  function lang() { return (D.documentElement.lang || 'ar').slice(0, 2); }
  var dev = W.matchMedia && W.matchMedia('(max-width: 760px)').matches ? 'm' : 'd';
  function origin() { // the first page of a visit says where it came from
    if (sg('gat_v_f')) return {};
    ss('gat_v_f', '1');
    var r = '', u = '';
    try { var h = D.referrer ? new URL(D.referrer).hostname : ''; if (h && h !== location.hostname) r = h.replace(/^www\./, ''); } catch (e) {}
    try { u = new URLSearchParams(location.search).get('utm_source') || ''; } catch (e) {}
    return { r: r || undefined, u: u || undefined };
  }

  /* the current page: visible time, scroll depth, furthest section */
  var cur = null;
  function flush(leaving) {
    if (!cur) return;
    if (cur.vis) { cur.t += (Date.now() - cur.vis) / 1000; cur.vis = D.visibilityState === 'visible' ? Date.now() : 0; }
    var t = Math.round(cur.t);
    if (t === cur.st && cur.y === cur.sy && cur.x === cur.sx) return;
    cur.st = t; cur.sy = cur.y; cur.sx = cur.x;
    send({ s: sid, n: cur.n, t: t, y: cur.y, x: cur.x || undefined }, leaving === true);
  }
  function depth() {
    if (!cur || !cur.scroll) return;
    var de = D.documentElement, h = Math.max(de.scrollHeight, D.body ? D.body.scrollHeight : 0) - W.innerHeight;
    var y = h > 0 ? Math.round(100 * Math.min(1, (W.scrollY || de.scrollTop) / h)) : 100;
    if (y > cur.y) cur.y = y;
  }
  function page(path, scroll) {
    flush();
    var n = nextN(), o = origin();
    cur = { n: n, path: path, t: 0, vis: D.visibilityState === 'visible' ? Date.now() : 0, y: 0, x: null, scroll: scroll !== false, st: 0, sy: 0, sx: null };
    send({ s: sid, n: n, k: 'p', p: path, r: o.r, u: o.u, d: dev, l: lang() });
    if (cur.scroll) setTimeout(depth, 600);
  }
  function step(name) { send({ s: sid, n: nextN(), k: 's', p: 'step:' + name }); }
  function section(id) { if (cur && id && cur.order) { var i = cur.order.indexOf(id); if (i > cur.xi) { cur.xi = i; cur.x = id; } } }

  W.addEventListener('scroll', function () { if (cur && !cur.tk) { cur.tk = 1; setTimeout(function () { if (cur) { cur.tk = 0; depth(); } }, 250); } }, { passive: true });
  D.addEventListener('visibilitychange', function () {
    if (!cur) return;
    if (D.visibilityState === 'hidden') flush(true); else { cur.vis = Date.now(); ss('gat_v_t', String(Date.now())); }
  });
  W.addEventListener('pagehide', function () { depth(); flush(true); });
  setInterval(function () { if (cur && D.visibilityState === 'visible') flush(); }, 15e3);

  W.GATV = { page: page, step: step, flush: flush, sid: function () { return sid; } };

  /* pages other than the app record themselves; the app calls GATV.page on each route */
  var p = location.pathname.replace(/\/+$/, '') || '/';
  if (p === '/' || p === '/index.html') {
    page('/');
    // landing: the furthest section that came into view, in page order (top = hero, end = footer)
    var start = function () {
      var secs = [].slice.call(D.querySelectorAll('.lp-hero, main section[id]:not([hidden]), .lp-final, .lp-foot'));
      var ids = secs.map(function (s) { return s.id || (s.classList.contains('lp-hero') ? 'top' : s.classList.contains('lp-final') ? 'final' : 'end'); });
      if (!cur) return; cur.order = ids; cur.xi = -1; section('top');
      if (!('IntersectionObserver' in W)) return;
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) section(ids[secs.indexOf(e.target)]); }); }, { threshold: 0.2 });
      secs.forEach(function (s) { io.observe(s); });
    };
    if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', start); else start();
  } else if (p === '/privacy' || p === '/terms') page(p);
})();
