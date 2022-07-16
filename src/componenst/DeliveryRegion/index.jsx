import React from 'react'

import styles from './DeliveryRegion.module.scss'

export const DeliveryRegion = ({ setDeliveryCost }) => {
    const [visibility, setVisibility] = React.useState(false)
    const [activeDelivery, setActiveDelivery] = React.useState(0)
    const [region, setRegion] = React.useState("")

    const deliveryType = ["Самовывоз", "Близко", "Средне", "Далеко"]

    const deliveryRegionCost = (i) => {
        setActiveDelivery(i)
        const costs = [0, 200, 400, 600]
        setDeliveryCost(costs[i])
        setVisibility(!visibility)
        setRegion(deliveryType[i])
    }

    return (
        <div onClick={() => setVisibility(!visibility)} className={styles.deliveryRegion}>
            {region || "ВЫБЕРИТЕ ОБЛАСТЬ ДОСТАВКИ"}
            <svg onClick={() => setVisibility(!visibility)} width="15" height="10" viewBox="0 0 30 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 19L15 4L27.5 19" stroke="white" strokeWidth="4" strokeLinecap="round" />
            </svg>
            {visibility && <div className={styles.optionsList}>
                {deliveryType.map((type, i) =>
                    <p onClick={() => deliveryRegionCost(i)} className={activeDelivery === i ? styles.active : ''} key={i}>{type}</p>)}
            </div>}

        </div>
    )
}
