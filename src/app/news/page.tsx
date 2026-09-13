import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { getAllArticlesSorted, searchArticles } from "@/lib/api";

export const metadata: Metadata = {
  title: "News",
};

export default async function NewsPage({ searchParams }: PageProps<"/news">) {
  const params = await searchParams;
  const rawQuery = params.q;
  const query = (Array.isArray(rawQuery) ? rawQuery[0] : rawQuery)?.trim() ?? "";

  const articles = query ? await searchArticles(query) : await getAllArticlesSorted();

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="border-b border-border pb-6">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {query ? `Results for “${query}”` : "All News"}
        </h1>
        <p className="mt-2 text-muted">
          {articles.length} {articles.length === 1 ? "story" : "stories"}
        </p>

        <form action="/news" method="GET" className="mt-6 max-w-md">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/40">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-none stroke-muted" strokeWidth={2}>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search thecontext"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
            />
          </div>
        </form>
      </header>

      {articles.length === 0 ? (
        <p className="mt-10 text-muted">No stories matched your search.</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
