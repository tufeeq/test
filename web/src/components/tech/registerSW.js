// OWNER: B4. Registers /sw.js — production builds only (dev HMR + a caching SW is a bad mix).
// Also captures the install prompt so TechProfile can offer an "Install" button.
let deferredPrompt = null;
const installListeners = new Set();

export function registerSW() {
  if (typeof window === 'undefined') return;
  if (!import.meta.env.PROD) return;
  if (!('serviceWorker' in navigator)) return;
  if (window.__dawraSW) return;
  window.__dawraSW = true;
  const go = () => navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch((e) => console.warn('[sw] register failed', e));
  if (document.readyState === 'complete') go();
  else window.addEventListener('load', go, { once: true });
}

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installListeners.forEach((fn) => fn(true));
  });
}

export const canInstall = () => Boolean(deferredPrompt);
export const onInstallable = (fn) => (installListeners.add(fn), () => installListeners.delete(fn));
export async function promptInstall() {
  if (!deferredPrompt) return false;
  deferredPrompt.prompt();
  const r = await deferredPrompt.userChoice.catch(() => null);
  deferredPrompt = null;
  installListeners.forEach((fn) => fn(false));
  return r?.outcome === 'accepted';
}
