ALTER TABLE trips ADD COLUMN expense_currency TEXT;
UPDATE trips SET expense_currency = base_currency WHERE expense_currency IS NULL OR expense_currency = '';
