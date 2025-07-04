// app/courses/[courseId]/chapters/[chapterId]/_components/PDFViewer.tsx
import React, { useState, useRef, useEffect } from 'react';
import { X, Pin, PinOff, Maximize2, Minimize2 } from 'lucide-react';
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

export type PDFDisplayMode = "modal" | "docked";

interface PDFViewerProps {
  pdfUrl: string;
  onClose: () => void;
  displayMode: PDFDisplayMode;
  onDockToggle: () => void;
}

const AUTO_RELOAD_TIMEOUT = 5000; // 5 seconds
const MAX_RELOAD_ATTEMPTS = 3;

const PDFViewer: React.FC<PDFViewerProps> = ({
  pdfUrl,
  onClose,
  displayMode,
  onDockToggle,
}) => {
  // Reload logic
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [reloadAttempts, setReloadAttempts] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);
  const [error, setError] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Draggable state for modal (floating) mode only
  const [position, setPosition] = useState({ x: 20, y: 20 });
  
  // Restart reload timer if still loading.
  useEffect(() => {
    if (!isIframeLoading) return;
    const timer = setTimeout(() => {
      if (isIframeLoading) {
        if (reloadAttempts < MAX_RELOAD_ATTEMPTS) {
          setReloadAttempts(prev => prev + 1);
          setReloadKey(prev => prev + 1);
        } else {
          setError('Failed to load PDF after multiple attempts. Please try again.');
        }
      }
    }, AUTO_RELOAD_TIMEOUT);
    return () => clearTimeout(timer);
  }, [isIframeLoading, reloadAttempts, reloadKey, pdfUrl]);

  const handleManualReload = () => {
    setError('');
    setReloadAttempts(0);
    setIsIframeLoading(true);
    setReloadKey(prev => prev + 1);
  };

  // Append reload key as a query parameter.
  const getPdfViewerUrl = (url: string, key: number) => {
    const separator = url.includes('?') ? '&' : '?';
    const urlWithKey = `${url}${separator}reloadKey=${key}`;
    if (url.startsWith('http')) {
      return `https://docs.google.com/viewer?embedded=true&url=${encodeURIComponent(urlWithKey)}`;
    }
    return urlWithKey;
  };

  // The base viewer content (applies the same content in either mode)
  const viewerContent = (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "bg-white rounded-lg shadow-xl flex flex-col",
        displayMode === "docked"
          ? "w-full h-full" // docked: fill container provided by ChapterContent
          : "w-[800px] h-[80vh] max-h-[calc(100vh-40px)]" // modal: fixed size that fits within viewport
      )}
    >
      {/* Toolbar */}
      <div className="drag-handle bg-blue-500 p-2 flex items-center justify-between cursor-move">
        <div className="flex items-center space-x-2">
          {/* Dock toggle: clicking toggles between docked and modal */}
          <button
            onClick={onDockToggle}
            className="p-1 hover:bg-blue-600 rounded text-white"
          >
            {displayMode === "docked" ? <PinOff size={20} /> : <Pin size={20} />}
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              // Fullscreen toggle: if not in fullscreen, request fullscreen, else exit.
              if (containerRef.current) {
                if (!document.fullscreenElement) {
                  containerRef.current.requestFullscreen();
                } else {
                  document.exitFullscreen();
                }
              }
            }}
            className="p-1 hover:bg-blue-600 rounded text-white"
          >
            {/* Here you could toggle between Maximize2 and Minimize2 depending on fullscreen state */}
            <Maximize2 size={20} />
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-blue-600 rounded text-white"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      {/* PDF Content */}
      <div className="flex-1 bg-gray-100 overflow-hidden relative">
        {isIframeLoading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-50">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={handleManualReload}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Retry Loading PDF
            </button>
          </div>
        )}
        <iframe
          key={reloadKey}
          src={getPdfViewerUrl(pdfUrl, reloadKey)}
          className="w-full h-full"
          style={{ border: 'none' }}
          onLoad={() => setIsIframeLoading(false)}
          sandbox="allow-same-origin allow-scripts allow-forms allow-downloads allow-presentation"
          allow="fullscreen"
        />
      </div>
    </motion.div>
  );

  // In modal (floating) mode, wrap the content with Draggable.
  if (displayMode === "modal") {
    return (      
      <Draggable
        handle=".drag-handle"
        position={position}
        onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
      >
        {viewerContent}
      </Draggable>
    );
  }

  // In docked mode, simply render the viewer content (no dragging)
  return viewerContent;
};

export default PDFViewer;
