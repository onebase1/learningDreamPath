"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Chapter, Course, CourseProgress, Question, UserAnswer } from "@prisma/client";

interface ChapterWithQuestions extends Chapter {
  questions: Question[];
  title: string;
  position: number;
}

interface CourseWithChapters extends Course {
  chapters: ChapterWithQuestions[];
}

interface MCQResultsProps {
  course: CourseWithChapters;
  courseProgress?: CourseProgress;
  userAnswers: (UserAnswer & {
    chapter: ChapterWithQuestions;
  })[];
}

const MCQResults = ({ course, courseProgress, userAnswers }: MCQResultsProps) => {
  const router = useRouter();
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  if (!courseProgress) {
    return <div>No results available.</div>;
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(date));
  };

  const calculateChapterScore = (chapterId: string) => {
    const chapterAnswers = userAnswers.filter(answer => answer.chapterId === chapterId);
    const correctAnswers = chapterAnswers.reduce((acc, answer) => {
      const question = course.chapters
        .find(c => c.id === chapterId)
        ?.questions.find(q => q.id === answer.questionId);
      return question?.answer === answer.answer ? acc + 1 : acc;
    }, 0);

    return {
      attempted: chapterAnswers.length,
      correct: correctAnswers
    };
  };

  const getTotalQuestions = (): number => {
    return course.chapters.reduce((acc, chapter) => acc + chapter.questions.length, 0);
  };

  const getTotalCorrect = (): number => {
    return course.chapters.reduce((acc, chapter) => {
      const { correct } = calculateChapterScore(chapter.id);
      return acc + correct;
    }, 0);
  };

  const renderAnswerReview = (chapterId: string) => {
    const chapter = course.chapters.find(c => c.id === chapterId);
    if (!chapter) return null;
    
    const chapterAnswers = userAnswers.filter(answer => answer.chapterId === chapterId);

    return (
      <div className="mt-4 pl-4 space-y-4">
        {chapter.questions.map((question, index) => {
          const userAnswer = chapterAnswers.find(a => a.questionId === question.id);
          const isCorrect = userAnswer?.answer === question.answer;
          const options = typeof question.options === 'string' 
            ? JSON.parse(question.options)
            : question.options;

          return (
            <div key={question.id} className="border-l-2 pl-4 pb-4">
              <p className="font-semibold mb-2">Question {index + 1}</p>
              <p className="mb-2">{question.question}</p>
              <div className="space-y-2">
                {options.map((option: string, i: number) => (
                  <div 
                    key={i}
                    className={`p-2 rounded ${
                      option === question.answer 
                        ? 'bg-green-100 border-green-500' 
                        : option === userAnswer?.answer && option !== question.answer
                        ? 'bg-red-100 border-red-500'
                        : 'bg-gray-50'
                    } border`}
                  >
                    <span className="font-medium">{String.fromCharCode(65 + i)}.</span> {option}
                    {option === question.answer && (
                      <span className="ml-2 text-green-600">(Correct Answer)</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Course Results</h1>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Total Score</h3>
            <p className="text-2xl">{getTotalCorrect()}/{getTotalQuestions()}</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Attempt</h3>
            <p className="text-2xl">{courseProgress.attempts}</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Completed</h3>
            <p className="text-sm">
              {courseProgress.lastAttemptDate && 
                formatDate(courseProgress.lastAttemptDate)
              }
            </p>
          </Card>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Chapter Results</h2>
        {course.chapters.map((chapter) => {
          const score = calculateChapterScore(chapter.id);
          const isFillBlank = chapter.position <= 2; // First two chapters are fill in blank

          return (
            <div key={chapter.id} className="mb-4">
              <Card 
                className={`p-4 ${
                  expandedChapter === chapter.id ? 'border-blue-500' : ''
                }`}
              >
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => !isFillBlank && setExpandedChapter(
                    expandedChapter === chapter.id ? null : chapter.id
                  )}
                >
                  <div>
                    <h3 className="font-semibold">{chapter.title}</h3>
                    <p className="text-sm text-gray-600">
                      {isFillBlank ? (
                        "Fill in the Blank - Not Available"
                      ) : (
                        `Score: ${score.correct}/${chapter.questions.length} marks`
                      )}
                    </p>
                  </div>
                  {!isFillBlank && (
                    <Button variant="ghost" size="sm">
                      {expandedChapter === chapter.id ? (
                        <ChevronUp className="h-6 w-6" />
                      ) : (
                        <ChevronDown className="h-6 w-6" />
                      )}
                    </Button>
                  )}
                </div>
                {expandedChapter === chapter.id && renderAnswerReview(chapter.id)}
              </Card>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between">
        <Button
          onClick={() => router.push(`/courses/${course.id}`)}
          variant="outline"
        >
          Return to Course
        </Button>
        <Button
          onClick={() => router.push(`/courses/${course.id}/chapters/${course.chapters[0].id}`)}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default MCQResults;