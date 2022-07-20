import React from 'react'
import axios from 'axios'

import { useDispatch, useSelector } from "react-redux"
import { setAssortment, sortItems } from "../../redux/slices/assortmentSlice"
import { AssortmentCard } from '../AssortmentCard';
import { LoadingCard } from '../LoadingCard';

import styles from "./AssortmentBlock.module.scss"

export const AccortmentBlock = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = React.useState(true)
    const { currentSortType, currentCategory } = useSelector(state => state.filters)
    const { assortment } = useSelector(state => state.assortment)

    React.useEffect(() => {
        axios.get("https://62d42dbc5112e98e484beb8c.mockapi.io/assortment")
            .then((resp) => {
                dispatch(setAssortment(resp.data))
                setIsLoading(false)
                dispatch(sortItems([currentSortType, currentCategory]))
            })
    }, [])

    React.useEffect(() => {
        assortment.length ?? dispatch(sortItems([currentSortType, currentCategory]))
    }, [currentCategory])


    return (
        <div className={styles.assortment} >
            {isLoading ? [...Array(6)].map((_, i) => <LoadingCard key={i} />) :
                assortment[currentCategory].map(item => <AssortmentCard key={item.id} item={item} />)}
        </div>
    )
}
