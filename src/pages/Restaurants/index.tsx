import React, { useState } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

import star from '../../assets/icons/star.svg';
import restaurants from "../../assets/restaurants.json"

import styles from './Restaurants.module.scss';

const Restaurants: React.FC = () => {
  const [coordinates, setCoordinates] = useState([55.740498, 37.640752]);
  const zoom = 17;

  return (
    <div className={styles.restaurants}>
      <ul className={styles.addressies}>
        {restaurants.map((rest) => (
          <li
            key={rest.coordinate[0]}
            className={styles.address_card}
            onClick={() => setCoordinates(rest.coordinate)}>
            <h3 className={styles.title}>{rest.title}</h3>
            <p className={styles.address}>Адрес: {`${rest.street}, ${rest.city}`}</p>
            <span className={styles.rating}>
              <img src={star} alt="" />
              <div>{rest.rating}</div>
            </span>
            <span className={styles.workingTime}>
              {`с ${rest.workingTime[0]} до ${rest.workingTime[1]}`}
            </span>
          </li>
        ))}
      </ul>
      <YMaps>
        <Map
          className={styles.map_wrapper}
          defaultState={{ center: [55.740498, 37.640752], zoom}}
          state={{ center: coordinates, zoom}}>
          <Placemark geometry={coordinates} />
        </Map>
      </YMaps>
    </div>
  );
};
export default Restaurants;
