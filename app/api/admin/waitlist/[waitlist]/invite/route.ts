// app/api/admin/waitlist/[waitlistId]/invite/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export async function PATCH(
  req: Request,
  { params }: { params: { waitlistId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (userId !== process.env.NEXT_PUBLIC_TEACHER_ID) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const waitlistEntry = await db.waitList.update({
      where: {
        id: params.waitlistId
      },
      data: {
        isInvited: true
      }
    });

    return NextResponse.json(waitlistEntry);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}