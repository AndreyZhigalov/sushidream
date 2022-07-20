import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { addToCart } from "../../redux/slices/cartSlice"


import styles from "./AssortmentCard.module.scss"

export const AssortmentCard = ({ item }) => {
    const dispatch = useDispatch()

    const specials = useSelector(state => state.assortment.specials).filter((pic) => item.specifics.find(title => pic.toLowerCase().includes(title.toLowerCase())))
        .map(icon => <img key={icon} src={icon} alt="Особенность" />)


    return (
        <div className={styles.card}>
            <img src={item.dishPhoto} alt="" />
            <h3>{item.title}</h3>
            <div className={styles.shortDescription}>
                <div>
                    <p>КОЛ-ВО: {item.portion}</p>
                    <span>{item.price}&#x20bd;</span>
                </div>
                <div>
                    {specials}
                </div>
                <button onClick={() => dispatch(addToCart(item))} className={styles.add}></button>
            </div>
        </div>
    )
}
