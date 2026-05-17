import { NextRequest, NextResponse } from 'next/server'
import { ACCOUNT_SESSION_COOKIE, isValidAccountSession } from '@/lib/account-auth'
import {
  GeminiAccessError,
  chatWithInsightAgent,
  type InsightChatMessage,
} from '@/lib/gemini-insights'
import { ApiResponse } from '@/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function normalizeMessages(value: unknown): InsightChatMessage[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map((message) => {
      const item = message as { role?: unknown; content?: unknown }
      const role: InsightChatMessage['role'] = item.role === 'assistant' ? 'assistant' : 'user'

      return {
        role,
        content: String(item.content || '').trim(),
      }
    })
    .filter((message) => message.content)
}

export async function POST(request: NextRequest) {
  try {
    const session = request.cookies.get(ACCOUNT_SESSION_COOKIE)?.value

    if (!isValidAccountSession(session)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Account login is required',
          timestamp: new Date().toISOString(),
        },
        { status: 401 }
      )
    }

    const body = (await request.json()) as {
      messages?: InsightChatMessage[]
      draft?: string
      context?: string
    }
    const messages = normalizeMessages(body.messages)

    if (messages.length === 0) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'At least one chat message is required',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      )
    }

    const response = await chatWithInsightAgent({
      messages,
      draft: body.draft,
      context: body.context,
    })

    return NextResponse.json<ApiResponse>({
      success: true,
      data: response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error chatting with insight agent:', error)
    const isAccessError = error instanceof GeminiAccessError

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to chat with insight agent',
        timestamp: new Date().toISOString(),
      },
      { status: isAccessError ? 403 : 500 }
    )
  }
}
