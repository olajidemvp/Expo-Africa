import { NextResponse } from 'next/server'
import { getUser } from '@/app/lib/auth'
import { prisma } from '@/app/lib/prisma'

export async function GET() {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Fetch full user details
    if (user.type === 'localStaff') {
      const profile = await prisma.localStaff.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          country: true,
          city: true,
          title: true,
          bio: true,
          experience: true,
          hourlyRate: true,
          availability: true,
          skills: true,
          languages: true,
          linkedin: true,
          portfolio: true,
          photo: true,
          verified: true,
        },
      })

      return NextResponse.json({
        ...profile,
        type: 'localStaff',
      })
    } else {
      const profile = await prisma.organization.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          email: true,
          companyName: true,
          description: true,
          industry: true,
          country: true,
          city: true,
          website: true,
          phone: true,
          logo: true,
          verified: true,
        },
      })

      return NextResponse.json({
        ...profile,
        type: 'organization',
      })
    }
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    )
  }
}
