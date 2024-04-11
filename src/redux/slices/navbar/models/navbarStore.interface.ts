import { useNavbarActions, useNavbarGetters } from "../navbar.store"

export interface NavbarStore {
    actions: ReturnType<typeof useNavbarActions>
    getters: ReturnType<typeof useNavbarGetters>
}