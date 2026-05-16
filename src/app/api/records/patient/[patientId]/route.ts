import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { ApiResponse } from '@/types'

/**
 * GET /api/articles/company/:companyId
 * Get all articles for a company
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ patientId: string }> }
) {
  const { patientId: companyId } = await params
  try {
    const articles = await db.prisma.article.findMany({
      where: { companyId, status: 'published' },
      include: { author: true },
      orderBy: { publishedAt: 'desc' },
    })

    return NextResponse.json<ApiResponse>({
      success: true,
      data: articles,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: 'Failed to fetch articles',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
