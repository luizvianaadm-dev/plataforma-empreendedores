-- Sprint 5 Week 1: Supabase Migration for Multi-Tenant Organizations
-- This migration creates the foundational tables for multi-tenancy support

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ====================================
-- Organizations Table
-- ====================================
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  plan VARCHAR(50) NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  subscription_status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (subscription_status IN ('active', 'inactive', 'cancelled', 'suspended')),
  current_automations INTEGER NOT NULL DEFAULT 0,
  current_messages INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================
-- Organization Members Table
-- ====================================
CREATE TABLE organization_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(org_id, user_id)
);

-- ====================================
-- Organization Invites Table
-- ====================================
CREATE TABLE organization_invites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  token VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================
-- Indexes for Performance
-- ====================================
CREATE INDEX idx_organizations_user_id ON organizations(user_id);
CREATE INDEX idx_organizations_slug ON organizations(slug);
CREATE INDEX idx_org_members_org_id ON organization_members(org_id);
CREATE INDEX idx_org_members_user_id ON organization_members(user_id);
CREATE INDEX idx_org_invites_org_id ON organization_invites(org_id);
CREATE INDEX idx_org_invites_email ON organization_invites(email);
CREATE INDEX idx_org_invites_token ON organization_invites(token);

-- ====================================
-- Function to update updated_at timestamp
-- ====================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ====================================
-- Trigger to auto-update updated_at
-- ====================================
CREATE TRIGGER update_organizations_updated_at
BEFORE UPDATE ON organizations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ====================================
-- Row Level Security (RLS) Policies
-- ====================================

-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_invites ENABLE ROW LEVEL SECURITY;

-- Organizations: Users can read their own organizations
CREATE POLICY "Users can view their own organizations" 
  ON organizations 
  FOR SELECT 
  USING (user_id = auth.uid());

-- Organizations: Users can insert their own organizations
CREATE POLICY "Users can create their own organizations" 
  ON organizations 
  FOR INSERT 
  WITH CHECK (user_id = auth.uid());

-- Organizations: Users can update their own organizations
CREATE POLICY "Users can update their own organizations" 
  ON organizations 
  FOR UPDATE 
  USING (user_id = auth.uid());

-- Organizations: Users can delete their own organizations
CREATE POLICY "Users can delete their own organizations" 
  ON organizations 
  FOR DELETE 
  USING (user_id = auth.uid());

-- Organization Members: Users can view members of their organizations
CREATE POLICY "Users can view organization members" 
  ON organization_members 
  FOR SELECT 
  USING (
    org_id IN (
      SELECT id FROM organizations WHERE user_id = auth.uid()
    )
  );

-- Organization Members: Owners can manage members
CREATE POLICY "Owners can manage organization members" 
  ON organization_members 
  FOR ALL 
  USING (
    org_id IN (
      SELECT id FROM organizations WHERE user_id = auth.uid()
    )
  );

-- Organization Invites: Users can view invites for their organizations
CREATE POLICY "Users can view organization invites" 
  ON organization_invites 
  FOR SELECT 
  USING (
    org_id IN (
      SELECT id FROM organizations WHERE user_id = auth.uid()
    )
  );

-- Organization Invites: Owners can create invites
CREATE POLICY "Owners can create organization invites" 
  ON organization_invites 
  FOR INSERT 
  WITH CHECK (
    org_id IN (
      SELECT id FROM organizations WHERE user_id = auth.uid()
    )
  );

-- Organization Invites: Owners can delete invites
CREATE POLICY "Owners can delete organization invites" 
  ON organization_invites 
  FOR DELETE 
  USING (
    org_id IN (
      SELECT id FROM organizations WHERE user_id = auth.uid()
    )
  );

-- ====================================
-- Comments for Documentation
-- ====================================
COMMENT ON TABLE organizations IS 'Multi-tenant organizations table - cada organização representa um tenant';
COMMENT ON TABLE organization_members IS 'Membros de cada organização com roles (owner, admin, member)';
COMMENT ON TABLE organization_invites IS 'Convites pendentes para ingressar em organizações';
COMMENT ON COLUMN organizations.plan IS 'Plano de assinatura: free, pro ou enterprise';
COMMENT ON COLUMN organizations.subscription_status IS 'Status da assinatura: active, inactive, cancelled, suspended';
COMMENT ON COLUMN organizations.current_automations IS 'Contador de automações ativas (limites por plano)';
COMMENT ON COLUMN organizations.current_messages IS 'Contador de mensagens enviadas no período (limites por plano)';
