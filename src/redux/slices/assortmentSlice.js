import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchAssortment = createAsyncThunk(
    "assortment/fetchAssortmentStatus",
    async () => {
        const { data } = await axios.get("https://62dc526b4438813a2614c8e7.mockapi.io/assortment")
        return data
    }
)

const initialState = {
    assortment: [],
    banners: [],
    specials: [],
    status: "loading"
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
                state.assortment[category].sort((a, b) => (a["title"]).localeCompare(b["title"]));
            } else if (sortType === "price+") {
                state.assortment[category].sort((a, b) => a["price"] - b["price"]);
            } else if (sortType === "price") {
                state.assortment[category].sort((a, b) => b["price"] - a["price"]);
            } else if (sortType === "rating") {
                state.assortment[category].sort((a, b) => b["rating"] - a["rating"])
            } else if (sortType === "cheapest") {
                state.assortment[category].sort((a, b) => (a["price"] / a["portion"]) - (b["price"] / b["portion"]));
            }
        }
    },
    extraReducers: {
        [fetchAssortment.pending](state,) {
            state.status = "loading"
        },
        [fetchAssortment.fulfilled](state, action) {
            state.status = "success"
            state.assortment = action.payload[0]
            state.banners = action.payload[1]
            state.specials = action.payload[2]
        },
        [fetchAssortment.rejected](state, action) {
            state.status = "error"
            console.error(action)
            alert("Ошибка при получении списка товаров")
        }
    }
}
)

export const { setAssortment, sortItems } = assortmentSlice.actions
export default assortmentSlice.reducer