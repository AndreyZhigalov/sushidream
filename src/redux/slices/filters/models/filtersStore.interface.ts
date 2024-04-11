import { useFiltersActions, useFiltersGetters } from "../filters.store";

export interface FiltersStore {
    actions: ReturnType<typeof useFiltersActions>,
    getters: ReturnType<typeof useFiltersGetters>
}