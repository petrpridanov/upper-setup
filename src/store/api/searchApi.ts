import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../services/constants";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}` }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ searchString, page }) => `&s=${searchString}&p=${page}`,
    }),
  }),
});

export const { useGetMoviesQuery } = searchApi;
