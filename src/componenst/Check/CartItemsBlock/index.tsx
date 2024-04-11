import { CartItem } from '../CartItem';
import { EmptyCartWarning } from '../EmptyCartWarning';
import { OrderedWarning } from '../OrderedWarning';
import { FetchStatus } from '../../../models';
import { useAppStore } from '../../../redux/store';

import styles from './CartItemsBlock.module.scss';

export const CartItemsBlock: React.FC = () => {
  const { cartStore: { getters: { cartItems } }, orderStore: { getters: { status } } } = useAppStore()

  return (
    <div className={styles.items_block}>
      {cartItems.length > 0 ? (
        cartItems.map((item: any) => <CartItem item={item} key={item.id} />)
      ) : status === FetchStatus.SUCCESS ? (
        <OrderedWarning />
      ) : (
        <EmptyCartWarning />
      )}
    </div>
  );
};
