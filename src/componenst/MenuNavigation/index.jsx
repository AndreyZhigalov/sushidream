import React from 'react'

import styles from "./MenuNavigation.module.scss"

export const MenuNavigation = ({ setActiveCategory, activeCategory }) => {

    const categories = [
        "Новинки", "Ланч", "Сет на одного", "Сет на компанию",
        "Жаренные роллы", "Калифорния", "Фреш роллы", "Маки", "Суши", "Чаши",
        "Чираши и Сашими", "Тартар и Севич", "Якитори, Темпура, Рамён и Карри",
        "ДЕТСКОЕ МЕНЮ", "Аккомпанемент", "Десерты", "Напитки"
    ]

    return (
        < nav className={styles.menuNavigation} >
            <ul>{
                categories.map((category) =>
                    <li key={category}
                        onClick={() => setActiveCategory(category)}
                        className={activeCategory === category ? styles.active : ""}>{category}
                    </li>)}
            </ul>
        </nav >
    )
}
