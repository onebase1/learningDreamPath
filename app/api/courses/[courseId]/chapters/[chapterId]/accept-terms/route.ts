// // app/api/courses/[courseId]/chapters/[chapterId]/accept-terms/route.ts
// // app/api/courses/[courseId]/chapters/[chapterId]/accept-terms/route.ts
// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// export async function POST(
//   req: Request,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Update terms acceptance
//     await db.userProgress.upsert({
//       where: {
//         userId_chapterId: {
//           userId,
//           chapterId: params.chapterId,
//         },
//       },
//       create: {
//         userId,
//         chapterId: params.chapterId,
//         termsAccepted: true,
//       },
//       update: {
//         termsAccepted: true,
//       },
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("[ACCEPT_TERMS]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }