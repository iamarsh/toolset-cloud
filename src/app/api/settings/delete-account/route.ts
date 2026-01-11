import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createServerClient } from '@/lib/db/supabase'

/**
 * DELETE /api/settings/delete-account
 * Permanently deletes user account and all associated data
 * Cascading deletes handle related records (tool_runs, preferences, etc.)
 */
export async function DELETE() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createServerClient() as any

    // Delete user (cascading deletes handle all related data via foreign keys)
    const { error } = await supabase.from('users').delete().eq('id', session.user.id)

    if (error) {
      console.error('Delete account error:', error)
      throw new Error(`Delete failed: ${error.message}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Account deletion error:', error)
    return NextResponse.json({ error: 'Deletion failed' }, { status: 500 })
  }
}
