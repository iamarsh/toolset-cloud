import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getUserFavorites } from '@/lib/db/queries'

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

    // Fetch all favorites and configs (they're stored in the same table)
    const configs = await getUserFavorites(session.user.id)

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
