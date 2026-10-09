// OWNER: B5. Signup — behaviour kept from the architect baseline: POST /api/auth/signup then go to /app.
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/auth.jsx';
import { useI18n } from '../../i18n/index.jsx';
import { Button, Input, useToast } from '../../components/ui/index.js';
import AuthLayout from '../../components/marketing/AuthLayout.jsx';
import { useM, useSeo } from '../../components/marketing/useMarketing.js';

export default function Signup() {
  const { signup } = useAuth();
  const { locale } = useI18n();
  const m = useM();
  const a = m.auth;
  const toast = useToast();
  const nav = useNavigate();
  const [f, setF] = useState({ company_name: '', name: '', email: '', phone: '', password: '' });
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  useSeo(m.meta.signupTitle, m.meta.signupDesc);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    try { await signup({ ...f, phone: f.phone || undefined, locale }); nav('/app', { replace: true }); }
    catch (err) { toast.error(err); }
    finally { setBusy(false); }
  }

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold">{a.signupTitle}</h1>
      <p className="mt-2 text-sand-600">{a.signupSub}</p>
      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
        <Input label={a.company} required autoComplete="organization" value={f.company_name} onChange={set('company_name')} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label={a.name} required autoComplete="name" value={f.name} onChange={set('name')} />
          <Input label={a.mobile} dir="ltr" type="tel" inputMode="tel" autoComplete="tel" placeholder="05XXXXXXXX" value={f.phone} onChange={set('phone')} />
        </div>
        <Input label={a.email} dir="ltr" type="email" autoComplete="email" required value={f.email} onChange={set('email')} />
        <Input label={a.password} dir="ltr" type="password" autoComplete="new-password" minLength={8} required value={f.password} onChange={set('password')} hint={a.passwordHint} />
        <Button type="submit" variant="cta" size="lg" block loading={busy} className="mt-2">{a.start}</Button>
        <p className="text-xs text-sand-500 text-center">{a.terms}</p>
      </form>
      <p className="mt-8 text-sand-700 text-center">
        {a.haveAccount}{' '}
        <Link to="/login" className="text-petrol-600 font-semibold hover:underline">{a.signIn}</Link>
      </p>
    </AuthLayout>
  );
}
