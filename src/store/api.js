import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "",
    baseQuery: fetchBaseQuery({ baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api" }),
    endpoints: () => ({}),
  });
