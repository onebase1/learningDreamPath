// actions/update-course-progress.ts (new or updated file)
import { db } from '@/lib/db';
import { differenceInHours } from 'date-fns';



export async function autoCompleteCourse(userId: string, courseId: string, timeRemaining: number) {
  // If timer reaches zero, mark as autoCompleted
  if (timeRemaining <= 0) {
    // Check if user already retried within 24 hours
    const userCourse = await db.userCourse.findUnique({
      where: { userId_courseId: { userId, courseId } }
    });

    if (userCourse && userCourse.retryCount < 1) {
      // Allow one free retry if last attempt was over 24 hours ago
      const hoursSince = differenceInHours(new Date(), userCourse.lastAttempt);
      if (hoursSince >= 24) {
        await db.userCourse.update({
          where: { id: userCourse.id },
          data: { retryCount: { increment: 1 }, lastAttempt: new Date(), status: 'in-progress' }
        });
        return { message: 'Retry granted' };
      }
    }

    // Otherwise mark course as autoCompleted
    if (userCourse) {
      await db.userCourse.update({
        where: { id: userCourse.id },
        data: { status: 'autoCompleted', lastAttempt: new Date() }
      });
    } else {
      await db.userCourse.create({
        data: { userId, courseId, status: 'autoCompleted' }
      });
    }
    return { message: 'Course auto-completed' };
  }
  return { message: 'Course still in progress' };
}
