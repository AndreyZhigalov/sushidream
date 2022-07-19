import React from 'react'
import AppContext from '../../Context'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo-primary.svg'

import styles from "./PagesNavigation.module.scss"

export const PagesNavigation = () => {

    const { setIsOpened, isOpened } = React.useContext(AppContext)

    return (
        <div className={`${styles.menu} ${isOpened ? styles.openMenu : ""}`}>
            <img src={logo} alt="Логотип" className="logo" />
            <Link to="" onClick={() => setIsOpened(false)}>
                МЕНЮ
            </Link>
            <Link to="restaurants" onClick={() => setIsOpened(false)}>
                РЕСТОРАНЫ
            </Link>
            <Link to="loyalty" onClick={() => setIsOpened(false)}>
                ПРОГРАММА ЛОЯЛЬНОСТИ
            </Link>
            <Link to="course" onClick={() => setIsOpened(false)}>
                КУРС ПО ПОДАЧЕ БЛЮД
            </Link>
            <Link to="franchise" onClick={() => setIsOpened(false)}>
                ФРАНШИЗА
            </Link>
        </div>
    )
}
