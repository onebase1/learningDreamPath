// app/admin/waitlist/_components/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { WaitlistActions } from "./waitlist-actions";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "email",
    header: "Email" // Changed from function to string
  },
  {
    accessorKey: "inviteCode",
    header: "Invite Code"
  },
  {
    accessorKey: "isInvited",
    header: "Status",
    cell: ({ row }) => (
      <div className={row.original.isInvited ? "text-green-600" : "text-yellow-600"}>
        {row.original.isInvited ? "Invited" : "Waiting"}
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString()
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <WaitlistActions data={row.original} />
  }
];