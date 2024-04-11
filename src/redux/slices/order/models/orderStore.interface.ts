import { useOrderActions, useOrderGetters } from "../order.store";

export interface OrderStore {
    actions: ReturnType<typeof useOrderActions>,
    getters: ReturnType<typeof useOrderGetters>,
}