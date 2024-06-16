import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { LoadingWarning } from '../componenst';
import { FIREBASE_AUTH } from '../firebase';
import { useCartActions } from '../redux/slices/cart';
import { useUserActions } from '../redux/slices/user/user.store';
import { ROUTES } from '../constants/routes';

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
const ForgotPassword = lazy(
  () => import(/* webpackChunkName: "Signin" */ '../pages/ForgotPassword'),
);
const Signup = lazy(() => import(/* webpackChunkName: "Signup" */ '../pages/Signup'));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ '../pages/NotFound'));

// eslint-disable-next-line @typescript-eslint/no-explicit-any

const PrivateRoute = ({ path }: { path: string }) => {
  return FIREBASE_AUTH.currentUser ? <Outlet /> : <Navigate to={path} />;
};

const ProtectedRoute = ({ path }: { path: string }) => {
  return !FIREBASE_AUTH.currentUser ? <Outlet /> : <Navigate to={path} />;
};

export const AppRouter = () => {
  const { setDiscount } = useCartActions();
  const { getUser } = useUserActions();

  useEffect(() => {
    if (!FIREBASE_AUTH.currentUser) {
      getUser();
    } else {
      setDiscount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [FIREBASE_AUTH.currentUser]);

  return (
    <Suspense fallback={<LoadingWarning />}>
      <Routes>
        <Route path={`${ROUTES.base}`}>
          <Route path={`${ROUTES.base}${ROUTES.main}`} element={<Menu />} />
          <Route path={`${ROUTES.base}${ROUTES.restaurants}`} element={<Restaurants />} />
          <Route path={`${ROUTES.base}${ROUTES.loyalty}`} element={<Loyalty />} />
          <Route path={`${ROUTES.base}${ROUTES.course}`} element={<ServiceCourse />} />
          <Route path={`${ROUTES.base}${ROUTES.franchise}`} element={<Franchise />} />
          <Route path={`${ROUTES.base}${ROUTES.cart}`} element={<Cart />} />
          <Route path="*" element={<NotFound />} />

          <Route element={<PrivateRoute path={`${ROUTES.base}${ROUTES.signin}`} />}>
            <Route path={`${ROUTES.base}${ROUTES.profile}`} element={<Profile />} />
          </Route>

          <Route element={<ProtectedRoute path={`${ROUTES.base}${ROUTES.main}`} />}>
            <Route path={`${ROUTES.base}${ROUTES.signin}`} element={<Signin />} />
            <Route path={`${ROUTES.base}${ROUTES.signup}`} element={<Signup />} />
            <Route path={`${ROUTES.base}${ROUTES.forgotPassword}`} element={<ForgotPassword />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};
