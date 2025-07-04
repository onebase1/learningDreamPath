// app/courses/[courseId]/chapters/[chapterId]/page.tsx

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import ChapterContent from "./_components/ChapterContent";

import { db } from "@/lib/db";

const ChapterIdPage = async ({
  params,
  searchParams,
}: {
  params: { courseId: string; chapterId: string };
  searchParams: { position?: string };
}) => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const {
    chapter,
    course,
    attachments,
    nextChapter,
    userProgress,
    // purchase,
    // isPartB,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const courseChapters = await db.chapter.findMany({
    where: {
      courseId: params.courseId,
      isPublished: true,
    },
    select: {
      id: true,
      position: true,
    },
    orderBy: {
      position: "asc",
    },
  });

  // const isLocked = !chapter.isFree && !purchase;
  const position = parseInt(searchParams.position || "1", 10);  



  return (
    <div className="h-full w-full">
    {/* {course.category?.type === "video" && userProgress?.isCompleted && (
      <Banner variant="success" label="You already completed this chapter." />
    )}
    {course.category?.type === "video" && isLocked && (
      <Banner
        variant="warning"
        label="You need to purchase this course to access this chapter."
      />
    )}
    {!userProgress?.termsAccepted ? (
      <TermsAndConditionsWrapper
        courseId={params.courseId}
        chapterId={params.chapterId}
        courseTitle={course.title}
      />
    ) : ( */}
      <ChapterContent
        chapter={chapter}
        isLocked={false}
        // purchase={purchase}
        nextChapterId={nextChapter?.id}
        userProgress={userProgress}
        // coursePrice={course.price}
        attachments={attachments}
        position={position}
        // isPartB={isPartB}
        courseChapters={courseChapters}
        // showTerms={showTerms}
        // courseTitle={course.title}        
      />      
    </div>
  );
};

export default ChapterIdPage;
