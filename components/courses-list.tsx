"use client";

import { CourseCard } from "./course-card"; // We'll define next

// A minimal type definition if needed
interface CourseItem {
  id: string;
  title: string;
  locked: boolean;
  category?: { name?: string };
  // plus any other fields (imageUrl, progress, etc.)
}

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
  // 1) Group them by category name
  const grouped = groupByCategory(items);

  // 2) Render a section per category
  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([catName, catCourses]) => {
        // Sort so unlocked come first
        catCourses.sort((a, b) => Number(a.locked) - Number(b.locked));

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
