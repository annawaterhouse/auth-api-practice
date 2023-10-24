import { api } from "../../store/api"


const booksApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => "/books",
        }),
        getBookById: builder.query({
            query: (id) => `/books/${id}`,
        }),
        })
    });


export const { useGetBooksQuery, useGetBookByIdQuery } = booksApi