-- ============================================================
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/ekywvnhllxnopmaotjui/editor
-- ============================================================

-- Create contact_inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id   TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  subject     TEXT NOT NULL,
  message     TEXT NOT NULL,
  ip_address  TEXT,
  status      TEXT NOT NULL DEFAULT 'new',  -- new | read | replied | archived
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast lookup by ticket_id and email
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_ticket_id ON contact_inquiries (ticket_id);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_email ON contact_inquiries (email);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at ON contact_inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON contact_inquiries (status);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_contact_inquiries_updated_at
  BEFORE UPDATE ON contact_inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security: only service role can read/write
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Policy: service role has full access (via SUPABASE_SERVICE_ROLE_KEY)
-- No anon/authenticated access from browser
CREATE POLICY "Service role only" ON contact_inquiries
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================================
-- DONE. Your table is ready.
-- ============================================================
