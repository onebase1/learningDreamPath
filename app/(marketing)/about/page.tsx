import { Metadata } from 'next'
import { Card } from "@/components/ui/card"
import { 
  Users, 
  Target, 
  Laptop,
  Globe 
} from "lucide-react"

export const metadata: Metadata = {
  title: 'About Us | DreamPath',
  description: 'Learn about DreamPath and our mission to help healthcare professionals succeed in OET',
}

const features = [
  {
    icon: Users,
    title: "Expert Team",
    description: "Our team consists of experienced healthcare professionals and language experts dedicated to OET training."
  },
  {
    icon: Target,
    title: "Focused Approach",
    description: "Specialized in healthcare-specific English testing and preparation for medical professionals."
  },
  {
    icon: Laptop,
    title: "Modern Platform",
    description: "State-of-the-art learning management system with AI-powered assessment and feedback."
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Supporting healthcare professionals worldwide in achieving their career goals."
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-customGray">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section - Made larger and more impactful */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h1 className="text-5xl font-bold text-gray-800 mb-8 leading-tight">
            Helping Healthcare Professionals Worldwide With English Proficiency Exam Preparations
          </h1>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto">
            DreamPath is dedicated to helping healthcare professionals achieve their career goals 
            through comprehensive OET preparation and support.
          </p>
        </div>

        {/* Mission Statement - Moved up for better story flow */}
        <Card className="max-w-3xl mx-auto p-10 mb-24">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <div className="space-y-6">
            <p className="text-gray-800 text-lg">
              We believe that language should never be a barrier to providing excellent healthcare. 
              Our mission is to provide the most effective, accessible, and comprehensive OET 
              preparation platform for healthcare professionals worldwide.
            </p>
            <p className="text-gray-800 text-lg">
              Through innovative technology, expert guidance, and a deep understanding of 
              healthcare professionals needs, we help our users achieve their required OET 
              scores and advance their careers in English-speaking countries.
            </p>
          </div>
        </Card>

        {/* Stats Section - Moved up before features */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { number: "10,000+", label: "Students Trained" },
              { number: "95%", label: "Success Rate" },
              { number: "50+", label: "Countries" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="text-4xl font-bold text-gray-800 mb-3">
                  {stat.number}
                </div>
                <div className="text-gray-800 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid - Made more prominent */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Why Choose DreamPath
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card 
                  key={index} 
                  className="p-8 bg-white backdrop-blur-sm hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="p-3 bg-blue-500/20 rounded-lg mr-6">
                      <Icon className="h-8 w-8 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-800 text-lg">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}