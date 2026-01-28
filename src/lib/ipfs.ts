export const DEFAULT_IPFS_GATEWAY =
  import.meta.env.PUBLIC_IPFS_GATEWAY || "https://ipfs.io";

export function ipfsToHttp(url: string, gateway = DEFAULT_IPFS_GATEWAY) {
  // aceita:
  // - ipfs://CID
  // - ipfs://CID/path/file.mp4
  // - /ipfs/CID/path/file.mp4
  // - CID (puro)
  if (!url) return url;

  if (url.startsWith("http://") || url.startsWith("https://")) return url;

  if (url.startsWith("ipfs://")) {
    const path = url.replace("ipfs://", "");
    return `${gateway.replace(/\/$/, "")}/ipfs/${path}`;
  }

  if (url.startsWith("/ipfs/")) {
    return `${gateway.replace(/\/$/, "")}${url}`;
  }

  // CID puro
  return `${gateway.replace(/\/$/, "")}/ipfs/${url}`;
}
