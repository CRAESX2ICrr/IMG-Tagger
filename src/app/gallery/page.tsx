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

const GalleryPage = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [images, setImages] = useState<
    { id: number; preview: string; description: string; tags: string[] }[]
  >([]);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (!session) return null;

  // 🔹 Handle Azure results
  const handleAzureResult = (data: any) => {
    setImages((prev) => [...prev, { id: Date.now(), ...data }]);
  };

  return (
    <section className="min-h-screen p-8">
      {images.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <GalleryVertical />
            </EmptyMedia>
            <EmptyTitle>No Images in the Gallery... For Now</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t uploaded any images yet. Get started by uploading
              images to the gallery.
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
            {images.map((img) => (
              <div
                key={img.id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-4 w-full max-w-xs shadow-md text-white"
              >
                <img
                  src={img.preview}
                  alt="Uploaded"
                  className="rounded-lg mb-3 w-full h-48 object-cover"
                />
                <h2 className="font-semibold text-lg mb-2 text-center">
                  {img.description}
                </h2>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {img.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-blue-600 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
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
