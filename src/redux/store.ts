import { configureStore } from '@reduxjs/toolkit';
import { RootStore } from './models/rootStore.interface';
import { assortmentSlice, useAssortmentActions, useAssortmentGetters } from './slices/assortment';
import { cartSlice, useCartActions, useCartGetters } from './slices/cart';
import { deliverySlice, useDeliveryActions, useDeliveryGetters } from './slices/delivery';
import { filtersSlice, useFiltersActions, useFiltersGetters } from './slices/filters';
import { modalSlice, useModalActions, useModalGetters } from './slices/modal';
import { navbarSlice, useNavbarActions, useNavbarGetters } from './slices/navbar';
import { orderSlice, useOrderActions, useOrderGetters } from './slices/order';
import { useUserActions, useUserGetters } from './slices/user/user.store';
import { userSlice } from './slices/user';

export const store = configureStore({
  reducer: {
    assortment: assortmentSlice.reducer,
    cart: cartSlice.reducer,
    delivery: deliverySlice.reducer,
    filters: filtersSlice.reducer,
    modal: modalSlice.reducer,
    navbar: navbarSlice.reducer,
    order: orderSlice.reducer,
    user: userSlice.reducer
  },
});

export const useAppStore = (): RootStore => {
  return {
    assortmentStore: {
      actions: useAssortmentActions(),
      getters: useAssortmentGetters()
    },
    cartStore: {
      actions: useCartActions(),
      getters: useCartGetters()
    },
    deliveryStore: {
      actions: useDeliveryActions(),
      getters: useDeliveryGetters()
    },
    filtersStore: {
      actions: useFiltersActions(),
      getters: useFiltersGetters()
    },
    modalStore: {
      actions: useModalActions(),
      getters: useModalGetters()
    },
    navbarStore: {
      actions: useNavbarActions(),
      getters: useNavbarGetters()
    },
    orderStore: {
      actions: useOrderActions(),
      getters: useOrderGetters()
    },
    userStore: {
      actions: useUserActions(),
      getters: useUserGetters()
    },
  }
}


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
