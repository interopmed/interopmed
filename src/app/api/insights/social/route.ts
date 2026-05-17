import { NextRequest, NextResponse } from 'next/server'
import { ACCOUNT_SESSION_COOKIE, isValidAccountSession } from '@/lib/account-auth'
import { db } from '@/lib/db'
import { publishSocialPosts, type SocialPlatform } from '@/lib/social-posting'
import { ApiResponse } from '@/types'

export const dynamic = 'force-dynamic'

function normalizePlatforms(value: unknown): SocialPlatform[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter((platform): platform is SocialPlatform => platform === 'linkedin' || platform === 'x')
}

function getOrigin(request: NextRequest) {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    request.headers.get('origin') ||
    `${request.nextUrl.protocol}//${request.nextUrl.host}`
  )
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
      insightId?: string
      slug?: string
      platforms?: SocialPlatform[]
      linkedin?: string
      x?: string
    }
    const platforms = normalizePlatforms(body.platforms)

    if (platforms.length === 0) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'At least one social platform is required',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      )
    }

    const insight = body.insightId
      ? await db.prisma.article.findUnique({ where: { id: body.insightId } })
      : body.slug
        ? await db.prisma.article.findUnique({ where: { slug: body.slug } })
        : null

    if (!insight) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Insight was not found',
          timestamp: new Date().toISOString(),
        },
        { status: 404 }
      )
    }

    const url = `${getOrigin(request)}/insights/${insight.slug}`
    const results = await publishSocialPosts({
      platforms,
      url,
      posts: {
        linkedin: body.linkedin || `${insight.title}\n\n${insight.excerpt || ''}`.trim(),
        x: body.x || `${insight.title}: ${insight.excerpt || ''}`.trim(),
      },
    })

    return NextResponse.json<ApiResponse>({
      success: true,
      data: results,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error posting insight to social platforms:', error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to post insight',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
