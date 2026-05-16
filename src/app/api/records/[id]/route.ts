import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { ApiResponse } from '@/types'

/**
 * GET /api/articles/:id
 * Retrieve a specific article
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const article = await db.prisma.article.findUnique({
      where: { id },
      include: { author: true, comments: true },
    })

    if (!article) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Article not found',
          timestamp: new Date().toISOString(),
        },
        { status: 404 }
      )
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      data: article,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: 'Failed to fetch article',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/articles/:id
 * Update an article
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const body = await request.json()

    const article = await db.prisma.article.update({
      where: { id },
      data: {
        title: body.title,
        content: body.content,
        status: body.status,
      },
    })

    return NextResponse.json<ApiResponse>({
      success: true,
      data: article,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error updating article:', error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: 'Failed to update article',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
