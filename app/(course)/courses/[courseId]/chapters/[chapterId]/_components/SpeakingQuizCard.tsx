"use client";

import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { Chapter } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import { 
  FileText, Mic, MicOff, StopCircle, PlayCircle, 
  Download, HelpCircle, Youtube 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface SpeakingQuizCardProps {
  chapter: Chapter & {
    questions: any[];
  };
  courseId: string;
  position: number;
  onTogglePdfViewer: (url: string) => void;
  isPdfViewerOpen: boolean;
  onAnswerSelection: (hasAnswer: boolean) => void;
}

const SpeakingQuizCard: React.FC<SpeakingQuizCardProps> = ({
  chapter,
  courseId,
  position,
  onTogglePdfViewer,
  isPdfViewerOpen,
  onAnswerSelection
}) => {
  // State for audio recording
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [recordings, setRecordings] = useState<{ blob: Blob, url: string }[]>([]);
  const [activeRecording, setActiveRecording] = useState<number | null>(null);
  const [recordingComplete, setRecordingComplete] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("instructions");
  
  // Refs for audio recording
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Find the question for this speaking task
  const question = chapter.questions && chapter.questions.length > 0 
    ? chapter.questions[0] 
    : null;

  // Update parent component when recording is complete
  useEffect(() => {
    onAnswerSelection(recordingComplete);
  }, [recordingComplete, onAnswerSelection]);

  // Cleanup audio recordings when component unmounts
  useEffect(() => {
    return () => {
      // Cleanup URLs to prevent memory leaks
      recordings.forEach(recording => {
        URL.revokeObjectURL(recording.url);
      });
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [recordings]);

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        setRecordings(prev => [...prev, { blob: audioBlob, url: audioUrl }]);
        setRecordingComplete(true);
        setRecordingTime(0);
        
        // Stop all tracks on the stream to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prevTime => prevTime + 1);
      }, 1000);
      
    } catch (error) {
      console.error("Error starting recording:", error);
      toast.error("Could not access microphone. Please check your browser permissions.");
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  // Format recording time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Play recording
  const playRecording = (index: number) => {
    if (activeRecording === index) {
      // If same recording is clicked, stop it
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setActiveRecording(null);
    } else {
      // Play the selected recording
      if (audioRef.current) {
        audioRef.current.src = recordings[index].url;
        audioRef.current.play();
        audioRef.current.onended = () => setActiveRecording(null);
      }
      setActiveRecording(index);
    }
  };

  // Download recording
  const downloadRecording = (index: number) => {
    if (index >= 0 && index < recordings.length) {
      const { blob, url } = recordings[index];
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `OET_Speaking_${chapter.title || 'Practice'}_${new Date().toISOString().slice(0, 10)}.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast.success("Recording downloaded successfully");
    }
  };

  // Reset all recordings
  const resetRecordings = () => {
    if (window.confirm("Are you sure you want to delete all recordings?")) {
      // Stop any playing audio
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      // Revoke object URLs to prevent memory leaks
      recordings.forEach(recording => {
        URL.revokeObjectURL(recording.url);
      });
      
      setRecordings([]);
      setActiveRecording(null);
      setRecordingComplete(false);
      toast.success("All recordings cleared");
    }
  };

  return (
    <div className="space-y-6">
      {/* Hidden audio element for playback */}
      <audio ref={audioRef} className="hidden" />
      
      {/* PDF Roleplay Card Button - with null check */}
      {chapter.pdfUrl && (
        <button 
          onClick={() => onTogglePdfViewer(chapter.pdfUrl!)}
          className={cn(
            "flex items-center gap-2 p-3 w-full rounded",
            "bg-blue-50 hover:bg-blue-100 border border-blue-200", 
            isPdfViewerOpen && "bg-blue-100 border-blue-300",
            "transition-colors duration-200"
          )}
        >
          <FileText className="w-5 h-5 text-blue-600" />
          <span className="text-blue-600 font-medium">
            View OET Roleplay Card
          </span>
        </button>
      )}

      {/* Tabs for Instructions, Video and Recording */}
      <Tabs 
        defaultValue="instructions" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
          <TabsTrigger value="video">Sample Video</TabsTrigger>
          <TabsTrigger value="recording">Recording</TabsTrigger>
        </TabsList>
        
        {/* Instructions Tab */}
        <TabsContent value="instructions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>OET Speaking: Nursing Roleplay</CardTitle>
              <CardDescription>
                Learn how to effectively communicate in this healthcare scenario
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Scenario Overview</h3>
                <p>{chapter.description || "In this roleplay, you'll practice your communication skills as a nurse in a healthcare setting."}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Task</h3>
                <p>{question?.question || "Practice your speaking skills in this healthcare roleplay scenario."}</p>
              </div>
              
              <Alert className="bg-amber-50 border-amber-200">
                <HelpCircle className="h-4 w-4 text-amber-600" />
                <AlertTitle className="text-amber-800">Tips for this scenario</AlertTitle>
                <AlertDescription className="text-amber-700">
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>Read the roleplay card carefully to understand both the nurse and patient roles</li>
                    <li>Use professional terminology appropriate for nursing</li>
                    <li>Show empathy and understanding when discussing care options</li>
                    <li>Present information clearly and in a structured way</li>
                    <li>Address all the points in the candidate card's task list</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button 
              onClick={() => setActiveTab("video")}
              className="flex items-center gap-2"
            >
              <Youtube className="w-4 h-4" />
              Watch Sample Video
            </Button>
          </div>
        </TabsContent>
        
        {/* Video Tab */}
        <TabsContent value="video">
          <Card>
            <CardHeader>
              <CardTitle>Sample Nursing Roleplay</CardTitle>
              <CardDescription>
                Watch this sample video to understand effective communication techniques
              </CardDescription>
            </CardHeader>
            <CardContent>
              {chapter.youtubeSearchQuery ? (
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={chapter.youtubeSearchQuery}
                    title="Sample Nursing Roleplay"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="bg-gray-100 p-4 rounded text-center">
                  No sample video available for this roleplay scenario.
                </div>
              )}
              
              <Alert className="bg-blue-50 border-blue-200 mt-4">
                <HelpCircle className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800">Video Analysis</AlertTitle>
                <AlertDescription className="text-blue-700">
                  <p className="mb-2">Notice how the nurse in this sample video:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Addresses each task point from the candidate card</li>
                    <li>Uses appropriate nursing terminology</li>
                    <li>Shows empathy while maintaining professionalism</li>
                    <li>Provides clear information about care options</li>
                    <li>Actively listens and responds to the carer's concerns</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
          
          <div className="flex justify-end mt-4">
            <Button 
              onClick={() => setActiveTab("recording")}
              className="flex items-center gap-2"
            >
              <Mic className="w-4 h-4" />
              Practice Recording
            </Button>
          </div>
        </TabsContent>
        
        {/* Recording Tab */}
        <TabsContent value="recording">
          <Card>
            <CardHeader>
              <CardTitle>Record Your Roleplay Practice</CardTitle>
              <CardDescription>
                Practice your speaking skills by recording yourself. For best results, have someone play the role of the carer while you play the nurse.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Recording controls */}
              <div className="flex items-center justify-center gap-6 py-4">
                {isRecording ? (
                  <>
                    <div className="text-lg font-mono">{formatTime(recordingTime)}</div>
                    <Button 
                      variant="destructive"
                      size="lg"
                      className="flex items-center gap-2 rounded-full w-12 h-12 p-0 justify-center"
                      onClick={stopRecording}
                    >
                      <StopCircle className="w-6 h-6" />
                      <span className="sr-only">Stop Recording</span>
                    </Button>
                    <div className="flex items-center text-red-500 animate-pulse">
                      <MicOff className="w-5 h-5 mr-2" />
                      Recording...
                    </div>
                  </>
                ) : (
                  <Button 
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-2 rounded-full w-12 h-12 p-0 justify-center"
                    onClick={startRecording}
                  >
                    <Mic className="w-6 h-6" />
                    <span className="sr-only">Start Recording</span>
                  </Button>
                )}
              </div>
              
              {/* Recording tips */}
              <Alert className="bg-gray-50 border-gray-200">
                <HelpCircle className="h-4 w-4" />
                <AlertTitle>Recording Tips</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
                    <li>Find a quiet location with minimal background noise</li>
                    <li>Speak clearly and at a moderate pace</li>
                    <li>Practice with a partner for a more realistic experience</li>
                    <li>Reference the roleplay card while practicing</li>
                    <li>Listen to your recordings to identify areas for improvement</li>
                  </ul>
                </AlertDescription>
              </Alert>
              
              {/* Recordings list */}
              {recordings.length > 0 && (
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Your Recordings</h3>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={resetRecordings}
                      className="text-red-500 hover:text-red-700"
                    >
                      Clear All
                    </Button>
                  </div>
                  
                  <div className="space-y-2 max-h-60 overflow-y-auto p-2">
                    {recordings.map((recording, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                      >
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-8 h-8 p-0 rounded-full"
                            onClick={() => playRecording(index)}
                          >
                            {activeRecording === index ? (
                              <StopCircle className="w-5 h-5" />
                            ) : (
                              <PlayCircle className="w-5 h-5" />
                            )}
                          </Button>
                          <span>Recording {index + 1}</span>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0"
                          onClick={() => downloadRecording(index)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SpeakingQuizCard;