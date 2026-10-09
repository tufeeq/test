// OWNER: B4. Status/priority pills for the tech PWA. Same look as ui/StatusBadge, but labels come from the tech
// language layer so Urdu/Hindi technicians see their language (the shared badge only knows ar/en).
import { Badge, STATUS_COLORS } from '../ui/index.js';
import { useTechI18n } from './techI18n.jsx';

const STATUS_TONE = { new: 'sand', scheduled: 'info', on_the_way: 'petrol', in_progress: 'saffron', completed: 'success', cancelled: 'danger' };

export function TechStatusBadge({ status, className }) {
  const { t } = useTechI18n();
  return <Badge tone={STATUS_TONE[status] || 'sand'} dot={STATUS_COLORS[status]} className={className}>{t(`status.${status}`)}</Badge>;
}

export function TechPriorityBadge({ priority }) {
  const { t } = useTechI18n();
  if (!priority || priority === 'normal') return null;
  return <Badge tone={priority === 'urgent' ? 'danger' : 'sand'}>{t(`priority.${priority}`)}</Badge>;
}
