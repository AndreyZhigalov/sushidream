import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { firestoreDB } from "../../../firebase";
import { OrderItem } from "./models/orderItem.interface";
import { cartSlice } from "../cart";
import { modalSlice } from "../modal";

export class OrderService {
    public getOrder = createAsyncThunk('cart/getOrder', async (_, Thunk) => {

        const {
            cart: { cartItems, totalPrice, discount },
            delivery: { currentRegion, currentCost },
            user: { uid, phoneNumber },
        } = Thunk.getState() as RootState;

        const userID = uid
            ? uid
            : `anon_user_${Math.floor(Math.random() * 10e16)
                .toString(16)
                .toLocaleUpperCase()}`;

        const orderID = Math.floor(Math.random() * 10e16)
            .toString(16)
            .toLocaleUpperCase();

        const orderslist =
            (await getDoc(doc(firestoreDB, 'orders', userID)).then(
                (res) => res.data() as { orderslist: OrderItem[] },
            )) ?? ({} as { orderslist: OrderItem[] });

        const finalDiscount = (10e10 * ((totalPrice + currentCost) / 100) * 30) / 10e10;

        const newOrder = {
            orderID,
            items: cartItems.map((item) => {
                const { id, count, title, price } = item;
                return { id, count, title, price };
            }),
            address: currentRegion,
            deliveryCost: currentCost,
            discount,
            TotalCost:
                discount > 0 && totalPrice > 0
                    ? totalPrice + currentCost - finalDiscount
                    : totalPrice + currentCost,
        };

        return await setDoc(
            doc(firestoreDB, 'orders', userID),
            orderslist.orderslist
                ? { orderslist: [...orderslist.orderslist, newOrder], phone: phoneNumber }
                : { orderslist: [newOrder], phone: phoneNumber },
        )
            .then(() => {
                Thunk.dispatch(cartSlice.actions.clearCart());
                return orderID;
            })
            .catch((error) => {
                Thunk.dispatch(modalSlice.actions.setAlert('Ошибка при отправке заказа. Попробуйте ещё раз'));
                throw new Error(error);
            });
    });

}