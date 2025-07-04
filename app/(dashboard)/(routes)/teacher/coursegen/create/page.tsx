import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CreateCourseForm from "@/components/CreateCourseForm";
import { Info } from "lucide-react";

const CreatePage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col items-start max-w-xl px-8 mx-auto my-16 sm:px-0">
      <h1 className="self-center text-3xl font-bold text-center sm:text-6xl">
        AI Course Generation
      </h1>
      <div className="flex p-4 mt-5 border-none bg-secondary">
        <Info className="w-12 h-12 mr-3 text-blue-400" />
        <div>
          Enter a course title, and list the chapters you want to generate. Our AI will generate the course for you!
        </div>
      </div>

      <CreateCourseForm />
    </div>
  );
};

export default CreatePage;
