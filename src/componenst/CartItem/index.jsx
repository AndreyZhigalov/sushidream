import React from 'react'

import styles from "./CartItem.module.scss"

export const CartItem = ({ itemCount, addToCart }) => {
    return (
        <div className={styles.cartItem}>
            <img src="img\assort\desserts\cheesecake-nature.png" alt="товар" />
            <p>{"Обычный чизкейк, но ещё пизже чем другие"}</p>
            <span>{20.90}</span>
            <div className={styles.itemcount}>
                <button onClick={addToCart} value="-">-</button>
                <span>{itemCount}</span>
                <button onClick={addToCart} value="+">+</button>
            </div>
        </div>
    )
}
