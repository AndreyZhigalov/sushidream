import React from 'react'
import axios from 'axios'

import { AssortmentCard } from '../componenst/AssortmentCard';
import { Navigation } from '../componenst/Navigation';
import { Check } from '../componenst/Check';
import { LoadingCard } from '../componenst/LoadingCard';
import { Sort } from '../componenst/Sort';
import { DeliveryRegion } from '../componenst/DeliveryRegion';
import Context from '../Context'

import styles from '../scss/index.module.scss';

export const Menu = () => {
    const [assortmentList, setAssortmentList] = React.useState([])
    const [activeCategory, setActiveCategory] = React.useState(0)
    const [bannerList, setBannerList] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [cartItems, setCartItems] = React.useState([])
    const [deliveryCost, setDeliveryCost] = React.useState(0)

    React.useEffect(() => {
        axios.get("https://62d1a703d4eb6c69e7e18344.mockapi.io/assortment")
            .then((resp) => {
                setAssortmentList(resp.data[0])
                setBannerList(resp.data[1])
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
        <Context.Provider value={
            {
                addToCart,
                removeFromCart,
                cartItems,
                setCartItems,
                deliveryCost,
                setDeliveryCost
            }
        }>
            <div>
                <img className={styles.menuBanner} src={bannerList[activeCategory]} alt="banner" />
            </div>
            <div className={styles.menuWrapper}>
                <DeliveryRegion setDeliveryCost={setDeliveryCost} />
                <Navigation
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                />
                <Sort />
                <div className={styles.assortment} >
                    {isLoading ? [...Array(6)].map((item, i) => <LoadingCard key={i} />) :
                        assortmentList[activeCategory].map(item =>
                            <AssortmentCard key={item.id} {...item} addToCart={() => addToCart(item)} />)
                    }
                </div>
                <Check />
            </div>
        </Context.Provider>
    )
}
