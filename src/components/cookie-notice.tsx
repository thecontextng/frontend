"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie_notice_dismissed";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable — skip the notice rather than block the page.
    }
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignore — worst case the notice reappears next visit.
    }
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card px-6 py-4 text-sm text-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted">
          We don&apos;t use tracking or advertising cookies. Some articles embed YouTube videos,
          which may set their own cookies once played. See our{" "}
          <a href="/cookies" className="text-accent hover:underline">
            Cookie Policy
          </a>
          .
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
