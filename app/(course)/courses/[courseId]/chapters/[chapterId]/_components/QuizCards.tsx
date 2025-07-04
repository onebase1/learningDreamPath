
// PDF VIEWER IF THINGS GO SOUTH :)
// "use client";

// import React, { useState, useRef, useEffect } from 'react';
// import { X, Plus, Minus, Pin, PinOff, Maximize2, Minimize2 } from 'lucide-react';
// import Draggable from 'react-draggable';
// import { FC } from 'react';

// interface PDFViewerProps {
//   pdfUrl: string;
//   onClose: () => void;
//   isPinned?: boolean;
//   onPinChange?: (isPinned: boolean) => void;
// }

// const PDFViewer: FC<PDFViewerProps> = ({
//   pdfUrl,
//   onClose,
//   isPinned: defaultPinned = true,
//   onPinChange,
// }) => {
//   const [isPinned, setIsPinned] = useState(defaultPinned);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [zoom, setZoom] = useState(1);
//   const [position, setPosition] = useState({ x: 20, y: 20 });
//   const [isLargeScreen, setIsLargeScreen] = useState(true);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [hasError, setHasError] = useState(false);
//   const [iframeKey, setIframeKey] = useState<number>(0); // Unique key for iframe
//   const [isIframeLoading, setIsIframeLoading] = useState(true);

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsLargeScreen(window.innerWidth >= 1800);
//       if (window.innerWidth < 1800) setIsPinned(false);
//     };
//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);
//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2));
//   const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
//   const handleFullscreenToggle = () => {
//     if (!isFullscreen && containerRef.current) {
//       if (containerRef.current.requestFullscreen) {
//         containerRef.current.requestFullscreen();
//       } else if ((containerRef.current as any).webkitRequestFullscreen) {
//         (containerRef.current as any).webkitRequestFullscreen();
//       } else if ((containerRef.current as any).msRequestFullscreen) {
//         (containerRef.current as any).msRequestFullscreen();
//       }
//       setIsFullscreen(true);
//     } else if (document.fullscreenElement) {
//       document.exitFullscreen();
//       setIsFullscreen(false);
//     }
//   };

//   const getPdfViewerUrl = (url: string) => {
//     const encodedUrl = encodeURIComponent(url);
//     // const uniqueParam = `t=${new Date().getTime()}`; // Prevent caching
//     // return `https://docs.google.com/viewer?embedded=true&url=${encodedUrl}&${uniqueParam}`;
//     return `https://docs.google.com/viewer?embedded=true&url=${encodedUrl}`;
//   };

//   // Update iframeKey when pdfUrl changes to force remount
//   useEffect(() => {
//     // Only update iframeKey if pdfUrl changes
//     if (pdfUrl) {
//       // setIframeKey(new Date().getTime());
//       setIsIframeLoading(true);
//       setHasError(false);
//     }
//   }, [pdfUrl]);

//   const viewerContent = (
//     <div
//       ref={containerRef}
//       className={`
//         bg-white rounded-lg shadow-xl flex flex-col
//         ${isFullscreen ? 'fixed inset-0 z-50' : ''}
//         ${isLargeScreen && isPinned ? 'h-full' : 'w-[800px] h-[80vh]'}
//         ${!isLargeScreen && !isPinned ? 'fixed' : ''}
//       `}
//       style={{
//         transform: !isPinned ? `translate(${position.x}px, ${position.y}px)` : undefined,
//       }}
//     >
//       {/* Toolbar */}
//       <div className="drag-handle bg-blue-500 p-2 flex items-center justify-between rounded-t-lg">
//         <div className="flex items-center space-x-2">
//           {!isFullscreen && (
//             <button
//               onClick={() => {
//                 setIsPinned(!isPinned);
//                 onPinChange?.(!isPinned);
//               }}
//               className="p-1 hover:bg-blue-600 rounded text-white"
//             >
//               {isPinned ? <PinOff size={20} /> : <Pin size={20} />}
//             </button>
//           )}
//           <div className="flex items-center space-x-2 text-white">
//             <button
//               onClick={handleZoomOut}
//               className="p-1 hover:bg-blue-600 rounded"
//               disabled={zoom <= 0.5}
//             >
//               <Minus size={20} />
//             </button>
//             <span className="min-w-[60px] text-center">
//               {Math.round(zoom * 100)}%
//             </span>
//             <button
//               onClick={handleZoomIn}
//               className="p-1 hover:bg-blue-600 rounded"
//               disabled={zoom >= 2}
//             >
//               <Plus size={20} />
//             </button>
//           </div>
//         </div>
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={handleFullscreenToggle}
//             className="p-1 hover:bg-blue-600 rounded text-white"
//           >
//             {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
//           </button>
//           <button
//             onClick={onClose}
//             className="p-1 hover:bg-blue-600 rounded text-white"
//           >
//             <X size={20} />
//           </button>
//         </div>
//       </div>

//       {/* PDF Content */}
//       <div className="flex-1 bg-gray-100 overflow-hidden relative">
//         {isIframeLoading && (
//           <div className="absolute inset-0 flex items-center justify-center bg-white">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//           </div>
//         )}
//         {hasError ? (
//           <div className="flex items-center justify-center h-full">
//             <p className="text-red-500">Failed to load PDF. Please try again later.</p>
//           </div>
//         ) : (
//           <div
//             style={{
//               transform: `scale(${zoom})`,
//               transformOrigin: 'top left',
//               width: `${100 / zoom}%`,
//               height: `${100 / zoom}%`,
//             }}
//           >
//             <iframe
//               // key={iframeKey}
//               src={getPdfViewerUrl(pdfUrl)}
//               className="w-full h-full"
//               style={{ border: 'none', minHeight: '100vh' }}
//               sandbox="allow-same-origin allow-scripts allow-forms allow-downloads allow-presentation"
//               allow="fullscreen"
//               onLoad={() => setIsIframeLoading(false)}
//               onError={(e) => {
//                 console.error('Iframe error:', e);
//                 setHasError(true);
//                 setIsIframeLoading(false);
//               }}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   if (isLargeScreen && isPinned) {
//     return viewerContent;
//   }

//   return (
//     <Draggable
//       handle=".drag-handle"
//       position={position}
//       onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
//       bounds="parent"
//     >
//       {viewerContent}
//     </Draggable>
//   );
// };

// export default PDFViewer;
