import { fetchWP } from "./client";

type WPCategory = {
  id: number;
  slug: string;
  name: string;
};

const cache = new Map<string, number | null>();

export async function getCategoryId(slug: string): Promise<number | null> {
  const cached = cache.get(slug);
  if (cached !== undefined) return cached;

  try {
    const categories = await fetchWP<WPCategory[]>(
      `/wp-json/wp/v2/categories?slug=${encodeURIComponent(slug)}`
    );

    if (!categories.length) {
      console.warn(`[WordPress] Categoria "${slug}" não encontrada`);
      cache.set(slug, null);
      return null;
    }

    cache.set(slug, categories[0].id);
    return categories[0].id;
  } catch (err) {
    console.error(`[WordPress] Erro ao buscar categoria "${slug}":`, err);
    cache.set(slug, null);
    return null;
  }
}
