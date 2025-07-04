"use client";

import React, { useState, useEffect } from "react";
import { Chapter, Question } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import { useDebounce } from "@/hooks/use-debounce";

type Props = {
  chapter: Chapter & {
    questions: Question[];
  };
  questionStartNumber: number;
  courseId: string;
  currentAttempt?: number;
  onAnswerSelection: (hasAnswer: boolean) => void;
};

const FillBlankPatientCard = ({ 
  chapter, 
  questionStartNumber, 
  courseId,
  currentAttempt = 1,
  onAnswerSelection
}: Props) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [pendingAnswer, setPendingAnswer] = useState<{
    questionId: string;
    value: string;
  } | null>(null);

  const caseSummary = chapter.description;
  
  // Debounce the pending answer
  const debouncedAnswer = useDebounce(pendingAnswer, 500);

  // A unified function to save an answer immediately
  const saveAnswerNow = async (answerObj: { questionId: string; value: string; }) => {
    if (!answerObj) return;
    try {
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapter.id}/temporary-answer`,
        {
          questionId: answerObj.questionId,
          answer: answerObj.value.trim(),
          attemptNumber: currentAttempt
        }
      );
      onAnswerSelection(true);
    } catch (error) {
      toast.error("Failed to save answer");
    }
  };

  useEffect(() => {
    const loadTemporaryAnswers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `/api/courses/${courseId}/chapters/${chapter.id}/temporary-answer`,
          {
            params: {
              attempt: currentAttempt
            }
          }
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
        toast.error("Failed to load previous answers");
      } finally {
        setIsLoading(false);
      }
    };

    loadTemporaryAnswers();
  }, [chapter.id, courseId, currentAttempt, onAnswerSelection]);

  // When the debounced answer is ready, save it
  useEffect(() => {
    if (debouncedAnswer) {
      saveAnswerNow(debouncedAnswer);
    }
  }, [debouncedAnswer]);

  const handleInputChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));

    setPendingAnswer({
      questionId,
      value
    });
    onAnswerSelection(true);
  };

  // On blur, immediately flush the pending answer
  const handleBlur = (questionId: string) => {
    if (pendingAnswer && pendingAnswer.questionId === questionId) {
      saveAnswerNow(pendingAnswer);
      setPendingAnswer(null);
    }
  };

  const hasBlankPattern = (question: Question): boolean => {
    return question.question.includes('[...]');
  };

  const renderQuestion = (question: Question, index: number) => {
    if (!hasBlankPattern(question)) {
      return (
        <li key={question.id} className="mb-2 ml-40">
          {question.question}
        </li>
      );
    }

    const parts = question.question.split('[...]');
    return (
      <li key={question.id} className="mb-2 ml-40">
        <div className="flex">
          <div className="flex-grow">
            {parts[0]}
            <input
              type="text"
              value={answers[question.id] || ''}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
              onBlur={() => handleBlur(question.id)}
              className="align-middle inline-block border-4 border-gray-600 w-60 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-blue-500 px-2 h-10 bg-white mx-1"
            />
            {parts[1]}
          </div>
        </div>
      </li>
    );
  };

  const groupedQuestions = chapter.questions.reduce((acc, question) => {
    const subtopic = question.subtopic || 'Other';
    if (!acc[subtopic]) {
      acc[subtopic] = [];
    }
    acc[subtopic].push(question);
    return acc;
  }, {} as Record<string, Question[]>);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  const totalBlankQuestions = chapter.questions.filter(hasBlankPattern).length;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mx-auto">
      <div className="border-b pb-4 mb-10">
        <h2 className="font-bold mb-2">
          Patient: {chapter.patientName}
        </h2>
      </div>
      
      <div className="mb-6">
        <p className="text-sm text-gray-500 mt-4">
          Total questions to answer: {totalBlankQuestions}
        </p>
      </div>

      {Object.entries(groupedQuestions).map(([subtopic, questions]) => (
        <div key={subtopic} className="mb-6">
          <h3 className="font-semibold mb-3 pl-0">{subtopic}</h3>
          <ul className="list-disc space-y-2">
            {questions.map((question, index) => renderQuestion(question, index))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FillBlankPatientCard;
