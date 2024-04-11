import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { modalSlice } from "./modal.slice"

type confirmAlertPayload = {
    message: string;
    type: string;
    removeID?: number | undefined;
}

export const useModalActions = () => {
    const dispatch = useAppDispatch()
    const { setAlert, closeAlert, confirmAlert, toggleTerms, showGetPhone } = modalSlice.actions
    return {
        setAlert: (message: string) => dispatch(setAlert(message)),
        closeAlert: () => dispatch(closeAlert()),
        confirmAlert: (payload: confirmAlertPayload) => dispatch(confirmAlert(payload)),
        toggleTerms: () => dispatch(toggleTerms()),
        showGetPhone: () => dispatch(showGetPhone())
    }
}

export const useModalGetters = () => useAppSelector(state => state.modal)