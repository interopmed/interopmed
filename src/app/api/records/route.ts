import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { ApiResponse } from '@/types'

/**
 * POST /api/articles
 * Create a new article
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const article = await db.prisma.article.create({
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        excerpt: body.excerpt,
        type: body.type,
        category: body.category,
        authorId: body.authorId,
        companyId: body.companyId,
      },
    })

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: article,
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: 'Failed to create article',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
