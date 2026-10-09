// Small app-only building blocks shared by B3 pages. Wraps (never forks) components/ui.
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/index.jsx';
import { cx } from '../../lib/cx.js';
import { api } from '../../lib/api.js';
import { Badge, Button, Modal } from '../ui/index.js';
import Icon from './icons.jsx';
import { greg, hijri } from './dates.js';

export const VAT_RATE = 0.15;
export const round2 = (n) => Math.round((Number(n) || 0) * 100) / 100;
export function totals(items = []) {
  const subtotal = round2(items.reduce((s, i) => s + (Number(i.qty) || 0) * (Number(i.unit_price) || 0), 0));
  const vat = round2(subtotal * VAT_RATE);
  return { subtotal, vat, total: round2(subtotal + vat) };
}

/** Saudi VAT number: 15 digits, starts and ends with 3. */
export const isValidVat = (v) => !v || /^3\d{13}3$/.test(String(v).trim());

export const CATEGORIES = ['ac', 'maintenance', 'repair', 'installation', 'inspection', 'cleaning', 'pest', 'plumbing', 'electrical', 'other'];
/** Label for a job/service category: shared `category.*` first, then app service categories, else the raw value. */
export function catLabel(t, c) {
  const v = c || 'other';
  for (const k of [`category.${v}`, `app.services.cat_${v}`]) { const r = t(k); if (r !== k) return r; }
  return v;
}
export const STATUSES = ['new', 'scheduled', 'on_the_way', 'in_progress', 'completed', 'cancelled'];
export const PRIORITIES = ['low', 'normal', 'urgent'];
export const ASSET_KINDS = ['split_ac', 'central_ac', 'window_ac', 'cold_room', 'other'];
export const TECH_COLORS = ['#2563EB', '#16A34A', '#DB2777', '#EA580C', '#7C3AED', '#0891B2', '#CA8A04', '#4F46E5', '#BE123C', '#0F766E'];

/** Debounced value. */
export function useDebounced(value, ms = 300) {
  const [v, setV] = useState(value);
  useEffect(() => { const id = setTimeout(() => setV(value), ms); return () => clearTimeout(id); }, [value, ms]);
  return v;
}

// Tiny in-memory cache for reference lists (technicians, services) shared across pages in one session.
const refCache = new Map();
export function useRefList(key, loader) {
  const [items, setItems] = useState(() => refCache.get(key) || null);
  const reload = useCallback(async () => {
    try { const d = await loader(); refCache.set(key, d); setItems(d); } catch { if (!refCache.has(key)) setItems([]); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  useEffect(() => { reload(); }, [reload]);
  return [items || [], reload, items === null];
}
export const invalidateRef = (key) => refCache.delete(key);
export const useTechnicians = () => useRefList('techs', () => api.get('/users', { role: 'technician', active: true }).then((r) => r.items || []));
export const useServices = () => useRefList('services', () => api.get('/services', { active: true }).then((r) => r.items || []));

/** Gregorian date with Hijri underneath (or inline). */
export function DualDate({ value, inline, className, withWeekday }) {
  const { locale } = useI18n();
  if (!value) return <span className="text-sand-400">—</span>;
  const g = greg(value, locale, withWeekday ? { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' } : undefined);
  const h = hijri(value, locale, { day: 'numeric', month: 'short', year: 'numeric' });
  if (inline) return <span className={cx('tabular-nums', className)}>{g}{h && <span className="text-sand-500"> · {h}</span>}</span>;
  return (
    <span className={cx('inline-flex flex-col leading-tight tabular-nums', className)}>
      <span>{g}</span>
      {h && <span className="text-xs text-sand-500">{h}</span>}
    </span>
  );
}

export function Money({ value, className, strong }) {
  const { fmtMoney } = useI18n();
  return <span className={cx('tabular-nums whitespace-nowrap', strong && 'font-semibold', className)}>{fmtMoney(value)}</span>;
}

export function Ltr({ children, className }) {
  return <span dir="ltr" className={cx('ltr-nums tabular-nums', className)}>{children}</span>;
}

/** Shimmer-free skeleton block (motion kept minimal per design system). */
export function Skeleton({ className }) {
  return <div className={cx('rounded-lg bg-sand-100', className)} />;
}
export function SkeletonRows({ rows = 5, className }) {
  return (
    <div className={cx('flex flex-col gap-3', className)} aria-busy="true">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="flex-1 flex flex-col gap-1.5"><Skeleton className="h-3.5 w-2/5" /><Skeleton className="h-3 w-1/4" /></div>
          <Skeleton className="h-5 w-16" />
        </div>
      ))}
    </div>
  );
}
export function PageSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true">
      <div className="flex flex-col gap-2"><Skeleton className="h-8 w-56" /><Skeleton className="h-4 w-32" /></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}</div>
      <Skeleton className="h-72 rounded-2xl" />
    </div>
  );
}

/** Inline error panel with retry. */
export function ErrorState({ error, onRetry, className }) {
  const { t } = useI18n();
  const key = error?.code ? `errors.${error.code}` : null;
  const tr = key ? t(key) : null;
  const msg = tr && tr !== key ? tr : error?.message || t('common.error');
  return (
    <div className={cx('rounded-2xl border border-danger-500/20 bg-danger-50 p-5 flex flex-col sm:flex-row sm:items-center gap-3', className)} role="alert">
      <Icon name="alert" className="text-danger-600" size={22} />
      <div className="flex-1">
        <p className="font-medium text-danger-700">{t('app.common.loadFailed')}</p>
        <p className="text-sm text-danger-700/80">{msg}</p>
      </div>
      {onRetry && <Button size="sm" variant="secondary" onClick={onRetry}>{t('common.retry')}</Button>}
    </div>
  );
}

/** Copy-to-clipboard button. */
export function CopyButton({ text, label, size = 'sm', variant = 'secondary', className }) {
  const { t } = useI18n();
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch { /* ignore */ } ta.remove();
    }
    setDone(true); setTimeout(() => setDone(false), 1600);
  };
  return (
    <Button size={size} variant={variant} className={className} onClick={copy} icon={<Icon name={done ? 'check' : 'copy'} size={15} />}>
      {done ? t('app.common.copied') : label ?? t('app.common.copy')}
    </Button>
  );
}

/** Technician avatar dot with initials in their colour. */
export function Avatar({ name = '', color = '#7A6849', size = 32, className }) {
  const initials = name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('');
  return (
    <span className={cx('inline-grid place-items-center rounded-full text-white font-semibold shrink-0', className)}
      style={{ width: size, height: size, background: color, fontSize: size * 0.4 }} aria-hidden="true">
      {initials}
    </span>
  );
}

export function TechChip({ tech, className }) {
  const { t } = useI18n();
  if (!tech) return <span className={cx('text-sand-500 text-sm', className)}>{t('app.common.unassigned')}</span>;
  return (
    <span className={cx('inline-flex items-center gap-2 min-w-0', className)}>
      <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: tech.color || '#7A6849' }} />
      <span className="truncate">{tech.name}</span>
    </span>
  );
}

const INV_TONE = { unpaid: 'saffron', paid: 'success', void: 'sand', draft: 'info', issued: 'petrol' };
export function InvoiceStatusBadge({ status, kind }) {
  const { t } = useI18n();
  if (kind === 'credit_note') return <Badge tone="danger">{t('app.invoices.kind_credit_note')}</Badge>;
  const k = `invoiceStatus.${status}`; const v = t(k);
  return <Badge tone={INV_TONE[status] || 'sand'}>{v !== k ? v : t(`app.invoices.st_${status}`)}</Badge>;
}
const CON_TONE = { active: 'success', expired: 'sand', cancelled: 'danger' };
export function ContractStatusBadge({ status }) {
  const { t } = useI18n();
  return <Badge tone={CON_TONE[status] || 'sand'}>{t(`contractStatus.${status}`)}</Badge>;
}

/** Segmented control. items: [{ value, label }] */
export function Segmented({ items, value, onChange, className, size = 'md' }) {
  return (
    <div role="radiogroup" className={cx('inline-flex rounded-xl bg-sand-100 p-1 gap-1', className)}>
      {items.map((it) => (
        <button key={it.value} type="button" role="radio" aria-checked={value === it.value} onClick={() => onChange(it.value)}
          className={cx('rounded-lg font-medium transition-colors whitespace-nowrap', size === 'sm' ? 'px-2.5 h-7 text-sm' : 'px-3.5 h-8 text-sm',
            value === it.value ? 'bg-white text-petrol-700 shadow-card' : 'text-sand-600 hover:text-ink')}>
          {it.label}
        </button>
      ))}
    </div>
  );
}

/** Search input with icon. */
export function SearchBox({ value, onChange, placeholder, className, autoFocus, inputRef }) {
  return (
    <label className={cx('relative flex items-center', className)}>
      <Icon name="search" size={17} className="absolute start-3 text-sand-500 pointer-events-none" />
      <input ref={inputRef} type="search" value={value} autoFocus={autoFocus} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full h-10 rounded-xl border border-sand-200 bg-white ps-9 pe-3 text-base placeholder:text-sand-400 hover:border-sand-300 focus:outline-none focus:border-petrol-500 focus:ring-2 focus:ring-petrol-100" />
    </label>
  );
}

/** Confirm dialog driven by a promise: const confirm = useConfirm(); if (await confirm({ title, body, danger })) … */
export function useConfirm() {
  const [state, setState] = useState(null);
  const resolver = useRef(null);
  const confirm = useCallback((opts) => new Promise((res) => { resolver.current = res; setState(opts); }), []);
  const close = (v) => { resolver.current?.(v); setState(null); };
  const { t } = useI18n();
  const node = (
    <Modal open={!!state} onClose={() => close(false)} title={state?.title} size="sm"
      footer={<>
        <Button variant="secondary" onClick={() => close(false)}>{t('common.cancel')}</Button>
        <Button variant={state?.danger ? 'danger' : 'primary'} onClick={() => close(true)}>{state?.confirmLabel || t('common.confirm')}</Button>
      </>}>
      <p className="text-sand-700">{state?.body}</p>
    </Modal>
  );
  return [confirm, node];
}

/** Section label row inside cards. */
export function KV({ label, children, className }) {
  return (
    <div className={cx('flex items-start justify-between gap-4 py-2 border-b border-sand-100 last:border-0', className)}>
      <dt className="text-sm text-sand-600 shrink-0">{label}</dt>
      <dd className="text-end min-w-0 break-words">{children ?? <span className="text-sand-400">—</span>}</dd>
    </div>
  );
}

/** Arc progress ring — reuses the brand cycle motif for contract visits. */
export function CycleRing({ done = 0, total = 0, size = 44, stroke = 5, className, label }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = total > 0 ? Math.min(1, done / total) : 0;
  return (
    <span className={cx('relative inline-grid place-items-center shrink-0', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EADFCB" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={pct >= 1 ? '#2E8B57' : '#0F5C5C'} strokeWidth={stroke}
          strokeDasharray={`${c * pct} ${c}`} strokeLinecap="round" />
      </svg>
      <span className="absolute text-xs font-semibold tabular-nums text-petrol-800">{label ?? `${done}/${total}`}</span>
    </span>
  );
}

/** Link that looks like body text with petrol hover. */
export function PlainLink({ to, children, className }) {
  return <Link to={to} className={cx('text-petrol-700 hover:text-petrol-900 hover:underline underline-offset-4', className)} onClick={(e) => e.stopPropagation()}>{children}</Link>;
}

/** Filter bar wrapper for list pages. */
export function FilterBar({ children, className }) {
  return <div className={cx('flex flex-wrap items-end gap-3 mb-4', className)}>{children}</div>;
}

/** Compact select without a label, for filter bars. */
export function MiniSelect({ value, onChange, children, className, ariaLabel }) {
  return (
    <select aria-label={ariaLabel} value={value} onChange={(e) => onChange(e.target.value)}
      className={cx('h-10 rounded-xl border border-sand-200 bg-white px-3 pe-8 text-base hover:border-sand-300 focus:outline-none focus:border-petrol-500 focus:ring-2 focus:ring-petrol-100', className)}>
      {children}
    </select>
  );
}

/** Pager for paged list responses. */
export function Pager({ total = 0, limit = 50, offset = 0, onChange }) {
  const { t } = useI18n();
  if (total <= limit) return null;
  const from = offset + 1; const to = Math.min(total, offset + limit);
  return (
    <div className="flex items-center justify-between gap-3 mt-4 text-sm text-sand-600">
      <span className="tabular-nums">{t('app.common.showing', { from, to, total })}</span>
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" disabled={offset === 0} onClick={() => onChange(Math.max(0, offset - limit))}>{t('app.common.prev')}</Button>
        <Button size="sm" variant="secondary" disabled={to >= total} onClick={() => onChange(offset + limit)}>{t('common.next')}</Button>
      </div>
    </div>
  );
}

/** wa.me link for a Saudi number + message. */
export function waLink(phone, text) {
  const p = String(phone || '').replace(/\D/g, '');
  return `https://wa.me/${p}?text=${encodeURIComponent(text || '')}`;
}

/** Absolute URL for a path like /t/abc. */
export function absUrl(pathOrUrl) {
  if (!pathOrUrl) return '';
  if (/^https?:/i.test(pathOrUrl)) return pathOrUrl;
  if (typeof window === 'undefined') return pathOrUrl;
  return `${window.location.origin}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
}

/** Fetch a binary endpoint (PDF/PNG/CSV) with cookies and trigger a download. */
export async function downloadFrom(path, filename) {
  const res = await fetch(`/api${path}`, { credentials: 'include' });
  if (!res.ok) { const e = new Error(res.statusText); e.code = res.status === 404 ? 'not_found' : 'internal'; throw e; }
  const blob = await res.blob();
  saveBlob(blob, filename);
}
export function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/** Service display name by locale. */
export const svcName = (s, locale) => (locale === 'ar' ? s?.name_ar || s?.name : s?.name || s?.name_ar) || '';
