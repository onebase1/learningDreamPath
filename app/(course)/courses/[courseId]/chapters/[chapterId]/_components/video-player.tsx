// ./_components/video-player.tsx

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Loader2, Lock } from "lucide-react";
import ReactPlayer from "react-player";

import { useConfettiStore } from "@/hooks/use-confetti-store";

interface VideoPlayerProps {
  videoUrl?: string | null;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
}

export const VideoPlayer = ({
  videoUrl,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
          isCompleted: true,
        });

        if (!nextChapterId) {
          confetti.onOpen();
        }

        toast.success("Progress updated");
        router.refresh();

        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  // Ensure the video stops playing when the component unmounts
  useEffect(() => {
    return () => {
      setIsReady(false);
    };
  }, []);

  if (!videoUrl) {
    return <div>No media available</div>;
  }

  // Determine if the media is audio or video based on the file extension
  const isAudio = /\.(mp3|wav|ogg)$/i.test(videoUrl);

  return (
    <div className={`relative ${isAudio ? "h-16" : "aspect-video"}`}>
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <>
          {isAudio ? (
            <audio
              src={videoUrl}
              autoPlay
              onEnded={onEnd}
              onCanPlay={() => setIsReady(true)}
              className="w-1/3"
            />
          ) : (
            <ReactPlayer
              url={videoUrl}
              className="react-player"
              onReady={() => setIsReady(true)}
              onEnded={onEnd}
              autoPlay
              playing
              width="100%"
              height="100%"
              config={{
                youtube: {
                  playerVars: {
                    showinfo: 1,
                    modestbranding: 1,
                    rel: 0,
                    autoplay: 0,
                    iv_load_policy: 3,
                  },
                },
              }}
            />
          )}
        </>
      )}
    </div>
  );
};
