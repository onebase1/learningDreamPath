// // app/courses/[courseId]/chapters/[chapterId]/_components/TermsAndConditionsWrapper.tsx
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import toast from "react-hot-toast";
// import TermsAndConditions from "../../../_components/TermsAndConditions";

// interface TermsAndConditionsWrapperProps {
//   courseId: string;
//   chapterId: string;
//   courseTitle: string;
// }

// const TermsAndConditionsWrapper: React.FC<TermsAndConditionsWrapperProps> = ({
//   courseId,
//   chapterId,
//   courseTitle
// }) => {
//   const router = useRouter();
//   const [isChecked, setIsChecked] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const handleCheckChange = (checked: boolean) => {
//     console.log("Checkbox changed:", checked); // Debug
//     setIsChecked(checked);
//   };

//   const handleAcceptTerms = async () => {
//     if (!isChecked) {
//       toast.error("Please accept the terms and conditions");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       console.log("Accepting terms..."); // Debug

//       // Update terms acceptance status
//       await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
//         termsAccepted: true
//       });

//       // Force refresh to update server state
//       router.refresh();

//       // Navigate to chapter
//       router.push(`/courses/${courseId}/chapters/${chapterId}?position=1`);
      
//       toast.success("Terms accepted successfully");
//     } catch (error) {
//       console.error("Terms acceptance error:", error);
//       toast.error("Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="h-full flex items-center justify-center p-6">
//       <TermsAndConditions
//         courseTitle={courseTitle}
//         isChecked={isChecked}
//         onCheckChange={handleCheckChange}
//         onAccept={handleAcceptTerms}
//         isLoading={isLoading}
//       />
//     </div>
//   );
// };

// export default TermsAndConditionsWrapper;