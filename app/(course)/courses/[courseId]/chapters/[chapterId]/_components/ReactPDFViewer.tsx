// // ReactPDFViewer.tsx
// import React, { useState } from 'react';
// import './PDFViewer.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Worker, Viewer } from '@react-pdf-viewer/core';
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// const ReactPDFViewerPage: React.FC = () => {
//     const [pdfFile, setPDFFile] = useState<File | null>(null);
//     const [viewPdf, setViewPdf] = useState<string | null>(null);
//     const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//       const selectedFile = event.target.files?.[0] || null;
//       setPDFFile(selectedFile);
//     };
  
//     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//       event.preventDefault();
//       if (pdfFile) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           setViewPdf(e.target?.result as string);
//         };
//         reader.readAsDataURL(pdfFile);
//       }
//     };

//     const newplugin = defaultLayoutPlugin();
  
//     return (
//       <div className="container p-6">
//         <form onSubmit={handleSubmit}>
//           <input 
//             type="file" 
//             className="form-control" 
//             onChange={handleFileChange} 
//             accept="application/pdf"
//           />
//           <button type="submit" className="btn btn-success mt-2">
//             View PDF
//           </button>
//         </form>
  
//         <h2>View PDF</h2>
//         {viewPdf && (
//           <div className="pdf-container">
//             <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
//               <Viewer fileUrl={viewPdf} plugins={[newplugin]} />
//             </Worker>
//           </div>
//         )}
//       </div>
//     );
//   };
  
//   export default ReactPDFViewerPage;