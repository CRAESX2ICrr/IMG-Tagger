"use client";
import { toast } from "sonner";
import { useRef, ChangeEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FileUpIcon } from "lucide-react";
export const ImageUploadBtn = () => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileRef.current?.click();
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.success(`${file.name} uploaded successfully!`);
    }
  };
  return (
    <>
      <Input
        ref={fileRef}
        type="file"
        multiple
        placeholder=""
        className="hidden"
        onChange={handleFileChange}
      />
      <Button
        variant="secondary"
        onClick={handleUploadClick}
        className="rounded-2xl cursor-pointer"
      >
        <FileUpIcon /> Choose Image
      </Button>
    </>
  );
};
