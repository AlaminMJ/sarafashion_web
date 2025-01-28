"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode } from "react";

export const FormDialog = ({
  button,
  children,
}: {
  button: ReactNode;
  children: ReactNode;
}) => (
  <Dialog>
    <DialogTrigger>{button}</DialogTrigger>
    <DialogContent>{children}</DialogContent>
  </Dialog>
);
