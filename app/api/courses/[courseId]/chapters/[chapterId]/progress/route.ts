import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  // Add cache control headers
  const headers = new Headers({
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  });

  try {
    const { userId } = await auth();
    const { isCompleted } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { 
        status: 401,
        headers 
      });
    }

    console.log("Updating answers for chapter:", params.chapterId);

    // Retrieve the current attempt number
    const progress = await db.courseProgress.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: params.courseId,
        },
      },
    });
    const currentAttempt = progress?.attempts || 1;

    // First, mark answers as permanent
    const updatedAnswers = await db.userAnswer.updateMany({
      where: {
        userId,
        chapterId: params.chapterId,
        courseId: params.courseId,
        isTemporary: true,
        attemptNumber: currentAttempt,
      },
      data: {
        isTemporary: false,
      },
    });

    console.log("Marked answers as permanent:", updatedAnswers);

    // Then update progress
    const userProgress = await db.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId,
          chapterId: params.chapterId,
        }
      },
      update: {
        isCompleted
      },
      create: {
        userId,
        chapterId: params.chapterId,
        isCompleted,
      }
    });

    // Verify the update
    const verifyAnswers = await db.userAnswer.findMany({
      where: {
        userId,
        chapterId: params.chapterId,
        courseId: params.courseId,
        isTemporary: false,
        attemptNumber: currentAttempt,
      },
    });

    console.log("Verified permanent answers:", verifyAnswers.length);

    return new NextResponse(JSON.stringify(userProgress), {
      headers,
      status: 200,
    });
  } catch (error) {
    console.error("[CHAPTER_PROGRESS_ERROR]", error);
    return new NextResponse("Internal Error", { 
      status: 500,
      headers 
    });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  return PUT(req, { params });
}

// /api/courses/[courseId]/chapters/[chapterId]/progress/route.ts
export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { isStartingChapter, courseSection } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (isStartingChapter) {
      // Delete answers based on section
      let positionRange;
      switch (courseSection) {
        case 1: // Listening
          positionRange = { gte: 1, lte: 5 };
          break;
        case 6: // Reading A
          positionRange = { equals: 6 };
          break;
        case 7: // Reading B&C
          positionRange = { gte: 7, lte: 14 };
          break;
      }

      // Delete answers for chapters in this section
      await db.userAnswer.deleteMany({
        where: {
          userId,
          courseId: params.courseId,
          chapter: {
            position: positionRange
          }
        }
      });
    } else {
      // Regular chapter cleanup
      await db.userAnswer.deleteMany({
        where: {
          userId,
          chapterId: params.chapterId
        }
      });
    }

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("[DELETE_PROGRESS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}