// path: app/api/tts/route.ts

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Hypothetical usage, for example only:
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { text } = await req.json();
    if (!text) {
      return new NextResponse("No text provided", { status: 400 });
    }

    // Artificially limit length so we don’t blow up TTS
    const trimmedText = text.replace(/<[^>]*>/g, "").substring(0, 300).trim();
    if (!trimmedText) {
      return new NextResponse("Empty text after cleaning", { status: 400 });
    }

    // Hypothetical TTS call
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: trimmedText,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    return new Response(buffer, {
      headers: { "Content-Type": "audio/mpeg" },
    });
  } catch (error) {
    console.error("[TTS_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
