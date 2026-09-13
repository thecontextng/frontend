import { ArticleForm } from "@/components/admin/article-form";

export default function NewArticlePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-extrabold tracking-tight text-foreground">New article</h1>
      <ArticleForm />
    </div>
  );
}
