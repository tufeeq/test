import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/index.jsx';
import { Button, LogoMark } from '../components/ui/index.js';

export default function NotFound() {
  const { t } = useI18n();
  return (
    <div className="min-h-dvh grid place-items-center px-4 text-center">
      <div className="flex flex-col items-center gap-4">
        <LogoMark size={56} />
        <h1 className="text-3xl font-bold">{t('common.notFound')}</h1>
        <Button as={Link} to="/" variant="secondary">{t('common.goHome')}</Button>
      </div>
    </div>
  );
}
