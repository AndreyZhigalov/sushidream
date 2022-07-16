import React from 'react'
import { Link } from 'react-router-dom'

import cart from '../../assets/icons/cart.svg'
import menu from '../../assets/icons/menu.svg'
import user from '../../assets/icons/user.svg'
import logo from '../../assets/logo-primary.svg'

import styles from "./Header.module.scss"

export const Header = ({ openMenu }) => {
    return (
        <header>
            <div className={styles.logoContainer}>
                <img src={logo} alt="Логотип" className="logo" />
                <h1 className={styles.companyName}>SUSH<span>i</span>DREAM</h1>
            </div>
            <div className={styles.headerLinks}>
                <Link to="cart"><img src={cart} height={50} alt="корзина" /></Link>
                <Link to="profile"><img src={user} height={35} alt="профиль" /></Link>
                <img src={menu} height={35} onClick={openMenu} alt="меню" />
            </div>
        </header>
    )
}
