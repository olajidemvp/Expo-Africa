'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

// Mock data for demonstration
const mockJobs = [
  {
    id: '1',
    title: 'Senior Sales Agent for Tech Conference',
    company: 'TechExpo International',
    location: 'Lagos, Nigeria',
    type: 'Contract',
    category: 'Sales',
    salary: '$2,000 - $3,000/month',
    remote: false,
    description: 'Seeking experienced sales agents for our upcoming technology conference.',
    skills: ['Sales', 'Customer Service', 'Networking'],
    posted: '2 days ago',
  },
  {
    id: '2',
    title: 'English-French Translator',
    company: 'Global Events Ltd',
    location: 'Nairobi, Kenya',
    type: 'Freelance',
    category: 'Translation',
    salary: '$50/hour',
    remote: true,
    description: 'Need translator for international business summit.',
    skills: ['Translation', 'English', 'French'],
    posted: '1 day ago',
  },
  {
    id: '3',
    title: 'Event Coordinator',
    company: 'Africa Exhibitions',
    location: 'Accra, Ghana',
    type: 'Full-time',
    category: 'Events',
    salary: '$1,500 - $2,500/month',
    remote: false,
    description: 'Coordinate and manage multiple exhibition events.',
    skills: ['Event Planning', 'Project Management', 'Communication'],
    posted: '3 days ago',
  },
  {
    id: '4',
    title: 'Digital Marketing Specialist',
    company: 'Marketing Pro Africa',
    location: 'Cairo, Egypt',
    type: 'Part-time',
    category: 'Marketing',
    salary: '$30/hour',
    remote: true,
    description: 'Manage social media and digital campaigns for exhibitions.',
    skills: ['Social Media', 'Content Creation', 'Analytics'],
    posted: '5 days ago',
  },
  {
    id: '5',
    title: 'Event Photographer',
    company: 'Visual Arts Events',
    location: 'Cape Town, South Africa',
    type: 'Contract',
    category: 'Photography',
    salary: '$800 - $1,200/event',
    remote: false,
    description: 'Capture professional photos at corporate events and exhibitions.',
    skills: ['Photography', 'Photo Editing', 'Event Coverage'],
    posted: '1 week ago',
  },
]

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    location: '',
    remote: false,
  })
  const [showFilters, setShowFilters] = useState(false)

  const categories = ['Sales', 'Translation', 'Events', 'Marketing', 'Tech Support', 'Photography', 'Logistics', 'Hospitality']
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance']
  const countries = ['Nigeria', 'Kenya', 'Ghana', 'South Africa', 'Egypt']

  // Filter jobs based on search and filters
  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !filters.category || job.category === filters.category
    const matchesType = !filters.type || job.type === filters.type
    const matchesLocation = !filters.location || job.location.includes(filters.location)
    const matchesRemote = !filters.remote || job.remote === filters.remote

    return matchesSearch && matchesCategory && matchesType && matchesLocation && matchesRemote
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Header Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">Browse Job Opportunities</h1>
            <p className="text-xl text-blue-100">
              Discover exciting opportunities with international organizations across Africa
            </p>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search jobs by title, company, or keyword..."
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <svg
                    className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Filter Button (Mobile) */}
              <button
                className="md:hidden px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                onClick={() => setShowFilters(!showFilters)}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filters
                </span>
              </button>
            </div>

            {/* Filters */}
            <div className={`${showFilters ? 'block' : 'hidden'} md:block mt-4`}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                >
                  <option value="">All Job Types</option>
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                >
                  <option value="">All Locations</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>

                <label className="flex items-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={filters.remote}
                    onChange={(e) => setFilters({ ...filters, remote: e.target.checked })}
                  />
                  <span className="text-gray-700">Remote Only</span>
                </label>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-gray-600">
              {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </section>

        {/* Jobs List */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No jobs found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setFilters({ category: '', type: '', location: '', remote: false })
                }}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 font-bold text-lg">
                            {job.company.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {job.title}
                          </h3>
                          <p className="text-gray-600 mb-2">{job.company}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {job.location}
                            </span>
                            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                              {job.type}
                            </span>
                            <span className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700">
                              {job.category}
                            </span>
                            {job.remote && (
                              <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                                Remote
                              </span>
                            )}
                          </div>
                          <p className="text-gray-700 mb-3">{job.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-end">
                      <p className="text-lg font-semibold text-gray-900 mb-2">{job.salary}</p>
                      <p className="text-sm text-gray-500 mb-4">{job.posted}</p>
                      <Link
                        href={`/jobs/${job.id}`}
                        className="btn bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
