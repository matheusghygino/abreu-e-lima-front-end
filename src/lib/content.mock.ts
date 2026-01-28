export type Post = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
};

export type Doc = {
  title: string;
  description: string;
  ipfsUrl: string; // ipfs://CID/arquivo.pdf
};

export type Video = {
  title: string;
  description: string;
  ipfsUrl: string; // ipfs://CID/video.mp4
  posterUrl?: string; // opcional
};

export const mockPosts: Post[] = [
  {
    title: "Lorem Ipsum: Análise e conjuntura",
    slug: "lorem-ipsum-analise-e-conjuntura",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    publishedAt: "2026-01-01",
  },
  {
    title: "Nota pública: comunicado",
    slug: "nota-publica-comunicado",
    excerpt: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    publishedAt: "2026-01-08",
  },
  {
    title: "Artigo: formação e estudos",
    slug: "artigo-formacao-e-estudos",
    excerpt: "Ut enim ad minim veniam, quis nostrud exercitation ullamco...",
    publishedAt: "2026-01-15",
  },
];

export const mockDocs: Doc[] = [
  {
    title: "Documento 01 (PDF)",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ipfsUrl: "ipfs://CID_EXEMPLO/documento-01.pdf",
  },
  {
    title: "Documento 02 (PDF)",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ipfsUrl: "ipfs://CID_EXEMPLO/documento-02.pdf",
  },
];

export const mockVideos: Video[] = [
  {
    title: "Vídeo 01 (MP4 em IPFS)",
    description: "Lorem ipsum dolor sit amet — vídeo demonstrativo.",
    ipfsUrl: "ipfs://CID_EXEMPLO/video-01.mp4",
    posterUrl: "/logo.png",
  },
  {
    title: "Vídeo 02 (WebM em IPFS)",
    description: "Sed do eiusmod tempor — vídeo demonstrativo.",
    ipfsUrl: "ipfs://CID_EXEMPLO/video-02.webm",
    posterUrl: "/logo.png",
  },
];
