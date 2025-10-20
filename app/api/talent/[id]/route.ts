import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

// GET /api/talent/[id] - Fetch single talent profile
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const talent = await prisma.localStaff.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        country: true,
        city: true,
        dateOfBirth: true,
        title: true,
        bio: true,
        experience: true,
        hourlyRate: true,
        availability: true,
        skills: true,
        languages: true,
        portfolio: true,
        linkedin: true,
        resume: true,
        photo: true,
        verified: true,
        available: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            applications: true,
          },
        },
      },
    })

    if (!talent) {
      return NextResponse.json(
        { error: 'Talent profile not found' },
        { status: 404 }
      )
    }

    // Format response
    const formattedTalent = {
      id: talent.id,
      name: `${talent.firstName} ${talent.lastName}`,
      firstName: talent.firstName,
      lastName: talent.lastName,
      email: talent.email,
      phone: talent.phone,
      location: `${talent.city}, ${talent.country}`,
      country: talent.country,
      city: talent.city,
      dateOfBirth: talent.dateOfBirth,
      title: talent.title,
      bio: talent.bio,
      experience: talent.experience,
      hourlyRate: talent.hourlyRate,
      availability: talent.availability,
      skills: JSON.parse(talent.skills || '[]'),
      languages: JSON.parse(talent.languages || '[]'),
      portfolio: talent.portfolio,
      linkedin: talent.linkedin,
      resume: talent.resume,
      photo: talent.photo,
      verified: talent.verified,
      available: talent.available,
      applicationsCount: talent._count.applications,
      // Mock rating (you can add a rating system later)
      rating: 4.5 + Math.random() * 0.5,
      joinedAt: talent.createdAt,
      updatedAt: talent.updatedAt,
    }

    return NextResponse.json({
      success: true,
      talent: formattedTalent,
    })
  } catch (error) {
    console.error('Error fetching talent:', error)
    return NextResponse.json(
      { error: 'Failed to fetch talent profile' },
      { status: 500 }
    )
  }
}
