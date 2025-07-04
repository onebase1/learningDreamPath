import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DreamPath - OET Practice Tests & Mock Exams',
  description: 'Online OET practice tests and mock exams for healthcare professionals',
}

import BecomeATutor from "../_components/BecomeATutor"
import ContactUs from "../_components/ContactUs"
import FAQ from "../_components/FAQ"
import Features from "../_components/Features"
import Footer from "../_components/Footer"


import Navbar from "../_components/Navbar"
import Pricing from "../_components/Pricing"
import Hero from '../_components/Hero'




const siteMap = {
  about: [
    { title: 'About Us', href: '/about' },
    { title: 'Testimonials', href: '/testimonials' },
    { title: 'Contact', href: '/contact' },
    { title: 'FAQ', href: '/faq' }
  ],
  courses: [
    { title: 'OET for Doctors', href: '/courses/doctors' },
    { title: 'OET for Nurses', href: '/courses/nurses' },
    { title: 'OET for Pharmacists', href: '/courses/pharmacists' },
    { title: 'OET for Physiotherapists', href: '/courses/physiotherapists' }
  ],
  legal: [
    { title: 'Terms & Conditions', href: '/legal/terms' },
    { title: 'Privacy Policy', href: '/legal/privacy-policy' },
    { title: 'User Guidelines', href: '/legal/guidelines' },
    { title: 'Refund Policy', href: '/legal/refund' }
  ],
  support: [
    { title: 'Help Center', href: '/help' },
    { title: 'Student Portal', href: '/dashboard' },
    { title: 'Become a Tutor', href: '/become-a-tutor' },
    { title: 'Partner Program', href: '/partners' }
  ]
}

export default function LandingPage() {
  return (
    // Main background is now the darker indigo
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      {/* <Pricing /> */}
      <BecomeATutor />
      <FAQ />
      <ContactUs />
      <Footer siteMap={siteMap} />
    </div>
  )
}