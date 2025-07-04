import { Metadata } from 'next'
import { Card } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: 'Privacy Policy | DreamPath',
  description: 'Privacy policy and data protection information for DreamPath users',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <div className="bg-indigo-950 text-white">
        <div className="container mx-auto py-8 px-4">
          <div className="flex items-center space-x-4 mb-4">
            <Link 
              href="/landing" 
              className="inline-flex items-center text-sm text-blue-200 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Home
            </Link>
          </div>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-blue-200 mt-2">Last updated: February 17, 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 border-blue-100 shadow-sm mb-8">
            <h3 className="text-lg font-semibold text-indigo-950 mb-2">Important Notice</h3>
            <p className="text-gray-700">
              This Privacy Policy explains how we collect, use, and protect your personal information.
            </p>
          </Card>

          <div className="prose prose-lg max-w-none">
            <section id="information-we-collect">
              <h2 className="text-2xl font-bold text-indigo-950">1. Information We Collect</h2>
              
              <Card className="my-6 p-6 border-blue-100 shadow-sm">
                <h3 className="text-xl font-semibold text-indigo-950 mb-3">1.1 Personal Information</h3>
                <p className="text-gray-700 mb-3">We collect and process the following personal information:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Name and contact details</li>
                  <li>Authentication data</li>
                  <li>Account credentials</li>
                  <li>Audio and video samples</li>
                  <li>Payment information</li>
                  <li>Educational progress data</li>
                </ul>
              </Card>

              <Card className="my-6 p-6 border-blue-100 shadow-sm">
                <h3 className="text-xl font-semibold text-indigo-950 mb-3">1.2 Technical Data</h3>
                <p className="text-gray-700 mb-3">We automatically collect:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Referral source</li>
                  <li>Length of visit</li>
                  <li>Page views</li>
                  <li>Navigation paths</li>
                  <li>Learning analytics and progression data</li>
                </ul>
              </Card>
            </section>

            <section id="how-we-use-information">
              <h2 className="text-2xl font-bold text-indigo-950 mt-12">2. How We Use Your Information</h2>
              
              <Card className="my-6 p-6 border-blue-100 shadow-sm">
                <h3 className="text-xl font-semibold text-indigo-950 mb-3">2.1 Primary Purposes</h3>
                <p className="text-gray-700 mb-3">We use your information to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Deliver our educational services</li>
                  <li>Manage your account</li>
                  <li>Process payments</li>
                  <li>Provide customer support</li>
                  <li>Generate personalized learning recommendations</li>
                  <li>Conduct automated assessments and evaluations</li>
                  <li>Improve our platform and services</li>
                </ul>
              </Card>

              <Card className="my-6 p-6 border-blue-100 shadow-sm">
                <h3 className="text-xl font-semibold text-indigo-950 mb-3">2.2 Legal Basis for Processing</h3>
                <p className="text-gray-700 mb-3">Under UK GDPR, we process your data under the following legal bases:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Contract fulfillment</li>
                  <li>Legal obligation</li>
                  <li>Legitimate interests</li>
                  <li>Consent (where specifically requested)</li>
                </ul>
              </Card>
            </section>

            <section id="cookies-and-tracking">
              <h2 className="text-2xl font-bold text-indigo-950 mt-12">3. Cookies and Tracking</h2>
              
              <Card className="my-6 p-6 border-blue-100 shadow-sm">
                <h3 className="text-xl font-semibold text-indigo-950 mb-3">3.1 Essential Cookies</h3>
                <p className="text-gray-700 mb-3">We use necessary cookies to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Maintain your session</li>
                  <li>Remember your preferences</li>
                  <li>Ensure platform security</li>
                  <li>Support core functionality</li>
                </ul>
              </Card>

              <Card className="my-6 p-6 border-blue-100 shadow-sm">
                <h3 className="text-xl font-semibold text-indigo-950 mb-3">3.2 Analytics and Performance</h3>
                <p className="text-gray-700 mb-3">We use Google Analytics and other tools to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Analyze website usage</li>
                  <li>Improve user experience</li>
                  <li>Generate usage statistics</li>
                </ul>
                <p className="text-gray-700 mt-3">You can manage cookie preferences through your browser settings.</p>
              </Card>
            </section>

            <section id="data-storage-and-security">
              <h2 className="text-2xl font-bold text-indigo-950 mt-12">4. Data Storage and Security</h2>
              
              <Card className="my-6 p-6 border-blue-100 shadow-sm">
                <h3 className="text-xl font-semibold text-indigo-950 mb-3">4.1 Security Measures</h3>
                <p className="text-gray-700 mb-3">We implement:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Daily security scans</li>
                  <li>Vulnerability assessments</li>
                  <li>Firewalls</li>
                  <li>SSL/TLS encryption</li>
                  <li>Regular security audits</li>
                  <li>Staff training on data protection</li>
                </ul>
              </Card>

              <Card className="my-6 p-6 border-blue-100 shadow-sm">
                <h3 className="text-xl font-semibold text-indigo-950 mb-3">4.2 International Transfers</h3>
                <p className="text-gray-700 mb-3">When we transfer data outside the UK:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>We ensure adequate safeguards are in place</li>
                  <li>We use standard contractual clauses</li>
                  <li>We only transfer to countries with adequate data protection laws</li>
                </ul>
              </Card>
            </section>

          </div>

          {/* Footer */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="text-center text-gray-500 text-sm">
              <p>© {new Date().getFullYear()} Dreampath Ltd. All rights reserved.</p>
              <div className="mt-2 space-x-4">
                <Link href="/legal/privacy-policy" className="hover:text-indigo-600">
                  Privacy Policy
                </Link>
                <Link href="/legal/terms" className="hover:text-indigo-600">
                  Terms of Service
                </Link>
                <Link href="/legal/guidelines" className="hover:text-indigo-600">
                  User Guidelines
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}