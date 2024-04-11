import { useDeliveryActions, useDeliveryGetters } from "../delivery.store"

export interface DeliveryStore {
  actions: ReturnType<typeof useDeliveryActions>
  getters: ReturnType<typeof useDeliveryGetters>
}
