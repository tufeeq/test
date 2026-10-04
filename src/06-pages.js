/* ============ Pages: onboarding, today, plan, tests, lessons, progress, upgrade, account, router ============ */
function bandOpts(sel) { const o = []; for (let b = 50; b <= 85; b += 5) o.push(`<option value="${b}" ${b === sel ? 'selected' : ''}>${numL((b / 10).toFixed(1))}</option>`); return o.join(''); }
function pageOnboard() {
  return `<div class="hero"><div class="grid" style="gap:12px"><span class="eyebrow" style="color:var(--gold)">${_('أهلًا بك', 'Welcome')}</span><h1>${_('لنبنِ خطتك نحو درجتك المستهدفة', 'Let’s build your plan to your target band')}</h1><p class="muted">${_('ثلاثة أسئلة فقط، ثم اختبار تحديد مستوى قصير يقيس الاستماع والقراءة، لنعرف من أين نبدأ.', 'Three quick questions, then a short placement test for Listening and Reading, so we know where to start.')}</p></div><div class="stamp lg"><b>${bandL(targetBand())}</b><small>target</small></div></div>
  <div class="card" style="max-width:640px"><form id="ob" class="grid">
    <div class="fld">${_('أي نوع من الاختبار ستقدّم؟', 'Which test will you take?')}<div class="seg" id="ob-mod"><button type="button" data-m="ac" class="${S.module === 'ac' ? 'on' : ''}">${_('الأكاديمي (للجامعة والابتعاث)', 'Academic (university, scholarships)')}</button><button type="button" data-m="gt" class="${S.module === 'gt' ? 'on' : ''}">${_('العام (للعمل والهجرة)', 'General Training (work, migration)')}</button></div></div>
    <label class="fld">${_('الدرجة المستهدفة', 'Target band')}<select id="ob-t">${bandOpts(S.target)}</select><span class="hint">${_('معظم الجامعات تطلب 6.0–7.0، والابتعاث غالبًا 6.5.', 'Most universities ask for 6.0–7.0.')}</span></label>
    <label class="fld">${_('موعد الاختبار (إن عرفته)', 'Test date (if you know it)')}<input type="date" id="ob-d" value="${esc(S.examDate)}" min="${todayStr()}"></label>
    <button class="btn primary" type="submit">${_('احفظ وابدأ', 'Save and start')} ${ic('arrow')}</button></form></div>`;
}
function bindOnboard() {
  const f = $('#ob'); if (!f) return;
  f.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { S.module = b.dataset.m; f.querySelectorAll('[data-m]').forEach(x => x.classList.toggle('on', x === b)); });
  f.onsubmit = e => { e.preventDefault(); S.target = +$('#ob-t').value; S.examDate = $('#ob-d').value || ''; S.onboarded = true; S.planStart = todayStr(); save(); renderRoute(); };
}

/* ---------- adaptive daily plan ---------- */
function planFor(date) {
  const b = bands(), weak = weakest(), dayN = daysBetween(S.planStart || todayStr(), date), t = [];
  if (!diagTaken()) return [{ id: 'diag', k: 'L', t: _('اختبار تحديد المستوى', 'Placement test'), s: _('٣٣ سؤالًا · نحو ٣٥ دقيقة', '33 questions · about 35 minutes'), href: '#diag' }];
  const focus = weak[dayN % 2 === 0 ? 0 : 1].k;
  const lessonsL = ['L-form', 'L-mcq', 'L-map', 'L-notes'], lessonsR = ['R-tfng', 'R-headings', 'R-completion'], lessonsW = ['W-t1', 'W-t2', 'W-cc'], lessonsS = ['S-p2', 'S-flu'];
  const L2 = { L: lessonsL, R: lessonsR, W: lessonsW, S: lessonsS }[focus], nextLesson = L2.find(id => !S.lessons[id]);
  if (nextLesson) t.push({ id: 'les:' + nextLesson, k: focus, t: _('درس', 'Lesson') + ': ' + (LESSON_TITLES[nextLesson] ? L(LESSON_TITLES[nextLesson]) : nextLesson), s: _('٧ دقائق', '7 minutes'), href: '#lesson/' + nextLesson });
  const act = { L: { t: _('تدريب استماع: جزء واحد', 'Listening practice: one part'), href: '#listening' }, R: { t: _('تدريب قراءة: نص واحد', 'Reading practice: one passage'), href: '#reading' }, W: { t: S.module === 'gt' ? _('اكتب رسالة (المهمة ١)', 'Write a letter (Task 1)') : _('اكتب وصف رسم (المهمة ١)', 'Describe a chart (Task 1)'), href: '#writing' }, S: { t: _('محادثة: الجزء الأول', 'Speaking: Part 1 topic'), href: '#speaking' } };
  t.push({ id: 'act:' + focus, k: focus, ...act[focus], s: _('نقطة ضعفك الحالية', 'your current weak spot') });
  if (dayN % 3 === 2) t.push({ id: 'act:W2', k: 'W', t: _('اكتب مقالة (المهمة ٢)', 'Write an essay (Task 2)'), s: _('٤٠ دقيقة', '40 minutes'), href: '#writing' });
  else t.push({ id: 'para', k: 'R', t: _('مدرّب إعادة الصياغة', 'Paraphrase trainer'), s: _('١٠ أسئلة · ٥ دقائق', '10 questions · 5 minutes'), href: '#para' });
  t.push({ id: 'cards', k: 'S', t: _('بطاقات المفردات', 'Vocabulary cards'), s: _('١٠ دقائق', '10 minutes'), href: '#cards/due' });
  if (S.mistakes.some(m => m.due <= date)) t.push({ id: 'mis', k: 'W', t: _('راجع صندوق الأخطاء', 'Review your mistake box'), s: _('أخطاء مستحقة اليوم', 'mistakes due today'), href: '#mreview' });
  if (S.examDate && daysBetween(date, S.examDate) <= 10 && daysBetween(date, S.examDate) >= 0) t.unshift({ id: 'mock', k: 'L', t: _('اختبار كامل تحت الوقت', 'A full timed test'), s: _('أيام قليلة قبل الاختبار', 'final days before your test'), href: '#listening' });
  return t;
}
function taskDone(task, date = todayStr()) {
  const d = date;
  if (task.id === 'diag') return diagTaken();
  if (task.id.startsWith('les:')) return S.lessons[task.id.slice(4)] === d;
  if (task.id === 'act:L' || task.id === 'mock') return S.attempts.some(a => a.date === d && a.skill === 'L');
  if (task.id === 'act:R') return S.attempts.some(a => a.date === d && a.skill === 'R');
  if (task.id === 'act:W') return S.writing.some(w => w.date === d);
  if (task.id === 'act:W2') return S.writing.some(w => w.date === d && w.task === 't2');
  if (task.id === 'act:S') return S.speaking.some(w => w.date === d);
  if (task.id === 'para') return S.dq && S.dq.d === d && S.dq.n >= 5;
  if (task.id === 'cards') return Object.values(S.vocab).some(v => v.due > d) && S.days.includes(d);
  if (task.id === 'mis') return !S.mistakes.some(m => m.due <= d);
  return false;
}
let LESSON_TITLES = {};
async function pageToday() {
  if (!S.onboarded) return pageOnboard();
  try { (await content('lessons')).items.forEach(l => LESSON_TITLES[l.id] = l.title); } catch (e) {}
  const b = bands(), tg = targetBand(), plan = planFor(todayStr()), done = plan.filter(t => taskDone(t)).length;
  const days = S.examDate ? daysBetween(todayStr(), S.examDate) : null;
  const name = window.CLOUD && CLOUD.user && CLOUD.user.name ? CLOUD.user.name.split(' ')[0] : '';
  const sk = k => `<a class="sk" href="#${({ L: 'listening', R: 'reading', W: 'writing', S: 'speaking' })[k]}"><span class="stamp sm ${b[k] == null ? 'none' : 'c-' + k}"><b>${b[k] == null ? '?' : fmtBand(b[k])}</b><small>${k}</small></span><span class="lab">${skName(k)}</span></a>`;
  return `<div class="hero"><div class="grid" style="gap:10px"><span class="eyebrow" style="color:var(--gold)">${name ? _('مرحبًا ', 'Hi ') + esc(name) : _('خطة اليوم', 'Today')}</span>
    <h1>${b.O != null ? _(`درجتك التقديرية ${bandL(b.O)} — الهدف ${bandL(tg)}`, `Estimated band ${fmtBand(b.O)} — target ${fmtBand(tg)}`) : _(`هدفك: ${bandL(tg)}`, `Your target: ${fmtBand(tg)}`)}</h1>
    <p class="muted">${b.O == null ? _('نحتاج نتيجة في كل مهارة لحساب درجتك الكلية. كل نشاط تنجزه يحدّث التقدير.', 'We need a result in every skill to estimate your overall band. Every activity updates it.') : b.O >= tg ? _('أنت في مستوى هدفك أو أعلى. حافظ عليه باختبارات كاملة تحت الوقت.', 'You are at or above your target. Keep it with full timed tests.') : _(`تحتاج ${bandL(half(tg - b.O))} درجة. ركّز على ${skName(weakest()[0].k)}.`, `You need ${fmtBand(half(tg - b.O))} more. Focus on ${skName(weakest()[0].k)}.`)}</p>
    ${days != null ? `<div class="countdown"><b>${numL(Math.max(0, days))}</b><span>${_('يومًا حتى اختبارك', 'days to your test')}</span></div>` : `<a href="#settings" class="small" style="color:var(--gold)">${_('أضف موعد اختبارك لنضبط الخطة', 'Add your test date to pace your plan')}</a>`}</div>
    <div class="skills4">${['L', 'R', 'W', 'S'].map(sk).join('')}</div></div>
  <div class="g2">
    <div class="card"><div class="spread"><h2>${_('مهام اليوم', 'Today’s tasks')}</h2><span class="chip ${done === plan.length ? 'ok' : ''}">${numL(done)}/${numL(plan.length)}</span></div>
      <ul class="tasks">${plan.map(t => { const d = taskDone(t); return `<li><a class="task ${d ? 'done' : ''}" href="${t.href}"><span class="tk">${d ? ic('check') : ''}</span><span class="tt"><b>${esc(t.t)}</b><small>${esc(t.s || '')}</small></span><span class="dot bg-${t.k}"></span></a></li>`; }).join('')}</ul>
      <a href="#plan" class="small">${_('الخطة الأسبوعية كاملة', 'See the full weekly plan')} →</a></div>
    <div class="grid">
      <div class="card"><h2>${_('المسافة إلى الهدف', 'Distance to target')}</h2><div class="bars">${['L', 'R', 'W', 'S'].map(k => `<div class="bar-row"><span>${skName(k)}</span><span class="bandline"><i class="bg-${k}" style="inline-size:${(b[k] || 0) / 9 * 100}%"></i><span class="tgt" style="inset-inline-start:${tg / 9 * 100}%"></span></span><b class="num">${bandL(b[k])}</b></div>`).join('')}</div><p class="tiny muted">${_('الخط الأسود = درجتك المستهدفة.', 'Black line = your target band.')}</p></div>
      <div class="card tight"><div class="spread"><span>${_('أيام متتالية', 'Day streak')}: <b>${numL(streak())}</b> 🔥</span><span>${_('أخطاء للمراجعة', 'Mistakes due')}: <b>${numL(S.mistakes.filter(m => m.due <= todayStr()).length)}</b></span></div></div>
      ${PRO() ? '' : `<a class="card tile" href="#upgrade" style="background:var(--gold-soft);border-color:transparent"><b>${_('افتح كل الاختبارات والمصحح الذكي', 'Unlock every test and the AI examiner')}</b><span class="small">${_('أقل من عُشر رسوم إعادة اختبار واحد.', 'Less than a tenth of one test retake fee.')}</span></a>`}
    </div></div>`;
}
async function pagePlan() {
  if (!S.onboarded) return pageOnboard();
  const weeks = S.examDate ? Math.max(1, Math.ceil(daysBetween(todayStr(), S.examDate) / 7)) : 6;
  const lim = PRO() ? weeks : Math.min(weeks, +FREE.planWeeks || 2);
  let h = '';
  for (let w = 0; w < Math.min(weeks, 12); w++) {
    const days = []; for (let d = 0; d < 7; d++) days.push(addDays(todayStr(), w * 7 + d));
    const locked = w >= lim;
    h += `<div class="card ${locked ? 'locked' : ''}"><div class="spread"><h2>${_('الأسبوع', 'Week')} ${numL(w + 1)}</h2>${locked ? `<span class="lock-b">${ic('lock')}${_('برو', 'Pro')}</span>` : ''}</div>${locked ? `<p class="small muted">${_('الخطة الكاملة حتى يوم الاختبار متاحة للمشتركين.', 'The full plan to test day is available with Pro.')}</p>` : `<div class="list">${days.map(d => { const p = planFor(d); return `<div class="li"><span class="li-t"><b>${numL(d)}${d === todayStr() ? ' · ' + _('اليوم', 'today') : ''}</b><small class="muted">${p.map(x => esc(x.t)).join(' · ')}</small></span></div>`; }).join('')}</div>`}</div>`;
  }
  return `<div class="page-h"><span class="eyebrow">${_('خطة تتكيّف معك', 'An adaptive plan')}</span><h1>${_('خطتك حتى يوم الاختبار', 'Your plan to test day')}</h1><p>${_('تتغير المهام تلقائيًا حسب نتائجك: كل يوم يركّز على المهارة الأبعد عن هدفك.', 'Tasks change with your results: each day focuses on the skill furthest from your target.')}</p></div>${h}`;
}

/* ---------- listening & reading hubs ---------- */
async function pageTests(skill) {
  const list = skill === 'L' ? CATALOG.listening : CATALOG.reading[S.module];
  const att = id => S.attempts.filter(a => a.skill === skill && a.test.split('+').includes(id)).slice(-1)[0];
  const lockedPro = !PRO();
  const lessons = (await content('lessons')).items.filter(l => l.skill === (skill === 'L' ? 'listening' : 'reading'));
  const desc = skill === 'L' ? _('أربعة أجزاء، ٤٠ سؤالًا، نحو ٣٠ دقيقة. تسجيلات بأصوات بريطانية وأمريكية، بصيغة الاختبار المحوسب. بعد الانتهاء تسمع موضع كل إجابة في التسجيل.', 'Four parts, 40 questions, about 30 minutes. British and American voices in the computer-delivered format. Afterwards, replay the exact moment each answer was said.') : S.module === 'ac' ? _('ثلاثة نصوص أكاديمية، ٤٠ سؤالًا، ٦٠ دقيقة. شاشة مقسومة مع تظليل النص كما في الاختبار المحوسب، وبعد الانتهاء نُظلّل لك دليل كل إجابة.', 'Three academic passages, 40 questions, 60 minutes. Split screen with highlighting, like the real computer test; afterwards we highlight the evidence for each answer.') : _('خمسة نصوص من الحياة اليومية والعمل، ٤٠ سؤالًا، ٦٠ دقيقة.', 'Five everyday and workplace texts, 40 questions, 60 minutes.');
  return `<div class="page-h"><span class="eyebrow">${skName(skill)}${skill === 'R' ? ' · ' + (S.module === 'ac' ? 'Academic' : 'General Training') : ''}</span><h1>${skill === 'L' ? _('اختبارات الاستماع', 'Listening tests') : _('اختبارات القراءة', 'Reading tests')}</h1><p>${desc}</p></div>
  ${skill === 'R' ? `<div class="seg">${['ac', 'gt'].map(m => `<button data-mod="${m}" class="${S.module === m ? 'on' : ''}">${m === 'ac' ? 'Academic' : 'General Training'}</button>`).join('')}</div>` : ''}
  ${!diagTaken() ? `<a class="card tile" href="#diag" style="background:var(--teal-soft);border-color:transparent"><b>${_('ابدأ باختبار تحديد المستوى المجاني', 'Start with the free placement test')}</b><span class="small">${_('٢٠ سؤال استماع + ١٣ سؤال قراءة، ونقدّر لك درجتك فورًا.', '20 listening + 13 reading questions, with an instant band estimate.')}</span></a>` : ''}
  <div class="grid">${list.map(t => { const a = att(t.id); return `<div class="card"><div class="spread"><div><h2><bdi class="ltr">${skill === 'L' ? 'Listening' : S.module === 'ac' ? 'Academic Reading' : 'General Training Reading'} · Test ${t.n}</bdi></h2><p class="small muted">${a ? _(`آخر محاولة: ${bandL(a.band)} (${numL(a.raw)}/${numL(a.of)})`, `Last attempt: band ${fmtBand(a.band)} (${a.raw}/${a.of})`) : _('لم تحاول بعد', 'Not attempted yet')}</p></div>${lockedPro ? `<span class="lock-b">${ic('lock')}${_('برو', 'Pro')}</span>` : ''}</div>
    <div class="row"><button class="btn primary sm" data-full="${t.id}">${_('اختبار كامل', 'Full test')}</button>${skill === 'L' ? `<button class="btn sm" data-full="${t.id}" data-practice="1">${_('وضع التدريب', 'Practice mode')}</button>` : ''}<span class="small muted">${_('أو جزء واحد:', 'or one part:')}</span>${(skill === 'L' ? [0, 1, 2, 3] : (t.id[0] === 'G' ? [0, 1, 2, 3, 4] : [0, 1, 2])).map(i => `<button class="btn ghost sm" data-part="${t.id}:${i}">${skill === 'L' ? 'Part ' + (i + 1) : (t.id[0] === 'G' ? 'Text ' : 'Passage ') + (i + 1)}</button>`).join('')}</div></div>`; }).join('')}</div>
  <div class="card"><h2>${_('دروس استراتيجية', 'Strategy lessons')}</h2><div class="list">${lessons.map(l => `<a class="li" href="#lesson/${l.id}"><span class="li-t"><b>${esc(L(l.title))}</b><small class="muted">${numL(l.min)} ${_('دقائق', 'min')}</small></span>${S.lessons[l.id] ? `<span class="chip ok">${ic('check')}</span>` : ic('arrow')}</a>`).join('')}</div></div>`;
}
function bindTests(skill) {
  $$('[data-mod]').forEach(b => b.onclick = () => { S.module = b.dataset.mod; save(); renderRoute(); });
  $$('[data-full]').forEach(b => b.onclick = () => {
    if (!PRO()) { track('limit_hit', 'test'); return openUpgrade('test'); }
    const id = b.dataset.full, n = skill === 'L' ? 4 : (id[0] === 'G' ? 5 : 3);
    startTest({ kind: skill, title: `${skill === 'L' ? 'Listening' : 'Reading'} · Test ${id.slice(1).replace(/^0/, '')}`, mode: b.dataset.practice ? 'practice' : 'exam', time: skill === 'R' ? 3600 : 0, sections: Array.from({ length: n }, (_, i) => ({ skill, test: id, idx: i })) });
  });
  $$('[data-part]').forEach(b => b.onclick = () => {
    if (!PRO()) { track('limit_hit', 'test'); return openUpgrade('test'); }
    const [id, i] = b.dataset.part.split(':');
    startTest({ kind: skill, title: `${skill === 'L' ? 'Listening' : 'Reading'} · Test ${id.slice(1).replace(/^0/, '')} · ${b.textContent}`, mode: 'practice', time: skill === 'R' ? (id[0] === 'G' && +i < 4 ? 600 : 1200) : 0, sections: [{ skill, test: id, idx: +i }] });
  });
}
function startDiag() {
  if (diagTaken() && !PRO()) { track('limit_hit', 'test'); return openUpgrade('test'); }
  const gt = S.module === 'gt';
  startTest({ kind: 'diag', title: _('اختبار تحديد المستوى', 'Placement test'), mode: 'exam', readTime: gt ? 1200 : 1200, time: 1200,
    sections: [{ skill: 'L', test: 'L01', idx: 0 }, { skill: 'L', test: 'L01', idx: 3 }, ...(gt ? [{ skill: 'R', test: 'G01', idx: 0 }, { skill: 'R', test: 'G01', idx: 1 }] : [{ skill: 'R', test: 'A01', idx: 0 }])] });
  track('diag_start');
}

/* ---------- lessons ---------- */
async function pageLessons() {
  const ls = (await content('lessons')).items, open = freeCount(ls.length);
  const grp = { overview: _('عام', 'Overview'), listening: skName('L'), reading: skName('R'), writing: skName('W'), speaking: skName('S') };
  return `<div class="page-h"><span class="eyebrow">${_('استراتيجيات', 'Strategies')}</span><h1>${_('دروس كل نوع من الأسئلة', 'Lessons for every question type')}</h1><p>${_('دروس قصيرة بالعربية والإنجليزية: كيف يبدو السؤال، وخطوات الحل، والفخاخ، ونصيحة خاصة بالمتعلم العربي، ثم تمرين سريع.', 'Short bilingual lessons: what the question looks like, the steps, the traps, a tip for Arabic speakers, and a quick check.')}</p></div>
  ${Object.keys(grp).map(g => { const items = ls.filter(l => l.skill === g); if (!items.length) return ''; return `<div class="card"><h2>${grp[g]}</h2><div class="list">${items.map(l => { const lk = ls.indexOf(l) >= open; return `<a class="li" href="${lk ? '#upgrade' : '#lesson/' + l.id}"><span class="li-t"><b>${esc(L(l.title))}</b><small class="muted">${esc(L(l.why))}</small></span>${lk ? `<span class="lock-b">${ic('lock')}${_('برو', 'Pro')}</span>` : S.lessons[l.id] ? `<span class="chip ok">${ic('check')}</span>` : `<span class="chip">${numL(l.min)} ${_('د', 'min')}</span>`}</a>`; }).join('')}</div></div>`; }).join('')}`;
}
async function pageLesson(id) {
  const ls = (await content('lessons')).items, l = ls.find(x => x.id === id); if (!l) return '';
  if (ls.indexOf(l) >= freeCount(ls.length)) { setTimeout(() => openUpgrade('lesson'), 0); return pageLessons(); }
  setTimeout(() => {
    $$('.lesson [data-chk]').forEach(b => b.onclick = () => {
      const [bi, ii, oi] = b.dataset.chk.split(':').map(Number), it = l.blocks[bi].items[ii], ok = LET[oi] === it.a, wrap = b.closest('.opt-btns');
      wrap.querySelectorAll('.opt-btn').forEach((x, j) => { x.disabled = true; if (LET[j] === it.a) x.classList.add('ok'); }); if (!ok) b.classList.add('bad');
      wrap.insertAdjacentHTML('afterend', `<div class="walk">${ok ? '✓ ' : '✗ '}${esc(L(it.why))}</div>`);
      S.lessons[id] = todayStr(); markDay(); save(); track('lesson_done', id);
    });
    const dn = $('#les-done'); if (dn) dn.onclick = () => { S.lessons[id] = todayStr(); markDay(); save(); toast(_('أحسنت! سُجّل الدرس.', 'Nice! Lesson recorded.')); history.back(); };
  }, 0);
  const IK = { look: 'book', steps: 'check', example: 'spark', traps: 'flag', arab: 'globe', check: 'target', table: 'prog', tip: 'spark' };
  return `<div class="spread"><a href="#lessons" class="btn ghost sm">← ${_('الدروس', 'Lessons')}</a><span class="chip">${numL(l.min)} ${_('دقائق', 'min')}</span></div>
  <div class="lesson"><div class="page-h"><span class="eyebrow">${esc(l.skill)}</span><h1>${esc(L(l.title))}</h1><p>${esc(L(l.why))}</p></div>
  ${l.blocks.map((b, bi) => `<div class="card lb"><h3>${ic(IK[b.k] || 'book', 'i20')} ${esc(L(b.h))}</h3>
    ${b.p ? `<p>${md(L(b.p))}</p>` : ''}
    ${b.list ? `<ol>${L(b.list).map(x => `<li>${md(x)}</li>`).join('')}</ol>` : ''}
    ${b.src ? `<div class="src">${esc(b.src)}</div>` : ''}
    ${b.k === 'example' ? (b.items || []).map(it => `<div class="grid" style="gap:6px"><b class="ltr-text">${esc(it.q)}</b><details><summary style="cursor:pointer">${_('أظهر الحل', 'Show the answer')}</summary><div class="walk"><b class="ltr-text">${esc(it.a)}</b><br>${esc(L(it.walk))}</div></details></div>`).join('') : ''}
    ${b.k === 'check' ? (b.items || []).map((it, ii) => `<div class="grid" style="gap:8px"><b class="ltr-text">${esc(it.q)}</b><div class="opt-btns ltr-text">${it.opts.map((o, oi) => `<button class="opt-btn" data-chk="${bi}:${ii}:${oi}"><span class="L">${LET[oi]}</span>${esc(o)}</button>`).join('')}</div></div>`).join('') : ''}
  </div>`).join('')}
  <button class="btn primary" id="les-done">${_('أنهيت الدرس', 'I’ve finished this lesson')}</button></div>`;
}

/* ---------- progress ---------- */
async function pageProgress() {
  const b = bands(), tg = targetBand();
  const hist = S.attempts.slice().reverse();
  const qtRows = []; for (const sk of ['L', 'R']) for (const [t, v] of Object.entries(S.qt[sk] || {})) qtRows.push({ sk, t, ...v, p: v.c / v.t });
  qtRows.sort((a, c) => a.p - c.p);
  const series = ['L', 'R'].map(k => S.attempts.filter(a => a.skill === k).slice(-10));
  const spark = (arr, k) => { if (arr.length < 2) return ''; const W = 260, H = 70, x = i => 10 + (W - 20) * i / (arr.length - 1), y = v => H - 10 - (H - 20) * (v - 3) / 6; return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:300px;direction:ltr"><line x1="10" x2="${W - 10}" y1="${y(tg)}" y2="${y(tg)}" stroke="var(--ink)" stroke-dasharray="3 3" stroke-width="1"/><polyline fill="none" stroke="var(--c${k})" stroke-width="2.5" points="${arr.map((a, i) => x(i) + ',' + y(a.band)).join(' ')}"/>${arr.map((a, i) => `<circle cx="${x(i)}" cy="${y(a.band)}" r="3.5" fill="var(--c${k})"/>`).join('')}</svg>`; };
  return `<div class="page-h"><span class="eyebrow">${_('تقدّمك', 'Your progress')}</span><h1>${_('أين أنت الآن؟', 'Where are you now?')}</h1></div>
  <div class="card"><div class="spread"><div class="skills4" style="flex:1">${['L', 'R', 'W', 'S'].map(k => `<div class="sk"><span class="stamp ${b[k] == null ? 'none' : 'c-' + k}"><b>${b[k] == null ? '?' : fmtBand(b[k])}</b><small>${k}</small></span><span class="lab">${skName(k)}</span></div>`).join('')}</div><div class="sk"><span class="stamp lg" style="color:var(--pri)"><b>${b.O == null ? '?' : fmtBand(b.O)}</b><small>overall</small></span><span class="lab">${_('الكلية', 'Overall')} · ${_('الهدف', 'target')} ${bandL(tg)}</span></div></div>
  <p class="small muted">${_('التقدير يعتمد على آخر ثلاث نتائج في كل مهارة، والاختبارات الكاملة لها وزن أكبر.', 'Estimates use your last three results in each skill; full tests weigh more.')}</p></div>
  <div class="g2">${['L', 'R'].map((k, i) => `<div class="card"><h2>${skName(k)}</h2>${series[i].length > 1 ? spark(series[i], k) : `<p class="empty">${_('تحتاج محاولتين على الأقل لرسم المنحنى.', 'Two attempts needed to draw the trend.')}</p>`}</div>`).join('')}</div>
  <div class="card"><h2>${_('أداؤك حسب نوع السؤال', 'Accuracy by question type')}</h2>${qtRows.length ? `<div class="bars">${qtRows.map(r => `<div class="bar-row"><span>${skName(r.sk)[0] === 'ا' ? '' : ''}${esc(qtName(r.t))} <small class="muted">${r.sk}</small></span><span class="meter"><i style="inline-size:${Math.round(r.p * 100)}%;background:${r.p < .6 ? 'var(--bad)' : r.p < .8 ? 'var(--gold)' : 'var(--ok)'}"></i></span><b class="num">${numL(Math.round(r.p * 100))}%</b></div>`).join('')}</div><p class="small">${qtRows[0].p < .7 ? `${_('ابدأ بدرس', 'Start with the lesson on')} <a href="#lesson/${LESSON_FOR[qtRows[0].t] || 'R-tfng'}">${esc(qtName(qtRows[0].t))}</a>.` : ''}</p>` : `<p class="empty">${_('حل اختبارًا لترى نقاط قوتك وضعفك.', 'Take a test to see your strengths and weaknesses.')}</p>`}</div>
  <div class="card"><h2>${_('سجل المحاولات', 'Attempt history')}</h2>${hist.length ? `<div class="list">${hist.slice(0, 30).map(a => `<div class="li"><span class="li-t"><b>${skName(a.skill)} · ${esc(a.test)}${a.kind === 'diag' ? ' · ' + _('تحديد مستوى', 'placement') : ''}</b><small class="muted">${numL(a.date)} · ${numL(a.raw)}/${numL(a.of)}</small></span><span class="chip ${a.band >= tg ? 'ok' : ''}">${bandL(a.band)}</span>${S.details[a.id] ? `<button class="btn ghost sm" data-rv="${a.id}">${_('مراجعة', 'Review')}</button>` : ''}</div>`).join('')}</div>` : `<p class="empty">${_('لا محاولات بعد.', 'No attempts yet.')}</p>`}</div>
  <div class="card"><h2>${_('الكتابة والمحادثة', 'Writing & speaking')}</h2><div class="list">${S.writing.slice().reverse().slice(0, 10).map(w => `<div class="li"><span class="li-t"><b>${w.task === 't2' ? 'Task 2' : 'Task 1'} · ${esc(w.pid)}</b><small class="muted">${numL(w.date)} · ${numL(w.words)} ${_('كلمة', 'words')} · ${w.ai ? _('مصحح ذكي', 'AI marked') : _('تقييم ذاتي', 'self-assessed')}</small></span><span class="chip">${bandL(w.band)}</span></div>`).join('') || `<p class="empty">${_('لا كتابات بعد.', 'Nothing written yet.')}</p>`}</div></div>
  <div class="row"><button class="btn ghost sm" id="pg-export">${_('تنزيل نسخة من تقدمي', 'Download my progress')}</button><a class="btn ghost sm" href="#settings">${_('الإعدادات', 'Settings')}</a></div>`;
}
function bindProgress() {
  $$('[data-rv]').forEach(b => b.onclick = () => reviewAttempt(b.dataset.rv));
  const ex = $('#pg-export'); if (ex) ex.onclick = () => { const u = URL.createObjectURL(new Blob([JSON.stringify(S)], { type: 'application/json' })); const a = document.createElement('a'); a.href = u; a.download = 'ielts-academy-progress-' + todayStr() + '.json'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 2000); };
}
function pageSettings() {
  setTimeout(() => {
    const f = $('#st'); if (!f) return;
    f.onsubmit = e => { e.preventDefault(); S.target = +$('#st-t').value; S.examDate = $('#st-d').value || ''; S.module = $('#st-m').value; save(); toast(_('حُفظت الإعدادات', 'Settings saved')); };
    $('#st-reset').onclick = () => { if (confirm(_('مسح كل تقدمك على هذا الجهاز وفي حسابك؟ لا يمكن التراجع.', 'Erase all your progress on this device and in your account? This cannot be undone.'))) { const keep = { lang: S.lang }; S = Object.assign(DEF(), keep); save(); renderRoute(); } };
  }, 0);
  return `<div class="page-h"><h1>${_('الإعدادات', 'Settings')}</h1></div><div class="card" style="max-width:560px"><form id="st" class="grid">
    <label class="fld">${_('نوع الاختبار', 'Test type')}<select id="st-m"><option value="ac" ${S.module === 'ac' ? 'selected' : ''}>Academic</option><option value="gt" ${S.module === 'gt' ? 'selected' : ''}>General Training</option></select></label>
    <label class="fld">${_('الدرجة المستهدفة', 'Target band')}<select id="st-t">${bandOpts(S.target)}</select></label>
    <label class="fld">${_('موعد الاختبار', 'Test date')}<input type="date" id="st-d" value="${esc(S.examDate)}"></label>
    <button class="btn primary">${_('حفظ', 'Save')}</button></form><hr class="sep"><button class="btn ghost sm" id="st-reset" style="color:var(--bad-t)">${_('مسح كل التقدم', 'Erase all progress')}</button></div>`;
}

/* ---------- upgrade ---------- */
const BENEFITS = () => [
  _('كل اختبارات الاستماع والقراءة الكاملة بصيغة الاختبار المحوسب، مع شرح كل إجابة بالعربية وموضعها في التسجيل أو النص', 'Every full Listening and Reading test in the computer-delivered format, each answer explained in Arabic with its exact location'),
  _('المصحح الذكي للكتابة والمحادثة: درجة لكل معيار وتصحيحات مرتّبة حسب أثرها', 'AI examiner for Writing and Speaking: a band for each criterion and fixes ordered by impact'),
  _('كل الدروس والإجابات النموذجية وبطاقات المفردات', 'All lessons, model answers and vocabulary cards'),
  _('خطة كاملة حتى يوم اختبارك، وصندوق أخطاء غير محدود بالتكرار المتباعد', 'A full plan to test day and an unlimited spaced-repetition mistake box'),
  _('اختبار محادثة كامل بممتحن صوتي', 'Full speaking mock with a voiced examiner')
];
function openUpgrade(reason) { track('upgrade_view', reason); location.hash = '#upgrade'; }
function pageUpgrade() {
  const c = window.CLOUD && CLOUD.config, plans = c ? c.plans : [], cur = c ? c.currency : 'SAR';
  if (PRO()) { const p = CLOUD.plan; return `<div class="card" style="max-width:620px"><h1>${_('أنت مشترك', 'You are subscribed')} ✓</h1><p>${p.until ? _('اشتراكك ساري حتى ', 'Your subscription runs until ') + numL(String(p.until).slice(0, 10)) : _('حساب مشرف', 'Admin account')}</p><a class="btn primary" href="#today">${_('إلى خطة اليوم', 'Go to today')}</a></div>`; }
  const q = new URLSearchParams(location.hash.split('?')[1] || '');
  setTimeout(bindUpgrade, 0);
  return `${q.get('paid') ? `<div class="notice teal">${_('تمت عملية الدفع، جارٍ تفعيل اشتراكك…', 'Payment complete, activating your subscription…')}</div>` : q.get('failed') ? `<div class="notice pri">${_('لم تكتمل عملية الدفع. لم يُخصم أي مبلغ؛ حاول مرة أخرى.', 'The payment did not go through. You were not charged; please try again.')}</div>` : ''}
  <div class="page-h"><span class="eyebrow">${_('أكاديمية الآيلتس برو', 'IELTS Academy Pro')}</span><h1>${_('كل ما تحتاجه لدرجتك، بسعر أقل من حصة خصوصية واحدة', 'Everything you need for your band, for less than one private lesson')}</h1><p>${_('رسوم اختبار الآيلتس في السعودية نحو ١٬٦٠٠ ريال؛ إعادة الاختبار بسبب نصف درجة هي الخسارة الحقيقية.', 'The IELTS fee in Saudi Arabia is about SAR 1,600; retaking for half a band is the real cost.')}</p></div>
  <div class="g2"><div class="card"><ul class="benefits">${BENEFITS().map(b => `<li>${ic('check', 'i20')}<span>${b}</span></li>`).join('')}</ul></div>
  <div class="card"><div class="plans">${plans.map((p, i) => `<button class="plan-c ${i === plans.findIndex(x => x.best) || (i === 0 && !plans.some(x => x.best)) ? 'on' : ''}" data-plan="${p.id}"><span class="spread"><b>${esc(AR() ? p.ar : p.en)}</b>${p.best ? `<span class="chip pri">${_('الأوفر', 'Best value')}</span>` : ''}</span><span class="price">${numL(p.price)} <small style="font-size:.9rem">${cur === 'SAR' ? _('ريال', 'SAR') : cur}</small></span><span class="small muted">${_('دفعة واحدة · بدون تجديد تلقائي', 'One payment · no auto-renewal')} · ${numL(p.days)} ${_('يومًا', 'days')}</span></button>`).join('') || `<p class="empty">${_('جارٍ تحميل الباقات…', 'Loading plans…')}</p>`}</div>
    <label class="fld">${_('رمز خصم (اختياري)', 'Discount code (optional)')}<input id="up-cp" class="ltr-text" autocomplete="off"></label><div id="up-q" class="small"></div>
    <button class="btn primary block" id="up-go">${_('ادفع واشترك', 'Pay and subscribe')}</button>
    <p class="tiny muted center">${_('مدى · Apple Pay · STC Pay · فيزا/ماستركارد عبر Tap. استرداد كامل خلال ', 'mada · Apple Pay · STC Pay · Visa/Mastercard via Tap. Full refund within ')}${numL(c && c.refund ? c.refund.days : 7)} ${_('أيام.', 'days.')}</p></div></div>`;
}
function bindUpgrade() {
  let sel = ($('.plan-c.on') || {}).dataset; sel = sel ? sel.plan : null;
  $$('.plan-c').forEach(b => b.onclick = () => { $$('.plan-c').forEach(x => x.classList.remove('on')); b.classList.add('on'); sel = b.dataset.plan; quote(); });
  const cp = $('#up-cp'); let qt; if (cp) cp.oninput = () => { clearTimeout(qt); qt = setTimeout(quote, 500); };
  async function quote() { const code = cp.value.trim(); if (!code || !signedIn()) { $('#up-q').textContent = ''; return; } try { const r = await CLOUD.quote(sel, code); $('#up-q').innerHTML = `<span style="color:var(--ok-t)">${_('خصم', 'Discount')} ${numL(r.pct)}% → <b>${numL(r.amount)}</b></span>`; } catch (e) { $('#up-q').innerHTML = `<span class="err">${_('الرمز غير صالح', 'Invalid code')}</span>`; } }
  const go = $('#up-go'); if (go) go.onclick = async () => {
    if (!signedIn()) return openAuth('signup', () => renderRoute());
    go.disabled = true;
    try { const r = await CLOUD.checkout(sel, cp.value.trim()); if (r.activated) { await CLOUD.refresh(); toast(_('تم تفعيل اشتراكك!', 'Your subscription is active!')); location.hash = '#today'; } else if (r.url) location.href = r.url; }
    catch (e) { toast(e.code === 'payments-not-configured' ? _('الدفع الإلكتروني غير مفعّل بعد. تواصل معنا.', 'Online payment is not enabled yet. Contact us.') : e.code === 'bad-coupon' ? _('رمز الخصم غير صالح', 'Invalid discount code') : _('تعذّر بدء الدفع', 'Could not start the payment'), 4000); }
    go.disabled = false;
  };
  if (location.hash.includes('paid=1') && window.CLOUD) CLOUD.refresh();
}

/* ---------- account / auth ---------- */
let AFTER_AUTH = null;
const ERRS = { 'email-already-in-use': ['هذا البريد مسجّل. سجّل الدخول بدلًا من ذلك.', 'This email is already registered. Sign in instead.'], 'invalid-credential': ['البريد أو كلمة المرور غير صحيحة.', 'Wrong email or password.'], 'weak-password': ['كلمة المرور ٨ أحرف على الأقل.', 'Password must be at least 8 characters.'], 'invalid-email': ['البريد غير صالح.', 'Invalid email.'], 'invalid-name': ['اكتب اسمك (حرفان على الأقل).', 'Enter your name (2+ characters).'], 'too-many-requests': ['محاولات كثيرة. انتظر قليلًا.', 'Too many attempts. Please wait.'], 'network-request-failed': ['تحقق من اتصالك بالإنترنت.', 'Check your internet connection.'] };
const errMsg = c => ERRS[c] ? _(ERRS[c][0], ERRS[c][1]) : _('حدث خطأ. حاول مجددًا.', 'Something went wrong. Please try again.');
function openAuth(mode = 'signup', after) {
  if (after) AFTER_AUTH = after;
  const m = $('#acct'); m.hidden = false; m.className = 'modal';
  const soc = window.CLOUD && CLOUD.config && CLOUD.config.social || {};
  m.innerHTML = `<div class="modal-in" role="dialog" aria-modal="true"><div class="modal-h"><h2>${mode === 'signup' ? _('أنشئ حسابك المجاني', 'Create your free account') : _('تسجيل الدخول', 'Sign in')}</h2><button class="icon-btn" id="au-x" aria-label="close">${ic('x')}</button></div>
  <p class="small muted">${_('يُحفظ تقدمك ونتائجك في حسابك وتتابعها من أي جهاز.', 'Your progress and results are saved to your account on any device.')}</p>
  ${soc.google ? `<a class="btn block" href="/auth/google?next=/app">Google</a>` : ''}${soc.facebook ? `<a class="btn block" href="/auth/facebook?next=/app">Facebook</a>` : ''}
  <form id="au-f" class="grid">${mode === 'signup' ? `<label class="fld">${_('الاسم', 'Name')}<input id="au-n" autocomplete="name" required></label>` : ''}
    <label class="fld">${_('البريد الإلكتروني', 'Email')}<input id="au-e" type="email" class="ltr-text" autocomplete="email" required></label>
    <label class="fld">${_('كلمة المرور', 'Password')}<input id="au-p" type="password" class="ltr-text" autocomplete="${mode === 'signup' ? 'new-password' : 'current-password'}" minlength="8" required></label>
    ${mode === 'signup' ? `<label class="small" style="display:flex;gap:8px;align-items:flex-start"><input type="checkbox" id="au-c" required style="margin-top:6px"> <span>${_('أوافق على <a href="/terms" target="_blank">الشروط</a> و<a href="/privacy" target="_blank">سياسة الخصوصية</a>.', 'I agree to the <a href="/terms" target="_blank">Terms</a> and <a href="/privacy" target="_blank">Privacy Policy</a>.')}</span></label>` : ''}
    <div class="err" id="au-err" role="alert"></div><button class="btn primary" id="au-go">${mode === 'signup' ? _('أنشئ الحساب', 'Create account') : _('دخول', 'Sign in')}</button></form>
  <p class="small center">${mode === 'signup' ? _('لديك حساب؟', 'Have an account?') + ` <a href="#" id="au-sw">${_('سجّل الدخول', 'Sign in')}</a>` : _('جديد هنا؟', 'New here?') + ` <a href="#" id="au-sw">${_('أنشئ حسابًا', 'Create an account')}</a>`}${mode === 'signin' ? `<br><span class="tiny muted">${_('نسيت كلمة المرور؟ راسلنا على info@gat.academy', 'Forgot your password? Email info@gat.academy')}</span>` : ''}</p></div>`;
  $('#au-x').onclick = closeModal; m.onclick = e => { if (e.target === m) closeModal(); };
  $('#au-sw').onclick = e => { e.preventDefault(); openAuth(mode === 'signup' ? 'signin' : 'signup'); };
  $('#au-f').onsubmit = async e => {
    e.preventDefault(); const btn = $('#au-go'); btn.disabled = true; $('#au-err').textContent = '';
    try { if (mode === 'signup') await CLOUD.signUp($('#au-e').value.trim(), $('#au-p').value, $('#au-n').value.trim()); else await CLOUD.signIn($('#au-e').value.trim(), $('#au-p').value);
      closeModal(); toast(_('أهلًا بك!', 'Welcome!')); const f = AFTER_AUTH; AFTER_AUTH = null; renderRoute(); if (f) setTimeout(f, 200); }
    catch (er) { $('#au-err').textContent = errMsg(er.code); btn.disabled = false; }
  };
  setTimeout(() => { const i = $('#au-n') || $('#au-e'); if (i) i.focus(); }, 50);
}
function closeModal() { const m = $('#acct'); m.hidden = true; m.innerHTML = ''; }
async function openAccount() {
  if (!signedIn()) return openAuth('signin');
  const u = CLOUD.user, p = CLOUD.plan, m = $('#acct'); m.hidden = false; m.className = 'modal';
  m.innerHTML = `<div class="modal-in"><div class="modal-h"><h2>${_('حسابي', 'My account')}</h2><button class="icon-btn" id="ac-x">${ic('x')}</button></div>
    <p><b>${esc(u.name)}</b><br><span class="ltr-text small">${esc(u.email)}</span></p>
    <div class="notice ${PRO() ? 'teal' : ''}">${PRO() ? _('مشترك برو', 'Pro member') + (p.until ? ' · ' + _('حتى ', 'until ') + numL(String(p.until).slice(0, 10)) : '') : _('الخطة المجانية', 'Free plan') + ` · <a href="#upgrade" id="ac-up">${_('ترقية', 'Upgrade')}</a>`}</div>
    <div class="small muted">${_('حالة الحفظ', 'Sync')}: ${CLOUD.status === 'ok' ? _('محفوظ في حسابك', 'saved to your account') : CLOUD.status === 'saving' ? _('جارٍ الحفظ…', 'saving…') : CLOUD.status === 'error' ? _('تعذّر الحفظ؛ سنحاول مجددًا', 'could not sync; retrying') : '…'}</div>
    <details><summary style="cursor:pointer">${_('تغيير كلمة المرور', 'Change password')}</summary><form id="ac-pw" class="grid" style="margin-top:8px"><input type="password" class="inp ltr-text" id="ac-c" placeholder="${_('الحالية', 'Current')}" required><input type="password" class="inp ltr-text" id="ac-n" placeholder="${_('الجديدة (٨+)', 'New (8+)')}" minlength="8" required><button class="btn sm">${_('غيّر', 'Change')}</button><div class="err" id="ac-err"></div></form></details>
    <div class="row"><button class="btn sm" id="ac-out">${_('تسجيل الخروج', 'Sign out')}</button><button class="btn ghost sm" id="ac-del" style="color:var(--bad-t)">${_('حذف الحساب', 'Delete account')}</button></div></div>`;
  $('#ac-x').onclick = closeModal; m.onclick = e => { if (e.target === m) closeModal(); };
  const up = $('#ac-up'); if (up) up.onclick = closeModal;
  $('#ac-out').onclick = async () => { await CLOUD.signOut(); try { localStorage.removeItem(KEY); } catch (e) {} S = Object.assign(DEF(), { lang: S.lang }); closeModal(); renderRoute(); toast(_('سجّلت الخروج', 'Signed out')); };
  $('#ac-del').onclick = async () => { if (!confirm(_('حذف حسابك وكل تقدمك نهائيًا؟', 'Permanently delete your account and all progress?'))) return; await CLOUD.deleteAccount(); try { localStorage.removeItem(KEY); } catch (e) {} S = Object.assign(DEF(), { lang: S.lang }); closeModal(); renderRoute(); };
  $('#ac-pw').onsubmit = async e => { e.preventDefault(); try { await CLOUD.changePassword($('#ac-c').value, $('#ac-n').value); toast(_('تم تغيير كلمة المرور', 'Password changed')); closeModal(); } catch (er) { $('#ac-err').textContent = er.code === 'invalid-credential' ? _('كلمة المرور الحالية غير صحيحة', 'Current password is wrong') : errMsg(er.code); } };
}

/* ---------- shell + router ---------- */
const NAV = [['today', 'today', ['اليوم', 'Today']], ['listening', 'L', ['الاستماع', 'Listening']], ['reading', 'R', ['القراءة', 'Reading']], ['writing', 'W', ['الكتابة', 'Writing']], ['speaking', 'S', ['المحادثة', 'Speaking']], ['words', 'words', ['الكلمات', 'Words']], ['progress', 'prog', ['التقدم', 'Progress']]];
const TABS = ['today', 'listening', 'writing', 'speaking', 'words'];
function renderShell() {
  document.documentElement.lang = S.lang; document.documentElement.dir = AR() ? 'rtl' : 'ltr';
  document.title = AR() ? 'أكاديمية الآيلتس | IELTS Academy' : 'IELTS Academy | أكاديمية الآيلتس';
  $('#brand-n').textContent = _('أكاديمية الآيلتس', 'IELTS Academy'); $('#brand-t').textContent = AR() ? 'IELTS Academy' : 'أكاديمية الآيلتس';
  const cur = (location.hash.slice(1).split(/[/?]/)[0]) || 'today';
  const map = { lesson: 'reading', lessons: 'reading', write: 'writing', speak: 'speaking', cards: 'words', para: 'words', drill: 'words', mistakes: 'words', mreview: 'words', plan: 'today', settings: 'progress', diag: 'today', upgrade: 'today' };
  const on = map[cur] || cur;
  $('#nav').innerHTML = NAV.map(([k, i, l]) => `<a href="#${k}" class="${on === k ? 'on' : ''}">${ic(i, 'i20')}<span>${_(l[0], l[1])}</span></a>`).join('');
  $('#tabbar').innerHTML = NAV.filter(n => TABS.includes(n[0])).map(([k, i, l]) => `<a href="#${k}" class="${on === k ? 'on' : ''}">${ic(i, 'i20')}<span>${_(l[0], l[1])}</span></a>`).join('');
  $('#lang-btn').textContent = AR() ? 'English' : 'العربية';
  $('#acct-btn').hidden = !window.CLOUD; $('#acct-btn').setAttribute('aria-label', _('الحساب', 'Account'));
  $('#foot').innerHTML = `<span>© ${new Date().getFullYear()} ${_('أكاديمية الآيلتس', 'IELTS Academy')}</span><span><a href="#lessons">${_('الدروس', 'Lessons')}</a> · <a href="#plan">${_('الخطة', 'Plan')}</a> · <a href="/privacy">${_('الخصوصية', 'Privacy')}</a> · <a href="/terms">${_('الشروط', 'Terms')}</a> · <a href="mailto:info@gat.academy">info@gat.academy</a></span>`;
  const bn = window.CLOUD && CLOUD.config && CLOUD.config.banner, b = $('#banner'); if (bn && bn.on && (bn.ar || bn.en)) { b.hidden = false; b.className = bn.tone || ''; b.textContent = AR() ? bn.ar : bn.en; } else b.hidden = true;
  cloudStatus();
}
function cloudStatus() { const d = $('#save-dot'); if (!d) return; const st = window.CLOUD && CLOUD.user ? CLOUD.status : null; d.className = 'save-dot ' + (!STORE_OK || st === 'error' ? 'bad' : st === 'saving' ? 'wait' : ''); d.title = !STORE_OK ? _('تعذّر الحفظ على الجهاز', 'Could not save on this device') : st === 'ok' ? _('محفوظ في حسابك', 'Saved to your account') : _('محفوظ على هذا الجهاز', 'Saved on this device'); }
let ROUTE_N = 0;
async function renderRoute() {
  syncFree(); renderShell();
  const [r, a, b] = location.hash.slice(1).split('?')[0].split('/'); const n = ++ROUTE_N, main = $('#main');
  let html = '';
  try {
    switch (r || 'today') {
      case 'today': html = await pageToday(); break;
      case 'plan': html = await pagePlan(); break;
      case 'listening': html = await pageTests('L'); break;
      case 'reading': html = await pageTests('R'); break;
      case 'writing': html = await pageWriting(); break;
      case 'write': html = await pageWrite(a, b); break;
      case 'speaking': html = await pageSpeaking(); break;
      case 'speak': html = await pageSpeak(a, b); break;
      case 'words': html = await pageWords(); break;
      case 'cards': html = await pageCards(a); break;
      case 'para': html = await pagePara(); break;
      case 'drill': html = await pageDrill(a); break;
      case 'mistakes': html = await pageMistakes(); break;
      case 'mreview': html = await pageMReview(); break;
      case 'lessons': html = await pageLessons(); break;
      case 'lesson': html = await pageLesson(a); break;
      case 'progress': html = await pageProgress(); break;
      case 'settings': html = pageSettings(); break;
      case 'upgrade': html = pageUpgrade(); break;
      case 'diag': html = await pageToday(); setTimeout(() => { history.replaceState(null, '', '#today'); startDiag(); }, 0); break;
      default: html = await pageToday();
    }
  } catch (e) { console.error(e); html = `<div class="card"><p>${_('تعذّر تحميل هذه الصفحة. تحقق من اتصالك ثم أعد المحاولة.', 'This page could not load. Check your connection and try again.')}</p><button class="btn sm" onclick="renderRoute()">${_('إعادة المحاولة', 'Retry')}</button></div>`; }
  if (n !== ROUTE_N) return;
  if (r !== 'speak' && SP) { try { if (SP.rec) spStop(true); if (SP.stream) SP.stream.getTracks().forEach(t => t.stop()); if (SP.player) SP.player.pause(); } catch (e) {} SP = null; }
  main.innerHTML = html;
  if (!S.onboarded && (!r || r === 'today')) bindOnboard();
  if (r === 'listening') bindTests('L'); if (r === 'reading') bindTests('R');
  if (r === 'writing') $$('[data-wtab]').forEach(x => x.onclick = () => { S.wTab = x.dataset.wtab; save(); renderRoute(); });
  if (r === 'progress') bindProgress();
  $$('[data-lock]').forEach(x => { if (x.dataset.lock) x.addEventListener('click', () => track('limit_hit', x.dataset.lock)); });
  if (!window._noScroll) window.scrollTo(0, 0);
}
window.addEventListener('hashchange', renderRoute);
$('#lang-btn').onclick = () => { S.lang = AR() ? 'en' : 'ar'; save(); renderRoute(); };
$('#acct-btn').onclick = openAccount;
$('#theme-btn').onclick = () => { const cur = document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); const nx = cur === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = nx; try { localStorage.setItem('ielts_theme', nx); } catch (e) {} };
try { const th = localStorage.getItem('ielts_theme'); if (th) document.documentElement.dataset.theme = th; } catch (e) {}

/* interface used by cloud.js */
function mergeCloud(c) {
  if (!c || typeof c !== 'object') return;
  const by = (a, b, k) => { const m = new Map(); [...(a || []), ...(b || [])].forEach(x => m.set(x[k], x)); return [...m.values()]; };
  const local = S; const out = Object.assign(DEF(), c, local);
  out.attempts = by(c.attempts, local.attempts, 'id').sort((x, y) => (x.date || '').localeCompare(y.date || ''));
  out.writing = by(c.writing, local.writing, 'id'); out.speaking = by(c.speaking, local.speaking, 'id'); out.mistakes = by(c.mistakes, local.mistakes, 'k');
  out.days = [...new Set([...(c.days || []), ...(local.days || [])])].sort();
  out.vocab = Object.assign({}, c.vocab, local.vocab); out.para = Object.assign({}, c.para, local.para); out.lessons = Object.assign({}, c.lessons, local.lessons); out.details = Object.assign({}, c.details, local.details); out.drills = Object.assign({}, c.drills, local.drills);
  out.qt = local.attempts.length >= (c.attempts || []).length ? local.qt : c.qt;
  if (!local.onboarded && c.onboarded) { out.onboarded = true; out.target = c.target; out.examDate = c.examDate; out.module = c.module; }
  out.since = [c.since, local.since].filter(Boolean).sort()[0] || todayStr();
  S = out; try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
}
window.__app = { getS: () => S, summary, mergeCloud, render: () => { window._noScroll = true; renderRoute().finally(() => window._noScroll = false); }, cloudStatus };
renderRoute();
