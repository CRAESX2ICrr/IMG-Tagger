"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowRightIcon, FileUpIcon } from "lucide-react";
import { ChangeEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
export default function Home() {
  const router = useRouter();
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
    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <ThemeToggle />
      <div className="flex flex-col items-center justify-items-center">
        <h1 className="text-5xl sm:text-2xl mb-3">
          Upload Images to the gallery to get it tagged{" "}
        </h1>
        <div className="text-center">
          <Label className="mb-2">Upload Image</Label>
          <div className="grid grid-cols-2 gap-x-2">
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
            <Button
              className="rounded-2xl cursor-pointer"
              onClick={() => router.push("/gallery")}
            >
              <ArrowRightIcon /> Go to Gallery Page
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
