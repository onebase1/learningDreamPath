//path: lib/types.ts

import { Course as PrismaCourse, Category, Chapter as PrismaChapter, Question as PrismaQuestion } from "@prisma/client";

// Base types
export type JsonValue = string | null;

// Course types
export type Course = PrismaCourse;
export type CourseContentType = 'video' | 'reading-a' | 'reading-bc' | 'listening' | 'speaking';

// Question types
export interface Question extends Omit<PrismaQuestion, 'options' | 'subtopic'> {
  id: string;
  chapterId: string | null;
  question: string;
  answer: string;
  options: string[] | string | null;
  percentageCorrect: number | null;  // Remove optional (?) operator
  isCorrect: boolean | null;         // Remove optional (?) operator
  subtopic: string | null;           // Remove optional (?) operator
  questionNumber: number | null;      // Match Prisma type exactly
}

// Chapter types
export interface Chapter extends PrismaChapter {
  questions: Question[];
  patientName: string | null;    // Remove optional marker
  imageUrl: string | null;       // Remove optional marker
  pdfUrl: string | null;        // Remove optional marker
}

// Course with Progress
export interface CourseWithProgress extends Course {
  category?: Category;
  chapters?: Chapter[];
  progress?: number;
}

export interface CourseWithChapters extends Course {
  chapters: Chapter[];
  category?: Category;
}

// User Progress types
export interface UserProgress {
  id: string;
  userId: string;
  chapterId: string;
  isCompleted: boolean;
}

// User Answer types
export interface UserAnswer {
  id: string;
  questionId: string;
  answer: string;
  chapterId: string;
  attemptNumber: number;
  createdAt?: Date;
  isTemporary?: boolean;
  isCorrect?: boolean;
}

// Course Progress
export interface CourseProgress {
  id: string;
  score: number;
  scaledScore?: number;
  attempts: number;
  lastAttemptDate: Date;
  isCompleted?: boolean;
}

// Component Props
export interface MCQCardProps {
  chapter: Chapter;
  questionStartNumber: number;
  courseId: string;
  onTogglePdfViewer?: (url: string) => void;
  isPdfViewerOpen?: boolean;
  onAnswerSelection: (hasAnswer: boolean) => void;
}

export interface MCQAnswerReviewProps {
  chapter: Chapter;
  chapterAnswers: UserAnswer[];
}

export interface CourseResultsProps {
  course: CourseWithChapters;
  courseProgress?: CourseProgress;
  userAnswers: UserAnswer[];
}

export interface PerformanceBreakdownProps {
  data: Array<{
    label: string;
    percentage: number;
  }>;
  title?: string;
}


export interface ChapterWithQuestions extends PrismaChapter {
  questions: Question[];
}



// export interface CourseWithChapters extends Course {
//   chapters: ChapterWithQuestions[];
// }

// // User Answer types
// export interface UserAnswerType {
//   id: string;
//   questionId: string;
//   answer: string;
//   chapterId: string;
//   attemptNumber: number;
//   createdAt?: Date;  // Added for sorting in results
//   isTemporary?: boolean;
// }

// // Progress types
// export interface CourseProgressType {
//   id: string;
//   score: number;
//   scaledScore?: number;  // Added for Reading B&C
//   attempts: number;
//   lastAttemptDate: Date;
//   isCompleted?: boolean;
// }

// // Component Props interfaces
// export interface MCQAnswerReviewProps {
//   chapter: ChapterWithQuestions;
//   chapterAnswers: UserAnswerType[];
// }

// export interface CourseResultsProps {
//   course: CourseWithChapters;
//   courseProgress?: CourseProgressType;
//   userAnswers: UserAnswerType[];
// }