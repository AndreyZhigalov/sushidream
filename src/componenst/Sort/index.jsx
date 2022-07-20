import React from 'react'

import { useSelector, useDispatch } from "react-redux"
import { setSort } from "../../redux/slices/filtersSlice"
import { sortItems } from "../../redux/slices/assortmentSlice"

import styles from './Sort.module.scss'

export const Sort = () => {
    const [visibility, setVisibility] = React.useState(false)
    const { currentSortType, currentCategory } = useSelector(state => state.filters)
    const dispatch = useDispatch()

    const sortTypes = ["названию", "цене по возрастанию", "цене по убыванию", "популярности", "цене за штуку"]

    const switchSortType = (index) => {
        dispatch(sortItems([index, currentCategory]));
        dispatch(setSort(index));
        setVisibility(!visibility)
    }

    return (
        <div className={styles.sort}>
            Сортировка по <span onClick={() => setVisibility(!visibility)}>
                {sortTypes[currentSortType]}
            </span>
            <svg onClick={() => setVisibility(!visibility)}
                width="15" height="10" viewBox="0 0 30 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 19L15 4L27.5 19" stroke="white" strokeWidth="4" strokeLinecap="round" />
            </svg>
            {visibility &&
                <div className={styles.optionsList}>
                    {sortTypes.map((type, i) =>
                        <p onClick={() => switchSortType(i)}
                            className={currentSortType === i ? styles.active : ''} key={i}>{type}</p>)}
                </div>}
        </div >
    )
}
