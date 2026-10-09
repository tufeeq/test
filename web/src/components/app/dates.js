// Date helpers for the app. All business logic is in Asia/Riyadh (UTC+3, no DST).
// Keeping the offset fixed avoids depending on the browser's own timezone.
const OFFSET_MIN = 180;
const TZ = 'Asia/Riyadh';
const DAY = 86400000;

const pad = (n) => String(n).padStart(2, '0');

/** Riyadh wall-clock parts for an instant. */
export function riyadhParts(d = new Date()) {
  const x = new Date(new Date(d).getTime() + OFFSET_MIN * 60000);
  return { y: x.getUTCFullYear(), m: x.getUTCMonth() + 1, d: x.getUTCDate(), h: x.getUTCHours(), min: x.getUTCMinutes(), dow: x.getUTCDay() };
}

/** 'YYYY-MM-DD' of the Riyadh day containing the instant. */
export function ymd(d = new Date()) {
  const p = riyadhParts(d);
  return `${p.y}-${pad(p.m)}-${pad(p.d)}`;
}
export const todayYmd = () => ymd(new Date());

/** Add days to a YYYY-MM-DD string. */
export function addDays(dateStr, n) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const t = new Date(Date.UTC(y, m - 1, d) + n * DAY);
  return `${t.getUTCFullYear()}-${pad(t.getUTCMonth() + 1)}-${pad(t.getUTCDate())}`;
}

/** Day difference b - a for YYYY-MM-DD strings. */
export function diffDays(a, b) {
  const p = (s) => { const [y, m, d] = s.slice(0, 10).split('-').map(Number); return Date.UTC(y, m - 1, d); };
  return Math.round((p(b) - p(a)) / DAY);
}

/** Instant (Date) for a Riyadh local date + hour/minute. */
export function riyadhInstant(dateStr, h = 0, min = 0) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d, h, min) - OFFSET_MIN * 60000);
}

/** ISO → value for <input type="datetime-local"> in Riyadh time. */
export function toLocalInput(iso) {
  if (!iso) return '';
  const p = riyadhParts(iso);
  return `${p.y}-${pad(p.m)}-${pad(p.d)}T${pad(p.h)}:${pad(p.min)}`;
}
/** <input type="datetime-local"> value (Riyadh) → ISO string. */
export function fromLocalInput(v) {
  if (!v) return null;
  const [date, time = '00:00'] = v.split('T');
  const [h, min] = time.split(':').map(Number);
  return riyadhInstant(date, h, min).toISOString();
}

/** Minutes since Riyadh midnight for an instant. */
export function minutesOfDay(iso) {
  const p = riyadhParts(iso);
  return p.h * 60 + p.min;
}

/** Monday-free week: Saudi week starts Sunday. Returns the Sunday on/before dateStr. */
export function weekStart(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return addDays(dateStr, -dow);
}

const cache = new Map();
function fmt(locale, opts) {
  const key = locale + JSON.stringify(opts);
  if (!cache.has(key)) cache.set(key, new Intl.DateTimeFormat(locale, { timeZone: TZ, ...opts }));
  return cache.get(key);
}
const asDate = (v) => (typeof v === 'string' && v.length === 10 ? riyadhInstant(v, 12) : new Date(v));

/** Hijri (Umm al-Qura) date, e.g. "17 ربيع الآخر 1448". Latin digits for consistency with the rest of the UI. */
export function hijri(v, locale = 'ar', opts = { day: 'numeric', month: 'long', year: 'numeric' }) {
  if (!v) return '';
  try {
    const loc = locale === 'ar' ? 'ar-SA-u-ca-islamic-umalqura-nu-latn' : 'en-u-ca-islamic-umalqura-nu-latn';
    return fmt(loc, opts).format(asDate(v));
  } catch { return ''; }
}

/** Gregorian date for a YYYY-MM-DD or ISO value. */
export function greg(v, locale = 'ar', opts = { day: 'numeric', month: 'short', year: 'numeric' }) {
  if (!v) return '';
  const loc = locale === 'ar' ? 'ar-SA-u-nu-latn-ca-gregory' : 'en-GB';
  return fmt(loc, opts).format(asDate(v));
}

export function weekday(v, locale = 'ar', style = 'short') {
  const loc = locale === 'ar' ? 'ar-SA-u-nu-latn-ca-gregory' : 'en-GB';
  return fmt(loc, { weekday: style }).format(asDate(v));
}

export function timeHM(v, locale = 'ar') {
  if (!v) return '';
  const loc = locale === 'ar' ? 'ar-SA-u-nu-latn-ca-gregory' : 'en-GB';
  return fmt(loc, { hour: 'numeric', minute: '2-digit' }).format(new Date(v));
}

/** Relative "in 3 days" / "منذ يومين" style label. */
export function relDays(dateStr, locale = 'ar') {
  const n = diffDays(todayYmd(), dateStr.slice(0, 10));
  try {
    return new Intl.RelativeTimeFormat(locale === 'ar' ? 'ar-u-nu-latn' : 'en', { numeric: 'auto' }).format(n, 'day');
  } catch { return String(n); }
}

export function relTime(iso, locale = 'ar') {
  const s = (new Date(iso).getTime() - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat(locale === 'ar' ? 'ar-u-nu-latn' : 'en', { numeric: 'auto' });
  const a = Math.abs(s);
  if (a < 60) return rtf.format(Math.round(s), 'second');
  if (a < 3600) return rtf.format(Math.round(s / 60), 'minute');
  if (a < 86400) return rtf.format(Math.round(s / 3600), 'hour');
  return rtf.format(Math.round(s / 86400), 'day');
}
