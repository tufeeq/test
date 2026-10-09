// OWNER: B4. Map / Call / WhatsApp — three equal, thumb-sized buttons.
import { mapsUrl, telUrl, waUrl } from './media.js';
import { IconMap, IconPhone, IconWhatsApp } from './icons.jsx';
import { useTechI18n } from './techI18n.jsx';
import { cx } from '../../lib/cx.js';

export default function ContactBar({ site, phone, waText, className, compact = false }) {
  const { t } = useTechI18n();
  const map = mapsUrl(site);
  const btn = cx(
    'flex-1 inline-flex items-center justify-center gap-2 rounded-xl font-semibold border transition-colors',
    compact ? 'min-h-[48px] text-sm' : 'min-h-[56px] text-base'
  );
  const stop = (e) => e.stopPropagation();
  return (
    <div className={cx('flex gap-2', className)}>
      {map ? (
        <a href={map} target="_blank" rel="noopener noreferrer" onClick={stop}
          className={cx(btn, 'bg-petrol-600 text-white border-petrol-600 active:bg-petrol-800')}>
          <IconMap size={20} />{t('tech.contact.map')}
        </a>
      ) : (
        <span className={cx(btn, 'bg-sand-100 text-sand-500 border-sand-200')}><IconMap size={20} />{t('tech.contact.noLocation')}</span>
      )}
      {phone && (
        <a href={telUrl(phone)} onClick={stop}
          className={cx(btn, 'bg-white text-petrol-700 border-sand-300 active:bg-petrol-50')}>
          <IconPhone size={20} />{t('tech.contact.call')}
        </a>
      )}
      {phone && (
        <a href={waUrl(phone, waText)} target="_blank" rel="noopener noreferrer" onClick={stop}
          className={cx(btn, 'bg-white text-success-600 border-sand-300 active:bg-success-50')}>
          <IconWhatsApp size={20} />{t('tech.contact.whatsapp')}
        </a>
      )}
    </div>
  );
}
