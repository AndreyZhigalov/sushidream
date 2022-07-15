import React from 'react'

import { CartIcon, MenuIcon, UserIcon } from '../HeaderIcons';

import styles from "./Header.module.scss"

export const Header = (props) => {
    return (
        <header>
            <div className={styles.logoContainer}>
                <img src="logo-primary.svg" alt="logo" className="logo" />
                <h1 className={styles.companyName}>SUSH<span>i</span>DREAM</h1>
            </div>
            <div className={styles.headerLinks}>
                <CartIcon />
                <UserIcon />
                <MenuIcon />
            </div>
        </header>
    )
}
