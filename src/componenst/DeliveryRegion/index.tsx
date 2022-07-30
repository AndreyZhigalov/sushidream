import React from 'react';
import { useAppSelector, useAppDispatch } from '../../Hooks/hooks';
import { setDeliveryCost } from '../../redux/slices/deliverySlice';

import styles from './DeliveryRegion.module.scss';

export const DeliveryRegion: React.FC = () => {
  const [visibility, setVisibility] = React.useState(false);
  const dispatch = useAppDispatch();
  const { regions, currentRegion } = useAppSelector((state) => state.delivery);
  const deliveryRef = React.useRef<HTMLDivElement>(null);

  const deliveryRegionCost = (i: number) => {
    setVisibility(!visibility);
    dispatch(setDeliveryCost(i));
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
      className={styles.deliveryRegion}>
      {currentRegion || 'ВЫБЕРИТЕ ОБЛАСТЬ ДОСТАВКИ'}
      <svg
        onClick={() => setVisibility(!visibility)}
        width="15"
        height="10"
        viewBox={['0 0 30 21']}
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 19L15 4L27.5 19" stroke="white" strokeWidth="4" strokeLinecap="round" />
      </svg>
      {visibility && (
        <div className={styles.optionsList}>
          {regions.map((type, i: number) => (
            <p
              onClick={() => deliveryRegionCost(i)}
              className={currentRegion === type ? styles.active : ''}
              key={i}>
              {type}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
