"use client";

import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { Chapter } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import { FileText, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useConfettiStore } from "@/hooks/use-confetti-store";
import dynamic from "next/dynamic";

// Import the EmailModal component
import EmailModal from "@/components/email-modal";

// Correctly type the Editor component with proper props
interface EditorProps {
  onChange: (content: string) => void;
  initialContent?: string;
  placeholder?: string;
}

// Dynamic import with proper typing
const Editor = dynamic<EditorProps>(
  () => import('@/components/editor').then((mod) => mod.default), 
  { 
    ssr: false,
    loading: () => <div className="h-64 w-full bg-gray-100 animate-pulse rounded-md"></div>
  }
);

interface WritingQuizCardProps {
  chapter: Chapter & {
    questions: any[];
  };
  courseId: string;
  position: number;
  onTogglePdfViewer: (url: string) => void;
  isPdfViewerOpen: boolean;
  onAnswerSelection: (hasAnswer: boolean) => void;
}

const WritingQuizCard: React.FC<WritingQuizCardProps> = ({
  chapter,
  courseId,
  position,
  onTogglePdfViewer,
  isPdfViewerOpen,
  onAnswerSelection
}) => {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isEmailing, setIsEmailing] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();
  const autoSaveIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Find a question to store the writing in (we'll use the first one)
  const question = chapter.questions && chapter.questions.length > 0 
    ? chapter.questions[0] 
    : null;

  // Load saved content if available
  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        if (!question) return;
        
        const response = await axios.get(
          `/api/courses/${courseId}/chapters/${chapter.id}/temporary-answer`
        );
        
        if (response.data.answers && response.data.answers.length > 0) {
          // Find the answer for our question
          const savedAnswer = response.data.answers.find(
            (answer: any) => answer.questionId === question.id
          );
          
          if (savedAnswer) {
            setContent(savedAnswer.answer);
            countWords(savedAnswer.answer);
            onAnswerSelection(true);
            setSavedAt(new Date(savedAnswer.updatedAt));
          }
        }
      } catch (error) {
        console.error("Error loading writing content:", error);
        toast.error("Failed to load your previous work");
      } finally {
        setIsLoading(false);
      }
    };

    if (question) {
      loadContent();
    }
  }, [chapter.id, courseId, question, onAnswerSelection]);

  // Auto-save content periodically
  useEffect(() => {
    // Set up auto-save every 30 seconds
    autoSaveIntervalRef.current = setInterval(() => {
      if (content && content.trim() !== "" && question) {
        saveContent(false);
      }
    }, 30000); // 30 seconds

    return () => {
      if (autoSaveIntervalRef.current) {
        clearInterval(autoSaveIntervalRef.current);
      }
    };
  }, [content, question]);

  // Count words in the content
  const countWords = (text: string) => {
    const wordCount = text.trim() 
      ? text.trim().split(/\s+/).filter(word => word.length > 0).length 
      : 0;
    setWordCount(wordCount);
    return wordCount;
  };

  // Handle content change
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    const words = countWords(newContent);
    onAnswerSelection(words > 0);
  };

  // Save content to the server
  const saveContent = async (showToast = true) => {
    if (!question) return;
    
    try {
      setSaving(true);
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapter.id}/temporary-answer`,
        {
          questionId: question.id,
          answer: content,
        }
      );
      
      setSavedAt(new Date());
      if (showToast) {
        toast.success("Your writing has been saved");
      }
    } catch (error) {
      console.error("Error saving writing:", error);
      if (showToast) {
        toast.error("Failed to save your writing");
      }
    } finally {
      setSaving(false);
    }
  };

  // Handle download
  const handleDownload = () => {
    if (!content || content.trim() === "") {
      toast.error("Nothing to download");
      return;
    }

    // Create a plain text version of the content
    const plainText = content.replace(/<[^>]+>/g, '');
    
    // Create a blob and download
    const blob = new Blob([plainText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `OET_Writing_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Writing downloaded as text file");
  };

  // Handle email modal
  const handleEmailClick = () => {
    if (!content || content.trim() === "") {
      toast.error("Nothing to email");
      return;
    }
    setIsEmailModalOpen(true);
  };

  // Handle email sending
  const handleSendEmail = async (emailAddress: string) => {
    try {
      setIsEmailing(true);
      
      // Save the content first
      await saveContent(false);
      
      // Send the email
      await axios.post('/api/email/send-writing', {
        email: emailAddress,
        content,
        subject: `OET Writing - ${chapter.title || 'Assignment'}`,
      });
      
      toast.success("Your writing has been emailed");
      setIsEmailModalOpen(false);
    } catch (error) {
      console.error("Error emailing writing:", error);
      toast.error("Failed to email your writing");
    } finally {
      setIsEmailing(false);
    }
  };

  // Render word count status with appropriate coloring
  const renderWordCount = () => {
    let colorClass = "text-gray-500"; // Default color
    
    // For OET Writing, aim for 180-200 words
    if (wordCount < 180) {
      colorClass = "text-red-500";
    } else if (wordCount >= 180 && wordCount <= 200) {
      colorClass = "text-green-500";
    } else if (wordCount > 200) {
      colorClass = "text-orange-500";
    }
    
    return (
      <div className={`text-sm font-medium ${colorClass}`}>
        {wordCount} words {wordCount < 180 ? "(aim for 180-200)" : wordCount > 200 ? "(exceeding recommended count)" : "(perfect range)"}
      </div>
    );
  };

  // Return error message if no question is found
  if (!question && !isLoading) {
    return (
      <div className="p-6 bg-red-50 rounded-md">
        <h3 className="text-red-800 font-semibold mb-2">Error: No Writing Question Found</h3>
        <p className="text-red-700">This chapter isn't properly configured for the writing task. Please contact support.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* PDF Link */}
      {chapter.videoUrl && (
        <button 
          onClick={() => onTogglePdfViewer(chapter.videoUrl!)}
          className={cn(
            "flex items-center gap-2 p-3 w-full rounded",
            "bg-blue-50 hover:bg-blue-100 border border-blue-200", 
            isPdfViewerOpen && "bg-blue-100 border-blue-300",
            "transition-colors duration-200"
          )}
        >
          <FileText className="w-5 h-5 text-blue-600" />
          <span className="text-blue-600 font-medium">
            View Case Notes
          </span>
        </button>
      )}

      {/* Main Writing Editor Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Your Answer</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {savedAt && (
              <span>Last saved: {savedAt.toLocaleTimeString()}</span>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => saveContent()}
              disabled={saving || !content}
            >
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>

        {/* Rich Text Editor */}
        <div className="border border-gray-300 rounded-md">
          <Editor 
            onChange={handleContentChange}
            initialContent={content}
            placeholder="Write your answer here..."
          />
        </div>

        {/* Word Count & Controls */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              disabled={!content}
              className="flex items-center gap-1"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleEmailClick}
              disabled={!content}
              className="flex items-center gap-1"
            >
              <Mail className="w-4 h-4" />
              Email
            </Button>
          </div>
          
          {renderWordCount()}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
        <h3 className="font-medium text-yellow-800 mb-2">OET Writing Tips</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-yellow-700">
          <li>Expand relevant case notes into complete sentences</li>
          <li>Use proper letter format with a greeting and closing</li>
          <li>Maintain a professional tone throughout</li>
          <li>Aim for approximately 180-200 words in the body of the letter</li>
          <li>Organize information logically with proper paragraph structure</li>
        </ul>
      </div>

      {/* Email Modal */}
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onSend={handleSendEmail}
        isLoading={isEmailing}
      />
    </div>
  );
};

export default WritingQuizCard;