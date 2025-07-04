import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCourses } from "@/actions/get-courses";
import { SearchInput } from "@/components/search-input";
import { OETCategories } from "./_components/oet-categories";
import { CoursesList } from "./_components/courses-list";

interface SearchPageProps {
  searchParams: {
    title?: string;
    categoryId?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  // Optionally load categories for your OETCategories filter
  const categories = await db.category.findMany({ orderBy: { name: "asc" } });

  // 1) Fetch all courses with locked/unlocked
  const courses = await getCourses({
    userId,
    title: searchParams.title,
    categoryId: searchParams.categoryId,
  });

  return (
    <div className="mx-auto p-6">
      {/* (Optional) Top search bar */}
      <div className="mb-6">
        <SearchInput />
      </div>

      {/* Category filter row */}
      <OETCategories items={categories} />

      {/* Render grouped courses */}
      <CoursesList items={courses} />
    </div>
  );
}
