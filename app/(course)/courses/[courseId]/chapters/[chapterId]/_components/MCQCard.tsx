// path: app/%28course%29/courses/%5BcourseId%5D/chapters/%5BchapterId%5D/_components/MCQCard.tsx

"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";

import { Chapter, Question } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";



interface MCQCardProps {
  chapter: Chapter & {
    questions: Question[];
  };
  questionStartNumber: number;
  courseId: string;
  onTogglePdfViewer: (url: string) => void;
  isPdfViewerOpen: boolean;
  onAnswerSelection: (hasAnswer: boolean) => void;
  shouldRandomize?: boolean; // Add this prop
}

const MCQCard: React.FC<MCQCardProps> = ({ 
  chapter, 
  questionStartNumber, 
  courseId,
  onTogglePdfViewer,
  isPdfViewerOpen,
  onAnswerSelection,
  shouldRandomize = true // Add default value
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loadTemporaryAnswers = async () => {
      try {
        const response = await axios.get(
          `/api/courses/${courseId}/chapters/${chapter.id}/temporary-answer`
        );
        if (response.data.answers) {
          const loadedAnswers: Record<string, string> = {};
          response.data.answers.forEach((answer: any) => {
            loadedAnswers[answer.questionId] = answer.answer;
          });
          setAnswers(loadedAnswers);
          onAnswerSelection(Object.keys(loadedAnswers).length > 0);
        }
      } catch (error) {
        console.error("Error loading temporary answers:", error);
      }
    };

    loadTemporaryAnswers();
  }, [chapter.id, courseId, onAnswerSelection]);

  const handleOptionSelect = async (questionId: string, option: string) => {
    try {
      setAnswers(prev => ({
        ...prev,
        [questionId]: option
      }));

      await axios.put(
        `/api/courses/${courseId}/chapters/${chapter.id}/temporary-answer`,
        {
          questionId,
          answer: option,
        }
      );
      onAnswerSelection(true);
    } catch (error) {
      toast.error("Failed to save answer");
      console.error("Error saving answer:", error);
    }
  };

  const handleImageLoad = (questionId: string) => {
    setImageLoading(prev => ({
      ...prev,
      [questionId]: false
    }));
  };

  const handleImageError = (questionId: string) => {
    setImageLoading(prev => ({
      ...prev,
      [questionId]: false
    }));
    toast.error("Failed to load image");
  };

  const handlePdfClick = () => {
    if (chapter.pdfUrl) {
      onTogglePdfViewer(chapter.pdfUrl);
    }
  };

  // Add this utility function at the top of your file
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  return (
    <div className="space-y-6">
      {chapter.questions.map((question, idx) => {
        const options = React.useMemo(() => {
          const parsedOptions = question.options instanceof Array          
            ? question.options
            : question.options
            ? JSON.parse(question.options as string)
            : [];

          return shouldRandomize ? shuffleArray(parsedOptions) : parsedOptions;
        }, [question.id, shouldRandomize]);

        const questionNumber = questionStartNumber + idx;

        return (
          <div key={question.id} className={idx === 0 ? "mb-20" : "space-y-4"}>
            {/* Question Container */}
            <div className="bg-gray-100 p-4 rounded-md mt-20">
              {/* Image Section (if available) */}
              {chapter.imageUrl && (
                <div className="relative w-full mb-4">
                  {imageLoading[question.id] && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                  <img
                    src={chapter.imageUrl}
                    alt="Question context"
                    className="w-full rounded-lg"
                    onLoad={() => handleImageLoad(question.id)}
                    onError={() => handleImageError(question.id)}
                  />
                </div>
              )}

              {/* Question Text - Now conditionally includes subtopic */}
              {chapter.position === 3 ? (
                <>
                  <div className="flex">
                    <div className="flex-none">
                      <strong>{questionNumber}.</strong>
                    </div>
                    <div className="flex-1 ml-2">
                      <strong>{question.subtopic}</strong>
                    </div>
                  </div>
                  <br />
                  <div className="flex">
                    <div className="flex-none invisible">
                      <strong>{questionNumber}.</strong>
                    </div>
                    <div className="flex-1 ml-2">
                      {question.question}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex">
                  <div className="flex-none">
                    <strong>{questionNumber}.</strong>
                  </div>
                  <div className="flex-1 ml-2">
                    {question.question}
                  </div>
                </div>
              )}
            </div>

            {/* PDF Link Section (if available) */}
            {chapter.pdfUrl && (
              <div 
                className={cn(
                  "flex items-center gap-2 p-3 rounded cursor-pointer transition-all",
                  "bg-blue-50 hover:bg-blue-100 border border-blue-200",
                  isPdfViewerOpen && "bg-blue-100 border-blue-300"
                )}
                onClick={handlePdfClick}
              >
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="text-blue-600 font-medium">
                  Reading Part A Text
                </span>
              </div>
            )}

            {/* Options Section */}
            {/* Options Section */}
            <div className="space-y-4  mt-4">
              {options.map((option: string, index: number) => {
                const optionLetter = String.fromCharCode(65 + index);
                const isSelected = answers[question.id] === option;

                return (
                  // <div key={index} className="flex items-start space-x-2">
                  <div key={`${question.id}-${option}`} className="flex items-start space-x-2">
                    <span className="mt-3 font-bold">{optionLetter}</span>
                    <div
                      className={cn(
                        "flex-1  border-4 border-gray-600 p-3 rounded-none cursor-pointer transition-all",
                        {
                          "border-orange-500 bg-orange-300": isSelected,
                          "hover:border-orange-500": !isSelected,
                        }
                      )}
                      onClick={() => handleOptionSelect(question.id, option)}
                    >
                      <span>{option}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MCQCard;