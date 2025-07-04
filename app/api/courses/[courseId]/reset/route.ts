// // app/api/courses/[courseId]/reset/route.ts
// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// export async function POST(
//   req: Request,
//   { params }: { params: { courseId: string } }
// ) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Clear all previous answers for this course
//     await db.userAnswer.deleteMany({
//       where: {
//         userId,
//         courseId: params.courseId,
//       }
//     });

//     // Reset progress for this course
//     await db.courseProgress.deleteMany({
//       where: {
//         userId,
//         courseId: params.courseId,
//       }
//     });

//     // Reset user progress for all chapters in this course
//     await db.userProgress.deleteMany({
//       where: {
//         userId,
//         chapter: {
//           courseId: params.courseId
//         }
//       }
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("[RESET_ERROR]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }