import { fetchWP } from "./client";

export type ActivityItem = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  location: string;
  tags: string[];
  content: string;
};

type WPActivity = {
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
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
    activity_date?: string;
  };
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function mapActivity(item: WPActivity): ActivityItem {
  const tags =
    item._embedded?.["wp:term"]
      ?.flat()
      .filter((term) => term.taxonomy === "post_tag")
      .map((term) => term.name) || [];

  return {
    slug: item.slug,
    title: stripHtml(item.title.rendered),
    excerpt: stripHtml(item.excerpt.rendered),
    image:
      item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      "/images/galeria/fotos/foto1.jpeg",
    date: item.acf?.activity_date || item.date,
    location: item.acf?.location || "",
    tags,
    content: item.content.rendered,
  };
}

export async function getAllActivities(): Promise<ActivityItem[]> {
  const items = await fetchWP<WPActivity[]>(
    "/wp-json/wp/v2/activity?_embed&per_page=100"
  );

  return items.map(mapActivity);
}

export async function getActivityBySlug(
  slug: string
): Promise<ActivityItem | null> {
  const items = await fetchWP<WPActivity[]>(
    `/wp-json/wp/v2/activity?slug=${encodeURIComponent(slug)}&_embed`
  );

  if (!items.length) return null;

  return mapActivity(items[0]);
}