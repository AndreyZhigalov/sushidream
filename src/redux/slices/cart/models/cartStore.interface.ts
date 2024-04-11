import { useCartActions, useCartGetters } from "../cart.store";

export interface CartStore {
    actions: ReturnType<typeof useCartActions>,
    getters: ReturnType<typeof useCartGetters>
}