// app/admin/feedback/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { Card } from "@/components/ui/card";

// Define the types for your database models
type Feedback = {
  id: string;
  rating: number;
  createdAt: Date;
  course: {
    title: string;
  };
};

export default async function FeedbackPage() {
  const { userId } = await auth();

  if (userId !== process.env.NEXT_PUBLIC_TEACHER_ID) {
    return redirect("/");
  }

  const feedback: Feedback[] = await db.feedback.findMany({
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

  const analytics = {
    averageRating: feedback.reduce((acc, item) => acc + item.rating, 0) / feedback.length,
    totalFeedback: feedback.length,
    recentFeedback: feedback.slice(0, 5)
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <h3>Average Rating</h3>
          <p className="text-2xl">{analytics.averageRating.toFixed(1)}</p>
        </Card>
        <Card>
          <h3>Total Feedback</h3>
          <p className="text-2xl">{analytics.totalFeedback}</p>
        </Card>
      </div>
      <DataTable columns={columns} data={feedback} />
    </div>
  );
}