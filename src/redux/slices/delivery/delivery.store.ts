import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { DeliveryService } from "./delivery.service";
import { deliverySlice } from "./delivery.slice";

export const useDeliveryActions = () => {
    const dispatch = useAppDispatch()
    const { setDeliveryCost, clearDelivery, fetchRegion } = deliverySlice.actions
    const { getAddresses } = new DeliveryService()
    return {
        setDeliveryCost: (cost: number) => dispatch(setDeliveryCost(cost)),
        clearDelivery: () => dispatch(clearDelivery()),
        fetchRegion: () => dispatch(fetchRegion()),
        getAddresses: () => dispatch(getAddresses())
    }
}

export const useDeliveryGetters = () => useAppSelector(state => state.delivery)