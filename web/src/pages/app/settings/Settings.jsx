// OWNER: B3. Company settings: profile (AR/EN names, VAT, CR, logo), public booking link + QR, integrations status.
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../lib/api.js';
import { useAsync } from '../../../lib/useAsync.js';
import { useAuth } from '../../../lib/auth.jsx';
import { useI18n } from '../../../i18n/index.jsx';
import { Badge, Button, Card, Input, PageHeader, useToast } from '../../../components/ui/index.js';
import Icon from '../../../components/app/icons.jsx';
import { absUrl, CopyButton, ErrorState, PageSkeleton, isValidVat, saveBlob } from '../../../components/app/kit.jsx';
import { usePlanInfo } from '../../../components/app/AppLayout.jsx';
import { cx } from '../../../lib/cx.js';

const MAX_LOGO = 300 * 1024;

export default function Settings() {
  const { t } = useI18n();
  const { user } = useAuth();
  const { data, error, loading, reload, setData } = useAsync(() => api.get('/companies/me'), []);
  if (error) return <div><PageHeader title={t('app.settings.title')} /><ErrorState error={error} onRetry={reload} /></div>;
  if (loading && !data) return <PageSkeleton />;
  const isOwner = user?.role === 'owner';
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title={t('app.settings.title')} subtitle={t('app.settings.subtitle')}
        actions={isOwner && <Button as={Link} to="/app/settings/billing" variant="secondary" icon={<Icon name="billing" size={16} />}>{t('app.nav.billing')}</Button>} />
      <div className="grid lg:grid-cols-[1fr_22rem] gap-6 items-start">
        <ProfileCard company={data} readOnly={!isOwner} onSaved={(c) => setData((d) => ({ ...d, ...c }))} />
        <div className="flex flex-col gap-6">
          <BookingLinkCard company={data} />
          <PlanCard />
          <IntegrationsCard company={data} />
        </div>
      </div>
    </div>
  );
}

function ProfileCard({ company, readOnly, onSaved }) {
  const { t } = useI18n();
  const toast = useToast();
  const { refresh } = useAuth();
  const [f, setF] = useState({});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [logoBusy, setLogoBusy] = useState(false);
  const fileRef = useRef(null);
  useEffect(() => {
    setF({ name: company.name || '', name_ar: company.name_ar || '', vat_number: company.vat_number || '', cr_number: company.cr_number || '', phone: company.phone || '', city: company.city || '', address: company.address || '', slug: company.slug || '', logo_url: company.logo_url || '' });
  }, [company]);
  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));
  const dirty = Object.keys(f).some((k) => (f[k] || '') !== (company[k] || ''));

  const onLogo = async (file) => {
    if (!file) return;
    setLogoBusy(true);
    try { set('logo_url', await resizeLogo(file)); }
    catch { toast.error(t('app.settings.logoFailed')); }
    finally { setLogoBusy(false); if (fileRef.current) fileRef.current.value = ''; }
  };

  const save = async (e) => {
    e?.preventDefault();
    const er = {};
    if (!f.name.trim()) er.name = t('app.form.required');
    if (f.vat_number && !isValidVat(f.vat_number)) er.vat_number = t('app.settings.vatInvalid');
    if (f.cr_number && !/^\d{10}$/.test(f.cr_number)) er.cr_number = t('app.settings.crInvalid');
    if (f.slug && !/^[a-z0-9-]{3,40}$/.test(f.slug)) er.slug = t('app.settings.slugInvalid');
    setErrors(er); if (Object.keys(er).length) return;
    setSaving(true);
    const body = {};
    for (const k of Object.keys(f)) if ((f[k] || '') !== (company[k] || '')) body[k] = f[k] === '' ? null : f[k];
    try {
      const r = await api.patch('/companies/me', body);
      onSaved(r); refresh(); toast.success(t('common.saved'));
    } catch (er2) {
      if (er2.details?.length) setErrors(Object.fromEntries(er2.details.map((d) => [String(d.path).replace(/^body\./, ''), d.message])));
      if (er2.code === 'conflict') setErrors((x) => ({ ...x, slug: t('app.settings.slugTaken') }));
      toast.error(er2);
    } finally { setSaving(false); }
  };

  return (
    <Card title={t('app.settings.profile')} subtitle={readOnly ? t('app.settings.ownerOnly') : t('app.settings.profileSub')}>
      <form onSubmit={save} className="flex flex-col gap-5">
        <fieldset disabled={readOnly} className="contents">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-2xl bg-sand-100 border border-sand-200 grid place-items-center overflow-hidden shrink-0">
              {f.logo_url ? <img src={f.logo_url} alt="" className="h-full w-full object-contain" /> : <Icon name="camera" size={26} className="text-sand-400" />}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="secondary" loading={logoBusy} onClick={() => fileRef.current?.click()} disabled={readOnly}>{f.logo_url ? t('app.settings.changeLogo') : t('app.settings.uploadLogo')}</Button>
                {f.logo_url && !readOnly && <Button size="sm" variant="ghost" onClick={() => set('logo_url', '')}>{t('common.delete')}</Button>}
              </div>
              <p className="text-sm text-sand-500">{t('app.settings.logoHint')}</p>
              <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className="hidden" onChange={(e) => onLogo(e.target.files?.[0])} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label={t('app.settings.nameAr')} value={f.name_ar || ''} onChange={(e) => set('name_ar', e.target.value)} dir="rtl" />
            <Input label={t('app.settings.nameEn')} required value={f.name || ''} onChange={(e) => set('name', e.target.value)} error={errors.name} dir="ltr" />
            <Input label={t('app.settings.vat')} value={f.vat_number || ''} onChange={(e) => set('vat_number', e.target.value.replace(/\D/g, '').slice(0, 15))} error={errors.vat_number}
              hint={f.vat_number && isValidVat(f.vat_number) && f.vat_number.length === 15 ? <span className="text-success-600 inline-flex items-center gap-1"><Icon name="check" size={14} />{t('app.settings.vatOk')}</span> : t('app.settings.vatHint')}
              dir="ltr" inputMode="numeric" />
            <Input label={t('app.settings.cr')} value={f.cr_number || ''} onChange={(e) => set('cr_number', e.target.value.replace(/\D/g, '').slice(0, 10))} error={errors.cr_number} dir="ltr" inputMode="numeric" hint={t('app.settings.crHint')} />
            <Input label={t('app.settings.phone')} value={f.phone || ''} onChange={(e) => set('phone', e.target.value)} dir="ltr" inputMode="tel" />
            <Input label={t('app.settings.city')} value={f.city || ''} onChange={(e) => set('city', e.target.value)} />
            <Input className="sm:col-span-2" label={t('app.settings.address')} value={f.address || ''} onChange={(e) => set('address', e.target.value)} hint={t('app.settings.addressHint')} />
            <Input className="sm:col-span-2" label={t('app.settings.slug')} value={f.slug || ''} onChange={(e) => set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))} error={errors.slug} dir="ltr"
              hint={<span dir="ltr" className="ltr-nums">{absUrl(`/b/${f.slug || '…'}`)}</span>} />
          </div>
        </fieldset>
        {!readOnly && (
          <div className="flex justify-end gap-2 pt-2 border-t border-sand-100">
            {dirty && <Button variant="ghost" onClick={() => setF({ ...f, ...Object.fromEntries(Object.keys(f).map((k) => [k, company[k] || ''])) })}>{t('app.settings.discard')}</Button>}
            <Button type="submit" loading={saving} disabled={!dirty}>{t('common.save')}</Button>
          </div>
        )}
      </form>
    </Card>
  );
}

/** Resize image to ≤ 512px, then reduce quality until the data URL is ≤ 300KB. */
async function resizeLogo(file) {
  if (file.type === 'image/svg+xml') {
    const txt = await file.text();
    const url = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(txt)))}`;
    if (url.length <= MAX_LOGO) return url;
  }
  const src = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(file); });
  const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
  let size = 512;
  for (let attempt = 0; attempt < 6; attempt++) {
    const scale = Math.min(1, size / Math.max(img.width, img.height));
    const c = document.createElement('canvas');
    c.width = Math.max(1, Math.round(img.width * scale)); c.height = Math.max(1, Math.round(img.height * scale));
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    // PNG keeps transparency (logos); fall back to WebP/JPEG if too big.
    for (const [type, q] of [['image/png'], ['image/webp', 0.85], ['image/jpeg', 0.8], ['image/jpeg', 0.6]]) {
      const url = c.toDataURL(type, q);
      if (url.length <= MAX_LOGO && url.startsWith(`data:${type}`)) return url;
    }
    size = Math.round(size * 0.7);
  }
  throw new Error('too_large');
}

function BookingLinkCard({ company }) {
  const { t } = useI18n();
  const toast = useToast();
  const url = absUrl(company.booking_url || `/b/${company.slug}`);
  const [svg, setSvg] = useState('');
  useEffect(() => {
    let alive = true;
    import('qrcode').then((m) => (m.default || m).toString(url, { type: 'svg', margin: 1, color: { dark: '#0B4A4B', light: '#FFFFFF' }, errorCorrectionLevel: 'M' }))
      .then((s) => alive && setSvg(s)).catch(() => alive && setSvg(''));
    return () => { alive = false; };
  }, [url]);
  const downloadPng = async () => {
    try {
      const QR = (await import('qrcode')).default;
      const dataUrl = await QR.toDataURL(url, { width: 1024, margin: 2, color: { dark: '#0B4A4B', light: '#FFFFFF' } });
      const blob = await (await fetch(dataUrl)).blob();
      saveBlob(blob, `booking-qr-${company.slug}.png`);
    } catch { toast.error(t('common.error')); }
  };
  return (
    <Card tone="petrol" title={t('app.settings.bookingLink')} subtitle={t('app.settings.bookingLinkSub')}>
      <div className="flex gap-4 items-start">
        {svg
          ? <div className="h-28 w-28 shrink-0 rounded-xl bg-white p-1.5 [&>svg]:w-full [&>svg]:h-full" aria-label={t('app.settings.qrAlt')} role="img" dangerouslySetInnerHTML={{ __html: svg }} />
          : <div className="h-28 w-28 shrink-0 rounded-xl bg-white p-1.5 grid place-items-center"><Icon name="qr" size={32} className="text-petrol-300" /></div>}
        <div className="min-w-0 flex-1">
          <div className="rounded-lg bg-petrol-800 px-2.5 py-2 text-sm break-all text-sand-50" dir="ltr">{url}</div>
          <div className="flex flex-wrap gap-2 mt-2">
            <CopyButton text={url} />
            <Button as="a" href={url} target="_blank" rel="noreferrer" size="sm" variant="secondary" icon={<Icon name="external" size={15} />}>{t('app.common.open')}</Button>
          </div>
        </div>
      </div>
      <Button size="sm" variant="cta" className="mt-4" block icon={<Icon name="download" size={15} />} onClick={downloadPng} disabled={!svg}>{t('app.settings.downloadQr')}</Button>
      <p className="text-sm text-petrol-100 mt-3">{t('app.settings.qrTip')}</p>
    </Card>
  );
}

function PlanCard() {
  const { t } = useI18n();
  const { user } = useAuth();
  const info = usePlanInfo();
  if (!info) return null;
  return (
    <Card title={t('app.settings.plan')}>
      <div className="flex items-center gap-3">
        <span className="text-lg font-semibold">{info.trialing ? t('app.plan.trial') : t(`app.plan.${info.plan}`)}</span>
        {info.trialing ? <Badge tone={info.daysLeft <= 3 ? 'saffron' : 'petrol'}>{t('app.plan.daysLeft', { n: info.daysLeft ?? 0 })}</Badge> : <Badge tone={info.status === 'active' ? 'success' : 'danger'}>{t(`app.plan.status_${info.status}`)}</Badge>}
      </div>
      {user?.role === 'owner' && <Button as={Link} to="/app/settings/billing" size="sm" variant="secondary" className="mt-3">{t('app.settings.managePlan')}</Button>}
    </Card>
  );
}

const INTEGRATIONS = [
  { key: 'whatsapp', icon: 'whatsapp' },
  { key: 'moyasar', icon: 'billing' },
  { key: 'ai', icon: 'sparkle' },
];

/**
 * Integration status. Uses `company.integrations` if B1 adds it; otherwise derives it from existing endpoints:
 * WhatsApp ← GET /messages `provider.whatsapp`, Moyasar ← GET /billing `simulated`, AI ← latest booking triage `source`.
 */
function IntegrationsCard({ company }) {
  const { t } = useI18n();
  const { user } = useAuth();
  const [status, setStatus] = useState(company.integrations || null);
  useEffect(() => {
    if (company.integrations) { setStatus(company.integrations); return; }
    let alive = true;
    Promise.allSettled([
      api.get('/messages', { limit: 1 }),
      user?.role === 'owner' ? api.get('/billing') : Promise.reject(),
      api.get('/booking-requests', { status: 'all', limit: 1 }),
    ]).then(([m, b, r]) => {
      if (!alive) return;
      const tri = r.value?.items?.[0]?.ai_triage;
      setStatus({
        whatsapp: m.value?.provider?.whatsapp ?? null,
        moyasar: b.value ? (b.value.simulated ? 'simulated' : 'live') : null,
        ai: tri?.source ? (tri.source === 'anthropic' ? 'live' : 'simulated') : null,
      });
    });
    return () => { alive = false; };
  }, [company.integrations, user?.role]);
  const live = (v) => v === true || v === 'live' || v === 'connected' || v?.configured === true || v?.connected === true;
  return (
    <Card title={t('app.settings.integrations')} subtitle={t('app.settings.integrationsSub')}>
      <ul className="flex flex-col gap-3">
        {INTEGRATIONS.map((i) => {
          const v = status?.[i.key];
          const known = v !== undefined && v !== null;
          const on = known && live(v);
          return (
            <li key={i.key} className="flex items-center gap-3">
              <span className={cx('h-9 w-9 rounded-xl grid place-items-center', on ? 'bg-success-50 text-success-600' : 'bg-sand-100 text-sand-600')}><Icon name={i.icon} size={18} /></span>
              <div className="flex-1 min-w-0">
                <div className="font-medium">{t(`app.settings.int_${i.key}`)}</div>
                <div className="text-xs text-sand-500">{t(`app.settings.int_${i.key}_desc`)}</div>
              </div>
              {status === null ? <span className="h-5 w-16 rounded-full bg-sand-100" />
                : <Badge tone={on ? 'success' : known ? 'info' : 'sand'}>{on ? t('app.settings.connected') : known ? t('app.settings.simulated') : t('app.settings.unknown')}</Badge>}
            </li>
          );
        })}
      </ul>
      <p className="text-xs text-sand-500 mt-4 leading-relaxed">{t('app.settings.simNote')}</p>
    </Card>
  );
}
