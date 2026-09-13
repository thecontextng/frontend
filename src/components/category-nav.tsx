import { getCategories } from "@/lib/api";
import { NavLink } from "./nav-link";

const DESKTOP_CLASS =
  "text-sm font-medium text-accent-foreground/80 transition-colors hover:text-accent-foreground";
const DESKTOP_ACTIVE_CLASS = "!text-accent-foreground font-semibold underline underline-offset-4";

export async function DesktopCategoryNav() {
  const categories = await getCategories();

  return (
    <nav className="hidden items-center gap-7 md:flex">
      {categories.map((category) => (
        <NavLink
          key={category.slug}
          href={`/category/${category.slug}`}
          className={DESKTOP_CLASS}
          activeClassName={DESKTOP_ACTIVE_CLASS}
        >
          {category.name}
        </NavLink>
      ))}
    </nav>
  );
}

const SKELETON_WIDTHS = ["w-24", "w-20", "w-28", "w-16", "w-24"];

export function DesktopCategoryNavFallback() {
  return (
    <nav className="hidden items-center gap-7 md:flex" aria-hidden>
      {SKELETON_WIDTHS.map((width, index) => (
        <span
          key={index}
          className={`h-3.5 animate-pulse rounded-full bg-accent-foreground/20 ${width}`}
        />
      ))}
    </nav>
  );
}
