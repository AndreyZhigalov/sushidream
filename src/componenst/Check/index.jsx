import React from 'react'

import deliveryBoy from '../../assets/icons/deliveryBoy.svg'
import warning from '../../assets/icons/warning.svg'
import Context from '../../Context';
import { CartItem } from '../CartItem';

import styles from "./Check.module.scss"

export const Check = () => {

    const { addToCart, removeFromCart, cartItems, deliveryCost } = React.useContext(Context)

    return (
        <div className={styles.check}>
            <h2>ВАШ ЗАКАЗ</h2>
            <div className={styles.itemsBlock}>
                {cartItems.length > 0 ?
                    cartItems.map(item =>
                        <CartItem {...item}
                            key={item.id}
                            addToCart={() => addToCart(item)}
                            removeFromCart={() => removeFromCart(item)} />) :
                    <div className={styles.empty}>
                        <img src={warning} alt="Внимание" />
                        <p>Вы ничего не выбрали.<br />Добавьте что-то в ваш чек.</p>
                    </div>
                }
            </div>
            <div className={styles.total}>
                <p>доставка <span>{deliveryCost}&#x20bd;</span></p>
                <p>ИТОГО <span>{cartItems.reduce((sum, obj) => sum + obj.price * obj.count, 0) + deliveryCost}&#x20bd;</span></p>
            </div>
            <button className={styles.orderButton}>Оформить доставку
                <img height={30} src={deliveryBoy} alt="deliveryBoy" />
            </button>
        </div>
    )
}
