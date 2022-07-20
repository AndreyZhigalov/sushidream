import { configureStore } from "@reduxjs/toolkit"
import cart from "./slices/cartSlice"
import assortment from "./slices/assortmentSlice"
import filters from "./slices/filtersSlice"
import delivery from "./slices/deliverySlice"
import navbar from "./slices/navbarSlice"


export const store = configureStore({
    reducer: {
        cart,
        assortment,
        filters,
        delivery,
        navbar
    }
})
