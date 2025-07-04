// ChapterFooter.tsx
"use client";

import { FC } from "react";
import React from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChapterFooterProps {
  onNextSection: () => void;
  isLastChapter: boolean;
  isLocked: boolean;
  buttonText: string; // e.g. "Next Section"
  isDisabled?: boolean;
  position: number;
  className?: string;
};

const ChapterFooter: FC<ChapterFooterProps> = ({
  onNextSection,
  isLastChapter,
  isLocked,
  buttonText,
  isDisabled,
  position,
  className,
}) => {
  // If last chapter, label says "Finish Course"; else "Next Section"
  const displayLabel = isLastChapter ? "Finish Course" : buttonText;

  const handleClick = () => {
    // We let ChapterContent handle confetti or finishing logic,
    // so just call onNextSection() here
    onNextSection();
  };

  return (
    <footer
      className={`bg-blue-500 p-4 flex justify-between items-center text-xl ${className}`}
    >
      <button className="flex items-center text-white">
        {/* optional back button or blank */}
      </button>
      <Button
        className="flex items-center text-white bg-blue-600 hover:bg-blue-400"
        variant="ghost"
        onClick={handleClick}
        disabled={isLocked || isDisabled}
      >
        {displayLabel}
        <ChevronRight size={30} className="ml-2" />
      </Button>
    </footer>
  );
};

export default ChapterFooter;
