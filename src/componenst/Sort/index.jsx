import React from 'react'

import { useSelector, useDispatch } from "react-redux"
import { setSort } from "../../redux/slices/filtersSlice"
import { sortItems } from "../../redux/slices/assortmentSlice"

import styles from './Sort.module.scss'

export const Sort = () => {
    const [visibility, setVisibility] = React.useState(false)
    const { currentSortType, currentCategory, sortTypes } = useSelector(state => state.filters)
    const dispatch = useDispatch()

    const switchSortType = (type) => {
        dispatch(sortItems([type.engTitle, currentCategory.engTitle]));
        dispatch(setSort(type));
        setVisibility(!visibility)
    }

    return (
        <div className={styles.sort}>
            Сортировка по <span onClick={() => setVisibility(!visibility)}>
                {currentSortType.ruTitle}
            </span>
            <svg onClick={() => setVisibility(!visibility)}
                width="15" height="10" viewBox="0 0 30 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 19L15 4L27.5 19" stroke="white" strokeWidth="4" strokeLinecap="round" />
            </svg>
            {visibility &&
                <div className={styles.optionsList}>
                    {sortTypes.map((type, i) =>
                        <p onClick={() => switchSortType(type)}
                            className={currentSortType.engTitle === type.engTitle ? styles.active : ''} key={type.engTitle}>{type.ruTitle}</p>)}
                </div>}
        </div >
    )
}
