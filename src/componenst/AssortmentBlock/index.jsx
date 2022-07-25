import React from 'react'
import axios from 'axios'
import qs from "qs"
import { useNavigate } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { setAssortment, sortItems } from "../../redux/slices/assortmentSlice"
import { setCategory, setSort } from "../../redux/slices/filtersSlice"
import { AssortmentCard } from '../AssortmentCard';
import { LoadingCard } from '../LoadingCard';

import styles from "./AssortmentBlock.module.scss"

export const AccortmentBlock = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = React.useState(true)
    const { currentSortType, currentCategory, categories, sortTypes } = useSelector(state => state.filters)
    const { assortment } = useSelector(state => state.assortment)
    const [postFiltering, setPostFiltering] = React.useState(false)

    React.useEffect(() => {
        if (postFiltering) {
            dispatch(sortItems([currentSortType.engTitle, currentCategory.engTitle]));
        }
    }, [postFiltering])

    React.useEffect(() => {
        try {
            axios.get("https://62dc526b4438813a2614c8e7.mockapi.io/assortment")
                .then((resp) => {
                    dispatch(setAssortment(resp.data))
                    setIsLoading(false)
                    setPostFiltering(true)
                    dispatch(sortItems([currentSortType.engTitle, currentCategory.engTitle]));
                })
        } catch (error) {
            alert("Не удалось получить список товаров с сервера")
            console.error(error)
        }
    }, [])

    React.useEffect(() => {
        if (window.location.search) {
            let searchParameters = qs.parse(window.location.search.substring(1).replace("(asc)", "%2B"));
            let category = categories.find(obj => obj.engTitle === searchParameters.category);
            let sort = sortTypes.find(obj => obj.engTitle === searchParameters.sortBy);
            if (category) dispatch(setCategory(category));
            if (sort) dispatch(setSort(sort));
        }
    }, [])


    React.useEffect(() => {
        if (!isLoading) {
            let filterParameter = qs.stringify({
                category: currentCategory.engTitle,
                sortBy: currentSortType.engTitle
            })
            navigate(`?${filterParameter.replace("%2B", "(asc)")}`)
        }
    }, [currentSortType, currentCategory])

    React.useEffect(() => {
        if (!isLoading) {
            assortment.length ?? dispatch(sortItems([currentSortType.engTitle, currentCategory.engTitle]))
        }
    }, [currentCategory])

    return (
        <div className={styles.assortment} >
            {isLoading ? [...Array(6)].map((_, i) => <LoadingCard key={i} />) :
                assortment[currentCategory.engTitle].map(item => <AssortmentCard key={item.id} item={item} />)}
        </div>
    )
}
