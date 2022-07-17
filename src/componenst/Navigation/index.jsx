import React from 'react'

import styles from "./Navigation.module.scss"

export const Navigation = ({ setActiveCategory, activeCategory }) => {

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
                        onClick={() => { setActiveCategory(index) }}
                        className={activeCategory === index ? styles.active : ""}>{category}
                    </li>)}
            </ul>
        </nav >
    )
}
