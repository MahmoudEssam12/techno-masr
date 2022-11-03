import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart";
import authSlice from "./slices/auth"
export default configureStore({
    reducer: {
        cart: cartSlice,
        auth: authSlice
    }
})