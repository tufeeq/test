/* ============ Video explainers (الشروحات المرئية) ============
   Animated, narrated lessons played by /xp-engine.js. Free lessons come from /xp/free.js; subscribers
   also receive /api/xp/premium.js. XPT (generated) lists every lesson so locked ones can still be shown. */
var XP_PREM = 0, XP_HOOKED = false, XP_BACK = null;
function xpOK() { return !!(window.XP && XP.ready); }
function xpKey(base, lang) { return ((lang || S.lang) === 'en' ? 'en-' : '') + base; }
function xpItems(sk) {
  return Object.entries(XPT).filter(([, m]) => !sk || m.sk === sk).sort((a, b) => a[1].ord - b[1].ord).map(([base, m]) => {
    // which narration the learner sees first follows their explanation language (لغة الشرح), not only the interface
    const vl = xlang() === 'en' ? 'en' : 'ar', key = xpKey(base, vl), alt = AR() ? xpKey(base, vl === 'en' ? 'ar' : 'en') : null, i = AR() ? 0 : 1;
    return { base, key, alt, vl, sk: m.sk, title: m.t[i], min: m.m[i], goal: m.g ? m.g[i] : '', n: m.n, ready: xpOK() && !!XP.get(key), done: !!((S.xp || {})[key] || (alt && (S.xp || {})[alt])) };
  });
}
function xpCard(x, k) {
  const play = '<svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/></svg>';
  if (!x.ready) return `<button type="button" class="xpc locked" data-xplock="${x.base}"><span class="xpn"><span class="pl">${ic('lock', 'i16')}</span><span>${_('شرح مرئي', 'Video')}${k != null ? ' ' + numL(k + 1) : ''}</span><span class="xpm">${esc(x.min)}</span></span><b>${esc(x.title)}</b><small>${PRO() ? _('جارٍ التحميل…', 'Loading…') : _('متاح في برو', 'Available in Pro')}</small></button>`;
  return `<button type="button" class="xpc" data-xp="${x.key}"><span class="xpn"><span class="pl">${play}</span><span>${_('شرح مرئي', 'Video')}${k != null ? ' ' + numL(k + 1) : ''}</span><span class="xpm">${esc(x.min)}</span>${x.done ? `<span class="dn">✓ ${_('أتممته', 'Done')}</span>` : ''}</span><b>${esc(x.title)}</b>${x.goal ? `<small>${esc(x.goal)}</small>` : ''}${x.alt ? `<span class="xp-alt" role="button" tabindex="0" data-xp-alt="${x.alt}">${x.vl === 'en' ? '▶ شاهده بالعربية' : '▶ Watch in English'}</span>` : ''}</button>`;
}
function xpSection(sk) {
  const xs = xpItems(sk); if (!xs.length) return '';
  return `<section class="card xp-sec"><div class="xp-sec-h"><h2>${ic('play', 'i20')} ${_('ابدأ بالشرح المرئي', 'Start with the video explainer')}</h2><span class="chip num">${numL(xs.filter(x => x.done).length)} / ${numL(xs.length)}</span></div>
    <p class="muted small">${_('شرح متحرك بصوت معلّم: يبني المهارة خطوة خطوة، ويتوقف لتجرّب بنفسك، وينتهي بتحدٍّ قصير. ' + (xlang() === 'en' ? 'يُعرض بالإنجليزية حسب تفضيلك، والنسخة العربية تحت كل بطاقة.' : 'الشرح بالعربية والأمثلة بالإنجليزية، والنسخة الإنجليزية تحت كل بطاقة.'), 'An animated lesson narrated by a teacher: it builds the skill step by step, pauses for you to try, and ends with a short challenge.')}</p>
    <div class="xpl">${xs.map((x) => xpCard(x)).join('')}</div></section>`;
}
function xpLearnBody() {
  const all = xpItems(), done = all.filter(x => x.done).length;
  return `${xlSwitch()}<p class="lead">${_('لكل مهارة شرح مرئي تفاعلي: مشاهد متحركة بصوت معلّم، ووقفات تجرّب فيها بنفسك، وتحدٍّ ختامي. شاهد الشرح، ثم اقرأ الدرس، ثم تدرّب.', 'Every skill has an interactive video explainer: animated scenes narrated by a teacher, stops where you try it yourself, and a final challenge. Watch, read the lesson, then practise.')}</p>
    <div class="chips"><span class="chip teal">${numL(done)} / ${numL(all.length)} ${_('أتممت', 'completed')}</span></div>
    ${SEC_ORDER.map(sec => { const xs = all.filter(x => x.sk[0] === sec); return xs.length ? `<h2 class="sec-h c-${sec}">${ic(sec, 'i20')} ${skName(sec)}</h2><div class="xpl">${xs.map((x, k) => xpCard(x, k)).join('')}</div>` : ''; }).join('')}`;
}
function xpOpen(key) { if (!xpOK() || !XP.get(key)) return; XP_BACK = key; track('xp_start', key); XP.open(key); }
function bindXp() {
  $$('[data-xp]').forEach(b => b.onclick = e => { const a = e.target.closest('[data-xp-alt]'); xpOpen(a ? a.dataset.xpAlt : b.dataset.xp); });
  $$('[data-xp-alt]').forEach(a => a.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); xpOpen(a.dataset.xpAlt); } });
  bindXlang();
  $$('[data-xplock]').forEach(b => b.onclick = () => { if (PRO()) { loadPremiumXp(); return; } track('limit_hit', 'xp'); openUpgrade('xp'); });
}
function hookXp() {
  if (XP_HOOKED || !xpOK()) return; XP_HOOKED = true;
  XP.setHooks({
    onDone: (k, sc, n) => { S.xp = S.xp || {}; const w = S.xp[k]; if (!w || sc >= (w.score || 0)) S.xp[k] = { score: sc, n, date: todayStr() }; markDay(); save(); track('xp_done', k, sc); },
    onClose: () => { window._noScroll = true; renderRoute().finally(() => { window._noScroll = false; const b = XP_BACK && document.querySelector(`[data-xp="${XP_BACK}"]`); if (b) b.focus({ preventScroll: true }); }); }
  });
  try { XP.loadTracks(); } catch (e) {}
}
function loadPremiumXp() {
  if (XP_PREM || !PRO() || !xpOK()) return; XP_PREM = 1;
  const s = document.createElement('script'); s.src = '/api/xp/premium.js';
  s.onload = () => { XP_PREM = 2; try { XP.loadTracks(); } catch (e) {} renderRoute(); };
  s.onerror = () => { XP_PREM = 0; s.remove(); };
  document.head.appendChild(s);
}
window.addEventListener('hashchange', () => { if (document.body.classList.contains('xp-open') && xpOK()) XP.close(); });
