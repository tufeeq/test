// <Input label="الاسم" value onChange error hint required dir="ltr" /> — pass dir="ltr" for phone/email/numbers.
import { forwardRef } from 'react';
import Field, { controlClass } from './Field.jsx';
import { cx } from '../../lib/cx.js';

const Input = forwardRef(function Input({ label, hint, error, required, className, inputClassName, ...rest }, ref) {
  return (
    <Field label={label} hint={hint} error={error} required={required} className={className}>
      {(id) => <input ref={ref} id={id} required={required} aria-invalid={!!error} className={cx(controlClass(error), 'h-10', inputClassName)} {...rest} />}
    </Field>
  );
});
export default Input;
