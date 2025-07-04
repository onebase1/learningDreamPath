import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Script from "next/script"; // <-- For loading external scripts in Next.js
import FinishFeedbackForm from "../_components/FinishFeedbackForm";
// or wherever your FinishFeedbackForm is located

export default async function FinishPage({
  params,
}: {
  params: { courseId: string };
}) {
  // Check if user is authenticated
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }

  // (Optional) verify that user has completed the course, etc.

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {/* 
        1) The FeedbackFin script. We use Script with "defer" to load it asynchronously.
      */}
      <Script
        src="https://unpkg.com/feedbackfin@^1"
        defer
      />

      {/*
        2) A small inline script that configures your feedbackfin.
           We set the webhook URL and optional user info.
           You can also pass "name" or "email" from your server if needed.
      */}
      <Script id="feedbackfin-setup" strategy="afterInteractive">
        {`
          window.feedbackfin = { config: {}, ...window.feedbackfin };
          window.feedbackfin.config.url = "https://rowy-hooks.run.app/wh/bH1BCeTv9ilbCpOLBjM8";
          // If you have real user info:
          window.feedbackfin.config.user = { name: "SomeUser", email: "test@example.com" };
        `}
      </Script>

      <div className="max-w-md w-full bg-white shadow p-6 rounded">
        {/* 
          This is your existing "we're preparing your score" message or 
          any short form you want. 
        */}
        <FinishFeedbackForm courseId={params.courseId} userId={userId} />

        {/* 
          3) Add a button that triggers the FeedbackFin widget.
             Just add the data-feedbackfin-button attribute.
          */}
        <div className="mt-4 text-right">
          <button
            data-feedbackfin-button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
