-- Expose next_auth schema via PostgREST configuration
-- Run this in Supabase SQL Editor after running the main schema

-- Update the PostgREST config to expose next_auth schema
-- This is stored in the pgrst config and requires reloading

-- Method 1: Via SQL (may require superuser)
ALTER DATABASE postgres SET pgrst.db_schemas TO 'public, next_auth, graphql_public';

-- Method 2: Send reload signal
NOTIFY pgrst, 'reload config';
NOTIFY pgrst, 'reload schema';

-- Verify schemas are exposed (check after restart)
-- SELECT current_setting('pgrst.db_schemas', true);
