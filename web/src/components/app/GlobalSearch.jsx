// Top-bar search across customers and jobs. "/" focuses it. Arrow keys + Enter navigate results.
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/api.js';
import { useI18n } from '../../i18n/index.jsx';
import { StatusBadge, Spinner } from '../ui/index.js';
import { cx } from '../../lib/cx.js';
import Icon from './icons.jsx';
import { useDebounced, Ltr } from './kit.jsx';

export default function GlobalSearch() {
  const { t } = useI18n();
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [res, setRes] = useState({ customers: [], jobs: [] });
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const dq = useDebounced(q.trim(), 250);
  const box = useRef(null);
  const input = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) { e.preventDefault(); input.current?.focus(); }
    };
    const onDoc = (e) => { if (!box.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('keydown', onKey); document.addEventListener('mousedown', onDoc);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onDoc); };
  }, []);

  useEffect(() => {
    if (dq.length < 2) { setRes({ customers: [], jobs: [] }); return; }
    let alive = true;
    setLoading(true);
    Promise.allSettled([api.get('/customers', { q: dq, limit: 5 }), api.get('/jobs', { q: dq, limit: 6 })]).then(([c, j]) => {
      if (!alive) return;
      setRes({ customers: c.value?.items || [], jobs: j.value?.items || [] });
      setActive(0); setLoading(false);
    });
    return () => { alive = false; };
  }, [dq]);

  const flat = [
    ...res.customers.map((c) => ({ kind: 'c', to: `/app/customers/${c.id}`, item: c })),
    ...res.jobs.map((j) => ({ kind: 'j', to: `/app/jobs/${j.id}`, item: j })),
  ];
  const go = (to) => { setOpen(false); setQ(''); input.current?.blur(); nav(to); };
  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(flat.length - 1, a + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === 'Enter' && flat[active]) { e.preventDefault(); go(flat[active].to); }
    else if (e.key === 'Escape') { setOpen(false); input.current?.blur(); }
  };

  const show = open && dq.length >= 2;
  let idx = -1;
  return (
    <div ref={box} className="relative flex-1 max-w-md">
      <label className="relative flex items-center">
        <Icon name="search" size={17} className="absolute start-3 text-sand-500 pointer-events-none" />
        <input ref={input} type="search" value={q} onChange={(e) => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} onKeyDown={onKeyDown}
          placeholder={t('app.search.placeholder')} aria-label={t('app.search.placeholder')} role="combobox" aria-expanded={show} aria-controls="gsearch-list"
          className="w-full h-10 rounded-xl border border-sand-200 bg-white ps-9 pe-10 text-base placeholder:text-sand-400 hover:border-sand-300 focus:outline-none focus:border-petrol-500 focus:ring-2 focus:ring-petrol-100" />
        <kbd className="hidden md:grid absolute end-2.5 h-6 min-w-6 px-1.5 place-items-center rounded-md border border-sand-200 text-xs text-sand-500 bg-sand-50">/</kbd>
      </label>
      {show && (
        <div id="gsearch-list" role="listbox" className="absolute inset-x-0 mt-2 rounded-2xl bg-white border border-sand-200 shadow-lift p-1.5 z-50 max-h-[70vh] overflow-y-auto min-w-[18rem]">
          {loading && flat.length === 0 && <div className="py-6 grid place-items-center text-petrol-600"><Spinner /></div>}
          {!loading && flat.length === 0 && <div className="px-3 py-5 text-center text-sand-600">{t('app.search.noResults', { q: dq })}</div>}
          {res.customers.length > 0 && <div className="px-3 pt-2 pb-1 text-xs text-sand-500">{t('app.nav.customers')}</div>}
          {res.customers.map((c) => { idx++; const i = idx; return (
            <button key={c.id} role="option" aria-selected={active === i} onMouseEnter={() => setActive(i)} onClick={() => go(`/app/customers/${c.id}`)}
              className={cx('w-full flex items-center gap-3 px-3 py-2 rounded-xl text-start', active === i && 'bg-petrol-50')}>
              <Icon name="user" size={17} className="text-petrol-500" />
              <span className="flex-1 min-w-0 truncate font-medium">{c.name}</span>
              <Ltr className="text-sm text-sand-600">{c.phone}</Ltr>
            </button>
          ); })}
          {res.jobs.length > 0 && <div className="px-3 pt-2 pb-1 text-xs text-sand-500">{t('app.nav.jobs')}</div>}
          {res.jobs.map((j) => { idx++; const i = idx; return (
            <button key={j.id} role="option" aria-selected={active === i} onMouseEnter={() => setActive(i)} onClick={() => go(`/app/jobs/${j.id}`)}
              className={cx('w-full flex items-center gap-3 px-3 py-2 rounded-xl text-start', active === i && 'bg-petrol-50')}>
              <Ltr className="text-sm text-sand-500 w-10">#{j.number}</Ltr>
              <span className="flex-1 min-w-0">
                <span className="block truncate font-medium">{j.title}</span>
                <span className="block truncate text-sm text-sand-600">{j.customer?.name}</span>
              </span>
              <StatusBadge status={j.status} />
            </button>
          ); })}
        </div>
      )}
    </div>
  );
}
