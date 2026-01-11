import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { updateUserPreferences } from '@/lib/db/queries'

/**
 * PATCH /api/settings/update
 * Updates user preferences (theme, email_notifications, etc.)
 */
export async function PATCH(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const updates: any = {}

    // Validate and add theme if provided
    if (body.theme !== undefined) {
      if (!['light', 'dark', 'system'].includes(body.theme)) {
        return NextResponse.json({ error: 'Invalid theme' }, { status: 400 })
      }
      updates.theme = body.theme
    }

    // Validate and add email_notifications if provided
    if (body.email_notifications !== undefined) {
      updates.email_notifications = Boolean(body.email_notifications)
    }

    // Validate and add recent_tools_limit if provided
    if (body.recent_tools_limit !== undefined) {
      const limit = parseInt(body.recent_tools_limit, 10)
      if (isNaN(limit) || limit < 1 || limit > 50) {
        return NextResponse.json({ error: 'Limit must be between 1 and 50' }, { status: 400 })
      }
      updates.recent_tools_limit = limit
    }

    // Update preferences
    await updateUserPreferences(session.user.id, updates)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Settings update error:', error)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}
