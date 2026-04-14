import { fetchWP } from "./client";

export type DocumentItem = {
  title: string;
  description: string;
  fileUrl: string;
  type: string;
  year: string;
  section: string;
};

type WPDocument = {
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  acf?: {
    file_url?: string;
    file_type?: string;
    year?: string;
    section?: string;
  };
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function mapDocument(item: WPDocument): DocumentItem {
  return {
    title: stripHtml(item.title.rendered),
    description: stripHtml(item.excerpt.rendered),
    fileUrl: item.acf?.file_url || "",
    type: item.acf?.file_type || "",
    year: item.acf?.year || "",
    section: item.acf?.section || "geral",
  };
}

export async function getAllDocuments(): Promise<DocumentItem[]> {
  const items = await fetchWP<WPDocument[]>(
    "/wp-json/wp/v2/document?per_page=100"
  );

  return items.map(mapDocument);
}

export async function getDocumentsBySection() {
  const docs = await getAllDocuments();

  return {
    resolucoes: docs.filter((doc) => doc.section === "resolucoes"),
    encontros: docs.filter((doc) => doc.section === "encontros"),
    publicacoes: docs.filter((doc) => doc.section === "publicacoes"),
  };
}