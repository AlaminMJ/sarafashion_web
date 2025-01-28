import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormField, FormItem, FormControl } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

// Zod schema for Merchandiser
const merchandiserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  img: z.string().url("Invalid URL").optional(),
});

// TypeScript types inferred from Zod schema
type MerchandiserFormValues = z.infer<typeof merchandiserSchema>;

const MerchandiserForm: React.FC = () => {
  const { handleSubmit } = useForm<MerchandiserFormValues>({
    resolver: zodResolver(merchandiserSchema),
  });

  const onSubmit = (data: MerchandiserFormValues) => {
    console.log("Form Submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField
        name="name"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="name">Name</Label>
            <FormControl>
              <Input id="name" {...field} placeholder="Enter name" />
            </FormControl>
            {/* {errors.name && <FormMessage>{errors.name.message}</FormMessage>} */}
          </FormItem>
        )}
      />

      <FormField
        name="email"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="email">Email</Label>
            <FormControl>
              <Input id="email" {...field} placeholder="Enter email" />
            </FormControl>
            {/* {errors.email && <FormMessage>{errors.email.message}</FormMessage>} */}
          </FormItem>
        )}
      />

      <FormField
        name="img"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="img">Image URL</Label>
            <FormControl>
              <Input
                id="img"
                {...field}
                placeholder="Enter image URL (optional)"
              />
            </FormControl>
            {/* {errors.img && <FormMessage>{errors.img.message}</FormMessage>} */}
          </FormItem>
        )}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default MerchandiserForm;
