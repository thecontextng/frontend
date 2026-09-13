import { api } from "./api-base";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginApiResponse, LoginApiArg>({
      query: (queryArg) => ({
        url: `/auth/login`,
        method: "POST",
        body: queryArg.loginInput,
      }),
    }),
    getCurrentUser: build.query<
      GetCurrentUserApiResponse,
      GetCurrentUserApiArg
    >({
      query: () => ({ url: `/auth/me` }),
      providesTags: ["AUTH"],
    }),
    listCategories: build.query<
      ListCategoriesApiResponse,
      ListCategoriesApiArg
    >({
      query: () => ({ url: `/categories` }),
      providesTags: ["CATEGORIES"],
    }),
    createCategory: build.mutation<
      CreateCategoryApiResponse,
      CreateCategoryApiArg
    >({
      query: (queryArg) => ({
        url: `/categories`,
        method: "POST",
        body: queryArg.createCategoryInput,
      }),
      invalidatesTags: ["CATEGORIES"],
    }),
    listUsers: build.query<ListUsersApiResponse, ListUsersApiArg>({
      query: () => ({ url: `/users` }),
      providesTags: ["USERS"],
    }),
    createUser: build.mutation<CreateUserApiResponse, CreateUserApiArg>({
      query: (queryArg) => ({
        url: `/users`,
        method: "POST",
        body: queryArg.createUserInput,
      }),
      invalidatesTags: ["USERS"],
    }),
    getUser: build.query<GetUserApiResponse, GetUserApiArg>({
      query: (queryArg) => ({ url: `/users/${queryArg.id}` }),
      providesTags: ["USERS"],
    }),
    updateUser: build.mutation<UpdateUserApiResponse, UpdateUserApiArg>({
      query: (queryArg) => ({
        url: `/users/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateUserInput,
      }),
      invalidatesTags: ["USERS"],
    }),
    deleteUser: build.mutation<DeleteUserApiResponse, DeleteUserApiArg>({
      query: (queryArg) => ({ url: `/users/${queryArg.id}`, method: "DELETE" }),
      invalidatesTags: ["USERS"],
    }),
    listArticles: build.query<ListArticlesApiResponse, ListArticlesApiArg>({
      query: (queryArg) => ({
        url: `/articles`,
        params: {
          limit: queryArg.limit,
          offset: queryArg.offset,
          category: queryArg.category,
          mine: queryArg.mine,
          status: queryArg.status,
          q: queryArg.q,
        },
      }),
      providesTags: ["ARTICLES"],
    }),
    createArticle: build.mutation<
      CreateArticleApiResponse,
      CreateArticleApiArg
    >({
      query: (queryArg) => ({
        url: `/articles`,
        method: "POST",
        body: queryArg.createArticleInput,
      }),
      invalidatesTags: ["ARTICLES", "ARTICLE_STATS"],
    }),
    getArticleStats: build.query<
      GetArticleStatsApiResponse,
      GetArticleStatsApiArg
    >({
      query: () => ({ url: `/articles/stats` }),
      providesTags: ["ARTICLE_STATS"],
    }),
    getArticleById: build.query<
      GetArticleByIdApiResponse,
      GetArticleByIdApiArg
    >({
      query: (queryArg) => ({ url: `/articles/id/${queryArg.id}` }),
      providesTags: ["ARTICLES"],
    }),
    updateArticle: build.mutation<
      UpdateArticleApiResponse,
      UpdateArticleApiArg
    >({
      query: (queryArg) => ({
        url: `/articles/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateArticleInput,
      }),
      invalidatesTags: ["ARTICLES", "ARTICLE_STATS"],
    }),
    deleteArticle: build.mutation<
      DeleteArticleApiResponse,
      DeleteArticleApiArg
    >({
      query: (queryArg) => ({
        url: `/articles/${queryArg.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ARTICLES", "ARTICLE_STATS"],
    }),
    getArticleBySlug: build.query<
      GetArticleBySlugApiResponse,
      GetArticleBySlugApiArg
    >({
      query: (queryArg) => ({ url: `/articles/${queryArg.slug}` }),
      providesTags: ["ARTICLES"],
    }),
    updateCategory: build.mutation<
      UpdateCategoryApiResponse,
      UpdateCategoryApiArg
    >({
      query: (queryArg) => ({
        url: `/categories/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updateCategoryInput,
      }),
      invalidatesTags: ["CATEGORIES"],
    }),
    deleteCategory: build.mutation<
      DeleteCategoryApiResponse,
      DeleteCategoryApiArg
    >({
      query: (queryArg) => ({
        url: `/categories/${queryArg.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CATEGORIES"],
    }),
    createSubscriber: build.mutation<
      CreateSubscriberApiResponse,
      CreateSubscriberApiArg
    >({
      query: (queryArg) => ({
        url: `/subscribers`,
        method: "POST",
        body: queryArg.createSubscriberInput,
      }),
    }),
    listSubscribers: build.query<
      ListSubscribersApiResponse,
      ListSubscribersApiArg
    >({
      query: () => ({ url: `/subscribers` }),
      providesTags: ["SUBSCRIBERS"],
    }),
    deleteSubscriber: build.mutation<
      DeleteSubscriberApiResponse,
      DeleteSubscriberApiArg
    >({
      query: (queryArg) => ({
        url: `/subscribers/${queryArg.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SUBSCRIBERS"],
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as api };
export type LoginApiResponse = /** status 200 Signed in */ LoginResponse;
export type LoginApiArg = {
  loginInput: LoginInput;
};
export type GetCurrentUserApiResponse =
  /** status 200 The signed-in user */ User;
export type GetCurrentUserApiArg = void;
export type ListCategoriesApiResponse =
  /** status 200 All categories */ Category[];
export type ListCategoriesApiArg = void;
export type CreateCategoryApiResponse =
  /** status 201 Created category */ Category;
export type CreateCategoryApiArg = {
  createCategoryInput: CreateCategoryInput;
};
export type ListUsersApiResponse = /** status 200 All users */ User[];
export type ListUsersApiArg = void;
export type CreateUserApiResponse = /** status 201 Created user */ User;
export type CreateUserApiArg = {
  createUserInput: CreateUserInput;
};
export type GetUserApiResponse = /** status 200 A user */ User;
export type GetUserApiArg = {
  id: string;
};
export type UpdateUserApiResponse = /** status 200 Updated user */ User;
export type UpdateUserApiArg = {
  id: string;
  updateUserInput: UpdateUserInput;
};
export type DeleteUserApiResponse = unknown;
export type DeleteUserApiArg = {
  id: string;
};
export type ListArticlesApiResponse =
  /** status 200 A page of articles */ ArticleListItem[];
export type ListArticlesApiArg = {
  limit?: number;
  offset?: number;
  category?: string;
  mine?: boolean;
  /** One of draft/published/archived, or 'all' (managers only) */
  status?: string;
  /** Free-text search across title, excerpt, and tags */
  q?: string;
};
export type CreateArticleApiResponse =
  /** status 201 Created article */ ArticleDetail;
export type CreateArticleApiArg = {
  createArticleInput: CreateArticleInput;
};
export type GetArticleStatsApiResponse =
  /** status 200 Editorial stats */ ArticleStats;
export type GetArticleStatsApiArg = void;
export type GetArticleByIdApiResponse =
  /** status 200 Article, regardless of status */ ArticleDetail;
export type GetArticleByIdApiArg = {
  id: string;
};
export type UpdateArticleApiResponse =
  /** status 200 Updated article */ ArticleDetail;
export type UpdateArticleApiArg = {
  id: string;
  updateArticleInput: UpdateArticleInput;
};
export type DeleteArticleApiResponse = unknown;
export type DeleteArticleApiArg = {
  id: string;
};
export type GetArticleBySlugApiResponse =
  /** status 200 A published article */ ArticleDetail;
export type GetArticleBySlugApiArg = {
  slug: string;
};
export type UpdateCategoryApiResponse =
  /** status 200 Updated category */ Category;
export type UpdateCategoryApiArg = {
  id: string;
  updateCategoryInput: UpdateCategoryInput;
};
export type DeleteCategoryApiResponse = unknown;
export type DeleteCategoryApiArg = {
  id: string;
};
export type CreateSubscriberApiResponse =
  /** status 201 Subscribed */ SubscribeResponse;
export type CreateSubscriberApiArg = {
  createSubscriberInput: CreateSubscriberInput;
};
export type ListSubscribersApiResponse =
  /** status 200 All newsletter subscribers */ Subscriber[];
export type ListSubscribersApiArg = void;
export type DeleteSubscriberApiResponse = unknown;
export type DeleteSubscriberApiArg = {
  id: string;
};
export type User = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor" | "author";
  created_at: string;
  updated_at: string;
};
export type LoginResponse = {
  token: string;
  user: User;
};
export type Error = {
  error: string;
};
export type LoginInput = {
  email: string;
  password: string;
};
export type Category = {
  id: string;
  name: string;
  slug: string;
};
export type CreateCategoryInput = {
  name: string;
  slug?: string;
};
export type CreateUserInput = {
  email: string;
  password: string;
  name: string;
  role?: "admin" | "editor" | "author";
};
export type UpdateUserInput = {
  name?: string;
  role?: "admin" | "editor" | "author";
};
export type ArticleListItem = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  featured_image_url?: string | null;
  status: "draft" | "published" | "archived";
  author_id: string;
  published_at?: string | null;
  author_name: string;
  category_name?: string | null;
  category_slug?: string | null;
  video_url?: string | null;
};
export type MediaItem = {
  id: string;
  type: "image" | "video";
  url: string;
  caption?: string | null;
  position: number;
};
export type ArticleDetail = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  featured_image_url?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  tags: string[];
  status?: "draft" | "published" | "archived";
  published_at?: string | null;
  author_id?: string;
  category_id?: string | null;
  created_at?: string;
  updated_at?: string;
  author_name: string;
  category_name?: string | null;
  category_slug?: string | null;
  media: MediaItem[];
};
export type MediaInput = {
  type: "image" | "video";
  url: string;
  caption?: string;
};
export type CreateArticleInput = {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  category_id?: string;
  featured_image_url?: string;
  seo_title?: string;
  seo_description?: string;
  tags?: string[];
  status?: "draft" | "published" | "archived";
  published_at?: string;
  author_id?: string;
  media?: MediaInput[];
};
export type ArticleStats = {
  total: number;
  byStatus: {
    status: "draft" | "published" | "archived";
    count: number;
  }[];
  byCategory: {
    name: string;
    slug: string;
    count: number;
  }[];
  byMonth: {
    month: string;
    count: number;
  }[];
  topAuthors: {
    name: string;
    count: number;
  }[];
  mediaMix: {
    type: "image" | "video";
    count: number;
  }[];
};
export type UpdateArticleInput = {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  category_id?: string;
  featured_image_url?: string;
  seo_title?: string;
  seo_description?: string;
  tags?: string[];
  status?: "draft" | "published" | "archived";
  published_at?: string;
  author_id?: string;
  media?: MediaInput[];
};
export type UpdateCategoryInput = {
  name?: string;
  slug?: string;
};
export type SubscribeResponse = {
  status: string;
};
export type CreateSubscriberInput = {
  email: string;
};
export type Subscriber = {
  id: string;
  email: string;
  created_at: string;
};
export const {
  useLoginMutation,
  useGetCurrentUserQuery,
  useListCategoriesQuery,
  useCreateCategoryMutation,
  useListUsersQuery,
  useCreateUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useListArticlesQuery,
  useCreateArticleMutation,
  useGetArticleStatsQuery,
  useGetArticleByIdQuery,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useGetArticleBySlugQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateSubscriberMutation,
  useListSubscribersQuery,
  useDeleteSubscriberMutation,
} = injectedRtkApi;
