import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentSortType: 3,
    currentCategory: 0
}

export const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setCategory(state, action) {
            state.currentCategory = action.payload
        },
        setSort(state, action) {
            state.currentSortType = action.payload
        }
    }
})

export const { setCategory, setSort } = filtersSlice.actions;
export default filtersSlice.reducer