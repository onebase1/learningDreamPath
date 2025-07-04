"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NonChapterLayout from "./NonChapterLayout";
/* 
  ^ If your NonChapterLayout is in a different path, 
  adjust the import accordingly: 
  e.g. "../_components/NonChapterLayout" 
*/

// 1) STAR RATING COMPONENT
function StarRating({
  max = 5,
  value,
  onChange,
}: {
  max?: number;
  value: number;
  onChange: (val: number) => void;
}) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          onClick={() => onChange(star)}
          className={
            star <= value ? "text-purple-500 text-3xl" : "text-gray-300 text-3xl"
          }
        >
          ★
        </button>
      ))}
    </div>
  );
}

// 2) CLICKABLE TILE
// We'll highlight the entire shape in purple if selected.
interface FeedbackTileProps {
  id: string;
  label: string;
  icon?: React.ReactNode; // optional icon
  selected: boolean;
  onToggle: (id: string) => void;
}

function FeedbackTile({ id, label, icon, selected, onToggle }: FeedbackTileProps) {
  return (
    <div
      onClick={() => onToggle(id)}
      className={`p-4 border rounded cursor-pointer transition-colors
        ${selected ? "bg-purple-50 border-purple-500" : "bg-white border-gray-300"}
      `}
    >
      <div className="flex items-center gap-2">
        {icon && <span>{icon}</span>}
        <p className="font-semibold">{label}</p>
      </div>
      {selected && (
        <p className="text-xs text-purple-600 mt-2">Selected</p>
      )}
    </div>
  );
}

// 3) MAIN FINISH FEEDBACK PAGE
/****************************************************************************
 * Main finish feedback form 
 ****************************************************************************/
interface FinishFeedbackFormProps {
    courseId: string;
    userId: string;
  }
  
  export default function FinishFeedbackForm({
    courseId,
    userId,
  }: FinishFeedbackFormProps) {
    const router = useRouter();

  // ------------------------------
  // RATING + FORM STATE
  // ------------------------------
  const [rating, setRating] = useState(0);

  // Instead of checkboxes, we have an array of clickable tiles
  const feedbackTiles = [
    { id: "easyUse", label: "It was easy to use" },
    { id: "instructions", label: "Instructions were clear" },
    { id: "design", label: "The design looked nice" },
    { id: "readingFormat", label: "Reading format was understandable" },
    { id: "listeningFormat", label: "Listening format was user-friendly" },
    {
      id: "timeLimit",
      label: "The time limit felt right",
      // 4) EXAMPLE ICON ON THE 6TH TILE 
      icon: <span className="text-xl">⏰</span>, 
    },
  ];

  const [selectedTiles, setSelectedTiles] = useState<string[]>([]);

  const [comments, setComments] = useState("");

  // ------------------------------
  // COUNTDOWN LOGIC
  // ------------------------------
  const [countdown, setCountdown] = useState(120);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    if (userInteracted) return;
    if (countdown <= 0) {
      handleSkip();
      return;
    }
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown, userInteracted]);

  // Mark that the user typed/clicked, so we stop auto-redirect
  function handleUserInteraction() {
    setUserInteracted(true);
  }

  // Toggling a tile
  function toggleTile(id: string) {
    handleUserInteraction();
    if (selectedTiles.includes(id)) {
      setSelectedTiles(selectedTiles.filter((x) => x !== id));
    } else {
      setSelectedTiles([...selectedTiles, id]);
    }
  }

  // ------------------------------
  // NAVIGATION
  // ------------------------------
  function handleSkip() {
    router.push(`/courses/${courseId}/results`);
  }

  async function handleSubmit() {
    // If you want to store feedback in your DB, do it here:
    try {
      await fetch("/api/feedback/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          courseId,
          rating,
          selectedTiles,
          comments,
        }),
      });
    } catch (error) {
      console.error("Error saving feedback:", error);
    }
    // Go to results either way
    router.push(`/courses/${courseId}/results`);
  }

  return (
    <NonChapterLayout
      title="We’re Preparing Your Final Score..."
      nextLabel="Skip"
      onNext={handleSkip}
    >
      {/* 5) DOUBLING THE WIDTH 
          We'll use max-w-[900px] to get a wide container 
      */}
      <div className="max-w-[900px] mx-auto bg-white rounded-lg shadow-md p-6 mt-4">
        <p className="text-gray-700 mb-4">
          While we finalize your results, could you give us some quick feedback?
          We will automatically show your results in {countdown} second
          {countdown !== 1 ? "s" : ""} if you do nothing.
        </p>

        {/* Row with star rating + big countdown */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="font-semibold mb-2">Overall Experience</p>
            <StarRating
              value={rating}
              onChange={(val) => {
                handleUserInteraction();
                setRating(val);
              }}
            />
          </div>
          <div className="text-center bg-gray-100 p-4 rounded">
            <div className="text-lg font-bold text-gray-600 mb-1">Auto-redirect in</div>
            <div className="text-4xl font-extrabold text-purple-500">
              {countdown}s
            </div>
          </div>
        </div>

        {/* Big clickable tiles */}
        <h3 className="text-xl font-semibold mb-2">
          Which areas did you like the most? (click to select)
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {feedbackTiles.map((tile) => (
            <FeedbackTile
              key={tile.id}
              id={tile.id}
              label={tile.label}
              icon={tile.icon}
              selected={selectedTiles.includes(tile.id)}
              onToggle={toggleTile}
            />
          ))}
        </div>

        {/* Comments */}
        <div className="mb-6">
          <p className="font-semibold mb-2">Any other comments? (optional)</p>
          <textarea
            rows={4}
            className="w-full border p-2 rounded"
            placeholder="Tell us more..."
            value={comments}
            onChange={(e) => {
              handleUserInteraction();
              setComments(e.target.value);
            }}
          />
        </div>

        {/* Bottom row with Submit */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </NonChapterLayout>
  );
}
