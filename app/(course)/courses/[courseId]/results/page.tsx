// app/courses/[courseId]/results/page.tsx
import { auth } from "@clerk/nextjs/server";



import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import CourseResults from "../_components/CourseResults";
import { CourseProgress, CourseWithChapters, UserAnswer } from "@/lib/type";
// import { CourseProgressType, UserAnswerType, CourseWithChapters } from "../_components/types";

const CourseResultsPage = async ({
  params
}: {
  params: { courseId: string }
}) => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const progress = await db.courseProgress.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: params.courseId,
      },
    },
  });

  if (!progress?.isCompleted) {
    return redirect(`/courses/${params.courseId}`);
  }


  const courseProgress: CourseProgress = {
    id: progress.id,
    score: progress.score,
    attempts: progress.attempts,
    lastAttemptDate: progress.lastAttemptDate ?? new Date(),
  };

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        include: {
          questions: true,
        },
        orderBy: {
          position: "asc"
        }
      },
    },
  }) as CourseWithChapters;

  if (!course) {
    return redirect("/");
  }

  // Updated query to get only current attempt answers
  const answers = await db.userAnswer.findMany({
    where: {
      userId,
      courseId: params.courseId,
      isTemporary: false,
      attemptNumber: progress.attempts, // Get answers only from current attempt
    },
    include: {
      chapter: {
        select: {
          title: true,
          position: true,
        },
      },
    },
  });

  const userAnswers: UserAnswer[] = answers.map(answer => ({
    id: answer.id,
    questionId: answer.questionId,
    answer: answer.answer,
    chapterId: answer.chapterId,
    attemptNumber: answer.attemptNumber, // Add this to your UserAnswerType if not already present
  }));

  return (
    <div className="h-full">
      <CourseResults 
        course={course}
        courseProgress={courseProgress}
        userAnswers={userAnswers}
      />
    </div>
  );
};

export default CourseResultsPage;