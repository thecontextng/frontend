import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { TAGS } from "./tags";

// Next.js note: RTK Query hooks only ever run client-side, so reading
// localStorage here is safe even though this file is imported by
// server components too (the query/mutation functions themselves never run on the server).
function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("auth_token");
}

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000",
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRetry,
  tagTypes: Object.values(TAGS),
  endpoints: () => ({}), // Empty — endpoints are injected by the codegen output.
});
