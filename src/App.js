import React from 'react'
import { AssortmentCard } from './componenst/AssortmentCard';
import { CartItem } from './componenst/CartItem';

import { Header } from './componenst/Header';
import { MenuNavigation } from './componenst/MenuNavigation';

import styles from './scss/index.module.scss';

function App() {
  const [itemCount, setItemCount] = React.useState(0)

  const addToCart = (event) => {
    return event.currentTarget.value === "-" ? setItemCount(itemCount - 1) : setItemCount(itemCount + 1)
  }

  return (
    <div className={styles.wrapper}>
      <Header />
      <section className={styles.mainContainer}>
        <div>
          <img className={styles.banner} src="img/assort/desserts/webbanner.jpg" alt="banner" />
        </div>
        <div className={styles.catalogWrapper}>
          <MenuNavigation />
          <div className={styles.assortment} >
            <AssortmentCard title={"Обычный чизкейк"} price={5.50} addToCart={addToCart} />
            <AssortmentCard title={"Обычный чизкейк, но пиздатый"} price={15} addToCart={addToCart} />
            <AssortmentCard title={"Обычный чизкейк, но ещё пизже чем другие"} price={20.90} addToCart={addToCart} />
            <AssortmentCard title={"Обычный чизкейк"} price={5.50} addToCart={addToCart} />
            <AssortmentCard title={"Обычный чизкейк, но пиздатый"} price={15} addToCart={addToCart} />
            <AssortmentCard title={"Обычный чизкейк, но ещё пизже чем другие"} price={20.90} addToCart={addToCart} />
            <AssortmentCard title={"Обычный чизкейк"} price={5.50} addToCart={addToCart} />
            <AssortmentCard title={"Обычный чизкейк, но пиздатый"} price={15} addToCart={addToCart} />

          </div>
          <div className={styles.check}>
            <h2>ВАШ ЗАКАЗ</h2>
            <div className={styles.itemsBlock}>
              <CartItem itemCount={itemCount} addToCart={addToCart} />
            </div>
            <div className={styles.total}>
              <p>доставка <span>200</span></p>
              <p>ИТОГО <span>200</span></p>
            </div>
            <button className={styles.orderButton}>Оформить доставку</button>
          </div>
        </div>
      </section >
    </div >
  );
}

export default App;
