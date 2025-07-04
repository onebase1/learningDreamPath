// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { isTeacher } from "@/lib/teacher";

// export async function POST(req: Request) {
//   try {
//     const { userId } = await auth();
//     const { title, practiceTestId } = await req.json();

//     if (!userId || !isTeacher(userId)) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const practiceTest = await db.practiceTest.findUnique({
//       where: {
//         id: practiceTestId,
//       },
//       include: {
//         games: true,
//       },
//     });

//     if (!practiceTest) {
//       return new NextResponse("Practice Test not found", { status: 404 });
//     }

//     const course = await db.course.upsert({
//       where: { id: practiceTestId },
//       create: {
//         id: practiceTestId,
//         userId: userId,
//         title: title || `Test Course - ${practiceTestId}`,
//         isPublished: false,
//       },
//       update: {
//         title: title || `Test Course - ${practiceTestId}`,
//       },
//     });

//     // Iterate through games and ensure they are added as chapters
//     for (let index = 0; index < practiceTest.games.length; index++) {
//       const game = practiceTest.games[index];
//       await db.chapter.upsert({
//         where: { id: game.id },
//         create: {
//           id: game.id,
//           title: game.topicShort,
//           courseId: course.id,
//           isPublished: true,
//           position: index + 1,
//         },
//         update: {
//           title: game.topicShort,
//           position: index + 1,
//         },
//       });
//     }

//     return NextResponse.json(course);
//   } catch (error) {
//     console.log("[CREATE_COURSE]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }
