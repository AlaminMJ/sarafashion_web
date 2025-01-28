// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";

// import { DatePicker } from "../ui/DatePicker";

// // Zod schema
// const docBaseSchema = z.object({
//   docNo: z.string().min(1, { message: "Document number is required" }),
//   docDate: z.preprocess((arg) => {
//     return typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg;
//   }, z.date({ required_error: "Document date is required" })),
//   docType: z.enum(["Invoice", "Purchase Order", "Delivery Note"], {
//     errorMap: () => ({ message: "Invalid document type" }),
//   }),
//   docTolerance: z
//     .number({ required_error: "Document tolerance is required" })
//     .min(0, { message: "Tolerance must be greater than or equal to 0" }),
//   files: z.array(z.string()).optional(),
//   remarks: z
//     .string()
//     .max(500, {
//       message: "Remarks cannot exceed 500 characters",
//     })
//     .optional(),
// });

// type DocDetailsFormData = z.infer<typeof docBaseSchema>;

// // Mock data for files
// const mockFiles = [
//   { id: "1", name: "file1.pdf" },
//   { id: "2", name: "file2.docx" },
//   { id: " 3", name: "file3.xlsx" },
// ];

// export function DocDetailsForm() {
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const form = useForm<DocDetailsFormData>({
//     resolver: zodResolver(docBaseSchema),
//     defaultValues: {},
//   });

//   const handleSubmit = async (data: DocDetailsFormData) => {
//     setIsSubmitting(true);
//     try {
//       console.log("Form submitted with data:", data);
//       // You would typically send this data to your backend here
//     } catch (error) {
//       console.error("Form submission error:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="docNo"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Document Number</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter document number" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="docDate"
//           render={({ field }) => (
//             <FormItem className="flex flex-col">
//               <FormLabel>Document Date</FormLabel>
//               <DatePicker
//                 date={field.value}
//                 setDate={(date) => field.onChange(date)}
//               />
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="docType"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Document Type</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a document type" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="Invoice">Invoice</SelectItem>
//                   <SelectItem value="Purchase Order">Purchase Order</SelectItem>
//                   <SelectItem value="Delivery Note">Delivery Note</SelectItem>
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="docTolerance"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Document Tolerance</FormLabel>
//               <FormControl>
//                 <Input
//                   type="number"
//                   placeholder="Enter document tolerance"
//                   {...field}
//                   onChange={(e) => field.onChange(e.target.valueAsNumber)}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="files"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Files</FormLabel>
//               <FormControl>
//                 <Combobox />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="remarks"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Remarks</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Enter remarks (optional)"
//                   className="resize-none"
//                   {...field}
//                 />
//               </FormControl>
//               <FormDescription>Max 500 characters</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? "Submitting..." : "Create"}
//         </Button>
//       </form>
//     </Form>
//   );
// }
