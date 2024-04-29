import React from 'react';
import MainLayout from './layouts/MainLayout';

import { AppRouter } from './router';

const App: React.FC = () => {
  return (
    <MainLayout>
      <AppRouter />
    </MainLayout>
  );
};

export default App;
