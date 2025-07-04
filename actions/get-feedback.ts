//path: app/%28course%29/courses/%5BcourseId%5D/_components/CourseResults.tsx

import { db } from "@/lib/db";


export const getFeedback = async (userId: string) => {
  try {
    const feedback = await db.betaFeedback.findMany({
      where: {
        userId: userId
      },
      include: {
        course: {
          select: {
            title: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    const data = feedback.map(item => ({
      id: item.id,
      rating: item.rating,
      createdAt: item.createdAt,
      courseTitle: item.course?.title || "Unknown",
      feedbackType: item.feedbackType,
      content: item.content
    }));

    return {
      data,
      totalFeedback: feedback.length
    };
  } catch (error) {
    console.log("[GET_FEEDBACK]", error);
    return {
      data: [],
      totalFeedback: 0
    };
  }
};