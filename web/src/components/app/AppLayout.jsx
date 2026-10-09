// OWNER: B3. Shell for /app/*: petrol sidebar on desktop, slide-in drawer on mobile/tablet, top bar with global search.
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/auth.jsx';
import { useI18n } from '../../i18n/index.jsx';
import { api } from '../../lib/api.js';
import { Logo, Button } from '../ui/index.js';
import { cx } from '../../lib/cx.js';
import Icon from './icons.jsx';
import GlobalSearch from './GlobalSearch.jsx';
import { diffDays, todayYmd, ymd } from './dates.js';

const NAV = [
  { group: 'ops', items: [
    { to: '/app', key: 'dashboard', icon: 'dashboard', end: true },
    { to: '/app/schedule', key: 'schedule', icon: 'schedule' },
    { to: '/app/jobs', key: 'jobs', icon: 'jobs' },
    { to: '/app/requests', key: 'requests', icon: 'inbox', badge: 'pending' },
  ] },
  { group: 'clients', items: [
    { to: '/app/customers', key: 'customers', icon: 'customers' },
    { to: '/app/contracts', key: 'contracts', icon: 'contracts' },
    { to: '/app/invoices', key: 'invoices', icon: 'invoices' },
    { to: '/app/messages', key: 'messages', icon: 'messages' },
  ] },
  { group: 'setup', items: [
    { to: '/app/services', key: 'services', icon: 'services' },
    { to: '/app/team', key: 'team', icon: 'team' },
    { to: '/app/settings', key: 'settings', icon: 'settings', end: true },
    { to: '/app/settings/billing', key: 'billing', icon: 'billing', owner: true },
  ] },
];

/** Trial / plan badge info derived from session.company. */
export function usePlanInfo() {
  const { company } = useAuth();
  if (!company) return null;
  const trialing = company.subscription_status === 'trialing' || company.plan === 'trial';
  const daysLeft = company.trial_ends_at ? Math.max(0, diffDays(todayYmd(), ymd(company.trial_ends_at))) : null;
  const expired = company.subscription_status === 'expired' || (trialing && daysLeft === 0);
  return { plan: company.plan, status: company.subscription_status, trialing, daysLeft, expired };
}

function PlanBadge({ onNavigate }) {
  const { t } = useI18n();
  const { user } = useAuth();
  const info = usePlanInfo();
  if (!info) return null;
  const body = info.trialing
    ? <><span className="font-semibold">{t('app.plan.trial')}</span><span className="text-petrol-100 tabular-nums">{t('app.plan.daysLeft', { n: info.daysLeft ?? 0 })}</span></>
    : <><span className="font-semibold">{t(`app.plan.${info.plan}`)}</span><span className="text-petrol-100">{t(`app.plan.status_${info.status}`)}</span></>;
  const cls = cx('flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm',
    info.expired ? 'bg-danger-600 text-white' : info.trialing && info.daysLeft <= 3 ? 'bg-saffron-400 text-petrol-900' : 'bg-petrol-800 text-sand-50');
  if (user?.role !== 'owner') return <div className={cls}>{body}</div>;
  return <Link to="/app/settings/billing" onClick={onNavigate} className={cx(cls, 'hover:brightness-110')}>{body}</Link>;
}

function SidebarLang() {
  const { t, locale, setLocale } = useI18n();
  const { logout } = useAuth();
  const nav = useNavigate();
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => { const n = locale === 'ar' ? 'en' : 'ar'; setLocale(n); api.patch('/auth/me', { locale: n }).catch(() => {}); }}
        className="flex-1 h-9 rounded-xl flex items-center justify-center gap-2 text-sm text-petrol-100 hover:bg-petrol-800 hover:text-white">
        <Icon name="globe" size={16} />{t('common.language')}
      </button>
      <button onClick={async () => { await logout(); nav('/login'); }} aria-label={t('common.logout')} title={t('common.logout')}
        className="h-9 w-9 rounded-xl grid place-items-center text-petrol-100 hover:bg-petrol-800 hover:text-white">
        <Icon name="logout" size={17} />
      </button>
    </div>
  );
}

function UserMenu() {
  const { user, logout } = useAuth();
  const { t, locale, setLocale } = useI18n();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const switchLang = () => {
    const next = locale === 'ar' ? 'en' : 'ar';
    setLocale(next); setOpen(false);
    api.patch('/auth/me', { locale: next }).catch(() => {}); // persist per-user locale when B1 supports it
  };
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDoc); document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);
  const initials = (user?.name || '').trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('');
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="menu"
        className="h-9 ps-1 pe-2 rounded-full flex items-center gap-2 hover:bg-sand-100">
        <span className="h-7 w-7 rounded-full grid place-items-center text-xs font-semibold text-white" style={{ background: user?.color || '#0F5C5C' }}>{initials}</span>
        <span className="hidden md:block text-sm font-medium max-w-[9rem] truncate">{user?.name}</span>
        <Icon name="chevronDown" size={14} className="text-sand-500" />
      </button>
      {open && (
        <div role="menu" className="absolute end-0 mt-2 w-60 rounded-2xl bg-white border border-sand-200 shadow-lift p-1.5 z-50">
          <div className="px-3 py-2 border-b border-sand-100 mb-1">
            <div className="font-medium truncate">{user?.name}</div>
            <div className="text-sm text-sand-600 truncate">{user?.email} · {t(`role.${user?.role}`)}</div>
          </div>
          <MenuItem icon="globe" onClick={switchLang}>{t('common.language')}</MenuItem>
          <MenuItem icon="jobs" onClick={() => { setOpen(false); nav('/tech'); }}>{t('app.layout.openTechApp')}</MenuItem>
          <MenuItem icon="settings" onClick={() => { setOpen(false); nav('/app/settings'); }}>{t('app.nav.settings')}</MenuItem>
          <MenuItem icon="logout" danger onClick={async () => { await logout(); nav('/login'); }}>{t('common.logout')}</MenuItem>
        </div>
      )}
    </div>
  );
}
function MenuItem({ icon, children, onClick, danger }) {
  return (
    <button role="menuitem" onClick={onClick}
      className={cx('w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-start text-base', danger ? 'text-danger-600 hover:bg-danger-50' : 'text-ink hover:bg-petrol-50')}>
      <Icon name={icon} size={17} />{children}
    </button>
  );
}

export default function AppLayout() {
  const { user, company } = useAuth();
  const { t, locale } = useI18n();
  const loc = useLocation();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(0);
  const planInfo = usePlanInfo();

  useEffect(() => { setOpen(false); }, [loc.pathname]);
  useEffect(() => {
    let alive = true;
    const load = () => api.get('/booking-requests', { status: 'pending', limit: 1 }).then((r) => alive && setPending(r?.total ?? r?.items?.length ?? 0)).catch(() => {});
    load();
    const id = setInterval(load, 60000);
    return () => { alive = false; clearInterval(id); };
  }, [loc.pathname]);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow; document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); };
  }, [open]);

  const companyName = (locale === 'ar' ? company?.name_ar || company?.name : company?.name || company?.name_ar) || '';

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-5 pb-4 flex items-center justify-between">
        <Link to="/app" aria-label="Dawra"><Logo tone="light" size={30} /></Link>
        <button className="lg:hidden h-9 w-9 grid place-items-center rounded-lg text-petrol-100 hover:bg-petrol-800" onClick={() => setOpen(false)} aria-label={t('common.close')}>
          <Icon name="close" size={20} />
        </button>
      </div>
      <div className="px-4 pb-3">
        <div className="flex items-center gap-3 rounded-xl bg-petrol-800/60 px-3 py-2.5">
          {company?.logo_url
            ? <img src={company.logo_url} alt="" className="h-9 w-9 rounded-lg object-cover bg-white" />
            : <span className="h-9 w-9 rounded-lg bg-petrol-600 grid place-items-center text-sand-50"><Icon name="snow" size={18} /></span>}
          <div className="min-w-0">
            <div className="font-semibold text-sand-50 truncate leading-tight">{companyName}</div>
            <div className="text-xs text-petrol-200 truncate">{user?.name}{user?.role ? ` · ${t(`role.${user.role}`)}` : ''}</div>
          </div>
        </div>
      </div>
      <nav className="px-3 flex-1 overflow-y-auto pb-4" aria-label={t('app.layout.mainNav')}>
        {NAV.map((g) => (
          <div key={g.group} className="mt-3 first:mt-0">
            <div className="px-3 pb-1 text-xs text-petrol-300">{t(`app.nav.group_${g.group}`)}</div>
            <div className="flex flex-col gap-0.5">
              {g.items.filter((it) => !it.owner || user?.role === 'owner').map((it) => (
                <NavLink key={it.to} to={it.to} end={it.end}
                  className={({ isActive }) => cx('group flex items-center gap-3 px-3 h-10 rounded-xl text-base transition-colors',
                    isActive ? 'bg-sand-50 text-petrol-800 font-semibold' : 'text-petrol-100 hover:bg-petrol-800 hover:text-white')}>
                  {({ isActive }) => <>
                    <Icon name={it.icon} size={19} className={isActive ? 'text-petrol-600' : 'text-petrol-300 group-hover:text-petrol-100'} />
                    <span className="flex-1 truncate">{t(`app.nav.${it.key}`)}</span>
                    {it.badge === 'pending' && pending > 0 && (
                      <span className="min-w-[1.4rem] h-5 px-1.5 rounded-full bg-saffron-400 text-petrol-900 text-xs font-bold grid place-items-center tabular-nums">{pending}</span>
                    )}
                  </>}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-petrol-800 flex flex-col gap-2">
        <PlanBadge onNavigate={() => setOpen(false)} />
        <SidebarLang />
      </div>
    </div>
  );

  return (
    <div className="min-h-dvh lg:flex bg-sand-50 text-ink">
      <aside className="hidden lg:block lg:w-64 lg:shrink-0 bg-petrol-700 text-sand-50 lg:sticky lg:top-0 lg:h-dvh">{sidebar}</aside>
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-petrol-950/50" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 start-0 w-[18rem] max-w-[85vw] bg-petrol-700 text-sand-50 shadow-lift">{sidebar}</aside>
        </div>
      )}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 px-3 sm:px-4 lg:px-8 flex items-center gap-2 sm:gap-3 border-b border-sand-200 bg-sand-50/90 backdrop-blur sticky top-0 z-30">
          <button className="lg:hidden h-10 w-10 grid place-items-center rounded-xl hover:bg-sand-100 text-petrol-700" onClick={() => setOpen(true)} aria-label={t('app.layout.menu')}>
            <Icon name="menu" size={22} />
          </button>
          <GlobalSearch />
          <div className="ms-auto flex items-center gap-1.5 sm:gap-2">
            <Button as={Link} to="/app/jobs/new" variant="cta" size="md" icon={<Icon name="plus" size={18} />} className="px-3 sm:px-4">
              <span className="hidden sm:inline">{t('app.layout.newJob')}</span>
            </Button>
            <UserMenu />
          </div>
        </header>
        {planInfo?.expired && (
          <div className="bg-danger-50 border-b border-danger-500/20 text-danger-700 px-4 lg:px-8 py-2.5 text-sm flex flex-wrap items-center gap-2">
            <Icon name="alert" size={16} />
            <span className="flex-1">{t('app.plan.expiredBanner')}</span>
            {user?.role === 'owner' && <Link to="/app/settings/billing" className="font-semibold underline underline-offset-4">{t('app.plan.chooseplan')}</Link>}
          </div>
        )}
        <main className="flex-1 w-full px-4 lg:px-8 py-6 max-w-7xl mx-auto"><Outlet /></main>
      </div>
    </div>
  );
}
