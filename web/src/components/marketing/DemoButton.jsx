// "Try the live demo": signs into the seeded demo account, then opens /app. Shows a toast if the demo isn't seeded.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/auth.jsx';
import { useToast } from '../../components/ui/index.js';
import Spinner from '../../components/ui/Spinner.jsx';
import { cx } from '../../lib/cx.js';
import { useM, DEMO_EMAIL, DEMO_PASSWORD } from './useMarketing.js';
import { IconPlay } from './icons.jsx';

export default function DemoButton({ tone = 'dark', className }) {
  const m = useM();
  const { login } = useAuth();
  const toast = useToast();
  const nav = useNavigate();
  const [busy, setBusy] = useState(false);

  async function go() {
    setBusy(true);
    try {
      await login(DEMO_EMAIL, DEMO_PASSWORD);
      nav('/app');
    } catch {
      toast.error(m.demo.failed);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button type="button" onClick={go} disabled={busy} aria-busy={busy || undefined} title={m.demo.hint}
      className={cx(
        'inline-flex items-center justify-center gap-2 h-12 px-5 rounded-xl text-lg font-medium transition-colors whitespace-nowrap',
        'focus-visible:outline-none focus-visible:shadow-ring disabled:opacity-60',
        tone === 'dark'
          ? 'text-sand-50 border border-petrol-400/60 hover:bg-petrol-700 hover:border-petrol-300'
          : 'text-petrol-700 bg-white border border-sand-200 hover:border-petrol-300 hover:bg-petrol-50',
        className
      )}>
      {busy ? <Spinner size={18} /> : <IconPlay size={18} className="rtl:rotate-180" />}
      {busy ? m.demo.busy : m.demo.button}
    </button>
  );
}
