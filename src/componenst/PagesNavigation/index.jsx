import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { openNavbar } from "../../redux/slices/navbarSlice"
import { Link } from 'react-router-dom'

import logo from '../../assets/logo-primary.svg'

import styles from "./PagesNavigation.module.scss"

export const PagesNavigation = () => {
    const dispatch = useDispatch()
    const isOpened = useSelector(state => state.navbar.isOpened)

    return (
        <div className={`${styles.menu} ${isOpened ? styles.openMenu : ""}`}>
            <img src={logo} alt="Логотип" className="logo" />
            <Link to="" onClick={() => dispatch(openNavbar(false))}>
                МЕНЮ
            </Link>
            <Link to="restaurants" onClick={() => dispatch(openNavbar(false))}>
                РЕСТОРАНЫ
            </Link>
            <Link to="loyalty" onClick={() => dispatch(openNavbar(false))}>
                ПРОГРАММА ЛОЯЛЬНОСТИ
            </Link>
            <Link to="course" onClick={() => dispatch(openNavbar(false))}>
                КУРС ПО ПОДАЧЕ БЛЮД
            </Link>
            <Link to="franchise" onClick={() => dispatch(openNavbar(false))}>
                ФРАНШИЗА
            </Link>
        </div>
    )
}
