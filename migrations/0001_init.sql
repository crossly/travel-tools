PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS trips (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  base_currency TEXT NOT NULL,
  split_count INTEGER NOT NULL DEFAULT 1,
  share_code TEXT NOT NULL UNIQUE,
  owner_device_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS members (
  id TEXT PRIMARY KEY,
  trip_id TEXT NOT NULL,
  display_name TEXT NOT NULL,
  device_id TEXT,
  is_owner INTEGER NOT NULL DEFAULT 0,
  joined_at TEXT NOT NULL,
  FOREIGN KEY(trip_id) REFERENCES trips(id)
);

CREATE TABLE IF NOT EXISTS expenses (
  id TEXT PRIMARY KEY,
  trip_id TEXT NOT NULL,
  creator_device_id TEXT NOT NULL,
  payer_member_id TEXT NOT NULL,
  title TEXT NOT NULL,
  note TEXT,
  amount_original REAL NOT NULL,
  original_currency TEXT NOT NULL,
  fx_rate_to_base REAL NOT NULL,
  amount_base REAL NOT NULL,
  split_count INTEGER NOT NULL DEFAULT 1,
  spent_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  deleted_at TEXT,
  FOREIGN KEY(trip_id) REFERENCES trips(id),
  FOREIGN KEY(payer_member_id) REFERENCES members(id)
);

CREATE TABLE IF NOT EXISTS expense_participants (
  expense_id TEXT NOT NULL,
  trip_id TEXT NOT NULL,
  member_id TEXT NOT NULL,
  included INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (expense_id, member_id),
  FOREIGN KEY(expense_id) REFERENCES expenses(id),
  FOREIGN KEY(member_id) REFERENCES members(id)
);

CREATE TABLE IF NOT EXISTS sync_operations (
  op_id TEXT PRIMARY KEY,
  trip_id TEXT NOT NULL,
  device_id TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  op_type TEXT NOT NULL,
  payload_json TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY(trip_id) REFERENCES trips(id)
);

CREATE INDEX IF NOT EXISTS idx_members_trip_device ON members(trip_id, device_id);
CREATE INDEX IF NOT EXISTS idx_expenses_trip_updated ON expenses(trip_id, updated_at);
CREATE INDEX IF NOT EXISTS idx_participants_trip ON expense_participants(trip_id, expense_id);
