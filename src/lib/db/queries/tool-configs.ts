import { createServerClient } from '@/lib/db/supabase'
import type { Database } from '@/lib/db/types'

type ToolConfig = Database['next_auth']['Tables']['tool_configs']['Row']
type ToolConfigInsert = Database['next_auth']['Tables']['tool_configs']['Insert']
type ToolConfigUpdate = Database['next_auth']['Tables']['tool_configs']['Update']

/**
 * Tool Configs Query Layer
 *
 * Provides typed functions for managing saved tool configurations.
 * Users can save, favorite, and reuse tool settings.
 */

/**
 * Create a new tool configuration
 */
export async function createToolConfig(data: ToolConfigInsert) {
  const supabase = createServerClient()

  const { data: config, error } = await supabase
    .from('tool_configs')
    .insert(data)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create tool config: ${error.message}`)
  }

  return config
}

/**
 * Get a single tool configuration by ID
 */
export async function getToolConfig(id: string, userId: string) {
  const supabase = createServerClient()

  const { data: config, error } = await supabase
    .from('tool_configs')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (error) {
    throw new Error(`Failed to get tool config: ${error.message}`)
  }

  return config
}

/**
 * Get all configurations for a specific tool
 */
export async function getToolConfigsByTool(userId: string, toolId: string) {
  const supabase = createServerClient()

  const { data: configs, error } = await supabase
    .from('tool_configs')
    .select('*')
    .eq('user_id', userId)
    .eq('tool_id', toolId)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to get tool configs: ${error.message}`)
  }

  return configs || []
}

/**
 * Get all saved configurations for a user
 */
export async function getAllToolConfigs(userId: string) {
  const supabase = createServerClient()

  const { data: configs, error } = await supabase
    .from('tool_configs')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to get all tool configs: ${error.message}`)
  }

  return configs || []
}

/**
 * Get favorite configurations for a user
 */
export async function getFavoriteToolConfigs(userId: string) {
  const supabase = createServerClient()

  const { data: configs, error } = await supabase
    .from('tool_configs')
    .select('*')
    .eq('user_id', userId)
    .eq('is_favorite', true)
    .order('updated_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to get favorite configs: ${error.message}`)
  }

  return configs || []
}

/**
 * Update a tool configuration
 */
export async function updateToolConfig(
  id: string,
  userId: string,
  updates: ToolConfigUpdate
) {
  const supabase = createServerClient()

  const { data: config, error } = await supabase
    .from('tool_configs')
    .update(updates)
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update tool config: ${error.message}`)
  }

  return config
}

/**
 * Toggle favorite status for a configuration
 */
export async function toggleFavorite(id: string, userId: string) {
  const supabase = createServerClient()

  // Get current favorite status
  const { data: current, error: fetchError } = await supabase
    .from('tool_configs')
    .select('is_favorite')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (fetchError) {
    throw new Error(`Failed to get config: ${fetchError.message}`)
  }

  // Toggle the favorite status
  const { data: config, error: updateError } = await supabase
    .from('tool_configs')
    .update({ is_favorite: !current.is_favorite })
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single()

  if (updateError) {
    throw new Error(`Failed to toggle favorite: ${updateError.message}`)
  }

  return config
}

/**
 * Delete a tool configuration
 */
export async function deleteToolConfig(id: string, userId: string) {
  const supabase = createServerClient()

  const { error } = await supabase
    .from('tool_configs')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)

  if (error) {
    throw new Error(`Failed to delete tool config: ${error.message}`)
  }

  return { success: true }
}

/**
 * Delete all configurations for a specific tool
 */
export async function deleteToolConfigsByTool(userId: string, toolId: string) {
  const supabase = createServerClient()

  const { error } = await supabase
    .from('tool_configs')
    .delete()
    .eq('user_id', userId)
    .eq('tool_id', toolId)

  if (error) {
    throw new Error(`Failed to delete tool configs: ${error.message}`)
  }

  return { success: true }
}

/**
 * Check if a configuration name already exists for a tool
 */
export async function configNameExists(
  userId: string,
  toolId: string,
  name: string,
  excludeId?: string
) {
  const supabase = createServerClient()

  let query = supabase
    .from('tool_configs')
    .select('id')
    .eq('user_id', userId)
    .eq('tool_id', toolId)
    .eq('name', name)

  if (excludeId) {
    query = query.neq('id', excludeId)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Failed to check config name: ${error.message}`)
  }

  return (data?.length || 0) > 0
}

/**
 * Get configuration count for a user
 */
export async function getToolConfigCount(userId: string) {
  const supabase = createServerClient()

  const { count, error } = await supabase
    .from('tool_configs')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)

  if (error) {
    throw new Error(`Failed to get config count: ${error.message}`)
  }

  return count || 0
}

/**
 * Get most recently used configurations
 */
export async function getRecentToolConfigs(userId: string, limit = 5) {
  const supabase = createServerClient()

  const { data: configs, error } = await supabase
    .from('tool_configs')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .limit(limit)

  if (error) {
    throw new Error(`Failed to get recent configs: ${error.message}`)
  }

  return configs || []
}

/**
 * Search configurations by name
 */
export async function searchToolConfigs(userId: string, searchTerm: string) {
  const supabase = createServerClient()

  const { data: configs, error } = await supabase
    .from('tool_configs')
    .select('*')
    .eq('user_id', userId)
    .ilike('name', `%${searchTerm}%`)
    .order('updated_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to search configs: ${error.message}`)
  }

  return configs || []
}

/**
 * Duplicate a configuration with a new name
 */
export async function duplicateToolConfig(
  id: string,
  userId: string,
  newName: string
) {
  const supabase = createServerClient()

  // Get the original config
  const { data: original, error: fetchError } = await supabase
    .from('tool_configs')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (fetchError) {
    throw new Error(`Failed to get original config: ${fetchError.message}`)
  }

  // Create a duplicate with new name
  const { data: duplicate, error: createError } = await supabase
    .from('tool_configs')
    .insert({
      user_id: userId,
      tool_id: original.tool_id,
      tool_slug: original.tool_slug,
      name: newName,
      config: original.config,
      is_favorite: false, // Don't copy favorite status
    })
    .select()
    .single()

  if (createError) {
    throw new Error(`Failed to duplicate config: ${createError.message}`)
  }

  return duplicate
}
