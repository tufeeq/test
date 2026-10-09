// <Select label options={[{value,label}]} placeholder="اختر…" value onChange />  (children <option>s also allowed)
import { forwardRef } from 'react';
import Field, { controlClass } from './Field.jsx';
import { cx } from '../../lib/cx.js';

const Select = forwardRef(function Select({ label, hint, error, required, className, options, placeholder, children, ...rest }, ref) {
  return (
    <Field label={label} hint={hint} error={error} required={required} className={className}>
      {(id) => (
        <select ref={ref} id={id} required={required} aria-invalid={!!error} className={cx(controlClass(error), 'h-10 pe-8')} {...rest}>
          {placeholder !== undefined && <option value="">{placeholder}</option>}
          {options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          {children}
        </select>
      )}
    </Field>
  );
});
export default Select;
