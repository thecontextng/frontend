"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useListCategoriesQuery } from "@/store/api-endpoints";

export function SearchTrigger() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { data: categories = [] } = useListCategoriesQuery();

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = inputRef.current?.value.trim() ?? "";
    if (!value) return;
    setOpen(false);
    router.push(`/news?q=${encodeURIComponent(value)}`);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="flex h-6 w-6 items-center justify-center text-accent-foreground/80 transition-colors hover:text-accent-foreground"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth={2}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close search"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-card shadow-xl sm:max-w-md">
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <span className="text-lg font-bold text-foreground">Search</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close search"
                className="flex h-6 w-6 items-center justify-center text-muted transition-colors hover:text-accent"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth={2}>
                  <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="border-b border-border px-6 py-5">
              <div className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 focus-within:border-accent">
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-none stroke-muted" strokeWidth={2}>
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                </svg>
                <input
                  ref={inputRef}
                  type="search"
                  name="q"
                  placeholder="Search thecontext"
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
                />
              </div>
            </form>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              <span className="tag-text text-muted">Browse by section</span>
              <ul className="mt-4 flex flex-col gap-4">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/category/${category.slug}`}
                      onClick={() => setOpen(false)}
                      className="text-sm font-medium text-foreground/80 transition-colors hover:text-accent"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
