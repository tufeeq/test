# Local development

## 1. Postgres (real database, required)

This sandbox ships PostgreSQL 16 (`/usr/lib/postgresql/16/bin`). It was set up with:

```bash
service postgresql start
su postgres -c "psql -c \"CREATE USER dawra WITH PASSWORD 'dawra' CREATEDB;\""
su postgres -c "createdb -O dawra dawra"
psql postgres://dawra:dawra@localhost:5432/dawra -c 'select 1'
```

After a container restart, run only `service postgresql start`. The data persists in `/var/lib/postgresql/16/main`.

If Postgres isn't installed at all, run `apt-get install -y postgresql` and repeat the commands above. On macOS, use `brew install postgresql@16 && brew services start postgresql@16`, then the same `CREATE USER` and `createdb` commands without `su postgres`.

Optional: a throwaway DB for tests.

```bash
su postgres -c "createdb -O dawra dawra_test"
```

```
DATABASE_URL=postgres://dawra:dawra@localhost:5432/dawra
```

## 2. App

```bash
cp .env.example .env          # already done in this sandbox; DATABASE_URL as above
npm install
npm run seed                  # runs migrations, then seeds demo company (skips if it exists)
npm run dev                   # API on :3000, auto-restarts on server changes
npm run dev:web               # Vite on :5173, proxies /api → :3000  (open http://localhost:5173)
```

Production-like check:

```bash
npm run build && npm start    # SPA + API on :3000
curl localhost:3000/api/health   # {"ok":true,"db":true,...}
npm run smoke:web             # SSR-renders key routes to catch import/render crashes (no browser needed)
```

## 3. Database scripts

| Command | What it does |
|---|---|
| `npm run migrate` | Applies new `server/db/migrations/*.sql` (also runs automatically on boot) |
| `npm run seed` | Runs migrations, then seeds the demo company. Skips if `naseem` exists. |
| `SEED_FORCE=true npm run seed` | Deletes and re-creates the demo company |
| `npm run db:reset` | **Drops the whole schema**, then migrates and seeds (dev only) |
| `psql $DATABASE_URL` | Opens a SQL shell |

## 4. Demo accounts (password `Demo1234!` for all)

| Role | Email |
|---|---|
| Owner | `demo@dawra.app` |
| Dispatcher | `dispatch@naseem.demo` |
| Technicians | `ahmed@naseem.demo`, `iqbal@naseem.demo`, `yaser@naseem.demo`, `rami@naseem.demo` |

The public booking page is `/b/naseem`. To get tracking links, run:

```sql
select number, public_token from jobs limit 5;
```

Then open `/t/<public_token>`.

## 5. Calling the API with curl

```bash
curl -c /tmp/cj -H 'content-type: application/json' \
  -d '{"email":"demo@dawra.app","password":"Demo1234!"}' localhost:3000/api/auth/login
curl -b /tmp/cj localhost:3000/api/auth/me
```

## 6. Environment variables

See `.env.example`. Every external integration (Anthropic, WhatsApp, Moyasar) **falls back to a simulated or deterministic mode when its key is missing**. The app must stay fully demoable with only `DATABASE_URL` and `JWT_SECRET` set.

## 7. Tests

All suites run against one live server (start it with `MOYASAR_WEBHOOK_SECRET=test_whsec_123` and no `MOYASAR_SECRET_KEY`):

```bash
MOYASAR_WEBHOOK_SECRET=test_whsec_123 PORT=3000 node server/index.js &
BASE_URL=http://localhost:3000 MOYASAR_WEBHOOK_SECRET=test_whsec_123 TEST_DATABASE_URL=$DATABASE_URL npm test
```

`ai_notify` uses `TEST_DATABASE_URL` (default `dawra_test`); the others use `DATABASE_URL` for fixtures. Suites clean up after themselves except for small leftovers (re-seed with `SEED_FORCE=true npm run seed`).

## 8. Notes

- The seed is deterministic: a fixed PRNG with dates relative to "now". Jobs span −14…+14 days around the seed date, so re-seed with `SEED_FORCE=true` if the demo looks stale.
- There's no headless browser in this sandbox: the Playwright CDN is blocked by the proxy. Use `npm run smoke:web` together with curl.
- Railway: add the Postgres plugin. `DATABASE_URL` is injected automatically. Set `JWT_SECRET`, `NODE_ENV=production`, `PUBLIC_BASE_URL`, and optionally `SEED_DEMO=true`.
