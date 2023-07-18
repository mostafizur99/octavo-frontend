import { api } from "../../api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    retrieveUser: builder.query({
      query: ({ token }: { token: string | null }) => ({
        url: `/users/my-profile`,
        headers: {
          authorization: token ? token : "",
        },
      }),
      providesTags: ["reviews"],
    }),
  }),
});

export const { useRetrieveUserQuery } = userApi;
