import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoadingWarning } from './componenst/';

import MainLayout from './layouts/MainLayout';

const Menu = React.lazy(() => import(/* webpackChunkName: "Menu" */ './pages/Menu'));
const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const Restaurants = React.lazy(
  () => import(/* webpackChunkName: "Restaurants" */ './pages/Restaurants'),
);
const Loyalty = React.lazy(() => import(/* webpackChunkName: "Loyalty" */ './pages/Loyalty'));
const ServiceCourse = React.lazy(
  () => import(/* webpackChunkName: "ServiceCourse" */ './pages/ServiceCourse'),
);
const Franchise = React.lazy(() => import(/* webpackChunkName: "Franchise" */ './pages/Franchise'));
const Profile = React.lazy(() => import(/* webpackChunkName: "Profile" */ './pages/Profile'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

const App: React.FC = () => {
  return (
    <Suspense fallback={<LoadingWarning />}>
      <Routes>
        <Route path="sushidream" element={<MainLayout />}>
          <Route path="" element={<Menu />} />
          <Route path="restaurants" element={<Restaurants />} />
          <Route path="loyalty" element={<Loyalty />} />
          <Route path="course" element={<ServiceCourse />} />
          <Route path="franchise" element={<Franchise />} />
          <Route path="cart" element={<Cart />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
