// components/star-rating.tsx
'use client';

import { Star } from "lucide-react";

interface StarRatingProps {
 value: number;
 onChange: (value: number) => void;
}

export function StarRating({ value, onChange }: StarRatingProps) {
 return (
   <div className="flex items-center gap-x-2">
     {[1, 2, 3, 4, 5].map((rating) => (
       <button
         key={rating}
         type="button"
         onClick={() => onChange(rating)}
         className="p-0 border-none bg-transparent"
       >
         <Star
           className={`h-6 w-6 ${
             rating <= value ? 'fill-yellow-400 text-yellow-400' : 'fill-none text-gray-300'
           }`}
         />
       </button>
     ))}
   </div>
 );
}