import { api } from "../../store/api"

const resApi = api.injectEndpoints({
    endpoints: (builder) => ({
        reserve: builder.mutation({
            query: (id) => ({
                url: `/books/${id}`,
                method: 'PATCH',
                body: {available: false},
            }),
            invalidatesTags: [ 'Books', 'Reservation' ]
        }),
        getRes: builder.query({
            query: () => '/reservations/',
            providesTags: [ 'Reservation' ],
        }),
        return: builder.mutation({
            query: (id) => ({
                url: `/reservations/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [ 'Books', 'Reservation' ],
        })
    })
});

export const { useReturnMutation, useReserveMutation, useGetResQuery } = resApi;