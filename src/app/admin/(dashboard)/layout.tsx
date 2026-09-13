"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { useGetCurrentUserQuery } from "@/store/api-endpoints";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    setHasToken(Boolean(window.localStorage.getItem("auth_token")));
  }, []);

  const { isError, isFetching } = useGetCurrentUserQuery(undefined, { skip: !hasToken });

  useEffect(() => {
    if (hasToken === false) {
      router.replace("/admin/login");
      return;
    }
    if (hasToken && isError) {
      window.localStorage.removeItem("auth_token");
      router.replace("/admin/login");
    }
  }, [hasToken, isError, router]);

  if (!hasToken || isFetching || isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted">Loading…</p>
      </div>
    );
  }

  return <AdminShell>{children}</AdminShell>;
}
