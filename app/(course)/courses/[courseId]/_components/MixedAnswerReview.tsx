"use client";


import React from "react";
import { ChapterWithQuestions, Question, UserAnswer } from "@/lib/type";


interface MixedAnswerReviewProps {
  chapter: ChapterWithQuestions & {
    position: number;  // Adding position since we need it
  };
  chapterAnswers: UserAnswer[];
}

export const MixedAnswerReview: React.FC<MixedAnswerReviewProps> = ({
  chapter,
  chapterAnswers,
}) => {
  // Helper function to determine question type based on position and index
  const determineQuestionType = (question: Question, index: number) => {
    // For Reading Part A (position 6)
    if (chapter.position === 6) {
      return index < 6 ? 'mcq' : 'fillblank';
    }
    // For Listening Parts (positions 1-2)
    if (chapter.position === 1 || chapter.position === 2) {
      return question.question.includes('[...]') ? 'fillblank' : 'other';
    }
    // For all other positions, check options
    const questionOptions = typeof question.options === 'string' 
      ? JSON.parse(question.options) 
      : question.options;
    return Array.isArray(questionOptions) && questionOptions.length > 0 ? 'mcq' : 'fillblank';
  };

  // Function to safely parse options
  const parseOptions = (options: string[] | string | null): string[] => {
    if (!options) return [];
    if (Array.isArray(options)) return options;
    try {
      return typeof options === 'string' ? JSON.parse(options) : [];
    } catch {
      return [];
    }
  };

  // Calculate total valid questions and correct answers
  const totalQuestions = chapter.questions.filter((q, idx) => 
    determineQuestionType(q, idx) !== 'other'
  ).length;

  const correctAnswers = chapterAnswers.filter((ua) => {
    const question = chapter.questions.find((q) => q.id === ua.questionId);
    if (!question) return false;

    const questionType = determineQuestionType(
      question, 
      chapter.questions.findIndex(q => q.id === question.id)
    );

    if (questionType === 'mcq') {
      return ua.answer === question.answer;
    } else if (questionType === 'fillblank') {
      return ua.answer.trim().toLowerCase() === question.answer.trim().toLowerCase();
    }
    return false;
  }).length;

  return (
    <div className="space-y-8">
      {/* Overall summary */}
      <div className="mb-4">
        <h4 className="font-bold text-lg">
          {chapter.title} - Review
        </h4>
        <p className="text-sm text-gray-600">
          Score: {correctAnswers} / {totalQuestions}
        </p>
      </div>

      {/* Questions */}
      {chapter.questions.map((question, index) => {
        const userAnswer = chapterAnswers.find(
          (ans) => ans.questionId === question.id
        );
        const attempted = Boolean(userAnswer);
        const questionType = determineQuestionType(question, index);

        if (questionType === 'other') return null;

        // MCQ Question
        if (questionType === 'mcq') {
          const options = parseOptions(question.options);

          return (
            <div key={question.id} className="border-l-4 pl-4 py-4 space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-lg text-gray-700">
                  Question {index + 1}
                </span>
                {!attempted && (
                  <span className="text-sm text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
                    Not attempted
                  </span>
                )}
              </div>
              <p className="text-gray-800">{question.question}</p>

              <div className="space-y-2">
                {options.map((option: string, optIdx: number) => {
                  const isCorrectAnswer = option === question.answer;
                  const isUserAnswer = attempted && userAnswer?.answer === option;

                  let optionStyle = "bg-white border-gray-200";
                  let labelText = "";
                  let labelColor = "";

                  if (attempted) {
                    if (isCorrectAnswer && isUserAnswer) {
                      optionStyle = "bg-green-50 border-green-200";
                      labelText = "Correct";
                      labelColor = "text-green-600";
                    } else if (isCorrectAnswer) {
                      optionStyle = "bg-green-50 border-green-200";
                      labelText = "Correct Answer";
                      labelColor = "text-green-600";
                    } else if (isUserAnswer) {
                      optionStyle = "bg-red-50 border-red-200";
                      labelText = "Your Answer";
                      labelColor = "text-red-600";
                    }
                  }

                  return (
                    <div
                      key={optIdx}
                      className={`p-3 rounded-lg border ${optionStyle} 
                        flex justify-between items-center hover:border-gray-300 transition-colors`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-700 min-w-[24px]">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span className="text-gray-800">{option}</span>
                      </div>
                      {attempted && labelText && (
                        <div className={`${labelColor} font-medium text-sm`}>
                          {labelText}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        // Fill-blank Question
        if (questionType === 'fillblank') {
          const parts = question.question.split('[...]');

          return (
            <div key={question.id} className="border-l-4 pl-4 py-4 space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-lg text-gray-700">
                  Question {index + 1}
                </span>
                {!attempted && (
                  <span className="text-sm text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
                    Not attempted
                  </span>
                )}
              </div>

              <div className="text-gray-800">
                {parts[0]}
                <span className={`mx-2 px-3 py-1 rounded ${
                  attempted
                    ? userAnswer?.answer.trim().toLowerCase() === question.answer.trim().toLowerCase()
                      ? "bg-green-50 border border-green-200 text-green-700"
                      : "bg-red-50 border border-red-200 text-red-700"
                    : "bg-gray-50 border border-gray-200"
                }`}>
                  {attempted ? userAnswer?.answer || "___" : "___"}
                </span>
                {parts[1]}
              </div>

              {attempted && userAnswer?.answer.trim().toLowerCase() !== question.answer.trim().toLowerCase() && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Correct answer: </span>
                  <span className="text-green-600">{question.answer}</span>
                </div>
              )}
            </div>
          );
        }
      })}
    </div>
  );
};

export default MixedAnswerReview;