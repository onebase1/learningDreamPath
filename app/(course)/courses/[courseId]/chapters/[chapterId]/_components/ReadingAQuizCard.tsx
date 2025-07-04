//path: app/(course)/courses/[courseId]/chapters/[chapterId]/_components/ReadingAQuizCard.tsx
// "use client";

import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";
import { Chapter, Question } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import PdfIcon from "@/public/assets/icons/pdf-icon.svg"; 

interface ExtendedQuestion extends Question {
  section: number | null;
  questionNumber: number;
}

interface ReadingAQuizCardProps {
  chapter: Chapter & {
    questions: ExtendedQuestion[];    
  };
  courseId: string;
  position: number;
  onTogglePdfViewer: (url: string) => void;
  isPdfViewerOpen: boolean;
  onAnswerSelection: (hasAnswer: boolean) => void;
}

const ReadingAQuizCard: React.FC<ReadingAQuizCardProps> = ({
  chapter,
  courseId,
  position,
  onTogglePdfViewer,
  isPdfViewerOpen,
  onAnswerSelection
  
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  
  //mapped

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

  const renderQuestions = (section: number) => {
    const sectionQuestions = chapter.questions.filter(q => q.section === section);
    const startIndex = section === 1 ? 0 : section === 2 ? 6 : 14;

    return (
      <div className="space-y-6">
        {sectionQuestions.map((question, index) => (
          <div key={question.id}>
            {section === 1 
              ? renderMCQQuestion(question, startIndex + index)
              : renderFillBlankQuestion(question, startIndex + index)}
          </div>
        ))}
      </div>
    );
  };
  

  const getSectionInstructions = (section: number) => {
    switch(section) {
      case 1:
        return "Questions 1-6: Choose which text (A, B, C or D) contains the information.";
      case 2:
        return "Questions 7-14: Complete each statement using information from the texts.";
      case 3:
        return "Questions 15-20: Fill in the blanks using information from multiple texts.";
      default:
        return "";
    }
  };

  // if (isLoading) {
  //   return <div className="text-center">Loading...</div>;
  // }

  const handleAnswerChange = async (questionId: string, value: string) => {
    try {
      setAnswers(prev => ({
        ...prev,
        [questionId]: value
      }));
  
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapter.id}/temporary-answer`,
        {
          questionId,
          answer: value,
        }
      );

      onAnswerSelection(true);

    } catch (error) {
      toast.error("Failed to save answer");
      console.error("Error saving answer:", error);
    }
  };
  
  const renderMCQQuestion = (question: ExtendedQuestion, index: number) => {
    const questionNumber = index + 1;
    const options = typeof question.options === 'string'
      ? JSON.parse(question.options) 
      : question.options || [];
      
    return (
      <div key={question.id} className="space-y-4 mt-20 mb-6">
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="font-semibold text-gray-900">
            {questionNumber}. {question.question}
          </p>
        </div>
   
        {chapter.pdfUrl && (
          <button 
            onClick={() => onTogglePdfViewer(chapter.pdfUrl!)}
            className={cn(
              "flex items-center gap-2 p-3 w-full rounded",
              " hover:bg-blue-100", 
              isPdfViewerOpen && "bg-blue-100 border-blue-300",
              "transition-colors duration-200"
            )}
          >
            <img src="/icons/pdf.svg" alt="PDF" className="w-10 h-10 "/>
            <span className="text-blue-600 text-sm">
              <u>Reading Part A: Texts A, B, C, D</u>
            </span>
          </button>
        )}
   
        <div className="space-y-2">
          {options.map((option: string, optionIndex: number) => {
            const isSelected = answers[question.id] === option;
            return (
              <div key={optionIndex} className="flex items-start space-x-2">
                <div
                  className={cn(
                    "flex-1 border-4 border-gray-600 px-4 py-2 h-14 rounded-none cursor-pointer transition-all",
                    {
                      "border-orange-500 bg-orange-300": isSelected,
                      "hover:border-orange-500": !isSelected,
                    }
                  )}
                  onClick={() => handleAnswerChange(question.id, option)}
                >
                  <span className="block w-full">Text {option}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
   };
  
  const renderFillBlankQuestion = (question: ExtendedQuestion, index: number) => {
    const parts = question.question.split('[...]');
    const questionNumber = index + 1;
    return (
      <div key={question.id} className="mb-6">
        <div className="p-4 rounded-md">
          <div className="flex items-start">
            <div className="min-w-[2.5rem] font-semibold text-gray-900">{questionNumber}.&nbsp;&nbsp;</div>
            <div className="flex-1">
              <div className="inline gap-1">
                <span className="text-gray-900 align-middle">{parts[0]}</span>
                <input
                  type="text"
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="align-middle inline-block border-4 border-gray-600 w-60 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-blue-500 px-2 h-10 bg-white mx-1"
                />
                <span className="text-gray-900 align-middle">{parts[1]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* PDF Link - for Part C (positions 13,14)
      { chapter.pdfUrl && (
        <button 
          onClick={() => onTogglePdfViewer(chapter.pdfUrl!)}
          className={cn(
            "flex items-center gap-2 p-3 w-full rounded",
            "bg-blue-50 hover:bg-blue-100 border border-blue-200",
            isPdfViewerOpen && "bg-blue-100 border-blue-300",
            "transition-colors duration-200"
          )}
        >
          <img 
            src="/assets/icons/pdf-icon.svg" 
            alt="PDF" 
            className="w-5 h-5"
          />
          <span className="text-blue-600 font-medium">
            Reading Part A: Text Booklet
          </span>
        </button>
      )} */}

      {/* All Questions Container */}
      <div className="space-y-10">
        {/* Section 1: MCQ Questions (1-6) */}
        <div className="space-y-6">
          {renderQuestions(1)}
        </div>

        {/* Section 2: Fill-in-blank Questions (7-14) */}
        <div className="space-y-6">
          <div className="bg-gray-100 px-4 py-8 mt-20 rounded">
            <p className="text-black">
              <strong>Questions 7-13 </strong> 
              <br />
              <br />
              Answer the following questions, <strong>14-20</strong>, with a word or short phrase from one of the texts. 
              Each answer may include words, numbers or both. You should <strong>not</strong> write full sentences.
              

            </p>
          </div>
          <div className="space-y-4">
              {chapter.pdfUrl && (
                <button 
                  onClick={() => onTogglePdfViewer(chapter.pdfUrl!)}
                  className={cn(
                    "flex items-center gap-2 p-3 w-full rounded",
                    "bg-blue-50 hover:bg-blue-100 border border-blue-200", 
                    isPdfViewerOpen && "bg-blue-100 border-blue-300",
                    "transition-colors duration-200"
                  )}
                >
                  <img src="/icons/pdf.svg" alt="PDF" className="w-10 h-10 "/>
                  <span className="text-blue-600 text-sm">
                    <u>Reading Part A: Texts</u>
                  </span>
                </button>
              )}
            </div>
          {renderQuestions(2)}
        </div>

        {/* Section 3: Advanced Fill-in-blank Questions (15-20) */}
        <div className="space-y-6">
          <div className="bg-gray-100 px-4 py-8 mt-20 rounded">
            <p className="text-black">
              <strong>Questions 14-20</strong> 
              <br />
              <br />
              Answer the following questions, <strong>14-20</strong>, with a word or short phrase from one of the texts. 
              Each answer may include words, numbers or both. You should <strong>not</strong> write full sentences.
              

            </p>
            </div>
            <div className="space-y-4">
              {chapter.pdfUrl && (
                <button 
                  onClick={() => onTogglePdfViewer(chapter.pdfUrl!)}
                  className={cn(
                    "flex items-center gap-2 p-3 w-full rounded",
                    "bg-blue-50 hover:bg-blue-100 border border-blue-200", 
                    isPdfViewerOpen && "bg-blue-100 border-blue-300",
                    "transition-colors duration-200"
                  )}
                >
                  <img src="/icons/pdf.svg" alt="PDF" className="w-10 h-10 "/>
                  <span className="text-blue-600 text-sm">
                    <u>Reading Part A: Texts</u>
                  </span>
                </button>
              )}
            </div>

         
          {renderQuestions(3)}
        </div>
      </div>
    </div>
  );
};

export default ReadingAQuizCard;