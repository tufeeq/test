// OWNER: B4. Public booking page /b/:slug. Company identity → service tiles → describe (live AI triage) → details → time → submit.
import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api, ApiError } from '../../lib/api.js';
import { useI18n } from '../../i18n/index.jsx';
import { Button, Input, Spinner } from '../../components/ui/index.js';
import { cx } from '../../lib/cx.js';
import PublicShell, { PublicMessage, companyName } from '../../components/public/PublicShell.jsx';
import CategoryIcon from '../../components/public/CategoryIcon.jsx';
import { normalizeSaudiMobile, telHref, waHref, riyadhToday, addDays } from '../../components/public/util.js';

const WINDOWS = ['morning', 'afternoon', 'evening'];

export default function BookingPage() {
  const { slug } = useParams();
  const { t, locale } = useI18n();
  const [co, setCo] = useState(undefined); // undefined = loading, null = not found
  const [loadErr, setLoadErr] = useState(null);
  const [done, setDone] = useState(null);

  useEffect(() => {
    let alive = true;
    setCo(undefined);
    api.get(`/public/companies/${encodeURIComponent(slug)}`)
      .then((c) => alive && setCo(c))
      .catch((e) => { if (!alive) return; if (e instanceof ApiError && e.status === 404) setCo(null); else { setLoadErr(e); setCo(null); } });
    return () => { alive = false; };
  }, [slug]);

  useEffect(() => {
    if (co) document.title = `${t('public.booking.title')} | ${companyName(co, locale)}`;
  }, [co, locale, t]);

  if (co === null) {
    return (
      <PublicShell>
        <PublicMessage title={loadErr ? t('public.loadError') : t('public.notFound.company')}>
          {loadErr && <Button onClick={() => window.location.reload()}>{t('common.retry')}</Button>}
        </PublicMessage>
      </PublicShell>
    );
  }

  return (
    <PublicShell company={co} loading={co === undefined}>
      {co && (done ? <Confirmation co={co} done={done} onAgain={() => setDone(null)} /> : <BookingForm co={co} slug={slug} onDone={setDone} />)}
    </PublicShell>
  );
}

export function BookingForm({ co, slug, onDone }) {
  const { t, locale, fmtMoney } = useI18n();
  const [f, setF] = useState({ category: co.categories?.length === 1 ? co.categories[0] : '', description: '', name: '', phone: '', city: co.city || '', district: '', preferred_date: '', preferred_window: '', website: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const triage = useLiveTriage(slug, f.description, f.category);
  const set = (k) => (e) => { const v = e?.target ? e.target.value : e; setF((s) => ({ ...s, [k]: v })); setErrors((x) => ({ ...x, [k]: undefined })); };

  const minPrice = useMemo(() => {
    const m = {};
    for (const s of co.services || []) {
      const cat = ['ac', 'cleaning', 'pest', 'plumbing', 'electrical'].includes(s.category) ? s.category : 'ac';
      if (m[cat] == null || s.price < m[cat]) m[cat] = s.price;
    }
    return m;
  }, [co.services]);

  const today = riyadhToday();
  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(today, i)), [today]);
  const dayLabel = (d, i) => {
    if (i === 0) return t('common.today');
    if (i === 1) return t('common.tomorrow');
    return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA-u-nu-latn-ca-gregory' : 'en-GB', { weekday: 'short', timeZone: 'UTC' }).format(new Date(`${d}T00:00:00Z`));
  };
  const dayNum = (d) => new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA-u-nu-latn-ca-gregory' : 'en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(`${d}T00:00:00Z`));

  const validate = () => {
    const e = {};
    if (f.description.trim().length < 5) e.description = t('public.booking.descError');
    if (f.name.trim().length < 2) e.name = t('public.booking.nameError');
    if (!normalizeSaudiMobile(f.phone)) e.phone = t('public.booking.phoneError');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (!validate()) {
      document.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    setSubmitting(true);
    try {
      const body = {
        name: f.name.trim(), phone: normalizeSaudiMobile(f.phone), description: f.description.trim(),
        category: f.category || undefined, city: f.city.trim() || undefined, district: f.district.trim() || undefined,
        preferred_date: f.preferred_date || undefined, preferred_window: f.preferred_window || undefined, website: f.website,
      };
      const r = await api.post(`/public/companies/${encodeURIComponent(slug)}/bookings`, body);
      onDone({ ...r, form: body });
      window.scrollTo({ top: 0 });
    } catch (err) {
      if (err instanceof ApiError && err.status === 429) setFormError(t('public.booking.rateLimited'));
      else if (err instanceof ApiError && err.code === 'bad_request' && err.details?.some((d) => d.path.includes('phone'))) setErrors((x) => ({ ...x, phone: t('public.booking.phoneError') }));
      else setFormError(err instanceof ApiError && err.status === 0 ? t('errors.network') : t('common.error'));
    } finally {
      setSubmitting(false);
    }
  };

  const section = 'flex flex-col gap-3';
  const stepTitle = (n, key) => (
    <h2 className="text-lg font-bold flex items-center gap-2.5">
      <span className="h-7 w-7 rounded-full bg-petrol-700 text-sand-50 text-sm font-bold grid place-items-center tabular-nums shrink-0">{n}</span>
      {t(`public.booking.${key}`)}
    </h2>
  );

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-7">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold leading-tight">{t('public.booking.title')}</h1>
        <p className="text-sand-700 mt-1.5">{t('public.booking.subtitle')}</p>
      </div>

      {/* 1. category tiles */}
      <section className={section} aria-labelledby="b-step1">
        <div id="b-step1">{stepTitle(1, 'step1')}</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5" role="radiogroup" aria-label={t('public.booking.step1')}>
          {(co.categories || []).map((c) => {
            const on = f.category === c;
            return (
              <button key={c} type="button" role="radio" aria-checked={on} onClick={() => set('category')(on ? '' : c)}
                className={cx('relative rounded-2xl border-2 px-3 py-4 flex flex-col items-center gap-2 text-center transition-colors min-h-[112px]',
                  on ? 'border-petrol-600 bg-petrol-50 text-petrol-800' : 'border-sand-200 bg-white text-ink hover:border-petrol-300')}>
                <span className={cx('h-12 w-12 rounded-xl grid place-items-center', on ? 'bg-petrol-600 text-white' : 'bg-sand-100 text-petrol-700')}>
                  <CategoryIcon category={c} size={28} />
                </span>
                <span className="font-semibold">{t(`category.${c}`)}</span>
                {minPrice[c] != null && <span className="text-xs text-sand-600 tabular-nums">{t('public.booking.fromPrice', { price: fmtMoney(minPrice[c]) })}</span>}
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. description + live triage */}
      <section className={section}>
        {stepTitle(2, 'step2')}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="b-desc" className="text-sm font-medium text-sand-800">{t('public.booking.describe')}<span className="text-danger-500 ms-0.5">*</span></label>
          <textarea id="b-desc" rows={4} maxLength={2000} value={f.description} onChange={set('description')}
            placeholder={t('public.booking.describePlaceholder')} aria-invalid={!!errors.description}
            className={cx('w-full rounded-xl border bg-white px-3.5 py-3 text-base leading-relaxed placeholder:text-sand-400 focus:outline-none focus:border-petrol-500 focus:ring-2 focus:ring-petrol-100',
              errors.description ? 'border-danger-500' : 'border-sand-200')} />
          {errors.description ? <p className="text-sm text-danger-600">{errors.description}</p> : <p className="text-sm text-sand-500">{t('public.booking.describeHint')}</p>}
        </div>
        <TriageCard state={triage} />
      </section>

      {/* 3. details */}
      <section className={section}>
        {stepTitle(3, 'step3')}
        <Input label={t('public.booking.name')} required value={f.name} onChange={set('name')} autoComplete="name" maxLength={120} error={errors.name} inputClassName="h-12" />
        <Input label={t('public.booking.phone')} required value={f.phone} onChange={set('phone')} type="tel" inputMode="tel" autoComplete="tel" dir="ltr"
          placeholder="05XXXXXXXX" maxLength={16} error={errors.phone} hint={t('public.booking.phoneHint')} inputClassName="h-12 text-start tabular-nums" />
        <div className="grid grid-cols-2 gap-3">
          <Input label={t('public.booking.city')} value={f.city} onChange={set('city')} autoComplete="address-level2" maxLength={80} inputClassName="h-12" />
          <Input label={t('public.booking.district')} value={f.district} onChange={set('district')} placeholder={t('public.booking.districtPlaceholder')} maxLength={80} inputClassName="h-12" />
        </div>
        {/* honeypot: hidden from people and assistive tech, bots fill it */}
        <div aria-hidden="true" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clipPath: 'inset(50%)', opacity: 0, pointerEvents: 'none' }}>
          <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" value={f.website} onChange={set('website')} /></label>
        </div>
      </section>

      {/* 4. time */}
      <section className={section}>
        {stepTitle(4, 'step4')}
        <p className="text-sm font-medium text-sand-800">{t('public.booking.date')}</p>
        <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1 snap-x" role="radiogroup" aria-label={t('public.booking.date')}>
          <DayChip on={!f.preferred_date} onClick={() => set('preferred_date')('')} top={t('public.booking.anyDate')} />
          {days.map((d, i) => (
            <DayChip key={d} on={f.preferred_date === d} onClick={() => set('preferred_date')(d)} top={dayLabel(d, i)} bottom={dayNum(d)} />
          ))}
        </div>
        <p className="text-sm font-medium text-sand-800 mt-1">{t('public.booking.window')}</p>
        <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label={t('public.booking.window')}>
          {WINDOWS.map((w) => {
            const on = f.preferred_window === w;
            return (
              <button key={w} type="button" role="radio" aria-checked={on} onClick={() => set('preferred_window')(on ? '' : w)}
                className={cx('rounded-xl border-2 py-2.5 flex flex-col items-center min-h-[56px]',
                  on ? 'border-petrol-600 bg-petrol-50 text-petrol-800' : 'border-sand-200 bg-white')}>
                <span className="font-semibold">{t(`public.booking.windows.${w}`)}</span>
                <span className="text-xs text-sand-600 tabular-nums" dir="ltr">{t(`public.booking.windowsHint.${w}`)}</span>
              </button>
            );
          })}
        </div>
      </section>

      {formError && <p role="alert" className="rounded-xl bg-danger-50 text-danger-700 px-4 py-3">{formError}</p>}

      <div className="flex flex-col gap-2">
        <Button type="submit" variant="cta" size="lg" block loading={submitting} className="min-h-[56px]">{t('public.booking.submit')}</Button>
        <p className="text-xs text-sand-600 text-center">{t('public.booking.privacy')}</p>
      </div>
    </form>
  );
}

function DayChip({ on, onClick, top, bottom }) {
  return (
    <button type="button" role="radio" aria-checked={on} onClick={onClick}
      className={cx('snap-start shrink-0 min-w-[76px] rounded-xl border-2 px-3 py-2 flex flex-col items-center justify-center min-h-[60px]',
        on ? 'border-petrol-600 bg-petrol-50 text-petrol-800' : 'border-sand-200 bg-white')}>
      <span className="font-semibold text-sm whitespace-nowrap">{top}</span>
      {bottom && <span className="text-xs text-sand-600 tabular-nums whitespace-nowrap">{bottom}</span>}
    </button>
  );
}

/** Debounced triage preview while the customer types. Silent on any failure. */
function useLiveTriage(slug, text, category) {
  const [state, setState] = useState({ status: 'idle', data: null });
  const seq = useRef(0);
  useEffect(() => {
    const v = text.trim();
    if (v.length < 15) { setState({ status: 'idle', data: null }); return undefined; }
    const id = ++seq.current;
    const timer = setTimeout(async () => {
      setState((s) => ({ status: 'loading', data: s.data }));
      try {
        const data = await api.post(`/public/companies/${encodeURIComponent(slug)}/triage`, { text: v, category: category || undefined });
        if (id === seq.current) setState({ status: 'ready', data });
      } catch {
        if (id === seq.current) setState({ status: 'idle', data: null });
      }
    }, 1100);
    return () => clearTimeout(timer);
  }, [slug, text, category]);
  return state;
}

function TriageCard({ state }) {
  const { t } = useI18n();
  if (state.status === 'idle') return null;
  const d = state.data;
  return (
    <div aria-live="polite" className="rounded-2xl bg-petrol-50 border border-petrol-100 px-4 py-3">
      {state.status === 'loading' && !d ? (
        <p className="flex items-center gap-2 text-petrol-700 text-sm"><Spinner size={16} />{t('public.booking.triage.thinking')}</p>
      ) : d && (
        <div className={cx('flex flex-col gap-1.5', state.status === 'loading' && 'opacity-60')}>
          <p className="text-xs font-semibold text-petrol-600">{t('public.booking.triage.title')}</p>
          <p className="font-bold text-petrol-900 flex items-center gap-2 flex-wrap">
            {d.title}
            {d.priority === 'urgent' && <span className="text-xs font-semibold rounded-full bg-danger-50 text-danger-700 px-2 py-0.5">{t('public.booking.triage.urgent')}</span>}
          </p>
          {d.suggested_services?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-0.5" aria-label={t('public.booking.triage.services')}>
              {d.suggested_services.map((s) => <span key={s} className="text-sm rounded-full bg-white border border-petrol-100 px-2.5 py-0.5 text-petrol-800">{s}</span>)}
            </div>
          )}
          {d.duration_min > 0 && <p className="text-sm text-petrol-800 tabular-nums">{t('public.booking.triage.duration', { n: d.duration_min })}</p>}
          <p className="text-xs text-sand-600">{t('public.booking.triage.note')}</p>
        </div>
      )}
    </div>
  );
}

export function Confirmation({ co, done, onAgain }) {
  const { t, locale, fmtDate } = useI18n();
  const name = companyName(co, locale);
  const f = done.form;
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl bg-petrol-700 text-sand-50 px-5 py-7 text-center flex flex-col items-center gap-3">
        <span className="h-14 w-14 rounded-full bg-success-500 grid place-items-center">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
        </span>
        <h1 className="text-2xl font-bold">{t('public.booking.done.title')}</h1>
        <p className="text-petrol-100 max-w-sm leading-relaxed">{t('public.booking.done.body', { company: name })}</p>
      </div>
      <div className="rounded-2xl bg-white border border-sand-200 p-5">
        <h2 className="font-bold mb-3">{t('public.booking.done.summary')}</h2>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-base">
          {f.category && <><dt className="text-sand-600">{t('public.booking.step1')}</dt><dd>{t(`category.${f.category}`)}</dd></>}
          {done.triage?.title && <><dt className="text-sand-600">{t('public.booking.step2')}</dt><dd>{done.triage.title}</dd></>}
          <dt className="text-sand-600">{t('public.booking.name')}</dt><dd>{f.name}</dd>
          <dt className="text-sand-600">{t('public.booking.phone')}</dt><dd className="ltr-nums text-start tabular-nums">+{f.phone}</dd>
          {(f.district || f.city) && <><dt className="text-sand-600">{t('public.booking.district')}</dt><dd>{[f.district, f.city].filter(Boolean).join('، ')}</dd></>}
          {(f.preferred_date || f.preferred_window) && (
            <><dt className="text-sand-600">{t('public.booking.step4')}</dt>
              <dd>{f.preferred_date ? fmtDate(`${f.preferred_date}T12:00:00+03:00`) : t('public.booking.anyDate')}{f.preferred_window && ` · ${t(`public.booking.windows.${f.preferred_window}`)}`}</dd></>
          )}
        </dl>
      </div>
      {co.phone && (
        <div className="grid grid-cols-2 gap-2">
          <Button as="a" href={telHref(co.phone)} variant="secondary" size="lg">{t('public.booking.done.callNow')}</Button>
          <Button as="a" href={waHref(co.phone)} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg">{t('public.whatsapp')}</Button>
        </div>
      )}
      <Button variant="ghost" onClick={onAgain}>{t('public.booking.done.another')}</Button>
    </div>
  );
}
