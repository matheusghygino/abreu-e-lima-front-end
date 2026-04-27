import { useState } from "preact/hooks";
import GalleryModal from "./GalleryModal";

export default function VideoGallery({ videos }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <div class="grid gap-6 md:grid-cols-3">
        {videos.map((video, i) => (
          <button
            key={video.src}
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            class="group overflow-hidden rounded-lg bg-bg shadow-sm text-left"
          >
            <div class="relative">
              <img
                src={video.poster}
                alt={video.title}
                class="h-56 w-full object-cover"
              />
              <div class="absolute inset-0 flex items-center justify-center bg-black/40">
                <span class="text-white text-4xl">▶</span>
              </div>
            </div>

            {/* CONTEXTO */}
            <div class="p-3">
              <h3 class="text-sm font-semibold mb-1">
                {video.title}
              </h3>

              <p class="text-xs text-text-secondary line-clamp-2">
                {video.description}
              </p>

              <div class="mt-2 flex flex-wrap gap-2 text-[11px] text-text-secondary">
                <span>📅 {video.date}</span>
                {video.location && <span>📍 {video.location}</span>}
              </div>
            </div>
          </button>
        ))}
      </div>

      <GalleryModal
        isOpen={open}
        onClose={() => setOpen(false)}
        items={videos}
        index={index}
        onChange={setIndex}
        mediaType="video"
      />
    </>
  );
}
