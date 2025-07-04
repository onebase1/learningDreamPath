import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const planOrder: Record<string, number> = {
  free: 1,
  basic: 2,
  pro: 3,
  premium: 4,
};

export default async function CourseIdPage({ params }: { params: { courseId: string } }) {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      isPublished: true,
    },
    include: {
      chapters: {
        where: { isPublished: true },
        orderBy: { position: "asc" },
      },
      category: true,
    },
  });

  if (!course || !course.chapters.length) {
    return redirect("/search");
  }

  // If no subscription => user is "free"
  const subscription = await db.subscription.findUnique({ where: { userId } });
  const userPlan = (subscription?.planId ?? "FREE").toLowerCase(); 
  // If your subscription table uses "FREE", "BASIC", etc.

  // Convert from enum "FREE" to "free"
  const courseTier = (course.planTier ?? "FREE").toLowerCase(); 
  // Now we can index into planOrder
  if (planOrder[userPlan] < planOrder[courseTier]) {
    return redirect("/subscription");
  }

  // ... Keep your existing logic for the startingChapter ...
  const startingChapter = course.chapters.find(chapter =>
    course.category?.type === "video"
      ? chapter.position === 1
      : chapter.position === (chapter.partType === "reading-a" ? 6 : 1)
  ) || course.chapters[0];

  if (course.category?.type === "video") {
    return redirect(`/courses/${course.id}/chapters/${startingChapter.id}`);
  }

  return redirect(
    `/courses/${course.id}/chapters/${startingChapter.id}?position=${startingChapter.position}`
  );
}
