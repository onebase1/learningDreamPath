"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

// Import UI components
import PDFViewer from "./PDFViewer";
import ChapterHeader from "./ChapterHeader";
import ChapterBody from "./ChapterBody";
import ChapterSidebar from "./ChapterSidebar";
import ChapterFooter from "./ChapterFooter";
import Modal from "@/components/Modal";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface ChapterInfo {
  id: string;
  position: number;
}

interface Props {
  chapter: {
    id: string;
    title: string;
    courseId: string;
    timeLimit?: number;
    videoUrl?: string | null;
    pdfUrl?: string | null;
    position: number;
    questions: any[];
  };
  isLocked: boolean;
  nextChapterId?: string;
  userProgress: any;
  attachments: any[];
  position: number;
  courseChapters: ChapterInfo[];
}

const ChapterContent = ({
  chapter,
  isLocked,
  nextChapterId,
  userProgress,
  attachments,
  position,
  courseChapters,
}: Props): JSX.Element => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const confetti = useConfettiStore();

  // Determine if the current chapter is Listening (positions 1–5) or Reading (positions ≥6)
  const isListening = position <= 5;
  const isReading = !isListening;

  // For Reading courses, try to initialize the timer from the URL query parameter,
  // otherwise default to chapter.timeLimit (should be 2520 for reading) or 2520.
  const remainingTimeFromQuery = isReading ? searchParams.get("remainingTime") : null;
  const initialTime = isReading
    ? (remainingTimeFromQuery ? parseInt(remainingTimeFromQuery) : (chapter.timeLimit || 2520))
    : (chapter.timeLimit || 900);
  
    // Default to "docked" mode (side-by-side)
  


  const [timeRemaining, setTimeRemaining] = useState<number>(initialTime);

  // Set up a local timer that decrements every second.
  useEffect(() => {
    if (isLocked) return;
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSectionEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isLocked]);

  // (Optional) The cleanupPreviousAttempt useEffect is retained as-is.
  useEffect(() => {
    const cleanupPreviousAttempt = async () => {
      const isStartingPosition = position === 1 || position === 6 || position === 7;
      if (isStartingPosition) {
        try {
          await axios.delete(
            `/api/courses/${chapter.courseId}/chapters/${chapter.id}/progress`,
            {
              data: { 
                isStartingChapter: true,
                courseSection: position
              }
            }
          );
        } catch (error) {
          console.error("Error cleaning up previous attempt:", error);
        }
      }
    };
    cleanupPreviousAttempt();
  }, [chapter.courseId, chapter.id, position]);

  const [hasAnswerSelected, setHasAnswerSelected] = useState(false);

  // Save progress (same as listening; no timer data is saved during the exam)
  const saveProgress = async () => {
    try {
      await axios.put(
        `/api/courses/${chapter.courseId}/chapters/${chapter.id}/progress`,
        { isCompleted: true }
      );
    } catch (error) {
      console.error("Error saving progress:", error);
      throw error;
    }
  };

  const handleAnswerSelection = useCallback((hasAnswer: boolean) => {
    setHasAnswerSelected(hasAnswer);
  }, []);

  // When the section ends (either via auto-timeout or clicking "Next Section")
  const handleSectionEnd = async () => {
    try {
      await saveProgress();
      if (nextChapterId) {
        // For Reading, pass the remaining time along as a query parameter so that the timer continues.
        if (isReading) {
          router.push(
            `/courses/${chapter.courseId}/chapters/${nextChapterId}?position=${chapter.position + 1}&remainingTime=${timeRemaining}`
          );
        } else {
          router.push(
            `/courses/${chapter.courseId}/chapters/${nextChapterId}?position=${chapter.position + 1}`
          );
        }
      } else {
        await finishCourse();
      }
    } catch (error) {
      toast.error("Failed to proceed to next section");
    }
  };

  // Finish the course (final API call to calculate score, etc.)
  const finishCourse = async () => {
    try {
      // Optionally, you can pass final time taken here if needed.
      const response = await axios.post(`/api/courses/${chapter.courseId}/finish`, {
        finalTimeTaken: initialTime - timeRemaining
      });
      router.push(response.data.redirect || `/courses/${chapter.courseId}/results`);
    } catch (error) {
      toast.error("Failed to finish course");
    }
  };

  // When the user clicks "Next Section"
  const handleNextSection = async () => {
    try {
      const response = await axios.get(
        `/api/courses/${chapter.courseId}/chapters/${chapter.id}/temporary-answer`
      );
      const currentAnswers = response.data.answers || [];
      const totalQuestions = chapter.position <= 2
        ? (chapter.questions?.filter(q => q.question.includes("[...]")).length || 0)
        : (chapter.questions?.length || 0);

      if (currentAnswers.length < totalQuestions) {
        toast.error(`Please answer all questions (${currentAnswers.length}/${totalQuestions} answered)`);
        return;
      }

      if (nextChapterId) {
        await handleSectionEnd();
      } else {
        confetti.onOpen();
        setTimeout(() => {
          handleSectionEnd();
        }, 500);
      }
    } catch (error) {
      console.error("Error checking answers:", error);
      toast.error("Failed to verify answers");
    }
  };

  // PDF viewer state
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfDisplayMode, setPdfDisplayMode] = useState<"modal" | "docked">("docked");

  const handlePdfToggle = (url: string) => {
    setIsPdfViewerOpen(true);
    setPdfUrl(url);
  };

  const isAudio = Boolean(chapter.videoUrl && /\.(mp3|wav|ogg)$/i.test(chapter.videoUrl));

  // Determine the starting question number for Listening chapters
  const questionStartNumber = (() => {
    switch (chapter.position) {
      case 1: return 1;
      case 2: return 13;
      case 3: return 25;
      case 4: return 31;
      case 5: return 37;
      default: return 1;
    }
  })();

  // If PDF is docked, render side-by-side layout
  if (pdfDisplayMode === "docked" && isPdfViewerOpen && pdfUrl) {
    return (
      <div className="flex h-screen w-full">
        {/* Left column: PDF viewer with a right border */}
        <div className="w-1/2 h-full border-r border-gray-200">
          <PDFViewer
            pdfUrl={pdfUrl}
            onClose={() => { setIsPdfViewerOpen(false); setPdfUrl(null); }}
            displayMode="docked"
            onDockToggle={() => setPdfDisplayMode("modal")}
          />
        </div>
        {/* Right column: Quiz content */}
        <div className="w-1/2 flex flex-col mx-auto px-4">
          <ChapterHeader
            sectionTimeRemaining={timeRemaining}
            chapterTitle={chapter.title}
            userProgress={userProgress}
            chapterId={chapter.id}
            courseId={chapter.courseId}
            nextChapterId={nextChapterId}
            position={position}
            listeningTimeRemaining={isListening ? timeRemaining : undefined}
          />
          <div className="flex flex-1 min-h-0 overflow-hidden">
            <ChapterSidebar 
              chapterId={chapter.id} 
              courseId={chapter.courseId}
              currentPosition={position}
              chapters={courseChapters}
              answeredChapters={[]} 
            />
            <ChapterBody
              chapter={chapter}
              isLocked={isLocked}
              attachments={attachments}
              questionStartNumber={questionStartNumber}
              onAnswerSelection={handleAnswerSelection}
              onTogglePdfViewer={handlePdfToggle}
              isPdfViewerOpen={isPdfViewerOpen}
              isAudio={isAudio}
              timeRemaining={timeRemaining}
              onSectionEnd={handleSectionEnd}
              nextChapterId={nextChapterId}
            />
          </div>
          <ChapterFooter
            onNextSection={handleNextSection}
            isLastChapter={!nextChapterId}
            isLocked={isLocked}
            buttonText="Next Section"
            isDisabled={!hasAnswerSelected}
            position={position}
            className="flex-shrink-0"
          />
        </div>
      </div>
    );
  }
  

  // Default modal layout
  return (
    <div className="flex h-screen w-full">
      <div className="flex flex-col mx-auto px-4 w-full max-w-[1100px]">
        <ChapterHeader
          sectionTimeRemaining={timeRemaining}
          chapterTitle={chapter.title}
          userProgress={userProgress}
          chapterId={chapter.id}
          courseId={chapter.courseId}
          nextChapterId={nextChapterId}
          position={position}
          listeningTimeRemaining={isListening ? timeRemaining : undefined}
        />
        <div className="flex flex-1 min-h-0 overflow-hidden">
          <ChapterSidebar 
            chapterId={chapter.id} 
            courseId={chapter.courseId}
            currentPosition={position}
            chapters={courseChapters}
            answeredChapters={[]} 
          />
          <ChapterBody
            chapter={chapter}
            isLocked={isLocked}
            attachments={attachments}
            questionStartNumber={questionStartNumber}
            onAnswerSelection={handleAnswerSelection}
            onTogglePdfViewer={handlePdfToggle}
            isPdfViewerOpen={isPdfViewerOpen}
            isAudio={isAudio}
            timeRemaining={timeRemaining}
            onSectionEnd={handleSectionEnd}
            nextChapterId={nextChapterId}
          />
        </div>
        <ChapterFooter
          onNextSection={handleNextSection}
          isLastChapter={!nextChapterId}
          isLocked={isLocked}
          buttonText="Next Section"
          isDisabled={!hasAnswerSelected}
          position={position}
          className="flex-shrink-0"
        />
      </div>

      {isPdfViewerOpen && pdfUrl && (
        <Modal isOpen={isPdfViewerOpen} onClose={() => { setIsPdfViewerOpen(false); setPdfUrl(null); }}>
          <PDFViewer
            pdfUrl={pdfUrl}
            onClose={() => { setIsPdfViewerOpen(false); setPdfUrl(null); }}
            displayMode="modal"
            onDockToggle={() => setPdfDisplayMode("docked")}
          />
        </Modal>
      )}
    </div>
  );
};

export default ChapterContent;
