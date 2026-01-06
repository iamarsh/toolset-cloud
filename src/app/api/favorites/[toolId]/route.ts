import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import {
  getToolConfigsByTool,
  createToolConfig,
  deleteToolConfig,
} from '@/lib/db/queries'
import type { Database } from '@/lib/db/types'

type ToolConfig = Database['next_auth']['Tables']['tool_configs']['Row']

/**
 * GET /api/favorites/[toolId]
 *
 * Check if a tool is in the user's favorites.
 * Returns { isFavorite: boolean }
 *
 * @requires Authentication
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ toolId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { toolId } = await context.params

    // Check if a favorite config exists for this tool
    const configs: ToolConfig[] = await getToolConfigsByTool(session.user.id, toolId)
    const favorite = configs.find((c) => c.is_favorite)

    return NextResponse.json({
      success: true,
      isFavorite: !!favorite,
      favoriteId: favorite?.id,
    })
  } catch (error: any) {
    console.error('Error checking favorite:', error)
    return NextResponse.json(
      { error: 'Failed to check favorite', details: error.message },
      { status: 500 }
    )
  }
}

/**
 * POST /api/favorites/[toolId]
 *
 * Add a tool to favorites by creating a favorite config.
 * Body: { toolSlug: string, toolName: string }
 *
 * @requires Authentication
 */
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ toolId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { toolId } = await context.params
    const body = await request.json()
    const { toolSlug, toolName } = body

    if (!toolSlug || !toolName) {
      return NextResponse.json(
        { error: 'Missing toolSlug or toolName' },
        { status: 400 }
      )
    }

    // Check if already favorited
    const configs: ToolConfig[] = await getToolConfigsByTool(session.user.id, toolId)
    const existing = configs.find((c) => c.is_favorite)

    if (existing) {
      return NextResponse.json({
        success: true,
        message: 'Already favorited',
        favoriteId: existing.id,
      })
    }

    // Create a new favorite config (empty config, just for favoriting)
    const favorite = await createToolConfig({
      user_id: session.user.id,
      tool_id: toolId,
      tool_slug: toolSlug,
      name: `${toolName} (Favorite)`,
      config: {},
      is_favorite: true,
    })

    return NextResponse.json({
      success: true,
      message: 'Tool added to favorites',
      favoriteId: favorite.id,
    })
  } catch (error: any) {
    console.error('Error adding favorite:', error)
    return NextResponse.json(
      { error: 'Failed to add favorite', details: error.message },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/favorites/[toolId]
 *
 * Remove a tool from favorites by deleting the favorite config.
 *
 * @requires Authentication
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ toolId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { toolId } = await context.params

    // Find and delete the favorite config
    const configs: ToolConfig[] = await getToolConfigsByTool(session.user.id, toolId)
    const favorite = configs.find((c) => c.is_favorite)

    if (!favorite) {
      return NextResponse.json({
        success: true,
        message: 'Not favorited',
      })
    }

    await deleteToolConfig(favorite.id, session.user.id)

    return NextResponse.json({
      success: true,
      message: 'Tool removed from favorites',
    })
  } catch (error: any) {
    console.error('Error removing favorite:', error)
    return NextResponse.json(
      { error: 'Failed to remove favorite', details: error.message },
      { status: 500 }
    )
  }
}
