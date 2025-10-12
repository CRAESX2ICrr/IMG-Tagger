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
    </section>
  );
};
export default GalleryPage;
