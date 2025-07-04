import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, X } from "lucide-react"

const tiers = [
  {
    name: "Free",
    price: "0",
    period: "/mo",
    description: "Perfect for trying out our platform",
    features: [
      "1 Full Mock Test",
      "Basic Tips & Tricks",
      "Sample Answers",
      "Grammar Lessons",
      "24/7 Email Support"
    ],
    notIncluded: [
      "Expert Feedback",
      "Letter Corrections",
      "Speaking Assessment",
      "Advanced Lessons"
    ],
    buttonText: "Start Free",
    popular: false
  },
  {
    name: "Pro",
    price: "99",
    period: "/4 mo",
    description: "Most popular choice for serious candidates",
    features: [
      "20 Full Mock Tests",
      "4x Urgent Letter Corrections",
      "1x Speaking Test (Zoom)",
      "25 Advanced Lessons",
      "All Practice Materials",
      "Expert Feedback",
      "24/7 Priority Support",
      "15 Vocab Tests",
      "6 Writing Tests",
      "10 Grade-A Recordings"
    ],
    buttonText: "Get Started",
    popular: true
  },
  {
    name: "Pro Max",
    price: "219",
    period: "/9 mo",
    description: "Complete preparation with maximum support",
    features: [
      "Everything in Pro, plus:",
      "20x Letter Corrections",
      "2x Speaking Tests",
      "Unlimited Live Classes",
      "Priority Grading",
      "Personal Study Plan",
      "Progress Tracking",
      "Extended Access Period"
    ],
    buttonText: "Go Pro Max",
    popular: false
  }
]

export default function Pricing() {
  return (
    <section className="py-16 bg-gradient-to-tl from-indigo-950 to-black" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-white text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-500 font-semibold">Choose the perfect plan for your OET preparation</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier) => (
            <Card key={tier.name} className={`relative p-8 ${
              tier.popular ? 'border-blue-500 border-2' : ''
            }`}>
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="text-4xl font-bold mb-2">
                  ${tier.price}
                  <span className="text-lg text-gray-500">{tier.period}</span>
                </div>
                <p className="text-gray-600">{tier.description}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm">
                    <Check className="text-green-500 w-5 h-5 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
                {tier.notIncluded?.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-gray-400">
                    <X className="text-red-300 w-5 h-5 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${
                  tier.popular ? 'bg-blue-500 hover:bg-blue-600' : ''
                }`}
              >
                {tier.buttonText}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}