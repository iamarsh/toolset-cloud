import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getRecentToolRuns } from '@/lib/db/queries'

/**
 * GET /api/tools/recent
 *
 * Returns the most recent tool runs for the authenticated user.
 * Used for the "Recent Tools" dropdown in the header.
 *
 * Query params:
 * - limit: Number of recent tools to return (default: 5, max: 20)
 *
 * @requires Authentication
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get limit from query params
    const searchParams = request.nextUrl.searchParams
    const limitParam = searchParams.get('limit')
    const limit = limitParam ? Math.min(parseInt(limitParam, 10), 20) : 5

    if (isNaN(limit) || limit < 1) {
      return NextResponse.json(
        { error: 'Invalid limit parameter' },
        { status: 400 }
      )
    }

    // Fetch recent tool runs
    const toolRuns = await getRecentToolRuns(session.user.id, limit)

    // Transform to unique tools (deduplicate by tool_id)
    const uniqueTools = new Map<string, typeof toolRuns[0]>()

    for (const run of toolRuns) {
      if (!uniqueTools.has(run.tool_id)) {
        uniqueTools.set(run.tool_id, run)
      }
    }

    const recentTools = Array.from(uniqueTools.values()).map(run => ({
      toolId: run.tool_id,
      toolSlug: run.tool_slug,
      lastUsed: run.created_at,
      status: run.status,
    }))

    return NextResponse.json({
      success: true,
      data: recentTools,
      count: recentTools.length,
    })
  } catch (error: any) {
    console.error('Error fetching recent tools:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recent tools', details: error.message },
      { status: 500 }
    )
  }
}
