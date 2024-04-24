import { auth } from '../../../firebase';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  UserInfo,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { AuthFormData, CreateAccountFormData } from '../../../models';

export class UserService {
  public createUser = createAsyncThunk<UserInfo | null, CreateAccountFormData>(
    'user/createUser',
    async (values) => {
      try {
        const { user } = await createUserWithEmailAndPassword(auth, values.email, values.pass);
        if (!user?.uid) throw new Error('Ошибка регистрации. Попробуйте ещё раз');
        const { uid, displayName, phoneNumber, email, photoURL, providerId } = user;
        return { uid, displayName, phoneNumber, email, photoURL, providerId };
      } catch (error) {
        console.error(error);
      }
      return null;
    },
  );

  public authUser = createAsyncThunk<UserInfo | null, AuthFormData>(
    'user/authUser',
    async (values) => {
      try {
        const { user } = await signInWithEmailAndPassword(auth, values.authEmail, values.password);
        if (!user) throw new Error('Неверный логин или пароль');
        const { uid, displayName, phoneNumber, email, photoURL, providerId } = user;
        return { uid, displayName, phoneNumber, email, photoURL, providerId };
      } catch (error) {
        console.error(error);
      }
      return null;
    },
  );

  public getUser = createAsyncThunk<UserInfo | null>('user/getUser', async () => {
    const auth = getAuth();
    try {
      const user = await new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
          if (!user) throw new Error('Пользователь не авторизован');
          const { uid, displayName, phoneNumber, email, photoURL, providerId } = user;
          resolve({ uid, displayName, phoneNumber, email, photoURL, providerId });
        });
      }).then((data) => data as UserInfo);
      return user;
    } catch (error) {
      console.error(error);
    }
    return null;
  });
}
