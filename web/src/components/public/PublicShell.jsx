// OWNER: B4. Shell for customer-facing pages: the contractor's identity first, Dawra small in the footer (growth loop).
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/index.jsx';
import { LogoMark, LangToggle, Spinner } from '../ui/index.js';
import { cx } from '../../lib/cx.js';

export function CompanyMark({ company, size = 48, className }) {
  const name = company?.name_ar || company?.name || '';
  if (company?.logo_url) {
    return <img src={company.logo_url} alt="" width={size} height={size}
      className={cx('rounded-2xl object-contain bg-white border border-sand-200', className)} style={{ width: size, height: size }} />;
  }
  const initial = name.replace(/^(مؤسسة|شركة|مجموعة)\s+/, '').replace(/^ال/, '').trim().charAt(0) || '•';
  return (
    <span aria-hidden="true" className={cx('rounded-2xl bg-petrol-700 text-sand-50 grid place-items-center font-bold shrink-0', className)}
      style={{ width: size, height: size, fontSize: size * 0.46 }}>{initial}</span>
  );
}

export function companyName(company, locale) {
  if (!company) return '';
  return locale === 'ar' ? company.name_ar || company.name : company.name || company.name_ar;
}

export default function PublicShell({ company, children, loading, wide = false }) {
  const { t, locale } = useI18n();
  return (
    <div className="min-h-dvh flex flex-col bg-sand-50 text-ink">
      <header className="bg-white border-b border-sand-200/80">
        <div className={cx('mx-auto px-4 h-16 flex items-center justify-between gap-3', wide ? 'max-w-2xl' : 'max-w-lg')}>
          {company ? (
            <div className="flex items-center gap-3 min-w-0">
              <CompanyMark company={company} size={40} />
              <span className="font-bold text-lg leading-tight truncate">{companyName(company, locale)}</span>
            </div>
          ) : <span />}
          <LangToggle />
        </div>
      </header>
      <main className={cx('flex-1 w-full mx-auto px-4 py-6', wide ? 'max-w-2xl' : 'max-w-lg')}>
        {loading ? <div className="py-24 grid place-items-center text-petrol-600"><Spinner size={32} /></div> : children}
      </main>
      <footer className="py-6 print:hidden">
        <Link to="/" className="mx-auto w-fit flex items-center gap-1.5 text-sm text-sand-600 hover:text-petrol-700 rounded-lg px-2 py-1">
          <LogoMark size={18} />{t('public.poweredBy')}
        </Link>
      </footer>
    </div>
  );
}

export function PublicMessage({ title, children }) {
  return (
    <div className="rounded-2xl bg-white border border-sand-200 px-6 py-10 text-center flex flex-col items-center gap-3">
      <LogoMark size={40} />
      <p className="text-lg font-semibold">{title}</p>
      {children}
    </div>
  );
}
