export type WPPost = {
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
      alt_text?: string;
    }>;
    "wp:term"?: Array<
      Array<{
        id: number;
        name: string;
        taxonomy: string;
      }>
    >;
  };
};