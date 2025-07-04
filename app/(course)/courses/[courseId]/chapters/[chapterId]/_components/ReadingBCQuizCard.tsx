// app/courses/[courseId]/chapters/[chapterId]/_components/ReadingBCQuizCard.tsx

import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Chapter, Question } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import PdfIcon from "@/public/assets/icons/pdf-icon.svg"; // Import SVG as component

interface ExtendedQuestion extends Question {
  questionNumber: number;
}

interface ReadingBCQuizCardProps {
  chapter: Chapter & {
    questions: ExtendedQuestion[];
  };
  courseId: string;
  position: number;
  onTogglePdfViewer: (url: string) => void;
  isPdfViewerOpen: boolean;
  onAnswerSelection: (hasAnswer: boolean) => void;  // Add this prop
}

const ReadingBCQuizCard: React.FC<ReadingBCQuizCardProps> = ({
  chapter,
  courseId,
  position,
  onTogglePdfViewer,
  isPdfViewerOpen,
  onAnswerSelection
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Determine if we're in Part B (positions 7-12) or Part C (positions 13-14)
  const isPartB = position >= 7 && position <= 12;

  useEffect(() => {
    const hasAnswers = Object.keys(answers).length > 0;
    onAnswerSelection(hasAnswers);
  }, [answers, onAnswerSelection]);

  // Load existing answers
  useEffect(() => {
    const loadAnswers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `/api/courses/${courseId}/chapters/${chapter.id}/temporary-answer`
        );
        if (response.data.answers) {
          const loadedAnswers: Record<string, string> = {};
          response.data.answers.forEach((answer: any) => {
            loadedAnswers[answer.questionId] = answer.answer;
          });
          setAnswers(loadedAnswers);
          
          // Notify parent if we have any answers
          onAnswerSelection(Object.keys(loadedAnswers).length > 0);
        }
      } catch (error) {
        console.error("Error loading answers:", error);
        toast.error("Failed to load previous answers");
      } finally {
        setIsLoading(false);
      }
    };

    loadAnswers();
  }, [chapter.id, courseId, onAnswerSelection]);

  const handleAnswerChange = async (questionId: string, option: string) => {
    try {

      console.log("Answer selected:", option);
      // Update local state
      setAnswers(prev => ({
        ...prev,
        [questionId]: option
      }));

      // Save to server
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapter.id}/temporary-answer`,
        {
          questionId,
          answer: option,
        }
      );

      // Notify parent that we have an answer
      onAnswerSelection(true);
      console.log("Answer selection notified");
    } catch (error) {
      toast.error("Failed to save answer");
      console.error("Error saving answer:", error);
    }
  };

  // Calculate question numbers
  const getQuestionNumber = (index: number) => {
    if (isPartB) {
      return position - 6;
    } else {
      const baseNumber = position === 13 ? 7 : 15;
      return baseNumber + index;
    }
  };

  const renderQuestion = (question: ExtendedQuestion, index: number) => {
    const questionNumber = getQuestionNumber(index);
    const options = typeof question.options === 'string' 
      ? JSON.parse(question.options) 
      : question.options || [];

    return (
      <div key={question.id} className="space-y-4  mb-6">
        {/* Question Header */}
        <div className="bg-gray-100 p-4 mt-20 ounded-md">
          <p className="font-semibold text-gray-900">
            {questionNumber}. &nbsp;{question.question}
          </p>

        </div>

        {/* PDF Link - for Part C (positions 13,14) */}
        {!isPartB && chapter.pdfUrl && (
          <button 
            onClick={() => onTogglePdfViewer(chapter.pdfUrl!)}
            className={cn(
              "flex items-center gap-2 p-3 w-full rounded",
              "hover:bg-blue-100 ",
              isPdfViewerOpen && "bg-blue-100 border-blue-300",
              "transition-colors duration-200"
            )}
          >
            <img 
              src="/icons/pdf.svg" 
              alt="PDF" 
              className="w-10 h-10"
            />
            <span className="text-blue-600 text-sm">
             <u> Reading Part C: Text {position === 13 ? '1' : '2'}</u>
            </span>
          </button>
        )}

        {/* Options */}
        <div className="space-y-2">
          {options.map((option: string, optionIndex: number) => {
            const isSelected = answers[question.id] === option;

            return (
              <div key={optionIndex} className="flex items-start space-x-2">
                <span className="font-semibold mt-2 w-6">
                  {String.fromCharCode(65 + optionIndex)}
                </span>
                <div
                  className={cn(
                    "flex-1 border-2 border-slate-600 p-2 rounded cursor-pointer transition-all",
                    {
                      "border-orange-500 bg-orange-300": isSelected,
                      "hover:border-orange-200": !isSelected,
                    }
                  )}
                  onClick={() => handleAnswerChange(question.id, option)}
                >
                  <span className="block w-full">{option}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // if (isLoading) {
  //   return <div className="text-center p-4">Loading questions...</div>;
  // }

  return (
    <div className="space-y-8">
      {/* Image for Part B */}
      {isPartB && chapter.pdfUrl && (
        <div className="mt-10 mb-20">
          <img
            src={chapter.pdfUrl}
            alt=""
            className="w-full max-h-[50vh] object-contain rounded-lg"
            onError={() => toast.error("Failed to load image")}
          />
        </div>
      )}



      {/* Questions */}
      <div className={cn(
        "space-y-8",
        !isPartB && "h-full overflow-y-auto"
      )}>
        {chapter.questions.map((question, index) => 
          renderQuestion(question, index)
        )}
      </div>
    </div>
  );
};

export default ReadingBCQuizCard;