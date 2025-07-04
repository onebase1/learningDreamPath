// // app/courses/[courseId]/_components/CourseStartClient.tsx
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import toast from "react-hot-toast";
// import TermsAndConditions from "./TermsAndConditions";

// interface CourseStartClientProps {
//   courseId: string;
//   courseTitle: string;
//   firstChapterId: string;
// }

// const CourseStartClient = ({
//   courseId,
//   courseTitle,
//   firstChapterId,
// }: CourseStartClientProps) => {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [termsChecked, setTermsChecked] = useState(false);

//   const onStart = async () => {
//     if (!termsChecked) return;
    
//     try {
//       setIsLoading(true);
      
//       // Initialize new attempt
//       const response = await axios.post(`/api/courses/${courseId}/start-attempt`);
//       const attemptNumber = response.data.attemptNumber;

//       // Store attempt number in localStorage
//       localStorage.setItem(`course_${courseId}_attempt`, 
//         attemptNumber.toString()
//       );

//       // Accept terms
//       await axios.post(`/api/courses/${courseId}/chapters/${firstChapterId}/accept-terms`);

//       // Navigate to first chapter
//       router.push(`/courses/${courseId}/chapters/${firstChapterId}`);
      
//       toast.success("Test started! Good luck!");
//     } catch (error) {
//       toast.error("Failed to start test");
//       console.error("Error starting test:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="h-full flex items-center justify-center">
//       <div className="max-w-4xl w-full">
//         <TermsAndConditions 
//           courseTitle={courseTitle}
//           isChecked={termsChecked}
//           onCheckChange={setTermsChecked}
//           onAccept={onStart}
//           isLoading={isLoading}
//         />
        
//         <div className="flex justify-center mt-6">
//           <button
//             onClick={onStart}
//             disabled={!termsChecked || isLoading}
//             className={`
//               px-6 py-3 rounded-lg text-white font-semibold
//               ${!termsChecked || isLoading 
//                 ? 'bg-gray-300 cursor-not-allowed' 
//                 : 'bg-blue-600 hover:bg-blue-700'
//               }
//             `}
//           >
//             {isLoading ? "Starting..." : "Start Test"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseStartClient;