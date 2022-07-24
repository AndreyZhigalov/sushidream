import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    assortment: [],
    banners: [],
    specials: []
}

export const assortmentSlice = createSlice({
    name: "assortment",
    initialState,
    reducers: {
        setAssortment(state, action) {
            state.assortment = action.payload[0]
            state.banners = action.payload[1]
            state.specials = action.payload[2]
        },
        sortItems(state, action) {
            let sortType = action.payload[0]
            let category = action.payload[1]
            if (sortType === "title") {
                state.assortment[category].sort((a, b) => a["title"].charCodeAt(0) - b["title"].charCodeAt(0));
            } else if (sortType === "+price") {
                state.assortment[category].sort((a, b) => a["price"] - b["price"]);
            } else if (sortType === "price") {
                state.assortment[category].sort((a, b) => b["price"] - a["price"]);
            } else if (sortType === "rating") {
                state.assortment[category].sort((a, b) => b["rating"] - a["rating"])
            } else if (sortType === "cheapest") {
                state.assortment[category].sort((a, b) => (a["price"] / a["portion"]) - (b["price"] / b["portion"]));
            }
        }
    }
}
)

export const { setAssortment, sortItems } = assortmentSlice.actions
export default assortmentSlice.reducer