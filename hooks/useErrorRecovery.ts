// hooks/useErrorRecovery.ts

import { useState, useEffect } from 'react';
import axios from 'axios';

interface State {
  answers: Record<string, string>;
  timeRemaining: number;
}

export const useErrorRecovery = (courseId: string, chapterId: string) => {
  const [isRecovering, setIsRecovering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleBeforeUnload = async (e: BeforeUnloadEvent) => {
      e.preventDefault();
      await backupState();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [courseId, chapterId]);

  const backupState = async () => {
    try {
      await axios.post(`/api/courses/${courseId}/backup`, {
        chapterId,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.error('Failed to backup state:', err);
    }
  };

  const recoverState = async () => {
    setIsRecovering(true);
    setError(null);

    try {
      const response = await axios.post(`/api/courses/${courseId}/verify-state`, {
        chapterId
      });

      if (response.data.hasRecoveryData) {
        return response.data.state;
      }
    } catch (err) {
      setError('Failed to recover state');
      console.error('Recovery error:', err);
    } finally {
      setIsRecovering(false);
    }

    return null;
  };

  return {
    isRecovering,
    error,
    backupState,
    recoverState
  };
};