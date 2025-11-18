-- Create LGPD Consent Tracking Table
-- This table stores user acceptance of LGPD privacy policies
-- Required for Brazilian data protection law compliance

CREATE TABLE IF NOT EXISTS users_lgpd_consent (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  accepted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  policy_version TEXT NOT NULL DEFAULT '1.0',
  ip_address INET,
  policy_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_lgpd_consent_user_id 
  ON users_lgpd_consent(user_id);

-- Create index on accepted_at for audit trail queries
CREATE INDEX IF NOT EXISTS idx_users_lgpd_consent_accepted_at 
  ON users_lgpd_consent(accepted_at DESC);

-- Enable RLS (Row Level Security) for privacy
ALTER TABLE users_lgpd_consent ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own LGPD consent records
CREATE POLICY "Users can view their own LGPD consent"
  ON users_lgpd_consent
  FOR SELECT
  USING (user_id = auth.uid());

-- Policy: Users can only insert their own LGPD consent records
CREATE POLICY "Users can insert their own LGPD consent"
  ON users_lgpd_consent
  FOR INSERT
  WITH CHECK (user_id = auth.uid());
