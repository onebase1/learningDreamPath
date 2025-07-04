//path: app/api/courses/%5BcourseId%5D/chapters/%5BchapterId%5D/temporary-answer/route.ts

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Cache control headers
const cacheHeaders = new Headers({
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
});

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = await auth();
    const { questionId, answer } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { 
        status: 401,
        headers: cacheHeaders 
      });
    }

    console.log("Saving answer:", { 
      userId, 
      chapterId: params.chapterId,
      courseId: params.courseId,
      questionId, 
      answer,
      
    });

    // In temporary-answer/route.ts
    const progress = await db.courseProgress.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: params.courseId,
        },
      },
    });
    const currentAttempt = progress?.attempts || 1;

    // Use upsert with the correct unique constraint
    const userAnswer = await db.userAnswer.upsert({
      where: {
        userId_chapterId_questionId_attemptNumber: {
          userId,
          chapterId: params.chapterId,
          questionId,          
          attemptNumber: currentAttempt,
        }
      },
      update: {
        answer,
        isTemporary: true,
        courseId: params.courseId,
        // attemptNumber,
      },
      create: {
        userId,
        chapterId: params.chapterId,
        questionId,
        answer,
        isTemporary: true,
        courseId: params.courseId,
        attemptNumber: currentAttempt,
      }
    });

    console.log("Saved answer:", userAnswer);

    return new NextResponse(JSON.stringify(userAnswer), {
      headers: cacheHeaders,
      status: 200,
    });
  } catch (error) {
    console.error("[TEMPORARY_ANSWER_ERROR]", error);
    return new NextResponse("Internal Error", { 
      status: 500,
      headers: cacheHeaders 
    });
  }
}


export async function GET(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { 
        status: 401,
        headers: cacheHeaders 
      });
    }

    // Retrieve currentAttempt from CourseProgress
    const progress = await db.courseProgress.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: params.courseId,
        },
      },
    });
    const currentAttempt = progress?.attempts || 1;

    console.log("Fetching answers for attempt:", {
      userId,
      chapterId: params.chapterId,
      courseId: params.courseId,
      attemptNumber: currentAttempt,
    });

    const answers = await db.userAnswer.findMany({
      where: {
        userId,
        chapterId: params.chapterId,
        courseId: params.courseId,
        isTemporary: true,
        attemptNumber: currentAttempt,
      },
    });

    console.log("Found answers:", answers.length);

    return new NextResponse(JSON.stringify({ answers }), {
      headers: cacheHeaders,
      status: 200,
    });
  } catch (error) {
    console.error("[GET_TEMPORARY_ANSWERS_ERROR]", error);
    return new NextResponse("Internal Error", { 
      status: 500,
      headers: cacheHeaders 
    });
  }
}

