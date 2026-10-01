/* GAT Academy (أكاديمية القدرات): legal pages (/privacy, /terms).
   Loaded synchronously in <head> so the theme and language are set before first paint (CSP: script-src 'self').
   - Theme: the site-wide key masar100_theme {"mode":"light"|"dark"|"auto", "accent":…}; no saved mode = prefers-color-scheme (CSS).
   - Language: ?lang=en|ar > saved choice (shared with the landing page) > the app's saved language > Arabic. */
(function () {
  'use strict';
  var D = document, R = D.documentElement;
  R.classList.remove('no-js');

  function sget(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function sset(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  /* ---------- theme ---------- */
  var TKEY = 'masar100_theme';
  function applyTheme() {
    var th = {};
    try { th = JSON.parse(sget(TKEY) || '{}') || {}; } catch (e) { th = {}; }
    if (th.mode === 'light' || th.mode === 'dark') R.setAttribute('data-theme', th.mode); else R.removeAttribute('data-theme');
    if (th.accent && th.accent !== 'violet') R.setAttribute('data-accent', th.accent); else R.removeAttribute('data-accent');
  }
  applyTheme();
  window.addEventListener('storage', function (e) { if (!e.key || e.key === TKEY) applyTheme(); });

  /* ---------- language ---------- */
  var LKEY = 'gat_landing_lang';
  var LANG = 'ar';
  var qp = null;
  try { qp = new URLSearchParams(location.search).get('lang'); } catch (e) {}
  if (qp === 'en' || qp === 'ar') { LANG = qp; sset(LKEY, qp); }
  else {
    var saved = sget(LKEY);
    if (saved === 'en' || saved === 'ar') LANG = saved;
    else { try { var S = JSON.parse(sget('masar100_v1') || 'null'); if (S && S.lang === 'en') LANG = 'en'; } catch (e) {} }
  }
  var TITLE_AR = D.title;

  function setLang(l, user) {
    LANG = l;
    R.lang = l;
    R.dir = l === 'ar' ? 'rtl' : 'ltr';
    var te = R.getAttribute('data-title-en');
    D.title = l === 'en' && te ? te : TITLE_AR;
    var btns = D.querySelectorAll('.lg-switch');
    for (var i = 0; i < btns.length; i++) {
      btns[i].querySelector('.full').textContent = l === 'ar' ? 'English' : 'العربية';
      btns[i].querySelector('.short').textContent = l === 'ar' ? 'EN' : 'ع';
      btns[i].setAttribute('lang', l === 'ar' ? 'en' : 'ar');
      btns[i].setAttribute('aria-label', l === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    }
    if (user) {
      sset(LKEY, l);
      // drop ?lang= so a reload keeps the choice just made; keep the reader's place (same section, other language)
      try {
        var u = new URL(location.href);
        u.searchParams.delete('lang');
        var h = u.hash.match(/^#(ar|en)-(.+)$/);
        if (h) u.hash = '#' + l + '-' + h[2];
        history.replaceState(null, '', u.pathname + u.search + u.hash);
      } catch (e) {}
    }
  }
  setLang(LANG, false);

  /* ---------- after parse: switch button, deep links, TOC highlight ---------- */
  function ready() {
    setLang(LANG, false);

    // a link to the other language's section (#en-rights while reading Arabic) opens the matching one
    var m = location.hash.match(/^#(ar|en)-(.+)$/);
    if (m && m[1] !== LANG) {
      var t = D.getElementById(LANG + '-' + m[2]);
      if (t) { try { history.replaceState(null, '', '#' + LANG + '-' + m[2]); } catch (e) {} t.scrollIntoView(); }
    }

    var btns = D.querySelectorAll('.lg-switch');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        // remember which section is on screen so the reader stays there
        var cur = currentSection();
        setLang(LANG === 'ar' ? 'en' : 'ar', true);
        if (cur) {
          var el = D.getElementById(LANG + '-' + cur);
          if (el) el.scrollIntoView({ block: 'start', behavior: 'instant' });
        } else { window.scrollTo({ top: 0, behavior: 'instant' }); }
        observe();
      });
    }
    observe();
  }

  function sections() {
    return D.querySelectorAll('.lg-doc[data-l="' + LANG + '"] .lg-sec[id]');
  }
  function currentSection() {
    var secs = sections(), best = null;
    for (var i = 0; i < secs.length; i++) {
      if (secs[i].getBoundingClientRect().top < 140) best = secs[i]; else break;
    }
    return best ? best.id.replace(/^(ar|en)-/, '') : null;
  }

  // highlight the TOC entry for the section being read: the last section whose heading has passed ~35% of the viewport
  var links = {}, ticking = false;
  function observe() {
    links = {};
    var ls = D.querySelectorAll('.lg-doc[data-l="' + LANG + '"] .lg-toc a');
    for (var i = 0; i < ls.length; i++) links[ls[i].getAttribute('href').slice(1)] = ls[i];
    highlight();
  }
  function highlight() {
    ticking = false;
    var secs = sections(), on = null, line = Math.max(140, innerHeight * 0.35);
    for (var i = 0; i < secs.length; i++) { if (secs[i].getBoundingClientRect().top <= line) on = secs[i].id; else break; }
    // at the very bottom, the last section is the one being read
    if (secs.length && innerHeight + scrollY >= D.documentElement.scrollHeight - 4) on = secs[secs.length - 1].id;
    for (var k in links) {
      if (k === on) { links[k].classList.add('on'); links[k].setAttribute('aria-current', 'true'); }
      else { links[k].classList.remove('on'); links[k].removeAttribute('aria-current'); }
    }
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(highlight); } }, { passive: true });
  window.addEventListener('resize', function () { if (!ticking) { ticking = true; requestAnimationFrame(highlight); } });

  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', ready); else ready();
})();
