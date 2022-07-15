import React from 'react'
import { CartItem } from '../CartItem';
import styles from "./Check.module.scss"

export const Check = ({ addToCart, removeFromCart, cartItems, deliveryCost }) => {
    return (
        <div className={styles.check}>
            <h2>ВАШ ЗАКАЗ</h2>
            <div className={styles.itemsBlock}>
                {cartItems.length > 0 ?
                    cartItems.map(item =>
                        <CartItem {...item}
                            key={item.id}
                            addToCart={() => addToCart(item)}
                            removeFromCart={() => removeFromCart(item)} />) : ""}
            </div>
            <div className={styles.total}>
                <p>доставка <span>{deliveryCost}&#x20bd;</span></p>
                <p>ИТОГО <span>{cartItems.reduce((sum, obj) => sum + obj.price * obj.count, 0) + deliveryCost}&#x20bd;</span></p>
            </div>
            <button className={styles.orderButton}>Оформить доставку</button>
        </div>
    )
}
