/* ============ Skills layer (GAT model): mastery map, skill lessons, drills with hints & techniques, daily session ============ */
var SKL = null, TECH = null, DRL = null;
async function skillsData() {
  if (!SKL) { const [a, b, c] = await Promise.all([content('skills'), content('techniques'), content('drills')]); SKL = a.items; TECH = b.items; DRL = c.items; }
  return { SKL, TECH, DRL };
}
const SEC_ORDER = ['L', 'R', 'W', 'S'];
const techOf = id => (TECH || []).find(t => t.id === id);
if (!S.recent) S.recent = [];
if (!S.dr) S.dr = {};
const LEVELS = () => [_('لم تبدأ', 'Not started'), _('تأسيس', 'Foundation'), _('تطوير', 'Developing'), _('ثبات', 'Secure'), _('إتقان', 'Mastered')];
function skillInfo(id) {
  const r = S.recent.filter(x => x.s === id).slice(-25), n = r.length;
  if (!n) return { n: 0, acc: null, level: 0 };
  const acc = r.filter(x => x.ok).length / n;
  let level = 1; if (n >= 5 && acc >= .6) level = 2; if (n >= 10 && acc >= .8) level = 3; if (n >= 20 && acc >= .9) level = 4;
  return { n, acc, level };
}
const pips = lv => `<span class="pips" aria-label="${LEVELS()[lv]}">${[1, 2, 3, 4].map(i => `<i class="${i <= lv ? 'on' : ''}"></i>`).join('')}</span>`;
function recordAns(skill, ok, secs, id) {
  S.recent.push({ s: skill, ok: !!ok, t: secs == null ? null : Math.round(secs), d: todayStr(), id: id || null, ts: Date.now() + Math.random() });
  if (S.recent.length > 1500) S.recent = S.recent.slice(-1500);
}
/* exam question types feed the matching skill */
function examSkill(sec, type) {
  if (sec === 'L') return type === 'map' ? 'L-map' : ['mcq', 'mcq2', 'matching'].includes(type) ? 'L-mcq' : ['notes', 'flow', 'table', 'summary'].includes(type) ? 'L-notes' : 'L-detail';
  if (['tfng', 'ynng'].includes(type)) return 'R-tfng';
  if (['headings', 'mcq', 'mcq2'].includes(type)) return 'R-heading';
  if (['info', 'features', 'short'].includes(type)) return 'R-locate';
  return 'R-complete';
}
function rankSkills() { return (SKL || []).map(s => ({ id: s.id, ...skillInfo(s.id) })).sort((a, b) => (a.level - b.level) || ((a.acc ?? .5) - (b.acc ?? .5))); }

/* ---------- mastery map ---------- */
function masteryMap() {
  const col = sec => `<div class="mcol"><div class="mcol-h c-${sec}">${ic(sec, 'i20')} ${skName(sec)}</div><div class="mtiles">${SKL.filter(s => s.sec === sec).map(s => { const i = skillInfo(s.id); return `<a class="mtile l${i.level}" href="#skill/${s.id}"><span class="mt-n">${esc(L(s.title))}</span>${pips(i.level)}<span class="mt-f">${LEVELS()[i.level]}${i.acc != null ? ` · ${numL(Math.round(i.acc * 100))}%` : ''}</span></a>`; }).join('')}</div></div>`;
  return `<div class="mmap">${SEC_ORDER.map(col).join('')}</div>`;
}

/* ---------- learn hub ---------- */
async function pageLearn(tab = 'xp') {
  await skillsData();
  const tabs = [['xp', _('الشروحات المرئية', 'Video explainers')], ['skills', _('المهارات', 'Skills')], ['tech', _('التقنيات والحيل', 'Techniques & tricks')], ['words', _('الكلمات', 'Words')], ['strategy', _('دروس الأسئلة', 'Question-type lessons')]];
  let body = '';
  if (tab === 'xp') body = xpLearnBody();
  else if (tab === 'skills') {
    body = SEC_ORDER.map(sec => `<h2 class="sec-h c-${sec}">${ic(sec, 'i20')} ${skName(sec)}</h2><div class="lgrid">${SKL.filter(s => s.sec === sec).map(s => { const i = skillInfo(s.id), n = DRL.filter(d => d.sk === s.id).length; return `<a class="card lcard" href="#skill/${s.id}"><div class="spread"><h3>${esc(L(s.title))}</h3>${pips(i.level)}</div><p class="small muted">${esc(L(s.tag))}</p><div class="chips">${XPT['xp-' + s.id] ? `<span class="chip gold">${ic('play', 'i16')} ${_('شرح مرئي', 'video')}</span>` : ''}<span class="chip">${numL(n)}+ ${_('تمرين', 'drills')}</span><span class="chip teal">${LEVELS()[i.level]}</span></div></a>`; }).join('')}</div>`).join('');
  } else if (tab === 'tech') {
    const open = freeCount(TECH.length);
    body = `<p class="lead">${_('حيل مختصرة تحفظها وتستخدمها في كل سؤال. كل تمرين في الموقع مربوط بإحدى هذه التقنيات.', 'Short tricks you memorise and use on every question. Every drill on the site is linked to one of them.')}</p>
    ${SEC_ORDER.map(sec => { const ts = TECH.filter(t => t.sk[0] === sec); return `<h2 class="sec-h c-${sec}">${skName(sec)}</h2><div class="notes">${ts.map(t => { const lk = TECH.indexOf(t) >= open; return lk ? `<a class="note-card locked" href="#upgrade"><h3>${esc(L(t.t))}</h3><span class="lock-b">${ic('lock')}${_('برو', 'Pro')}</span></a>` : `<article class="note-card c${TECH.indexOf(t) % 4}"><h3>${esc(L(t.t))}</h3><p>${esc(L(t.d))}</p>${t.ex ? `<p class="ex ltr-text">${esc(t.ex)}</p>` : ''}<a class="tiny" href="#skill/${t.sk}">${esc(L(SKL.find(s => s.id === t.sk).title))}${FW()}</a></article>`; }).join('')}</div>`; }).join('')}`;
  } else if (tab === 'words') { location.hash = '#words'; return ''; }
  else { location.hash = '#lessons'; return ''; }
  return `<div class="page-h"><span class="eyebrow">${_('الحقيبة', 'The kit')}</span><h1>${_('تعلّم المهارات قبل الاختبارات', 'Learn the skills before the tests')}</h1><p>${_('الآيلتس ليس حظًا: هو ١٦ مهارة دقيقة. لكل مهارة شرح بالعربية، وأمثلة محلولة، وفخاخ، وتقنيات، ثم تمارين بالإنجليزية مع تلميح وشرح لكل سؤال.', 'IELTS isn’t luck: it’s 16 micro-skills. Each has an Arabic explanation, worked examples, traps and techniques — then English drills with a hint and an explanation for every question.')}</p></div>
  <nav class="tabs">${tabs.map(([k, l]) => `<a href="#learn/${k}" class="${tab === k ? 'on' : ''}">${l}</a>`).join('')}</nav>${body}`;
}

/* ---------- skill lesson page (GAT layout) ---------- */
async function pageSkill(id) {
  await skillsData();
  const s = SKL.find(x => x.id === id); if (!s) return pageLearn();
  const i = skillInfo(id), techs = TECH.filter(t => t.sk === id), n = DRL.filter(d => d.sk === id).length + (GEN[id] ? 1 : 0);
  // explanation language: in Arabic UI the learner may choose English-first lessons (Arabic one tap away)
  const EN = AR() && xlang() === 'en', P = o => EN ? o.en : L(o), OT = o => EN ? o.ar : o.en, pc = EN ? ' class="ltr-text"' : '', oc = EN ? ' dir="rtl"' : ' class="ltr-text"', sum = EN ? 'بالعربية' : 'English';
  const both = (o) => `<p${pc}>${md(P(o))}</p>${AR() ? `<details class="en-v"><summary>${sum}</summary><p${oc}>${md(OT(o))}</p></details>` : ''}`;
  const list = (o, cls = 'bul') => { const tg = cls === 'nsteps' ? 'ol' : 'ul'; return `<${tg} class="${cls}${EN ? ' ltr-text' : ''}">${P(o).map(x => `<li>${md(x)}</li>`).join('')}</${tg}>${AR() ? `<details class="en-v"><summary>${sum}</summary><${tg} class="${cls}${EN ? '' : ' ltr-text'}"${EN ? ' dir="rtl"' : ''}>${OT(o).map(x => `<li>${md(x)}</li>`).join('')}</${tg}></details>` : ''}`; };
  const side = `<div class="card side-card"><span class="eyebrow">${_('مستوى الإتقان', 'Mastery')}</span><div class="spread">${pips(i.level)}<b>${LEVELS()[i.level]}</b></div>
    <div class="meter"><i style="inline-size:${Math.round((i.acc || 0) * 100)}%"></i></div><p class="small muted">${i.n ? `${numL(i.n)} ${_('إجابة', 'answers')} · ${numL(Math.round(i.acc * 100))}%` : _('لا إجابات بعد', 'No answers yet')}</p>
    <ul class="lvl-rules small">${[[1, _('ابدأ التمرين', 'Start practising')], [2, _('٥ إجابات بدقة ٦٠٪+', '5 answers at 60%+')], [3, _('١٠ إجابات بدقة ٨٠٪+', '10 answers at 80%+')], [4, _('٢٠ إجابة بدقة ٩٠٪+', '20 answers at 90%+')]].map(([k, t]) => `<li class="${i.level >= k ? 'on' : ''}"><b>${LEVELS()[k]}</b> ${t}</li>`).join('')}</ul>
    <button class="btn primary block" data-drill="${id}">${_('تدرّب: ١٠ أسئلة', 'Practise: 10 questions')}</button><p class="tiny muted">${_('كل سؤال فيه تلميح وتقنية وشرح.', 'Every question has a hint, a technique and an explanation.')}</p></div>`;
  setTimeout(() => $$('[data-drill]').forEach(b => b.onclick = () => startDrill({ skills: [b.dataset.drill], n: 10, title: L(s.title) })), 0);
  return `<div class="spread"><a href="#learn/skills" class="btn ghost sm">${BK()}${_('المهارات', 'Skills')}</a><span class="chip c-${s.sec}">${skName(s.sec)}</span></div>
  <div class="page-h"><h1>${esc(L(s.title))}</h1><p>${esc(L(s.tag))}</p></div>
  <div class="lesson2">
    <div class="lesson-main grid">
      ${xpSection(id)}
      <section class="card"><h2>${_('الفكرة', 'The idea')}</h2>${P(s.concept).map(p => `<p${pc}>${md(p)}</p>`).join('')}${AR() ? `<details class="en-v"><summary>${sum}</summary>${OT(s.concept).map(p => `<p${oc}>${md(p)}</p>`).join('')}</details>` : ''}</section>
      <aside class="callout"><span class="eyebrow">${_('العقلية الصحيحة', 'Mindset')}</span>${both(s.mind)}</aside>
      <section class="card"><h2>${_('خطوات الحل', 'Step by step')}</h2>${list(s.steps, 'nsteps')}</section>
      <section><h2 class="h2s">${_('أشكال الأسئلة', 'What it looks like in the test')}</h2><div class="tgrid2">${s.forms.map(f => `<div class="tcell"><b class="ltr-text" style="text-align:start">${esc(f.en)}</b><span>${AR() ? `<b>${esc(f.ar)}</b> · ` : ''}${esc(L(f.d))}</span></div>`).join('')}</div></section>
      ${s.rules ? `<section class="card"><h2>${_('قواعد وعبارات تحفظها', 'Rules & phrases to know')}</h2>${list(s.rules)}</section>` : ''}
      <section class="card warn-card"><h2>${_('الفخاخ', 'Traps')}</h2>${list(s.traps)}</section>
      <section><h2 class="h2s">${_('أمثلة محلولة', 'Worked examples')}</h2><div class="grid">${s.examples.map(e => `<details class="card excard"><summary><div class="src">${esc(e.src)}</div><b class="ltr-text" style="display:block;margin-top:8px">${esc(e.q)}</b><span class="reveal">${_('اضغط لإظهار الحل والشرح', 'Tap to reveal the answer and walk-through')}</span></summary><div class="walk"><b class="ltr-text">${esc(e.a)}</b><br><span${pc}>${esc(P(e.walk))}</span></div></details>`).join('')}</div></section>
      ${techs.length ? `<section><h2 class="h2s">${_('تقنيات هذه المهارة', 'Techniques for this skill')}</h2><div class="notes">${techs.map((t, k) => `<article class="note-card c${k % 4}"${EN ? ' dir="ltr"' : ''}><h3>${esc(P(t.t))}</h3><p>${esc(P(t.d))}</p>${t.ex ? `<p class="ex ltr-text">${esc(t.ex)}</p>` : ''}</article>`).join('')}</div></section>` : ''}
      <section class="card accent-card"><h2>${_('للسرعة', 'Speed tips')}</h2>${list(s.speed)}</section>
      <aside class="callout arab"><span class="eyebrow">${_('للمتعلم العربي', 'For Arabic speakers')}</span>${both(s.arab)}</aside>
      <div class="mobile-cta"><button class="btn primary block" data-drill="${id}">${_('تدرّب: ١٠ أسئلة', 'Practise: 10 questions')}</button></div>
    </div>
    <aside class="lesson-side">${side}</aside>
  </div>`;
}

/* ---------- generators (unlimited practice) ---------- */
const NAMES = ['Hollins', 'Pearce', 'Fairley', 'Whitmore', 'Gaskell', 'Rowntree', 'Ashby', 'Kendrick', 'Mulligan', 'Thornton', 'Bexley', 'Garvey', 'Jessop', 'Ellwood', 'Quigley', 'Vaughan'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const ORD = n => n + (n % 10 === 1 && n !== 11 ? 'st' : n % 10 === 2 && n !== 12 ? 'nd' : n % 10 === 3 && n !== 13 ? 'rd' : 'th');
const rnd = n => Math.floor(Math.random() * n);
const GEN = {
  'L-detail': () => {
    const k = rnd(4);
    if (k === 0) { const nm = NAMES[rnd(NAMES.length)]; const sp = nm.toUpperCase().split('').reduce((a, c, i, arr) => { if (i && arr[i - 1] === c) return a; return a.concat(arr[i + 1] === c ? 'double ' + c : c); }, []).join(', ');
      return { gen: 1, id: 'g-sp', sk: 'L-detail', tech: 'letters', kind: 'type', tts: `My surname is ${nm}. That’s ${sp}.`, q: 'Surname: ____', a: [nm], hint: { ar: 'اكتب الحروف واحدًا واحدًا، و«double» تعني حرفين.', en: 'Write the letters one by one; “double” means two of the same.' }, why: { ar: `التهجئة: ${sp}.`, en: `Spelling: ${sp}.` } }; }
    if (k === 1) { const d1 = 10 + rnd(16), d2 = d1 + 1 + rnd(3), m = MONTHS[rnd(12)]; // d2 ≤ 28: valid in every month
      return { gen: 1, id: 'g-dt', sk: 'L-detail', tech: 'correction', kind: 'type', tts: `We’re arriving on the ${ORD(d1)} of ${m}. Oh, sorry, no — the ${ORD(d2)}.`, q: `Arrival: ____ ${m}`, a: [String(d2), ORD(d2)], hint: { ar: 'انتظر حتى نهاية الجملة: هل يتغيّر التاريخ؟', en: 'Wait for the end: does the date change?' }, why: { ar: `قيل ${d1} ثم صُحّح إلى ${d2}. الإجابة بعد التصحيح.`, en: `${d1} was corrected to ${d2}. The answer follows the correction.` } }; }
    if (k === 2) { const teen = 13 + rnd(7), ty = (teen - 10) * 10, pick = rnd(2) ? teen : ty;
      return { gen: 1, id: 'g-tn', sk: 'L-detail', tech: 'teen-ty', kind: 'type', tts: `The ticket costs ${pick} pounds.`, q: 'Price: £____', a: [String(pick)], hint: { ar: 'أين الضغط في الرقم: في آخره (-teen) أم في أوله (-ty)؟', en: 'Where’s the stress: at the end (-teen) or the start (-ty)?' }, why: { ar: `الرقم ${pick}. في -teen الضغط على آخر الكلمة، وفي -ty على أولها.`, en: `${pick}. -teen stresses the end; -ty stresses the start.` } }; }
    const ph = '07' + Array.from({ length: 9 }, () => rnd(10)).join(''), say = ph.split('').map(c => c === '0' ? 'oh' : c).join(' ').replace(/(\d) \1/g, 'double $1');
    return { gen: 1, id: 'g-ph', sk: 'L-detail', tech: 'predict', kind: 'type', tts: `My number is ${ph.slice(0, 5).split('').join(' ').replace(/0/g, 'oh')}, ${ph.slice(5).split('').join(' ').replace(/0/g, 'oh')}.`, q: 'Phone: ____', a: [ph, ph.slice(0, 5) + ' ' + ph.slice(5)], hint: { ar: '«oh» = صفر. اكتب الأرقام كما تسمعها.', en: '“oh” = zero. Write the digits as you hear them.' }, why: { ar: `الرقم ${ph}.`, en: `The number is ${ph}.` } };
  },
  'W-t1': () => {
    const a = 20 + rnd(60), lo = 10 + rnd(40), hi = 50 + rnd(45); // keeps every value within 0–100%
    const cases = [[lo, Math.min(98, lo + 30 + rnd(20)), 'rose sharply'], [a, a + 2 + rnd(3), 'increased slightly'], [hi, hi - 25 - rnd(15), 'fell dramatically'], [a, a, 'remained stable'], [a, a - 2 - rnd(2), 'dipped slightly']];
    const [x, y, ok] = cases[rnd(cases.length)], all = ['rose sharply', 'increased slightly', 'fell dramatically', 'remained stable', 'dipped slightly'], opts = shuffle([ok, ...shuffle(all.filter(o => o !== ok)).slice(0, 2)]);
    return { gen: 1, id: 'g-tr', sk: 'W-t1', tech: 'trend', kind: 'mcq', src: `Data: the figure went from ${x}% in 2015 to ${y}% in 2020.`, q: 'Which phrase describes the change best?', opts, a: LET[opts.indexOf(ok)], hint: { ar: 'احسب الفرق: كبير؟ صغير؟ لا تغيير؟ ثم اختر الفعل والظرف.', en: 'Work out the difference: big, small or none? Then choose verb + adverb.' }, why: { ar: `من ${x}% إلى ${y}%: ${ok}.`, en: `From ${x}% to ${y}%: ${ok}.` } };
  }
};
async function extraItems(skill) {
  const seedOf = s => [...s].reduce((n, c) => (n * 131 + c.charCodeAt(0)) % 233280, 17) + 1; // stable per item, spreads the correct option across A–D
  if (skill === 'W-grammar') { const er = (await content('arab_errors')).items; return er.flatMap(e => e.drill.map((dr, i) => {
    // dr.a = model correction (string or array), dr.alt = other accepted corrections, dr.d = wrong options → multiple choice
    const acc = [].concat(dr.a, dr.alt || []).filter(Boolean), base = { id: 'e:' + e.id + ':' + i, sk: 'W-grammar', tech: 'arab-check', src: dr.s, hint: dr.hint, why: e.why, lvl: 2 };
    if (dr.d && dr.d.length) { const opts = shuffle([acc[0], ...dr.d], seedOf(e.id + ':' + i)); return { ...base, kind: 'mcq', q: AR() ? 'اختر التصحيح الأنسب' : 'Choose the best correction.', opts, a: LET[opts.indexOf(acc[0])] }; }
    return { ...base, kind: 'type', q: AR() ? 'صحّح الجملة' : 'Correct the sentence.', a: acc };
  })); }
  if (skill === 'R-para') { const pp = (await content('paraphrase')).items; return pp.map(p => { const opts = shuffle([p.t, ...p.d], seedOf(p.id)); return { id: 'p:' + p.id, sk: 'R-para', tech: 'synonym', kind: 'mcq', src: p.q, q: 'Which sentence means the same?', opts, a: LET[opts.indexOf(p.t)], hint: { ar: 'ابحث عن المعنى لا الكلمة، وانتبه للكلمات الصغيرة (some/all، may/will).', en: 'Search for meaning, not words; watch small words (some/all, may/will).' }, why: p.note, lvl: 2 }; }); }
  return [];
}

/* ---------- drill sessions ---------- */
let DS = null;
async function poolFor(skill) { await skillsData(); return [...DRL.filter(d => d.sk === skill), ...(await extraItems(skill))]; }
function pickItems(pool, n) {
  const now = todayStr(), st = id => S.dr[id] || null;
  const due = pool.filter(d => st(d.id) && !st(d.id).ok && (st(d.id).due || now) <= now), unseen = shuffle(pool.filter(d => !st(d.id))), seen = shuffle(pool.filter(d => st(d.id) && st(d.id).ok));
  return [...due, ...unseen, ...seen].slice(0, n);
}
async function startDrill({ skills, n = 10, title, session }) {
  if (!signedIn()) return openAuth('signup', () => startDrill({ skills, n, title, session }));
  if (!PRO() && dailyLeft() <= 0) { track('limit_hit', 'daily'); return openUpgrade('daily'); }
  await skillsData();
  let items = [];
  if (session) items = session;
  else { const per = Math.ceil(n / skills.length); for (const s of skills) { const pool = await poolFor(s); let got = pickItems(pool, per); if (GEN[s]) while (got.length < per) got.push(GEN[s]()); if (GEN[s] && got.length >= per && Math.random() < .3) got[got.length - 1] = GEN[s](); items.push(...got); } items = items.slice(0, n); }
  if (!PRO()) items = items.slice(0, Math.max(1, dailyLeft()));
  if (!items.length) return toast(_('لا توجد تمارين لهذه المهارة بعد.', 'No drills for this skill yet.'));
  if (session && !PRO() && items.length < session.length) toast(_(`الجلسة اختُصرت إلى ${numL(items.length)} أسئلة حسب حدّك اليومي المجاني.`, `Session shortened to ${items.length} questions (your free daily limit).`));
  DS = { sess: !!session, title: title || _('جلسة تدريب', 'Practice session'), items, i: 0, res: [], t0: Date.now(), plays: 0, hint: false, done: false };
  location.hash = '#drill';
}
function pageDrillRun() {
  if (!DS) { setTimeout(() => location.hash = '#practice', 0); return ''; }
  setTimeout(drRender, 0);
  return `<div class="spread"><a href="#practice" class="btn ghost sm" id="dr-quit">${BK()}${_('إنهاء', 'Quit')}</a>${DS.items.every(x => x.sk === DS.items[0].sk) ? '' : `<span class="chip pri">${esc(DS.title)}</span>`}</div><div id="drill-stage" class="drill"></div>`;
}
function ttsSay(text) { try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = 'en-GB'; u.rate = .92; const v = speechSynthesis.getVoices().find(v => /en-GB/i.test(v.lang)); if (v) u.voice = v; speechSynthesis.speak(u); } catch (e) { toast(_('الصوت غير مدعوم في هذا المتصفح', 'Speech is not supported in this browser')); } }
function drPlay(it) { DS.plays++; if (it.gen) return ttsSay(it.tts); const a = new Audio('/audio/dr/' + it.id + '.mp3'); a.volume = S.vol ?? .9; a.play().catch(() => toast(_('تعذّر تشغيل الصوت', 'Audio could not play'))); DS.audio = a; }
function drRender() {
  const el = $('#drill-stage'); if (!el || !DS) return;
  if (DS.i >= DS.items.length) return drSummary();
  const it = DS.items[DS.i], tech = techOf(it.tech), sk = (SKL || []).find(s => s.id === it.sk);
  DS.qt0 = Date.now(); DS.hint = false; DS.plays = 0; DS.answered = false;
  const isL = it.audio || it.tts;
  el.innerHTML = `<div class="drill-top"><div class="meter"><i style="inline-size:${DS.i / DS.items.length * 100}%"></i></div><span class="small muted">${numL(DS.i + 1)} / ${numL(DS.items.length)}</span></div>
  <div class="card drill-card">
    <div class="spread"><a class="chip c-${it.sk[0]}" href="#skill/${it.sk}">${esc(sk ? L(sk.title) : it.sk)}</a>${tech ? `<span class="chip gold">${ic('spark')} ${esc(L(tech.t))}</span>` : ''}</div>
    ${isL ? `<div class="row"><button class="btn teal" id="dr-play">${ic('play')} ${_('استمع', 'Listen')}</button><span class="small muted">${_('في الاختبار تسمع مرة واحدة؛ هنا يمكنك الإعادة مرة.', 'In the test you hear it once; here you may replay once.')}</span></div>` : ''}
    ${it.src ? `<div class="src">${esc(it.src)}</div>` : ''}
    <div class="dq ltr-text">${esc(it.q)}</div>
    ${it.kind === 'mcq' ? `<div class="opt-btns ltr-text">${it.opts.map((o, k) => `<button class="opt-btn" data-k="${LET[k]}"><span class="L">${LET[k]}</span>${esc(o)}</button>`).join('')}</div>` : `<div class="row"><input class="inp ltr-text" id="dr-in" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${_('اكتب إجابتك بالإنجليزية', 'Type your answer')}" style="flex:1;min-width:200px"><button class="btn primary" id="dr-check">${_('تحقق', 'Check')}</button></div>`}
    <div class="row"><button class="btn ghost sm" id="dr-hint">💡 ${_('تلميح', 'Hint')}</button>${it.kind === 'type' ? `<button class="btn ghost sm" id="dr-skip">${_('لا أعرف', 'I don’t know')}</button>` : ''}</div>
    <div id="dr-hint-b" hidden class="hint-box"></div>
    <div id="dr-fb"></div>
  </div>`;
  if (isL) { $('#dr-play').onclick = () => { if (DS.plays >= 2 && !DS.answered) return toast(_('استمعت مرتين. أجب الآن.', 'You’ve listened twice. Answer now.')); drPlay(it); }; setTimeout(() => { if (DS && DS.items[DS.i] === it) drPlay(it); }, 400); }
  $('#dr-hint').onclick = () => { DS.hint = true; const b = $('#dr-hint-b'); b.hidden = false; b.innerHTML = `<div><b>💡</b> ${xlBi(it.hint, true)}</div>${tech ? `<div class="small" style="margin-top:6px">${_('التقنية', 'Technique')}: <b${xlEnFirst() ? ' class="ltr-text"' : ''}>${esc(xlT(tech.t))}</b> — <span${xlEnFirst() ? ' class="ltr-text"' : ''}>${esc(xlT(tech.d))}</span></div>` : ''}`; };
  if (it.kind === 'mcq') el.querySelectorAll('.opt-btn').forEach(b => b.onclick = () => drAnswer(it, b.dataset.k, b));
  else { const go = () => drAnswer(it, $('#dr-in').value); $('#dr-check').onclick = go; $('#dr-in').onkeydown = e => { if (e.key === 'Enter') go(); }; $('#dr-skip').onclick = () => drAnswer(it, ''); setTimeout(() => { const i = $('#dr-in'); if (i && !isL) i.focus(); }, 50); }
}
function drAnswer(it, val, btn) {
  if (DS.answered) return; DS.answered = true;
  const secs = (Date.now() - DS.qt0) / 1000;
  const cmp = x => nrm(x).replace(/[.,;:!?"“”()]/g, ' ').replace(/\s+/g, ' ').trim();
  const ok = it.kind === 'mcq' ? val === it.a : (it.a || []).some(a => cmp(a) === cmp(val));
  if (it.kind === 'mcq') $$('#drill-stage .opt-btn').forEach(b => { b.disabled = true; if (b.dataset.k === it.a) b.classList.add('ok'); }), btn && !ok && btn.classList.add('bad');
  else { $('#dr-in').disabled = true; $('#dr-check').disabled = true; }
  DS.res.push({ it, ok, secs, hint: DS.hint });
  recordAns(it.sk, ok, secs, it.id); useDaily(1); markDay();
  if (!it.gen) { const st = S.dr[it.id] || { c: 0, t: 0 }; st.t++; if (ok) st.c++; st.ok = ok; st.due = addDays(todayStr(), ok ? 7 : 1); S.dr[it.id] = st; }
  save();
  const tech = techOf(it.tech), right = it.kind === 'mcq' ? `${it.a}. ${it.opts[LET.indexOf(it.a)]}` : (it.a || []).join(' / ');
  const transcript = it.lines ? it.lines.map(l => l.t).join(' ') : it.tts || '';
  $('#dr-fb').innerHTML = `<div class="fb ${ok ? 'ok' : 'no'}"><b>${ok ? '✓ ' + _('إجابة صحيحة', 'Correct') + (DS.hint ? ' ' + _('(بمساعدة التلميح)', '(with a hint)') : '') : '✗ ' + _('الإجابة الصحيحة', 'Correct answer') + ': <span class="ltr-text">' + esc(right) + '</span>'}</b>
    ${xlBi(it.why)}
    ${transcript ? `<details><summary class="small">${_('النص المسموع', 'Transcript')}</summary><div class="src">${esc(transcript)}</div></details>` : ''}
    ${!ok && tech ? `<div class="tech-tip">${ic('spark')} ${_('تذكّر التقنية', 'Remember the technique')}: <b>${esc(xlT(tech.t))}</b> — ${esc(xlT(tech.d))}</div>` : ''}</div>
    <button class="btn primary" id="dr-next">${DS.i + 1 < DS.items.length ? _('التالي', 'Next') : _('النتيجة', 'See result')} ${ic('arrow')}</button>`;
  $('#dr-next').onclick = () => { if (DS.audio) DS.audio.pause(); DS.i++; drRender(); };
  setTimeout(() => $('#dr-next') && $('#dr-next').focus({ preventScroll: true }), 50);
}
function drSummary() {
  if (DS && DS.sess) { const d = todayStr(); S.sessionDays = S.sessionDays || []; if (!S.sessionDays.includes(d)) { S.sessionDays.push(d); save(); } }
  const el = $('#drill-stage'), R = DS.res, c = R.filter(r => r.ok).length, avg = R.length ? Math.round(R.reduce((a, r) => a + r.secs, 0) / R.length) : 0;
  const missedTech = [...new Set(R.filter(r => !r.ok).map(r => r.it.tech))].map(techOf).filter(Boolean);
  const skills = [...new Set(R.map(r => r.it.sk))];
  track('test_done', 'drill:' + skills.join(','), Math.round(100 * c / Math.max(1, R.length)));
  el.innerHTML = `<div class="card center grid"><h2>${_('انتهت الجلسة', 'Session complete')}</h2><div class="stamp lg" style="margin:auto;color:var(--pri)"><b>${numL(c)}/${numL(R.length)}</b><small>${_('النتيجة', 'score')}</small></div>
    <p class="muted">${_('متوسط الوقت', 'Average time')}: ${numL(avg)} ${_('ثانية', 's')} · ${_('تلميحات مستخدمة', 'hints used')}: ${numL(R.filter(r => r.hint).length)}</p>
    <div class="list" style="text-align:start">${skills.map(s => { const i = skillInfo(s), sk = SKL.find(x => x.id === s); return `<a class="li" href="#skill/${s}"><span class="li-t"><b>${esc(sk ? L(sk.title) : s)}</b><small class="muted">${LEVELS()[i.level]} · ${i.acc != null ? numL(Math.round(i.acc * 100)) + '%' : ''}</small></span>${pips(i.level)}</a>`; }).join('')}</div>
    ${missedTech.length ? `<div class="notice gold" style="text-align:start"><b>${_('راجع هذه التقنيات', 'Review these techniques')}:</b><ul>${missedTech.map(t => `<li><b>${esc(L(t.t))}</b> — ${esc(L(t.d))}</li>`).join('')}</ul></div>` : ''}
    <div class="row" style="justify-content:center"><button class="btn primary" id="ds-again">${_('جلسة أخرى', 'Another round')}</button><a class="btn" href="#today">${_('خطة اليوم', 'Today')}</a></div></div>`;
  const prev = DS; $('#ds-again').onclick = () => startDrill({ skills: skills, n: prev.items.length, title: prev.title });
  DS.done = true;
}
/* daily session: mistakes due + weakest skills + mixed */
async function startSession() {
  await skillsData();
  const now = todayStr(), items = [];
  const dueIds = Object.entries(S.dr).filter(([, v]) => !v.ok && v.due <= now).map(([k]) => k);
  items.push(...DRL.filter(d => dueIds.includes(d.id)).slice(0, 4));
  const weak = rankSkills().slice(0, 2).map(x => x.id);
  for (const s of weak) { const pool = (await poolFor(s)).filter(d => !items.includes(d)); items.push(...pickItems(pool, 4)); if (GEN[s]) items.push(GEN[s]()); }
  const others = shuffle(SKL.map(s => s.id).filter(s => !weak.includes(s))).slice(0, 4);
  for (const s of others) { const pool = (await poolFor(s)).filter(d => !items.includes(d)); items.push(...pickItems(pool, 1)); }
  startDrill({ session: items.slice(0, 15), title: _('جلسة اليوم', 'Today’s session') });
}

/* ---------- practice hub ---------- */
async function pagePractice() {
  await skillsData();
  const dl = dailyLeft();
  return `<div class="page-h"><span class="eyebrow">${_('التدريب', 'Practice')}</span><h1>${_('تدرّب على كل مهارة حتى تتقنها', 'Practise every skill until you master it')}</h1><p>${_('أسئلة قصيرة بالإنجليزية، ولكل سؤال تلميح بالعربية وتقنية واضحة وشرح للحيلة بعد الإجابة. أخطاؤك تعود إليك تلقائيًا حتى تتقنها.', 'Short English questions, each with an Arabic hint, a named technique and an explanation of the trick. Your mistakes come back automatically until you master them.')}</p></div>
  <div class="card session-card"><div><span class="eyebrow">${_('جلسة اليوم', 'Today’s session')}</span><h2>${_('١٥ سؤالًا مختارة لك', '15 questions picked for you')}</h2><p class="small muted">${_('أخطاء مستحقة + أضعف مهارتين + أسئلة منوّعة', 'Due mistakes + your two weakest skills + a mix')}</p>${dl !== Infinity && signedIn() ? `<p class="small">${_(`متبقٍ لك اليوم ${numL(dl)} ${dl >= 3 && dl <= 10 ? 'أسئلة مجانية' : 'سؤالًا مجانيًا'}`, `${dl} free questions left today`)}</p>` : ''}</div><button class="btn primary" id="pr-sess">${_('ابدأ الجلسة', 'Start session')}</button></div>
  ${SEC_ORDER.map(sec => `<div class="card"><h2 class="c-${sec}">${ic(sec, 'i20')} ${skName(sec)}</h2><div class="list">${SKL.filter(s => s.sec === sec).map(s => { const i = skillInfo(s.id); return `<div class="li"><span class="li-t"><b>${esc(L(s.title))}</b><small class="muted">${LEVELS()[i.level]}${i.acc != null ? ' · ' + numL(Math.round(i.acc * 100)) + '%' : ''}</small></span>${pips(i.level)}<a class="btn ghost sm" href="#skill/${s.id}">${_('الدرس', 'Lesson')}</a><button class="btn sm" data-drill="${s.id}">${_('تدرّب', 'Practise')}</button></div>`; }).join('')}</div>
    ${sec === 'W' ? `<a class="btn ghost sm" href="#writing">${ic('W')} ${_('استوديو الكتابة: اكتب مقالة كاملة', 'Writing studio: write a full task')}</a>` : sec === 'S' ? `<a class="btn ghost sm" href="#speaking">${ic('S')} ${_('غرفة المحادثة: تحدّث وسجّل', 'Speaking room: speak and record')}</a>` : ''}</div>`).join('')}
  <div class="g3"><a class="card tile" href="#mistakes"><h3>${ic('box')} ${_('صندوق الأخطاء', 'Mistake box')}</h3><p class="small muted">${_('أسئلة الاختبارات التي أخطأت فيها', 'Test questions you got wrong')}</p></a><a class="card tile" href="#para"><h3>${ic('globe')} ${_('مدرّب إعادة الصياغة', 'Paraphrase trainer')}</h3></a><a class="card tile" href="#words"><h3>${ic('words')} ${_('بطاقات المفردات', 'Vocabulary cards')}</h3></a></div>`;
}
function bindPractice() {
  const s = $('#pr-sess'); if (s) s.onclick = startSession;
  $$('[data-drill]').forEach(b => b.onclick = async () => { await skillsData(); const sk = SKL.find(x => x.id === b.dataset.drill); startDrill({ skills: [b.dataset.drill], n: 10, title: L(sk.title) }); });
}
