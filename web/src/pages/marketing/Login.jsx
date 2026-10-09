// OWNER: B5. Login — behaviour kept from the architect baseline: login → redirect to ?next or role home.
import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth, homeFor } from '../../lib/auth.jsx';
import { Button, Input, useToast } from '../../components/ui/index.js';
import AuthLayout from '../../components/marketing/AuthLayout.jsx';
import DemoButton from '../../components/marketing/DemoButton.jsx';
import { useM, useSeo } from '../../components/marketing/useMarketing.js';

/** Only allow same-origin relative redirects. */
const safeNext = (n) => (n && n.startsWith('/') && !n.startsWith('//') ? n : null);

export default function Login() {
  const { login } = useAuth();
  const m = useM();
  const a = m.auth;
  const toast = useToast();
  const nav = useNavigate();
  const [sp] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  useSeo(m.meta.loginTitle, m.meta.loginDesc);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      const s = await login(email, password);
      nav(safeNext(sp.get('next')) || homeFor(s.user.role), { replace: true });
    } catch (err) {
      toast.error(err.code === 'unauthorized' ? a.wrong : err);
    } finally { setBusy(false); }
  }

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold">{a.loginTitle}</h1>
      <p className="mt-2 text-sand-600">{a.loginSub}</p>
      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
        <Input label={a.email} type="email" dir="ltr" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label={a.password} type="password" dir="ltr" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" variant="primary" size="lg" block loading={busy} className="mt-2">{a.submit}</Button>
      </form>
      <div className="my-6 flex items-center gap-3 text-sm text-sand-500">
        <span className="h-px flex-1 bg-sand-200" />{a.or}<span className="h-px flex-1 bg-sand-200" />
      </div>
      <DemoButton tone="light" className="w-full" />
      <p className="mt-8 text-sand-700 text-center">
        {a.noAccount}{' '}
        <Link to="/signup" className="text-petrol-600 font-semibold hover:underline">{a.tryFree}</Link>
      </p>
    </AuthLayout>
  );
}
