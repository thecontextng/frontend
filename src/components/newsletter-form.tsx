"use client";

import { useState } from "react";
import { useCreateSubscriberMutation } from "@/store/api-endpoints";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [consented, setConsented] = useState(false);
  const [createSubscriber, { isLoading }] = useCreateSubscriberMutation();
  const [status, setStatus] = useState<"idle" | "submitted" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consented) return;

    try {
      await createSubscriber({ createSubscriberInput: { email } }).unwrap();
      setStatus("submitted");
    } catch {
      setStatus("error");
    }
  }

  if (status === "submitted") {
    return (
      <p className="text-base font-semibold text-accent-foreground">
        You&apos;re on the list — we&apos;ll email you when we publish new stories.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-md border border-white/25 bg-white/10 px-4 py-3 text-sm text-accent-foreground placeholder:text-accent-foreground/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        />
        <button
          type="submit"
          disabled={!consented || isLoading}
          className="shrink-0 rounded-md bg-white px-6 py-3 text-sm font-semibold text-accent transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isLoading ? "Subscribing…" : "Subscribe"}
        </button>
      </div>

      <label className="flex items-start gap-2 text-xs text-accent-foreground/80">
        <input
          type="checkbox"
          required
          checked={consented}
          onChange={(e) => setConsented(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0"
        />
        <span>
          I agree to receive email updates from thecontext and have read the{" "}
          <a href="/privacy" className="underline hover:text-accent-foreground">
            Privacy Policy
          </a>
          .
        </span>
      </label>

      {status === "error" ? (
        <p className="text-xs text-red-200">Something went wrong. Please try again.</p>
      ) : null}
    </form>
  );
}
