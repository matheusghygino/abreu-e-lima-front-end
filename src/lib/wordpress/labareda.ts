import { fetchWP } from "./client";
import { getCategoryId } from "./categories";

export type LabaredaPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedAt: string;
  tags: string[];
};

type WPPost = {
  id: number;
  slug: string;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  _embedded?: {
    author?: Array<{
      name: string;
    }>;
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
};

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function mapPost(post: WPPost): LabaredaPost {
  const featuredImage =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/images/noticias/pec.jpeg";

  const author =
    post._embedded?.author?.[0]?.name || "Comitê Abreu e Lima";

  const tags =
    post._embedded?.["wp:term"]
      ?.flat()
      .filter((term) => term.taxonomy === "post_tag")
      .map((term) => term.name) || [];

  return {
    slug: post.slug,
    title: stripHtml(post.title.rendered),
    excerpt: stripHtml(post.excerpt.rendered),
    content: post.content.rendered,
    image: featuredImage,
    author,
    publishedAt: post.date,
    tags,
  };
}

export async function getAllArticles(): Promise<LabaredaPost[]> {
  const categoryId = await getCategoryId("labareda");
  if (!categoryId) return [];
  const posts = await fetchWP<WPPost[]>(
    `/wp-json/wp/v2/posts?_embed&per_page=100&categories=${categoryId}`
  );
  return posts.map(mapPost);
}

export async function getArticleBySlug(slug: string): Promise<LabaredaPost | null> {
  const posts = await fetchWP<WPPost[]>(
    `/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`
  );
  if (!posts.length) return null;
  return mapPost(posts[0]);
}
