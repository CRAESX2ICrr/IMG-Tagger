"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";
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
import { FolderGrid } from "@/components/FolderGrid";
import { useGalleryLogic } from "@/hooks/useGalleryLogic";

const GalleryPage = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const { folders, handleAzureResult } = useGalleryLogic();

  useEffect(() => {
    if (!isPending && !session) router.push("/login");
  }, [session, isPending, router]);

  if (isPending)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );

  if (!session) return null;

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
          <FolderGrid folders={folders} />
        </>
      )}
    </section>
  );
};

export default GalleryPage;
