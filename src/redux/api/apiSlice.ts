/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),

  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "/allBooks",
    }),
    getSingleBooks: builder.query({
      query: (id) => `/allBooks/${id}`,
    }),
    postNewBooks: builder.mutation({
      query: (data) => ({
        url: "/newBooks",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetSingleBooksQuery,
  usePostNewBooksMutation,
} = api;
