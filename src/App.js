import React from 'react'

import { Route, Routes } from 'react-router-dom'
import { Header } from './componenst/Header';
import { Menu } from './pages/Menu';

import styles from './scss/index.module.scss';
import { Restaurants } from './pages/Restaurants';
import { Loyalty } from './pages/Loyalty';
import { ServiceCourse } from './pages/ServiceCourse';
import { Franchise } from './pages/Franchise';
import { Cart } from './pages/Cart';
import { Profile } from './pages/Profile';
import { PagesNavigation } from './componenst/PagesNavigation';
import AppContext from './Context';


function App() {

  const [isOpened, setIsOpened] = React.useState(false)
  const [cartItemCount, setCartItemCount] = React.useState(0)
  const [cartItems, setCartItems] = React.useState([])
  const [deliveryCost, setDeliveryCost] = React.useState(0)

  const addToCart = (item) => {
    if (cartItems.find(obj => obj.id === item.id)) {
      setCartItems(prev => prev.map((obj) => { return obj.id === item.id ? { ...obj, count: obj.count += 1 } : { ...obj } }))
    } else {
      setCartItems(prev => [...prev, item])
    }
  }

  const removeFromCart = (item) => {
    item.count === 1 ?
      setCartItems(prev => prev.filter(obj => obj.id !== item.id)) :
      setCartItems(prev => prev.map((obj) => { return obj.id === item.id ? { ...obj, count: obj.count -= 1 } : { ...obj } }));
  }

  React.useEffect(() => {
    let result = cartItems.reduce((sum, obj) => sum + obj.count, 0)
    setCartItemCount(result)
  }, [cartItems])

  return (
    <div className={styles.wrapper}>
      <AppContext.Provider value={
        {
          isOpened, setIsOpened, cartItemCount, setCartItemCount, cartItems, setCartItems,
          deliveryCost, setDeliveryCost, addToCart, removeFromCart
        }
      }>
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
      </AppContext.Provider>
    </div >
  );
}

export default App;






