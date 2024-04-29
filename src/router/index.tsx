import { lazy, ReactElement, Suspense, useEffect, useLayoutEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ForgotPasswordForm from '../componenst/ForgotPasswordForm';
import { LoadingWarning } from '../componenst';
import { FIREBASE_AUTH } from '../firebase';
import { useAppStore } from '../redux/store';

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
const Signin = lazy(() => import(/* webpackChunkName: "Signin" */ '../pages/Signin'));
const Signup = lazy(() => import(/* webpackChunkName: "Signup" */ '../pages/Signup'));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ '../pages/NotFound'));

type RedirectRouteProps = { path: string; element: ReactElement<any, any> };

const PrivateRoute = ({ path, element }: RedirectRouteProps) => {
  return FIREBASE_AUTH.currentUser ? element : <Navigate to={path} />;
};

const PublicRoute = ({ path, element }: RedirectRouteProps) => {
  return !FIREBASE_AUTH.currentUser ? element : <Navigate to={path} />;
};

export const AppRouter = () => {
  const {
    cartStore: {
      actions: { setDiscount },
    },
    userStore: {
      actions: { getUser },
    },
  } = useAppStore();

  useEffect(() => {
    if (!FIREBASE_AUTH.currentUser) {
      setDiscount();
      getUser();
    }
  }, [FIREBASE_AUTH.currentUser]);

  return (
    <Suspense fallback={<LoadingWarning />}>
      <Routes>
        {/* Общие страницы */}
        <Route path="" element={<Menu />} />
        <Route path="restaurants" element={<Restaurants />} />
        <Route path="loyalty" element={<Loyalty />} />
        <Route path="course" element={<ServiceCourse />} />
        <Route path="franchise" element={<Franchise />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
        {/* Только для авторизованных пользователей */}
        <Route path="profile" element={<PrivateRoute path={'/signin'} element={<Profile />} />} />
        {/* Только при отсутствии авторизации */}
        <Route path="signin" element={<PublicRoute path={'/'} element={<Signin />} />} />
        <Route path="signup" element={<PublicRoute path={'/'} element={<Signup />} />} />
        <Route
          path="forgot-password"
          element={<PublicRoute path={'/'} element={<ForgotPasswordForm />} />}
        />
      </Routes>
    </Suspense>
  );
};
