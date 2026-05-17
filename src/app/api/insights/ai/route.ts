import { NextRequest, NextResponse } from 'next/server'
import { ACCOUNT_SESSION_COOKIE, isValidAccountSession } from '@/lib/account-auth'
import { db } from '@/lib/db'
import {
  GeminiAccessError,
  generateAndStoreFeaturedImage,
  generateInsightDraft,
  type InsightAgentInput,
} from '@/lib/gemini-insights'
import { slugify } from '@/lib/slugify'
import { publishSocialPosts, type SocialPlatform } from '@/lib/social-posting'
import { ApiResponse } from '@/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type InsightAgentRequest = InsightAgentInput & {
  companyId?: string
  authorId?: string
  status?: string
  generateImage?: boolean
  publishSocial?: boolean
  platforms?: SocialPlatform[]
}

function getOrigin(request: NextRequest) {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    request.headers.get('origin') ||
    `${request.nextUrl.protocol}//${request.nextUrl.host}`
  )
}

async function getUniqueSlug(baseSlug: string) {
  const fallback = slugify(baseSlug) || `insight-${Date.now()}`
  let candidate = fallback
  let suffix = 2

  while (await db.prisma.article.findUnique({ where: { slug: candidate } })) {
    candidate = `${fallback}-${suffix}`
    suffix += 1
  }

  return candidate
}

function normalizePlatforms(value: unknown): SocialPlatform[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter((platform): platform is SocialPlatform => platform === 'linkedin' || platform === 'x')
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

    const body = (await request.json()) as InsightAgentRequest
    const topic = String(body.topic || '').trim()
    const companyId = String(body.companyId || '').trim()
    const authorId = String(body.authorId || '').trim()

    if (!topic || !companyId || !authorId) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'topic, companyId, and authorId are required',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      )
    }

    const draft = await generateInsightDraft({
      topic,
      audience: body.audience,
      category: body.category,
      tone: body.tone,
    })
    const slug = await getUniqueSlug(draft.slug)
    let featuredImage: string | null = null
    let imageError: string | undefined

    if (body.generateImage !== false) {
      try {
        const image = await generateAndStoreFeaturedImage(draft.imagePrompt, slug)
        featuredImage = image.url
      } catch (error) {
        imageError = error instanceof Error ? error.message : 'Featured image generation failed'
      }
    }

    const status = body.status === 'published' ? 'published' : 'draft'
    const insight = await db.insight.create({
      title: draft.title,
      slug,
      excerpt: draft.excerpt,
      content: draft.content,
      category: draft.category,
      tags: draft.tags,
      featuredImage,
      metaDescription: draft.metaDescription,
      metaKeywords: draft.metaKeywords,
      status,
      publishedAt: status === 'published' ? new Date() : null,
      companyId,
      authorId,
    })
    const platforms = normalizePlatforms(body.platforms)
    const socialResults =
      body.publishSocial && platforms.length > 0
        ? await publishSocialPosts({
            platforms,
            url: `${getOrigin(request)}/insights/${slug}`,
            posts: draft.socialPosts,
          })
        : []

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: {
          insight,
          draft,
          featuredImage,
          imageError,
          socialResults,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error running insight agent:', error)
    const isAccessError = error instanceof GeminiAccessError

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to run insight agent',
        timestamp: new Date().toISOString(),
      },
      { status: isAccessError ? 403 : 500 }
    )
  }
}
