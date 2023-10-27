import { api } from "../../store/api"

const booksApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => "/books",
            providesTags: ['Books'],
        }),
        getBookById: builder.query({
            query: (id) => `/books/${id}`,
            providesTags: ['Books']
        }),
        invalidatesTags: ['Reservation'],
        })
    });

export const { useGetBooksQuery, useGetBookByIdQuery, useReserveMutation } = booksApi;