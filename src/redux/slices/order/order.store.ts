import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { FetchStatus } from "../../../models";
import { OrderService } from "./order.service";
import { orderSlice } from "./order.slice";

export const useOrderActions = () => {
    const dispatch = useAppDispatch()
    const { setOrderStatus } = orderSlice.actions
    const orderService = new OrderService()
    return {
        setOrderStatus: (status: FetchStatus) => dispatch(setOrderStatus(status)),
        getOrder: () => dispatch(orderService.getOrder())
    }
}
export const useOrderGetters = () => useAppSelector(state => state.order)