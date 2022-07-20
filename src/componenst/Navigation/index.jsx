import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { setCategory } from "../../redux/slices/filtersSlice"

import styles from "./Navigation.module.scss"

export const Navigation = () => {
    const dispatch = useDispatch()
    const currentCategory = useSelector(state => state.filters.currentCategory)

    const categories = [
        "Новинки", "Ланч", "Сет на одного", "Сет на компанию",
        "Жаренные роллы", "Калифорния", "Фреш роллы", "Маки", "Суши", "Чаши",
        "Чираши и Сашими", "Тартар и Севич", "Якитори, Темпура, Рамён и Карри",
        "ДЕТСКОЕ МЕНЮ", "Аккомпанемент", "Десерты", "Напитки"
    ]

    return (
        < nav className={styles.navigation} >
            <ul>{
                categories.map((category, index) =>
                    <li key={category}
                        onClick={() => { dispatch(setCategory(index)) }}
                        className={currentCategory === index ? styles.active : ""}>{category}
                    </li>)}
            </ul>
        </nav >
    )
}
