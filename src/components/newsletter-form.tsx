"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <p className="text-base font-semibold text-accent-foreground">
        You&apos;re on the list — check your inbox to confirm.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        placeholder="you@example.com"
        className="w-full rounded-md border border-white/25 bg-white/10 px-4 py-3 text-sm text-accent-foreground placeholder:text-accent-foreground/60 focus:border-white focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 rounded-md bg-white px-6 py-3 text-sm font-semibold text-accent transition-opacity hover:opacity-90"
      >
        Subscribe
      </button>
    </form>
  );
}
