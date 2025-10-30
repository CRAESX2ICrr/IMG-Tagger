"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { GalleryVertical } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ImageUploadBtn } from "@/components/image-upload-btn";

interface Folder {
  name: string;
  tags: string[];
  images: {
    id: number;
    preview: string;
    description: string;
    tags: string[];
    firstTag: string;
  }[];
  firstTagCounts: Record<string, number>;
}

const GalleryPage = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [folders, setFolders] = useState<Record<string, Folder>>({});

  // Redirect if not logged in
  useEffect(() => {
    if (!isPending && !session) router.push("/login");
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  if (!session) return null;

  // ✅ Helper: find existing folder that shares at least 3 tags
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

    // Require at least 3 shared tags
    return bestScore >= 3 ? bestFolder : null;
  };

  // ✅ Helper: get tag with the highest firstTag count
  const getMostFrequentFirstTag = (counts: Record<string, number>) => {
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted[0]?.[0] || "Uncategorized";
  };

  // ✅ Handle Azure Vision results
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
          // ✅ Add image to existing folder
          const folder = updated[matchedFolder];

          // Update first-tag counts
          const updatedCounts = { ...folder.firstTagCounts };
          updatedCounts[firstTag] = (updatedCounts[firstTag] || 0) + 1;

          // Update folder-level tags
          const mergedTags = Array.from(
            new Set([...folder.tags, ...imageTags])
          );

          // Determine dominant first tag for folder name
          const newName = getMostFrequentFirstTag(updatedCounts);

          // Add image
          updated[newName] = {
            name: newName,
            tags: mergedTags,
            firstTagCounts: updatedCounts,
            images: [
              ...(updated[newName]?.images || folder.images),
              { id: Date.now(), ...data, tags: imageTags, firstTag },
            ],
          };

          // If name changed, delete old folder key
          if (newName !== matchedFolder) delete updated[matchedFolder];

          toast.success(`Added to folder: ${newName}`);
        } else {
          // ✅ Create a new folder
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

  return (
    <section className="min-h-screen p-8">
      {Object.keys(folders).length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <GalleryVertical />
            </EmptyMedia>
            <EmptyTitle>No Images in the Gallery... For Now</EmptyTitle>
            <EmptyDescription>
              Upload some images to get started — Azure Vision will
              automatically categorize them into folders.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <ImageUploadBtn onResult={handleAzureResult} />
          </EmptyContent>
        </Empty>
      ) : (
        <>
          <div className="mb-8 flex justify-center">
            <ImageUploadBtn onResult={handleAzureResult} />
          </div>

          {/* ✅ Render folders */}
          <div className="space-y-12">
            {Object.entries(folders).map(([folderName, folder]) => (
              <div key={`${folderName}-${folder.images[0]?.id || folderName}`}>
                <h2 className="text-2xl font-semibold mb-4">{folder.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center">
                  {folder.images.map((img) => (
                    <div
                      key={img.id}
                      className="bg-gray-900 border border-gray-800 rounded-xl p-3 w-full max-w-[14rem] shadow-md text-white"
                    >
                      <img
                        src={img.preview}
                        alt={img.description}
                        className="rounded-lg mb-2 w-full h-36 object-cover"
                      />
                      <h3 className="font-semibold text-lg text-center mb-2">
                        {img.description}
                      </h3>
                      <div className="flex flex-wrap justify-center gap-2">
                        {img.tags.slice(0, 10).map((tag, i) => (
                          <span
                            key={`${tag}-${i}`}
                            className="text-xs bg-blue-600 px-2 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default GalleryPage;
