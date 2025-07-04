import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getAnalytics } from "@/actions/get-analytics";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";

const AnalyticsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const analytics = await getAnalytics(userId);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <DataCard
          label="Total Revenue"
          value={analytics.totalRevenue}
          shouldFormat
        />
        


        <DataCard
          label="Course Sales"
          value={analytics.totalSales}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard
          label="Average Rating"
          value={parseFloat(analytics.feedbackStats.averageRating.toFixed(1))} // Convert to number
          subtitle={`From ${analytics.feedbackStats.totalFeedback} reviews`}
        />
        <DataCard
          label="Course Completions"
          value={typeof analytics.engagement.courseCompletions === 'number' ? analytics.engagement.courseCompletions : analytics.engagement.courseCompletions._all}
        />
      </div>
      <Chart data={analytics.data} />
    </div>
  );
};

export default AnalyticsPage;