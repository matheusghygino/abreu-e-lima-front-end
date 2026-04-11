import type { WPPost } from "./types";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedAt: string;
  tags: string[];
};

export function mapWPPostToNews(post: WPPost): NewsItem {
  const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
  const author = post._embedded?.author?.[0];
  const termGroups = post._embedded?.["wp:term"] || [];
  const tags = termGroups
    .flat()
    .filter((term) => term.taxonomy === "post_tag")
    .map((term) => term.name);

  return {
    slug: post.slug,
    title: post.title.rendered,
    excerpt: stripHtml(post.excerpt.rendered),
    content: post.content.rendered,
    image: featuredMedia?.source_url || "/images/noticias/placeholder.jpg",
    author: author?.name || "Comitê Abreu e Lima",
    publishedAt: post.date,
    tags,
  };
}