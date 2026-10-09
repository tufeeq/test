// <Card title actions padded={true} tone="white|sand|petrol">…</Card>
import { cx } from '../../lib/cx.js';

const TONES = {
  white: 'bg-white border border-sand-200/70 shadow-card',
  sand: 'bg-sand-100 border border-sand-200/60',
  petrol: 'bg-petrol-700 text-sand-50 border border-petrol-800',
};

export default function Card({ title, subtitle, actions, padded = true, tone = 'white', as: Comp = 'section', className, children, ...rest }) {
  return (
    <Comp className={cx('rounded-2xl', TONES[tone], className)} {...rest}>
      {(title || actions) && (
        <header className={cx('flex items-start justify-between gap-3', padded ? 'px-5 pt-5' : 'px-5 py-4 border-b border-sand-100')}>
          <div className="min-w-0">
            {title && <h3 className="text-lg font-semibold leading-tight">{title}</h3>}
            {subtitle && <p className={cx('text-sm mt-0.5', tone === 'petrol' ? 'text-petrol-100' : 'text-sand-600')}>{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
        </header>
      )}
      <div className={cx(padded && 'p-5', padded && (title || actions) && 'pt-4')}>{children}</div>
    </Comp>
  );
}
