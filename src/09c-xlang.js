/* ============ Explanation language (لغة الشرح) ============
   Independent of the interface language. In the Arabic interface the learner chooses:
     ar  : everything explained in Arabic first (English one tap away)  — the default
     mix : lessons and videos in Arabic, practice hints and explanations in English first
     en  : videos, lessons, hints and explanations in English first (Arabic one tap away)
   After the placement test we suggest a mode from the band, but the learner decides and can change it any time. */
var XL_MODES = ['ar', 'mix', 'en'];
function xlang() { if (!AR()) return 'en'; return XL_MODES.includes(S.xlang) ? S.xlang : 'ar'; }
function xlEnFirst() { return AR() && xlang() !== 'ar'; }              // practice hints/explanations
function xlT(o) { return !o ? '' : xlEnFirst() ? (o.en || L(o)) : L(o); }
/* bilingual block: primary language first, the other behind a one-tap button (Arabic-first keeps the small English line) */
function xlBi(o, inline) {
  if (!o) return '';
  if (!AR()) return inline ? `<span>${esc(o.en || '')}</span>` : `<p>${esc(o.en || '')}</p>`;
  if (!xlEnFirst()) return inline ? `<b>${esc(o.ar)}</b><div class="small ltr-text muted" style="margin-top:6px">${esc(o.en)}</div>` : `<p>${esc(o.ar)}</p><p class="small ltr-text muted">${esc(o.en)}</p>`;
  return `<${inline ? 'b' : 'p'} class="ltr-text" style="display:block">${esc(o.en)}</${inline ? 'b' : 'p'}><button type="button" class="ar-show" data-ar-show>${_('اشرح بالعربية', 'Explain in Arabic')}</button><p class="ar-more small" hidden>${esc(o.ar)}</p>`;
}
document.addEventListener('click', e => { const b = e.target.closest && e.target.closest('[data-ar-show]'); if (!b) return; const n = b.nextElementSibling; if (n) { n.hidden = !n.hidden; b.textContent = n.hidden ? 'اشرح بالعربية' : 'إخفاء العربية'; } });

/* placement band → suggested mode */
function placementBand() {
  const a = S.attempts.filter(x => x.kind === 'diag'); if (!a.length) return null;
  const last = {}; a.forEach(x => last[x.skill] = x.band);
  const v = Object.values(last).filter(x => x != null); if (!v.length) return null;
  return Math.round(v.reduce((s, x) => s + x, 0) / v.length * 2) / 2;
}
function xlSuggest() { const b = placementBand(); if (b == null) return null; return b <= 5 ? 'ar' : b <= 6 ? 'mix' : 'en'; }
function xlName(m) { return { ar: _('بالعربية', 'Arabic'), mix: _('مزدوج', 'Mixed'), en: _('بالإنجليزية', 'English') }[m]; }
function xlDesc(m) {
  return {
    ar: _('الشروحات المرئية والدروس والتلميحات بالعربية، والتدريب بالإنجليزية. الأنسب لمن يبني أساسه.', 'Videos, lessons and hints in Arabic; practice in English.'),
    mix: _('الشروحات المرئية والدروس بالعربية، والتلميحات وشرح الإجابات بالإنجليزية أولًا مع زر للعربية.', 'Videos and lessons in Arabic; hints and answer explanations in English first.'),
    en: _('كل الشرح بالإنجليزية أولًا كما في الاختبار، والعربية بضغطة زر عند الحاجة. الأنسب للمتقدم.', 'Everything explained in English first, Arabic one tap away.')
  }[m];
}
function setXlang(m, from) { if (!XL_MODES.includes(m)) return; S.xlang = m; S.xlangSet = true; save(); track('xlang', m + (from ? ':' + from : '')); renderRoute(); toast(_('أسلوب الشرح الآن: ', 'Explanations now: ') + xlName(m)); }
/* compact switch used on Learn and Settings */
function xlSwitch() {
  if (!AR()) return '';
  const cur = xlang(), sug = xlSuggest();
  return `<div class="xl-sw"><span class="small"><b>${_('لغة الشرح', 'Explanation language')}</b></span><div class="seg" role="group">${XL_MODES.map(m => `<button type="button" data-xl="${m}" class="${cur === m ? 'on' : ''}">${xlName(m)}${sug === m ? ' ★' : ''}</button>`).join('')}</div><span class="tiny muted">${xlDesc(cur)}</span></div>`;
}
/* one-time suggestion after the placement test (shown on Today) */
function xlSuggestCard() {
  if (!AR() || S.xlangSet || !diagTaken()) return '';
  const sug = xlSuggest(), b = placementBand(); if (!sug) return '';
  const why = sug === 'en' ? _(`مستواك المبدئي ${bandL(b)}، وهو مستوى متقدم. ننصحك بالشرح الإنجليزي لتعتاد على لغة الاختبار نفسها، وتبقى العربية بضغطة زر. وإن ناسبك الشرح العربي فاستمر عليه.`, '')
    : sug === 'mix' ? _(`مستواك المبدئي ${bandL(b)}. ننصحك بالأسلوب المزدوج: تفهم المهارة بالعربية، ثم تقرأ التلميحات والشرح بالإنجليزية لترفع لغتك. وإن ناسبك الشرح العربي كاملًا فاستمر عليه.`, '')
    : _(`مستواك المبدئي ${bandL(b)}. ننصحك بالشرح العربي لتبني أساسك بثقة، والتدريب كله بالإنجليزية. يمكنك التحوّل للإنجليزية متى شئت.`, '');
  return `<div class="card xl-card"><span class="eyebrow">${_('أسلوب الشرح المناسب لك', 'Your explanation style')}</span><p>${why}</p>
    <div class="xl-opts">${XL_MODES.map(m => `<button type="button" class="xl-opt ${m === sug ? 'rec' : ''}" data-xl="${m}" data-xl-from="suggest"><b>${xlName(m)}${m === sug ? ` <span class="chip pri">${_('مقترح', 'suggested')}</span>` : ''}</b><small>${xlDesc(m)}</small></button>`).join('')}</div>
    <p class="tiny muted">${_('تستطيع تغييره في أي وقت من «تعلّم» أو الإعدادات.', 'You can change it any time from Learn or Settings.')}</p></div>`;
}
function bindXlang() { $$('[data-xl]').forEach(b => b.onclick = () => setXlang(b.dataset.xl, b.dataset.xlFrom)); }
