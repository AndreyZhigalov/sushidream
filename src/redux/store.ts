import { configureStore } from '@reduxjs/toolkit';
import cart from './slices/cartSlice';
import assortment from './slices/assortmentSlice';
import filters from './slices/filtersSlice';
import delivery from './slices/deliverySlice';
import navbar from './slices/navbarSlice';
import user from './slices/userSlice';

export const store = configureStore({
  reducer: {
    cart,
    assortment,
    filters,
    delivery,
    navbar,
    user,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
