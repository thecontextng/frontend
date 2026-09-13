import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { getArticlesByCategory, getCategory } from "@/lib/api";

export default async function CategoryPage({ params }: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const articles = await getArticlesByCategory(slug);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="border-b border-border pb-6">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-[2.6rem]">
          {category.name}
        </h1>
        <p className="mt-2 text-muted">
          {articles.length} {articles.length === 1 ? "story" : "stories"}
        </p>
      </header>

      {articles.length === 0 ? (
        <p className="mt-10 text-muted">No stories published in this section yet.</p>
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
