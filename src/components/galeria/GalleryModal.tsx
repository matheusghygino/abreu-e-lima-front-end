import { useEffect } from "preact/hooks";

type MediaItem = {
  src: string;
  poster?: string;
  title: string;
  description: string;
  date: string;
  location?: string;
  type?: string;
  tags?: string[];
};

interface Props {
  isOpen: boolean;
  items: MediaItem[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
  mediaType: "photo" | "video";
}

export default function GalleryModal({
  isOpen,
  items,
  index,
  onClose,
  onChange,
  mediaType,
}: Props) {
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        onChange((index + 1) % items.length);
      }
      if (e.key === "ArrowLeft") {
        onChange((index - 1 + items.length) % items.length);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, index]);

  if (!isOpen) return null;

  const current = items[index];

  return (
    <div
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4"
      onClick={onClose}
    >
      <div
        class="relative w-full max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* FECHAR */}
        <button
          onClick={onClose}
          class="absolute -top-10 right-0 text-white text-2xl"
          aria-label="Fechar"
        >
          ✕
        </button>

        {/* CONTEÚDO */}
        <div class="grid grid-cols-[auto_1fr_auto] items-center gap-6">
          {/* SETA ESQUERDA */}
          <button
            class="text-white text-5xl select-none"
            onClick={() =>
              onChange((index - 1 + items.length) % items.length)
            }
          >
            ‹
          </button>

          {/* MEDIA */}
          <div>
            {mediaType === "photo" ? (
              <img
                src={current.src}
                alt={current.title}
                class="mx-auto max-h-[75vh] rounded-lg"
              />
            ) : (
              <video
                key={current.src}
                src={current.src}
                poster={current.poster}
                controls
                autoplay
                class="w-full max-h-[75vh] rounded-lg bg-black"
              />
            )}

            {/* CONTEXTO */}
            <div class="mt-4 text-white">
              <h2 class="text-xl font-semibold mb-2">
                {current.title}
              </h2>

              <p class="text-sm text-white/80 mb-4">
                {current.description}
              </p>

              <div class="flex flex-wrap gap-4 text-xs text-white/70">
                <span>📅 {current.date}</span>
                {current.location && <span>📍 {current.location}</span>}
                {current.type && <span>🏷️ {current.type}</span>}
              </div>

              {current.tags && (
                <div class="mt-3 flex flex-wrap gap-2">
                  {current.tags.map((tag) => (
                    <span
                      key={tag}
                      class="rounded bg-white/10 px-2 py-1 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* SETA DIREITA */}
          <button
            class="text-white text-5xl select-none"
            onClick={() => onChange((index + 1) % items.length)}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
