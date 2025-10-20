import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { getUser } from '@/app/lib/auth'

// GET /api/jobs - Fetch jobs with filters and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Get filter parameters
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const type = searchParams.get('type') || ''
    const country = searchParams.get('country') || ''
    const remote = searchParams.get('remote') === 'true'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Calculate pagination
    const skip = (page - 1) * limit

    // Build filter conditions
    const where: any = {
      status: 'active', // Only show active jobs
    }

    // Search in title, description, or company name
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { organization: { companyName: { contains: search, mode: 'insensitive' } } },
      ]
    }

    // Filter by category
    if (category) {
      where.category = category
    }

    // Filter by job type
    if (type) {
      where.type = type
    }

    // Filter by country
    if (country) {
      where.country = { contains: country, mode: 'insensitive' }
    }

    // Filter by remote
    if (remote) {
      where.remote = true
    }

    // Fetch jobs with pagination
    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        include: {
          organization: {
            select: {
              id: true,
              companyName: true,
              verified: true,
              logo: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.job.count({ where }),
    ])

    // Parse JSON fields and format response
    const formattedJobs = jobs.map((job) => ({
      id: job.id,
      title: job.title,
      description: job.description,
      category: job.category,
      type: job.type,
      location: job.location,
      country: job.country,
      remote: job.remote,
      salary: job.salary,
      currency: job.currency,
      skills: JSON.parse(job.requiredSkills || '[]'),
      experience: job.experience,
      languages: JSON.parse(job.languages || '[]'),
      company: {
        id: job.organization.id,
        name: job.organization.companyName,
        verified: job.organization.verified,
        logo: job.organization.logo,
      },
      views: job.views,
      createdAt: job.createdAt,
      expiresAt: job.expiresAt,
    }))

    return NextResponse.json({
      success: true,
      jobs: formattedJobs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    )
  }
}

// POST /api/jobs - Create new job (organizations only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'You must be logged in to post jobs' },
        { status: 401 }
      )
    }

    if (user.type !== 'organization') {
      return NextResponse.json(
        { error: 'Only organizations can post jobs' },
        { status: 403 }
      )
    }

    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.description || !body.category || !body.type || !body.location || !body.country) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, category, type, location, country' },
        { status: 400 }
      )
    }

    // Create job
    const job = await prisma.job.create({
      data: {
        organizationId: user.id,
        title: body.title,
        description: body.description,
        category: body.category,
        type: body.type,
        location: body.location,
        country: body.country,
        remote: body.remote || false,
        requiredSkills: JSON.stringify(body.requiredSkills || []),
        experience: body.experience || null,
        languages: JSON.stringify(body.languages || []),
        salary: body.salary || null,
        currency: body.currency || 'USD',
        status: body.status || 'active',
        expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
      },
      include: {
        organization: {
          select: {
            id: true,
            companyName: true,
            verified: true,
            logo: true,
          },
        },
      },
    })

    return NextResponse.json(
      {
        success: true,
        job: {
          id: job.id,
          title: job.title,
          description: job.description,
          category: job.category,
          type: job.type,
          location: job.location,
          country: job.country,
          remote: job.remote,
          salary: job.salary,
          company: {
            id: job.organization.id,
            name: job.organization.companyName,
            verified: job.organization.verified,
          },
          createdAt: job.createdAt,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating job:', error)
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    )
  }
}
