import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api"
import authReducer from "../features/Auth/authSlice"
import userReducer from "../features/Account/accountSlice"
import resReducer from "../features/Account/resSlice"

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer,
        user: userReducer,
        res: resReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware)
});

export default store;