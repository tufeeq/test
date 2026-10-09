# Folder ownership

Five builders work in parallel. **Edit only files you own.** If you need a change in a file someone else owns, add a line under **Requests** at the bottom of this doc (or the Change requests section of `docs/API.md`) and keep going with a local workaround.

| Builder | Owns (create, edit and delete freely) | Must not touch |
|---|---|---|
| **Architect** | `server/index.js`, `server/lib/{db,auth,errors,validate}.js`, `server/db/{migrate,seed,reset}.js`, `server/db/migrations/001_init.sql`, `web/index.html`, `web/vite.config.js`, `web/tailwind.config.js`, `web/postcss.config.js`, `web/src/{main.jsx,App.jsx,index.css}`, `web/src/lib/*`, `web/src/i18n/{index.jsx,ar.json,en.json}`, `web/src/components/ui/**`, `web/src/pages/NotFound.jsx`, `docs/*`, `package.json`, `railway.json`, `scripts/*` | — |
| **B1 Core API** | `server/routes/{auth,companies,users,customers,sites,assets,services,jobs,contracts,dashboard,bookings}.js`. May **append** helpers to `server/lib/{db,validate}.js` without changing existing signatures. | web/** |
| **B2 Billing, ZATCA, payments** | `server/routes/{invoices,billing,webhooks}.js`, `server/lib/{zatca,moyasar,pdf}.js`, `server/assets/fonts/**` | web/** |
| **B3 Owner/dispatcher web app** | `web/src/pages/app/**`, `web/src/components/app/**`, `web/src/i18n/ns/app.{ar,en}.json` | server/**, other pages |
| **B4 Technician PWA and customer pages** | `web/src/pages/tech/**`, `web/src/pages/public/**`, `web/src/components/tech/**`, `web/src/components/public/**`, `server/routes/public.js`, `web/public/manifest.webmanifest`, `web/public/sw.js`, `web/public/icons/**`, `web/src/i18n/ns/{tech,public}.{ar,en}.json` | other server routes |
| **B5 Marketing, AI, notifications** | `web/src/pages/marketing/**` (Landing, Pricing, Login, Signup), `web/src/components/marketing/**`, `server/routes/{ai,messages}.js`, `server/lib/{ai,notify,scheduler}.js`, `web/src/i18n/ns/marketing.{ar,en}.json` | other pages |

## Rules

1. **Migrations.** Never edit `001_init.sql`. Add a new file named `server/db/migrations/0NN_<builder>_<what>.sql`. Reserved prefixes: B1 `010–019`, B2 `020–029`, B3 none (frontend only), B4 `040–049`, B5 `050–059`. Make migrations re-runnable when you can (`IF NOT EXISTS`).
2. **Routes.** Every route file is already mounted in `server/index.js`, as shown in the table below. Need a new router file? Ask the architect.

   | Route file | Mount path |
   |---|---|
   | `auth` | `/api/auth` |
   | `companies` | `/api/companies` |
   | `users` | `/api/users` |
   | `customers` | `/api/customers` |
   | `sites` | `/api/sites` |
   | `assets` | `/api/assets` |
   | `services` | `/api/services` |
   | `jobs` | `/api/jobs` |
   | `contracts` | `/api/contracts` |
   | `dashboard` | `/api/dashboard` |
   | `bookings` | `/api/booking-requests` |
   | `invoices` | `/api/invoices` |
   | `billing` | `/api/billing` |
   | `webhooks` | `/api/webhooks` |
   | `public` | `/api/public` (rate-limited) |
   | `ai` | `/api/ai` |
   | `messages` | `/api/messages` |
3. **Frontend routes** are declared in `web/src/App.jsx`. Page files exist as placeholder stubs at the exact paths. Replace their contents but **keep the file path and default export**. To add a sub-page, import it from your own page or ask the architect for a route.
4. **Pages built before their API exists.** Code against `docs/API.md`. If an endpoint isn't live yet, show a loading or error state; don't mock inside shared files.
5. **Shared UI.** Use `web/src/components/ui` (`import { Button, Card, … } from '../../components/ui/index.js'`). Don't fork it. Missing a component? Build it in your own `components/<area>/` folder and request promotion.
6. **i18n.** Put your strings in your namespace file. Read them with `t('app.jobs.title')`, `t('tech.today.empty')`, `t('public.booking.submit')` or `t('marketing.hero.title')`. Shared keys (`common.*`, `status.*`, `priority.*`, …) are read-only for builders.
7. **RTL.** Use logical utilities only: `ms-* me-* ps-* pe-* start-* end-* text-start text-end border-s border-e rounded-s rounded-e`. Never use `ml- mr- pl- pr- left- right- text-left text-right`. Flip direction icons with `rtl:rotate-180`. Wrap numbers, phones and emails in `dir="ltr"` or the `.ltr-nums` class.
8. **Cross-module calls (server).**
   - B1 and B2 call `notify()` / `notifyJobEvent()` (B5).
   - B4 and B1 call `ai.triage()` (B5).
   - B2 and B4 call `addJobEvent()` (B1, exported from `routes/jobs.js`).
   - B4 calls `createPaymentLink()` (B2).
   - These signatures are frozen in the stub files. Implementations must never throw on missing env keys.
9. **Done means** the work runs against the real local Postgres with seed data (`docs/DEV.md`), `npm run build` passes, and `npm run smoke:web` passes.

## Requests

*(append: date · from → to · file · what)*
- 2026-10-09 · B5 → B4 · `server/routes/public.js` · Booking POST: call `triage({ text: description, category, companyId })` (companyId makes suggestions use the real price list), then `notifyBookingReceived({ companyId, booking })` from `lib/notify.js` instead of hand-building a `booking_received` notify.
- 2026-10-09 · B5 → B1/B2 · `notifyJobEvent` · Event names accepted: `job_scheduled`, `tech_on_the_way`, `job_completed`, `invoice_issued` (+ `job_reminder` used by the scheduler). Call after COMMIT; it never throws and dedupes within 10 min.
- 2026-10-09 · B5 → architect · `web/index.html` · Add static OG/Twitter tags (see B5 report). `.env.example`: `ANTHROPIC_MODEL=claude-haiku-4-5` (code default), add `SCHEDULER_LEAD_DAYS=14`, `WHATSAPP_API_VERSION=v23.0`. `package.json`: `"test": "node --test server/tests/"`.
