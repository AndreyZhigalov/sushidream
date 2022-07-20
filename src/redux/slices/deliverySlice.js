import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    regions: ["Самовывоз", "Близко", "Средне", "Далеко"],
    currentRegion: "",
    costs: [0, 200, 400, 600],
    currentCost: 0
}

export const deliverySlice = createSlice({
    name: "delivery",
    initialState,
    reducers: {
        setDeliveryCost(state, action) {
            state.currentRegion = state.regions[action.payload]
            state.currentCost = state.costs[action.payload]
        },
    }
})

export const { setDeliveryCost } = deliverySlice.actions
export default deliverySlice.reducer