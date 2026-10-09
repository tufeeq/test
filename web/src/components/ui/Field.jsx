// Shared label/hint/error wrapper used by Input, Select, Textarea.
import { useId } from 'react';
import { cx } from '../../lib/cx.js';

export const controlClass = (error) => cx(
  'w-full rounded-xl border bg-white px-3.5 text-base text-ink placeholder:text-sand-400',
  'transition-colors focus:outline-none focus:border-petrol-500 focus:ring-2 focus:ring-petrol-100',
  'disabled:bg-sand-100 disabled:text-sand-500',
  error ? 'border-danger-500' : 'border-sand-200 hover:border-sand-300'
);

export default function Field({ label, hint, error, required, className, children }) {
  const id = useId();
  return (
    <div className={cx('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-sand-800">
          {label}{required && <span className="text-danger-500 ms-0.5">*</span>}
        </label>
      )}
      {children(id)}
      {error ? <p className="text-sm text-danger-600">{error}</p> : hint ? <p className="text-sm text-sand-500">{hint}</p> : null}
    </div>
  );
}
