import { cache } from "react";
import type {
  ArticleDetail,
  ArticleListItem,
  Category as ApiCategory,
} from "@/store/api-endpoints";
import type { Article, Category, MediaItem } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

function mapCategory(raw: ApiCategory): Category {
  return { name: raw.name, slug: raw.slug };
}

function mapArticle(raw: ArticleListItem | ArticleDetail): Article {
  const media: MediaItem[] =
    "media" in raw
      ? raw.media.map((item) => ({
          id: item.id,
          type: item.type,
          url: item.url,
          caption: item.caption ?? undefined,
        }))
      : [];

  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    excerpt: raw.excerpt ?? "",
    content: "content" in raw ? raw.content : "",
    featuredImageUrl: raw.featured_image_url ?? "",
    authorName: raw.author_name,
    categorySlug: raw.category_slug ?? "",
    categoryName: raw.category_name ?? undefined,
    publishedAt: raw.published_at ?? "",
    tags: "tags" in raw ? raw.tags : [],
    media,
    status: raw.status,
  };
}

// Rendered from the root layout, which wraps every route — a hard failure here
// would take down the entire site (and the build) if the backend is briefly
// unreachable. Degrade to an empty list instead of throwing.
export const getCategories = cache(async (): Promise<Category[]> => {
  try {
    const res = await fetch(`${API_URL}/categories`);
    if (!res.ok) throw new Error(`Failed to load categories: ${res.status}`);
    const data: ApiCategory[] = await res.json();
    return data.map(mapCategory);
  } catch (err) {
    console.error("getCategories failed:", err);
    return [];
  }
});

export async function getCategory(slug: string): Promise<Category | undefined> {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug);
}

export async function getAllArticlesSorted(): Promise<Article[]> {
  const res = await fetch(`${API_URL}/articles?limit=50`);
  if (!res.ok) throw new Error("Failed to load articles");
  const data: ArticleListItem[] = await res.json();
  return data.map(mapArticle);
}

export async function getArticlesByCategory(slug: string): Promise<Article[]> {
  const res = await fetch(`${API_URL}/articles?category=${encodeURIComponent(slug)}&limit=50`);
  if (!res.ok) throw new Error("Failed to load articles");
  const data: ArticleListItem[] = await res.json();
  return data.map(mapArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const res = await fetch(`${API_URL}/articles/${encodeURIComponent(slug)}`);
  if (res.status === 404) return undefined;
  if (!res.ok) throw new Error("Failed to load article");
  const data: ArticleDetail = await res.json();
  return mapArticle(data);
}

export async function searchArticles(query: string): Promise<Article[]> {
  const res = await fetch(`${API_URL}/articles?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Failed to search articles");
  const data: ArticleListItem[] = await res.json();
  return data.map(mapArticle);
}

export function getPrimaryVideoUrl(article: Article): string | undefined {
  return article.media.find((item) => item.type === "video")?.url;
}
