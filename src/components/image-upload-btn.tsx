"use client";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "./kibo-ui/dropzone";
export const ImageUploadBtn = () => {
  const [files, setFiles] = useState<File[] | undefined>();
  const handleDrop = (files: File[]) => {
    console.log(files);
    files.forEach((file) => {
      toast.success(`${file.name} uploaded to Gallery!`);
    });
    setFiles(files);
  };

  return (
    <>
      <Dropzone
        accept={{ "image/*": [] }}
        maxFiles={10}
        maxSize={1024 * 1024 * 10}
        minSize={1024}
        onDrop={handleDrop}
        onError={console.error}
        src={files}
      >
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
    </>
  );
};
