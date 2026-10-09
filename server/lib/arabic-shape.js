// OWNER: B2. Minimal bidi layout for pdfkit.
// Glyph shaping (initial/medial/final forms, lam-alef ligatures) is done by fontkit (bundled with pdfkit)
// via the font's GSUB table — verified with IBM Plex Sans Arabic. What pdfkit gets wrong is *ordering*:
// it lays a whole line out as a single run, so mixed Arabic/Latin lines come out reversed and spaces vanish.
// Here we resolve a simplified Unicode bidi order per word and draw each token separately, right to left.
//
//   visualTokens(text, baseDir='rtl') → [{ text, space }]   (left-to-right drawing order)
//   measure(doc, text) → width in current font/size
//   draw(doc, text, x, y, { width, align: 'right'|'left'|'center' }) → width drawn
//   wrap(doc, text, width) → string[] (logical lines)
//   hasArabic(text) → boolean
const AR_RE = /[؀-ٟ٪-ۯۺ-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/;
const L_RE = /[A-Za-z0-9٠-٩۰-۹À-ɏͰ-ϿЀ-ӿ]/;
const MIRROR = { '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<', '«': '»', '»': '«' };

export const hasArabic = (s) => AR_RE.test(String(s || ''));

const charType = (ch) => (AR_RE.test(ch) ? 'R' : L_RE.test(ch) ? 'L' : 'N');

/** Split a word into maximal runs of R / L / N characters. */
function segments(word) {
  const out = [];
  for (const ch of word) {
    const t = charType(ch);
    const last = out[out.length - 1];
    if (last && last.t === t) last.s += ch;
    else out.push({ t, s: ch });
  }
  // Glue neutrals that sit between two L runs (e.g. "12.5", "A/C", "2026-10-09") into the L run.
  for (let i = 1; i < out.length - 1; i++) {
    if (out[i].t === 'N' && out[i - 1].t === 'L' && out[i + 1].t === 'L') {
      out[i - 1].s += out[i].s + out[i + 1].s;
      out.splice(i, 2);
      i--;
    }
  }
  return out;
}

function wordDir(word) {
  if (AR_RE.test(word)) return 'R';
  if (L_RE.test(word)) return 'L';
  return 'N';
}

const mirror = (s) => [...s].map((c) => MIRROR[c] || c).join('');

/** Visual (left→right) tokens for one line. */
export function visualTokens(text, baseDir = 'rtl') {
  const words = String(text ?? '').split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const dirs = words.map(wordDir);
  const base = baseDir === 'rtl' ? 'R' : 'L';
  // resolve neutral words: take the neighbours' direction when both agree, else the base direction
  const resolved = dirs.map((d, i) => {
    if (d !== 'N') return d;
    let p = null; let n = null;
    for (let j = i - 1; j >= 0; j--) if (dirs[j] !== 'N') { p = dirs[j]; break; }
    for (let j = i + 1; j < dirs.length; j++) if (dirs[j] !== 'N') { n = dirs[j]; break; }
    return p && p === n ? p : base;
  });
  // group consecutive same-direction words
  const groups = [];
  words.forEach((w, i) => {
    const g = groups[groups.length - 1];
    if (g && g.d === resolved[i]) g.words.push(w);
    else groups.push({ d: resolved[i], words: [w] });
  });
  const ordered = base === 'R' ? groups.reverse() : groups;
  const tokens = [];
  for (const g of ordered) {
    const ws = g.d === 'R' ? [...g.words].reverse() : g.words;
    for (const w of ws) {
      if (g.d === 'R') {
        // inside an RTL word the segments run right→left; neutrals are mirrored
        const segs = segments(w).reverse();
        segs.forEach((s, k) => tokens.push({ text: s.t === 'N' ? mirror(s.s) : s.s, space: false, last: k === segs.length - 1 }));
      } else {
        tokens.push({ text: w, space: false, last: true });
      }
      tokens[tokens.length - 1].space = true;
    }
  }
  if (tokens.length) tokens[tokens.length - 1].space = false;
  return tokens.map(({ text: t, space }) => ({ text: t, space }));
}

export function measure(doc, text, baseDir) {
  const dir = baseDir || (hasArabic(text) ? 'rtl' : 'ltr');
  const sp = doc.widthOfString(' ');
  return visualTokens(text, dir).reduce((w, t) => w + doc.widthOfString(t.text) + (t.space ? sp : 0), 0);
}

/** Draw a single line. x is the left edge of the box; align within `width`. Returns drawn width. */
export function draw(doc, text, x, y, { width = null, align = null, dir = null } = {}) {
  const base = dir || (hasArabic(text) ? 'rtl' : 'ltr');
  const tokens = visualTokens(text, base);
  const sp = doc.widthOfString(' ');
  const widths = tokens.map((t) => doc.widthOfString(t.text));
  const total = widths.reduce((a, b) => a + b, 0) + tokens.filter((t) => t.space).length * sp;
  const al = align || (base === 'rtl' ? 'right' : 'left');
  let cx = x;
  if (width !== null) {
    if (al === 'right') cx = x + width - total;
    else if (al === 'center') cx = x + (width - total) / 2;
  }
  tokens.forEach((t, i) => {
    doc.text(t.text, cx, y, { lineBreak: false });
    cx += widths[i] + (t.space ? sp : 0);
  });
  return total;
}

/** Greedy word wrap on logical order; each returned line is then drawn with draw(). */
export function wrap(doc, text, width) {
  const out = [];
  for (const para of String(text ?? '').split(/\n/)) {
    const words = para.split(/\s+/).filter(Boolean);
    let line = '';
    for (const w of words) {
      const cand = line ? `${line} ${w}` : w;
      if (!line || measure(doc, cand) <= width) line = cand;
      else { out.push(line); line = w; }
    }
    out.push(line);
  }
  return out;
}
