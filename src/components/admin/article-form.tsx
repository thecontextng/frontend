"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ImageUpload } from "@/components/admin/image-upload";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { Select } from "@/components/admin/select";
import { TagInput } from "@/components/admin/tag-input";
import { ArticleReader } from "@/components/article-reader";
import { slugify } from "@/lib/slugify";
import type { Article, MediaItem as FrontendMediaItem } from "@/lib/types";
import {
  useCreateArticleMutation,
  useGetCurrentUserQuery,
  useListCategoriesQuery,
  useUpdateArticleMutation,
  type ArticleDetail,
  type CreateArticleInput,
} from "@/store/api-endpoints";

const STATUS_OPTIONS = ["draft", "published", "archived"] as const;
type StatusValue = (typeof STATUS_OPTIONS)[number];

const STATUS_SELECT_OPTIONS = STATUS_OPTIONS.map((option) => ({
  value: option,
  label: option[0].toUpperCase() + option.slice(1),
}));
const MEDIA_TYPE_OPTIONS = [
  { value: "image", label: "Image" },
  { value: "video", label: "Video" },
];

const INPUT_CLASS =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40";

export function ArticleForm({ article }: { article?: ArticleDetail }) {
  const router = useRouter();
  const isEdit = Boolean(article);

  const { data: categories } = useListCategoriesQuery();
  const { data: currentUser } = useGetCurrentUserQuery();
  const [createArticle] = useCreateArticleMutation();
  const [updateArticle] = useUpdateArticleMutation();

  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [content, setContent] = useState(article?.content ?? "");
  const [featuredImageUrl, setFeaturedImageUrl] = useState(article?.featured_image_url ?? "");
  const [categoryId, setCategoryId] = useState(article?.category_id ?? "");
  const [publishedAt, setPublishedAt] = useState(
    article?.published_at ? article.published_at.slice(0, 10) : new Date().toISOString().slice(0, 10)
  );
  const [status, setStatus] = useState<StatusValue>(article?.status ?? "draft");
  const [tags, setTags] = useState<string[]>(article?.tags ?? []);
  const [media, setMedia] = useState<FrontendMediaItem[]>(
    article?.media.map(({ id, type, url, caption }) => ({
      id,
      type,
      url,
      caption: caption ?? undefined,
    })) ?? []
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryId && categories && categories.length > 0) {
      setCategoryId(categories[0].id);
    }
  }, [categories, categoryId]);

  const categoryOptions = (categories ?? []).map((category) => ({
    value: category.id,
    label: category.name,
  }));
  const selectedCategory = categories?.find((category) => category.id === categoryId);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  function addMediaRow() {
    setMedia((prev) => [...prev, { id: crypto.randomUUID(), type: "image", url: "" }]);
  }

  function updateMediaRow(id: string, patch: Partial<FrontendMediaItem>) {
    setMedia((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function removeMediaRow(id: string) {
    setMedia((prev) => prev.filter((item) => item.id !== id));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const finalSlug = slug.trim() || slugify(title);
    if (!title.trim() || !finalSlug || !content.trim() || !categoryId) {
      setError("Title, slug, content, and category are required.");
      return;
    }

    const payload: CreateArticleInput = {
      title: title.trim(),
      slug: finalSlug,
      excerpt: excerpt.trim(),
      content,
      category_id: categoryId,
      featured_image_url: featuredImageUrl.trim() || undefined,
      tags,
      status,
      published_at: publishedAt ? new Date(publishedAt).toISOString() : undefined,
      media: media
        .filter((item) => item.url.trim())
        .map(({ type, url, caption }) => ({ type, url, caption: caption || undefined })),
    };

    try {
      if (isEdit && article) {
        await updateArticle({ id: article.id, updateArticleInput: payload }).unwrap();
      } else {
        await createArticle({ createArticleInput: payload }).unwrap();
      }
      router.push("/admin/articles");
    } catch {
      setError("Something went wrong saving this article. Please try again.");
    }
  }

  const previewArticle: Article = {
    id: article?.id ?? "preview",
    title,
    slug: slug || slugify(title) || "untitled",
    excerpt,
    content,
    featuredImageUrl,
    authorName: currentUser?.name ?? "",
    categorySlug: selectedCategory?.slug ?? "",
    categoryName: selectedCategory?.name,
    publishedAt: publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString(),
    tags,
    media: media.filter((item) => item.url.trim()),
    status,
  };

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {error ? (
          <p className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
            {error}
          </p>
        ) : null}

        <Field label="Title">
          <input
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            className={INPUT_CLASS}
            required
          />
        </Field>

        <Field label="Slug">
          <input
            value={slug}
            onChange={(event) => {
              setSlugTouched(true);
              setSlug(event.target.value);
            }}
            className={INPUT_CLASS}
            required
          />
        </Field>

        <Field label="Excerpt">
          <textarea
            value={excerpt}
            onChange={(event) => setExcerpt(event.target.value)}
            rows={2}
            className={INPUT_CLASS}
          />
        </Field>

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-foreground">Content</span>
          <RichTextEditor value={content} onChange={setContent} />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field label="Category">
            <Select value={categoryId} onValueChange={setCategoryId} options={categoryOptions} />
          </Field>

          <Field label="Status">
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as StatusValue)}
              options={STATUS_SELECT_OPTIONS}
            />
          </Field>

          <Field label="Published date">
            <input
              type="date"
              value={publishedAt}
              onChange={(event) => setPublishedAt(event.target.value)}
              className={INPUT_CLASS}
            />
          </Field>

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-foreground">Author</span>
            <p className="rounded-md border border-border bg-card px-3 py-2 text-sm text-muted">
              Publishing as{" "}
              <span className="font-medium text-foreground">{currentUser?.name ?? "…"}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-foreground">Featured image</span>
          <ImageUpload value={featuredImageUrl} onChange={setFeaturedImageUrl} />
          <input
            value={featuredImageUrl}
            onChange={(event) => setFeaturedImageUrl(event.target.value)}
            className={INPUT_CLASS}
            placeholder="…or paste an image URL directly"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-foreground">Tags</span>
          <TagInput value={tags} onChange={setTags} />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Media</span>
            <button
              type="button"
              onClick={addMediaRow}
              className="text-sm font-semibold text-accent hover:underline"
            >
              + Add media
            </button>
          </div>
          <div className="mt-3 flex flex-col gap-3">
            {media.map((item) => (
              <div key={item.id} className="flex flex-col gap-3 rounded-md border border-border p-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="sm:w-32">
                    <Select
                      value={item.type}
                      onValueChange={(value) =>
                        updateMediaRow(item.id, { type: value as FrontendMediaItem["type"] })
                      }
                      options={MEDIA_TYPE_OPTIONS}
                    />
                  </div>
                  <input
                    value={item.url}
                    onChange={(event) => updateMediaRow(item.id, { url: event.target.value })}
                    placeholder={item.type === "image" ? "…or paste an image URL" : "YouTube URL"}
                    className={INPUT_CLASS}
                  />
                  <input
                    value={item.caption ?? ""}
                    onChange={(event) => updateMediaRow(item.id, { caption: event.target.value })}
                    placeholder="Caption (optional)"
                    className={INPUT_CLASS}
                  />
                  <button
                    type="button"
                    onClick={() => removeMediaRow(item.id)}
                    className="shrink-0 text-sm text-muted hover:text-accent"
                  >
                    Remove
                  </button>
                </div>
                {item.type === "image" ? (
                  <ImageUpload
                    value={item.url}
                    onChange={(url) => updateMediaRow(item.id, { url })}
                  />
                ) : null}
              </div>
            ))}
            {media.length === 0 ? <p className="text-sm text-muted">No media attached.</p> : null}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            {isEdit ? "Save changes" : "Create article"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/articles")}
            className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-card"
          >
            Cancel
          </button>
        </div>
      </form>

      <div className="lg:sticky lg:top-6">
        <span className="tag-text text-muted">Live preview</span>
        <div className="mt-3 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-lg border border-border bg-background">
          <div className="px-6 py-8">
            <ArticleReader article={previewArticle} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      {children}
    </label>
  );
}
