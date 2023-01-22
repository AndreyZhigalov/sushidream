import React from 'react';

import closeIcon from '../../assets/icons/close.svg';

import styles from './CloseButton.module.scss';

const CloseButton: React.FC<{ handleClick: () => void }> = ({ handleClick }) => {
  return <img src={closeIcon} className={styles.close_button} onClick={handleClick} />;
};

export default CloseButton;
