import Navbar from '@/app/_components/Navbar'
import Footer from '../_components/Footer'

const siteMap = {
  about: [
    { title: 'About Us', href: '/about' },
    { title: 'Contact', href: '/contact' },
  ],
  courses: [
    { title: 'All Courses', href: '/courses' },
    { title: 'Premium', href: '/courses/premium' },
  ],
  legal: [
    { title: 'Privacy', href: '/legal/privacy' },
    { title: 'Terms', href: '/legal/terms' },
  ],
  support: [
    { title: 'Help Center', href: '/support' },
    { title: 'Contact', href: '/contact' },
  ]
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-customGray">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-sm">
            {children}
          </div>
        </div>
      </main>
      <Footer siteMap={siteMap} />
    </div>
  )
} 