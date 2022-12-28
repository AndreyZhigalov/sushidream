import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoadingWarning } from './componenst/';
import { useAppDispatch } from './Hooks/hooks';

import MainLayout from './layouts/MainLayout';
import { getuser_data } from './redux/slices/userSlice';

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
const UserPage = React.lazy(
  () => import(/* webpackChunkName: "UserPage" */ './pages/Profile/UserPage'),
);
const AuthForm = React.lazy(
  () => import(/* webpackChunkName: "AuthForm" */ './componenst/AuthForm'),
);
const RegisterForm = React.lazy(
  () => import(/* webpackChunkName: "RegisterForm" */ './componenst/RegisterForm'),
);
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    let email = localStorage.getItem("email")
    if(email) {
      dispatch(getuser_data());
    }
  },[])
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
          <Route path="profile" element={<Profile />}>
            <Route path="" element={<UserPage />} />
            <Route path="auth" element={<AuthForm />} />
            <Route path="signup" element={<RegisterForm />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
