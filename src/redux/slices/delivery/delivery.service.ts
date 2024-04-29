import { doc, getDoc } from "firebase/firestore"
import { FIREBASE_DB } from "../../../firebase"
import { RestaurantItem } from "../../../models"
import { createAsyncThunk } from "@reduxjs/toolkit"

export class DeliveryService {
    public getAddresses = createAsyncThunk("delivery/getAddresses", async () => {
        try {
            const restRef = doc(FIREBASE_DB, "restaurants/addresses")
            return await getDoc(restRef).then(res => res.data() as Record<string, RestaurantItem>)
        } catch (error) {
            console.error(error)
        }
        return {}
    })
}