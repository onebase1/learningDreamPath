// app/api/beta-access/verify/route.ts
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user?.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const waitlistEntry = await db.waitList.findFirst({
      where: {
        email: user.emailAddresses[0].emailAddress,
        isInvited: true,
      },
    });

    if (!waitlistEntry) {
      return new NextResponse("Not invited", { status: 403 });
    }

    return NextResponse.json({ verified: true });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}