// Renders SPA routes server-side through Vite to catch import/render errors without a browser.
// Usage: node scripts/smoke-render.mjs [/route ...]   (anonymous session; protected routes render the spinner)
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const req = createRequire(path.join(root, 'package.json'));
const { createServer } = await import(path.join(root, 'node_modules/vite/dist/node/index.js'));
const React = req('react');
const { renderToString } = req('react-dom/server');
const origErr = console.error;
console.error = (m, ...a) => (String(m).includes('useLayoutEffect') ? undefined : origErr(m, ...a));
globalThis.localStorage = { getItem: () => null, setItem() {} };
const vite = await createServer({ configFile: path.join(root, 'web/vite.config.js'), server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const { MemoryRouter } = await vite.ssrLoadModule('react-router-dom');
const { I18nProvider } = await vite.ssrLoadModule('/src/i18n/index.jsx');
const { ToastProvider } = await vite.ssrLoadModule('/src/components/ui/Toast.jsx');
const { AuthProvider } = await vite.ssrLoadModule('/src/lib/auth.jsx');
const App = (await vite.ssrLoadModule('/src/App.jsx')).default;
const h = React.createElement;
const routes = process.argv.slice(2).length ? process.argv.slice(2) : ['/', '/pricing', '/login', '/signup', '/b/naseem', '/t/x', '/i/x', '/app', '/tech', '/nope'];
let failed = 0;
for (const url of routes) {
  try {
    const html = renderToString(h(MemoryRouter, { initialEntries: [url] }, h(I18nProvider, null, h(ToastProvider, null, h(AuthProvider, null, h(App))))));
    console.log('OK  ', url.padEnd(14), html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 70));
  } catch (e) { failed++; console.log('FAIL', url, e.message); }
}
await vite.close();
process.exit(failed ? 1 : 0);
