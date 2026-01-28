import { news } from "./news.mock";

export function getLatestNews(limit = 3) {
  return [...news]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    )
    .slice(0, limit);
}
