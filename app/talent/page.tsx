'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface Talent {
  id: string
  name: string
  firstName: string
  lastName: string
  title: string
  location: string
  country: string
  city: string
  experience: string
  hourlyRate: number | null
  availability: string
  skills: string[]
  languages: Array<{ language: string; proficiency: string }>
  photo: string | null
  verified: boolean
  rating: number
}

export default function TalentPage() {
  const [talents, setTalents] = useState<Talent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    skill: '',
    experience: '',
    location: '',
    availability: '',
    verifiedOnly: false,
  })
  const [showFilters, setShowFilters] = useState(false)

  const skills = ['Sales', 'Translation', 'Event Planning', 'Marketing', 'Photography', 'Tech Support']
  const experienceLevels = ['Junior', 'Mid-level', 'Senior', 'Expert']
  const countries = ['Nigeria', 'Kenya', 'Ghana', 'South Africa', 'Egypt']
  const availabilityOptions = ['Full-time', 'Part-time', 'Contract', 'Freelance']

  // Fetch talent from API
  useEffect(() => {
    const fetchTalent = async () => {
      setLoading(true)
      setError('')

      try {
        // Build query string
        const params = new URLSearchParams()
        if (searchQuery) params.append('search', searchQuery)
        if (filters.skill) params.append('skill', filters.skill)
        if (filters.experience) params.append('experience', filters.experience)
        if (filters.location) params.append('country', filters.location)
        if (filters.availability) params.append('availability', filters.availability)
        if (filters.verifiedOnly) params.append('verifiedOnly', 'true')

        const response = await fetch(\`/api/talent?\${params.toString()}\`)

        if (!response.ok) {
          throw new Error('Failed to fetch talent')
        }

        const data = await response.json()
        setTalents(data.talents || [])
      } catch (err) {
        setError('Failed to load professionals. Please try again later.')
        console.error('Error fetching talent:', err)
      } finally {
        setLoading(false)
      }
    }

    // Debounce search
    const timer = setTimeout(() => {
      fetchTalent()
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, filters])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Header Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">Find Local Talent</h1>
            <p className="text-xl text-blue-100">
              Connect with skilled professionals across Africa for your exhibitions and events
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
                    placeholder="Search by name, title, or skills..."
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
            <div className={\`\${showFilters ? 'block' : 'hidden'} md:block mt-4\`}>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.skill}
                  onChange={(e) => setFilters({ ...filters, skill: e.target.value })}
                >
                  <option value="">All Skills</option>
                  {skills.map((skill) => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>

                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.experience}
                  onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                >
                  <option value="">All Experience Levels</option>
                  {experienceLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
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

                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.availability}
                  onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                >
                  <option value="">All Availability</option>
                  {availabilityOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <label className="flex items-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={filters.verifiedOnly}
                    onChange={(e) => setFilters({ ...filters, verifiedOnly: e.target.checked })}
                  />
                  <span className="text-gray-700">Verified Only</span>
                </label>
              </div>
            </div>

            {/* Results count & Loading indicator */}
            <div className="mt-4 flex items-center gap-4">
              {loading ? (
                <div className="text-sm text-gray-600">Loading professionals...</div>
              ) : (
                <div className="text-sm text-gray-600">
                  {talents.length} professional{talents.length !== 1 ? 's' : ''} found
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Talent Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 animate-pulse">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          ) : talents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No professionals found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setFilters({ skill: '', experience: '', location: '', availability: '', verifiedOnly: false })
                }}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {talents.map((person) => (
                <div
                  key={person.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200"
                >
                  {/* Profile Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                      {person.firstName.charAt(0)}{person.lastName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900">{person.name}</h3>
                        {person.verified && (
                          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">{person.title}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={\`w-4 h-4 \${i < Math.floor(person.rating) ? 'fill-current' : 'fill-gray-300'}\`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">({person.rating.toFixed(1)})</span>
                      </div>
                    </div>
                  </div>

                  {/* Location and Rate */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {person.location}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{person.experience}</span>
                      <span className="text-sm text-gray-600">{person.availability}</span>
                    </div>
                    {person.hourlyRate && (
                      <div className="text-lg font-semibold text-blue-600">
                        \${person.hourlyRate}/hour
                      </div>
                    )}
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {person.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {person.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          +{person.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Languages</h4>
                    <p className="text-sm text-gray-600">
                      {person.languages.slice(0, 2).map((lang) => lang.language).join(', ')}
                      {person.languages.length > 2 && \` +\${person.languages.length - 2} more\`}
                    </p>
                  </div>

                  {/* Action Button */}
                  <Link
                    href={\`/talent/\${person.id}\`}
                    className="block w-full text-center btn bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Profile
                  </Link>
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
