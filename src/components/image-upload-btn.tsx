"use client";
import { toast } from "sonner";
import { useState } from "react";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "./kibo-ui/dropzone";

export const ImageUploadBtn = ({
  onResult,
}: {
  onResult?: (result: {
    preview: string;
    description: string;
    tags: string[];
  }) => void;
}) => {
  const [files, setFiles] = useState<File[] | undefined>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 This now calls your server-side route (/api/analyze) instead of Azure directly
  const analyzeWithAzure = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Azure Vision analysis failed");
    }

    // ✅ Generate preview + parse result
    const preview = URL.createObjectURL(file);
    const description =
      data.description?.captions?.[0]?.text || "No description found.";
    const tags = data.tags?.map((t: any) => t.name) || [];

    return { preview, description, tags };
  };

  const handleDrop = async (droppedFiles: File[]) => {
    setFiles(droppedFiles);
    setLoading(true);

    for (const file of droppedFiles) {
      try {
        const result = await analyzeWithAzure(file);
        toast.success(`${file.name} analyzed successfully!`);
        onResult?.(result);
      } catch (err: any) {
        console.error(err);
        toast.error(`Error analyzing ${file.name}: ${err.message}`);
      }
    }

    setLoading(false);
  };

  return (
    <Dropzone
      accept={{ "image/*": [] }}
      maxFiles={10}
      maxSize={1024 * 1024 * 10}
      minSize={1024}
      onDrop={handleDrop}
      onError={console.error}
      src={files}
      disabled={loading}
    >
      <DropzoneEmptyState />
      <DropzoneContent />
    </Dropzone>
  );
};
