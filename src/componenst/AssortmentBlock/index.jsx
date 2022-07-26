import React from 'react'
import qs from "qs"
import { useNavigate } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { sortItems, fetchAssortment } from "../../redux/slices/assortmentSlice"
import { setCategory, setSort } from "../../redux/slices/filtersSlice"
import { AssortmentCard } from '../AssortmentCard';
import { LoadingCard } from '../LoadingCard';

import styles from "./AssortmentBlock.module.scss"

export const AccortmentBlock = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { currentSortType, currentCategory, categories, sortTypes } = useSelector(state => state.filters)
    const { assortment, status } = useSelector(state => state.assortment)

    React.useEffect(() => {
        if (status === "success") dispatch(sortItems([currentSortType.engTitle, currentCategory.engTitle]));
    }, [status])

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
        dispatch(fetchAssortment())
    }, [])

    React.useEffect(() => {
        if (status === "success") {
            let filterParameter = qs.stringify({
                category: currentCategory.engTitle,
                sortBy: currentSortType.engTitle
            })
            navigate(`?${filterParameter.replace("%2B", "(asc)")}`)
        }
    }, [currentSortType, currentCategory])

    React.useEffect(() => {
        if (status === "success") dispatch(sortItems([currentSortType.engTitle, currentCategory.engTitle]))
    }, [currentCategory])

    return (
        <div className={styles.assortment} >
            {status === "loading" ? [...Array(6)].map((_, i) => <LoadingCard key={i} />) :
                status === "error" ? null :
                    assortment[currentCategory.engTitle].map(item => <AssortmentCard key={item.id} item={item} />)}
        </div>
    )
}
