import React from 'react'
import styles from "./AssortmentCard.module.scss"

export const AssortmentCard = ({ title, dishPhoto, price, portion, specifics, addToCart }) => {
    return (
        <div className={styles.card}>
            <img src={dishPhoto} alt="" />
            <h3>{title}</h3>
            <div className={styles.shortDescription}>
                <div>
                    <p>КОЛ-ВО: {portion}</p>
                    <span>{price}&#x20bd;</span>
                </div>
                <div>
                    {specifics.map((pic, i) => <img key={i} src={pic} alt="Особенность" />)}
                </div>
                <button onClick={addToCart} className={styles.add}></button>
            </div>
        </div>
    )
}
