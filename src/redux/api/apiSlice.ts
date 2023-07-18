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
  }),
});

export const { useGetAllBooksQuery, useGetSingleBooksQuery } = api;
