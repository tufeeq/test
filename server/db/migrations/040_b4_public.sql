-- B4: public booking page + tracking extras. Re-runnable.
-- Preferred time window chosen on /b/:slug ('morning' | 'afternoon' | 'evening' | free text ≤ 40).
ALTER TABLE booking_requests ADD COLUMN IF NOT EXISTS preferred_window text;
-- Optional per-company list of booking tiles shown on /b/:slug; NULL = all categories.
ALTER TABLE companies ADD COLUMN IF NOT EXISTS booking_categories text[];
-- When the customer rated (used to enforce rate-once on /t/:token).
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS rated_at timestamptz;
CREATE INDEX IF NOT EXISTS booking_requests_company_phone_idx ON booking_requests(company_id, phone);
