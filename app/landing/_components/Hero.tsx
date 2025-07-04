'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Pass the OET Exam with Confidence
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          24/7 access to comprehensive mock tests for all four OET subsets. 
          Practice anytime, anywhere with expert-designed materials.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/sign-up">
            <Button 
              size="lg" 
              className="bg-white text-indigo-900 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-white border-white hover:bg-white/10 backdrop-blur-sm"
          >
            View Demo
          </Button>
        </div>
      </div>
    </section>
  );
}