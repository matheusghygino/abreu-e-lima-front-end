import { fetchWP } from "./client";

export type PhotoItem = {
  src: string;
  alt: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: string;
  tags: string[];
};

export type VideoItem = {
  id: string;
  title: string;
  description: string;
  src: string;
  poster: string;
  date: string;
  location: string;
  type: string;
  tags: string[];
};

type WPPhoto = {
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
    "wp:term"?: Array<
      Array<{
        taxonomy: string;
        name: string;
      }>
    >;
  };
  acf?: {
    location?: string;
    photo_type?: string;
  };
};

type WPVideo = {
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  acf?: {
    video_url?: string;
    poster_url?: string;
    location?: string;
    video_type?: string;
  };
  _embedded?: {
    "wp:term"?: Array<
      Array<{
        taxonomy: string;
        name: string;
      }>
    >;
  };
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function extractTags(embedded?: WPPhoto["_embedded"] | WPVideo["_embedded"]) {
  return (
    embedded?.["wp:term"]
      ?.flat()
      .filter((term) => term.taxonomy === "post_tag")
      .map((term) => term.name) || []
  );
}

export async function getAllPhotos(): Promise<PhotoItem[]> {
  const items = await fetchWP<WPPhoto[]>(
    "/wp-json/wp/v2/photo?_embed&per_page=100"
  );

  return items.map((item) => ({
    src: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
    alt: item._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || stripHtml(item.title.rendered),
    title: stripHtml(item.title.rendered),
    description: stripHtml(item.excerpt.rendered),
    date: item.date,
    location: item.acf?.location || "",
    type: item.acf?.photo_type || "",
    tags: extractTags(item._embedded),
  }));
}

export async function getAllVideos(): Promise<VideoItem[]> {
  const items = await fetchWP<WPVideo[]>(
    "/wp-json/wp/v2/video?_embed&per_page=100"
  );

  return items.map((item) => ({
    id: item.slug,
    title: stripHtml(item.title.rendered),
    description: stripHtml(item.excerpt.rendered),
    src: item.acf?.video_url || "",
    poster: item.acf?.poster_url || "",
    date: item.date,
    location: item.acf?.location || "",
    type: item.acf?.video_type || "",
    tags: extractTags(item._embedded),
  }));
}