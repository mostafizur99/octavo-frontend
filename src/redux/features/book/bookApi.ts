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
    // postReview: builder.mutation({
    //   query: ({ id, data }: {id:string}) => ({
    //     url: `/review/${id}`,
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["reviews"],
    // }),
  }),
});

export const { useGetBooksQuery, useSingleBookQuery, useDeleteBookMutation } =
  bookApi;
