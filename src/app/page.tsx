"use client";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  const router = useRouter();
  return (
    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <ThemeToggle />
      <div className="flex flex-col items-center justify-items-center">
        <h1 className="text-5xl sm:text-2xl mb-3">
          Upload Images to the gallery to get it tagged{" "}
        </h1>
        <div className="">
          <Button
            className="rounded-2xl cursor-pointer"
            onClick={() => router.push("/gallery")}
          >
            <ArrowRightIcon /> Your Gallery
          </Button>
        </div>
      </div>
    </div>
  );
}
