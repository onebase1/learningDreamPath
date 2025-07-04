import { Card } from "@/components/ui/card"
import { 
  Users, 
  Clock, 
  MessageSquare, 
  BookOpen, 
  CheckCircle, 
  Headphones 
} from 'lucide-react'

const features = [
  {
    title: "Live Group Classes",
    description: "Join interactive classes with expert teachers in your time zone",
    icon: Users
  },
  {
    title: "Expert Feedback",
    description: "Get detailed expert feedback on your OET letters within 24 hours",
    icon: CheckCircle
  },
  {
    title: "Mock Exams",
    description: "Test your skills with our expertly designed mock exams",
    icon: BookOpen
  },
  {
    title: "24/7 Access",
    description: "Study at your own pace with unlimited access to materials",
    icon: Clock
  },
  {
    title: "One-to-One Support",
    description: "Get personalized attention from experienced tutors",
    icon: MessageSquare
  },
  {
    title: "Dedicated Support",
    description: "Our team is here to help you succeed",
    icon: Headphones
  }
]

export default function Features() {
  return (
    <section className="py-28 bg-customGray items-center ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Here's why our OET courses will help you pass with ease
          </h2>
          <p className="text-gray-800 max-w-2xl mx-auto">
            Comprehensive preparation tools and support to ensure your success
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="p-8">
                <div className="flex flex-col items-start space-y-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-left">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
