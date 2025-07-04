// app/(course)/courses/[courseId]/chapters/[chapterId]/_components/ReadingSectionInstructions.tsx
import React from 'react';

interface ReadingSectionInstructionsProps {
  section: number;
}

const ReadingSectionInstructions: React.FC<ReadingSectionInstructionsProps> = ({
  section
}) => {
  const getInstructions = () => {
    switch (section) {
      case 1:
        return (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Section 1: Questions 1-6</h3>
            <p>For each question, identify which text (A, B, C or D) contains the information.</p>
            <p>Write the letter A, B, C or D in the space provided.</p>
          </div>
        );
      case 2:
        return (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Section 2: Questions 7-14</h3>
            <p>Complete each statement with a word or short phrase from one of the texts.</p>
            <p>Fill in the [...] with the exact words from the text.</p>
          </div>
        );
      case 3:
        return (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Section 3: Questions 15-20</h3>
            <p>Complete each statement using information from the texts.</p>
            <p>Your answers may require combining information from multiple texts.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
      {getInstructions()}
    </div>
  );
};

export default ReadingSectionInstructions;