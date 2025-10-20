import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { hashPassword } from '@/app/lib/hash'
import { createToken, setAuthCookie } from '@/app/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userType, ...data } = body

    // Validate required fields
    if (!data.email || !data.password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = hashPassword(data.password)

    // Create user based on type
    if (userType === 'talent') {
      // Check if email already exists
      const existing = await prisma.localStaff.findUnique({
        where: { email: data.email },
      })

      if (existing) {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 400 }
        )
      }

      // Create talent profile
      const user = await prisma.localStaff.create({
        data: {
          email: data.email,
          password: hashedPassword,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          country: data.country,
          city: data.city,
          dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
          title: data.title,
          bio: data.bio,
          experience: data.experience || 'Mid-level',
          hourlyRate: data.hourlyRate ? parseFloat(data.hourlyRate) : null,
          availability: data.availability || 'Full-time',
          skills: JSON.stringify(data.skills || []),
          languages: JSON.stringify(data.languages || []),
          linkedin: data.linkedin,
          portfolio: data.portfolio,
        },
      })

      // Create auth token
      const token = await createToken({
        id: user.id,
        email: user.email,
        type: 'localStaff',
      })

      // Set cookie
      await setAuthCookie(token)

      return NextResponse.json(
        {
          success: true,
          user: {
            id: user.id,
            email: user.email,
            type: 'localStaff',
            name: `${user.firstName} ${user.lastName}`,
          },
        },
        { status: 201 }
      )
    } else if (userType === 'organization') {
      // Check if email already exists
      const existing = await prisma.organization.findUnique({
        where: { email: data.email },
      })

      if (existing) {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 400 }
        )
      }

      // Create organization profile
      const user = await prisma.organization.create({
        data: {
          email: data.email,
          password: hashedPassword,
          companyName: data.companyName,
          description: data.description,
          industry: data.industry,
          country: data.country,
          city: data.city,
          website: data.website,
          phone: data.phone,
        },
      })

      // Create auth token
      const token = await createToken({
        id: user.id,
        email: user.email,
        type: 'organization',
      })

      // Set cookie
      await setAuthCookie(token)

      return NextResponse.json(
        {
          success: true,
          user: {
            id: user.id,
            email: user.email,
            type: 'organization',
            name: user.companyName,
          },
        },
        { status: 201 }
      )
    } else {
      return NextResponse.json(
        { error: 'Invalid user type' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    )
  }
}
