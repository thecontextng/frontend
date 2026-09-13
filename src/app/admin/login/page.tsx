"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLoginMutation } from "@/store/api-endpoints";

export default function AdminLoginPage() {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Enter an email and password to continue.");
      return;
    }

    try {
      const { token } = await login({
        loginInput: { email: email.trim(), password },
      }).unwrap();
      window.localStorage.setItem("auth_token", token);
      router.push("/admin");
    } catch {
      setError("Invalid email or password.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-8">
        <h1 className="text-xl font-bold text-foreground">Admin sign in</h1>
        <p className="mt-1 text-sm text-muted">Sign in with your newsroom account.</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          {error ? <p className="text-sm text-red-500">{error}</p> : null}

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-foreground">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
              placeholder="admin@example.com"
              autoFocus
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-foreground">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {isLoading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
