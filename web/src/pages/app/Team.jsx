// OWNER: B3. Team: users, invite (temp password shown once), skills, colour, deactivate. Plan limits shown nicely.
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api.js';
import { useAsync } from '../../lib/useAsync.js';
import { useAuth } from '../../lib/auth.jsx';
import { useI18n } from '../../i18n/index.jsx';
import { Badge, Button, Card, EmptyState, Input, Modal, PageHeader, Select, Tabs, useToast } from '../../components/ui/index.js';
import Icon from '../../components/app/icons.jsx';
import { Avatar, CopyButton, ErrorState, Ltr, SkeletonRows, TECH_COLORS, invalidateRef, useConfirm } from '../../components/app/kit.jsx';
import { normPhone } from '../../components/app/CustomerForm.jsx';
import { cx } from '../../lib/cx.js';

const SKILLS = ['split_ac', 'window_ac', 'central_ac', 'cold_room', 'installation', 'cleaning', 'plumbing', 'electrical', 'pest'];

export default function Team() {
  const { t } = useI18n();
  const toast = useToast();
  const { user } = useAuth();
  const isOwner = user?.role === 'owner';
  const [tab, setTab] = useState('active');
  const { data, error, loading, reload, setData } = useAsync(() => api.get('/users'), []);
  const company = useAsync(() => api.get('/companies/me'), []);
  const [editing, setEditing] = useState(null); // user or {} for invite
  const [created, setCreated] = useState(null); // { user, password }
  const [limitHit, setLimitHit] = useState(false);
  const [confirm, confirmNode] = useConfirm();

  const users = data?.items || [];
  const shown = users.filter((u) => (tab === 'active' ? u.active !== false : u.active === false));
  const activeTechs = users.filter((u) => u.role === 'technician' && u.active !== false).length;
  const limit = company.data?.limits?.technicians;
  const atLimit = limit != null && activeTechs >= limit;

  const toggleActive = async (u) => {
    if (u.active !== false && !(await confirm({ title: t('app.team.deactivateTitle', { name: u.name }), body: t('app.team.deactivateBody'), danger: true, confirmLabel: t('app.team.deactivate') }))) return;
    try {
      const r = u.active === false ? await api.patch(`/users/${u.id}`, { active: true }) : (await api.del(`/users/${u.id}`), { ...u, active: false });
      setData((d) => ({ ...d, items: d.items.map((x) => (x.id === u.id ? { ...x, ...r } : x)) }));
      invalidateRef('techs');
      toast.success(u.active === false ? t('app.team.reactivated') : t('app.team.deactivated'));
    } catch (e) {
      if (e.code === 'plan_limit') setLimitHit(true); else toast.error(e);
    }
  };

  return (
    <div>
      {confirmNode}
      <PageHeader title={t('app.team.title')} subtitle={t('app.team.subtitle')}
        actions={isOwner && <Button onClick={() => (atLimit ? setLimitHit(true) : setEditing({}))} icon={<Icon name="plus" size={17} />}>{t('app.team.invite')}</Button>} />

      {limit != null && (
        <div className={cx('mb-5 rounded-2xl border p-4 flex flex-col sm:flex-row sm:items-center gap-3', atLimit ? 'bg-saffron-50/70 border-saffron-200' : 'bg-white border-sand-200/70 shadow-card')}>
          <div className="flex-1">
            <div className="flex items-center justify-between text-sm mb-1.5"><span className="text-sand-700">{t('app.team.techSeats')}</span><span className="tabular-nums font-semibold">{activeTechs} / {limit}</span></div>
            <div className="h-2 rounded-full bg-sand-100 overflow-hidden"><div className={cx('h-full rounded-full', atLimit ? 'bg-saffron-500' : 'bg-petrol-600')} style={{ width: `${Math.min(100, (activeTechs / limit) * 100)}%` }} /></div>
          </div>
          {atLimit && isOwner && <Button as={Link} to="/app/settings/billing" size="sm" variant="cta">{t('app.team.upgrade')}</Button>}
        </div>
      )}

      <Tabs className="mb-4" value={tab} onChange={setTab} items={[{ value: 'active', label: t('app.team.active'), count: users.filter((u) => u.active !== false).length }, { value: 'inactive', label: t('app.team.inactive'), count: users.filter((u) => u.active === false).length }]} />

      {error ? <ErrorState error={error} onRetry={reload} />
        : loading && !data ? <Card><SkeletonRows rows={5} /></Card>
        : shown.length === 0 ? <Card><EmptyState icon={<Icon name="team" size={24} />} title={tab === 'active' ? t('app.team.empty') : t('app.team.noInactive')} body={tab === 'active' ? t('app.team.emptyBody') : undefined} /></Card>
        : (
          <ul className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {shown.map((u) => (
              <li key={u.id} className={cx('rounded-2xl bg-white border border-sand-200/70 shadow-card p-5 flex flex-col gap-3', u.active === false && 'opacity-70')}>
                <div className="flex items-start gap-3">
                  <Avatar name={u.name} color={u.color || '#7A6849'} size={44} />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{u.name}{u.id === user?.id && <span className="text-sand-500 font-normal"> · {t('app.team.you')}</span>}</div>
                    <div className="text-sm text-sand-600 truncate"><Ltr>{u.email}</Ltr></div>
                    {u.phone && <div className="text-sm text-sand-500"><Ltr>{u.phone}</Ltr></div>}
                  </div>
                  <Badge tone={u.role === 'owner' ? 'petrol' : u.role === 'dispatcher' ? 'info' : 'sand'}>{t(`role.${u.role}`)}</Badge>
                </div>
                {(u.skills || []).length > 0 && (
                  <ul className="flex flex-wrap gap-1.5">{u.skills.map((s) => <li key={s} className="rounded-lg bg-sand-100 px-2 py-0.5 text-sm text-sand-700">{skillLabel(t, s)}</li>)}</ul>
                )}
                {isOwner && u.id !== user?.id && (
                  <div className="flex gap-2 mt-auto pt-2 border-t border-sand-100">
                    <Button size="sm" variant="ghost" icon={<Icon name="edit" size={15} />} onClick={() => setEditing(u)}>{t('common.edit')}</Button>
                    <Button size="sm" variant="ghost" className={u.active === false ? '' : 'text-danger-600 hover:bg-danger-50'} onClick={() => toggleActive(u)}>{u.active === false ? t('app.team.reactivate') : t('app.team.deactivate')}</Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

      <UserModal user={editing} onClose={() => setEditing(null)} onLimit={() => { setEditing(null); setLimitHit(true); }}
        onSaved={(u, pw) => {
          invalidateRef('techs');
          setData((d) => ({ ...d, items: d.items.some((x) => x.id === u.id) ? d.items.map((x) => (x.id === u.id ? { ...x, ...u } : x)) : [...d.items, u] }));
          setEditing(null);
          if (pw) setCreated({ user: u, password: pw }); else toast.success(t('common.saved'));
        }} />

      <Modal open={!!created} onClose={() => setCreated(null)} title={t('app.team.createdTitle')} size="sm"
        footer={<Button onClick={() => setCreated(null)}>{t('app.team.done')}</Button>}>
        {created && (
          <div className="flex flex-col gap-4">
            <p className="text-sand-700">{t('app.team.createdBody', { name: created.user.name })}</p>
            <div className="rounded-xl bg-sand-100 p-4 flex flex-col gap-2">
              <div className="text-sm text-sand-600">{t('app.team.email')}</div><Ltr className="font-medium">{created.user.email}</Ltr>
              <div className="text-sm text-sand-600 mt-2">{t('app.team.tempPassword')}</div><Ltr className="font-mono text-lg font-semibold tracking-wide">{created.password}</Ltr>
            </div>
            <div className="flex flex-wrap gap-2">
              <CopyButton text={`${created.user.email}\n${created.password}\n${window.location.origin}/login`} label={t('app.team.copyCreds')} />
              {created.user.phone && <Button as="a" size="sm" variant="secondary" target="_blank" rel="noreferrer" icon={<Icon name="whatsapp" size={15} />}
                href={`https://wa.me/${normPhone(created.user.phone)}?text=${encodeURIComponent(t('app.team.waCreds', { name: created.user.name, url: `${window.location.origin}/login`, email: created.user.email, pw: created.password }))}`}>{t('app.common.whatsapp')}</Button>}
            </div>
            <p className="text-sm text-saffron-800 bg-saffron-50 rounded-xl px-3 py-2 flex gap-2"><Icon name="alert" size={16} className="mt-0.5" />{t('app.team.onceWarning')}</p>
          </div>
        )}
      </Modal>

      <Modal open={limitHit} onClose={() => setLimitHit(false)} size="sm" title={t('app.team.limitTitle')}
        footer={<><Button variant="secondary" onClick={() => setLimitHit(false)}>{t('common.close')}</Button>{isOwner && <Button as={Link} to="/app/settings/billing" variant="cta">{t('app.team.upgrade')}</Button>}</>}>
        <div className="flex flex-col items-center text-center gap-3 py-2">
          <span className="h-14 w-14 rounded-full bg-saffron-50 text-saffron-600 grid place-items-center"><Icon name="team" size={26} /></span>
          <p className="text-sand-700">{t('app.team.limitBody', { n: limit ?? '' })}</p>
        </div>
      </Modal>
    </div>
  );
}

const skillLabel = (t, s) => {
  const k = `assetKind.${s}`; const a = t(k); if (a !== k) return a;
  const c = `category.${s}`; const b = t(c); if (b !== c) return b;
  const d = `app.team.skill_${s}`; const e = t(d); return e !== d ? e : s;
};

function UserModal({ user, onClose, onSaved, onLimit }) {
  const { t } = useI18n();
  const toast = useToast();
  const editing = !!user?.id;
  const [f, setF] = useState({});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (user) setF({ name: user.name || '', email: user.email || '', phone: user.phone || '', role: user.role || 'technician', skills: user.skills || [], color: user.color || TECH_COLORS[Math.floor(Math.random() * TECH_COLORS.length)], password: '' });
    setErrors({});
  }, [user]);
  if (!user) return null;
  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));
  const toggleSkill = (s) => set('skills', f.skills.includes(s) ? f.skills.filter((x) => x !== s) : [...f.skills, s]);
  const submit = async () => {
    const er = {};
    if (!f.name.trim()) er.name = t('app.form.required');
    if (!editing && !/^\S+@\S+\.\S+$/.test(f.email)) er.email = t('app.team.emailInvalid');
    if (f.password && f.password.length < 8) er.password = t('app.team.pwShort');
    setErrors(er); if (Object.keys(er).length) return;
    setSaving(true);
    try {
      if (editing) {
        const body = { name: f.name.trim(), phone: f.phone || null, role: f.role, skills: f.skills, color: f.color };
        if (f.password) body.password = f.password;
        onSaved(await api.patch(`/users/${user.id}`, body), f.password || null);
      } else {
        // Server generates a temp password when none is given (returned once as temp_password).
        const body = { name: f.name.trim(), email: f.email.trim().toLowerCase(), phone: f.phone || undefined, role: f.role, skills: f.skills, color: f.color };
        if (f.password) body.password = f.password;
        const u = await api.post('/users', body);
        const { temp_password: tmp, ...clean } = u;
        onSaved(clean, f.password || tmp || null);
      }
    } catch (e) {
      if (e.code === 'plan_limit') onLimit();
      else {
        if (e.code === 'conflict') setErrors({ email: t('app.team.emailTaken') });
        if (e.details?.length) setErrors(Object.fromEntries(e.details.map((d) => [String(d.path).replace(/^body\./, ''), d.message])));
        toast.error(e);
      }
    } finally { setSaving(false); }
  };
  return (
    <Modal open={!!user} onClose={onClose} size="lg" title={editing ? t('app.team.editTitle', { name: user.name }) : t('app.team.invite')}
      footer={<><Button variant="secondary" onClick={onClose}>{t('common.cancel')}</Button><Button onClick={submit} loading={saving}>{editing ? t('common.save') : t('app.team.create')}</Button></>}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label={t('app.team.name')} required value={f.name} onChange={(e) => set('name', e.target.value)} error={errors.name} />
        <Select label={t('app.team.role')} value={f.role} onChange={(e) => set('role', e.target.value)}
          options={[{ value: 'technician', label: t('role.technician') }, { value: 'dispatcher', label: t('role.dispatcher') }]} />
        <Input label={t('app.team.email')} required={!editing} disabled={editing} value={f.email} onChange={(e) => set('email', e.target.value)} error={errors.email} dir="ltr" type="email" />
        <Input label={t('app.team.phone')} value={f.phone} onChange={(e) => set('phone', e.target.value)} dir="ltr" inputMode="tel" placeholder="05XXXXXXXX" />
        <Input className="sm:col-span-2" label={editing ? t('app.team.newPassword') : t('app.team.password')} value={f.password} onChange={(e) => set('password', e.target.value)} error={errors.password} dir="ltr"
          hint={editing ? t('app.team.pwKeep') : t('app.team.pwAuto')} />
        {f.role === 'technician' && (
          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <span className="text-sm font-medium text-sand-800">{t('app.team.skills')}</span>
            <div className="flex flex-wrap gap-1.5">
              {SKILLS.map((s) => (
                <button key={s} type="button" onClick={() => toggleSkill(s)} aria-pressed={f.skills.includes(s)}
                  className={cx('rounded-lg px-2.5 h-8 text-sm border transition-colors', f.skills.includes(s) ? 'bg-petrol-600 border-petrol-600 text-white' : 'bg-white border-sand-200 text-sand-700 hover:border-sand-300')}>
                  {skillLabel(t, s)}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <span className="text-sm font-medium text-sand-800">{t('app.team.color')}</span>
          <div className="flex flex-wrap gap-2 items-center">
            {TECH_COLORS.map((c) => (
              <button key={c} type="button" onClick={() => set('color', c)} aria-label={c} aria-pressed={f.color === c}
                className={cx('h-8 w-8 rounded-full ring-offset-2 transition-shadow', f.color === c && 'ring-2 ring-petrol-700')} style={{ background: c }} />
            ))}
            <span className="ms-2"><Avatar name={f.name || '؟'} color={f.color} size={32} /></span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
