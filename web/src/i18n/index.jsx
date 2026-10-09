// i18n — default Arabic, RTL. Owner: architect.
// Dictionaries:
//   ar.json / en.json            → shared keys (architect only): t('common.save'), t('status.completed')
//   ns/<area>.<lang>.json        → per-builder namespaces, accessed as t('<area>.key.path')
//       app → B3, tech + public → B4, marketing → B5.  Edit ONLY your own namespace files.
// API: const { t, locale, dir, setLocale, fmtMoney, fmtDate, fmtDateTime, fmtTime } = useI18n();
//      t('common.currency', { amount: 150 }) → "150 ر.س"
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import ar from './ar.json';
import en from './en.json';
import appAr from './ns/app.ar.json';
import appEn from './ns/app.en.json';
import techAr from './ns/tech.ar.json';
import techEn from './ns/tech.en.json';
import publicAr from './ns/public.ar.json';
import publicEn from './ns/public.en.json';
import marketingAr from './ns/marketing.ar.json';
import marketingEn from './ns/marketing.en.json';

const DICTS = {
  ar: { ...ar, app: appAr, tech: techAr, public: publicAr, marketing: marketingAr },
  en: { ...en, app: appEn, tech: techEn, public: publicEn, marketing: marketingEn },
};
const STORAGE_KEY = 'dawra_locale';

const lookup = (dict, key) => key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), dict);

function initialLocale() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'ar' || saved === 'en') return saved;
  } catch { /* storage blocked */ }
  return 'ar';
}

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(initialLocale);
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const setLocale = useCallback((l) => {
    setLocaleState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch { /* ignore */ }
  }, []);

  const value = useMemo(() => {
    const t = (key, vars) => {
      let s = lookup(DICTS[locale], key);
      if (s === undefined) s = lookup(DICTS.ar, key); // fall back to Arabic
      if (typeof s !== 'string') return key;          // show the key so missing strings are obvious
      if (vars) s = s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? `{${k}}`));
      return s;
    };
    // Latin digits in both languages (common in Saudi business software, avoids mixed-digit invoices).
    const nf = new Intl.NumberFormat(locale === 'ar' ? 'ar-SA-u-nu-latn' : 'en-SA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const fmtMoney = (n) => t('common.currency', { amount: nf.format(Number(n || 0)) });
    const loc = locale === 'ar' ? 'ar-SA-u-nu-latn-ca-gregory' : 'en-GB';
    const tz = 'Asia/Riyadh';
    const fmtDate = (d) => (d ? new Intl.DateTimeFormat(loc, { day: 'numeric', month: 'short', year: 'numeric', timeZone: tz }).format(new Date(d)) : '');
    const fmtTime = (d) => (d ? new Intl.DateTimeFormat(loc, { hour: 'numeric', minute: '2-digit', timeZone: tz }).format(new Date(d)) : '');
    const fmtDateTime = (d) => (d ? `${fmtDate(d)} · ${fmtTime(d)}` : '');
    return { t, locale, dir, setLocale, toggleLocale: () => setLocale(locale === 'ar' ? 'en' : 'ar'), fmtMoney, fmtDate, fmtTime, fmtDateTime };
  }, [locale, dir, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}
