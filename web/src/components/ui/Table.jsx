// <Table columns={[{ key:'name', header:'الاسم', render:(row)=>…, className, align:'end' }]} rows={[]} rowKey="id"
//        onRowClick={(row)=>…} loading empty={<EmptyState …/>} />
// Horizontally scrollable on small screens. Uses text-start/text-end so it flips with dir.
import { cx } from '../../lib/cx.js';
import Spinner from './Spinner.jsx';

export default function Table({ columns, rows = [], rowKey = 'id', onRowClick, loading, empty, className }) {
  return (
    <div className={cx('overflow-x-auto rounded-2xl border border-sand-200/70 bg-white shadow-card', className)}>
      <table className="w-full text-base">
        <thead>
          <tr className="border-b border-sand-200 bg-sand-50/80">
            {columns.map((c) => (
              <th key={c.key} scope="col"
                className={cx('px-4 py-2.5 text-sm font-medium text-sand-600 whitespace-nowrap', c.align === 'end' ? 'text-end' : 'text-start', c.headerClassName)}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={columns.length} className="py-12 text-center text-petrol-600"><Spinner size={24} /></td></tr>
          ) : rows.length === 0 ? (
            <tr><td colSpan={columns.length} className="p-0">{empty}</td></tr>
          ) : (
            rows.map((row) => (
              <tr key={row[rowKey]} onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cx('border-b border-sand-100 last:border-0', onRowClick && 'cursor-pointer hover:bg-petrol-50/50')}>
                {columns.map((c) => (
                  <td key={c.key} className={cx('px-4 py-3 align-middle', c.align === 'end' ? 'text-end' : 'text-start', c.className)}>
                    {c.render ? c.render(row) : row[c.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
