import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  PlayCircle, 
  FileText, 
  MessageCircle,
  Headphones,
  Mail
} from "lucide-react"
import Link from "next/link"

const categories = [
  {
    title: "Getting Started",
    icon: PlayCircle,
    description: "New to DreamPath? Learn how to get started with our platform",
    links: [
      "Platform Overview",
      "Account Setup",
      "Taking Your First Test",
      "Understanding Your Results"
    ]
  },
  {
    title: "Study Materials",
    icon: BookOpen,
    description: "Access guides and resources for OET preparation",
    links: [
      "Practice Tests Guide",
      "Study Planning",
      "Writing Templates",
      "Speaking Tips"
    ]
  },
  {
    title: "Technical Support",
    icon: Headphones,
    description: "Technical issues or questions about using the platform",
    links: [
      "System Requirements",
      "Common Issues",
      "Browser Support",
      "Mobile Access"
    ]
  },
  {
    title: "Assessment Guide",
    icon: FileText,
    description: "Understanding how our assessment system works",
    links: [
      "Scoring System",
      "Feedback Guide",
      "Progress Tracking",
      "Performance Analytics"
    ]
  },
  {
    title: "Community & Support",
    icon: MessageCircle,
    description: "Connect with other students and get help",
    links: [
      "Discussion Forums",
      "Study Groups",
      "Peer Review",
      "Success Stories"
    ]
  },
  {
    title: "Contact Support",
    icon: Mail,
    description: "Need direct assistance? We're here to help",
    links: [
      "Submit a Ticket",
      "Live Chat",
      "Email Support",
      "Book a Consultation"
    ]
  }
]

export default function HelpCenterPage() {
    return (
      <div className="min-h-screen bg-indigo-950">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-100 mb-4">
              How Can We Help?
            </h1>
            <p className="text-lg text-blue-200">
              Everything you need to know about using DreamPath's OET preparation platform
            </p>
          </div>
  
          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search help articles..."
                className="w-full px-4 py-3 rounded-lg bg-gradient-to-tl from-indigo-950 to-black border border-indigo-700 
                  text-blue-100 placeholder:text-blue-300 focus:outline-none focus:ring-2 
                  focus:ring-blue-400 focus:border-transparent"
              />
            </div>
          </div>
  
          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <Card 
                  key={index}
                  className="bg-indigo-900/50 border-indigo-700 backdrop-blur-sm 
                    hover:bg-indigo-800/50 transition-colors p-6"
                >
                  <div className="flex items-start mb-4">
                    <div className="p-2 bg-blue-500/20 rounded-lg mr-4">
                      <Icon className="h-6 w-6 text-blue-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-100 mb-2">
                        {category.title}
                      </h3>
                      <p className="text-blue-200 text-sm mb-4">
                        {category.description}
                      </p>
                    </div>
                  </div>
  
                  <ul className="space-y-2 mb-4">
                    {category.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a 
                          href="#" 
                          className="text-blue-300 hover:text-blue-200 text-sm transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
  
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-400 text-blue-300 
                      hover:bg-blue-800/50 hover:text-blue-200"
                  >
                    View All
                  </Button>
                </Card>
              )
            })}
          </div>
  
          {/* Contact Support */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-blue-100 mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-blue-200 mb-8">
              Our support team is available 24/7 to assist you
            </p>
            <Link href="/contact">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }