// import dynamic from 'next/dynamic';

// const AddNewInterviewCard = dynamic(() => import('./_components/addNewInterviewCard'), {
//   ssr: false, // Disable server-side rendering for this component
//   loading: () => <p>Loading...</p>, // Loading state component
// });



import { Loader2 } from "lucide-react";
import React from "react";

type Props = {};

const LoadingComponent = (props: Props) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Loader2 className="animate-spin w-10 h-10" />
    </div>
  );
};

export default LoadingComponent;