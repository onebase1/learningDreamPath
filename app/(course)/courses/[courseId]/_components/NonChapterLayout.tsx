"use client";

import React from "react";

interface NonChapterLayoutProps {
  /** Title displayed in the header */
  title: string;
  /** Main content */
  children: React.ReactNode;
  /** If you want a custom footer, supply React nodes here */
  footer?: React.ReactNode;

  /** Secondary button label & handler (optional) */
  secondaryLabel?: string;
  onSecondary?: () => void;

  /** 'Next' button & handler in the header */
  onNext?: () => void;
  nextLabel?: string;
  isNextDisabled?: boolean;
}

export default function NonChapterLayout({
  title,
  children,
  footer,
  secondaryLabel,
  onSecondary,
  onNext,
  nextLabel = "Next",
  isNextDisabled = false,
}: NonChapterLayoutProps) {
  return (
    <div className="flex flex-col h-full max-w-[1021px] mx-auto">
      {/* Header */}
      <header className="bg-blue-500 border-4 border-blue-500 text-white p-4 flex justify-between items-center">
        <div className="font-bold">{title}</div>
        <button
          onClick={onNext}
          disabled={isNextDisabled}
          className={`flex items-center text-white px-4 py-2 rounded ${
            isNextDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600 bg-orange-500"
          }`}
        >
          {nextLabel}
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">{children}</div>

      {/* Footer */}
      <footer className="bg-transparent p-4 flex justify-between items-center">
        {footer ? (
          // If a custom footer is passed, render it here
          footer
        ) : (
          // Else fall back to a default simple footer with a secondary button if present
          <>
            {secondaryLabel && (
              <button
                onClick={onSecondary}
                className="flex items-center text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {secondaryLabel}
              </button>
            )}
            <div className="flex-1" /> {/* Spacer */}
          </>
        )}
      </footer>
    </div>
  );
}
