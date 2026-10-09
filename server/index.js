// Dawra / دورة — single Express service: API under /api + built SPA from /web/dist.
// Owner: architect. Builders: do NOT edit; ask the architect to mount new routers.
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import { pool } from './lib/db.js';
import { loadUser } from './lib/auth.js';
import { errorHandler, notFound } from './lib/errors.js';
import { migrate } from './db/migrate.js';
import { startScheduler } from './lib/scheduler.js';

import authRoutes from './routes/auth.js';
import companiesRoutes from './routes/companies.js';
import usersRoutes from './routes/users.js';
import customersRoutes from './routes/customers.js';
import sitesRoutes from './routes/sites.js';
import assetsRoutes from './routes/assets.js';
import servicesRoutes from './routes/services.js';
import jobsRoutes from './routes/jobs.js';
import contractsRoutes from './routes/contracts.js';
import dashboardRoutes from './routes/dashboard.js';
import invoicesRoutes from './routes/invoices.js';
import billingRoutes from './routes/billing.js';
import webhooksRoutes from './routes/webhooks.js';
import publicRoutes from './routes/public.js';
import aiRoutes from './routes/ai.js';
import bookingsRoutes from './routes/bookings.js';
import messagesRoutes from './routes/messages.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, '..', 'web', 'dist');
const PORT = Number(process.env.PORT || 3000);

export const app = express();
app.set('trust proxy', 1); // Railway sits behind a proxy

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'default-src': ["'self'"],
        'script-src': ["'self'"],
        'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        'font-src': ["'self'", 'https://fonts.gstatic.com', 'data:'],
        'img-src': ["'self'", 'data:', 'blob:', 'https:'],
        'connect-src': ["'self'", 'https://fonts.googleapis.com', 'https://fonts.gstatic.com'], // sw.js re-fetches fonts
        'frame-src': ["'self'", 'https://*.moyasar.com'],
        'form-action': ["'self'", 'https://*.moyasar.com'],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);
app.use(compression());
app.use(cookieParser());

// ── API ──────────────────────────────────────────────
const api = express.Router();
// CSRF defence in depth (on top of SameSite=Lax): state-changing API calls that carry a body must be JSON.
// Browsers can't send application/json cross-site without a CORS preflight, which we never grant.
// Only the simulated Moyasar checkout page posts a classic HTML form.
const SIM_FORM = /^\/webhooks\/moyasar\/sim\/[^/]+$/;
api.use((req, res, next) => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  const hasBody = Number(req.headers['content-length'] || 0) > 0 || req.headers['transfer-encoding'];
  if (!hasBody || req.is('application/json')) return next();
  if (SIM_FORM.test(req.path) && req.is('application/x-www-form-urlencoded')) return next();
  res.status(415).json({ error: { code: 'unsupported_media_type', message: 'Content-Type must be application/json' } });
});
// Body parsers live inside the API router so parse errors reach the JSON errorHandler (not Express's HTML page).
api.use(express.json({ limit: '8mb' })); // job photos are data URLs (≤1.5MB each, validated per route)
api.use(express.urlencoded({ extended: false, limit: '10kb' }));
api.get('/health', async (_req, res) => {
  let db = false;
  try { await pool.query('SELECT 1'); db = true; } catch { /* db down */ }
  res.json({ ok: true, db, version: process.env.RAILWAY_GIT_COMMIT_SHA?.slice(0, 7) || 'dev' });
});

// Brute-force guard on credential endpoints only (not /auth/me, which the SPA calls on every load).
// Successful logins don't count, so a busy office behind one NAT IP isn't locked out.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, limit: Number(process.env.AUTH_RATE_LIMIT || 20), standardHeaders: true, legacyHeaders: false,
  skipSuccessfulRequests: true,
  handler: (_req, res) => res.status(429).json({ error: { code: 'rate_limited', message: 'Too many attempts, try again later' } }),
});
const publicLimiter = rateLimit({ windowMs: 60 * 1000, limit: 60, standardHeaders: true, legacyHeaders: false });

api.use(loadUser); // attaches req.user when a valid session cookie exists
api.post(['/auth/login', '/auth/signup'], authLimiter);
api.use('/auth', authRoutes);
api.use('/companies', companiesRoutes);
api.use('/users', usersRoutes);
api.use('/customers', customersRoutes);
api.use('/sites', sitesRoutes);
api.use('/assets', assetsRoutes);
api.use('/services', servicesRoutes);
api.use('/jobs', jobsRoutes);
api.use('/contracts', contractsRoutes);
api.use('/dashboard', dashboardRoutes);
api.use('/invoices', invoicesRoutes);
api.use('/billing', billingRoutes);
api.use('/webhooks', webhooksRoutes);
api.use('/public', publicLimiter, publicRoutes);
api.use('/ai', aiRoutes);
api.use('/booking-requests', bookingsRoutes);
api.use('/messages', messagesRoutes);
api.use((req, _res, next) => next(notFound(`No route ${req.method} /api${req.path}`)));
api.use(errorHandler);
app.use('/api', api);

// ── SPA ──────────────────────────────────────────────
if (fs.existsSync(DIST)) {
  app.use(express.static(DIST, { index: false, maxAge: '1h', setHeaders: (res, p) => {
    if (p.includes(`${path.sep}assets${path.sep}`)) res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    if (p.endsWith('sw.js')) res.setHeader('Cache-Control', 'no-cache');
  } }));
  // A missing hashed asset must 404 (not return index.html as JS/CSS, which caches badly after deploys).
  app.get('/assets/*', (_req, res) => res.status(404).type('text').send('Not found'));
  app.get('*', (_req, res) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.sendFile(path.join(DIST, 'index.html'));
  });
} else {
  app.get('/', (_req, res) => res.type('text').send('Dawra API running. Build the web app with `npm run build`, or use `npm run dev:web` on :5173.'));
}

// ── Boot ─────────────────────────────────────────────
async function boot() {
  if (process.env.DATABASE_URL) {
    await migrate();
    if (process.env.SEED_DEMO === 'true') {
      const { seed } = await import('./db/seed.js');
      await seed();
    }
    if (process.env.DISABLE_SCHEDULER !== 'true') startScheduler();
  } else {
    console.warn('[boot] No DATABASE_URL — skipping migrations; API calls needing the DB will fail.');
  }
  app.listen(PORT, () => console.log(`[dawra] listening on :${PORT}`));
}

if (process.env.NODE_ENV !== 'test') {
  boot().catch((e) => { console.error('[boot] failed', e); process.exit(1); });
}
