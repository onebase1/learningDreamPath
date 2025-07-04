'use client';

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, Phone, MapPin } from "lucide-react"
import { useState } from "react"

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<ContactForm>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message. We will get back to you soon!'
      })
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen bg-customGray">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-slate-500">
            We're here to help with any questions about our OET preparation services
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="p-6 bg-white backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <p className="text-gray-800 font-medium">Email</p>
                    <p className="text-slate-500">support@dreampath.co.uk</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <p className="text-gray-800 font-medium">Phone</p>
                    <p className="text-slate-500">+44 XXX XXXX XXX</p>
                    <p className="text-sm text-slate-500">Mon-Fri 9:00 AM - 5:00 PM GMT</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <p className="text-gray-800 font-medium">Address</p>
                    <p className="text-slate-500">72 Newholme Estate</p>
                    <p className="text-slate-500">Wingate, Durham TS28 5EN</p>
                    <p className="text-slate-500">United Kingdom</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MessageSquare className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <p className="text-gray-800 font-medium">Live Chat</p>
                    <p className="text-slate-500">Available during business hours</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-6 bg-white backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {submitStatus.type && (
                <div className={`p-4 rounded-md mb-4 ${
                  submitStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}>
                  {submitStatus.message}
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    First Name
                  </label>
                  <Input 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-white border-gray-200 text-gray-800 
                             placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500"
                    placeholder="Your first name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Last Name
                  </label>
                  <Input 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-white border-gray-200 text-gray-800 
                             placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500"
                    placeholder="Your last name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Email
                </label>
                <Input 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  className="bg-white border-gray-200 text-gray-800 
                           placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Subject
                </label>
                <Input 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-white border-gray-200 text-gray-800 
                           placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500"
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Message
                </label>
                <Textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-white border-gray-200 text-gray-800 
                           placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500"
                  placeholder="Your message..."
                  rows={5}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}