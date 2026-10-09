// OWNER: B3. New job page. Accepts ?customer_id= to preselect the customer and ?contract_id= for contract visits.
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../../lib/api.js';
import { useAsync } from '../../../lib/useAsync.js';
import { useI18n } from '../../../i18n/index.jsx';
import { PageHeader } from '../../../components/ui/index.js';
import JobForm from '../../../components/app/JobForm.jsx';
import { PageSkeleton } from '../../../components/app/kit.jsx';

export default function JobNew() {
  const { t } = useI18n();
  const nav = useNavigate();
  const [sp] = useSearchParams();
  const cid = sp.get('customer_id');
  const pre = useAsync(() => (cid ? api.get(`/customers/${cid}`) : Promise.resolve(null)), [cid]);
  return (
    <div>
      <PageHeader title={t('app.jobs.new')} subtitle={t('app.jobs.newSub')} back="/app/jobs" />
      {cid && pre.loading ? <PageSkeleton /> : (
        <JobForm
          initial={pre.data ? { customer: { id: pre.data.id, name: pre.data.name, phone: pre.data.phone }, contract_id: sp.get('contract_id') || undefined, source: sp.get('contract_id') ? 'contract' : 'manual' } : null}
          onSaved={(job) => nav(`/app/jobs/${job.id}`)}
          onCancel={() => nav(-1)} />
      )}
    </div>
  );
}
