import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Base Schema for File
const FileBaseSchema = z.object({
  _id: z.string().optional(),
  fileNo: z.string().min(1, "File number is required"),
  piece: z.number().min(1, "Piece must be at least 1"),
  amount: z.number().optional(),
  backToBackLC: z.array(z.string()).optional(),
  remarks: z.string().optional(),
});

// Create Schema
const FileCreateSchema = FileBaseSchema;

// Update Schema
const FileUpdateSchema = FileBaseSchema.partial();

type FileFormProps = {
  initialData?: z.infer<typeof FileBaseSchema>;
  onSubmit: (data: any) => void;
  isUpdate?: boolean;
};

export function FileForm({
  initialData,
  onSubmit,
  isUpdate = false,
}: FileFormProps) {
  const form = useForm<z.infer<typeof FileBaseSchema>>({
    resolver: zodResolver(isUpdate ? FileUpdateSchema : FileCreateSchema),
    defaultValues: initialData || {
      _id: "",
      fileNo: "",
      piece: 1,
      amount: undefined,
      backToBackLC: [],
      remarks: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const handleSubmit = (data: z.infer<typeof FileBaseSchema>) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fileNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="piece"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Piece</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) =>
                    field.onChange(Number.parseInt(e.target.value))
                  }
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value
                        ? Number.parseFloat(e.target.value)
                        : undefined
                    )
                  }
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="remarks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Remarks</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {isUpdate ? "Update" : "Create"} File
        </Button>
      </form>
    </Form>
  );
}
