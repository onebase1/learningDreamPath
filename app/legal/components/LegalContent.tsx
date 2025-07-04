import React from 'react';
import { Card } from "@/components/ui/card";

interface LegalContentProps {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

const LegalContent = ({ title, lastUpdated, children }: LegalContentProps) => {
  return (
    <Card className="p-8 max-w-4xl mx-auto">
      <div className="prose prose-sm max-w-none">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        {lastUpdated && (
          <p className="text-sm text-gray-500 mb-8">Last updated: {lastUpdated}</p>
        )}
        {children}
      </div>
    </Card>
  );
};

export default LegalContent;