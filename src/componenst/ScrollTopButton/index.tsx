import React from 'react';

import arrow from '../../assets/icons/ArrowHead.svg';

import styles from './ScrollTopButton.module.scss';

const ScrollTopButton: React.FC<{isShown: boolean}> = ({ isShown }) => {
  return (
    <div
      className={`${styles.scroll_top_button} ${isShown && styles.show}`}
      onClick={() => window.scrollTo(0, 0)}>
      <img src={arrow} alt="К началу страницы" />
    </div>
  );
};

export default ScrollTopButton;
