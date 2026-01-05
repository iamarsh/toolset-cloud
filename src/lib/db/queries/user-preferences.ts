import { createServerClient } from '@/lib/db/supabase'
import type { Database } from '@/lib/db/types'

type UserPreferences = Database['next_auth']['Tables']['user_preferences']['Row']
type UserPreferencesInsert = Database['next_auth']['Tables']['user_preferences']['Insert']
type UserPreferencesUpdate = Database['next_auth']['Tables']['user_preferences']['Update']

/**
 * User Preferences Query Layer
 *
 * Provides typed functions for managing user settings.
 * Each user has exactly one preferences record (one-to-one with users table).
 */

/**
 * Get user preferences
 * Creates default preferences if they don't exist
 */
export async function getUserPreferences(userId: string): Promise<UserPreferences> {
  const supabase = createServerClient()

  const { data: prefs, error } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', userId)
    .single()

  // If preferences don't exist, create them with defaults
  if (error?.code === 'PGRST116') {
    return createUserPreferences(userId)
  }

  if (error) {
    throw new Error(`Failed to get user preferences: ${error.message}`)
  }

  return prefs
}

/**
 * Create user preferences with defaults
 * Called automatically when a user signs up
 */
export async function createUserPreferences(
  userId: string,
  overrides?: Partial<UserPreferencesInsert>
): Promise<UserPreferences> {
  const supabase = createServerClient()

  const defaults: UserPreferencesInsert = {
    user_id: userId,
    theme: 'system',
    recent_tools_limit: 10,
    email_notifications: true,
    ...overrides,
  }

  const { data: prefs, error } = await supabase
    .from('user_preferences')
    .insert(defaults)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create user preferences: ${error.message}`)
  }

  return prefs
}

/**
 * Update user preferences
 */
export async function updateUserPreferences(
  userId: string,
  updates: UserPreferencesUpdate
): Promise<UserPreferences> {
  const supabase = createServerClient()

  const { data: prefs, error } = await supabase
    .from('user_preferences')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update user preferences: ${error.message}`)
  }

  return prefs
}

/**
 * Update theme preference
 */
export async function updateTheme(
  userId: string,
  theme: 'light' | 'dark' | 'system'
): Promise<UserPreferences> {
  return updateUserPreferences(userId, { theme })
}

/**
 * Update recent tools limit
 */
export async function updateRecentToolsLimit(
  userId: string,
  limit: number
): Promise<UserPreferences> {
  if (limit < 1 || limit > 50) {
    throw new Error('Recent tools limit must be between 1 and 50')
  }

  return updateUserPreferences(userId, { recent_tools_limit: limit })
}

/**
 * Toggle email notifications
 */
export async function toggleEmailNotifications(
  userId: string
): Promise<UserPreferences> {
  const supabase = createServerClient()

  // Get current setting
  const current = await getUserPreferences(userId)

  // Toggle the setting
  return updateUserPreferences(userId, {
    email_notifications: !current.email_notifications,
  })
}

/**
 * Delete user preferences
 * Used during account deletion
 */
export async function deleteUserPreferences(userId: string) {
  const supabase = createServerClient()

  const { error } = await supabase
    .from('user_preferences')
    .delete()
    .eq('user_id', userId)

  if (error) {
    throw new Error(`Failed to delete user preferences: ${error.message}`)
  }

  return { success: true }
}

/**
 * Reset preferences to defaults
 */
export async function resetUserPreferences(userId: string): Promise<UserPreferences> {
  const supabase = createServerClient()

  const defaults: UserPreferencesUpdate = {
    theme: 'system',
    recent_tools_limit: 10,
    email_notifications: true,
  }

  const { data: prefs, error } = await supabase
    .from('user_preferences')
    .update(defaults)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to reset user preferences: ${error.message}`)
  }

  return prefs
}

/**
 * Check if user has preferences record
 */
export async function hasUserPreferences(userId: string): Promise<boolean> {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('user_preferences')
    .select('user_id')
    .eq('user_id', userId)
    .single()

  if (error?.code === 'PGRST116') {
    return false
  }

  if (error) {
    throw new Error(`Failed to check user preferences: ${error.message}`)
  }

  return !!data
}

/**
 * Get or create user preferences (convenience function)
 * Ensures preferences always exist
 */
export async function ensureUserPreferences(userId: string): Promise<UserPreferences> {
  const exists = await hasUserPreferences(userId)

  if (!exists) {
    return createUserPreferences(userId)
  }

  return getUserPreferences(userId)
}

/**
 * Bulk update multiple preferences at once
 */
export async function bulkUpdatePreferences(
  userId: string,
  updates: {
    theme?: 'light' | 'dark' | 'system'
    recentToolsLimit?: number
    emailNotifications?: boolean
  }
): Promise<UserPreferences> {
  const mappedUpdates: UserPreferencesUpdate = {}

  if (updates.theme !== undefined) {
    mappedUpdates.theme = updates.theme
  }

  if (updates.recentToolsLimit !== undefined) {
    if (updates.recentToolsLimit < 1 || updates.recentToolsLimit > 50) {
      throw new Error('Recent tools limit must be between 1 and 50')
    }
    mappedUpdates.recent_tools_limit = updates.recentToolsLimit
  }

  if (updates.emailNotifications !== undefined) {
    mappedUpdates.email_notifications = updates.emailNotifications
  }

  return updateUserPreferences(userId, mappedUpdates)
}

/**
 * Get preferences for multiple users (admin function)
 * Useful for analytics or bulk operations
 */
export async function getUserPreferencesBulk(userIds: string[]): Promise<UserPreferences[]> {
  const supabase = createServerClient()

  const { data: prefs, error } = await supabase
    .from('user_preferences')
    .select('*')
    .in('user_id', userIds)

  if (error) {
    throw new Error(`Failed to get bulk preferences: ${error.message}`)
  }

  return prefs || []
}

/**
 * Get preference statistics (admin function)
 */
export async function getPreferenceStats() {
  const supabase = createServerClient()

  const { data: allPrefs, error } = await supabase
    .from('user_preferences')
    .select('theme, email_notifications, recent_tools_limit')

  if (error) {
    throw new Error(`Failed to get preference stats: ${error.message}`)
  }

  const stats = {
    total: allPrefs?.length || 0,
    themes: {
      light: 0,
      dark: 0,
      system: 0,
    },
    emailNotifications: {
      enabled: 0,
      disabled: 0,
    },
    averageRecentToolsLimit: 0,
  }

  if (allPrefs) {
    allPrefs.forEach((pref) => {
      // Count themes
      if (pref.theme === 'light') stats.themes.light++
      else if (pref.theme === 'dark') stats.themes.dark++
      else stats.themes.system++

      // Count email notifications
      if (pref.email_notifications) {
        stats.emailNotifications.enabled++
      } else {
        stats.emailNotifications.disabled++
      }
    })

    // Calculate average recent tools limit
    const totalLimit = allPrefs.reduce((sum, pref) => sum + (pref.recent_tools_limit || 10), 0)
    stats.averageRecentToolsLimit = Math.round(totalLimit / allPrefs.length)
  }

  return stats
}
