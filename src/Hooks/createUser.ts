import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestoreDB } from "../firebase";
import { CreateAccountFormData } from "../models";
import { type NavigateFunction } from "react-router-dom";

export const createUser = async (values: CreateAccountFormData, navigate: NavigateFunction) => {
    return createUserWithEmailAndPassword(auth, values.email, values.pass)
        .then((userCredential) => {
            setDoc(doc(firestoreDB, 'users', userCredential.user.uid), {
                ...values,
                uid: userCredential.user.uid,
                birthDay: values.day + '.' + values.month + '.' + values.year,
            })
                .then(() => {
                    navigate('../auth');
                })
                .catch((error) => {
                    console.error('Не удалось сохранить ваши данные. Попробуйте ещё раз');
                    throw new Error(error);
                });
        })
        .catch((error) => {
            console.error('Ошибка регистрации. Попробуйте ещё раз');
            throw new Error(error);
        });
}