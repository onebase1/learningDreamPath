//path: app/%28course%29/courses/%5BcourseId%5D/_components/CourseResults.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  Lightbulb,
  CheckCircle,
  Clock,
  AlertTriangle,
  BarChart2,
  Eye,
  BookOpenCheck,
  StampIcon,
  Star,
  Stars,
  ShieldAlert,
  ShieldCheck,
  Clock11,
  Import,
} from "lucide-react";

import NonChapterLayout from "./NonChapterLayout";
import GoogleFormModal from "./GoogleFormModal";
import { MixedAnswerReview } from "./MixedAnswerReview";

import PerformanceBreakdown from "./PerformanceBreakdown"; // <— new import

// Import your GRADES (already in constants.ts)
import { GRADES } from "@/actions/constants";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Rating from "./star-rating";
import { CourseResultsProps } from "@/lib/type";



// Define GradeKey type
type GradeKey = 'A' | 'B' | 'C' | 'D' | 'E'

const gradeStarMapping: Record<GradeKey, number> = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
};


function getGradeData(scoreOutOf500: number): { gradeKey: GradeKey; description: string; achievement: string; nextSteps: string } {
  for (const [key, gradeVal] of Object.entries(GRADES)) {
    const gradeKey = key as GradeKey;
    if (scoreOutOf500 >= gradeVal.min && scoreOutOf500 <= gradeVal.max) {
      return { gradeKey, ...gradeVal };
    }
  }
  return { gradeKey: 'E', ...GRADES.E };
}

// Same two-view approach
enum ResultsView {
  SUMMARY = "SUMMARY",
  DETAILS = "DETAILS",
}

const CourseResults = ({ course, courseProgress, userAnswers }: CourseResultsProps) => {
  const router = useRouter();
  const [view, setView] = useState<ResultsView>(ResultsView.SUMMARY);
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  const [isGoogleFormOpen, setGoogleFormOpen] = useState(false);

  if (!courseProgress) {
    return <div>No results available.</div>;
  }

  // Format date
  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));

  // Grab most recent answers
  const getMostRecentAnswers = (answers: any[]) => {
    const latestAttempt = Math.max(...answers.map((a) => a.attemptNumber));
    const filtered = answers.filter(
      (a) => a.attemptNumber === latestAttempt && !a.isTemporary
    );
    const answerMap = new Map();
    const sorted = [...filtered].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    sorted.forEach((answer) => {
      const key = `${answer.questionId}`;
      if (!answerMap.has(key)) {
        answerMap.set(key, answer);
      }
    });
    return Array.from(answerMap.values());
  };

  // Calculate raw total score
  const totalScore = course.chapters.reduce((acc, chapter) => {
    const chapterAnswers = userAnswers.filter((ua) => ua.chapterId === chapter.id);
    const mostRecent = getMostRecentAnswers(chapterAnswers);

    const correctInChapter = mostRecent.reduce((sum, ans) => {
      const question = chapter.questions.find((q) => q.id === ans.questionId);
      if (!question) return sum;
      // Fill-in if position <= 2, else multiple choice
      if (chapter.position <= 2) {
        const trimmedUser = ans.answer.trim().toLowerCase();
        const trimmedCorrect = question.answer.trim().toLowerCase();
        return trimmedUser === trimmedCorrect ? sum + 1 : sum;
      } else {
        return ans.answer === question.answer ? sum + 1 : sum;
      }
    }, 0);

    return acc + correctInChapter;
  }, 0);

  // total questions
  const totalQuestions = course.chapters.reduce((acc, chapter) => {
    if (chapter.position === 1 || chapter.position === 2) {
      const fillBlankQ = chapter.questions.filter((q) => q.question.includes("[...]"));
      return acc + fillBlankQ.length;
    }
    return acc + chapter.questions.length;
  }, 0);

  // Scaled out of 500
  const scaledScore = totalQuestions > 0
    ? Math.round((totalScore / totalQuestions) * 500)
    : 0;

  // Grade data
  const { gradeKey, description, achievement, nextSteps } = getGradeData(scaledScore);
  const starValue = gradeStarMapping[gradeKey];

  // Some placeholders
  const timeSpent = "45";
  const totalTimeMinutes = 45;
  const avgTimePerQuestion = 2.25;
  const totalWrong = totalQuestions - totalScore;

  // On exit
  const handleExit = () => {
    router.push("/");
  };

  

  // ---------------------------------------
  // PERFORMANCE BREAKDOWN PER CHAPTER
  // ---------------------------------------
  // We'll produce an array: [ { label: "Chapter 1", percentage: 90 }, ... ]
  // Where each "chapter" is correct/ total * 100
  const chaptersData = course.chapters
    .slice() // shallow copy
    .sort((a, b) => a.position - b.position) // sort by position ascending
    .map((chapter) => {
      // find user answers for this chapter
      const chapAnswers = userAnswers.filter((ua) => ua.chapterId === chapter.id);
      const mostRecent = getMostRecentAnswers(chapAnswers);
      // correct / total
      const totalQ = chapter.position <= 2
        ? chapter.questions.filter((q) => q.question.includes("[...]")).length
        : chapter.questions.length;
      let correctCount = 0;
      for (const ans of mostRecent) {
        const question = chapter.questions.find((q) => q.id === ans.questionId);
        if (!question) continue;
        if (chapter.position <= 2) {
          // fill-in
          const trimmedUser = ans.answer.trim().toLowerCase();
          const trimmedCorrect = question.answer.trim().toLowerCase();
          if (trimmedUser === trimmedCorrect) correctCount++;
        } else {
          // multiple choice
          if (ans.answer === question.answer) correctCount++;
        }
      }
      const percentage = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;
      return {
        label: `Chapter ${chapter.position}`, // or chapter.title if you prefer
        percentage,
      };
    });

  return (
    <NonChapterLayout 
      title="Course Results"
      onNext={handleExit}
      nextLabel="Return to Courses"
      
    >
      <div className="h-full border-blue-500 shadow-md">
        {/* ================== SUMMARY VIEW ================== */}
        {view === ResultsView.SUMMARY && (
          <div className="bg-customGray border border-gray-300 rounded p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4">Overall Performance</h2>

            {/* 3 cards at top */}
            <div className="grid gap-8 md:grid-cols-3  rounded">
              {/* Card 1: Scaled Score & Grade */}
              <Card className="p-4 border border-gray-300 bg-white relative">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm text-gray-600 mb-1">Score</h3>
                  <Stars className="h-10 w-10 text-yellow-500" />
                </div>
                <p className="text-6xl text-gray-600 p-8 text-center font-bold">{scaledScore}
                  <span className="text-xl text-gray-600">/500</span></p>
                
                <p className="text-sm text-gray-700 mt-1">{totalScore}/{totalQuestions}</p>
                
              </Card>

              {/* Card 2: Time Spent */}
              <Card className="p-4 border border-gray-300 bg-white">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm text-gray-600 mb-1">Grade</h3>
                  <ShieldCheck className="h-10 w-10 text-green-500" />
                </div>
                <p className="text-6xl text-gray-600 p-8 text-center font-semibold">
                  {gradeKey}
                </p>
                {/* Add the Rating component below the grade */}
                <div className="flex justify-center">
                  <Rating size="lg" max={5} value={starValue} />
                </div>
              </Card>

              {/* Card 3: Completed date */}
              <Card className="p-4 border border-gray-300 bg-white">
                
                <div className="flex justify-between items-center">
                  <h3 className="text-sm text-gray-600 mb-1">Time Spent</h3>
                  <Clock className="h-10 w-10 bo solid text-blue-500" />
                </div>
                <p className="text-6xl p-8 text-center font-semibold">{timeSpent}
                  <span className="text-xl text-gray-600">mins</span>
                </p>
              </Card>
            </div>
            {/* flex justify-between items-center" */}
            {/* Grading text (was "Recommendations") */}
            <Card className="mt-6  border-gray-300 p-4 bg-white">
              <div className="flex justify-between items-center gap-2 mb-4">
              <h3 className="font-semibold text-2xl">Grading</h3>
                <Lightbulb className="h-10 w-10 text-yellow-500" />
                
              </div>
              <p className="text-gray-700 mb-2">{description}</p>
              <p className="text-gray-700 mb-2">
                <strong>Achievement:</strong> {achievement}
              </p>
              <p className="text-gray-700">
                <strong>Next Steps:</strong> {nextSteps}
              </p>
            </Card>

            {/* Strengths & Areas for Improvement (unchanged, hardcoded) */}
            <div className="mt-2 grid gap-2 grid-cols-1 md:grid-cols-2">
              <Card className="p-4 border border-gray-300 bg-white">
                <h3 className="font-semibold mb-2 text-xl">Strengths</h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Excellent comprehension</li>
                  <li>Strong problem-solving</li>
                  <li>Quick completion time</li>
                </ul>
              </Card>
              <Card className="p-4 border border-gray-300 bg-white">
                <h3 className="font-semibold mb-2 text-xl">Areas for Improvement</h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Review chapter 3 concepts</li>
                  <li>Practice more examples</li>
                </ul>
              </Card>
            </div>

            {/* ========== NEW: PERFORMANCE BREAKDOWN SECTION ========== */}
            <Card className="mt-2">
              <PerformanceBreakdown data={chaptersData} />
            </Card>

            {/* Bottom buttons */}
            <div className="mt-4 flex justify-between items-center">

              <Button variant="success"
                onClick={() => setGoogleFormOpen(true)}
                // className="bg-gray-100 hover:bg-gray-600 text-gray-500 font-bold py-2 px-8 rounded"
              >
                Give Feedback
              </Button>
              <Button variant="ghost"
                onClick={() => setView(ResultsView.DETAILS)}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                <Eye className="h-4 w-4" />
                View Detailed Results
              </Button>


            </div>
          </div>
        )}

        {/* ================== DETAILS VIEW ================== */}
        {view === ResultsView.DETAILS && (
          <div className="h-full bg-custormGray border border-gray-300 rounded p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4">Detailed Results Per Chapter</h2>

            <div className="grid gap-4 md:grid-cols-3 mb-4 rounded">
              <Card className="shadow p-4 relative rounded">
                <div className="flex items-center justify-between text-gray-600 text-sm mb-1">
                  <span>Correct Answers</span>
                  <CheckCircle className="h-10 w-10 text-green-500 absolute top-4 right-4" />
                </div>
                <p className="text-4xl p-8 text-center font-semibold">{totalScore}
                  <span className="text-xl text-gray-600">/{totalQuestions}</span>
                </p>
                <Progress
                  value={(totalScore / totalQuestions) * 100}
                  className="my-4 bg-gray-200 [&>div]:bg-green-500"
                />
              </Card>
              <Card className="shadow p-4 relative rounded">
                <div className="flex items-center justify-between text-gray-600 text-sm mb-1">
                  <span>Incorrect Answers</span>
                  <AlertTriangle className="h-10 w-10 text-red-500 absolute top-4 right-4" />
                </div>
                <p className="text-4xl p-8 text-center font-semibold">{totalWrong}
                  <span className="text-xl text-gray-600">/{totalQuestions}</span>
                </p>
                <Progress
                  value={(totalWrong / totalQuestions) * 100}
                  className="my-4 bg-gray-200 [&>div]:bg-red-500"
                />
              </Card>
              <Card className="shadow p-4 relative rounded">
                <div className="flex items-center justify-between text-gray-600 text-sm mb-1">
                  <span>Avg Time/Question</span>
                  <BookOpenCheck className="h-10 w-10 text-yellow-600 absolute top-4 right-4" />
                </div>
                <p className="text-4xl p-8 text-center font-semibold">{avgTimePerQuestion}
                  <span className="text-xl text-gray-600">mins</span>
                </p>
              </Card>
            </div>



            {/* Collapsibles */}
            <Card className="p-4 bg-white border border-gray-300 mt-">
              <h2 className="font-semibold mb-2 flex items-center gap-2">
                <BarChart2 className="h-10 w-10 text-blue-400 mt-2 mb-2" />
                <p className="text-xl">Detailed Review</p>
              </h2>
              <div className="overflow-y-auto flex-1 p-6"> {/* Added overflow and flex properties */}

                {course.chapters.map((chapter) => {
                  const chapAnswers = userAnswers.filter((ua) => ua.chapterId === chapter.id);
                  const mostRecent = getMostRecentAnswers(chapAnswers);

                  return (
                    <div
                      key={chapter.id}
                      className="mb-4 border rounded border-gray-200"
                    >
                      <div
                        className="p-4 flex justify-between items-center cursor-pointer bg-gray-50"
                        onClick={() =>
                          setExpandedChapter(
                            expandedChapter === chapter.id ? null : chapter.id
                          )
                        }
                      >
                        <span className="font-medium">Chapter {chapter.position}</span>
                        <span>
                          {expandedChapter === chapter.id ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </span>
                      </div>
                      {expandedChapter === chapter.id && (
                        <div className="p-4">
                          <MixedAnswerReview
                            chapter={chapter}
                            chapterAnswers={mostRecent}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Bottom buttons */}
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() => setView(ResultsView.SUMMARY)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Summary
              </button>
              <button
                onClick={() => setGoogleFormOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Give Feedback
              </button>

            </div>

          </div>

        )}

      </div>


      {/* Google Form Modal */}
      <GoogleFormModal
        isOpen={isGoogleFormOpen}
        onClose={() => setGoogleFormOpen(false)}
      />
    </NonChapterLayout>
  );
};

export default CourseResults;
