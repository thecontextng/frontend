import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { ArticleReader } from "@/components/article-reader";
import { getArticleBySlug, getArticlesByCategory, getCategory } from "@/lib/api";

export async function generateMetadata({
  params,
}: PageProps<"/article/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.featuredImageUrl],
    },
  };
}

export default async function ArticlePage({ params }: PageProps<"/article/[slug]">) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const [categoryArticles, category] = await Promise.all([
    getArticlesByCategory(article.categorySlug),
    getCategory(article.categorySlug),
  ]);
  const relatedArticles = categoryArticles.filter((a) => a.id !== article.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <ArticleReader article={article} />

        {relatedArticles.length > 0 ? (
          <aside className="mt-4 border-t border-border pt-8 lg:mt-0 lg:border-t-0 lg:border-l lg:border-border lg:pl-8 lg:pt-0">
            <div className="lg:sticky lg:top-24">
              <h2 className="mb-5 text-lg font-bold text-foreground">
                More in {category?.name}
              </h2>
              <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 lg:mx-0 lg:snap-none lg:flex-col lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
                {relatedArticles.map((related) => (
                  <div
                    key={related.id}
                    className="w-[75%] max-w-xs shrink-0 snap-start sm:w-72 lg:w-auto lg:max-w-none lg:shrink lg:border-t lg:border-border lg:pt-6 lg:first:border-t-0 lg:first:pt-0"
                  >
                    <ArticleCard article={related} variant="compact" />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        ) : null}
      </div>
    </div>
  );
}
