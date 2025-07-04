// // app/(course)/courses/[courseId]/_components/types.ts

// import { Chapter as PrismaChapter, Question as PrismaQuestion, Course } from "@prisma/client";

// // Base types from Prisma
// export type JsonValue = string | null;

// export interface Question extends Omit<PrismaQuestion, 'options' | 'subtopic'> {
//   id: string;
//   chapterId: string | null;
//   question: string;
//   answer: string;
//   gameId: string | null;
//   options: JsonValue;
//   percentageCorrect: number | null;
//   isCorrect: boolean | null;
//   subtopic?: string | null;
// }

// export interface ChapterWithQuestions extends PrismaChapter {
//   questions: Question[];
// }

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