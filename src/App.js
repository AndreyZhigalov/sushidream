import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Header } from './componenst/Header';
import { Menu } from './pages/Menu';
import { Restaurants } from './pages/Restaurants';
import { Loyalty } from './pages/Loyalty';
import { ServiceCourse } from './pages/ServiceCourse';
import { Franchise } from './pages/Franchise';
import { Cart } from './pages/Cart';
import { Profile } from './pages/Profile';
import { PagesNavigation } from './componenst/PagesNavigation';


import styles from './scss/index.module.scss';
import { NotFound } from './pages/NotFound';

function App() {

  return (
    <div className={styles.wrapper}>
      <PagesNavigation />
      <Header />
      <main className={styles.mainContainer}>
        <Routes>
          <Route path='sushidream/' element={<Menu />} />
          <Route path='sushidream/restaurants' element={<Restaurants />} />
          <Route path='sushidream/loyalty' element={<Loyalty />} />
          <Route path='sushidream/course' element={<ServiceCourse />} />
          <Route path='sushidream/franchise' element={<Franchise />} />
          <Route path='sushidream/cart' element={<Cart />} />
          <Route path='sushidream/profile' element={<Profile />} />
          <Route path='sushidream/*' element={<NotFound />} />
        </Routes>
      </main>
    </div >
  );
}

export default App;






