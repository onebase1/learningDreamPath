// // app/api/courses/[courseId]/start-attempt/route.ts
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

//     // Start transaction to ensure data consistency
//     const result = await db.$transaction(async (tx) => {
//       // Upsert course progress and increment attempts
//       const updatedProgress = await tx.courseProgress.upsert({
//         where: {
//           userId_courseId: {
//             userId,
//             courseId: params.courseId,
//           },
//         },
//         update: {
//           attempts: {
//             increment: 1,
//           },
//           score: 0, // Reset score for new attempt
//           lastAttemptDate: new Date(),
//           isCompleted: false, // Reset completion status for new attempt
//         },
//         create: {
//           userId,
//           courseId: params.courseId,
//           score: 0,
//           attempts: 1,
//           lastAttemptDate: new Date(),
//           isCompleted: false,
//         },
//       });

//       // Get the new attempt number
//       const newAttemptNumber = updatedProgress.attempts;

//       // Clean up any existing temporary answers
//       await tx.userAnswer.deleteMany({
//         where: {
//           userId,
//           courseId: params.courseId,
//           isTemporary: true,
//         },
//       });

//       // Create attempt history record
//       const attemptHistory = await tx.attemptHistory.create({
//         data: {
//           userId,
//           courseId: params.courseId,
//           attemptNumber: newAttemptNumber,
//           score: 0, // Initial score
//           startedAt: new Date(),
//         },
//       });

//       return {
//         progress: updatedProgress,
//         attemptNumber: newAttemptNumber,
//         attemptHistory,
//       };
//     });

//     return NextResponse.json(result);
//   } catch (error) {
//     console.error("[START_ATTEMPT_ERROR]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }
