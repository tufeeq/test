/* GAT Academy back office (Railway build). CSP: script-src 'self' — no inline handlers, no external requests. */
(function () {
"use strict";

/* ================= basics ================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const LS = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } }
};
const clone = o => JSON.parse(JSON.stringify(o));
const num = v => { const n = Number(v); return isFinite(n) ? n : 0; };

let LANG = LS.get("masar100_admin_lang", "ar"); if (LANG !== "ar" && LANG !== "en") LANG = "ar";
const _ = (a, e) => (LANG === "ar" ? a : e);
const LOC = () => (LANG === "ar" ? "ar-SA-u-nu-arab-ca-gregory" : "en-US");

/* theme: shares the app's preference key (mode only) */
const TKEY = "masar100_theme";
function applyTheme() { const th = LS.get(TKEY, {}) || {}; const r = document.documentElement; if (th.mode === "light" || th.mode === "dark") r.setAttribute("data-theme", th.mode); else r.removeAttribute("data-theme"); }
const isDark = () => { const m = document.documentElement.getAttribute("data-theme"); return m ? m === "dark" : matchMedia("(prefers-color-scheme: dark)").matches; };
function toggleTheme() { const th = LS.get(TKEY, {}) || {}; th.mode = isDark() ? "light" : "dark"; LS.set(TKEY, th); applyTheme(); redrawCharts(); return th.mode; }
function applyLang() {
  const r = document.documentElement; r.lang = LANG; r.dir = LANG === "ar" ? "rtl" : "ltr";
  document.title = _("لوحة التحكم | أكاديمية القدرات", "Admin | GAT Academy");
}
applyTheme(); applyLang();

/* ================= formatting ================= */
const fmtN = (n, max = 0) => new Intl.NumberFormat(LOC(), { maximumFractionDigits: max }).format(num(n));
const fmtMoney = n => fmtN(n, 2) + " " + _("ر.س", "SAR");
const fmtPct = (x, max = 1) => new Intl.NumberFormat(LOC(), { style: "percent", maximumFractionDigits: max }).format(num(x));
const toDate = v => (v ? new Date(/^\d{4}-\d{2}-\d{2}$/.test(v) ? v + "T00:00:00Z" : v) : null);
const fmtDate = (v, utc) => { const d = toDate(v); return d && !isNaN(d) ? new Intl.DateTimeFormat(LOC(), { day: "numeric", month: "short", year: "numeric", timeZone: utc || /^\d{4}-\d{2}-\d{2}$/.test(v) ? "UTC" : undefined }).format(d) : "—"; };
const fmtDay = v => { const d = toDate(v); return d ? new Intl.DateTimeFormat(LOC(), { day: "numeric", month: "short", timeZone: "UTC" }).format(d) : ""; };
const fmtDT = v => { const d = toDate(v); return d && !isNaN(d) ? new Intl.DateTimeFormat(LOC(), { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" }).format(d) : "—"; };
function rel(v) {
  const d = toDate(v); if (!d || isNaN(d)) return "—";
  const s = (d.getTime() - Date.now()) / 1000, a = Math.abs(s), f = new Intl.RelativeTimeFormat(LOC(), { numeric: "auto" });
  if (a < 60) return _("الآن", "just now");
  if (a < 3600) return f.format(Math.round(s / 60), "minute");
  if (a < 86400) return f.format(Math.round(s / 3600), "hour");
  if (a < 86400 * 30) return f.format(Math.round(s / 86400), "day");
  return fmtDate(v);
}
const fmtDur = sec => { sec = Math.round(num(sec)); if (!sec) return "—"; const m = Math.floor(sec / 60), s = sec % 60; return m ? fmtN(m) + _(" د ", "m ") + (s ? fmtN(s) + _(" ث", "s") : "") : fmtN(s) + _(" ث", "s"); };
const today = () => new Date().toISOString().slice(0, 10);

/* ================= domain labels ================= */
const SKILLS = {
  analogy: ["التناظر اللفظي", "Verbal analogy"], completion: ["إكمال الجمل", "Sentence completion"], context: ["الخطأ السياقي", "Contextual error"],
  odd: ["المفردة الشاذة", "Odd word out"], reading: ["استيعاب المقروء", "Reading comprehension"], arith: ["الحساب", "Arithmetic"],
  algebra: ["الجبر", "Algebra"], geometry: ["الهندسة", "Geometry"], stats: ["التحليل والإحصاء", "Analysis & statistics"], comparison: ["المقارنات", "Quantitative comparison"]
};
const SKILL_ORDER = Object.keys(SKILLS);
const sk = s => (SKILLS[s] ? _(SKILLS[s][0], SKILLS[s][1]) : _("أخرى", "Other") + (s && s !== "other" ? " · " + s : ""));
const XP_PREFIX = { al: "algebra", an: "analogy", ar: "arith", cm: "comparison", co: "completion", cx: "context", ge: "geometry", od: "odd", re: "reading", st: "stats", percent: "arith", balance: "algebra", analogy: "analogy" };
function xpInfo(k) { const en = k.startsWith("en-"); const b = en ? k.slice(3) : k; const p = b.split("-")[0]; return { lang: en ? "en" : "ar", skill: XP_PREFIX[b] || XP_PREFIX[p] || "other" }; }
const LIMITS = {
  daily: ["الأسئلة اليومية", "Daily questions"], xp: ["الشروحات المقفلة", "Locked explainers"], test: ["الاختبارات", "Tests"],
  cards: ["البطاقات والمفردات", "Flashcards & vocabulary"], mistakes: ["صندوق الأخطاء", "Mistake box"], plan: ["الخطة الدراسية", "Study plan"],
  review: ["مراجعة المحاولات", "Attempt review"], analytics: ["التحليلات", "Analytics"], tech: ["الأساليب والأنماط", "Techniques & patterns"],
  custom: ["تخصيص الخطة", "Plan customization"], skill: ["التدريب الموجّه", "Targeted practice"]
};
const limitL = k => (LIMITS[k] ? _(LIMITS[k][0], LIMITS[k][1]) : k || "—");
const KINDS = {
  diag: ["الاختبار التشخيصي", "Diagnostic"], session: ["جلسة يومية", "Daily session"], skill: ["تدريب مهارة", "Skill practice"], model: ["نموذج محاكٍ", "Model test"],
  verbal: ["قسم لفظي", "Verbal section"], quant: ["قسم كمي", "Quant section"], mock: ["محاكاة كاملة", "Full mock"], mistakes: ["مراجعة الأخطاء", "Mistake review"], custom: ["تدريب مخصص", "Custom practice"], section: ["اختبار قسم", "Section test"]
};
const kindL = k => (KINDS[k] ? _(KINDS[k][0], KINDS[k][1]) : k || "—");
const EVENTS = {
  open: ["فتح التطبيق", "Opened the app", "sky"], diag_start: ["بدأ التشخيصي", "Started diagnostic", ""], diag_done: ["أنهى التشخيصي", "Finished diagnostic", ""],
  xp_start: ["بدأ شرحًا", "Started an explainer", "pink"], xp_done: ["أنهى شرحًا", "Finished an explainer", "pink"], limit_hit: ["بلغ حدًا مجانيًا", "Hit a free limit", "coral"],
  upgrade_view: ["شاهد الباقات", "Viewed plans", "butter"], checkout_start: ["بدأ الدفع", "Started checkout", "butter"], test_start: ["بدأ اختبارًا", "Started a test", ""],
  test_done: ["أنهى اختبارًا", "Finished a test", ""], report_view: ["شاهد تقرير التجربة", "Viewed trial report", "sky"]
};
const SOURCES = { tap: ["دفع إلكتروني", "Paid"], moyasar: ["دفع إلكتروني", "Paid"], coupon: ["قسيمة", "Coupon"], manual: ["منحة يدوية", "Manual grant"], admin: ["مشرف", "Admin"] };
const srcL = s => (SOURCES[s] ? _(SOURCES[s][0], SOURCES[s][1]) : s || "—");
const PSTAT = { paid: ["مدفوعة", "Paid"], refunded: ["مستردة", "Refunded"], failed: ["فاشلة", "Failed"], initiated: ["لم تكتمل", "Initiated"] };
const pstatL = s => (PSTAT[s] ? _(PSTAT[s][0], PSTAT[s][1]) : s);

/* friendly messages for API error codes */
const ERR = {
  unauthenticated: ["انتهت الجلسة، سجّل الدخول من جديد.", "Your session ended. Please sign in again."],
  forbidden: ["هذا الحساب لا يملك صلاحية المشرف.", "This account is not an admin."],
  "bad-origin": ["رُفض الطلب لأسباب أمنية. حدّث الصفحة وأعد المحاولة.", "Request blocked for security. Reload and try again."],
  "not-found": ["العنصر غير موجود، ربما حُذف.", "Not found. It may have been deleted."],
  "bad-days": ["عدد الأيام يجب أن يكون بين ١ و١٠٠٠.", "Days must be between 1 and 1000."],
  "invalid-name": ["الاسم يجب أن يكون بين حرفين و٦٠ حرفًا.", "Name must be 2–60 characters."],
  "not-refundable": ["لا يمكن استرداد هذه الدفعة (ليست مدفوعة).", "This payment can't be refunded (not paid)."],
  "bad-amount": ["مبلغ الاسترداد غير صحيح: يجب أن يكون أكبر من صفر ولا يتجاوز المبلغ المدفوع.", "Invalid refund amount: must be above zero and no more than what was paid."],
  "payments-not-configured": ["الدفع الإلكتروني غير مفعّل بعد (المتغير TAP_SECRET_KEY غير مضاف).", "Online payment isn't configured yet (TAP_SECRET_KEY is missing)."],
  "no-charge": ["لا توجد عملية دفع لدى بوابة الدفع مرتبطة بهذه الدفعة.", "There's no gateway payment linked to this payment."],
  "bad-code": ["رمز القسيمة: ٣–٣٢ حرفًا إنجليزيًا أو رقمًا أو - أو _.", "Coupon code: 3–32 letters, digits, - or _."],
  "bad-pct": ["نسبة الخصم يجب أن تكون بين ١ و١٠٠.", "Discount must be between 1 and 100%."],
  "bad-date": ["تاريخ الانتهاء غير صالح.", "Invalid expiry date."],
  exists: ["يوجد قسيمة بهذا الرمز مسبقًا.", "A coupon with this code already exists."],
  "in-use": ["لا يمكن حذف قسيمة مستخدمة؛ عطّلها بدلًا من ذلك.", "A used coupon can't be deleted; disable it instead."],
  "bad-config": ["الإعدادات المرسلة غير صالحة.", "The settings sent are invalid."],
  "bad-plans": ["تحقق من الباقات: معرّف صالح، سعر أكبر من صفر، ومدة يوم على الأقل.", "Check the plans: valid id, price above zero, at least 1 day."],
  "too-many-requests": ["طلبات كثيرة، انتظر قليلًا ثم أعد المحاولة.", "Too many requests. Wait a moment and try again."],
  "invalid-credential": ["البريد أو كلمة المرور غير صحيحة.", "Wrong email or password."],
  "bad-json": ["البيانات المرسلة غير صالحة.", "Invalid data sent."], "too-large": ["البيانات أكبر من المسموح.", "Data too large."],
  network: ["تعذّر الاتصال بالخادم. تحقق من الإنترنت.", "Can't reach the server. Check your connection."],
  server: ["حدث خطأ في الخادم. أعد المحاولة بعد قليل.", "Server error. Try again shortly."]
};
const errMsg = code => { const m = ERR[code] || ERR.server; return _(m[0], m[1]); };

/* ================= icons ================= */
const P = {
  overview: '<rect x="3" y="3" width="7" height="9" rx="2"/><rect x="14" y="3" width="7" height="5" rx="2"/><rect x="14" y="12" width="7" height="9" rx="2"/><rect x="3" y="16" width="7" height="5" rx="2"/>',
  funnel: '<path d="M3 4h18l-7 8.5V19l-4 2v-8.5z"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.8c1.9.7 3 2.4 3.5 5.2"/>',
  card: '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6.5 15h4"/>',
  ticket: '<path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4z"/><path d="M14 6v12" stroke-dasharray="2 2.5"/>',
  book: '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H11v17H5.5A1.5 1.5 0 0 1 4 18.5zM20 4.5A1.5 1.5 0 0 0 18.5 3H13v17h5.5a1.5 1.5 0 0 0 1.5-1.5z"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  list: '<path d="M9 6h12M9 12h12M9 18h12"/><circle cx="4.5" cy="6" r="1.2" class="f"/><circle cx="4.5" cy="12" r="1.2" class="f"/><circle cx="4.5" cy="18" r="1.2" class="f"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>',
  logout: '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l-5-5 5-5M5 12h11"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M4 20h16"/>',
  refresh: '<path d="M20 11a8 8 0 0 0-14.8-4M4 4v4h4M4 13a8 8 0 0 0 14.8 4M20 20v-4h-4"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  alert: '<path d="M12 3.5l9.5 16.5h-19z"/><path d="M12 10v4.5"/><circle cx="12" cy="17.3" r="1" class="f"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5"/><circle cx="12" cy="7.8" r="1" class="f"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20c1.2-3.8 4.2-5.5 7.5-5.5s6.3 1.7 7.5 5.5"/>',
  star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  coin: '<ellipse cx="12" cy="7" rx="7" ry="3"/><path d="M5 7v5c0 1.7 3.1 3 7 3s7-1.3 7-3V7M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5"/>',
  cart: '<path d="M3 4h2.5l2.2 10.5h10.6L20.5 7H7"/><circle cx="9.5" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/>',
  bolt: '<path d="M13 2.5L4.5 13.5H12l-1 8 8.5-11H12z"/>',
  pulse: '<path d="M3 12h4l2.5-6 5 12 2.5-6h4"/>',
  percent: '<path d="M19 5L5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
  gift: '<rect x="3" y="8" width="18" height="5" rx="1"/><path d="M5 13v7h14v-7M12 8v12M12 8c-1.5-3-5-3.5-5-1.5S10 8 12 8zM12 8c1.5-3 5-3.5 5-1.5S14 8 12 8z"/>',
  ban: '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>',
  back: '<path d="M15 6l-6 6 6 6"/>',
  undo: '<path d="M9 14L4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>'
};
const ic = (n, cls = "") => `<svg viewBox="0 0 24 24" aria-hidden="true" class="${cls}">${P[n] || ""}</svg>`;

/* ================= API ================= */
let LOST = false;
async function api(method, url, body) {
  let r;
  try { r = await fetch(url, { method, headers: { "Content-Type": "application/json", "X-Masar": "1" }, credentials: "same-origin", body: body ? JSON.stringify(body) : undefined }); }
  catch (e) { const x = new Error("network"); x.code = "network"; throw x; }
  const j = await r.json().catch(() => ({}));
  if (!r.ok) {
    const e = new Error(j.error || "server"); e.code = j.error || (r.status === 429 ? "too-many-requests" : "server"); e.status = r.status;
    if (e.code === "unauthenticated" && ME) sessionLost();
    throw e;
  }
  return j;
}

/* ================= toasts & tooltip ================= */
function toast(msg, type = "ok", sub = "") {
  const box = $("#adm-toasts"); if (!box) return;
  const el = document.createElement("div"); el.className = "tst " + type; el.setAttribute("role", type === "err" ? "alert" : "status");
  el.innerHTML = `${ic(type === "err" ? "alert" : type === "warn" ? "info" : type === "info" ? "info" : "check")}<p>${esc(msg)}${sub ? `<small>${esc(sub)}</small>` : ""}</p><button type="button" aria-label="${_("إغلاق", "Dismiss")}">×</button>`;
  const kill = () => { el.remove(); };
  el.querySelector("button").addEventListener("click", kill);
  box.appendChild(el); while (box.children.length > 4) box.firstChild.remove();
  setTimeout(kill, type === "err" ? 7000 : 3800);
}
const fail = (e, what) => { if (e && e.code === "unauthenticated") return; toast(what || _("تعذّر تنفيذ العملية", "Action failed"), "err", errMsg(e && e.code)); };
const tip = $("#adm-tip");
function showTip(html, x, y) {
  tip.innerHTML = html; tip.hidden = false;
  const w = tip.offsetWidth, h = tip.offsetHeight, vw = innerWidth;
  let l = Math.max(8, Math.min(vw - w - 8, x - w / 2)), t = y - h - 12; if (t < 8) t = y + 18;
  tip.style.left = l + "px"; tip.style.top = t + "px";
}
const hideTip = () => { tip.hidden = true; };
// generic [data-tip] tooltips for HTML marks (bars, chips)
function tipFor(el) { const r = el.getBoundingClientRect(); showTip((el.dataset.tipH ? `<b>${esc(el.dataset.tipH)}</b>` : "") + esc(el.dataset.tip || ""), r.left + r.width / 2, r.top); }
document.addEventListener("pointerover", e => { const el = e.target.closest && e.target.closest("[data-tip]"); if (el) tipFor(el); });
document.addEventListener("pointerout", e => { const el = e.target.closest && e.target.closest("[data-tip]"); if (el && !el.contains(e.relatedTarget)) hideTip(); });
document.addEventListener("focusin", e => { const el = e.target.closest && e.target.closest("[data-tip]"); if (el) tipFor(el); });
document.addEventListener("focusout", e => { if (e.target.closest && e.target.closest("[data-tip]")) hideTip(); });
addEventListener("scroll", hideTip, true);

/* ================= charts (hand-built SVG) ================= */
const CHARTS = new Map();
function niceScale(max, int) {
  if (!(max > 0)) return { top: int ? 4 : 1, step: int ? 1 : .25 };
  const raw = max / 4, mag = Math.pow(10, Math.floor(Math.log10(raw)));
  let step = [1, 2, 2.5, 5, 10].map(m => m * mag).find(s => s >= raw) || 10 * mag;
  if (int) step = Math.max(1, Math.ceil(step));
  return { top: Math.ceil(max / step) * step, step };
}
function seriesDays(arr, days) {
  const m = new Map((arr || []).map(p => [p.d, num(p.n)])); const out = []; const end = new Date(today() + "T00:00:00Z");
  for (let i = days - 1; i >= 0; i--) { const d = new Date(end.getTime() - i * 864e5).toISOString().slice(0, 10); out.push({ d, n: m.get(d) || 0 }); }
  return out;
}
function bucket(pts, agg) {
  if (pts.length <= 120) return pts.map(p => ({ ...p, lbl: fmtDate(p.d) }));
  const out = [];
  for (let i = 0; i < pts.length; i += 7) {
    const ch = pts.slice(i, i + 7), s = ch.reduce((a, p) => a + p.n, 0);
    out.push({ d: ch[0].d, n: agg === "avg" ? Math.round(10 * s / ch.length) / 10 : s, lbl: _("أسبوع ", "Week of ") + fmtDate(ch[0].d) });
  }
  return out;
}
function chartBox(id, cls, label) { return `<div class="chart ${cls || ""}" data-ck="${id}" tabindex="0" aria-label="${esc(label)}"></div>`; }
function drawChart(id, spec) { CHARTS.set(id, spec); const el = $(`[data-ck="${id}"]`); if (el) renderChart(el, spec); }
function redrawCharts() { CHARTS.forEach((spec, id) => { const el = $(`[data-ck="${id}"]`); if (el) renderChart(el, spec); else CHARTS.delete(id); }); }
let rsT; addEventListener("resize", () => { clearTimeout(rsT); rsT = setTimeout(redrawCharts, 150); });
function renderChart(el, spec) {
  const pts = spec.pts, n = pts.length, fmt = spec.fmt || (v => fmtN(v, 1));
  if (!n || pts.every(p => !p.n)) { el.innerHTML = `<div class="chart-empty">${esc(spec.empty || _("لا بيانات في هذه الفترة", "No data in this period"))}</div>`; el.removeAttribute("tabindex"); return; }
  el.setAttribute("tabindex", "0");
  const W = Math.max(260, Math.floor(el.clientWidth || 600)), H = spec.h || 210, rtl = document.dir === "rtl";
  const padA = 46, padE = 8, padB = 26, padT = 12, L = rtl ? padE : padA, R = W - (rtl ? padA : padE), plotH = H - padB - padT, base = padT + plotH;
  const max = Math.max(...pts.map(p => p.n)), { top, step } = niceScale(max, spec.int);
  const yv = v => base - (top ? v / top * plotH : 0), bw = (R - L) / n, xc = i => (rtl ? R - bw * (i + .5) : L + bw * (i + .5));
  let g = '<g class="grid">', ax = '<g class="ax">';
  for (let v = 0; v <= top + 1e-9; v += step) {
    const y = yv(v).toFixed(1);
    if (v > 0) g += `<line x1="${L}" x2="${R}" y1="${y}" y2="${y}"/>`;
    ax += `<text x="${rtl ? R + 8 : L - 8}" y="${+y + 4}" text-anchor="${rtl ? "start" : "end"}">${esc(spec.axFmt ? spec.axFmt(v) : fmtN(v, 2))}</text>`;
  }
  const every = Math.ceil(n / (W < 480 ? 4 : W < 800 ? 6 : 8));
  for (let i = 0; i < n; i += every) { const x = xc(i); ax += `<text x="${x.toFixed(1)}" y="${H - 6}" text-anchor="${x < 45 ? "start" : x > W - 45 ? "end" : "middle"}">${esc(fmtDay(pts[i].d))}</text>`; }
  g += "</g>"; ax += "</g>";
  let marks = "";
  if (spec.type === "bar") {
    const w = Math.max(2, Math.min(26, bw * .68));
    pts.forEach((p, i) => { if (p.n > 0) { const y = yv(p.n), h = Math.max(1.5, base - y); marks += `<rect class="bar" data-i="${i}" x="${(xc(i) - w / 2).toFixed(1)}" y="${(base - h).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="${Math.min(4, w / 2).toFixed(1)}"/>`; } });
  } else {
    const d = pts.map((p, i) => (i ? "L" : "M") + xc(i).toFixed(1) + "," + yv(p.n).toFixed(1)).join("");
    marks = `<path class="ar" d="${d}L${xc(n - 1).toFixed(1)},${base}L${xc(0).toFixed(1)},${base}Z"/><path class="ln" d="${d}"/>`;
  }
  let hits = ""; pts.forEach((p, i) => { hits += `<rect class="hit" data-i="${i}" x="${(xc(i) - bw / 2).toFixed(1)}" y="${padT}" width="${bw.toFixed(1)}" height="${plotH}"/>`; });
  el.innerHTML = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" direction="ltr" aria-hidden="true">${g}<line class="base" x1="${L}" x2="${R}" y1="${base}" y2="${base}"/>${marks}<line class="xh" y1="${padT}" y2="${base}" x1="0" x2="0" visibility="hidden"/>${spec.type === "bar" ? "" : '<circle class="dot" r="5" cx="0" cy="0" visibility="hidden"/>'}${ax}${hits}</svg><p class="sr" aria-live="polite"></p>`;
  el._g = { pts, xc, yv, fmt, spec };
  if (el._i != null && el._i >= n) el._i = null;
  if (!el._bound) {
    el._bound = true;
    const show = i => {
      const G = el._g; if (!G) return; i = Math.max(0, Math.min(G.pts.length - 1, i)); el._i = i;
      const p = G.pts[i], x = G.xc(i), y = G.yv(p.n), svg = $("svg", el); if (!svg) return;
      const xh = $(".xh", svg); xh.setAttribute("x1", x); xh.setAttribute("x2", x); xh.setAttribute("visibility", "visible");
      const dot = $(".dot", svg); if (dot) { dot.setAttribute("cx", x); dot.setAttribute("cy", y); dot.setAttribute("visibility", "visible"); }
      $$(".bar", svg).forEach(b => b.classList.toggle("on", +b.dataset.i === i));
      const r = svg.getBoundingClientRect(); const val = G.fmt(p.n);
      showTip(`<b>${esc(val)}</b>${esc(p.lbl || fmtDate(p.d))}${G.spec.unit ? " · " + esc(G.spec.unit) : ""}`, r.left + x, r.top + y);
      $(".sr", el).textContent = (p.lbl || fmtDate(p.d)) + ": " + val;
    };
    const hide = () => { hideTip(); const svg = $("svg", el); if (!svg) return; $$(".xh,.dot", svg).forEach(x => x.setAttribute("visibility", "hidden")); $$(".bar.on", svg).forEach(b => b.classList.remove("on")); };
    el.addEventListener("pointermove", e => { const h = e.target.closest && e.target.closest("[data-i]"); if (h) show(+h.dataset.i); });
    el.addEventListener("pointerleave", () => { if (document.activeElement !== el) hide(); });
    el.addEventListener("focus", () => show(el._i != null ? el._i : el._g ? el._g.pts.length - 1 : 0));
    el.addEventListener("blur", hide);
    el.addEventListener("keydown", e => {
      if (!el._g) return; const rtl = document.dir === "rtl", n = el._g.pts.length; let i = el._i != null ? el._i : n - 1;
      if (e.key === "ArrowRight") i += rtl ? -1 : 1; else if (e.key === "ArrowLeft") i += rtl ? 1 : -1; else if (e.key === "Home") i = 0; else if (e.key === "End") i = n - 1; else if (e.key === "Escape") { hide(); return; } else return;
      e.preventDefault(); show(i);
    });
  }
}
function dataTable(pts, fmt, head) {
  return `<details class="tv"><summary>${_("عرض البيانات كجدول", "Show data table")}</summary><div class="tbl"><table><thead><tr><th scope="col">${esc(head || _("التاريخ", "Date"))}</th><th scope="col" class="num">${_("القيمة", "Value")}</th></tr></thead><tbody>${pts.filter(p => p.n).slice().reverse().map(p => `<tr><td>${esc(p.lbl || fmtDate(p.d))}</td><td class="num">${esc(fmt(p.n))}</td></tr>`).join("") || `<tr><td colspan="2" class="tbl-empty">${_("لا بيانات", "No data")}</td></tr>`}</tbody></table></div></details>`;
}
// horizontal bar list
function hbars(rows, opts = {}) {
  const max = Math.max(opts.max || 0, ...rows.map(r => r.v), 1e-9);
  return `<div class="hb" role="list">${rows.map(r => `<div class="hb-row" role="listitem" tabindex="0" data-tip-h="${esc(r.tipH || r.label)}" data-tip="${esc(r.tip || "")}">
    <span class="lb">${esc(r.label)}${r.sub ? `<small>${esc(r.sub)}</small>` : ""}</span>
    <span class="hb-tr ${opts.cls || ""}" aria-hidden="true"><span style="inline-size:${Math.max(0, Math.min(100, 100 * r.v / max)).toFixed(1)}%"></span>${r.mark != null ? `<i class="mk" style="inset-inline-start:${Math.max(0, Math.min(100, 100 * r.mark / max)).toFixed(1)}%"></i>` : ""}</span>
    <span class="vl">${esc(r.vlabel)}${r.vsub ? `<small>${esc(r.vsub)}</small>` : ""}</span></div>`).join("")}</div>`;
}

/* ================= shared state ================= */
let ME = null, SETTINGS = null, setP = null;
const USERS_BY_ID = new Map();
const S = {
  ovDays: LS.get("adm_ovDays", 30), fnDays: LS.get("adm_fnDays", 90), ctDays: LS.get("adm_ctDays", 90),
  st: { q: "", plan: "", sort: "active", page: 0, size: 25 }, payStatus: "", xpSort: { k: "starts", asc: false }, auditQ: "",
  draft: null, dirty: false, errs: {}
};
function getSettings(force) {
  if (SETTINGS && !force) return Promise.resolve(SETTINGS);
  if (!setP || force) setP = api("GET", "/api/admin/settings").then(r => (SETTINGS = r)).catch(e => { setP = null; throw e; });
  return setP;
}
const planName = id => { const p = SETTINGS && SETTINGS.config.plans.find(x => x.id === id); return p ? _(p.ar || p.en || id, p.en || p.ar || id) : (id || "—"); };

/* ================= sections / shell ================= */
const SECS = [
  ["overview", "نظرة عامة", "Overview", "overview"], ["funnel", "مسار التحويل", "Conversion funnel", "funnel"], ["students", "الطلاب", "Students", "users"],
  ["payments", "المدفوعات", "Payments", "card"], ["coupons", "القسائم", "Coupons", "ticket"], ["content", "تحليلات المحتوى", "Content analytics", "book"],
  ["settings", "الإعدادات", "Settings", "gear"], ["audit", "سجل العمليات", "Audit log", "list"]
];
const curSec = () => { const h = location.hash.replace(/^#\/?/, "").split(/[?/]/)[0]; return SECS.some(s => s[0] === h) ? h : "overview"; };
const app = $("#app");
let MAIN = null, RT = 0;

function shell() {
  const initial = (ME.name || ME.email || "?").trim().charAt(0).toUpperCase();
  app.removeAttribute("aria-busy");
  app.innerHTML = `<a class="sr" href="#adm-main" id="skip">${_("تخطَّ إلى المحتوى", "Skip to content")}</a><div class="shell">
  <aside class="side">
    <a class="brand" href="#overview"><span class="logo">GAT</span><span><b>${_("أكاديمية القدرات", "GAT Academy")}</b><small>${_("لوحة التحكم", "Admin console")}</small></span></a>
    <nav aria-label="${_("أقسام لوحة التحكم", "Admin sections")}">${SECS.map(([id, a, e, i]) => `<a href="#${id}" data-sec="${id}">${ic(i)}<span>${_(a, e)}</span></a>`).join("")}</nav>
    <div class="side-acts">
      <div class="who"><span class="av" aria-hidden="true">${esc(initial)}</span><div><b>${esc(ME.name || _("مشرف", "Admin"))}</b><small dir="ltr">${esc(ME.email)}</small></div></div>
      <div class="row">
        <button class="btn ghost sm" id="b-theme" type="button" aria-label="${_("تبديل المظهر", "Toggle theme")}">${ic(isDark() ? "sun" : "moon")}<span class="lbl">${isDark() ? _("فاتح", "Light") : _("داكن", "Dark")}</span></button>
        <button class="btn ghost sm" id="b-lang" type="button" lang="${LANG === "ar" ? "en" : "ar"}" aria-label="${LANG === "ar" ? "Switch to English" : "التبديل إلى العربية"}">${ic("globe")}<span class="lbl">${LANG === "ar" ? "English" : "العربية"}</span></button>
        <button class="btn ghost sm" id="b-out" type="button" aria-label="${_("تسجيل الخروج", "Sign out")}">${ic("logout")}<span class="lbl">${_("خروج", "Sign out")}</span></button>
      </div>
    </div>
  </aside>
  <main class="mainc" id="adm-main" tabindex="-1"></main></div>`;
  MAIN = $("#adm-main");
  $("#skip").addEventListener("click", e => { e.preventDefault(); MAIN.focus(); });
  $("#b-theme").addEventListener("click", () => { const m = toggleTheme(); shellButtons(); toast(m === "dark" ? _("تم تفعيل الوضع الداكن", "Dark mode on") : _("تم تفعيل الوضع الفاتح", "Light mode on"), "info"); });
  $("#b-lang").addEventListener("click", () => { LANG = LANG === "ar" ? "en" : "ar"; LS.set("masar100_admin_lang", LANG); applyLang(); closeDrawer(true); shell(); route(); toast(_("تم التبديل إلى العربية", "Switched to English"), "info"); });
  $("#b-out").addEventListener("click", async () => { try { await api("POST", "/api/logout"); toast(_("تم تسجيل الخروج", "Signed out"), "info"); } catch (e) { fail(e, _("تعذّر تسجيل الخروج", "Couldn't sign out")); } ME = null; closeDrawer(true); loginView(); });
}
function shellButtons() { const b = $("#b-theme"); if (b) b.innerHTML = `${ic(isDark() ? "sun" : "moon")}<span class="lbl">${isDark() ? _("فاتح", "Light") : _("داكن", "Dark")}</span>`; }
function markNav(sec) { $$(".side nav a").forEach(a => { const on = a.dataset.sec === sec; a.classList.toggle("on", on); if (on) { a.setAttribute("aria-current", "page"); a.scrollIntoView({ block: "nearest", inline: "nearest" }); } else a.removeAttribute("aria-current"); }); }

function ph(eyA, eyE, tA, tE, dA, dE, acts = "") {
  return `<header class="ph"><div><p class="eyebrow">${_(eyA, eyE)}</p><h1>${_(tA, tE)}</h1>${dA ? `<p>${_(dA, dE)}</p>` : ""}</div><div class="ph-acts">${acts}</div></header>`;
}
const PERIODS = [[7, "٧ أيام", "7 days"], [30, "٣٠ يومًا", "30 days"], [90, "٩٠ يومًا", "90 days"], [365, "سنة", "1 year"]];
const periodSeg = (id, cur) => `<div class="seg" role="group" aria-label="${_("الفترة", "Period")}" id="${id}">${PERIODS.map(([v, a, e]) => `<button type="button" data-v="${v}" class="${cur === v ? "on" : ""}" aria-pressed="${cur === v}">${_(a, e)}</button>`).join("")}</div>`;
function onSeg(id, fn) { const s = $("#" + id); if (s) s.addEventListener("click", e => { const b = e.target.closest("button[data-v]"); if (b) fn(b.dataset.v); }); }
const refreshBtn = () => `<button class="btn ghost sm" type="button" id="b-refresh">${ic("refresh")}${_("تحديث", "Refresh")}</button>`;
function onRefresh(fn) { const b = $("#b-refresh"); if (b) b.addEventListener("click", async () => { b.classList.add("is-busy"); try { await fn(); if (ME) toast(_("تم تحديث البيانات", "Data refreshed"), "info"); } finally { b.classList.remove("is-busy"); } }); }
const skel = (n = 3, h = 110) => `<div class="kgrid">${Array.from({ length: n }, () => `<div class="skel" style="min-block-size:${h}px"></div>`).join("")}</div>`;

async function route() {
  if (!ME) return;
  const sec = curSec(), tok = ++RT; markNav(sec); hideTip(); CHARTS.clear(); freshMain();
  MAIN.innerHTML = skel(4) + `<div class="skel" style="min-block-size:260px"></div>`;
  try { await VIEWS[sec](tok); }
  catch (e) {
    if (tok !== RT || e.code === "unauthenticated") return;
    if (e.code === "forbidden") { notAdminView(ME); return; }
    MAIN.innerHTML = `<div class="alert err" role="alert">${ic("alert")}<div><b>${_("تعذّر تحميل هذا القسم", "Couldn't load this section")}</b>${esc(errMsg(e.code))}<div class="row" style="margin-top:8px"><button class="btn primary sm" id="b-retry" type="button">${_("إعادة المحاولة", "Try again")}</button></div></div></div>`;
    $("#b-retry").addEventListener("click", route);
    fail(e, _("تعذّر تحميل البيانات", "Couldn't load data"));
  }
}
const live = tok => tok === RT;
// each view binds delegated listeners on MAIN, so give every render a fresh element
function freshMain() { const m = MAIN.cloneNode(false); MAIN.replaceWith(m); MAIN = m; }
addEventListener("hashchange", () => { if (ME) { closeDrawer(true); route(); if (innerWidth < 900) scrollTo(0, 0); } });
addEventListener("beforeunload", e => { if (S.dirty) { e.preventDefault(); e.returnValue = ""; } });

/* ================= auth views ================= */
function authTools() {
  return `<div class="auth-tools"><button class="btn ghost sm" type="button" id="a-lang" lang="${LANG === "ar" ? "en" : "ar"}">${ic("globe")}${LANG === "ar" ? "English" : "العربية"}</button><button class="btn ghost sm" type="button" id="a-theme" aria-label="${_("تبديل المظهر", "Toggle theme")}">${ic(isDark() ? "sun" : "moon")}</button></div>`;
}
function bindAuthTools(re) {
  $("#a-lang").addEventListener("click", () => { LANG = LANG === "ar" ? "en" : "ar"; LS.set("masar100_admin_lang", LANG); applyLang(); re(); });
  $("#a-theme").addEventListener("click", () => { toggleTheme(); re(); });
}
function loginView(errCode = "") {
  RT++; app.removeAttribute("aria-busy");
  app.innerHTML = `<div class="auth"><div><form class="auth-card" id="lf" novalidate>
    <span class="brand"><span class="logo">GAT</span><span><b>${_("أكاديمية القدرات", "GAT Academy")}</b><small>${_("لوحة التحكم", "Admin console")}</small></span></span>
    <h1>${_("تسجيل دخول المشرف", "Admin sign in")}</h1><p class="muted small">${_("هذه اللوحة للمشرفين فقط. استخدم حسابك في التطبيق.", "For administrators only. Use your app account.")}</p>
    ${errCode ? `<p class="auth-err" role="alert">${esc(errMsg(errCode))}</p>` : ""}
    <label class="fld">${_("البريد الإلكتروني", "Email")}<input type="email" id="le" dir="ltr" autocomplete="email" required></label>
    <label class="fld">${_("كلمة المرور", "Password")}<input type="password" id="lp" dir="ltr" autocomplete="current-password" required></label>
    <button class="btn primary block" type="submit" id="lb">${_("دخول", "Sign in")}</button>
    <a class="small muted center" href="/app">${_("العودة إلى التطبيق", "Back to the app")}</a></form>${authTools()}</div></div>`;
  bindAuthTools(() => loginView(errCode));
  const f = $("#lf"); $("#le").focus();
  f.addEventListener("submit", async e => {
    e.preventDefault(); const em = $("#le").value.trim(), pw = $("#lp").value;
    if (!em || !pw) { toast(_("أدخل البريد وكلمة المرور", "Enter your email and password"), "warn"); return; }
    $("#lb").classList.add("is-busy");
    try { await api("POST", "/api/login", { email: em, password: pw }); LOST = false; toast(_("مرحبًا بعودتك", "Welcome back"), "ok"); boot(); }
    catch (x) { loginView(x.code === "too-many-requests" || x.code === "network" ? x.code : "invalid-credential"); toast(_("تعذّر تسجيل الدخول", "Sign-in failed"), "err", errMsg(x.code === "too-many-requests" || x.code === "network" ? x.code : "invalid-credential")); }
  });
}
function notAdminView(u) {
  RT++; app.removeAttribute("aria-busy");
  app.innerHTML = `<div class="auth"><div><div class="auth-card">
    <span class="brand"><span class="logo">GAT</span><span><b>${_("أكاديمية القدرات", "GAT Academy")}</b><small>${_("لوحة التحكم", "Admin console")}</small></span></span>
    <h1>${_("هذا الحساب ليس مشرفًا", "This account isn't an admin")}</h1>
    <p class="small">${_("أنت مسجّل الدخول بالحساب التالي، لكنه لا يملك صلاحية لوحة التحكم:", "You're signed in as the account below, but it doesn't have admin access:")}</p>
    <div class="uid">${esc(u.email)}</div>
    <p class="small muted">${_("المشرفون تحددهم قيمة ADMIN_EMAILS في متغيرات الخدمة على Railway. يضيف المالك هذا البريد إليها، فتُعاد تهيئة الخدمة تلقائيًا، ثم حدّث الصفحة.", "Admins are listed in the ADMIN_EMAILS variable of the Railway service. The owner adds this email there, the service restarts, then reload this page.")}</p>
    <div class="row"><a class="btn primary sm" href="/app">${_("الذهاب إلى التطبيق", "Go to the app")}</a><button class="btn ghost sm" id="so" type="button">${_("تسجيل الخروج", "Sign out")}</button></div>
  </div>${authTools()}</div></div>`;
  bindAuthTools(() => notAdminView(u));
  $("#so").addEventListener("click", async () => { await api("POST", "/api/logout").catch(() => {}); ME = null; toast(_("تم تسجيل الخروج", "Signed out"), "info"); loginView(); });
}
function sessionLost() { if (LOST) return; LOST = true; ME = null; closeDrawer(true); loginView("unauthenticated"); }

/* ================= 1. overview ================= */
async function vOverview(tok) {
  const d = S.ovDays;
  const [o] = await Promise.all([api("GET", `/api/admin/overview?days=${d}`), getSettings().catch(() => null)]);
  if (!live(tok)) return;
  const T = o.totals;
  const kc = (cls, icon, label, val, sub, tip) => `<div class="kcard ${cls}" ${tip ? `tabindex="0" data-tip-h="${esc(label)}" data-tip="${esc(tip)}"` : ""}><span class="kl muted"><i>${ic(icon)}</i>${esc(label)}</span><b class="kv">${val}</b>${sub ? `<span class="ks">${sub}</span>` : ""}</div>`;
  const per = _(PERIODS.find(p => p[0] === d)[1], PERIODS.find(p => p[0] === d)[2]);
  const sig = bucket(seriesDays(o.series.signups, d), "sum"), act = bucket(seriesDays(o.series.active, d), "avg"), rev = bucket(seriesDays(o.series.revenue, d), "sum");
  const sum = a => a.reduce((s, p) => s + p.n, 0);
  const byPlan = (o.byPlan || []).map(p => ({ ...p, n: num(p.n), amount: num(p.amount) })).sort((a, b) => b.amount - a.amount || b.n - a.n);
  const anyAmt = byPlan.some(p => p.amount > 0), totAmt = byPlan.reduce((s, p) => s + p.amount, 0), totN = byPlan.reduce((s, p) => s + p.n, 0);
  MAIN.innerHTML = ph("لوحة التحكم", "Dashboard", "نظرة عامة", "Overview", "أرقام الطلاب والاشتراكات والإيرادات في لمحة.", "Students, subscriptions and revenue at a glance.", periodSeg("ov-p", d) + refreshBtn()) + `
  <section class="kgrid" aria-label="${_("المؤشرات الرئيسية", "Key metrics")}">
    ${kc("feat", "users", _("المستخدمون", "Users"), fmtN(T.users), _(`+${fmtN(T.new7)} خلال ٧ أيام`, `+${fmtN(T.new7)} in the last 7 days`))}
    ${kc("", "star", _("مشتركو برو", "Pro subscribers"), fmtN(T.pro), _("اشتراك ساري الآن", "active right now"))}
    ${kc("", "user", _("الخطة المجانية", "Free plan"), fmtN(T.free), _("بلا اشتراك ساري", "no active subscription"))}
    ${kc("pink", "percent", _("نسبة التحويل", "Conversion"), fmtPct(T.conversion), _("برو ÷ كل المستخدمين", "pro ÷ all users"), _("نسبة من لديهم اشتراك ساري من إجمالي المسجلين (بما فيها القسائم والمنح).", "Share of all users with an active subscription (incl. coupons and grants)."))}
    <div class="kcard sky"><span class="kl muted"><i>${ic("pulse")}</i>${_("المستخدمون النشطون", "Active users")}</span><div class="trio"><div tabindex="0" data-tip-h="DAU" data-tip="${_("فتحوا التطبيق اليوم", "Opened the app today")}"><b>${fmtN(T.dau)}</b><span>${_("اليوم", "Today")}</span></div><div tabindex="0" data-tip-h="WAU" data-tip="${_("آخر ٧ أيام", "Last 7 days")}"><b>${fmtN(T.wau)}</b><span>${_("أسبوعيًا", "Weekly")}</span></div><div tabindex="0" data-tip-h="MAU" data-tip="${_("آخر ٣٠ يومًا", "Last 30 days")}"><b>${fmtN(T.mau)}</b><span>${_("شهريًا", "Monthly")}</span></div></div><span class="ks">DAU · WAU · MAU</span></div>
    ${kc("butter", "coin", _("الإيراد", "Revenue") + " · " + per, fmtMoney(T.revenue), _("بعد خصم المبالغ المستردة", "net of refunds"))}
    ${kc("butter", "coin", _("إجمالي الإيراد", "Total revenue"), fmtMoney(T.revenueall ?? T.revenueAll), _("منذ الإطلاق", "since launch"))}
    ${kc("", "cart", _("الطلبات", "Orders") + " · " + per, fmtN(T.orders), _("دفعات مكتملة (تشمل قسائم ١٠٠٪)", "completed payments (incl. 100% coupons)"))}
    ${kc(T.expiring7 ? "pink" : "", "clock", _("تنتهي خلال ٧ أيام", "Expiring in 7 days"), fmtN(T.expiring7), _("اشتراكات تنتهي قريبًا", "subscriptions ending soon"))}
  </section>
  <section class="card"><div class="card-h"><h2>${_("التسجيلات اليومية", "Signups per day")}</h2><span class="sub">${d > 120 ? _("مجمّعة أسبوعيًا", "weekly totals") : _("لكل يوم", "per day")}</span></div>
    ${chartBox("signups", "", _("مخطط التسجيلات. استخدم الأسهم لقراءة القيم.", "Signups chart. Use arrow keys to read values."))}
    <div class="chart-foot"><span>${_("المجموع", "Total")}: <b>${fmtN(sum(sig))}</b></span>${dataTable(sig, v => fmtN(v))}</div></section>
  <div class="g2">
    <section class="card"><div class="card-h"><h2>${_("المستخدمون النشطون يوميًا", "Daily active users")}</h2><span class="sub">${d > 120 ? _("متوسط أسبوعي", "weekly average") : ""}</span></div>
      ${chartBox("active", "pink", _("مخطط النشاط اليومي. استخدم الأسهم لقراءة القيم.", "Daily active users chart. Use arrow keys to read values."))}
      <div class="chart-foot"><span>${_("المتوسط اليومي", "Daily average")}: <b>${fmtN(act.length ? sum(act) / act.length : 0, 1)}</b></span>${dataTable(act, v => fmtN(v, 1))}</div></section>
    <section class="card"><div class="card-h"><h2>${_("الإيراد اليومي", "Revenue per day")}</h2><span class="sub">${_("ر.س، صافي", "SAR, net")}</span></div>
      ${chartBox("revenue", "butter", _("مخطط الإيراد. استخدم الأسهم لقراءة القيم.", "Revenue chart. Use arrow keys to read values."))}
      <div class="chart-foot"><span>${_("المجموع", "Total")}: <b>${fmtMoney(sum(rev))}</b></span>${dataTable(rev, fmtMoney)}</div></section>
  </div>
  <section class="card"><div class="card-h"><h2>${_("توزيع الإيراد حسب الباقة", "Revenue by plan")}</h2><span class="sub">${_("كل الفترات · الدفعات المكتملة", "all time · completed payments")}</span></div>
    ${byPlan.length ? hbars(byPlan.map(p => ({ label: planName(p.plan_id), sub: p.plan_id, v: anyAmt ? p.amount : p.n, vlabel: fmtMoney(p.amount), vsub: _(`${fmtN(p.n)} طلب`, `${fmtN(p.n)} orders`), tipH: planName(p.plan_id), tip: `${fmtMoney(p.amount)} · ${fmtN(p.n)} ${_("طلب", "orders")} · ${fmtPct(anyAmt ? p.amount / (totAmt || 1) : p.n / (totN || 1))}` })), { cls: "butter" }) : `<p class="empty">${_("لا مدفوعات بعد.", "No payments yet.")}</p>`}
  </section>`;
  onSeg("ov-p", v => { S.ovDays = +v; LS.set("adm_ovDays", S.ovDays); route(); });
  onRefresh(route);
  drawChart("signups", { pts: sig, type: d > 30 ? "line" : "bar", int: true, fmt: v => fmtN(v) + " " + _("تسجيل", "signups"), axFmt: v => fmtN(v) });
  drawChart("active", { pts: act, type: "line", int: d <= 120, fmt: v => fmtN(v, 1) + " " + _("نشط", "active"), axFmt: v => fmtN(v, 1) });
  drawChart("revenue", { pts: rev, type: "bar", fmt: fmtMoney, axFmt: v => fmtN(v), empty: _("لا إيراد في هذه الفترة", "No revenue in this period") });
}

/* ================= 2. funnel ================= */
const STEPS = [["signed_up", "سجّلوا حسابًا", "Signed up"], ["diagnostic", "أنهوا الاختبار التشخيصي", "Took the diagnostic"], ["explainer", "أنهوا شرحًا تفاعليًا", "Finished an explainer"], ["hit_limit", "بلغوا حدًا مجانيًا", "Hit a free limit"], ["saw_plans", "شاهدوا الباقات", "Saw the plans"], ["checkout", "بدأوا الدفع", "Started checkout"], ["paid", "اشتركوا (دفع أو قسيمة)", "Paid (or coupon)"]];
async function vFunnel(tok) {
  const d = S.fnDays, f = await api("GET", `/api/admin/funnel?days=${d}`); if (!live(tok)) return;
  const st = f.steps || {}, first = num(st.signed_up);
  const rows = STEPS.map(([k, a, e], i) => {
    const n = num(st[k]), prev = i ? num(st[STEPS[i - 1][0]]) : n, w = first ? Math.max(.6, 100 * n / first) : 0;
    const stepPct = i ? (prev ? n / prev : null) : 1, lost = i ? prev - n : 0;
    return `<div class="fun-row" tabindex="0" data-tip-h="${esc(_(a, e))}" data-tip="${esc(`${fmtN(n)} ${_("طالب", "students")} · ${fmtPct(first ? n / first : 0)} ${_("من المسجلين", "of signups")}${i ? ` · ${stepPct == null ? "—" : fmtPct(stepPct)} ${_("من الخطوة السابقة", "of previous step")}` : ""}`)}">
      <span class="lb"><i aria-hidden="true">${fmtN(i + 1)}</i>${esc(_(a, e))}</span>
      <span class="fun-bar"><span style="inline-size:${w.toFixed(1)}%" aria-hidden="true"></span><em>${fmtN(n)}</em></span>
      <span class="st">${i ? `<b>${stepPct == null ? "—" : fmtPct(stepPct)}</b><span>${_("من السابقة", "from previous")}</span>${lost > 0 ? `<span class="fun-drop">−${fmtN(lost)}</span>` : ""}` : `<b>${fmtPct(1)}</b><span>${_("نقطة البداية", "baseline")}</span>`}</span></div>`;
  }).join("");
  const lim = (f.limits || []).map(l => ({ ...l, n: num(l.n), users: num(l.users) })), limTot = lim.reduce((s, l) => s + l.n, 0);
  MAIN.innerHTML = ph("التحويل", "Conversion", "مسار التحويل", "Conversion funnel", "رحلة الطالب من التسجيل إلى الاشتراك، لمن سجّلوا خلال الفترة المختارة.", "The student journey from signup to subscription, for users who signed up in the chosen period.", periodSeg("fn-p", d) + refreshBtn()) + `
  <section class="card"><div class="card-h"><h2>${_("خطوات المسار", "Funnel steps")}</h2><span class="sub">${_("عدد الطلاب المختلفين في كل خطوة", "distinct students at each step")}</span></div>
    ${first ? `<div class="fun">${rows}</div>` : `<p class="empty">${_("لا تسجيلات في هذه الفترة.", "No signups in this period.")}</p>`}
    ${num(st.checkout) < num(st.paid) ? `<p class="small muted">${ic("info", "i16")} ${_("التفعيل بقسيمة ١٠٠٪ لا يمر بصفحة الدفع، لذلك قد يزيد عدد المشتركين على من بدأوا الدفع.", "100% coupon activations skip the payment page, so subscribers can exceed checkouts.")}</p>` : ""}
  </section>
  <div class="g3">
    <section class="card"><div class="card-h"><h2>${_("أكثر الحدود المجانية بلوغًا", "Free limits hit most")}</h2><span class="sub">${_("أين يشعر الطلاب بحدود الخطة المجانية", "where students feel the free plan's limits")}</span></div>
      ${lim.length ? `<div class="tbl"><table><thead><tr><th scope="col">${_("الحد", "Limit")}</th><th scope="col" class="num">${_("مرات البلوغ", "Hits")}</th><th scope="col" class="num">${_("الطلاب", "Students")}</th><th scope="col" class="hide-sm">${_("الحصة", "Share")}</th></tr></thead><tbody>
      ${lim.map(l => `<tr><td><b>${esc(limitL(l.k))}</b> <span class="mono muted">${esc(l.k || "")}</span></td><td class="num">${fmtN(l.n)}</td><td class="num">${fmtN(l.users)}</td><td class="hide-sm"><span class="nowrap">${fmtPct(limTot ? l.n / limTot : 0, 0)}<span class="mini"><span style="inline-size:${(limTot ? 100 * l.n / limTot : 0).toFixed(1)}%"></span></span></span></td></tr>`).join("")}
      </tbody></table></div>` : `<p class="empty">${_("لم يبلغ أي طالب حدًا مجانيًا بعد.", "No student has hit a free limit yet.")}</p>`}</section>
    <section class="card"><div class="card-h"><h2>${_("قراءة سريعة", "Quick read")}</h2></div>
      ${hbars([["diagnostic", "signed_up"], ["explainer", "diagnostic"], ["saw_plans", "hit_limit"], ["paid", "saw_plans"]].map(([a, b]) => { const A = num(st[a]), B = num(st[b]), r = B ? A / B : 0; const la = STEPS.find(s => s[0] === a), lb = STEPS.find(s => s[0] === b); return { label: _(la[1], la[2]), sub: _("من: ", "of: ") + _(lb[1], lb[2]), v: Math.min(1, r), vlabel: B ? fmtPct(r, 0) : "—", tip: `${fmtN(A)} / ${fmtN(B)}` }; }), { max: 1, cls: "pink" })}
    </section>
  </div>`;
  onSeg("fn-p", v => { S.fnDays = +v; LS.set("adm_fnDays", S.fnDays); route(); });
  onRefresh(route);
}

/* ================= 3. students ================= */
async function vStudents(tok) {
  const st = S.st;
  MAIN.innerHTML = ph("الطلاب", "Students", "الطلاب", "Students", "ابحث وصفِّ وافتح ملف أي طالب لإدارة اشتراكه وحسابه.", "Search, filter and open any student to manage their plan and account.",
    `<a class="btn ghost sm" href="/api/admin/users.csv" download id="b-csv">${ic("download")}${_("تصدير CSV", "Export CSV")}</a>` + refreshBtn()) + `
  <section class="card">
    <div class="toolbar">
      <label class="search"><span class="sr">${_("بحث", "Search")}</span>${ic("search")}<input type="search" id="st-q" value="${esc(st.q)}" placeholder="${_("ابحث بالاسم أو البريد", "Search by name or email")}" dir="auto" autocomplete="off"></label>
      <div class="seg" role="group" aria-label="${_("الخطة", "Plan")}" id="st-plan">${[["", "الكل", "All"], ["free", "مجاني", "Free"], ["pro", "برو", "Pro"]].map(([v, a, e]) => `<button type="button" data-v="${v}" class="${st.plan === v ? "on" : ""}" aria-pressed="${st.plan === v}">${_(a, e)}</button>`).join("")}</div>
      <label class="nowrap small"><span class="sr">${_("ترتيب", "Sort")}</span><select id="st-sort">${[["active", "الأحدث نشاطًا", "Most recently active"], ["new", "الأحدث تسجيلًا", "Newest signups"], ["name", "الاسم", "Name"], ["ends", "الأقرب انتهاءً", "Ending soonest"]].map(([v, a, e]) => `<option value="${v}" ${st.sort === v ? "selected" : ""}>${_(a, e)}</option>`).join("")}</select></label>
    </div>
    <div id="st-list"><div class="skel" style="min-block-size:300px"></div></div>
  </section>`;
  let qt; $("#st-q").addEventListener("input", e => { clearTimeout(qt); qt = setTimeout(() => { st.q = e.target.value.trim(); st.page = 0; loadStudents(); }, 300); });
  onSeg("st-plan", v => { st.plan = v; st.page = 0; $$("#st-plan button").forEach(b => { b.classList.toggle("on", b.dataset.v === v); b.setAttribute("aria-pressed", b.dataset.v === v); }); loadStudents(); });
  $("#st-sort").addEventListener("change", e => { st.sort = e.target.value; st.page = 0; loadStudents(); });
  $("#b-csv").addEventListener("click", () => toast(_("بدأ تنزيل ملف الطلاب", "Student export started"), "ok", _("الملف بترميز UTF-8 ويفتح في Excel.", "UTF-8 file that opens in Excel.")));
  onRefresh(loadStudents);
  await loadStudents(tok);
}
let stReq = 0;
async function loadStudents() {
  const st = S.st, my = ++stReq, box = $("#st-list"); if (!box) return;
  box.setAttribute("aria-busy", "true");
  let r;
  try { r = await api("GET", `/api/admin/users?q=${encodeURIComponent(st.q)}&plan=${st.plan}&sort=${st.sort}&page=${st.page}&size=${st.size}`); }
  catch (e) { if (my !== stReq) return; box.innerHTML = `<p class="empty">${esc(errMsg(e.code))}</p>`; fail(e, _("تعذّر تحميل الطلاب", "Couldn't load students")); return; }
  if (my !== stReq || !$("#st-list")) return;
  box.removeAttribute("aria-busy");
  r.users.forEach(u => USERS_BY_ID.set(u.id, u.email));
  const from = r.total ? r.page * r.size + 1 : 0, to = Math.min(r.total, (r.page + 1) * r.size), pages = Math.max(1, Math.ceil(r.total / r.size));
  const sortTh = (key, a, e, cls = "") => `<th scope="col" class="sortable ${cls}" tabindex="0" data-sort="${key}" aria-sort="${st.sort === key ? (key === "ends" || key === "name" ? "ascending" : "descending") : "none"}">${_(a, e)}<span class="ar-i" aria-hidden="true">${st.sort === key ? (key === "ends" || key === "name" ? "▴" : "▾") : "↕"}</span></th>`;
  box.innerHTML = r.users.length ? `<div class="tbl"><table><thead><tr>${sortTh("name", "الطالب", "Student")}${sortTh("ends", "الخطة", "Plan")}<th scope="col" class="hide-sm">${_("المسار", "Track")}</th><th scope="col" class="num hide-sm">${_("التقديرية", "Est.")}</th><th scope="col" class="num hide-md">${_("الجاهزية", "Readiness")}</th><th scope="col" class="num hide-sm">${_("الدقة", "Accuracy")}</th><th scope="col" class="num hide-md">${_("الأسئلة", "Solved")}</th>${sortTh("active", "آخر نشاط", "Last active", "hide-sm")}${sortTh("new", "التسجيل", "Joined", "hide-md")}</tr></thead><tbody>
    ${r.users.map(u => { const s = u.summary || {}; return `<tr class="click" data-id="${esc(u.id)}">
      <td><div class="who"><button type="button" class="btn link" data-open="${esc(u.id)}">${esc(u.name || _("بلا اسم", "No name"))}</button><small>${esc(u.email)}</small></div></td>
      <td>${planChip(u)}</td>
      <td class="hide-sm">${u.track ? (u.track === "lit" ? _("نظري", "Literary") : _("علمي", "Scientific")) : "—"}</td>
      <td class="num hide-sm">${s.est != null ? fmtN(s.est) : "—"}</td>
      <td class="num hide-md">${s.readiness != null ? fmtN(s.readiness) + (LANG === "ar" ? "٪" : "%") : "—"}</td>
      <td class="num hide-sm">${s.acc != null ? fmtN(s.acc) + (LANG === "ar" ? "٪" : "%") : "—"}</td>
      <td class="num hide-md">${s.solved != null ? fmtN(s.solved) : "—"}</td>
      <td class="hide-sm">${s.lastActive ? esc(fmtDate(s.lastActive)) : u.updated_at ? esc(rel(u.updated_at)) : "—"}</td>
      <td class="hide-md">${esc(fmtDate(u.created_at))}</td></tr>`; }).join("")}
  </tbody></table></div>
  <div class="pager"><span>${_(`${fmtN(from)}–${fmtN(to)} من ${fmtN(r.total)} طالب`, `${fmtN(from)}–${fmtN(to)} of ${fmtN(r.total)} students`)}</span>
    <div class="row"><button class="btn ghost sm" type="button" id="pg-prev" ${r.page <= 0 ? "disabled" : ""}>${_("السابق", "Previous")}</button><span class="nowrap" style="align-self:center">${_(`صفحة ${fmtN(r.page + 1)} من ${fmtN(pages)}`, `Page ${fmtN(r.page + 1)} of ${fmtN(pages)}`)}</span><button class="btn ghost sm" type="button" id="pg-next" ${r.page + 1 >= pages ? "disabled" : ""}>${_("التالي", "Next")}</button></div></div>`
    : `<p class="tbl-empty">${st.q || st.plan ? _("لا نتائج مطابقة. جرّب بحثًا آخر.", "No matches. Try another search.") : _("لا يوجد طلاب بعد.", "No students yet.")}</p>`;
  const tb = $("tbody", box);
  if (tb) tb.addEventListener("click", e => { const tr = e.target.closest("tr[data-id]"); if (tr) openStudent(tr.dataset.id, tr.querySelector("[data-open]")); });
  $$("th[data-sort]", box).forEach(th => { const go = () => { st.sort = th.dataset.sort; st.page = 0; const s = $("#st-sort"); if (s) s.value = st.sort; loadStudents(); }; th.addEventListener("click", go); th.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } }); });
  const pp = $("#pg-prev"), pn = $("#pg-next");
  if (pp) pp.addEventListener("click", () => { st.page--; loadStudents(); });
  if (pn) pn.addEventListener("click", () => { st.page++; loadStudents(); });
}
function planChip(u) {
  if (u.isAdmin) return `<span class="chip admin">${_("مشرف", "Admin")}</span>`;
  if (u.pro_until) return `<span class="chip pro" data-tip-h="${esc(_("برو", "Pro"))}" data-tip="${esc(srcL(u.pro_source) + " · " + _("حتى ", "until ") + fmtDate(u.pro_until))}" tabindex="0">${_("برو", "Pro")} · ${esc(fmtDay(u.pro_until))}</span>`;
  return `<span class="chip free">${_("مجاني", "Free")}</span>`;
}

/* ---------- student drawer ---------- */
const DR = { id: null, data: null, temp: null, revokeAsk: false, del: "", days: 30, note: "", ret: null };
function closeDrawer(silent) {
  const r = $("#drawer-root"); if (!r) return; r.remove(); document.removeEventListener("keydown", drKey); hideTip();
  if (!silent && DR.ret && document.contains(DR.ret)) DR.ret.focus(); DR.id = null; DR.data = null;
}
function drKey(e) {
  if (e.key === "Escape" && !$("dialog[open]")) { e.preventDefault(); closeDrawer(); return; }
  if (e.key === "Tab") { const d = $(".drawer"); if (!d) return; const f = $$('button:not([disabled]),a[href],input:not([disabled]),select,textarea,[tabindex="0"]', d).filter(x => x.offsetParent); if (!f.length) return; if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); } }
}
async function openStudent(id, ret) {
  closeDrawer(true);
  Object.assign(DR, { id, data: null, temp: null, revokeAsk: false, del: "", days: 30, note: "", ret: ret || document.activeElement });
  const root = document.createElement("div"); root.id = "drawer-root";
  root.innerHTML = `<div class="dr-bg" data-close></div><section class="drawer" role="dialog" aria-modal="true" aria-labelledby="dr-t"><header class="dr-h"><span class="av" aria-hidden="true">…</span><div class="tt"><b id="dr-t">${_("جارٍ التحميل…", "Loading…")}</b></div><button class="btn ghost sm icon" type="button" data-close aria-label="${_("إغلاق", "Close")}">${ic("x")}</button></header><div class="dr-b"><div class="skel" style="min-block-size:120px"></div><div class="skel" style="min-block-size:220px"></div></div></section>`;
  document.body.appendChild(root);
  root.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeDrawer(); });
  document.addEventListener("keydown", drKey);
  $(".dr-h [data-close]", root).focus();
  await loadDrawer();
}
async function loadDrawer() {
  const id = DR.id;
  try { const d = await api("GET", `/api/admin/users/${encodeURIComponent(id)}`); if (DR.id !== id) return; DR.data = d; renderDrawer(); }
  catch (e) { if (DR.id !== id) return; const b = $(".dr-b"); if (b) b.innerHTML = `<div class="alert err" role="alert">${ic("alert")}<div><b>${_("تعذّر تحميل ملف الطالب", "Couldn't load this student")}</b>${esc(errMsg(e.code))}</div></div>`; fail(e, _("تعذّر تحميل ملف الطالب", "Couldn't load this student")); }
}
function subStatus(s) {
  const now = Date.now();
  if (s.revoked_at) return ["revoked", _("ملغى", "Revoked")];
  if (new Date(s.ends_at) <= now) return ["ended", _("منتهٍ", "Ended")];
  if (new Date(s.starts_at) > now) return ["on", _("مجدول", "Scheduled")];
  return ["pro", _("ساري", "Active")];
}
function renderDrawer() {
  const d = DR.data, u = d.user, s = u.summary || {}, p = d.plan || {}, self = u.email === ME.email;
  const dr = $(".drawer"); if (!dr) return;
  const scrollY = $(".dr-b", dr) ? $(".dr-b", dr).scrollTop : 0;
  const pctS = LANG === "ar" ? "٪" : "%";
  const facts = [[_("التسجيل", "Joined"), fmtDate(u.created_at)], [_("آخر مزامنة", "Last sync"), u.updated_at ? rel(u.updated_at) : "—"], [_("المسار", "Track"), u.track ? (u.track === "lit" ? _("نظري", "Literary") : _("علمي", "Scientific")) : "—"], [_("الهدف", "Target"), u.target != null ? fmtN(u.target) : "—"], [_("موعد الاختبار", "Exam date"), u.exam_date ? fmtDate(u.exam_date) : "—"], [_("الدرجة التقديرية", "Est. score"), s.est != null ? fmtN(s.est) : "—"], [_("الجاهزية", "Readiness"), s.readiness != null ? fmtN(s.readiness) + pctS : "—"], [_("الأسئلة المحلولة", "Solved"), s.solved != null ? fmtN(s.solved) : "—"], [_("الدقة", "Accuracy"), s.acc != null ? fmtN(s.acc) + pctS : "—"], [_("النماذج", "Model tests"), s.models != null ? fmtN(s.models) + "/" + fmtN(30) : "—"], [_("السلسلة", "Streak"), s.streak != null ? fmtN(s.streak) : "—"]];
  // skills + diagnostic baseline
  const diagAtt = (d.attempts || []).slice().reverse().find(a => a.kind === "diag");
  const diag = d.diag && typeof d.diag === "object" ? d.diag : null;
  const dSk = diag && (diag.skills || diag.bySkill) || null;
  const skillRows = SKILL_ORDER.filter(k => d.skills && d.skills[k]).concat(Object.keys(d.skills || {}).filter(k => !SKILLS[k])).map(k => {
    const x = d.skills[k], t = num(x.t), c = num(x.c), acc = t ? c / t : 0, base = dSk && dSk[k] && num(dSk[k].t) ? num(dSk[k].c) / num(dSk[k].t) : null;
    return { label: sk(k), v: acc, mark: base, vlabel: fmtPct(acc, 0), vsub: `${fmtN(c)}/${fmtN(t)}`, tipH: sk(k), tip: `${_("الدقة", "Accuracy")} ${fmtPct(acc, 0)} · ${fmtN(t)} ${_("سؤال", "questions")} · ${_("متوسط الوقت", "avg time")} ${fmtDur(t ? num(x.time) / t : 0)}${base != null ? ` · ${_("التشخيصي", "diagnostic")} ${fmtPct(base, 0)}` : ""}` };
  });
  const diagPct = diag ? (diag.pct != null ? num(diag.pct) / 100 : diag.score != null ? num(diag.score) / 100 : null) : diagAtt ? num(diagAtt.pct) / 100 : null;
  const diagEst = diag && diag.est != null ? diag.est : diagAtt ? diagAtt.est : null, diagDate = diag && (diag.date || diag.at) || (diagAtt && diagAtt.date);
  const xp = Object.entries(d.xp || {}).sort((a, b) => String(b[1].date || "").localeCompare(String(a[1].date || "")));
  const subs = d.subscriptions || [], pays = d.payments || [], evs = d.events || [];
  const isPro = p.tier === "pro";
  dr.innerHTML = `<header class="dr-h"><span class="av" aria-hidden="true">${esc((u.name || u.email).trim().charAt(0).toUpperCase())}</span>
    <div class="tt"><b id="dr-t">${esc(u.name || _("بلا اسم", "No name"))}</b><small>${esc(u.email)}</small></div>
    ${u.isAdmin ? `<span class="chip admin">${_("مشرف", "Admin")}</span>` : isPro ? `<span class="chip pro">${_("برو", "Pro")}</span>` : `<span class="chip free">${_("مجاني", "Free")}</span>`}
    <button class="btn ghost sm icon" type="button" data-close aria-label="${_("إغلاق", "Close")}">${ic("x")}</button></header>
  <div class="dr-b">
    <div class="facts">${facts.map(([k, v]) => `<div><span>${esc(k)}</span><b>${esc(v)}</b></div>`).join("")}</div>

    <section class="card"><div class="card-h"><h2>${_("الخطة والوصول", "Plan & access")}</h2>${isPro ? `<span class="chip pro">${esc(srcL(p.source))}</span>` : ""}</div>
      <p>${u.isAdmin ? _("حسابات المشرفين تملك وصول برو دائمًا.", "Admin accounts always have pro access.") : isPro ? _(`مشترك برو حتى <b>${esc(fmtDate(p.until))}</b>.`, `Pro until <b>${esc(fmtDate(p.until))}</b>.`) : _("على الخطة المجانية.", "On the free plan.")}</p>
      <form id="f-grant" class="fgrid" novalidate>
        <div class="fld"><span>${_("منح أيام برو", "Grant pro days")}</span><div class="quick" role="group" aria-label="${_("اختيار سريع", "Quick pick")}">${[7, 30, 90].map(n => `<button type="button" class="btn ghost xs ${DR.days === n ? "on" : ""}" data-days="${n}" aria-pressed="${DR.days === n}">${_(`${fmtN(n)} يومًا`, `${n} days`)}</button>`).join("")}</div></div>
        <label class="fld">${_("عدد الأيام", "Days")}<input type="number" id="g-days" min="1" max="1000" step="1" value="${DR.days}" required></label>
        <label class="fld wide">${_("ملاحظة (تظهر في السجل)", "Note (shown in the log)")}<input type="text" id="g-note" maxlength="200" value="${esc(DR.note)}" placeholder="${_("مثال: تعويض عن عطل", "e.g. compensation for an outage")}"></label>
        <div class="row wide" style="grid-column:1/-1"><button class="btn primary sm" type="submit">${ic("gift")}${_("منح", "Grant")}</button>
        ${isPro && p.source !== "admin" ? (DR.revokeAsk ? `<span class="small" style="align-self:center">${_("إلغاء كل الاشتراكات السارية لهذا الطالب؟", "Revoke all active subscriptions for this student?")}</span><button class="btn danger sm" type="button" id="b-revoke-y">${_("نعم، ألغِ", "Yes, revoke")}</button><button class="btn ghost sm" type="button" id="b-revoke-n">${_("تراجع", "Cancel")}</button>` : `<button class="btn danger-ghost sm" type="button" id="b-revoke">${ic("ban")}${_("إلغاء الاشتراك", "Revoke")}</button>`) : ""}</div>
      </form></section>

    <section class="card"><div class="card-h"><h2>${_("الحساب", "Account")}</h2></div>
      <form id="f-name" class="row" novalidate><label class="fld" style="flex:1;min-width:200px"><span>${_("الاسم", "Name")}</span><input type="text" id="n-name" value="${esc(u.name || "")}" minlength="2" maxlength="60" dir="auto"></label><button class="btn ghost sm" type="submit" style="align-self:flex-end">${ic("edit")}${_("حفظ الاسم", "Save name")}</button></form>
      <div class="row"><button class="btn ghost sm" type="button" id="b-reset" ${self ? "disabled" : ""}>${ic("key")}${_("كلمة مرور مؤقتة", "Reset password")}</button>${self ? `<span class="small muted" style="align-self:center">${_("لا يمكن تنفيذ ذلك على حسابك.", "Not available for your own account.")}</span>` : ""}</div>
      ${DR.temp ? `<div class="temp" role="status"><code id="tmp-pw">${esc(DR.temp.tempPassword)}</code><button class="btn primary sm" type="button" id="b-copy">${ic("copy")}${_("نسخ", "Copy")}</button><p class="small" style="flex-basis:100%">${_("أرسلها للطالب؛ سُجّل خروجه من كل الأجهزة، ويغيّرها من نافذة الحساب بعد الدخول. لن تظهر مرة أخرى.", "Send it to the student. They were signed out everywhere and can change it from the account window. It won't be shown again.")}</p></div>` : ""}
    </section>

    <section class="card"><div class="card-h"><h2>${_("الدقة حسب المهارة", "Accuracy by skill")}</h2>${skillRows.some(r => r.mark != null) ? `<span class="sub">┃ ${_("خط التشخيصي", "diagnostic baseline")}</span>` : ""}</div>
      ${skillRows.length ? hbars(skillRows, { max: 1 }) : `<p class="empty">${_("لم يحل أسئلة بعد.", "No questions solved yet.")}</p>`}</section>

    <div class="g2">
      <section class="card"><div class="card-h"><h2>${_("خط الأساس التشخيصي", "Diagnostic baseline")}</h2></div>
        ${diagPct != null || diagEst != null ? `<div class="facts"><div><span>${_("النتيجة", "Score")}</span><b>${diagPct != null ? fmtPct(diagPct, 0) : "—"}</b></div><div><span>${_("التقديرية", "Est.")}</span><b>${diagEst != null ? fmtN(diagEst) : "—"}</b></div><div><span>${_("التاريخ", "Date")}</span><b>${esc(diagDate ? fmtDate(diagDate) : "—")}</b></div></div>` : `<p class="empty">${_("لم يُجرِ الاختبار التشخيصي بعد.", "Hasn't taken the diagnostic yet.")}</p>`}</section>
      <section class="card"><div class="card-h"><h2>${_("الشروحات المنجزة", "Explainers done")}</h2><span class="chip">${fmtN(xp.length)}</span></div>
        ${xp.length ? `<div class="chips">${xp.map(([k, v]) => `<span class="chip ${xpInfo(k).lang === "en" ? "sky" : ""}" tabindex="0" data-tip-h="${esc(k)}" data-tip="${esc(sk(xpInfo(k).skill) + " · " + _("النتيجة", "score") + " " + fmtN(v.score) + "/" + fmtN(v.n) + (v.date ? " · " + fmtDate(v.date) : ""))}"><span class="mono">${esc(k)}</span>&nbsp;${fmtN(v.score)}/${fmtN(v.n)}</span>`).join("")}</div>` : `<p class="empty">${_("لم ينهِ أي شرح بعد.", "No explainers finished yet.")}</p>`}</section>
    </div>

    <section class="card"><div class="card-h"><h2>${_("آخر المحاولات", "Recent attempts")}</h2></div>
      ${(d.attempts || []).length ? `<div class="tbl"><table><thead><tr><th scope="col">${_("التاريخ", "Date")}</th><th scope="col">${_("النوع", "Type")}</th><th scope="col" class="num">${_("النتيجة", "Score")}</th><th scope="col" class="num hide-sm">${_("التقديرية", "Est.")}</th><th scope="col" class="num hide-sm">${_("المدة", "Time")}</th></tr></thead><tbody>
      ${d.attempts.slice(0, 12).map(a => `<tr><td>${esc(fmtDate(a.date))}</td><td>${esc(kindL(a.kind))}${a.mk ? " " + fmtN(a.mk) : ""}${a.skill ? ` <span class="muted small">· ${esc(sk(a.skill))}</span>` : ""}</td><td class="num">${fmtN(a.correct)}/${fmtN(a.total)} <span class="muted">(${fmtN(a.pct)}${pctS})</span></td><td class="num hide-sm">${a.est != null ? fmtN(a.est) : "—"}</td><td class="num hide-sm">${fmtDur(a.time)}</td></tr>`).join("")}</tbody></table></div>` : `<p class="empty">${_("لا محاولات بعد.", "No attempts yet.")}</p>`}</section>

    <section class="card"><div class="card-h"><h2>${_("الاشتراكات", "Subscriptions")}</h2></div>
      ${subs.length ? `<div class="tbl"><table><thead><tr><th scope="col">${_("المصدر", "Source")}</th><th scope="col">${_("الباقة", "Plan")}</th><th scope="col">${_("من", "From")}</th><th scope="col">${_("إلى", "To")}</th><th scope="col">${_("الحالة", "Status")}</th><th scope="col">${_("ملاحظة", "Note")}</th></tr></thead><tbody>
      ${subs.map(x => { const [c, l] = subStatus(x); return `<tr><td>${esc(srcL(x.source))}</td><td>${esc(x.plan_id ? planName(x.plan_id) : "—")}</td><td>${esc(fmtDate(x.starts_at))}</td><td>${esc(fmtDate(x.ends_at))}</td><td><span class="chip ${c}">${esc(l)}</span></td><td class="wrap small">${esc(x.note || "")}${x.created_by ? ` <span class="muted ltr">${esc(x.created_by)}</span>` : ""}</td></tr>`; }).join("")}</tbody></table></div>` : `<p class="empty">${_("لا اشتراكات.", "No subscriptions.")}</p>`}</section>

    <section class="card"><div class="card-h"><h2>${_("المدفوعات", "Payments")}</h2></div>
      ${pays.length ? `<div class="tbl"><table><thead><tr><th scope="col">${_("التاريخ", "Date")}</th><th scope="col">${_("الباقة", "Plan")}</th><th scope="col" class="num">${_("المبلغ", "Amount")}</th><th scope="col">${_("القسيمة", "Coupon")}</th><th scope="col">${_("الحالة", "Status")}</th></tr></thead><tbody>
      ${pays.map(x => `<tr><td>${esc(fmtDate(x.created_at))}</td><td>${esc(planName(x.plan_id))}</td><td class="num">${fmtMoney(x.amount)}${num(x.refunded_amount) ? `<br><small class="muted">−${fmtMoney(x.refunded_amount)}</small>` : ""}</td><td class="mono">${esc(x.coupon || "—")}</td><td><span class="chip ${esc(x.status)}">${esc(pstatL(x.status))}</span></td></tr>`).join("")}</tbody></table></div>` : `<p class="empty">${_("لا مدفوعات.", "No payments.")}</p>`}</section>

    <section class="card"><div class="card-h"><h2>${_("آخر الأحداث", "Recent events")}</h2><span class="sub">${fmtN(evs.length)}</span></div>
      ${evs.length ? `<ul class="plain evl">${evs.slice(0, 40).map(e => { const L = EVENTS[e.type] || [e.type, e.type, ""]; const extra = e.type === "limit_hit" ? limitL(e.k) : (e.type === "test_done" || e.type === "test_start") ? kindL(e.k) : e.k || ""; const v = e.v != null ? (e.type === "xp_done" ? fmtN(e.v, 1) : fmtN(e.v, 1) + (["diag_done", "test_done"].includes(e.type) ? (LANG === "ar" ? "٪" : "%") : "")) : ""; return `<li><span class="ic ${L[2]}" aria-hidden="true"></span><span>${esc(_(L[0], L[1]))}${extra ? ` · <span class="${e.type.startsWith("xp") ? "mono" : ""}">${esc(extra)}</span>` : ""}${v ? ` · <b>${esc(v)}</b>` : ""}</span><time datetime="${esc(e.at)}" title="${esc(fmtDT(e.at))}">${esc(rel(e.at))}</time></li>`; }).join("")}</ul>` : `<p class="empty">${_("لا أحداث مسجلة.", "No events recorded.")}</p>`}</section>

    <section class="card dz"><div class="card-h"><h3>${_("حذف الحساب", "Delete account")}</h3></div>
      ${self ? `<p class="small">${_("لا يمكنك حذف حسابك من هنا.", "You can't delete your own account here.")}</p>` : `<p class="small">${_("يُحذف الحساب وكل تقدمه واشتراكاته نهائيًا ولا يمكن التراجع. للتأكيد اكتب البريد:", "The account, its progress and subscriptions are deleted permanently. To confirm, type the email:")} <b class="ltr">${esc(u.email)}</b></p>
      <form id="f-del" class="row" novalidate><input type="text" id="del-in" dir="ltr" autocomplete="off" spellcheck="false" style="flex:1;min-width:200px" value="${esc(DR.del)}" aria-label="${_("اكتب البريد للتأكيد", "Type the email to confirm")}"><button class="btn danger sm" type="submit" id="b-del" ${DR.del.trim().toLowerCase() === u.email.toLowerCase() ? "" : "disabled"}>${ic("trash")}${_("حذف نهائي", "Delete permanently")}</button></form>`}
    </section>
  </div>`;
  $(".dr-b", dr).scrollTop = scrollY;
  // bindings
  $$("[data-days]", dr).forEach(b => b.addEventListener("click", () => { DR.days = +b.dataset.days; $("#g-days").value = DR.days; $$("[data-days]", dr).forEach(x => { x.classList.toggle("on", x === b); x.setAttribute("aria-pressed", x === b); }); }));
  $("#g-days").addEventListener("input", e => { DR.days = Math.round(num(e.target.value)); $$("[data-days]", dr).forEach(x => { x.classList.toggle("on", +x.dataset.days === DR.days); x.setAttribute("aria-pressed", +x.dataset.days === DR.days); }); });
  $("#g-note").addEventListener("input", e => { DR.note = e.target.value; });
  $("#f-grant").addEventListener("submit", async e => {
    e.preventDefault(); const days = Math.round(num($("#g-days").value));
    if (!(days >= 1 && days <= 1000)) { $("#g-days").classList.add("invalid"); toast(_("تحقق من عدد الأيام", "Check the number of days"), "err", errMsg("bad-days")); return; }
    const btn = e.submitter || $("#f-grant button[type=submit]"); btn.classList.add("is-busy");
    try { const r = await api("POST", `/api/admin/users/${encodeURIComponent(u.id)}/grant`, { days, note: DR.note.trim() }); DR.note = ""; toast(_(`تم منح ${fmtN(days)} يومًا`, `Granted ${days} days`), "ok", _("ينتهي في ", "Now ends ") + fmtDate(r.until)); await loadDrawer(); loadStudents(); }
    catch (x) { fail(x, _("تعذّر المنح", "Couldn't grant")); } finally { btn.classList.remove("is-busy"); }
  });
  const rv = $("#b-revoke"); if (rv) rv.addEventListener("click", () => { DR.revokeAsk = true; renderDrawer(); $("#b-revoke-n").focus(); });
  const rn = $("#b-revoke-n"); if (rn) rn.addEventListener("click", () => { DR.revokeAsk = false; renderDrawer(); });
  const ry = $("#b-revoke-y"); if (ry) ry.addEventListener("click", async () => {
    ry.classList.add("is-busy");
    try { const r = await api("POST", `/api/admin/users/${encodeURIComponent(u.id)}/revoke`); DR.revokeAsk = false; toast(_("تم إلغاء الاشتراك", "Subscription revoked"), "ok", _(`أُلغي ${fmtN(r.revoked)} اشتراك`, `${r.revoked} subscription(s) revoked`)); await loadDrawer(); loadStudents(); }
    catch (x) { fail(x, _("تعذّر الإلغاء", "Couldn't revoke")); ry.classList.remove("is-busy"); }
  });
  $("#f-name").addEventListener("submit", async e => {
    e.preventDefault(); const name = $("#n-name").value.trim();
    if (name.length < 2 || name.length > 60) { $("#n-name").classList.add("invalid"); toast(_("تحقق من الاسم", "Check the name"), "err", errMsg("invalid-name")); return; }
    try { await api("POST", `/api/admin/users/${encodeURIComponent(u.id)}/name`, { name }); toast(_("تم حفظ الاسم", "Name saved"), "ok"); await loadDrawer(); loadStudents(); }
    catch (x) { fail(x, _("تعذّر حفظ الاسم", "Couldn't save the name")); }
  });
  const rs = $("#b-reset"); if (rs) rs.addEventListener("click", async () => {
    rs.classList.add("is-busy");
    try { DR.temp = await api("POST", `/api/admin/users/${encodeURIComponent(u.id)}/reset-password`); toast(_("أُنشئت كلمة مرور مؤقتة", "Temporary password created"), "ok", _("انسخها وأرسلها للطالب.", "Copy it and send it to the student.")); renderDrawer(); const c = $("#b-copy"); if (c) c.focus(); }
    catch (x) { fail(x, _("تعذّر إنشاء كلمة مؤقتة", "Couldn't reset the password")); rs.classList.remove("is-busy"); }
  });
  const cp = $("#b-copy"); if (cp) cp.addEventListener("click", () => copyText(DR.temp.tempPassword, $("#tmp-pw")));
  const di = $("#del-in"); if (di) di.addEventListener("input", () => { DR.del = di.value; $("#b-del").disabled = di.value.trim().toLowerCase() !== u.email.toLowerCase(); });
  const fd = $("#f-del"); if (fd) fd.addEventListener("submit", async e => {
    e.preventDefault(); if (DR.del.trim().toLowerCase() !== u.email.toLowerCase()) { toast(_("اكتب البريد كما هو للتأكيد", "Type the exact email to confirm"), "warn"); return; }
    try { await api("DELETE", `/api/admin/users/${encodeURIComponent(u.id)}`); toast(_("تم حذف الحساب", "Account deleted"), "ok", u.email); closeDrawer(true); loadStudents(); }
    catch (x) { fail(x, _("تعذّر الحذف", "Couldn't delete")); }
  });
}
async function copyText(t, el) {
  try { await navigator.clipboard.writeText(t); toast(_("تم النسخ", "Copied"), "ok"); }
  catch (e) {
    try { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); const ok = document.execCommand("copy"); toast(ok ? _("تم النسخ", "Copied") : _("حدِّد النص وانسخه يدويًا", "Select the text and copy it manually"), ok ? "ok" : "warn"); }
    catch (x) { toast(_("حدِّد النص وانسخه يدويًا", "Select the text and copy it manually"), "warn"); }
  }
}

/* ================= 4. payments ================= */
async function vPayments(tok) {
  const [r] = await Promise.all([api("GET", `/api/admin/payments${S.payStatus ? "?status=" + S.payStatus : ""}`), getSettings().catch(() => null)]);
  if (!live(tok)) return;
  const pays = r.payments.map(p => ({ ...p, amount: num(p.amount), refunded_amount: num(p.refunded_amount) }));
  const cnt = s => pays.filter(p => p.status === s).length;
  MAIN.innerHTML = ph("المالية", "Billing", "المدفوعات والاشتراكات", "Payments & subscriptions", "كل الدفعات الإلكترونية والتفعيلات بالقسائم، مع الاسترداد والتحقق.", "Every online payment and coupon activation, with refunds and re-checks.", refreshBtn()) + `
  ${r.tap ? "" : `<div class="alert warn" role="note">${ic("alert")}<div><b>${_("الدفع الإلكتروني غير مفعّل بعد", "Online payment isn't active yet")}</b>${_("لتفعيله يضيف مالك الحساب المتغير <code>MOYASAR_SECRET_KEY</code> (المفتاح السري من لوحة ميسّر) في Railway: الخدمة ← Variables ← New Variable، فتُعاد تهيئة الخدمة تلقائيًا. حتى ذلك الحين يرى الطلاب «جارٍ تفعيل الدفع الإلكتروني»، وتعمل قسائم ١٠٠٪ فقط، ولا يمكن استرداد الدفعات الإلكترونية أو إعادة التحقق منها.", "To turn it on, the owner adds the <code>MOYASAR_SECRET_KEY</code> variable (the secret key from the Moyasar dashboard) in Railway: Service → Variables → New Variable; the service restarts automatically. Until then students see “online payment is being activated”, only 100% coupons work, and refunds/re-checks of online payments are unavailable.")}</div></div>`}
  <section class="card">
    <div class="toolbar"><div class="seg" role="group" aria-label="${_("الحالة", "Status")}" id="pay-st">${[["", "الكل", "All"], ["paid", PSTAT.paid[0], PSTAT.paid[1]], ["refunded", PSTAT.refunded[0], PSTAT.refunded[1]], ["failed", PSTAT.failed[0], PSTAT.failed[1]], ["initiated", PSTAT.initiated[0], PSTAT.initiated[1]]].map(([v, a, e]) => `<button type="button" data-v="${v}" class="${S.payStatus === v ? "on" : ""}" aria-pressed="${S.payStatus === v}">${_(a, e)}</button>`).join("")}</div><span class="sp"></span>
      <span class="small muted">${_(`${fmtN(pays.length)} دفعة`, `${fmtN(pays.length)} payments`)}${S.payStatus ? "" : ` · ${fmtN(cnt("paid"))} ${_("مدفوعة", "paid")} · ${fmtN(cnt("refunded"))} ${_("مستردة", "refunded")}`}</span></div>
    ${pays.length ? `<div class="tbl"><table><thead><tr><th scope="col" class="hide-sm">${_("التاريخ", "Date")}</th><th scope="col">${_("الطالب", "Student")}</th><th scope="col" class="hide-sm">${_("الباقة", "Plan")}</th><th scope="col" class="num">${_("المبلغ", "Amount")}</th><th scope="col">${_("الحالة", "Status")}</th><th scope="col" class="hide-md">${_("المرجع", "Reference")}</th><th scope="col"><span class="sr">${_("إجراءات", "Actions")}</span></th></tr></thead><tbody>
    ${pays.map(p => `<tr><td class="hide-sm"><span class="nowrap">${esc(fmtDate(p.created_at))}</span></td>
      <td>${p.user_id ? `<button class="btn link ltr em" type="button" data-user="${esc(p.user_id)}">${esc(p.email || "—")}</button>` : `<span class="ltr muted">${esc(p.email || _("حساب محذوف", "deleted account"))}</span>`}<small class="show-sm muted">${esc(fmtDate(p.created_at))} · ${esc(planName(p.plan_id))}</small></td>
      <td class="hide-sm wrap">${esc(planName(p.plan_id))}</td>
      <td class="num">${p.amount ? fmtMoney(p.amount) : `<span class="chip on">${_("قسيمة ١٠٠٪", "100% coupon")}</span>`}${p.refunded_amount ? `<br><small class="muted">−${fmtMoney(p.refunded_amount)}</small>` : ""}${p.coupon ? `<br><small class="mono muted" data-tip="${esc(_("القسيمة", "Coupon"))}">${esc(p.coupon)}</small>` : ""}</td>
      <td><span class="chip ${esc(p.status)}">${esc(pstatL(p.status))}</span></td>
      <td class="hide-md">${p.tap_id ? `<span class="mono small">${esc(p.tap_id)}</span><br><small class="muted">${esc(p.tap_status || "")}</small>` : "—"}</td>
      <td><div class="acts">${p.status === "paid" && p.amount > 0 ? `<button class="btn ghost xs" type="button" data-refund="${esc(p.id)}">${ic("undo")}${_("استرداد", "Refund")}</button>` : ""}${p.tap_id ? `<button class="btn ghost xs" type="button" data-recheck="${esc(p.id)}" data-tip="${esc(_("اسأل بوابة الدفع عن حالة العملية وفعّل الاشتراك إن اكتملت", "Ask the gateway for the payment status and activate if paid"))}">${ic("refresh")}${_("تحقق", "Recheck")}</button>` : ""}</div></td></tr>`).join("")}
    </tbody></table></div>` : `<p class="tbl-empty">${_("لا دفعات بهذه الحالة.", "No payments with this status.")}</p>`}
  </section>`;
  onSeg("pay-st", v => { S.payStatus = v; route(); });
  onRefresh(route);
  MAIN.addEventListener("click", e => {
    const u = e.target.closest("[data-user]"); if (u) return openStudent(u.dataset.user, u);
    const rf = e.target.closest("[data-refund]"); if (rf) return refundDialog(pays.find(p => p.id === rf.dataset.refund), rf);
    const rc = e.target.closest("[data-recheck]"); if (rc) return recheck(rc);
  });
}
async function recheck(btn) {
  btn.classList.add("is-busy");
  try { const r = await api("POST", `/api/admin/payments/${encodeURIComponent(btn.dataset.recheck)}/recheck`); toast(r.status === "CAPTURED" ? _("العملية مكتملة والاشتراك مفعّل", "Charge captured; subscription active") : _("حالة العملية لدى بوابة الدفع: ", "Gateway status: ") + (r.status || "—"), r.status === "CAPTURED" ? "ok" : "info"); route(); }
  catch (e) { fail(e, _("تعذّر التحقق من العملية", "Couldn't recheck the charge")); btn.classList.remove("is-busy"); }
}
function dialog(html, onSubmit) {
  const d = document.createElement("dialog"); d.className = "dlg"; d.innerHTML = html; document.body.appendChild(d);
  d.addEventListener("close", () => d.remove());
  d.addEventListener("click", e => { if (e.target === d || e.target.closest("[data-cancel]")) d.close(); });
  $("form", d).addEventListener("submit", async e => { e.preventDefault(); const b = $("button[type=submit]", d); b.classList.add("is-busy"); try { if (await onSubmit(d) !== false) d.close(); } finally { b.classList.remove("is-busy"); } });
  d.showModal(); return d;
}
function refundDialog(p, ret) {
  if (!p) return;
  const d = dialog(`<form novalidate><h2>${_("استرداد دفعة", "Refund payment")}</h2>
    <p class="small">${esc(p.email || "")} · ${esc(planName(p.plan_id))} · <b>${fmtMoney(p.amount)}</b></p>
    <label class="fld">${_("المبلغ المسترد", "Refund amount")}<span class="unit"><input type="number" id="rf-amt" min="0.01" max="${p.amount}" step="0.01" value="${p.amount}" required><span>${_("ر.س", "SAR")}</span></span><span class="hint">${_("الحد الأقصى ", "Up to ")}${fmtMoney(p.amount)}</span></label>
    <label class="fld">${_("السبب", "Reason")}<input type="text" id="rf-why" maxlength="100" list="rf-reasons" value="requested_by_customer" dir="ltr"><datalist id="rf-reasons"><option value="requested_by_customer"><option value="duplicate"><option value="fraudulent"></datalist></label>
    <label class="tgl"><input type="checkbox" class="tg" id="rf-rev" checked>${_("إلغاء الاشتراك المرتبط بهذه الدفعة", "Revoke the subscription bought with this payment")}</label>
    ${p.tap_id ? `<p class="small muted">${_("سيُرسل طلب الاسترداد إلى بوابة الدفع ويُعاد المبلغ إلى وسيلة الدفع.", "The refund is sent to the payment gateway and returned to the original payment method.")}</p>` : ""}
    <div class="row"><button class="btn ghost sm" type="button" data-cancel>${_("إلغاء", "Cancel")}</button><button class="btn danger sm" type="submit">${_("استرداد", "Refund")}</button></div></form>`, async dl => {
    const amt = Math.round(num($("#rf-amt", dl).value) * 100) / 100;
    if (!(amt > 0 && amt <= p.amount)) { $("#rf-amt", dl).classList.add("invalid"); toast(_("تحقق من المبلغ", "Check the amount"), "err", errMsg("bad-amount")); return false; }
    try { await api("POST", `/api/admin/payments/${encodeURIComponent(p.id)}/refund`, { amount: amt, reason: $("#rf-why", dl).value.trim() || undefined, revoke: $("#rf-rev", dl).checked }); toast(_("تم الاسترداد", "Refund issued"), "ok", fmtMoney(amt)); route(); }
    catch (e) { fail(e, _("تعذّر الاسترداد", "Refund failed")); return false; }
  });
  d.addEventListener("close", () => { if (ret && document.contains(ret)) ret.focus(); });
}

/* ================= 5. coupons ================= */
async function vCoupons(tok) {
  const [r] = await Promise.all([api("GET", "/api/admin/coupons"), getSettings().catch(() => null)]); if (!live(tok)) return;
  const plans = SETTINGS ? SETTINGS.config.plans : [];
  const now = Date.now();
  const status = c => !c.active ? ["off", _("معطّلة", "Disabled")] : c.expires_at && new Date(c.expires_at) < now ? ["expired", _("منتهية", "Expired")] : c.max_uses != null && c.used >= c.max_uses ? ["expired", _("استُنفدت", "Used up")] : ["pro", _("فعّالة", "Active")];
  MAIN.innerHTML = ph("التسويق", "Marketing", "القسائم", "Coupons", "رموز خصم للطلاب. قسيمة ١٠٠٪ تفعّل الاشتراك فورًا دون دفع.", "Discount codes for students. A 100% coupon activates instantly with no payment.", refreshBtn()) + `
  <section class="card"><div class="card-h"><h2>${_("قسيمة جديدة", "New coupon")}</h2></div>
    <form id="f-cp" class="fgrid" novalidate>
      <label class="fld">${_("الرمز", "Code")}<input type="text" id="cp-code" maxlength="32" dir="ltr" autocomplete="off" spellcheck="false" placeholder="SCHOOL25" style="text-transform:uppercase"><span class="hint">${_("حروف إنجليزية وأرقام و - _", "Letters, digits, - and _")}</span></label>
      <label class="fld">${_("نسبة الخصم", "Discount")}<span class="unit"><input type="number" id="cp-pct" min="1" max="100" step="1" value="20"><span>%</span></span></label>
      <label class="fld">${_("أقصى عدد استخدامات", "Max uses")}<input type="number" id="cp-max" min="1" step="1" placeholder="${_("بلا حد", "Unlimited")}"></label>
      <label class="fld">${_("تاريخ الانتهاء", "Expires")}<input type="date" id="cp-exp" min="${today()}"><span class="hint">${_("تبقى صالحة حتى نهاية هذا اليوم", "Valid through the end of this day")}</span></label>
      <div class="fld wide"><span>${_("الباقات", "Plans")} <span class="hint">${_("(لا اختيار = كل الباقات)", "(none = all plans)")}</span></span><div class="checks">${plans.map(p => `<label class="ck"><input type="checkbox" name="cp-plan" value="${esc(p.id)}">${esc(_(p.ar || p.id, p.en || p.id))} <span class="mono muted">${esc(p.id)}</span></label>`).join("") || `<span class="muted small">—</span>`}</div></div>
      <label class="fld wide">${_("ملاحظة داخلية", "Internal note")}<input type="text" id="cp-note" maxlength="200" placeholder="${_("مثال: شراكة مدرسة الرياض", "e.g. Riyadh school partnership")}"></label>
      <div class="row wide" style="grid-column:1/-1"><button class="btn primary sm" type="submit">${ic("plus")}${_("إنشاء القسيمة", "Create coupon")}</button></div>
    </form></section>
  <section class="card"><div class="card-h"><h2>${_("القسائم", "Coupons")}</h2><span class="sub">${fmtN(r.coupons.length)}</span></div>
    ${r.coupons.length ? `<div class="tbl"><table><thead><tr><th scope="col">${_("الرمز", "Code")}</th><th scope="col" class="num">${_("الخصم", "Off")}</th><th scope="col">${_("الاستخدام", "Usage")}</th><th scope="col" class="hide-sm">${_("الانتهاء", "Expires")}</th><th scope="col" class="hide-md">${_("الباقات", "Plans")}</th><th scope="col" class="hide-md">${_("ملاحظة", "Note")}</th><th scope="col">${_("الحالة", "Status")}</th><th scope="col">${_("مفعّلة", "Enabled")}</th><th scope="col"><span class="sr">${_("حذف", "Delete")}</span></th></tr></thead><tbody>
    ${r.coupons.map(c => { const [sc, sl] = status(c); const u = num(c.used), m = c.max_uses; return `<tr>
      <td><b class="mono">${esc(c.code)}</b></td><td class="num"><b>${fmtN(c.pct)}${LANG === "ar" ? "٪" : "%"}</b></td>
      <td><span class="nowrap">${fmtN(u)}${m != null ? " / " + fmtN(m) : ` <span class="muted small">${_("(بلا حد)", "(no cap)")}</span>`}${m ? `<span class="mini" data-tip="${esc(fmtPct(u / m, 0))}"><span style="inline-size:${Math.min(100, 100 * u / m).toFixed(1)}%"></span></span>` : ""}</span></td>
      <td class="hide-sm">${c.expires_at ? esc(fmtDate(c.expires_at)) : "—"}</td>
      <td class="hide-md">${c.plan_ids && c.plan_ids.length ? c.plan_ids.map(id => `<span class="chip">${esc(planName(id))}</span>`).join(" ") : `<span class="muted">${_("الكل", "All")}</span>`}</td>
      <td class="hide-md wrap small">${esc(c.note || "")}</td>
      <td><span class="chip ${sc}">${esc(sl)}</span></td>
      <td><input type="checkbox" class="tg" data-toggle="${esc(c.code)}" ${c.active ? "checked" : ""} aria-label="${esc(_("تفعيل القسيمة ", "Enable coupon ") + c.code)}"></td>
      <td>${u ? `<span tabindex="0" data-tip="${esc(_("لا تُحذف القسيمة بعد استخدامها؛ عطّلها بدلًا من ذلك.", "Used coupons can't be deleted; disable instead."))}"><button class="btn ghost xs icon" type="button" disabled aria-label="${_("حذف (غير متاح)", "Delete (unavailable)")}">${ic("trash")}</button></span>` : `<button class="btn danger-ghost xs icon" type="button" data-del="${esc(c.code)}" aria-label="${esc(_("حذف القسيمة ", "Delete coupon ") + c.code)}">${ic("trash")}</button>`}</td></tr>`; }).join("")}
    </tbody></table></div>` : `<p class="tbl-empty">${_("لا قسائم بعد. أنشئ أول قسيمة من الأعلى.", "No coupons yet. Create the first one above.")}</p>`}
  </section>`;
  onRefresh(route);
  const code = $("#cp-code"); code.addEventListener("input", () => { const p = code.selectionStart; code.value = code.value.toUpperCase().replace(/\s/g, ""); code.setSelectionRange(p, p); code.classList.remove("invalid"); });
  $("#f-cp").addEventListener("submit", async e => {
    e.preventDefault();
    const body = { code: code.value.trim().toUpperCase(), pct: Math.round(num($("#cp-pct").value)) };
    const errs = [];
    if (!/^[A-Z0-9_-]{3,32}$/.test(body.code)) { code.classList.add("invalid"); errs.push("bad-code"); }
    if (!(body.pct >= 1 && body.pct <= 100)) { $("#cp-pct").classList.add("invalid"); errs.push("bad-pct"); }
    const mx = $("#cp-max").value; if (mx) { if (!(num(mx) >= 1)) { $("#cp-max").classList.add("invalid"); errs.push("bad-max"); } else body.maxUses = Math.round(num(mx)); }
    const ex = $("#cp-exp").value; if (ex) body.expires = new Date(ex + "T23:59:59").toISOString();
    const pl = $$("input[name=cp-plan]:checked").map(x => x.value); if (pl.length) body.plans = pl;
    const note = $("#cp-note").value.trim(); if (note) body.note = note;
    if (errs.length) { toast(_("تحقق من الحقول المظللة", "Check the highlighted fields"), "err", errs[0] === "bad-max" ? _("أقصى عدد استخدامات يجب أن يكون ١ أو أكثر.", "Max uses must be 1 or more.") : errMsg(errs[0])); return; }
    try { await api("POST", "/api/admin/coupons", body); toast(_("أُنشئت القسيمة ", "Coupon created: ") + body.code, "ok", `${body.pct}%`); route(); }
    catch (x) { if (x.code === "exists" || x.code === "bad-code") code.classList.add("invalid"); fail(x, _("تعذّر إنشاء القسيمة", "Couldn't create the coupon")); }
  });
  MAIN.addEventListener("change", async e => {
    const t = e.target.closest("[data-toggle]"); if (!t) return; const on = t.checked; t.disabled = true;
    try { const r = await api("PATCH", `/api/admin/coupons/${encodeURIComponent(t.dataset.toggle)}`, { active: on }); if (r.ok === false) throw Object.assign(new Error(), { code: "not-found" }); toast(on ? _("فُعّلت القسيمة ", "Coupon enabled: ") + t.dataset.toggle : _("عُطّلت القسيمة ", "Coupon disabled: ") + t.dataset.toggle, "ok"); route(); }
    catch (x) { t.checked = !on; t.disabled = false; fail(x, _("تعذّر تغيير حالة القسيمة", "Couldn't change the coupon")); }
  });
  MAIN.addEventListener("click", e => {
    const b = e.target.closest("[data-del]"); if (!b) return; const c = b.dataset.del;
    const d = dialog(`<form novalidate><h2>${_("حذف القسيمة؟", "Delete coupon?")}</h2><p>${_("ستُحذف القسيمة", "This deletes")} <b class="mono">${esc(c)}</b> ${_("نهائيًا. لم يستخدمها أحد بعد.", "permanently. Nobody has used it yet.")}</p><div class="row"><button class="btn ghost sm" type="button" data-cancel>${_("تراجع", "Cancel")}</button><button class="btn danger sm" type="submit">${_("حذف", "Delete")}</button></div></form>`, async () => {
      try {
        await api("DELETE", `/api/admin/coupons/${encodeURIComponent(c)}`);
        const after = await api("GET", "/api/admin/coupons"); // the endpoint answers ok even when a used coupon is kept
        if (after.coupons.some(x => x.code === c)) throw Object.assign(new Error(), { code: "in-use" });
        toast(_("حُذفت القسيمة ", "Coupon deleted: ") + c, "ok"); route();
      } catch (x) { fail(x, _("تعذّر حذف القسيمة", "Couldn't delete the coupon")); route(); }
    });
    d.addEventListener("close", () => { if (document.contains(b)) b.focus(); });
  });
}

/* ================= 6. content ================= */
async function vContent(tok) {
  const d = S.ctDays;
  const [r] = await Promise.all([api("GET", `/api/admin/content?days=${d}`), getSettings().catch(() => null)]); if (!live(tok)) return;
  const free = new Set(SETTINGS ? SETTINGS.config.free.xp : []);
  const xs = r.explainers.map(x => ({ ...x, starts: num(x.starts), users: num(x.users), done: num(x.done), score: x.score == null ? null : num(x.score), comp: num(x.starts) ? Math.min(1, num(x.done) / num(x.starts)) : 0, info: xpInfo(x.k) }));
  const skills = Object.entries(r.skills || {}).map(([k, v]) => ({ k, c: num(v.c), t: num(v.t), time: num(v.time), users: num(v.users) })).sort((a, b) => (SKILL_ORDER.indexOf(a.k) + 99 * !SKILLS[a.k]) - (SKILL_ORDER.indexOf(b.k) + 99 * !SKILLS[b.k]));
  MAIN.innerHTML = ph("المحتوى", "Content", "تحليلات المحتوى", "Content analytics", "ما الذي يدرسه الطلاب، وأين يتعثرون.", "What students study and where they struggle.", periodSeg("ct-p", d) + refreshBtn()) + `
  <section class="card"><div class="card-h"><h2>${_("الشروحات التفاعلية", "Interactive explainers")}</h2><span class="sub">${_("اضغط على عنوان العمود للترتيب", "Click a column header to sort")}</span></div><div id="xp-tbl"></div></section>
  <div class="g3">
    <section class="card"><div class="card-h"><h2>${_("الدقة حسب المهارة", "Accuracy by skill")}</h2><span class="sub">${_("من تقدم الطلاب المحفوظ", "from students' saved progress")}</span></div>
      ${skills.length ? hbars(skills.map(s => ({ label: sk(s.k), sub: _(`${fmtN(s.users)} طالب · ${fmtN(s.t)} سؤال`, `${fmtN(s.users)} students · ${fmtN(s.t)} questions`), v: s.t ? s.c / s.t : 0, vlabel: fmtPct(s.t ? s.c / s.t : 0, 0), vsub: fmtDur(s.t ? s.time / s.t : 0), tipH: sk(s.k), tip: `${_("الدقة", "Accuracy")} ${fmtPct(s.t ? s.c / s.t : 0, 1)} · ${fmtN(s.c)}/${fmtN(s.t)} · ${_("متوسط الوقت للسؤال", "avg time per question")} ${fmtDur(s.t ? s.time / s.t : 0)}` })), { max: 1, cls: "sky" }) : `<p class="empty">${_("لا بيانات تقدم في هذه الفترة.", "No progress data in this period.")}</p>`}</section>
    <section class="card"><div class="card-h"><h2>${_("ملخص الاختبارات", "Tests summary")}</h2></div>
      ${r.tests.length ? `<div class="tbl"><table><thead><tr><th scope="col">${_("النوع", "Type")}</th><th scope="col" class="num">${_("المرات", "Taken")}</th><th scope="col" class="num">${_("المتوسط", "Average")}</th></tr></thead><tbody>${r.tests.map(t => `<tr><td>${esc(kindL(t.k))}</td><td class="num">${fmtN(t.n)}</td><td class="num">${t.avg != null ? fmtN(t.avg, 0) + (LANG === "ar" ? "٪" : "%") : "—"}<span class="mini"><span style="inline-size:${Math.min(100, num(t.avg)).toFixed(0)}%"></span></span></td></tr>`).join("")}</tbody></table></div>` : `<p class="empty">${_("لم تُسجَّل اختبارات في هذه الفترة.", "No tests recorded in this period.")}</p>`}</section>
  </div>`;
  const draw = () => {
    const { k, asc } = S.xpSort, dir = asc ? 1 : -1;
    const rows = xs.slice().sort((a, b) => { const A = k === "k" ? a.k : a[k] ?? -1, B = k === "k" ? b.k : b[k] ?? -1; return (A > B ? 1 : A < B ? -1 : 0) * dir; });
    const th = (key, a, e, cls = "num") => `<th scope="col" class="sortable ${cls}" tabindex="0" data-xs="${key}" aria-sort="${k === key ? (asc ? "ascending" : "descending") : "none"}">${_(a, e)}<span class="ar-i" aria-hidden="true">${k === key ? (asc ? "▴" : "▾") : "↕"}</span></th>`;
    $("#xp-tbl").innerHTML = rows.length ? `<div class="tbl"><table><thead><tr>${th("k", "الشرح", "Explainer", "")}${th("starts", "البدايات", "Starts")}${th("users", "طلاب فريدون", "Unique users", "num hide-sm")}${th("done", "الإكمال", "Completions")}${th("comp", "نسبة الإكمال", "Completion")}${th("score", "متوسط الاختبار", "Avg quiz", "num hide-sm")}</tr></thead><tbody>
      ${rows.map(x => `<tr><td><span class="mono"><b>${esc(x.k)}</b></span> <span class="chip ${x.info.lang === "en" ? "sky" : ""}">${x.info.lang === "en" ? "EN" : "ع"}</span> ${free.has(x.k) ? `<span class="chip pink">${_("مجاني", "Free")}</span>` : ""}<br><small class="muted">${esc(sk(x.info.skill))}</small></td><td class="num">${fmtN(x.starts)}</td><td class="num hide-sm">${fmtN(x.users)}</td><td class="num">${fmtN(x.done)}</td><td class="num"><span class="nowrap">${fmtPct(x.comp, 0)}<span class="mini"><span style="inline-size:${(100 * x.comp).toFixed(0)}%"></span></span></span></td><td class="num hide-sm">${x.score != null ? fmtN(x.score, 1) : "—"}</td></tr>`).join("")}
      </tbody></table></div>` : `<p class="tbl-empty">${_("لم يبدأ أحد شرحًا في هذه الفترة.", "Nobody started an explainer in this period.")}</p>`;
    $$("[data-xs]").forEach(h => { const go = () => { const key = h.dataset.xs; S.xpSort = { k: key, asc: S.xpSort.k === key ? !S.xpSort.asc : key === "k" }; draw(); const n = $(`[data-xs="${key}"]`); if (n) n.focus(); }; h.addEventListener("click", go); h.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } }); });
  };
  draw();
  onSeg("ct-p", v => { S.ctDays = +v; LS.set("adm_ctDays", S.ctDays); route(); });
  onRefresh(route);
}

/* ================= 7. settings ================= */
const getP = (o, p) => p.split(".").reduce((a, k) => (a == null ? a : a[k]), o);
const setPth = (o, p, v) => { const ks = p.split("."); const last = ks.pop(); const t = ks.reduce((a, k) => a[k], o); t[last] = v; };
function validate(c) {
  const E = {}, ids = new Set();
  c.plans.forEach((p, i) => {
    if (!/^[\w-]{1,20}$/.test(p.id || "")) E[`plans.${i}.id`] = _("معرّف من ١–٢٠ حرفًا إنجليزيًا/رقمًا/-/_", "1–20 letters, digits, - or _");
    else if (ids.has(p.id)) E[`plans.${i}.id`] = _("المعرّف مكرر", "Duplicate id"); ids.add(p.id);
    if (!(num(p.price) > 0) || p.price === "") E[`plans.${i}.price`] = _("السعر أكبر من صفر", "Price must be above 0");
    if (!(num(p.days) >= 1) || p.days === "") E[`plans.${i}.days`] = _("يوم واحد على الأقل", "At least 1 day");
    if (!String(p.ar || "").trim()) E[`plans.${i}.ar`] = _("مطلوب", "Required");
    if (!String(p.en || "").trim()) E[`plans.${i}.en`] = _("مطلوب", "Required");
  });
  if (!c.plans.length) E.plans = _("أضف باقة واحدة على الأقل", "Add at least one plan");
  else if (!c.plans.some(p => p.active !== false)) E.plans = _("يجب أن تبقى باقة واحدة مفعّلة على الأقل", "Keep at least one plan active");
  const f = c.free, rng = (k, lo, hi, msg) => { const v = f[k]; if (v === "" || !(num(v) >= lo && num(v) <= hi)) E["free." + k] = msg; };
  rng("dailyQuestions", 0, 500, _("بين ٠ و٥٠٠", "0 to 500")); rng("planWeeks", 0, 52, _("بين ٠ و٥٢", "0 to 52")); rng("mistakesMax", 0, 1000, _("بين ٠ و١٠٠٠", "0 to 1000"));
  rng("cardsFrac", 0, 1, _("بين ٠ و١٠٠٪", "0 to 100%")); rng("techFrac", 0, 1, _("بين ٠ و١٠٠٪", "0 to 100%"));
  if (c.refund.days === "" || !(num(c.refund.days) >= 0 && num(c.refund.days) <= 60)) E["refund.days"] = _("بين ٠ و٦٠ يومًا", "0 to 60 days");
  else if (c.refund.on && !(num(c.refund.days) >= 1)) E["refund.days"] = _("يوم واحد على الأقل عند التفعيل", "At least 1 day when on");
  if (c.trialReportDays === "" || !(num(c.trialReportDays) >= 1 && num(c.trialReportDays) <= 60)) E.trialReportDays = _("بين ١ و٦٠ يومًا", "1 to 60 days");
  if (c.banner.on && !String(c.banner.ar || "").trim()) E["banner.ar"] = _("اكتب نص الإعلان بالعربية", "Write the Arabic text");
  if (c.banner.on && !String(c.banner.en || "").trim()) E["banner.en"] = _("اكتب نص الإعلان بالإنجليزية", "Write the English text");
  return E;
}
function normalize(c) {
  const o = clone(c);
  o.plans = o.plans.map(p => ({ id: String(p.id).trim(), ar: String(p.ar || "").trim(), en: String(p.en || "").trim(), days: Math.round(num(p.days)), price: num(p.price), active: p.active !== false, best: !!p.best }));
  ["dailyQuestions", "planWeeks", "mistakesMax"].forEach(k => { o.free[k] = Math.round(num(o.free[k])); });
  ["cardsFrac", "techFrac"].forEach(k => { o.free[k] = Math.round(num(o.free[k]) * 1000) / 1000; });
  o.refund = { on: !!o.refund.on, days: Math.round(num(o.refund.days)) }; o.trialReportDays = Math.round(num(o.trialReportDays));
  o.banner = { on: !!o.banner.on, ar: String(o.banner.ar || "").trim(), en: String(o.banner.en || "").trim(), tone: o.banner.tone };
  return o;
}
async function vSettings(tok) {
  const r = await getSettings(true); if (!live(tok)) return;
  if (!S.draft) { S.draft = clone(r.config); S.dirty = false; S.errs = {}; }
  renderSettings();
}
function renderSettings() {
  freshMain();
  const c = S.draft, D = SETTINGS.defaults, E = S.errs, keys = SETTINGS.xpKeys || [];
  const err = p => (E[p] ? `<span class="err" id="e-${p.replace(/\./g, "-")}">${esc(E[p])}</span>` : "");
  const inv = p => (E[p] ? `class="invalid" aria-invalid="true" aria-describedby="e-${p.replace(/\./g, "-")}"` : "");
  const rst = part => `<button class="btn ghost xs" type="button" data-reset="${part}">${ic("undo")}${_("استعادة الافتراضي", "Restore defaults")}</button>`;
  const pctV = v => (v === "" ? "" : Math.round(num(v) * 1000) / 10);
  // explainer groups
  const freeSet = new Set(c.free.xp || []);
  const groups = { ar: {}, en: {} }; keys.forEach(k => { const i = xpInfo(k); (groups[i.lang][i.skill] = groups[i.lang][i.skill] || []).push(k); });
  const grp = lang => { const g = groups[lang], ks = Object.values(g).flat(), on = ks.filter(k => freeSet.has(k)).length;
    return `<div class="xp-group"><h3>${lang === "ar" ? _("الشروحات العربية", "Arabic explainers") : _("الشروحات الإنجليزية", "English explainers")}<span class="chip ${on ? "pink" : "free"}" id="xpc-${lang}">${_(`${fmtN(on)} مجانية من ${fmtN(ks.length)}`, `${on} free of ${ks.length}`)}</span></h3>
    ${Object.keys(g).sort((a, b) => (SKILL_ORDER.indexOf(a) + 99 * !SKILLS[a]) - (SKILL_ORDER.indexOf(b) + 99 * !SKILLS[b])).map(s => `<div class="xp-skill"><span>${esc(sk(s))}</span><div class="checks">${g[s].sort().map(k => `<label class="xk"><input type="checkbox" data-xp="${esc(k)}" ${freeSet.has(k) ? "checked" : ""}>${esc(k)}</label>`).join("")}</div></div>`).join("")}</div>`; };
  const nErr = Object.keys(E).length;
  MAIN.innerHTML = ph("الإعدادات", "Settings", "الإعدادات", "Settings", "الباقات وحدود الخطة المجانية والإعلانات. تُطبَّق على التطبيق خلال ٣٠ ثانية من الحفظ.", "Plans, free-plan limits and announcements. Applied to the app within 30 seconds of saving.",
    `<button class="btn primary sm" type="button" id="s-save2" ${S.dirty ? "" : "disabled"}>${ic("check")}${_("حفظ", "Save")}</button>`) + `
  ${nErr ? `<div class="alert err" role="alert">${ic("alert")}<div><b>${_(`يوجد ${fmtN(nErr)} حقل يحتاج تصحيحًا`, `${nErr} field(s) need fixing`)}</b>${_("صحّح الحقول المظللة بالأحمر ثم احفظ.", "Fix the fields outlined in red, then save.")}</div></div>` : ""}
  <section class="card"><div class="card-h"><h2>${_("الباقات المدفوعة", "Paid plans")}</h2><div class="sec-acts">${rst("plans")}</div></div>
    <div class="tbl plans-ed"><table><thead><tr><th scope="col">${_("المعرّف", "ID")}</th><th scope="col">${_("الاسم بالعربية", "Arabic name")}</th><th scope="col">${_("الاسم بالإنجليزية", "English name")}</th><th scope="col">${_("الأيام", "Days")}</th><th scope="col">${_("السعر", "Price")} (${esc(c.currency || "SAR")})</th><th scope="col">${_("مفعّلة", "Active")}</th><th scope="col">${_("الأفضل قيمة", "Best value")}</th><th scope="col"><span class="sr">${_("حذف", "Remove")}</span></th></tr></thead><tbody>
    ${c.plans.map((p, i) => `<tr>
      <td data-l="${_("المعرّف", "ID")}"><input type="text" data-p="plans.${i}.id" value="${esc(p.id)}" dir="ltr" maxlength="20" style="inline-size:90px" ${inv(`plans.${i}.id`)} aria-label="${_("المعرّف", "ID")}">${err(`plans.${i}.id`)}</td>
      <td data-l="${_("الاسم بالعربية", "Arabic name")}"><input type="text" data-p="plans.${i}.ar" value="${esc(p.ar)}" dir="rtl" maxlength="60" ${inv(`plans.${i}.ar`)} aria-label="${_("الاسم بالعربية", "Arabic name")}">${err(`plans.${i}.ar`)}</td>
      <td data-l="${_("الاسم بالإنجليزية", "English name")}"><input type="text" data-p="plans.${i}.en" value="${esc(p.en)}" dir="ltr" maxlength="60" ${inv(`plans.${i}.en`)} aria-label="${_("الاسم بالإنجليزية", "English name")}">${err(`plans.${i}.en`)}</td>
      <td data-l="${_("الأيام", "Days")}"><input type="number" data-p="plans.${i}.days" data-num value="${esc(p.days)}" min="1" step="1" ${inv(`plans.${i}.days`)} aria-label="${_("الأيام", "Days")}">${err(`plans.${i}.days`)}</td>
      <td data-l="${_("السعر", "Price")}"><input type="number" data-p="plans.${i}.price" data-num value="${esc(p.price)}" min="0.01" step="0.01" ${inv(`plans.${i}.price`)} aria-label="${_("السعر", "Price")}">${err(`plans.${i}.price`)}</td>
      <td class="c" data-l="${_("مفعّلة", "Active")}"><input type="checkbox" class="tg" data-p="plans.${i}.active" data-bool ${p.active !== false ? "checked" : ""} aria-label="${_("مفعّلة", "Active")}"></td>
      <td class="c" data-l="${_("الأفضل قيمة", "Best value")}"><input type="checkbox" class="tg" data-best="${i}" ${p.best ? "checked" : ""} aria-label="${_("الأفضل قيمة", "Best value")}"></td>
      <td class="rm"><button class="btn danger-ghost xs icon" type="button" data-rm="${i}" aria-label="${_("حذف الباقة", "Remove plan")}" ${c.plans.length < 2 ? "disabled" : ""}>${ic("trash")}</button></td></tr>`).join("")}
    </tbody></table></div>${E.plans ? `<p class="fld"><span class="err">${esc(E.plans)}</span></p>` : ""}
    <div class="row"><button class="btn ghost sm" type="button" id="s-add">${ic("plus")}${_("إضافة باقة", "Add plan")}</button><span class="small muted" style="align-self:center">${_("الباقة غير المفعّلة تختفي من صفحة الأسعار وتبقى الاشتراكات القائمة.", "Inactive plans are hidden from pricing; existing subscriptions stay.")}</span></div>
  </section>

  <section class="card"><div class="card-h"><h2>${_("حدود الخطة المجانية", "Free-plan limits")}</h2><div class="sec-acts">${rst("limits")}</div></div>
    <div class="fgrid">
      <label class="fld">${_("أسئلة التدريب اليومية", "Daily practice questions")}<input type="number" data-p="free.dailyQuestions" data-num min="0" max="500" step="1" value="${esc(c.free.dailyQuestions)}" ${inv("free.dailyQuestions")}>${err("free.dailyQuestions")}<span class="hint">${_("الافتراضي ", "Default ")}${fmtN(D.free.dailyQuestions)}</span></label>
      <label class="fld">${_("حصة البطاقات والمفردات", "Flashcards & vocab share")}<span class="unit"><input type="number" data-p="free.cardsFrac" data-pct min="0" max="100" step="1" value="${pctV(c.free.cardsFrac)}" ${inv("free.cardsFrac")}><span>%</span></span>${err("free.cardsFrac")}<span class="hint">${_("الافتراضي ", "Default ")}${fmtPct(D.free.cardsFrac, 0)}</span></label>
      <label class="fld">${_("أسابيع الخطة الدراسية", "Study-plan weeks")}<input type="number" data-p="free.planWeeks" data-num min="0" max="52" step="1" value="${esc(c.free.planWeeks)}" ${inv("free.planWeeks")}>${err("free.planWeeks")}<span class="hint">${_("الافتراضي ", "Default ")}${fmtN(D.free.planWeeks)}</span></label>
      <label class="fld">${_("سعة صندوق الأخطاء", "Mistake box size")}<input type="number" data-p="free.mistakesMax" data-num min="0" max="1000" step="1" value="${esc(c.free.mistakesMax)}" ${inv("free.mistakesMax")}>${err("free.mistakesMax")}<span class="hint">${_("الافتراضي ", "Default ")}${fmtN(D.free.mistakesMax)}</span></label>
      <label class="fld">${_("حصة الأساليب والأنماط", "Techniques & patterns share")}<span class="unit"><input type="number" data-p="free.techFrac" data-pct min="0" max="100" step="1" value="${pctV(c.free.techFrac)}" ${inv("free.techFrac")}><span>%</span></span>${err("free.techFrac")}<span class="hint">${_("الافتراضي ", "Default ")}${fmtPct(D.free.techFrac, 0)}</span></label>
    </div></section>

  <section class="card"><div class="card-h"><h2>${_("الشروحات المجانية", "Free explainers")}</h2><div class="sec-acts"><span class="chip pink" id="xpc-all">${_(`${fmtN(keys.filter(k => freeSet.has(k)).length)} من ${fmtN(keys.length)}`, `${keys.filter(k => freeSet.has(k)).length} of ${keys.length}`)}</span>${rst("xp")}</div></div>
    <p class="small muted">${_("المحدَّد يظهر لكل الطلاب؛ الباقي يظهر بقفل لمشتركي برو فقط. يُعاد بناء حزمة الشروحات المجانية تلقائيًا بعد الحفظ.", "Checked explainers are open to everyone; the rest show a lock for pro only. The free bundle rebuilds automatically after saving.")}</p>
    ${keys.length ? `<div class="g2">${grp("ar")}${grp("en")}</div>` : `<p class="empty">${_("لم يُعثر على شروحات.", "No explainers found.")}</p>`}</section>

  <div class="g2">
    <section class="card"><div class="card-h"><h2>${_("الاسترداد وتقرير التجربة", "Refunds & trial report")}</h2><div class="sec-acts">${rst("refund")}</div></div>
      <label class="tgl"><input type="checkbox" class="tg" data-p="refund.on" data-bool ${c.refund.on ? "checked" : ""}>${_("إظهار وعد «استرداد كامل»", "Show the “full refund” promise")}</label>
      <div class="fgrid">
        <label class="fld">${_("مدة الاسترداد (أيام)", "Refund window (days)")}<input type="number" data-p="refund.days" data-num min="0" max="60" step="1" value="${esc(c.refund.days)}" ${inv("refund.days")}>${err("refund.days")}</label>
        <label class="fld">${_("تقرير التجربة بعد (أيام)", "Trial report after (days)")}<input type="number" data-p="trialReportDays" data-num min="1" max="60" step="1" value="${esc(c.trialReportDays)}" ${inv("trialReportDays")}>${err("trialReportDays")}</label>
      </div>
      <p class="small muted" id="rf-prev"></p></section>
    <section class="card"><div class="card-h"><h2>${_("شريط الإعلان", "Announcement banner")}</h2><div class="sec-acts">${rst("banner")}</div></div>
      <label class="tgl"><input type="checkbox" class="tg" data-p="banner.on" data-bool ${c.banner.on ? "checked" : ""}>${_("إظهار الإعلان في التطبيق", "Show the banner in the app")}</label>
      <label class="fld">${_("النص بالعربية", "Arabic text")}<textarea data-p="banner.ar" maxlength="200" dir="rtl" rows="2" ${inv("banner.ar")}>${esc(c.banner.ar)}</textarea>${err("banner.ar")}</label>
      <label class="fld">${_("النص بالإنجليزية", "English text")}<textarea data-p="banner.en" maxlength="200" dir="ltr" rows="2" ${inv("banner.en")}>${esc(c.banner.en)}</textarea>${err("banner.en")}</label>
      <div class="fld"><span>${_("النبرة", "Tone")}</span><div class="seg" role="group" id="bn-tone">${[["info", "معلومة", "Info"], ["promo", "عرض", "Promo"], ["warn", "تنبيه", "Warning"]].map(([v, a, e]) => `<button type="button" data-v="${v}" class="${c.banner.tone === v ? "on" : ""}" aria-pressed="${c.banner.tone === v}">${_(a, e)}</button>`).join("")}</div></div>
      <div class="fld"><span>${_("معاينة مباشرة", "Live preview")}</span><div id="bn-prev" aria-live="polite"></div></div>
    </section>
  </div>
  <div class="savebar" id="savebar" ${S.dirty ? "" : "hidden"}><p>${_("لديك تغييرات غير محفوظة", "You have unsaved changes")}</p><div class="row"><button class="btn ghost sm" type="button" id="s-discard">${_("تجاهل", "Discard")}</button><button class="btn sand sm" type="button" id="s-save">${ic("check")}${_("حفظ التغييرات", "Save changes")}</button></div></div>`;
  updatePreviews();
  const dirty = () => { S.dirty = true; $("#savebar").hidden = false; $("#s-save2").disabled = false; };
  MAIN.addEventListener("input", e => {
    const t = e.target; const p = t.dataset.p; if (!p || t.dataset.bool != null) return;
    let v = t.value; if (t.dataset.num != null) v = v === "" ? "" : num(v); if (t.dataset.pct != null) v = v === "" ? "" : num(v) / 100;
    setPth(S.draft, p, v); t.classList.remove("invalid"); dirty(); updatePreviews();
  });
  MAIN.addEventListener("change", e => {
    const t = e.target;
    if (t.dataset.bool != null && t.dataset.p) { setPth(S.draft, t.dataset.p, t.checked); dirty(); updatePreviews(); return; }
    if (t.dataset.best != null) { const i = +t.dataset.best; S.draft.plans.forEach((p, j) => { p.best = j === i ? t.checked : false; }); $$("[data-best]").forEach(x => { x.checked = !!S.draft.plans[+x.dataset.best].best; }); dirty(); return; }
    if (t.dataset.xp) { const set = new Set(S.draft.free.xp); t.checked ? set.add(t.dataset.xp) : set.delete(t.dataset.xp); const order = SETTINGS.xpKeys; S.draft.free.xp = order.filter(k => set.has(k)).concat([...set].filter(k => !order.includes(k))); dirty(); updateXpCounts(); }
  });
  MAIN.addEventListener("click", e => {
    const t = e.target.closest("button"); if (!t) return;
    if (t.dataset.rm != null) { const i = +t.dataset.rm, p = S.draft.plans[i]; S.draft.plans.splice(i, 1); S.errs = {}; dirty(); renderSettings(); toast(_("حُذفت الباقة ", "Plan removed: ") + (p.id || ""), "info", _("احفظ لتطبيق التغيير.", "Save to apply.")); return; }
    if (t.id === "s-add") { let n = S.draft.plans.length + 1; while (S.draft.plans.some(p => p.id === "p" + n)) n++; S.draft.plans.push({ id: "p" + n, ar: "", en: "", days: 30, price: 49, active: true, best: false }); dirty(); renderSettings(); const ins = $$(`[data-p="plans.${S.draft.plans.length - 1}.ar"]`)[0]; if (ins) ins.focus(); toast(_("أُضيفت باقة جديدة", "New plan added"), "info", _("أكمل بياناتها ثم احفظ.", "Fill it in, then save.")); return; }
    if (t.dataset.reset) { const D = SETTINGS.defaults, part = t.dataset.reset;
      if (part === "plans") S.draft.plans = clone(D.plans);
      if (part === "limits") ["dailyQuestions", "cardsFrac", "planWeeks", "mistakesMax", "techFrac"].forEach(k => { S.draft.free[k] = D.free[k]; });
      if (part === "xp") S.draft.free.xp = clone(D.free.xp);
      if (part === "refund") { S.draft.refund = clone(D.refund); S.draft.trialReportDays = D.trialReportDays; }
      if (part === "banner") S.draft.banner = clone(D.banner);
      S.errs = {}; dirty(); renderSettings(); toast(_("استُعيدت القيم الافتراضية", "Defaults restored"), "info", _("احفظ لتطبيقها.", "Save to apply them.")); return; }
    if (t.closest("#bn-tone") && t.dataset.v) { S.draft.banner.tone = t.dataset.v; $$("#bn-tone button").forEach(b => { b.classList.toggle("on", b === t); b.setAttribute("aria-pressed", b === t); }); dirty(); updatePreviews(); return; }
    if (t.id === "s-discard") { S.draft = clone(SETTINGS.config); S.dirty = false; S.errs = {}; renderSettings(); toast(_("تم تجاهل التغييرات", "Changes discarded"), "info"); return; }
    if (t.id === "s-save" || t.id === "s-save2") saveSettings(t);
  });
}
function updateXpCounts() {
  const set = new Set(S.draft.free.xp), keys = SETTINGS.xpKeys || [];
  ["ar", "en"].forEach(l => { const ks = keys.filter(k => xpInfo(k).lang === l), on = ks.filter(k => set.has(k)).length, el = $("#xpc-" + l); if (el) { el.textContent = _(`${fmtN(on)} مجانية من ${fmtN(ks.length)}`, `${on} free of ${ks.length}`); el.className = "chip " + (on ? "pink" : "free"); } });
  const a = $("#xpc-all"); if (a) a.textContent = _(`${fmtN(keys.filter(k => set.has(k)).length)} من ${fmtN(keys.length)}`, `${keys.filter(k => set.has(k)).length} of ${keys.length}`);
}
function updatePreviews() {
  const b = S.draft.banner, el = $("#bn-prev");
  if (el) el.innerHTML = ["ar", "en"].map(l => `<div class="bn-prev ${esc(b.tone)} ${b.on ? "" : "off"}" dir="${l === "ar" ? "rtl" : "ltr"}" lang="${l}" style="margin-block-end:6px"><span class="dot" aria-hidden="true"></span><span>${esc(b[l] || (l === "ar" ? "(لا نص بالعربية)" : "(no English text)"))}</span></div>`).join("") + (b.on ? "" : `<p class="small muted">${_("الإعلان مخفي حاليًا.", "The banner is currently hidden.")}</p>`);
  const r = $("#rf-prev"), rf = S.draft.refund;
  if (r) r.textContent = rf.on ? _(`يرى الطلاب: «استرداد كامل خلال ${fmtN(rf.days)} أيام». يظهر تقرير التجربة بعد ${fmtN(S.draft.trialReportDays)} يومًا.`, `Students see: “Full refund within ${rf.days} days”. The trial report appears after ${S.draft.trialReportDays} days.`) : _(`وعد الاسترداد مخفي. يظهر تقرير التجربة بعد ${fmtN(S.draft.trialReportDays)} يومًا.`, `Refund promise hidden. The trial report appears after ${S.draft.trialReportDays} days.`);
}
async function saveSettings(btn) {
  const E = validate(S.draft); S.errs = E;
  if (Object.keys(E).length) { renderSettings(); toast(_("لم تُحفظ الإعدادات", "Settings not saved"), "err", _(`صحّح ${fmtN(Object.keys(E).length)} حقل مظلل.`, `Fix ${Object.keys(E).length} highlighted field(s).`)); const f = $(".invalid"); if (f) f.focus(); return; }
  btn.classList.add("is-busy");
  try { const r = await api("PUT", "/api/admin/settings", { config: normalize(S.draft) }); SETTINGS.config = r.config; S.draft = clone(r.config); S.dirty = false; S.errs = {}; renderSettings(); toast(_("حُفظت الإعدادات", "Settings saved"), "ok", _("تظهر للطلاب خلال ٣٠ ثانية.", "Students see them within 30 seconds.")); }
  catch (e) { fail(e, _("تعذّر حفظ الإعدادات", "Couldn't save settings")); btn.classList.remove("is-busy"); }
}

/* ================= 8. audit ================= */
const AUD = {
  grant: ["gift", "", (m, t) => _(`منح ${t} اشتراكًا لمدة ${fmtN(m.days)} يومًا`, `Granted ${t} ${m.days} days of pro`) + (m.note ? ` — «${m.note}»` : "")],
  revoke: ["ban", "coral", (m, t) => _(`ألغى اشتراك ${t}`, `Revoked ${t}'s subscription`) + (m.n != null ? _(` (${fmtN(m.n)} اشتراك)`, ` (${m.n})`) : "")],
  rename: ["edit", "sky", (m, t) => _(`غيّر اسم ${t} إلى «${m.name || ""}»`, `Renamed ${t} to “${m.name || ""}”`)],
  reset_password: ["key", "butter", (m, t) => _(`أنشأ كلمة مرور مؤقتة لـ ${t}`, `Reset the password for ${t}`)],
  delete_user: ["trash", "coral", (m, t) => _(`حذف حساب ${t}`, `Deleted the account ${t}`)],
  refund: ["undo", "butter", (m, t) => _(`استرد ${fmtMoney(m.amount)} من الدفعة ${t}`, `Refunded ${fmtMoney(m.amount)} on payment ${t}`)],
  coupon_create: ["ticket", "pink", (m, t) => _(`أنشأ القسيمة ${t} بخصم ${fmtN(m.pct)}٪`, `Created coupon ${t} (${m.pct}% off)`) + (m.maxUses ? _(` · حتى ${fmtN(m.maxUses)} استخدام`, ` · up to ${m.maxUses} uses`) : "")],
  coupon_on: ["ticket", "pink", (m, t) => _(`فعّل القسيمة ${t}`, `Enabled coupon ${t}`)],
  coupon_off: ["ticket", "", (m, t) => _(`عطّل القسيمة ${t}`, `Disabled coupon ${t}`)],
  coupon_delete: ["trash", "coral", (m, t) => _(`حذف القسيمة ${t}`, `Deleted coupon ${t}`)],
  settings: ["gear", "", () => _("حدّث الإعدادات", "Updated the settings")],
  export_users: ["download", "sky", m => _(`صدّر قائمة الطلاب (${fmtN(m.n)})`, `Exported the student list (${m.n})`)]
};
async function vAudit(tok) {
  const r = await api("GET", "/api/admin/audit"); if (!live(tok)) return;
  const tgt = t => { if (!t) return ""; if (USERS_BY_ID.has(t)) return USERS_BY_ID.get(t); return t; };
  const items = r.audit.map(a => { const A = AUD[a.action] || ["info", "", () => a.action]; const text = A[2](a.meta || {}, tgt(a.target)); return { ...a, A, text, hay: (text + " " + a.admin_email + " " + a.action + " " + (a.target || "")).toLowerCase() }; });
  MAIN.innerHTML = ph("الحوكمة", "Governance", "سجل العمليات", "Audit log", "كل ما نفّذه المشرفون، الأحدث أولًا (آخر ٣٠٠ عملية).", "Everything admins did, newest first (last 300 actions).", refreshBtn()) + `
  <section class="card"><div class="toolbar"><label class="search"><span class="sr">${_("بحث في السجل", "Search the log")}</span>${ic("search")}<input type="search" id="au-q" value="${esc(S.auditQ)}" placeholder="${_("ابحث بالبريد أو القسيمة أو العملية", "Search by email, coupon or action")}" dir="auto"></label><span class="small muted" id="au-n"></span></div><ul class="plain au" id="au-l"></ul></section>`;
  const draw = () => {
    const q = S.auditQ.toLowerCase(), list = items.filter(a => !q || a.hay.includes(q)); let lastDay = "";
    $("#au-n").textContent = _(`${fmtN(list.length)} عملية`, `${list.length} actions`);
    $("#au-l").innerHTML = list.length ? list.map(a => { const dd = fmtDate(a.at); const head = dd !== lastDay ? `<li class="day">${esc(dd)}</li>` : ""; lastDay = dd;
      return head + `<li><span class="ic ${a.A[1]}" aria-hidden="true">${ic(a.A[0])}</span><div><p>${esc(a.text)}</p><small class="ltr">${esc(a.admin_email)}</small></div><time datetime="${esc(a.at)}" title="${esc(fmtDT(a.at))}">${esc(rel(a.at))}</time></li>`; }).join("") : `<li class="empty" style="display:block">${q ? _("لا نتائج مطابقة.", "No matches.") : _("لا عمليات مسجلة بعد.", "No admin actions yet.")}</li>`;
  };
  draw();
  $("#au-q").addEventListener("input", e => { S.auditQ = e.target.value.trim(); draw(); });
  onRefresh(route);
}

const VIEWS = { overview: vOverview, funnel: vFunnel, students: vStudents, payments: vPayments, coupons: vCoupons, content: vContent, settings: vSettings, audit: vAudit };

/* ================= boot ================= */
async function boot() {
  try {
    const r = await api("GET", "/api/me"); ME = r.user;
    if (!ME) return loginView();
    if (!ME.isAdmin) return notAdminView(ME);
    LOST = false; shell(); route();
  } catch (e) { app.removeAttribute("aria-busy"); loginView(e.code === "network" ? "network" : "server"); }
}
boot();
})();
