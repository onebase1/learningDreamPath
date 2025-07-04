// "use client";

// import React from "react";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Form, FormField, FormLabel, FormControl, FormMessage, FormItem } from "@/components/ui/form";
// import { useToast } from "@/components/ui/use-toast";



// type Props = { isPro: boolean };
// const formSchema = z.object({
//   type: z.string().min(1, { message: "Type is required" }),
//   part: z.string().min(1, { message: "Part is required" }),
//   topic: z.string().min(1, { message: "Topic is required" }),
// });

// const CreatePracticeTestForm = ({ isPro }: Props) => {
//   const router = useRouter();
//   const { toast } = useToast();
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       type: "",
//       part: "",
//       topic: "",
//     },
//   });

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       const response = await axios.post("/api/practice-test", values);
//       router.push(`/practice-test/${response.data.id}`);
//       toast({
//         title: "Success",
//         description: "Practice test created successfully",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Something went wrong",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="w-full">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4">
//           <FormField
//             control={form.control}
//             name="type"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Type</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter type" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="part"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Part</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter part" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="topic"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Topic</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter topic" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <Button type="submit" className="w-full mt-6" size="lg">
//             Create Practice Test
//           </Button>
//         </form>
//       </Form>
//       {!isPro && <SubscriptionAction />}
//     </div>
//   );
// };

// export default CreatePracticeTestForm;
