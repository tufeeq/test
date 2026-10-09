# دورة · Dawra

**Every service call, from first ring to paid invoice. Built for Saudi maintenance contractors.**

Dawra is an Arabic-first (RTL, bilingual AR/EN), multi-tenant field-service management SaaS for AC/HVAC, cleaning, pest-control, plumbing and electrical contractors with 3–30 technicians.

- **Dispatch board.** Turn calls, WhatsApp messages and online bookings into scheduled jobs in seconds.
- **Technician app (PWA).** Today's route, status updates, before/after photos, customer signature.
- **Maintenance contracts (عقود الصيانة).** Periodic visits schedule themselves.
- **ZATCA-ready invoices.** 15% VAT, TLV QR code, PDF, Moyasar payment links.
- **Customer experience.** Public booking page, live "where's my technician" tracking link, WhatsApp updates, ratings.
- **AI triage.** Reads an Arabic problem description ("المكيف يطلع ماء ويطفي") and suggests priority and services.

| Plan | SAR / month | Technicians |
|---|---|---|
| Starter | 149 | up to 3 |
| Pro | 449 | up to 10 |
| Business | 999 | up to 25 |

Every plan starts with a 14-day free trial.

## Stack

- Node 22 (ESM JavaScript) · Express 4 · PostgreSQL (`pg`, plain SQL migrations)
- React 18 · Vite · Tailwind 3 · React Router 6
- One deployable service: Express serves the API at `/api` and the built SPA.

## Run locally

```bash
service postgresql start          # see docs/DEV.md for first-time DB setup
cp .env.example .env
npm install
npm run seed                      # migrate + demo data (مؤسسة النسيم للتكييف)
npm run build && npm start        # http://localhost:3000
# or, for development: npm run dev  +  npm run dev:web   (http://localhost:5173)
```

Demo login: `demo@dawra.app` / `Demo1234!`. Public booking page: `/b/naseem`.

## Deploy (Railway)

1. Create one service from this repo and add the PostgreSQL plugin.
2. Set these variables: `JWT_SECRET`, `NODE_ENV=production`, `PUBLIC_BASE_URL`, and optionally `SEED_DEMO=true` and the integration keys listed in `.env.example`.
3. `railway.json` builds with `npm ci && npm run build`, starts with `npm start`, and health-checks `/api/health`. Migrations run on boot.

## Docs

- [`docs/SPEC.md`](docs/SPEC.md): product spec, personas, pricing
- [`docs/API.md`](docs/API.md): API contract
- [`docs/OWNERSHIP.md`](docs/OWNERSHIP.md): who owns which files
- [`docs/DESIGN.md`](docs/DESIGN.md): design tokens and UI rules
- [`docs/DEV.md`](docs/DEV.md): local setup, database, demo accounts
