/* ============ Words: spaced-repetition vocabulary, paraphrase trainer, error drills, mistake box ============ */
const BOX_DAYS = [0, 1, 3, 7, 16, 35];
async function allCards() {
  const [ac, tp] = await Promise.all([content('academic'), content('topics')]);
  const cards = ac.items.map(v => ({ id: 'a:' + v.w, deck: 'academic', lvl: v.lvl, w: v.w, pos: v.pos, ar: v.ar, ex: v.ex, col: v.col, fam: v.fam }));
  tp.items.forEach(t => t.words.forEach(v => cards.push({ id: 't:' + v.w, deck: t.id, deckName: t.topic, w: v.w, ar: v.ar, ex: v.ex })));
  return { cards, topics: tp.items };
}
function cardOpen(c, i, list) { if (PRO()) return true; const f = +FREE.cardsFrac || 0; const same = list.filter(x => x.deck === c.deck); return same.indexOf(c) < Math.ceil(same.length * f); }
async function pageWords() {
  const { cards, topics } = await allCards();
  const due = cards.filter((c, i) => cardOpen(c, i, cards) && S.vocab[c.id] && S.vocab[c.id].due <= todayStr()).length;
  const learned = Object.values(S.vocab).filter(v => v.box >= 3).length;
  const pd = (await content('paraphrase')).items.length, er = (await content('arab_errors')).items;
  const mis = S.mistakes.filter(m => m.due <= todayStr()).length;
  const deck = (id, name, n) => `<a class="li" href="#cards/${id}"><span class="li-t"><b>${esc(name)}</b><small class="muted">${numL(n)} ${_('بطاقة', 'cards')}</small></span>${ic('arrow')}</a>`;
  return `<div class="page-h"><span class="eyebrow">${_('الكلمات والمهارات الدقيقة', 'Words & micro-skills')}</span><h1>${_('بنك الكلمات', 'Word bank')}</h1><p>${_('سرّ الاستماع والقراءة هو «إعادة الصياغة»: السؤال يقول الفكرة بكلمات غير كلمات النص. هنا تبني مفرداتك بالتكرار المتباعد، وتتدرّب على اكتشاف إعادة الصياغة، وتعالج الأخطاء الشائعة عند المتعلمين العرب.', 'The secret of Listening and Reading is paraphrase: questions say the same idea in different words. Build vocabulary with spaced repetition, train your paraphrase radar and fix common Arabic-speaker errors.')}</p></div>
  <div class="g3">
    <a class="card tile" href="#cards/due"><span class="t-ic" style="background:var(--gold-soft)">${ic('refresh', 'i20')}</span><h3>${_('مراجعة اليوم', 'Today’s review')}</h3><p class="small muted">${numL(due)} ${_('بطاقة مستحقة', 'cards due')} · ${numL(learned)} ${_('كلمة متقنة', 'words mastered')}</p></a>
    <a class="card tile" href="#para"><span class="t-ic bg-R" style="color:#fff">${ic('globe', 'i20')}</span><h3>${_('مدرّب إعادة الصياغة', 'Paraphrase trainer')}</h3><p class="small muted">${_('أهم مهارة في الآيلتس، بتمارين قصيرة.', 'The key IELTS skill, in short drills.')} (${numL(pd)})</p></a>
    <a class="card tile" href="#mistakes"><span class="t-ic bg-W" style="color:#fff">${ic('box', 'i20')}</span><h3>${_('صندوق الأخطاء', 'Mistake box')}</h3><p class="small muted">${numL(mis)} ${_('للمراجعة اليوم', 'to review today')} · ${numL(S.mistakes.length)} ${_('إجمالًا', 'in total')}</p></a>
  </div>
  <div class="g2">
    <div class="card"><h2>${_('مجموعات البطاقات', 'Card decks')}</h2><div class="list">${deck('academic', _('مفردات أكاديمية أساسية', 'Core academic words'), cards.filter(c => c.deck === 'academic').length)}${topics.map(t => deck(t.id, L(t.topic), t.words.length)).join('')}</div></div>
    <div class="card"><h2>${_('أخطاء المتعلم العربي', 'Arabic-speaker errors')}</h2><p class="small muted">${_('كل خطأ مع شرح السبب من العربية وتمارين تصحيح.', 'Each error with why it happens and correction drills.')}</p><div class="list">${er.map(e => `<a class="li" href="#drill/${e.id}"><span class="li-t"><b>${esc(L(e.title))}</b><small class="muted ltr-text" style="text-align:start">✗ ${esc(e.wrong)}</small></span>${S.drills[e.id] ? `<span class="chip ok">${numL(S.drills[e.id])}</span>` : ''}</a>`).join('')}</div></div>
  </div>`;
}
let FC = null;
async function pageCards(deck) {
  const { cards } = await allCards();
  let list = cards.filter((c, i) => cardOpen(c, i, cards));
  if (deck === 'due') list = list.filter(c => S.vocab[c.id] && S.vocab[c.id].due <= todayStr());
  else list = list.filter(c => c.deck === deck).sort((a, b) => ((S.vocab[a.id] || { due: '' }).due || '').localeCompare((S.vocab[b.id] || { due: '' }).due || ''));
  const lockedN = deck === 'due' ? 0 : cards.filter(c => c.deck === deck).length - list.length;
  list = list.filter(c => !S.vocab[c.id] || S.vocab[c.id].due <= todayStr()).slice(0, 20);
  FC = { list, i: 0, flip: false, deck, lockedN };
  setTimeout(fcRender, 0);
  return `<div class="spread"><a href="#words" class="btn ghost sm">← ${_('بنك الكلمات', 'Word bank')}</a></div><div id="fc"></div>`;
}
function fcRender() {
  const el = $('#fc'); if (!el) return;
  if (FC.i >= FC.list.length) { el.innerHTML = `<div class="card center"><h2>${FC.list.length ? _('أحسنت! أنهيت هذه الجولة.', 'Well done! Round complete.') : _('لا بطاقات مستحقة الآن.', 'No cards due right now.')}</h2><p class="muted">${_('سنعيد كل كلمة في الوقت المناسب قبل أن تنساها.', 'Each word comes back just before you would forget it.')}</p>${FC.lockedN ? `<p>${_(`${numL(FC.lockedN)} بطاقة أخرى في هذه المجموعة متاحة للمشتركين.`, `${FC.lockedN} more cards in this deck are available with Pro.`)} <a href="#upgrade">${_('الباقات', 'Plans')}</a></p>` : ''}<a class="btn primary" href="#words">${_('تم', 'Done')}</a></div>`; return; }
  const c = FC.list[FC.i];
  el.innerHTML = `<p class="center small muted">${numL(FC.i + 1)} / ${numL(FC.list.length)}</p><div class="flash ${FC.flip ? 'flip' : ''}" id="fc-card" role="button" tabindex="0" aria-label="${_('اقلب البطاقة', 'Flip card')}"><div class="flash-in"><div class="flash-f"><div class="word">${esc(c.w)}</div>${c.pos ? `<span class="chip">${esc(c.pos)}</span>` : ''}<p class="tiny muted">${_('اضغط لترى المعنى', 'Tap to see the meaning')}</p></div>
  <div class="flash-b"><div class="word" style="font-size:1.3rem">${esc(c.w)}</div><b style="font-size:1.3rem">${esc(c.ar)}</b><div class="ex">${esc(c.ex)}</div>${c.col && c.col.length ? `<div class="chips" style="justify-content:center">${c.col.map(x => `<span class="chip teal ltr-text">${esc(x)}</span>`).join('')}</div>` : ''}${c.fam && c.fam.length ? `<div class="tiny muted ltr-text" style="text-align:center">${esc(c.fam.join(' · '))}</div>` : ''}</div></div></div>
  <div class="row" style="justify-content:center;margin-top:16px">${FC.flip ? `<button class="btn" data-k="0">${_('لم أعرفها', 'Didn’t know')}</button><button class="btn" data-k="1">${_('بصعوبة', 'Hard')}</button><button class="btn teal" data-k="2">${_('عرفتها', 'Knew it')}</button>` : `<button class="btn primary" id="fc-flip">${_('أظهر المعنى', 'Show meaning')}</button>`}<button class="btn ghost sm" id="fc-say" aria-label="pronounce">🔊</button></div>`;
  const flip = () => { FC.flip = true; fcRender(); };
  $('#fc-card').onclick = flip; $('#fc-card').onkeydown = e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); } };
  const f = $('#fc-flip'); if (f) f.onclick = flip;
  $('#fc-say').onclick = () => { try { const u = new SpeechSynthesisUtterance(c.w); u.lang = 'en-GB'; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e) {} };
  el.querySelectorAll('[data-k]').forEach(b => b.onclick = () => {
    const k = +b.dataset.k, v = S.vocab[c.id] || { box: 0 };
    v.box = k === 0 ? 0 : k === 1 ? Math.max(1, v.box) : Math.min(5, v.box + 1); v.due = addDays(todayStr(), k === 0 ? 0 : BOX_DAYS[v.box]); S.vocab[c.id] = v;
    if (k === 0) FC.list.push(c);
    FC.i++; FC.flip = false; markDay(); save(); fcRender();
  });
}

/* paraphrase trainer */
let PT = null;
async function pagePara() {
  const items = (await content('paraphrase')).items;
  const order = items.slice().sort((a, b) => { const A = S.para[a.id] || { c: 0, t: 0 }, B = S.para[b.id] || { c: 0, t: 0 }; return (A.t ? A.c / A.t : -1) - (B.t ? B.c / B.t : -1); });
  PT = { list: order.slice(0, 10), i: 0, score: 0 };
  setTimeout(ptRender, 0);
  return `<div class="spread"><a href="#words" class="btn ghost sm">← ${_('بنك الكلمات', 'Word bank')}</a><span class="chip teal">${_('١٠ أسئلة', '10 questions')}</span></div><div class="card"><h2>${_('مدرّب إعادة الصياغة', 'Paraphrase trainer')}</h2><p class="small muted">${_('اختر العبارة التي تقول المعنى نفسه بالضبط — كما يحدث بين السؤال والنص في الاختبار.', 'Choose the sentence that means exactly the same — just like question vs text in the test.')}</p><div id="pt"></div></div>`;
}
function ptRender() {
  const el = $('#pt'); if (!el) return;
  if (PT.i >= PT.list.length) { el.innerHTML = `<div class="center grid"><div class="stamp c-R" style="margin:auto"><b>${numL(PT.score)}/${numL(PT.list.length)}</b><small>score</small></div><a class="btn primary" href="#para">${_('جولة جديدة', 'New round')}</a></div>`; return; }
  if (!PRO() && dailyLeft() <= 0) { el.innerHTML = `<div class="notice gold">${_('أنهيت أسئلتك المجانية لليوم. اشترك لتمارين غير محدودة.', 'You have used today’s free questions. Subscribe for unlimited practice.')} <a href="#upgrade">${_('الباقات', 'Plans')}</a></div>`; return; }
  const p = PT.list[PT.i], opts = shuffle([p.t, ...p.d]);
  el.innerHTML = `<p class="small muted">${numL(PT.i + 1)} / ${numL(PT.list.length)}</p><div class="src">${esc(p.q)}</div><p class="small">${_('أي عبارة تعني الشيء نفسه؟', 'Which sentence means the same?')}</p><div class="opt-btns ltr-text">${opts.map((o, i) => `<button class="opt-btn" data-o="${esc(o)}"><span class="L">${LET[i]}</span>${esc(o)}</button>`).join('')}</div><div id="pt-fb"></div>`;
  el.querySelectorAll('.opt-btn').forEach(b => b.onclick = () => {
    const ok = b.dataset.o === p.t; el.querySelectorAll('.opt-btn').forEach(x => { x.disabled = true; if (x.dataset.o === p.t) x.classList.add('ok'); }); if (!ok) b.classList.add('bad');
    const st = S.para[p.id] || { c: 0, t: 0 }; st.t++; if (ok) { st.c++; PT.score++; } S.para[p.id] = st; useDaily(1); markDay(); save();
    $('#pt-fb').innerHTML = `<div class="walk" style="margin-top:10px">${ok ? '✓ ' : '✗ '}${esc(L(p.note))}</div><button class="btn primary sm" id="pt-n" style="margin-top:10px">${_('التالي', 'Next')}</button>`;
    $('#pt-n').onclick = () => { PT.i++; ptRender(); };
  });
}

/* error drills */
async function pageDrill(id) {
  const e = (await content('arab_errors')).items.find(x => x.id === id); if (!e) return '';
  setTimeout(() => {
    $$('[data-dr]').forEach(btn => btn.onclick = () => {
      const i = +btn.dataset.dr, d = e.drill[i], inp = $('#dr-' + i), ok = nrm(inp.value).replace(/[.!?]$/, '') === nrm(d.a).replace(/[.!?]$/, '');
      $('#drf-' + i).innerHTML = `<div class="walk">${ok ? '✓ ' + _('ممتاز!', 'Excellent!') : '✗ ' + _('الصحيح', 'Correct')}: <span class="ltr-text"><b>${esc(d.a)}</b></span> · ${esc(L(d.hint))}</div>`;
      if (ok) { S.drills[id] = (S.drills[id] || 0) + 1; markDay(); save(); }
    });
  }, 0);
  return `<div class="spread"><a href="#words" class="btn ghost sm">← ${_('بنك الكلمات', 'Word bank')}</a></div><div class="lesson"><div class="page-h"><span class="eyebrow">${_('أخطاء المتعلم العربي', 'Arabic-speaker errors')}</span><h1>${esc(L(e.title))}</h1></div>
  <div class="card"><div class="fix"><div class="q">${esc(e.wrong)}</div><div class="b">${esc(e.right)}</div></div><p>${esc(L(e.why))}</p></div>
  <div class="card"><h2>${_('صحّح الجمل', 'Correct the sentences')}</h2>${e.drill.map((d, i) => `<div class="grid" style="gap:6px"><div class="src" style="border-color:var(--bad)">${esc(d.s)}</div><input class="inp ltr-text" id="dr-${i}" placeholder="${_('اكتب الجملة الصحيحة', 'Type the corrected sentence')}" autocomplete="off" spellcheck="false"><div class="row"><button class="btn sm" data-dr="${i}">${_('تحقق', 'Check')}</button></div><div id="drf-${i}"></div></div>`).join('<hr class="sep">')}</div></div>`;
}

/* mistake box: wrong answers come back with spacing until you fix them */
async function pageMistakes() {
  const now = todayStr();
  let list = S.mistakes.slice().sort((a, b) => a.due.localeCompare(b.due));
  const lim = PRO() ? Infinity : (+FREE.mistakesMax || 15);
  const shown = list.slice(-lim), hidden = list.length - shown.length;
  const due = shown.filter(m => m.due <= now);
  const byType = {}; S.mistakes.forEach(m => byType[m.type] = (byType[m.type] || 0) + 1);
  return `<div class="page-h"><span class="eyebrow">${_('التكرار المتباعد', 'Spaced repetition')}</span><h1>${_('صندوق الأخطاء', 'Mistake box')}</h1><p>${_('كل سؤال أخطأت فيه يعود إليك بعد يوم، ثم ثلاثة، ثم أسبوع، حتى تتقنه. هذا ما يحوّل الأخطاء إلى درجات.', 'Every question you miss comes back after a day, then three, then a week, until you master it. This turns mistakes into marks.')}</p></div>
  ${Object.keys(byType).length ? `<div class="card"><h2>${_('أين تخطئ أكثر؟', 'Where do you lose marks?')}</h2><div class="chips">${Object.entries(byType).sort((a, b) => b[1] - a[1]).map(([t, n]) => `<span class="chip pri">${esc(qtName(t))} · ${numL(n)}</span>`).join('')}</div></div>` : ''}
  ${hidden > 0 ? `<div class="notice gold">${_(`يعرض الصندوق المجاني آخر ${numL(lim)} أخطاء. اشترك لحفظ كل أخطائك ومراجعتها بالتكرار المتباعد.`, `The free box keeps your last ${lim} mistakes. Subscribe to keep them all.`)} <a href="#upgrade">${_('الباقات', 'Plans')}</a></div>` : ''}
  <div class="card"><div class="spread"><h2>${_('للمراجعة اليوم', 'Due today')} <span class="chip">${numL(due.length)}</span></h2>${due.length ? `<a class="btn primary sm" href="#mreview">${_('ابدأ المراجعة', 'Start review')}</a>` : ''}</div>
  ${shown.length ? `<div class="list">${shown.slice().reverse().slice(0, 40).map(m => `<div class="li"><span class="li-t"><b>${skName(m.skill)} · ${esc(m.test)} · Q${m.n}</b><small class="muted">${esc(qtName(m.type))} · ${_('الصندوق', 'box')} ${numL(m.box)} · ${m.due <= now ? _('مستحق', 'due') : numL(m.due)}</small></span></div>`).join('')}</div>` : `<p class="empty">${_('لا أخطاء بعد. حل اختبارًا وستظهر أخطاؤك هنا تلقائيًا.', 'No mistakes yet. Take a test and they will appear here automatically.')}</p>`}</div>`;
}
let MR = null;
async function pageMReview() {
  const now = todayStr(); const lim = PRO() ? Infinity : (+FREE.mistakesMax || 15);
  const due = S.mistakes.slice(-lim).filter(m => m.due <= now).slice(0, 15);
  MR = { list: due, i: 0 }; setTimeout(mrRender, 0);
  return `<div class="spread"><a href="#mistakes" class="btn ghost sm">← ${_('صندوق الأخطاء', 'Mistake box')}</a></div><div id="mr"></div>`;
}
function findQ(d, m) {
  const part = m.skill === 'L' ? d.parts[m.pi] : d.passages[m.pi]; if (!part) return null;
  for (const g of part.groups) { if (m.n < g.from || m.n > g.to) continue; const q = groupQs(g).find(x => x.n === m.n); return { part, g, q }; }
  return null;
}
async function mrRender() {
  const el = $('#mr'); if (!el) return;
  if (MR.i >= MR.list.length) { el.innerHTML = `<div class="card center"><h2>${_('انتهت المراجعة', 'Review complete')}</h2><a class="btn primary" href="#mistakes">${_('تم', 'Done')}</a></div>`; return; }
  const m = MR.list[MR.i]; let d; try { d = await content(m.test); } catch (e) { MR.i++; return mrRender(); }
  const f = findQ(d, m); if (!f) { MR.i++; return mrRender(); }
  const { part, g, q } = f, right = Array.isArray(q.a) ? q.a.join(' / ') : q.a;
  let context = '';
  if (m.skill === 'R' && q.ev) context = `<div class="src">…${esc(q.ev)}…</div>`;
  if (m.skill === 'L' && Number.isInteger(q.ev)) { const l = part.script[q.ev]; context = `<div class="src"><b>${esc(part.speakers[l.s].name)}:</b> ${esc(l.t)}</div><button class="btn ghost sm" id="mr-play">▶ ${_('استمع للسطر', 'Play the line')}</button>`; }
  const stem = g.type === 'mcq' ? `${esc(q.q)}<br>${q.opts.map((o, i) => `${LET[i]}. ${esc(o)}`).join('<br>')}` : g.type === 'mcq2' ? esc(g.q) + '<br>' + g.opts.map((o, i) => `${LET[i]}. ${esc(o)}`).join('<br>') : q.q ? esc(q.q).replace(/\{\{\d+\}\}/g, '_____') : `${esc(qtName(g.type))} · Q${q.n}`;
  el.innerHTML = `<div class="card"><div class="spread"><span class="chip">${skName(m.skill)} · ${esc(qtName(g.type))}</span><span class="small muted">${numL(MR.i + 1)} / ${numL(MR.list.length)}</span></div>
  <div class="ltr-text" style="font-weight:600">${stem}</div>
  <div id="mr-hid" hidden class="grid"><div class="notice teal">${_('الإجابة', 'Answer')}: <b class="ltr-text">${esc(right)}</b></div>${context}<p>${esc(L(q.why || {}))}</p>
    <div class="row"><button class="btn" data-mr="0">${_('ما زلت أخطئ فيه', 'Still unsure')}</button><button class="btn teal" data-mr="1">${_('فهمته الآن', 'I’ve got it')}</button></div></div>
  <button class="btn primary" id="mr-show">${_('فكّر في الإجابة ثم اضغط', 'Think of the answer, then reveal')}</button></div>`;
  $('#mr-show').onclick = () => { $('#mr-hid').hidden = false; $('#mr-show').hidden = true; };
  const pl = $('#mr-play'); if (pl) pl.onclick = async () => { const t = (await timingOf(m.test))['p' + part.part]; const tt = t && t.lines && t.lines[q.ev]; if (!tt) return; const a = new Audio(`/audio/${m.test}-p${part.part}.mp3`); a.addEventListener('loadedmetadata', () => { a.currentTime = Math.max(0, tt[0] - .3); a.play(); }, { once: true }); a.ontimeupdate = () => { if (a.currentTime > tt[1] + .4) a.pause(); }; };
  el.querySelectorAll('[data-mr]').forEach(b => b.onclick = () => { const ok = b.dataset.mr === '1'; m.box = ok ? m.box + 1 : 0; if (m.box >= 4) S.mistakes = S.mistakes.filter(x => x !== m); else m.due = addDays(todayStr(), ok ? BOX_DAYS[m.box] : 1); markDay(); save(); MR.i++; mrRender(); });
}
