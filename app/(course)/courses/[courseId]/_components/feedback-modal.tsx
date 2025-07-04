// app/(course)/courses/[courseId]/_components/feedback-modal.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StarRating } from "@/components/star-rating";

export function FeedbackModal({ courseId }: { courseId: string }) {
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
          type: "course"
        })
      });
      toast.success("Feedback submitted!");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Give Feedback</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Course Feedback</DialogTitle>
        </DialogHeader>
        <StarRating value={rating} onChange={setRating} />
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Your feedback..."
        />
        <Button onClick={onSubmit} disabled={loading}>
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
}