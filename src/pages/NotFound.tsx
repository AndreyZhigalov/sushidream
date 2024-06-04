import React from 'react';

import NotFoundImage from '../assets/notFound.svg?react';

const NotFound: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '24px',
        textAlign: 'center',
        margin: '20px',
      }}>
      <NotFoundImage width={200} />
      <h1>СТРАНИЦА НЕ НАЙДЕНА</h1>
    </div>
  );
};
export default NotFound;
