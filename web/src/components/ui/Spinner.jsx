// Spinner is a rotating arc (echoes the logo's cycle).
import { cx } from '../../lib/cx.js';

export default function Spinner({ size = 20, className, label }) {
  return (
    <span role="status" aria-label={label || 'loading'} className={cx('inline-block', className)}>
      <svg width={size} height={size} viewBox="0 0 24 24" className="animate-spin-cycle motion-reduce:animate-none">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="3" />
        <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function FullPageSpinner() {
  return (
    <div className="min-h-[60vh] grid place-items-center text-petrol-600">
      <Spinner size={32} />
    </div>
  );
}
