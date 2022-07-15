import React from 'react'
import axios from 'axios'

import { AssortmentCard } from './componenst/AssortmentCard';
import { Header } from './componenst/Header';
import { MenuNavigation } from './componenst/MenuNavigation';
import { Check } from './componenst/Check';
import { LoadingCard } from './componenst/LoadingCard';
import { Sort } from './componenst/Sort';

import styles from './scss/index.module.scss';


function App() {
  const [assortmentList, setAssortmentList] = React.useState([])
  const [activeCategory, setActiveCategory] = React.useState("Новинки")
  const [cartItems, setCartItems] = React.useState([])
  const [deliveryCost, setDeliveryCost] = React.useState(0)

  React.useEffect(() => {
    axios.get("https://62d0992b1cc14f8c088c5ec1.mockapi.io/assortment")
      .then(resp => setAssortmentList(resp.data))
  }, [])

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

  const deliveryRegionCost = (event) => {
    const index = event.currentTarget.value
    const costs = [0, 200, 400, 600]
    setDeliveryCost(costs[index])
  }

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.mainContainer}>
        <div>
          <img className={styles.banner} src="img/assort/desserts/webbanner.jpg" alt="banner" />
        </div>
        <div className={styles.catalogWrapper}>
          <select onChange={deliveryRegionCost} className={styles.deliveryRegion} >
            <option value="0">ВЫБЕРИТЕ РЕГИОН ДОСТАВКИ</option>
            <option value="0">Самовывоз - 0&#x20bd;</option>
            <option value="1">Близко - 200&#x20bd;</option>
            <option value="2">Средне - 400&#x20bd;</option>
            <option value="3">Далеко - 600&#x20bd;</option>
          </select>
          <MenuNavigation
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <div className={styles.assortment} >
            <Sort />
            {assortmentList.length > 0 ?
              assortmentList[0][activeCategory].map(item =>
                <AssortmentCard key={item.id} {...item} addToCart={() => addToCart(item)} />) :
              [...Array(6)].map((item, i) => <LoadingCard key={i} />)}
          </div>
          <Check
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            deliveryCost={deliveryCost}
            cartItems={cartItems} />
        </div>
      </main>
    </div >
  );
}

export default App;






