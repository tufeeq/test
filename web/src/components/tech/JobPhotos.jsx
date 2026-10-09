// OWNER: B4. Before/after photos. Camera capture → canvas compression (≤300 KB JPEG) → upload (or offline queue).
import { useRef, useState } from 'react';
import { Modal, Button, Spinner } from '../../components/ui/index.js';
import { cx } from '../../lib/cx.js';
import { useTechI18n } from './techI18n.jsx';
import { compressImage } from './media.js';
import { IconCamera, IconTrash } from './icons.jsx';

export default function JobPhotos({ photos, onAdd, onRemove, disabled }) {
  const { t } = useTechI18n();
  const [busy, setBusy] = useState(null); // 'before' | 'after'
  const [view, setView] = useState(null);
  const inputs = { before: useRef(null), after: useRef(null) };

  const pick = async (kind, e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setBusy(kind);
    try {
      const dataUrl = await compressImage(file);
      await onAdd(kind, dataUrl);
    } catch (err) {
      onAdd(kind, null, err);
    } finally {
      setBusy(null);
    }
  };

  const group = (kind) => (photos || []).filter((p) => p.kind === kind);

  return (
    <section className="rounded-2xl bg-white border border-sand-200 p-4">
      <h2 className="text-lg font-bold mb-3">{t('tech.photos.title')}</h2>
      <div className="grid grid-cols-2 gap-3">
        {['before', 'after'].map((kind) => (
          <div key={kind} className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-sand-800">{t(`tech.photos.${kind}`)} <span className="tabular-nums">({group(kind).length})</span></p>
            <div className="grid grid-cols-2 gap-1.5">
              {group(kind).map((p) => (
                <button key={p.id} type="button" onClick={() => p.data_url && setView(p)}
                  className="relative aspect-square rounded-lg overflow-hidden bg-sand-100 border border-sand-200">
                  {p.data_url ? <img src={p.data_url} alt="" className="h-full w-full object-cover" loading="lazy" /> : <IconCamera size={20} className="m-auto text-sand-400" />}
                  {p.pending && <span className="absolute inset-x-0 bottom-0 bg-ink/75 text-[10px] text-white py-0.5 text-center">{t('tech.photos.pending')}</span>}
                </button>
              ))}
            </div>
            <input ref={inputs[kind]} type="file" accept="image/*" capture="environment" className="sr-only" tabIndex={-1}
              onChange={(e) => pick(kind, e)} aria-hidden="true" />
            <button type="button" disabled={disabled || busy !== null} onClick={() => inputs[kind].current?.click()}
              className={cx('min-h-[64px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 font-semibold text-sm',
                'border-petrol-300 text-petrol-700 bg-petrol-50/50 active:bg-petrol-50 disabled:opacity-60')}>
              {busy === kind ? <Spinner size={22} /> : <IconCamera size={24} />}
              {busy === kind ? t('tech.photos.compressing') : t('tech.photos.take')}
            </button>
          </div>
        ))}
      </div>

      <Modal open={Boolean(view)} onClose={() => setView(null)} title={view ? t(`tech.photos.${view.kind}`) : ''}
        footer={view && !view.pending && onRemove && (
          <Button variant="danger" icon={<IconTrash size={18} />} onClick={() => {
            if (window.confirm(t('tech.photos.removeConfirm'))) { onRemove(view); setView(null); }
          }}>{t('tech.photos.remove')}</Button>
        )}>
        {view?.data_url && <img src={view.data_url} alt="" className="w-full rounded-xl" />}
      </Modal>
    </section>
  );
}
