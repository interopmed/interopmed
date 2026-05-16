import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { ApiResponse } from '@/types'

/**
 * GET /api/products/:id
 * Retrieve a specific product by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const product = await db.product.findById(id)

    if (!product) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Product not found',
          timestamp: new Date().toISOString(),
        },
        { status: 404 }
      )
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      data: product,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: 'Failed to fetch product',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/products/:id
 * Update product information
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const body = await request.json()

    const product = await db.prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        version: body.version,
        status: body.status,
      },
    })

    return NextResponse.json<ApiResponse>({
      success: true,
      data: product,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: 'Failed to update product',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
