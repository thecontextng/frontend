import Image from "next/image";
import { CategoryPill } from "@/components/category-pill";
import { VideoEmbed } from "@/components/video-embed";
import { formatDate } from "@/lib/format-date";
import { getPrimaryVideoUrl } from "@/lib/api";
import type { Article } from "@/lib/types";

export function ArticleReader({ article }: { article: Article }) {
  const heroVideoUrl = getPrimaryVideoUrl(article);
  const extraVideos = article.media.filter(
    (item) => item.type === "video" && item.url !== heroVideoUrl
  );

  return (
    <article className="min-w-0 max-w-3xl">
      <div className="-mx-6 sm:mx-0 sm:overflow-hidden sm:rounded-sm">
        {heroVideoUrl ? (
          <VideoEmbed videoUrl={heroVideoUrl} title={article.title} />
        ) : article.featuredImageUrl ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-foreground/5">
            <Image
              src={article.featuredImageUrl}
              alt={article.title}
              fill
              priority
              sizes="(min-width: 1024px) 720px, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex aspect-[16/9] w-full items-center justify-center bg-foreground/5 text-sm text-muted">
            No featured image yet
          </div>
        )}
      </div>

      <header className="mt-8">
        <CategoryPill slug={article.categorySlug} name={article.categoryName ?? ""} />
        <h1 className="font-display mt-3 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-[2.6rem]">
          {article.title || "Untitled article"}
        </h1>
        {article.excerpt ? <p className="mt-4 text-lg text-muted">{article.excerpt}</p> : null}
        <p className="mt-4 text-sm text-muted">
          By{" "}
          <span className="font-medium text-foreground">
            {article.authorName || "Unknown author"}
          </span>{" "}
          &middot; {formatDate(article.publishedAt)}
        </p>
      </header>

      <div
        className="article-prose mt-10"
        dangerouslySetInnerHTML={{
          __html: article.content || "<p>Start writing to see a preview of your article.</p>",
        }}
      />

      {extraVideos.length > 0 ? (
        <section className="mt-12 border-t border-border pt-10">
          <h2 className="mb-6 text-xl font-bold text-foreground">More footage</h2>
          <div className="flex flex-col gap-8">
            {extraVideos.map((video) => (
              <VideoEmbed
                key={video.id}
                videoUrl={video.url}
                title={video.caption ?? article.title}
              />
            ))}
          </div>
        </section>
      ) : null}

      {article.tags.length > 0 ? (
        <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-6">
          {article.tags.map((tag) => (
            <span key={tag} className="tag-text rounded-full bg-card px-3 py-1.5 text-muted">
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
