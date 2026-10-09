import { useI18n } from '../../i18n/index.jsx';
import { cx } from '../../lib/cx.js';

export default function LangToggle({ className }) {
  const { t, toggleLocale } = useI18n();
  return (
    <button onClick={toggleLocale} className={cx('text-sm font-medium px-2.5 h-8 rounded-lg hover:bg-petrol-50 text-petrol-700', className)}>
      {t('common.language')}
    </button>
  );
}
