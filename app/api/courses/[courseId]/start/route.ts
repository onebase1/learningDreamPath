// // app/api/courses/[courseId]/start/route.ts
// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// // Make sure to export both GET and POST methods
// export async function GET(
//   req: Request,
//   { params }: { params: { courseId: string } }
// ) {
//   return new NextResponse("Method not allowed", { status: 405 });
// }

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
//     console.error("[START_COURSE_ERROR]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }