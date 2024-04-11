import { useModalActions, useModalGetters } from "../modal.store";

export interface ModalStore {
    actions: ReturnType<typeof useModalActions>,
    getters: ReturnType<typeof useModalGetters>,
}