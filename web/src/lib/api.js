// Fetch wrapper. Owner: architect.
//   import { api, ApiError } from '@/lib/api';
//   const jobs = await api.get('/jobs', { status: 'scheduled', limit: 20 });
//   await api.post('/jobs', body); api.patch(`/jobs/${id}`, body); api.del(`/jobs/${id}`)
// Throws ApiError { status, code, message, details } — code matches server error codes and i18n `errors.<code>`.
export class ApiError extends Error {
  constructor(status, code, message, details) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

const listeners = new Set();
/** Subscribe to 401s (AuthProvider uses this to drop the session). Returns unsubscribe fn. */
export const onUnauthorized = (fn) => (listeners.add(fn), () => listeners.delete(fn));

function qs(params) {
  if (!params) return '';
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== null && v !== '') p.set(k, v);
  const s = p.toString();
  return s ? `?${s}` : '';
}

export async function request(method, path, { body, params, signal } = {}) {
  let res;
  try {
    res = await fetch(`/api${path}${qs(params)}`, {
      method,
      credentials: 'include',
      headers: body !== undefined ? { 'Content-Type': 'application/json', Accept: 'application/json' } : { Accept: 'application/json' },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (e) {
    if (e.name === 'AbortError') throw e;
    throw new ApiError(0, 'network', 'Network error');
  }
  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json().catch(() => null) : null;
  if (!res.ok) {
    const err = data?.error || {};
    if (res.status === 401) listeners.forEach((fn) => fn());
    throw new ApiError(res.status, err.code || 'internal', err.message || res.statusText, err.details);
  }
  return data;
}

export const api = {
  get: (path, params, opts) => request('GET', path, { params, ...opts }),
  post: (path, body, opts) => request('POST', path, { body: body ?? {}, ...opts }),
  patch: (path, body, opts) => request('PATCH', path, { body: body ?? {}, ...opts }),
  put: (path, body, opts) => request('PUT', path, { body: body ?? {}, ...opts }),
  del: (path, opts) => request('DELETE', path, opts),
};
