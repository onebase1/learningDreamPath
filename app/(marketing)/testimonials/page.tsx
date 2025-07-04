import { Metadata } from 'next'
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Testimonials | DreamPath',
  description: 'See what healthcare professionals say about DreamPath OET preparation',
}

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Doctor",
    country: "Singapore",
    score: "Grade A",
    content: "DreamPath's mock tests were incredibly accurate and helped me identify my weak areas. The speaking practice sessions were particularly helpful. I achieved Grade A in my first attempt!",
    occupation: "General Practitioner"
  },
  {
    name: "Nurse James Williams",
    role: "Nurse",
    country: "Philippines",
    score: "Grade B",
    content: "The writing correction service was fantastic. I received detailed feedback within 24 hours, which helped me improve my letter writing skills significantly.",
    occupation: "Critical Care Nurse"
  },
  {
    name: "Dr. Maria Garcia",
    role: "Doctor",
    country: "Spain",
    score: "Grade A",
    content: "What sets DreamPath apart is their attention to detail in the medical scenarios. The cases were very similar to the actual OET exam.",
    occupation: "Pediatrician"
  },
  {
    name: "Lisa Thompson",
    role: "Pharmacist",
    country: "Ireland",
    score: "Grade B",
    content: "The platform's user interface is intuitive, and the practice materials are comprehensive. The customer support team was always ready to help.",
    occupation: "Clinical Pharmacist"
  },
  {
    name: "Michael O'Connor",
    role: "Physiotherapist",
    country: "Australia",
    score: "Grade A",
    content: "The specialized content for physiotherapists was exactly what I needed. The speaking role-plays were particularly relevant to my field.",
    occupation: "Sports Physiotherapist"
  },
  {
    name: "Nurse Emma Wilson",
    role: "Nurse",
    country: "UK",
    score: "Grade B",
    content: "I appreciated the flexibility of the platform. Being able to practice at any time helped me balance my preparation with my work schedule.",
    occupation: "Emergency Nurse"
  }
]

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-customGray">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h1 className="text-5xl font-bold text-gray-800 mb-8 leading-tight">
            Success Stories
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            See how healthcare professionals worldwide achieved their OET goals with DreamPath
          </p>
        </div>

        {/* Stats Section */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { number: "95%", label: "Pass Rate" },
              { number: "4.8/5", label: "User Rating" },
              { number: "10,000+", label: "Successful Students" }
            ].map((stat, index) => (
              <Card 
                key={index} 
                className="p-8 bg-white backdrop-blur-sm text-center hover:bg-gray-50 transition-colors"
              >
                <div className="text-4xl font-bold text-gray-800 mb-3">{stat.number}</div>
                <div className="text-lg text-slate-500">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="max-w-7xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            What Our Students Say
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="p-8 bg-white backdrop-blur-sm flex flex-col hover:bg-gray-50 transition-colors"
              >
                {/* Rating stays yellow */}
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-6 w-6 text-yellow-400 fill-yellow-400" 
                    />
                  ))}
                </div>

                <p className="text-slate-500 text-lg mb-6 flex-grow">
                  "{testimonial.content}"
                </p>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-gray-800 font-semibold text-lg">{testimonial.name}</p>
                  <p className="text-slate-500">{testimonial.occupation}</p>
                  <div className="flex items-center mt-3 text-slate-500">
                    <span>{testimonial.score}</span>
                    <span className="mx-2">•</span>
                    <span>{testimonial.country}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to Start Your OET Journey?
          </h2>
          <p className="text-xl text-slate-500 mb-10">
            Join thousands of successful healthcare professionals who trusted DreamPath
          </p>
          <Link href="/sign-up">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 text-lg rounded-xl transition-colors"
            >
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}