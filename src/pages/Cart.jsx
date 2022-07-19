import React from 'react'

import { Check } from "../componenst/Check"
import { DeliveryRegion } from '../componenst/DeliveryRegion'

import styles from "../scss/index.module.scss"

export const Cart = () => {
    return (
        <div className={styles.cart}>
            <div>
                <DeliveryRegion />
                <Check />
            </div>

        </div>
    )
}
