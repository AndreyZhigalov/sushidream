
import { doc, getDoc } from "firebase/firestore"
import { firestoreDB } from "../../../firebase"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { UserData } from "./models/user.interface"

export class UserService {
    public fetchUserData = createAsyncThunk("user/fetchUserData", async (uid: string) => {
        try {
            return await getDoc(doc(firestoreDB, `users/${uid}`)).then(res => res.data() as UserData)
        } catch (error) {
            console.error(error)
        }
    })
}