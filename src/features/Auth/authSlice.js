import { createSlice } from "@reduxjs/toolkit"
import { api } from "../../store/api"

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: '/users/register',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: '/users/login',
        method: 'POST',
        body: user,
      }),
    }),
    getUserInfo: builder.query({
        query: () => '/users/me'
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetUserInfoQuery } = authApi;

/** Session storage key */
const TOKEN_KEY = 'token';

/** Store the payload's token in state and session storage */
const storeToken = (state, { payload }) => {
  state.token = payload.token;
  window.sessionStorage.setItem(TOKEN_KEY, payload.token);
};

/** This slice keeps track of the JWT sent from the API */
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: window.sessionStorage.getItem(TOKEN_KEY),
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      window.sessionStorage.removeItem(TOKEN_KEY);
    },
  },
  // These automatically update the token when RTK Query mutations are fulfilled.
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.register.matchFulfilled, storeToken);
  },
});


export const { logout } = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export default authSlice.reducer;

