//path: app/%28dashboard%29/%28routes%29/search/_components/oet-categories.tsx
"use client";

import { Category } from "@prisma/client";
import { 
  Headphones, 
  BookOpen,   
  MessageCircle, 
  PenTool,
  GraduationCap    
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface OETCategoriesProps {
  items: Category[];
}

interface CategoryConfig {
  icon: typeof Headphones;
  color: string;
  activeColor: string;
  isComingSoon?: boolean;
}

const categoryConfig: Record<string, CategoryConfig> = {
  "All Courses": {
    icon: GraduationCap,
    color: "bg-slate-100 hover:bg-slate-200 text-slate-700",
    activeColor: "bg-slate-200 border-slate-600",
  },
  "Listening": {
    icon: Headphones,
    color: "bg-blue-100 hover:bg-blue-200 text-blue-700",
    activeColor: "bg-blue-200 border-blue-600",
  },
  "Reading Part A": {
    icon: BookOpen,
    color: "bg-emerald-100 hover:bg-emerald-200 text-emerald-700",
    activeColor: "bg-emerald-200 border-emerald-600",
  },
  "Reading Part BC": {
    icon: BookOpen,
    color: "bg-purple-100 hover:bg-purple-200 text-purple-700",
    activeColor: "bg-purple-200 border-purple-600",
  },
  "Speaking": {
    icon: MessageCircle,
    color: "bg-orange-100 hover:bg-orange-200 text-orange-700",
    activeColor: "bg-orange-200 border-orange-600",
    isComingSoon: true
  },
  "Writing": {
    icon: PenTool,
    color: "bg-pink-100 hover:bg-pink-200 text-pink-700",
    activeColor: "bg-pink-200 border-pink-600",
    isComingSoon: true
  },
};

interface CategoryItemProps {
  label: string;
  value?: string;
  icon: typeof Headphones;
  color: string;
  activeColor: string;
  isComingSoon?: boolean;
}

const CategoryItem = ({ 
  label, 
  value, 
  icon: Icon,
  color,
  activeColor,
  isComingSoon
}: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");
  const isSelected = currentCategoryId === value;

  const onClick = () => {
    if (isComingSoon) {
      // Navigate to all courses if coming soon
      router.push("/search");
      return;
    }
  
    // Special handling for "All Courses"
    if (label === "All Courses") {
      router.push("/search");
      return;
    }
  
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        title: currentTitle,
        categoryId: isSelected ? null : value,
      }
    }, { skipNull: true, skipEmptyString: true });
  
    router.push(url);
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center justify-center px-6 h-20 rounded-lg border-2 border-transparent transition-all",
        "min-w-[120px] gap-2",
        color,
        isSelected && activeColor,
        isSelected && "transform scale-105"
      )}
      type="button"
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium text-sm">
        {label}
        {isComingSoon && (
          <span className="block text-xs opacity-70">Coming Soon</span>
        )}
      </span>
    </button>
  );
};

export const OETCategories = ({
  items,
}: OETCategoriesProps) => {
  // Add "All Courses" category
  const allCoursesCategory = {
    id: "all",
    name: "All Courses",
  };

  return (
    <div className="w-full space-y-4">
      <h2 className="text-2xl font-bold text-slate-700">
        OET Exam Components
      </h2>
      {/* Updated container with better responsiveness */}
      <div className="flex flex-nowrap overflow-x-auto gap-4 pb-2 lg:flex-wrap lg:overflow-visible">
        {/* All Courses button */}
        <CategoryItem
          label={allCoursesCategory.name}
          value={allCoursesCategory.id}
          icon={categoryConfig[allCoursesCategory.name].icon}
          color={categoryConfig[allCoursesCategory.name].color}
          activeColor={categoryConfig[allCoursesCategory.name].activeColor}
        />
        
        {/* Existing categories plus coming soon */}
        {[...items, { id: "speaking", name: "Speaking" }, { id: "writing", name: "Writing" }].map((item) => {
          const config = categoryConfig[item.name];
          if (!config) return null;
          
          return (
            <CategoryItem
              key={item.id}
              label={item.name}
              value={item.id}
              icon={config.icon}
              color={config.color}
              activeColor={config.activeColor}
              isComingSoon={config.isComingSoon}
            />
          );
        })}
      </div>
    </div>
  );
};