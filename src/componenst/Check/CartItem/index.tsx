import { FetchStatus } from '../../../models';
import { useAppStore } from '../../../redux/store';
import { AssortmentItem } from '../../../redux/slices/assortment';

import styles from './CartItem.module.scss';

export const CartItem: React.FC<{ item: AssortmentItem }> = ({ item }) => {
  const { cartStore, modalStore, orderStore } = useAppStore()

  const { removeFromCart, addToCart } = cartStore.actions
  const { confirmAlert } = modalStore.actions
  const { setOrderStatus } = orderStore.actions

  const onRemoveClick = () => {
    item.count > 1
      ? removeFromCart(item.id)
      :
      confirmAlert({
        message: `Удалить ${item.title} из корзины?`,
        type: 'remove',
        removeID: item.id,
      })
      ;
  };
  const onAddClick = () => {
    addToCart(item);
    setOrderStatus(FetchStatus.WAITING);
  };

  return (
    <div className={styles.cart_item}>
      <img src={item.dishPhoto} alt="товар" />
      <p>
        {item.count} x {item.title}
      </p>
      <span>{item.price * item.count}&#x20bd;</span>
      <div className={styles.item_count}>
        <button onClick={onRemoveClick}>-</button>
        <span>{item.count}</span>
        <button onClick={onAddClick}>+</button>
      </div>
    </div>
  );
};
