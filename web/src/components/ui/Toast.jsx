// <ToastProvider> wraps the app (done in main.jsx).
// const toast = useToast(); toast.success('تم الحفظ'); toast.error(err) — accepts string or ApiError; toast.info('…')
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { cx } from '../../lib/cx.js';
import { useI18n } from '../../i18n/index.jsx';

const ToastContext = createContext(null);
let nextId = 1;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const { t } = useI18n();
  const dismiss = useCallback((id) => setToasts((ts) => ts.filter((x) => x.id !== id)), []);
  const push = useCallback((kind, msg) => {
    const id = nextId++;
    let text = msg;
    if (msg && typeof msg === 'object') {
      const key = `errors.${msg.code}`;
      const tr = t(key);
      text = tr !== key ? tr : msg.message || t('common.error');
    }
    setToasts((ts) => [...ts.slice(-3), { id, kind, text }]);
    setTimeout(() => dismiss(id), kind === 'error' ? 6000 : 3500);
  }, [t, dismiss]);
  const api = useMemo(() => ({
    success: (m) => push('success', m), error: (m) => push('error', m), info: (m) => push('info', m),
  }), [push]);
  return (
    <ToastContext.Provider value={api}>
      {children}
      <div aria-live="polite" className="fixed z-[60] bottom-4 inset-x-4 sm:inset-x-auto sm:end-4 flex flex-col gap-2 sm:w-96 pointer-events-none">
        {toasts.map((x) => (
          <div key={x.id} role={x.kind === 'error' ? 'alert' : 'status'}
            className={cx('pointer-events-auto rounded-xl px-4 py-3 shadow-lift text-base animate-toast-in flex items-start gap-3',
              x.kind === 'success' && 'bg-petrol-700 text-white',
              x.kind === 'error' && 'bg-danger-600 text-white',
              x.kind === 'info' && 'bg-ink text-sand-50')}>
            <span className="flex-1">{x.text}</span>
            <button onClick={() => dismiss(x.id)} className="opacity-70 hover:opacity-100" aria-label="×">×</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}
