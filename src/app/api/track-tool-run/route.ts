import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createToolRun } from '@/lib/db/queries'

/**
 * POST /api/track-tool-run
 * Records tool execution in the tool_runs table
 */
export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { tool_id, tool_slug, inputs, outputs, status, runtime_ms, error_message } = body

    // Validate required fields
    if (!tool_id || !tool_slug || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate status
    if (!['completed', 'failed', 'pending'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    // Create tool run record
    await createToolRun({
      user_id: session.user.id,
      tool_id,
      tool_slug,
      inputs,
      outputs,
      status,
      runtime_ms,
      error_message,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Track tool run error:', error)
    return NextResponse.json({ error: 'Failed to track run' }, { status: 500 })
  }
}
