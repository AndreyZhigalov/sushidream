import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { setCategory } from "../../redux/slices/filtersSlice"

import styles from "./Navigation.module.scss"

export const Navigation = () => {
    const dispatch = useDispatch()
    const { currentCategory, categories } = useSelector(state => state.filters)

    return (
        < nav className={styles.navigation} >
            <ul>{
                categories.map((category) =>
                    <li key={category.engTitle}
                        onClick={() => { dispatch(setCategory(category)) }}
                        className={currentCategory.engTitle === category.engTitle ? styles.active : ""}>
                        {category.ruTitle}
                    </li>)}
            </ul>
        </nav >
    )
}