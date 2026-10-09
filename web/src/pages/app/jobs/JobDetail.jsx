// OWNER: B3. Job detail: everything about one visit, plus the actions that move it forward.
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../lib/api.js';
import { useAsync } from '../../../lib/useAsync.js';
import { useAuth } from '../../../lib/auth.jsx';
import { useI18n } from '../../../i18n/index.jsx';
import { Badge, Button, Card, Modal, PageHeader, PriorityBadge, Select, StatusBadge, Textarea, Input, useToast } from '../../../components/ui/index.js';
import Icon from '../../../components/app/icons.jsx';
import ItemsEditor, { cleanItems } from '../../../components/app/ItemsEditor.jsx';
import JobForm from '../../../components/app/JobForm.jsx';
import { absUrl, Avatar, CopyButton, ErrorState, InvoiceStatusBadge, KV, Ltr, Money, PageSkeleton, useConfirm, useTechnicians, waLink, catLabel } from '../../../components/app/kit.jsx';
import { greg, hijri, relTime, timeHM, toLocalInput, fromLocalInput } from '../../../components/app/dates.js';
import { cx } from '../../../lib/cx.js';

// Next-status actions available to owner/dispatcher, by current status (mirrors API transitions).
const NEXT = {
  new: ['scheduled'],
  scheduled: ['on_the_way', 'in_progress'],
  on_the_way: ['in_progress', 'scheduled'],
  in_progress: ['completed'],
  completed: ['in_progress'],
  cancelled: [],
};

export default function JobDetail() {
  const { id } = useParams();
  const { t, locale } = useI18n();
  const toast = useToast();
  const nav = useNavigate();
  const { user, company } = useAuth();
  const { data: job, error, loading, reload, setData } = useAsync(() => api.get(`/jobs/${id}`), [id]);
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(null);
  const [waOpen, setWaOpen] = useState(false);
  const [confirm, confirmNode] = useConfirm();

  if (error) return <div><PageHeader title={t('app.jobs.title')} back="/app/jobs" /><ErrorState error={error} onRetry={reload} /></div>;
  if (loading && !job) return <PageSkeleton />;
  if (!job) return null;

  const merge = (patch) => setData((j) => ({ ...j, ...patch }));

  const setStatus = async (status) => {
    if (status === 'cancelled' && !(await confirm({ title: t('app.jobs.cancelTitle'), body: t('app.jobs.cancelBody'), danger: true, confirmLabel: t('app.jobs.cancelJob') }))) return;
    setBusy(status);
    try { const res = await api.post(`/jobs/${job.id}/status`, { status }); setData(res); toast.success(t('app.jobs.statusChanged', { s: t(`status.${status}`) })); }
    catch (e) { toast.error(e); }
    finally { setBusy(null); }
  };

  const createInvoice = async () => {
    setBusy('invoice');
    try {
      const inv = await api.post('/invoices', { job_id: job.id });
      toast.success(t('app.invoices.issued', { n: inv.number }));
      nav(`/app/invoices/${inv.id}`);
    } catch (e) { toast.error(e); if (e.status === 409) reload(); }
    finally { setBusy(null); }
  };

  const del = async () => {
    if (!(await confirm({ title: t('app.jobs.deleteTitle'), body: t('app.jobs.deleteBody'), danger: true, confirmLabel: t('common.delete') }))) return;
    try { await api.del(`/jobs/${job.id}`); toast.success(t('common.deleted')); nav('/app/jobs'); } catch (e) { toast.error(e); }
  };

  const trackingUrl = absUrl(job.tracking_url || (job.public_token ? `/t/${job.public_token}` : ''));
  const canInvoice = !job.invoice && job.status === 'completed';
  const nextStatuses = NEXT[job.status] || [];
  const primaryNext = nextStatuses[0];

  return (
    <div className="flex flex-col gap-6">
      {confirmNode}
      <PageHeader back="/app/jobs"
        title={<span className="flex flex-wrap items-center gap-x-3 gap-y-1"><Ltr className="text-sand-400 font-semibold">#{job.number}</Ltr><span>{job.title}</span></span>}
        actions={<>
          {job.status !== 'cancelled' && job.status !== 'completed' && <Button variant="secondary" onClick={() => setEditing(true)} icon={<Icon name="edit" size={16} />}>{t('common.edit')}</Button>}
          {job.invoice
            ? <Button as={Link} to={`/app/invoices/${job.invoice.id}`} variant="secondary" icon={<Icon name="invoices" size={16} />}>{t('app.jobs.viewInvoice', { n: job.invoice.number })}</Button>
            : canInvoice && <Button variant="cta" onClick={createInvoice} loading={busy === 'invoice'} icon={<Icon name="invoices" size={16} />}>{t('app.jobs.createInvoice')}</Button>}
        </>}>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <StatusBadge status={job.status} /><PriorityBadge priority={job.priority} />
          <Badge tone="sand">{catLabel(t, job.category)}</Badge>
          {job.source && job.source !== 'manual' && <Badge tone="petrol">{t(`app.jobs.source_${job.source}`)}</Badge>}
          {job.contract_id && <Link to={`/app/contracts/${job.contract_id}`} className="text-sm text-petrol-700 hover:underline inline-flex items-center gap-1"><Icon name="cycle" size={14} />{t('app.jobs.fromContract')}</Link>}
        </div>
      </PageHeader>

      {/* Status rail */}
      <StatusRail job={job} nextStatuses={nextStatuses} primaryNext={primaryNext} busy={busy} onSet={setStatus} canInvoice={canInvoice} />

      <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_22rem] gap-6 items-start">
        <div className="flex flex-col gap-6 min-w-0">
          {job.description && (
            <Card title={t('app.jobs.description')}><p className="whitespace-pre-line text-sand-800 leading-relaxed">{job.description}</p></Card>
          )}
          <ItemsCard job={job} onSaved={(r) => merge({ items: r.items, total: r.total })} />
          <div className="grid grid-cols-[minmax(0,1fr)] md:grid-cols-2 gap-6">
            <ChecklistCard job={job} onSaved={(checklist) => merge({ checklist })} />
            <SignatureCard job={job} />
          </div>
          <PhotosCard job={job} onDeleted={(pid) => merge({ photos: job.photos.filter((p) => p.id !== pid) })} />
          <Timeline job={job} onAdded={(ev) => merge({ events: [...(job.events || []), ev] })} />
        </div>

        <div className="flex flex-col gap-6 lg:sticky lg:top-20">
          <AssignCard job={job} onSaved={(r) => setData((j) => ({ ...j, ...r }))} />
          <Card title={t('app.jobs.customer')}>
            <div className="flex items-start gap-3">
              <span className="h-10 w-10 rounded-full bg-petrol-50 text-petrol-600 grid place-items-center shrink-0"><Icon name="user" size={18} /></span>
              <div className="min-w-0 flex-1">
                <Link to={`/app/customers/${job.customer?.id}`} className="font-semibold hover:text-petrol-700 hover:underline">{job.customer?.name}</Link>
                <div><Ltr className="text-sand-600">{job.customer?.phone}</Ltr></div>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Button as="a" href={`tel:+${job.customer?.phone}`} size="sm" variant="secondary" icon={<Icon name="phone" size={15} />}>{t('app.common.call')}</Button>
              <Button as="a" href={waLink(job.customer?.phone, '')} target="_blank" rel="noreferrer" size="sm" variant="secondary" icon={<Icon name="whatsapp" size={15} />}>{t('app.common.whatsapp')}</Button>
            </div>
            {job.site && (
              <dl className="mt-4 text-base">
                <KV label={t('app.jobs.site')}>{[job.site.label, job.site.district, job.site.city].filter(Boolean).join(' · ')}</KV>
                {job.site.lat && job.site.lng && (
                  <KV label={t('app.sites.map')}><a className="text-petrol-700 hover:underline inline-flex items-center gap-1" target="_blank" rel="noreferrer" href={`https://www.google.com/maps?q=${job.site.lat},${job.site.lng}`}><Icon name="pin" size={14} />{t('app.sites.openMap')}</a></KV>
                )}
              </dl>
            )}
            {job.asset && (
              <div className="mt-3 rounded-xl bg-sand-100 p-3 flex items-center gap-3">
                <Icon name="snow" size={20} className="text-petrol-600" />
                <div className="min-w-0 text-sm">
                  <div className="font-medium">{t(`assetKind.${job.asset.kind}`)}{job.asset.brand ? ` · ${job.asset.brand}` : ''}</div>
                  <div className="text-sand-600 tabular-nums">{job.asset.capacity_btu ? `${Number(job.asset.capacity_btu).toLocaleString('en')} BTU` : ''}{job.asset.install_date ? ` · ${t('app.assets.installed')} ${greg(job.asset.install_date, locale)}` : ''}</div>
                </div>
              </div>
            )}
          </Card>

          <Card title={t('app.jobs.tracking')} subtitle={t('app.jobs.trackingSub')}>
            <div className="rounded-xl bg-sand-100 px-3 py-2 text-sm break-all ltr-nums" dir="ltr">{trackingUrl}</div>
            <div className="flex flex-wrap gap-2 mt-3">
              <CopyButton text={trackingUrl} />
              <Button size="sm" variant="primary" icon={<Icon name="whatsapp" size={15} />} onClick={() => setWaOpen(true)}>{t('app.jobs.sendTracking')}</Button>
              <Button as="a" href={trackingUrl} target="_blank" rel="noreferrer" size="sm" variant="ghost" icon={<Icon name="external" size={15} />}>{t('app.common.open')}</Button>
            </div>
            {job.rating && (
              <div className="mt-4 pt-4 border-t border-sand-100">
                <div className="flex items-center gap-1 text-saffron-500">{[1, 2, 3, 4, 5].map((i) => <Icon key={i} name="star" size={16} className={i <= job.rating ? 'fill-current' : 'text-sand-300'} />)}</div>
                {job.rating_comment && <p className="mt-1 text-sm text-sand-700">«{job.rating_comment}»</p>}
              </div>
            )}
          </Card>

          {job.invoice && (
            <Card title={t('app.nav.invoices')}>
              <Link to={`/app/invoices/${job.invoice.id}`} className="flex items-center gap-3 rounded-xl hover:bg-petrol-50 -m-2 p-2">
                <Icon name="invoices" size={20} className="text-petrol-600" />
                <Ltr className="font-medium">#{job.invoice.number}</Ltr>
                <InvoiceStatusBadge status={job.invoice.status} />
                <Money value={job.invoice.total} strong className="ms-auto" />
              </Link>
            </Card>
          )}

          {user?.role === 'owner' && ['new', 'cancelled'].includes(job.status) && !job.invoice && (
            <Button variant="ghost" className="text-danger-600 hover:bg-danger-50 self-start" icon={<Icon name="trash" size={16} />} onClick={del}>{t('app.jobs.deleteJob')}</Button>
          )}
          {job.status !== 'cancelled' && job.status !== 'completed' && (
            <Button variant="ghost" className="text-danger-600 hover:bg-danger-50 self-start" onClick={() => setStatus('cancelled')} loading={busy === 'cancelled'}>{t('app.jobs.cancelJob')}</Button>
          )}
        </div>
      </div>

      <Modal open={editing} onClose={() => setEditing(false)} size="xl" title={t('app.jobs.editTitle', { n: job.number })}>
        <JobForm layout="modal" initial={job} onCancel={() => setEditing(false)} onSaved={(j) => { setEditing(false); setData((x) => ({ ...x, ...j })); reload(); }} />
      </Modal>

      <WhatsAppModal open={waOpen} onClose={() => setWaOpen(false)} job={job} trackingUrl={trackingUrl} company={company}
        onSent={(ev) => ev && merge({ events: [...(job.events || []), ev] })} />
    </div>
  );
}

function StatusRail({ job, nextStatuses, primaryNext, busy, onSet }) {
  const { t, locale } = useI18n();
  const steps = ['new', 'scheduled', 'on_the_way', 'in_progress', 'completed'];
  const idx = steps.indexOf(job.status);
  return (
    <div className="rounded-2xl bg-white border border-sand-200/70 shadow-card p-4 sm:p-5 flex flex-col md:flex-row md:items-center gap-4">
      <ol className="flex-1 flex items-center gap-1 overflow-x-auto" aria-label={t('app.jobs.progress')}>
        {steps.map((s, i) => {
          const done = job.status !== 'cancelled' && i <= idx;
          return (
            <li key={s} className="flex items-center gap-1 flex-1 min-w-[4.5rem]">
              <span className={cx('h-7 w-7 rounded-full grid place-items-center shrink-0 text-xs font-bold', done ? 'bg-petrol-600 text-white' : 'bg-sand-100 text-sand-500', i === idx && 'ring-4 ring-petrol-100')}>
                {done && i < idx ? <Icon name="check" size={14} strokeWidth={2.5} /> : i + 1}
              </span>
              <span className={cx('text-xs sm:text-sm whitespace-nowrap', i === idx ? 'font-semibold text-ink' : 'text-sand-600')}>{t(`status.${s}`)}</span>
              {i < steps.length - 1 && <span className={cx('flex-1 h-0.5 rounded-full min-w-[0.75rem]', done && i < idx ? 'bg-petrol-600' : 'bg-sand-200')} />}
            </li>
          );
        })}
      </ol>
      {job.status === 'cancelled' ? <Badge tone="danger">{t('status.cancelled')}</Badge> : (
        <div className="flex flex-wrap gap-2">
          {nextStatuses.slice(1).map((s) => <Button key={s} variant="secondary" size="md" onClick={() => onSet(s)} loading={busy === s}>{t(`app.jobs.to_${s}`)}</Button>)}
          {primaryNext && <Button size="md" onClick={() => onSet(primaryNext)} loading={busy === primaryNext}>{t(`app.jobs.to_${primaryNext}`)}</Button>}
        </div>
      )}
      {job.completed_at && <span className="text-sm text-sand-600 tabular-nums">{t('app.jobs.completedAt')} {greg(job.completed_at, locale)} {timeHM(job.completed_at, locale)}</span>}
    </div>
  );
}

function AssignCard({ job, onSaved }) {
  const { t, locale } = useI18n();
  const toast = useToast();
  const [techs] = useTechnicians();
  const [open, setOpen] = useState(false);
  const [techId, setTechId] = useState(job.technician?.id || '');
  const [start, setStart] = useState(toLocalInput(job.scheduled_start));
  const [saving, setSaving] = useState(false);
  useEffect(() => { setTechId(job.technician?.id || ''); setStart(toLocalInput(job.scheduled_start)); }, [job.technician?.id, job.scheduled_start]);
  const dur = job.scheduled_start && job.scheduled_end ? new Date(job.scheduled_end) - new Date(job.scheduled_start) : 3600000;
  const save = async () => {
    setSaving(true);
    const s = fromLocalInput(start);
    try {
      const res = await api.patch(`/jobs/${job.id}`, { technician_id: techId || null, scheduled_start: s, scheduled_end: s ? new Date(new Date(s).getTime() + dur).toISOString() : null });
      onSaved(res); setOpen(false);
      if (res?.warnings?.length) toast.info(t('app.schedule.savedWithConflict')); else toast.success(t('common.saved'));
    } catch (e) { toast.error(e); } finally { setSaving(false); }
  };
  const locked = ['completed', 'cancelled'].includes(job.status);
  return (
    <Card title={t('app.jobs.secSchedule')} actions={!locked && !open && <Button size="sm" variant="ghost" onClick={() => setOpen(true)}>{job.technician ? t('app.jobs.reschedule') : t('app.jobs.assign')}</Button>}>
      {!open ? (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            {job.technician ? <Avatar name={job.technician.name} color={job.technician.color} size={36} /> : <span className="h-9 w-9 rounded-full border-2 border-dashed border-sand-300" />}
            <div>
              <div className="font-medium">{job.technician?.name || t('app.common.unassigned')}</div>
              <div className="text-sm text-sand-500">{t('app.jobs.technician')}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="h-9 w-9 rounded-full bg-sand-100 grid place-items-center text-petrol-600"><Icon name="clock" size={17} /></span>
            {job.scheduled_start ? (
              <div className="tabular-nums">
                <div className="font-medium">{greg(job.scheduled_start, locale, { weekday: 'long', day: 'numeric', month: 'long' })}</div>
                <div className="text-sm text-sand-600">{timeHM(job.scheduled_start, locale)} – {timeHM(job.scheduled_end, locale)} · {hijri(job.scheduled_start, locale, { day: 'numeric', month: 'short' })}</div>
              </div>
            ) : <div className="text-sand-500">{t('app.jobs.unscheduled')}</div>}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <Select label={t('app.jobs.technician')} value={techId} onChange={(e) => setTechId(e.target.value)} placeholder={t('app.common.unassigned')} options={techs.map((x) => ({ value: x.id, label: x.name }))} />
          <Input type="datetime-local" label={t('app.jobs.scheduledStart')} value={start} onChange={(e) => setStart(e.target.value)} dir="ltr" step={900} />
          <div className="flex gap-2 justify-end">
            <Button size="sm" variant="secondary" onClick={() => setOpen(false)}>{t('common.cancel')}</Button>
            <Button size="sm" onClick={save} loading={saving}>{t('common.save')}</Button>
          </div>
        </div>
      )}
    </Card>
  );
}

function ItemsCard({ job, onSaved }) {
  const { t } = useI18n();
  const toast = useToast();
  const [items, setItems] = useState(job.items || []);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  useEffect(() => { setItems(job.items || []); setDirty(false); }, [job.items]);
  const locked = !!job.invoice && job.invoice.status !== 'void';
  const save = async () => {
    setSaving(true);
    try { const r = await api.put(`/jobs/${job.id}/items`, { items: cleanItems(items) }); onSaved(r); setDirty(false); toast.success(t('common.saved')); }
    catch (e) { toast.error(e); } finally { setSaving(false); }
  };
  return (
    <Card title={t('app.jobs.secItems')} subtitle={locked ? t('app.jobs.itemsLocked') : t('app.jobs.itemsSub')}
      actions={dirty && <><Button size="sm" variant="secondary" onClick={() => { setItems(job.items || []); setDirty(false); }}>{t('common.cancel')}</Button><Button size="sm" onClick={save} loading={saving}>{t('common.save')}</Button></>}>
      {items.length === 0 && locked ? <p className="text-sand-500">{t('app.jobs.noItems')}</p>
        : <ItemsEditor items={items} readOnly={locked} onChange={(v) => { setItems(v); setDirty(true); }} />}
    </Card>
  );
}

function ChecklistCard({ job, onSaved }) {
  const { t } = useI18n();
  const toast = useToast();
  const [list, setList] = useState(job.checklist || []);
  const [label, setLabel] = useState('');
  useEffect(() => setList(job.checklist || []), [job.checklist]);
  const persist = async (next) => {
    const prev = list; setList(next);
    try { const r = await api.patch(`/jobs/${job.id}/checklist`, { checklist: next }); onSaved(r.checklist || next); }
    catch (e) { setList(prev); toast.error(e); }
  };
  const done = list.filter((x) => x.done).length;
  return (
    <Card title={t('app.jobs.checklist')} subtitle={list.length ? t('app.jobs.checkProgress', { done, total: list.length }) : undefined}>
      {list.length > 0 && <div className="h-1.5 rounded-full bg-sand-100 mb-3 overflow-hidden"><div className="h-full bg-success-500 rounded-full" style={{ width: `${(done / list.length) * 100}%` }} /></div>}
      <ul className="flex flex-col gap-1">
        {list.map((c, i) => (
          <li key={i} className="group flex items-center gap-2.5">
            <label className="flex items-center gap-2.5 flex-1 py-1.5 cursor-pointer">
              <input type="checkbox" checked={!!c.done} onChange={() => persist(list.map((x, k) => (k === i ? { ...x, done: !x.done } : x)))} className="h-[18px] w-[18px] accent-petrol-600" />
              <span className={cx(c.done && 'line-through text-sand-500')}>{c.label}</span>
            </label>
            <button onClick={() => persist(list.filter((_, k) => k !== i))} aria-label={t('common.delete')} className="opacity-0 group-hover:opacity-100 focus:opacity-100 h-7 w-7 grid place-items-center rounded-lg text-sand-500 hover:text-danger-600"><Icon name="close" size={14} /></button>
          </li>
        ))}
      </ul>
      <form className="flex gap-2 mt-2" onSubmit={(e) => { e.preventDefault(); if (label.trim()) { persist([...list, { label: label.trim(), done: false }]); setLabel(''); } }}>
        <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder={t('app.jobs.addCheckItem')} className="flex-1 h-9 rounded-lg border border-sand-200 px-2.5 focus:outline-none focus:border-petrol-500" />
        <Button size="sm" type="submit" variant="secondary" disabled={!label.trim()}>{t('common.add')}</Button>
      </form>
    </Card>
  );
}

function SignatureCard({ job }) {
  const { t } = useI18n();
  return (
    <Card title={t('app.jobs.signature')}>
      {job.customer_signature
        ? <div className="rounded-xl bg-sand-50 border border-sand-200 p-3 grid place-items-center"><img src={job.customer_signature} alt={t('app.jobs.signature')} className="max-h-36 w-auto" /></div>
        : <div className="rounded-xl border-2 border-dashed border-sand-200 py-10 text-center text-sand-500 text-sm">{t('app.jobs.noSignature')}</div>}
    </Card>
  );
}

function PhotosCard({ job, onDeleted }) {
  const { t, locale } = useI18n();
  const toast = useToast();
  const [view, setView] = useState(null);
  const photos = job.photos || [];
  const groups = ['before', 'after'].map((k) => [k, photos.filter((p) => p.kind === k)]);
  const del = async (p) => {
    try { await api.del(`/jobs/${job.id}/photos/${p.id}`); onDeleted(p.id); setView(null); toast.success(t('common.deleted')); } catch (e) { toast.error(e); }
  };
  return (
    <Card title={t('app.jobs.photos')} subtitle={photos.length ? t('app.jobs.photosCount', { n: photos.length }) : t('app.jobs.photosHint')}>
      {photos.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-sand-200 py-8 grid place-items-center text-sand-500 gap-2"><Icon name="camera" size={26} /><span className="text-sm">{t('app.jobs.noPhotos')}</span></div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-5">
          {groups.map(([k, list]) => (
            <div key={k}>
              <div className="text-sm font-medium text-sand-700 mb-2">{t(`app.jobs.photo_${k}`)} <span className="text-sand-400 tabular-nums">({list.length})</span></div>
              {list.length === 0 ? <div className="text-sm text-sand-400">—</div> : (
                <div className="grid grid-cols-3 gap-2">
                  {list.map((p) => (
                    <button key={p.id} onClick={() => setView(p)} className="aspect-square rounded-xl overflow-hidden bg-sand-100 focus-visible:outline-none focus-visible:shadow-ring">
                      <img src={p.data_url} alt="" loading="lazy" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <Modal open={!!view} onClose={() => setView(null)} size="xl" title={view ? `${t(`app.jobs.photo_${view.kind}`)} · ${greg(view.created_at, locale)} ${timeHM(view.created_at, locale)}` : ''}
        footer={view && <Button variant="ghost" className="text-danger-600" icon={<Icon name="trash" size={16} />} onClick={() => del(view)}>{t('common.delete')}</Button>}>
        {view && <img src={view.data_url} alt="" className="w-full h-auto rounded-xl" />}
      </Modal>
    </Card>
  );
}

const EV_ICON = { created: 'plus', status_changed: 'cycle', assigned: 'user', rescheduled: 'clock', note: 'messages', photo: 'camera', signature: 'edit', rating: 'star', invoice: 'invoices', message: 'whatsapp' };

function Timeline({ job, onAdded }) {
  const { t, locale } = useI18n();
  const toast = useToast();
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const events = [...(job.events || [])].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const add = async (e) => {
    e.preventDefault(); if (!note.trim()) return;
    setSaving(true);
    try { const ev = await api.post(`/jobs/${job.id}/notes`, { message: note.trim() }); onAdded(ev); setNote(''); }
    catch (er) { toast.error(er); } finally { setSaving(false); }
  };
  return (
    <Card title={t('app.jobs.timeline')}>
      <form onSubmit={add} className="flex flex-col sm:flex-row gap-2 mb-5">
        <Textarea rows={1} className="flex-1" value={note} onChange={(e) => setNote(e.target.value)} placeholder={t('app.jobs.notePh')} />
        <Button type="submit" variant="secondary" loading={saving} disabled={!note.trim()} className="self-end">{t('app.jobs.addNote')}</Button>
      </form>
      {events.length === 0 ? <p className="text-sand-500 text-sm">{t('app.jobs.noEvents')}</p> : (
        <ol className="relative">
          {events.map((ev, i) => (
            <li key={ev.id || i} className="relative flex gap-3 pb-4 last:pb-0">
              {i < events.length - 1 && <span className="absolute top-8 bottom-0 start-[15px] w-px bg-sand-200" aria-hidden="true" />}
              <span className={cx('h-8 w-8 rounded-full grid place-items-center shrink-0', ev.type === 'note' ? 'bg-saffron-50 text-saffron-700' : 'bg-petrol-50 text-petrol-600')}><Icon name={EV_ICON[ev.type] || 'cycle'} size={15} /></span>
              <div className="min-w-0 flex-1 pt-1">
                <div className="text-sm text-sand-600 flex flex-wrap gap-x-2">
                  <span className="font-medium text-ink">{t(`app.events.${ev.type}`) !== `app.events.${ev.type}` ? t(`app.events.${ev.type}`) : ev.type}</span>
                  {ev.actor?.name && <span>· {ev.actor.name}</span>}
                  <span className="tabular-nums" title={`${greg(ev.created_at, locale)} ${timeHM(ev.created_at, locale)}`}>· {relTime(ev.created_at, locale)}</span>
                </div>
                {ev.message && <p className={cx('mt-0.5 whitespace-pre-line', ev.type === 'note' ? 'rounded-xl bg-sand-100 px-3 py-2 mt-1.5' : 'text-sand-800')}>{ev.message}</p>}
              </div>
            </li>
          ))}
        </ol>
      )}
    </Card>
  );
}

function WhatsAppModal({ open, onClose, job, trackingUrl, company, onSent }) {
  const { t, locale } = useI18n();
  const toast = useToast();
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  useEffect(() => {
    if (!open) return;
    const cname = locale === 'ar' ? company?.name_ar || company?.name : company?.name || company?.name_ar;
    const when = job.scheduled_start ? `${greg(job.scheduled_start, locale, { weekday: 'long', day: 'numeric', month: 'long' })} ${timeHM(job.scheduled_start, locale)}` : '';
    setBody(t('app.jobs.waTemplate', { name: job.customer?.name || '', company: cname || '', n: job.number, when, url: trackingUrl }));
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
  const send = async () => {
    setSending(true);
    try {
      const msg = await api.post('/messages', { job_id: job.id, customer_id: job.customer?.id, channel: 'whatsapp', body });
      toast.success(msg?.status === 'simulated' ? t('app.messages.sentSimulated') : t('app.messages.sent'));
      onSent({ id: msg?.id || `m${Date.now()}`, type: 'message', message: body, created_at: new Date().toISOString() });
      onClose();
    } catch (e) { toast.error(e); } finally { setSending(false); }
  };
  return (
    <Modal open={open} onClose={onClose} title={t('app.jobs.sendTracking')}
      footer={<>
        <Button as="a" href={waLink(job.customer?.phone, body)} target="_blank" rel="noreferrer" variant="ghost" className="me-auto" icon={<Icon name="external" size={15} />}>{t('app.messages.openWa')}</Button>
        <Button variant="secondary" onClick={onClose}>{t('common.cancel')}</Button>
        <Button onClick={send} loading={sending} icon={<Icon name="send" size={15} />}>{t('app.messages.send')}</Button>
      </>}>
      <div className="flex flex-col gap-3">
        <div className="text-sm text-sand-600">{t('app.messages.to')}: <Ltr className="text-ink font-medium">{job.customer?.phone}</Ltr></div>
        <Textarea rows={7} value={body} onChange={(e) => setBody(e.target.value)} />
      </div>
    </Modal>
  );
}
