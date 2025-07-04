// app/api/feedback/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { trackEvent, TRACKED_EVENTS } from "@/lib/analytics";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { courseId, rating, content, feedbackType } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const feedback = await db.feedback.create({
      data: { userId, courseId, rating, content, feedbackType }
    });

    await trackEvent(userId, TRACKED_EVENTS.FEEDBACK_SUBMITTED, {
      courseId,
      rating,
      feedbackType,
      timestamp: new Date()
    });

    return NextResponse.json(feedback);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}