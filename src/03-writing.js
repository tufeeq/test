/* ============ Writing: charts, studio, error radar, AI examiner, self-assessment ============ */
const PAL = ['#3E7CB1', '#E4572E', '#1B8A8F', '#F2B33D', '#8C5CC7', '#6B7390'];
function chartSVG(c) {
  if (!c) return '';
  if (c.type === 'mixed') return c.charts.map(chartSVG).join('<div style="height:10px"></div>');
  if (c.type === 'table') return `<div style="overflow-x:auto"><table class="ctable"><caption style="font-weight:700;padding:4px;font-family:var(--f-test)">${esc(c.title || '')}${c.unit ? ' (' + esc(c.unit) + ')' : ''}</caption><tr>${c.head.map(h => `<th>${esc(h)}</th>`).join('')}</tr>${c.rows.map(r => `<tr>${r.map(x => `<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</table></div>`;
  if (c.type === 'pie') return `<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center">${c.charts.map(p => { let a0 = -Math.PI / 2, s = ''; p.slices.forEach((sl, i) => { const a1 = a0 + 2 * Math.PI * sl.value / 100, big = a1 - a0 > Math.PI ? 1 : 0, x0 = 60 + 50 * Math.cos(a0), y0 = 60 + 50 * Math.sin(a0), x1 = 60 + 50 * Math.cos(a1), y1 = 60 + 50 * Math.sin(a1), mid = (a0 + a1) / 2; s += `<path d="M60 60 L${x0} ${y0} A50 50 0 ${big} 1 ${x1} ${y1}Z" fill="${PAL[i % PAL.length]}" stroke="#fff" stroke-width="1"/>`; if (sl.value >= 5) s += `<text x="${60 + 33 * Math.cos(mid)}" y="${60 + 33 * Math.sin(mid) + 3}" text-anchor="middle" style="fill:#fff;font-weight:700;font-size:9px">${sl.value}%</text>`; a0 = a1; }); return `<div style="text-align:center"><svg class="chart" viewBox="0 0 120 120" style="max-width:220px">${s}</svg><div style="font-family:var(--f-test);font-weight:700">${esc(p.title)}</div></div>`; }).join('')}</div><div class="legend">${c.charts[0].slices.map((s, i) => `<span><i style="background:${PAL[i % PAL.length]}"></i>${esc(s.name)}</span>`).join('')}</div>`;
  if (c.type === 'process') return `<div style="font-family:var(--f-test);direction:ltr"><div style="text-align:center;font-weight:700;margin-bottom:8px">${esc(c.title || '')}</div><div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;align-items:center">${c.steps.map((s, i) => `${i ? '<span style="color:#888">→</span>' : ''}<div style="border:1.5px solid var(--ink2);border-radius:10px;padding:8px 10px;min-width:96px;text-align:center;background:var(--surface)"><div style="font-size:.7rem;color:var(--muted)">${i + 1}</div><b style="font-size:.85rem">${esc(s.label)}</b>${s.note ? `<div style="font-size:.75rem;color:var(--muted)">${esc(s.note)}</div>` : ''}</div>`).join('')}${c.cycle ? '<span style="color:#888">↺</span>' : ''}</div></div>`;
  if (c.type === 'map') return `<div style="display:grid;gap:10px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr))">${c.maps.map(m => `<div><div style="text-align:center;font-weight:700;font-family:var(--f-test)">${esc(m.title)}</div>${mapSVG(m)}</div>`).join('')}</div>`;
  // line / bar
  const W = 420, H = 230, P = { l: 40, r: 10, t: 24, b: 40 }, all = c.series.flatMap(s => s.values), max = Math.max(...all) * 1.1, steps = 5;
  const niceMax = Math.ceil(max / steps / (max > 50 ? 10 : 1)) * steps * (max > 50 ? 10 : 1) || 10;
  const x = i => P.l + (W - P.l - P.r) * (c.type === 'bar' ? (i + .5) / c.x.length : i / Math.max(1, c.x.length - 1)), y = v => H - P.b - (H - P.t - P.b) * v / niceMax;
  let s = `<text x="${W / 2}" y="14" text-anchor="middle" style="font-weight:700;font-size:12px">${esc(c.title || '')}</text>`;
  for (let i = 0; i <= steps; i++) { const v = niceMax * i / steps; s += `<line class="gl" x1="${P.l}" x2="${W - P.r}" y1="${y(v)}" y2="${y(v)}"/><text x="${P.l - 5}" y="${y(v) + 3}" text-anchor="end">${+v.toFixed(1)}</text>`; }
  s += `<line class="ax" x1="${P.l}" x2="${W - P.r}" y1="${H - P.b}" y2="${H - P.b}"/>`;
  c.x.forEach((lb, i) => s += `<text x="${x(i)}" y="${H - P.b + 14}" text-anchor="middle">${esc(lb.length > 14 ? lb.slice(0, 13) + '…' : lb)}</text>`);
  if (c.type === 'line') c.series.forEach((se, k) => { s += `<polyline fill="none" stroke="${PAL[k]}" stroke-width="2.4" points="${se.values.map((v, i) => x(i) + ',' + y(v)).join(' ')}"/>` + se.values.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="3" fill="${PAL[k]}"/>`).join(''); });
  else { const n = c.series.length, gw = (W - P.l - P.r) / c.x.length * .7, bw = gw / n; c.series.forEach((se, k) => se.values.forEach((v, i) => s += `<rect x="${x(i) - gw / 2 + k * bw}" y="${y(v)}" width="${bw - 2}" height="${H - P.b - y(v)}" fill="${PAL[k]}" rx="2"/>`)); }
  if (c.y) s += `<text transform="translate(11 ${(H - P.b + P.t) / 2}) rotate(-90)" text-anchor="middle">${esc(c.y)}</text>`;
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(c.title || 'chart')}">${s}</svg><div class="legend">${c.series.map((se, k) => `<span><i style="background:${PAL[k]}"></i>${esc(se.name)}</span>`).join('')}</div>`;
}
function chartData(c) { // plain-text data for the AI examiner
  if (!c) return '';
  if (c.type === 'mixed') return c.charts.map(chartData).join('\n');
  if (c.type === 'line' || c.type === 'bar') return `${c.title} (${c.unit || ''})\n` + c.series.map(s => s.name + ': ' + s.values.map((v, i) => c.x[i] + '=' + v).join(', ')).join('\n');
  if (c.type === 'pie') return c.charts.map(p => p.title + ': ' + p.slices.map(s => s.name + ' ' + s.value + '%').join(', ')).join('\n');
  if (c.type === 'table') return [c.head.join(' | '), ...c.rows.map(r => r.join(' | '))].join('\n');
  if (c.type === 'process') return c.steps.map((s, i) => `${i + 1}. ${s.label}${s.note ? ' (' + s.note + ')' : ''}`).join('\n');
  if (c.type === 'map') return c.maps.map(m => m.title + ': ' + m.items.filter(i => i.label).map(i => i.label).join(', ')).join('\n');
  return '';
}

/* ---------- the error radar: live checks for Arabic-speaking writers ---------- */
let ERR = null;
async function errorsData() { if (!ERR) ERR = (await content('arab_errors')).items.map(e => ({ ...e, rx: (e.detect || []).map(d => { try { return { re: new RegExp(d.re, (d.flags || '').includes('g') ? d.flags : (d.flags || '') + 'g'), d }; } catch (x) { return null; } }).filter(Boolean) })); return ERR; }
const LINKERS = ['however', 'moreover', 'furthermore', 'in addition', 'therefore', 'as a result', 'consequently', 'for example', 'for instance', 'on the other hand', 'in contrast', 'nevertheless', 'although', 'whereas', 'while', 'firstly', 'secondly', 'finally', 'in conclusion', 'overall', 'because', 'since', 'thus', 'similarly', 'meanwhile'];
function analyse(text, task) {
  const t = text.replace(/\r/g, ''), words = (t.match(/[A-Za-z'’-]+|\d+(?:[.,]\d+)?%?/g) || []), wc = words.length;
  const paras = t.split(/\n\s*\n/).filter(x => x.trim()).length, sents = t.split(/[.!?]+\s/).filter(x => x.trim().length > 2);
  const min = task === 't2' ? 250 : 150, flags = [];
  if (wc && wc < min) flags.push({ lvl: 'hi', ar: `عدد الكلمات ${wc} أقل من ${min}. هذا يخفض درجة إنجاز المهمة مباشرة.`, en: `${wc} words is below ${min}. This directly lowers Task Achievement/Response.` });
  if (wc > 40 && paras < (task === 't2' ? 4 : 3)) flags.push({ lvl: 'hi', ar: `لديك ${paras} فقرة فقط. افصل الفقرات بسطر فارغ (${task === 't2' ? '٤–٥ فقرات' : '٣–٤ فقرات'}).`, en: `Only ${paras} paragraph(s). Separate paragraphs with a blank line (${task === 't2' ? '4–5' : '3–4'}).` });
  if (task === 't1a' && wc > 60 && !/\b(overall|in general|it is clear that|it can be seen that|in summary)\b/i.test(t)) flags.push({ lvl: 'hi', ar: 'لا يبدو أن لديك نظرة عامة (Overview). ابدأ فقرة بـ Overall, … تلخص أهم الاتجاهات.', en: 'No overview found. Start a paragraph with “Overall, …” summarising the main trends.' });
  if (task === 't2' && wc > 120 && !/\b(in conclusion|to conclude|to sum up|in summary)\b/i.test(t)) flags.push({ lvl: '', ar: 'لا توجد خاتمة واضحة. ابدأ الفقرة الأخيرة بـ In conclusion.', en: 'No clear conclusion. Start the last paragraph with “In conclusion”.' });
  const lower = t.toLowerCase(), used = LINKERS.filter(l => lower.includes(l));
  if (wc > 120 && used.length < 4) flags.push({ lvl: '', ar: `أدوات الربط قليلة (${used.length}). نوّع: however, moreover, as a result, for instance.`, en: `Few linking words (${used.length}). Vary them: however, moreover, as a result, for instance.` });
  const longS = sents.filter(s => s.split(/\s+/).length > 40).length; if (longS) flags.push({ lvl: '', ar: `${longS} جملة طويلة جدًا (أكثر من ٤٠ كلمة). قسّمها لتكون أوضح.`, en: `${longS} very long sentence(s) (40+ words). Split them.` });
  const freq = {}; words.map(w => w.toLowerCase()).filter(w => w.length > 4 && !/^(which|their|there|these|those|about|would|could|should|other|people)$/.test(w)).forEach(w => freq[w] = (freq[w] || 0) + 1);
  const rep = Object.entries(freq).filter(([, n]) => n >= Math.max(4, wc / 45)).sort((a, b) => b[1] - a[1]).slice(0, 3);
  if (rep.length) flags.push({ lvl: '', ar: `تكرار كلمات: ${rep.map(r => `«${r[0]}» ×${r[1]}`).join('، ')}. استخدم مرادفات لرفع درجة المفردات.`, en: `Repeated words: ${rep.map(r => `“${r[0]}” ×${r[1]}`).join(', ')}. Use synonyms to lift Lexical Resource.` });
  const uniq = new Set(words.map(w => w.toLowerCase())).size, lexd = wc ? uniq / wc : 0;
  // pattern errors
  const hits = [];
  if (ERR) for (const e of ERR) for (const { re, d } of e.rx) { re.lastIndex = 0; let m, c = 0; while ((m = re.exec(t)) && c < 3) { c++; hits.push({ e, d, q: m[0].trim() }); if (m[0] === '') re.lastIndex++; } }
  return { wc, paras, flags, hits, used, lexd };
}
function radarHTML(a) {
  const items = a.flags.map(f => `<div class="flag ${f.lvl}">${esc(L(f))}</div>`).concat(a.hits.slice(0, 12).map(h => `<div class="flag hi"><span><q>${esc(h.q)}</q> — ${esc(L(h.d.msg))}</span><a href="#drill/${h.e.id}" class="tiny">${esc(L(h.e.title))} · ${_('تمرّن عليه', 'practise it')}</a></div>`));
  return items.length ? items.join('') : `<div class="flag ok">${a.wc ? _('لا ملاحظات حتى الآن. استمر!', 'Nothing flagged so far. Keep going!') : _('ابدأ الكتابة وسيظهر هنا تحليل فوري لأخطاء متعلمي العربية الشائعة.', 'Start writing: common Arabic-speaker errors will be flagged here as you type.')}</div>`;
}

/* ---------- pages ---------- */
const W_KIND = { bar: ['مخطط أعمدة', 'Bar chart'], line: ['مخطط خطي', 'Line graph'], map: ['خريطة', 'Map'], pie: ['مخطط دائري', 'Pie chart'], process: ['مراحل عملية', 'Process'], table: ['جدول', 'Table'],
  formal: ['رسمية', 'Formal'], informal: ['غير رسمية', 'Informal'], semi: ['شبه رسمية', 'Semi-formal'],
  advdis: ['مزايا وعيوب', 'Advantages & disadvantages'], discussion: ['مناقشة رأيين', 'Discussion'], opinion: ['رأي', 'Opinion'], problem: ['مشكلة وحل', 'Problem & solution'], twopart: ['سؤالان', 'Two-part question'] };
const wKind = k => W_KIND[k] ? _(W_KIND[k][0], W_KIND[k][1]) : k;
async function pageWriting() {
  const [t1, g1, t2] = await Promise.all([content('task1_academic'), content('task1_gt'), content('task2')]);
  const tab = S.wTab || (S.module === 'gt' ? 'g1' : 'a1');
  const list = tab === 'a1' ? t1.items : tab === 'g1' ? g1.items : t2.items, task = tab === 'a1' ? 't1a' : tab === 'g1' ? 't1g' : 't2';
  const open = freeCount(list.length);
  const done = new Map(S.writing.map(w => [w.pid, w]));
  return `<div class="page-h"><span class="eyebrow">${skName('W')}</span><h1>${_('استوديو الكتابة', 'Writing studio')}</h1><p>${_('اكتب في محرر يشبه الاختبار الحقيقي، مع عدّاد كلمات ومؤقت ورادار يلتقط أخطاء المتعلمين العرب أثناء الكتابة، ثم احصل على تقييم بالمعايير الأربعة وإجابة نموذجية.', 'Write in an exam-like editor with a word counter, timer and a radar that catches typical Arabic-speaker errors as you type, then get marked on the four criteria and compare with a model answer.')}</p></div>
  <div class="seg" role="tablist">${[['a1', _('المهمة ١ أكاديمي', 'Task 1 Academic')], ['g1', _('المهمة ١ عام (رسالة)', 'Task 1 General (letter)')], ['t2', _('المهمة ٢ (مقالة)', 'Task 2 (essay)')]].map(([k, l]) => `<button data-wtab="${k}" class="${tab === k ? 'on' : ''}">${l}</button>`).join('')}</div>
  <div class="list">${list.map((it, i) => { const w = done.get(it.id), lk = i >= open;
    return `<a class="li ${lk ? 'locked' : ''}" href="${lk ? '#upgrade' : '#write/' + task + '/' + it.id}" data-lock="${lk ? 'writing' : ''}"><span class="li-t"><b class="ltr-text" style="text-align:start">${esc((it.prompt || '').split('\n')[0].slice(0, 120))}${(it.prompt || '').split('\n')[0].length > 120 ? '…' : ''}</b><span class="chips">${it.kind ? `<span class="chip teal">${esc(wKind(it.kind))}</span>` : ''}${it.tone ? `<span class="chip teal">${esc(wKind(it.tone))}</span>` : ''}${it.type ? `<span class="chip teal">${esc(wKind(it.type))}</span>` : ''}${w ? `<span class="chip ok">${_('آخر درجة', 'Last band')} ${bandL(w.band)}</span>` : ''}</span></span>${lk ? `<span class="lock-b">${ic('lock')}${_('برو', 'Pro')}</span>` : ic('arrow')}</a>`; }).join('')}</div>`;
}
let WS = null;
async function pageWrite(task, id) {
  const file = task === 't1a' ? 'task1_academic' : task === 't1g' ? 'task1_gt' : 'task2';
  const d = await content(file); const it = d.items.find(x => x.id === id); if (!it) return `<p class="empty">${_('غير موجود', 'Not found')}</p>`;
  if (d.items.indexOf(it) >= freeCount(d.items.length)) { setTimeout(() => openUpgrade('writing'), 0); return pageWriting(); }
  await errorsData();
  const draftKey = 'w:' + id, draft = (S.notes || {})[draftKey] || '';
  WS = { task, it, start: null, secs: task === 't2' ? 2400 : 1200 };
  setTimeout(bindWrite, 0);
  return `<div class="spread"><a href="#writing" class="btn ghost sm">${BK()}${_('كل المهام', 'All tasks')}</a><span class="chip pri">${task === 't2' ? 'Task 2 · 40 min · 250+ words' : 'Task 1 · 20 min · 150+ words'}</span></div>
  <div class="studio">
    <div class="card sticky"><div class="spread"><h2>${_('المهمة', 'The task')}</h2><button class="btn ghost sm" id="w-plan">${_('كيف أخطط؟', 'How to plan')}</button></div>
      <div class="prompt-box">${esc(it.prompt)}</div>${it.chart ? chartSVG(it.chart) : ''}
      <div id="w-plan-box" hidden class="notice teal">${esc(L(it.plan))}${it.lang || it.vocab ? `<div class="vocab-pills" style="margin-top:8px">${(it.lang || it.vocab).map(v => `<span class="vp"><b>${esc(v.en)}</b> · ${esc(v.ar)}</span>`).join('')}</div>` : ''}</div>
    </div>
    <div class="grid">
      <div class="card"><div class="wbar"><span class="wc" id="w-wc">0</span> ${_('كلمة', 'words')}<span class="muted">·</span><span id="w-time" class="num">${fmtT(WS.secs)}</span><button class="btn ghost sm" id="w-timer">${ic('clock')} ${_('ابدأ المؤقت', 'Start timer')}</button><span style="flex:1"></span><button class="btn primary sm" id="w-submit">${ic('spark')} ${_('قيّم إجابتي', 'Mark my answer')}</button></div>
        <textarea class="editor" id="w-ed" spellcheck="false" autocapitalize="sentences" placeholder="${_('اكتب إجابتك بالإنجليزية هنا… (التدقيق الإملائي معطّل كما في الاختبار)', 'Write your answer here… (spell-check is off, like the real test)')}">${esc(draft)}</textarea></div>
      <div class="card"><h2>${ic('radar', 'i20')} ${_('رادار الأخطاء', 'Error radar')} <span class="chip gold">${_('للمتعلم العربي', 'for Arabic speakers')}</span></h2><div class="radar" id="w-radar"></div></div>
      <div id="w-result"></div>
    </div>
  </div>`;
}
function bindWrite() {
  const ed = $('#w-ed'); if (!ed) return;
  const upd = () => { const a = analyse(ed.value, WS.task); $('#w-wc').textContent = a.wc; $('#w-radar').innerHTML = radarHTML(a); S.notes = S.notes || {}; S.notes['w:' + WS.it.id] = ed.value; clearTimeout(upd._s); upd._s = setTimeout(save, 1500); };
  ed.addEventListener('input', () => { clearTimeout(upd._t); upd._t = setTimeout(upd, 350); }); upd();
  $('#w-plan').onclick = () => { $('#w-plan-box').hidden = !$('#w-plan-box').hidden; };
  $('#w-timer').onclick = () => { if (WS.tm) { clearInterval(WS.tm); WS.tm = null; $('#w-timer').innerHTML = ic('clock') + ' ' + _('ابدأ المؤقت', 'Start timer'); return; } const end = Date.now() + WS.secs * 1000; WS.tm = setInterval(() => { const el = $('#w-time'); if (!el) { clearInterval(WS.tm); return; } const l = Math.round((end - Date.now()) / 1000); el.textContent = fmtT(l); el.style.color = l < 300 ? 'var(--bad-t)' : ''; if (l <= 0) { clearInterval(WS.tm); toast(_('انتهى الوقت!', 'Time is up!')); } }, 1000); $('#w-timer').textContent = _('إيقاف', 'Stop'); };
  $('#w-submit').onclick = () => submitWriting(ed.value);
}
async function submitWriting(text) {
  const a = analyse(text, WS.task), box = $('#w-result');
  if (a.wc < 40) return toast(_('اكتب ٤٠ كلمة على الأقل قبل التقييم.', 'Write at least 40 words first.'));
  if (!signedIn()) return openAuth('signup', () => submitWriting(text));
  const cfg = window.CLOUD && CLOUD.config;
  if (cfg && cfg.ai) {
    box.innerHTML = `<div class="card"><p>${ic('spark')} ${_('المصحح الذكي يقرأ إجابتك… (٢٠–٤٠ ثانية)', 'The AI examiner is reading your answer… (20–40 seconds)')}</p><div class="meter"><i style="width:30%;animation:none"></i></div></div>`;
    try {
      const r = await fetch('/api/ai/writing', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Masar': '1' }, credentials: 'same-origin', body: JSON.stringify({ task: WS.task, prompt: WS.it.prompt, essay: text, data: chartData(WS.it.chart) }) });
      const j = await r.json().catch(() => ({}));
      if (r.ok) { saveWriting(text, j.result.overall, j.result.bands, true); track('ai_writing', WS.task, j.result.overall); box.innerHTML = aiResultHTML(j.result, ['TA', 'CC', 'LR', 'GRA'], WS.task) + modelHTML(); bindModel(); return; }
      if (j.error === 'ai-free-limit' || j.error === 'ai-daily-limit') { box.innerHTML = `<div class="card"><p>${j.error === 'ai-free-limit' ? _('استخدمت تقييمك المجاني بالذكاء الاصطناعي. اشترك لتحصل على تقييمات يومية، أو استخدم التقييم الذاتي الموجّه الآن.', 'You have used your free AI marking. Subscribe for daily AI marking, or use the guided self-assessment now.') : _('بلغت حد التقييمات اليومي. يتجدد غدًا.', 'You have reached today’s AI marking limit. It renews tomorrow.')}</p><div class="row">${j.error === 'ai-free-limit' ? `<a class="btn primary sm" href="#upgrade">${_('اشترك', 'Subscribe')}</a>` : ''}<button class="btn sm" id="w-self">${_('تقييم ذاتي موجّه', 'Guided self-assessment')}</button></div></div>`; $('#w-self').onclick = () => selfAssess(text, a); return; }
    } catch (e) {}
    toast(_('تعذّر الوصول إلى المصحح الذكي؛ إليك التقييم الذاتي.', 'The AI examiner is unavailable; here is the guided self-assessment.'));
  }
  selfAssess(text, a);
  if (!(cfg && cfg.ai)) { const n = document.createElement('div'); n.className = 'notice gold'; n.textContent = _('المصحح الذكي غير متاح مؤقتًا؛ استخدم التقييم الذاتي الموجّه الآن، وستعود الخدمة قريبًا.', 'The AI examiner is temporarily unavailable. Use the guided self-assessment for now; it will be back soon.'); box.prepend(n); }
}
function saveWriting(text, band, crit, ai) {
  S.writing.push({ id: uid(), pid: WS.it.id, task: WS.task, date: todayStr(), words: analyse(text, WS.task).wc, band, crit, ai: !!ai });
  if (S.writing.length > 100) S.writing = S.writing.slice(-100);
  markDay(); save();
}
const CRIT = { TA: ['إنجاز المهمة', 'Task Achievement / Response'], CC: ['التماسك والترابط', 'Coherence & Cohesion'], LR: ['الثروة اللغوية', 'Lexical Resource'], GRA: ['القواعد ودقتها', 'Grammatical Range & Accuracy'], FC: ['الطلاقة والتماسك', 'Fluency & Coherence'], P: ['النطق (تقديري)', 'Pronunciation (estimated)'] };
function aiResultHTML(r, keys, task) {
  return `<div class="card"><div class="spread"><h2>${ic('spark', 'i20')} ${_('تقييم المصحح الذكي', 'AI examiner’s report')}</h2><div class="stamp sm c-W"><b>${fmtBand(r.overall)}</b><small>${_('الدرجة', 'band')}</small></div></div>
    <div class="grid" style="gap:8px">${keys.map(k => `<div class="crit"><span class="cb">${fmtBand(r.bands[k])}</span><span><b>${_(CRIT[k][0], CRIT[k][1])}</b></span><span class="bandline" style="inline-size:120px"><i class="bg-W" style="inline-size:${(r.bands[k] || 0) / 9 * 100}%"></i></span></div>`).join('')}</div>
    <p>${esc(L(r.summary))}</p>
    ${r.strengths.length ? `<div><b>${_('نقاط القوة', 'Strengths')}</b><ul>${r.strengths.map(s => `<li>${esc(L(s))}</li>`).join('')}</ul></div>` : ''}
    ${r.fixes.length ? `<div class="grid" style="gap:8px"><b>${_('التصحيحات بحسب الأثر', 'Fixes, by impact')}</b>${r.fixes.map(f => `<div class="fix"><span class="chip">${esc(f.crit || '')}</span><div class="q">${esc(f.quote)}</div><div class="b">${esc(f.better)}</div><small>${esc(L(f.why))}</small></div>`).join('')}</div>` : ''}
    ${r.next && L(r.next) ? `<div class="notice gold"><b>${_('للوصول إلى الدرجة التالية', 'To reach the next band')}:</b> ${esc(L(r.next))}</div>` : ''}
    ${r.upgrade ? `<details><summary style="cursor:pointer;font-weight:600">${_('فقرة من إجابتك مُعاد كتابتها بمستوى 8', 'One paragraph of yours rewritten at band 8')}</summary><div class="model" style="margin-top:8px">${esc(r.upgrade)}</div></details>` : ''}
    <p class="tiny muted">${_('تقييم تقديري بالذكاء الاصطناعي وفق معايير الآيلتس المنشورة، وليس درجة رسمية.', 'An AI estimate based on the published IELTS descriptors, not an official score.')}</p></div>`;
}
function selfAssess(text, a) {
  const Q = [
    ['TA', _('هل أجبت عن كل أجزاء السؤال (أو غطيت النقاط الثلاث في الرسالة / كتبت نظرة عامة)؟', 'Did you answer every part (all three bullets / an overview)?')],
    ['TA', _('هل موقفك أو الفكرة الرئيسية واضحة ومدعومة بأمثلة أو أرقام؟', 'Is your position/main idea clear and supported?')],
    ['CC', _('هل لكل فقرة فكرة رئيسية واحدة واضحة؟', 'Does each paragraph have one clear main idea?')],
    ['CC', _('هل استخدمت أدوات ربط متنوعة دون إفراط؟', 'Did you use varied linking words without overusing them?')],
    ['LR', _('هل استخدمت مفردات أكاديمية دقيقة وتجنبت التكرار؟', 'Did you use precise vocabulary and avoid repetition?')],
    ['GRA', _('هل استخدمت جملًا مركبة (because, which, although, if) بشكل صحيح؟', 'Did you use complex sentences correctly?')],
    ['GRA', _('هل معظم جملك خالية من الأخطاء؟', 'Are most of your sentences error-free?')]
  ];
  const box = $('#w-result');
  box.innerHTML = `<div class="card"><h2>${_('تقييم ذاتي موجّه', 'Guided self-assessment')}</h2><p class="small muted">${_('أجب بصدق؛ نجمع إجاباتك مع تحليل الرادار لتقدير درجتك. قارن بعدها بالإجابة النموذجية.', 'Answer honestly; we combine your answers with the radar analysis to estimate your band. Then compare with the model answer.')}</p>
  ${Q.map((q, i) => `<div class="fld"><span>${q[1]}</span><div class="seg" data-sq="${i}">${[[0, _('لا', 'No')], [1, _('جزئيًا', 'Partly')], [2, _('نعم', 'Yes')]].map(([v, l]) => `<button data-v="${v}">${l}</button>`).join('')}</div></div>`).join('')}
  <button class="btn primary" id="sa-go">${_('احسب درجتي التقديرية', 'Estimate my band')}</button><div id="sa-out"></div></div>`;
  const ansv = {};
  box.querySelectorAll('[data-sq]').forEach(sg => sg.querySelectorAll('button').forEach(b => b.onclick = () => { sg.querySelectorAll('button').forEach(x => x.classList.remove('on')); b.classList.add('on'); ansv[sg.dataset.sq] = +b.dataset.v; }));
  $('#sa-go').onclick = () => {
    if (Object.keys(ansv).length < Q.length) return toast(_('أجب عن كل الأسئلة.', 'Answer every question.'));
    const crit = { TA: [], CC: [], LR: [], GRA: [] }; Q.forEach((q, i) => crit[q[0]].push(ansv[i]));
    const base = v => 4 + v.reduce((x, y) => x + y, 0) / (2 * v.length) * 2.5; // 4 … 6.5: self-assessment alone cannot prove more
    const b = {}; for (const k in crit) b[k] = base(crit[k]);
    const min = WS.task === 't2' ? 250 : 150; if (a.wc < min) b.TA -= a.wc < min * .8 ? 1.5 : 1;
    if (WS.task === 't1a' && !/\b(overall|in general|it is clear that|generally)\b/i.test(text)) b.TA = Math.min(b.TA, 5);
    const per100 = a.hits.length / Math.max(1, a.wc / 100);
    b.GRA -= Math.min(2.5, a.hits.length * .35 + (per100 > 3 ? .5 : 0)); b.LR -= a.flags.some(f => /Repeated|تكرار/.test(f.en + f.ar)) ? .5 : 0; b.CC -= a.paras < 3 ? 1 : 0;
    if (a.hits.length >= 4) b.LR -= .5;
    for (const k in b) b[k] = half(Math.max(3, Math.min(6.5, b[k])));
    const ov = half((b.TA + b.CC + b.LR + b.GRA) / 4);
    saveWriting(text, ov, b, false);
    $('#sa-out').innerHTML = `<div class="spread" style="margin-top:10px"><div class="grid" style="gap:6px;flex:1">${Object.keys(b).map(k => `<div class="crit"><span class="cb">${fmtBand(b[k])}</span><b>${_(CRIT[k][0], CRIT[k][1])}</b><span></span></div>`).join('')}</div><div class="stamp c-W"><b>${fmtBand(ov)}</b><small>${_('تقدير', 'estimate')}</small></div></div><p class="tiny muted">${_('التقييم الذاتي محدود بـ 7.5؛ للحصول على تقييم دقيق استخدم المصحح الذكي.', 'Self-assessment is capped at 7.5; use the AI examiner for an accurate mark.')}</p>`;
    box.insertAdjacentHTML('beforeend', modelHTML()); bindModel();
  };
}
function modelHTML() { const it = WS.it; return `<div class="card" id="w-model"><div class="spread"><h2>${_('الإجابة النموذجية (Band 8+)', 'Model answer (band 8+)')}</h2><button class="btn ghost sm" id="w-model-t">${_('أظهر', 'Show')}</button></div><div id="w-model-b" hidden>${it.overview ? `<div class="notice teal"><b>Overview:</b> <span class="ltr-text">${esc(it.overview)}</span></div>` : ''}<div class="model">${esc(it.model)}</div>${it.outline ? `<div class="notice"><b>${_('الهيكل', 'Outline')}:</b><ul class="ltr-text"><li>${esc(it.outline.intro)}</li>${it.outline.body.map(b => `<li>${esc(b)}</li>`).join('')}<li>${esc(it.outline.conclusion)}</li></ul></div>` : ''}${it.position ? `<p><b>${_('الموقف', 'Position')}:</b> ${esc(L(it.position))}</p>` : ''}</div></div>`; }
function bindModel() { const b = $('#w-model-t'); if (b) b.onclick = () => { const x = $('#w-model-b'); x.hidden = !x.hidden; b.textContent = x.hidden ? _('أظهر', 'Show') : _('أخفِ', 'Hide'); }; }
