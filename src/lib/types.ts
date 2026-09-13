export interface Category {
  name: string;
  slug: string;
}

export interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  caption?: string;
}

export type ArticleStatus = "draft" | "published" | "archived";

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImageUrl: string;
  authorName: string;
  categorySlug: string;
  categoryName?: string;
  publishedAt: string;
  tags: string[];
  media: MediaItem[];
  status?: ArticleStatus;
}
