import { NextRequest, NextResponse } from 'next/server'
import { ACCOUNT_SESSION_COOKIE, isValidAccountSession } from '@/lib/account-auth'
import { db } from '@/lib/db'
import { ApiResponse } from '@/types'

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * GET /api/insights
 * List insights stored in the Article table.
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status') || undefined
    const companyId = searchParams.get('companyId') || undefined

    const insights = await db.insight.findMany({ status, companyId })

    return NextResponse.json<ApiResponse>({
      success: true,
      data: insights,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error fetching insights:', error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: 'Failed to fetch insights',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/insights
 * Create an insight stored as an Article with type "insight".
 */
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

    const body = await request.json()
    const title = String(body.title || '').trim()
    const content = String(body.content || '').trim()
    const companyId = String(body.companyId || '').trim()
    const authorId = String(body.authorId || '').trim()

    if (!title || !content || !companyId || !authorId) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'title, content, companyId, and authorId are required',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      )
    }

    const status = body.status === 'published' ? 'published' : 'draft'
    const insight = await db.insight.create({
      title,
      slug: String(body.slug || slugify(title)),
      excerpt: body.excerpt || null,
      content,
      category: body.category || 'interoperability',
      tags: Array.isArray(body.tags) ? body.tags : [],
      status,
      publishedAt: status === 'published' ? new Date() : null,
      companyId,
      authorId,
    })

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: insight,
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating insight:', error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: 'Failed to create insight',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
