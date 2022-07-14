import React from 'react'

import styles from "./CartItem.module.scss"

export const CartItem = ({ addToCart, dishPhoto, title, price, count, removeFromCart }) => {
    return (
        <div className={styles.cartItem}>
            <img src={dishPhoto} alt="товар" />
            <p>{title}</p>
            <span>{(price * count).toFixed(2)} €</span>
            <div className={styles.itemcount}>
                <button onClick={removeFromCart} >-</button>
                <span>{count}</span>
                <button onClick={addToCart} >+</button>
            </div>
        </div>
    )
}
