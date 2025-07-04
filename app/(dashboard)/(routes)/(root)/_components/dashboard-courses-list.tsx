// app/(dashboard)/(routes)/dashboard-courses-list.tsx
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardCourseCard } from "./dashboard-course-card";
import { Category, Course } from "@prisma/client";
import { getCategoryImage } from "@/lib/get-category-image";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
  locked?: boolean;
};

interface DashboardCoursesListProps {
  items: CourseWithProgressWithCategory[];
}

export const DashboardCoursesList = ({
  items
}: DashboardCoursesListProps) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <BookOpen className="w-8 h-8 text-slate-500" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          No courses yet
        </h3>
        <p className="text-sm text-slate-500 mb-6 max-w-md">
          Start your learning journey by exploring our available courses.
        </p>
        <Button asChild>
          <Link href="/search">
            Browse Courses
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <DashboardCourseCard
          key={item.id}
          id={item.id}
          title={item.title}
          imageUrl={getCategoryImage(item?.category?.name)}
          chaptersLength={item.chapters.length}
          progress={item.progress}
          category={item?.category?.name!}
          locked={item.locked || false}
        />
      ))}
    </div>
  );
};
