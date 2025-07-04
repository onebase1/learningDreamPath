'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle } from "lucide-react";

interface ApplicationForm {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  timezone: string;

  // Professional Background
  qualification: string;
  specialization: string;
  yearsExperience: string;
  currentRole: string;
  institution: string;

  // Teaching Experience
  teachingExperience: string;
  onlineTeachingExperience: string;
  preferredStudentLevel: string;
  availableHours: string;
  
  // Language Proficiency
  englishProficiency: string;
  otherLanguages: string;
  
  // Technical Setup
  internetSpeed: string;
  hasWebcam: boolean;
  hasHeadset: boolean;
  
  // Additional Information
  motivation: string;
  teachingApproach: string;
  additionalInfo: string;

  // Terms
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
}

export default function TutorApplicationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ApplicationForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    timezone: '',
    qualification: '',
    specialization: '',
    yearsExperience: '',
    currentRole: '',
    institution: '',
    teachingExperience: '',
    onlineTeachingExperience: '',
    preferredStudentLevel: '',
    availableHours: '',
    englishProficiency: '',
    otherLanguages: '',
    internetSpeed: '',
    hasWebcam: false,
    hasHeadset: false,
    motivation: '',
    teachingApproach: '',
    additionalInfo: '',
    acceptedTerms: false,
    acceptedPrivacy: false,
  });

  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/tutor-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      setSubmitStatus({
        type: 'success',
        message: 'Your application has been submitted successfully. We will review it and get back to you soon.',
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit application. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  return (
    <div className="min-h-screen bg-customGray">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Tutor Application Form
            </h1>
            <p className="text-lg text-slate-500">
              Join our team of professional OET tutors and help healthcare professionals achieve their goals
            </p>
          </div>

          <Card className="p-8 bg-white">
            <form onSubmit={handleSubmit} className="space-y-8">
              {submitStatus.type && (
                <div className={`p-4 rounded-md ${
                  submitStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              {/* Personal Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">
                      First Name *
                    </label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">
                      Last Name *
                    </label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="bg-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Background */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Professional Background</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">
                      Highest Qualification *
                    </label>
                    <Input
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      required
                      className="bg-white"
                      placeholder="e.g., MSc in Nursing"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">
                      Healthcare Specialization *
                    </label>
                    <Input
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      required
                      className="bg-white"
                      placeholder="e.g., Emergency Medicine"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">
                      Years of Professional Experience *
                    </label>
                    <Input
                      name="yearsExperience"
                      value={formData.yearsExperience}
                      onChange={handleChange}
                      required
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">
                      Current Role
                    </label>
                    <Input
                      name="currentRole"
                      value={formData.currentRole}
                      onChange={handleChange}
                      className="bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Teaching Experience */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Teaching Experience</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Teaching Experience *
                  </label>
                  <Textarea
                    name="teachingExperience"
                    value={formData.teachingExperience}
                    onChange={handleChange}
                    required
                    className="bg-white"
                    placeholder="Describe your teaching experience, including any formal or informal teaching roles"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Online Teaching Experience
                  </label>
                  <Textarea
                    name="onlineTeachingExperience"
                    value={formData.onlineTeachingExperience}
                    onChange={handleChange}
                    className="bg-white"
                    placeholder="Describe any experience with online teaching platforms or virtual classrooms"
                    rows={4}
                  />
                </div>
              </div>

              {/* Technical Setup */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Technical Setup</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasWebcam"
                      checked={formData.hasWebcam}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange('hasWebcam', checked as boolean)
                      }
                    />
                    <label 
                      htmlFor="hasWebcam"
                      className="text-sm font-medium text-gray-800"
                    >
                      I have a working webcam
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasHeadset"
                      checked={formData.hasHeadset}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange('hasHeadset', checked as boolean)
                      }
                    />
                    <label 
                      htmlFor="hasHeadset"
                      className="text-sm font-medium text-gray-800"
                    >
                      I have a working headset/microphone
                    </label>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="acceptedTerms"
                    checked={formData.acceptedTerms}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('acceptedTerms', checked as boolean)
                    }
                    required
                  />
                  <label 
                    htmlFor="acceptedTerms"
                    className="text-sm text-gray-800"
                  >
                    I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms and Conditions</a> and understand my data will be handled according to DreamPath Learning's policies *
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="acceptedPrivacy"
                    checked={formData.acceptedPrivacy}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('acceptedPrivacy', checked as boolean)
                    }
                    required
                  />
                  <label 
                    htmlFor="acceptedPrivacy"
                    className="text-sm text-gray-800"
                  >
                    I consent to DreamPath Learning processing my personal information for recruitment purposes *
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>

              <p className="text-sm text-slate-500 text-center">
                Fields marked with * are required
              </p>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
} 