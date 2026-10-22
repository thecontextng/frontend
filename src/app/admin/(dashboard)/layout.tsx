"use client";

import { useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { useGetCurrentUserQuery } from "@/store/api-endpoints";

const subscribeNoop = () => () => {};
// null on the server, so the first client render matches before reading the token.
const readHasToken = () => Boolean(window.localStorage.getItem("auth_token"));
const serverHasToken = () => null;

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const hasToken = useSyncExternalStore<boolean | null>(subscribeNoop, readHasToken, serverHasToken);

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
