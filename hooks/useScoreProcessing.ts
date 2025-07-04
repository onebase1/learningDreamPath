// hooks/useScoreProcessing.ts

import { useState, useCallback } from 'react';
import axios from 'axios';
import { SCORING } from '@/actions/constants';

interface ScoreResult {
  rawScore: number;
  scaledScore: number;
  grade: string;
  feedback: any;
  partBScore?: number;
  partCScore?: number;
  totalQuestions: number;
}

export const useScoreProcessing = (courseId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scoreData, setScoreData] = useState<ScoreResult | null>(null);

  const fetchScore = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`/api/courses/${courseId}/score`);
      setScoreData(response.data);
    } catch (err) {
      setError('Failed to fetch score data');
      console.error('Score processing error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [courseId]);

  const getGradeFeedback = useCallback((grade: string) => {
    if (!grade || !SCORING.READING_BC.GRADES[grade as keyof typeof SCORING.READING_BC.GRADES]) {
      return null;
    }

    return SCORING.READING_BC.GRADES[grade as keyof typeof SCORING.READING_BC.GRADES];
  }, []);

  const getPerformanceAnalysis = useCallback((score: number) => {
    const maxScore = SCORING.READING_BC.PART_B.TOTAL_MARKS + 
                    SCORING.READING_BC.PART_C.TOTAL_MARKS;
    const percentage = (score / maxScore) * 100;

    return {
      strengths: percentage >= 70 ? ['Strong overall performance'] : [],
      weaknesses: percentage < 70 ? ['Need improvement in comprehension'] : [],
      recommendations: [
        percentage < 70 ? 'Focus on practice tests and review materials' : 'Continue with advanced materials',
        'Review specific sections where errors occurred'
      ]
    };
  }, []);

  return {
    isLoading,
    error,
    scoreData,
    fetchScore,
    getGradeFeedback,
    getPerformanceAnalysis
  };
};