import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/format-date";
import { getPrimaryVideoUrl } from "@/lib/api";
import type { Article } from "@/lib/types";
import { CategoryPill } from "./category-pill";
import { VideoThumbnail } from "./video-thumbnail";

interface ArticleCardProps {
  article: Article;
  variant?: "feature" | "default" | "compact";
}

export function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const videoUrl = getPrimaryVideoUrl(article);

  if (variant === "compact") {
    return (
      <Link href={`/article/${article.slug}`} className="group flex gap-4">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md bg-card">
          {article.featuredImageUrl ? (
            <Image
              src={article.featuredImageUrl}
              alt=""
              fill
              sizes="112px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : null}
          {videoUrl ? (
            <span className="absolute inset-0 flex items-center justify-center bg-black/20">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90">
                <svg viewBox="0 0 24 24" className="ml-0.5 h-3.5 w-3.5 fill-black">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          ) : null}
        </div>
        <div className="flex flex-col justify-center gap-1.5">
          <span className="tag-text text-accent">{article.categoryName}</span>
          <h3 className="line-clamp-2 text-base font-bold leading-snug text-foreground group-hover:text-accent">
            {article.title}
          </h3>
        </div>
      </Link>
    );
  }

  const isFeature = variant === "feature";

  return (
    <article className="group flex flex-col">
      <Link href={`/article/${article.slug}`} className="block">
        {videoUrl ? (
          <VideoThumbnail
            videoUrl={videoUrl}
            alt={article.title}
            priority={isFeature}
            sizes={isFeature ? "100vw" : "(min-width: 768px) 33vw, 100vw"}
            rounded
          />
        ) : (
          <div
            className={`relative w-full overflow-hidden rounded-lg bg-card transition-shadow duration-300 group-hover:shadow-lg ${
              isFeature ? "aspect-[16/9]" : "aspect-video"
            }`}
          >
            {article.featuredImageUrl ? (
              <Image
                src={article.featuredImageUrl}
                alt={article.title}
                fill
                priority={isFeature}
                sizes={isFeature ? "100vw" : "(min-width: 768px) 33vw, 100vw"}
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-muted">
                No image
              </div>
            )}
          </div>
        )}
      </Link>

      <div className={`flex flex-col gap-2.5 ${isFeature ? "mt-5 max-w-2xl" : "mt-4"}`}>
        <CategoryPill slug={article.categorySlug} name={article.categoryName ?? ""} />
        <Link href={`/article/${article.slug}`}>
          <h2
            className={
              isFeature
                ? "font-display text-4xl font-black leading-[1.05] tracking-[-0.02em] text-foreground group-hover:text-accent sm:text-5xl lg:text-6xl lg:tracking-[-0.035em]"
                : "text-xl font-bold leading-tight tracking-tight text-foreground group-hover:text-accent"
            }
          >
            {article.title}
          </h2>
        </Link>
        {isFeature ? <p className="text-base text-muted">{article.excerpt}</p> : null}
        <p className="text-sm text-muted">
          <span className="font-medium text-foreground">{article.authorName}</span>
          {" · "}
          {formatDate(article.publishedAt)}
        </p>
      </div>
    </article>
  );
}
