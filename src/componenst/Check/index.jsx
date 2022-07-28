import React from 'react'
import { useDispatch } from 'react-redux'

import deliveryBoy from '../../assets/icons/deliveryBoy.svg'
import trash from '../../assets/icons/trash.svg'
import warning from '../../assets/icons/warning.svg'
import { CartItem } from '../CartItem';
import { useSelector } from "react-redux"
import { clearCart } from "../../redux/slices/cartSlice"

import styles from "./Check.module.scss"

export const Check = () => {
    const dispatch = useDispatch()
    const { cartItems, totalPrice } = useSelector(state => state.cart)
    const deliveryCost = useSelector(state => state.delivery.currentCost)

    return (
        <div className={styles.check}>
            {cartItems[0] && <img src={trash} alt="Clear cart" onClick={() => dispatch(clearCart())} />}
            <h2>ВАШ ЗАКАЗ</h2>
            <div className={styles.itemsBlock}>
                {
                    cartItems.length > 0 ?
                        cartItems.map(item =>
                            <CartItem item={item} key={item.id} />)
                        :
                        <div className={styles.empty}>
                            <img src={warning} alt="Внимание" />
                            <p>Вы ничего не выбрали.<br />Добавьте что-то в ваш чек.</p>
                        </div>
                }
            </div>
            <div className={styles.total}>
                <p>доставка <span>{deliveryCost}&#x20bd;</span></p>
                <p>ИТОГО <span>{totalPrice + deliveryCost}&#x20bd;</span></p>
            </div>
            <button className={styles.orderButton}>Оформить доставку
                <img height={30} src={deliveryBoy} alt="deliveryBoy" />
            </button>
        </div>
    )
}
