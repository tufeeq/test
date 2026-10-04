/* ============ Model tests hub ============ */
async function pageTestsHub() {
  const [w1, wg, w2, p1, p2] = await Promise.all([content('task1_academic'), content('task1_gt'), content('task2'), content('part1'), content('part23')]);
  const Ls = CATALOG.listening, Rs = CATALOG.reading[S.module], n = Math.max(Ls.length, Rs.length);
  const last = (sk, id) => S.attempts.filter(a => a.skill === sk && a.test.split('+').includes(id)).slice(-1)[0];
  const lock = PRO() ? '' : `<span class="lock-b">${ic('lock')}${_('برو', 'Pro')}</span>`;
  const models = Array.from({ length: n }, (_x, i) => {
    const l = Ls[i], r = Rs[i], t1 = (S.module === 'gt' ? wg : w1).items[i], t2 = w2.items[i], sp = p2.items[i];
    const la = l && last('L', l.id), ra = r && last('R', r.id);
    return `<div class="card model"><div class="spread"><h2>${_('النموذج', 'Model test')} ${numL(i + 1)}</h2>${lock}</div>
      <div class="msec">${l ? `<div class="mrow"><span class="dot bg-L"></span><b>${skName('L')}</b><span class="small muted">${_('٤ أجزاء · ٤٠ سؤالًا · ٣٠ دقيقة', '4 parts · 40 q · 30 min')}</span>${la ? `<span class="chip ok">${bandL(la.band)}</span>` : ''}<button class="btn sm" data-mt="L:${l.id}">${_('ابدأ', 'Start')}</button><button class="btn ghost sm" data-mt="LP:${l.id}">${_('تدريب', 'Practice')}</button></div>` : ''}
      ${r ? `<div class="mrow"><span class="dot bg-R"></span><b>${skName('R')}</b><span class="small muted">${S.module === 'gt' ? 'General' : 'Academic'} · ${_('٤٠ سؤالًا · ٦٠ دقيقة', '40 q · 60 min')}</span>${ra ? `<span class="chip ok">${bandL(ra.band)}</span>` : ''}<button class="btn sm" data-mt="R:${r.id}">${_('ابدأ', 'Start')}</button></div>` : ''}
      ${t1 ? `<div class="mrow"><span class="dot bg-W"></span><b>${skName('W')}</b><span class="small muted">${_('المهمة ١ + المهمة ٢ · ٦٠ دقيقة', 'Task 1 + Task 2 · 60 min')}</span><a class="btn sm" href="#write/${S.module === 'gt' ? 't1g' : 't1a'}/${t1.id}">Task 1</a>${t2 ? `<a class="btn sm" href="#write/t2/${t2.id}">Task 2</a>` : ''}</div>` : ''}
      ${sp ? `<div class="mrow"><span class="dot bg-S"></span><b>${skName('S')}</b><span class="small muted">${_('الأجزاء ١–٣ · ١١–١٤ دقيقة', 'Parts 1–3 · 11–14 min')}</span><a class="btn sm" href="#speak/p2/${sp.id}">${_('البطاقة والنقاش', 'Cue card + discussion')}</a></div>` : ''}</div></div>`;
  }).join('');
  return `<div class="page-h"><span class="eyebrow">${_('النماذج', 'Model tests')}</span><h1>${_('نماذج كاملة بصيغة الاختبار المحوسب', 'Full models in the computer-delivered format')}</h1><p>${_('كل نموذج اختبار كامل بأقسامه الأربعة. بعد كل قسم ترى درجتك، وشرح كل إجابة بالعربية، وموضعها في التسجيل أو النص، وأي مهارة تحتاج تدريبًا.', 'Each model is a complete four-section test. After each section you get your band, every answer explained in Arabic with its location, and which skills need work.')}</p></div>
  <div class="seg">${['ac', 'gt'].map(m => `<button data-mod="${m}" class="${S.module === m ? 'on' : ''}">${m === 'ac' ? 'Academic' : 'General Training'}</button>`).join('')}</div>
  ${!diagTaken() ? `<a class="card tile" href="#diag" style="background:var(--teal-soft);border-color:transparent"><b>${_('اختبار تحديد المستوى (مجاني)', 'Placement test (free)')}</b><span class="small">${_('٢٠ سؤال استماع + ١٣ سؤال قراءة', '20 listening + 13 reading questions')}</span></a>` : ''}
  <div class="grid">${models}</div>
  <div class="card"><h2>${_('تدريب بالأجزاء', 'Practise by part')}</h2><p class="small muted">${_('جزء واحد من أي نموذج، في وضع التدريب.', 'One part of any model, in practice mode.')}</p>
    <div class="list">${Ls.map(t => `<div class="li"><b>Listening ${t.n}</b>${[0, 1, 2, 3].map(i => `<button class="btn ghost sm" data-part="L:${t.id}:${i}">Part ${i + 1}</button>`).join('')}</div>`).join('')}${Rs.map(t => `<div class="li"><b>Reading ${t.n}</b>${(t.id[0] === 'G' ? [0, 1, 2, 3, 4] : [0, 1, 2]).map(i => `<button class="btn ghost sm" data-part="R:${t.id}:${i}">${t.id[0] === 'G' ? 'Text' : 'Passage'} ${i + 1}</button>`).join('')}</div>`).join('')}</div></div>
  <div class="g3"><a class="card tile" href="#writing"><h3>${ic('W')} ${_('كل مهام الكتابة', 'All writing tasks')}</h3><p class="small muted">${numL(w1.items.length + wg.items.length + w2.items.length)} ${_('مهمة مع إجابات نموذجية', 'tasks with model answers')}</p></a><a class="card tile" href="#speaking"><h3>${ic('S')} ${_('غرفة المحادثة', 'Speaking room')}</h3><p class="small muted">${numL(p1.items.length)} + ${numL(p2.items.length)} ${_('موضوعًا', 'topics')}</p></a><a class="card tile" href="#speak/mock"><h3>${ic('spark')} ${_('اختبار محادثة كامل', 'Full speaking mock')}</h3></a></div>`;
}
function bindTestsHub() {
  $$('[data-mod]').forEach(b => b.onclick = () => { S.module = b.dataset.mod; save(); renderRoute(); });
  $$('[data-mt]').forEach(b => b.onclick = () => {
    if (!PRO()) { track('limit_hit', 'test'); return openUpgrade('test'); }
    const [k, id] = b.dataset.mt.split(':'), sk = k[0], n = sk === 'L' ? 4 : (id[0] === 'G' ? 5 : 3);
    startTest({ kind: sk, title: `${sk === 'L' ? 'Listening' : 'Reading'} · Model ${+id.slice(1)}`, mode: k === 'LP' ? 'practice' : 'exam', time: sk === 'R' ? 3600 : 0, sections: Array.from({ length: n }, (_x, i) => ({ skill: sk, test: id, idx: i })) });
  });
  $$('[data-part]').forEach(b => b.onclick = () => {
    if (!PRO()) { track('limit_hit', 'test'); return openUpgrade('test'); }
    const [sk, id, i] = b.dataset.part.split(':');
    startTest({ kind: sk, title: `${sk === 'L' ? 'Listening' : 'Reading'} ${+id.slice(1)} · ${b.textContent}`, mode: 'practice', time: sk === 'R' ? (id[0] === 'G' && +i < 4 ? 600 : 1200) : 0, sections: [{ skill: sk, test: id, idx: +i }] });
  });
}
