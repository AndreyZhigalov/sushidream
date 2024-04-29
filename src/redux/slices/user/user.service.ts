import { FIREBASE_AUTH } from '../../../firebase';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GoogleAuthProvider,
  RecaptchaVerifier,
  User,
  UserInfo,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { AuthFormData, CreateAccountFormData } from '../../../models';
import { ConfirmAuthWithPhoneProps } from './models/userService.interface';

const getUserData = (user: User): UserInfo => {
  const { uid, displayName, phoneNumber, email, photoURL, providerId } = user;
  return { uid, displayName, phoneNumber, email, photoURL, providerId };
};
export class UserService {
  public createUser = createAsyncThunk<UserInfo | null, CreateAccountFormData>(
    'user/createUser',
    async (values) => {
      try {
        const { user } = await createUserWithEmailAndPassword(
          FIREBASE_AUTH,
          values.email,
          values.pass,
        );
        if (!user?.uid) throw new Error('Ошибка регистрации. Попробуйте ещё раз');

        await updateProfile(user, {
          displayName: `${values.name} ${values.lastname}`,
        });

        // await updatePhoneNumber(user, values.phoneNumber);

        return getUserData(user);
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
        const { user } = await signInWithEmailAndPassword(
          FIREBASE_AUTH,
          values.authEmail,
          values.password,
        );
        if (!user) throw new Error('Неверный логин или пароль');
        return getUserData(user);
      } catch (error) {
        console.error(error);
      }
      return null;
    },
  );

  public authUserWithPhone = async (number: string) => {
    try {
      const appVerifire = new RecaptchaVerifier(
        'auth-button',
        {
          size: 'invisible',
        },
        FIREBASE_AUTH,
      );

      return await signInWithPhoneNumber(FIREBASE_AUTH, number, appVerifire);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  public confirmAuthUserWithPhone = createAsyncThunk<UserInfo | null, ConfirmAuthWithPhoneProps>(
    'user/confirmAuthUserWithPhone',
    async ({ code, confirmResult }) => {
      try {
        const user = (await confirmResult.confirm(code)).user;
        return getUserData(user);
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  );

  public getUser = createAsyncThunk<UserInfo | null>('user/getUser', async () => {
    const user = await new Promise((resolve, reject) => {
      onAuthStateChanged(FIREBASE_AUTH, (user) => {
        if (user) {
          resolve(getUserData(user));
        } else {
          reject('Пользователь не авторизован');
        }
      });
    }).then((data) => data as UserInfo);
    // .catch(console.error);

    return user || null;
  });

  public signOutUser = createAsyncThunk('user/removeUser', async () => {
    try {
      await FIREBASE_AUTH.signOut().catch(() => {
        throw new Error('Не удалось разлогиниться');
      });
    } catch (error) {
      console.error(error);
    }
  });

  public authUserWithGoogle = createAsyncThunk<UserInfo | null>(
    'user/authUserWithGoogle',
    async () => {
      const provider = new GoogleAuthProvider();

      return await signInWithPopup(FIREBASE_AUTH, provider)
        .then(async (result) => {
          return getUserData(result.user);
        })
        .catch((error) => {
          console.error(error.code);
          return null;
        });
    },
  );
}
