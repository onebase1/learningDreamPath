// hooks/useExamProgress.ts
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { SCORING } from '@/actions/constants';

export const useExamProgress = (courseId: string, chapterId: string) => {
  const router = useRouter();
  const [timeRemaining, setTimeRemaining] = useState<number>(SCORING.READING_BC.TIME_LIMIT);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        // Get chapter first to determine if it's Reading B&C
        const chapterResponse = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}`);
        const chapter = chapterResponse.data;
        
        // If Reading B&C (positions 7-14)
        if (chapter.position >= 7 && chapter.position <= 14) {
          // Get course-level progress for Reading B&C
          const courseResponse = await axios.get(`/api/courses/${courseId}/progress`);
          const courseProgress = courseResponse.data;
          
          if (courseProgress?.timeRemaining !== undefined) {
            setTimeRemaining(courseProgress.timeRemaining);
          }
        } else {
          // For non-Reading B&C, get chapter progress as before
          const response = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}/progress`);
          const data = response.data;
          
          if (data.timeRemaining !== undefined) {
            setTimeRemaining(data.timeRemaining);
          }
        }
        
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch progress');
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, [courseId, chapterId]);

  const updateProgress = useCallback(async (remainingTime: number) => {
    try {
      const chapter = await axios.get(`/api/courses/${courseId}/chapters/${chapterId}`);
      const isReadingBC = chapter.data.position >= 7 && chapter.data.position <= 14;
      const isReadingA = chapter.data.position === 6;

      if (isReadingBC) {
        // Update course-level progress for Reading B&C
        await axios.put(`/api/courses/${courseId}/progress`, {
          timeRemaining: remainingTime
        });
      } else if (isReadingA) {
        // Update chapter progress for other types
        await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
          timeRemaining: remainingTime
        });
      }
    } catch (err) {
      console.error('Failed to update progress:', err);
    }
  }, [courseId, chapterId]);

//////
  

  useEffect(() => {
    if (timeRemaining <= 0) {
      handleTimeUp();
      return;
    }
 
    let lastUpdate = Date.now();
    const updateInterval = 30 * 60 * 1000; // 30 minutes
 
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;
        
        // Only update progress every 30 minutes
        const now = Date.now();
        if (now - lastUpdate >= updateInterval) {
          updateProgress(newTime);
          lastUpdate = now;
        }
        
        return newTime;
      });
    }, 1000);
 
    return () => clearInterval(timer);
  }, [timeRemaining]);
 
  const handleTimeUp = async () => {
    try {
      await axios.post(`/api/courses/${courseId}/finish`);
      router.push(`/courses/${courseId}/results`);
    } catch (err) {
      setError('Failed to submit exam');
    }
  };
 
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
 
  return {
    timeRemaining,
    formattedTime: formatTime(timeRemaining),
    isLoading,
    error,
    updateProgress
  };
 };
 
 export default useExamProgress;