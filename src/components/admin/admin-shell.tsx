"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { NavLink } from "@/components/nav-link";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/articles/new", label: "New Article" },
  { href: "/admin/categories", label: "Categories" },
];

const NAV_CLASS =
  "rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-background hover:text-foreground";
const NAV_ACTIVE_CLASS = "!bg-accent/10 !text-accent";

export function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();

  function handleLogout() {
    window.localStorage.removeItem("auth_token");
    router.push("/admin/login");
  }

  return (
    <div className="flex min-h-screen flex-col sm:flex-row">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-card p-4 sm:flex">
        <Link href="/admin" className="px-3 pb-6 text-lg font-bold text-foreground">
          thecontext <span className="text-accent">Admin</span>
        </Link>
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className={NAV_CLASS}
              activeClassName={NAV_ACTIVE_CLASS}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-1 border-t border-border pt-4">
          <button type="button" onClick={handleLogout} className={`${NAV_CLASS} text-left`}>
            Log out
          </button>
        </div>
      </aside>

      <div className="flex items-center gap-2 overflow-x-auto border-b border-border bg-card px-4 py-3 sm:hidden">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            className={`shrink-0 ${NAV_CLASS}`}
            activeClassName={NAV_ACTIVE_CLASS}
          >
            {item.label}
          </NavLink>
        ))}
        <button type="button" onClick={handleLogout} className={`shrink-0 ${NAV_CLASS}`}>
          Log out
        </button>
      </div>

      <main className="flex-1 overflow-y-auto bg-background p-6 sm:p-10">{children}</main>
    </div>
  );
}
