// lib/scoring/scoreCalculation.ts

import { SCORING } from "@/actions/constants";
import { db } from "@/lib/db";

// Define types for better type safety
type GradeType = keyof typeof SCORING.READING_BC.GRADES;

interface ScoringResult {
  rawScore: number;
  scaledScore: number;
  grade: GradeType;
  feedback: typeof SCORING.READING_BC.GRADES[GradeType];
  partBScore?: number;
  partCScore?: number;
}

export async function calculateSectionScore(
  userId: string,
  courseId: string,
  chapterId: string
): Promise<ScoringResult> {
  const answers = await db.userAnswer.findMany({
    where: {
      userId,
      courseId,
      chapterId,
      isTemporary: false
    },
    include: {
      chapter: {
        include: {
          questions: true
        }
      }
    }
  });

  // Separate scores for Part B and Part C
  const partBAnswers = answers.filter(a => a.chapter.position <= 8); // Adjust positions as needed
  const partCAnswers = answers.filter(a => a.chapter.position > 8);

  const partBScore = partBAnswers.reduce((score, answer) => {
    const question = answer.chapter.questions.find(q => q.id === answer.questionId);
    return question && answer.answer === question.answer ? score + 1 : score;
  }, 0);

  const partCScore = partCAnswers.reduce((score, answer) => {
    const question = answer.chapter.questions.find(q => q.id === answer.questionId);
    return question && answer.answer === question.answer ? score + 1 : score;
  }, 0);

  const rawScore = partBScore + partCScore;
  const scaledScore = calculateScaledScore(rawScore);
  const grade = determineGrade(scaledScore);

  await db.courseProgress.upsert({
    where: {
      userId_courseId: {
        userId,
        courseId
      }
    },
    update: {
      score: rawScore,
      scaledScore,
      grade
    },
    create: {
      userId,
      courseId,
      score: rawScore,
      scaledScore,
      grade
    }
  });

  return {
    rawScore,
    scaledScore,
    grade,
    feedback: SCORING.READING_BC.GRADES[grade],
    partBScore,
    partCScore
  };
}

function calculateScaledScore(rawScore: number): number {
  return Math.round((rawScore / 22) * 500);
}

function determineGrade(scaledScore: number): GradeType {
  const grades = Object.entries(SCORING.READING_BC.GRADES) as [GradeType, typeof SCORING.READING_BC.GRADES[GradeType]][];
  
  for (const [grade, bounds] of grades) {
    if (scaledScore >= bounds.min && scaledScore <= bounds.max) {
      return grade;
    }
  }
  
  return 'E' as GradeType;
}

export function validateAnswers(answers: any[], questions: any[]) {
  return answers.every(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    return question && answer.answer && answer.answer.trim() !== '';
  });
}