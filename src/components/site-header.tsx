import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { DesktopCategoryNav, DesktopCategoryNavFallback } from "./category-nav";
import { MobileMenuTrigger } from "./mobile-menu-trigger";
import { SearchTrigger } from "./search-trigger";
import { SocialIcons } from "./social-icons";
import { ThemeToggle } from "./theme-toggle";

const TODAY = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-accent">
      <div className="hidden border-b border-white/15 sm:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
          <span className="tag-text text-accent-foreground/70">{TODAY}</span>
          <SocialIcons tone="inverted" />
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 sm:py-6">
        <div className="flex items-center gap-4">
          <MobileMenuTrigger />
          <Link href="/">
            <Image
              src="/logo-mark.png"
              alt="thecontext"
              width={80}
              height={56}
              priority
              className="h-11 w-16 object-contain sm:h-14 sm:w-20"
            />
          </Link>
        </div>
        <div className="flex items-center gap-5 sm:gap-6">
          <Suspense fallback={<DesktopCategoryNavFallback />}>
            <DesktopCategoryNav />
          </Suspense>
          <SearchTrigger />
          <ThemeToggle />
          <Link
            href="/#subscribe"
            className="hidden rounded-md bg-background px-5 py-2.5 text-sm font-semibold text-accent transition-opacity hover:opacity-90 sm:inline-block"
          >
            Subscribe
          </Link>
        </div>
      </div>
    </header>
  );
}
