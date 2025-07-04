// app/(dashboard)/(routes)/dashboard-course-card.tsx
import Image from "next/image";
import Link from "next/link";
import { BookOpen, CheckCircle, Clock, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { getCategoryColor } from "@/lib/get-category-color";

interface DashboardCourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  progress: number | null;
  category: string;
  locked?: boolean;
}

export const DashboardCourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  progress,
  category,
  locked = false,
}: DashboardCourseCardProps) => {
  const isCompleted = progress === 100;

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case "Reading Part A":
        return "border-l-4 border-l-blue-500";
      case "Reading Part BC":
        return "border-l-4 border-l-purple-500";
      case "Listening":
        return "border-l-4 border-l-green-500";
      default:
        return "border-l-4 border-l-gray-300";
    }
  };

  return (
    <Link href={`/courses/${id}`}>
      <div className="group relative h-full">
        <div className={cn(
          "relative h-full bg-white rounded-lg border transition-all hover:shadow-md",
          getCategoryColor(category)
        )}>
          {/* Status Badge */}
          <div className={cn(
            "absolute top-2 right-2 z-10 px-2 py-1 rounded-full text-xs font-medium",
            isCompleted 
              ? "bg-emerald-100 text-emerald-700"
              : "bg-blue-100 text-blue-700"
          )}>
            <div className="flex items-center gap-x-1">
              {isCompleted ? (
                <CheckCircle className="h-3 w-3" />
              ) : (
                <Clock className="h-3 w-3" />
              )}
              {isCompleted ? "Completed" : "In Progress"}
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-video rounded-t-lg overflow-hidden">
            <Image
              fill
              className="object-cover"
              alt={`${category} course thumbnail`}
              src={imageUrl}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
              quality={85}
            />
            {locked && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white font-bold flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  <span>Subscribe to Unlock</span>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-lg font-medium line-clamp-2 mb-1 group-hover:text-sky-700 transition">
              {title}
            </h3>
            <p className={cn(
              "text-sm font-semibold mb-4",
              category === "Reading Part A" && "text-blue-600",
              category === "Reading Part BC" && "text-purple-600",
              category === "Listening" && "text-green-600"
            )}>
              {category}
            </p>
            
            {/* Progress Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-x-2 text-sm text-slate-500">
                <BookOpen className="h-4 w-4" />
                <span>
                  {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
                </span>
              </div>

              {progress !== null && (
                <div className="space-y-2">
                  <Progress 
                    value={progress} 
                    className={cn(
                      "h-2",
                      isCompleted ? "text-emerald-500" : "text-sky-700"
                    )}
                  />
                  <p className="text-sm text-slate-500 font-medium">
                    {isCompleted 
                      ? "Course completed" 
                      : `${progress}% completed`
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
