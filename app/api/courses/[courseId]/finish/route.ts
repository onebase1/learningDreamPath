//path: /api/courses/[courseId]/finish

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const compareFillBlankAnswer = (userAnswer: string, correctAnswer: string): boolean => {
  const normalize = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const normalizedUser = normalize(userAnswer);
  const normalizedCorrect = normalize(correctAnswer);

  // Handle American/British spelling variations
  const commonVariations: Record<string, string[]> = {
    'ise': ['ize'],
    'our': ['or'],
    're': ['er'],
  };

  if (normalizedUser === normalizedCorrect) return true;

  // Check for common spelling variations
  for (const [british, american] of Object.entries(commonVariations)) {
    american.forEach(variation => {
      if (normalizedCorrect.includes(british)) {
        const alternativeAnswer = normalizedCorrect.replace(british, variation);
        if (normalizedUser === alternativeAnswer) return true;
      }
    });
  }

  // Calculate Levenshtein distance for minor typos
  const maxAllowedDistance = Math.min(3, Math.floor(correctAnswer.length * 0.2));
  const distance = levenshteinDistance(normalizedUser, normalizedCorrect);
  
  return distance <= maxAllowedDistance;
};

const levenshteinDistance = (a: string, b: string): number => {
  const matrix = Array(b.length + 1).fill(null).map(() => 
    Array(a.length + 1).fill(null)
  );

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + substitutionCost
      );
    }
  }

  return matrix[b.length][a.length];
};

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  const headers = new Headers({
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  });

  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401, headers });
    }

    // Get chapters first to ensure we count all questions
    const chapters = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
      include: {
        questions: true
      },
      orderBy: {
        position: "asc"
      }
    });

    // Get current progress
    const progress = await db.courseProgress.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: params.courseId
        }
      }
    });

    const currentAttempt = progress?.attempts || 1;

    // Mark temporary answers as permanent
    await db.userAnswer.updateMany({
      where: {
        userId,
        courseId: params.courseId,
        isTemporary: true,
        attemptNumber: currentAttempt
      },
      data: {
        isTemporary: false
      }
    });

    // Get permanent answers for current attempt
    const userAnswers = await db.userAnswer.findMany({
      where: {
        userId,
        courseId: params.courseId,
        isTemporary: false,
        attemptNumber: currentAttempt
      }
    });

    console.log("Processing answers:", {
      currentAttempt,
      answersFound: userAnswers.length,
      attemptNumber: currentAttempt,
    });

    let totalScore = 0;
    let totalPossibleScore = 0;

    // Calculate score using chapters as base
    chapters.forEach(chapter => {
      chapter.questions.forEach(question => {
        totalPossibleScore++;
        
        const userAnswer = userAnswers.find(a => a.questionId === question.id);
        if (!userAnswer) return;

        if (chapter.position <= 2) {
          // Fill in blank scoring
          if (compareFillBlankAnswer(userAnswer.answer, question.answer)) {
            totalScore++;
          }
        } else {
          // MCQ scoring
          if (userAnswer.answer === question.answer) {
            totalScore++;
          }
        }
      });
    });

    console.log("Final scoring:", {
      totalScore,
      totalPossibleScore,
      chaptersProcessed: chapters.length,
      answersFound: userAnswers.length,
      currentAttempt,
      attemptNumber: currentAttempt,
    });

    // Update progress
    const updatedProgress = await db.courseProgress.upsert({
      where: {
        userId_courseId: {
          userId,
          courseId: params.courseId
        }
      },
      create: {
        userId,
        courseId: params.courseId,
        score: totalScore,
        attempts: 1,
        lastAttemptDate: new Date(),
        isCompleted: true
      },
      update: {
        score: totalScore,
        lastAttemptDate: new Date(),
        isCompleted: true
      }
    });

    console.log("Scoring attempt:", {
      userId,
      courseId: params.courseId,
      currentAttempt,
      answersRetrieved: userAnswers.length,
      attemptNumber: currentAttempt,
    });
    

    return NextResponse.json({
      score: totalScore,
      totalQuestions: totalPossibleScore,
      attempts: currentAttempt,
      completedAt: updatedProgress.lastAttemptDate,
      // redirect: `/courses/${params.courseId}/results`,
      redirect: `/courses/${params.courseId}/finish`,
    }, {
      headers,
      status: 200,
    });

  } catch (error) {
    console.error("[COURSE_FINISH]", error);
    return new NextResponse("Internal Error", { status: 500, headers });
  }
}