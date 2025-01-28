"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/shared/ConfirmModal";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { FormDialog } from "@/components/shared/formModal";
import BuyerForm from "@/components/form/Buyer-form";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Buyer = {
  _id: string;
  name: string;
};

const ActionsCell: React.FC<{ row: any }> = ({ row }) => {
  const data = row.original;
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirm = async () => {
    try {
      const res = await api.delete(`/buyers/${data._id}`);
      // handle deletion logic here, e.g., remove the row from the table
      toast({ description: "Buyer deleted successfully" });
    } catch (error) {
      toast({
        description:
          error instanceof Error ? error.message : "An error occurred",
      });
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <>
      <ConfirmModal
        isOpen={isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="Delete Item"
        description="Are you sure you want to delete this item? This action cannot be undone."
      />
      <FormDialog button={<Button size="sm">Edit</Button>}>
        <BuyerForm defaultValues={data} />
      </FormDialog>
      <Button onClick={() => setIsOpen(true)} className="mx-1" size="sm">
        Delete
      </Button>
    </>
  );
};

export const columns: ColumnDef<Buyer>[] = [
  {
    accessorKey: "name",
    header: "Buyer Name",
  },
  {
    accessorKey: "Actions",
    id: "actions",
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];
