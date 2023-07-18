import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      //   query: () => "/books",
      query: (options: string | undefined) =>
        `/books?${options ? options : ""}`,
    }),
    singleBook: builder.query({
      query: (id: string) => `/books/${id}`,
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

export const { useGetBooksQuery, useLazySingleBookQuery } = bookApi;
