"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FileUpIcon } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <ThemeToggle />
      <div className="flex flex-col items-center justify-items-center">
        <p className="mb-3">Click the button below to upload an image </p>
        <Button
          className="cursor-pointer"
          type="button"
          onClick={() => toast.success("Image Uploaded successfully!")}
        >
          <FileUpIcon />
          Click Me
        </Button>
      </div>
    </div>
  );
}
