-- Singleton-row table for current loan rates.
-- INSERT and DELETE policies are intentionally omitted — the single row
-- (id = 1) is seeded by this migration and must never be replaced or removed.
CREATE TABLE IF NOT EXISTS rates (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  no_doc_rate numeric(5,2) NOT NULL DEFAULT 9.50,
  bridge_loan_rate numeric(5,2) NOT NULL DEFAULT 10.25,
  label text NOT NULL DEFAULT 'This Week''s Rates',
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO rates (id, no_doc_rate, bridge_loan_rate)
  VALUES (1, 9.50, 10.25)
  ON CONFLICT (id) DO NOTHING;

ALTER TABLE rates ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION touch_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER rates_updated_at
  BEFORE UPDATE ON rates
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

CREATE POLICY "Public read rates" ON rates
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admin update rates" ON rates
  FOR UPDATE TO authenticated
  USING (is_admin_user())
  WITH CHECK (is_admin_user());
