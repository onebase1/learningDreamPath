// app/api/courses/[courseId]/backup/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

interface ExamState {
  timeRemaining: number;
  answers: Record<string, string>;
}

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Update using existing fields instead of lastStateUpdate
    await db.courseProgress.upsert({
      where: {
        userId_courseId: {
          userId,
          courseId: params.courseId
        }
      },
      update: {
        score: 0, // temporary score
        isCompleted: false,
        lastAttemptDate: new Date()
      },
      create: {
        userId,
        courseId: params.courseId,
        score: 0,
        isCompleted: false,
        lastAttemptDate: new Date()
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[BACKUP_STATE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

