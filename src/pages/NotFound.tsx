import React from 'react';

import notFoundImage from '../assets/notFound.svg';

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
      <img
        src={notFoundImage}
        alt="Page is not found"
        style={{
          height: '200px',
        }}
      />
      <h1>СТРАНИЦА НЕ НАЙДЕНА</h1>
    </div>
  );
};
export default NotFound;
