// File: /actions/get-dashboard-courses.ts

import { Category, Chapter, Course } from "@prisma/client";
import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
  locked?: boolean;
};

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
};

function applyBasicPlanLimits(
  courses: CourseWithProgressWithCategory[],
  maxPerCategory: number = 2
): void {
  const categoryCounts: Record<string, number> = {};
  courses.forEach((course) => {
    if (course.category) {
      const catId = course.category.id;
      if (!categoryCounts[catId]) {
        categoryCounts[catId] = 0;
      }
      if (categoryCounts[catId] < maxPerCategory) {
        course.locked = false;
        categoryCounts[catId]++;
      } else {
        course.locked = true;
      }
    } else {
      course.locked = false;
    }
  });
}

export const getDashboardCourses = async (
  userId: string
): Promise<DashboardCourses> => {
  try {
    // 1) Check subscription
    const subscription = await db.subscription.findUnique({ where: { userId } });
    if (!subscription) {
      throw new Error("No active subscription");
    }
    const userPlan = subscription.planId.toLowerCase();

    // 2) Fetch courses where user has some progress
    //    (meaning at least one chapter has userProgress for this user).
    const courses = (await db.course.findMany({
      where: {
        isPublished: true,
        chapters: {
          some: {
            userProgress: { some: { userId } },
          },
        },
      },
      include: {
        category: true,
        chapters: { where: { isPublished: true } },
      },
    })) as CourseWithProgressWithCategory[];

    // Collect all chapter IDs across these courses
    const allChapterIds = courses
      .flatMap((c) => c.chapters.map((ch) => ch.id));

    // 3) Bulk fetch userProgress for all those chapters (where isCompleted = true).
    const completedRows = await db.userProgress.findMany({
      where: {
        userId,
        isCompleted: true,
        chapterId: { in: allChapterIds },
      },
      select: { chapterId: true },
    });
    // Make a set of completed chapterIds
    const completedSet = new Set(completedRows.map((row) => row.chapterId));

    // 4) Compute progress for each course
    for (const course of courses) {
      const totalChapters = course.chapters.length;
      let completedCount = 0;
      for (const ch of course.chapters) {
        if (completedSet.has(ch.id)) {
          completedCount++;
        }
      }
      course.progress = totalChapters
        ? (completedCount / totalChapters) * 100
        : 0;
      course.locked = false; // We'll apply plan logic next
    }

    // 5) Apply plan-limiting
    if (userPlan === "basic") {
      applyBasicPlanLimits(courses, 2);
    } else {
      courses.forEach((course) => (course.locked = false));
    }

    // 6) Split into completed vs. in-progress
    const completedCourses = courses.filter((c) => c.progress === 100);
    const coursesInProgress = courses.filter((c) => (c.progress ?? 0) < 100);

    return { completedCourses, coursesInProgress };
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]", error);
    return { completedCourses: [], coursesInProgress: [] };
  }
};
