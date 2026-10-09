// <Tabs value={tab} onChange={setTab} items={[{ value:'all', label:'الكل', count: 30 }]} />
import { cx } from '../../lib/cx.js';

export default function Tabs({ items, value, onChange, className }) {
  return (
    <div role="tablist" className={cx('flex gap-1 overflow-x-auto border-b border-sand-200 -mx-1 px-1', className)}>
      {items.map((it) => {
        const active = it.value === value;
        return (
          <button key={it.value} role="tab" aria-selected={active} onClick={() => onChange(it.value)}
            className={cx('relative px-3.5 py-2.5 text-base whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:bg-petrol-50 rounded-t-lg',
              active ? 'text-petrol-700 font-semibold' : 'text-sand-600 hover:text-ink')}>
            {it.label}
            {it.count != null && (
              <span className={cx('ms-1.5 rounded-full px-1.5 text-xs tabular-nums', active ? 'bg-petrol-600 text-white' : 'bg-sand-100 text-sand-600')}>{it.count}</span>
            )}
            {active && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-petrol-600" />}
          </button>
        );
      })}
    </div>
  );
}
