import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cartItems: [],
    count: 0,
    totalPrice: 0,
}

export const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            let item = action.payload
            if (state.cartItems.find(obj => obj.id === item.id)) {
                state.cartItems.map((obj) => {
                    return obj.id === item.id ? { ...obj, count: obj.count += 1 } : { ...obj }
                })
            } else {
                state.cartItems = [...state.cartItems, item]
            }
            state.totalPrice = state.cartItems.reduce((sum, obj) => sum + obj.price * obj.count, 0);
            state.count += 1
        },
        removeFromCart(state, action) {
            let item = action.payload
            if (item.count === 1) {
                state.cartItems = state.cartItems.filter(obj => obj.id !== item.id)
            } else {
                state.cartItems.map((obj) => { return obj.id === item.id ? { ...obj, count: obj.count -= 1 } : { ...obj } });
            };
            state.totalPrice = state.cartItems.reduce((sum, obj) => sum + obj.price * obj.count, 0);
            state.count -= 1;
        },
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer