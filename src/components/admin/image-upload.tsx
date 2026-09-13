"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useDeleteUploadMutation, useUploadImageMutation } from "@/store/uploads-endpoints";

function extractErrorMessage(err: unknown): string {
  if (err && typeof err === "object" && "data" in err) {
    const data = (err as { data?: unknown }).data;
    if (data && typeof data === "object" && "error" in data) {
      const message = (data as { error?: unknown }).error;
      if (typeof message === "string") return message;
    }
  }
  return "Upload failed. Please try again.";
}

export function ImageUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();
  const [deleteUpload] = useDeleteUploadMutation();
  const [uploadedKey, setUploadedKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setError(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await uploadImage(formData).unwrap();
      setUploadedKey(result.key);
      onChange(result.url);
    } catch (err) {
      setError(extractErrorMessage(err));
    }
  }

  function handleRemove() {
    onChange("");
    if (uploadedKey) {
      deleteUpload({ key: uploadedKey });
      setUploadedKey(null);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {error ? <p className="text-sm text-red-500">{error}</p> : null}

      {value ? (
        <div className="relative h-40 w-full overflow-hidden rounded-md border border-border bg-card sm:w-64">
          {/* unoptimized: the uploaded image's host isn't known at build time to allowlist in next.config.ts */}
          <Image src={value} alt="" fill unoptimized className="object-cover" />
          <button
            type="button"
            onClick={handleRemove}
            aria-label="Remove image"
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth={2}>
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      ) : null}

      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="rounded-md border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-card disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUploading ? "Uploading…" : value ? "Replace image" : "Upload image"}
        </button>
      </div>
    </div>
  );
}
