import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">EA</span>
              </div>
              <span className="text-xl font-bold text-white">ExpoAfrica</span>
            </div>
            <p className="text-sm text-gray-400">
              Connecting international opportunities with Africa's finest talent.
            </p>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Talent</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/jobs" className="hover:text-white transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/register?type=talent" className="hover:text-white transition-colors">
                  Create Profile
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition-colors">
                  Career Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* For Organizations */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Organizations</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/talent" className="hover:text-white transition-colors">
                  Find Talent
                </Link>
              </li>
              <li>
                <Link href="/register?type=organization" className="hover:text-white transition-colors">
                  Post Jobs
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-400">
          <p>&copy; {currentYear} ExpoAfrica. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
