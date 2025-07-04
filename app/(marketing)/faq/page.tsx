'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem = ({ question, answer, isOpen, onToggle }: AccordionItemProps) => {
  return (
    <div className="border-b border-indigo-700 last:border-0">
      <button
        className="w-full py-4 flex justify-between items-center text-left"
        onClick={onToggle}
      >
        <span className="text-blue-100 hover:text-blue-50 transition-colors">
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-blue-300" />
        ) : (
          <ChevronDown className="h-5 w-5 text-blue-300" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 text-blue-200 text-sm">
          {answer}
        </div>
      )}
    </div>
  );
};

const faqs = [
  {
    category: "Platform & Courses",
    questions: [
      {
        q: "Is the course suitable for doctors, nurses, pharmacists and physiotherapists?",
        a: "Yes, our platform is designed for all medical professionals. While Reading & Listening tests are relevant for all medical occupations, Writing Case Notes and Speaking Roleplay Cards are specifically tailored for doctors, nurses, pharmacists and physiotherapists."
      },
      {
        q: "Can I complete the course quickly if my exam is in less than a month?",
        a: "Absolutely! You get immediate access to all practice tests and materials upon purchase. You can study at your own pace and complete the course based on your schedule and exam date."
      },
      {
        q: "How do Practice Tests differ from Mock Tests?",
        a: "Practice tests come with our course packages and include answers and samples. Mock tests are standalone, more detailed assessments with comprehensive explanations and challenging questions."
      }
    ]
  },
  {
    category: "Support & Feedback",
    questions: [
      {
        q: "What kind of support is available during my preparation?",
        a: "We offer comprehensive support including 24/7 email assistance, expert feedback on writing and speaking tasks, access to our learning community, and technical support."
      },
      {
        q: "How quickly do I receive feedback on my writing tasks?",
        a: "Writing tasks are reviewed and returned within 24 hours. For urgent submissions, we also offer express feedback service."
      },
      {
        q: "Can I get one-on-one tutoring?",
        a: "Yes, we offer personalized tutoring sessions with experienced OET trainers. These can be booked through your dashboard."
      }
    ]
  },
  {
    category: "Technical & Access",
    questions: [
      {
        q: "What are the technical requirements for using the platform?",
        a: "You need a stable internet connection and an updated web browser. For speaking practice, you'll need a microphone and webcam."
      },
      {
        q: "Can I access the platform on mobile devices?",
        a: "Yes, our platform is fully responsive and works on all devices including smartphones and tablets."
      },
      {
        q: "How long do I have access to the course materials?",
        a: "Access duration depends on your chosen package, ranging from 3 to 12 months. You can view the specific duration on our pricing page."
      }
    ]
  },
  {
    category: "Payment & Refunds",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners."
      },
      {
        q: "Do you offer refunds?",
        a: "As this is a digital product, we generally don't offer refunds once you've accessed the materials. We recommend starting with our free trial to ensure the platform meets your needs."
      },
      {
        q: "Can I upgrade my package later?",
        a: "Yes, you can upgrade to a higher package at any time. The cost will be prorated based on your remaining access time."
      }
    ]
  }
]

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState<number>(0);
  const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>({});

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-tl from-indigo-950 to-black">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-100 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-blue-200">
            Find answers to common questions about DreamPath's OET preparation platform
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((category, categoryIndex) => (
            <Card 
              key={categoryIndex} 
              className="mb-8 p-6 bg-gradient-to-tl from-indigo-950 to-black border-indigo-700 backdrop-blur-sm"
            >
              <h2 className="text-xl font-semibold text-blue-100 mb-4">
                {category.category}
              </h2>
              <div className="space-y-2">
                {category.questions.map((faq, questionIndex) => (
                  <AccordionItem
                    key={questionIndex}
                    question={faq.q}
                    answer={faq.a}
                    isOpen={openQuestions[`${categoryIndex}-${questionIndex}`] || false}
                    onToggle={() => toggleQuestion(categoryIndex, questionIndex)}
                  />
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <h2 className="text-2xl font-bold text-blue-100 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-blue-200 mb-8">
            Our support team is here to help you with any other questions you might have
          </p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => window.location.href = '/contact'}
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  )
}