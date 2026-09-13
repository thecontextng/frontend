export function StaticPage({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-[2.6rem]">
        {title}
      </h1>
      {description ? <p className="mt-3 text-lg text-muted">{description}</p> : null}
      <div className="article-prose mt-10">{children}</div>
    </div>
  );
}
