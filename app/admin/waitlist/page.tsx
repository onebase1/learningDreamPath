// app/admin/waitlist/page.tsx

import { columns } from "./_components/columns";
import { db } from "@/lib/db";
import { DataTable } from "./_components/data-table";

export default async function WaitlistAdmin() {
 const waitlist = await db.waitList.findMany({
   orderBy: { createdAt: 'desc' }
 });

 return (
   <div className="p-6">
     <h1 className="text-2xl font-bold mb-4">Waitlist Management</h1>
     <DataTable columns={columns} data={waitlist} />
   </div>
 );
}