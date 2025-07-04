// app/admin/analytics/_components/analytics-dashboard.tsx
'use client';

import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { 
 LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
 PieChart, Pie, Cell
} from 'recharts';

interface AnalyticsData {
 userCount: number;
 courseCompletions: any[];
 feedbackStats: any[];
 betaStats: any;
}

export function AnalyticsDashboard() {
 const [data, setData] = useState<AnalyticsData | null>(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
   const fetchData = async () => {
     try {
       const response = await fetch('/api/analytics');
       const analyticsData = await response.json();
       setData(analyticsData);
     } catch (error) {
       console.error('Failed to fetch analytics:', error);
     } finally {
       setLoading(false);
     }
   };

   fetchData();
 }, []);

 if (loading) return <div>Loading...</div>;
 if (!data) return <div>No data available</div>;

 const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

 return (
   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
     <Card className="p-4">
       <h2 className="text-lg font-semibold mb-4">User Overview</h2>
       <div className="space-y-2">
         <p>Total Users: {data.userCount}</p>
         <p>Beta Users: {data.betaStats._count.id}</p>
       </div>
     </Card>

     <Card className="p-4">
       <h2 className="text-lg font-semibold mb-4">Course Completions</h2>
       <LineChart width={400} height={300} data={data.courseCompletions}>
         <CartesianGrid strokeDasharray="3 3" />
         <XAxis dataKey="courseId" />
         <YAxis />
         <Tooltip />
         <Legend />
         <Line type="monotone" dataKey="_count" stroke="#8884d8" />
       </LineChart>
     </Card>

     <Card className="p-4">
       <h2 className="text-lg font-semibold mb-4">Feedback Distribution</h2>
       <PieChart width={400} height={300}>
         <Pie
           data={data.feedbackStats}
           dataKey="_count"
           nameKey="rating"
           cx="50%"
           cy="50%"
           outerRadius={100}
           label
         >
           {data.feedbackStats.map((entry: any, index: number) => (
             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
           ))}
         </Pie>
         <Tooltip />
         <Legend />
       </PieChart>
     </Card>

     <Card className="p-4">
       <h2 className="text-lg font-semibold mb-4">Beta Program Stats</h2>
       <div className="space-y-2">
         <p>Waitlist Size: {data.betaStats._count.id}</p>
         <p>Invited Users: {data.betaStats._sum?._count?.id || 0}</p>
       </div>
     </Card>
   </div>
 );
}