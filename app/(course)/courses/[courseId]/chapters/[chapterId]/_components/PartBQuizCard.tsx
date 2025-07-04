import React, { useState } from 'react';

interface Question {
  id: string;
  subtopic: string;
  question: string;
  options: string[];
  answer: string;
}

interface ChapterProps {
  questions: Question[];
  onAnswerSelection?: (hasAnswer: boolean) => void;  // Added this line
}

// Then use it in the PartBQuizCard component
const PartBQuizCard: React.FC<ChapterProps> = ({ questions, onAnswerSelection }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

  const handleSelectAnswer = (questionId: string, option: string) => {
    setSelectedAnswers(prev => {
      const newAnswers = { ...prev, [questionId]: option };
      // Call onAnswerSelection with true if any answer is selected
      onAnswerSelection?.(Object.keys(newAnswers).length > 0);
      return newAnswers;
    });
  };

  return (
    <div className="space-y-8">
      {questions.map((question, index) => (
        <div key={question.id} className="bg-white shadow-md rounded-lg p-6">
          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <p className="font-bold">
              {index + 25}. {question.subtopic}
            </p>
            <p className="mt-2">{question.question}</p>
          </div>
          <div className="space-y-2">
            {question.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className={`p-3 border rounded cursor-pointer ${
                  selectedAnswers[question.id] === option ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onClick={() => handleSelectAnswer(question.id, option)}
              >
                <span className="font-bold mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
                {option}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PartBQuizCard;