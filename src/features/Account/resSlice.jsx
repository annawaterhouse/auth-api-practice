import { api } from "../../store/api"
import { createSlice } from "@reduxjs/toolkit"

const resApi = api.injectEndpoints({
    endpoints: (builder) => ({
        reserve: builder.mutation({
            query: (id) => ({
                url: `/books/${id}`,
                method: 'PATCH',
                body: { available: true },
            }),
        }),
        getRes: builder.query({
            query: () => '/users/reservations/'
        }),
    })
});


const resSlice = createSlice({
    name: 'reservation',
    initialState: { available: true },
    reducers: {
        setRes: (state) => {
            state.available = !state.available;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            api.endpoints.reserve.matchFulfilled, (state) => {
                state.available = !state.available;
            }
        )
    }
})

export default resSlice.reducer;
export const { setRes } = resSlice.actions;
export const { useReserveMutation, useGetResQuery } = resApi;