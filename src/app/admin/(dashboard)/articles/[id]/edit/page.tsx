"use client";

import { useParams } from "next/navigation";
import { ArticleForm } from "@/components/admin/article-form";
import { useGetArticleByIdQuery } from "@/store/api-endpoints";

export default function EditArticlePage() {
  const params = useParams<{ id: string }>();
  const { data: article, isLoading, isError } = useGetArticleByIdQuery({ id: params.id });

  if (isLoading) {
    return <p className="text-sm text-muted">Loading…</p>;
  }

  if (isError || !article) {
    return <p className="text-sm text-muted">Article not found.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Edit article</h1>
      <ArticleForm article={article} />
    </div>
  );
}
