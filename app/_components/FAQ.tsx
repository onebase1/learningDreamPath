'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: "Is the course suitable for doctors, nurses, pharmacists and physiotherapists?",
    answer: "Yes, our platform is designed for all medical professionals. While Reading & Listening tests are relevant for all medical occupations, Writing Case Notes and Speaking Roleplay Cards are specifically tailored for doctors, nurses, pharmacists and physiotherapists. For other medical professions, please contact us to discuss customization options."
  },
  {
    question: "Can I complete the course quickly if my exam is in less than a month?",
    answer: "Absolutely! You get immediate access to all practice tests, training materials, and assessment services upon purchase. You can tailor your study pace according to your exam schedule, ensuring you're fully prepared for your OET exam date."
  },
  {
    question: "How do Practice Tests differ from Mock Tests?",
    answer: "Practice tests come with our course packages and include answers and samples. Mock tests are standalone, more detailed assessments with comprehensive explanations and challenging questions. Both are online-only and cannot be downloaded or printed."
  },
  {
    question: "What support is available during my preparation?",
    answer: "We offer comprehensive support including 24/7 email assistance, expert feedback on writing and speaking tasks, access to our learning community, and technical support. Our team is committed to helping you achieve your goals."
  },
  {
    question: "Do you offer refunds?",
    answer: "As this is a digital product, we cannot offer refunds once you access the materials. If you're unsure, we recommend starting with our Free tier or individual modules to test the platform."
  },
  {
    question: "How many practice tests are included?",
    answer: "Our Pro and Pro Max packages include 20 full practice tests for each module (Listening, Reading, Writing & Speaking). That's 80 tests total! Plus, you get access to additional mock tests and specialized assessments."
  }
]

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <Card className="p-4 cursor-pointer hover:bg-gray-50" onClick={onClick}>
      <div className="flex justify-between items-start">
        <h3 className="font-semibold">{question}</h3>
        <Button variant="ghost" size="sm" className="p-1">
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>
      {isOpen && (
        <p className="mt-4 text-gray-600">
          {answer}
        </p>
      )}
    </Card>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0)

  return (
    <section className="py-16 bg-gradient-to-tl from-indigo-950 to-black " id="faq">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-white font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400">Find answers to common questions about our OET preparation platform</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={index === openIndex}
              onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Have a question not answered here?{' '}
            <a href="/contact" className="text-blue-500 hover:text-blue-600">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}