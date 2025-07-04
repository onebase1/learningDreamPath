"use state"
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AddNewInterviewCard from './_components/addNewInterviewCard';

export default async function InterviewPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  return (
    <div className="px-6 pt-6 ">
      <AddNewInterviewCard />
    </div>
  );
}
