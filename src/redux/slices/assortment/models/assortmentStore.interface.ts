import { type useAssortmentActions, type useAssortmentGetters } from "../assortment.store"

export interface AssortmentStore {
    actions: ReturnType<typeof useAssortmentActions>
    getters: ReturnType<typeof useAssortmentGetters>
}