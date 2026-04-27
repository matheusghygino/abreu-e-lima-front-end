import { getLatestNews as getLatestNewsFromWP } from "./wordpress/news";

export async function getLatestNews(limit = 3) {
  return getLatestNewsFromWP(limit);
}