// // app/api/courses/[courseId]/score/route.ts
// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { SCORING } from "@/actions/constants";

// const LISTENING_POSITIONS = {
//   PART_A: [1, 2],
//   PART_B: [3],
//   PART_C: [4, 5]
// } as const;

// export async function GET(
//   req: Request,
//   { params }: { params: { courseId: string } }
// ) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Get course and chapters
//     const course = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//       },
//       include: {
//         chapters: {
//           include: {
//             questions: true
//           }
//         }
//       }
//     });

//     if (!course) {
//       return new NextResponse("Course not found", { status: 404 });
//     }

//     // Get current attempt
//     const progress = await db.courseProgress.findUnique({
//       where: {
//         userId_courseId: {
//           userId,
//           courseId: params.courseId
//         }
//       }
//     });

//     const currentAttempt = progress?.attempts || 1;

//     // Get all answers for current attempt
//     const answers = await db.userAnswer.findMany({
//       where: {
//         userId,
//         courseId: params.courseId,
//         isTemporary: false,
//         attemptNumber: currentAttempt
//       }
//     });

//     // Group chapters by section type
//     const listeningChapters = course.chapters.filter(ch => ch.position <= 5);
//     const readingChapters = course.chapters.filter(ch => ch.position >= 6);

//     // Calculate listening scores
//     let listeningScore = 0;
//     for (const chapter of listeningChapters) {
//       const chapterAnswers = answers.filter(a => a.chapterId === chapter.id);
//       for (const answer of chapterAnswers) {
//         const question = chapter.questions.find(q => q.id === answer.questionId);
//         if (!question) continue;

//         // Handle fill-blank vs MCQ based on position
//         const isFillBlank = LISTENING_POSITIONS.PART_A.includes(chapter.position as 1 | 2);
//         if (isFillBlank) {
//           // Case-insensitive comparison for fill-blank
//           if (answer.answer.trim().toLowerCase() === question.answer.trim().toLowerCase()) {
//             listeningScore++;
//           }
//         } else {
//           // Direct comparison for MCQ
//           if (answer.answer === question.answer) {
//             listeningScore++;
//           }
//         }
//       }
//     }

//     // Calculate reading scores
//     let readingScore = 0;
//     if (readingChapters.length > 0) {
//       for (const chapter of readingChapters) {
//         const chapterAnswers = answers.filter(a => a.chapterId === chapter.id);
//         for (const answer of chapterAnswers) {
//           const question = chapter.questions.find(q => q.id === answer.questionId);
//           if (question && answer.answer === question.answer) {
//             readingScore++;
//           }
//         }
//       }
//     }

//     // Calculate scaled scores
//     const listeningTotal = SCORING.LISTENING.TOTAL_MARKS;
//     const readingTotal = readingChapters.length > 0 ? 
//       SCORING.READING_BC.TOTAL_MARKS : 
//       SCORING.READING_A.TOTAL_MARKS;

//     const listeningScaled = Math.round((listeningScore / listeningTotal) * 500);
//     const readingScaled = Math.round((readingScore / readingTotal) * 500);

//     // Determine grades
//     const getGrade = (score: number, isListening: boolean) => {
//       const grades = isListening ? SCORING.LISTENING.GRADES : SCORING.READING_BC.GRADES;
//       for (const [grade, bounds] of Object.entries(grades)) {
//         if (score >= bounds.min && score <= bounds.max) {
//           return grade;
//         }
//       }
//       return 'E';
//     };

//     const response = {
//       listening: {
//         rawScore: listeningScore,
//         totalQuestions: listeningTotal,
//         scaledScore: listeningScaled,
//         grade: getGrade(listeningScaled, true)
//       },
//       reading: {
//         rawScore: readingScore,
//         totalQuestions: readingTotal,
//         scaledScore: readingScaled,
//         grade: getGrade(readingScaled, false)
//       }
//     };

//     return NextResponse.json(response);

//   } catch (error) {
//     console.error("[SCORE_ERROR]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }