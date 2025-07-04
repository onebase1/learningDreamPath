import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

const socialLinks = [
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
]

interface FooterProps {
  siteMap: {
    about: { title: string; href: string }[];
    courses: { title: string; href: string }[];
    legal: { title: string; href: string }[];
    support: { title: string; href: string }[];
  }
}

export default function Footer({ siteMap }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/" className="text-2xl font-bold">
              DreamPath
            </Link>
            <p className="text-gray-400 text-sm max-w-xs">
              Helping healthcare professionals achieve their OET goals with comprehensive online preparation and expert support.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-white"
                  >
                    <span className="sr-only">{item.name}</span>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white">About</h3>
                <ul className="mt-4 space-y-4">
                  {siteMap.about.map((item) => (
                    <li key={item.title}>
                      <Link href={item.href} className="text-gray-400 hover:text-white text-sm">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white">Courses</h3>
                <ul className="mt-4 space-y-4">
                  {siteMap.courses.map((item) => (
                    <li key={item.title}>
                      <Link href={item.href} className="text-gray-400 hover:text-white text-sm">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white">Support</h3>
                <ul className="mt-4 space-y-4">
                  {siteMap.support.map((item) => (
                    <li key={item.title}>
                      <Link href={item.href} className="text-gray-400 hover:text-white text-sm">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white">Legal</h3>
                <ul className="mt-4 space-y-4">
                  {siteMap.legal.map((item) => (
                    <li key={item.title}>
                      <Link href={item.href} className="text-gray-400 hover:text-white text-sm">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-800 pt-8">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} DreamPath Ltd. All rights reserved. Registered in England and Wales under Company Number: 15237404
          </p>
        </div>
      </div>
    </footer>
  )
}