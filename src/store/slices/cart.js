import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartItem: (state, action) => {
            state.products = [...state.products, action.payload]
        },
        removeCartItem: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload)
        },
        updateCartItem: (state, action) => {
            let updatedItemIndex = state.products.findIndex(product => product.id === action.payload.id)
            let updatedItem = state.products.splice(updatedItemIndex, 1);
            updatedItem[0] = { ...updatedItem[0], quantity: action.payload.quantity };

            state.products.splice(updatedItemIndex, 0, updatedItem[0]);
        },
        quantityHandler: (state, action) => {
            let updatedItemIndex = state.products.findIndex(product => product.id === action.payload.id)
            let updatedItem = state.products.splice(updatedItemIndex, 1);
            if (action.payload.type === "add") {
                updatedItem[0] = { ...updatedItem[0], quantity: updatedItem[0].quantity + 1 };

            } else if (action.payload.type === "remove") {
                updatedItem[0] = { ...updatedItem[0], quantity: updatedItem[0].quantity - 1 };

            }
            state.products.splice(updatedItemIndex, 0, updatedItem[0]);

        }
    }
});

export const { setCartItem, removeCartItem, updateCartItem, quantityHandler } = cartSlice.actions;
export const selectCartItem = (state) => state.cart.products;
export default cartSlice.reducer;