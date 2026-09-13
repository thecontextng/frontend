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

// youtube-nocookie.com is YouTube's privacy-enhanced embed domain — it avoids
// setting third-party cookies until the viewer actually interacts with the
// player, unlike the default youtube.com/embed domain.
export function getYouTubeEmbedUrl(url: string): string | undefined {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : undefined;
}
