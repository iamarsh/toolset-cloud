import { createServerClient } from '@/lib/db/supabase'
import type { Database } from '@/lib/db/types'

type ToolRun = Database['next_auth']['Tables']['tool_runs']['Row']
type ToolRunInsert = Database['next_auth']['Tables']['tool_runs']['Insert']
type ToolRunUpdate = Database['next_auth']['Tables']['tool_runs']['Update']

/**
 * Tool Runs Query Layer
 *
 * Provides typed functions for interacting with tool execution history.
 * All functions use server-side client with service role key.
 */

/**
 * Create a new tool run record
 */
export async function createToolRun(data: ToolRunInsert): Promise<ToolRun> {
  const supabase = createServerClient() as any

  const { data: toolRun, error } = await supabase
    .from('tool_runs')
    .insert(data)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create tool run: ${error.message}`)
  }

  return toolRun as unknown as ToolRun
}

/**
 * Get a single tool run by ID
 */
export async function getToolRun(id: string): Promise<ToolRun> {
  const supabase = createServerClient() as any

  const { data: toolRun, error } = await supabase
    .from('tool_runs')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Failed to get tool run: ${error.message}`)
  }

  return toolRun as unknown as ToolRun
}

/**
 * Get recent tool runs for a user
 * @param userId - User ID to filter by
 * @param limit - Maximum number of runs to return (default: 10)
 */
export async function getRecentToolRuns(userId: string, limit = 10): Promise<ToolRun[]> {
  const supabase = createServerClient() as any

  const { data: toolRuns, error } = await supabase
    .from('tool_runs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    throw new Error(`Failed to get recent tool runs: ${error.message}`)
  }

  return (toolRuns || []) as unknown as ToolRun[]
}

/**
 * Get tool runs for a specific tool
 * @param userId - User ID to filter by
 * @param toolId - Tool ID to filter by
 * @param limit - Maximum number of runs to return (default: 20)
 */
export async function getToolRunsByTool(userId: string, toolId: string, limit = 20): Promise<ToolRun[]> {
  const supabase = createServerClient() as any

  const { data: toolRuns, error } = await supabase
    .from('tool_runs')
    .select('*')
    .eq('user_id', userId)
    .eq('tool_id', toolId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    throw new Error(`Failed to get tool runs: ${error.message}`)
  }

  return (toolRuns || []) as unknown as ToolRun[]
}

/**
 * Get paginated tool run history
 * @param userId - User ID to filter by
 * @param page - Page number (1-indexed)
 * @param pageSize - Number of runs per page (default: 20)
 */
export async function getToolRunHistory(
  userId: string,
  page = 1,
  pageSize = 20
) {
  const supabase = createServerClient() as any

  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data: toolRuns, error, count } = await supabase
    .from('tool_runs')
    .select('*', { count: 'exact' })
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    throw new Error(`Failed to get tool run history: ${error.message}`)
  }

  return {
    data: toolRuns || [],
    count: count || 0,
    page,
    pageSize,
    totalPages: Math.ceil((count || 0) / pageSize),
  }
}

/**
 * Get tool run statistics for a user
 */
export async function getToolRunStats(userId: string) {
  const supabase = createServerClient() as any

  // Get total runs
  const { count: totalRuns, error: countError } = await supabase
    .from('tool_runs')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)

  if (countError) {
    throw new Error(`Failed to get tool run count: ${countError.message}`)
  }

  // Get runs by status
  const { data: statusData, error: statusError } = await supabase
    .from('tool_runs')
    .select('status')
    .eq('user_id', userId)

  if (statusError) {
    throw new Error(`Failed to get status data: ${statusError.message}`)
  }

  const statusCounts = (statusData || []).reduce((acc: Record<string, number>, run: any) => {
    acc[run.status] = (acc[run.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Get most used tools
  const { data: toolData, error: toolError } = await supabase
    .from('tool_runs')
    .select('tool_id, tool_slug')
    .eq('user_id', userId)

  if (toolError) {
    throw new Error(`Failed to get tool data: ${toolError.message}`)
  }

  type ToolCount = { tool_id: string; tool_slug: string; count: number }

  const toolCounts = (toolData || []).reduce((acc: Record<string, ToolCount>, run: any) => {
    const key = run.tool_id
    if (!acc[key]) {
      acc[key] = { tool_id: run.tool_id, tool_slug: run.tool_slug, count: 0 }
    }
    acc[key].count++
    return acc
  }, {} as Record<string, ToolCount>)

  const mostUsedTools = (Object.values(toolCounts) as ToolCount[])
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  return {
    totalRuns: totalRuns || 0,
    statusCounts,
    mostUsedTools,
  }
}

/**
 * Update a tool run (e.g., mark as completed/failed)
 */
export async function updateToolRun(id: string, updates: ToolRunUpdate): Promise<ToolRun> {
  const supabase = createServerClient() as any

  const { data: toolRun, error } = await supabase
    .from('tool_runs')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update tool run: ${error.message}`)
  }

  return toolRun as unknown as ToolRun
}

/**
 * Delete a tool run
 */
export async function deleteToolRun(id: string, userId: string) {
  const supabase = createServerClient() as any

  const { error } = await supabase
    .from('tool_runs')
    .delete()
    .eq('id', id)
    .eq('user_id', userId) // Ensure user owns the run

  if (error) {
    throw new Error(`Failed to delete tool run: ${error.message}`)
  }

  return { success: true }
}

/**
 * Delete all tool runs for a user (useful for account deletion)
 */
export async function deleteAllToolRuns(userId: string) {
  const supabase = createServerClient() as any

  const { error } = await supabase
    .from('tool_runs')
    .delete()
    .eq('user_id', userId)

  if (error) {
    throw new Error(`Failed to delete all tool runs: ${error.message}`)
  }

  return { success: true }
}

/**
 * Check if user has any tool run history
 * Used to determine first-time vs returning user
 */
export async function hasToolRunHistory(userId: string): Promise<boolean> {
  const supabase = createServerClient() as any

  const { count, error } = await supabase
    .from('tool_runs')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .limit(1)

  if (error) {
    console.error('Failed to check tool run history:', error)
    return false
  }

  return (count || 0) > 0
}

/**
 * Search tool runs by tool name or status
 */
export async function searchToolRuns(
  userId: string,
  query: {
    toolId?: string
    status?: string
    startDate?: Date
    endDate?: Date
    limit?: number
  }
): Promise<ToolRun[]> {
  const supabase = createServerClient() as any

  let queryBuilder = supabase
    .from('tool_runs')
    .select('*')
    .eq('user_id', userId)

  if (query.toolId) {
    queryBuilder = queryBuilder.eq('tool_id', query.toolId)
  }

  if (query.status) {
    queryBuilder = queryBuilder.eq('status', query.status)
  }

  if (query.startDate) {
    queryBuilder = queryBuilder.gte('created_at', query.startDate.toISOString())
  }

  if (query.endDate) {
    queryBuilder = queryBuilder.lte('created_at', query.endDate.toISOString())
  }

  queryBuilder = queryBuilder
    .order('created_at', { ascending: false })
    .limit(query.limit || 50)

  const { data: toolRuns, error } = await queryBuilder

  if (error) {
    throw new Error(`Failed to search tool runs: ${error.message}`)
  }

  return (toolRuns || []) as unknown as ToolRun[]
}
