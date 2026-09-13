export function getYouTubeId(url: string): string | undefined {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1);
    }
    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname === "/watch") {
        return parsed.searchParams.get("v") ?? undefined;
      }
      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.pathname.split("/")[2];
      }
    }
  } catch {
    return undefined;
  }
  return undefined;
}

export function getYouTubeThumbnail(url: string): string | undefined {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : undefined;
}

export function getYouTubeEmbedUrl(url: string): string | undefined {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : undefined;
}
