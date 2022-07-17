import React from 'react'

import styles from "./AssortmentCard.module.scss"

export const AssortmentCard = ({ title, dishPhoto, price, portion, specifics, addToCart, specialsList }) => {

    const specials = specialsList.filter((pic) => specifics.find(title => pic.toLowerCase().includes(title.toLowerCase())))
        .map(icon => <img key={icon} src={icon} alt="Особенность" />)

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
                    {specials}
                </div>
                <button onClick={addToCart} className={styles.add}></button>
            </div>
        </div>
    )
}
