// OWNER: B4. Public invoice /i/:token — bilingual (Arabic + English labels side by side, as ZATCA invoices usually are),
// TLV QR (PNG from /api/public/invoices/:token/qr.png), pay now (Moyasar link), PDF download, print.
import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { api, ApiError } from '../../lib/api.js';
import { useI18n } from '../../i18n/index.jsx';
import { Button } from '../../components/ui/index.js';
import { cx } from '../../lib/cx.js';
import PublicShell, { PublicMessage, CompanyMark, companyName } from '../../components/public/PublicShell.jsx';
import ar from '../../i18n/ns/public.ar.json';
import en from '../../i18n/ns/public.en.json';

const nf = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const money = (n) => nf.format(Number(n || 0));
/** "الإجمالي / Total" — invoices print both languages regardless of UI locale. */
const bi = (key) => ({ ar: key.split('.').reduce((o, k) => o?.[k], ar.invoice), en: key.split('.').reduce((o, k) => o?.[k], en.invoice) });

function BiLabel({ k, className }) {
  const l = bi(k);
  return (
    <span className={cx('flex flex-col leading-tight', className)}>
      <span>{l.ar}</span>
      <span lang="en" dir="ltr" className="text-[11px] text-sand-500 font-normal text-start">{l.en}</span>
    </span>
  );
}

export default function InvoiceView() {
  const { token } = useParams();
  const { t } = useI18n();
  const [inv, setInv] = useState(undefined);
  const [err, setErr] = useState(null);

  const load = () => api.get(`/public/invoices/${encodeURIComponent(token)}`)
    .then((d) => { setInv(d); setErr(null); })
    .catch((e) => { setErr(e); setInv(null); });

  useEffect(() => { load(); }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  if (inv === null) {
    const notFound = err instanceof ApiError && (err.status === 404 || err.status === 400);
    return (
      <PublicShell>
        <PublicMessage title={notFound ? t('public.notFound.invoice') : t('public.loadError')}>
          {!notFound && <Button onClick={load}>{t('common.retry')}</Button>}
        </PublicMessage>
      </PublicShell>
    );
  }
  return (
    <PublicShell company={inv?.company} loading={inv === undefined} wide>
      {inv && <Invoice inv={inv} token={token} />}
    </PublicShell>
  );
}

export function Invoice({ inv, token }) {
  const { t, locale, fmtDate, fmtTime } = useI18n();
  const [params] = useSearchParams();
  const [paying, setPaying] = useState(false);
  const [payMsg, setPayMsg] = useState(null);
  const co = inv.company || {};
  const buyer = inv.customer || {};
  const titleKey = inv.kind === 'credit_note' ? 'titleCredit' : inv.kind === 'simplified' ? 'titleSimplified' : 'title';

  useEffect(() => { document.title = `${bi(titleKey).ar} ${inv.number ?? ''} | ${companyName(co, locale)}`; }, [inv.number, titleKey, co, locale]);

  const pay = async () => {
    setPaying(true);
    setPayMsg(null);
    try {
      const r = await api.post(`/public/invoices/${encodeURIComponent(token)}/pay`);
      if (r?.simulated) {
        setPayMsg(t('public.invoice.simulated'));
        if (r.url && /^https?:\/\//.test(r.url) && !r.url.includes(`/i/${token}`)) window.location.assign(r.url);
      } else if (r?.url) {
        window.location.assign(r.url);
        return;
      } else setPayMsg(t('public.invoice.payUnavailable'));
    } catch (e) {
      setPayMsg(e instanceof ApiError && e.status === 409 ? t('public.invoice.thanksPaid') : t('public.invoice.payUnavailable'));
    } finally {
      setPaying(false);
    }
  };

  const statusTone = { paid: 'bg-success-50 text-success-600', unpaid: 'bg-saffron-50 text-saffron-700', void: 'bg-danger-50 text-danger-700' }[inv.status] || 'bg-sand-100 text-sand-700';

  return (
    <div className="flex flex-col gap-4">
      {/* Status + actions */}
      <div className="flex flex-col gap-3 print:hidden">
        {params.get('paid') && inv.status === 'paid' && (
          <p className="rounded-xl bg-success-50 text-success-600 px-4 py-3 font-semibold">{t('public.invoice.thanksPaid')}</p>
        )}
        {inv.can_pay && (
          <Button variant="cta" size="lg" block loading={paying} onClick={pay} className="min-h-[56px] text-lg">
            {t('public.invoice.pay', { amount: t('common.currency', { amount: money(inv.total) }) })}
          </Button>
        )}
        {payMsg && <p className="rounded-xl bg-sand-100 text-sand-800 px-4 py-3 text-sm">{payMsg}</p>}
        <div className="flex gap-2 flex-wrap">
          <Button as="a" href={inv.pdf_url || `/api/public/invoices/${token}/pdf`} target="_blank" rel="noopener" variant="secondary">{t('public.invoice.pdf')}</Button>
          <Button variant="ghost" onClick={() => window.print()}>{t('public.invoice.print')}</Button>
          {inv.tracking_url && <Button as={Link} to={inv.tracking_url} variant="ghost">{t('public.invoice.trackJob')}</Button>}
        </div>
      </div>

      {/* The document */}
      <article dir="rtl" lang="ar" className="rounded-2xl bg-white border border-sand-200 shadow-card overflow-hidden print:shadow-none print:border-0">
        <header className="px-5 sm:px-7 pt-6 pb-5 flex items-start justify-between gap-4 border-b border-sand-100">
          <div className="flex items-start gap-3 min-w-0">
            <CompanyMark company={co} size={52} />
            <div className="min-w-0">
              <p className="font-bold text-lg leading-tight">{co.name_ar || co.name}</p>
              {co.name && co.name_ar && <p lang="en" dir="ltr" className="text-sm text-sand-600 text-start">{co.name}</p>}
              {co.address && <p className="text-sm text-sand-600 mt-1">{co.address}</p>}
            </div>
          </div>
          <span className={cx('shrink-0 rounded-full px-3 py-1 text-sm font-semibold', statusTone)}>
            {bi(inv.status === 'paid' ? 'paid' : inv.status === 'void' ? 'void' : 'unpaid').ar}
          </span>
        </header>

        <div className="px-5 sm:px-7 py-5 grid sm:grid-cols-[1fr_auto] gap-6">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-xl font-bold">{bi(titleKey).ar}</h1>
              <p lang="en" dir="ltr" className="text-sm text-sand-500 text-start">{bi(titleKey).en}</p>
            </div>
            <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2.5 text-sm">
              <dt className="text-sand-600"><BiLabel k="number" /></dt><dd className="font-semibold tabular-nums self-center" dir="ltr">{inv.number ?? '—'}</dd>
              <dt className="text-sand-600"><BiLabel k="date" /></dt>
              <dd className="self-center tabular-nums">{fmtDate(inv.issue_date)} · <span dir="ltr">{fmtTime(inv.issue_date)}</span></dd>
              {co.vat_number && (<><dt className="text-sand-600"><BiLabel k="vat" /></dt><dd className="self-center tabular-nums" dir="ltr">{co.vat_number}</dd></>)}
              {co.cr_number && (<><dt className="text-sand-600"><BiLabel k="cr" /></dt><dd className="self-center tabular-nums" dir="ltr">{co.cr_number}</dd></>)}
            </dl>
            <div className="rounded-xl bg-sand-50 px-4 py-3">
              <p className="text-xs text-sand-600"><BiLabel k="buyer" /></p>
              <p className="font-semibold mt-1">{buyer.name}</p>
              {buyer.vat_number && <p className="text-sm text-sand-700 tabular-nums">{bi('vat').ar}: <span dir="ltr">{buyer.vat_number}</span></p>}
            </div>
          </div>
          {inv.qr_tlv && (
            <figure className="flex flex-col items-center gap-2 sm:w-44">
              <img src={inv.qr_png_url || `/api/public/invoices/${token}/qr.png`} alt={bi('qr').ar} width="168" height="168"
                className="w-40 h-40 sm:w-44 sm:h-44 rounded-lg border border-sand-200 bg-white p-1.5" />
              <figcaption className="text-[11px] text-sand-600 text-center leading-snug">{bi('qrHint').ar}</figcaption>
            </figure>
          )}
        </div>

        {/* Lines */}
        <div className="px-3 sm:px-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-sand-200 bg-sand-50/70 text-sand-700">
                <th className="text-start font-medium px-2 py-2"><BiLabel k="description" /></th>
                <th className="text-center font-medium px-2 py-2 w-12"><BiLabel k="qty" /></th>
                <th className="text-end font-medium px-2 py-2 hidden sm:table-cell"><BiLabel k="unitPrice" className="items-end" /></th>
                <th className="text-end font-medium px-2 py-2"><BiLabel k="lineTotal" className="items-end" /></th>
              </tr>
            </thead>
            <tbody>
              {(inv.lines || []).map((l, i) => (
                <tr key={i} className="border-b border-sand-100 align-top">
                  <td className="px-2 py-3">
                    <p className="font-medium">{l.description}</p>
                    <p className="sm:hidden text-xs text-sand-600 tabular-nums" dir="ltr">{money(l.unit_price)} × {Number(l.qty)}</p>
                  </td>
                  <td className="px-2 py-3 text-center tabular-nums">{Number(l.qty)}</td>
                  <td className="px-2 py-3 text-end tabular-nums hidden sm:table-cell">{money(l.unit_price)}</td>
                  <td className="px-2 py-3 text-end tabular-nums font-medium">{money(l.line_total ?? l.qty * l.unit_price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <dl className="px-5 sm:px-7 py-5 flex flex-col gap-2 text-sm sm:w-96 sm:ms-auto">
          <div className="flex justify-between items-center"><dt><BiLabel k="subtotal" /></dt><dd className="tabular-nums">{money(inv.subtotal)}</dd></div>
          <div className="flex justify-between items-center"><dt><BiLabel k="vatAmount" /> </dt><dd className="tabular-nums">{money(inv.vat_amount)}</dd></div>
          <div className="flex justify-between items-center border-t-2 border-petrol-700 pt-3 mt-1 text-lg font-bold text-petrol-800">
            <dt><BiLabel k="total" /></dt>
            <dd className="tabular-nums">{money(inv.total)} <span className="text-sm font-semibold">ر.س</span></dd>
          </div>
        </dl>

        {inv.status === 'paid' && inv.paid_at && (
          <p className="mx-5 sm:mx-7 mb-5 rounded-xl bg-success-50 text-success-600 px-4 py-2.5 text-sm font-semibold">
            {ar.invoice.paidOn.replace('{date}', fmtDate(inv.paid_at))}
            {inv.payment_method && ` · ${ar.invoice.methods[inv.payment_method] || inv.payment_method}`}
          </p>
        )}
        {inv.notes && <p className="mx-5 sm:mx-7 mb-5 text-sm text-sand-700 whitespace-pre-wrap">{inv.notes}</p>}
        {inv.uuid && <p className="px-5 sm:px-7 pb-5 text-[10px] text-sand-400 tabular-nums break-all" dir="ltr">UUID {inv.uuid}</p>}
      </article>
    </div>
  );
}
