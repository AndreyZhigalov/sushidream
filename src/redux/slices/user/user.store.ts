import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks"
import { AuthUserData } from "../../../models"
import { UserService } from "./user.service"
import { userSlice } from "./user.slice"

export const useUserActions = () => {
    const dispatch = useAppDispatch()
    const { setUserData, removeUserData, setPhone } = userSlice.actions
    const { fetchUserData } = new UserService()
    return {
        setUserData: (userData: AuthUserData) => dispatch(setUserData(userData)),
        removeUserData: () => dispatch(removeUserData()),
        setPhone: (phoneNumber: string) => dispatch(setPhone(phoneNumber)),
        fetchUserData: (uid: string) => dispatch(fetchUserData(uid))
    }
}
export const useUserGetters = () => useAppSelector(state => state.user)