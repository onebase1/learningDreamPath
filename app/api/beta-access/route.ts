// app/api/beta-access/route.ts
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { inviteCode } = await req.json();
    const user = await currentUser();

    if (!user?.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const waitlistEntry = await db.waitList.findFirst({
      where: {
        email: user.emailAddresses[0].emailAddress,
        inviteCode,
      },
    });

    if (!waitlistEntry) {
      return new NextResponse("Invalid invite code", { status: 400 });
    }

    await db.waitList.update({
      where: { id: waitlistEntry.id },
      data: { isInvited: true }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}