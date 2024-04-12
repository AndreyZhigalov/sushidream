import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { navbarSlice } from "./navbar.slice";


export const useNavbarActions = () => {
    const dispatch = useAppDispatch()
    const { openNavbar, setInView } = navbarSlice.actions
    return {
        openNavbar: (isOpened: boolean) => dispatch(openNavbar(isOpened)),
        setInView: (inView: boolean) => dispatch(setInView(inView))
    }
}

export const useNavbarGetters = () => useAppSelector(state => state.navbar)