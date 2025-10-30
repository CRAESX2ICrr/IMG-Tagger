"use client";
import { useState } from "react";
import { toast } from "sonner";

export interface Folder {
  name: string;
  tags: string[];
  firstTagCounts: Record<string, number>;
  images: {
    id: number;
    preview: string;
    description: string;
    tags: string[];
    firstTag: string;
  }[];
}

export const useGalleryLogic = () => {
  const [folders, setFolders] = useState<Record<string, Folder>>({});

  // Helper: find folder with ≥3 matching tags
  const findMatchingFolder = (tags: string[]) => {
    let bestFolder: string | null = null;
    let bestScore = 0;
    for (const [folderName, folder] of Object.entries(folders)) {
      const common = tags.filter((t) => folder.tags.includes(t));
      if (common.length > bestScore) {
        bestScore = common.length;
        bestFolder = folderName;
      }
    }
    return bestScore >= 3 ? bestFolder : null;
  };

  // Helper: get most frequent firstTag
  const getMostFrequentFirstTag = (counts: Record<string, number>) => {
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted[0]?.[0] || "Uncategorized";
  };

  // Main handler (Azure Vision result)
  const handleAzureResult = (data: any) => {
    try {
      const rawTags = data?.tags || [];
      const imageTags = (rawTags || [])
        .map((t: any) => (typeof t === "string" ? t : t?.name))
        .map((s: any) => (typeof s === "string" ? s.trim().toLowerCase() : s))
        .filter(Boolean);

      if (imageTags.length === 0) {
        toast.warning("No recognizable tags found — added to Uncategorized.");
        return;
      }

      const firstTag = imageTags[0];
      const matchedFolder = findMatchingFolder(imageTags);

      setFolders((prev) => {
        const updated = { ...prev };

        if (matchedFolder) {
          const folder = updated[matchedFolder];

          // update first-tag counter
          const updatedCounts = { ...folder.firstTagCounts };
          updatedCounts[firstTag] = (updatedCounts[firstTag] || 0) + 1;

          const mergedTags = Array.from(
            new Set([...folder.tags, ...imageTags])
          );

          const newName = getMostFrequentFirstTag(updatedCounts);

          updated[newName] = {
            name: newName,
            tags: mergedTags,
            firstTagCounts: updatedCounts,
            images: [
              ...(updated[newName]?.images || folder.images),
              { id: Date.now(), ...data, tags: imageTags, firstTag },
            ],
          };

          if (newName !== matchedFolder) delete updated[matchedFolder];

          toast.success(`Added to folder: ${newName}`);
        } else {
          const folderName =
            firstTag.charAt(0).toUpperCase() + firstTag.slice(1);
          updated[folderName] = {
            name: folderName,
            tags: imageTags,
            firstTagCounts: { [firstTag]: 1 },
            images: [{ id: Date.now(), ...data, tags: imageTags, firstTag }],
          };
          toast.success(`Created new folder: ${folderName}`);
        }

        return updated;
      });
    } catch (err: any) {
      console.error(err);
      toast.error(`Error processing image: ${err.message}`);
    }
  };

  return { folders, handleAzureResult };
};
