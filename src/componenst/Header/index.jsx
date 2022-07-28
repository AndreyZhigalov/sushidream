import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { openNavbar } from "../../redux/slices/navbarSlice"

import cart from '../../assets/icons/cart.svg'
import menu from '../../assets/icons/menu.svg'
import user from '../../assets/icons/user.svg'
import logo from '../../assets/logo-primary.svg'

import styles from "./Header.module.scss"

export const Header = () => {
    const dispatch = useDispatch()
    const cartItemCount = useSelector(state => state.cart.count)

    return (
        <header>
            <div className={styles.logoContainer}>
                <Link to="./">
                    <img src={logo} alt="Логотип" className="logo" />
                    <h1 className={styles.companyName}>SUSH<span>i</span>DREAM</h1>
                </Link>
            </div>
            <div className={styles.headerLinks}>
                <Link to="cart">
                    <img src={cart} height={50} alt="корзина" />
                    <span>{cartItemCount ? cartItemCount : ""}
                    </span>
                </Link>
                <Link to="profile">
                    <img src={user} height={35} alt="профиль" />
                </Link>
                <img src={menu} height={35} onClick={() => dispatch(openNavbar(true))} alt="меню" />
            </div>
        </header>
    )
}
