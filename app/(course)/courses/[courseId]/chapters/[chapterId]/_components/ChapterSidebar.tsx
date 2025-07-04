"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Logo } from '@/app/(dashboard)/_components/logo';
import { MinimalSidebar } from './SidebarVariations';

type ChapterInfo = {
  id: string;
  position: number;
};

interface ChapterSidebarProps {
  chapterId: string;
  courseId: string;
  currentPosition: number;
  chapters: ChapterInfo[];
  answeredChapters?: string[];
}

const ChapterSidebar: React.FC<ChapterSidebarProps> = ({
  chapterId,
  courseId,
  currentPosition,
  chapters,
  answeredChapters = []
}) => {
  const router = useRouter();
  
  const getDisplayPosition = (position: number): number => {
    if (position <= 5) return position;
    if (position === 6) return 1;
    if (position >= 7 && position <= 14) return position - 6;
    return position;
  };

  const handleNavigation = (chapId: string, position: number) => {
    router.push(`/courses/${courseId}/chapters/${chapId}?position=${position}`);
  };

  return (
    <MinimalSidebar
      chapterId={chapterId}
      courseId={courseId}
      currentPosition={currentPosition}
      chapters={chapters}
      answeredChapters={answeredChapters}
      onNavigate={handleNavigation}
   
    />
  );
};

export default ChapterSidebar;