// app/admin/analytics/page.tsx

import { AnalyticsDashboard } from "./_components/analytics-dashboard";

export default async function AnalyticsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>
      <AnalyticsDashboard />
    </div>
  );
}