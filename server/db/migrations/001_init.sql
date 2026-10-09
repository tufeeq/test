-- Dawra / دورة — initial schema
-- Every tenant table carries company_id (FK companies) and is indexed on it.
-- Owners of later changes: add NEW numbered files (002_xxx.sql); never edit this one after merge.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ───────────────────────── companies ─────────────────────────
CREATE TABLE companies (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                text NOT NULL UNIQUE,
  name                text NOT NULL,
  name_ar             text,
  vat_number          text,
  cr_number           text,
  phone               text,
  city                text,
  address             text,
  logo_url            text,
  plan                text NOT NULL DEFAULT 'trial' CHECK (plan IN ('trial','starter','pro','business')),
  trial_ends_at       timestamptz DEFAULT (now() + interval '14 days'),
  subscription_status text NOT NULL DEFAULT 'trialing' CHECK (subscription_status IN ('trialing','active','past_due','cancelled','expired')),
  created_at          timestamptz NOT NULL DEFAULT now()
);

-- ───────────────────────── users ─────────────────────────
CREATE TABLE users (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id    uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  name          text NOT NULL,
  email         text NOT NULL UNIQUE,
  phone         text,
  password_hash text,
  role          text NOT NULL CHECK (role IN ('owner','dispatcher','technician')),
  locale        text NOT NULL DEFAULT 'ar' CHECK (locale IN ('ar','en')),
  skills        text[] NOT NULL DEFAULT '{}',
  color         text,
  active        boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX users_company_idx ON users(company_id);

-- ───────────────────────── customers / sites / assets ─────────────────────────
CREATE TABLE customers (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id  uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  name        text NOT NULL,
  phone       text,
  email       text,
  type        text NOT NULL DEFAULT 'individual' CHECK (type IN ('individual','business')),
  vat_number  text,
  notes       text,
  created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX customers_company_idx ON customers(company_id);
CREATE INDEX customers_company_phone_idx ON customers(company_id, phone);

CREATE TABLE sites (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id   uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  customer_id  uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  label        text,
  city         text,
  district     text,
  address      text,
  lat          double precision,
  lng          double precision,
  created_at   timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX sites_company_idx ON sites(company_id);
CREATE INDEX sites_customer_idx ON sites(customer_id);

CREATE TABLE assets (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id    uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  site_id       uuid NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  kind          text NOT NULL DEFAULT 'other' CHECK (kind IN ('split_ac','central_ac','window_ac','cold_room','other')),
  brand         text,
  capacity_btu  integer,
  install_date  date,
  notes         text,
  created_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX assets_company_idx ON assets(company_id);
CREATE INDEX assets_site_idx ON assets(site_id);

-- ───────────────────────── services (price list) ─────────────────────────
CREATE TABLE services (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id    uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  name          text NOT NULL,
  name_ar       text,
  category      text,
  price         numeric(12,2) NOT NULL DEFAULT 0,
  duration_min  integer NOT NULL DEFAULT 60,
  taxable       boolean NOT NULL DEFAULT true,
  active        boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX services_company_idx ON services(company_id);

-- ───────────────────────── contracts ─────────────────────────
CREATE TABLE contracts (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id       uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  customer_id      uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  site_id          uuid REFERENCES sites(id) ON DELETE SET NULL,
  title            text NOT NULL,
  start_date       date NOT NULL,
  end_date         date NOT NULL,
  visits_per_year  integer NOT NULL DEFAULT 4,
  price            numeric(12,2) NOT NULL DEFAULT 0,
  status           text NOT NULL DEFAULT 'active' CHECK (status IN ('active','expired','cancelled')),
  next_visit_date  date,
  notes            text,
  created_at       timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX contracts_company_idx ON contracts(company_id);
CREATE INDEX contracts_next_visit_idx ON contracts(status, next_visit_date);

-- ───────────────────────── jobs ─────────────────────────
CREATE TABLE jobs (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id         uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  number             integer NOT NULL,
  customer_id        uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  site_id            uuid REFERENCES sites(id) ON DELETE SET NULL,
  asset_id           uuid REFERENCES assets(id) ON DELETE SET NULL,
  contract_id        uuid REFERENCES contracts(id) ON DELETE SET NULL,
  title              text NOT NULL,
  description        text,
  category           text,
  priority           text NOT NULL DEFAULT 'normal' CHECK (priority IN ('low','normal','urgent')),
  status             text NOT NULL DEFAULT 'new' CHECK (status IN ('new','scheduled','on_the_way','in_progress','completed','cancelled')),
  source             text NOT NULL DEFAULT 'manual' CHECK (source IN ('manual','portal','whatsapp','contract','ai')),
  scheduled_start    timestamptz,
  scheduled_end      timestamptz,
  technician_id      uuid REFERENCES users(id) ON DELETE SET NULL,
  checklist          jsonb NOT NULL DEFAULT '[]'::jsonb,
  notes              text,
  customer_signature text,
  completed_at       timestamptz,
  rating             integer CHECK (rating BETWEEN 1 AND 5),
  rating_comment     text,
  public_token       text NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex'),
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now(),
  UNIQUE (company_id, number)
);
CREATE INDEX jobs_company_idx ON jobs(company_id);
CREATE INDEX jobs_company_status_idx ON jobs(company_id, status);
CREATE INDEX jobs_company_sched_idx ON jobs(company_id, scheduled_start);
CREATE INDEX jobs_tech_sched_idx ON jobs(technician_id, scheduled_start);
CREATE INDEX jobs_customer_idx ON jobs(customer_id);

CREATE TABLE job_items (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id      uuid NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  company_id  uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  service_id  uuid REFERENCES services(id) ON DELETE SET NULL,
  description text NOT NULL,
  qty         numeric(12,2) NOT NULL DEFAULT 1,
  unit_price  numeric(12,2) NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX job_items_job_idx ON job_items(job_id);
CREATE INDEX job_items_company_idx ON job_items(company_id);

CREATE TABLE job_photos (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id      uuid NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  company_id  uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  kind        text NOT NULL DEFAULT 'before' CHECK (kind IN ('before','after')),
  data_url    text NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX job_photos_job_idx ON job_photos(job_id);
CREATE INDEX job_photos_company_idx ON job_photos(company_id);

CREATE TABLE job_events (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id         uuid NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  company_id     uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  type           text NOT NULL,       -- created | status_changed | assigned | note | photo | signature | rating | invoice | message
  message        text,
  actor_user_id  uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at     timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX job_events_job_idx ON job_events(job_id, created_at);
CREATE INDEX job_events_company_idx ON job_events(company_id);

-- ───────────────────────── invoices ─────────────────────────
CREATE TABLE invoices (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id        uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  number            integer NOT NULL,
  job_id            uuid REFERENCES jobs(id) ON DELETE SET NULL,
  contract_id       uuid REFERENCES contracts(id) ON DELETE SET NULL,
  customer_id       uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  issue_date        timestamptz NOT NULL DEFAULT now(),
  kind              text NOT NULL DEFAULT 'simplified' CHECK (kind IN ('simplified','standard')),
  subtotal          numeric(12,2) NOT NULL DEFAULT 0,
  vat_amount        numeric(12,2) NOT NULL DEFAULT 0,
  total             numeric(12,2) NOT NULL DEFAULT 0,
  status            text NOT NULL DEFAULT 'unpaid' CHECK (status IN ('unpaid','paid','void')),
  paid_at           timestamptz,
  payment_method    text,             -- cash | card | transfer | moyasar
  qr_tlv            text,             -- base64 ZATCA TLV
  uuid              uuid NOT NULL DEFAULT gen_random_uuid(),
  public_token      text NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex'),
  payment_link_url  text,
  notes             text,
  created_at        timestamptz NOT NULL DEFAULT now(),
  UNIQUE (company_id, number)
);
CREATE INDEX invoices_company_idx ON invoices(company_id);
CREATE INDEX invoices_company_status_idx ON invoices(company_id, status);
CREATE INDEX invoices_customer_idx ON invoices(customer_id);

CREATE TABLE invoice_lines (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id   uuid NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  company_id   uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  description  text NOT NULL,
  qty          numeric(12,2) NOT NULL DEFAULT 1,
  unit_price   numeric(12,2) NOT NULL DEFAULT 0,
  vat_rate     numeric(5,4) NOT NULL DEFAULT 0.15,
  line_total   numeric(12,2) NOT NULL DEFAULT 0   -- qty*unit_price, excl. VAT
);
CREATE INDEX invoice_lines_invoice_idx ON invoice_lines(invoice_id);
CREATE INDEX invoice_lines_company_idx ON invoice_lines(company_id);

-- ───────────────────────── messages (notification log) ─────────────────────────
CREATE TABLE messages (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id   uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  customer_id  uuid REFERENCES customers(id) ON DELETE SET NULL,
  job_id       uuid REFERENCES jobs(id) ON DELETE SET NULL,
  channel      text NOT NULL CHECK (channel IN ('whatsapp','sms','email','system')),
  direction    text NOT NULL DEFAULT 'out' CHECK (direction IN ('out','in')),
  to_addr      text,
  body         text NOT NULL,
  status       text NOT NULL DEFAULT 'queued' CHECK (status IN ('queued','sent','failed','simulated')),
  created_at   timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX messages_company_idx ON messages(company_id, created_at DESC);
CREATE INDEX messages_job_idx ON messages(job_id);

-- ───────────────────────── booking requests (public /b/:slug) ─────────────────────────
CREATE TABLE booking_requests (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id      uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  name            text NOT NULL,
  phone           text NOT NULL,
  city            text,
  district        text,
  category        text,
  description     text,
  preferred_date  date,
  ai_triage       jsonb,
  status          text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','converted','rejected')),
  job_id          uuid REFERENCES jobs(id) ON DELETE SET NULL,
  created_at      timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX booking_requests_company_idx ON booking_requests(company_id, status);

-- ───────────────────────── SaaS billing ─────────────────────────
CREATE TABLE subscriptions_payments (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id    uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  plan          text NOT NULL CHECK (plan IN ('starter','pro','business')),
  amount        numeric(12,2) NOT NULL,
  provider      text NOT NULL DEFAULT 'moyasar',
  provider_ref  text,
  status        text NOT NULL DEFAULT 'initiated',  -- initiated | paid | failed
  created_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX subscriptions_payments_company_idx ON subscriptions_payments(company_id);
CREATE UNIQUE INDEX subscriptions_payments_ref_idx ON subscriptions_payments(provider, provider_ref) WHERE provider_ref IS NOT NULL;

-- ───────────────────────── audit ─────────────────────────
CREATE TABLE audit_log (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id  uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id     uuid REFERENCES users(id) ON DELETE SET NULL,
  action      text NOT NULL,
  entity      text,
  entity_id   uuid,
  created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX audit_log_company_idx ON audit_log(company_id, created_at DESC);
