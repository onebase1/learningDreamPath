//path: app/%28dashboard%29/%28routes%29/search/_components/category-item.tsx

"use client";

import { Suspense } from "react";
// ...existing code...
import qs from "query-string";
// ...existing code...
import { IconType } from "react-icons";
// ...existing code...
import {
  usePathname,
  useRouter,
  useSearchParams
} from "next/navigation";
// ...existing code...
import { cn } from "@/lib/utils";
// ...existing code...

interface CategoryItemProps {
  label: string;
  value?: string;
  icon?: IconType;
};

// Internal component to handle the logic
function InternalCategoryItem({ label, value, icon: Icon }: CategoryItemProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        }
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
        isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
      )}
      type="button"
    >
      {Icon && <Icon size={20} />}
      <div className="truncate">
        {label}
      </div>
    </button>
  );
}

// Exported component wrapped in Suspense
export function CategoryItem(props: CategoryItemProps) {
  return (
    <Suspense fallback={<div>Loading category...</div>}>
      <InternalCategoryItem {...props} />
    </Suspense>
  );
}
// ...existing code...