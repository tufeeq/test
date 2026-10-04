/* ============ Placement test: writing + speaking stages ============
   After listening and reading are scored, the placement test continues inside the exam room with
   a short writing task (15 min, 120+ words) and three spoken questions (examiner audio, speech recognition).
   Marked by the AI examiner when available (one free placement marking), otherwise estimated on the device. */
const PL_W = { prompt: 'Some people think that young people should spend a year working or travelling before they start university. Do you agree or disagree?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.', min: 120, secs: 900 };
const PL_S = [
  { part: 1, clip: 'S1-01-t', text: 'Let’s talk about your hometown.', info: true },
  { part: 1, clip: 'S1-01-q0', text: 'Where is your hometown?', max: 35 },
  { part: 1, clip: 'S1-01-q1', text: 'What do you like most about it?', max: 45 },
  { part: 3, clip: 'S2-01-p3q2', text: 'Is it better to learn in a classroom or online?', max: 75 }
];
const PL_CAN = [
  [4, 'أفهم الأسئلة البسيطة، وأجيب بكلمات أو جمل قصيرة جدًا.', 'I understand simple questions and answer with a few words or very short sentences.'],
  [5, 'أجيب بجمل بسيطة عن نفسي، لكني أتوقف كثيرًا لأبحث عن الكلمات.', 'I answer about myself in simple sentences, but often stop to look for words.'],
  [6, 'أتحدث عن مواضيع مألوفة دقيقة أو أكثر، مع بعض الأخطاء والتوقفات.', 'I can talk about familiar topics for a minute or more, with some errors and pauses.'],
  [6.5, 'أناقش الآراء والأفكار العامة بطلاقة، وأخطائي قليلة.', 'I can discuss opinions and general ideas fluently with few errors.']
];
let PL = null;
function plTop(clock) { return `<div class="ex-top"><span class="cand"><span class="ex-logo">IELTS</span>${esc(EX.spec.title)}</span>${clock ? `<span class="clock" id="pl-clock">⏱ <span>${fmtT(PL_W.secs)}</span></span>` : ''}<button id="ex-x">${_('خروج', 'Exit')}</button></div>`; }
function plSteps(cur) {
  const st = [['L', 'Listening'], ['R', 'Reading'], ['W', 'Writing'], ['S', 'Speaking']];
  return `<div class="pl-steps" dir="ltr">${st.map(([k, n], i) => `<span class="pl-st ${i < cur ? 'done' : i === cur ? 'on' : ''}"><i>${i < cur ? '✓' : i + 1}</i>${n}</span>`).join('')}</div>`;
}
function plExit() {
  $('#ex-x').onclick = () => { if (!confirm(_('إن خرجت الآن تُحفظ نتيجتا الاستماع والقراءة فقط. هل تريد الخروج؟', 'If you leave now only your listening and reading results are kept. Leave?'))) return; plCleanup(); closeExam(); };
}
function plCleanup() { if (!PL) return; clearInterval(PL.wt); clearInterval(PL.st); if (PL.sr) { PL.sr.onend = null; try { PL.sr.stop(); } catch (e) {} } if (PL.player) { PL.player.pause(); } }

/* ---------- entry (called by finishTest for the placement test) ---------- */
function placeStart() {
  PL = { text: (S.notes || {})['w:placement'] || '', wleft: PL_W.secs, i: 0, ans: [], can: null };
  track('diag_w_start'); errorsData().catch(() => {}); plWriting();
}

/* ---------- writing ---------- */
function plWriting() {
  const ex = $('#exam');
  ex.innerHTML = `${plTop(true)}
  <div class="ex-part"><b>Writing</b>Write at least ${PL_W.min} words · 15 minutes</div>
  <div class="ex-wrap"><div class="ex-pane full pl">
    ${plSteps(2)}
    <div class="pl-ar" dir="rtl">${_('القسم الثالث: الكتابة. اكتب رأيك في السؤال التالي بفقرتين أو ثلاث (١٢٠ كلمة على الأقل). لا يهم الكمال؛ نريد أن نعرف مستواك الحالي. التدقيق الإملائي معطّل كما في الاختبار.', 'Part 3: Writing. Answer the question below in two or three paragraphs.')}</div>
    <div class="qbox pl-prompt">${esc(PL_W.prompt).replace(/\n/g, '<br>')}</div>
    <textarea class="pl-ed" id="pl-ed" spellcheck="false" autocapitalize="sentences" autocorrect="off" placeholder="Write your answer here…">${esc(PL.text)}</textarea>
    <div class="pl-bar"><span class="pl-wc"><b id="pl-wc">0</b> words</span><span style="flex:1"></span><button class="btn ghost sm" id="pl-wskip">${_('تخطَّ الكتابة', 'Skip writing')}</button><button class="btn primary" id="pl-wnext">Continue → Speaking</button></div>
  </div></div>`;
  plExit();
  const ed = $('#pl-ed'), wc = () => (ed.value.match(/[A-Za-z'’-]+/g) || []).length;
  const upd = () => { $('#pl-wc').textContent = wc(); PL.text = ed.value; S.notes = S.notes || {}; S.notes['w:placement'] = ed.value; clearTimeout(upd._s); upd._s = setTimeout(save, 2000); };
  ed.addEventListener('input', upd); upd(); setTimeout(() => ed.focus({ preventScroll: true }), 50);
  const end = Date.now() + PL.wleft * 1000;
  PL.wt = setInterval(() => { const el = $('#pl-clock span'); if (!el) return clearInterval(PL.wt); const l = Math.round((end - Date.now()) / 1000); PL.wleft = l; el.textContent = fmtT(l); $('#pl-clock').classList.toggle('low', l < 120); if (l <= 0) { clearInterval(PL.wt); toast(_('انتهى وقت الكتابة. ننتقل إلى المحادثة.', 'Writing time is over. Moving on to speaking.'), 3500); plGoSpeak(); } }, 1000);
  $('#pl-wnext').onclick = () => { const n = wc(); if (n < 30 && !confirm(_('كتبت أقل من ٣٠ كلمة، فلن نستطيع تقدير مستواك في الكتابة. هل تريد المتابعة؟', 'You wrote under 30 words, so we cannot estimate your writing. Continue?'))) return; if (n >= 30 && n < PL_W.min && !confirm(_(`كتبت ${n} كلمة من ${PL_W.min}. النص القصير يخفض الدرجة. هل تريد المتابعة؟`, `You wrote ${n} of ${PL_W.min} words. A short answer lowers the band. Continue?`))) return; plGoSpeak(); };
  $('#pl-wskip').onclick = () => { if (!confirm(_('تخطّي الكتابة يعني أن خطتك لن تعرف مستواك فيها. هل أنت متأكد؟', 'Skipping means your plan will not know your writing level. Are you sure?'))) return; PL.text = ''; plGoSpeak(); };
}
function plGoSpeak() { clearInterval(PL.wt); PL.text = ($('#pl-ed') || {}).value ?? PL.text; save(); track('diag_s_start'); plSpeak(); }

/* ---------- speaking ---------- */
function plSpeak() {
  const ex = $('#exam');
  if (PL.i >= PL_S.length) return placeFinish();
  const s = PL_S[PL.i], qs = PL_S.filter(x => !x.info), k = PL_S.slice(0, PL.i).filter(x => !x.info).length;
  ex.innerHTML = `${plTop(false)}
  <div class="ex-part"><b>Speaking</b>Answer ${qs.length} short questions out loud · about 3 minutes</div>
  <div class="ex-wrap"><div class="ex-pane full pl">
    ${plSteps(3)}
    ${PL.i <= 1 ? `<div class="pl-ar" dir="rtl">${_('القسم الرابع والأخير: المحادثة. سيطرح عليك الممتحن ٣ أسئلة. بعد سماع السؤال اضغط زر الميكروفون وأجب بصوت واضح بالإنجليزية، ثم اضغط «التالي». نحتاج إذن الميكروفون.', 'Part 4: Speaking. The examiner asks 3 questions. Tap the microphone and answer out loud.')}</div>` : ''}
    <div class="qbox pl-sp"><div class="spread"><span class="chip teal">Part ${s.part}</span><span class="small muted">${Math.min(k + 1, qs.length)} / ${qs.length}</span></div>
      <div class="examiner"><span class="av">EX</span><div class="say">${esc(s.text)}</div></div>
      <div id="pl-act" class="pl-act"><p class="small muted">${_('استمع إلى السؤال…', 'Listen to the question…')}</p><button class="btn ghost sm" id="pl-replay">▶ ${_('شغّل السؤال', 'Play question')}</button></div></div>
    <div class="pl-bar"><span style="flex:1"></span><button class="btn ghost sm" id="pl-sno">${_('لا أستطيع التحدث الآن', 'I can’t speak right now')}</button></div>
  </div></div>`;
  plExit();
  $('#pl-sno').onclick = () => plCanDo();
  const play = () => new Promise(res => { if (PL.player) PL.player.pause(); const a = new Audio('/audio/sp/' + s.clip + '.mp3'); a.volume = S.vol ?? .9; PL.player = a; a.onended = res; a.onerror = res; a.play().catch(res); });
  $('#pl-replay').onclick = () => play().then(() => s.info ? next() : plReady(s));
  const next = () => { PL.i++; plSpeak(); };
  play().then(() => { if (!PL || PL_S[PL.i] !== s) return; if (s.info) return setTimeout(next, 400); plReady(s); });
}
function plReady(s) {
  const act = $('#pl-act'); if (!act || act.dataset.ready) return; act.dataset.ready = '1';
  if (!SR_API) return plCanDo(true);
  act.innerHTML = `<button class="mic" id="pl-mic" aria-label="Record">${ic('S', 'i20')}</button><div class="timer" id="pl-t">0:00</div><p class="small muted">${_('اضغط وتحدث، ثم اضغط مرة أخرى عند الانتهاء.', 'Tap and speak, then tap again when you finish.')} (${s.max}s)</p><div class="transcript" id="pl-live" hidden></div><div class="row" style="justify-content:center"><button class="btn ghost sm" id="pl-skipq">${_('تخطَّ السؤال', 'Skip question')}</button></div>`;
  $('#pl-mic').onclick = () => PL.rec ? plStop() : plRec(s);
  $('#pl-skipq').onclick = () => { plStop(true); PL.i++; plSpeak(); };
}
function plRec(s) {
  const r = new SR_API(); r.lang = 'en-GB'; r.continuous = true; r.interimResults = true;
  const rec = { s, t0: Date.now(), base: '', text: '', interim: '' }; PL.rec = rec; PL.sr = r;
  r.onresult = e => { let fin = '', int = ''; for (let i = 0; i < e.results.length; i++) { const x = e.results[i]; if (x.isFinal) fin += x[0].transcript + ' '; else int += x[0].transcript; } rec.text = rec.base + fin; rec.interim = int; const el = $('#pl-live'); if (el) { el.hidden = false; el.textContent = (rec.text + int).trim(); } };
  r.onerror = e => { if (e.error === 'not-allowed' || e.error === 'service-not-allowed') { PL.rec = null; clearInterval(PL.st); toast(_('لم نتمكن من استخدام الميكروفون. اختر وصفًا لمستواك بدلًا من ذلك.', 'The microphone is not available. Choose a description of your level instead.'), 4500); plCanDo(true); } };
  r.onend = () => { rec.base = rec.text; if (PL && PL.rec === rec) try { r.start(); } catch (e) {} };
  try { r.start(); } catch (e) { return plCanDo(true); }
  const mic = $('#pl-mic'); mic.classList.add('rec');
  PL.st = setInterval(() => { const sec = (Date.now() - rec.t0) / 1000, el = $('#pl-t'); if (el) el.textContent = fmtT(sec); if (sec >= s.max) plStop(); }, 300);
}
function plStop(discard) {
  const rec = PL && PL.rec; if (!rec) return; PL.rec = null; clearInterval(PL.st);
  if (PL.sr) { PL.sr.onend = null; try { PL.sr.stop(); } catch (e) {} }
  if (discard) return;
  setTimeout(() => { // let the final result arrive
    const secs = (Date.now() - rec.t0) / 1000, text = (rec.text + ' ' + rec.interim).trim();
    const act = $('#pl-act'); if (!act) return;
    const m = metrics(text, secs);
    if (m.words < 3) { act.innerHTML = `<p class="small">${_('لم نلتقط كلامك بوضوح. اقترب من الميكروفون وتحدث بصوت أعلى.', 'We could not hear you clearly. Move closer to the microphone and speak louder.')}</p><div class="row" style="justify-content:center"><button class="btn primary sm" id="pl-again">${_('أعد المحاولة', 'Try again')}</button><button class="btn ghost sm" id="pl-skipq">${_('تخطَّ', 'Skip')}</button></div>`; $('#pl-again').onclick = () => { delete act.dataset.ready; plReady(rec.s); }; $('#pl-skipq').onclick = () => { PL.i++; plSpeak(); }; return; }
    PL.ans.push({ part: rec.s.part, q: rec.s.text, text, secs, m });
    act.innerHTML = `<div class="transcript">${esc(text)}</div><p class="small muted">${m.words} words · ${Math.round(secs)}s</p><div class="row" style="justify-content:center"><button class="btn ghost sm" id="pl-again">${_('أعد الإجابة', 'Answer again')}</button><button class="btn primary" id="pl-next">${PL.i + 1 >= PL_S.length ? _('أنهِ الاختبار', 'Finish the test') : _('التالي', 'Next')} →</button></div>`;
    $('#pl-again').onclick = () => { PL.ans.pop(); delete act.dataset.ready; plReady(rec.s); };
    $('#pl-next').onclick = () => { PL.i++; plSpeak(); };
  }, 600);
}
/* no microphone / speech recognition: a short can-do self-rating keeps the placement complete */
function plCanDo(auto) {
  plStop(true); if (PL.player) PL.player.pause();
  const ex = $('#exam');
  ex.innerHTML = `${plTop(false)}
  <div class="ex-part"><b>Speaking</b>${_('وصف ذاتي لمستوى المحادثة', 'Self-rating of your speaking')}</div>
  <div class="ex-wrap"><div class="ex-pane full pl" dir="${AR() ? 'rtl' : 'ltr'}" style="text-align:start">
    ${plSteps(3)}
    <div class="pl-ar" dir="rtl">${auto ? _('متصفحك لا يدعم تحويل الكلام إلى نص، أو لم يُسمح بالميكروفون. ', 'Your browser cannot transcribe speech, or the microphone is blocked. ') : ''}${_('اختر العبارة الأقرب لحالك عندما تتحدث بالإنجليزية. هذا تقدير مبدئي، وتستطيع لاحقًا قياس محادثتك بدقة في «غرفة المحادثة».', 'Choose the statement closest to how you speak English. You can measure your speaking accurately later in the speaking room.')}</div>
    <div class="pl-can">${PL_CAN.map((c, i) => `<button class="xl-opt" data-can="${i}"><b>${_(c[1], c[2])}</b></button>`).join('')}</div>
  </div></div>`;
  plExit();
  ex.querySelectorAll('[data-can]').forEach(b => b.onclick = () => { PL.can = PL_CAN[+b.dataset.can][0]; PL.ans = []; placeFinish(); });
}

/* ---------- scoring ---------- */
function plEstW(text) {
  const a = analyse(text, 't2'); if (a.wc < 30) return null;
  const cx = (text.match(/\b(because|although|though|which|while|whereas|unless|if|who|whose|since|so that|in order to)\b/gi) || []).length / Math.max(1, a.wc / 100);
  let b = 4 + Math.min(1, a.wc / PL_W.min * .8) + (a.lexd >= .6 ? .5 : a.lexd >= .5 ? .25 : 0) + Math.min(.75, a.used.length * .25) + Math.min(.75, cx * .2) - Math.min(1.5, a.hits.length * .3);
  if (a.wc < PL_W.min) b -= a.wc < 80 ? 1 : .5;
  return half(Math.max(3.5, Math.min(6.5, b)));
}
function plEstS() {
  if (PL.can != null) return PL.can;
  const A = PL.ans; if (!A.length) return null;
  const t = A.reduce((x, y) => ({ w: x.w + y.m.words, s: x.s + y.m.secs, f: x.f + y.m.fill }), { w: 0, s: 0, f: 0 }), wpm = t.s ? t.w / (t.s / 60) : 0;
  const p3 = A.find(a => a.part === 3);
  let b = 4 + Math.min(1.5, wpm / 80) + Math.min(1, (t.w / A.length) / 35) - Math.min(1, t.f / Math.max(1, t.w) * 20) + (p3 && p3.m.words >= 40 ? .5 : 0);
  if (A.length < 2) b -= .5;
  return half(Math.max(3.5, Math.min(6.5, b)));
}
async function placeFinish() {
  plCleanup();
  const ex = $('#exam'), text = (PL.text || '').trim(), wc = (text.match(/[A-Za-z'’-]+/g) || []).length;
  ex.innerHTML = `${plTop(false)}<div class="ex-wrap"><div class="ex-start" style="text-align:center;justify-items:center"><span class="eyebrow">IELTS Academy</span><h2>${_('نحسب مستواك…', 'Working out your level…')}</h2><p class="muted" dir="${AR() ? 'rtl' : 'ltr'}">${_('نقيّم كتابتك ومحادثتك ونجمعها مع نتيجتي الاستماع والقراءة.', 'We are marking your writing and speaking and combining them with your listening and reading.')}</p><div class="meter" style="inline-size:220px"><i style="width:40%"></i></div></div></div>`;
  $('#ex-x').onclick = () => {};
  const cfg = window.CLOUD && CLOUD.config; let ai = null;
  const sp = PL.ans.filter(a => a.m.words >= 3);
  if (cfg && cfg.ai && (wc >= 30 || sp.length)) {
    try {
      const r = await fetch('/api/ai/placement', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Masar': '1' }, credentials: 'same-origin', body: JSON.stringify({ writing: wc >= 30 ? { prompt: PL_W.prompt, essay: text } : null, speaking: sp.map(a => ({ part: a.part, question: a.q, transcript: a.text, seconds: Math.round(a.secs) })) }) });
      if (r.ok) ai = (await r.json()).result;
    } catch (e) {}
  }
  const date = todayStr(), made = EX.result.made;
  const wB = ai && ai.W && ai.W.overall != null ? ai.W.overall : plEstW(text);
  if (wB != null) {
    const id = uid(), byAI = !!(ai && ai.W && ai.W.overall != null);
    S.writing.push({ id, pid: 'placement', task: 'diag', date, words: wc, band: wB, crit: byAI ? ai.W.bands : null, ai: byAI });
    const a = { id, kind: 'diag', skill: 'W', test: 'placement', band: wB, raw: null, of: null, full: false, est: !byAI, ai: byAI, date, note: byAI ? ai.W : null };
    S.attempts.push(a); made.push(a);
  }
  const sB = ai && ai.S && ai.S.overall != null ? ai.S.overall : plEstS();
  if (sB != null) {
    const id = uid(), byAI = !!(ai && ai.S && ai.S.overall != null), t = sp.reduce((x, y) => ({ w: x.w + y.m.words, s: x.s + y.m.secs }), { w: 0, s: 0 });
    S.speaking.push({ id, part: 0, date, secs: Math.round(t.s), words: t.w, wpm: t.s ? Math.round(t.w / (t.s / 60)) : 0, band: sB, est: !byAI, ai: byAI, diag: true });
    const a = { id, kind: 'diag', skill: 'S', test: 'placement', band: sB, raw: null, of: null, full: false, est: !byAI, ai: byAI, self: PL.can != null, date, note: byAI ? ai.S : null };
    S.attempts.push(a); made.push(a);
  }
  if (S.notes) delete S.notes['w:placement'];
  markDay(); save();
  made.filter(a => a.skill === 'W' || a.skill === 'S').forEach(a => track('diag_done', a.skill + ':placement', a.band));
  PL = null;
  renderResult();
}

function placeOverallHTML(made) {
  const last = {}; made.forEach(a => last[a.skill] = a.band);
  const notes = made.filter(a => a.note && a.note.summary && L(a.note.summary));
  const k4 = ['L', 'R', 'W', 'S'], all = k4.every(k => last[k] != null);
  const ov = all ? roundOverall(k4.reduce((x, k) => x + last[k], 0) / 4) : null;
  return `${ov != null ? `<div class="pl-ov"><span class="small muted">${_('مستواك المبدئي الكلي', 'Your overall starting band')}</span><div class="big">${fmtBand(ov)}</div></div>` : ''}${notes.length ? `<div class="pl-notes" dir="${AR() ? 'rtl' : 'ltr'}">${notes.map(a => `<div class="rv"><b>${skName(a.skill)}</b><span>${esc(L(a.note.summary))}</span>${a.note.next && L(a.note.next) ? `<span><b>${_('الخطوة التالية', 'Next step')}:</b> ${esc(L(a.note.next))}</span>` : ''}</div>`).join('')}</div>` : ''}`;
}
