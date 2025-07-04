// app/(course)/courses/[courseId]/chapters/[chapterId]/_components/feedback-form.tsx
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { toast } from "react-hot-toast";
import { StarRating } from "@/components/star-rating";

export function FeedbackForm({ courseId }: { courseId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          rating,
          content,
          feedbackType: "course"
        })
      });
      toast.success("Feedback submitted");
      setIsOpen(false);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!isOpen ? (
        <Button onClick={() => setIsOpen(true)}>Give Feedback</Button>
      ) : (
        <div className="space-y-4">
          <StarRating value={rating} onChange={setRating} />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Your feedback"
          />
          <div className="flex items-center gap-x-2">
            <Button disabled={loading} onClick={onSubmit}>Submit</Button>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
}