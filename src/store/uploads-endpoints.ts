import { api } from "./api-base";

export interface UploadImageResponse {
  key: string;
  url: string;
}

export const uploadsApi = api.injectEndpoints({
  endpoints: (build) => ({
    uploadImage: build.mutation<UploadImageResponse, FormData>({
      query: (formData) => ({
        url: "/uploads",
        method: "POST",
        body: formData,
      }),
    }),
    deleteUpload: build.mutation<void, { key: string }>({
      query: ({ key }) => ({
        url: "/uploads",
        method: "DELETE",
        body: { key },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useUploadImageMutation, useDeleteUploadMutation } = uploadsApi;
