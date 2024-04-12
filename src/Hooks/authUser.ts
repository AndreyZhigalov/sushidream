import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthUserData } from "../models/authUserData.interface";
import { auth, firestoreDB } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { AuthFormData } from "../models";
import { NavigateFunction } from "react-router-dom";

type Actions = {
    setAlert: (message: string) => void,
    setDiscount: () => {
        payload: undefined;
        type: string;
    },
    setUserData: (userData: AuthUserData) => {
        payload: AuthUserData;
        type: string;
    }
}

export const authUser = async (values: AuthFormData, navigate: NavigateFunction, { setAlert, setDiscount, setUserData }: Actions) => {
    return signInWithEmailAndPassword(auth, values.authEmail, values.password)
        .then((userCredential) => {

            getDoc(doc(firestoreDB, "users", userCredential.user.uid)).then(res => {
                const user = res.data() as AuthUserData;
                if (user) {
                    setDiscount();
                    setUserData(user);
                    navigate('../');
                } else {
                    throw new Error("User in not found")
                }
            }).catch(error => {
                setAlert('Пользователь с такими данными не найден. Обратитесь в поддержку');
                console.error(error);
            })

        })
        .catch((error) => {
            setAlert('Неверный логин или пароль')
            console.error(error);
        });
}
