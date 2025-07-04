// path: app/api/courses/[courseId]/chapters/[chapterId]/speaking-feedback/route.ts

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import OpenAI from "openai";

// Instantiating once at the top or in POST is fine;
// we show how to do it top-level here:
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Helper to rename the file to .webm
async function makeWebmFile(originalFile: File) {
  const arrayBuffer = await originalFile.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBuffer);

  // Create a new File with the .webm extension
  const newFile = new File([fileBuffer], "audio.webm", {
    type: "audio/webm",
  });
  return newFile;
}

const encoder = new TextEncoder();

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 1) Get file + scenario from formData
    const formData = await req.formData();
    const audioFile = formData.get("audio") as File;
    const scenario = formData.get("scenario") as string;

    if (!audioFile || !scenario) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // 2) Convert to .webm so Whisper recognizes it
    const webmFile = await makeWebmFile(audioFile);

    // 3) Whisper STT
    const transcription = await openai.audio.transcriptions.create({
      file: webmFile,
      model: "whisper-1",
      // language: "en", // optionally set if desired
    });
    const cleanTranscription = transcription.text.replace(/<[^>]*>/g, "").trim();

    // 4) GPT Streaming
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      stream: true,
      messages: [
        {
          role: "system",
          content: `
          You are the "Parent" in a hospital scenario.
          Nurse said: "${cleanTranscription}"
          Respond naturally but keep it fairly short and realistic (~50 words).
          `,
        },
        {
          role: "user",
          content: cleanTranscription,
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    // 5) Send streaming response to client
    const stream = new ReadableStream({
      async start(controller) {
        try {
          let finalText = "";
          for await (const part of completion) {
            const textChunk = part.choices[0]?.delta?.content || "";
            if (textChunk) {
              // Send partial chunk to the client
              controller.enqueue(encoder.encode(textChunk));
              finalText += textChunk;
            }
          }

          // 6) Store the final text + user's transcription in DB
          const progress = await db.courseProgress.findUnique({
            where: {
              userId_courseId: {
                userId,
                courseId: params.courseId,
              },
            },
          });
          const currentAttempt = progress?.attempts || 1;

          await db.userAnswer.upsert({
            where: {
              userId_chapterId_questionId_attemptNumber: {
                userId,
                chapterId: params.chapterId,
                questionId: params.chapterId,
                attemptNumber: currentAttempt,
              },
            },
            update: {
              answer: cleanTranscription,  // user’s speech -> text
              feedback: finalText,         // GPT’s final text
            },
            create: {
              userId,
              chapterId: params.chapterId,
              questionId: params.chapterId,
              isTemporary: true,
              courseId: params.courseId,
              attemptNumber: currentAttempt,
              answer: cleanTranscription,
              feedback: finalText,
            },
          });
        } catch (err) {
          console.error("[SPEAKING_FEEDBACK_STREAM_ERROR]", err);
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("[SPEAKING_FEEDBACK_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
