// File: app/api/user-subscription/route.ts
import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ planId: "FREE" });
    }
    const subscription = await db.subscription.findUnique({
      where: { userId },
    });
    const planId = subscription?.planId || "FREE";
    return NextResponse.json({ planId });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not fetch subscription" },
      { status: 500 }
    );
  }
}
