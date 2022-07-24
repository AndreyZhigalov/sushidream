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
    const { currentCategory, categories } = useSelector(state => state.filters)
    const { banners } = useSelector(state => state.assortment)

    const setBanner = () => {
        return banners[categories.indexOf(currentCategory)] ? banners[categories.indexOf(currentCategory)] : banners[0];
    }

    return (
        <>
            <div className={styles.bannerWrapper}>
                <img className={styles.menuBanner} src={setBanner()} alt="banner" />
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
