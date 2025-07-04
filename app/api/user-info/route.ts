// File: app/api/user-info/route.ts
import { getAuth } from '@clerk/nextjs/server';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  // Pass the current request to getAuth
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ userId });
}
