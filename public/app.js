/* IELTS Academy — app core: state, i18n, helpers, band model, content loading */
'use strict';
const KEY = 'ielts_v1';
const todayStr = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
const addDays = (d, n) => { const x = new Date(d + 'T12:00:00'); x.setDate(x.getDate() + n); return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0'); };
const daysBetween = (a, b) => Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 864e5);
const DEF = () => ({ lang: 'ar', module: 'ac', target: 65, examDate: '', planStart: todayStr(), since: todayStr(), onboarded: false,
  attempts: [], mistakes: [], writing: [], speaking: [], vocab: {}, para: {}, drills: {}, lessons: {}, days: [], qt: {}, dq: null, details: {}, notes: {} });
let S = (() => { try { const r = localStorage.getItem(KEY); if (r) return Object.assign(DEF(), JSON.parse(r)); } catch (e) {} return DEF(); })();
{ try { const u = new URL(location.href), q = u.searchParams.get('lang'); if (q === 'en' || q === 'ar') { S.lang = q; u.searchParams.delete('lang'); history.replaceState(null, '', u.pathname + (u.search || '') + u.hash); } } catch (e) {} }
let STORE_OK = true;
function save() {
  S.savedAt = Date.now();
  // keep the stored copy compact: details of only the last 20 attempts
  const ids = new Set(S.attempts.slice(-20).map(a => a.id)); for (const k in S.details) if (!ids.has(k)) delete S.details[k];
  try { localStorage.setItem(KEY, JSON.stringify(S)); STORE_OK = true; } catch (e) { STORE_OK = false; }
  try { window.CLOUD && CLOUD.queue && CLOUD.queue(); } catch (e) {}
  cloudStatus();
}
const AR = () => S.lang === 'ar';
const _ = (ar, en) => AR() ? ar : en;
const L = o => o && typeof o === 'object' && ('ar' in o) ? (AR() ? o.ar : o.en) : o;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const md = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
const numL = n => AR() ? String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]).replace(/\./g, '٫') : String(n);
const fmtBand = b => b == null ? '—' : (Number.isInteger(b) ? b.toFixed(1) : String(b));
const bandL = b => b == null ? '—' : numL(fmtBand(b));
const shuffle = (a, seed) => { const r = a.slice(); let s = seed || Math.random() * 1e9; const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor((seed ? rnd() : Math.random()) * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const half = x => Math.round(x * 2) / 2;
const clampBand = x => Math.max(0, Math.min(9, x));

function toast(msg, ms = 2600) { const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toast._t); toast._t = setTimeout(() => t.hidden = true, ms); }

/* ---------- icons ---------- */
const IC = {
  today: '<svg viewBox="0 0 24 24"><rect x="3.5" y="4.5" width="17" height="16" rx="3"/><path d="M3.5 9.5h17M8 2.8v3.4M16 2.8v3.4"/><path d="M8.5 14.5l2.2 2.2 4.8-4.8"/></svg>',
  L: '<svg viewBox="0 0 24 24"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="5" height="7" rx="2"/><rect x="16" y="14" width="5" height="7" rx="2"/></svg>',
  R: '<svg viewBox="0 0 24 24"><path d="M3 5.5c3-1.3 6-1.3 9 .8 3-2.1 6-2.1 9-.8v13c-3-1.3-6-1.3-9 .8-3-2.1-6-2.1-9-.8z"/><path d="M12 6.3v13.6"/></svg>',
  W: '<svg viewBox="0 0 24 24"><path d="M4 20h4L19.5 8.5a2.8 2.8 0 0 0-4-4L4 16z"/><path d="M13.5 6.5l4 4"/></svg>',
  S: '<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/></svg>',
  words: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="13" height="15" rx="2.5"/><path d="M8 3h10.5A2.5 2.5 0 0 1 21 5.5V17"/><path d="M6.5 10h6M6.5 14h4"/></svg>',
  prog: '<svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  lock: '<svg viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  play: '<svg viewBox="0 0 24 24"><path class="f" d="M8 5.5v13l10.5-6.5z"/></svg>',
  pause: '<svg viewBox="0 0 24 24"><path class="f" d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8.5" r="4"/><path d="M4.5 20c1.2-3.8 4.2-5.5 7.5-5.5s6.3 1.7 7.5 5.5"/></svg>',
  theme: '<svg viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>',
  spark: '<svg viewBox="0 0 24 24"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/></svg>',
  book: '<svg viewBox="0 0 24 24"><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/></svg>',
  flag: '<svg viewBox="0 0 24 24"><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
  target: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle class="f" cx="12" cy="12" r="1.3"/></svg>',
  arrow: '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  box: '<svg viewBox="0 0 24 24"><path d="M3.5 8L12 3.5 20.5 8v8L12 20.5 3.5 16z"/><path d="M3.5 8L12 12.5 20.5 8M12 12.5v8"/></svg>',
  radar: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><path d="M12 12l6-6"/></svg>',
  refresh: '<svg viewBox="0 0 24 24"><path d="M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6"/></svg>',
  globe: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.5 3.5 5.5 3.5 8.5s-1 6-3.5 8.5c-2.5-2.5-3.5-5.5-3.5-8.5s1-6 3.5-8.5z"/></svg>'
};
const ic = (k, c = 'i16') => (IC[k] || '').replace('<svg ', `<svg class="${c}" aria-hidden="true" `);
const SK = { L: ['الاستماع', 'Listening'], R: ['القراءة', 'Reading'], W: ['الكتابة', 'Writing'], S: ['المحادثة', 'Speaking'] };
const skName = k => _(SK[k][0], SK[k][1]);

/* ---------- content (lazy JSON; premium files come through the authenticated API) ---------- */
const FREE_FILES = new Set(['L01', 'A01', 'G01', 'task1_academic', 'task1_gt', 'task2', 'part1', 'part23', 'academic', 'topics', 'paraphrase', 'lessons', 'arab_errors']);
const CATALOG = {
  listening: [{ id: 'L01', n: 1 }, { id: 'L02', n: 2 }],
  reading: { ac: [{ id: 'A01', n: 1 }, { id: 'A02', n: 2 }], gt: [{ id: 'G01', n: 1 }] }
};
const CC = {};
async function content(name) {
  if (CC[name]) return CC[name];
  const url = FREE_FILES.has(name) ? '/content/' + name + '.json' : '/api/content/' + name;
  const r = await fetch(url, { credentials: 'same-origin' });
  if (r.status === 402 || r.status === 401) { const e = new Error('locked'); e.code = 'locked'; throw e; }
  if (!r.ok) throw new Error('load ' + name);
  return (CC[name] = await r.json());
}

/* ---------- band model ---------- */
const BT = {
  L: [[39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [26, 6.5], [23, 6], [18, 5.5], [16, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5], [2, 2], [1, 1], [0, 0]],
  ac: [[39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5], [23, 6], [19, 5.5], [15, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5], [2, 2], [1, 1], [0, 0]],
  gt: [[40, 9], [39, 8.5], [37, 8], [36, 7.5], [34, 7], [32, 6.5], [30, 6], [27, 5.5], [23, 5], [19, 4.5], [15, 4], [12, 3.5], [9, 3], [6, 2.5], [3, 2], [1, 1], [0, 0]]
};
function rawToBand(raw, of, table) { const x = Math.round(raw * 40 / (of || 40)); for (const [min, b] of BT[table]) if (x >= min) return b; return 0; }
function roundOverall(m) { const f = m - Math.floor(m); return f < .25 ? Math.floor(m) : f < .75 ? Math.floor(m) + .5 : Math.ceil(m); }
function skillBand(k) {
  let list;
  if (k === 'L' || k === 'R') list = S.attempts.filter(a => a.skill === k && a.band != null).slice(-3).map(a => ({ b: a.band, w: a.full ? 2 : 1 }));
  else if (k === 'W') list = S.writing.filter(w => w.band != null).slice(-3).map(w => ({ b: w.band, w: w.task === 't2' ? 2 : 1 }));
  else list = S.speaking.filter(w => w.band != null).slice(-3).map(w => ({ b: w.band, w: 1 }));
  if (!list.length) return null;
  const tw = list.reduce((a, x) => a + x.w, 0);
  return half(list.reduce((a, x) => a + x.b * x.w, 0) / tw);
}
function bands() { const o = { L: skillBand('L'), R: skillBand('R'), W: skillBand('W'), S: skillBand('S') }; const v = Object.values(o); o.O = v.every(x => x != null) ? roundOverall(v.reduce((a, b) => a + b, 0) / 4) : null; return o; }
const targetBand = () => (S.target || 65) / 10;
function weakest() { const b = bands(); const ks = ['L', 'R', 'W', 'S']; const t = targetBand(); return ks.map(k => ({ k, b: b[k], gap: b[k] == null ? 9 : t - b[k] })).sort((a, c) => c.gap - a.gap); }

/* question-type stats */
function qtAdd(skill, type, ok) { const s = S.qt[skill] || (S.qt[skill] = {}); const x = s[type] || (s[type] = { c: 0, t: 0 }); x.t++; if (ok) x.c++; }
const QT_NAMES = {
  tfng: ['صح/خطأ/غير مذكور', 'True/False/Not Given'], ynng: ['نعم/لا/غير مذكور', 'Yes/No/Not Given'], mcq: ['اختيار من متعدد', 'Multiple choice'], mcq2: ['اختيار إجابتين', 'Choose two'],
  headings: ['مطابقة العناوين', 'Matching headings'], info: ['مطابقة المعلومات', 'Matching information'], features: ['مطابقة الخصائص', 'Matching features'], endings: ['نهايات الجمل', 'Sentence endings'],
  matching: ['المطابقة', 'Matching'], sentence: ['إكمال الجمل', 'Sentence completion'], short: ['إجابات قصيرة', 'Short answers'], notes: ['إكمال الملاحظات', 'Note completion'], form: ['إكمال النموذج', 'Form completion'],
  table: ['إكمال الجدول', 'Table completion'], flow: ['المخطط الانسيابي', 'Flow chart'], summary: ['إكمال الملخص', 'Summary completion'], summary_bank: ['ملخص ببنك كلمات', 'Summary (word bank)'], map: ['الخرائط', 'Maps & plans']
};
const qtName = t => QT_NAMES[t] ? _(QT_NAMES[t][0], QT_NAMES[t][1]) : t;

/* daily activity + streak */
function markDay() { const d = todayStr(); if (!S.days.includes(d)) { S.days.push(d); if (S.days.length > 400) S.days = S.days.slice(-400); } }
function streak() { let n = 0, d = todayStr(); const set = new Set(S.days); if (!set.has(d)) d = addDays(d, -1); while (set.has(d)) { n++; d = addDays(d, -1); } return n; }

/* ---------- plans: free / pro ---------- */
const FREE = { dailyQuestions: 15, cardsFrac: .25, planWeeks: 2, mistakesMax: 15, techFrac: .34, diagnostic: true, aiWriting: 1, aiSpeaking: 1 };
function syncFree() { const c = window.CLOUD && CLOUD.config && CLOUD.config.free; if (c) Object.assign(FREE, c); }
const PRO = () => !!(window.CLOUD && CLOUD.isPro && CLOUD.isPro());
const signedIn = () => !!(window.CLOUD && CLOUD.user);
const track = (type, k, v) => { try { window.CLOUD && CLOUD.track && CLOUD.track(type, k, v); } catch (e) {} };
function dailyUsed() { return S.dq && S.dq.d === todayStr() ? S.dq.n : 0; }
function useDaily(n) { const d = todayStr(); if (!S.dq || S.dq.d !== d) S.dq = { d, n: 0 }; S.dq.n += n; }
const dailyLeft = () => PRO() ? Infinity : Math.max(0, (+FREE.dailyQuestions || 0) - dailyUsed());
const freeCount = n => PRO() ? n : Math.max(1, Math.ceil(n * (+FREE.techFrac || 0)));
const diagTaken = () => S.attempts.some(a => a.kind === 'diag');

/* summary for the server (admin dashboard) */
function summary() {
  const b = bands(); const lr = S.attempts.filter(a => a.raw != null).slice(-60);
  const acc = lr.length ? Math.round(100 * lr.reduce((a, x) => a + x.raw, 0) / lr.reduce((a, x) => a + x.of, 0)) : null;
  return { est: b.O != null ? b.O * 10 : null, readiness: b.O != null ? Math.round(100 * Math.min(1, b.O / targetBand())) : null,
    solved: S.attempts.reduce((a, x) => a + (x.of || 0), 0), acc, models: S.attempts.filter(a => a.full).length, streak: streak(),
    L: b.L, R: b.R, W: b.W, S: b.S, lastActive: S.days[S.days.length - 1] || '' };
}
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
    ${why.ar ? `<div class="why">${esc(why.ar)}</div>` : ''}${why.en ? `<div class="why en">${esc(why.en)}</div>` : ''}${evBtn}</div>`;
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
  $('#exam').innerHTML = `<div class="ex-top"><span class="cand">IELTS Academy · ${esc(sp.title)}</span><button id="ex-x">${_('خروج', 'Exit')}</button></div>
  <div class="ex-start"><h2>${esc(sp.title)}</h2>
  <ul><li>${nq} questions${Rd && sp.time ? ` · ${Math.round(sp.time / 60)} minutes` : ''}</li>${L ? `<li>${EX.mode === 'exam' ? 'You will hear each recording ONCE only. The test continues automatically.' : 'Practice mode: you can pause and replay the recording.'}</li>` : ''}<li>Answers are saved automatically. Use the bar at the bottom to move between questions and flag any you want to check.</li></ul>
  <div class="rtl" dir="rtl">${L ? (EX.mode === 'exam' ? 'وضع الاختبار الحقيقي: ستسمع التسجيل مرة واحدة فقط كما في الاختبار المحوسب. ' : 'وضع التدريب: يمكنك إيقاف التسجيل وإعادته. ') + 'شغّل السماعات وتأكد من مستوى الصوت. ' : ''}${Rd ? 'يمكنك تظليل أي جزء من النص بتحديده، والضغط على التظليل يزيله. ' : ''}بعد الانتهاء ترى درجتك وشرح كل إجابة بالعربية مع موضع الدليل.</div>
  ${L ? `<div class="ex-audio"><button id="ex-test-snd" style="font:inherit;border:1px solid #999;border-radius:4px;padding:6px 12px;background:#fff;cursor:pointer">🔊 ${_('اختبر الصوت', 'Test sound')}</button> <label>Volume <input type="range" class="vol" id="ex-vol0" min="0" max="1" step="0.05" value="${S.vol ?? 0.9}"></label></div>` : ''}
  <button class="go" id="ex-go">Start test</button></div>`;
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
  a.play().catch(() => { toast(_('اضغط تشغيل لبدء التسجيل', 'Press play to start the recording'), 4000); EX.needTap = true; renderExam(); });
}

/* ---------- main exam screen ---------- */
function renderExam(keepScroll) {
  const ex = $('#exam'), sec = EX.secs[EX.cur], R = EX.review;
  const qPane = ex.querySelector('.ex-pane.questions, .ex-pane.full'), y = keepScroll && qPane ? qPane.scrollTop : 0;
  const range = sec.data.groups.length ? `${sec.data.groups[0].from}–${sec.data.groups[sec.data.groups.length - 1].to}` : '';
  const partLabel = sec.skill === 'L' ? `Part ${sec.data.part}` : `${sec.data.section ? 'Section ' + sec.data.section + ' · ' : ''}Reading Passage ${sec.pn}`;
  const audioUI = sec.skill === 'L' && !R ? `<span class="ex-audio">${EX.mode === 'practice' || EX.needTap ? `<button id="ex-pp">${EX.audioEl && !EX.audioEl.paused ? '❚❚' : '▶'}</button>` : ''}<span class="prog" id="ex-prog"><i></i></span><label>🔊 <input type="range" class="vol" id="ex-vol" min="0" max="1" step="0.05" value="${S.vol ?? .9}"></label></span>` : '';
  const passage = sec.skill === 'R' ? passageHTML(sec) : '';
  const transcript = sec.skill === 'L' && R ? `<details class="qg" open><summary style="cursor:pointer;font-weight:700">Transcript · ${_('النص المسموع', 'what you heard')}</summary><div class="tscript" id="tscript">${sec.data.script.map((l, i) => l.t ? `<p data-li="${i}"><span class="sp">${esc(sec.data.speakers[l.s].name)}:</span>${esc(l.t)} <button data-ev-line="${sec.pi}:${i}" style="font-size:.75rem;border:1px solid #ccc;background:#fff;border-radius:3px;cursor:pointer">▶</button></p>` : l.break ? '<p style="color:#888">— — —</p>' : '').join('')}</div></details>` : '';
  ex.innerHTML = `<div class="ex-top"><span class="cand">${esc(EX.spec.title)}${R ? ' · REVIEW' : ''}</span>
    <span class="clock" id="ex-clock">${R ? '' : '⏱ <span></span>'}</span>${audioUI}
    <button id="ex-help" title="Arabic help">${S.helpAr !== false ? 'ع ✓' : 'ع'}</button><button id="ex-big" title="Text size">A+</button><button id="ex-con" title="Contrast">◐</button><button id="ex-x">${R ? _('إغلاق', 'Close') : _('خروج', 'Exit')}</button></div>
  <div class="ex-part"><b>${partLabel}</b>${sec.skill === 'L' ? esc(sec.data.intro) + ' ' : ''}Questions ${range}${sec.skill === 'R' ? ` · ${_('اقرأ النص وأجب عن الأسئلة', 'Read the text and answer the questions')}` : ''}</div>
  <div class="ex-body ${sec.skill === 'R' ? 'split' : ''}">
    ${sec.skill === 'R' ? `<div class="ex-pane passage" id="ex-passage">${passage}</div><div class="ex-pane questions">` : '<div class="ex-pane full">'}
      ${sec.data.groups.map(g => groupHTML(g, sec)).join('')}${transcript}
      ${R ? `<div style="padding:10px 0 30px"><button class="nb" id="ex-back-res" style="font:inherit;border:1px solid #888;border-radius:4px;padding:8px 14px;background:#fff;cursor:pointer">← ${_('ملخص النتيجة', 'Result summary')}</button></div>` : ''}
    </div></div>
  <div class="ex-nav">${navHTML()}<div class="acts">${R ? '' : `<button id="ex-flag">⚑ Review</button>`}${EX.cur > 0 ? '<button id="ex-prev">◀</button>' : ''}${EX.cur < EX.secs.length - 1 && (R || EX.secs[EX.cur + 1].skill === sec.skill || EX.mode === 'practice') ? '<button id="ex-next">▶</button>' : ''}${R ? '' : '<button class="go" id="ex-submit">Submit</button>'}</div></div>`;
  bindExam();
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
    return `<div class="pg"><span>${lab}</span>${nums.map(n => { const k = s.key + ':' + n; let cls = '';
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
  ex.querySelectorAll('[data-ev-quote]').forEach(b => b.onclick = () => showEvidence(b.dataset.evQuote));
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
  renderResult();
}
function renderResult() {
  const ex = $('#exam'), r = EX.result, R = EX.res;
  EX.review = true;
  const rows = Object.entries(r.qt).sort((a, b) => a[1].c / a[1].t - b[1].c / b[1].t).map(([k, v]) => `<tr><td>${skName(k[0])}</td><td>${esc(qtName(k.slice(2)))}</td><td>${v.c}/${v.t}</td><td>${Math.round(100 * v.c / v.t)}%</td></tr>`).join('');
  const worst = Object.entries(r.qt).filter(([, v]) => v.t >= 2).sort((a, b) => a[1].c / a[1].t - b[1].c / b[1].t)[0];
  const lessonFor = worst ? LESSON_FOR[worst[0].slice(2)] : null;
  ex.innerHTML = `<div class="ex-top"><span class="cand">${esc(EX.spec.title)} · RESULT</span><span class="clock"></span><button id="ex-x">${_('إغلاق', 'Close')}</button></div>
  <div class="ex-pane full" style="overflow:auto"><div class="result-top">
    <div style="display:flex;gap:30px;flex-wrap:wrap;justify-content:center">${r.made.map(a => `<div><div style="font-size:.85rem;color:#555">${skName(a.skill)}${a.full ? '' : ' · ' + _('تقدير', 'estimate')}</div><div class="big">${fmtBand(a.band)}</div><div>${a.raw} / ${a.of} ${_('صحيحة', 'correct')}</div></div>`).join('')}</div>
    <div dir="${AR() ? 'rtl' : 'ltr'}" style="font-family:var(--f-body);max-width:560px">${r.made.some(a => !a.full) ? _('هذه درجة تقديرية لأنك أجبت عن جزء من الاختبار؛ الاختبار الكامل (٤٠ سؤالًا) يعطي درجة أدق.', 'This is an estimate because you answered part of a test; a full 40-question test gives a more reliable band.') + ' ' : ''}${worst ? _(`أضعف نوع أسئلة في هذه المحاولة: «${qtName(worst[0].slice(2))}». `, `Your weakest question type this time: “${qtName(worst[0].slice(2))}”. `) : ''}${_('أُضيفت أخطاؤك إلى صندوق الأخطاء لمراجعتها لاحقًا.', 'Your mistakes have been added to your mistake box for spaced review.')}</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center"><button class="go" id="rv-go" style="font:inherit;font-weight:700;background:#1f5fa8;color:#fff;border:0;border-radius:4px;padding:10px 18px;cursor:pointer">${_('راجع الإجابات مع الشرح', 'Review answers with explanations')}</button>${lessonFor ? `<button id="rv-lesson" style="font:inherit;border:1px solid #888;background:#fff;border-radius:4px;padding:10px 18px;cursor:pointer">${_('درس هذا النوع', 'Lesson for this type')}</button>` : ''}</div>
    ${rows ? `<table class="qt-table"><tr><th>${_('المهارة', 'Skill')}</th><th>${_('نوع السؤال', 'Question type')}</th><th>${_('النتيجة', 'Score')}</th><th>%</th></tr>${rows}</table>` : ''}
  </div></div>`;
  ex.querySelector('#ex-x').onclick = () => closeExam();
  ex.querySelector('#rv-go').onclick = () => { EX.cur = 0; renderExam(); };
  const rl = ex.querySelector('#rv-lesson'); if (rl) rl.onclick = () => { const id = lessonFor; closeExam(); location.hash = '#lesson/' + id; };
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
async function pageWriting() {
  const [t1, g1, t2] = await Promise.all([content('task1_academic'), content('task1_gt'), content('task2')]);
  const tab = S.wTab || (S.module === 'gt' ? 'g1' : 'a1');
  const list = tab === 'a1' ? t1.items : tab === 'g1' ? g1.items : t2.items, task = tab === 'a1' ? 't1a' : tab === 'g1' ? 't1g' : 't2';
  const open = freeCount(list.length);
  const done = new Map(S.writing.map(w => [w.pid, w]));
  return `<div class="page-h"><span class="eyebrow">${skName('W')}</span><h1>${_('استوديو الكتابة', 'Writing studio')}</h1><p>${_('اكتب في محرر يشبه الاختبار الحقيقي، مع عدّاد كلمات ومؤقت ورادار يلتقط أخطاء المتعلمين العرب أثناء الكتابة، ثم احصل على تقييم بالمعايير الأربعة وإجابة نموذجية.', 'Write in an exam-like editor with a word counter, timer and a radar that catches typical Arabic-speaker errors as you type, then get marked on the four criteria and compare with a model answer.')}</p></div>
  <div class="seg" role="tablist">${[['a1', _('المهمة ١ أكاديمي', 'Task 1 Academic')], ['g1', _('المهمة ١ عام (رسالة)', 'Task 1 General (letter)')], ['t2', _('المهمة ٢ (مقالة)', 'Task 2 (essay)')]].map(([k, l]) => `<button data-wtab="${k}" class="${tab === k ? 'on' : ''}">${l}</button>`).join('')}</div>
  <div class="list">${list.map((it, i) => { const w = done.get(it.id), lk = i >= open;
    return `<a class="li ${lk ? 'locked' : ''}" href="${lk ? '#upgrade' : '#write/' + task + '/' + it.id}" data-lock="${lk ? 'writing' : ''}"><span class="li-t"><b class="ltr-text" style="text-align:start">${esc((it.prompt || '').split('\n')[0].slice(0, 120))}${(it.prompt || '').split('\n')[0].length > 120 ? '…' : ''}</b><span class="chips">${it.kind ? `<span class="chip teal">${esc(it.kind)}</span>` : ''}${it.tone ? `<span class="chip teal">${esc(it.tone)}</span>` : ''}${it.type ? `<span class="chip teal">${esc(it.type)}</span>` : ''}${w ? `<span class="chip ok">${_('آخر درجة', 'Last band')} ${bandL(w.band)}</span>` : ''}</span></span>${lk ? `<span class="lock-b">${ic('lock')}${_('برو', 'Pro')}</span>` : ic('arrow')}</a>`; }).join('')}</div>`;
}
let WS = null;
async function pageWrite(task, id) {
  const file = task === 't1a' ? 'task1_academic' : task === 't1g' ? 'task1_gt' : 'task2';
  const d = await content(file); const it = d.items.find(x => x.id === id); if (!it) return `<p class="empty">${_('غير موجود', 'Not found')}</p>`;
  await errorsData();
  const draftKey = 'w:' + id, draft = (S.notes || {})[draftKey] || '';
  WS = { task, it, start: null, secs: task === 't2' ? 2400 : 1200 };
  setTimeout(bindWrite, 0);
  return `<div class="spread"><a href="#writing" class="btn ghost sm">← ${_('كل المهام', 'All tasks')}</a><span class="chip pri">${task === 't2' ? 'Task 2 · 40 min · 250+ words' : 'Task 1 · 20 min · 150+ words'}</span></div>
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
}
function saveWriting(text, band, crit, ai) {
  S.writing.push({ id: uid(), pid: WS.it.id, task: WS.task, date: todayStr(), words: analyse(text, WS.task).wc, band, crit, ai: !!ai });
  if (S.writing.length > 100) S.writing = S.writing.slice(-100);
  markDay(); save();
}
const CRIT = { TA: ['إنجاز المهمة', 'Task Achievement / Response'], CC: ['التماسك والترابط', 'Coherence & Cohesion'], LR: ['الثروة اللغوية', 'Lexical Resource'], GRA: ['القواعد ودقتها', 'Grammatical Range & Accuracy'], FC: ['الطلاقة والتماسك', 'Fluency & Coherence'], P: ['النطق (تقديري)', 'Pronunciation (estimated)'] };
function aiResultHTML(r, keys, task) {
  return `<div class="card"><div class="spread"><h2>${ic('spark', 'i20')} ${_('تقييم المصحح الذكي', 'AI examiner’s report')}</h2><div class="stamp sm c-W"><b>${fmtBand(r.overall)}</b><small>band</small></div></div>
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
    const base = v => 4.5 + v.reduce((x, y) => x + y, 0) / (2 * v.length) * 3; // 4.5 … 7.5 (self-assessment cannot prove more)
    const b = {}; for (const k in crit) b[k] = base(crit[k]);
    const min = WS.task === 't2' ? 250 : 150; if (a.wc < min) b.TA -= 1;
    b.GRA -= Math.min(1.5, a.hits.length * .25); b.LR -= a.flags.some(f => /Repeated|تكرار/.test(f.en + f.ar)) ? .5 : 0; b.CC -= a.paras < 3 ? 1 : 0;
    for (const k in b) b[k] = half(Math.max(3, Math.min(7.5, b[k])));
    const ov = half((b.TA + b.CC + b.LR + b.GRA) / 4);
    saveWriting(text, ov, b, false);
    $('#sa-out').innerHTML = `<div class="spread" style="margin-top:10px"><div class="grid" style="gap:6px;flex:1">${Object.keys(b).map(k => `<div class="crit"><span class="cb">${fmtBand(b[k])}</span><b>${_(CRIT[k][0], CRIT[k][1])}</b><span></span></div>`).join('')}</div><div class="stamp c-W"><b>${fmtBand(ov)}</b><small>estimate</small></div></div><p class="tiny muted">${_('التقييم الذاتي محدود بـ 7.5؛ للحصول على تقييم دقيق استخدم المصحح الذكي.', 'Self-assessment is capped at 7.5; use the AI examiner for an accurate mark.')}</p>`;
    box.insertAdjacentHTML('beforeend', modelHTML()); bindModel();
  };
}
function modelHTML() { const it = WS.it; return `<div class="card" id="w-model"><div class="spread"><h2>${_('الإجابة النموذجية (Band 8+)', 'Model answer (band 8+)')}</h2><button class="btn ghost sm" id="w-model-t">${_('أظهر', 'Show')}</button></div><div id="w-model-b" hidden>${it.overview ? `<div class="notice teal"><b>Overview:</b> <span class="ltr-text">${esc(it.overview)}</span></div>` : ''}<div class="model">${esc(it.model)}</div>${it.outline ? `<div class="notice"><b>${_('الهيكل', 'Outline')}:</b><ul class="ltr-text"><li>${esc(it.outline.intro)}</li>${it.outline.body.map(b => `<li>${esc(b)}</li>`).join('')}<li>${esc(it.outline.conclusion)}</li></ul></div>` : ''}${it.position ? `<p><b>${_('الموقف', 'Position')}:</b> ${esc(L(it.position))}</p>` : ''}</div></div>`; }
function bindModel() { const b = $('#w-model-t'); if (b) b.onclick = () => { const x = $('#w-model-b'); x.hidden = !x.hidden; b.textContent = x.hidden ? _('أظهر', 'Show') : _('أخفِ', 'Hide'); }; }
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
