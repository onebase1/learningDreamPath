import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * Handles getting and updating the course progress for a specific user.
 * Ensures `score` is always present to avoid Prisma errors.
 */

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const courseProgress = await db.courseProgress.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: params.courseId,
      },
    },
  });

  return NextResponse.json(courseProgress || {});
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();
  // e.g. body might be { readingBCTime: 2200 }

  // Get existing course progress
  const existingProgress = await db.courseProgress.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: params.courseId,
      },
    },
  });

  // **Fix the spread issue by ensuring lastKnownState is always an object**
  const previousState = existingProgress?.lastKnownState
    ? typeof existingProgress.lastKnownState === "object"
      ? existingProgress.lastKnownState // Use existing if it's an object
      : {} // Default to empty object if it's not
    : {}; // Default if null/undefined

  const courseProgress = await db.courseProgress.upsert({
    where: {
      userId_courseId: {
        userId,
        courseId: params.courseId,
      },
    },
    create: {
      userId,
      courseId: params.courseId,
      score: 0,  // **FIX: Set a default score of 0 so Prisma doesn’t complain**
      attempts: 1,  // **Assume at least one attempt exists**
      isCompleted: false,
      lastAttemptDate: new Date(),
      lastKnownState: {
        readingBCTime: body.readingBCTime ?? 2520,  // **Ensures we store reading time**
      },
    },
    update: {
      score: existingProgress?.score ?? 0,  // **Preserve existing score if it exists**
      attempts: existingProgress?.attempts ?? 1,
      lastAttemptDate: new Date(),
      lastKnownState: {
        ...previousState,  // **Now safe to spread**
        readingBCTime: body.readingBCTime,
      },
    },
  });

  return NextResponse.json(courseProgress);
}
