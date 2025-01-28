"use client";
import React, { useState, useEffect, useCallback } from "react";
import { FileForm } from "./file-form";
import { FileTable, type File } from "./table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

const FileManagement: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [editingFile, setEditingFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadFiles = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get<{ data: File[] }>("/files");
      const fetchedFiles: File[] = response.data.data;
      setFiles(fetchedFiles);
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  const handleSubmit = async (data: File) => {
    try {
      if (editingFile) {
        const response = await api.put(`/files/${data._id}`, data);
        const updatedFile: File = response.data as File;
        setFiles(
          files.map((file) =>
            file.fileNo === updatedFile.fileNo ? updatedFile : file
          )
        );
        setEditingFile(null);
        toast({
          title: "File updated",
          description: `File ${updatedFile.fileNo} has been successfully updated.`,
        });
      } else {
        const res = await api.post<{ data: { file: File } }>("/files", data);
        const newFile: File = res.data.data.file;
        setFiles([newFile, ...files]);
        toast({
          title: "File created",
          description: `File ${newFile.fileNo} has been successfully created.`,
        });
      }
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (file: File) => {
    setEditingFile(file);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await api.delete(`/files/${id}`);
      if (res.status === 200) {
        setFiles(files.filter((file) => file._id !== id));
        toast({
          title: "File deleted",
          description: `File ${id} has been successfully deleted.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the file",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">File Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingFile(null)}>
              Create New File
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingFile ? "Edit File" : "Create New File"}
              </DialogTitle>
              <DialogDescription>
                {editingFile
                  ? "Edit the file details below."
                  : "Enter the details for the new file."}
              </DialogDescription>
            </DialogHeader>
            <FileForm
              initialData={editingFile || undefined}
              onSubmit={handleSubmit}
              isUpdate={!!editingFile}
            />
          </DialogContent>
        </Dialog>
      </div>
      <FileTable data={files} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default FileManagement;
