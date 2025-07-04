// lib/analytics.ts
import { db } from "@/lib/db";

// lib/analytics.ts
export const TRACKED_EVENTS = {
  PAGE_VIEW: 'PAGE_VIEW',
  COURSE_COMPLETED: 'COURSE_COMPLETED',
  FEEDBACK_SUBMITTED: 'FEEDBACK_SUBMITTED',
  CREDIT_PURCHASED: 'CREDIT_PURCHASED'
} as const;

type EventType = keyof typeof TRACKED_EVENTS;

export const trackEvent = async (
  userId: string, 
  eventType: EventType,  // Now accepts the uppercase versions
  metadata: any = {}
) => {
  try {
    await db.analytics.create({
      data: {
        userId,
        eventType,
        metadata: {
          ...metadata,
          timestamp: new Date().toISOString()
        }
      }
    });
  } catch (error) {
    console.error("Analytics tracking failed:", error);
  }
};