// <Badge tone="petrol|sand|saffron|success|danger|info">…</Badge>
// <StatusBadge status="in_progress" /> — job status pill with dot, labelled via i18n.
import { cx } from '../../lib/cx.js';
import { useI18n } from '../../i18n/index.jsx';

const TONES = {
  petrol: 'bg-petrol-50 text-petrol-700 ring-petrol-200',
  sand: 'bg-sand-100 text-sand-700 ring-sand-200',
  saffron: 'bg-saffron-50 text-saffron-700 ring-saffron-200',
  success: 'bg-success-50 text-success-600 ring-success-500/30',
  danger: 'bg-danger-50 text-danger-700 ring-danger-500/30',
  info: 'bg-[#EEF3FA] text-[#2F5A96] ring-[#3F6FB5]/30',
};

export default function Badge({ tone = 'sand', dot, className, children }) {
  return (
    <span className={cx('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset whitespace-nowrap', TONES[tone], className)}>
      {dot && <span className="h-1.5 w-1.5 rounded-full" style={{ background: dot }} />}
      {children}
    </span>
  );
}

export const STATUS_COLORS = {
  new: '#9C8660', scheduled: '#3F6FB5', on_the_way: '#8A5CC2',
  in_progress: '#E0950B', completed: '#2E8B57', cancelled: '#B04A3F',
};
const STATUS_TONE = { new: 'sand', scheduled: 'info', on_the_way: 'petrol', in_progress: 'saffron', completed: 'success', cancelled: 'danger' };

export function StatusBadge({ status, className }) {
  const { t } = useI18n();
  return <Badge tone={STATUS_TONE[status] || 'sand'} dot={STATUS_COLORS[status]} className={className}>{t(`status.${status}`)}</Badge>;
}

export function PriorityBadge({ priority }) {
  const { t } = useI18n();
  if (priority === 'normal') return null;
  return <Badge tone={priority === 'urgent' ? 'danger' : 'sand'}>{t(`priority.${priority}`)}</Badge>;
}
