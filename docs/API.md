# Dawra API contract (v1)

This is the single source of truth between the frontend builders (B3, B4, B5) and the backend builders (B1, B2, B4, B5). If you need a change, add it under **Change requests** at the bottom and tell the architect. Don't silently change a shape.

## Conventions

- Base path is `/api`. All bodies are JSON (`Content-Type: application/json`).
- **Auth.** The session is a JWT in the httpOnly cookie `dawra_session`, set by `/api/auth/login` and `/api/auth/signup`. `loadUser` runs on every `/api` request and sets `req.user = { id, company_id, role, name, email, locale }` when the cookie is valid.
  - `requireAuth`: returns 401 `unauthorized` if nobody is signed in.
  - `requireRole('owner','dispatcher')`: returns 401 if not signed in, 403 `forbidden` if the role doesn't match.
  - Import both from `server/lib/auth.js`.
- **Tenancy (non-negotiable).** Every SQL statement on a tenant table has `WHERE company_id = $n` (or inserts `req.user.company_id`). Never read `company_id` from the request body. A cross-tenant id returns **404**, not 403.
- **Errors** look like `{ "error": { "code": "...", "message": "...", "details"?: [{ "path", "message" }] } }`.
  - Codes: `bad_request` 400, `bad_reference` 400, `unauthorized` 401, `plan_limit` 402, `forbidden` 403, `not_found` 404, `conflict` 409, `too_large` 413, `internal` 500.
  - Throw with the helpers in `server/lib/errors.js` (`badRequest`, `notFound`, …) and wrap handlers in `ah()`.
- **Validation** uses zod via `validate({ body, query, params })` from `server/lib/validate.js`. Parsed query params land on `req.validQuery`.
- **Lists:**
  - Query params: `?q=&limit=&offset=` (default limit 50, max 200), plus endpoint-specific filters. Use `paging(req.query)`.
  - Response: `{ "items": [...], "total": 123, "limit": 50, "offset": 0 }`.
- **Single resources** come back as the object itself, not wrapped. `DELETE` returns `{ "ok": true }`.
- **Money:**
  - JSON numbers with 2 decimals (`150`, `172.5`). The `pg` driver already parses `numeric` to Number.
  - Currency is always SAR. VAT is 15%.
  - Prices in `services`, `job_items` and `invoice_lines.unit_price` **exclude VAT**.
- **Dates:**
  - `timestamptz` values are ISO 8601 strings (`2026-10-09T06:00:00.000Z`).
  - `date` columns are `YYYY-MM-DD` strings.
  - The business timezone is `Asia/Riyadh` (UTC+3). For "today" in SQL use `(now() AT TIME ZONE 'Asia/Riyadh')::date`.
- **Phones** are normalised with `normalizePhone()` to `9665XXXXXXXX`.
- **Ids** are UUIDs. Job and invoice **numbers** are per-company integers: allocate them with `nextNumber(client, 'jobs'|'invoices', companyId)` inside `tx()`.
- **Audit.** Call `audit(req.user, 'action', 'entity', id)` on create, update and delete of business records.
- **Job timeline.** Any change to a job inserts a `job_events` row (`type`: `created`, `status_changed`, `assigned`, `rescheduled`, `note`, `photo`, `signature`, `rating`, `invoice`, `message`). B1 exports `addJobEvent()` from `server/routes/jobs.js` for others to use; see below.
- **Notifications.** Call `notify` / `notifyJobEvent` from `server/lib/notify.js` (owned by B5) wherever an SMS or WhatsApp message should go out. Never call WhatsApp directly.

### Shared object shapes

```jsonc
// User (never includes password_hash)
{ "id", "name", "email", "phone", "role": "owner|dispatcher|technician", "locale": "ar|en", "skills": ["split_ac"], "color": "#2563EB", "active": true, "created_at" }

// Customer
{ "id", "name", "phone", "email", "type": "individual|business", "vat_number", "notes", "created_at",
  "sites_count"?: 1, "jobs_count"?: 3, "last_job_at"?: "…", "balance_due"?: 345.00 }      // list extras

// Site
{ "id", "customer_id", "label", "city", "district", "address", "lat", "lng" }

// Asset
{ "id", "site_id", "kind": "split_ac|central_ac|window_ac|cold_room|other", "brand", "capacity_btu", "install_date": "YYYY-MM-DD", "notes" }

// Service (price list)
{ "id", "name", "name_ar", "category", "price": 150, "duration_min": 45, "taxable": true, "active": true }

// JobSummary (lists, schedule)
{ "id", "number": 17, "title", "category", "priority", "status", "source",
  "scheduled_start", "scheduled_end", "completed_at",
  "customer": { "id", "name", "phone" },
  "site": { "id", "label", "district", "city", "lat", "lng" } | null,
  "technician": { "id", "name", "color" } | null,
  "total": 172.5 }                       // sum(job_items qty*unit_price) excl. VAT

// Job (detail) = JobSummary + 
{ "description", "notes", "asset": Asset|null, "contract_id", "checklist": [{ "label", "done": false }],
  "items": [{ "id", "service_id", "description", "qty", "unit_price" }],
  "photos": [{ "id", "kind": "before|after", "data_url", "created_at" }],
  "events": [{ "id", "type", "message", "actor": { "id", "name" } | null, "created_at" }],
  "customer_signature": "data:image/png;base64,…" | null,
  "rating": 5|null, "rating_comment",
  "public_token", "tracking_url": "https://…/t/<public_token>",
  "invoice": { "id", "number", "status", "total" } | null }

// Contract
{ "id", "customer": { "id", "name" }, "site": Site|null, "title", "start_date", "end_date", "visits_per_year", "price",
  "status": "active|expired|cancelled", "next_visit_date", "notes", "visits_done"?: 2, "created_at" }

// Invoice
{ "id", "number": 1001, "kind": "simplified|standard", "issue_date", "status": "unpaid|paid|void",
  "customer": { "id", "name", "phone", "vat_number" }, "job_id", "contract_id",
  "subtotal": 150, "vat_amount": 22.5, "total": 172.5, "paid_at", "payment_method",
  "qr_tlv": "base64", "uuid", "public_token", "public_url": "https://…/i/<public_token>", "payment_link_url", "notes",
  "lines": [{ "id", "description", "qty", "unit_price", "vat_rate": 0.15, "line_total" }] }   // lines in detail only
```

---

## 1. Auth (B1, already implemented by the architect)

| Method | Path | Auth | Body → Response |
|---|---|---|---|
| POST | `/auth/signup` | – | `{ company_name, name, email, password(≥8), phone?, city?, locale? }` → **201** `Session`. Creates the company (slug from the name; random suffix if taken or non-Latin) and the owner, and sets the cookie. Returns 409 if the email is taken. |
| POST | `/auth/login` | – | `{ email, password }` → `Session` and sets the cookie. Returns 401 `unauthorized` on bad credentials. |
| POST | `/auth/logout` | – | → `{ ok: true }` and clears the cookie. |
| GET | `/auth/me` | auth | → `Session` |
| PATCH | `/auth/me` | auth | `{ name?, phone?, locale?, password?, current_password? }` → `Session`. Changing `password` requires a correct `current_password` (400 otherwise). |

`Session = { user: { id, name, email, phone, role, locale, color }, company: { id, slug, name, name_ar, plan, subscription_status, trial_ends_at, logo_url, vat_number } }`

## 2. Company (B1)

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/companies/me` | auth | Full company row plus `{ booking_url: "/b/<slug>", limits: { technicians: 10 }, usage: { technicians: 4, users: 6 } }` |
| PATCH | `/companies/me` | owner | `{ name?, name_ar?, vat_number?(15 digits, starts and ends with 3), cr_number?, phone?, city?, address?, logo_url?(data URL ≤300KB), slug?(a-z0-9-, 3–40 chars, unique, not reserved) }` → same shape as GET. `cr_number` must be 10 digits. Empty string clears a field. Logo > 300 KB → 413 `too_large`; slug taken → 409. |

## 3. Users / team (B1)

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/users` | owner, dispatcher | `?role=technician&active=true|false|all&q=` → `{ items: User[] }` (no paging) |
| GET | `/users/:id` | owner, dispatcher | User |
| POST | `/users` | owner | `{ name, email, phone?, role, password?, locale?, skills?, color? }` → 201 User. **Invite flow:** if `password` is omitted a temporary one is generated and returned once as `temp_password`. `color` defaults to a palette colour. Returns **402 `plan_limit`** (with `details[0].code = 'PLAN_LIMIT'`, `limit`, `current`, `plan`) if adding an active technician exceeds `PLAN_LIMITS[plan].technicians` (`server/lib/auth.js`: starter 3, pro 10, business 25, trial 10). 409 if the email exists. |
| PATCH | `/users/:id` | owner | `{ name?, email?, phone?, role?, locale?, skills?, color?, active?, password? }` → User. The owner can't demote or deactivate themselves (400); the company always keeps one active owner (409). Re-activating or promoting to technician is plan-limited (402). |
| DELETE | `/users/:id` | owner | Soft delete (`active=false`) → `{ ok: true }` |

## 4. Customers, sites, assets (B1)

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/customers` | owner, dispatcher | `?q=` matches name or phone (ILIKE) `&type=` → paged `Customer` with list extras |
| POST | `/customers` | owner, dispatcher | `{ name, phone, email?, type?, vat_number?, notes?, site?: { label?, city?, district?, address?, lat?, lng? } }` → 201 `Customer & { sites: [Site] }`. Creates the first site in one transaction when `site` is given. |
| GET | `/customers/:id` | owner, dispatcher | `Customer & { jobs_count, balance_due, lifetime_paid, sites: [Site & { assets: Asset[] }], jobs: JobSummary[] (last 20), invoices: Invoice[] (no lines, last 20), contracts: Contract[] }` |
| PATCH | `/customers/:id` | owner, dispatcher | Partial customer fields → Customer |
| DELETE | `/customers/:id` | owner | Returns 409 `conflict` if the customer has jobs or invoices. |
| GET | `/sites?customer_id=` | owner, dispatcher | `{ items: Site[] }` |
| POST | `/sites` | owner, dispatcher | `{ customer_id, label?, city?, district?, address?, lat?, lng? }` → 201 Site |
| PATCH / DELETE | `/sites/:id` | owner, dispatcher | |
| GET | `/sites/:id` | owner, dispatcher | `Site & { assets: Asset[] }` |
| GET | `/assets?site_id=` | auth | `{ items: Asset[] }`. Technicians only get assets of sites that have a job assigned to them. |
| POST | `/assets` | auth | `{ site_id, kind, brand?, capacity_btu?, install_date?, notes? }` → 201 Asset. Technicians may add assets on site. |
| PATCH / DELETE | `/assets/:id` | owner, dispatcher | |

## 5. Services / price list (B1)

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/services` | auth | `?active=true&category=&q=` → `{ items: Service[] }` (no paging, ordered by category, name) |
| POST | `/services` | owner, dispatcher | `{ name, name_ar?, category?, price, duration_min?, taxable? }` → 201 |
| PATCH | `/services/:id` | owner, dispatcher | partial |
| DELETE | `/services/:id` | owner | Soft delete (`active=false`) |

## 6. Jobs (B1, the core)

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/jobs` | auth | Filters: `?status=scheduled,in_progress` (CSV) `&technician_id=` (or `me`) `&customer_id=&from=ISO&to=ISO` (on `scheduled_start`) `&unassigned=true|false&contract_id=&site_id=&priority=&source=&q=` (number, title, customer name or phone). Technicians **only ever see their own jobs**: the server forces `technician_id = req.user.id`. Sort: `scheduled_start ASC NULLS LAST` when `from` is given, otherwise `created_at DESC`. → paged `JobSummary` |
| POST | `/jobs` | owner, dispatcher | `{ customer_id, site_id?, asset_id?, contract_id?, title, description?, category?, priority?, source?, scheduled_start?, scheduled_end?, technician_id?, items?: [{ service_id?, description, qty, unit_price }], checklist?, notes? }` → 201 Job. Status is `scheduled` if a tech and start time are set, otherwise `new`. Default `scheduled_end` = start + sum(duration_min), or 60 minutes. Logs a `created` event. Calls `notifyJobEvent(id,'job_scheduled')` when scheduled. `items[].description`/`unit_price` default from the service when `service_id` is given. All referenced ids must belong to the company (else 400 `bad_reference`). Response also carries `warnings` (see reschedule). |
| GET | `/jobs/:id` | auth | Job (detail). A technician gets 404 for jobs not assigned to them. Detail also includes `on_the_way_at`, `started_at`, `cancelled_at` (migration 010). |
| GET | `/jobs/:id/events` | auth | `{ items: Event[] }` (timeline only) |
| PATCH | `/jobs/:id` | owner, dispatcher | Any POST field. Changing `technician_id` adds an `assigned` event. Changing the time adds `rescheduled`. Sets `new` → `scheduled` automatically when both are present (and `scheduled` → `new` if either is cleared). Notifies `job_scheduled` when a job becomes scheduled or its tech/time changes while scheduled. → `Job & { warnings }`. 409 for completed/cancelled jobs when touching tech/time, and when editing `items` on a job with a non-void invoice. |
| PATCH | `/jobs/:id/schedule` | owner, dispatcher | Dispatch-board drag/drop: `{ technician_id?, scheduled_start?, scheduled_end? }` → `Job & { warnings: [{ code: 'technician_conflict', message, job: { id, number, title, status, scheduled_start, scheduled_end } }] }`. Overlapping open jobs of the same technician are returned as warnings (the move still succeeds). If only `scheduled_start` is given, the previous duration is kept. |
| POST | `/jobs/:id/assign` | owner, dispatcher | `{ technician_id | null }` → `Job & { warnings }` |
| POST | `/jobs/:id/status` | auth | `{ status, note? }`. Allowed transitions: `new→scheduled|cancelled`, `scheduled→on_the_way|in_progress|cancelled|new`, `on_the_way→in_progress|scheduled`, `in_progress→completed`, `completed→in_progress` (owner/dispatcher only), `*→cancelled` (owner/dispatcher). Technicians can move only their own jobs and only along `scheduled→on_the_way→in_progress→completed`. `completed` sets `completed_at` (cleared again on `completed→in_progress`). `on_the_way`/`in_progress`/`cancelled` set `on_the_way_at`/`started_at`/`cancelled_at`. Also allowed for owner/dispatcher: `cancelled→new`. `→scheduled` requires a tech and start time. Cancelling a job with a non-void invoice → 409. Invalid transition → **409 `invalid_transition`**; a technician moving backwards or cancelling → 403. Notifies on `scheduled` (`job_scheduled`), `on_the_way` (`tech_on_the_way`) and `completed` (`job_completed`). No invoice is auto-created on completion (B2's `POST /invoices { job_id }`). → Job |
| PUT | `/jobs/:id/items` | auth | `{ items: [{ service_id?, description, qty, unit_price }] }` replaces all items → `{ items, total }`. Technicians may edit only while the job is `in_progress` (409 otherwise). 409 if the job has a non-void invoice. |
| PATCH | `/jobs/:id/checklist` | auth | `{ checklist: [{ label, done }] }` → `{ checklist }` |
| POST | `/jobs/:id/photos` | auth | `{ kind: 'before'|'after', data_url }`. Data URL must be ≤ **1.5 MB** (413 `too_large`) and image/jpeg, png or webp (400 otherwise); the client compresses to ≤1280px JPEG q≈0.7. Max 30 photos per job. → 201 photo. Adds a `photo` event. |
| DELETE | `/jobs/:id/photos/:photoId` | auth | |
| POST | `/jobs/:id/signature` | auth | `{ data_url }` (PNG/JPEG/WebP/SVG data URL, ≤ 500 KB) → `{ ok: true }`. Adds a `signature` event. |
| POST | `/jobs/:id/notes` | auth | `{ message }` → 201 event (type `note`) |
| DELETE | `/jobs/:id` | owner | Only allowed when status is `new` or `cancelled` and there is no invoice. |

**Helper export (B1)** in `server/routes/jobs.js`:

```js
export async function addJobEvent(clientOrNull, { jobId, companyId, type, message, actorUserId })
// snake_case keys (job_id, company_id, actor_user_id) are accepted too. Inserts only if the job belongs to companyId.
// Returns the event row or null. With a client it throws on DB errors (so your tx rolls back); with null it never throws.
```

Other exports from `server/routes/jobs.js` (stable): `getJobDetail(clientOrNull, companyId, jobId)` → Job|null, `listJobSummaries(clientOrNull, whereSql, params, tailSql)`, `insertJob(client, companyId, actorUserId, body)` → `{ id, number, status, warnings }` (call inside `tx()`), `findTechConflicts(...)`, `notifyJobSafe(jobId, event)`. From `server/routes/contracts.js`: `computeVisitDates({ start_date, end_date, visits_per_year, next_visit_date?, count?, until? })` (pure) and `generateContractVisits(client, companyId, actorUserId, contractId, opts)`. From `server/routes/users.js`: `assertTechnicianCapacity(client, companyId)`.

B2 uses it when an invoice is issued, B4 for portal ratings, B5 for messages.

## 7. Schedule and dashboard (B1)

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/dashboard/schedule` | owner, dispatcher | `?date=YYYY-MM-DD` (Riyadh day, default today; `&days=1..31`, `&technician_id=`) → `{ date, days, from, to, technicians: [{ id, name, color, skills, phone }], jobs: JobSummary[] (in range, not cancelled), unassigned: JobSummary[] (status new, urgent first) }` |
| GET | `/dashboard/summary` | owner, dispatcher | → `{ today: { total, completed, in_progress, unassigned }, revenue: { month: 12450.5, last_month: 11020, unpaid_total: 3450, unpaid_count: 4 }, jobs_by_status: { new: 3, … }, upcoming_contract_visits: [{ contract_id, customer_name, next_visit_date }], pending_requests: 2, rating_avg: 4.6, technicians: [{ id, name, color, jobs_today, completed_today, status: 'idle|on_the_way|in_progress' }] }`. Extras: `today.{on_the_way,scheduled}`, `revenue.invoiced_month`, `completed_this_week`, `rating_count`, `first_time_fix: { rate (%), completed, fixed_first_time }` (completed in last 90 days with no follow-up non-contract job for the same customer+site within 14 days), `top_technicians: [{ id, name, color, completed_jobs, revenue, rating_avg }]` (since start of last month, top 5), `trend: [{ date, scheduled, completed }]` (14 days ending today). Upcoming visits = next 30 days (`{ contract_id, title, customer_id, customer_name, next_visit_date }`). Revenue = **paid** invoices by `paid_at` month (Riyadh). |

## 8. Contracts (B1)

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/contracts` | owner, dispatcher | `?status=&customer_id=&due_within_days=&q=` → paged Contract (each with `visits_done`, `visits_open`, `customer_id`, `site_id`) |
| POST | `/contracts` | owner, dispatcher | `{ customer_id, site_id?, title, start_date, end_date, visits_per_year, price, next_visit_date?, notes? }` → 201. `next_visit_date` defaults to `start_date`. |
| GET | `/contracts/:id` | owner, dispatcher | `Contract & { jobs: JobSummary[], invoices: Invoice[] }` |
| PATCH | `/contracts/:id` | owner, dispatcher | partial, including `status` |
| DELETE | `/contracts/:id` | owner | Sets status to `cancelled`. |
| POST | `/contracts/:id/generate-visits` | owner, dispatcher | `{ technician_id?, count?, until?: YYYY-MM-DD, time?: 'HH:MM' (Riyadh, default 09:00), duration_min? (60), title? }` → 201 `{ created: n, skipped: [dates], next_visit_date, jobs: JobSummary[], warnings }`. Creates one job per visit, spread every `365/visits_per_year` days from `next_visit_date` until `end_date` (or `until`/`count`), `source='contract'`, status `scheduled` if a tech is given else `new`. Dates that already have a non-cancelled job for the contract are skipped (idempotent). Advances `next_visit_date` past the last generated visit. 409 if the contract isn't active. |

The contract visit auto-scheduler is B5 (`server/lib/scheduler.js`, see § 13). It creates `jobs` with `source='contract'` and `status='new'` when `next_visit_date <= today + 14` (env `SCHEDULER_LEAD_DAYS`), then advances `next_visit_date` by `365 / visits_per_year` days. Idempotent: skips while an open job exists for that contract.

## 9. Booking requests (B1 for the app side, B4 for the public side)

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/booking-requests` | owner, dispatcher | `?status=pending` → paged `{ id, name, phone, city, district, category, description, preferred_date, ai_triage, status, job_id, created_at }` |
| POST | `/booking-requests/:id/convert` | owner, dispatcher | `{ technician_id?, scheduled_start?, title?, items? }` + optional `scheduled_end?, description?, priority?, category?, customer_id?, site_id?` → 201 `Job & { warnings }`. Finds or creates the customer by normalised phone (or uses `customer_id`), reuses/creates a site from city and district, creates the job with `source='portal'` (title/priority from `ai_triage` when not given; items from `ai_triage.suggested_services` matched to the price list when `items` is omitted), and marks the request `converted` with `job_id`. 409 if not pending. |
| GET | `/booking-requests/:id` | owner, dispatcher | single request |
| POST | `/booking-requests/:id/reject` | owner, dispatcher | → `{ ok: true }`. 409 if not pending. `GET /booking-requests?status=all&q=` also supported. |

## 10. Invoices (B2)

**Lifecycle.** `draft` (editable, no number) → issue → `unpaid` → `paid`. Issued documents are **immutable**. Corrections use a credit note (`kind: 'credit_note'`, `status: 'issued'`, negative totals, `original_invoice_id`). Voiding an unpaid invoice issues a full credit note and sets the original to `void`. Paid invoices can't be voided; refund them with a credit note.

**Numbering.** Gapless per company: `max(number, 1000) + 1`, allocated at issue time under a company row lock (`SELECT … FOR NO KEY UPDATE`). Drafts and failed issues never use up a number. Invoices and credit notes share one sequence.

**Totals.** Integer-halala arithmetic. `line_total = round2(qty × unit_price)` and the per-line `vat_amount = round2(line_total × rate)`. Document VAT is `round2(Σ taxable × rate)` per rate (ZATCA BR-CO-17), and `total = subtotal + vat_amount`. `vat_rate` ∈ {0.15, 0} (services with `taxable=false` get 0).

**Kinds.** `simplified` (B2C) and `standard` (B2B). `standard` requires a valid buyer VAT number (15 digits, starting and ending with 3) and a buyer address. Without them, issuing returns 400. Issuing any tax document requires the company's VAT number. **Seller and buyer snapshots** are frozen on the invoice at issue time.

Invoice shape additions (on top of the shared shape): `issued_at, original_invoice_id, credit_reason, payment_ref, voided_at, hash, previous_hash`. Detail adds `lines[].vat_amount, seller, buyer: { name, phone, email, vat_number, address, city }, company (= seller), credit_notes: [{ id, number, total, issue_date, credit_reason }], credited_total, original_invoice`.

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/invoices` | owner, dispatcher | `?status=` (CSV: draft,unpaid,paid,void,issued) `&kind=&customer_id=&job_id=&contract_id=&from=&to=` (YYYY-MM-DD, Riyadh, on issue_date) `&q=` (number, customer name or phone) → paged Invoice (no lines) + `totals: { unpaid, paid, unpaid_count }` |
| POST | `/invoices` | owner, dispatcher | **(a)** `{ job_id }` takes the lines from job_items (409 if the job already has a non-void invoice; 400 if it has no items). **(b)** `{ contract_id }` makes one line at the contract price. **(c)** `{ customer_id, lines: [{ description, qty, unit_price, vat_rate?: 0.15\|0 }] }`. Optional `kind?, notes?, draft?: true`. `kind` defaults to `standard` when the customer has a VAT number. By default the invoice is **issued** immediately (number, QR, hash). With `job_id` it adds an `invoice` job event and calls `notifyJobEvent(job_id,'invoice_issued')`. → 201 Invoice (detail) |
| GET | `/invoices/:id` | owner, dispatcher | Invoice detail |
| PATCH | `/invoices/:id` | owner, dispatcher | Drafts only: `{ lines?, kind?, notes? }`. Returns 409 once issued. |
| DELETE | `/invoices/:id` | owner, dispatcher | Drafts only → `{ ok: true }` |
| POST | `/invoices/:id/issue` | owner, dispatcher | Issues a draft → Invoice |
| POST | `/invoices/:id/pay` | owner, dispatcher | `{ payment_method: 'cash'\|'mada'\|'card'\|'transfer'\|'online', paid_at?: ISO, reference? }` → Invoice. Returns 409 unless the invoice is `unpaid`. |
| POST | `/invoices/:id/void` | **owner** | `{ reason? }` → Invoice (`void`) + `credit_note_id`. Returns 409 if paid, draft or already void. |
| POST | `/invoices/:id/credit-note` | **owner** | `{ reason, lines?: [{ description, qty, unit_price }] }` (positive amounts to credit; defaults to all lines). Returns 400 if the cumulative credit exceeds the invoice total. → 201 credit note |
| POST | `/invoices/:id/payment-link` | owner, dispatcher | → `{ url, simulated, ref }`. Moyasar hosted invoice, or the local simulation page. Stores `payment_link_url`. Returns 409 unless `unpaid`. |
| POST | `/invoices/:id/send` | owner, dispatcher | `{ channel?: 'whatsapp'\|'sms'\|'email', to? }`. Sends a bilingual message with the public link (and payment link if one exists) via `notify()` → `{ ok, message }` |
| GET | `/invoices/:id/pdf` | owner, dispatcher | Bilingual A4 PDF (`?download=1` for attachment) |
| GET | `/invoices/public/:token/pdf` | **none** | Same PDF by `public_token` (never for drafts) |
| GET | `/invoices/:id/qr.png` | owner, dispatcher | PNG of `qr_tlv` (`?size=120..1024`) |
| GET | `/invoices/:id/xml` | owner, dispatcher | UBL 2.1 XML (ZATCA profile, **unsigned**). See *ZATCA Phase-2 readiness*. |
| GET | `/invoices/reports/vat` | owner, dispatcher | `?from=YYYY-MM-DD&to=YYYY-MM-DD` (defaults: Jan 1 → today, Riyadh) `&format=csv` → `{ from, to, totals: { invoices, credit_notes, taxable_sales, standard_rated, zero_rated, vat_collected, total, credited }, by_month: [{ month: 'YYYY-MM', … }] }`. Credit notes are included as negatives, so the figures are net values for the VAT return. CSV is UTF-8 with BOM and has a TOTAL row. |

**Helpers for other builders** (`server/lib/invoices.js`, also re-exported from `server/routes/invoices.js`):

```js
getPublicInvoice(token) → Promise<PublicInvoice | null>     // B4: GET /api/public/invoices/:token
// PublicInvoice = { number, kind, status, issue_date, subtotal, vat_amount, total, paid_at, payment_method,
//   qr_tlv, uuid, public_token, public_url, payment_link_url, pdf_url, can_pay, notes, credit_reason,
//   original_invoice: { number } | null, seller (= company), customer: { name, vat_number },
//   buyer: { name, vat_number, address, city }, lines: [{ description, qty, unit_price, vat_rate, vat_amount, line_total }] }
//   No internal ids. null for unknown tokens and drafts.
createPublicPaymentLink(token) → Promise<{ id, ref, url, simulated } | null>   // B4: POST /api/public/invoices/:token/pay
//   Throws HttpError 409 when the invoice isn't unpaid. Tracks the link so paying it marks the invoice paid.
```

`moyasar.createPaymentLink({ amount, description, callbackUrl, metadata })` keeps its frozen signature. When `metadata` has `{ invoice_id, company_id }`, it delegates to the tracked flow above and returns `{ id, url, simulated }`. It never throws: on error it returns `{ url: null, error }`.

### ZATCA Phase-1 QR

`qr_tlv` = base64 of TLV. Tags: `1` seller name (Arabic name if set), `2` VAT number, `3` timestamp (ISO 8601 UTC, seconds), `4` total incl. VAT (`"115.00"`), `5` VAT amount. Each field is one tag byte, one byte holding the **UTF-8 byte length**, then the UTF-8 bytes. Credit notes encode absolute amounts. Use `decodeQrTlv()` in `server/lib/zatca.js` to inspect a value.

### ZATCA Phase-2 readiness (`zatca_phase2_ready`)

Phase 2 (Fatoora integration: reporting for simplified invoices, clearance for standard ones) is out of MVP scope. The data model is ready for it:

- **UUID** per document (`invoices.uuid`). **ICV** is the invoice `number` (gapless per company, credit notes included).
- **Hash chain.** `hash = base64(SHA-256(canonicalJson(hashPayload(invoice)) + previous_hash))`, where `previous_hash` is the hash of the company's previous issued document. The first document uses ZATCA's initial PIH, `base64(hex(sha256("0")))`. Seeded legacy invoices have no hash, so the chain restarts from the initial PIH. *Note:* Phase-2 PIH must be the hash of the **signed UBL XML**, not of our JSON. At integration time, switch `invoiceHash` to hash the canonicalised XML; the column and chain logic stay the same.
- **Immutable snapshots** of seller and buyer (`invoices.seller`, `invoices.buyer`) taken at issue time.
- **Credit notes** reference their original (`original_invoice_id` → UBL `BillingReference`, type code 381; invoices use 388; subtype `0200000` simplified / `0100000` standard).
- **`buildUblXml(invoice)`** in `server/lib/zatca.js` emits UBL 2.1 with ICV, PIH, QR, tax totals, per-line tax and KSA-local issue date/time. Still to do for compliance: CSID onboarding (CSR → compliance CSID → production CSID), XAdES signing in `<ext:UBLExtensions>`, `cac:Signature`, the Phase-2 QR tags 6–9 (XML hash, ECDSA signature, public key, stamp signature), and the reporting/clearance API calls with retry.

## 11. SaaS billing (B2)

Plans (SAR, VAT-exclusive): starter 149 (≤3 techs), pro 449 (≤10), business 999 (≤25). Yearly = 10 × monthly (2 months free). Checkout charges price + 15% VAT.

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/billing` | owner | `{ plan, subscription_status, trial_ends_at, trial_days_left, current_period_end, billing_cycle, read_only, limits: { technicians }, usage: { technicians, invoices_this_month, jobs_this_month }, plans: [{ id, name, name_ar, technicians, price, monthly, yearly, currency, vat_exclusive }], payments: [{ id, plan, cycle, amount, vat_amount, total, provider, status, paid_at, period_end, created_at }], simulated }`. The read lazily flips an elapsed trial to `expired` (and an active subscription more than 3 days past period end to `past_due`). |
| POST | `/billing/checkout` | owner | `{ plan: 'starter'\|'pro'\|'business', cycle?: 'monthly'\|'yearly' }` → 201 `{ url, payment_id, simulated, plan, cycle, amount, vat_amount, total, currency }`. Redirect the browser to `url`. Moyasar, or the simulation page when no key is set, sends the user back to `/app/settings/billing?paid=1`. **Nothing is activated until the payment is paid.** Returns 402 if active technicians exceed the target plan. |

On payment: `subscriptions_payments.status='paid'`, `companies.plan`, `subscription_status='active'`, `billing_cycle`, and `current_period_end = max(now, current_period_end) + 1 month/year`.

**`checkSubscription`** (exported from `server/routes/billing.js`) is Express middleware. It is **not mounted**; the architect decides where to mount it. For an expired trial or cancelled subscription it returns 402 `plan_limit` (details `subscription_expired`) on non-GET requests. Auth, billing, webhooks and public routes always pass. It also exports `subscriptionState(companyId)`.

### Webhooks and payment simulation

| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | `/webhooks/moyasar` | `secret_token` in body | Verifies `secret_token` against `MOYASAR_WEBHOOK_SECRET` with a timing-safe compare (401 otherwise; with no secret configured, every call is rejected). Handles `payment_paid` and `payment_failed` (plus voided, expired and canceled). Finds the link by `data.metadata.dawra_ref`, falling back to `data.invoice_id`. When a key is configured, it re-fetches the payment from Moyasar. Returns 422 if the amount doesn't match. Settles **either** a customer invoice (`payment_method` = `mada` or `online`) **or** a subscription. Idempotent. |
| GET | `/webhooks/moyasar/sim/:ref` | none | **Only when `MOYASAR_SECRET_KEY` is absent.** Bilingual simulated checkout page with Pay/Cancel buttons. |
| POST | `/webhooks/moyasar/sim/:ref` | none | Form `action=pay\|cancel` → 303 redirect to the success or back URL (JSON response if `Accept: application/json`). |

All hosted payments are tracked in `payment_links` (`ref`, `purpose` invoice|subscription, `amount_halalas`, `provider` moyasar|simulation, `status`). Moyasar invoices are created with `metadata: { dawra_ref, purpose, company_id, invoice_id | subscription_payment_id }`. Set `PUBLIC_BASE_URL` in production so callback and redirect URLs are absolute. In the Moyasar dashboard, point the webhook at `<PUBLIC_BASE_URL>/api/webhooks/moyasar` with the same secret token.

## 12. Public, no auth (B4) — rate-limited 60/min/IP

Implemented in `server/routes/public.js`. Never exposes internal ids (job, company, customer, invoice UUIDs), customer phone/name/address on tracking, internal notes or other customers' data. Tokens must match `^[a-f0-9]{16,64}$` (else **400**); unknown tokens/slugs are **404**. Extra limiters: bookings **10 per 15 min per IP+slug** (`BOOKING_RATE_LIMIT`), triage preview **12/min/IP** (`TRIAGE_RATE_LIMIT`); both answer **429** `{ error: { code: 'rate_limited' } }`.

| Method | Path | Notes |
|---|---|---|
| GET | `/public/companies/:slug` | → `{ slug, name, name_ar, phone, city, logo_url, categories: ['ac',…], services: [{ name, name_ar, price, category, duration_min }] }` (active services only). `categories` = `companies.booking_categories` if set, else derived from the price list (AC-type categories such as `repair`/`installation` map to `ac`). `Cache-Control: public, max-age=60`. |
| POST | `/public/companies/:slug/triage` | Live preview while the customer types (nothing stored). `{ text(8..2000), category? }` → `{ category, priority, title, suggested_services, duration_min, summary_ar }`. Calls `ai.triage()` with a 6 s timeout; falls back to a neutral result, never 500s on AI failure. |
| POST | `/public/companies/:slug/bookings` | `{ name(2..120), phone, description(5..2000), category?: ac\|cleaning\|pest\|plumbing\|electrical\|other, city?, district?, preferred_date?: YYYY-MM-DD (today…+90 days, Riyadh), preferred_window?: 'morning'\|'afternoon'\|'evening' (≤40 chars), website?: honeypot }` → **201** `{ id, status: 'pending', triage: { category, priority, title, suggested_services, duration_min, summary_ar } }`. `phone` must be a Saudi mobile (`05XXXXXXXX`, `5XXXXXXXX`, `+9665…`, `009665…`, Arabic-Indic digits ok) and is stored normalised as `9665XXXXXXXX`; otherwise 400 with `details[].path = 'body.phone'`. Stores `ai_triage` (full result) and `preferred_window` (migration `040_b4_public.sql`), then `notify({ channel: 'system', to: company.phone })`. **Honeypot:** a non-empty `website` returns a fake 201 (random id, `triage: null`) and stores nothing. |
| GET | `/public/track/:token` | Job by `jobs.public_token` → `{ number, title, category, status, scheduled_start, scheduled_end, completed_at, on_the_way_at, started_at, company: { name, name_ar, phone, logo_url, slug }, technician: { name (first name only), color } \| null, site: { district, city } \| null, events: [{ type, message, created_at }] (types: created, assigned, status_changed, rescheduled — max 50), rating, rating_comment, can_rate, invoice: { public_token, total, status, url: '/i/<token>' } \| null }`. `invoice` = latest issued (unpaid/paid) invoice for the job. `Cache-Control: no-store`. |
| POST | `/public/track/:token/rating` | `{ rating: 1..5, comment?(≤1000) }` → `{ ok: true }`. Atomic rate-once (`UPDATE … WHERE status='completed' AND rating IS NULL`): **409** if already rated or not completed. Sets `jobs.rated_at`, adds a `rating` job event via B1's `addJobEvent()`. |
| GET | `/public/invoices/:token` | B2's `getPublicInvoice()` (fallback: direct query) plus `{ tracking_url: '/t/<job token>' \| null, job_number, qr_png_url, pdf_url, can_pay }`. Drafts are 404. Contains seller block (`company`/`seller`), `customer: { name, vat_number }`, `lines`, `qr_tlv`; no internal ids. |
| GET | `/public/invoices/:token/qr.png` | ZATCA TLV QR as PNG (`qrcode` package, 360px). Cached 1 day. |
| GET | `/public/invoices/:token/pdf` | 302 to B2's `/api/invoices/public/:token/pdf` (fallback: renders via `renderInvoicePdf`, 503 `unavailable` if not implemented). |
| POST | `/public/invoices/:token/pay` | → `{ url, simulated }` via B2's `createPublicPaymentLink()` (fallback: `moyasar.createPaymentLink`). **409** if paid/void/credit note. |

Frontend: `/b/:slug` (BookingPage), `/t/:token` (TrackingPage, polls every 30 s while active), `/i/:token` (InvoiceView, bilingual AR/EN labels, QR, pay, PDF, print). Tests: `node --test server/tests/public.test.mjs` (server on `BASE_URL`, default `http://localhost:3104`).

### Technician PWA notes (B4)

- Uses only B1 job endpoints (`GET /jobs?technician_id=me&from&to`, `GET /jobs/:id`, `POST /jobs/:id/status`, `PATCH /jobs/:id/checklist`, `PUT /jobs/:id/items`, `POST /jobs/:id/photos|signature|notes`), `GET /services`, `PATCH /auth/me { locale }`.
- Checklist readings are encoded in the label because the checklist schema is `{ label, done }`: `"ضغط الفريون — 125 psi"`, `"قراءة الأمبير — 6.2 A"`. AC defaults: ضغط الفريون (psi), تنظيف الفلاتر, فحص خط التصريف, قراءة الأمبير (A), اختبار الثرموستات.
- "Cash received": owner/dispatcher → `POST /invoices/:id/pay {payment_method:'cash'}`; technician → job note `تحصيل نقدي من العميل: <amount> ر.س` for the office to reconcile (technicians can't mark invoices paid).
- Offline: writes queue in `localStorage['dawra_tech_queue_v1']` and replay in order on `online`; 4xx on replay are dropped and surfaced in a banner. Service worker `/sw.js` (prod only) caches the app shell; `/api` is never cached by the SW.
- Languages: ar / en / **ur** / **hi** (`web/src/i18n/ns/tech.{ur,hi}.json`, tech-local overlay; server `users.locale` stays `ar|en`).

## 13. AI and messages (B5)

| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | `/ai/triage` | owner, dispatcher | `{ text, category?, locale? }` → `Triage` (below). Uses the company's active price list, so `suggested_services` are real `name_ar`s. Rate-limited 30/min per company (429 `rate_limited`). The public booking flow (B4) calls the lib directly: `triage({ text, category, companyId })`. |
| POST | `/ai/draft-message` | owner, dispatcher | `{ job_id, intent?: 'confirm'\|'reschedule'\|'delay'\|'followup', locale? }` **or** `{ booking_request_id, locale? }` → `{ body, source: 'anthropic'\|'template' }`. Arabic WhatsApp text with the tracking link; nothing is sent. |
| POST | `/ai/draft-reply` | owner, dispatcher | `{ booking_request_id, locale? }` → `{ body, source }`. Reply to a booking request: asks the triage questions and quotes the estimated range. |
| GET | `/messages` | owner, dispatcher | `?job_id=&customer_id=&channel=&status=&event=&from=ISO&to=ISO&q=` → paged `Message` plus `provider: { whatsapp: 'live'\|'simulated' }` |
| GET | `/messages/:id` | owner, dispatcher | `Message & { params }` |
| POST | `/messages` | owner, dispatcher | `{ customer_id?, job_id?, channel?: 'whatsapp'\|'sms', to?, body }` → 201 `Message` (via `notify`; `to` defaults to the job's or customer's phone). Free text: Meta delivers it only inside the 24-hour window. |
| POST | `/messages/:id/resend` | owner, dispatcher | → 201 new `Message` (same recipient; same template and params if it was a template) |

```jsonc
// Triage (server/lib/ai.js) — never throws; falls back to the keyword engine on any AI error or 8s timeout
{ "category": "ac|cleaning|pest|plumbing|electrical|other",
  "priority": "low|normal|urgent", "urgency": "low|normal|urgent",       // same value; priority kept for B1/B4
  "title": "تسريب ماء من المكيف",
  "likely_issue_ar": "…", "likely_issue_en": "…",
  "suggested_services": ["تسليك تصريف المكيف"], "suggested_parts": ["خرطوم تصريف"],
  "price_range_sar": [100, 250],                                         // excl. VAT, rough
  "questions_ar": ["هل الماء ينزل من الوحدة الداخلية…؟"],
  "duration_min": 45, "summary_ar": "…", "confidence": 0.7, "units"?: 3,
  "source": "anthropic|keywords" }

// Message
{ "id", "customer_id", "job_id", "channel": "whatsapp|sms|email|system", "direction": "out|in", "to_addr": "9665…",
  "body", "status": "queued|sent|failed|simulated", "event": "job_scheduled|…|manual", "template", "provider_id", "error",
  "created_at", "customer": { "id", "name" } | null, "job": { "id", "number", "title" } | null }
```

**Server helpers (B5)**, all never throw:

```js
import { notify, notifyJobEvent, notifyContractVisit, notifyBookingReceived, normalizePhone } from '../lib/notify.js';
notifyJobEvent(jobId, 'job_scheduled' | 'tech_on_the_way' | 'job_completed' | 'invoice_issued' | 'job_reminder')
notifyBookingReceived({ companyId, booking })       // B4: after inserting a booking_request (booking.ai_triage optional)
import { triage, draftMessage, draftReply } from '../lib/ai.js';
import { runOnce } from '../lib/scheduler.js';      // tests / manual ops
```

`notifyJobEvent` skips (returns `null`) when the customer has no phone, the plan is `starter`, the subscription is expired or cancelled, or the same event went out for that job in the last 10 minutes. Template texts: `docs/WHATSAPP_TEMPLATES.md`.

**Scheduler** (`server/lib/scheduler.js`, hourly, first pass 30 s after boot, guarded by `pg_try_advisory_lock`):
1. Marks `active` contracts past `end_date` as `expired`.
2. For active contracts with `next_visit_date <= today + SCHEDULER_LEAD_DAYS` (default 14) and no open job for that contract, creates a `new` job (`source='contract'`, `category='maintenance'`, standard AC checklist, `created` event), sends `contract_visit_reminder`, and advances `next_visit_date` by `round(365 / visits_per_year)` days (set to `null` once past `end_date`). Starter-plan and expired companies are skipped.
3. Day-before reminder (`job_reminder`) for `scheduled` jobs starting tomorrow (Riyadh), once per job (`jobs.reminder_sent_at`), only between 09:00 and 21:00 Riyadh.
4. `trialing` companies past `trial_ends_at` → `subscription_status='expired'`.

Migration `050_b5_notify_scheduler.sql` adds `messages.{event,template,params,provider_id,error}`, `jobs.reminder_sent_at` and `scheduler_runs`.

## 14. Health

`GET /api/health` → `{ ok: true, db: true, version }` (architect)

---

## Change requests

*(append: date · builder · endpoint · proposed change · status)*

- 2026-10-09 · B1 · jobs/photos · photo limit raised from 600 KB to 1.5 MB (data-URL length) per product brief · done
- 2026-10-09 · B1 · jobs · added `PATCH /jobs/:id/schedule`, `POST /jobs/:id/assign`, `GET /jobs/:id/events`; mutations return `warnings` · done
- 2026-10-09 · B1 · contracts · added `POST /contracts/:id/generate-visits` · done
- 2026-10-09 · B1 · users · `password` optional on POST /users (invite returns `temp_password`) · done
- 2026-10-09 · B2 · invoices · added draft/issue/credit-note/send/xml/reports/vat endpoints, `mada`/`online` payment methods, credit notes (`kind: credit_note`, `status: issued`), `void` now issues a credit note · done
- 2026-10-09 · B2 · billing · checkout takes `cycle`, no longer auto-activates in demo mode (simulated checkout page instead); GET /billing adds trial_days_left, usage, limits · done
- 2026-10-09 · B2 → B4 · public invoice · call `getPublicInvoice(token)` / `createPublicPaymentLink(token)` (exported from routes/invoices.js and lib/invoices.js); `createPaymentLink` with `{ invoice_id, company_id }` metadata is tracked so paying marks the invoice paid · open
