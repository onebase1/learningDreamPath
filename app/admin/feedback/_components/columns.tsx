// app/admin/feedback/_components/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Star } from "lucide-react";

export const columns: ColumnDef<any>[] = [
 {
   accessorKey: "courseId",
   header: "Course",
 },
 {
   accessorKey: "rating",
   header: "Rating",
   cell: ({ row }) => (
     <div className="flex">
       {Array(row.original.rating).fill(0).map((_, i) => (
         <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
       ))}
     </div>
   ),
 },
 {
   accessorKey: "content",
   header: "Feedback",
 },
 {
   accessorKey: "createdAt",
   header: "Date",
   cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
 },
];