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

function App() {

  return (
    <div className={styles.wrapper}>
      <PagesNavigation />
      <Header />
      <main className={styles.mainContainer}>
        <Routes>
          <Route path='' element={<Menu />} />
          <Route path='restaurants' element={<Restaurants />} />
          <Route path='loyalty' element={<Loyalty />} />
          <Route path='course' element={<ServiceCourse />} />
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






