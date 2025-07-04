// hooks/useExamTimer.ts
import { useState, useEffect, useCallback } from 'react';
import { SCORING } from "@/actions/constants";
import axios from 'axios';

interface TimerState {
  timeRemaining: number;
  isRunning: boolean;
  isExpired: boolean;
}

export function useExamTimer(chapterId: string) {
  const [timerState, setTimerState] = useState<TimerState>({
    timeRemaining: SCORING.READING_BC.TIME_LIMIT,
    isRunning: false,
    isExpired: false
  });

  const startTimer = useCallback(() => {
    setTimerState(prev => ({ ...prev, isRunning: true }));
  }, []);

  const pauseTimer = useCallback(() => {
    setTimerState(prev => ({ ...prev, isRunning: false }));
  }, []);

  const updateTimeRemaining = useCallback(async () => {
    try {
      await axios.put(`/api/chapters/${chapterId}/progress`, {
        timeRemaining: timerState.timeRemaining
      });
    } catch (error) {
      console.error('Error updating time:', error);
    }
  }, [chapterId, timerState.timeRemaining]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerState.isRunning && timerState.timeRemaining > 0) {
      interval = setInterval(() => {
        setTimerState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
          isExpired: prev.timeRemaining <= 1
        }));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerState.isRunning, timerState.timeRemaining]);

  useEffect(() => {
    if (timerState.timeRemaining % 30 === 0) { // Update server every 30 seconds
      updateTimeRemaining();
    }
  }, [timerState.timeRemaining, updateTimeRemaining]);

  return {
    ...timerState,
    startTimer,
    pauseTimer,
    formatTime: () => {
      const minutes = Math.floor(timerState.timeRemaining / 60);
      const seconds = timerState.timeRemaining % 60;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  };
}