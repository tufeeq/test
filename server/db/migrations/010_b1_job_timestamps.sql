-- B1: status-transition timestamps on jobs + helpful indexes. Re-runnable.
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS on_the_way_at timestamptz;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS started_at    timestamptz;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS cancelled_at  timestamptz;

CREATE INDEX IF NOT EXISTS jobs_contract_idx ON jobs(contract_id);
CREATE INDEX IF NOT EXISTS jobs_company_completed_idx ON jobs(company_id, completed_at);
CREATE INDEX IF NOT EXISTS invoices_company_paid_idx ON invoices(company_id, paid_at);
