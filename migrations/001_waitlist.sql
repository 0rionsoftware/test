-- Waitlist schema. Apply once as a role that owns the schema:
--   psql "$DATABASE_URL" -f migrations/001_waitlist.sql
--
-- The application itself does not need DDL rights. Create a restricted role
-- for it (see the bottom of this file) so a leaked connection string cannot
-- create, alter, or drop objects.

CREATE TABLE IF NOT EXISTS waitlist (
  id          bigserial PRIMARY KEY,
  email       text NOT NULL UNIQUE,
  company     text,
  use_case    text,
  source      text,
  referrer    text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Supports the position lookup and the ordered export.
CREATE INDEX IF NOT EXISTS waitlist_created_at_idx ON waitlist (created_at);

-- ---------------------------------------------------------------------------
-- Least-privilege application role. Run these as the schema owner, then point
-- DATABASE_URL at this role rather than at the owner/superuser.
--
--   CREATE ROLE millwright_app LOGIN PASSWORD '<generate a strong one>';
--   GRANT USAGE ON SCHEMA public TO millwright_app;
--   GRANT SELECT, INSERT ON waitlist TO millwright_app;
--   GRANT USAGE, SELECT ON SEQUENCE waitlist_id_seq TO millwright_app;
--
-- Deliberately withheld: UPDATE, DELETE, TRUNCATE, and CREATE on the schema.
-- The app only ever appends rows and counts them, so it never needs them, and
-- withholding them means a compromised app cannot erase the list.
-- ---------------------------------------------------------------------------
