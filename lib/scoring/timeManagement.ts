// lib/scoring/timeManagement.ts
import { SCORING } from "@/actions/constants";
import { db } from "@/lib/db";

export async function updateTimeRemaining(
  userId: string,
  chapterId: string,
  timeSpent: number
) {
  const userProgress = await db.userProgress.upsert({
    where: {
      userId_chapterId: {
        userId,
        chapterId
      }
    },
    update: {
      timeRemaining: {
        decrement: timeSpent
      }
    },
    create: {
      userId,
      chapterId,
      timeRemaining: SCORING.READING_BC.TIME_LIMIT
    }
  });

  return userProgress;
}

export async function checkTimeStatus(userId: string, chapterId: string) {
  const progress = await db.userProgress.findUnique({
    where: {
      userId_chapterId: {
        userId,
        chapterId
      }
    }
  });

  const timeRemaining = progress?.timeRemaining ?? 0;
  
  return {
    hasTimeRemaining: timeRemaining > 0,
    timeRemaining,
    shouldAutoSubmit: timeRemaining <= 0
  };
}