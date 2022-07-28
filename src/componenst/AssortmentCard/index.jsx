import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { selectAssortment } from '../../redux/slices/assortmentSlice'
import { addToCart } from "../../redux/slices/cartSlice"

import styles from "./AssortmentCard.module.scss"

export const AssortmentCard = ({ item }) => {
    const dispatch = useDispatch()
    const { specials } = useSelector(selectAssortment)

    const setSpecials = () => {
        return specials.map((icon) => {
            return item.specifics.find(link => icon.toLowerCase().includes(link.toLowerCase())) ?
                <img key={icon} src={icon} alt="Особенность" /> : false
        })
    }

    return (
        <div className={styles.card}>
            <img src={item.dishPhoto} alt="" />
            <h3>{item.title}</h3>
            <div className={styles.shortDescription}>
                <div>
                    <p>КОЛ-ВО: {item.portion}</p>
                    <span>{item.price}&#x20bd;</span>
                </div>
                <div>{setSpecials()}</div>
                <button onClick={() => dispatch(addToCart(item))} className={styles.add}></button>
            </div>
        </div>
    )
}
