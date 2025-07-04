import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (userId !== process.env.NEXT_PUBLIC_TEACHER_ID) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const [userCount, courseCompletions, feedbackStats, invitedCount] = await Promise.all([
      db.user.count(),
      db.courseProgress.groupBy({
        by: ['courseId'],
        _count: true,
        where: { isCompleted: true }
      }),
      db.feedback.groupBy({
        by: ['rating'],
        _count: true
      }),
      db.waitList.count({
        where: { isInvited: true }
      })
    ]);

    return NextResponse.json({
      userCount,
      courseCompletions,
      feedbackStats,
      invitedCount
    });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}