import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

const features = [
  'Mock Tests for all OET subsets',
  '24/7 Online Access',
  'Expert Feedback',
  'Live Group Classes',
  'Practice Materials',
  'One-to-one Support'
]

export default function Hero() {
  return (
    <div className="relative isolate justify-beteen  pt-16 bg-gradient-to-b from-blue-950 to bg-black">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-500 to-blue-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              
              <span className="inline-block overflow-hidden whitespace-nowrap border-r-4 border-white/50 pr-1 animate-typing">
                {" "}Practice OET with us
              </span>         
              <span>
                <br />
                <br />              
                Watch your dreams come true
                
              </span>
              
            </h1>
            <p className="text-lg leading-8 text-gray-100 mb-8">
              Comprehensive online practice tests and preparation materials for doctors, nurses, pharmacists, and physiotherapists. Get expert feedback and support 24/7.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-12">
              <Button size="lg" asChild className="bg-slate-50 hover:text-blue-900  text-blue-900 hover:bg-gray-100">
                <Link href="/sign-up">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white hover:bg-white/10 hover:text-white">
                <Link href="#pricing">View Pricing</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-center text-white">
                  <CheckCircle className="h-5 w-5 mr-2 text-blue-300" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-2xl ring-1 ring-white/10">
              <div className="aspect-[4/3] relative">
                <img 
                  src="/assets/hero.png" 
                  alt="OET Practice Platform" 
                  className="rounded-lg object-cover"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}