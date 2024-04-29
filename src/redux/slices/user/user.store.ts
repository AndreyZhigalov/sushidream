import { UserInfo } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { AuthFormData, CreateAccountFormData } from '../../../models';
import { UserService } from './user.service';
import { userSlice } from './user.slice';
import { ConfirmAuthWithPhoneProps } from './models/userService.interface';

export const useUserActions = () => {
  const dispatch = useAppDispatch();
  const { setUserData, setPhone } = userSlice.actions;
  const {
    createUser,
    authUser,
    getUser,
    signOutUser,
    authUserWithPhone,
    confirmAuthUserWithPhone,
    authUserWithGoogle,
  } = new UserService();
  return {
    setUserData: (userData: UserInfo) => dispatch(setUserData(userData)),
    setPhone: (phoneNumber: string) => dispatch(setPhone(phoneNumber)),
    createUser: (values: CreateAccountFormData) => dispatch(createUser(values)),
    authUser: (values: AuthFormData) => dispatch(authUser(values)),
    getUser: () => dispatch(getUser()),
    signOutUser: () => dispatch(signOutUser()),
    confirmAuthUserWithPhone: (values: ConfirmAuthWithPhoneProps) =>
      dispatch(confirmAuthUserWithPhone(values)),
    authUserWithGoogle: () => dispatch(authUserWithGoogle()),
    authUserWithPhone: (phoneNumber: string) => authUserWithPhone(phoneNumber),
  };
};
export const useUserGetters = () => useAppSelector((state) => state.user);
