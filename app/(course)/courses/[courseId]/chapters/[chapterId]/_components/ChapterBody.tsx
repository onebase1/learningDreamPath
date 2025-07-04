// path: app/(course)/courses/[courseId]/chapters/[chapterId]/_components/ChapterBody.tsx
"use client";

import React, { useRef, useState } from "react";
import { Play, Pause, FileIcon } from "lucide-react";
import MCQCard from "./MCQCard";
import ReadingAQuizCard from "./ReadingAQuizCard";
import ReadingBCQuizCard from "./ReadingBCQuizCard";
import FillBlankPatientCard from "./FillBlankPatientCard";
import { Separator } from "@/components/ui/separator";
import TableCards from "./TableCards";
import PartBQuizCard from "./PartBQuizCard";

// ---- Import our brand-new SpeakingQuizCard
import SpeakingQuizCard from "./SpeakingQuizCard";
import WritingQuizCard from "./WritingQuizCard";

interface ChapterBodyProps {
  chapter: any;
  isLocked: boolean;
  attachments: Array<{
    id: string;
    url: string;
    name: string;
  }>;
  questionStartNumber: number;
  onAnswerSelection?: (hasAnswer: boolean) => void;
  onTogglePdfViewer?: (url: string) => void;
  isPdfViewerOpen?: boolean;
  isAudio?: boolean;
  timeRemaining?: number;
  nextChapterId?: string;
  onSectionEnd?: () => Promise<void>;
}

const ChapterBody: React.FC<ChapterBodyProps> = ({
  chapter,
  isLocked,
  attachments,
  questionStartNumber,
  onAnswerSelection = () => {},
  onTogglePdfViewer = () => {},
  isPdfViewerOpen = false,
  timeRemaining = 0,
  nextChapterId,
  onSectionEnd
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const POSITION_RANGES = {
    LISTENING: { start: 1, end: 5 },
    READING_A: { start: 6, end: 6 },
    READING_BC: { start: 7, end: 14 },
    WRITING: { start: 15, end: 15 },
    SPEAKING: { start: 16, end: 21 },
  };

  const isInRange = (position: number, range: { start: number; end: number }) => {
    return position >= range.start && position <= range.end;
  };

  const isListening = isInRange(chapter.position, POSITION_RANGES.LISTENING);
  const isReadingA = isInRange(chapter.position, POSITION_RANGES.READING_A);
  const isReadingBC = isInRange(chapter.position, POSITION_RANGES.READING_BC);
  const isSpeaking = isInRange(chapter.position, POSITION_RANGES.SPEAKING);

  // Renders the question/quiz component based on the type of chapter
  const renderQuestionCard = () => {
    if (isListening && (chapter.position === 1 || chapter.position === 2)) {
      return (
        <FillBlankPatientCard
          chapter={chapter}
          questionStartNumber={questionStartNumber}
          courseId={chapter.courseId}
          onAnswerSelection={onAnswerSelection}
        />
      );
    }

    // Example: Listening Part B if you need
    // if (isListening && chapter.position === 3) {
    //   return (
    //     <PartBQuizCard
    //       questions={chapter.questions}
    //       onAnswerSelection={onAnswerSelection}
    //     />
    //   );
    // }

    if (isReadingA) {
      return (
        <ReadingAQuizCard
          chapter={chapter}
          courseId={chapter.courseId}
          position={chapter.position}
          onTogglePdfViewer={onTogglePdfViewer}
          isPdfViewerOpen={isPdfViewerOpen}
          onAnswerSelection={onAnswerSelection}
        />
      );
    }

    if (isReadingBC) {
      return (
        <ReadingBCQuizCard
          chapter={chapter}
          courseId={chapter.courseId}
          position={chapter.position}
          onTogglePdfViewer={onTogglePdfViewer}
          isPdfViewerOpen={isPdfViewerOpen}
          onAnswerSelection={onAnswerSelection}
        />
      );
    }

      // Writing Section
    if (chapter.position === 15) {
      return (
        <WritingQuizCard
          chapter={chapter}
          courseId={chapter.courseId}
          position={chapter.position}
          onTogglePdfViewer={onTogglePdfViewer}
          isPdfViewerOpen={isPdfViewerOpen}
          onAnswerSelection={onAnswerSelection}
        />
      );
    }

    // -------- Speaking Section --------
    if (isSpeaking) {
      return (
        <SpeakingQuizCard
          chapter={chapter}
          courseId={chapter.courseId}
          position={chapter.position}
          onAnswerSelection={onAnswerSelection}
        />
      );
    }

    // Default fallback: MCQ
    return (
      <MCQCard
        chapter={chapter}
        questionStartNumber={questionStartNumber}
        courseId={chapter.courseId}
        onTogglePdfViewer={onTogglePdfViewer}
        isPdfViewerOpen={isPdfViewerOpen}
        onAnswerSelection={onAnswerSelection}
      />
    );
  };

  // Basic audio player example for listening
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex-1 p-2 overflow-y-auto h-full">
      <div className="flex-1 bg-white min-h-full rounded-lg shadow-md p-6 space-y-6">
        {/* (Optional) TableCards with instructions */}
        { (isListening || isReadingA || isReadingBC) && (
          <TableCards chapter={chapter} cardType="instructions" />
        )}

        {/* Optional audio for Listening */}
        {isListening && chapter.videoUrl && (
          <div className="bg-gray-200 p-4 rounded flex items-center space-x-4 mb-4">
            <button
              onClick={togglePlayPause}
              className="bg-black text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <div className="flex-1 h-2 bg-gray-300 rounded-full" />
            <audio
              ref={audioRef}
              src={chapter.videoUrl}
              onEnded={() => setIsPlaying(false)}
              controls={false}
            />
          </div>
        )}

        {/* (Optional) Additional description / tablecards */}
        <TableCards chapter={chapter} cardType="description" />

        {/* Attachments */}
        {!!attachments.length && (
          <>
            <Separator />
            <div className="p-4">
              {attachments.map((attachment) => (
                <a
                  href={attachment.url}
                  target="_blank"
                  key={attachment.id}
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-blue-500"
                >
                  <FileIcon className="mr-2" />
                  {attachment.name}
                </a>
              ))}
            </div>
          </>
        )}

        {/* Render the main quiz component */}
        <div>{renderQuestionCard()}</div>

        {/* Optional footer */}
        <TableCards chapter={chapter} cardType="footer" />
      </div>
    </div>
  );
};

export default ChapterBody;
