import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// // lib/utils.ts
// export const getBaseUrl = () => {
//   if (typeof window !== "undefined") {
//     return "";
//   }

//   if (process.env.NEXT_PUBLIC_APP_URL) {
//     return process.env.NEXT_PUBLIC_APP_URL;
//   }

