import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openaiClient';
import { db } from '@/lib/db';
import { auth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.redirect('/');
    }

    // Parse the incoming request data
    const { jobPosition, jobDesc, jobExperience } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: 'system', content: 'You are an AI interviewer.' },
        {
          role: 'user',
          content: `Generate 5 relevant interview questions for a ${jobPosition} position with the following description: ${jobDesc}. The candidate has ${jobExperience} years of experience.`,
        },
      ],
    });

    const content = completion.choices[0].message?.content;

    if (content) {
      const jsonStartIndex = content.indexOf('{');
      const jsonEndIndex = content.lastIndexOf('}') + 1;
      const jsonString = content.slice(jsonStartIndex, jsonEndIndex);

      try {
        const parsedJson = JSON.parse(jsonString);

        // Save the parsed JSON to the database
        const savedInterview = await db.mockInterview.create({
          data: {
            jsonMockResp: JSON.stringify(parsedJson),
            jobPosition,
            jobDesc,
            jobExperience: parseInt(jobExperience),
            createdBy: userId,
          },
        });

        return NextResponse.json(savedInterview);
      } catch (jsonError) {
        console.error("Failed to parse JSON or save to database:", jsonError);
        return NextResponse.json({ error: 'Failed to process interview data.' }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: 'No content returned from OpenAI.' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error generating interview data:', error);
    return NextResponse.json({ error: 'An error occurred while processing the interview data.' }, { status: 500 });
  }
}
