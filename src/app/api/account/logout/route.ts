import { NextResponse } from 'next/server'
import { ACCOUNT_SESSION_COOKIE } from '@/lib/account-auth'
import { ApiResponse } from '@/types'

export async function POST() {
  const response = NextResponse.json<ApiResponse>({
    success: true,
    timestamp: new Date().toISOString(),
  })

  response.cookies.set(ACCOUNT_SESSION_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  })

  return response
}
