import { forwardRef } from 'react';
import Field, { controlClass } from './Field.jsx';
import { cx } from '../../lib/cx.js';

const Textarea = forwardRef(function Textarea({ label, hint, error, required, className, rows = 4, ...rest }, ref) {
  return (
    <Field label={label} hint={hint} error={error} required={required} className={className}>
      {(id) => <textarea ref={ref} id={id} rows={rows} required={required} aria-invalid={!!error} className={cx(controlClass(error), 'py-2.5 leading-relaxed')} {...rest} />}
    </Field>
  );
});
export default Textarea;
