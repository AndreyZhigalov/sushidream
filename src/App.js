import React from 'react'

import { Link, Route, Routes } from 'react-router-dom'
import { Header } from './componenst/Header';
import logo from './assets/logo-primary.svg'
import { Menu } from './pages/Menu';

import styles from './scss/index.module.scss';
import { Restaurants } from './pages/Restaurants';
import { Loyalty } from './pages/Loyalty';
import { ServiceCourse } from './pages/ServiceCourse';
import { Franchise } from './pages/Franchise';
import { Cart } from './pages/Cart';
import { Profile } from './pages/Profile';

function App() {

  const [isOpened, setIsOpened] = React.useState(false)

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.menu} ${isOpened ? styles.openMenu : ""}`}>
        <img src={logo} alt="Логотип" className="logo" />
        <Link to="" onClick={() => setIsOpened(false)}>МЕНЮ</Link>
        <Link to="restaurants" onClick={() => setIsOpened(false)}>РЕСТОРАНЫ</Link>
        <Link to="loyalty" onClick={() => setIsOpened(false)}>ПРОГРАММА ЛОЯЛЬНОСТИ</Link>
        <Link to="service-course" onClick={() => setIsOpened(false)}>КУРС ПО ПОДАЧЕ БЛЮД</Link>
        <Link to="franchise" onClick={() => setIsOpened(false)}>ФРАНШИЗА</Link>
      </div>
      <Header openMenu={() => setIsOpened(true)} />
      <main className={styles.mainContainer}>
        <Routes>
          <Route path='' element={<Menu />} />
          <Route path='restaurants' element={<Restaurants />} />
          <Route path='loyalty' element={<Loyalty />} />
          <Route path='service-course' element={<ServiceCourse />} />
          <Route path='franchise' element={<Franchise />} />
          <Route path='cart' element={<Cart />} />
          <Route path='profile' element={<Profile />} />
          <Route path='*' element={<h1>404</h1>} />
        </Routes>
      </main>
    </div >

  );
}

export default App;






