import type { ConfigFile } from "@rtk-query/codegen-openapi";
import { TAGS } from "./src/store/tags";

const config: ConfigFile = {
  // Local file for now — swap for the backend's own served schema
  // (e.g. http://localhost:4000/openapi.json) once it exposes one.
  schemaFile: "./openapi.json",

  // Path to the handwritten base API
  apiFile: "./src/store/api-base.ts",

  // The named export from apiFile
  apiImport: "api",

  // Where the generated file will be written
  outputFile: "./src/store/api-endpoints.ts",

  // The name of the exported API in the generated file
  exportName: "api",

  // Generate React hooks (useListArticlesQuery, etc.)
  hooks: true,

  endpointOverrides: [
    { pattern: "listArticles", providesTags: [TAGS.ARTICLES] },
    { pattern: "getArticleById", providesTags: [TAGS.ARTICLES] },
    { pattern: "getArticleBySlug", providesTags: [TAGS.ARTICLES] },
    { pattern: "getArticleStats", providesTags: [TAGS.ARTICLE_STATS] },
    { pattern: "createArticle", invalidatesTags: [TAGS.ARTICLES, TAGS.ARTICLE_STATS] },
    { pattern: "updateArticle", invalidatesTags: [TAGS.ARTICLES, TAGS.ARTICLE_STATS] },
    { pattern: "deleteArticle", invalidatesTags: [TAGS.ARTICLES, TAGS.ARTICLE_STATS] },
    { pattern: "listCategories", providesTags: [TAGS.CATEGORIES] },
    { pattern: "createCategory", invalidatesTags: [TAGS.CATEGORIES] },
    { pattern: "updateCategory", invalidatesTags: [TAGS.CATEGORIES] },
    { pattern: "deleteCategory", invalidatesTags: [TAGS.CATEGORIES] },
    { pattern: "listUsers", providesTags: [TAGS.USERS] },
    { pattern: "getUser", providesTags: [TAGS.USERS] },
    { pattern: "createUser", invalidatesTags: [TAGS.USERS] },
    { pattern: "updateUser", invalidatesTags: [TAGS.USERS] },
    { pattern: "deleteUser", invalidatesTags: [TAGS.USERS] },
    { pattern: "getCurrentUser", providesTags: [TAGS.AUTH] },
    { pattern: "listSubscribers", providesTags: [TAGS.SUBSCRIBERS] },
    { pattern: "deleteSubscriber", invalidatesTags: [TAGS.SUBSCRIBERS] },
  ],
};

export default config;
