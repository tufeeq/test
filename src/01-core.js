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
