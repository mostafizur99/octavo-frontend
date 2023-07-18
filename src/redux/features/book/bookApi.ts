import { IBookInputs, IReviewInputs } from "../../../types/book";
import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (options: string | undefined) =>
        `/books?${options ? options : ""}`,
      providesTags: ["books"],
    }),
    singleBook: builder.query({
      query: (id: string) => `/books/${id}`,
      providesTags: ["reviews"],
    }),
    createBook: builder.mutation({
      query: ({
        data,
        token,
      }: {
        data: IBookInputs;
        token: string | null;
      }) => ({
        url: `/books`,
        method: "POST",
        headers: {
          authorization: token ? token : "",
        },
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query: ({ id, token }: { id: string; token: string | null }) => ({
        url: `/books/${id}`,
        method: "DELETE",
        headers: {
          authorization: token ? token : "",
        },
      }),
      invalidatesTags: ["books"],
    }),
    reviewBook: builder.mutation({
      query: ({
        id,
        data,
        token,
      }: {
        id: string;
        token: string | null;
        data: IReviewInputs;
      }) => ({
        url: `/books/review/${id}`,
        method: "PATCH",
        headers: {
          authorization: token ? token : "",
        },
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useSingleBookQuery,
  useDeleteBookMutation,
  useReviewBookMutation,
  useCreateBookMutation,
} = bookApi;
