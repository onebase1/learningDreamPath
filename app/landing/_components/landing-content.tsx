"use client";

import { Navigation } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BookOpen,
  Headphones,
  Pencil,
  MessageSquare,
  Users,
  CheckCircle,
  Mail,
  Phone,
  Shield,
} from "lucide-react";

export default function LandingContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-800">
      {/* Navbar */}
      <nav className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Navigation className="h-8 w-8 text-white" />
              <span className="ml-2 text-2xl font-bold text-white">DreamPath</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-300 hover:text-white transition">
                Features
              </Link>
              {/* Removed the Pricing link if you like; or link to /subscription directly */}
              {/* <Link href="#pricing" className="text-gray-300 hover:text-white transition">
                Pricing
              </Link> */}
              <Link href="#tutors" className="text-gray-300 hover:text-white transition">
                Become a Tutor
              </Link>
              <Link href="#contact" className="text-gray-300 hover:text-white transition">
                Contact
              </Link>
              <Link href="/sign-in">
                <Button className="bg-white text-indigo-900 hover:bg-gray-100">
                  Start Free Plan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Pass the OET Exam with Confidence
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            24/7 access to comprehensive OET mock tests in Reading, Listening,
            Speaking, and Writing.
            <br className="hidden md:block" />
            <span className="font-semibold text-indigo-200">
              Start now with 10 free courses—upgrade any time for more!
            </span>
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/sign-up">
              <Button size="lg" className="bg-white text-indigo-900 hover:bg-gray-100">
                Get Started Free
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Complete OET Preparation Suite
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Reading Tests",
                desc: "Timed reading comprehension with healthcare contexts",
              },
              {
                icon: Headphones,
                title: "Listening Tests",
                desc: "Authentic medical consultations and scenarios",
              },
              {
                icon: Pencil,
                title: "Writing Tasks",
                desc: "Professional letter writing practice with feedback",
              },
              {
                icon: MessageSquare,
                title: "Speaking Practice",
                desc: "Role-play scenarios with detailed scoring",
              },
            ].map((feature, i) => (
              <Card key={i} className="p-6 bg-white/10 border-none text-white">
                <feature.icon className="h-12 w-12 mb-4 text-indigo-400" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section REMOVED or commented out */}
      {/* 
      <section id="pricing" className="py-20">
        ...
      </section>
      */}

      {/* Become a Tutor Section */}
      <section id="tutors" className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Join Our Expert Tutor Network
              </h2>
              <p className="text-gray-300 mb-8">
                Are you an experienced OET trainer? Join our platform to reach students globally
                and earn competitive compensation while working flexibly.
              </p>
              <div className="space-y-4">
                {[
                  "Set your own schedule",
                  "Access to global student base",
                  "Competitive compensation",
                  "Professional development opportunities",
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center text-white">
                    <CheckCircle className="h-5 w-5 mr-2 text-indigo-400" />
                    {benefit}
                  </div>
                ))}
              </div>
              <Link href="/tutor/application">
                <Button className="mt-8 bg-white text-indigo-900 hover:bg-gray-100">
                  Apply as Tutor
                </Button>
              </Link>
            </div>
            <div className="relative">
              <Users className="h-64 w-64 text-indigo-400 mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Get in Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center text-white">
                <Mail className="h-6 w-6 mr-3" />
                <span>support@dreampath.co.uk</span>
              </div>
              <div className="flex items-center text-white">
                <Phone className="h-6 w-6 mr-3" />
                <span>+44 755 767 9989</span>
              </div>
              <div className="flex items-center text-white">
                <Shield className="h-6 w-6 mr-3" />
                <span>Available 24/7</span>
              </div>
            </div>
            <Card className="p-6 bg-white/10 border-none">
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400"
                />
                <Button className="w-full bg-white text-indigo-900 hover:bg-gray-100">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-950 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Navigation className="h-6 w-6 text-white" />
                <span className="ml-2 text-xl font-bold text-white">DreamPath</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for OET exam preparation.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#features">Features</Link>
                </li>
                {/* <li><Link href="#pricing">Pricing</Link></li> */}
                <li>
                  <Link href="/become-a-tutor">Become a Tutor</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/legal/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/legal/terms">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/legal/guidelines">Guidelines</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  Twitter
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  LinkedIn
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Facebook
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} DreamPath. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
