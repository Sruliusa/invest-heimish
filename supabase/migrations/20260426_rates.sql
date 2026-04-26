CREATE TABLE rates (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  no_doc_rate numeric(5,2) NOT NULL DEFAULT 9.50,
  bridge_loan_rate numeric(5,2) NOT NULL DEFAULT 10.25,
  label text NOT NULL DEFAULT 'This Week''s Rates',
  updated_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO rates (id, no_doc_rate, bridge_loan_rate) VALUES (1, 9.50, 10.25);
ALTER TABLE rates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read rates" ON rates FOR SELECT USING (true);
CREATE POLICY "Admin update rates" ON rates FOR UPDATE USING (is_admin_user());
