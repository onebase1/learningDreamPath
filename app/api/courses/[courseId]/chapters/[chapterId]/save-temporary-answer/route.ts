// // File: app/api/save-temporary-answer/route.ts

// import { auth } from "@clerk/nextjs/server"; // Import Clerk's server-side authentication
// import { NextResponse } from "next/server";
// import { db } from "@/lib/db"; // Import your database instance

// export async function POST(req: Request) {
//   try {
//     // Get the authenticated user's ID and session information
//     const authData = auth();
//     const { userId } = authData;

//     // Log authentication data for debugging
//     console.log("Auth Data:", authData);

//     // Check if user is authenticated
//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Parse the request body
//     const { chapterId, questionId, answer } = await req.json();

//     // Log the received data for debugging
//     console.log("User ID:", userId);
//     console.log("Received Data:", { chapterId, questionId, answer });

//     // Upsert the user's temporary answer in the database
//     const userAnswer = await db.userAnswer.upsert({
//       where: {
//         userId_chapterId_questionId: {
//           userId,
//           chapterId,
//           questionId,
//         },
//       },
//       update: {
//         answer,
//         isTemporary: true,
//       },
//       create: {
//         userId,
//         chapterId,
//         questionId,
//         answer,
//         isTemporary: true,
//       },
//     });

//     // Return the updated or created userAnswer
//     return NextResponse.json(userAnswer);
//   } catch (error) {
//     // Log any errors for debugging
//     console.log("[SAVE_TEMPORARY_ANSWER]", error);
//     console.error(error); // Log the full error stack
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }
