
import { cartSlice } from "./cart.slice";
import { AssortmentItem } from "../assortment";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { RootState } from "../../store";

export const useCartActions = () => {
    const dispatch = useAppDispatch()
    const { fetchCart, addToCart, removeFromCart, clearCart, setDiscount } = cartSlice.actions
    return {
        fetchCart: () => dispatch(fetchCart()),
        addToCart: (item: AssortmentItem) => dispatch(addToCart(item)),
        removeFromCart: (id: number) => dispatch(removeFromCart(id)),
        clearCart: () => dispatch(clearCart()),
        setDiscount: () => dispatch(setDiscount())
    }
}

export const useCartGetters = () => useAppSelector((state: RootState) => state.cart)
