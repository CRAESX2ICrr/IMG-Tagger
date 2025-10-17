import { GalleryCards } from "@/components/gallery-cards";
import { ImageUploadBtn } from "@/components/image-upload-btn";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { GalleryVertical } from "lucide-react";
const GalleryPage = () => {
  return (
    <section className="">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <GalleryVertical />
          </EmptyMedia>
          <EmptyTitle>No Images in the Gallery... For Now</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t uploaded any images yet. Get started by uploading
            images to the gallery
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <ImageUploadBtn />
        </EmptyContent>
      </Empty>
      <div className="grid grid-cols-2 gap-2 place-items-center ">
        <GalleryCards />

        <GalleryCards />

        <GalleryCards />

        <GalleryCards />

        <GalleryCards />

        <GalleryCards />
      </div>
    </section>
  );
};
export default GalleryPage;
