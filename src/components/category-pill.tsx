import Link from "next/link";

export function CategoryPill({ slug, name }: { slug: string; name: string }) {
  if (!name) return null;

  return (
    <Link
      href={`/category/${slug}`}
      className="tag-text inline-flex w-fit shrink-0 items-center self-start rounded-full bg-accent/10 px-2.5 py-1 text-accent transition-colors hover:bg-accent/15"
    >
      {name}
    </Link>
  );
}
