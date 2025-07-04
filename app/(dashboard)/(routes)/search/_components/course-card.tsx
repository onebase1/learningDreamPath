"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";           // If you have a “cn” utility
import { getCategoryColor, getShortCategoryName } from "@/lib/get-category-color";

interface CategoryData {
  name?: string;
}

interface ChapterData {
  id: string;
}

interface CourseItem {
  id: string;
  title: string;
  locked?: boolean;
  category: CategoryData | null;
  imageUrl?: string | null;
  progress?: number | null;
  chapters?: ChapterData[];
}

interface Props {
  course: CourseItem;
}

// Example short function to compute the label for your Start/Continue/Completed button
function getProgressLabelAndColor(progress: number) {
  if (progress === 100) {
    return { label: "Completed", style: "bg-green-600 cursor-not-allowed", disabled: true };
  } else if (progress > 0) {
    return { label: "Continue", style: "bg-blue-500 hover:bg-blue-600", disabled: false };
  }
  // Default: progress = 0
  return { label: "Start", style: "bg-orange-500 hover:bg-orange-600", disabled: false };
}

export function CourseCard({ course }: Props) {
  const router = useRouter();

  const isLocked = !!course.locked;
  const progress = course.progress ?? 0;
  const chapterCount = course.chapters?.length ?? 0;

  // Use your color logic
  const categoryName = course.category?.name || ""; 
  const categoryColorClass = getCategoryColor(categoryName);

  // Short name if you want to display a “Reading A” style label
  const shortCatName = getShortCategoryName(categoryName);

  // Decide how the button looks
  const { label: buttonLabel, style: buttonStyle, disabled: buttonDisabled } = getProgressLabelAndColor(progress);

  function handleClick() {
    if (isLocked) {
      router.push("/subscription");
    } else {
      router.push(`/courses/${course.id}`);
    }
  }

  return (
    <div
      className={cn(
        "relative border-4 rounded-lg overflow-hidden transition-all hover:shadow-md bg-gray-100",
        categoryColorClass // apply your dynamic category color/border
      )}
    >
      {/* Course Image */}
      {course.imageUrl ? (
        <div className="relative aspect-video">
          <Image
            src={course.imageUrl}
            alt={course.title}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="aspect-video flex items-center justify-center bg-gray-200 text-gray-500">
          No Image
        </div>
      )}

      {/* Title and Category */}
      <div className="p-4">
        <h3 className="font-bold text-slate-600 mb-2 line-clamp-2">
          {course.title}
        </h3>

        {/* Show short category name, e.g. “Reading A” or “Listening”
        {shortCatName && (
          <p className="text-sm text-slate-500">{shortCatName}</p>
        )} */}

        {/* Number of chapters */}
        <div className="mt-2 flex items-center gap-x-2 text-sm text-slate-600">
          <BookOpen className="h-4 w-4" />
          <span>
            {chapterCount} {chapterCount === 1 ? "Chapter" : "Chapters"}
          </span>
        </div>

        <div className="mt-4">
          {isLocked ? (
            // If locked => "Upgrade to View"
            <button
              onClick={handleClick}
              className="inline-flex items-center gap-1 text-sm px-4 py-2 bg-gray-400 text-white rounded"
            >
              <Lock className="w-4 h-4" />
              Upgrade to View
            </button>
          ) : (
            // Else show Start/Continue/Completed
            <button
              onClick={handleClick}
              disabled={buttonDisabled}
              className={cn(
                "inline-flex items-center gap-1 text-sm px-4 py-2 text-white rounded",
                buttonStyle,
                buttonDisabled ? "cursor-not-allowed" : "hover:shadow-md"
              )}
            >
              {buttonLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
