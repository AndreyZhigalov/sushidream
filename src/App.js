import React from 'react'
import axios from 'axios'

import { AssortmentCard } from './componenst/AssortmentCard';
import { CartItem } from './componenst/CartItem';
import { Header } from './componenst/Header';
import { MenuNavigation } from './componenst/MenuNavigation';

import styles from './scss/index.module.scss';

function App() {
  const [assortmentList, setAssortmentList] = React.useState([])
  const [activeCategory, setActiveCategory] = React.useState(0)
  const [cartItems, setCartItems] = React.useState([])

  console.log(cartItems)
  React.useEffect(() => {
    axios.get("https://62cf4dc5826a88972d0b9493.mockapi.io/assortment")
      .then(resp => setAssortmentList(resp.data))
  }, [])

  const addToCart = (item) => {
    if (cartItems.find(obj => obj.id === item.id)) {
      setCartItems(prev => prev.map((obj) => { return obj.id === item.id ? { ...obj, count: obj.count += 1 } : { ...obj } }))
    } else {
      setCartItems(prev => [...prev, item])
    }
    // return event.currentTarget.value === "-" ? setItemCount(itemCount - 1) : setItemCount(itemCount + 1)
  }
  const removeFromCart = (item) => {
    item.count < 1 ?
      setCartItems(prev => prev.filter(obj => obj.id !== item.id)) :
      setCartItems(prev => prev.map((obj) => { return obj.id === item.id ? { ...obj, count: obj.count -= 1 } : { ...obj } }));
  }

  const showAssortmentList = (index) => {
    return assortmentList[0][index].map(item => <AssortmentCard key={item.id} {...item} addToCart={() => addToCart(item)} />)
  }

  return (
    <div className={styles.wrapper}>
      <Header />
      <section className={styles.mainContainer}>
        <div>
          <img className={styles.banner} src="img/assort/desserts/webbanner.jpg" alt="banner" />
        </div>
        <div className={styles.catalogWrapper}>
          <MenuNavigation
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            renderList={showAssortmentList} />
          <div className={styles.assortment} >
            {assortmentList.length > 0 ? showAssortmentList(activeCategory) : ""}
          </div>
          <div className={styles.check}>
            <h2>ВАШ ЗАКАЗ</h2>
            <div className={styles.itemsBlock}>
              {cartItems.length > 0 ?
                cartItems.map(item => <CartItem {...item} addToCart={() => addToCart(item)} removeFromCart={() => removeFromCart(item)} />) : ""}
            </div>
            <div className={styles.total}>
              <p>доставка <span>200</span></p>
              <p>ИТОГО <span>{cartItems.reduce((sum, obj) => sum + obj.price * obj.count, 0).toFixed(2)}</span></p>
            </div>
            <button className={styles.orderButton}>Оформить доставку</button>
          </div>
        </div>
      </section >
    </div >
  );
}

export default App;
