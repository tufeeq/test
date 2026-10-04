/* ============ Computer-delivered test engine (Listening + Reading) ============ */
const LIMIT_TXT = {
  '1W': 'ONE WORD ONLY', '1WN': 'ONE WORD AND/OR A NUMBER', '2W': 'NO MORE THAN TWO WORDS', '2WN': 'NO MORE THAN TWO WORDS AND/OR A NUMBER',
  '3W': 'NO MORE THAN THREE WORDS', '3WN': 'NO MORE THAN THREE WORDS AND/OR A NUMBER', 'N': 'A NUMBER'
};
const LIMIT_AR = { '1W': 'كلمة واحدة فقط', '1WN': 'كلمة واحدة و/أو رقمًا', '2W': 'كلمتين على الأكثر', '2WN': 'كلمتين على الأكثر و/أو رقمًا', '3W': 'ثلاث كلمات على الأكثر', '3WN': 'ثلاث كلمات على الأكثر و/أو رقمًا', 'N': 'رقمًا' };
const LET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function instr(g, sec) {
  const r = `${g.from}–${g.to}`, P = sec.skill === 'R' ? `Reading Passage ${sec.pn || 1}` : 'the recording';
  const lim = g.limit ? `<b>${LIMIT_TXT[g.limit]}</b>` : '';
  const ar = { tfng: 'هل تتفق العبارات مع معلومات النص؟ اختر TRUE إذا اتفقت، وFALSE إذا ناقضت النص، وNOT GIVEN إذا لم يذكر النص معلومة تحسم الأمر.',
    ynng: 'هل تتفق العبارات مع آراء الكاتب أو ادعاءاته؟ YES إذا اتفقت، NO إذا ناقضت رأيه، NOT GIVEN إذا لم يُعرف رأيه.',
    mcq: 'اختر الحرف الصحيح.', mcq2: `اختر ${g.to - g.from + 1 === 2 ? 'حرفين' : 'ثلاثة أحرف'}.`, headings: 'اختر العنوان المناسب لكل فقرة. العناوين أكثر من الفقرات.',
    info: 'في أي فقرة توجد المعلومة التالية؟' + (g.reuse ? ' يمكن استخدام الحرف أكثر من مرة.' : ''), features: 'طابق كل عبارة مع الخيار الصحيح.' + (g.reuse ? ' يمكن استخدام الخيار أكثر من مرة.' : ''),
    endings: 'أكمل كل جملة بالنهاية الصحيحة.', matching: 'اختر الإجابة الصحيحة لكل عنصر.', map: 'اكتب الحرف الصحيح من الخريطة لكل مكان.', summary_bank: 'أكمل الملخص باختيار الكلمة المناسبة من القائمة.',
    short: `أجب عن الأسئلة. اكتب ${LIMIT_AR[g.limit] || ''} لكل إجابة.`, def: `أكمل الفراغات. اكتب ${LIMIT_AR[g.limit] || ''} لكل إجابة.` };
  let en;
  switch (g.type) {
    case 'tfng': en = `Do the following statements agree with the information given in ${P}? Choose <b>TRUE</b> if the statement agrees with the information, <b>FALSE</b> if the statement contradicts the information, <b>NOT GIVEN</b> if there is no information on this.`; break;
    case 'ynng': en = `Do the following statements agree with the claims of the writer in ${P}? Choose <b>YES</b> if the statement agrees with the claims of the writer, <b>NO</b> if the statement contradicts the claims of the writer, <b>NOT GIVEN</b> if it is impossible to say what the writer thinks about this.`; break;
    case 'mcq': en = 'Choose the correct letter, <b>A, B, C' + (g.questions.some(q => q.opts.length > 3) ? ' or D' : '') + '</b>.'; break;
    case 'mcq2': en = `Choose <b>${['', '', 'TWO', 'THREE'][g.to - g.from + 1] || g.to - g.from + 1}</b> letters, <b>A–${LET[g.opts.length - 1]}</b>.`; break;
    case 'headings': en = `${sec.skill === 'R' ? 'Reading Passage ' + (sec.pn || 1) + ' has' : 'There are'} ${(sec.data.paras || []).length} paragraphs. Choose the correct heading for each paragraph from the list of headings below.`; break;
    case 'info': en = `${P} has ${(sec.data.paras || []).length} paragraphs, <b>A–${LET[(sec.data.paras || []).length - 1]}</b>. Which paragraph contains the following information?` + (g.reuse ? ' <i>NB You may use any letter more than once.</i>' : ''); break;
    case 'features': case 'matching': en = 'Choose the correct letter for each item.' + (g.reuse ? ' <i>NB You may choose any letter more than once.</i>' : ''); break;
    case 'endings': en = 'Complete each sentence with the correct ending.'; break;
    case 'map': en = `Label the map below. Choose the correct letter, <b>${g.opts[0]}–${g.opts[g.opts.length - 1]}</b>.`; break;
    case 'summary_bank': en = 'Complete the summary using the list of words below.'; break;
    case 'short': en = `Answer the questions below. Write ${lim} for each answer.`; break;
    default: en = `Complete the ${({ notes: 'notes', form: 'form', table: 'table', flow: 'flow-chart', summary: 'summary', sentence: 'sentences' })[g.type] || 'text'} below. Write ${lim} for each answer.`;
  }
  return `<div class="ins">${en}</div>${S.helpAr !== false ? `<div class="ar-help" dir="rtl">${ar[g.type] || ar.def}</div>` : ''}`;
}

/* ---------- normalise + score ---------- */
const nrm = s => String(s == null ? '' : s).toLowerCase().replace(/[’‘`]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim().replace(/[.,;]$/, '').replace(/^£/, '').trim();
function isRight(g, q, a) {
  if (a == null || a === '') return false;
  if (Array.isArray(q.a)) return q.a.some(x => nrm(x) === nrm(a));
  return String(a).toUpperCase() === String(q.a).toUpperCase();
}
function groupQs(g) { return g.type === 'mcq2' ? Array.from({ length: g.to - g.from + 1 }, (_, i) => ({ n: g.from + i, a: g.a[i], ev: g.ev[i], why: g.why, _m2: true })) : g.questions; }
function scoreGroup(g, ans, sk) {
  // returns [{n, ok, given}] for each question of the group
  if (g.type === 'mcq2') {
    const sel = ans[sk + ':g' + g.from] || []; const hits = sel.filter(x => g.a.includes(x)).length;
    return groupQs(g).map((q, i) => ({ n: q.n, ok: i < hits, given: sel.join(', ') }));
  }
  return g.questions.map(q => { const v = ans[sk + ':' + q.n]; return { n: q.n, ok: isRight(g, q, v), given: v || '' }; });
}

/* ---------- maps (listening labels) ---------- */
function mapSVG(m, opts = {}) {
  const W = m.w || 100, H = m.h || 70; let s = `<svg class="mapsvg" viewBox="-2 -2 ${W + 4} ${H + 4}" role="img" aria-label="${esc(m.title || 'map')}"><rect x="0" y="0" width="${W}" height="${H}" fill="#fbfaf6" stroke="#999" stroke-width=".4"/>`;
  const pts = p => p.map(x => x.join(',')).join(' ');
  for (const it of m.items || []) {
    if (it.t === 'road') { s += `<polyline points="${pts(it.pts)}" stroke="#bbb" stroke-width="4.5" fill="none" stroke-linecap="butt"/><polyline points="${pts(it.pts)}" stroke="#fff" stroke-width=".4" stroke-dasharray="2 2" fill="none"/>`; if (it.label) { const [a, b] = [it.pts[0], it.pts[it.pts.length - 1]]; const vert = Math.abs(a[0] - b[0]) < Math.abs(a[1] - b[1]); s += `<text x="${(a[0] + b[0]) / 2 + (vert ? 3.5 : 0)}" y="${(a[1] + b[1]) / 2 + (vert ? 0 : 1.1)}" text-anchor="${vert ? 'start' : 'middle'}" font-size="2.6" font-style="italic">${esc(it.label)}</text>`; } }
    else if (it.t === 'path') s += `<polyline points="${pts(it.pts)}" stroke="#8a7a5a" stroke-width=".8" stroke-dasharray="1.6 1" fill="none"/>`;
    else if (it.t === 'rect') s += `<rect x="${it.x}" y="${it.y}" width="${it.w}" height="${it.h}" fill="#e9e4d6" stroke="#666" stroke-width=".4" rx=".6"/>` + (it.label ? `<text x="${it.x + it.w / 2}" y="${it.y + it.h / 2 + 1}" text-anchor="middle">${esc(it.label)}</text>` : '');
    else if (it.t === 'water') s += `<rect x="${it.x}" y="${it.y}" width="${it.w}" height="${it.h}" fill="#cfe6f5" stroke="#7aa9c9" stroke-width=".4" rx="6"/>` + (it.label ? `<text x="${it.x + it.w / 2}" y="${it.y + it.h / 2 + 1}" text-anchor="middle" font-style="italic">${esc(it.label)}</text>` : '');
    else if (it.t === 'trees') { for (let i = 0; i < 6; i++) { const cx = it.x + (i % 3 + .5) * it.w / 3, cy = it.y + (Math.floor(i / 3) + .5) * it.h / 2; s += `<circle cx="${cx}" cy="${cy}" r="${Math.min(it.w, it.h) / 5}" fill="#cfe3c4" stroke="#7da56c" stroke-width=".3"/>`; } if (it.label) s += `<text x="${it.x + it.w / 2}" y="${it.y + it.h + 3}" text-anchor="middle">${esc(it.label)}</text>`; }
    else if (it.t === 'circle') s += `<circle cx="${it.x}" cy="${it.y}" r="${it.r || 3}" fill="#dfeaf3" stroke="#666" stroke-width=".4"/>` + (it.label ? `<text x="${it.x}" y="${it.y + (it.r || 3) + 3}" text-anchor="middle">${esc(it.label)}</text>` : '');
    else if (it.t === 'you') s += `<path d="M${it.x} ${it.y - 3.2} l2.2 3.2 h-4.4z" fill="#c0392b"/><text x="${it.x}" y="${it.y + 3}" text-anchor="middle" font-weight="700">${esc(it.label || 'You are here')}</text>`;
    else if (it.t === 'slot') s += `<rect x="${it.x - 2.6}" y="${it.y - 2.6}" width="5.2" height="5.2" fill="#fff" stroke="#1a1a1a" stroke-width=".5"/><text x="${it.x}" y="${it.y + 1.1}" text-anchor="middle" font-weight="700" font-size="3.2">${esc(it.k)}</text>`;
  }
  s += `<g transform="translate(${W - 5} 6)"><path d="M0 -4 L1.6 1 L0 0 L-1.6 1z" fill="#1a1a1a"/><text y="-4.8" text-anchor="middle" font-size="2.6" font-weight="700">N</text></g></svg>`;
  return s;
}

/* ---------- render a question group ---------- */
function gapInput(sk, n, review, cur) { const k = sk + ':' + n; const v = EX.ans[k] || ''; if (review) { const r = EX.res[k]; return `<span class="gapw"><span class="qn">${n}</span><b style="color:${r && r.ok ? '#1e7d45' : '#b23125'}">${esc(v || '—')}</b></span>`; } return `<span class="gapw" id="q-${sk}-${n}"><span class="qn">${n}</span><input class="gap" data-k="${k}" value="${esc(v)}" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Question ${n}"></span>`; }
function fillGaps(text, sk, review) { return esc(text).replace(/\{\{(\d+)\}\}/g, (_, n) => gapInput(sk, +n, review)); }
function optSelect(sk, q, keys, review) {
  const k = sk + ':' + q.n, v = EX.ans[k] || '';
  if (review) { const r = EX.res[k]; return `<b style="color:${r && r.ok ? '#1e7d45' : '#b23125'}">${esc(v || '—')}</b>`; }
  return `<select class="sel" data-k="${k}" aria-label="Question ${q.n}"><option value=""></option>${keys.map(x => `<option value="${esc(x)}" ${x === v ? 'selected' : ''}>${esc(x)}</option>`).join('')}</select>`;
}
function rvBlock(g, q, sec) {
  if (!EX.review) return '';
  const sk = sec.key, r = EX.res[q._m2 ? sk + ':g' + g.from + ':' + q.n : sk + ':' + q.n] || {};
  const right = Array.isArray(q.a) ? q.a[0] : q.a;
  const why = q.why || {};
  let evBtn = '';
  if (sec.skill === 'L' && Number.isInteger(q.ev)) evBtn = `<button data-ev-line="${sec.pi}:${q.ev}">▶ ${_('اسمع موضع الإجابة', 'Play where the answer is')}</button>`;
  else if (sec.skill === 'R' && q.ev) evBtn = `<button data-ev-quote="${esc(q.ev)}">${_('أرني الدليل في النص', 'Show the evidence in the text')}</button>`;
  return `<div class="rv"><div dir="${AR() ? 'rtl' : 'ltr'}" style="text-align:start">${_('إجابتك', 'Your answer')}: <bdi class="yours ${r.ok ? 'ok' : 'no'}">${esc(r.given || '—')} ${r.ok ? '✓' : '✗'}</bdi> · ${_('الصحيحة', 'Correct')}: <bdi><b>${esc(right)}</b></bdi>${Array.isArray(q.a) && q.a.length > 1 ? ` <span style="color:#666">(${_('مقبول أيضًا', 'also accepted')}: <bdi>${esc(q.a.slice(1).join(' / '))}</bdi>)</span>` : ''}</div>
    ${xlEnFirst() && why.en ? `<div class="why en">${esc(why.en)}</div>${why.ar ? `<button type="button" class="ar-show" data-ar-show>اشرح بالعربية</button><div class="why ar-more" dir="rtl" hidden>${esc(why.ar)}</div>` : ''}` : `${why.ar ? `<div class="why">${esc(why.ar)}</div>` : ''}${why.en ? `<div class="why en">${esc(why.en)}</div>` : ''}`}${evBtn}</div>`;
}
function groupHTML(g, sec) {
  const sk = sec.key, R = EX.review;
  let h = `<section class="qg" data-from="${g.from}"><h3>Questions ${g.from}${g.to > g.from ? '–' + g.to : ''}</h3>${R ? '' : instr(g, sec)}`;
  const q1 = q => `<span class="qn">${q.n}</span>`;
  switch (g.type) {
    case 'tfng': case 'ynng': {
      const O = g.type === 'tfng' ? ['TRUE', 'FALSE', 'NOT GIVEN'] : ['YES', 'NO', 'NOT GIVEN'];
      for (const q of g.questions) { const k = sk + ':' + q.n, v = EX.ans[k];
        h += `<div class="q" id="q-${sk}-${q.n}">${q1(q)} ${esc(q.q)}<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px">${O.map(o => `<label class="opt"><input type="radio" name="${k}" data-k="${k}" value="${o}" ${v === o ? 'checked' : ''} ${R ? 'disabled' : ''}> ${o}</label>`).join('')}</div>${rvBlock(g, q, sec)}</div>`; }
      break; }
    case 'mcq':
      for (const q of g.questions) { const k = sk + ':' + q.n, v = EX.ans[k];
        h += `<div class="q" id="q-${sk}-${q.n}">${q1(q)} ${esc(q.q)}${q.opts.map((o, i) => `<label class="opt"><input type="radio" name="${k}" data-k="${k}" value="${LET[i]}" ${v === LET[i] ? 'checked' : ''} ${R ? 'disabled' : ''}><b>${LET[i]}</b>&nbsp;${esc(o)}</label>`).join('')}${rvBlock(g, q, sec)}</div>`; }
      break;
    case 'mcq2': { const k = sk + ':g' + g.from, v = EX.ans[k] || [], n = g.to - g.from + 1;
      h += `<div class="q" id="q-${sk}-${g.from}"><span class="qn">${g.from}–${g.to}</span> ${esc(g.q)}${g.opts.map((o, i) => `<label class="opt"><input type="checkbox" data-k2="${k}" data-max="${n}" value="${LET[i]}" ${v.includes(LET[i]) ? 'checked' : ''} ${R ? 'disabled' : ''}><b>${LET[i]}</b>&nbsp;${esc(o)}</label>`).join('')}${R ? rvBlock(g, { ...groupQs(g)[0], a: g.a.join(', '), _m2: true }, sec) : ''}</div>`;
      break; }
    case 'headings': case 'features': case 'endings': case 'matching': case 'summary_bank': {
      const opts = g.type === 'summary_bank' ? g.bank : g.opts;
      h += `<div class="optlist">${g.type === 'headings' ? '<div><b>List of Headings</b></div>' : ''}${opts.map(o => `<div><b>${esc(o.k)}</b> ${esc(o.t)}</div>`).join('')}</div>`;
      if (g.type === 'summary_bank') {
        h += `<div class="qbox">${g.title ? `<div class="qtitle">${esc(g.title)}</div>` : ''}${esc(g.text).replace(/\{\{(\d+)\}\}/g, (_, n) => { const q = g.questions.find(x => x.n === +n); return `<span class="gapw" id="q-${sk}-${n}"><span class="qn">${n}</span>${optSelect(sk, q, opts.map(o => o.k), R)}</span>`; })}</div>`;
        if (R) h += g.questions.map(q => `<div class="q"><span class="qn">${q.n}</span>${rvBlock(g, q, sec)}</div>`).join('');
      } else for (const q of g.questions) h += `<div class="q" id="q-${sk}-${q.n}">${q1(q)} ${esc(q.q)} &nbsp; ${optSelect(sk, q, opts.map(o => o.k), R)}${rvBlock(g, q, sec)}</div>`;
      break; }
    case 'info': { const keys = LET.slice(0, (sec.data.paras || []).length).split('');
      for (const q of g.questions) h += `<div class="q" id="q-${sk}-${q.n}">${q1(q)} ${esc(q.q)} &nbsp; ${optSelect(sk, q, keys, R)}${rvBlock(g, q, sec)}</div>`;
      break; }
    case 'map':
      h += mapSVG(g.map);
      for (const q of g.questions) h += `<div class="q" id="q-${sk}-${q.n}">${q1(q)} ${esc(q.q)} &nbsp; ${optSelect(sk, q, g.opts.map(o => typeof o === 'string' ? o : o.k), R)}${rvBlock(g, q, sec)}</div>`;
      break;
    case 'sentence': case 'short':
      for (const q of g.questions) h += `<div class="q">${g.type === 'short' ? `${q1(q)} ${esc(q.q)}<div style="margin-top:4px">${gapInput(sk, q.n, R).replace(/<span class="qn">\d+<\/span>/, '')}</div>` : fillGaps(q.q, sk, R)}${rvBlock(g, q, sec)}</div>`;
      break;
    case 'notes': case 'form': {
      h += `<div class="qbox">${g.title ? `<div class="qtitle">${esc(g.title)}</div>` : ''}${g.lines.map(l => typeof l === 'string' ? `<div class="notes-l">${fillGaps(l, sk, R)}</div>` : l.h ? `<div class="notes-h">${esc(l.h)}</div>` : `<div class="notes-l notes-b">${fillGaps(l.b, sk, R)}</div>`).join('')}</div>`;
      if (R) h += g.questions.map(q => `<div class="q"><span class="qn">${q.n}</span>${rvBlock(g, q, sec)}</div>`).join('');
      break; }
    case 'table':
      h += `${g.title ? `<div class="qtitle" style="font-weight:700;text-align:center">${esc(g.title)}</div>` : ''}<div style="overflow-x:auto"><table class="ntable"><thead><tr>${g.table[0].map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${g.table.slice(1).map(r => `<tr>${r.map(c => `<td>${fillGaps(c, sk, R)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
      if (R) h += g.questions.map(q => `<div class="q"><span class="qn">${q.n}</span>${rvBlock(g, q, sec)}</div>`).join('');
      break;
    case 'flow':
      h += `${g.title ? `<div style="font-weight:700;text-align:center;margin-bottom:6px">${esc(g.title)}</div>` : ''}${g.steps.map((s, i) => `${i ? '<div class="flowarr">↓</div>' : ''}<div class="flowstep">${fillGaps(s, sk, R)}</div>`).join('')}`;
      if (R) h += g.questions.map(q => `<div class="q"><span class="qn">${q.n}</span>${rvBlock(g, q, sec)}</div>`).join('');
      break;
    case 'summary':
      h += `<div class="qbox">${g.title ? `<div class="qtitle">${esc(g.title)}</div>` : ''}<div style="line-height:2.1">${fillGaps(g.text, sk, R)}</div></div>`;
      if (R) h += g.questions.map(q => `<div class="q"><span class="qn">${q.n}</span>${rvBlock(g, q, sec)}</div>`).join('');
      break;
  }
  return h + '</section>';
}

/* ---------- exam state ---------- */
let EX = null;
const TIMING = {};
async function timingOf(id) { if (TIMING[id]) return TIMING[id]; try { const r = await fetch('/audio/' + id + '.timing.json'); TIMING[id] = r.ok ? await r.json() : {}; } catch (e) { TIMING[id] = {}; } return TIMING[id]; }

/* spec: {kind:'L'|'R'|'diag', title, sections:[{skill, test, idx}], time (sec, reading), mode:'exam'|'practice'} */
async function startTest(spec) {
  if (!signedIn()) return openAuth('signup', () => startTest(spec));
  const secs = [];
  try {
    for (const s of spec.sections) {
      const d = await content(s.test);
      if (s.skill === 'L') { const p = d.parts[s.idx]; secs.push({ skill: 'L', test: s.test, pi: s.idx, data: p, key: s.test + 'p' + (s.idx + 1), audio: `/audio/${s.test}-p${p.part}.mp3`, timing: (await timingOf(s.test))['p' + p.part] || {} }); }
      else { const p = d.passages[s.idx]; secs.push({ skill: 'R', test: s.test, pi: s.idx, pn: p.n, data: p, key: s.test + 'r' + p.n }); }
    }
  } catch (e) { if (e.code === 'locked') return openUpgrade('test'); toast(_('تعذّر تحميل الاختبار. تحقق من اتصالك.', 'Could not load the test. Check your connection.')); return; }
  EX = { spec, secs, cur: 0, ans: {}, flags: new Set(), review: false, res: {}, started: false, mode: spec.mode || 'exam', lpart: 0, audioEl: null, t0: 0, left: spec.time || 0 };
  document.body.classList.add('exam-open');
  const ex = $('#exam'); ex.hidden = false; ex.className = (S.exContrast ? 'contrast ' : '') + (S.exBig ? 'big' : '');
  renderStart();
  track('test_start', spec.kind + ':' + spec.sections.map(s => s.test).join(','));
}
function closeExam() { stopAudio(); clearInterval(EX && EX.timer); EX = null; const ex = $('#exam'); ex.hidden = true; ex.innerHTML = ''; document.body.classList.remove('exam-open'); renderRoute(); }
function renderStart() {
  const sp = EX.spec, L = sp.sections.some(s => s.skill === 'L'), Rd = sp.sections.some(s => s.skill === 'R');
  const nq = EX.secs.reduce((a, s) => a + s.data.groups.reduce((b, g) => b + (g.to - g.from + 1), 0), 0);
  $('#exam').innerHTML = `<div class="ex-top"><span class="cand"><span class="ex-logo">IELTS</span>${esc(sp.title)}</span><button id="ex-x">${_('خروج', 'Exit')}</button></div>
  <div class="ex-start"><span class="eyebrow">IELTS Academy</span><h2>${esc(sp.title)}</h2>
  <ul>${sp.full4 ? `<li><b>4 parts:</b> Listening and Reading (${nq} questions), then a short Writing task (15 minutes) and 3 Speaking questions. About 55 minutes in total.</li><li>Speaking needs a microphone. If you cannot speak, you can describe your level instead.</li>` : `<li>${nq} questions${Rd && sp.time ? ` · ${Math.round(sp.time / 60)} minutes` : ''}</li>`}${L ? `<li>${EX.mode === 'exam' ? 'You will hear each recording ONCE only. The test continues automatically.' : 'Practice mode: you can pause and replay the recording.'}</li>` : ''}<li>Answers are saved automatically. Use the bar at the bottom to move between questions and flag any you want to check.</li></ul>
  <div class="rtl" dir="rtl">${L ? (EX.mode === 'exam' ? 'وضع الاختبار الحقيقي: ستسمع التسجيل مرة واحدة فقط كما في الاختبار المحوسب. ' : 'وضع التدريب: يمكنك إيقاف التسجيل وإعادته. ') + 'شغّل السماعات وتأكد من مستوى الصوت. ' : ''}${Rd ? 'يمكنك تظليل أي جزء من النص بتحديده، والضغط على التظليل يزيله. ' : ''}${sp.full4 ? 'يقيس الاختبار المهارات الأربع: الاستماع ثم القراءة، ثم كتابة قصيرة، ثم ٣ أسئلة محادثة. ' : ''}بعد الانتهاء ترى درجتك في كل مهارة وشرح كل إجابة بالعربية مع موضع الدليل.</div>
  ${L ? `<div class="ex-audio"><button id="ex-test-snd" class="btn sm ghost">🔊 ${_('اختبر الصوت', 'Test sound')}</button> <label class="vol-l">Volume <input type="range" class="vol" id="ex-vol0" min="0" max="1" step="0.05" value="${S.vol ?? 0.9}"></label></div>` : ''}
  <button class="btn primary go" id="ex-go">Start test →</button></div>`;
  $('#ex-x').onclick = () => closeExam();
  const ts = $('#ex-test-snd'); if (ts) ts.onclick = () => { const a = new Audio('/audio/sp/p2stop.mp3'); a.volume = +($('#ex-vol0').value); a.play().catch(() => toast(_('تعذّر تشغيل الصوت', 'Audio could not play'))); };
  const v0 = $('#ex-vol0'); if (v0) v0.oninput = () => { S.vol = +v0.value; };
  $('#ex-go').onclick = () => { EX.started = true; EX.t0 = Date.now(); renderExam(); if (EX.secs[0].skill === 'L') playPart(0); startClock(); };
}
function startClock() {
  clearInterval(EX.timer);
  const sec = EX.secs[EX.cur];
  if (sec.skill === 'R' && !EX.left) EX.left = EX.spec.time || 1200;
  EX.timer = setInterval(() => {
    if (!EX) return;
    const s = EX.secs[EX.cur];
    if (s.skill === 'R' || EX.checking) { EX.left--; if (EX.left <= 0) { clearInterval(EX.timer); finishTest(true); return; } }
    drawClock();
  }, 1000);
}
function drawClock() {
  const el = $('#ex-clock'); if (!el || !EX || !el.querySelector('span')) return; const s = EX.secs[EX.cur];
  let txt;
  if (s.skill === 'L' && !EX.checking) { const a = EX.audioEl; txt = a && a.duration ? `${fmtT(a.currentTime)} / ${fmtT(a.duration)}` : '…'; const pr = $('#ex-prog i'); if (pr && a && a.duration) pr.style.width = (100 * a.currentTime / a.duration) + '%'; }
  else { txt = fmtT(EX.left) + ' left'; el.classList.toggle('low', EX.left < 300); }
  el.querySelector('span').textContent = txt;
}
const fmtT = s => { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };

/* ---------- listening audio ---------- */
function stopAudio() { if (EX && EX.audioEl) { const a = EX.audioEl; a.onended = a.onerror = null; a.pause(); a.removeAttribute('src'); a.load(); EX.audioEl = null; } }
function playPart(i) {
  const s = EX.secs[i]; stopAudio();
  const a = new Audio(s.audio); a.volume = S.vol ?? .9; a.preload = 'auto'; EX.audioEl = a; EX.playing = i;
  a.onended = () => {
    if (!EX || EX.review) return;
    const nx = i + 1;
    if (nx < EX.secs.length && EX.secs[nx].skill === 'L') { EX.cur = nx; renderExam(); setTimeout(() => EX && playPart(nx), 1200); }
    else if (nx < EX.secs.length) { // diagnostic: listening done → reading
      toast(_('انتهى قسم الاستماع. يبدأ الآن قسم القراءة.', 'Listening finished. The reading section starts now.'), 3500);
      EX.cur = nx; EX.left = EX.spec.readTime || 1200; renderExam(); startClock();
    } else { EX.checking = true; EX.left = 120; toast('You now have 2 minutes to check your answers.', 4000); renderExam(); }
  };
  a.onerror = () => toast(_('تعذّر تحميل التسجيل الصوتي.', 'The recording could not be loaded.'), 4000);
  a.play().catch(e => { if (e && e.name === 'NotAllowedError') { toast(_('اضغط تشغيل لبدء التسجيل', 'Press play to start the recording'), 4000); EX.needTap = true; renderExam(); } else toast(_('تعذّر تحميل التسجيل. تحقق من اتصالك ثم أعد المحاولة.', 'The recording could not be loaded. Check your connection and try again.'), 5000); });
}

/* ---------- main exam screen ---------- */
function renderExam(keepScroll) {
  const ex = $('#exam'), sec = EX.secs[EX.cur], R = EX.review;
  const qPane = ex.querySelector('.ex-pane.questions, .ex-pane.full'), y = keepScroll && qPane ? qPane.scrollTop : 0;
  const range = sec.data.groups.length ? `${sec.data.groups[0].from}–${sec.data.groups[sec.data.groups.length - 1].to}` : '';
  const partLabel = sec.skill === 'L' ? `Part ${sec.data.part}` : `${sec.data.section ? 'Section ' + sec.data.section + ' · ' : ''}Reading Passage ${sec.pn}`;
  const audioUI = sec.skill === 'L' && !R ? `<span class="ex-audio">${EX.mode === 'practice' || EX.needTap ? `<button id="ex-pp">${EX.audioEl && !EX.audioEl.paused ? '❚❚' : '▶'}</button>` : ''}<span class="prog" id="ex-prog"><i></i></span><label>🔊 <input type="range" class="vol" id="ex-vol" min="0" max="1" step="0.05" value="${S.vol ?? .9}"></label></span>` : '';
  const passage = sec.skill === 'R' ? passageHTML(sec) : '';
  const transcript = sec.skill === 'L' && R ? `<details class="qg" open><summary style="cursor:pointer;font-weight:700">Transcript · ${_('النص المسموع', 'what you heard')}</summary><div class="tscript" id="tscript">${sec.data.script.map((l, i) => l.t ? `<p data-li="${i}"><span class="sp">${esc(sec.data.speakers[l.s].name)}:</span>${esc(l.t)} <button data-ev-line="${sec.pi}:${i}" class="ts-play">▶</button></p>` : l.break ? '<p class="muted">— — —</p>' : '').join('')}</div></details>` : '';
  ex.innerHTML = `<div class="ex-top"><span class="cand"><span class="ex-logo">IELTS</span>${esc(EX.spec.title)}${R ? ' · REVIEW' : ''}</span>
    <span class="clock" id="ex-clock">${R ? '' : '⏱ <span></span>'}</span>${audioUI}
    <button id="ex-help" title="Arabic help">${S.helpAr !== false ? 'ع ✓' : 'ع'}</button><button id="ex-big" title="Text size">A+</button><button id="ex-con" title="Contrast">◐</button><button id="ex-x">${R ? _('إغلاق', 'Close') : _('خروج', 'Exit')}</button></div>
  <div class="ex-part"><b>${partLabel}</b>${sec.skill === 'L' ? esc(sec.data.intro) + ' ' : ''}Questions ${range}${sec.skill === 'R' ? ` · ${_('اقرأ النص وأجب عن الأسئلة', 'Read the text and answer the questions')}` : ''}</div>
  ${sec.skill === 'R' ? `<div class="ex-tg"><button data-tg="p" class="${EX.showQ ? '' : 'on'}">Passage</button><button data-tg="q" class="${EX.showQ ? 'on' : ''}">Questions</button></div>` : ''}
  <div class="ex-body ${sec.skill === 'R' ? 'split' : ''}${EX.showQ ? ' show-q' : ''}">
    ${sec.skill === 'R' ? `<div class="ex-pane passage" id="ex-passage">${passage}</div><div class="ex-pane questions">` : '<div class="ex-pane full">'}
      ${sec.data.groups.map(g => groupHTML(g, sec)).join('')}${transcript}
      ${R ? `<div style="padding:10px 0 30px"><button class="btn sm" id="ex-back-res">← ${_('ملخص النتيجة', 'Result summary')}</button></div>` : ''}
    </div></div>
  <div class="ex-nav">${navHTML()}<div class="acts">${R ? '' : `<button id="ex-flag">⚑ Review</button>`}${EX.cur > 0 ? '<button id="ex-prev">◀</button>' : ''}${EX.cur < EX.secs.length - 1 && (R || EX.secs[EX.cur + 1].skill === sec.skill || EX.mode === 'practice') ? '<button id="ex-next">▶</button>' : ''}${R ? '' : '<button class="go" id="ex-submit">Submit</button>'}</div></div>`;
  bindExam();
  ex.querySelectorAll('[data-tg]').forEach(b => b.onclick = () => { EX.showQ = b.dataset.tg === 'q'; ex.querySelector('.ex-body').classList.toggle('show-q', EX.showQ); ex.querySelectorAll('[data-tg]').forEach(x => x.classList.toggle('on', x === b)); window.scrollTo(0, 0); });
  { const h = ex.querySelector('.ex-nav .pg.here'); if (h) try { h.scrollIntoView({ inline: 'center', block: 'nearest' }); } catch (e) {} }
  const q2 = ex.querySelector('.ex-pane.questions, .ex-pane.full'); if (q2 && y) q2.scrollTop = y;
  drawClock();
}
function passageHTML(sec) {
  const p = sec.data, key = sec.key;
  if (EX.hl && EX.hl[key] && !EX.review) return EX.hl[key];
  return `<h2>${esc(p.title)}</h2>${p.subtitle ? `<div class="sub">${esc(p.subtitle)}</div>` : ''}${p.paras.map((x, i) => { const t = typeof x === 'string' ? { t: x } : x; return `<p data-pi="${i}">${p.lettered ? `<span class="pl">${LET[i]}</span>` : ''}${t.h ? `<span class="ph">${esc(t.h)}</span>` : ''}${esc(t.t)}</p>`; }).join('')}`;
}
function navHTML() {
  return EX.secs.map((s, si) => {
    const nums = []; for (const g of s.data.groups) for (let n = g.from; n <= g.to; n++) nums.push(n);
    const lab = s.skill === 'L' ? 'Part ' + s.data.part : 'Passage ' + s.pn;
    return `<div class="pg${si === EX.cur ? ' here' : ''}"><span>${lab}</span>${nums.map(n => { const k = s.key + ':' + n; let cls = '';
      if (EX.review) { const r = EX.res[k] || EX.res[Object.keys(EX.res).find(x => x.startsWith(s.key + ':g') && x.endsWith(':' + n))]; cls = r && r.ok ? 'ok' : 'no'; }
      else { const g = s.data.groups.find(g => n >= g.from && n <= g.to); const v = g.type === 'mcq2' ? (EX.ans[s.key + ':g' + g.from] || []).length > n - g.from : EX.ans[k]; if (v) cls = 'ans'; if (EX.flags.has(k)) cls += ' flag'; }
      return `<button class="nb ${cls} ${si === EX.cur && EX.focus === n ? 'cur' : ''}" data-go="${si}:${n}">${n}</button>`; }).join('')}</div>`;
  }).join('');
}
function bindExam() {
  const ex = $('#exam');
  ex.querySelector('#ex-x').onclick = () => { if (EX.review || confirm(_('الخروج دون تسليم؟ ستفقد إجاباتك.', 'Exit without submitting? Your answers will be lost.'))) closeExam(); };
  ex.querySelector('#ex-big').onclick = () => { S.exBig = !S.exBig; ex.classList.toggle('big', S.exBig); save(); };
  ex.querySelector('#ex-con').onclick = () => { S.exContrast = !S.exContrast; ex.classList.toggle('contrast', S.exContrast); save(); };
  ex.querySelector('#ex-help').onclick = () => { S.helpAr = S.helpAr === false; save(); renderExam(true); };
  const vol = ex.querySelector('#ex-vol'); if (vol) vol.oninput = () => { S.vol = +vol.value; if (EX.audioEl) EX.audioEl.volume = S.vol; };
  const pp = ex.querySelector('#ex-pp'); if (pp) pp.onclick = () => { const a = EX.audioEl; if (!a) return playPart(EX.cur); if (a.paused) { a.play(); EX.needTap = false; } else if (EX.mode === 'practice') a.pause(); renderExam(true); };
  ex.querySelectorAll('input.gap').forEach(i => { i.oninput = () => { EX.ans[i.dataset.k] = i.value.trim(); updNav(); }; i.onfocus = () => { EX.focus = +i.dataset.k.split(':')[1]; }; });
  ex.querySelectorAll('select.sel').forEach(i => i.onchange = () => { EX.ans[i.dataset.k] = i.value; updNav(); });
  ex.querySelectorAll('input[type=radio][data-k]').forEach(i => i.onchange = () => { EX.ans[i.dataset.k] = i.value; updNav(); });
  ex.querySelectorAll('input[type=checkbox][data-k2]').forEach(i => i.onchange = () => {
    const k = i.dataset.k2, max = +i.dataset.max; let v = EX.ans[k] || [];
    if (i.checked) { if (v.length >= max) { i.checked = false; toast(`Choose ${max} answers only.`); return; } v = [...v, i.value].sort(); } else v = v.filter(x => x !== i.value);
    EX.ans[k] = v; updNav();
  });
  ex.querySelectorAll('[data-go]').forEach(b => b.onclick = () => { const [si, n] = b.dataset.go.split(':').map(Number); goQ(si, n); });
  const fl = ex.querySelector('#ex-flag'); if (fl) fl.onclick = () => { if (!EX.focus) return toast('Click a question first.'); const k = EX.secs[EX.cur].key + ':' + EX.focus; EX.flags.has(k) ? EX.flags.delete(k) : EX.flags.add(k); updNav(); };
  const pv = ex.querySelector('#ex-prev'); if (pv) pv.onclick = () => { saveHL(); EX.cur--; renderExam(); };
  const nx = ex.querySelector('#ex-next'); if (nx) nx.onclick = () => { saveHL(); EX.cur++; if (!EX.review && EX.mode === 'practice' && EX.secs[EX.cur].skill === 'L') playPart(EX.cur); renderExam(); };
  const sb = ex.querySelector('#ex-submit'); if (sb) sb.onclick = () => { const un = unanswered(); if (confirm(un ? `${un} question(s) unanswered. Submit anyway?` : 'Submit your answers and see your result?')) finishTest(false); };
  const br = ex.querySelector('#ex-back-res'); if (br) br.onclick = () => renderResult();
  ex.querySelectorAll('[data-ev-line]').forEach(b => b.onclick = () => { const [pi, li] = b.dataset.evLine.split(':').map(Number); playLine(pi, li); });
  ex.querySelectorAll('[data-ev-quote]').forEach(b => b.onclick = () => { if (EX.showQ && matchMedia('(max-width:820px)').matches) { EX.showQ = false; ex.querySelector('.ex-body').classList.remove('show-q'); ex.querySelectorAll('[data-tg]').forEach(x => x.classList.toggle('on', x.dataset.tg === 'p')); } showEvidence(b.dataset.evQuote); });
  ex.querySelectorAll('.q, .gapw').forEach(q => q.addEventListener('click', () => { const m = /q-[^-]+-(\d+)/.exec(q.id || ''); if (m) { EX.focus = +m[1]; } }, true));
  const ps = ex.querySelector('#ex-passage');
  if (ps && !EX.review) {
    ps.addEventListener('mouseup', hlSel); ps.addEventListener('touchend', () => setTimeout(hlSel, 50));
    ps.addEventListener('click', e => { if (e.target.tagName === 'MARK' && !e.target.classList.contains('ev')) { const m = e.target; m.replaceWith(...m.childNodes); saveHL(); } });
  }
}
function updNav() { const n = $('#exam .ex-nav'); if (!n) return; const acts = n.querySelector('.acts').outerHTML; n.innerHTML = navHTML() + acts; bindNavOnly(); }
function bindNavOnly() { const ex = $('#exam'); ex.querySelectorAll('[data-go]').forEach(b => b.onclick = () => { const [si, n] = b.dataset.go.split(':').map(Number); goQ(si, n); }); ['#ex-flag', '#ex-prev', '#ex-next', '#ex-submit'].forEach(id => { const el = ex.querySelector(id); if (el) el.replaceWith(el.cloneNode(true)); }); bindActs(); }
function bindActs() { const ex = $('#exam');
  const fl = ex.querySelector('#ex-flag'); if (fl) fl.onclick = () => { if (!EX.focus) return toast('Click a question first.'); const k = EX.secs[EX.cur].key + ':' + EX.focus; EX.flags.has(k) ? EX.flags.delete(k) : EX.flags.add(k); updNav(); };
  const pv = ex.querySelector('#ex-prev'); if (pv) pv.onclick = () => { saveHL(); EX.cur--; renderExam(); };
  const nx = ex.querySelector('#ex-next'); if (nx) nx.onclick = () => { saveHL(); EX.cur++; if (!EX.review && EX.mode === 'practice' && EX.secs[EX.cur].skill === 'L') playPart(EX.cur); renderExam(); };
  const sb = ex.querySelector('#ex-submit'); if (sb) sb.onclick = () => { const un = unanswered(); if (confirm(un ? `${un} question(s) unanswered. Submit anyway?` : 'Submit your answers and see your result?')) finishTest(false); };
}
function goQ(si, n) {
  if (si !== EX.cur) {
    const a = EX.secs[EX.cur], b = EX.secs[si];
    if (!EX.review && EX.mode === 'exam' && a.skill !== b.skill) return toast(_('لا يمكن العودة إلى قسم آخر أثناء الاختبار.', 'You cannot move to another section during the test.'));
    saveHL(); EX.cur = si; renderExam();
  }
  if (EX.secs[si].skill === 'R' && !EX.showQ && matchMedia('(max-width:820px)').matches) { EX.showQ = true; const bd = $('#exam .ex-body'); if (bd) bd.classList.add('show-q'); $$('#exam [data-tg]').forEach(x => x.classList.toggle('on', x.dataset.tg === 'q')); }
  EX.focus = n; const el = document.getElementById(`q-${EX.secs[si].key}-${n}`) || $(`#exam [data-from="${n}"]`);
  if (el) { el.scrollIntoView({ block: 'center', behavior: 'smooth' }); const inp = el.querySelector('input,select'); if (inp && !EX.review) inp.focus({ preventScroll: true }); }
  updNav();
}
function unanswered() { let n = 0; for (const s of EX.secs) for (const g of s.data.groups) { if (g.type === 'mcq2') n += Math.max(0, (g.to - g.from + 1) - (EX.ans[s.key + ':g' + g.from] || []).length); else for (const q of g.questions) if (!EX.ans[s.key + ':' + q.n]) n++; } return n; }
/* highlighting in the reading passage */
function hlSel() {
  const sel = window.getSelection(); if (!sel || sel.isCollapsed || !sel.rangeCount) return;
  const r = sel.getRangeAt(0), ps = $('#ex-passage'); if (!ps.contains(r.commonAncestorContainer)) return;
  try { const m = document.createElement('mark'); r.surroundContents(m); sel.removeAllRanges(); saveHL(); } catch (e) { /* selection crosses paragraphs: ignore */ }
}
function saveHL() { const ps = $('#ex-passage'); if (!ps || EX.review) return; EX.hl = EX.hl || {}; EX.hl[EX.secs[EX.cur].key] = ps.innerHTML; }
function showEvidence(q) {
  const ps = $('#ex-passage'); if (!ps) return;
  ps.querySelectorAll('mark.ev').forEach(m => m.replaceWith(...m.childNodes)); ps.normalize();
  for (const p of ps.querySelectorAll('p')) {
    const tn = [...p.childNodes].find(n => n.nodeType === 3 && n.nodeValue.includes(q));
    if (tn) { const i = tn.nodeValue.indexOf(q); const r = document.createRange(); r.setStart(tn, i); r.setEnd(tn, i + q.length); const m = document.createElement('mark'); m.className = 'ev'; r.surroundContents(m); m.scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
  }
}
let lineAudio = null;
function playLine(pi, li) {
  const sec = EX.secs.find(s => s.skill === 'L' && s.pi === pi); if (!sec) return;
  const t = sec.timing.lines && sec.timing.lines[li]; if (!t) return toast(_('التوقيت غير متاح لهذا السطر.', 'Timing not available for this line.'));
  if (lineAudio) lineAudio.pause();
  lineAudio = new Audio(sec.audio); lineAudio.volume = S.vol ?? .9;
  const start = Math.max(0, t[0] - 0.3), end = t[1] + 0.4;
  lineAudio.addEventListener('loadedmetadata', () => { lineAudio.currentTime = start; lineAudio.play().catch(() => {}); }, { once: true });
  lineAudio.ontimeupdate = () => { if (lineAudio.currentTime >= end) lineAudio.pause(); };
  $$('#tscript p').forEach(p => p.classList.toggle('playing', +p.dataset.li === li));
  const p = $(`#tscript p[data-li="${li}"]`); if (p && EX.secs[EX.cur] === sec) p.scrollIntoView({ block: 'center', behavior: 'smooth' });
  else if (EX.secs[EX.cur] !== sec) { EX.cur = EX.secs.indexOf(sec); renderExam(); setTimeout(() => { const p2 = $(`#tscript p[data-li="${li}"]`); if (p2) { p2.classList.add('playing'); p2.scrollIntoView({ block: 'center' }); } }, 50); }
}

/* ---------- finish + scoring ---------- */
function finishTest(auto) {
  saveHL(); stopAudio(); clearInterval(EX.timer);
  if (auto) toast(_('انتهى الوقت وسُلّمت إجاباتك.', 'Time is up. Your answers have been submitted.'));
  const res = {}, bySkill = { L: { c: 0, t: 0 }, R: { c: 0, t: 0 } }, qt = {}, wrong = [];
  for (const s of EX.secs) for (const g of s.data.groups) {
    const sc = scoreGroup(g, EX.ans, s.key);
    sc.forEach((r, i) => {
      const k = g.type === 'mcq2' ? s.key + ':g' + g.from + ':' + r.n : s.key + ':' + r.n; res[k] = r; if (g.type === 'mcq2') res[s.key + ':' + r.n] = r;
      bySkill[s.skill].t++; if (r.ok) bySkill[s.skill].c++;
      const tk = s.skill + ':' + g.type; (qt[tk] = qt[tk] || { c: 0, t: 0 }).t++; if (r.ok) qt[tk].c++;
      qtAdd(s.skill, g.type, r.ok);
      recordAns(examSkill(s.skill, g.type), r.ok, null);
      if (!r.ok) wrong.push({ test: s.test, skill: s.skill, pi: s.pi, n: r.n, type: g.type });
    });
  }
  EX.res = res; EX.review = false;
  const date = todayStr(), sp = EX.spec, mod = S.module, made = [];
  for (const k of ['L', 'R']) {
    const x = bySkill[k]; if (!x.t) continue;
    const full = x.t >= 40, band = rawToBand(x.c, x.t, k === 'L' ? 'L' : (EX.secs.find(s => s.skill === 'R').test[0] === 'G' ? 'gt' : 'ac'));
    const id = uid();
    const a = { id, kind: sp.kind, skill: k, test: [...new Set(EX.secs.filter(s => s.skill === k).map(s => s.test))].join('+'), secs: EX.secs.filter(s => s.skill === k).map(s => s.key), raw: x.c, of: x.t, band, full, mode: EX.mode, date, dur: Math.round((Date.now() - EX.t0) / 1000) };
    S.attempts.push(a); made.push(a);
    S.details[id] = { ans: EX.ans, spec: sp };
  }
  // mistakes box: wrong answers become review cards (spaced repetition)
  for (const w of wrong) { const k = `${w.test}:${w.skill}:${w.pi}:${w.n}`; if (!S.mistakes.some(m => m.k === k)) S.mistakes.push({ k, test: w.test, skill: w.skill, pi: w.pi, n: w.n, type: w.type, date, box: 0, due: date }); }
  if (S.mistakes.length > 400) S.mistakes = S.mistakes.slice(-400);
  markDay(); save();
  EX.result = { bySkill, qt, made };
  made.forEach(a => track(sp.kind === 'diag' ? 'diag_done' : 'test_done', a.skill + ':' + a.test, a.band));
  if (sp.kind === 'diag' && sp.full4) return placeStart();
  renderResult();
}
function renderResult() {
  const ex = $('#exam'), r = EX.result, R = EX.res;
  EX.review = true;
  const rows = Object.entries(r.qt).sort((a, b) => a[1].c / a[1].t - b[1].c / b[1].t).map(([k, v]) => `<tr><td>${skName(k[0])}</td><td>${esc(qtName(k.slice(2)))}</td><td>${v.c}/${v.t}</td><td>${Math.round(100 * v.c / v.t)}%</td></tr>`).join('');
  const worst = Object.entries(r.qt).filter(([, v]) => v.t >= 2).sort((a, b) => a[1].c / a[1].t - b[1].c / b[1].t)[0];
  const lessonFor = worst ? examSkill(worst[0][0], worst[0].slice(2)) : null, lsk = lessonFor && (typeof SKL !== 'undefined' && SKL || []).find(x => x.id === lessonFor);
  ex.innerHTML = `<div class="ex-top"><span class="cand"><span class="ex-logo">IELTS</span>${esc(EX.spec.title)} · RESULT</span><span class="clock"></span><button id="ex-x">${_('إغلاق', 'Close')}</button></div>
  <div class="ex-pane full" style="overflow:auto"><div class="result-top">
    ${placeOverallHTML(r.made)}<div style="display:flex;gap:30px;flex-wrap:wrap;justify-content:center">${r.made.map(a => `<div><div class="small muted">${skName(a.skill)}${a.full ? '' : ' · ' + _('تقدير', 'estimate')}</div><div class="big">${fmtBand(a.band)}</div><div class="small">${a.raw == null ? (a.ai ? _('بالمصحح الذكي', 'AI examiner') : a.self ? _('وصف ذاتي', 'self-rating') : _('تقدير آلي', 'auto estimate')) : `${a.raw} / ${a.of} ${_('صحيحة', 'correct')}`}</div></div>`).join('')}</div>
    <div dir="${AR() ? 'rtl' : 'ltr'}" style="font-family:var(--f-body);max-width:560px">${EX.spec.full4 ? _('هذا مستواك المبدئي في المهارات الأربع. درجتا الكتابة والمحادثة تقديريتان من مهمة قصيرة، وتتضحان أكثر مع تدريبك. ', 'This is your starting level in all four skills. Writing and speaking are estimates from short tasks and become more accurate as you practise. ') : r.made.some(a => !a.full) ? _('هذه درجة تقديرية لأنك أجبت عن جزء من الاختبار؛ الاختبار الكامل (٤٠ سؤالًا) يعطي درجة أدق.', 'This is an estimate because you answered part of a test; a full 40-question test gives a more reliable band.') + ' ' : ''}${worst ? _(`أضعف نوع أسئلة في هذه المحاولة: «${qtName(worst[0].slice(2))}». `, `Your weakest question type this time: “${qtName(worst[0].slice(2))}”. `) : ''}${_('أُضيفت أخطاؤك إلى صندوق الأخطاء لمراجعتها لاحقًا.', 'Your mistakes have been added to your mistake box for spaced review.')}</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center"><button class="btn primary" id="rv-go">${_('راجع الإجابات مع الشرح', 'Review answers with explanations')}</button>${lessonFor ? `<button class="btn" id="rv-lesson">${_('ادرس المهارة', 'Study the skill')}${lsk ? ': ' + esc(L(lsk.title)) : ''}</button><button class="btn teal" id="rv-drill">${_('تدرّب عليها: ١٠ أسئلة مع تلميحات', 'Drill it: 10 questions with hints')}</button>` : ''}</div>
    ${rows ? `<table class="qt-table"><tr><th>${_('المهارة', 'Skill')}</th><th>${_('نوع السؤال', 'Question type')}</th><th>${_('النتيجة', 'Score')}</th><th>%</th></tr>${rows}</table>` : ''}
  </div></div>`;
  ex.querySelector('#ex-x').onclick = () => closeExam();
  ex.querySelector('#rv-go').onclick = () => { EX.cur = 0; renderExam(); };
  const rl = ex.querySelector('#rv-lesson'); if (rl) rl.onclick = () => { const id = lessonFor; closeExam(); location.hash = '#skill/' + id; };
  const rd = ex.querySelector('#rv-drill'); if (rd) rd.onclick = () => { const id = lessonFor; closeExam(); startDrill({ skills: [id] }); };
}
const LESSON_FOR = { tfng: 'R-tfng', ynng: 'R-tfng', headings: 'R-headings', info: 'R-headings', summary: 'R-completion', summary_bank: 'R-completion', sentence: 'R-completion', short: 'R-completion', table: 'R-completion', form: 'L-form', notes: 'L-notes', mcq: 'L-mcq', mcq2: 'L-mcq', map: 'L-map', matching: 'L-mcq', features: 'R-headings', endings: 'R-completion', flow: 'R-completion' };

/* review a past attempt (from progress page) */
async function reviewAttempt(id) {
  const a = S.attempts.find(x => x.id === id), d = S.details[id]; if (!a || !d) return toast(_('تفاصيل هذه المحاولة غير محفوظة.', 'Details for this attempt are not saved.'));
  await startTest(d.spec); if (!EX) return;
  EX.ans = d.ans; EX.started = true;
  const res = {}; for (const s of EX.secs) for (const g of s.data.groups) scoreGroup(g, EX.ans, s.key).forEach(r => { res[s.key + ':' + r.n] = r; if (g.type === 'mcq2') res[s.key + ':g' + g.from + ':' + r.n] = r; });
  EX.res = res; EX.review = true; EX.result = { qt: {}, made: [a] }; EX.cur = Math.max(0, EX.secs.findIndex(s => s.skill === a.skill)); renderExam();
}
