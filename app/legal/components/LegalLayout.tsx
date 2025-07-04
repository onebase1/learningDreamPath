import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Download } from "lucide-react";
import Link from 'next/link';

interface LegalLayoutProps {
  title: string;
  children: React.ReactNode;
  lastUpdated?: string;
  pdfUrl?: string;
}

const LegalLayout = ({ 
  title, 
  children, 
  lastUpdated,
  pdfUrl 
}: LegalLayoutProps) => {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Navigation */}
      <nav className="mb-8">
        <Link 
          href="/landing" 
          className="inline-flex items-center text-sm text-blue-300 hover:text-blue-200 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
      </nav>

      {/* Main Content */}
      <Card className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader className="space-y-1 border-b border-white/10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-white">{title}</CardTitle>
            {pdfUrl && (
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-4 text-blue-300 border-blue-300 hover:bg-blue-900/20"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            )}
          </div>
          {lastUpdated && (
            <p className="text-sm text-indigo-200">
              Last updated: {lastUpdated}
            </p>
          )}
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none prose-invert prose-headings:text-white prose-p:text-indigo-200 prose-a:text-blue-300 prose-strong:text-white">
          {children}
        </CardContent>
      </Card>

      {/* Footer */}
      <footer className="mt-8 text-center text-sm text-indigo-200">
        <p>© {new Date().getFullYear()} Dreampath Ltd. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <Link href="/legal/privacy-policy" className="text-blue-300 hover:text-blue-200 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/legal/terms" className="text-blue-300 hover:text-blue-200 transition-colors">
            Terms of Service
          </Link>
          <Link href="/legal/guidelines" className="text-blue-300 hover:text-blue-200 transition-colors">
            User Guidelines
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default LegalLayout;