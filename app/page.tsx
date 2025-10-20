import Link from 'next/link'
import Header from './components/Header'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fadeIn">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Connect Exhibitions with Africa's Finest Talent
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  Bridge the gap between international conferences and skilled local professionals across 5 African countries.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/register?type=talent"
                    className="btn bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-center hover:bg-gray-100"
                  >
                    I'm Looking for Work
                  </Link>
                  <Link
                    href="/register?type=organization"
                    className="btn bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-center hover:bg-blue-400 border-2 border-white"
                  >
                    I'm Hiring Talent
                  </Link>
                </div>
              </div>

              <div className="hidden md:block animate-slideIn">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: 'Active Jobs', value: '500+' },
                      { label: 'Talented Professionals', value: '2,500+' },
                      { label: 'Countries', value: '5' },
                      { label: 'Success Rate', value: '95%' },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="text-3xl font-bold mb-2">{stat.value}</div>
                        <div className="text-blue-100 text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Countries */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Operating Across 5 African Countries</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {['Nigeria', 'Kenya', 'Ghana', 'South Africa', 'Egypt'].map((country) => (
                <div
                  key={country}
                  className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="text-4xl mb-2">🌍</div>
                  <div className="font-semibold text-gray-900">{country}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose ExpoAfrica?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Matching</h3>
                <p className="text-gray-600">
                  AI-powered matching connects you with the most relevant opportunities or candidates based on skills, experience, and preferences.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Verified Profiles</h3>
                <p className="text-gray-600">
                  All organizations and professionals are verified to ensure authenticity and quality, giving you peace of mind.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Quick Application</h3>
                <p className="text-gray-600">
                  Streamlined application process gets you connected faster. Apply to multiple opportunities with a single profile.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Direct Communication</h3>
                <p className="text-gray-600">
                  Built-in messaging system allows seamless communication between organizations and talent throughout the hiring process.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Analytics Dashboard</h3>
                <p className="text-gray-600">
                  Track applications, views, and engagement with comprehensive analytics for both talent and organizations.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Local Expertise</h3>
                <p className="text-gray-600">
                  Access to a curated network of local professionals who understand the cultural and business landscape.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Categories */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Popular Job Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Sales Agents', icon: '💼', count: 120 },
                { name: 'Translators', icon: '🌐', count: 85 },
                { name: 'Event Coordinators', icon: '🎪', count: 95 },
                { name: 'Marketing', icon: '📢', count: 110 },
                { name: 'Tech Support', icon: '💻', count: 75 },
                { name: 'Photographers', icon: '📸', count: 60 },
                { name: 'Logistics', icon: '🚚', count: 50 },
                { name: 'Hospitality', icon: '🏨', count: 90 },
              ].map((category) => (
                <Link
                  key={category.name}
                  href={`/jobs?category=${encodeURIComponent(category.name)}`}
                  className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg hover:bg-blue-50 transition-all cursor-pointer"
                >
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <div className="font-semibold text-gray-900">{category.name}</div>
                  <div className="text-sm text-gray-600">{category.count} jobs</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of professionals and organizations already connected on ExpoAfrica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register?type=talent"
                className="btn bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100"
              >
                Create Talent Profile
              </Link>
              <Link
                href="/register?type=organization"
                className="btn bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-400 border-2 border-white"
              >
                Post Your First Job
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
