import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { InfoCard } from "./_components/info-card";
import { DashboardCoursesList } from "./_components/dashboard-courses-list";
import { db } from "@/lib/db";  

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/landing"); // or "/sign-in", whichever you prefer
  }

  // 1) Fetch subscription
  const subscription = await db.subscription.findUnique({ where: { userId } });
  // 2) Default to "free" if no subscription
  const userPlan = subscription?.planId.toLowerCase() || "free";

  // 3) Load the user’s in-progress/completed courses
  //    (getDashboardCourses is presumably your custom action 
  //     that returns two arrays of courses)
  const { completedCourses, coursesInProgress } = await getDashboardCourses(userId);

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>

      {/* If you want to pass userPlan to show locked courses, etc.
          Right now, these are only courses the user has started or completed,
          so they shouldn’t need a locked check. */}
      <DashboardCoursesList
        items={[...coursesInProgress, ...completedCourses]}
      />
    </div>
  );
}
