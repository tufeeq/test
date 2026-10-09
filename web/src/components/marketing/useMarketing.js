// Marketing helpers (B5). The marketing namespace has arrays (FAQ, steps…), which t() can't return,
// so marketing components read the dictionary directly through useM().
import { useEffect } from 'react';
import { useI18n } from '../../i18n/index.jsx';
import mAr from '../../i18n/ns/marketing.ar.json';
import mEn from '../../i18n/ns/marketing.en.json';

export const DEMO_EMAIL = 'demo@dawra.app';
export const DEMO_PASSWORD = 'Demo1234!';

export function useM() {
  const { locale } = useI18n();
  return locale === 'en' ? mEn : mAr;
}

/** "{n} technicians" → fill('{n} technicians', { n: 3 }) */
export const fill = (s, vars = {}) => String(s).replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? `{${k}}`));

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Per-page <title>, description and Open Graph tags (client-side; crawlers that run JS pick them up). */
export function useSeo(title, description) {
  const { locale } = useI18n();
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:locale', locale === 'en' ? 'en_US' : 'ar_SA');
    setMeta('property', 'og:url', window.location.origin + window.location.pathname);
    setMeta('name', 'twitter:card', 'summary_large_image');
  }, [title, description, locale]);
}

/** Whole days from today (Riyadh) to a YYYY-MM-DD date. */
export function daysUntil(ymd) {
  const target = Date.parse(`${ymd}T00:00:00+03:00`);
  return Math.max(0, Math.ceil((target - Date.now()) / 86400000));
}
