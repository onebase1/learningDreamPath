import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";

type PurchaseWithCourse = Purchase & {
  course: Course;
};

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {};
  
  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += purchase.course.price!;
  });

  return grouped;
};

export const getAnalytics = async (userId: string) => {
  try {
    const [purchases, feedback, analytics] = await Promise.all([
      // Existing purchases query
      db.purchase.findMany({
        where: {
          course: {
            userId: userId
          }
        },
        include: {
          course: true,
        }
      }),
      // Feedback data
      db.feedback.findMany({
        where: {
          course: {
            userId: userId
          }
        },
        include: {
          course: true
        }
      }),
      // General analytics
      db.analytics.groupBy({
        by: ['eventType'],
        where: {
          userId: userId
        },
        _count: {
          _all: true
        }
      })
    ]);

    const groupedEarnings = groupByCourse(purchases);
    const coursesData = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
      name: courseTitle,
      total: total,
    }));

    const totalRevenue = coursesData.reduce((acc, curr) => acc + curr.total, 0);

    return {
      data: coursesData,
      totalRevenue,
      totalSales: purchases.length,
      feedbackStats: {
        averageRating: feedback.reduce((acc, curr) => acc + curr.rating, 0) / feedback.length || 0,
        totalFeedback: feedback.length
      },
      engagement: {
        pageViews: analytics.find(a => a.eventType === 'page_view')?._count || 0,
        courseCompletions: analytics.find(a => a.eventType === 'course_completed')?._count || 0,
      }
    }
  } catch (error) {
    console.log("[GET_ANALYTICS]", error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
      feedbackStats: { averageRating: 0, totalFeedback: 0 },
      engagement: { pageViews: 0, courseCompletions: 0 }
    }
  }
}