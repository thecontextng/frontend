import Image from "next/image";
import { getYouTubeThumbnail } from "@/lib/youtube";

export function VideoThumbnail({
  videoUrl,
  alt,
  sizes,
  priority,
  rounded,
}: {
  videoUrl: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  rounded?: boolean;
}) {
  const thumbnail = getYouTubeThumbnail(videoUrl);
  if (!thumbnail) return null;

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden bg-card ${
        rounded ? "rounded-lg transition-shadow duration-300 group-hover:shadow-lg" : ""
      }`}
    >
      <Image
        src={thumbnail}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "100vw"}
        className="object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/25">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-105">
          <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-black">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>
    </div>
  );
}
