import React from 'react'

import { useDispatch } from "react-redux"
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice"

import styles from "./CartItem.module.scss"

export const CartItem = ({ item }) => {
    const dispatch = useDispatch()

    return (
        <div className={styles.cartItem}>
            <img src={item.dishPhoto} alt="товар" />
            <p>{item.count} x {item.title}</p>
            <span>{(item.price * item.count)}&#x20bd;</span>
            <div className={styles.itemcount}>
                <button onClick={() => dispatch(removeFromCart(item))} >-</button>
                <span>{item.count}</span>
                <button onClick={() => dispatch(addToCart(item))} >+</button>
            </div>
        </div>
    )
}
