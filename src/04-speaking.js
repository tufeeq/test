/* ============ Speaking: examiner simulator, recording, live transcript, fluency meter, AI feedback ============ */
const SR_API = window.SpeechRecognition || window.webkitSpeechRecognition;
async function pageSpeaking() {
  const [p1, p2] = await Promise.all([content('part1'), content('part23')]);
  const o1 = freeCount(p1.items.length), o2 = freeCount(p2.items.length);
  const last = S.speaking.slice(-1)[0];
  return `<div class="page-h"><span class="eyebrow">${skName('S')}</span><h1>${_('غرفة المحادثة', 'Speaking room')}</h1><p>${_('ممتحن يسألك بصوته، وتجيب أنت بصوتك. نسجّل إجابتك ونكتبها نصًّا، ونقيس طلاقتك (سرعة الكلام، والتوقفات، وكلمات الحشو، وتنوع المفردات)، ثم تقارنها بإجابة نموذجية أو تحصل على تقييم ذكي.', 'An examiner asks you questions out loud and you answer out loud. We record and transcribe your answer, measure your fluency (speed, fillers, vocabulary range), then you compare with a model answer or get AI feedback.')}</p></div>
  ${!SR_API ? `<div class="notice gold">${_('متصفحك لا يدعم تحويل الكلام إلى نص؛ ستعمل التسجيلات والمقارنة بالنموذج، لكن للتفريغ النصي والتقييم الذكي استخدم Chrome أو Edge أو Safari الحديث.', 'Your browser does not support speech-to-text; recording and model answers still work, but for transcripts and AI marking use a recent Chrome, Edge or Safari.')}</div>` : ''}
  <div class="g3">
    <a class="card tile" href="#speak/mock"><span class="t-ic bg-S" style="color:#fff">${ic('S', 'i20')}</span><h3>${_('اختبار محادثة كامل', 'Full speaking mock')}</h3><p class="small muted">${_('الأجزاء الثلاثة متتالية كما في يوم الاختبار (١١–١٤ دقيقة).', 'All three parts back to back, like test day (11–14 minutes).')}</p>${PRO() ? '' : `<span class="lock-b">${ic('lock')}${_('برو', 'Pro')}</span>`}</a>
    <div class="card tile"><span class="t-ic" style="background:var(--gold-soft)">${ic('target', 'i20')}</span><h3>${_('آخر نتيجة', 'Last result')}</h3><p class="small muted">${last ? `${_('الجزء', 'Part')} ${numL(last.part)} · ${last.band != null ? 'Band ' + bandL(last.band) : _('بدون تقييم', 'not marked')} · ${numL(last.wpm || 0)} ${_('كلمة/دقيقة', 'wpm')}` : _('لم تسجّل بعد.', 'Nothing recorded yet.')}</p></div>
  </div>
  <div class="card"><h2>${_('الجزء الأول: أسئلة عن نفسك', 'Part 1: questions about you')}</h2><div class="list">${p1.items.map((t, i) => { const lk = i >= o1; return `<a class="li" href="${lk ? '#upgrade' : '#speak/p1/' + t.id}"><span class="li-t"><b>${esc(L(t.topic))}</b><small class="muted">${numL(t.qs.length)} ${_('أسئلة', 'questions')}</small></span>${lk ? `<span class="lock-b">${ic('lock')}${_('برو', 'Pro')}</span>` : ic('arrow')}</a>`; }).join('')}</div></div>
  <div class="card"><h2>${_('الجزءان الثاني والثالث: البطاقة والنقاش', 'Parts 2 & 3: cue card and discussion')}</h2><div class="list">${p2.items.map((t, i) => { const lk = i >= o2; return `<a class="li" href="${lk ? '#upgrade' : '#speak/p2/' + t.id}"><span class="li-t"><b class="ltr-text" style="text-align:start">${esc(t.card.title)}</b><small class="muted">${esc(t.cat)}</small></span>${lk ? `<span class="lock-b">${ic('lock')}${_('برو', 'Pro')}</span>` : ic('arrow')}</a>`; }).join('')}</div></div>
  <div class="card"><h2>${_('نصائح سريعة', 'Quick tips')}</h2><div class="row"><a class="btn ghost sm" href="#lesson/S-p2">${_('درس البطاقة', 'Cue card lesson')}</a><a class="btn ghost sm" href="#lesson/S-flu">${_('درس الطلاقة', 'Fluency lesson')}</a></div></div>`;
}

/* a session is a queue of steps: {say:'clip id', text, kind:'q'|'card'|'info', part, model, tip, prep, max} */
let SP = null;
async function pageSpeak(mode, id) {
  const [p1, p2] = await Promise.all([content('part1'), content('part23')]);
  let steps = [], title = '';
  if ((mode === 'p1' && p1.items.findIndex(x => x.id === id) >= freeCount(p1.items.length)) || (mode === 'p2' && p2.items.findIndex(x => x.id === id) >= freeCount(p2.items.length))) { setTimeout(() => openUpgrade('speaking'), 0); return pageSpeaking(); }
  if (mode === 'p1') { const t = p1.items.find(x => x.id === id); if (!t) return ''; title = L(t.topic); steps = t.qs.map((q, i) => ({ part: 1, clip: `${t.id}-q${i}`, text: q.q, model: q.model, tip: q.tip, max: 45 })); steps.unshift({ part: 1, clip: `${t.id}-t`, text: `Let’s talk about ${t.topic.en.toLowerCase()}.`, info: true }); }
  else if (mode === 'p2') { const t = p2.items.find(x => x.id === id); if (!t) return ''; title = t.card.title; steps = [{ part: 2, clip: 'p2intro', text: 'Now I’m going to give you a topic…', info: true }, { part: 2, card: t.card, notes: t.notes, clip: `${t.id}-card`, text: t.card.title, model: t.model, prep: 60, max: 120 }, { part: 3, clip: 'p3intro', text: 'We’ve been talking about this topic…', info: true }, ...t.p3.map((q, i) => ({ part: 3, clip: `${t.id}-p3q${i}`, text: q.q, model: q.model, max: 75 }))]; }
  else if (mode === 'mock') {
    if (!PRO()) { setTimeout(() => openUpgrade('speaking'), 0); return pageSpeaking(); }
    const a = p1.items[Math.floor(Math.random() * p1.items.length)], b = p1.items[(p1.items.indexOf(a) + 1) % p1.items.length], c = p2.items[Math.floor(Math.random() * p2.items.length)];
    title = _('اختبار محادثة كامل', 'Full speaking test');
    steps = [{ part: 1, clip: 'intro', text: 'Good morning. My name is Sarah…', info: true }, { part: 1, clip: `${a.id}-t`, text: `Let’s talk about ${a.topic.en.toLowerCase()}.`, info: true }, ...a.qs.slice(0, 3).map((q, i) => ({ part: 1, clip: `${a.id}-q${i}`, text: q.q, model: q.model, max: 40 })), { part: 1, clip: `${b.id}-t`, text: `Let’s talk about ${b.topic.en.toLowerCase()}.`, info: true }, ...b.qs.slice(0, 3).map((q, i) => ({ part: 1, clip: `${b.id}-q${i}`, text: q.q, model: q.model, max: 40 })),
      { part: 2, clip: 'p2intro', text: 'Now I’m going to give you a topic…', info: true }, { part: 2, card: c.card, notes: c.notes, clip: `${c.id}-card`, text: c.card.title, model: c.model, prep: 60, max: 120 }, { part: 3, clip: 'p3intro', text: 'We’ve been talking about…', info: true }, ...c.p3.map((q, i) => ({ part: 3, clip: `${c.id}-p3q${i}`, text: q.q, model: q.model, max: 75 })), { part: 3, clip: 'end', text: 'Thank you. That is the end of the speaking test.', info: true }];
  }
  SP = { mode, id, title, steps, i: 0, answers: [], rec: null, stream: null };
  setTimeout(() => spRender(), 0);
  return `<div class="spread"><a href="#speaking" class="btn ghost sm">← ${_('غرفة المحادثة', 'Speaking room')}</a><span class="chip pri">${esc(title)}</span></div><div id="sp-stage" class="grid"></div>`;
}
function spAudio(clip) { return new Promise(res => { const a = new Audio('/audio/sp/' + clip + '.mp3'); a.volume = S.vol ?? .9; a.onended = res; a.onerror = res; a.play().catch(res); SP.player = a; }); }
async function spRender() {
  const st = $('#sp-stage'); if (!st || !SP) return;
  if (SP.i >= SP.steps.length) return spSummary();
  const s = SP.steps[SP.i], n = SP.steps.filter(x => !x.info).length, k = SP.steps.slice(0, SP.i).filter(x => !x.info).length;
  st.innerHTML = `<div class="card"><div class="spread"><span class="chip teal">${_('الجزء', 'Part')} ${numL(s.part)}</span><span class="small muted">${numL(Math.min(k + 1, n))} / ${numL(n)}</span></div>
    <div class="examiner"><span class="av">EX</span><div class="say" id="sp-say">${esc(s.text)}</div></div>
    ${s.card ? `<div class="cue"><b>${esc(s.card.title)}</b><div>You should say:</div><ul>${s.card.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul><div>${esc(s.card.explain)}</div></div>` : ''}
    <div id="sp-act" class="grid" style="justify-items:center;text-align:center"></div></div>`;
  await spAudio(s.clip);
  if (!SP || SP.steps[SP.i] !== s) return;
  if (s.info) { SP.i++; return spRender(); }
  if (s.prep) return spPrep(s);
  spReady(s);
}
function spPrep(s) {
  const act = $('#sp-act'); let left = s.prep;
  act.innerHTML = `<p>${_('دقيقة للتحضير. اكتب كلمات مفتاحية فقط.', 'One minute to prepare. Write key words only.')}</p><div class="timer" id="sp-t">${fmtT(left)}</div><textarea class="editor" style="min-height:110px;max-width:520px" id="sp-notes" placeholder="notes…"></textarea><div class="row"><button class="btn sm" id="sp-skip">${_('ابدأ الآن', 'Start now')}</button><button class="btn ghost sm" id="sp-ideas">${_('أفكار مساعدة', 'Idea prompts')}</button></div><div id="sp-ideas-b" hidden class="chips">${(s.notes || []).map(x => `<span class="chip">${esc(x)}</span>`).join('')}</div>`;
  const go = () => { clearInterval(SP.pt); spAudio('p2start').then(() => spReady(s, true)); };
  SP.pt = setInterval(() => { const el = $('#sp-t'); if (!el) return clearInterval(SP.pt); left--; el.textContent = fmtT(left); if (left <= 0) go(); }, 1000);
  $('#sp-skip').onclick = go; $('#sp-ideas').onclick = () => { $('#sp-ideas-b').hidden = !$('#sp-ideas-b').hidden; };
}
function spReady(s, auto) {
  const act = $('#sp-act');
  act.innerHTML = `<button class="mic" id="sp-mic" aria-label="${_('سجّل', 'Record')}">${ic('S', 'i20')}</button><div class="timer" id="sp-t">0:00</div><p class="small muted">${_('اضغط وتحدث. اضغط مرة أخرى عند الانتهاء.', 'Tap and speak. Tap again when you finish.')} ${s.max ? _(`(الحد ${Math.round(s.max / 60 * 10) / 10 >= 1 ? numL(Math.round(s.max / 60)) + ' دقيقة' : numL(s.max) + ' ثانية'})`, `(up to ${s.max >= 60 ? Math.round(s.max / 60) + ' min' : s.max + ' s'})`) : ''}</p><div class="transcript" id="sp-live" style="width:100%" hidden></div><button class="btn ghost sm" id="sp-skipq">${_('تخطَّ السؤال', 'Skip question')}</button>`;
  $('#sp-mic').onclick = () => SP.rec ? spStop() : spStart(s);
  $('#sp-skipq').onclick = () => { spStop(true); SP.i++; spRender(); };
  if (auto) spStart(s);
}
async function spStart(s) {
  try { SP.stream = SP.stream || await navigator.mediaDevices.getUserMedia({ audio: true }); }
  catch (e) { toast(_('اسمح باستخدام الميكروفون من إعدادات المتصفح.', 'Allow microphone access in your browser settings.'), 4000); return; }
  const chunks = []; let mr; try { mr = new MediaRecorder(SP.stream); } catch (e) { toast(_('التسجيل غير مدعوم في هذا المتصفح.', 'Recording is not supported in this browser.')); return; }
  const rec = { s, chunks, mr, t0: Date.now(), text: '', interim: '' }; SP.rec = rec;
  mr.ondataavailable = e => e.data.size && chunks.push(e.data);
  mr.start(250);
  $('#sp-mic').classList.add('rec'); const live = $('#sp-live'); live.hidden = !SR_API;
  if (SR_API) {
    const r = new SR_API(); r.lang = 'en-GB'; r.continuous = true; r.interimResults = true; rec.sr = r;
    rec.base = '';
    r.onresult = e => { let fin = '', int = ''; for (let i = 0; i < e.results.length; i++) { const x = e.results[i]; if (x.isFinal) fin += x[0].transcript + ' '; else int += x[0].transcript; } rec.text = rec.base + fin; rec.cur = fin; rec.interim = int; const el = $('#sp-live'); if (el) el.textContent = (rec.text + int).trim(); };
    r.onend = () => { rec.base = rec.text; if (SP && SP.rec === rec) try { r.start(); } catch (e) {} };
    try { r.start(); } catch (e) {}
  }
  rec.tm = setInterval(() => { const sec = (Date.now() - rec.t0) / 1000, el = $('#sp-t'); if (el) el.textContent = fmtT(sec); if (s.max && sec >= s.max) { if (s.part === 2) spAudio('p2stop'); spStop(); } }, 300);
}
function spStop(discard) {
  const rec = SP && SP.rec; if (!rec) return; SP.rec = null; clearInterval(rec.tm);
  if (rec.sr) { rec.sr.onend = null; try { rec.sr.stop(); } catch (e) {} }
  rec.mr.onstop = () => {
    if (discard) return;
    const blob = new Blob(rec.chunks, { type: rec.mr.mimeType || 'audio/webm' }), secs = (Date.now() - rec.t0) / 1000, text = (rec.text + ' ' + rec.interim).trim();
    const ans = { step: rec.s, url: URL.createObjectURL(blob), secs, text, m: metrics(text, secs) }; SP.answers.push(ans);
    spReview(ans);
  };
  try { rec.mr.stop(); } catch (e) {}
}
function metrics(text, secs) {
  const w = (text.match(/[A-Za-z']+/g) || []), n = w.length, fill = (text.match(/\b(um+|uh+|er+|erm|hmm|you know|like)\b/gi) || []).length;
  const uniq = new Set(w.map(x => x.toLowerCase())).size;
  return { words: n, wpm: secs > 3 ? Math.round(n / (secs / 60)) : 0, fill, range: n ? Math.round(100 * uniq / n) : 0, secs: Math.round(secs) };
}
function metricsHTML(m, part) {
  const target = part === 2 ? _('١٢٠+ كلمة في دقيقتين', '120+ words in 2 min') : part === 3 ? _('٤٠–٨٠ كلمة', '40–80 words') : _('٢٠–٤٥ كلمة', '20–45 words');
  const wpmNote = !m.wpm ? '' : m.wpm < 90 ? _('بطيء: حاول ربط الأفكار دون توقف طويل.', 'Slow: try to link ideas without long pauses.') : m.wpm > 175 ? _('سريع جدًا: أبطئ قليلًا ليكون كلامك واضحًا.', 'Very fast: slow down a little for clarity.') : _('سرعة طبيعية ممتازة.', 'A natural, comfortable pace.');
  return `<div class="metrics"><div class="metric"><b>${numL(m.secs)}s</b><small>${_('المدة', 'Duration')}</small></div><div class="metric"><b>${numL(m.words)}</b><small>${_('كلمة', 'words')} · ${target}</small></div><div class="metric"><b>${numL(m.wpm)}</b><small>${_('كلمة/دقيقة', 'words/min')}</small></div><div class="metric"><b>${numL(m.fill)}</b><small>${_('كلمات حشو', 'fillers')}</small></div><div class="metric"><b>${numL(m.range)}%</b><small>${_('تنوع المفردات', 'vocab range')}</small></div></div>${wpmNote ? `<p class="small">${wpmNote}</p>` : ''}`;
}
function spReview(ans) {
  const s = ans.step, act = $('#sp-act'); if (!act) return;
  const cfg = window.CLOUD && CLOUD.config;
  act.style.justifyItems = 'stretch'; act.style.textAlign = 'start';
  act.innerHTML = `<audio controls src="${ans.url}" style="width:100%"></audio>${ans.text ? `<div class="transcript">${esc(ans.text)}</div>` : `<p class="small muted">${SR_API ? _('لم يُلتقط نص؛ تحدث بصوت أوضح أو اقترب من الميكروفون.', 'No speech was captured; speak more clearly or closer to the mic.') : ''}</p>`}
    ${metricsHTML(ans.m, s.part)}
    <details><summary style="cursor:pointer;font-weight:600">${_('إجابة نموذجية (Band 8)', 'Model answer (band 8)')}</summary><div class="model" style="margin-top:6px">${esc(s.model || '')}</div>${s.tip ? `<p class="small">${esc(L(s.tip))}</p>` : ''}</details>
    <div id="sp-ai"></div>
    ${cfg && !cfg.ai ? `<p class="small muted">${_('التقييم الذكي للمحادثة غير متاح مؤقتًا؛ قارن إجابتك بالإجابة النموذجية والمقاييس أعلاه.', 'AI speaking feedback is temporarily unavailable; compare with the model answer and the metrics above.')}</p>` : ''}
    <div class="row">${cfg && cfg.ai && ans.text ? `<button class="btn sm" id="sp-mark">${ic('spark')} ${_('قيّم إجابتي بالذكاء الاصطناعي', 'AI feedback')}</button>` : ''}<button class="btn ghost sm" id="sp-again">${ic('refresh')} ${_('أعد المحاولة', 'Try again')}</button><button class="btn primary sm" id="sp-next">${_('التالي', 'Next')} ${ic('arrow')}</button></div>`;
  $('#sp-again').onclick = () => { SP.answers.pop(); spReady(s); };
  $('#sp-next').onclick = () => { SP.i++; spRender(); };
  const mk = $('#sp-mark'); if (mk) mk.onclick = () => spAI(ans);
  S.speaking.push({ id: uid(), part: s.part, date: todayStr(), secs: ans.m.secs, wpm: ans.m.wpm, words: ans.m.words, band: null });
  if (S.speaking.length > 200) S.speaking = S.speaking.slice(-200);
  ans.rec = S.speaking[S.speaking.length - 1]; markDay(); save();
}
async function spAI(ans) {
  const box = $('#sp-ai'); if (!signedIn()) return openAuth('signup', () => spAI(ans));
  box.innerHTML = `<p class="small">${ic('spark')} ${_('جارٍ التقييم…', 'Marking…')}</p>`;
  try {
    const s = ans.step, q = s.card ? `${s.card.title} You should say: ${s.card.points.join('; ')}; ${s.card.explain}` : s.text;
    const r = await fetch('/api/ai/speaking', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Masar': '1' }, credentials: 'same-origin', body: JSON.stringify({ part: s.part, question: q, transcript: ans.text, seconds: ans.m.secs }) });
    const j = await r.json().catch(() => ({}));
    if (r.ok) { ans.rec.band = j.result.overall; ans.rec.ai = true; save(); track('ai_speaking', 'p' + s.part, j.result.overall); box.innerHTML = aiResultHTML(j.result, ['FC', 'LR', 'GRA', 'P']).replace('c-W', 'c-S').replace(/bg-W/g, 'bg-S'); return; }
    if (j.error === 'ai-free-limit') { box.innerHTML = `<div class="notice gold">${_('استخدمت التقييم المجاني. اشترك لتحصل على تقييمات يومية.', 'You have used your free AI feedback. Subscribe for daily feedback.')} <a href="#upgrade">${_('الباقات', 'Plans')}</a></div>`; return; }
    if (j.error === 'ai-daily-limit') { box.innerHTML = `<div class="notice">${_('بلغت الحد اليومي. يتجدد غدًا.', 'Daily limit reached. It renews tomorrow.')}</div>`; return; }
  } catch (e) {}
  box.innerHTML = `<div class="notice">${_('تعذّر التقييم الآن. حاول لاحقًا.', 'Could not mark right now. Please try later.')}</div>`;
}
function spSummary() {
  const st = $('#sp-stage'); const A = SP.answers; if (SP.stream) { SP.stream.getTracks().forEach(t => t.stop()); SP.stream = null; }
  const tot = A.reduce((a, x) => ({ w: a.w + x.m.words, s: a.s + x.m.secs, f: a.f + x.m.fill }), { w: 0, s: 0, f: 0 });
  const wpm = tot.s ? Math.round(tot.w / (tot.s / 60)) : 0;
  // fluency-based estimate (only an indicator; AI or a teacher gives a real band)
  const est = A.length ? half(clampBand(4 + Math.min(2, wpm / 70) + Math.min(1.5, (tot.w / Math.max(1, A.length)) / 40) - Math.min(1, tot.f / Math.max(1, tot.w) * 20))) : null;
  if (est != null && SP.mode === 'mock') { S.speaking.push({ id: uid(), part: 0, date: todayStr(), secs: tot.s, wpm, words: tot.w, band: est, est: true }); save(); }
  st.innerHTML = `<div class="card"><h2>${_('انتهت الجلسة', 'Session complete')}</h2>${metricsHTML({ words: tot.w, wpm, fill: tot.f, range: 0, secs: Math.round(tot.s) }, 3)}
  ${est != null ? `<div class="spread"><p>${_('مؤشر الطلاقة التقديري (يعتمد على السرعة والطول والحشو فقط):', 'Estimated fluency indicator (speed, length and fillers only):')}</p><div class="stamp sm c-S"><b>${fmtBand(est)}</b><small>est.</small></div></div>` : ''}
  <div class="list">${A.map((a, i) => `<div class="li"><span class="li-t"><b class="ltr-text" style="text-align:start">${esc(a.step.text)}</b><small class="muted">${numL(a.m.words)} ${_('كلمة', 'words')} · ${numL(a.m.secs)}s</small></span><audio controls src="${a.url}" style="max-width:220px"></audio></div>`).join('')}</div>
  <div class="row"><a class="btn primary" href="#speaking">${_('العودة', 'Back')}</a></div></div>`;
}
