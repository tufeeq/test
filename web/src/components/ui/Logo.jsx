// Dawra logo: a circular arrow ("دورة" = cycle/round/visit) wrapped around a petrol disc + wordmark.
// <Logo /> full lockup · <Logo mark /> icon only · tone="light" for dark backgrounds.
import { useI18n } from '../../i18n/index.jsx';
import { cx } from '../../lib/cx.js';

export function LogoMark({ size = 36, tone = 'dark', className }) {
  const disc = tone === 'light' ? '#F5F0E6' : '#0F5C5C';
  const ring = '#F0AC1C';
  const dot = tone === 'light' ? '#0F5C5C' : '#F5F0E6';
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <circle cx="24" cy="24" r="17" fill={disc} />
      {/* 300° arc — the visit cycle — ending in an arrowhead */}
      <path d="M38.2 15.5 A17 17 0 1 0 41 26" fill="none" stroke={ring} strokeWidth="4.2" strokeLinecap="round" />
      <path d="M33.6 10.4 L41.6 13.6 L37.1 20.6 Z" fill={ring} />
      <circle cx="24" cy="24" r="4.2" fill={dot} />
    </svg>
  );
}

export default function Logo({ mark = false, size = 36, tone = 'dark', className }) {
  const { locale } = useI18n();
  if (mark) return <LogoMark size={size} tone={tone} className={className} />;
  return (
    <span className={cx('inline-flex items-center gap-2 select-none', className)} aria-label="Dawra دورة">
      <LogoMark size={size} tone={tone} />
      <span className={cx('font-bold tracking-tight leading-none', tone === 'light' ? 'text-sand-50' : 'text-petrol-700')}
        style={{ fontSize: size * 0.72 }}>
        {locale === 'ar' ? 'دورة' : 'Dawra'}
      </span>
    </span>
  );
}
