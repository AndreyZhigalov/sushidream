import { AssortmentStore } from "../slices/assortment";
import { CartStore } from "../slices/cart/models/cartStore.interface";
import { DeliveryStore } from "../slices/delivery";
import { FiltersStore } from "../slices/filters";
import { NavbarStore } from "../slices/navbar";
import { OrderStore } from "../slices/order";
import { UserStore } from "../slices/user/models/userStore.interface";

export interface RootStore {
    assortmentStore: AssortmentStore,
    cartStore: CartStore,
    deliveryStore: DeliveryStore,
    filtersStore: FiltersStore,
    navbarStore: NavbarStore,
    orderStore: OrderStore,
    userStore: UserStore,
}