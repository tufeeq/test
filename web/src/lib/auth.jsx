// Session context. Owner: architect.
//   const { session, user, company, loading, login, signup, logout, refresh } = useAuth();
//   session = GET /api/auth/me payload: { user: {...}, company: {...} } | null
//   <RequireAuth roles={['owner','dispatcher']}>…</RequireAuth> redirects to /login (or role home).
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { api, onUnauthorized } from './api.js';
import { useI18n } from '../i18n/index.jsx';
import { FullPageSpinner } from '../components/ui/Spinner.jsx';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setLocale } = useI18n();

  const apply = useCallback((s) => {
    setSession(s);
    if (s?.user?.locale) setLocale(s.user.locale);
    return s;
  }, [setLocale]);

  const refresh = useCallback(async () => {
    try { return apply(await api.get('/auth/me')); }
    catch { setSession(null); return null; }
    finally { setLoading(false); }
  }, [apply]);

  useEffect(() => { refresh(); }, [refresh]);
  useEffect(() => onUnauthorized(() => setSession(null)), []);

  const value = useMemo(() => ({
    session, loading, user: session?.user ?? null, company: session?.company ?? null, refresh,
    login: async (email, password) => apply(await api.post('/auth/login', { email, password })),
    signup: async (body) => apply(await api.post('/auth/signup', body)),
    logout: async () => { await api.post('/auth/logout').catch(() => {}); setSession(null); },
  }), [session, loading, refresh, apply]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

/** Where a signed-in user lands by role. */
export const homeFor = (role) => (role === 'technician' ? '/tech' : '/app');

export function RequireAuth({ roles, children }) {
  const { user, loading } = useAuth();
  const loc = useLocation();
  if (loading) return <FullPageSpinner />;
  if (!user) return <Navigate to={`/login?next=${encodeURIComponent(loc.pathname + loc.search)}`} replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to={homeFor(user.role)} replace />;
  return children;
}
