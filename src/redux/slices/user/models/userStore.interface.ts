import { useUserActions, useUserGetters } from "../user.store";

export interface UserStore {
    actions: ReturnType<typeof useUserActions>,
    getters: ReturnType<typeof useUserGetters>,
}