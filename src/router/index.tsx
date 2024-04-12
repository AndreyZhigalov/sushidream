import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ForgotPasswordForm from '../componenst/ForgotPasswordForm';
import { LoadingWarning } from '../componenst';

const Menu = lazy(() => import(/* webpackChunkName: "Menu" */ '../pages/Menu'));
const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ '../pages/Cart'));
const Restaurants = lazy(
  () => import(/* webpackChunkName: "Restaurants" */ '../pages/Restaurants'),
);
const Loyalty = lazy(() => import(/* webpackChunkName: "Loyalty" */ '../pages/Loyalty'));
const ServiceCourse = lazy(
  () => import(/* webpackChunkName: "ServiceCourse" */ '../pages/ServiceCourse'),
);
const Franchise = lazy(() => import(/* webpackChunkName: "Franchise" */ '../pages/Franchise'));
const Profile = lazy(() => import(/* webpackChunkName: "Profile" */ '../pages/Profile'));
const UserPage = lazy(() => import(/* webpackChunkName: "UserPage" */ '../pages/UserPage'));
const AuthForm = lazy(() => import(/* webpackChunkName: "AuthForm" */ '../componenst/AuthForm'));
const RegisterForm = lazy(
  () => import(/* webpackChunkName: "RegisterForm" */ '../componenst/RegisterForm'),
);
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ '../pages/NotFound'));

export const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingWarning />}>
      <Routes>
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
          <Route path="forgot-password" element={<ForgotPasswordForm />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
