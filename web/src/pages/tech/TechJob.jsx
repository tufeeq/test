// OWNER: B4. Technician job screen: status flow, contact, checklist, items, photos, notes, signature, completion + payment.
// Every write goes through sendOrQueue() so it survives a dead signal on a rooftop.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api, ApiError } from '../../lib/api.js';
import { useAuth } from '../../lib/auth.jsx';
import { Button, Modal, Spinner, useToast } from '../../components/ui/index.js';
import { TechStatusBadge as StatusBadge, TechPriorityBadge as PriorityBadge } from '../../components/tech/TechBadges.jsx';
import { cx } from '../../lib/cx.js';
import { useTechI18n } from '../../components/tech/techI18n.jsx';
import { sendOrQueue, pendingFor, useOfflineQueue } from '../../components/tech/offlineQueue.js';
import { cacheJob, cachedJob, lsGet, lsSet } from '../../components/tech/storage.js';
import { parseChecklist, serializeChecklist } from '../../components/tech/checklist.js';
import { waUrl } from '../../components/tech/media.js';
import ContactBar from '../../components/tech/ContactBar.jsx';
import JobChecklist from '../../components/tech/JobChecklist.jsx';
import JobItems, { TotalsBlock, totals } from '../../components/tech/JobItems.jsx';
import JobPhotos from '../../components/tech/JobPhotos.jsx';
import SignaturePad from '../../components/tech/SignaturePad.jsx';
import { IconBack, IconCheck, IconCash, IconWhatsApp, IconPen, IconNote } from '../../components/tech/icons.jsx';

const FLOW = ['scheduled', 'on_the_way', 'in_progress', 'completed'];
const NEXT = { scheduled: 'on_the_way', on_the_way: 'in_progress', in_progress: 'completed' };
const SERVICES_KEY = 'dawra_tech_services_v1';

/** Merge queued offline writes into the server copy so the screen shows what the tech actually did. */
function withPending(job) {
  if (!job) return job;
  let j = { ...job };
  for (const p of pendingFor(job.id)) {
    if (p.path.endsWith('/status')) j.status = p.body.status;
    else if (p.path.endsWith('/checklist')) j.checklist = p.body.checklist;
    else if (p.path.endsWith('/items')) j.items = p.body.items;
    else if (p.path.endsWith('/signature')) j.customer_signature = p.body.data_url;
    else if (p.path.endsWith('/photos')) j.photos = [...(j.photos || []), { id: p.id, kind: p.body.kind, data_url: p.body.data_url, pending: true }];
    else if (p.path.endsWith('/notes')) j.events = [...(j.events || []), { id: p.id, type: 'note', message: p.body.message, created_at: new Date(p.ts).toISOString(), pending: true }];
  }
  return j;
}

export default function TechJob() {
  const { id } = useParams();
  const { t, fmtTime, fmtDate } = useTechI18n();
  const { user } = useAuth();
  const toast = useToast();
  const q = useOfflineQueue();
  const [job, setJob] = useState(() => cachedJob(id));
  const [fromCache, setFromCache] = useState(Boolean(cachedJob(id)));
  const [error, setError] = useState(null);
  const [services, setServices] = useState(() => lsGet(SERVICES_KEY, []));
  const [busy, setBusy] = useState(false);
  const [finishOpen, setFinishOpen] = useState(false);
  const isAdmin = user?.role === 'owner' || user?.role === 'dispatcher';

  const load = useCallback(async () => {
    try {
      const j = await api.get(`/jobs/${id}`);
      cacheJob(j);
      setJob(j);
      setFromCache(false);
      setError(null);
    } catch (e) {
      setError(e);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    api.get('/services', { active: true }).then((r) => {
      const items = (r?.items || []).filter((s) => s.active !== false);
      setServices(items);
      lsSet(SERVICES_KEY, items);
    }).catch(() => {});
  }, []);
  // After the queue drains, pull the fresh server copy (new photo ids, events…).
  const prevPending = useRef(q.pending);
  useEffect(() => {
    if (prevPending.current > 0 && q.pending === 0 && q.online) load();
    prevPending.current = q.pending;
  }, [q.pending, q.online, load]);

  const view = useMemo(() => withPending(job), [job, q.pending]); // eslint-disable-line react-hooks/exhaustive-deps

  /** Optimistic local update + cache, then send or queue. */
  const write = useCallback(async ({ key, method, path, body, label, apply, quiet }) => {
    setJob((j) => { const n = apply ? apply(j) : j; cacheJob(n); return n; });
    try {
      const r = await sendOrQueue({ key, method, path, body, label, jobId: id });
      if (r.queued && !quiet) toast.info(t('tech.net.savedOffline'));
      return r;
    } catch (e) {
      toast.error(e);
      load();
      throw e;
    }
  }, [id, load, t, toast]);

  // ── checklist (debounced, coalesced) ──
  const rows = useMemo(() => (view ? parseChecklist(view.checklist, view) : []), [view]);
  const clTimer = useRef(null);
  const clPending = useRef(null);
  const flushChecklist = useCallback(() => {
    clearTimeout(clTimer.current);
    const payload = clPending.current;
    if (!payload) return;
    clPending.current = null;
    write({ key: `checklist:${id}`, method: 'PATCH', path: `/jobs/${id}/checklist`, body: { checklist: payload }, label: t('tech.checklist.title'), quiet: true,
      apply: (j) => ({ ...j, checklist: payload }) }).catch(() => {});
  }, [id, t, write]);
  const saveChecklist = (next) => {
    const payload = serializeChecklist(next);
    setJob((j) => { const n = { ...j, checklist: payload }; cacheJob(n); return n; });
    clPending.current = payload;
    clearTimeout(clTimer.current);
    clTimer.current = setTimeout(flushChecklist, 700);
  };
  // Leaving the screen (or backgrounding the app) must not drop the last tap.
  const flushRef = useRef(flushChecklist);
  flushRef.current = flushChecklist;
  useEffect(() => {
    const onHide = () => document.visibilityState === 'hidden' && flushRef.current();
    document.addEventListener('visibilitychange', onHide);
    return () => { document.removeEventListener('visibilitychange', onHide); flushRef.current(); };
  }, []);

  if (!view) {
    if (error) {
      return (
        <div className="py-12 text-center flex flex-col items-center gap-4">
          <p className="text-lg font-semibold">{error instanceof ApiError && error.status === 404 ? t('tech.job.notFound') : t('tech.today.loadError')}</p>
          <div className="flex gap-2">
            <Button variant="secondary" size="lg" as={Link} to="/tech">{t('tech.job.back')}</Button>
            {!(error instanceof ApiError && error.status === 404) && <Button size="lg" onClick={load}>{t('common.retry')}</Button>}
          </div>
        </div>
      );
    }
    return <div className="py-16 grid place-items-center text-petrol-600"><Spinner size={32} /></div>;
  }

  const status = view.status;
  const next = NEXT[status];
  const items = view.items || [];
  const itemsEditable = status === 'in_progress' || (isAdmin && status !== 'cancelled' && !view.invoice);
  const site = view.site;
  const techFirst = (user?.name || '').split(/\s+/)[0];
  const notes = (view.events || []).filter((e) => e.type === 'note');

  const changeStatus = async (to) => {
    flushChecklist();
    setBusy(true);
    try {
      const r = await write({
        key: null, method: 'POST', path: `/jobs/${id}/status`, body: { status: to },
        label: t(`status.${to}`), quiet: true,
        apply: (j) => ({ ...j, status: to, ...(to === 'completed' ? { completed_at: new Date().toISOString() } : {}) }),
      });
      if (r.queued) toast.info(t('tech.net.savedOffline'));
      else {
        toast.success(t(`tech.job.statusDone.${to}`));
        if (r.data?.id) { cacheJob(r.data); setJob(r.data); }
      }
      if (to === 'completed') window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch { /* toasted */ } finally {
      setBusy(false);
    }
  };

  const saveItems = (nextItems) => {
    const body = { items: nextItems.map((it) => ({ service_id: it.service_id || null, description: it.description, qty: Number(it.qty), unit_price: Number(it.unit_price) })) };
    write({ key: `items:${id}`, method: 'PUT', path: `/jobs/${id}/items`, body, label: t('tech.items.title'), quiet: true,
      apply: (j) => ({ ...j, items: body.items }) }).catch(() => {});
  };

  const addPhoto = async (kind, dataUrl, err) => {
    if (err || !dataUrl) { toast.error(t('tech.photos.failed')); return; }
    try {
      const r = await sendOrQueue({ method: 'POST', path: `/jobs/${id}/photos`, body: { kind, data_url: dataUrl }, label: t(`tech.photos.${kind}`), jobId: id });
      if (r.queued) {
        toast.info(t('tech.net.savedOffline'));
        setJob((j) => ({ ...j })); // re-render with pending overlay
      } else {
        toast.success(t('tech.photos.uploaded'));
        setJob((j) => { const n = { ...j, photos: [...(j.photos || []), r.data] }; cacheJob(n); return n; });
      }
    } catch (e) { toast.error(e); }
  };
  const removePhoto = async (p) => {
    try {
      await api.del(`/jobs/${id}/photos/${p.id}`);
      setJob((j) => { const n = { ...j, photos: (j.photos || []).filter((x) => x.id !== p.id) }; cacheJob(n); return n; });
    } catch (e) { toast.error(e); }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <Link to="/tech" className="inline-flex items-center gap-1 min-h-[44px] pe-3 text-base font-semibold text-petrol-700">
          <IconBack size={22} />{t('tech.job.back')}
        </Link>
        <span className="text-sm font-semibold text-sand-700 tabular-nums">{t('tech.job.number', { n: view.number })}</span>
      </div>

      {fromCache && error && <p className="rounded-xl bg-sand-100 text-sand-800 px-3 py-2 text-sm">{t('tech.job.offlineCopy')}</p>}

      {/* Header card */}
      <section className="rounded-2xl bg-white border border-sand-200 p-4">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <StatusBadge status={status} />
          <PriorityBadge priority={view.priority} />
          {view.scheduled_start && (
            <span className="text-sm text-sand-700 tabular-nums">{fmtDate(view.scheduled_start)} · <span dir="ltr">{fmtTime(view.scheduled_start)}</span></span>
          )}
        </div>
        <h1 className="text-2xl font-bold leading-tight">{view.customer?.name}</h1>
        <p className="text-lg text-sand-800">{view.title}</p>
        {(site?.address || site?.district) && (
          <p className="text-base text-sand-700 mt-1">{[site.address, site.district, site.city].filter(Boolean).join('، ')}</p>
        )}
        {view.description && (
          <p className="mt-3 rounded-xl bg-sand-50 px-3 py-2 text-base leading-relaxed"><span className="font-semibold">{t('tech.job.problem')}: </span>{view.description}</p>
        )}
        {view.asset && (
          <p className="mt-2 text-sm text-sand-700">
            <span className="font-semibold">{t('tech.job.unit')}: </span>
            {t(`assetKind.${view.asset.kind}`)}{view.asset.brand && ` · ${view.asset.brand}`}
            {view.asset.capacity_btu && <> · <span dir="ltr" className="tabular-nums">{t('tech.job.btu', { n: view.asset.capacity_btu.toLocaleString('en') })}</span></>}
          </p>
        )}
        <ContactBar className="mt-4" site={site} phone={view.customer?.phone}
          waText={t('tech.contact.waGreeting', { name: view.customer?.name || '', tech: techFirst, number: view.number })} />
      </section>

      <StatusStepper status={status} t={t} />

      {status === 'completed' && (
        <CompletionSummary job={view} isAdmin={isAdmin} t={t} toast={toast} reload={load} />
      )}
      {status === 'cancelled' && <p className="rounded-xl bg-danger-50 text-danger-700 px-4 py-3 font-semibold">{t('tech.job.cancelled')}</p>}
      {status === 'new' && <p className="rounded-xl bg-sand-100 px-4 py-3 font-semibold">{t('tech.job.notStarted')}</p>}

      {status !== 'cancelled' && (
        <>
          <JobChecklist rows={rows} onChange={saveChecklist} disabled={status === 'completed' && !isAdmin} />
          <JobItems items={items} services={services} editable={itemsEditable} onChange={saveItems} />
          <JobPhotos photos={view.photos} onAdd={addPhoto} onRemove={removePhoto} disabled={status === 'new'} />
          <NotesCard notes={notes} t={t} fmtTime={fmtTime}
            onAdd={(message) => write({ method: 'POST', path: `/jobs/${id}/notes`, body: { message }, label: t('tech.notes.title'),
              apply: (j) => j }).then((r) => {
              if (!r.queued) { toast.success(t('tech.notes.added')); load(); } else setJob((j) => ({ ...j }));
            })} />
          <SignatureCard job={view} t={t} disabled={status === 'new'}
            onSave={(dataUrl) => write({ key: `signature:${id}`, method: 'POST', path: `/jobs/${id}/signature`, body: { data_url: dataUrl },
              label: t('tech.signature.title'), quiet: true, apply: (j) => ({ ...j, customer_signature: dataUrl }) })
              .then((r) => !r.queued && toast.success(t('tech.signature.saved')))} />
        </>
      )}

      {/* Primary status action, pinned above the tab bar */}
      {next && (
        <div className="fixed inset-x-0 z-20 bottom-[calc(64px+env(safe-area-inset-bottom))] bg-gradient-to-t from-sand-50 via-sand-50/95 to-sand-50/0 pt-6 pb-3">
          <div className="max-w-xl mx-auto px-4">
            <Button variant="cta" size="lg" block loading={busy} className="min-h-[60px] text-xl shadow-lift"
              onClick={() => (next === 'completed' ? setFinishOpen(true) : changeStatus(next))}>
              {t(`tech.job.action.${next}`)}
            </Button>
          </div>
        </div>
      )}
      {next && <div className="h-20" aria-hidden="true" />}

      <Modal open={finishOpen} onClose={() => setFinishOpen(false)} title={t('tech.job.finish.title')}
        footer={<>
          <Button variant="ghost" size="lg" onClick={() => setFinishOpen(false)}>{t('common.cancel')}</Button>
          <Button variant="cta" size="lg" loading={busy} onClick={async () => { setFinishOpen(false); await changeStatus('completed'); }}>{t('tech.job.finish.confirm')}</Button>
        </>}>
        <FinishChecks job={view} rows={rows} t={t} />
      </Modal>
    </div>
  );
}

function StatusStepper({ status, t }) {
  const idx = FLOW.indexOf(status);
  if (idx < 0) return null;
  return (
    <ol className="grid grid-cols-4 gap-1.5" aria-label={t(`status.${status}`)}>
      {FLOW.map((s, i) => {
        const done = i < idx || status === 'completed';
        const cur = i === idx && status !== 'completed';
        return (
          <li key={s} className="flex flex-col gap-1.5" aria-current={cur ? 'step' : undefined}>
            <span className={cx('h-2 rounded-full', done ? 'bg-success-500' : cur ? 'bg-saffron-400' : 'bg-sand-200')} />
            <span className={cx('text-xs leading-tight text-center', cur ? 'font-bold text-ink' : done ? 'text-success-600 font-semibold' : 'text-sand-600')}>
              {t(`tech.job.steps.${s}`)}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function FinishChecks({ job, rows, t }) {
  const after = (job.photos || []).filter((p) => p.kind === 'after').length;
  const done = rows.filter((r) => r.done).length;
  const checks = [
    { ok: done === rows.length && rows.length > 0, label: t('tech.job.finish.checklist', { done, total: rows.length }) },
    { ok: after > 0, label: t('tech.job.finish.afterPhotos', { n: after }) },
    { ok: Boolean(job.customer_signature), label: t('tech.job.finish.signature') },
  ];
  return (
    <div className="flex flex-col gap-3">
      <p className="text-base">{t('tech.job.finish.body')}</p>
      <ul className="flex flex-col gap-2">
        {checks.map((c) => (
          <li key={c.label} className="flex items-center gap-3 text-base">
            <span className={cx('h-7 w-7 rounded-full grid place-items-center shrink-0', c.ok ? 'bg-success-500 text-white' : 'bg-sand-200 text-sand-600')}>
              {c.ok ? <IconCheck size={16} strokeWidth={3} /> : '–'}
            </span>
            <span className={c.ok ? '' : 'text-sand-700'}>{c.label}</span>
          </li>
        ))}
      </ul>
      {checks.some((c) => !c.ok) && <p className="text-sm rounded-xl bg-saffron-50 text-saffron-800 px-3 py-2">{t('tech.job.finish.missing')}</p>}
      <TotalsBlock items={job.items || []} className="rounded-xl bg-sand-50 px-3 py-2" />
    </div>
  );
}

function NotesCard({ notes, onAdd, t, fmtTime }) {
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    const m = text.trim();
    if (!m) return;
    setBusy(true);
    try { await onAdd(m); setText(''); } catch { /* toasted */ } finally { setBusy(false); }
  };
  return (
    <section className="rounded-2xl bg-white border border-sand-200 p-4">
      <h2 className="text-lg font-bold mb-2 flex items-center gap-2"><IconNote size={20} className="text-petrol-600" />{t('tech.notes.title')}</h2>
      {notes.length > 0 ? (
        <ul className="flex flex-col gap-2 mb-3">
          {notes.map((n) => (
            <li key={n.id} className={cx('rounded-xl bg-sand-50 px-3 py-2', n.pending && 'opacity-70')}>
              <p className="text-base whitespace-pre-wrap">{n.message}</p>
              <p className="text-xs text-sand-600 mt-0.5">{n.actor?.name ? `${n.actor.name} · ` : ''}<span dir="ltr">{fmtTime(n.created_at)}</span></p>
            </li>
          ))}
        </ul>
      ) : <p className="text-sm text-sand-600 mb-3">{t('tech.notes.empty')}</p>}
      <form onSubmit={submit} className="flex flex-col gap-2">
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={2} maxLength={2000} placeholder={t('tech.notes.placeholder')}
          className="w-full rounded-xl border border-sand-300 px-3 py-2.5 text-base leading-relaxed focus:outline-none focus:border-petrol-500 focus:ring-2 focus:ring-petrol-100" />
        <Button type="submit" variant="secondary" size="lg" loading={busy} disabled={!text.trim()}>{t('tech.notes.add')}</Button>
      </form>
    </section>
  );
}

function SignatureCard({ job, onSave, t, disabled }) {
  const pad = useRef(null);
  const [hasInk, setHasInk] = useState(false);
  const [redo, setRedo] = useState(false);
  const [busy, setBusy] = useState(false);
  const existing = job.customer_signature && !redo;

  const save = async () => {
    const url = pad.current?.toDataURL();
    if (!url) return;
    setBusy(true);
    try { await onSave(url); setRedo(false); } catch { /* toasted */ } finally { setBusy(false); }
  };

  return (
    <section className="rounded-2xl bg-white border border-sand-200 p-4">
      <h2 className="text-lg font-bold mb-1 flex items-center gap-2"><IconPen size={20} className="text-petrol-600" />{t('tech.signature.title')}</h2>
      {existing ? (
        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-sand-200 bg-white p-2 grid place-items-center">
            <img src={job.customer_signature} alt={t('tech.signature.title')} className="max-h-40" />
          </div>
          {!disabled && <Button variant="ghost" size="lg" onClick={() => { setRedo(true); setHasInk(false); }}>{t('tech.signature.redo')}</Button>}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-sand-700">{t('tech.signature.hint')}</p>
          <div className="relative rounded-xl border-2 border-dashed border-sand-300 bg-sand-50 overflow-hidden">
            <SignaturePad ref={pad} onChange={setHasInk} height={200} />
            <span className="pointer-events-none absolute inset-x-6 bottom-10 border-b border-sand-300" aria-hidden="true" />
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="lg" className="flex-1" disabled={!hasInk} onClick={() => pad.current?.clear()}>{t('tech.signature.clear')}</Button>
            <Button variant="primary" size="lg" className="flex-[2]" loading={busy} disabled={!hasInk || disabled} onClick={save}>{t('tech.signature.save')}</Button>
          </div>
        </div>
      )}
    </section>
  );
}

function CompletionSummary({ job, isAdmin, t, toast, reload }) {
  const { fmtMoney } = useTechI18n();
  const x = totals(job.items || []);
  const amount = job.invoice?.total ?? x.total;
  const [busy, setBusy] = useState(null);
  const [cashDone, setCashDone] = useState(() => (job.events || []).some((e) => e.type === 'note' && /نقد|cash/i.test(e.message || '')));
  const paid = job.invoice?.status === 'paid';
  const firstName = (job.customer?.name || '').split(/\s+/)[0];

  const recordCash = async () => {
    if (!window.confirm(t('tech.complete.cashConfirm', { amount: fmtMoney(amount) }))) return;
    setBusy('cash');
    try {
      if (isAdmin && job.invoice?.id && job.invoice.status === 'unpaid') {
        await api.post(`/invoices/${job.invoice.id}/pay`, { payment_method: 'cash' });
      } else {
        // Technicians can't mark invoices paid (owner/dispatcher only) — log it on the job so the office can reconcile.
        const ar = `تحصيل نقدي من العميل: ${amount.toFixed(2)} ر.س`;
        await sendOrQueue({ method: 'POST', path: `/jobs/${job.id}/notes`, body: { message: ar }, label: t('tech.complete.cash'), jobId: job.id });
      }
      setCashDone(true);
      toast.success(t('tech.complete.cashRecorded', { amount: fmtMoney(amount) }));
      reload();
    } catch (e) { toast.error(e); } finally { setBusy(null); }
  };

  const sendLink = async () => {
    setBusy('link');
    let url = job.tracking_url || `${window.location.origin}/t/${job.public_token}`;
    if (url.startsWith('/')) url = `${window.location.origin}${url}`;
    if (isAdmin && job.invoice?.id && job.invoice.status === 'unpaid') {
      try {
        const r = await api.post(`/invoices/${job.invoice.id}/payment-link`);
        if (r?.url && !r.simulated) url = r.url;
      } catch { /* fall back to tracking page, which links invoice + pay */ }
    }
    const text = job.invoice
      ? t('tech.complete.linkMsg', { name: firstName, number: job.number, url })
      : t('tech.complete.linkMsgNoInvoice', { name: firstName, number: job.number, url });
    const wa = waUrl(job.customer?.phone, text);
    setBusy(null);
    if (wa) { window.open(wa, '_blank', 'noopener'); toast.info(t('tech.complete.linkSent')); }
  };

  return (
    <section className="rounded-2xl bg-petrol-700 text-sand-50 p-4 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="h-11 w-11 rounded-full bg-success-500 grid place-items-center shrink-0"><IconCheck size={24} strokeWidth={3} /></span>
        <div>
          <p className="text-sm text-petrol-100">{t('tech.complete.title')}</p>
          <p className="text-lg font-bold">{t('tech.complete.done')}</p>
        </div>
      </div>
      <div className="rounded-xl bg-white text-ink px-3 py-2">
        <TotalsBlock items={job.items || []} />
        {job.invoice && (
          <p className="mt-2 pt-2 border-t border-sand-200 flex items-center justify-between text-sm">
            <span className="tabular-nums">{t('tech.complete.invoice', { n: job.invoice.number })}</span>
            <span className={cx('font-bold', paid ? 'text-success-600' : 'text-saffron-700')}>{paid ? t('tech.complete.paid') : t('tech.complete.unpaid')}</span>
          </p>
        )}
      </div>
      {!paid && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-petrol-100">{t('tech.complete.collect')}</p>
          <button type="button" onClick={recordCash} disabled={busy !== null || cashDone}
            className="min-h-[56px] rounded-xl bg-white text-petrol-800 font-bold text-base inline-flex items-center justify-center gap-2 active:bg-petrol-50 disabled:opacity-70">
            {busy === 'cash' ? <Spinner size={20} /> : cashDone ? <IconCheck size={22} strokeWidth={3} /> : <IconCash size={22} />}
            {cashDone ? t('tech.complete.cashRecorded', { amount: fmtMoney(amount) }) : t('tech.complete.cash')}
          </button>
          <button type="button" onClick={sendLink} disabled={busy !== null || !job.customer?.phone}
            className="min-h-[56px] rounded-xl bg-petrol-600 border border-petrol-400 text-white font-bold text-base inline-flex items-center justify-center gap-2 active:bg-petrol-800 disabled:opacity-70">
            {busy === 'link' ? <Spinner size={20} /> : <IconWhatsApp size={22} />}{t('tech.complete.sendLink')}
          </button>
          {!job.invoice && <p className="text-xs text-petrol-100">{t('tech.complete.noInvoice')}</p>}
        </div>
      )}
    </section>
  );
}
