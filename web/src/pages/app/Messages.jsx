// OWNER: B3. Outbound message log (WhatsApp / SMS / system), simulated flag, compose.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api.js';
import { useAsync } from '../../lib/useAsync.js';
import { useI18n } from '../../i18n/index.jsx';
import { Badge, Button, Card, EmptyState, Modal, PageHeader, Select, Tabs, Textarea, useToast } from '../../components/ui/index.js';
import Icon from '../../components/app/icons.jsx';
import { CustomerPicker } from '../../components/app/CustomerForm.jsx';
import { ErrorState, Ltr, Pager, SkeletonRows } from '../../components/app/kit.jsx';
import { greg, relTime, timeHM } from '../../components/app/dates.js';
import { cx } from '../../lib/cx.js';

const LIMIT = 50;
const STATUS_TONE = { sent: 'success', simulated: 'info', queued: 'sand', failed: 'danger' };
const CH_ICON = { whatsapp: 'whatsapp', sms: 'messages', email: 'send', system: 'inbox' };

export default function Messages() {
  const { t, locale } = useI18n();
  const [channel, setChannel] = useState('');
  const [offset, setOffset] = useState(0);
  const [composing, setComposing] = useState(false);
  const toast = useToast();
  const resend = async (m) => {
    try { await api.post(`/messages/${m.id}/resend`); toast.success(t('app.messages.sent')); reload(); } catch (e) { toast.error(e); }
  };
  const { data, error, loading, reload } = useAsync(() => api.get('/messages', { channel: channel || undefined, limit: LIMIT, offset }), [channel, offset]);
  const items = data?.items || [];
  const simulated = data?.provider?.whatsapp ? data.provider.whatsapp !== 'live' : items.some((m) => m.status === 'simulated');

  return (
    <div>
      <PageHeader title={t('app.messages.title')} subtitle={t('app.messages.subtitle')}
        actions={<Button onClick={() => setComposing(true)} icon={<Icon name="send" size={16} />}>{t('app.messages.compose')}</Button>} />
      {simulated && (
        <div className="mb-4 rounded-2xl bg-[#EEF3FA] border border-[#3F6FB5]/20 px-4 py-3 text-sm text-[#2F5A96] flex items-start gap-2">
          <Icon name="alert" size={16} className="mt-0.5" />
          <span>{t('app.messages.simBanner')} <Link to="/app/settings" className="underline underline-offset-4 font-medium">{t('app.messages.simLink')}</Link></span>
        </div>
      )}
      <Tabs className="mb-4" value={channel} onChange={(v) => { setChannel(v); setOffset(0); }}
        items={[{ value: '', label: t('common.all') }, { value: 'whatsapp', label: t('app.messages.ch_whatsapp') }, { value: 'sms', label: t('app.messages.ch_sms') }, { value: 'system', label: t('app.messages.ch_system') }]} />
      {error ? <ErrorState error={error} onRetry={reload} />
        : loading && !data ? <Card><SkeletonRows rows={6} /></Card>
        : items.length === 0 ? <Card><EmptyState icon={<Icon name="messages" size={24} />} title={t('app.messages.empty')} body={t('app.messages.emptyBody')} /></Card>
        : (
          <ul className="rounded-2xl bg-white border border-sand-200/70 shadow-card divide-y divide-sand-100">
            {items.map((m) => (
              <li key={m.id} className="p-4 sm:px-5 flex gap-3 sm:gap-4">
                <span className={cx('h-9 w-9 rounded-full grid place-items-center shrink-0', m.channel === 'whatsapp' ? 'bg-success-50 text-success-600' : 'bg-petrol-50 text-petrol-600')}>
                  <Icon name={CH_ICON[m.channel] || 'messages'} size={17} />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    <span className="font-medium text-ink">{m.customer?.name || m.customer_name || <Ltr>{m.to_addr}</Ltr>}</span>
                    {(m.customer?.name || m.customer_name) && m.to_addr && <Ltr className="text-sand-500">{m.to_addr}</Ltr>}
                    <Badge tone={STATUS_TONE[m.status] || 'sand'}>{t(`app.messages.st_${m.status}`)}</Badge>
                    {m.direction === 'in' && <Badge tone="saffron">{t('app.messages.inbound')}</Badge>}
                    {m.job_id && <Link to={`/app/jobs/${m.job_id}`} className="text-petrol-700 hover:underline">{m.job?.number ? <Ltr>#{m.job.number}</Ltr> : t('app.messages.job')}</Link>}
                    {m.event && m.event !== 'manual' && <span className="text-sand-500">{evLabel(t, m.event)}</span>}
                    <span className="ms-auto text-sand-500 tabular-nums" title={`${greg(m.created_at, locale)} ${timeHM(m.created_at, locale)}`}>{relTime(m.created_at, locale)}</span>
                  </div>
                  <p className="mt-1.5 text-sand-800 whitespace-pre-line break-words leading-relaxed">{m.body}</p>
                  {m.status === 'failed' && (
                    <div className="mt-2 flex items-center gap-3 text-sm">
                      {m.error && <span className="text-danger-600 truncate">{m.error}</span>}
                      <Button size="sm" variant="secondary" onClick={() => resend(m)}>{t('app.messages.resend')}</Button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      <Pager total={data?.total} limit={LIMIT} offset={offset} onChange={setOffset} />
      <ComposeModal open={composing} onClose={() => setComposing(false)} onSent={reload} />
    </div>
  );
}

function ComposeModal({ open, onClose, onSent }) {
  const { t } = useI18n();
  const toast = useToast();
  const [customer, setCustomer] = useState(null);
  const [channel, setChannel] = useState('whatsapp');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const send = async () => {
    if (!customer || !body.trim()) return;
    setSending(true);
    try {
      const m = await api.post('/messages', { customer_id: customer.id, channel, body: body.trim() });
      toast.success(m?.status === 'simulated' ? t('app.messages.sentSimulated') : t('app.messages.sent'));
      setBody(''); setCustomer(null); onSent(); onClose();
    } catch (e) { toast.error(e); } finally { setSending(false); }
  };
  return (
    <Modal open={open} onClose={onClose} title={t('app.messages.compose')}
      footer={<><Button variant="secondary" onClick={onClose}>{t('common.cancel')}</Button><Button onClick={send} loading={sending} disabled={!customer || !body.trim()}>{t('app.messages.send')}</Button></>}>
      <div className="flex flex-col gap-4">
        <CustomerPicker value={customer} onChange={setCustomer} />
        <Select label={t('app.messages.channel')} value={channel} onChange={(e) => setChannel(e.target.value)}
          options={[{ value: 'whatsapp', label: t('app.messages.ch_whatsapp') }, { value: 'sms', label: t('app.messages.ch_sms') }]} />
        <Textarea rows={5} label={t('app.messages.body')} value={body} onChange={(e) => setBody(e.target.value)} />
      </div>
    </Modal>
  );
}

const evLabel = (t, e) => { const k = `app.messages.ev_${e}`; const v = t(k); return v !== k ? v : e; };
