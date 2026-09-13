"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { RowActionsMenu } from "@/components/admin/row-actions-menu";
import { formatDate } from "@/lib/format-date";
import {
  useDeleteArticleMutation,
  useListArticlesQuery,
  useUpdateArticleMutation,
  type ArticleListItem,
} from "@/store/api-endpoints";

const STATUS_STYLES: Record<string, string> = {
  published: "bg-accent/10 text-accent",
  draft: "bg-muted/10 text-muted",
  archived: "bg-border text-muted",
};

export default function AdminArticlesPage() {
  const router = useRouter();
  const { data: articles, isLoading } = useListArticlesQuery({ status: "all" });
  const [deleteArticle] = useDeleteArticleMutation();
  const [updateArticle] = useUpdateArticleMutation();

  function handleDelete(article: ArticleListItem) {
    if (!window.confirm(`Delete "${article.title}"? This can't be undone.`)) return;
    deleteArticle({ id: article.id });
  }

  function handleTogglePublish(article: ArticleListItem) {
    updateArticle({
      id: article.id,
      updateArticleInput: { status: article.status === "published" ? "draft" : "published" },
    });
  }

  function handleToggleArchive(article: ArticleListItem) {
    updateArticle({
      id: article.id,
      updateArticleInput: { status: article.status === "archived" ? "draft" : "archived" },
    });
  }

  if (isLoading || !articles) {
    return <p className="text-sm text-muted">Loading…</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Articles</h1>
        <Link
          href="/admin/articles/new"
          className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
        >
          New article
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted">
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Author</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-b border-border last:border-b-0">
                <td className="max-w-xs truncate px-4 py-3 font-medium text-foreground">
                  {article.title}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`tag-text rounded-full px-2.5 py-1 ${STATUS_STYLES[article.status]}`}
                  >
                    {article.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted">{article.category_name ?? "—"}</td>
                <td className="px-4 py-3 text-muted">{article.author_name}</td>
                <td className="px-4 py-3 text-muted">
                  {article.published_at ? formatDate(article.published_at) : "—"}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end">
                    <RowActionsMenu
                      actions={[
                        {
                          label: "Edit",
                          onSelect: () => router.push(`/admin/articles/${article.id}/edit`),
                        },
                        {
                          label: article.status === "published" ? "Unpublish" : "Publish",
                          onSelect: () => handleTogglePublish(article),
                        },
                        {
                          label: article.status === "archived" ? "Restore to draft" : "Archive",
                          onSelect: () => handleToggleArchive(article),
                        },
                        {
                          label: "Delete",
                          variant: "danger",
                          onSelect: () => handleDelete(article),
                        },
                      ]}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {articles.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  No articles yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
