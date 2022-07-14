import React from 'react'

import styles from "./MenuNavigation.module.scss"

export const MenuNavigation = ({ renderList, setActiveCategory, activeCategory }) => {


    const switchCategory = (index) => {
        setActiveCategory(index)
        renderList(index)
    }

    const categories = [
        "Новинки", "Ланч", "Сет на одного", "Сет на компанию",
        "Жаренные роллы", "Калифорния", "Фреш роллы", "Маки", "Суши", "Чаши",
        "Чираши И Сашими", "Тартар и Севич", "Якитори, Темпура, Рамён и Карри",
        "ДЕТСКОЕ МЕНЮ", "Аккомпанемент", "Десерты", "Напитки"
    ]

    const createCategoriesList = () => {
        return <ul>{
            categories.map((cat, index) =>
                <li
                    onClick={() => switchCategory(index)}
                    className={activeCategory === index ? styles.active : ""}>{cat}
                </li>)}
        </ul>
    }

    return (
        < nav className={styles.menuNavigation} >
            {createCategoriesList()}
        </nav >
    )
}
