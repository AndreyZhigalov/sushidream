import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { navbarSlice } from "./navbar.slice";


export const useNavbarActions = () => {
    const dispatch = useAppDispatch()
    const { openNavbar } = navbarSlice.actions
    return {
        openNavbar: (isOpened: boolean) => dispatch(openNavbar(isOpened))
    }
}

export const useNavbarGetters = () => useAppSelector(state => state.navbar)