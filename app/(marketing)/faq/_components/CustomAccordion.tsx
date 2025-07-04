'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem = ({ question, answer, isOpen, onToggle }: AccordionItemProps) => {
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        className="w-full py-4 flex justify-between items-center text-left"
        onClick={onToggle}
      >
        <span className="text-indigo-200 hover:text-white transition-colors">
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-indigo-200" />
        ) : (
          <ChevronDown className="h-5 w-5 text-indigo-200" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 text-indigo-300 text-sm">
          {answer}
        </div>
      )}
    </div>
  );
};

interface CustomAccordionProps {
  items: { q: string; a: string }[];
}

export const CustomAccordion = ({ items }: CustomAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-white/10">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.q}
          answer={item.a}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
};