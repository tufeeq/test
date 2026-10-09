-- B2 · Billing, ZATCA e-invoicing, payments.  Re-runnable.
-- Invoices: drafts, credit notes, buyer/seller snapshots, Phase-2 readiness (hash chain).
-- Payments: one table for every hosted payment link (customer invoice or SaaS subscription).

-- ── invoices ──────────────────────────────────────────────
ALTER TABLE invoices ALTER COLUMN number DROP NOT NULL;            -- drafts have no number until issued
ALTER TABLE invoices DROP CONSTRAINT IF EXISTS invoices_kind_check;
ALTER TABLE invoices ADD CONSTRAINT invoices_kind_check CHECK (kind IN ('simplified','standard','credit_note'));
ALTER TABLE invoices DROP CONSTRAINT IF EXISTS invoices_status_check;
-- draft: editable, not a tax document · unpaid/paid: issued invoices · void: cancelled by a credit note
-- issued: status of a credit note (it is never "paid")
ALTER TABLE invoices ADD CONSTRAINT invoices_status_check CHECK (status IN ('draft','unpaid','paid','void','issued'));

ALTER TABLE invoices ADD COLUMN IF NOT EXISTS original_invoice_id uuid REFERENCES invoices(id) ON DELETE RESTRICT;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS credit_reason      text;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS previous_hash      text;   -- base64 SHA-256 of the previous issued invoice (PIH)
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS hash               text;   -- base64 SHA-256(canonical JSON + previous_hash)
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS seller             jsonb;  -- snapshot at issue (immutable)
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS buyer              jsonb;  -- snapshot at issue (immutable)
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS issued_at          timestamptz;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS voided_at          timestamptz;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS payment_ref        text;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS created_by         uuid REFERENCES users(id) ON DELETE SET NULL;
-- Pre-existing (seeded) rows are issued documents.
UPDATE invoices SET issued_at = issue_date WHERE issued_at IS NULL AND status <> 'draft';

CREATE INDEX IF NOT EXISTS invoices_original_idx ON invoices(original_invoice_id) WHERE original_invoice_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS invoices_company_issue_idx ON invoices(company_id, issue_date);
CREATE INDEX IF NOT EXISTS invoices_job_idx ON invoices(job_id) WHERE job_id IS NOT NULL;

ALTER TABLE invoice_lines ADD COLUMN IF NOT EXISTS vat_amount numeric(12,2);   -- per-line rounded VAT
ALTER TABLE invoice_lines ADD COLUMN IF NOT EXISTS position   integer NOT NULL DEFAULT 0;
UPDATE invoice_lines SET vat_amount = round(line_total * vat_rate, 2) WHERE vat_amount IS NULL;

-- ── companies (SaaS subscription) ────────────────────────
ALTER TABLE companies ADD COLUMN IF NOT EXISTS current_period_end timestamptz;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS billing_cycle      text CHECK (billing_cycle IN ('monthly','yearly'));

ALTER TABLE subscriptions_payments ADD COLUMN IF NOT EXISTS cycle       text NOT NULL DEFAULT 'monthly';
ALTER TABLE subscriptions_payments ADD COLUMN IF NOT EXISTS vat_amount  numeric(12,2) NOT NULL DEFAULT 0;
ALTER TABLE subscriptions_payments ADD COLUMN IF NOT EXISTS total       numeric(12,2);
ALTER TABLE subscriptions_payments ADD COLUMN IF NOT EXISTS paid_at     timestamptz;
ALTER TABLE subscriptions_payments ADD COLUMN IF NOT EXISTS period_end  timestamptz;

-- ── payment links (Moyasar hosted invoices or local simulation) ──
CREATE TABLE IF NOT EXISTS payment_links (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ref                      text NOT NULL UNIQUE,                 -- our opaque reference (metadata.dawra_ref)
  company_id               uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  purpose                  text NOT NULL CHECK (purpose IN ('invoice','subscription')),
  invoice_id               uuid REFERENCES invoices(id) ON DELETE CASCADE,
  subscription_payment_id  uuid REFERENCES subscriptions_payments(id) ON DELETE CASCADE,
  amount_halalas           integer NOT NULL CHECK (amount_halalas >= 100),
  description              text,
  provider                 text NOT NULL CHECK (provider IN ('moyasar','simulation')),
  provider_id              text,                                 -- Moyasar invoice id
  provider_payment_id      text,                                 -- Moyasar payment id (from webhook)
  url                      text,
  success_url              text,
  back_url                 text,
  status                   text NOT NULL DEFAULT 'initiated' CHECK (status IN ('initiated','paid','failed','cancelled')),
  paid_at                  timestamptz,
  created_at               timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS payment_links_company_idx ON payment_links(company_id, created_at DESC);
CREATE INDEX IF NOT EXISTS payment_links_invoice_idx ON payment_links(invoice_id);
CREATE UNIQUE INDEX IF NOT EXISTS payment_links_provider_idx ON payment_links(provider, provider_id) WHERE provider_id IS NOT NULL;
