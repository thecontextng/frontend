"use client";

import { useRef, useState } from "react";

export function TagInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (tags: string[]) => void;
}) {
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function addTag(raw: string) {
    const tag = raw.trim();
    if (tag && !value.includes(tag)) {
      onChange([...value, tag]);
    }
  }

  function handleChange(newValue: string) {
    if (newValue.includes(",")) {
      const parts = newValue.split(",");
      for (const part of parts.slice(0, -1)) {
        addTag(part);
      }
      setDraft(parts[parts.length - 1]);
      return;
    }
    setDraft(newValue);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTag(draft);
      setDraft("");
    } else if (event.key === "Backspace" && draft === "" && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  }

  function handleBlur() {
    if (draft.trim()) {
      addTag(draft);
      setDraft("");
    }
  }

  function removeTag(tag: string) {
    onChange(value.filter((existing) => existing !== tag));
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="flex flex-wrap items-center gap-2 rounded-md border border-border bg-background px-3 py-2 focus-within:border-accent"
    >
      {value.map((tag) => (
        <span
          key={tag}
          className="tag-text flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-accent"
        >
          {tag}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              removeTag(tag);
            }}
            aria-label={`Remove ${tag}`}
            className="text-accent/70 hover:text-accent"
          >
            <svg viewBox="0 0 24 24" className="h-3 w-3 fill-none stroke-current" strokeWidth={2.5}>
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        value={draft}
        onChange={(event) => handleChange(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={value.length === 0 ? "Type a tag, then press comma or enter" : ""}
        className="min-w-[140px] flex-1 bg-transparent py-1 text-sm text-foreground placeholder:text-muted focus:outline-none"
      />
    </div>
  );
}
