import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
   
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    // e.g. body = { courseId, rating, feedbackOptions, comments }

    // Ensure userId is present
    if (!userId) {
      throw new Error("User ID is required");
    }

    await db.betaFeedback.create({
      data: {
        userId: body.userId,
        courseId: body.courseId,
        feedbackType: "experience", // or "course", up to you
        content: JSON.stringify({
          rating: body.rating,
          options: body.feedbackOptions,
          comments: body.comments,
        }),
        rating: body.rating,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Feedback submit error:", error);
    return NextResponse.json({ error: "Failed to save feedback" }, { status: 500 });
  }
}
