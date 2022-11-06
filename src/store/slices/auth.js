import { createSlice } from "@reduxjs/toolkit";
const credentials = JSON.parse(localStorage.getItem("credentials"))
const initialState = {
    userState: credentials !== null ? credentials.isLoggedIn : false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserState: (state, action) => {
            state.userState = action.payload
        },
        updateUserState: (state, action) => {
            state.userState = JSON.parse(localStorage.getItem("credentials")).isLoggedIn
        }
    }
});

export const { setUserState, updateUserState } = authSlice.actions;
export const userState = (state) => state.auth.userState;
export default authSlice.reducer;