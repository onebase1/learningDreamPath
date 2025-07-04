"use client";

import React from "react";
import { Clock } from "lucide-react";
import { CourseProgressButton } from "./course-progress-button";

interface ChapterHeaderProps {
  sectionTimeRemaining: number;
  chapterTitle: string;
  userProgress: any;
  chapterId: string;
  courseId: string;
  nextChapterId?: string;
  position: number;
  listeningTimeRemaining?: number; // Add this prop for listening sections
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const ChapterHeader = ({
  sectionTimeRemaining,
  chapterTitle,
  userProgress,
  chapterId,
  courseId,
  nextChapterId,
  position,
  listeningTimeRemaining
}: ChapterHeaderProps) => {
  const getSectionTitle = (position: number) => {
    // Listening sections
    if (position <= 5) {
      switch (position) {
        case 1:
          return "Listening Part A-1";
        case 2:
          return "Listening Part A-2";
        case 3:
          return "Listening Part B";
        case 4:
          return "Listening Part C-1";
        case 5:
          return "Listening Part C-2";
        default:
          return chapterTitle;
      }
    }

    // Reading sections
    if (position === 6) {
      return "Reading Part A";
    }
    if (position >= 7 && position <= 14) {
      return "Reading Part B and C";
    }

    return chapterTitle;
  };
  
  const getTimeStyle = (timeValue: number) => {
    if (timeValue <= 300) { // 5 minutes
      return "text-red-200 animate-pulse";
    }
    if (timeValue <= 600) { // 10 minutes
      return "text-yellow-200";
    }
    return "text-white";
  };

  // Use different time values based on section type
  const isListening = position <= 5;
  const timeToDisplay = isListening 
    ? (listeningTimeRemaining ?? 0)
    : sectionTimeRemaining;

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="flex-1 text-left">
          <span className="font-bold">Section:</span> {getSectionTitle(position)}
      </div>

      <div className={`flex-1 text-center flex justify-center items-center ${getTimeStyle(timeToDisplay)}`}>
        <Clock size={20} className="mr-2" />
        <span>
          {isListening ? "Time Remaining: " : "Section Time Remaining: "}
          {formatTime(timeToDisplay)}
        </span>
      </div>
      <div className="flex-1 text-right">
        <CourseProgressButton
          chapterId={chapterId}
          courseId={courseId}
          nextChapterId={nextChapterId}
          isCompleted={!!userProgress?.isCompleted}
        />
      </div>
    </header>
  );
};

export default ChapterHeader;