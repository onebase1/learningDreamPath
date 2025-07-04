import { Metadata } from 'next'
import LegalLayout from '../components/LegalLayout'



export const metadata: Metadata = {
  title: 'User Guidelines | DreamPath',
  description: 'Community guidelines and acceptable use policies for DreamPath platform',
}

export default function GuidelinesPage() {
  return (
    <LegalLayout 
      title="User Guidelines" 
      lastUpdated="February 17, 2025"
    >
      <section className="text-indigo-200">
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Platform Usage Guidelines</h2>
        <p className="mb-4">
          These guidelines are designed to ensure a safe, productive, and fair learning 
          environment for all DreamPath users. By using our platform, you agree to follow 
          these guidelines.
        </p>

        <h3 className="text-xl font-semibold text-white mt-6 mb-3">1. General Principles</h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Treat all users with respect and professionalism</li>
          <li>Maintain academic integrity in all activities</li>
          <li>Use the platform for its intended educational purposes</li>
          <li>Protect your account security and credentials</li>
        </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">2. Content Standards</h3>
          <p className="mb-4">
            All content submitted to or shared on the platform must:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Be relevant to OET preparation</li>
            <li>Respect intellectual property rights</li>
            <li>Be free from offensive or inappropriate material</li>
            <li>Maintain professional healthcare standards</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">3. Academic Integrity</h3>
          <p className="mb-4">
            Users must maintain high standards of academic integrity:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Complete all assessments independently</li>
            <li>Do not share answers or assessment materials</li>
            <li>Use only authorized resources during practice tests</li>
            <li>Report any suspected cheating or misconduct</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">4. Technical Requirements</h3>
          <p className="mb-4">
            To ensure optimal platform performance:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Maintain a stable internet connection</li>
            <li>Use an up-to-date web browser</li>
            <li>Ensure proper audio/video equipment for speaking assessments</li>
            <li>Keep your system updated and secure</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">5. Communication Guidelines</h3>
          <p className="mb-4">
            When interacting with others on the platform:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Use professional and respectful language</li>
            <li>Avoid spam or promotional content</li>
            <li>Report inappropriate behavior</li>
            <li>Respect others privacy and personal information</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">6. Compliance and Enforcement</h3>
          <p className="mb-4">
            DreamPath reserves the right to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Monitor platform usage and content</li>
            <li>Remove inappropriate content</li>
            <li>Suspend or terminate accounts for guideline violations</li>
            <li>Update these guidelines as needed</li>
          </ul>
      </section>
    </LegalLayout>
    
  )
}