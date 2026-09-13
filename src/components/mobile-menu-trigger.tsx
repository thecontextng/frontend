"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CONTACT_LINKS, SUPPORT_LINKS } from "@/lib/site-links";
import { useListCategoriesQuery } from "@/store/api-endpoints";
import { SocialIcons } from "./social-icons";

export function MobileMenuTrigger() {
  const [open, setOpen] = useState(false);
  const { data: categories = [] } = useListCategoriesQuery();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, input, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="flex h-6 w-6 items-center justify-center text-accent-foreground md:hidden"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth={2}>
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
        </svg>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/50"
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="absolute left-0 top-0 flex h-full w-full max-w-xs flex-col bg-card shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <span className="text-lg font-bold text-foreground">Menu</span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-6 w-6 items-center justify-center text-muted transition-colors hover:text-accent"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth={2}>
                  <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <span className="tag-text text-muted">Sections</span>
              <ul className="mt-4 flex flex-col gap-4">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/category/${category.slug}`}
                      onClick={() => setOpen(false)}
                      className="text-base font-semibold text-foreground hover:text-accent"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <span className="tag-text mt-8 block text-muted">More</span>
              <ul className="mt-4 flex flex-col gap-3">
                {[...SUPPORT_LINKS, ...CONTACT_LINKS].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-sm text-muted hover:text-accent"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border px-6 py-5">
              <Link
                href="/#subscribe"
                onClick={() => setOpen(false)}
                className="block rounded-md bg-accent px-5 py-3 text-center text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                Subscribe
              </Link>
              <SocialIcons className="mt-5 justify-center" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
