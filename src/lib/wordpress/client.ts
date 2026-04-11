const WP_BASE_URL =
  import.meta.env.PUBLIC_WP_BASE_URL ||
  "https://wp.comiteabreuelima.coletivo.net.br";

export async function fetchWP<T>(path: string): Promise<T> {
  const res = await fetch(`${WP_BASE_URL}${path}`);

  if (!res.ok) {
    throw new Error(
      `Erro ao buscar WordPress: ${res.status} ${res.statusText} em ${path}`
    );
  }

  return res.json() as Promise<T>;
}