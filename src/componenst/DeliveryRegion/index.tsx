import React from 'react';
import { FetchStatus } from '../../models';
import { useAppStore } from '../../redux/store';

import styles from './DeliveryRegion.module.scss';

export const DeliveryRegion: React.FC = () => {
  const [visibility, setVisibility] = React.useState(false);
  const { orderStore, deliveryStore } = useAppStore()
  const { regions, currentRegion } = deliveryStore.getters;
  const { setDeliveryCost } = deliveryStore.actions;
  const { status } = orderStore.getters;
  const { setOrderStatus } = orderStore.actions;
  const deliveryRef = React.useRef<HTMLDivElement>(null);

  const delivery_regionCost = (i: number) => {
    setVisibility(!visibility);
    setDeliveryCost(i);
    if (status === FetchStatus.SUCCESS) {
      setOrderStatus(FetchStatus.WAITING);
    }
  };

  React.useEffect(() => {
    const handleClickDelivery = (event: MouseEvent) => {
      if (deliveryRef.current && !event.composedPath().includes(deliveryRef.current))
        setVisibility(false);
    };
    document.body.addEventListener('click', handleClickDelivery);
    return () => document.body.removeEventListener('click', handleClickDelivery);
  }, []);

  return (
    <div
      ref={deliveryRef}
      onClick={() => setVisibility(!visibility)}
      className={styles.region}>
      {currentRegion.length > 28 ? currentRegion.slice(0, 25) + "..." : currentRegion || 'ВЫБЕРИТЕ РЕСТОРАН ДОСТАВКИ'}
      <svg
        onClick={() => setVisibility(!visibility)}
        width="15"
        height="10"
        viewBox={'0 0 30 21'}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 19L15 4L27.5 19" stroke="white" strokeWidth="4" strokeLinecap="round" />
      </svg>
      {visibility && (
        <div className={styles.list}>
          {regions.map((type, i: number) => (
            <p
              onClick={() => delivery_regionCost(i)}
              className={`${styles.option} ${currentRegion === type ? styles.active : ""}`}
              key={i}>
              {type}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
