import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getRecentToolRuns } from '@/lib/db/queries'
import { getToolById } from '@/lib/tools'

/**
 * GET /api/history
 * Fetches tool execution history for the authenticated user
 */
export async function GET(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const pageSize = 20

    // Fetch recent tool runs
    const rawRuns = await getRecentToolRuns(session.user.id, pageSize)

    // Enrich with tool names from registry
    const runs = rawRuns.map((run: any) => {
      const tool = getToolById(run.tool_id)
      return {
        ...run,
        tool_name: tool?.name || run.tool_id,
        tool_slug: tool?.slug || run.tool_id,
      }
    })

    return NextResponse.json({
      runs,
      page,
      hasMore: runs.length === pageSize,
    })
  } catch (error) {
    console.error('Error fetching history:', error)
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    )
  }
}
