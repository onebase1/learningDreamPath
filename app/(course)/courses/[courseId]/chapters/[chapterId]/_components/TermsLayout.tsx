// // app/courses/[courseId]/chapters/[chapterId]/_components/TermsLayout.tsx
// "use client";

// import React from 'react';
// import TermsAndConditions from "../../../_components/TermsAndConditions";
// import ChapterHeader from "./ChapterHeader";
// import ChapterFooter from "./ChapterFooter";

// interface TermsLayoutProps {
//   courseTitle: string;
//   isChecked: boolean;
//   onCheckChange: (checked: boolean) => void;
//   onAccept: () => Promise<void>;
//   isLoading: boolean;
//   chapterData: any; // Add proper typing based on your chapter structure
// }

// const TermsLayout: React.FC<TermsLayoutProps> = ({
//   courseTitle,
//   isChecked,
//   onCheckChange,
//   onAccept,
//   isLoading,
//   chapterData,
// }) => {
//   return (
//     <div className="flex flex-col h-screen max-w-[1021px] mx-auto">
//       <ChapterHeader
//         chapterTitle={chapterData.title}
//         courseId={chapterData.courseId}
//         chapterId={chapterData.id}
//       />
      
//       <div className="flex-1 overflow-y-auto px-6 py-4">
//         <TermsAndConditions
//           courseTitle={courseTitle}
//           isChecked={isChecked}
//           onCheckChange={onCheckChange}
//         />
//       </div>

//       <ChapterFooter
//         onNextSection={onAccept}
//         isLastChapter={false}
//         isLocked={false}
//         buttonText={isLoading ? "Starting..." : "Start Test"}
//         isDisabled={!isChecked || isLoading}
//         className="flex-shrink-0 mt-auto"
//       />
//     </div>
//   );
// };

// export default TermsLayout;