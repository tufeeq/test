// OWNER: B3. Invoice detail: ZATCA tax invoice preview with QR, payment & sharing actions.
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../lib/api.js';
import { useAsync } from '../../../lib/useAsync.js';
import { useAuth } from '../../../lib/auth.jsx';
import { useI18n } from '../../../i18n/index.jsx';
import { Badge, Button, Card, Modal, PageHeader, Textarea, useToast } from '../../../components/ui/index.js';
import Icon from '../../../components/app/icons.jsx';
import InvoiceNewModal from '../../../components/app/InvoiceNew.jsx';
import { absUrl, CopyButton, ErrorState, InvoiceStatusBadge, KV, Ltr, Money, PageSkeleton, downloadFrom, useConfirm, waLink } from '../../../components/app/kit.jsx';
import { greg, hijri, timeHM } from '../../../components/app/dates.js';
import { cx } from '../../../lib/cx.js';

const METHODS = ['cash', 'mada', 'card', 'transfer'];
const METHOD_ICON = { cash: 'money', mada: 'billing', card: 'billing', transfer: 'send' };

export default function InvoiceDetail() {
  const { id } = useParams();
  const { t, locale } = useI18n();
  const toast = useToast();
  const nav = useNavigate();
  const { user } = useAuth();
  const { data: inv, error, loading, reload, setData } = useAsync(() => api.get(`/invoices/${id}`), [id]);
  const [busy, setBusy] = useState(null);
  const [payOpen, setPayOpen] = useState(false);
  const [waOpen, setWaOpen] = useState(false);
  const [reissue, setReissue] = useState(null);
  const [qrFailed, setQrFailed] = useState(false);
  const [creditOpen, setCreditOpen] = useState(false);
  const [confirm, confirmNode] = useConfirm();

  if (error) return <div><PageHeader title={t('app.invoices.title')} back="/app/invoices" /><ErrorState error={error} onRetry={reload} /></div>;
  if (loading && !inv) return <PageSkeleton />;
  if (!inv) return null;

  const seller = inv.company || {};
  const publicUrl = absUrl(inv.public_url || (inv.public_token ? `/i/${inv.public_token}` : ''));
  const lines = inv.lines || [];
  const isCN = inv.kind === 'credit_note';
  const isDraft = inv.status === 'draft';
  const docTitle = isCN ? t('app.invoices.creditNote') : isDraft ? t('app.invoices.draft') : t('app.invoices.invoice');

  const issue = async () => {
    setBusy('issue');
    try { const r = await api.post(`/invoices/${inv.id}/issue`); setData(r); toast.success(t('app.invoices.issued', { n: r.number })); }
    catch (e) { toast.error(e); } finally { setBusy(null); }
  };
  const delDraft = async () => {
    if (!(await confirm({ title: t('app.invoices.deleteDraft'), body: t('app.jobs.deleteBody'), danger: true, confirmLabel: t('common.delete') }))) return;
    try { await api.del(`/invoices/${inv.id}`); toast.success(t('common.deleted')); nav('/app/invoices'); } catch (e) { toast.error(e); }
  };

  const pay = async (method) => {
    setBusy('pay');
    try { const r = await api.post(`/invoices/${inv.id}/pay`, { payment_method: method }); setData((x) => ({ ...x, ...r })); setPayOpen(false); toast.success(t('app.invoices.markedPaid')); }
    catch (e) { toast.error(e); } finally { setBusy(null); }
  };
  const link = async () => {
    setBusy('link');
    try {
      const r = await api.post(`/invoices/${inv.id}/payment-link`);
      setData((x) => ({ ...x, payment_link_url: r.url }));
      toast.success(r.simulated ? t('app.invoices.linkSimulated') : t('app.invoices.linkReady'));
    } catch (e) { toast.error(e); } finally { setBusy(null); }
  };
  const pdf = async () => {
    setBusy('pdf');
    try { await downloadFrom(`/invoices/${inv.id}/pdf?download=1`, `${isCN ? 'credit-note' : 'invoice'}-${inv.number ?? 'draft'}.pdf`); } catch (e) { toast.error(e); } finally { setBusy(null); }
  };
  const voidIt = async (andReissue) => {
    if (!(await confirm({ title: t('app.invoices.voidTitle', { n: inv.number }), body: andReissue ? t('app.invoices.reissueBody') : t('app.invoices.voidBody'), danger: true, confirmLabel: andReissue ? t('app.invoices.voidReissue') : t('app.invoices.void') }))) return;
    setBusy('void');
    try {
      const r = await api.post(`/invoices/${inv.id}/void`, {});
      setData((x) => ({ ...x, ...r, lines: r.lines || x.lines }));
      toast.success(r.credit_note_id ? t('app.invoices.voidedCn') : t('app.invoices.voided'));
      if (andReissue) setReissue({ customer: inv.customer, lines, kind: inv.kind, notes: t('app.invoices.replaces', { n: inv.number }), title: t('app.invoices.reissueTitle', { n: inv.number }) });
    } catch (e) { toast.error(e); } finally { setBusy(null); }
  };

  return (
    <div className="flex flex-col gap-6">
      {confirmNode}
      <PageHeader back="/app/invoices"
        title={<span className="flex items-center gap-3"><span>{docTitle}</span>{inv.number != null && <Ltr className="text-sand-400">#{inv.number}</Ltr>}</span>}
        actions={<>
          <Button variant="secondary" icon={<Icon name="download" size={16} />} onClick={pdf} loading={busy === 'pdf'}>{t('app.invoices.pdf')}</Button>
          {isDraft && <Button variant="ghost" className="text-danger-600" onClick={delDraft}>{t('common.delete')}</Button>}
          {isDraft && <Button variant="cta" icon={<Icon name="check" size={16} />} onClick={issue} loading={busy === 'issue'}>{t('app.invoices.issue')}</Button>}
          {!isDraft && inv.status !== 'void' && <Button variant="secondary" icon={<Icon name="whatsapp" size={16} />} onClick={() => setWaOpen(true)}>{t('app.invoices.sendWa')}</Button>}
          {inv.status === 'unpaid' && !isCN && <Button variant="cta" icon={<Icon name="money" size={16} />} onClick={() => setPayOpen(true)}>{t('app.invoices.markPaid')}</Button>}
        </>}>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <InvoiceStatusBadge status={inv.status} />
          <Badge tone={isCN ? 'danger' : 'petrol'}>{t(`app.invoices.kind_${inv.kind}`)}</Badge>
          {inv.original_invoice && <Link to={`/app/invoices/${inv.original_invoice.id}`} className="text-sm text-petrol-700 hover:underline">{t('app.invoices.forInvoice', { n: inv.original_invoice.number })}</Link>}
          {inv.paid_at && <span className="text-sm text-sand-600 tabular-nums">{t('app.invoices.paidOn', { d: greg(inv.paid_at, locale), m: t(`app.invoices.method_${inv.payment_method}`) !== `app.invoices.method_${inv.payment_method}` ? t(`app.invoices.method_${inv.payment_method}`) : inv.payment_method || '' })}</span>}
        </div>
      </PageHeader>

      <div className="grid lg:grid-cols-[1fr_20rem] gap-6 items-start">
        {/* Invoice paper */}
        <article className={cx('relative rounded-2xl bg-white border border-sand-200/70 shadow-card overflow-hidden', inv.status === 'void' && 'opacity-80')}>
          {inv.status === 'void' && <div className="absolute inset-0 grid place-items-center pointer-events-none"><span className="text-6xl font-bold text-danger-500/15 -rotate-12 border-4 border-danger-500/15 rounded-2xl px-6 py-2">{t('invoiceStatus.void')}</span></div>}
          <header className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 sm:items-start border-b border-sand-100">
            <div className="flex-1 min-w-0 flex gap-3">
              {seller.logo_url && <img src={seller.logo_url} alt="" className="h-14 w-14 rounded-xl object-contain bg-sand-50 border border-sand-100" />}
              <div className="min-w-0">
                <div className="font-bold text-lg">{seller.name_ar || seller.name}</div>
                {seller.name && seller.name_ar && <div className="text-sand-600 text-sm" dir="ltr">{seller.name}</div>}
                <div className="text-sm text-sand-600 mt-1">{seller.address}</div>
                <div className="text-sm mt-1 flex flex-wrap gap-x-4">
                  {seller.vat_number && <span>{t('app.invoices.sellerVat')}: <Ltr>{seller.vat_number}</Ltr></span>}
                  {seller.cr_number && <span>{t('app.settings.cr')}: <Ltr>{seller.cr_number}</Ltr></span>}
                </div>
              </div>
            </div>
            <div className="shrink-0 flex sm:flex-col items-center gap-3">
              {!qrFailed ? (
                <img src={`/api/invoices/${inv.id}/qr.png`} alt={t('app.invoices.qrAlt')} onError={() => setQrFailed(true)} className="h-28 w-28 rounded-lg border border-sand-100 bg-white p-1" />
              ) : (
                <div className="h-28 w-28 rounded-lg border border-dashed border-sand-300 grid place-items-center text-center text-xs text-sand-500 p-2"><Icon name="qr" size={28} /></div>
              )}
              <span className="text-xs text-sand-500 max-w-[7rem] text-center">{t('app.invoices.zatcaQr')}</span>
            </div>
          </header>

          <div className="p-5 sm:p-6 grid sm:grid-cols-2 gap-5 border-b border-sand-100">
            <div>
              <h3 className="text-xl font-bold">{isCN ? t('app.invoices.creditNote') : (inv.kind === 'standard' || inv.original_kind === 'standard') ? t('app.invoices.taxInvoice') : t('app.invoices.simplifiedTaxInvoice')}</h3>
              {isDraft && <p className="text-sm text-saffron-700 mt-1">{t('app.invoices.draftNote')}</p>}
              {isCN && inv.credit_reason && <p className="text-sm text-sand-700 mt-1">{t('app.invoices.reason')}: {inv.credit_reason}</p>}
              <dl className="mt-2 text-sm">
                <KV label={t('app.invoices.number')}><Ltr className="font-semibold">{inv.number ?? '—'}</Ltr></KV>
                <KV label={t('app.invoices.issueDate')}><span className="tabular-nums">{greg(inv.issue_date, locale)} · {timeHM(inv.issue_date, locale)}</span><div className="text-xs text-sand-500">{hijri(inv.issue_date, locale)}</div></KV>
                {inv.uuid && <KV label="UUID"><Ltr className="text-xs break-all">{inv.uuid}</Ltr></KV>}
              </dl>
            </div>
            <div className="rounded-xl bg-sand-100 p-4">
              <div className="text-sm text-sand-600">{t('app.invoices.billTo')}</div>
              <Link to={`/app/customers/${inv.customer?.id}`} className="font-semibold hover:underline">{inv.customer?.name}</Link>
              <div><Ltr className="text-sm text-sand-700">{inv.customer?.phone}</Ltr></div>
              {inv.customer?.vat_number && <div className="text-sm mt-1">{t('app.customers.vat')}: <Ltr>{inv.customer.vat_number}</Ltr></div>}
              {inv.job_id && <Link to={`/app/jobs/${inv.job_id}`} className="text-sm text-petrol-700 hover:underline inline-flex items-center gap-1 mt-2"><Icon name="jobs" size={14} />{t('app.invoices.fromJob')}</Link>}
              {inv.contract_id && <Link to={`/app/contracts/${inv.contract_id}`} className="text-sm text-petrol-700 hover:underline inline-flex items-center gap-1 mt-2"><Icon name="cycle" size={14} />{t('app.invoices.fromContract')}</Link>}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-base">
              <thead><tr className="text-sm text-sand-600 bg-sand-50/80 border-b border-sand-200">
                <th className="px-5 py-2.5 text-start font-medium">{t('app.items.description')}</th>
                <th className="px-3 py-2.5 text-center font-medium">{t('app.items.qty')}</th>
                <th className="px-3 py-2.5 text-end font-medium">{t('app.items.unitPrice')}</th>
                <th className="px-3 py-2.5 text-end font-medium">{t('app.invoices.vatRate')}</th>
                <th className="px-5 py-2.5 text-end font-medium">{t('app.items.lineTotal')}</th>
              </tr></thead>
              <tbody>
                {lines.map((l) => (
                  <tr key={l.id} className="border-b border-sand-100">
                    <td className="px-5 py-3">{l.description}</td>
                    <td className="px-3 py-3 text-center tabular-nums">{Number(l.qty)}</td>
                    <td className="px-3 py-3 text-end"><Money value={l.unit_price} /></td>
                    <td className="px-3 py-3 text-end tabular-nums text-sand-600">{Math.round(Number(l.vat_rate ?? 0.15) * 100)}%</td>
                    <td className="px-5 py-3 text-end"><Money value={l.line_total ?? Number(l.qty) * Number(l.unit_price)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <dl className="p-5 sm:p-6 ms-auto w-full sm:w-80 text-base">
            <div className="flex justify-between py-1"><dt className="text-sand-600">{t('app.invoices.totalExVat')}</dt><dd><Money value={inv.subtotal} /></dd></div>
            <div className="flex justify-between py-1"><dt className="text-sand-600">{t('app.items.vat')}</dt><dd><Money value={inv.vat_amount} /></dd></div>
            <div className="flex justify-between py-2.5 mt-1 border-t-2 border-petrol-600 text-xl"><dt className="font-bold">{t('app.invoices.totalInclVat')}</dt><dd><Money value={inv.total} strong /></dd></div>
          </dl>
          {inv.notes && <p className="px-5 sm:px-6 pb-6 text-sm text-sand-700 whitespace-pre-line">{inv.notes}</p>}
          {(inv.credit_notes || []).length > 0 && (
            <div className="mx-5 sm:mx-6 mb-6 rounded-xl bg-danger-50 border border-danger-500/20 p-4">
              <div className="font-medium text-danger-700 mb-2">{t('app.invoices.creditNotes')} · <Money value={inv.credited_total} /></div>
              <ul className="flex flex-col gap-1 text-sm">
                {inv.credit_notes.map((c) => (
                  <li key={c.id}><Link to={`/app/invoices/${c.id}`} className="flex gap-3 hover:underline"><Ltr>#{c.number}</Ltr><span className="flex-1 truncate text-sand-700">{c.credit_reason}</span><Money value={Math.abs(c.total)} /></Link></li>
                ))}
              </ul>
            </div>
          )}
        </article>

        {/* Side actions */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-20">
          {!isDraft && <Card title={t('app.invoices.share')}>
            <div className="text-sm text-sand-600 mb-1">{t('app.invoices.publicLink')}</div>
            <div className="rounded-xl bg-sand-100 px-3 py-2 text-sm break-all" dir="ltr">{publicUrl}</div>
            <div className="flex flex-wrap gap-2 mt-2">
              <CopyButton text={publicUrl} />
              <Button as="a" href={publicUrl} target="_blank" rel="noreferrer" size="sm" variant="ghost" icon={<Icon name="external" size={15} />}>{t('app.common.open')}</Button>
            </div>
            {inv.status === 'unpaid' && !isCN && (
              <div className="mt-4 pt-4 border-t border-sand-100">
                <div className="text-sm text-sand-600 mb-1">{t('app.invoices.paymentLink')}</div>
                {inv.payment_link_url ? <>
                  <div className="rounded-xl bg-sand-100 px-3 py-2 text-sm break-all" dir="ltr">{inv.payment_link_url}</div>
                  <div className="mt-2"><CopyButton text={inv.payment_link_url} /></div>
                </> : <Button size="sm" variant="secondary" icon={<Icon name="link" size={15} />} loading={busy === 'link'} onClick={link}>{t('app.invoices.createLink')}</Button>}
              </div>
            )}
          </Card>}

          {inv.status !== 'void' && !isDraft && !isCN && user?.role === 'owner' && (
            <Card title={t('app.invoices.corrections')} subtitle={t('app.invoices.correctionsSub')}>
              {inv.status === 'paid' ? (
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-sand-600">{t('app.invoices.paidCantVoid')}</p>
                  <Button variant="secondary" onClick={() => setCreditOpen(true)}>{t('app.invoices.issueCredit')}</Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button variant="secondary" onClick={() => voidIt(true)} loading={busy === 'void'}>{t('app.invoices.voidReissue')}</Button>
                  <Button variant="ghost" className="text-danger-600 hover:bg-danger-50" onClick={() => voidIt(false)}>{t('app.invoices.void')}</Button>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>

      <Modal open={payOpen} onClose={() => setPayOpen(false)} size="sm" title={t('app.invoices.markPaidTitle', { n: inv.number })}>
        <p className="text-sand-700 mb-4">{t('app.invoices.chooseMethod')} · <Money value={inv.total} strong /></p>
        <div className="grid grid-cols-2 gap-2">
          {METHODS.map((m) => (
            <button key={m} disabled={busy === 'pay'} onClick={() => pay(m)} className="rounded-xl border border-sand-200 bg-white hover:border-petrol-400 hover:bg-petrol-50 py-4 flex flex-col items-center gap-2 disabled:opacity-50">
              <Icon name={METHOD_ICON[m]} size={22} className="text-petrol-600" />
              <span className="font-medium">{t(`app.invoices.method_${m}`)}</span>
            </button>
          ))}
        </div>
      </Modal>

      <CreditNoteModal open={creditOpen} onClose={() => setCreditOpen(false)} inv={inv} onDone={(cn) => { setCreditOpen(false); reload(); nav(`/app/invoices/${cn.id}`); }} />
      <SendInvoiceModal open={waOpen} onClose={() => setWaOpen(false)} inv={inv} publicUrl={publicUrl} />
      <InvoiceNewModal open={!!reissue} onClose={() => setReissue(null)} initial={reissue} onSaved={(n) => nav(`/app/invoices/${n.id}`)} />
    </div>
  );
}

function SendInvoiceModal({ open, onClose, inv, publicUrl }) {
  const { t, fmtMoney } = useI18n();
  const toast = useToast();
  const { company } = useAuth();
  const [body, setBody] = useState('');
  const [custom, setCustom] = useState(false);
  const [sending, setSending] = useState(false);
  useEffect(() => {
    if (open) { setCustom(false); setBody(t('app.invoices.waTemplate', { name: inv.customer?.name || '', company: company?.name_ar || company?.name || '', n: inv.number, total: fmtMoney(inv.total), url: inv.payment_link_url || publicUrl })); }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
  const send = async () => {
    setSending(true);
    try {
      // Standard bilingual message composed by the server; custom text goes through /messages.
      const r = custom
        ? await api.post('/messages', { customer_id: inv.customer?.id, ...(inv.job_id ? { job_id: inv.job_id } : {}), channel: 'whatsapp', body })
        : await api.post(`/invoices/${inv.id}/send`, { channel: 'whatsapp' });
      const st = r?.status || r?.message?.status;
      toast.success(st === 'simulated' ? t('app.messages.sentSimulated') : t('app.messages.sent')); onClose();
    } catch (e) { toast.error(e); } finally { setSending(false); }
  };
  return (
    <Modal open={open} onClose={onClose} title={t('app.invoices.sendWa')}
      footer={<>
        <Button as="a" href={waLink(inv.customer?.phone, body)} target="_blank" rel="noreferrer" variant="ghost" className="me-auto" icon={<Icon name="external" size={15} />}>{t('app.messages.openWa')}</Button>
        <Button variant="secondary" onClick={onClose}>{t('common.cancel')}</Button>
        <Button onClick={send} loading={sending} icon={<Icon name="send" size={15} />}>{t('app.messages.send')}</Button>
      </>}>
      <div className="text-sm text-sand-600 mb-3">{t('app.messages.to')}: <Ltr className="text-ink font-medium">{inv.customer?.phone}</Ltr></div>
      <label className="flex items-center gap-2 mb-3 text-sm">
        <input type="checkbox" checked={custom} onChange={(e) => setCustom(e.target.checked)} className="h-4 w-4 accent-petrol-600" />{t('app.invoices.customText')}
      </label>
      {custom ? <Textarea rows={6} value={body} onChange={(e) => setBody(e.target.value)} />
        : <p className="rounded-xl bg-sand-100 px-4 py-3 text-sm text-sand-700">{t('app.invoices.standardMsg')}</p>}
    </Modal>
  );
}

function CreditNoteModal({ open, onClose, inv, onDone }) {
  const { t } = useI18n();
  const toast = useToast();
  const [reason, setReason] = useState('');
  const [saving, setSaving] = useState(false);
  useEffect(() => { if (open) setReason(''); }, [open]);
  const submit = async () => {
    if (reason.trim().length < 2) return;
    setSaving(true);
    try { const cn = await api.post(`/invoices/${inv.id}/credit-note`, { reason: reason.trim() }); toast.success(t('app.invoices.creditIssued', { n: cn.number })); onDone(cn); }
    catch (e) { toast.error(e); } finally { setSaving(false); }
  };
  return (
    <Modal open={open} onClose={onClose} size="sm" title={t('app.invoices.issueCredit')}
      footer={<><Button variant="secondary" onClick={onClose}>{t('common.cancel')}</Button><Button variant="danger" onClick={submit} loading={saving} disabled={reason.trim().length < 2}>{t('app.invoices.issueCredit')}</Button></>}>
      <p className="text-sand-700 mb-3">{t('app.invoices.creditBody', { n: inv.number })} <Money value={inv.total} strong /></p>
      <Textarea rows={3} label={t('app.invoices.reason')} required value={reason} onChange={(e) => setReason(e.target.value)} />
    </Modal>
  );
}
