// OWNER: B4. Offline write queue for the technician PWA.
//   const r = await sendOrQueue({ key: `status:${id}`, method: 'POST', path: `/jobs/${id}/status`, body, label });
//   r.queued === true → saved locally, will be replayed in order when the connection comes back.
// Writes with the same `key` coalesce (last one wins) — used for checklist/items which are full replacements.
import { useEffect, useState } from 'react';
import { request, ApiError } from '../../lib/api.js';
import { lsGet, lsSet } from './storage.js';

const KEY = 'dawra_tech_queue_v1';
const listeners = new Set();
let flushing = false;
let lastError = null;

const read = () => {
  const q = lsGet(KEY, []);
  return Array.isArray(q) ? q : [];
};
const write = (q) => {
  const ok = lsSet(KEY, q);
  emit();
  return ok;
};
function emit() {
  const s = snapshot();
  listeners.forEach((fn) => fn(s));
}
function snapshot() {
  const q = read();
  return { pending: q.length, items: q, flushing, lastError, online: isOnline() };
}
export const isOnline = () => (typeof navigator === 'undefined' ? true : navigator.onLine !== false);

export function enqueue({ key, method, path, body, label, jobId }) {
  const q = read();
  const item = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, key: key || null, method, path, body, label, jobId, ts: Date.now(), attempts: 0 };
  const idx = key ? q.findIndex((x) => x.key === key) : -1;
  if (idx >= 0) q[idx] = { ...item, id: q[idx].id }; // keep position so order of different writes is preserved
  else q.push(item);
  if (!write(q)) throw new ApiError(0, 'storage_full', 'Could not save offline (storage full)');
  return item;
}

/** Pending writes for one job (to overlay optimistic state). */
export const pendingFor = (jobId) => read().filter((x) => x.jobId === jobId);

const isNetwork = (e) => e instanceof ApiError && e.status === 0;

/** Try now; if offline / network fails (or older writes are still queued) save to the queue instead. */
export async function sendOrQueue(op) {
  if (!isOnline() || read().length) {
    enqueue(op);
    if (isOnline()) flush();
    return { queued: true };
  }
  try {
    const data = await request(op.method, op.path, { body: op.body });
    return { queued: false, data };
  } catch (e) {
    if (isNetwork(e)) {
      enqueue(op);
      return { queued: true };
    }
    throw e;
  }
}

/** Replay queued writes in order. Stops at the first network failure. */
export async function flush() {
  if (flushing || !isOnline()) return snapshot();
  flushing = true;
  emit();
  try {
    for (;;) {
      const q = read();
      if (!q.length) break;
      const item = q[0];
      try {
        await request(item.method, item.path, { body: item.body });
        write(read().filter((x) => x.id !== item.id));
      } catch (e) {
        if (isNetwork(e)) break;
        const retryable = e instanceof ApiError && e.status >= 500 && (item.attempts || 0) < 4;
        if (retryable) {
          write(read().map((x) => (x.id === item.id ? { ...x, attempts: (x.attempts || 0) + 1 } : x)));
          break;
        }
        // 4xx: the server rejected it (e.g. job already moved on). Drop it so the queue isn't stuck; keep a trace.
        // 409 "already in that status" is expected after a double tap — not worth reporting.
        if (!(e instanceof ApiError && e.status === 409)) lastError = { label: item.label, code: e.code, message: e.message, at: Date.now() };
        write(read().filter((x) => x.id !== item.id));
      }
    }
  } finally {
    flushing = false;
    emit();
  }
  return snapshot();
}

export const clearLastError = () => { lastError = null; emit(); };

/** React hook: { pending, flushing, online, lastError }. Also wires online/offline listeners + periodic retry. */
export function useOfflineQueue() {
  const [state, setState] = useState(() => ({ pending: 0, items: [], flushing: false, lastError: null, online: true }));
  useEffect(() => {
    const on = (s) => setState(s);
    listeners.add(on);
    setState(snapshot());
    const sync = () => { emit(); flush(); };
    window.addEventListener('online', sync);
    window.addEventListener('offline', emit);
    const timer = setInterval(() => { if (read().length) flush(); }, 20000);
    flush();
    return () => {
      listeners.delete(on);
      window.removeEventListener('online', sync);
      window.removeEventListener('offline', emit);
      clearInterval(timer);
    };
  }, []);
  return state;
}
