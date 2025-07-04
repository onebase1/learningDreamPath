"use client";

// We’ll import our CourseCard from a file named "course-card.tsx" in the same folder
import { CourseCard } from "./course-card";

// Match the shape from getCourses:
interface CategoryData {
  name?: string; // or string | null
}

interface CourseItem {
  id: string;
  title: string;
  locked?: boolean; // allow undefined or boolean
  category: CategoryData | null;
  imageUrl?: string | null;
  progress?: number | null;
}

// Groups courses by category name
function groupByCategory(courses: CourseItem[]) {
  const map: Record<string, CourseItem[]> = {};
  for (const c of courses) {
    const catName = c.category?.name || "Uncategorized";
    if (!map[catName]) {
      map[catName] = [];
    }
    map[catName].push(c);
  }
  return map;
}

interface CoursesListProps {
  items: CourseItem[];
}

export function CoursesList({ items }: CoursesListProps) {
  const grouped = groupByCategory(items);

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([catName, catCourses]) => {
        // Sort so unlocked come first
        catCourses.sort(
          (a, b) => Number(!!a.locked) - Number(!!b.locked)
          // "!!" forces locked? boolean => true/false => numeric 0/1
        );

        return (
          <div key={catName}>
            <h2 className="text-xl font-bold mb-4">{catName}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {catCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
