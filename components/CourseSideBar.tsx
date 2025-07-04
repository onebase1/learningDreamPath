import { cn } from "@/lib/utils";
import { Chapter, Course} from "@prisma/client";
import Link from "next/link";
import React from "react";
import { Separator } from "./ui/separator";

type Props = {
  course: Course & {
    Chapters: (Chapter & {
      chapters: Chapter[];
    })[];
  };
  currentChapterId: string;
};

const CourseSideBar = async ({ course, currentChapterId }: Props) => {
  return (
    <div className="w-[400px] absolute top-1/2 -translate-y-1/2 p-6 rounded-r-3xl bg-secondary">
      <h1 className="text-4xl font-bold">{course.title}</h1>
      {course.Chapters.map((Chapter, ChapterIndex) => {
        return (
          <div key={Chapter.id} className="mt-4">
            <h2 className="text-sm uppercase text-secondary-foreground/60">
              Chapter {ChapterIndex + 1}
            </h2>
            <h2 className="text-2xl font-bold">{Chapter.title}</h2>
            {Chapter.chapters.map((chapter, chapterIndex) => {
              return (
                <div key={chapter.id}>
                  <Link
                    href={`/course/${course.id}/${ChapterIndex}/${chapterIndex}`}
                    className={cn("text-secondary-foreground/60", {
                      "text-green-500 font-bold":
                        chapter.id === currentChapterId,
                    })}
                  >
                    {chapter.title}
                  </Link>
                </div>
              );
            })}
            <Separator className="mt-2 text-gray-500 bg-gray-500" />
          </div>
        );
      })}
    </div>
  );
};

export default CourseSideBar;
