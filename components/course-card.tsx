"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock } from "lucide-react";

// Minimal type
interface CourseItem {
  id: string;
  title: string;
  locked: boolean;
  category?: { name?: string };
  imageUrl?: string;
  progress?: number | null;
}

interface Props {
  course: CourseItem;
}

export function CourseCard({ course }: Props) {
  const router = useRouter();

  const onStartClick = () => {
    router.push(`/courses/${course.id}`);
  };

  const onUpgradeClick = () => {
    router.push("/subscription");
  };

  return (
    <div className="relative border rounded-lg overflow-hidden bg-white">
      {/* If you have an imageUrl in your DB: */}
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

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {course.title}
        </h3>

        {/* Example: show progress or category name */}
        {course.category?.name && (
          <p className="text-sm text-gray-600 mb-2">{course.category.name}</p>
        )}

        {/* If locked => show "Upgrade" button, else "Start" button */}
        {course.locked ? (
          <button
            onClick={onUpgradeClick}
            className="mt-2 inline-flex items-center gap-1 text-sm px-4 py-2 bg-red-500 text-white rounded"
          >
            <Lock className="w-4 h-4" />
            Upgrade to View
          </button>
        ) : (
          <button
            onClick={onStartClick}
            className="mt-2 inline-flex items-center gap-1 text-sm px-4 py-2 bg-blue-600 text-white rounded"
          >
            Start
          </button>
        )}
      </div>
    </div>
  );
}
