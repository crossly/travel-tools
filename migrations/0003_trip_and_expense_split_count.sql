ALTER TABLE trips ADD COLUMN split_count INTEGER;
UPDATE trips SET split_count = 1 WHERE split_count IS NULL OR split_count < 1;

ALTER TABLE expenses ADD COLUMN split_count INTEGER;
UPDATE expenses SET split_count = 1 WHERE split_count IS NULL OR split_count < 1;
