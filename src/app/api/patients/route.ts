import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { ApiResponse, PaginatedResponse } from '@/types'

/**
 * GET /api/products?companyId=xxx&page=1&limit=20
 * List products for a company
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const companyId = searchParams.get('companyId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100)

    if (!companyId) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'companyId is required',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      )
    }

    const skip = (page - 1) * limit
    const [products, total] = await Promise.all([
      db.prisma.product.findMany({
        where: { companyId, status: 'active' },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { features: true },
      }),
      db.prisma.product.count({
        where: { companyId, status: 'active' },
      }),
    ])

    const response: PaginatedResponse<typeof products[number]> = {
      data: products,
      total,
      page,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      data: response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: 'Failed to fetch products',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/products
 * Create a new product
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const product = await db.prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        type: body.type,
        category: body.category,
        companyId: body.companyId,
        version: body.version || '1.0.0',
      },
    })

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: product,
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: 'Failed to create product',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
