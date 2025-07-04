'use client';

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  BadgeCheck, 
  Users, 
  PieChart, 
  DollarSign,
  BarChart,
  Building
} from "lucide-react"

const benefits = [
  {
    icon: Users,
    title: "Expand Your Reach",
    description: "Access a global network of healthcare professionals seeking OET preparation"
  },
  {
    icon: BadgeCheck,
    title: "Premium Resources",
    description: "Get access to our comprehensive learning materials and assessment tools"
  },
  {
    icon: PieChart,
    title: "Performance Analytics",
    description: "Track student progress with detailed analytics and reporting"
  },
  {
    icon: DollarSign,
    title: "Competitive Commission",
    description: "Earn competitive commissions on student enrollments and renewals"
  },
  {
    icon: Building,
    title: "Institutional Support",
    description: "Dedicated account manager and priority technical support"
  },
  {
    icon: BarChart,
    title: "Growth Opportunities",
    description: "Scale your business with our expanding platform and resources"
  }
]

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-indigo-950">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-100 mb-4">
            Partner Program
          </h1>
          <p className="text-lg text-blue-200">
            Join DreamPath's partner network and help healthcare professionals achieve their OET goals
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <Card 
                key={index}
                className="p-6 bg-indigo-900/50 border-indigo-700 backdrop-blur-sm"
              >
                <div className="flex items-start">
                  <div className="p-2 bg-blue-500/20 rounded-lg mr-4">
                    <Icon className="h-6 w-6 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-100 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-blue-200">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Partnership Form */}
        <Card className="max-w-2xl mx-auto p-8 bg-indigo-900/50 border-indigo-700 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-blue-100 mb-6">
            Become a Partner
          </h2>
          
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-1">
                  Organization Name
                </label>
                <Input 
                  className="bg-indigo-800/50 border-indigo-600 text-blue-100 
                           placeholder:text-blue-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="Your organization"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-1">
                  Website
                </label>
                <Input 
                  className="bg-indigo-800/50 border-indigo-600 text-blue-100 
                           placeholder:text-blue-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="www.example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-1">
                  Contact Name
                </label>
                <Input 
                  className="bg-indigo-800/50 border-indigo-600 text-blue-100 
                           placeholder:text-blue-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-1">
                  Email
                </label>
                <Input 
                  type="email"
                  className="bg-indigo-800/50 border-indigo-600 text-blue-100 
                           placeholder:text-blue-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-200 mb-1">
                Type of Partnership
              </label>
              <select className="w-full bg-indigo-800/50 border-indigo-600 text-blue-100 rounded-md p-2">
                <option value="institution">Educational Institution</option>
                <option value="agency">Recruitment Agency</option>
                <option value="trainer">Independent Trainer</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-200 mb-1">
                Message
              </label>
              <Textarea 
                className="bg-indigo-800/50 border-indigo-600 text-blue-100 
                         placeholder:text-blue-300 focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us about your organization and partnership goals..."
                rows={4}
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Submit Application
            </Button>
          </form>
        </Card>

        {/* FAQs */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <h2 className="text-2xl font-bold text-blue-100 mb-4">
            Have Questions?
          </h2>
          <p className="text-blue-200 mb-8">
            Learn more about our partnership program or speak with our team
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline"
              className="text-blue-300 border-blue-300 hover:bg-blue-900/20"
            >
              View FAQs
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}