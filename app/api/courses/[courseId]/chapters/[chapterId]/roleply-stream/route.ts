// path: app/api/courses/[courseId]/chapters/[chapterId]/roleplay-stream/route.ts
import OpenAI from 'openai';

export async function POST(req: Request) {
  const openai = new OpenAI();
  
  const { messages, roleplayCard } = await req.json();

  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a parent in an emergency room. ${roleplayCard}`
      },
      ...messages
    ],
    stream: true,
    temperature: 0.7
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || "";
        controller.enqueue(encoder.encode(text));
      }
      controller.close();
    }
  });

  return new Response(readable);
}