import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

// GET /api/talent - Fetch talent/professionals with filters and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Get filter parameters
    const search = searchParams.get('search') || ''
    const skill = searchParams.get('skill') || ''
    const experience = searchParams.get('experience') || ''
    const country = searchParams.get('country') || ''
    const availability = searchParams.get('availability') || ''
    const verifiedOnly = searchParams.get('verifiedOnly') === 'true'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')

    // Calculate pagination
    const skip = (page - 1) * limit

    // Build filter conditions
    const where: any = {
      available: true, // Only show available talent
    }

    // Search in name, title, or bio
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } },
        { bio: { contains: search, mode: 'insensitive' } },
        { skills: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Filter by skill (searches in JSON string)
    if (skill) {
      where.skills = { contains: skill, mode: 'insensitive' }
    }

    // Filter by experience level
    if (experience) {
      where.experience = experience
    }

    // Filter by country
    if (country) {
      where.country = { contains: country, mode: 'insensitive' }
    }

    // Filter by availability
    if (availability) {
      where.availability = availability
    }

    // Filter by verified
    if (verifiedOnly) {
      where.verified = true
    }

    // Fetch talent with pagination
    const [talents, total] = await Promise.all([
      prisma.localStaff.findMany({
        where,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
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
          portfolio: true,
          linkedin: true,
          photo: true,
          verified: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.localStaff.count({ where }),
    ])

    // Parse JSON fields and format response
    const formattedTalents = talents.map((talent) => ({
      id: talent.id,
      name: `${talent.firstName} ${talent.lastName}`,
      firstName: talent.firstName,
      lastName: talent.lastName,
      email: talent.email,
      phone: talent.phone,
      location: `${talent.city}, ${talent.country}`,
      country: talent.country,
      city: talent.city,
      title: talent.title,
      bio: talent.bio,
      experience: talent.experience,
      hourlyRate: talent.hourlyRate,
      availability: talent.availability,
      skills: JSON.parse(talent.skills || '[]'),
      languages: JSON.parse(talent.languages || '[]'),
      portfolio: talent.portfolio,
      linkedin: talent.linkedin,
      photo: talent.photo,
      verified: talent.verified,
      // Mock rating for now (you can add a rating system later)
      rating: 4.5 + Math.random() * 0.5,
      createdAt: talent.createdAt,
    }))

    return NextResponse.json({
      success: true,
      talents: formattedTalents,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching talent:', error)
    return NextResponse.json(
      { error: 'Failed to fetch talent' },
      { status: 500 }
    )
  }
}
