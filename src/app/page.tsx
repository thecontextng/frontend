import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { NewsletterForm } from "@/components/newsletter-form";
import {
  getAllArticlesSorted,
  getArticlesByCategory,
  getCategories,
  getPrimaryVideoUrl,
} from "@/lib/api";

export const dynamic = "force-dynamic";

function QuickTile({
  label,
  description,
  href,
  className,
}: {
  label: string;
  description: string;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group flex flex-col justify-between gap-8 p-6 transition-colors hover:bg-card sm:p-8 ${className ?? ""}`}
    >
      <span className="tag-text text-accent">{label}</span>
      <span className="flex items-center justify-between gap-3">
        <span className="text-base font-semibold text-foreground">{description}</span>
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 shrink-0 fill-none stroke-foreground transition-transform group-hover:translate-x-1"
          strokeWidth={2}
        >
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}

function SectionHeader({ title, href }: { title: string; href?: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <h2 className="text-2xl font-extrabold tracking-tight text-foreground">{title}</h2>
      {href ? (
        <Link href={href} className="text-sm font-semibold text-accent hover:underline">
          View all
        </Link>
      ) : null}
    </div>
  );
}

export default async function Home() {
  const [articles, categories] = await Promise.all([getAllArticlesSorted(), getCategories()]);
  const [hero, ...rest] = articles;
  const trending = rest.slice(0, 3);
  const remaining = rest.slice(3);
  const videoArticles = remaining.filter((article) => getPrimaryVideoUrl(article));
  const latest = remaining.filter((article) => !getPrimaryVideoUrl(article)).slice(0, 3);

  const categorySections = await Promise.all(
    categories.map(async (category) => ({
      category,
      articles: (await getArticlesByCategory(category.slug)).slice(0, 3),
    }))
  );

  return (
    <div>
      {hero ? (
        <section className="mx-auto max-w-6xl px-6 py-10">
          <ArticleCard article={hero} variant="feature" />
        </section>
      ) : (
        <section className="mx-auto max-w-6xl px-6 py-16 text-center text-muted">
          No stories published yet — check back soon.
        </section>
      )}

      <section className="border-y border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-4">
          <QuickTile
            label="Watch"
            description="Video reports from the field"
            href="/category/video-reports"
            className="border-r border-b border-border sm:border-b-0"
          />
          <QuickTile
            label="Explore"
            description="Feature-length documentaries"
            href="/category/documentaries"
            className="border-b border-border sm:border-r sm:border-b-0"
          />
          <QuickTile
            label="Read"
            description="Every story, latest first"
            href="/news"
            className="border-r border-border"
          />
          <QuickTile label="Follow" description="New stories in your inbox" href="#subscribe" />
        </div>
      </section>

      {trending.length > 0 ? (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeader title="Trending now" />
          <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {trending.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      ) : null}

      {videoArticles.length > 0 ? (
        <section className="bg-card py-16">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader title="Latest videos" href="/category/video-reports" />
            <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {videoArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {latest.length > 0 ? (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeader title="Latest" href="/news" />
          <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      ) : null}

      <div className="mx-auto max-w-6xl px-6">
        {categorySections.map(({ category, articles: categoryArticles }) => {
          if (categoryArticles.length === 0) return null;

          return (
            <section key={category.slug} className="border-t border-border py-16">
              <SectionHeader title={category.name} href={`/category/${category.slug}`} />
              <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {categoryArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <section id="subscribe" className="mt-16 bg-accent py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-accent-foreground sm:text-3xl">
              Never miss a story
            </h2>
            <p className="mt-2 max-w-md text-accent-foreground/80">
              Reporting, video, and documentaries from thecontext — straight to your inbox.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
