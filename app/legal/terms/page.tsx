import { Metadata } from 'next'
import { Card } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: 'Terms of Service | DreamPath',
  description: 'Terms and conditions for using DreamPath learning management system',
}

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="text-blue-200 mt-2">Last updated: February 17, 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 border-blue-100 shadow-sm mb-8">
            <h3 className="text-lg font-semibold text-indigo-950 mb-2">Important Notice</h3>
            <p className="text-gray-700">
              Please read these terms carefully before using DreamPath's learning management system.
            </p>
          </Card>

          <div className="prose prose-lg max-w-none">
            <section id="introduction">
              <h2 className="text-2xl font-bold text-indigo-950">1. Introduction</h2>
              <p className="text-gray-700">
                These terms and conditions govern your use of the DreamPath learning management system ("Platform") 
                operated by Dreampath Ltd ("we", "our", or "us"), registered in England and Wales 
                (Company Number: 15237404), with registered office at 72 Newholme Estate Wingate, Durham TS28 5EN.
              </p>

              <Card className="my-6 p-6 border-blue-100 shadow-sm">
                <h3 className="text-xl font-semibold text-indigo-950 mb-3">1.1 Key Points</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>You must be at least 18 years old to create an account</li>
                  <li>Users under 18 require parental/guardian consent</li>
                  <li>You are responsible for maintaining account security</li>
                  <li>These terms apply to all Platform services</li>
                </ul>
              </Card>
            </section>



            {/* Add these sections after section 1 and before section 9 */}

            <section id="definitions">
              <h2 className="text-2xl font-bold text-indigo-950 mt-8">2. Definitions</h2>
              <Card className="my-6 p-6 border-blue-100 shadow-sm">
                <h3 className="text-xl font-semibold text-indigo-950 mb-3">2.1 Definitions</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Content:</strong> Any text, images, video, audio, or other material on the Platform</li>
                  <li><strong>Service:</strong> Educational services provided through the Platform</li>
                  <li><strong>User:</strong> Any person accessing or using the Platform</li>
                  <li><strong>Subscription:</strong> Paid access to premium features</li>
                  <li><strong>Credits:</strong> Digital currency used within the Platform</li>
                </ul>
              </Card>
            </section>

            <section id="platform-access">
              <h2 className="text-2xl font-bold text-indigo-950 mt-8">3. Platform Access and Account Security</h2>
              <Card className="my-6 p-6 border-blue-100 shadow-sm">
                <h3 className="text-xl font-semibold text-indigo-950 mb-3">3.1 User Requirements</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>You must provide accurate registration information</li>
                  <li>You are responsible for maintaining account confidentiality</li>
                  <li>You must notify us of any security breaches</li>
                  <li>You agree to use the Platform responsibly</li>
                </ul>
              </Card>

              <Card className="my-6 p-6 border-blue-100 shadow-sm bg-yellow-50">
                <h3 className="text-xl font-semibold text-indigo-950 mb-3">3.2 Account Restrictions</h3>
                <p className="text-gray-700">
                  We reserve the right to restrict access or disable accounts that violate our policies.
                </p>
              </Card>
            </section>

            <section id="intellectual-property">
              <h2 className="text-2xl font-bold text-indigo-950 mt-8">4. Intellectual Property Rights</h2>
              <Card className="my-6 p-6 border-blue-100 shadow-sm">
                <h3 className="text-xl font-semibold text-indigo-950 mb-3">4.1 Our Rights</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>We own all intellectual property rights in the Platform and Content</li>
                  <li>Our materials are protected by copyright and other laws</li>
                  <li>You may view and download materials for personal use only</li>
                </ul>
              </Card>

              <Card className="my-6 p-6 border-blue-100 shadow-sm">
                <h3 className="text-xl font-semibold text-indigo-950 mb-3">4.2 User Content</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>You retain rights to content you submit</li>
                  <li>You grant us a worldwide, non-exclusive license to use submitted content</li>
                  <li>We may moderate or remove inappropriate content</li>
                </ul>
              </Card>
            </section>

            <section id="educational-services">
              <h2 className="text-2xl font-bold text-indigo-950 mt-8">5. Educational Services</h2>
              <Card className="my-6 p-6 border-blue-100 shadow-sm">
                <h3 className="text-xl font-semibold text-indigo-950 mb-3">5.1 Course Access</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Access depends on subscription status or credit balance</li>
                  <li>Some features require additional credits or payments</li>
                  <li>We don't guarantee course availability</li>
                </ul>
              </Card>

              <Card className="my-6 p-6 border-blue-100 shadow-sm">
                <h3 className="text-xl font-semibold text-indigo-950 mb-3">5.2 Assessment and Certification</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Assessments may use AI/ML technology</li>
                  <li>Results and feedback are provided "as is"</li>
                  <li>Certificates are issued upon successful completion</li>
                </ul>
              </Card>
            </section>

            <section id="payments">
              <h2 className="text-2xl font-bold text-indigo-950 mt-8">6. Payments and Subscriptions</h2>
              <Card className="my-6 p-6 border-blue-100 shadow-sm">
                <h3 className="text-xl font-semibold text-indigo-950 mb-3">6.1 Pricing</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>All prices are in GBP and include VAT</li>
                  <li>We may change prices with notice</li>
                  <li>Refunds are subject to our refund policy</li>
                </ul>
              </Card>

              <Card className="my-6 p-6 border-blue-100 shadow-sm">
                <h3 className="text-xl font-semibold text-indigo-950 mb-3">6.2 Credits</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Credits are non-transferable</li>
                  <li>Unused credits expire after 12 months</li>
                  <li>No cash redemption for unused credits</li>
                </ul>
              </Card>
            </section>

            <section id="technology">
              <h2 className="text-2xl font-bold text-indigo-950 mt-8">7. Technology and AI</h2>
              <Card className="my-6 p-6 border-blue-100 shadow-sm">
                <h3 className="text-xl font-semibold text-indigo-950 mb-3">7.1 AI-Generated Content</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Parts of our service use AI technology</li>
                  <li>AI-generated content is provided "as is"</li>
                  <li>We don't guarantee AI output accuracy</li>
                </ul>
              </Card>

              <Card className="my-6 p-6 border-blue-100 shadow-sm">
                <h3 className="text-xl font-semibold text-indigo-950 mb-3">7.2 Data Processing</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>We use AI for assessment and feedback</li>
                  <li>Your data may be used to improve our AI systems</li>
                  <li>You can opt out of AI processing</li>
                </ul>
              </Card>
            </section>

            <section id="acceptable-use">
              <h2 className="text-2xl font-bold text-indigo-950 mt-8">8. Acceptable Use</h2>
              <Card className="my-6 p-6 border-blue-100 shadow-sm">
                <h3 className="text-xl font-semibold text-indigo-950 mb-3">8.1 Acceptable Use</h3>
                <p className="text-gray-700 mb-3">You must not:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Misuse the Platform</li>
                  <li>Circumvent security measures</li>
                  <li>Share account credentials</li>
                  <li>Upload malicious content</li>
                  <li>Violate others' rights</li>
                </ul>
              </Card>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-bold text-indigo-950 mt-8">9. Contact Information</h2>
              <Card className="my-6 p-6 border-blue-100 shadow-sm">
                <div className="text-gray-700">
                  <p>Dreampath Ltd</p>
                  <p>72 Newholme Estate</p>
                  <p>Wingate, Durham TS28 5EN</p>
                  <p>Email: support@dreampathlearning.com</p>
                </div>
              </Card>
            </section>

            <section id="consumer-rights">
              <h2 className="text-2xl font-bold text-indigo-950 mt-8">10. Consumer Rights</h2>
              <Card className="my-6 p-6 border-blue-100 shadow-sm">
                <p className="text-gray-700">
                  Nothing in these terms limits your statutory rights as a consumer under English law.
                </p>
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