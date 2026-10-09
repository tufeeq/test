// OWNER: B4. Public job tracking /t/:token — "وين الفني؟" answered without a phone call.
// Stepper (received → scheduled → on the way → in progress → done), technician first name, window, contact,
// rating once after completion, invoice link. Polls every 30s while the job is active.
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api, ApiError } from '../../lib/api.js';
import { useI18n } from '../../i18n/index.jsx';
import { Button } from '../../components/ui/index.js';
import { cx } from '../../lib/cx.js';
import PublicShell, { PublicMessage, companyName } from '../../components/public/PublicShell.jsx';
import { telHref, waHref } from '../../components/public/util.js';

const STEPS = ['received', 'scheduled', 'on_the_way', 'in_progress', 'completed'];
const STEP_OF = { new: 0, scheduled: 1, on_the_way: 2, in_progress: 3, completed: 4 };
const ACTIVE = ['new', 'scheduled', 'on_the_way', 'in_progress'];

export default function TrackingPage() {
  const { token } = useParams();
  const { t } = useI18n();
  const [data, setData] = useState(undefined);
  const [err, setErr] = useState(null);

  const load = useCallback(async () => {
    try {
      const d = await api.get(`/public/track/${encodeURIComponent(token)}`);
      setData(d);
      setErr(null);
    } catch (e) {
      setErr(e);
      setData((cur) => (cur === undefined ? null : cur));
    }
  }, [token]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    if (!data || !ACTIVE.includes(data.status)) return undefined;
    const id = setInterval(() => document.visibilityState === 'visible' && load(), 30000);
    return () => clearInterval(id);
  }, [data, load]);

  if (data === null) {
    const nf = err instanceof ApiError && (err.status === 404 || err.status === 400);
    return (
      <PublicShell>
        <PublicMessage title={nf ? t('public.notFound.track') : t('public.loadError')}>
          {!nf && <Button onClick={load}>{t('common.retry')}</Button>}
        </PublicMessage>
      </PublicShell>
    );
  }

  return (
    <PublicShell company={data?.company} loading={data === undefined}>
      {data && <Tracking data={data} onRated={load} />}
    </PublicShell>
  );
}

export function Tracking({ data, onRated }) {
  const { t, locale, fmtDate, fmtTime } = useI18n();
  const cancelled = data.status === 'cancelled';
  const step = STEP_OF[data.status] ?? 0;
  const coName = companyName(data.company, locale);

  useEffect(() => { document.title = `${t('public.track.title', { n: data.number })} | ${coName}`; }, [data.number, coName, t]);

  const window_ = data.scheduled_start
    ? `${fmtDate(data.scheduled_start)} · ${fmtTime(data.scheduled_start)}${data.scheduled_end ? ` – ${fmtTime(data.scheduled_end)}` : ''}`
    : null;

  return (
    <div className="flex flex-col gap-5">
      {/* Headline */}
      <section className={cx('rounded-2xl px-5 py-6', cancelled ? 'bg-danger-50 text-danger-700' : 'bg-petrol-700 text-sand-50')}>
        <p className={cx('text-sm', cancelled ? '' : 'text-petrol-100')}>
          <span className="tabular-nums">{t('public.track.title', { n: data.number })}</span> · {data.title}
        </p>
        <h1 className="text-2xl font-bold mt-1 leading-snug">{t(`public.track.headline.${data.status}`)}</h1>
        {!cancelled && data.status !== 'completed' && window_ && (
          <p className="mt-3 text-lg font-semibold tabular-nums">{window_}</p>
        )}
        {data.status === 'completed' && data.completed_at && (
          <p className="mt-3 text-base text-petrol-100 tabular-nums">{fmtDate(data.completed_at)} · {fmtTime(data.completed_at)}</p>
        )}
        {ACTIVE.includes(data.status) && (
          <p className="mt-4 text-xs text-petrol-200 flex items-center gap-1.5">
            <span className="relative flex h-2 w-2"><span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron-300 opacity-60" /><span className="relative inline-flex rounded-full h-2 w-2 bg-saffron-400" /></span>
            {t('public.track.updated')}
          </p>
        )}
      </section>

      {/* Stepper */}
      {!cancelled && (
        <ol className="rounded-2xl bg-white border border-sand-200 px-5 py-4 flex flex-col">
          {STEPS.map((s, i) => {
            const done = i < step || data.status === 'completed';
            const cur = i === step && data.status !== 'completed';
            const last = i === STEPS.length - 1;
            return (
              <li key={s} className="flex gap-3" aria-current={cur ? 'step' : undefined}>
                <div className="flex flex-col items-center">
                  <span className={cx('h-7 w-7 rounded-full grid place-items-center shrink-0 border-2',
                    done ? 'bg-success-500 border-success-500 text-white' : cur ? 'bg-saffron-400 border-saffron-400 text-petrol-900' : 'bg-white border-sand-300')}>
                    {done ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
                    ) : cur ? <span className="h-2.5 w-2.5 rounded-full bg-petrol-900" /> : null}
                  </span>
                  {!last && <span className={cx('w-0.5 flex-1 min-h-[20px]', done ? 'bg-success-500' : 'bg-sand-200')} />}
                </div>
                <div className={cx('pb-4', last && 'pb-0')}>
                  <p className={cx('leading-7', cur ? 'font-bold text-ink' : done ? 'text-ink' : 'text-sand-500')}>{t(`public.track.steps.${s}`)}</p>
                  {cur && s === 'on_the_way' && data.technician && (
                    <p className="text-sm text-sand-700">{data.technician.name}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      )}

      {/* Details */}
      <section className="rounded-2xl bg-white border border-sand-200 divide-y divide-sand-100">
        {data.technician && (
          <div className="flex items-center gap-3 px-5 py-4">
            <span className="h-11 w-11 rounded-full grid place-items-center text-white font-bold text-lg shrink-0"
              style={{ background: data.technician.color || '#0F5C5C' }} aria-hidden="true">{data.technician.name?.charAt(0)}</span>
            <div>
              <p className="text-sm text-sand-600">{t('public.track.technician')}</p>
              <p className="font-semibold">{data.technician.name}</p>
            </div>
          </div>
        )}
        {window_ && (
          <div className="px-5 py-4">
            <p className="text-sm text-sand-600">{t('public.track.window')}</p>
            <p className="font-semibold tabular-nums">{window_}</p>
          </div>
        )}
        {data.site && (data.site.district || data.site.city) && (
          <div className="px-5 py-4">
            <p className="text-sm text-sand-600">{t('public.track.location')}</p>
            <p className="font-semibold">{[data.site.district, data.site.city].filter(Boolean).join('، ')}</p>
          </div>
        )}
      </section>

      {/* Invoice */}
      {data.invoice && (
        <Link to={`/i/${data.invoice.public_token}`}
          className={cx('rounded-2xl border px-5 py-4 flex items-center justify-between gap-3',
            data.invoice.status === 'unpaid' ? 'bg-saffron-50 border-saffron-200' : 'bg-white border-sand-200')}>
          <div>
            <p className="text-sm text-sand-700">{t('public.track.invoice')}</p>
            <p className="font-bold tabular-nums">{t('common.currency', { amount: Number(data.invoice.total).toFixed(2) })}</p>
          </div>
          <span className="inline-flex items-center gap-1 font-semibold text-petrol-700">
            {data.invoice.status === 'unpaid' ? t('public.track.payInvoice') : t('public.track.viewInvoice')}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="rtl:rotate-180" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
          </span>
        </Link>
      )}

      {/* Rating */}
      {data.status === 'completed' && <Rating data={data} onRated={onRated} />}

      {/* Contact */}
      {data.company?.phone && (
        <section className="flex flex-col gap-2">
          <p className="text-sm text-sand-700">{t('public.track.contact', { company: coName })}</p>
          <div className="grid grid-cols-2 gap-2">
            <Button as="a" href={telHref(data.company.phone)} variant="secondary" size="lg">{t('public.call')}</Button>
            <Button as="a" href={waHref(data.company.phone, `${t('public.track.title', { n: data.number })}`)} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg">{t('public.whatsapp')}</Button>
          </div>
        </section>
      )}
    </div>
  );
}

function Rating({ data, onRated }) {
  const { t } = useI18n();
  const { token } = useParams();
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  if (data.rating) {
    return (
      <section className="rounded-2xl bg-white border border-sand-200 px-5 py-4">
        <p className="text-sm text-sand-600">{t('public.track.rate.yours')}</p>
        <Stars value={data.rating} readOnly />
        {data.rating_comment && <p className="mt-2 text-sand-800">“{data.rating_comment}”</p>}
        {msg && <p className="mt-2 text-success-600 font-semibold">{msg}</p>}
      </section>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    if (!stars) return;
    setBusy(true);
    try {
      await api.post(`/public/track/${encodeURIComponent(token)}/rating`, { rating: stars, comment: comment.trim() || undefined });
      setMsg(t('public.track.rate.thanks'));
      onRated();
    } catch (err) {
      setMsg(err instanceof ApiError && err.status === 409 ? t('public.track.rate.already') : t('common.error'));
      if (err instanceof ApiError && err.status === 409) onRated();
    } finally {
      setBusy(false);
    }
  };

  const shown = hover || stars;
  return (
    <form onSubmit={submit} className="rounded-2xl bg-white border border-sand-200 px-5 py-5 flex flex-col gap-3">
      <h2 className="text-lg font-bold">{t('public.track.rate.title')}</h2>
      <div className="flex items-center gap-3">
        <Stars value={shown} onChange={setStars} onHover={setHover} />
        {shown > 0 && <span className="font-semibold text-petrol-700">{t(`public.track.rate.stars.${shown}`)}</span>}
      </div>
      {stars > 0 && (
        <>
          <label className="text-sm font-medium text-sand-800" htmlFor="rate-c">{t('public.track.rate.comment')}</label>
          <textarea id="rate-c" rows={3} maxLength={1000} value={comment} onChange={(e) => setComment(e.target.value)} placeholder={t('public.track.rate.commentPlaceholder')}
            className="w-full rounded-xl border border-sand-200 px-3.5 py-2.5 text-base focus:outline-none focus:border-petrol-500 focus:ring-2 focus:ring-petrol-100" />
          <Button type="submit" variant="cta" size="lg" loading={busy}>{t('public.track.rate.submit')}</Button>
        </>
      )}
      {msg && <p className="text-sand-800">{msg}</p>}
    </form>
  );
}

function Stars({ value, onChange, onHover, readOnly }) {
  const { t } = useI18n();
  return (
    <div className="flex gap-1" role={readOnly ? 'img' : 'radiogroup'} aria-label={readOnly ? `${value}/5` : t('public.track.rate.title')}
      onMouseLeave={() => onHover?.(0)}>
      {[1, 2, 3, 4, 5].map((n) => {
        const on = n <= value;
        const star = (
          <svg width={readOnly ? 26 : 40} height={readOnly ? 26 : 40} viewBox="0 0 24 24" aria-hidden="true"
            fill={on ? '#F0AC1C' : 'none'} stroke={on ? '#E0950B' : '#BFA97F'} strokeWidth="1.5" strokeLinejoin="round">
            <path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z" />
          </svg>
        );
        if (readOnly) return <span key={n}>{star}</span>;
        return (
          <button key={n} type="button" role="radio" aria-checked={n === value} aria-label={`${n} — ${t(`public.track.rate.stars.${n}`)}`}
            onClick={() => onChange(n)} onMouseEnter={() => onHover?.(n)} className="p-0.5 rounded-lg active:scale-95 transition-transform">
            {star}
          </button>
        );
      })}
    </div>
  );
}
