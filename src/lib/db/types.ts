// Database type definitions
// Generated types for Supabase tables in next_auth schema
// IMPORTANT: NextAuth core tables use camelCase columns (emailVerified, userId, sessionToken)
// Workspace tables use snake_case columns (user_id, created_at, etc.)

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  next_auth: {
    Tables: {
      // NextAuth core table - camelCase columns required by adapter
      users: {
        Row: {
          id: string
          email: string
          emailVerified: string | null  // camelCase!
          name: string | null
          image: string | null
          plan: 'PUBLIC' | 'FREE_ACCOUNT' | 'PRO'
        }
        Insert: {
          id?: string
          email: string
          emailVerified?: string | null  // camelCase!
          name?: string | null
          image?: string | null
          plan?: 'PUBLIC' | 'FREE_ACCOUNT' | 'PRO'
        }
        Update: {
          id?: string
          email?: string
          emailVerified?: string | null  // camelCase!
          name?: string | null
          image?: string | null
          plan?: 'PUBLIC' | 'FREE_ACCOUNT' | 'PRO'
        }
      }
      // NextAuth accounts table - camelCase columns required by adapter
      accounts: {
        Row: {
          id: string
          userId: string  // camelCase!
          type: string
          provider: string
          providerAccountId: string  // camelCase!
          refresh_token: string | null
          access_token: string | null
          expires_at: number | null
          token_type: string | null
          scope: string | null
          id_token: string | null
          session_state: string | null
        }
        Insert: {
          id?: string
          userId: string  // camelCase!
          type: string
          provider: string
          providerAccountId: string  // camelCase!
          refresh_token?: string | null
          access_token?: string | null
          expires_at?: number | null
          token_type?: string | null
          scope?: string | null
          id_token?: string | null
          session_state?: string | null
        }
        Update: {
          id?: string
          userId?: string  // camelCase!
          type?: string
          provider?: string
          providerAccountId?: string  // camelCase!
          refresh_token?: string | null
          access_token?: string | null
          expires_at?: number | null
          token_type?: string | null
          scope?: string | null
          id_token?: string | null
          session_state?: string | null
        }
      }
      // NextAuth sessions table - camelCase columns required by adapter
      sessions: {
        Row: {
          id: string
          sessionToken: string  // camelCase!
          userId: string  // camelCase!
          expires: string
        }
        Insert: {
          id?: string
          sessionToken: string  // camelCase!
          userId: string  // camelCase!
          expires: string
        }
        Update: {
          id?: string
          sessionToken?: string  // camelCase!
          userId?: string  // camelCase!
          expires?: string
        }
      }
      // NextAuth verification tokens table
      verification_tokens: {
        Row: {
          identifier: string
          token: string
          expires: string
        }
        Insert: {
          identifier: string
          token: string
          expires: string
        }
        Update: {
          identifier?: string
          token?: string
          expires?: string
        }
      }
      // Workspace tables - snake_case columns for consistency
      tool_runs: {
        Row: {
          id: string
          user_id: string
          tool_id: string
          tool_slug: string
          inputs: Json | null
          outputs: Json | null
          status: 'pending' | 'completed' | 'failed'
          runtime_ms: number | null
          error_message: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tool_id: string
          tool_slug: string
          inputs?: Json | null
          outputs?: Json | null
          status?: 'pending' | 'completed' | 'failed'
          runtime_ms?: number | null
          error_message?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tool_id?: string
          tool_slug?: string
          inputs?: Json | null
          outputs?: Json | null
          status?: 'pending' | 'completed' | 'failed'
          runtime_ms?: number | null
          error_message?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tool_configs: {
        Row: {
          id: string
          user_id: string
          tool_id: string
          tool_slug: string
          name: string
          config: Json
          is_favorite: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tool_id: string
          tool_slug: string
          name: string
          config: Json
          is_favorite?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tool_id?: string
          tool_slug?: string
          name?: string
          config?: Json
          is_favorite?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_preferences: {
        Row: {
          user_id: string
          theme: 'light' | 'dark' | 'system'
          recent_tools_limit: number
          email_notifications: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          theme?: 'light' | 'dark' | 'system'
          recent_tools_limit?: number
          email_notifications?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          theme?: 'light' | 'dark' | 'system'
          recent_tools_limit?: number
          email_notifications?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      email_deliveries: {
        Row: {
          id: string
          user_id: string
          tool_run_id: string | null
          recipient_email: string
          subject: string
          status: 'pending' | 'sent' | 'failed'
          resend_id: string | null
          error_message: string | null
          expires_at: string | null
          created_at: string
          sent_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          tool_run_id?: string | null
          recipient_email: string
          subject: string
          status?: 'pending' | 'sent' | 'failed'
          resend_id?: string | null
          error_message?: string | null
          expires_at?: string | null
          created_at?: string
          sent_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          tool_run_id?: string | null
          recipient_email?: string
          subject?: string
          status?: 'pending' | 'sent' | 'failed'
          resend_id?: string | null
          error_message?: string | null
          expires_at?: string | null
          created_at?: string
          sent_at?: string | null
        }
      }
      ai_usage: {
        Row: {
          id: string
          user_id: string
          tool_run_id: string | null
          tokens_used: number
          model: string | null
          cost_cents: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tool_run_id?: string | null
          tokens_used: number
          model?: string | null
          cost_cents?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tool_run_id?: string | null
          tokens_used?: number
          model?: string | null
          cost_cents?: number | null
          created_at?: string
        }
      }
    }
    Functions: {
      get_monthly_ai_usage: {
        Args: { p_user_id: string }
        Returns: number
      }
      get_daily_ai_usage: {
        Args: { p_user_id: string }
        Returns: number
      }
      get_monthly_email_count: {
        Args: { p_user_id: string }
        Returns: number
      }
    }
  }
}

// Helper types for common operations
export type ToolRun = Database['next_auth']['Tables']['tool_runs']['Row']
export type ToolRunInsert = Database['next_auth']['Tables']['tool_runs']['Insert']
export type ToolRunUpdate = Database['next_auth']['Tables']['tool_runs']['Update']

export type ToolConfig = Database['next_auth']['Tables']['tool_configs']['Row']
export type ToolConfigInsert = Database['next_auth']['Tables']['tool_configs']['Insert']
export type ToolConfigUpdate = Database['next_auth']['Tables']['tool_configs']['Update']

export type UserPreferences = Database['next_auth']['Tables']['user_preferences']['Row']
export type UserPreferencesInsert = Database['next_auth']['Tables']['user_preferences']['Insert']
export type UserPreferencesUpdate = Database['next_auth']['Tables']['user_preferences']['Update']

export type EmailDelivery = Database['next_auth']['Tables']['email_deliveries']['Row']
export type AIUsage = Database['next_auth']['Tables']['ai_usage']['Row']
