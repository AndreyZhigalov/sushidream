import deliveryBoy from '../../../assets/icons/deliveryBoyColor.svg';
import ordered from '../../../assets/icons/ordered.svg';
import { useAppStore } from '../../../redux/store';

import styles from './OrderedWarning.module.scss';


export const OrderedWarning: React.FC = () => {
  const { deliveryStore, orderStore } = useAppStore()
  const { orderId } = orderStore.getters;
  const { currentRegion } = deliveryStore.getters;

  if (currentRegion === 'Самовывоз') {
    return (
      <div className={styles.ordered}>
        <p>
          <img src={ordered} alt="Внимание" />
          {`Ваш заказ №${orderId} оформлен!`}
          <br />
          Мы оповестим вас о готовности через СМС.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.ordered}>
      <img src={deliveryBoy} alt="Внимание" />
      <p>
        {`Доставка заказа №${orderId}\n оформлена!`}
        <br />
        Скоро с вами свяжется курьер.
      </p>
    </div>
  );
};
