// <Modal open onClose title footer={<Button/>} size="sm|md|lg">…</Modal>
// Bottom sheet on mobile, centered dialog ≥sm. Esc + backdrop close. Focus moves into dialog.
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../lib/cx.js';
import { useI18n } from '../../i18n/index.jsx';

const SIZES = { sm: 'sm:max-w-md', md: 'sm:max-w-lg', lg: 'sm:max-w-2xl', xl: 'sm:max-w-4xl' };

export default function Modal({ open, onClose, title, footer, size = 'md', children }) {
  const ref = useRef(null);
  const { t } = useI18n();
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.focus();
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [open, onClose]);
  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-petrol-950/40 backdrop-blur-[2px]" onClick={onClose} />
      <div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={typeof title === 'string' ? title : undefined}
        className={cx('relative w-full bg-white shadow-lift outline-none flex flex-col max-h-[92vh]',
          'rounded-t-3xl sm:rounded-2xl sm:m-4', SIZES[size])}>
        <header className="flex items-center justify-between gap-4 px-5 py-4 border-b border-sand-100">
          <h2 className="text-lg font-semibold text-ink">{title}</h2>
          <button onClick={onClose} aria-label={t('common.close')}
            className="h-8 w-8 grid place-items-center rounded-lg text-sand-500 hover:bg-sand-100 hover:text-ink">
            <svg width="16" height="16" viewBox="0 0 16 16"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </button>
        </header>
        <div className="px-5 py-4 overflow-y-auto">{children}</div>
        {footer && <footer className="px-5 py-4 border-t border-sand-100 flex items-center justify-end gap-2">{footer}</footer>}
      </div>
    </div>,
    document.body
  );
}
