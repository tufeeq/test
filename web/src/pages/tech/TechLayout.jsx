// OWNER: B4. Mobile shell for the technician PWA (/tech/*): petrol top bar, offline/sync banner, bottom tab bar.
// Built for one hand in bright sun: 64px tab bar, high-contrast text, big hit areas.
import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Logo } from '../../components/ui/index.js';
import { cx } from '../../lib/cx.js';
import { useAuth } from '../../lib/auth.jsx';
import { TechI18nProvider, useTechI18n } from '../../components/tech/techI18n.jsx';
import { useOfflineQueue, flush, clearLastError } from '../../components/tech/offlineQueue.js';
import { registerSW } from '../../components/tech/registerSW.js';
import { IconList, IconUser, IconCloudOff, IconRefresh } from '../../components/tech/icons.jsx';

export default function TechLayout() {
  return (
    <TechI18nProvider>
      <Shell />
    </TechI18nProvider>
  );
}

function Shell() {
  const { t, lang, dir } = useTechI18n();
  const { user } = useAuth();
  const q = useOfflineQueue();

  useEffect(() => { registerSW(); }, []);

  // Urdu is RTL on an 'en' base: push lang/dir to <html> after the shared provider's own effect has run.
  useEffect(() => {
    const id = setTimeout(() => {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
    }, 0);
    return () => clearTimeout(id);
  }, [lang, dir]);
  // Leaving /tech: hand <html> lang/dir back to the shared locale (Urdu is RTL on an 'en' base).
  const { locale } = useTechI18n();
  useEffect(() => () => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  const tab = ({ isActive }) => cx(
    'flex-1 flex flex-col items-center justify-center gap-0.5 min-h-[64px] text-sm font-semibold transition-colors',
    isActive ? 'text-petrol-700' : 'text-sand-600'
  );
  const marker = (isActive) => (
    <span className={cx('h-1 w-10 rounded-full mb-1', isActive ? 'bg-petrol-600' : 'bg-transparent')} aria-hidden="true" />
  );

  return (
    <div dir={dir} lang={lang} className="min-h-dvh flex flex-col bg-sand-50 text-ink">
      <header className="sticky top-0 z-30 bg-petrol-700 text-sand-50 pt-[env(safe-area-inset-top)]">
        <div className="h-14 px-4 flex items-center justify-between gap-3 max-w-xl mx-auto w-full">
          <Logo tone="light" size={26} />
          {user && <span className="text-sm text-petrol-100 truncate">{user.name}</span>}
        </div>
        <SyncBanner q={q} t={t} />
      </header>

      <main className="flex-1 w-full max-w-xl mx-auto px-4 pt-4 pb-[calc(88px+env(safe-area-inset-bottom))]">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 inset-x-0 z-30 bg-white border-t border-sand-200 pb-[env(safe-area-inset-bottom)]">
        <div className="flex max-w-xl mx-auto">
          <NavLink to="/tech" end className={tab}>
            {({ isActive }) => (<>{marker(isActive)}<IconList size={24} />{t('tech.nav.today')}</>)}
          </NavLink>
          <NavLink to="/tech/me" className={tab}>
            {({ isActive }) => (<>{marker(isActive)}<IconUser size={24} />{t('tech.nav.me')}</>)}
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

function SyncBanner({ q, t }) {
  if (q.lastError) {
    return (
      <div role="alert" className="bg-danger-600 text-white px-4 py-2.5 text-sm flex items-center gap-3">
        <span className="flex-1">{t('tech.net.rejected', { label: q.lastError.label || q.lastError.message })}</span>
        <button onClick={clearLastError} className="font-semibold underline underline-offset-2 min-h-[36px]">{t('tech.net.dismiss')}</button>
      </div>
    );
  }
  if (!q.online) {
    return (
      <div role="status" className="bg-ink text-sand-50 px-4 py-2.5 text-sm flex items-start gap-2.5">
        <IconCloudOff size={18} className="shrink-0 mt-0.5 text-saffron-300" />
        <span className="flex-1">
          {t('tech.net.offline')}
          {q.pending > 0 && <strong className="block font-semibold text-saffron-200">{t('tech.net.pending', { n: q.pending })}</strong>}
        </span>
      </div>
    );
  }
  if (q.pending > 0) {
    return (
      <div role="status" className="bg-saffron-100 text-petrol-900 px-4 py-2 text-sm flex items-center gap-3">
        <span className="flex-1 font-medium">{q.flushing ? t('tech.net.syncing') : t('tech.net.pending', { n: q.pending })}</span>
        <button onClick={() => flush()} disabled={q.flushing}
          className="inline-flex items-center gap-1.5 font-semibold min-h-[36px] px-2 rounded-lg disabled:opacity-60">
          <IconRefresh size={16} className={q.flushing ? 'animate-spin-cycle' : ''} />{t('tech.net.syncNow')}
        </button>
      </div>
    );
  }
  return null;
}
