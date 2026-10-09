// OWNER: B4. Small helpers for public pages.

/** 05XXXXXXXX / 5XXXXXXXX / +9665… / 009665… (Arabic-Indic digits ok) → '9665XXXXXXXX' or null. Mirrors server saudiMobile(). */
export function normalizeSaudiMobile(input) {
  let d = String(input || '').replace(/[٠-٩]/g, (c) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(c))).replace(/[^\d]/g, '');
  if (d.startsWith('00')) d = d.slice(2);
  if (d.startsWith('05') && d.length === 10) d = `966${d.slice(1)}`;
  if (d.startsWith('5') && d.length === 9) d = `966${d}`;
  return /^9665\d{8}$/.test(d) ? d : null;
}

export const telHref = (p) => `tel:+${String(p || '').replace(/[^\d]/g, '')}`;
export const waHref = (p, text) => `https://wa.me/${String(p || '').replace(/[^\d]/g, '')}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const riyadhToday = () => new Date(Date.now() + 3 * 3600e3).toISOString().slice(0, 10);
export function addDays(ymd, n) {
  const d = new Date(`${ymd}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** Display 9665XXXXXXXX as 05X XXX XXXX */
export function displayPhone(p) {
  const d = String(p || '').replace(/[^\d]/g, '');
  if (/^9665\d{8}$/.test(d)) { const l = `0${d.slice(3)}`; return `${l.slice(0, 3)} ${l.slice(3, 6)} ${l.slice(6)}`; }
  return p || '';
}
