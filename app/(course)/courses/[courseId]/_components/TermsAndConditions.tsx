// // app/courses/[courseId]/_components/TermsAndConditions.tsx
// "use client";

// import React from 'react';

// interface TermsAndConditionsProps {
//   courseTitle: string;
//   isChecked: boolean;
//   onCheckChange: (checked: boolean) => void;
//   onAccept?: () => Promise<void>;
//   isLoading?: boolean;
// }

// const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ 
//   courseTitle,
//   isChecked,
//   onCheckChange,
//   onAccept,
//   isLoading = false
// }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <div className="space-y-6">
//         <h2 className="text-2xl font-bold">{courseTitle} - Before You Begin</h2>
        
//         <div className="space-y-4">
//           <div className="bg-blue-50 p-4 rounded-lg">
//             <h3 className="font-semibold mb-2">Test Guidelines</h3>
//             <ul className="list-disc pl-5 space-y-2">
//               <li>Your answers will be saved as you progress</li>
//               <li>You can modify answers within each section</li>
//               <li>Once you move to the next section, you cannot return</li>
//               <li>Your final score will be available upon completion</li>
//               <li>The timer will start once you begin the test</li>
//             </ul>
//           </div>

//           <div className="bg-gray-50 p-4 rounded-lg">
//             <h3 className="font-semibold mb-2">Terms of Use</h3>
//             <p className="text-gray-700">
//               By proceeding with this test, you agree not to divulge, share, 
//               copy, or distribute any content from this practice test.
//             </p>
//           </div>

//           <div className="mt-6">
//             <label className="flex items-center space-x-3 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={isChecked}
//                 onChange={(e) => onCheckChange(e.target.checked)}
//                 className="h-4 w-4 text-blue-600 rounded border-gray-300 cursor-pointer focus:ring-blue-500"
//               />
//               <span className="text-gray-700">
//                 I understand and agree to the terms and conditions
//               </span>
//             </label>
//           </div>

//           <button
//             onClick={() => onAccept?.()}
//             disabled={!isChecked || isLoading}
//             className={`mt-4 w-full py-2 px-4 rounded-md transition-colors ${
//               !isChecked || isLoading
//                 ? 'bg-gray-300 cursor-not-allowed'
//                 : 'bg-blue-600 hover:bg-blue-700 text-white'
//             }`}
//           >
//             {isLoading ? "Starting..." : "Start Test"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TermsAndConditions;