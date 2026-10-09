// OWNER: B4. Technician profile: name, language (ar / en / ur / hi), today's stats, sync state, install, logout.
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/api.js';
import { useAuth } from '../../lib/auth.jsx';
import { Button, useToast } from '../../components/ui/index.js';
import { cx } from '../../lib/cx.js';
import { useTechI18n, TECH_LANGS } from '../../components/tech/techI18n.jsx';
import { useOfflineQueue, flush } from '../../components/tech/offlineQueue.js';
import { lsGet, lsDel, riyadhDay } from '../../components/tech/storage.js';
import { canInstall, onInstallable, promptInstall } from '../../components/tech/registerSW.js';
import { fetchMyJobs } from './TechToday.jsx';
import { IconGlobe, IconLogout, IconCheck, IconRefresh, IconDownload } from '../../components/tech/icons.jsx';

export default function TechProfile() {
  const { t, lang, setLang, fmtMoney } = useTechI18n();
  const { user, company, logout } = useAuth();
  const toast = useToast();
  const nav = useNavigate();
  const q = useOfflineQueue();
  const [jobs, setJobs] = useState(() => lsGet('dawra_tech_today_v1')?.items || []);
  const [installable, setInstallable] = useState(canInstall());

  useEffect(() => { fetchMyJobs().then(setJobs).catch(() => {}); }, []);
  useEffect(() => onInstallable(setInstallable), []);

  const stats = useMemo(() => {
    const d0 = riyadhDay();
    const today = jobs.filter((j) => j.scheduled_start && riyadhDay(j.scheduled_start) === d0 && j.status !== 'cancelled');
    const done = today.filter((j) => j.status === 'completed');
    return { total: today.length, done: done.length, left: today.length - done.length, value: done.reduce((s, j) => s + Number(j.total || 0), 0) * 1.15 };
  }, [jobs]);

  const chooseLang = async (code) => {
    setLang(code);
    const base = code === 'ar' ? 'ar' : 'en';
    try { await api.patch('/auth/me', { locale: base }); } catch { /* local choice still applies */ }
    toast.success(TECH_LANGS.find((l) => l.code === code)?.label || '');
  };

  const doLogout = async () => {
    if (q.pending > 0 && !window.confirm(t('tech.profile.logoutPending'))) return;
    lsDel('dawra_tech_queue_v1');
    lsDel('dawra_tech_today_v1');
    await logout();
    nav('/login', { replace: true });
  };

  const initials = (user?.name || '?').trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('');

  return (
    <div className="flex flex-col gap-4">
      <section className="flex items-center gap-4">
        <span className="h-16 w-16 rounded-2xl grid place-items-center text-2xl font-bold text-white shrink-0"
          style={{ background: user?.color || '#0F5C5C' }} aria-hidden="true">{initials}</span>
        <div className="min-w-0">
          <h1 className="text-2xl font-bold leading-tight truncate">{user?.name}</h1>
          <p className="text-base text-sand-700 truncate">{company?.name_ar || company?.name}</p>
          <p className="text-sm text-sand-600 truncate ltr-nums">{user?.email}</p>
        </div>
      </section>

      <section className="rounded-2xl bg-white border border-sand-200 p-4">
        <h2 className="text-lg font-bold mb-3">{t('tech.profile.stats')}</h2>
        <dl className="grid grid-cols-3 gap-2 text-center">
          {[['jobsToday', stats.total], ['completed', stats.done], ['remaining', stats.left]].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-sand-50 py-3">
              <dd className="text-3xl font-bold text-petrol-800 tabular-nums">{v}</dd>
              <dt className="text-sm text-sand-700">{t(`tech.profile.${k}`)}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-3 flex items-center justify-between text-base">
          <span className="text-sand-700">{t('tech.profile.value')}</span>
          <span className="font-bold tabular-nums">{fmtMoney(stats.value)}</span>
        </p>
      </section>

      <section className="rounded-2xl bg-white border border-sand-200 p-4">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><IconGlobe size={20} className="text-petrol-600" />{t('tech.profile.language')}</h2>
        <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label={t('tech.profile.language')}>
          {TECH_LANGS.map((l) => {
            const on = l.code === lang;
            return (
              <button key={l.code} type="button" role="radio" aria-checked={on} onClick={() => !on && chooseLang(l.code)} lang={l.code} dir={l.dir}
                className={cx('min-h-[56px] rounded-xl border-2 text-lg font-semibold inline-flex items-center justify-center gap-2',
                  on ? 'border-petrol-600 bg-petrol-50 text-petrol-800' : 'border-sand-200 bg-white text-ink active:bg-sand-50')}>
                {on && <IconCheck size={20} strokeWidth={3} />}{l.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl bg-white border border-sand-200 p-4 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold">{t('tech.profile.sync')}</h2>
          <p className={cx('text-base', q.pending ? 'text-saffron-700 font-semibold' : 'text-success-600')}>
            {q.pending ? t('tech.net.pending', { n: q.pending }) : t('tech.profile.allSynced')}
          </p>
        </div>
        {q.pending > 0 && (
          <Button variant="secondary" size="lg" loading={q.flushing} disabled={!q.online} icon={<IconRefresh size={20} />} onClick={() => flush()}>
            {t('tech.net.syncNow')}
          </Button>
        )}
      </section>

      <section className="rounded-2xl bg-sand-100 border border-sand-200 p-4">
        <h2 className="text-base font-bold flex items-center gap-2"><IconDownload size={20} className="text-petrol-600" />{t('tech.profile.install')}</h2>
        <p className="text-sm text-sand-800 mt-1">{t('tech.profile.installBody')}</p>
        {installable && <Button className="mt-3" size="lg" onClick={() => promptInstall()}>{t('tech.profile.installNow')}</Button>}
      </section>

      <Button variant="secondary" size="lg" block icon={<IconLogout size={20} />} onClick={doLogout} className="text-danger-600 min-h-[56px]">
        {t('tech.profile.logout')}
      </Button>
    </div>
  );
}
