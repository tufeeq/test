// <EmptyState title="لا توجد طلبات بعد" body="أضف أول طلب صيانة…" action={<Button/>} />
import { cx } from '../../lib/cx.js';

export default function EmptyState({ icon, title, body, action, className }) {
  return (
    <div className={cx('flex flex-col items-center text-center px-6 py-12 gap-3', className)}>
      <div className="h-14 w-14 rounded-full bg-sand-100 grid place-items-center text-petrol-500">
        {icon || (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M19 8a8 8 0 1 0 1 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M20 3v5h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        )}
      </div>
      {title && <h3 className="text-lg font-semibold text-ink">{title}</h3>}
      {body && <p className="text-sand-600 max-w-sm">{body}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
