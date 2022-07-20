import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { setDeliveryCost } from "../../redux/slices/deliverySlice"

import styles from './DeliveryRegion.module.scss'

export const DeliveryRegion = () => {
    const [visibility, setVisibility] = React.useState(false)
    const dispatch = useDispatch()
    const { regions, currentRegion } = useSelector(state => state.delivery)

    const deliveryRegionCost = (i) => {
        setVisibility(!visibility)
        dispatch(setDeliveryCost(i))
    }

    return (
        <div onClick={() => setVisibility(!visibility)} className={styles.deliveryRegion}>
            {currentRegion || "ВЫБЕРИТЕ ОБЛАСТЬ ДОСТАВКИ"}
            <svg onClick={() => setVisibility(!visibility)} width="15" height="10" viewBox="0 0 30 21"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 19L15 4L27.5 19" stroke="white" strokeWidth="4" strokeLinecap="round" />
            </svg>
            {visibility && <div className={styles.optionsList}>
                {regions.map((type, i) =>
                    <p onClick={() => deliveryRegionCost(i)}
                        className={currentRegion === type ? styles.active : ''} key={i}>{type}</p>)}
            </div>}

        </div>
    )
}
