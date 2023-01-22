import { configureStore } from '@reduxjs/toolkit';
import cart from './slices/cartSlice';
import assortmentSlice from './slices/assortmentSlice';
import filters from './slices/filtersSlice';
import delivery from './slices/deliverySlice';
import navbar from './slices/navbarSlice';
import user from './slices/userSlice';
import modals from './slices/modalWindowSlice';

export const store = configureStore({
  reducer: {
    cart,
    assortmentSlice,
    filters,
    delivery,
    navbar,
    user,
    modals,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
