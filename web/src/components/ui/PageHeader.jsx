// <PageHeader title="الطلبات" subtitle="30 طلب" back="/app/jobs" actions={<Button/>} />
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/index.jsx';

export default function PageHeader({ title, subtitle, back, actions, children }) {
  const { t } = useI18n();
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
      <div className="min-w-0">
        {back && (
          <Link to={back} className="inline-flex items-center gap-1 text-sm text-petrol-600 hover:text-petrol-800 mb-2">
            <svg width="14" height="14" viewBox="0 0 16 16" className="rtl:rotate-180"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" /></svg>
            {t('common.back')}
          </Link>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold text-ink leading-tight">{title}</h1>
        {subtitle && <p className="text-sand-600 mt-1">{subtitle}</p>}
        {children}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
