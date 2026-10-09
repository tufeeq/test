// <Button variant="primary|cta|secondary|ghost|danger" size="sm|md|lg" loading icon={<svg/>} as={Link} to="/x">
// 'cta' = saffron, use for the ONE main action per screen. 'primary' = petrol.
import { forwardRef } from 'react';
import { cx } from '../../lib/cx.js';
import Spinner from './Spinner.jsx';

const VARIANTS = {
  primary: 'bg-petrol-600 text-white hover:bg-petrol-700 active:bg-petrol-800',
  cta: 'bg-saffron-400 text-petrol-900 hover:bg-saffron-300 active:bg-saffron-500 font-semibold',
  secondary: 'bg-white text-petrol-700 border border-sand-200 hover:border-petrol-300 hover:bg-petrol-50',
  ghost: 'bg-transparent text-petrol-700 hover:bg-petrol-50',
  danger: 'bg-danger-500 text-white hover:bg-danger-600',
};
const SIZES = {
  sm: 'h-8 px-3 text-sm gap-1.5 rounded-lg',
  md: 'h-10 px-4 text-base gap-2 rounded-xl',
  lg: 'h-12 px-6 text-lg gap-2 rounded-xl',
};

const Button = forwardRef(function Button(
  { as: Comp = 'button', variant = 'primary', size = 'md', loading = false, icon, block, className, children, disabled, type, ...rest },
  ref
) {
  return (
    <Comp
      ref={ref}
      type={Comp === 'button' ? type || 'button' : undefined}
      disabled={Comp === 'button' ? disabled || loading : undefined}
      aria-busy={loading || undefined}
      className={cx(
        'inline-flex items-center justify-center font-medium whitespace-nowrap transition-colors',
        'focus-visible:outline-none focus-visible:shadow-ring disabled:opacity-50 disabled:pointer-events-none',
        VARIANTS[variant], SIZES[size], block && 'w-full', className
      )}
      {...rest}
    >
      {loading ? <Spinner size={16} /> : icon}
      {children}
    </Comp>
  );
});
export default Button;
