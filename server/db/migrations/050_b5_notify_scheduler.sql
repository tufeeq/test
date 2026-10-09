-- B5: notification log details + scheduler bookkeeping. Re-runnable.

-- messages: which template/event produced it, its parameters (for resend), provider id and error.
ALTER TABLE messages ADD COLUMN IF NOT EXISTS event       text;
ALTER TABLE messages ADD COLUMN IF NOT EXISTS template    text;
ALTER TABLE messages ADD COLUMN IF NOT EXISTS params      jsonb;
ALTER TABLE messages ADD COLUMN IF NOT EXISTS provider_id text;
ALTER TABLE messages ADD COLUMN IF NOT EXISTS error       text;
CREATE INDEX IF NOT EXISTS messages_customer_idx ON messages(customer_id);

-- jobs: day-before reminder sent once.
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS reminder_sent_at timestamptz;
CREATE INDEX IF NOT EXISTS jobs_contract_idx ON jobs(contract_id) WHERE contract_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS jobs_reminder_idx ON jobs(status, scheduled_start) WHERE reminder_sent_at IS NULL;

-- scheduler run log (ops visibility; one row per run that acquired the lock).
CREATE TABLE IF NOT EXISTS scheduler_runs (
  id          bigserial PRIMARY KEY,
  started_at  timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz,
  result      jsonb
);
