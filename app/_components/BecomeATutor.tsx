import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, CheckCircle } from "lucide-react"

const benefits = [
  {
    title: "Flexible Schedule",
    description: "Choose your own hours and work from anywhere in the world"
  },
  {
    title: "Competitive Pay",
    description: "Earn competitive rates for your expertise and experience"
  },
  {
    title: "Professional Growth",
    description: "Access to teaching resources and professional development"
  },
  {
    title: "Supportive Community",
    description: "Join a network of experienced healthcare professionals"
  }
]

export default function BecomeATutor() {
  return (
    <section className="py-16 bg-customGray" id="tutor">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Join Our Teaching Team</h2>
          <p className="text-gray-600 mb-8">
            Share your expertise and help healthcare professionals achieve their OET goals while earning competitive rates
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="grid gap-6">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="p-6">
                  <div className="flex gap-4">
                    <CheckCircle className="h-6 w-6 text-blue-500 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Requirements</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1" />
                <span>Healthcare professional with relevant qualifications</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1" />
                <span>Native or near-native English proficiency</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1" />
                <span>Experience in teaching or mentoring</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1" />
                <span>Reliable internet connection and comfortable with online teaching</span>
              </li>
            </ul>
            
            <Button className="w-full" size="lg">
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}