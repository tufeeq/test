// Marketing chrome (B5): sticky petrol header with language toggle, and the footer.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/index.jsx';
import { useAuth, homeFor } from '../../lib/auth.jsx';
import { Logo } from '../../components/ui/index.js';
import { cx } from '../../lib/cx.js';
import { useM, fill } from './useMarketing.js';
import { IconMenu, IconX } from './icons.jsx';

export function LangButton({ tone = 'dark', className }) {
  const { t, toggleLocale, locale } = useI18n();
  return (
    <button type="button" onClick={toggleLocale} lang={locale === 'ar' ? 'en' : 'ar'}
      className={cx('h-9 px-3 rounded-lg text-sm font-medium transition-colors',
        tone === 'dark' ? 'text-sand-100 hover:bg-petrol-700' : 'text-petrol-700 hover:bg-petrol-50', className)}>
      {t('common.language')}
    </button>
  );
}

export function Header() {
  const m = useM();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const links = [
    ['/#features', m.nav.features], ['/#how', m.nav.how], ['/pricing', m.nav.pricing], ['/#faq', m.nav.faq],
  ];
  return (
    <header className="sticky top-0 z-40 bg-petrol-800 border-b border-petrol-700/60">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 h-16 flex items-center gap-6">
        <Link to="/" className="shrink-0" onClick={() => setOpen(false)}><Logo tone="light" size={32} /></Link>
        <nav className="hidden md:flex items-center gap-1 text-sand-100">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="px-3 h-9 inline-flex items-center rounded-lg hover:bg-petrol-700 transition-colors">{label}</a>
          ))}
        </nav>
        <div className="ms-auto flex items-center gap-1.5">
          <LangButton />
          {user ? (
            <Link to={homeFor(user.role)} className="hidden sm:inline-flex h-9 px-4 items-center rounded-lg bg-sand-50 text-petrol-800 font-medium hover:bg-white">{m.nav.openApp}</Link>
          ) : (
            <>
              <Link to="/login" className="hidden sm:inline-flex h-9 px-3 items-center rounded-lg text-sand-100 hover:bg-petrol-700">{m.nav.login}</Link>
              <Link to="/signup" className="hidden sm:inline-flex h-9 px-4 items-center rounded-lg bg-sand-50 text-petrol-800 font-medium hover:bg-white">{m.nav.start}</Link>
            </>
          )}
          <button type="button" className="md:hidden h-9 w-9 grid place-items-center rounded-lg text-sand-50 hover:bg-petrol-700"
            aria-expanded={open} aria-label={m.nav.menu} onClick={() => setOpen((o) => !o)}>
            {open ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="md:hidden border-t border-petrol-700 px-4 py-3 flex flex-col gap-1 text-sand-50">
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="h-11 px-3 flex items-center rounded-lg hover:bg-petrol-700">{label}</a>
          ))}
          <div className="grid grid-cols-2 gap-2 pt-2">
            {user ? (
              <Link to={homeFor(user.role)} className="col-span-2 h-11 grid place-items-center rounded-xl bg-sand-50 text-petrol-800 font-medium">{m.nav.openApp}</Link>
            ) : (
              <>
                <Link to="/login" className="h-11 grid place-items-center rounded-xl border border-petrol-500 text-sand-50">{m.nav.login}</Link>
                <Link to="/signup" className="h-11 grid place-items-center rounded-xl bg-sand-50 text-petrol-800 font-medium">{m.nav.start}</Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  const m = useM();
  const year = new Date().getFullYear();
  return (
    <footer className="bg-petrol-950 text-petrol-100">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-12 grid gap-10 sm:grid-cols-[2fr_1fr_1fr]">
        <div className="max-w-xs">
          <Logo tone="light" size={30} />
          <p className="mt-4 text-sm leading-6 text-petrol-200">{m.footer.tagline}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-sand-50 mb-3">{m.footer.product}</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/#features" className="hover:text-sand-50">{m.nav.features}</a></li>
            <li><Link to="/pricing" className="hover:text-sand-50">{m.nav.pricing}</Link></li>
            <li><a href="/#faq" className="hover:text-sand-50">{m.nav.faq}</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-sand-50 mb-3">{m.footer.company}</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/login" className="hover:text-sand-50">{m.nav.login}</Link></li>
            <li><Link to="/signup" className="hover:text-sand-50">{m.nav.start}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-petrol-900">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-5 flex flex-wrap gap-2 justify-between text-xs text-petrol-300">
          <span>{fill(m.footer.rights, { year })}</span>
          <span>{m.footer.made}</span>
        </div>
      </div>
    </footer>
  );
}

export default function MarketingShell({ children }) {
  return (
    <div className="min-h-dvh flex flex-col bg-sand-50 text-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:start-2 focus:z-50 focus:bg-white focus:px-3 focus:py-2 focus:rounded-lg">Skip</a>
      <Header />
      <main id="main" className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
