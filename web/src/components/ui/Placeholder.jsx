// Temporary page body used by architect stubs. Builders: replace the whole page file, delete the import.
import { useI18n } from '../../i18n/index.jsx';
import { LogoMark } from './Logo.jsx';

export default function Placeholder({ name, owner, path }) {
  const { t } = useI18n();
  return (
    <div className="max-w-xl mx-auto my-16 rounded-2xl border border-dashed border-sand-300 bg-white p-8 text-center">
      <LogoMark size={40} className="mx-auto mb-4" />
      <h1 className="text-xl font-semibold text-ink">{name}</h1>
      <p className="text-sand-600 mt-1">{t('common.comingSoon')}</p>
      <p className="mt-4 text-xs text-sand-500 ltr-nums">{owner} · {path}</p>
    </div>
  );
}
