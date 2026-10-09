-- B2 · Credit notes must not block bulk deletes (SEED_FORCE, company cascade). NO ACTION is checked at
-- statement end, so deleting an invoice together with its credit notes works; deleting only the original fails.
ALTER TABLE invoices DROP CONSTRAINT IF EXISTS invoices_original_invoice_id_fkey;
ALTER TABLE invoices ADD CONSTRAINT invoices_original_invoice_id_fkey
  FOREIGN KEY (original_invoice_id) REFERENCES invoices(id) ON DELETE NO ACTION;
