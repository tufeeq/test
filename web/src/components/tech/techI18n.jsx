// OWNER: B4. Technician-only language layer on top of the shared i18n.
// The shared provider knows ar/en. Many technicians read Urdu or Hindi better, so the tech PWA adds them:
//   - ar/en: pass straight through to the shared provider.
//   - ur/hi: shared base locale is 'en' (Latin digits, en number/date formats); tech.* keys and a few shared
//     keys (status.*, common.*) come from tech.ur.json / tech.hi.json (`_shared` block); anything missing falls
//     back to English. Urdu is RTL, Hindi LTR — we set `dir` on the tech shell element, not on <html>.
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useI18n } from '../../i18n/index.jsx';
import { lsGet, lsSet } from './storage.js';
import ur from '../../i18n/ns/tech.ur.json';
import hi from '../../i18n/ns/tech.hi.json';

export const TECH_LANGS = [
  { code: 'ar', label: 'العربية', dir: 'rtl', base: 'ar' },
  { code: 'en', label: 'English', dir: 'ltr', base: 'en' },
  { code: 'ur', label: 'اردو', dir: 'rtl', base: 'en' },
  { code: 'hi', label: 'हिन्दी', dir: 'ltr', base: 'en' },
];
const EXTRA = { ur, hi };
const KEY = 'dawra_tech_lang';
const lookup = (dict, key) => key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), dict);
const fill = (s, vars) => (vars ? s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? `{${k}}`)) : s);

const Ctx = createContext(null);

export function TechI18nProvider({ children }) {
  const base = useI18n();
  const [stored, setStored] = useState(() => lsGet(KEY, null));
  // A stored ur/hi only applies while the shared locale is its base ('en'); an explicit switch to ar elsewhere wins.
  const lang = stored && EXTRA[stored] && base.locale === 'en' ? stored : base.locale;
  const meta = TECH_LANGS.find((l) => l.code === lang) || TECH_LANGS[0];

  const setLang = useCallback((code) => {
    const m = TECH_LANGS.find((l) => l.code === code);
    if (!m) return;
    lsSet(KEY, code);
    setStored(code);
    base.setLocale(m.base);
  }, [base]);

  const value = useMemo(() => {
    const dict = EXTRA[lang];
    const t = !dict ? base.t : (key, vars) => {
      const s = key.startsWith('tech.') ? lookup(dict, key.slice(5)) : lookup(dict._shared || {}, key);
      return typeof s === 'string' ? fill(s, vars) : base.t(key, vars);
    };
    const fmtMoney = !dict ? base.fmtMoney : (n) => {
      const amount = new Intl.NumberFormat('en-SA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(n || 0));
      return fill(lookup(dict, '_shared.common.currency') || '{amount} SAR', { amount });
    };
    return { ...base, t, fmtMoney, lang, dir: meta.dir, setLang };
  }, [base, lang, meta.dir, setLang]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Same API as useI18n() plus { lang, setLang }. Falls back to the shared i18n outside the tech shell. */
export function useTechI18n() {
  const ctx = useContext(Ctx);
  const base = useI18n();
  return ctx || { ...base, lang: base.locale, setLang: (l) => base.setLocale(l === 'ar' ? 'ar' : 'en') };
}
