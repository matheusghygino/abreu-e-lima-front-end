import { useState } from "preact/hooks";
import GalleryModal from "./GalleryModal";

export default function PhotoGallery({ photos }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <div class="grid gap-6 md:grid-cols-4">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            class="group overflow-hidden rounded-lg bg-bg shadow-sm text-left"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              class="h-56 w-full object-cover transition group-hover:scale-105"
            />

            {/* CONTEXTO VISÍVEL */}
            <div class="p-3">
              <h3 class="text-sm font-semibold mb-1">
                {photo.title}
              </h3>

              <p class="text-xs text-text-secondary line-clamp-2">
                {photo.description}
              </p>

              <div class="mt-2 flex flex-wrap gap-2 text-[11px] text-text-secondary">
                <span>📅 {photo.date}</span>
                {photo.location && <span>📍 {photo.location}</span>}
              </div>
            </div>
          </button>
        ))}
      </div>

      <GalleryModal
        isOpen={open}
        onClose={() => setOpen(false)}
        items={photos}
        index={index}
        onChange={setIndex}
        mediaType="photo"
      />
    </>
  );
}
