// path: app/api/courses/[courseId]/chapters/[chapterId]/speaking-answer/route.ts

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { uploadToS3 } from "@/lib/s3";

const cacheHeaders = new Headers({
  "Cache-Control": "no-store, no-cache, must-revalidate",
  Pragma: "no-cache",
  Expires: "0",
});

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: cacheHeaders,
      });
    }

    const formData = await req.formData();
    const audioFile = formData.get("audio") as File;
    
    if (!audioFile) {
      return new NextResponse("No audio file provided", {
        status: 400,
        headers: cacheHeaders,
      });
    }

    // Convert File to Buffer
    const buffer = Buffer.from(await audioFile.arrayBuffer());
    const filename = `${userId}-${Date.now()}.webm`;

    // Upload to S3
    const audioUrl = await uploadToS3(buffer, filename, audioFile.type);

    // Find or create a userAnswer record
    const progress = await db.courseProgress.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: params.courseId,
        },
      },
    });
    const currentAttempt = progress?.attempts || 1;

    const userAnswer = await db.userAnswer.upsert({
      where: {
        userId_chapterId_questionId_attemptNumber: {
          userId,
          chapterId: params.chapterId,
          questionId: params.chapterId,
          attemptNumber: currentAttempt,
        },
      },
      update: {
        answer: audioUrl,
        isTemporary: true,
        courseId: params.courseId,
      },
      create: {
        userId,
        chapterId: params.chapterId,
        questionId: params.chapterId,
        answer: audioUrl,
        isTemporary: true,
        courseId: params.courseId,
        attemptNumber: currentAttempt,
      },
    });

    return NextResponse.json(
      { ...userAnswer, audioUrl },
      {
        headers: cacheHeaders,
        status: 200,
      }
    );
  } catch (error) {
    console.error("[SPEAKING_ANSWER_ERROR]", error);
    return new NextResponse("Internal Error", {
      status: 500,
      headers: cacheHeaders,
    });
  }
}

/**
 * Optional: GET route if you want to load existing user audio
 * (So you can do axios.get(...) from the client to see if user had a prior attempt.)
 */
export async function GET(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
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
          courseId: params.courseId,
        },
      },
    });
    const currentAttempt = progress?.attempts || 1;

    const answer = await db.userAnswer.findUnique({
      where: {
        userId_chapterId_questionId_attemptNumber: {
          userId,
          chapterId: params.chapterId,
          questionId: params.chapterId,
          attemptNumber: currentAttempt,
        },
      },
    });

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("[SPEAKING_ANSWER_GET_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
