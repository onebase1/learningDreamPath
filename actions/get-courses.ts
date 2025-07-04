// File: /actions/get-courses.ts
import { Category, Course } from "@prisma/client";
import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
  locked?: boolean;
};

type GetCoursesParams = {
  userId: string;
  title?: string;
  categoryId?: string;
};

// For plan-limiting (2 free per category, etc.)
const planLimits: Record<string, number> = {
  free: 2,    
  basic: 4,
  pro: 6,
  premium: 999999,
};

export const getCourses = async ({
  userId,
  title,
  categoryId,
}: GetCoursesParams): Promise<CourseWithProgressWithCategory[]> => {
  // 1) Check subscription OR default to 'free'
  const subscription = await db.subscription.findUnique({ where: { userId } });
  const userPlan = subscription?.planId.toLowerCase() || "free";
  const maxPerCategory = planLimits[userPlan] ?? 0;

  // 2) Fetch all published courses matching the filters
  const courses = await db.course.findMany({
    where: {
      isPublished: true,
      ...(title ? { title: { contains: title } } : {}),
      ...(categoryId ? { categoryId } : {}),
    },
    include: {
      category: true,
      chapters: {
        where: { isPublished: true },
        select: { id: true }, // minimal fields
      },
    },
    orderBy: { createdAt: "asc" },
  });

  // 3) Get the IDs of all these courses
  const courseIds = courses.map((c) => c.id);

  // 4) Collect all published chapter IDs from these courses (for a single userProgress query)
  //    Also build a map: courseId -> arrayOfChapterIds
  const courseChaptersMap = new Map<string, string[]>();
  for (const c of courses) {
    courseChaptersMap.set(
      c.id,
      c.chapters.map((ch) => ch.id)
    );
  }

  // 5) Fetch userProgress *once*, for all these chapters, where isCompleted = true
  //    (We only care about completed chapters to calculate progress)
  const completedProgressRows = await db.userProgress.findMany({
    where: {
      userId,
      isCompleted: true,
      chapterId: {
        in: Array.from(
          // Flatten all chapter IDs from all courses
          courseChaptersMap.values()
        ).flat()
      }
    },
    select: {
      chapterId: true,
    },
  });

  // 6) Build a set of completedChapterIds for fast lookup
  const completedChaptersSet = new Set(completedProgressRows.map((row) => row.chapterId));

  // 7) Calculate progress for each course in a single pass
  const result: CourseWithProgressWithCategory[] = courses.map((course) => {
    const chapterIds = courseChaptersMap.get(course.id) || [];
    
    // Count how many are in completedChaptersSet
    let completedCount = 0;
    for (const chId of chapterIds) {
      if (completedChaptersSet.has(chId)) {
        completedCount++;
      }
    }
    const progressPercentage = chapterIds.length
      ? (completedCount / chapterIds.length) * 100
      : 0;

    return {
      ...course,
      progress: progressPercentage,
      locked: false, // we set locked later
    };
  });

  // 8) Apply plan-limiting logic (2 free per category, 4 for basic, etc.)
  const categoryCounts: Record<string, number> = {};
  for (const c of result) {
    const catId = c.category?.id || "no-category";
    if (!categoryCounts[catId]) {
      categoryCounts[catId] = 0;
    }
    if (categoryCounts[catId] < maxPerCategory) {
      c.locked = false;
      categoryCounts[catId]++;
    } else {
      c.locked = true;
    }
  }

  return result;
};
