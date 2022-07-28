import React from 'react'

import { AccortmentBlock } from '../componenst/AssortmentBlock';
import { useSelector } from "react-redux"
import { Navigation } from '../componenst/Navigation';
import { Check } from '../componenst/Check';
import { Sort } from '../componenst/Sort';
import { DeliveryRegion } from '../componenst/DeliveryRegion';
import { selectFilters } from '../redux/slices/filtersSlice';
import useScreenSize from "../Hooks/useScreenSize"
import { selectAssortment } from '../redux/slices/assortmentSlice';

import styles from '../scss/index.module.scss';

export const Menu = () => {
    const screenSize = useScreenSize()
    const { currentCategory, categories } = useSelector(selectFilters)
    const { banners, status } = useSelector(selectAssortment)

    const setBanner = () => {
        return status === "loading" ? "https://via.placeholder.com/1/ebebeb" : banners[categories.indexOf(currentCategory)];
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
