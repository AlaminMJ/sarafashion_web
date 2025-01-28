import { z } from "zod";

export const FileSchema = z.object({
  fileNo: z.string().min(1, "File number is required"),
  piece: z.number().min(1, "Pieces must be at least 1"),
  amount: z.number().min(0, "Amount must be non-negative"),
  invoiceId: z.array(z.string()).optional(),
  backToBackLC: z.array(z.string()).optional(),
  remarks: z.string().optional(),
});
