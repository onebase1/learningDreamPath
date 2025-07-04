import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, BookOpen, Users, Clock, Globe, Award } from 'lucide-react'

export default function BecomeTutorPage() {
  return (
    <div className="min-h-screen bg-customGray">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Join Our Team of Expert OET Tutors
          </h1>
          <p className="text-xl text-slate-500 mb-8">
            Help healthcare professionals achieve their dreams while building a rewarding teaching career
          </p>
          <Link href="/become-a-tutor/application">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl">
              Apply Now
            </Button>
          </Link>
        </div>

        {/* Why Join Us Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Why Teach with DreamPath Learning
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Work Remotely",
                description: "Teach from anywhere in the world with our fully online platform"
              },
              {
                icon: Clock,
                title: "Flexible Hours",
                description: "Choose your own schedule and teach when it suits you best"
              },
              {
                icon: Award,
                title: "Competitive Pay",
                description: "Earn competitive rates with regular teaching opportunities"
              },
              {
                icon: Users,
                title: "Supportive Community",
                description: "Join a network of professional healthcare tutors"
              },
              {
                icon: BookOpen,
                title: "Teaching Resources",
                description: "Access our comprehensive teaching materials and resources"
              },
              {
                icon: CheckCircle,
                title: "Professional Growth",
                description: "Regular training and development opportunities"
              }
            ].map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Card 
                  key={index}
                  className="p-6 bg-white hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-50 rounded-lg mr-4">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-slate-500">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Requirements Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            What We Look For
          </h2>
          <Card className="p-8 bg-white">
            <ul className="space-y-4">
              {[
                "Healthcare qualification or relevant professional experience",
                "Native or near-native English proficiency",
                "Teaching experience (formal or informal)",
                "Strong communication skills",
                "Reliable high-speed internet connection",
                "Webcam and quality headset/microphone",
                "Commitment to student success",
                "Available for minimum 10 hours per week"
              ].map((requirement, index) => (
                <li key={index} className="flex items-center text-slate-500">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-12 bg-blue-50 border-blue-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Ready to Start Your Teaching Journey?
            </h2>
            <p className="text-lg text-slate-500 mb-8">
              Join our team of professional tutors and make a difference in healthcare professionals' lives
            </p>
            <Link href="/become-a-tutor/application">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl">
                Apply Now
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
} 