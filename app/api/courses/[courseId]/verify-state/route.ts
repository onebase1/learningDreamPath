// app/api/courses/[courseId]/verify-state/route.ts

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const progress = await db.courseProgress.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: params.courseId
        }
      },
      select: {
        isCompleted: true,
        lastAttemptDate: true
      }
    });

    // Check if exam is still in progress
    const isValid = !progress?.isCompleted && 
                   progress?.lastAttemptDate && 
                   (new Date().getTime() - progress.lastAttemptDate.getTime()) < 2520000; // 42 minutes in milliseconds

    return NextResponse.json({ isValid });
  } catch (error) {
    console.error("[VERIFY_STATE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}