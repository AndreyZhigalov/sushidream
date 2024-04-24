import { UserInfo } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { AuthFormData, CreateAccountFormData } from '../../../models';
import { UserService } from './user.service';
import { userSlice } from './user.slice';

export const useUserActions = () => {
  const dispatch = useAppDispatch();
  const { setUserData, removeUserData, setPhone } = userSlice.actions;
  const { createUser, authUser, getUser } = new UserService();
  return {
    setUserData: (userData: UserInfo) => dispatch(setUserData(userData)),
    removeUserData: () => dispatch(removeUserData()),
    setPhone: (phoneNumber: string) => dispatch(setPhone(phoneNumber)),
    createUser: (values: CreateAccountFormData) => dispatch(createUser(values)),
    authUser: (values: AuthFormData) => dispatch(authUser(values)),
    getUser: () => dispatch(getUser()),
  };
};
export const useUserGetters = () => useAppSelector((state) => state.user);
