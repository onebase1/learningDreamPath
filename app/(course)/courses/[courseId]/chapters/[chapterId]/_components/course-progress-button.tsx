"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface CourseProgressButtonProps {
  chapterId: string;
  courseId: string;
  isCompleted?: boolean;
  nextChapterId?: string;
  isLastChapter?: boolean;
  onSectionComplete?: () => void;
}

export const CourseProgressButton = ({
  chapterId,
  courseId,
  isCompleted,
  nextChapterId,
  isLastChapter,
  onSectionComplete
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const finishCourse = async () => {
    try {
      const response = await axios.post(`/api/courses/${courseId}/finish`);
      if (response.data.redirect) {
        router.push(response.data.redirect);
      }
    } catch (error) {
      toast.error("Failed to finish course");
    }
  };

  const onClick = async () => {
    try {
      setIsLoading(true);

      // Mark chapter as complete
      await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
        isCompleted: true
      });

      if (isLastChapter) {
        confetti.onOpen();
        await finishCourse();
      } else if (nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      if (onSectionComplete) {
        onSectionComplete();
      }

      toast.success("Progress updated");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      variant="success"
      className="w-full md:w-auto bg-orange-400 hover:bg-orange-500 text-white px-6 py-2"
    >
      {isLastChapter ? "Finish Course" : "Complete Section"}
    </Button>
  );
};