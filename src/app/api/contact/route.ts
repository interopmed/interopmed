import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiResponse } from '@/types'

export const dynamic = 'force-dynamic'

function getClientIp(request: NextRequest) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    null
  )
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const firstName = String(body.firstName || '').trim()
    const lastName = String(body.lastName || '').trim()
    const email = String(body.email || '').trim().toLowerCase()
    const organization = String(body.organization || '').trim()
    const topic = String(body.topic || '').trim()
    const message = String(body.message || '').trim()

    if (!firstName || !lastName || !email || !topic || !message) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'firstName, lastName, email, topic, and message are required',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Enter a valid email address',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      )
    }

    const contactMessage = await prisma.contactMessage.create({
      data: {
        firstName,
        lastName,
        email,
        organization: organization || null,
        topic,
        message,
        ipAddress: getClientIp(request),
        userAgent: request.headers.get('user-agent'),
      },
    })

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: {
          id: contactMessage.id,
          createdAt: contactMessage.createdAt,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error saving contact message:', error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: 'Failed to save contact message',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
