import { NextRequest, NextResponse } from 'next/server'
import {
  ACCOUNT_SESSION_COOKIE,
  getAccountSessionValue,
  isValidAccountPassword,
} from '@/lib/account-auth'
import { ApiResponse } from '@/types'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const password = String(body.password || '')

  if (!isValidAccountPassword(password)) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: 'Invalid password',
        timestamp: new Date().toISOString(),
      },
      { status: 401 }
    )
  }

  const response = NextResponse.json<ApiResponse>({
    success: true,
    timestamp: new Date().toISOString(),
  })

  response.cookies.set(ACCOUNT_SESSION_COOKIE, getAccountSessionValue(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  })

  return response
}
