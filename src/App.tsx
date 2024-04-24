import React from 'react';
import MainLayout from './layouts/MainLayout';
import { useAppStore } from './redux/store';
import { AppRouter } from './router';

const App: React.FC = () => {
  const {
    cartStore: {
      actions: { setDiscount },
    },
    userStore: {
      actions: { getUser },
    },
  } = useAppStore();

  React.useEffect(() => {
    let uid = localStorage.getItem('uid');
    if (uid) {
      setDiscount();
      getUser();
    } else {
    }
  }, []);

  return (
    <MainLayout>
      <AppRouter />
    </MainLayout>
  );
};

export default App;
