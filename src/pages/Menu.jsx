import React from 'react'
import axios from 'axios'

import { AssortmentCard } from '../componenst/AssortmentCard';
import { Navigation } from '../componenst/Navigation';
import { Check } from '../componenst/Check';
import { LoadingCard } from '../componenst/LoadingCard';
import { Sort } from '../componenst/Sort';
import { DeliveryRegion } from '../componenst/DeliveryRegion';

import styles from '../scss/index.module.scss';

export const Menu = () => {
    const [activeCategory, setActiveCategory] = React.useState(0)
    const [isLoading, setIsLoading] = React.useState(true)
    const [assortmentList, setAssortmentList] = React.useState([])
    const [bannerList, setBannerList] = React.useState([])
    const [specialsList, setSpecialsList] = React.useState([])
    const [cartItems, setCartItems] = React.useState([])
    const [deliveryCost, setDeliveryCost] = React.useState(0)

    React.useEffect(() => {
        axios.get("https://62d360c7afb0b03fc5b26d7f.mockapi.io/assortment")
            .then((resp) => {
                setAssortmentList(resp.data[0])
                setBannerList(resp.data[1])
                setSpecialsList(resp.data[2])
                setIsLoading(false)
            })
    }, [])


    const addToCart = (item) => {
        if (cartItems.find(obj => obj.id === item.id)) {
            setCartItems(prev => prev.map((obj) => { return obj.id === item.id ? { ...obj, count: obj.count += 1 } : { ...obj } }))
        } else {
            setCartItems(prev => [...prev, item])
        }
    }
    const removeFromCart = (item) => {
        item.count === 1 ?
            setCartItems(prev => prev.filter(obj => obj.id !== item.id)) :
            setCartItems(prev => prev.map((obj) => { return obj.id === item.id ? { ...obj, count: obj.count -= 1 } : { ...obj } }));
    }

    return (
        <>
            <div>
                <img className={styles.menuBanner} src={bannerList[activeCategory]} alt="banner" />
            </div>
            <div className={styles.menuWrapper}>
                <DeliveryRegion setDeliveryCost={setDeliveryCost} />
                <Navigation
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                />
                <Sort setAssortmentList={setAssortmentList} assortmentList={assortmentList} activeCategory={activeCategory} />
                <div className={styles.assortment} >
                    {isLoading ? [...Array(6)].map((item, i) => <LoadingCard key={i} />) :
                        assortmentList[activeCategory].map(item =>
                            <AssortmentCard key={item.id} {...item} addToCart={() => addToCart(item)} specialsList={specialsList} />)
                    }
                </div>
                <Check
                    deliveryCost={deliveryCost}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    cartItems={cartItems} />
            </div>
        </>
    )
}
