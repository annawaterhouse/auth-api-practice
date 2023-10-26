import { api } from "../../store/api"

const resApi = api.injectEndpoints({
    endpoints: (builder) => ({
        reserve: builder.mutation({
            query: (id) => ({
                url: `/books/${id}`,
                method: 'PATCH',
                body: {available: false},
            }),
        }),
        getRes: builder.query({
            query: () => '/reservations/'
        }),
        return: builder.mutation({
            query: (id) => ({
                url: `/reservations/${id}`,
                method: 'DELETE',
            }),
        })
    })
});

export const { useReturnMutation, useReserveMutation, useGetResQuery } = resApi;
// const resSlice = createSlice({
//     name: 'reservation',
//     initialState: { available: true },
//     reducers: {
//         setRes: (state) => {
//             state.available = !state.available;
//         },
//     },
//     extraReducers: (builder) => {
//         builder.addMatcher(
//             api.endpoints.reserve.matchFulfilled, (state) => {
//                 state.available = !state.available;
//             }
//         )
//     }
// })

// export default resSlice.reducer;
// export const { setRes } = resSlice.actions;
