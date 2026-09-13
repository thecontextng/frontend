import Link from "next/link";
import { getCategories } from "@/lib/api";
import { CONTACT_LINKS, SUPPORT_LINKS } from "@/lib/site-links";
import { SocialIcons } from "./social-icons";

function FooterColumn({ title, links }: { title: string; links: { name: string; href: string }[] }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="tag-text text-accent-foreground/70">{title}</span>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm text-accent-foreground/80 hover:text-accent-foreground"
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}

export async function SiteFooter() {
  const categories = await getCategories();

  return (
    <footer className="bg-accent">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 py-12 sm:grid-cols-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="col-span-2 max-w-xs sm:col-span-4 lg:col-span-1">
          <span className="text-2xl font-extrabold tracking-tight text-accent-foreground">
            <span className="font-normal text-accent-foreground/70">the</span>context
          </span>
          <p className="mt-3 text-sm text-accent-foreground/70">
            Reporting and documentary work on the technology, environment, and people shaping
            what comes next.
          </p>
          <SocialIcons className="mt-5" tone="inverted" />
        </div>

        {categories.length > 0 ? (
          <FooterColumn
            title="Sections"
            links={categories.map((category) => ({
              name: category.name,
              href: `/category/${category.slug}`,
            }))}
          />
        ) : null}
        <FooterColumn title="Support" links={SUPPORT_LINKS} />
        <FooterColumn title="Contact" links={CONTACT_LINKS} />
      </div>
      <div className="border-t border-white/15 px-6 py-5 text-center text-xs text-accent-foreground/60">
        &copy; {new Date().getFullYear()} thecontext. All rights reserved.
      </div>
    </footer>
  );
}
