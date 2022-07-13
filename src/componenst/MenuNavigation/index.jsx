import React from 'react'

import { Link } from "react-router-dom"

import styles from "./MenuNavigation.module.scss"

export const MenuNavigation = () => {
    return (
        < nav className={styles.menuNavigation} >
            <ul>
                <li><Link to="/new" />Новинки</li>
            </ul>
            <ul>
                <li><Link to="/midi" />Мидии</li>
                <li><Link to="/one-person-set" />Сет на одного</li>
                <li><Link to="/company-set" />Сет на компанию</li>
            </ul>
            <ul>
                <li><Link to="/fried-rolls" />Жаренные роллы</li>
                <li><Link to="/california" />Калифорния</li>
                <li><Link to="/fresh-roll" />Фреш роллы</li>
                <li><Link to="/maki" />Маки</li>
                <li><Link to="/sushi" />Суши</li>
            </ul>
            <ul>
                <li><Link to="/bowls" />Чаши</li>
                <li><Link to="/chirashi-sashimi" />Чираши И Сашими</li>
                <li><Link to="/tartar-sevich" />Тартар и Севич</li>
                <li><Link to="/yakitory-tempura-ramen-carry" />Якитори, Темпура, Рамён и Карри</li>
            </ul>
            <ul>
                <li><Link to="/kids-menu" />ДЕТСКОЕ МЕНЮ</li>
                <li><Link to="/accompaniment" />Аккомпанемент</li>
                <li><Link to="/dessert" />Десерты</li>
                <li><Link to="/drinkables" />Напитки</li>
            </ul>
        </nav >
    )
}
