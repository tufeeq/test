// OWNER: B3. Booking requests inbox: public-page requests with AI triage → convert to job (in under 30s) or reject.
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../lib/api.js';
import { useAsync } from '../../lib/useAsync.js';
import { useI18n } from '../../i18n/index.jsx';
import { Badge, Button, Card, EmptyState, Input, Modal, PageHeader, Select, Tabs, Textarea, useToast } from '../../components/ui/index.js';
import Icon from '../../components/app/icons.jsx';
import { DualDate, ErrorState, Ltr, Money, SkeletonRows, useConfirm, useServices, useTechnicians, waLink, Pager, catLabel } from '../../components/app/kit.jsx';
import ItemsEditor, { cleanItems } from '../../components/app/ItemsEditor.jsx';
import { fromLocalInput, relTime, todayYmd, addDays } from '../../components/app/dates.js';
import { cx } from '../../lib/cx.js';

const LIMIT = 30;

export default function BookingRequests() {
  const { t } = useI18n();
  const [status, setStatus] = useState('pending');
  const [offset, setOffset] = useState(0);
  const { data, error, loading, reload, setData } = useAsync(() => api.get('/booking-requests', { status, limit: LIMIT, offset }), [status, offset]);
  const [converting, setConverting] = useState(null);
  const [replying, setReplying] = useState(null);
  const toast = useToast();
  const nav = useNavigate();
  const [confirm, confirmNode] = useConfirm();

  const reject = async (r) => {
    if (!(await confirm({ title: t('app.requests.rejectTitle'), body: t('app.requests.rejectBody', { name: r.name }), danger: true, confirmLabel: t('app.requests.reject') }))) return;
    try {
      await api.post(`/booking-requests/${r.id}/reject`);
      setData((d) => ({ ...d, items: d.items.filter((x) => x.id !== r.id), total: Math.max(0, (d.total || 1) - 1) }));
      toast.success(t('app.requests.rejected'));
    } catch (e) { toast.error(e); }
  };

  return (
    <div>
      {confirmNode}
      <PageHeader title={t('app.requests.title')} subtitle={t('app.requests.subtitle')} />
      <Tabs className="mb-5" value={status} onChange={(v) => { setStatus(v); setOffset(0); }}
        items={[{ value: 'pending', label: t('app.requests.pending'), count: status === 'pending' ? data?.total : undefined }, { value: 'converted', label: t('app.requests.converted') }, { value: 'rejected', label: t('app.requests.rejectedTab') }]} />
      {error ? <ErrorState error={error} onRetry={reload} />
        : loading && !data ? <Card><SkeletonRows rows={4} /></Card>
        : (data?.items || []).length === 0 ? (
          <Card><EmptyState icon={<Icon name="inbox" size={26} />} title={status === 'pending' ? t('app.requests.empty') : t('app.requests.emptyOther')} body={status === 'pending' ? t('app.requests.emptyBody') : undefined}
            action={status === 'pending' && <Button as={Link} to="/app/settings" variant="secondary">{t('app.requests.shareLink')}</Button>} /></Card>
        ) : (
          <ul className="flex flex-col gap-4">
            {data.items.map((r) => <RequestCard key={r.id} r={r} onConvert={() => setConverting(r)} onReject={() => reject(r)} onReply={() => setReplying(r)} />)}
          </ul>
        )}
      <Pager total={data?.total} limit={LIMIT} offset={offset} onChange={setOffset} />
      <ReplyModal req={replying} onClose={() => setReplying(null)} />
      <ConvertModal req={converting} onClose={() => setConverting(null)} onDone={(job) => {
        setData((d) => ({ ...d, items: d.items.filter((x) => x.id !== converting.id), total: Math.max(0, (d.total || 1) - 1) }));
        setConverting(null);
        toast.success(t('app.requests.convertedOk', { n: job.number ?? '' }));
        if (job?.id) nav(`/app/jobs/${job.id}`);
      }} />
    </div>
  );
}

const URG_TONE = { urgent: 'danger', normal: 'petrol', low: 'sand' };

function RequestCard({ r, onConvert, onReject, onReply }) {
  const { t, locale } = useI18n();
  const [services] = useServices();
  const tri = r.ai_triage || null;
  const range = useMemo(() => priceRange(tri, services), [tri, services]);
  return (
    <li className={cx('rounded-2xl bg-white border shadow-card overflow-hidden', tri?.priority === 'urgent' ? 'border-danger-500/30' : 'border-sand-200/70')}>
      <div className="grid md:grid-cols-[1fr_20rem]">
        <div className="p-5 flex flex-col gap-3 min-w-0">
          <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
            <h3 className="text-lg font-semibold">{r.name}</h3>
            <a href={`tel:+${r.phone}`} className="text-sand-700 hover:text-petrol-700"><Ltr>{r.phone}</Ltr></a>
            <span className="ms-auto text-sm text-sand-500">{relTime(r.created_at, locale)}</span>
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-sand-700">
            {r.category && <Badge tone="sand">{catLabel(t, r.category)}</Badge>}
            {(r.district || r.city) && <span className="inline-flex items-center gap-1"><Icon name="pin" size={14} className="text-sand-500" />{[r.district, r.city].filter(Boolean).join('، ')}</span>}
            {r.preferred_date && <span className="inline-flex items-center gap-1"><Icon name="calendar" size={14} className="text-sand-500" />{t('app.requests.prefers')} <DualDate value={r.preferred_date} inline /></span>}
          </div>
          {r.description && <blockquote className="rounded-xl bg-sand-100 px-4 py-3 text-sand-900 leading-relaxed whitespace-pre-line">{r.description}</blockquote>}
          {r.status === 'pending' ? (
            <div className="flex flex-wrap gap-2 mt-auto pt-1">
              <Button onClick={onConvert} icon={<Icon name="check" size={16} />}>{t('app.requests.convert')}</Button>
              <Button variant="secondary" icon={<Icon name="whatsapp" size={16} />} onClick={onReply}>{t('app.requests.reply')}</Button>
              <Button variant="ghost" className="text-danger-600 hover:bg-danger-50" onClick={onReject}>{t('app.requests.reject')}</Button>
            </div>
          ) : r.job_id ? <Link to={`/app/jobs/${r.job_id}`} className="text-petrol-700 hover:underline text-sm inline-flex items-center gap-1"><Icon name="jobs" size={14} />{t('app.requests.viewJob')}</Link> : null}
        </div>
        {/* AI triage panel */}
        <aside className="bg-petrol-50/70 border-t md:border-t-0 md:border-s border-petrol-100 p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-petrol-700 font-semibold"><Icon name="sparkle" size={17} />{t('app.requests.aiTriage')}
            {tri?.source === 'keywords' && <span className="text-xs font-normal text-sand-500">({t('app.requests.basic')})</span>}</div>
          {!tri ? <p className="text-sm text-sand-600">{t('app.requests.noTriage')}</p> : <>
            {tri.title && <div className="font-medium">{tri.title}</div>}
            <div className="flex flex-wrap gap-2">
              {tri.category && <Badge tone="petrol">{catLabel(t, tri.category)}</Badge>}
              {(tri.urgency || tri.priority) && <Badge tone={URG_TONE[tri.urgency || tri.priority]}>{t('app.requests.urgency')}: {t(`priority.${tri.urgency || tri.priority}`)}</Badge>}
              {tri.duration_min && <Badge tone="sand"><Icon name="clock" size={12} />{t('app.requests.duration', { n: tri.duration_min })}</Badge>}
            </div>
            {(locale === 'en' ? tri.likely_issue_en || tri.likely_issue_ar : tri.likely_issue_ar) && (
              <div><div className="text-xs text-sand-600 mb-0.5">{t('app.requests.likelyIssue')}</div><p className="text-sm text-sand-800 leading-relaxed">{locale === 'en' ? tri.likely_issue_en || tri.likely_issue_ar : tri.likely_issue_ar}</p></div>
            )}
            {tri.summary_ar && !tri.likely_issue_ar && <p className="text-sm text-sand-800 leading-relaxed">{tri.summary_ar}</p>}
            {(tri.questions_ar || []).length > 0 && (
              <details className="text-sm">
                <summary className="cursor-pointer text-petrol-700">{t('app.requests.questions', { n: tri.questions_ar.length })}</summary>
                <ul className="mt-1.5 list-disc ps-5 text-sand-800 flex flex-col gap-1">{tri.questions_ar.map((q) => <li key={q}>{q}</li>)}</ul>
              </details>
            )}
            {(tri.suggested_services || []).length > 0 && (
              <div>
                <div className="text-xs text-sand-600 mb-1">{t('app.requests.suggested')}</div>
                <ul className="flex flex-wrap gap-1.5">{tri.suggested_services.map((s) => <li key={s} className="rounded-lg bg-white border border-petrol-100 px-2 py-0.5 text-sm">{s}</li>)}</ul>
              </div>
            )}
            {(tri.suggested_parts || []).length > 0 && (
              <div>
                <div className="text-xs text-sand-600 mb-1">{t('app.requests.parts')}</div>
                <ul className="flex flex-wrap gap-1.5">{tri.suggested_parts.map((s) => <li key={s} className="rounded-lg bg-white border border-sand-200 px-2 py-0.5 text-sm">{s}</li>)}</ul>
              </div>
            )}
            {range && (
              <div className="mt-auto pt-2 border-t border-petrol-100">
                <div className="text-xs text-sand-600">{t('app.requests.priceRange')}</div>
                <div className="font-semibold text-petrol-800">{range.min === range.max ? <Money value={range.min} /> : <><Money value={range.min} /> – <Money value={range.max} /></>}</div>
                <div className="text-xs text-sand-500">{t('app.requests.exVat')}</div>
              </div>
            )}
          </>}
        </aside>
      </div>
    </li>
  );
}

/** Price range from AI result (if present) or from matching suggested services in the price list. */
function priceRange(tri, services) {
  if (!tri) return null;
  if (Array.isArray(tri.price_range_sar) && tri.price_range_sar.length) {
    const [a, b = a] = tri.price_range_sar.map(Number);
    return { min: Math.min(a, b), max: Math.max(a, b) };
  }
  const pr = tri.price_range || tri.estimate;
  if (pr && (pr.min != null || pr.max != null)) return { min: Number(pr.min ?? pr.max), max: Number(pr.max ?? pr.min) };
  const matched = (tri.suggested_services || []).map((n) => services.find((s) => s.name_ar === n || s.name === n)).filter(Boolean);
  if (!matched.length) return null;
  const prices = matched.map((s) => Number(s.price));
  return { min: Math.min(...prices), max: prices.reduce((a, b) => a + b, 0) };
}

function ConvertModal({ req, onClose, onDone }) {
  const { t } = useI18n();
  const toast = useToast();
  const [techs] = useTechnicians();
  const [services] = useServices();
  const [f, setF] = useState({});
  const [items, setItems] = useState([]);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (!req) return;
    const tri = req.ai_triage || {};
    const date = req.preferred_date?.slice(0, 10) || addDays(todayYmd(), 1);
    setF({ title: tri.title || req.description?.slice(0, 40) || '', technician_id: '', start: `${date}T09:00` });
    setItems((tri.suggested_services || []).map((n) => services.find((s) => s.name_ar === n || s.name === n)).filter(Boolean)
      .map((s) => ({ service_id: s.id, description: s.name_ar || s.name, qty: 1, unit_price: Number(s.price) })));
  }, [req]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!req) return null;
  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));
  const submit = async () => {
    setSaving(true);
    const clean = cleanItems(items);
    // Omit items when empty so the server falls back to the AI-suggested services from the price list.
    const body = { title: f.title || undefined, ...(clean.length ? { items: clean } : {}) };
    if (f.technician_id) body.technician_id = f.technician_id;
    if (f.start) body.scheduled_start = fromLocalInput(f.start);
    try { const job = await api.post(`/booking-requests/${req.id}/convert`, body); onDone(job || {}); }
    catch (e) { toast.error(e); } finally { setSaving(false); }
  };
  return (
    <Modal open={!!req} onClose={onClose} size="lg" title={t('app.requests.convertTitle', { name: req.name })}
      footer={<><Button variant="secondary" onClick={onClose}>{t('common.cancel')}</Button><Button onClick={submit} loading={saving}>{f.technician_id && f.start ? t('app.requests.convertSchedule') : t('app.requests.convert')}</Button></>}>
      <div className="flex flex-col gap-4">
        <p className="text-sm text-sand-600">{t('app.requests.convertHint')}</p>
        <Input label={t('app.jobs.titleLabel')} value={f.title || ''} onChange={(e) => set('title', e.target.value)} />
        <div className="grid sm:grid-cols-2 gap-4">
          <Select label={t('app.jobs.technician')} value={f.technician_id} onChange={(e) => set('technician_id', e.target.value)} placeholder={t('app.common.unassigned')} options={techs.map((x) => ({ value: x.id, label: x.name }))} />
          <Input type="datetime-local" label={t('app.jobs.scheduledStart')} value={f.start || ''} onChange={(e) => set('start', e.target.value)} dir="ltr" step={900} />
        </div>
        <div>
          <div className="text-sm font-medium text-sand-800 mb-2">{t('app.jobs.secItems')}</div>
          <ItemsEditor items={items} onChange={setItems} compact />
        </div>
      </div>
    </Modal>
  );
}

/** WhatsApp reply to a booking request, pre-drafted by AI (POST /ai/draft-reply), with a template fallback. */
function ReplyModal({ req, onClose }) {
  const { t, locale } = useI18n();
  const toast = useToast();
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [aiDrafted, setAiDrafted] = useState(false);
  useEffect(() => {
    if (!req) return;
    let alive = true;
    setBody(t('app.requests.waReply', { name: req.name })); setAiDrafted(false); setLoading(true);
    api.post('/ai/draft-reply', { booking_request_id: req.id, locale })
      .then((r) => { if (alive && r?.body) { setBody(r.body); setAiDrafted(r.source === 'anthropic'); } })
      .catch(() => {}).finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [req]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!req) return null;
  const send = async () => {
    setSending(true);
    try {
      const m = await api.post('/messages', { channel: 'whatsapp', to: req.phone, body });
      toast.success(m?.status === 'simulated' ? t('app.messages.sentSimulated') : t('app.messages.sent')); onClose();
    } catch (e) { toast.error(e); } finally { setSending(false); }
  };
  return (
    <Modal open={!!req} onClose={onClose} title={t('app.requests.replyTo', { name: req.name })}
      footer={<>
        <Button as="a" href={waLink(req.phone, body)} target="_blank" rel="noreferrer" variant="ghost" className="me-auto" icon={<Icon name="external" size={15} />}>{t('app.messages.openWa')}</Button>
        <Button variant="secondary" onClick={onClose}>{t('common.cancel')}</Button>
        <Button onClick={send} loading={sending} disabled={!body.trim()} icon={<Icon name="send" size={15} />}>{t('app.messages.send')}</Button>
      </>}>
      <div className="flex items-center justify-between gap-2 text-sm text-sand-600 mb-2">
        <span>{t('app.messages.to')}: <Ltr className="text-ink font-medium">{req.phone}</Ltr></span>
        {loading ? <span className="inline-flex items-center gap-1.5 text-petrol-600"><Icon name="sparkle" size={14} />{t('app.requests.drafting')}</span>
          : aiDrafted && <span className="inline-flex items-center gap-1.5 text-petrol-600"><Icon name="sparkle" size={14} />{t('app.requests.aiDrafted')}</span>}
      </div>
      <Textarea rows={8} value={body} onChange={(e) => setBody(e.target.value)} />
    </Modal>
  );
}
