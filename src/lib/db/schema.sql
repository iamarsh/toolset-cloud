-- Toolset.cloud Database Schema
-- PostgreSQL schema for Supabase with NextAuth adapter
-- IMPORTANT: This must be run in the next_auth schema, not public schema
-- The @auth/supabase-adapter is hardcoded to use "next_auth" schema

-- =====================================================
-- STEP 1: ENSURE UUID EXTENSION IS AVAILABLE
-- =====================================================

-- Try to create in extensions schema (Supabase default)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- STEP 2: CREATE SCHEMA AND SET PERMISSIONS
-- =====================================================

CREATE SCHEMA IF NOT EXISTS next_auth;

-- Grant usage to service role and authenticated users
GRANT USAGE ON SCHEMA next_auth TO authenticated, service_role, anon;
GRANT ALL ON ALL TABLES IN SCHEMA next_auth TO authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA next_auth TO authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA next_auth GRANT ALL ON TABLES TO authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA next_auth GRANT ALL ON SEQUENCES TO authenticated, service_role;

-- Allow anon role to read from next_auth schema (required for API)
GRANT SELECT ON ALL TABLES IN SCHEMA next_auth TO anon;
ALTER DEFAULT PRIVILEGES IN SCHEMA next_auth GRANT SELECT ON TABLES TO anon;

-- =====================================================
-- NEXTAUTH CORE TABLES (camelCase columns required!)
-- =====================================================

-- Users table (NextAuth core + plan extension)
-- IMPORTANT: emailVerified must be camelCase, not snake_case
CREATE TABLE IF NOT EXISTS next_auth.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  "emailVerified" TIMESTAMPTZ,
  image TEXT,
  plan TEXT NOT NULL DEFAULT 'FREE_ACCOUNT' -- PUBLIC, FREE_ACCOUNT, PRO
);

CREATE INDEX IF NOT EXISTS idx_users_email ON next_auth.users(email);
CREATE INDEX IF NOT EXISTS idx_users_plan ON next_auth.users(plan);

-- Accounts table (OAuth connections)
-- IMPORTANT: userId, providerAccountId must be camelCase
CREATE TABLE IF NOT EXISTS next_auth.accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" UUID NOT NULL REFERENCES next_auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  UNIQUE(provider, "providerAccountId")
);

CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON next_auth.accounts("userId");

-- Sessions table (database session strategy)
-- IMPORTANT: sessionToken, userId must be camelCase
CREATE TABLE IF NOT EXISTS next_auth.sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "sessionToken" TEXT UNIQUE NOT NULL,
  "userId" UUID NOT NULL REFERENCES next_auth.users(id) ON DELETE CASCADE,
  expires TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON next_auth.sessions("userId");
CREATE INDEX IF NOT EXISTS idx_sessions_session_token ON next_auth.sessions("sessionToken");

-- Verification tokens (for email magic links)
CREATE TABLE IF NOT EXISTS next_auth.verification_tokens (
  identifier TEXT NOT NULL,
  token TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- =====================================================
-- WORKSPACE TABLES (snake_case for consistency)
-- =====================================================

-- Tool runs (usage history)
CREATE TABLE IF NOT EXISTS next_auth.tool_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES next_auth.users(id) ON DELETE CASCADE,
  tool_id TEXT NOT NULL,
  tool_slug TEXT NOT NULL,
  inputs JSONB,
  outputs JSONB,
  status TEXT NOT NULL DEFAULT 'completed',
  runtime_ms INTEGER,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tool_runs_user_id ON next_auth.tool_runs(user_id);
CREATE INDEX IF NOT EXISTS idx_tool_runs_tool_id ON next_auth.tool_runs(tool_id);
CREATE INDEX IF NOT EXISTS idx_tool_runs_created_at ON next_auth.tool_runs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tool_runs_user_tool ON next_auth.tool_runs(user_id, tool_id);
CREATE INDEX IF NOT EXISTS idx_tool_runs_user_created ON next_auth.tool_runs(user_id, created_at DESC);

-- Tool configurations (saved setups for rerun)
CREATE TABLE IF NOT EXISTS next_auth.tool_configs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES next_auth.users(id) ON DELETE CASCADE,
  tool_id TEXT NOT NULL,
  tool_slug TEXT NOT NULL,
  name TEXT NOT NULL,
  config JSONB NOT NULL,
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tool_configs_user_id ON next_auth.tool_configs(user_id);
CREATE INDEX IF NOT EXISTS idx_tool_configs_tool_id ON next_auth.tool_configs(tool_id);
CREATE INDEX IF NOT EXISTS idx_tool_configs_user_tool ON next_auth.tool_configs(user_id, tool_id);
CREATE INDEX IF NOT EXISTS idx_tool_configs_favorite ON next_auth.tool_configs(user_id, is_favorite);

-- User preferences (settings)
CREATE TABLE IF NOT EXISTS next_auth.user_preferences (
  user_id UUID PRIMARY KEY REFERENCES next_auth.users(id) ON DELETE CASCADE,
  theme TEXT DEFAULT 'system',
  recent_tools_limit INTEGER DEFAULT 10,
  email_notifications BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Email deliveries (job completion tracking)
CREATE TABLE IF NOT EXISTS next_auth.email_deliveries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES next_auth.users(id) ON DELETE CASCADE,
  tool_run_id UUID REFERENCES next_auth.tool_runs(id) ON DELETE SET NULL,
  recipient_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  resend_id TEXT,
  error_message TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sent_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_email_deliveries_user_id ON next_auth.email_deliveries(user_id);
CREATE INDEX IF NOT EXISTS idx_email_deliveries_status ON next_auth.email_deliveries(status);
CREATE INDEX IF NOT EXISTS idx_email_deliveries_created_at ON next_auth.email_deliveries(created_at DESC);

-- AI usage tracking (token limits)
CREATE TABLE IF NOT EXISTS next_auth.ai_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES next_auth.users(id) ON DELETE CASCADE,
  tool_run_id UUID REFERENCES next_auth.tool_runs(id) ON DELETE SET NULL,
  tokens_used INTEGER NOT NULL,
  model TEXT,
  cost_cents INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_usage_user_id ON next_auth.ai_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_usage_created_at ON next_auth.ai_usage(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_usage_user_created ON next_auth.ai_usage(user_id, created_at DESC);

-- =====================================================
-- ROW-LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE next_auth.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE next_auth.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE next_auth.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE next_auth.verification_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE next_auth.tool_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE next_auth.tool_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE next_auth.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE next_auth.email_deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE next_auth.ai_usage ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS (NextAuth uses service role key)
CREATE POLICY service_role_all ON next_auth.users FOR ALL USING (true);
CREATE POLICY service_role_all ON next_auth.accounts FOR ALL USING (true);
CREATE POLICY service_role_all ON next_auth.sessions FOR ALL USING (true);
CREATE POLICY service_role_all ON next_auth.verification_tokens FOR ALL USING (true);
CREATE POLICY service_role_all ON next_auth.tool_runs FOR ALL USING (true);
CREATE POLICY service_role_all ON next_auth.tool_configs FOR ALL USING (true);
CREATE POLICY service_role_all ON next_auth.user_preferences FOR ALL USING (true);
CREATE POLICY service_role_all ON next_auth.email_deliveries FOR ALL USING (true);
CREATE POLICY service_role_all ON next_auth.ai_usage FOR ALL USING (true);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION next_auth.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_tool_runs_updated_at
  BEFORE UPDATE ON next_auth.tool_runs
  FOR EACH ROW
  EXECUTE FUNCTION next_auth.update_updated_at_column();

CREATE TRIGGER update_tool_configs_updated_at
  BEFORE UPDATE ON next_auth.tool_configs
  FOR EACH ROW
  EXECUTE FUNCTION next_auth.update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON next_auth.user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION next_auth.update_updated_at_column();

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Get monthly AI usage for a user
CREATE OR REPLACE FUNCTION next_auth.get_monthly_ai_usage(p_user_id UUID)
RETURNS INTEGER AS $$
  SELECT COALESCE(SUM(tokens_used), 0)::INTEGER
  FROM next_auth.ai_usage
  WHERE user_id = p_user_id
  AND created_at >= DATE_TRUNC('month', NOW());
$$ LANGUAGE SQL STABLE;

-- Get daily AI usage for a user
CREATE OR REPLACE FUNCTION next_auth.get_daily_ai_usage(p_user_id UUID)
RETURNS INTEGER AS $$
  SELECT COALESCE(SUM(tokens_used), 0)::INTEGER
  FROM next_auth.ai_usage
  WHERE user_id = p_user_id
  AND created_at >= DATE_TRUNC('day', NOW());
$$ LANGUAGE SQL STABLE;

-- Get monthly email count for a user
CREATE OR REPLACE FUNCTION next_auth.get_monthly_email_count(p_user_id UUID)
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER
  FROM next_auth.email_deliveries
  WHERE user_id = p_user_id
  AND status = 'sent'
  AND created_at >= DATE_TRUNC('month', NOW());
$$ LANGUAGE SQL STABLE;

-- =====================================================
-- EXPOSE SCHEMA VIA SQL (since UI doesn't allow custom schemas)
-- =====================================================

-- Update PostgREST schema cache to include next_auth
-- This makes the next_auth schema accessible via Supabase API
NOTIFY pgrst, 'reload schema';

-- =====================================================
-- INSTRUCTIONS
-- =====================================================

-- To run this schema:
-- 1. Copy entire file to Supabase SQL Editor
-- 2. Execute (this will create next_auth schema and all tables)
-- 3. Restart your Next.js dev server
-- 4. Test authentication at http://localhost:3000/login

-- To drop old public schema tables (after migration):
-- DROP TABLE IF EXISTS public.ai_usage CASCADE;
-- DROP TABLE IF EXISTS public.email_deliveries CASCADE;
-- DROP TABLE IF EXISTS public.user_preferences CASCADE;
-- DROP TABLE IF EXISTS public.tool_configs CASCADE;
-- DROP TABLE IF EXISTS public.tool_runs CASCADE;
-- DROP TABLE IF EXISTS public.sessions CASCADE;
-- DROP TABLE IF EXISTS public.accounts CASCADE;
-- DROP TABLE IF EXISTS public.users CASCADE;
-- DROP TABLE IF EXISTS public.verification_tokens CASCADE;
