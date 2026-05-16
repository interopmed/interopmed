import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { ApiResponse } from '@/types'

/**
 * GET /api/health
 * Health check endpoint
 */
export async function GET() {
  try {
    // Verify database connection
    await db.prisma.$queryRaw`SELECT 1`

    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: 'Database connection failed',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    )
  }
}
