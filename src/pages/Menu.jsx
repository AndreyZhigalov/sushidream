import React from 'react'
import axios from 'axios'

import { AssortmentCard } from '../componenst/AssortmentCard';
import { Navigation } from '../componenst/Navigation';
import { Check } from '../componenst/Check';
import { LoadingCard } from '../componenst/LoadingCard';
import { Sort } from '../componenst/Sort';
import { DeliveryRegion } from '../componenst/DeliveryRegion';

import styles from '../scss/index.module.scss';

export const Menu = ({ setCartItemCount }) => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [assortmentList, setAssortmentList] = React.useState([])
    const [bannerList, setBannerList] = React.useState([])
    const [activeSortType, setActiveSortType] = React.useState(3)
    const [activeCategory, setActiveCategory] = React.useState(0)
    const [specialsList, setSpecialsList] = React.useState([])
    const [cartItems, setCartItems] = React.useState([])
    const [deliveryCost, setDeliveryCost] = React.useState(0)

    React.useEffect(() => {
        axios.get("https://62d42dbc5112e98e484beb8c.mockapi.io/assortment")
            .then((resp) => {
                setAssortmentList(resp.data[0])
                setBannerList(resp.data[1])
                setSpecialsList(resp.data[2])
                setIsLoading(false)
                sortItemsList(activeSortType)
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

    const sortItemsList = (i) => {
        setActiveSortType(i);
        if (i === 0) {
            // сортировка по названию
            setAssortmentList((prev) => {
                let arr = []
                for (let category in prev) {
                    prev[category] === prev[activeCategory] ? arr.push(prev[category].sort((a, b) => a["title"].charCodeAt(0) - b["title"].charCodeAt(0))) : arr.push(prev[category]);
                }
                return arr
            })
        } else if (i === 1) {
            // сортировка по цене по возрастанию
            setAssortmentList((prev) => {
                let arr = []
                for (let category in prev) {
                    prev[category] === prev[activeCategory] ? arr.push(prev[category].sort((a, b) => a["price"] - b["price"])) : arr.push(prev[category]);
                }
                return arr
            })
        } else if (i === 2) {
            // сортировка по цене по убыванию
            setAssortmentList((prev) => {
                let arr = []
                for (let category in prev) {
                    prev[category] === prev[activeCategory] ? arr.push(prev[category].sort((a, b) => b["price"] - a["price"])) : arr.push(prev[category]);
                }
                return arr
            })
        } else if (i === 3) {
            // сортировка по популярности
            setAssortmentList((prev) => {
                let arr = []
                for (let category in prev) {
                    prev[category] === prev[activeCategory] ? arr.push(prev[category].sort((a, b) => b["rating"] - a["rating"])) : arr.push(prev[category])
                }
                return arr
            })
        } else if (i === 4) {
            // сортировка по цене за штуку
            setAssortmentList((prev) => {
                let arr = []
                for (let category in prev) {
                    prev[category] === prev[activeCategory] ? arr.push(prev[category].sort((a, b) => (a["price"] / a["portion"]) - (b["price"] / b["portion"]))) : arr.push(prev[category]);
                }
                return arr
            })
        }
    }

    React.useEffect(() => {
        sortItemsList(activeSortType)
    }, [activeCategory])

    let assortment = isLoading ? [...Array(6)].map((item, i) => <LoadingCard key={i} />) :
        assortmentList[activeCategory].map((item) => {
            return <AssortmentCard
                key={item.id} {...item}
                addToCart={() => addToCart(item)}
                specialsList={specialsList} />
        })

    React.useEffect(() => {
        let result = cartItems.reduce((sum, obj) => sum + obj.count, 0)
        setCartItemCount(result)
    }, [cartItems])

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
                <Sort sortItemsList={sortItemsList} activeSortType={activeSortType} />
                <div className={styles.assortment} >
                    {assortment}
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
