// <Stat label="إيراد الشهر" value="12,450 ر.س" delta="+12%" trend="up|down|flat" hint="مقارنة بالشهر الماضي" />
import { cx } from '../../lib/cx.js';

export default function Stat({ label, value, delta, trend = 'flat', hint, className }) {
  return (
    <div className={cx('rounded-2xl bg-white border border-sand-200/70 shadow-card p-5 flex flex-col gap-1', className)}>
      <span className="text-sm text-sand-600">{label}</span>
      <span className="text-3xl font-semibold text-petrol-800 tabular-nums leading-tight">{value}</span>
      {(delta || hint) && (
        <span className="text-sm flex items-center gap-2">
          {delta && <span className={cx('font-medium tabular-nums', trend === 'up' && 'text-success-600', trend === 'down' && 'text-danger-600', trend === 'flat' && 'text-sand-600')} dir="ltr">{delta}</span>}
          {hint && <span className="text-sand-500">{hint}</span>}
        </span>
      )}
    </div>
  );
}
