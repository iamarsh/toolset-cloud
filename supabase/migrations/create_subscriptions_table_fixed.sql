-- Subscriptions table for Lemon Squeezy payment tracking
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/uxkkrkemwvbrnhlrtows/sql

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Lemon Squeezy data
  ls_subscription_id TEXT UNIQUE NOT NULL,
  ls_customer_id TEXT NOT NULL,
  ls_variant_id TEXT,  -- Optional: May not exist for subscription products
  ls_product_id TEXT NOT NULL,

  -- Subscription details
  plan TEXT NOT NULL CHECK (plan IN ('FREE_ACCOUNT', 'PRO')),
  status TEXT NOT NULL CHECK (status IN ('active', 'past_due', 'cancelled', 'expired', 'paused')),
  billing_cycle TEXT NOT NULL CHECK (billing_cycle IN ('monthly', 'yearly')),

  -- Dates
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  cancelled_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- One subscription per user
  UNIQUE(user_id)
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_ls_subscription_id ON public.subscriptions(ls_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);

-- Enable Row Level Security
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for re-running)
DROP POLICY IF EXISTS "Users can read own subscription" ON public.subscriptions;
DROP POLICY IF EXISTS "Service role can manage subscriptions" ON public.subscriptions;

-- Users can read their own subscription
CREATE POLICY "Users can read own subscription"
  ON public.subscriptions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Service role can manage all subscriptions (for webhooks)
CREATE POLICY "Service role can manage subscriptions"
  ON public.subscriptions
  FOR ALL
  USING (auth.role() = 'service_role');

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_subscription_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists (for re-running)
DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON public.subscriptions;

-- Create trigger to update updated_at on row updates
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_subscription_updated_at();

-- Grant permissions
GRANT ALL ON public.subscriptions TO authenticated;
GRANT ALL ON public.subscriptions TO service_role;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Subscriptions table created successfully!';
  RAISE NOTICE 'Table: public.subscriptions';
  RAISE NOTICE 'Indexes: 3 indexes created for performance';
  RAISE NOTICE 'RLS: Enabled with policies for users and service_role';
  RAISE NOTICE 'Trigger: Auto-update updated_at timestamp';
  RAISE NOTICE '';
  RAISE NOTICE 'Ready to accept subscriptions! 🚀';
END $$;
