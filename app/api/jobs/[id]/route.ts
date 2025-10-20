import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

// GET /api/jobs/[id] - Fetch single job details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        organization: {
          select: {
            id: true,
            companyName: true,
            description: true,
            industry: true,
            website: true,
            verified: true,
            logo: true,
          },
        },
        _count: {
          select: {
            applications: true,
          },
        },
      },
    })

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    // Increment view count
    await prisma.job.update({
      where: { id },
      data: { views: { increment: 1 } },
    })

    // Format response
    const formattedJob = {
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
      requiredSkills: JSON.parse(job.requiredSkills || '[]'),
      experience: job.experience,
      languages: JSON.parse(job.languages || '[]'),
      status: job.status,
      views: job.views + 1, // Include the incremented view
      applicationsCount: job._count.applications,
      company: {
        id: job.organization.id,
        name: job.organization.companyName,
        description: job.organization.description,
        industry: job.organization.industry,
        website: job.organization.website,
        verified: job.organization.verified,
        logo: job.organization.logo,
      },
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
      expiresAt: job.expiresAt,
    }

    return NextResponse.json({
      success: true,
      job: formattedJob,
    })
  } catch (error) {
    console.error('Error fetching job:', error)
    return NextResponse.json(
      { error: 'Failed to fetch job details' },
      { status: 500 }
    )
  }
}
