import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { verifyPassword } from '@/app/lib/hash'
import { createToken, setAuthCookie } from '@/app/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, userType } = body

    // Validate required fields
    if (!email || !password || !userType) {
      return NextResponse.json(
        { error: 'Email, password, and user type are required' },
        { status: 400 }
      )
    }

    // Find user based on type
    if (userType === 'talent') {
      const user = await prisma.localStaff.findUnique({
        where: { email },
      })

      if (!user || !verifyPassword(password, user.password)) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        )
      }

      // Create auth token
      const token = await createToken({
        id: user.id,
        email: user.email,
        type: 'localStaff',
      })

      // Set cookie
      await setAuthCookie(token)

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          type: 'localStaff',
          name: `${user.firstName} ${user.lastName}`,
        },
      })
    } else if (userType === 'organization') {
      const user = await prisma.organization.findUnique({
        where: { email },
      })

      if (!user || !verifyPassword(password, user.password)) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        )
      }

      // Create auth token
      const token = await createToken({
        id: user.id,
        email: user.email,
        type: 'organization',
      })

      // Set cookie
      await setAuthCookie(token)

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          type: 'organization',
          name: user.companyName,
        },
      })
    } else {
      return NextResponse.json(
        { error: 'Invalid user type' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    )
  }
}
