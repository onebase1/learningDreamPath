// "use client";

// import { Category } from "@prisma/client";
// import { IconType } from "react-icons";
// import { 
//   FcEngineering, 
//   FcFilmReel, 
//   FcMultipleDevices, 
//   FcMusic, 
//   FcOldTimeCamera, 
//   FcSalesPerformance, 
//   FcSportsMode 
// } from "react-icons/fc";
// import { SidebarItem } from "./sidebar-item";

// interface SidebarCategoryListProps {
//   items: Category[];
// }

// const iconMap: Record<string, IconType> = {
//   "Music": FcMusic,
//   "Photography": FcOldTimeCamera,
//   "Fitness": FcSportsMode,
//   "Accounting": FcSalesPerformance,
//   "Computer Science": FcMultipleDevices,
//   "Filming": FcFilmReel,
//   "Engineering": FcEngineering,
// };

// export const SidebarCategoryList = ({
//   items
// }: SidebarCategoryListProps) => {
//   return (
//     <>
//       {items.map((item) => (
//         <SidebarItem
//           key={item.id}
//           icon={iconMap[item.name] || FcMultipleDevices}
//           label={item.name}
//           href={`/search?categoryId=${item.id}`}
//         />
//       ))}
//     </>
//   );
// }