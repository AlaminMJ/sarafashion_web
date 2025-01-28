"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { api, HttpMethod } from "@/lib/api";

// Assuming you're using shadcn/ui components

// Infer TypeScript types from the schema
const buyerSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
});
type BuyerFormValues = z.infer<typeof buyerSchema>;

interface BuyerFormProps {
  defaultValues?: BuyerFormValues; // Optional default values for updates
}

const BuyerForm: React.FC<BuyerFormProps> = ({ defaultValues }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<BuyerFormValues>({
    resolver: zodResolver(buyerSchema), // Use Zod schema for validation
    defaultValues, // Populate form for updates
  });

  const onSubmit = async (data: BuyerFormValues) => {
    if (defaultValues) {
      // Update existing buyer
      const res = await api({
        method: HttpMethod.PUT,
        url: `/buyers/${data._id}`,
        body: data,
      });
      reset();
      if (res) {
        // Handle success
      } else {
        // Handle error
      }
      return;
    }
    const res = await api({
      method: HttpMethod.POST,
      url: "/buyers",
      body: data,
    });
    reset();
    if (res) {
      // Handle success
    } else {
      // Handle error
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name" className="block text-sm font-medium">
          Name
        </Label>
        <Input
          id="name"
          {...register("name")}
          className="mt-1 block w-full"
          placeholder="Enter buyer's name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <Button type="submit" className="mt-4">
        {defaultValues ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default BuyerForm;
