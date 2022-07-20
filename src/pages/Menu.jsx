import React from 'react'

import { AccortmentBlock } from '../componenst/AssortmentBlock';
import { useSelector } from "react-redux"
import { Navigation } from '../componenst/Navigation';
import { Check } from '../componenst/Check';
import { Sort } from '../componenst/Sort';
import { DeliveryRegion } from '../componenst/DeliveryRegion';
import useScreenSize from "../Hooks/useScreenSize"

import styles from '../scss/index.module.scss';

export const Menu = () => {
    const screenSize = useScreenSize()
    const { currentCategory } = useSelector(state => state.filters)
    const { banners } = useSelector(state => state.assortment)

    return (
        <>
            <div>
                <img className={styles.menuBanner} src={banners[currentCategory]} alt="banner" />
            </div>
            <div className={styles.menuWrapper}>
                <Navigation />
                <Sort />
                <AccortmentBlock />
                {screenSize.width > 820 && < DeliveryRegion />}
                {screenSize.width > 820 && < Check />}
            </div>
        </>
    )
}
