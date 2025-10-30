"use client";
import React from "react";
import { Folder } from "@/hooks/useGalleryLogic";

interface FolderGridProps {
  folders: Record<string, Folder>;
}

export const FolderGrid: React.FC<FolderGridProps> = ({ folders }) => {
  return (
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
  );
};
