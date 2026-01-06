import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getAllToolConfigs } from '@/lib/db/queries'
import { getToolById } from '@/lib/tools'

/**
 * GET /api/saved-configs
 * Fetches all saved configurations and favorited tools for the authenticated user
 */
export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Fetch all configs (includes both favorited and saved configs)
    const rawConfigs = await getAllToolConfigs(session.user.id)

    // Enrich with tool names from registry
    const configs = rawConfigs.map((config: any) => {
      const tool = getToolById(config.tool_id)
      return {
        ...config,
        tool_name: tool?.name || config.tool_id,
        tool_slug: tool?.slug || config.tool_id,
      }
    })

    return NextResponse.json({
      configs,
      count: configs.length,
    })
  } catch (error) {
    console.error('Error fetching saved configs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch saved configurations' },
      { status: 500 }
    )
  }
}
