import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpened: false
}

export const navbarSlice = createSlice({
    name: "navbar",
    initialState,
    reducers: {
        openNavbar(state, action) {
            state.isOpened = action.payload
        }
    }
})

export const { openNavbar } = navbarSlice.actions;
export default navbarSlice.reducer